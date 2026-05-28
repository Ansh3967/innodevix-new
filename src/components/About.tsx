import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Globe = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.55, 24, 24]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const Nodes = () => {
  const group = useRef<THREE.Group>(null);
  const nodes = Array.from({ length: 18 }, () => {
    const phi = Math.acos(-1 + 2 * Math.random());
    const theta = Math.random() * Math.PI * 2;
    return [1.6 * Math.sin(phi) * Math.cos(theta), 1.6 * Math.cos(phi), 1.6 * Math.sin(phi) * Math.sin(theta)] as [number, number, number];
  });
  useFrame((s) => {
    if (group.current) group.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <group ref={group}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#00D4FF" : "#8B5CF6"} />
        </mesh>
      ))}
    </group>
  );
};

const fullText =
  "Innodevix is a creative tech studio fusing AI, design and engineering. We craft intelligent products that move businesses forward — from automation pipelines to scroll-stopping web experiences.";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setTyped(fullText.slice(0, i));
            if (i >= fullText.length) clearInterval(interval);
          }, 22);
        },
      });
      gsap.from(".about-stat", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px] glass rounded-3xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <pointLight position={[3, 3, 3]} color="#00D4FF" intensity={2} />
                <pointLight position={[-3, -3, 3]} color="#8B5CF6" intensity={2} />
                <Globe />
                <Nodes />
              </Suspense>
            </Canvas>
          </div>

          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-[0.25em] mb-4">About Innodevix</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 uppercase">
              Built where <span className="text-gradient">code meets creativity</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed min-h-[8rem]">
              {typed}
              <span className="inline-block w-[2px] h-5 bg-primary align-middle ml-1 animate-pulse" />
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { v: "50+", l: "Projects" },
                { v: "AI-First", l: "Approach" },
                { v: "24/7", l: "Support" },
              ].map((s) => (
                <div key={s.l} className="about-stat glass rounded-2xl p-5 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
