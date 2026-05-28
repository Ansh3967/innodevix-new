import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

type Burst = { id: number; x: number; y: number };

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    const btn = (e.currentTarget.querySelector("button[type=submit]") as HTMLElement | null);
    if (btn) {
      const r = btn.getBoundingClientRect();
      const id = Date.now();
      setBursts((b) => [...b, { id, x: r.left + r.width / 2, y: r.top + r.height / 2 }]);
      setTimeout(() => setBursts((b) => b.filter((x) => x.id !== id)), 1000);
    }

    try {
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: result.data.name,
          email: result.data.email,
          message: result.data.message,
          user_agent: navigator.userAgent,
        });
      if (dbError) throw dbError;

      const { error: fnError } = await supabase.functions.invoke(
        "send-contact-notification",
        { body: result.data }
      );
      if (fnError) throw fnError;

      setForm({ name: "", email: "", message: "" });
      toast({ title: "Message sent! ✨", description: "We'll get back within 24 hours." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 bg-transparent rounded-xl border border-primary/25 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15),0_0_25px_rgba(0,212,255,0.35)]";

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-60" />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-[0.25em] mb-4">Get in touch</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase">
            Let's build something <span className="text-gradient">extraordinary</span>
          </h2>
          <p className="text-lg text-muted-foreground">Have a project in mind? We'd love to hear about it.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "mohitgohani580@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 9904712104" },
              { icon: MapPin, label: "Office", value: "Remote-first" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground shrink-0" style={{ background: "var(--gradient-primary)", boxShadow: "var(--neon-cyan)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                    <p className="font-medium mt-1">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="md:col-span-3 glass-strong rounded-2xl p-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="uppercase text-xs tracking-wider text-muted-foreground">Name</Label>
              <input id="name" value={form.name} maxLength={100} className={inputCls}
                onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="uppercase text-xs tracking-wider text-muted-foreground">Email</Label>
              <input id="email" type="email" value={form.email} maxLength={255} className={inputCls}
                onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="uppercase text-xs tracking-wider text-muted-foreground">Message</Label>
              <textarea id="message" value={form.message} maxLength={1000} rows={5} className={inputCls + " resize-none"}
                onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." />
              {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full pulse-glow" disabled={loading}>
              {loading ? "Sending..." : (<>Send message <Send className="w-4 h-4" /></>)}
            </Button>
          </form>
        </div>
      </div>

      {bursts.map((b) => (
        <div key={b.id} className="fixed pointer-events-none z-[9999]" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const dist = 80 + Math.random() * 40;
            return (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#00D4FF" : "#8B5CF6",
                  boxShadow: "0 0 8px currentColor",
                  animation: `burst-${b.id}-${i} 0.9s ease-out forwards`,
                }}
              />
            );
          })}
          <style>{Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const dist = 80 + Math.random() * 40;
            return `@keyframes burst-${b.id}-${i}{to{transform:translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) scale(0);opacity:0}}`;
          }).join("")}</style>
        </div>
      ))}
    </section>
  );
};

export default ContactForm;
