import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useState, useRef } from 'react';

const talentPoolJobs = [
  {
    role: 'Operador de Monitoramento',
    description: 'Responsável por monitorar câmeras e alarmes em tempo real, realizar atendimento de ocorrências, acionar protocolos de segurança e executar atividades de portaria remota (controle de acessos, identificação de visitantes e liberação de entradas).',
    location: 'Campinas/SP'
  },
  {
    role: 'Técnico de Instalação',
    description: 'Atuar na instalação e manutenção de sistemas de CFTV, controle de acesso e alarmes.',
    location: 'Campinas/SP'
  },
  {
    role: 'Analista de TI Júnior',
    description: 'Suporte a sistemas internos, configuração de servidores e integração de softwares de monitoramento.',
    location: 'Campinas/SP'
  },
  {
    role: 'Assistente Administrativo',
    description: 'Responsável por apoiar a equipe administrativa, organizar documentos e gerenciar agendas.',
    location: 'Campinas/SP'
  },
  {
    role: 'Estagiário de Suporte Técnico',
    description: 'Atuação em suporte a clientes internos e externos, manutenção de computadores e instalação de softwares. Rotatividade a cada 6 meses para aprendizado em diferentes áreas.',
    location: 'Campinas/SP'
  },
  {
    role: 'Coordenador de Operações',
    description: 'Gerenciamento de equipes de monitoramento, otimização de processos e treinamento de novos colaboradores. Rotatividade estratégica entre turnos para experiência completa.',
    location: 'Campinas/SP'
  }
];

const Jobs = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', vaga: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vaga) {
      alert('Por favor, selecione uma vaga ou banco de talentos.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Usar FormData para suportar envio de arquivo
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('vaga', form.vaga);
      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await fetch('/send_cv.php', {
        method: 'POST',
        body: formData, // fetch autoconfigura os headers de multipart/form-data
      });

      if (response.ok) {
        alert('Currículo enviado com sucesso!');
        setForm({ name: '', email: '', phone: '', vaga: '' });
        setCvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        alert('Erro ao enviar o currículo. Verifique sua conexão ou tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <PageHero title="TRABALHE CONOSCO" subtitle="Faça parte do time que revoluciona a segurança eletrônica e portaria remota" />

      {/* Banco de Talentos - Cards */}
      <section className="relative z-10 bg-secondary/10 px-6 pt-24 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-foreground">
            Banco de Talentos
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {talentPoolJobs.map((job) => (
              <div key={job.role} className="flex flex-col bg-card rounded-xl p-8 border border-border/20 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">{job.role}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                  {job.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <MapPin className="h-4 w-4 mr-1.5" />
                  {job.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Envie seu Currículo - Formulário */}
      <section className="relative z-10 bg-background px-6 py-16 pb-32">
        <div className="mx-auto max-w-2xl bg-card rounded-2xl border border-border/20 p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Envie seu Currículo
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Mesmo que não encontre uma vaga no momento, cadastre seu currículo em nosso banco de talentos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              required
              className="w-full rounded-md border border-border/40 bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />
            
            <input
              type="email"
              placeholder="Seu e-mail"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              className="w-full rounded-md border border-border/40 bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />

            <input
              type="text"
              placeholder="(99) 99999-9999"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              required
              className="w-full rounded-md border border-border/40 bg-background px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
            />

            <select
              value={form.vaga}
              onChange={e => setForm(p => ({ ...p, vaga: e.target.value }))}
              required
              className="w-full rounded-md border border-border/40 bg-background px-4 py-3 font-body text-sm text-muted-foreground outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30 appearance-none"
            >
              <option value="" disabled>Selecione a vaga ou banco de talentos</option>
              <option value="Banco de Talentos Geral">Banco de Talentos Geral</option>
              {talentPoolJobs.map(job => (
                <option key={job.role} value={job.role}>{job.role}</option>
              ))}
            </select>

            <div className="flex items-center w-full rounded-md border border-border/40 bg-background px-3 py-2 font-body text-sm text-muted-foreground transition-colors focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30">
              <input
                type="file"
                ref={fileInputRef}
                onChange={e => setCvFile(e.target.files ? e.target.files[0] : null)}
                accept=".pdf,.doc,.docx"
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>

            <Button variant="hero" size="lg" type="submit" disabled={isSubmitting} className="mt-4 w-full py-6 text-base shadow-md">
              {isSubmitting ? 'Enviando...' : 'Enviar Currículo'}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Jobs;
