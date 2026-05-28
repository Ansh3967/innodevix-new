import { Sparkles, Zap, Shield, Layers, Cpu, Rocket } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Intelligent automation that learns and adapts to your business needs in real-time." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized infrastructure delivering sub-second responses at any scale." },
  { icon: Shield, title: "Enterprise Secure", desc: "Bank-grade encryption and SOC 2 compliance built into every layer." },
  { icon: Layers, title: "Modular Design", desc: "Composable architecture that grows with your team and product." },
  { icon: Cpu, title: "Smart Integrations", desc: "Connect 200+ tools seamlessly with our unified API platform." },
  { icon: Rocket, title: "Ship Faster", desc: "Pre-built workflows that turn weeks of work into hours of progress." },
];

const Features = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why Innodevix</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built for the <span className="text-gradient">next generation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to launch, scale, and dominate your market — in one elegant platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="group relative bg-card border border-border/60 rounded-2xl p-8 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform" style={{ background: "var(--gradient-primary)" }}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
