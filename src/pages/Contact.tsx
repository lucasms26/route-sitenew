import PageHero from '@/components/shared/PageHero';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

const contactInfo = [
  { icon: Phone, label: 'Telefone', value: '(19) 3227-5481' },
  { icon: Mail, label: 'E-mail', value: 'contato@routesecurity.com.br' },
  { icon: MapPin, label: 'Endereço', value: 'Campinas, SP - Brasil' },
  { icon: Clock, label: 'Horário', value: 'Seg-Sex: 08h - 18h | Monitoramento 24/7' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Erro ao enviar a mensagem. Verifique sua conexão ou tente novamente mais tarde.');
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
      <PageHero title="CONTATOS" subtitle="Entre em contato e proteja o que é importante" />

      <section className="relative z-10 bg-background px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
          {/* Formulário */}
          <div>
            <h2 className="mb-8 font-display text-xl font-bold text-primary text-glow">
              Envie uma Mensagem
            </h2>
            <form method="POST" action="/send_email.php" onSubmit={handleSubmit} className="flex flex-col gap-4">
              {(['name', 'email', 'phone'] as const).map(field => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={{ name: 'Seu Nome', email: 'Seu E-mail', phone: 'Telefone' }[field]}
                  value={form[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  required={field !== 'phone'}
                  className="rounded-md border border-border/40 bg-card/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                />
              ))}
              <textarea
                placeholder="Sua Mensagem"
                rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                required
                className="rounded-md border border-border/40 bg-card/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30 resize-none"
              />
              <Button variant="hero" size="lg" type="submit" disabled={isSubmitting} className="mt-2 text-sm">
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="mb-8 font-display text-xl font-bold text-primary text-glow">
              Informações
            </h2>
            <div className="flex flex-col gap-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 rounded-lg border border-border/30 bg-card/50 p-5 backdrop-blur-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-wider text-foreground/70">{label}</p>
                    <p className="mt-1 font-body text-sm text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
