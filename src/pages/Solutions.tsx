import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import { Camera, Siren, Fingerprint, Wifi, MonitorSmartphone, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    icon: Camera,
    title: 'CFTV Inteligente',
    desc: 'Câmeras de alta resolução com análise de vídeo por IA. Detecção de intrusão, reconhecimento facial e monitoramento remoto em tempo real.',
    features: ['Câmeras 4K', 'Análise por IA', 'Acesso Remoto', 'Gravação em Nuvem'],
  },
  {
    icon: Siren,
    title: 'Alarmes Monitorados',
    desc: 'Sistemas de alarme com monitoramento 24/7 e resposta imediata. Sensores perimetrais, volumétricos e de abertura.',
    features: ['Monitoramento 24/7', 'Resposta Tática', 'App Mobile', 'Sensores Smart'],
  },
  {
    icon: Fingerprint,
    title: 'Controle de Acesso',
    desc: 'Soluções biométricas, cartões de proximidade e reconhecimento facial para controle total de acessos.',
    features: ['Biometria', 'Cartão RFID', 'Facial Recognition', 'Relatórios'],
  },
  {
    icon: Wifi,
    title: 'Integração de Sistemas',
    desc: 'Sistemas próprios e integrados com as principais tecnologias do mercado.',
    features: ['Plataforma Única', 'API Aberta', 'Dashboard', 'Automação'],
  },
  {
    icon: MonitorSmartphone,
    title: 'Monitoramento Inteligente 24h',
    desc: 'Sua tranquilidade é nossa prioridade. Contamos com uma central de monitoramento operando 24/7, composta por especialistas treinados para identificar riscos e agir com rapidez diante de qualquer ocorrência.',
    features: ['App iOS/Android', 'Web Dashboard', 'Push Alerts', 'Live View'],
  },
  {
    icon: ShieldCheck,
    title: 'Consultoria em Segurança',
    desc: 'Análise de vulnerabilidades e projetos personalizados para atender às necessidades específicas do seu negócio.',
    features: ['Análise de Risco', 'Projeto Técnico', 'Compliance', 'Treinamento'],
  },
  {
    icon: Wrench,
    title: 'Projetos',
    desc: 'Especialistas em segurança eletrônica e infraestrutura tecnológica. Atuamos desde a implantação de projetos complexos até a manutenção preventiva e corretiva de sistemas de alta performance.',
    features: ['Instalação', 'Manutenção', 'Infraestrutura', 'Suporte'],
  },
];

const Solutions = () => {
  return (
    <main>
      <PageHero title="SOLUÇÕES" subtitle="Tecnologia de ponta para cada necessidade" />

      <section className="relative z-10 bg-background px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ icon: Icon, title, desc, features }) => (
              <div
                key={title}
                className="group flex flex-col rounded-lg border border-border/30 bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/80"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 transition-all duration-300 group-hover:border-primary/60 group-hover:bg-primary/10 neon-border">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 font-display text-sm font-bold tracking-wider text-foreground">{title}</h3>
                <p className="mb-6 flex-1 font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {features.map(f => (
                    <span key={f} className="rounded-sm border border-border/30 bg-secondary/30 px-2 py-1 font-body text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="px-10 py-6 text-sm">
                Solicite um Orçamento
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Solutions;
