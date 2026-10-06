import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

interface NodeData {
  name: string;
  pos: [number, number, number];
  svgX: number; // percentage X for the SVG fallback
  svgY: number; // percentage Y for the SVG fallback
  description: string;
}

interface DataPacket {
  mesh: THREE.Mesh;
  startNodeIndex: number;
  endNodeIndex: number;
  progress: number;
  speed: number;
}

interface PointerState {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: string;
}

const nodes: NodeData[] = [
  { name: "FRONTEND", pos: [-2, 1.5, 0], svgX: 25, svgY: 30, description: "React / Next.js SPA Client" },
  { name: "BACKEND", pos: [0, 0.5, 0.8], svgX: 50, svgY: 45, description: "Spring Boot / Node REST API" },
  { name: "API GATEWAY", pos: [-1, 0.5, -0.8], svgX: 35, svgY: 55, description: "Secure Gateway Router" },
  { name: "DATABASE", pos: [1.2, -0.5, 1], svgX: 75, svgY: 60, description: "PostgreSQL Transaction Storage" },
  { name: "SECURITY", pos: [0, 1.8, -1.2], svgX: 50, svgY: 20, description: "OAuth2 / IAM Token Validator" },
  { name: "CLOUD", pos: [2, 0.8, -0.5], svgX: 80, svgY: 35, description: "AWS ECS Cluster Container" },
  { name: "AI COGNITIVE", pos: [-1.5, -1, 0.5], svgX: 25, svgY: 75, description: "TensorFlow / OpenCV Model" },
  { name: "INFRASTRUCTURE", pos: [1.5, -1.5, 0], svgX: 70, svgY: 80, description: "Docker / CI-CD Pipelines" },
];

// Connection web for the SVG fallback
const svgConnections = [
  [0, 1], [0, 2], [1, 2], [1, 3], [1, 4], [1, 5], [3, 5], [4, 5], [6, 2], [7, 3]
];

const CAMERA_Z = 8;
const CAMERA_Z_FOCUSED = 6.4;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Create a throw-away context to find out whether WebGL is available at all. */
const canUseWebGL = (): boolean => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
};

/**
 * Interactive 3D system map.
 *  - Drag (mouse or touch) to spin it; it keeps its momentum and resumes a slow
 *    drift once you let go.
 *  - Move over it and the whole system tilts toward the pointer, and nodes lean
 *    toward the cursor like magnets.
 *  - Hover a node to light up its connections; click/tap one to bring it to the
 *    front (click empty space to release).
 * Falls back to an SVG diagram where WebGL is unavailable.
 */
export const ThreeArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [useSvg] = useState<boolean>(() => !canUseWebGL());

  useEffect(() => {
    const container = containerRef.current;
    if (!container || useSvg) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = CAMERA_Z;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.cursor = "grab";
    // Vertical swipes still scroll the page on touch screens; horizontal ones rotate the system
    canvas.style.touchAction = "pan-y";
    container.appendChild(canvas);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const group = new THREE.Group();
    scene.add(group);

    // Colours come from CSS variables (--node-base / --node-hover), so the network
    // follows the theme and the colour-blocked panel it sits on.
    const readColor = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return new THREE.Color(value || fallback);
    };
    const theme = {
      key: document.documentElement.className,
      base: readColor("--node-base", "#0b0b0d"),
      hover: readColor("--node-hover", "#7c3aed"),
    };
    const refreshTheme = () => {
      const key = document.documentElement.className;
      if (key === theme.key) return;
      theme.key = key;
      theme.base = readColor("--node-base", "#0b0b0d");
      theme.hover = readColor("--node-hover", "#7c3aed");
    };

    // Nodes: each has a "home" position plus a spring-like offset that lets the pointer pull it
    const homes = nodes.map((n) => new THREE.Vector3(...n.pos));
    const offsets = nodes.map(() => new THREE.Vector3());
    const targets = nodes.map(() => new THREE.Vector3());
    const sphereGeometry = new THREE.SphereGeometry(0.13, 20, 20);
    const meshes = nodes.map((node, i) => {
      const mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: theme.base }));
      mesh.position.copy(homes[i]);
      mesh.userData = { name: node.name, description: node.description };
      group.add(mesh);
      return mesh;
    });

    // Connections: one LineSegments object whose vertices are rewritten every frame,
    // so the lines follow the nodes as they are pulled around.
    const connections: [number, number][] = [];
    for (let i = 0; i < homes.length; i++) {
      for (let j = i + 1; j < homes.length; j++) {
        if (homes[i].distanceTo(homes[j]) < 3.2) connections.push([i, j]);
      }
    }
    const linePositions = new Float32Array(connections.length * 6);
    const lineColors = new Float32Array(connections.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const linesMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 });
    const lines = new THREE.LineSegments(lineGeometry, linesMaterial);
    lines.frustumCulled = false; // vertices move every frame, so the initial bounds go stale
    group.add(lines);

    // Data packets travelling along the connections
    const packets: DataPacket[] = [];
    const packetGeometry = new THREE.SphereGeometry(0.045, 8, 8);
    for (let k = 0; k < 12 && connections.length > 0; k++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const startIdx = Math.random() > 0.5 ? conn[0] : conn[1];
      const endIdx = startIdx === conn[0] ? conn[1] : conn[0];
      const mesh = new THREE.Mesh(packetGeometry, new THREE.MeshBasicMaterial({ color: theme.hover }));
      group.add(mesh);
      packets.push({
        mesh,
        startNodeIndex: startIdx,
        endNodeIndex: endIdx,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
      });
    }

    // ---------------------------------------------------------------- interaction state
    const s = {
      pointer: null as PointerState | null,
      dragging: false,
      moved: 0,
      lastX: 0,
      lastY: 0,
      rotY: 0.35, // rotation the user has "given" the system
      rotX: 0.08,
      velY: 0,
      velX: 0,
      tiltY: 0, // extra lean toward the pointer (not accumulated)
      tiltX: 0,
      lastInteraction: performance.now(),
      focus: null as { y: number; x: number } | null,
      hovered: -1,
      selected: -1,
      hudIndex: -2,
      cursor: "grab",
    };

    const screen = nodes.map(() => ({ x: 0, y: 0 })); // projected node positions, in canvas pixels
    const worldPos = new THREE.Vector3();
    const rayDir = new THREE.Vector3();
    const toNode = new THREE.Vector3();
    const onRay = new THREE.Vector3();
    const groupQuatInv = new THREE.Quaternion();

    const pickNode = (): number => {
      const p = s.pointer;
      if (!p) return -1;
      const reach = p.kind === "touch" ? 46 : 32;
      let best = -1;
      let bestDist = reach;
      screen.forEach((pt, i) => {
        const d = Math.hypot(pt.x - p.x, pt.y - p.y);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      return best;
    };

    const updatePointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      s.pointer = { x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height, kind: e.pointerType };
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      updatePointer(e);
      s.dragging = true;
      s.moved = 0;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.velX = 0;
      s.velY = 0;
      s.lastInteraction = performance.now();
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* capture is a nicety, not a requirement */
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e);
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.moved += Math.abs(dx) + Math.abs(dy);
      if (s.moved > 6) s.focus = null; // grabbing it overrides a "bring to front" move
      s.velY = dx * 0.009;
      s.velX = dy * 0.007;
      s.rotY += s.velY;
      s.rotX = clamp(s.rotX + s.velX, -1.2, 1.2);
      s.lastInteraction = performance.now();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.dragging = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      s.lastInteraction = performance.now();
      if (s.moved <= 6) {
        // A click, not a drag: pick the nearest node (or clear the selection)
        const hit = pickNode();
        s.selected = hit;
        if (hit >= 0) {
          // Rotate so this node faces the camera
          const p = meshes[hit].position;
          const yaw = Math.atan2(-p.x, p.z);
          const pitch = Math.atan2(p.y, Math.hypot(p.x, p.z));
          const nearestYaw = yaw + Math.PI * 2 * Math.round((s.rotY + s.tiltY - yaw) / (Math.PI * 2));
          s.focus = { y: nearestYaw - s.tiltY, x: clamp(pitch - s.tiltX, -1.2, 1.2) };
          s.velX = 0;
          s.velY = 0;
        } else {
          s.focus = null;
        }
      }
      if (e.pointerType === "touch") s.pointer = null;
    };

    const onPointerLeave = () => {
      if (!s.dragging) s.pointer = null;
    };
    const onPointerCancel = () => {
      s.dragging = false;
      s.pointer = null;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointercancel", onPointerCancel);

    // ---------------------------------------------------------------- animation loop
    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const k = Math.min(clock.getDelta(), 0.05) * 60; // 1 at 60fps, so motion is refresh-rate independent
      const now = performance.now();
      const elapsed = clock.elapsedTime;
      const p = s.pointer;

      // --- rotation: momentum, "bring to front", idle drift
      if (!s.dragging) {
        if (s.focus) {
          s.rotY += (s.focus.y - s.rotY) * 0.075 * k;
          s.rotX += (s.focus.x - s.rotX) * 0.075 * k;
        } else {
          s.rotY += s.velY * k;
          s.rotX = clamp(s.rotX + s.velX * k, -1.2, 1.2);
          s.velY *= reduceMotion ? 0 : Math.pow(0.94, k);
          s.velX *= reduceMotion ? 0 : Math.pow(0.94, k);
          const idle = now - s.lastInteraction > 1800;
          if (idle && s.selected < 0 && !reduceMotion) {
            s.rotY += (p ? 0.0012 : 0.0035) * k; // drifts slower while a pointer is over it
          }
        }
      }

      // --- lean toward the pointer
      const wantTilt = p && !s.dragging && !reduceMotion;
      const tiltTargetY = wantTilt ? ((p.x / p.w) * 2 - 1) * 0.5 : 0;
      const tiltTargetX = wantTilt ? ((p.y / p.h) * 2 - 1) * 0.32 : 0;
      s.tiltY += (tiltTargetY - s.tiltY) * 0.08 * k;
      s.tiltX += (tiltTargetX - s.tiltX) * 0.08 * k;
      group.rotation.y = s.rotY + s.tiltY;
      group.rotation.x = s.rotX + s.tiltX;

      // --- camera moves in a little while a node is selected
      const zTarget = s.selected >= 0 ? CAMERA_Z_FOCUSED : CAMERA_Z;
      camera.position.z += (zTarget - camera.position.z) * 0.06 * k;
      camera.updateMatrixWorld();
      group.updateMatrixWorld(true);

      // --- nodes lean toward the cursor (screen-space falloff, like magnets)
      if (p && !s.dragging && !reduceMotion) {
        const ndcX = (p.x / p.w) * 2 - 1;
        const ndcY = -((p.y / p.h) * 2 - 1);
        rayDir.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize();
        groupQuatInv.copy(group.quaternion).invert();
        const radius = Math.min(p.w, p.h) * 0.42;
        meshes.forEach((mesh, i) => {
          mesh.getWorldPosition(worldPos);
          toNode.copy(worldPos).sub(camera.position);
          onRay.copy(camera.position).addScaledVector(rayDir, toNode.dot(rayDir)); // the cursor, at this node's depth
          const d = Math.hypot(screen[i].x - p.x, screen[i].y - p.y);
          const pull = Math.pow(Math.max(0, 1 - d / radius), 2);
          targets[i].copy(onRay).sub(worldPos).applyQuaternion(groupQuatInv).multiplyScalar(0.75 * pull).clampLength(0, 1.15);
        });
      } else {
        targets.forEach((t) => t.set(0, 0, 0));
      }
      meshes.forEach((mesh, i) => {
        offsets[i].lerp(targets[i], 0.14 * Math.min(k, 2));
        mesh.position.copy(homes[i]).add(offsets[i]);
      });
      group.updateMatrixWorld(true);

      // --- project nodes to canvas pixels (used for hover, click and the pull above)
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      meshes.forEach((mesh, i) => {
        mesh.getWorldPosition(worldPos);
        worldPos.project(camera);
        screen[i].x = (worldPos.x * 0.5 + 0.5) * w;
        screen[i].y = (-worldPos.y * 0.5 + 0.5) * h;
      });

      // --- hover
      const hovered = p && !s.dragging ? pickNode() : -1;
      s.hovered = hovered;
      const wantCursor = s.dragging ? "grabbing" : hovered >= 0 ? "pointer" : "grab";
      if (wantCursor !== s.cursor) {
        s.cursor = wantCursor;
        canvas.style.cursor = wantCursor;
      }
      const activeIdx = hovered >= 0 ? hovered : s.selected;
      if (activeIdx !== s.hudIndex) {
        s.hudIndex = activeIdx;
        setActiveNode(activeIdx >= 0 ? `${nodes[activeIdx].name}: ${nodes[activeIdx].description}` : null);
      }

      // --- colours, node scale, and connection highlighting
      refreshTheme();
      meshes.forEach((mesh, i) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        const isActive = i === hovered || i === s.selected;
        mat.color.copy(isActive ? theme.hover : theme.base);
        const targetScale =
          i === s.selected ? 1.9 + (reduceMotion ? 0 : Math.sin(elapsed * 4) * 0.2) : i === hovered ? 1.7 : 1;
        mesh.scale.setScalar(mesh.scale.x + (targetScale - mesh.scale.x) * 0.2 * Math.min(k, 2));
      });
      connections.forEach(([a, b], c) => {
        const lit = a === activeIdx || b === activeIdx;
        const color = lit ? theme.hover : theme.base;
        const o = c * 6;
        linePositions[o] = meshes[a].position.x;
        linePositions[o + 1] = meshes[a].position.y;
        linePositions[o + 2] = meshes[a].position.z;
        linePositions[o + 3] = meshes[b].position.x;
        linePositions[o + 4] = meshes[b].position.y;
        linePositions[o + 5] = meshes[b].position.z;
        lineColors[o] = lineColors[o + 3] = color.r;
        lineColors[o + 1] = lineColors[o + 4] = color.g;
        lineColors[o + 2] = lineColors[o + 5] = color.b;
      });
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      // --- data packets
      packets.forEach((pk) => {
        pk.progress += pk.speed * k;
        if (pk.progress >= 1) {
          pk.progress = 0;
          const conn = connections[Math.floor(Math.random() * connections.length)];
          pk.startNodeIndex = Math.random() > 0.5 ? conn[0] : conn[1];
          pk.endNodeIndex = pk.startNodeIndex === conn[0] ? conn[1] : conn[0];
          pk.speed = 0.003 + Math.random() * 0.004;
        }
        pk.mesh.position.lerpVectors(meshes[pk.startNodeIndex].position, meshes[pk.endNodeIndex].position, pk.progress);
        (pk.mesh.material as THREE.MeshBasicMaterial).color.copy(theme.hover);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("pointercancel", onPointerCancel);

      sphereGeometry.dispose();
      packetGeometry.dispose();
      lineGeometry.dispose();
      linesMaterial.dispose();
      meshes.forEach((m) => (m.material as THREE.Material).dispose());
      packets.forEach((pk) => (pk.mesh.material as THREE.Material).dispose());

      if (canvas.parentNode === container) container.removeChild(canvas);
      renderer.dispose();
    };
  }, [useSvg]);

  return (
    <div className="relative flex h-full min-h-[320px] w-full select-none items-center justify-center overflow-hidden sm:min-h-[400px]">
      {!useSvg ? (
        // WebGL canvas (drag / hover / click handled inside the effect)
        <div ref={containerRef} className="absolute inset-0 z-0" />
      ) : (
        // SVG fallback for devices without WebGL
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 flex items-center justify-center p-4"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full max-w-sm" style={{ color: "var(--node-base)" }}>
            {svgConnections.map(([i, j], idx) => (
              <line
                key={idx}
                x1={`${nodes[i].svgX}%`}
                y1={`${nodes[i].svgY}%`}
                x2={`${nodes[j].svgX}%`}
                y2={`${nodes[j].svgY}%`}
                stroke="currentColor"
                strokeWidth="0.4"
                className="opacity-40"
              />
            ))}

            {nodes.map((node) => (
              <g
                key={node.name}
                onClick={() => setActiveNode(node.name + ": " + node.description)}
                className="group cursor-pointer"
              >
                <circle
                  cx={`${node.svgX}%`}
                  cy={`${node.svgY}%`}
                  r="2"
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:scale-125"
                />
                <circle
                  cx={`${node.svgX}%`}
                  cy={`${node.svgY}%`}
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="animate-pulse opacity-40"
                />
                <text
                  x={`${node.svgX}%`}
                  y={`${node.svgY - 3}%`}
                  textAnchor="middle"
                  className="pointer-events-none font-mono text-[3px] font-bold opacity-90"
                  style={{ fill: "var(--node-label)" }}
                >
                  {node.name}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      )}

      {/* Node readout (hover or selected) */}
      {activeNode ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 max-w-[280px] -translate-x-1/2 rounded-xl border border-accent/30 bg-surface/90 px-4 py-2.5 text-left shadow-xl backdrop-blur transition-all duration-300">
          <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-accent">System Node Info</span>
          <span className="block font-mono text-xs font-bold text-text-primary">{activeNode}</span>
        </div>
      ) : (
        !useSvg && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-10 rounded-full bg-brand-warm px-3.5 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.06em] text-brand-ink">
            <span className="pointer-coarse:hidden">Drag to rotate · Click a node</span>
            <span className="hidden pointer-coarse:inline">Swipe to rotate · Tap a node</span>
          </span>
        )
      )}
    </div>
  );
};
