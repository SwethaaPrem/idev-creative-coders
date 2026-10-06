import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./Button";

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    projectType: "Website",
    budget: "Not sure yet",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const projectTypes = [
    "Website",
    "Web Application",
    "Mobile Application",
    "Software",
    "AI / Machine Learning",
    "Cloud",
    "UI/UX",
    "Other",
  ];

  const budgets = [
    "Under ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹3,00,000",
    "₹3,00,000+",
    "Not sure yet",
  ];

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) tempErrors.message = "Message details are required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    const service = import.meta.env.VITE_CONTACT_SERVICE || "formspree";

    try {
      if (service === "formspree") {
        const url = import.meta.env.VITE_FORMSPREE_URL || "https://formsubmit.co/ajax/kishore.sivakumar34@gmail.com";
        const response = await fetch(url, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error("Formspree response error");
        setStatus("success");
      } 
      else if (service === "emailjs") {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          throw new Error("EmailJS configurations are missing in .env");
        }

        const payload = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            company: form.company || "N/A",
            project_type: form.projectType,
            budget: form.budget,
            message: form.message,
          },
        };

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("EmailJS response error");
        setStatus("success");
      } 
      else {
        // Fallback to Simulation Mode
        await new Promise((resolve) => setTimeout(resolve, 1800));
        console.log("Contact form payload processed via Simulation Mode:", form);
        setStatus("success");
      }

      // Trigger WhatsApp Click-to-Chat Redirect if enabled
      const whatsappEnabled = import.meta.env.VITE_WHATSAPP_REDIRECT !== undefined
        ? import.meta.env.VITE_WHATSAPP_REDIRECT === "true"
        : true;
      if (whatsappEnabled) {
        const whatsappNum = import.meta.env.VITE_WHATSAPP_NUMBER || "918610582676";
        const text = `Hello IDEV Creative Coders! I would like to submit a project inquiry:\n\n` +
          `*Name:* ${form.name}\n` +
          `*Email:* ${form.email}\n` +
          `*Company:* ${form.company || "N/A"}\n` +
          `*Project Type:* ${form.projectType}\n` +
          `*Budget:* ${form.budget}\n\n` +
          `*Message:* ${form.message}`;
        
        const encodedText = encodeURIComponent(text);
        const url = `https://wa.me/${whatsappNum}?text=${encodedText}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }

      // Reset form
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "Website",
        budget: "Not sure yet",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="panel p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-center text-center justify-center min-h-[450px]">
        <CheckCircle2 className="w-16 h-16 text-accent mb-6 animate-pulse" />
        <h3 className="font-display text-3xl font-extrabold tracking-[-0.015em] mb-2">Inquiry Sent Successfully!</h3>
        <p className="text-text-secondary text-sm max-w-sm mb-8">
          Thank you for reaching out to IDEV Creative Coders. Our technical team will review your project needs and email you back within 24 hours.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")} className="px-6 py-2.5">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col gap-6 text-left">
      <h3 className="font-display text-3xl font-extrabold tracking-[-0.015em] mb-2 uppercase [font-stretch:88%]">Start a Conversation</h3>
      
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>Something went wrong. Please check your inputs and try again.</span>
        </div>
      )}

      {/* Name Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
          Name <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="What should we call you?"
          className={`bg-background border px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 ${
            errors.name ? "border-red-500/50" : "border-border-subtle"
          }`}
        />
        {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
          Email <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="yourname@example.com"
          className={`bg-background border px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 ${
            errors.email ? "border-red-500/50" : "border-border-subtle"
          }`}
        />
        {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
      </div>

      {/* Company Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="company" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
          Company <span className="text-text-secondary/50 font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="Your company name"
          className="bg-background border border-border-subtle px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
        />
      </div>

      {/* Project Type & Budget Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Project Type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="bg-background border border-border-subtle px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="bg-background border border-border-subtle px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
          >
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
          Tell us about your project <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          disabled={status === "submitting"}
          placeholder="Please describe your requirements, timeline, or objectives..."
          className={`bg-background border px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none ${
            errors.message ? "border-red-500/50" : "border-border-subtle"
          }`}
        />
        {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-[var(--btn-bg)] text-[var(--btn-fg)] border border-[var(--btn-bg)] font-mono text-xs font-bold uppercase tracking-[0.06em] rounded-full hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-fg)] hover:border-[var(--accent-edge)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Inquiry...
          </>
        ) : (
          <>
            Send Inquiry
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
