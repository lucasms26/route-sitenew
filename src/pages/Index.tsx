import HeroSection from '@/components/hero/HeroSection';
import BrandsCarousel from '@/components/sections/BrandsCarousel';
import GoogleReviews from '@/components/sections/GoogleReviews';
import GreatPlaceToWork from '@/components/sections/GreatPlaceToWork';

const Index = () => {
  return (
    <main>
      <HeroSection />
      <BrandsCarousel />
      {/* Spacer para demonstrar o efeito de scroll parallax */}
      <section className="relative z-10 bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <div className="md:w-1/2 text-left">
              <h2 className="mb-6 font-display text-4xl font-bold text-primary text-glow">
                Sobre a Route Security
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Atuamos no segmento de segurança eletrônica oferecendo soluções inovadoras. Investimos continuamente em desenvolvimento de software próprio para garantir excelência e eficiência aos nossos clientes.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <img 
                src="/fachada.webp" 
                alt="Fachada Route Security" 
                className="w-full max-w-md rounded-xl object-cover shadow-2xl ring-1 ring-border/50"
              />
            </div>
          </div>
      </section>
      <GreatPlaceToWork />
      <GoogleReviews />
    </main>
  );
};

export default Index;
