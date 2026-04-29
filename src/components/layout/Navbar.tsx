import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';

const navLinks = [
  { url: '/', label: 'Home' },
  { url: '/about', label: 'Sobre' },
  { url: '/solutions', label: 'Soluções' },
  { url: '/partner', label: 'Seja um Parceiro' },
  { url: '/contact', label: 'Contatos' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border/40' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Route Security" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ url, label }) => (
            <Link
              key={url}
              to={url}
              className={cn(
                'font-body text-sm md:text-base uppercase tracking-widest transition-colors duration-300',
                location.pathname === url
                  ? 'text-primary text-glow'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border/30 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map(({ url, label }) => (
              <Link
                key={url}
                to={url}
                className={cn(
                  'rounded-md px-4 py-3 font-body text-sm uppercase tracking-widest transition-colors',
                  location.pathname === url
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
