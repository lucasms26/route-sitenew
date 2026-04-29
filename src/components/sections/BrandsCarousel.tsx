import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import AstraZeneca from '@/assets/brands/astrazeneca.png';
import GrupoBimbo from '@/assets/brands/bimbo.png';
import DHL from '@/assets/brands/dhl.png';
import Nike from '@/assets/brands/nike.png';
import PEG from '@/assets/brands/peg.png';
import PepsiCo from '@/assets/brands/pepsico.png';
import PPG from '@/assets/brands/ppg.png';
import venturus from '@/assets/brands/venturus.png';
import AdubosReal from '@/assets/brands/adubosreal.png';
import Apple from '@/assets/brands/apple.png';
import Deheu from '@/assets/brands/deheu.png';
import Crane from '@/assets/brands/crane.png';
import DPWorld from '@/assets/brands/dpword.png';
import Unimed from '@/assets/brands/unimed.png';
import Yusen from '@/assets/brands/yusen.png';

const brands = [
  { name: 'AstraZeneca', logo: AstraZeneca },
  { name: 'Grupo Bimbo', logo: GrupoBimbo },
  { name: 'DHL Express', logo: DHL },
  { name: 'Nike', logo: Nike },
  { name: 'P&G', logo: PEG },
  { name: 'PepsiCo', logo: PepsiCo },
  { name: 'PPG', logo: PPG },
  { name: 'Venturus', logo: venturus },
  { name: 'Adubos Real', logo: AdubosReal },
  { name: 'Apple', logo: Apple },
  { name: 'De Heus', logo: Deheu },
  { name: 'Crane', logo: Crane },
  { name: 'DP World', logo: DPWorld },
  { name: 'Unimed', logo: Unimed },
  { name: 'Yusen Logistics', logo: Yusen },
];

export default function BrandsCarousel() {
  return (
    <section className="relative z-10 bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary text-glow md:text-4xl">
            Grandes marcas que confiam em nós
          </h2>
          <div className="mx-auto h-1 w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>

        {/* Carrossel */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1.5,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full relative py-4"
        >
          {/* Sombras laterais para dar profundidade ao sumiço das logos */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <CarouselContent className="flex ml-0">
            {brands.map((brand) => (
              <CarouselItem
                key={brand.name}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="flex h-32 items-center justify-center rounded-lg border border-border/50 bg-card/30 p-2 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Decoração inferior */}
        <div className="mt-16 flex justify-center">
          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
