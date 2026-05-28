import { Code2, Camera, Workflow, Bot } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Website Development",
    short: "Production-grade websites & web apps.",
    details: "Lightning-fast, SEO-optimized sites built with React, TypeScript and modern tooling. From landing pages to full SaaS platforms.",
  },
  {
    icon: Camera,
    title: "AI Photography",
    short: "Studio-grade visuals, generated.",
    details: "AI-generated photography for modeling, fashion, and marketing campaigns. Unlimited concepts, zero studio costs.",
  },
  {
    icon: Workflow,
    title: "AI Workflows",
    short: "Automate the work, amplify the people.",
    details: "Custom automation pipelines that connect your tools, eliminate manual work, and scale operations using LLMs and agents.",
  },
  {
    icon: Bot,
    title: "AI Chatbots",
    short: "Always-on conversational intelligence.",
    details: "Custom chatbots trained on your data — for support, sales, and internal knowledge. Deploy on web, WhatsApp, Slack and more.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 80,
        opacity: 0,
        rotateX: -25,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm font-semibold text-primary uppercase tracking-[0.25em] mb-4">What we do</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 uppercase">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hover any card to reveal what we deliver.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: "1200px" }}>
          {services.map(({ icon: Icon, title, short, details }, i) => (
            <div key={i} className="service-card flip-card h-72">
              <div className="flip-card-inner">
                <div className="flip-face glass rounded-2xl p-6 flex flex-col justify-between">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-primary-foreground"
                    style={{ background: "var(--gradient-primary)", boxShadow: "var(--neon-cyan)" }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{short}</p>
                  </div>
                </div>
                <div className="flip-face flip-back glass-strong rounded-2xl p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-3 text-gradient">{title}</h3>
                  <p className="text-sm text-foreground/85 leading-relaxed">{details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
