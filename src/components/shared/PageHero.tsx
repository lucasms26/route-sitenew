/**
 * PageHero — Componente reutilizável de hero para páginas internas.
 * Mantém a estética consistente com partículas sutis e tipografia Orbitron.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(titleRef.current,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
      { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, duration: 1.2 }
    );
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4');
    }
  }, []);

  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20"
      style={{ background: 'radial-gradient(ellipse at center, hsl(216 64% 10%) 0%, hsl(216 64% 4%) 70%, #000 100%)' }}
    >
      {/* Grid sutil de fundo */}
      <div className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(200 100% 60% / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(200 100% 60% / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="scanline pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative z-10 px-6 text-center">
        <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <h1 ref={titleRef} className="font-display text-4xl font-black tracking-wider text-primary opacity-0 md:text-6xl text-glow">
          {title}
        </h1>
        {subtitle && (
          <p ref={subtitleRef} className="mt-4 font-body text-base text-muted-foreground opacity-0 md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>
    </section>
  );
}
