import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Lumen AI", tag: "AI Workflow", desc: "End-to-end content automation for a media agency.", grad: "linear-gradient(135deg,#00D4FF,#8B5CF6)", href: "#contact" },
  { title: "Modelyx", tag: "AI Photography", desc: "Virtual fashion shoots replacing studio production.", grad: "linear-gradient(135deg,#8B5CF6,#FF6BD6)", href: "#contact" },
  { title: "Helpdesk GPT", tag: "AI Chatbot", desc: "Multilingual support bot trained on 50k tickets.", grad: "linear-gradient(135deg,#00D4FF,#3B82F6)", href: "#contact" },
  { title: "Nova Commerce", tag: "Web Development", desc: "High-converting headless storefront on Next gen stack.", grad: "linear-gradient(135deg,#3B82F6,#8B5CF6)", href: "#contact" },
  { title: "Pulse CRM", tag: "AI Workflow", desc: "AI-driven CRM enriching leads in real time.", grad: "linear-gradient(135deg,#FF6BD6,#00D4FF)", href: "#contact" },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const totalScroll = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="container mb-12">
        <p className="text-sm font-semibold text-primary uppercase tracking-[0.25em] mb-4">Selected work</p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
          Recent <span className="text-gradient">Projects</span>
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-8 px-8 will-change-transform" style={{ perspective: "1500px" }}>
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.href}
            aria-label={`View ${p.title} project`}
            className="group shrink-0 w-[78vw] md:w-[520px] h-[400px] rounded-3xl glass p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ transformStyle: "preserve-3d" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 30px 80px -20px rgba(0,212,255,0.4), 0 0 60px rgba(139,92,246,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; }}
          >
            <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity" style={{ background: p.grad }} />
            <div className="relative h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider glass">
                  {p.tag}
                </span>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold uppercase mb-3">{p.title}</h3>
                <p className="text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
