import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import DAhua from '@/assets/homologados/ahua.png';
import Bosch from '@/assets/homologados/bosch.png';
import Cisco from '@/assets/homologados/cisco.png';
import ControlID from '@/assets/homologados/controlid.png';
import Digifort from '@/assets/homologados/digifort.png';
import Furukawa from '@/assets/homologados/furukawa.png';
import Hik from '@/assets/homologados/hik.png';
import Intelbras from '@/assets/homologados/intelbras.png';
import Jfll from '@/assets/homologados/jfll.png';
import Khomp from '@/assets/homologados/khomp.png';
import Moni from '@/assets/homologados/moni.png';
import Seventh from '@/assets/homologados/seventh.png';
import Vivotek from '@/assets/homologados/vivotek.png';
import MK from '@/assets/homologados/MK.png';

const homologados = [
  { name: 'DAhua', logo: DAhua },
  { name: 'Bosch', logo: Bosch },
  { name: 'Cisco', logo: Cisco },
  { name: 'Control ID', logo: ControlID },
  { name: 'Digifort', logo: Digifort },
  { name: 'Furukawa', logo: Furukawa },
  { name: 'Hikvision', logo: Hik },
  { name: 'Intelbras', logo: Intelbras },
  { name: 'Jfll', logo: Jfll },
  { name: 'Khomp', logo: Khomp },
  { name: 'Moni', logo: Moni },
  { name: 'Seventh', logo: Seventh },
  { name: 'Vivotek', logo: Vivotek },
  { name: 'MK', logo: MK },
];

export default function HomologadosCarousel() {
  return (
    <section className="relative z-10 bg-background px-6 py-24 border-t border-border/10">
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-primary text-glow md:text-4xl">
            Empresa homologada pela ...
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
            {homologados.map((brand) => (
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
