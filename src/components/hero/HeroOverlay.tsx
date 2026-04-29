/**
 * HeroOverlay.tsx — UI Layer com Tipografia Animada e CTA
 * 
 * Implementa:
 * 1. Reveal por máscara de gradiente do texto "ROUTE SECURITY"
 *    - Usa GSAP para animar um clip-path/mask da esquerda para direita
 * 2. Botão CTA com explosão de partículas no hover
 * 3. Scanlines overlay para estética de monitor
 * 4. Ícones de serviço com entrada escalonada
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { Shield, Wifi, Lock, Eye } from 'lucide-react';

function ParticleBurst({ x, y }: { x: number; y: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 200;

    interface Particle {
      x: number; y: number; vx: number; vy: number; life: number; size: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      particles.push({
        x: 150, y: 100,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 3 + 1,
      });
    }

    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, 300, 200);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life > 0) {
          alive = true;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${p.life})`;
          ctx.fill();
        }
      });
      if (alive) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [x, y]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute -z-10"
      style={{ left: x - 150, top: y - 100, width: 300, height: 200 }}
    />
  );
}

const services = [
  { icon: Eye, label: 'Monitoramento' },
  { icon: Shield, label: 'Segurança' },
  { icon: Lock, label: 'Controle de Acesso' },
  { icon: Wifi, label: 'Integração' },
];

export default function HeroOverlay() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Reveal do título com máscara de gradiente (esquerda → direita)
    // O clip-path polygon parte de largura 0 e expande até 100%
    tl.fromTo(titleRef.current,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
      { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1, duration: 1.5, delay: 0.3 }
    );

    // Subtítulo: fade in com deslocamento vertical
    tl.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );

    // CTA: scale in
    tl.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Serviços: entrada escalonada
    if (servicesRef.current) {
      tl.fromTo(
        servicesRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      );
    }

    // Parallax no scroll: fade out a UI
    const handleScroll = () => {
      if (!overlayRef.current) return;
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.6), 1);
      overlayRef.current.style.opacity = String(1 - progress);
      overlayRef.current.style.transform = `translateY(${-progress * 80}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaHover = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setBurst({ x: rect.width / 2, y: rect.height / 2 });
    setTimeout(() => setBurst(null), 800);
  }, []);

  return (
    <div ref={overlayRef} className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
      {/* Scanlines overlay */}
      <div className="scanline pointer-events-none fixed inset-0 z-20 opacity-40" />

      <div className="flex max-w-4xl flex-col items-center text-center">
        {/* Linha de luz decorativa */}
        <div className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        <div ref={titleRef} className="mb-6 opacity-0 flex justify-center drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
          <img 
            src="/logo.png" 
            alt="Route Security Logo" 
            className="h-auto w-[280px] md:w-[400px] lg:w-[500px]" 
          />
        </div>

        <p
          ref={subtitleRef}
          className="mb-10 max-w-lg font-body text-base text-white opacity-0 md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          Tecnologia de ponta em segurança eletrônica.
          <br />
          Monitoramento inteligente 24/7.
        </p>

        <div ref={ctaRef} className="relative mb-16 opacity-0" onMouseEnter={handleCtaHover}>
          {burst && <ParticleBurst x={burst.x} y={burst.y} />}
          <Button variant="hero" size="lg" className="px-10 py-6 text-sm" asChild>
            <a 
              href="https://wa.me/5519989714979?text=Vim%20pelo%20site%20da%20route%20queria%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20ou%20solicitar%20uma%20proposta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Conheça Nossas Soluções
            </a>
          </Button>
        </div>

        {/* Ícones de serviço */}
        <div ref={servicesRef} className="grid grid-cols-4 gap-2 sm:gap-6 md:gap-10 w-full max-w-3xl px-1 sm:px-4">
          {services.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 opacity-0">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/5 transition-all duration-300 hover:bg-primary/10 hover:border-primary/60 neon-border">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="font-body text-[10px] sm:text-xs tracking-tight sm:tracking-wider text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
