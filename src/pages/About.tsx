import PageHero from '@/components/shared/PageHero';
import { Shield, Users, Award, Target } from 'lucide-react';
import HomologadosCarousel from '@/components/sections/HomologadosCarousel';

const values = [
  { icon: Shield, title: 'Missão', desc: 'Prover soluções em segurança, através de tecnologias e profissionais qualificados, garantindo tranquilidade, conforto, proteção e satisfação de nossos clientes.' },
  { icon: Users, title: 'Valores', desc: 'Sinergia, Comprometimento, Responsabilidade, Agilidade e Respeito.' },
  { icon: Award, title: 'Nossos Pilares', desc: 'Pessoas, Confiança, Atendimento e Condições.' },
  { icon: Target, title: 'Visão', desc: 'Ser a empresa de primeira opção de nossos clientes, colaboradores, fornecedores e parceiros, reconhecida pela excelência e inovação.' },
];

const About = () => {
  return (
    <main>
      <PageHero title="SOBRE NÓS" subtitle="Conheça a Route Security e nossa missão" />

      {/* História */}
      <section className="relative z-10 bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-2xl font-bold text-primary text-glow">Nossa História</h2>
          <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
            <p>
              A Route Security é referência nacional em segurança eletrônica, oferecendo soluções tecnológicas inovadoras desde 2008. Com sede em Campinas-Sp e atuação em todo o território nacional, a empresa se destaca pelo desenvolvimento contínuo de software próprio e pela excelência no atendimento.
            </p>
            <p>
              Especializada em sistemas integrados de segurança, a Route Security fornece soluções completas que incluem monitoramento de alarmes, controle de acesso e CFTV inteligente. Seu diferencial está na combinação de equipamentos de última geração com tecnologia desenvolvida internamente.
            </p>
            <p>
              A empresa possui equipe altamente qualificada e certificada, garantindo projetos personalizados desde a concepção até a implantação e manutenção. Com parcerias estratégicas com fabricantes internacionais, a Route Security oferece as melhores soluções do mercado adaptadas às necessidades específicas de cada cliente.
            </p>
            <p>
              Comprometida com a inovação constante, a Route Security investe fortemente em pesquisa e desenvolvimento, mantendo-se na vanguarda tecnológica do setor de segurança eletrônica no Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="relative z-10 border-t border-border/20 bg-secondary/20 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-display text-2xl font-bold text-primary text-glow">
            Nossos Valores
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-lg border border-border/30 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-primary/20 bg-primary/5 transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-sm tracking-wider text-foreground">{title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homologados */}
      <HomologadosCarousel />
    </main>
  );
};

export default About;
