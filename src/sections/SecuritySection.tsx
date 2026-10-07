import React, { useState } from "react";
import { Shield, Lock, CheckCircle2 } from "lucide-react";
import { GlassPanel } from "../components/GlassPanel";
import { ScrollReveal } from "../components/ScrollReveal";
import { Section, SectionHeader, TwoLayer } from "../components/Section";

interface SecurityNode {
  name: string;
  role: string;
  details: string;
}

export const SecuritySection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const securityNodes: SecurityNode[] = [
    { name: "USER", role: "Endpoint Client", details: "Secured via strict browser CORS policies, TLS encryption, and secure cookies." },
    { name: "IDENTITY", role: "Auth Gate (2FA / IAM)", details: "Validates JSON Web Tokens (JWT), verifies Session Sign-in logs, and manages RBAC." },
    { name: "APPLICATION", role: "App Layer Code", details: "Sanitizes input parameters, restricts CORS, protects against SQLi/XSS, and limits requests." },
    { name: "API", role: "Gateway & Routers", details: "Enforces rate-limits, checks client scopes, signs API payloads, and audits route metrics." },
    { name: "DATABASE", role: "Storage Ledger", details: "Encrypts transactional records at rest, locks access credentials, and writes signed binary logs." },
    { name: "CLOUD", role: "Cluster Boundary", details: "VPC isolation, firewalls, automated vulnerability scans, and security group rules." },
  ];

  const capabilities = [
    "Application Security",
    "API Security",
    "Authentication",
    "Authorization",
    "IAM (Identity Access)",
    "Secure Architecture",
    "Cloud Security",
    "DevSecOps Integration",
    "Security Testing",
    "Vulnerability Assessment"
  ];

  return (
    <Section className="select-none">
      <SectionHeader
        eyebrow="04 // CYBERSECURITY"
        lines={["SECURITY IS PART OF", "THE ARCHITECTURE."]}
        description={
          <TwoLayer
            plain="Your data and your users are protected from day one, not patched in later."
            detail="Security considerations are integrated across applications, APIs, identity, infrastructure and cloud environments. We design security boundaries directly into the initial blueprints."
          />
        }
      />

      {/* Security Flow Diagram Block */}
      <ScrollReveal direction="up" delay={0.1} className="mb-24">
        <GlassPanel variant="solid" className="p-6 text-center sm:p-10 md:p-14 rounded-[2rem] sm:rounded-[2.5rem]">
          <span className="eyebrow mb-10 block">
            Architectural Security Boundaries (Hover to Inspect)
          </span>

          {/* Nodes Row: Desktop (flex), Mobile (stacked) */}
          <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 lg:flex-row">

            {/* Connection Line */}
            <div className="absolute left-[5%] right-[5%] top-1/2 z-0 hidden h-[2px] -translate-y-1/2 border-t border-dashed border-border-subtle lg:block" />

            {securityNodes.map((node, index) => (
              <div
                key={node.name}
                onMouseEnter={() => setActiveNode(node.name)}
                onMouseLeave={() => setActiveNode(null)}
                className={`relative z-10 flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border bg-background px-3 py-5 transition-all duration-500 lg:w-28 ${
                  activeNode === node.name
                    ? "-translate-y-1 border-accent shadow-lg shadow-accent/10 [html.light_&]:shadow-md [html.light_&]:shadow-accent/15"
                    : "border-border-subtle hover:border-text-primary/30"
                }`}
              >
                <Shield className={`mb-2 h-5 w-5 transition-colors duration-300 ${activeNode === node.name ? "text-accent" : "text-text-secondary"}`} />
                <span className="font-mono text-xs font-bold tracking-wider text-text-primary">
                  {node.name}
                </span>

                {/* Small Chevron pointing next */}
                {index < securityNodes.length - 1 && (
                  <span className="my-2 text-text-secondary lg:hidden">↓</span>
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Info Box */}
          <div className="mx-auto mt-10 flex min-h-[100px] max-w-2xl items-center justify-center">
            {activeNode ? (
              (() => {
                const node = securityNodes.find((n) => n.name === activeNode);
                return (
                  <div className="w-full animate-fade-in rounded-2xl border border-accent/20 bg-background px-6 py-4 text-left">
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-accent">
                      Active Shield: {node?.role}
                    </span>
                    <p className="text-xs leading-relaxed text-text-secondary">
                      {node?.details}
                    </p>
                  </div>
                );
              })()
            ) : (
              <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
                <Lock className="h-3.5 w-3.5" />
                Hover over any node above to inspect its security mechanisms.
              </div>
            )}
          </div>
        </GlassPanel>
      </ScrollReveal>

      {/* Capabilities Grid */}
      <div className="border-t border-border-subtle pt-16">
        <span className="eyebrow mb-8 block text-left">SECURITY SPECIFICATIONS</span>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left md:grid-cols-3 lg:grid-cols-5">
          {capabilities.map((cap) => (
            <div key={cap} className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="font-mono text-xs uppercase tracking-wide text-text-secondary">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
