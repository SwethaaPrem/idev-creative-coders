import React, { useState, useEffect } from "react";
import { Server, ArrowRight } from "lucide-react";
import { GlassPanel } from "../components/GlassPanel";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader } from "../components/Section";

export const CloudDevOps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>("LOAD BALANCER");
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[SYSTEM] Initializing cluster boundaries...",
    "[AWS] ECS container provisioning node-08...",
    "[CI/CD] Deployment pipeline exit 0."
  ]);

  const pipeline = [
    { name: "LOAD BALANCER", details: "AWS ALB distributing connections across multiple ECS tasks." },
    { name: "APPLICATION", details: "Dockerized Node/React environment instances." },
    { name: "API ROUTER", details: "Reverse proxy handling secure endpoints." },
    { name: "DATABASE", details: "Replicated PostgreSQL nodes with transactional mirrors." },
    { name: "STORAGE", details: "S3 Object boundaries with IAM bucket policies." },
    { name: "MONITORING", details: "Prometheus & Grafana dashboard health auditing." }
  ];

  // Rotate simulation logs
  useEffect(() => {
    const timer = setInterval(() => {
      const msgs = [
        `[AWS-ALB] Healthy checks routing to cluster node-${Math.floor(Math.random() * 5 + 1)}`,
        `[PROMETHEUS] System memory status ok: ${(Math.random() * 10 + 40).toFixed(1)}%`,
        `[POSTGRES] Replicating binary write-log transaction #${Math.floor(Math.random() * 1000 + 4000)}`,
        "[CI/CD] Scanning vulnerability boundaries... 0 warnings."
      ];
      const newMsg = msgs[Math.floor(Math.random() * msgs.length)];
      setConsoleLogs((prev) => [...prev.slice(1), newMsg]);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="select-none">
      <SectionHeader
        eyebrow="05 // CLOUD & DEVOPS"
        lines={["ENGINEERED FOR", "PRODUCTION."]}
        description="We orchestrate cloud infrastructure built on resilience, observability, and scale. Using Docker, Terraform, and automated CI/CD deployment architectures to keep platforms online."
      />

      {/* Console / Layout Grid */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12 lg:gap-6">

        {/* Interactive Node Pipeline (Left Column) */}
        <ScrollReveal className="lg:col-span-7">
          <GlassPanel variant="solid" className="flex h-full flex-col justify-between p-6 text-left sm:p-10 rounded-[2rem] sm:rounded-[2.5rem]">
            <div>
              <span className="eyebrow mb-6 block">Cluster Architecture Path</span>

              <div className="flex flex-col gap-3">
                {pipeline.map((step) => (
                  <div
                    key={step.name}
                    onClick={() => setActiveStep(step.name)}
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-500 ${
                      activeStep === step.name
                        ? "border-accent bg-background text-text-primary"
                        : "border-border-subtle bg-transparent text-text-secondary hover:border-text-primary/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Server className={`h-4 w-4 ${activeStep === step.name ? "text-accent" : "text-text-secondary"}`} />
                      <span className="font-mono text-xs font-bold tracking-[0.06em]">{step.name}</span>
                    </div>
                    {activeStep === step.name && (
                      <ArrowRight className="h-3.5 w-3.5 animate-pulse text-accent" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Detail Explanation */}
            <div className="mt-8 min-h-[70px] border-t border-border-subtle pt-6">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
                Node Specification
              </span>
              <p className="text-sm leading-relaxed text-text-secondary">
                {pipeline.find((p) => p.name === activeStep)?.details}
              </p>
            </div>
          </GlassPanel>
        </ScrollReveal>

        {/* Infrastructure Metrics Console (Right Column) */}
        <ScrollReveal delay={0.1} className="lg:col-span-5">
          <GlassPanel variant="solid" className="flex h-full flex-col justify-between p-6 text-left sm:p-10 rounded-[2rem] sm:rounded-[2.5rem]">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow">Telemetry Console</span>
                <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] font-bold text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  Live Sync
                </span>
              </div>

              {/* simulated metric cards */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border-subtle bg-background p-4">
                  <span className="mb-1 block font-mono text-[10px] text-text-secondary">AWS CPU load</span>
                  <span className="font-display text-3xl font-extrabold tracking-tight text-text-primary">12.5%</span>
                </div>
                <div className="rounded-2xl border border-border-subtle bg-background p-4">
                  <span className="mb-1 block font-mono text-[10px] text-text-secondary">API Latency</span>
                  <span className="font-display text-3xl font-extrabold tracking-tight text-text-primary">94ms</span>
                </div>
              </div>

              {/* Console Logs Terminal */}
              <div className="flex min-h-[140px] flex-col gap-2 rounded-2xl border border-border-subtle bg-background p-4 font-mono text-[10px] text-accent">
                {consoleLogs.map((log, index) => (
                  <div key={index} className="truncate">
                    <span className="select-none text-text-secondary">{"$ "}</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4 font-mono text-[10px] text-text-secondary">
              <span>Docker Containers: OK</span>
              <span>CI/CD: SUCCESS</span>
            </div>
          </GlassPanel>
        </ScrollReveal>

      </div>
    </Section>
  );
};
