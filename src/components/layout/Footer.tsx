import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/"><img src={logo} alt="Route Security" className="h-8 w-auto" /></Link>
            <p className="mt-4 font-body text-sm text-muted-foreground leading-relaxed">
              Tecnologia premium em segurança eletrônica. Monitoramento inteligente e soluções integradas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-display text-xs tracking-widest text-foreground/70">NAVEGAÇÃO</h4>
            <div className="flex flex-col gap-2">
              {[
                { url: '/about', label: 'Sobre' },
                { url: '/solutions', label: 'Soluções' },
                { url: '/partner', label: 'Seja um Parceiro' },
                { url: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
                { url: '/contact', label: 'Contatos' },
              ].map(({ url, label }) => (
                <Link key={url} to={url} className="font-body text-sm text-muted-foreground transition-colors hover:text-primary">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-xs tracking-widest text-foreground/70">CONTATO</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> (19) 3227-5481</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> contato@routesecurity.com.br</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Campinas, SP</div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="mb-4 font-display text-xs tracking-widest text-foreground/70">CERTIFICAÇÕES</h4>
            <div>
              <img 
                src="/ROUTE_SECURITY_BR_Portuguese_2026_Certification_Badge.png" 
                alt="Certificação Great Place to Work 2026" 
                className="w-32 h-auto grayscale transition-all duration-300 hover:grayscale-0 contrast-125"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-6 text-center">
          <p className="font-body text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Route Security. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
