import { Suspense, lazy, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const HeroScene = lazy(() => import("./HeroScene"));

const BinaryRain = () => {
  const digits = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    char: Math.random() > 0.5 ? "1" : "0",
    left: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    size: 10 + Math.random() * 8,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {digits.map((d) => (
        <span
          key={d.id}
          className="binary-digit"
          style={{
            left: `${d.left}%`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            fontSize: `${d.size}px`,
          }}
        >
          {d.char}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(headlineRef.current, { y: 40, opacity: 0, duration: 1 })
      .from(subRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <BinaryRain />

      <div className="absolute inset-0 -z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 30%, hsl(var(--background)) 90%)" }} />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="uppercase tracking-wider">Automation + Creativity</span>
          </div>

          <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.05] uppercase">
            Where Automation <br />
            Meets <span className="text-gradient">Creativity</span>
          </h1>

          <p ref={subRef} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Innodevix builds intelligent products that fuse engineering precision with creative vision — from AI workflows to immersive web experiences.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="hero" className="pulse-glow">
              <a href="#contact">Start your project <ArrowRight className="w-4 h-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary/40 hover:bg-primary/10">
              <a href="#services">Explore services</a>
            </Button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Available for new projects</div>
            <div>⭐ AI-powered delivery</div>
            <div>Global remote team</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
