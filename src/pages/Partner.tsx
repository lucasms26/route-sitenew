import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Percent, RefreshCw, Building2, Wallet, 
  GraduationCap, Coins, Megaphone, HeadphonesIcon, 
  Video, Network, TerminalSquare, Landmark, ShieldCheck, 
  Bot, Truck, BriefcaseBusiness, Lightbulb, Cog
} from 'lucide-react';
import { Link } from 'react-router-dom';

const marketOpportunities = [
  { icon: TrendingUp, title: 'Mercado em Crescimento', desc: 'A demanda por soluções de segurança inteligente cresce ano após ano no Brasil.' },
  { icon: Percent, title: 'Economia de até 60%', desc: 'Portaria remota reduz custos em comparação ao modelo presencial tradicional.' },
  { icon: RefreshCw, title: 'Receita Recorrente', desc: 'Modelo de negócio com contratos mensais, garantindo previsibilidade.' },
];

const programBenefits = [
  { icon: Building2, title: 'Estrutura pronta', desc: 'Operação robusta já disponível para sua empresa utilizar.' },
  { icon: Wallet, title: 'Baixo investimento', desc: 'Inicie sem grandes custos fixos.' },
  { icon: GraduationCap, title: 'Treinamento', desc: 'Capacitação contínua para você e sua equipe.' },
  { icon: Coins, title: 'Margens atrativas', desc: 'Rentabilidade alta com contratos recorrentes.' },
  { icon: Megaphone, title: 'Marketing pronto', desc: 'Materiais e campanhas para apoiar suas vendas.' },
  { icon: HeadphonesIcon, title: 'SLA garantido', desc: 'Suporte técnico com padrões de qualidade Route.' },
];

const businessModel = [
  { num: '1', title: 'Venda com sua marca', desc: 'Apresente as soluções de segurança já estruturadas, usando a força da sua marca para conquistar clientes.' },
  { num: '2', title: 'Execução pela Route', desc: 'A Route Security realiza toda a operação: monitoramento 24h, suporte técnico e relatórios inteligentes.' },
  { num: '3', title: 'Receita Recorrente', desc: 'Você fatura mensalmente sem se preocupar com infraestrutura, equipe ou investimentos extras.' },
];

const onboardingSteps = [
  { num: '1', title: 'Contrato', desc: 'Formalização do acordo de parceria.' },
  { num: '2', title: 'Treinamento', desc: 'Capacitação inicial para você e sua equipe.' },
  { num: '3', title: 'Testes', desc: 'Validação técnica das soluções.' },
  { num: '4', title: 'Go Live', desc: 'Início da operação em conjunto.' },
];

const ecosystem = [
  { icon: Video, title: 'CFTV' },
  { icon: Network, title: 'Telecom' },
  { icon: TerminalSquare, title: 'Software' },
  { icon: Landmark, title: 'Fintech' },
  { icon: ShieldCheck, title: 'Segurança' },
  { icon: Bot, title: 'Inteligência Artificial' },
  { icon: Truck, title: 'Logística' },
  { icon: BriefcaseBusiness, title: 'Corporativo' },
  { icon: Lightbulb, title: 'Inovação' },
  { icon: Cog, title: 'Automação' },
];

const Partner = () => {
  return (
    <main>
      <PageHero title="SEJA UM PARCEIRO" subtitle="Cresça conosco no mercado de segurança eletrônica" />

      {/* Oportunidade de Mercado */}
      <section className="relative z-10 bg-background px-6 py-20 border-b border-border/20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-2xl font-bold text-primary">
            Oportunidade de Mercado
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {marketOpportunities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center rounded-xl border border-border/30 bg-card/40 p-8 hover:border-primary/40 transition-colors">
                <Icon className="h-10 w-10 text-primary mb-6" strokeWidth={2.5} />
                <h3 className="mb-3 font-display text-base tracking-wider text-foreground">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios do Programa */}
      <section className="relative z-10 bg-secondary/20 px-6 py-20 border-b border-border/20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-2xl font-bold text-primary">
            Benefícios do Programa de Parceiros
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programBenefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center rounded-xl border border-border/30 bg-card p-8 hover:border-primary/40 transition-colors">
                <Icon className="h-8 w-8 text-primary mb-5" strokeWidth={2.5} />
                <h3 className="mb-2 font-display text-sm tracking-wider text-foreground">{title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelo de Negócio */}
      <section className="relative z-10 bg-background px-6 py-24 border-b border-border/20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary text-glow">
              Modelo de Negócio
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Um modelo simples, escalável e de baixo risco: você foca em vender, e a Route Security cuida de toda a operação técnica.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {businessModel.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center rounded-xl border border-border/30 bg-card/40 p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-xl mb-6 relative z-10">
                  {num}
                </div>
                <h3 className="mb-3 font-display text-base tracking-wider text-foreground relative z-10">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed relative z-10">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="relative z-10 bg-secondary/20 px-6 py-24 border-b border-border/20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-primary">
            Onboarding em até 30 dias
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* Linha conectora (visível apenas em telas grandes) */}
            <div className="hidden lg:block absolute top-6 left-1/8 right-1/8 h-0.5 bg-border z-0"></div>
            
            {onboardingSteps.map(({ num, title, desc }) => (
              <div key={num} className="flex flex-col items-center text-center p-6 relative z-10 bg-card rounded-xl border border-border/30 shadow-sm mx-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-lg mb-5 shadow-[0_0_15px_rgba(255,204,0,0.5)]">
                  {num}
                </div>
                <h3 className="mb-2 font-display text-sm tracking-wider text-foreground">{title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecossistema e Call to Action */}
      <section className="relative z-10 bg-background px-6 pt-24 pb-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-2xl font-bold text-foreground">
            Ecossistema de Parcerias
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 mb-24">
            {ecosystem.map(({ icon: Icon, title }) => (
              <div key={title} className="flex flex-col items-center justify-center rounded-lg border border-border/30 bg-card/60 aspect-square p-4 hover:bg-card hover:-translate-y-1 transition-all">
                <Icon className="h-8 w-8 text-primary mb-3" strokeWidth={2} />
                <h3 className="font-display text-xs tracking-wider text-foreground/90 text-center">{title}</h3>
              </div>
            ))}
          </div>

          {/* CTA Final (Único botão de contato) */}
          <div className="flex justify-center">
            <Button variant="hero" size="lg" className="px-14 py-8 text-lg rounded-full font-bold shadow-[0_0_30px_rgba(255,204,0,0.3)] hover:shadow-[0_0_50px_rgba(255,204,0,0.5)] transition-all" asChild>
              <a 
                href="https://wa.me/5519999749933?text=Vim%20pelo%20site,%20quero%20ser%20um%20parceiro" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Quero ser Parceiro
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Partner;
