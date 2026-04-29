import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

const googleReviewsMockData = [
  {
    name: "Marcielli Couto Merces",
    time: "7 meses atrás",
    content: "Empresa maravilhosa e de uma execução de serviço espetacular, com a Route temos experiências e valores incríveis. Pq, tão importante quando a qualidade devemos levar em conta toda a nossa experiência do começo até a finalização, esta empresa entrega tudo do começo ao fim. A Route não nos deixa a desejar em nada! Indico de olhos fechados.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Marcielli+Couto+Merces&background=random"
  },
  {
    name: "Uriel Garcia",
    time: "um mês atrás",
    content: "Uma das melhores empresas de segurança eletrônica e serviços para condomínios em Campinas! Atendimento diferenciado. Recomendo A Route Security",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Uriel+Garcia&background=random"
  },
  {
    name: "André Brolo",
    time: "um mês atrás",
    content: "A Route Security é uma empresa que se destaca pela eficiência, profissionalismo e tecnologia de ponta em segurança eletrônica. Sua equipe qualificada entrega soluções confiáveis e sob medida, sempre com agilidade e atenção aos detalhes. Com compromisso real com a proteção de pessoas e patrimônios, a Route Security se consolida como uma parceira de confiança e excelência. Sempre indico para os meus clientes e amigos.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Andre+Brolo&background=random"
  },
  {
    name: "Santiago Ferreira de Melo",
    time: "7 meses atrás",
    content: "Empresa que tem valores e princípios em prioridade. Uma empresa séria e de um trabalho deslumbrante. Route SECURITY indico de olhos fechados.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Santiago+Ferreira+de+Melo&background=random"
  },
  {
    name: "Osmair Santos",
    time: "3 meses atrás",
    content: "Empresa de altíssimo nível, com uma execução de serviço exemplar. Como parceiro fornecedor da Route SECURITY, sempre vivenciei experiências marcadas por profissionalismo, seriedade e sólidos valores. Tanto a qualidade quanto todo o processo — do início à finalização — são conduzidos com excelência. A equipe é altamente competente, comprometida e entrega resultados consistentes, tornando a Route SECURITY uma escolha segura e confiável. É uma empresa que realmente se destaca no mercado e vale muito a pena contratar. Excelentes para fazer negócios.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Osmair+Santos&background=random"
  }
];

// Helper to generate stars
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
    />
  ));
};

export default function GoogleReviews() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="relative z-10 bg-background px-6 py-20 border-b border-border/20 overflow-hidden w-full">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-display font-bold tracking-tight text-primary text-glow">
          O que dizem sobre a nossa proteção.
        </h2>

        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 font-bold text-xl">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#DB4437]">o</span>
                <span className="text-[#F4B400]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#0F9D58]">l</span>
                <span className="text-[#DB4437]">e</span>
                <span className="ml-1 text-slate-800">Reviews</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">4.9</span>
              <div className="flex gap-1">{renderStars(5)}</div>
              <span className="text-sm text-slate-500">(316)</span>
            </div>
          </div>

          <a href="https://www.google.com/search?sca_esv=df3bf9aa0d357044&hl=pt-BR&sxsrf=ANbL-n7qOwzm60pzKib_pyrlQnwTG4Z_3w:1773776958214&si=AL3DRZFIhG6pAqfNLal55wUTwygCG0fClF3UxiOmgw9Hq7nbWfj8qUrh4obJvfeLN3_6X2Uu9sI5zoYUPMZWGs7RTC7-4sbxhmnwZAfwyQQKq_7WRbjhhEBpQhMOwi5MdYVnlEsdUcOSsHW6UI6e6XhoC0om22RThDgSg3BZyn7RglU82Yawgao%3D&q=Route+Security+Monitoramento+24hs+Coment%C3%A1rios&sa=X&ved=2ahUKEwiA_YSM2qeTAxVngpUCHd7TIOMQ0bkNegQIJxAH&biw=1536&bih=695&dpr=1.25" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm px-6 h-10">
              Review us on Google
            </Button>
          </a>
        </div>

        <div className="relative w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {googleReviewsMockData.map((review, i) => (
                <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-slate-400/70 hover:bg-slate-500 text-white border-0 h-10 w-10 flex items-center justify-center rounded-full shadow-md backdrop-blur-sm" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-slate-400/70 hover:bg-slate-500 text-white border-0 h-10 w-10 flex items-center justify-center rounded-full shadow-md backdrop-blur-sm" />
            </div>
          </Carousel>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  current === index + 1 ? "bg-slate-700" : "bg-slate-300"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center border-t border-slate-100 pt-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <svg height="16" viewBox="0 0 24 24" width="16" className="fill-current"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
            Free Google Reviews Widget
          </div>
        </div>
      </div>

      <style>{`
        .review-card-content {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .review-card-content.expanded {
            display: block;
            -webkit-line-clamp: unset;
        }
      `}</style>
    </section>
  );
}

// Subcomponente para manter o estado individual "ler mais"
function ReviewCard({ review }: { review: typeof googleReviewsMockData[0] }) {
  const [expanded, setExpanded] = useState(false);

  // Decide if we should show the "Ler mais" button based on exact string length
  const isLong = review.content.length > 150;

  return (
    <div className="h-full">
      <div className={`rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col transition-all duration-300 ${expanded ? 'h-auto min-h-[320px]' : 'h-[320px] max-h-[320px]'}`}>
        <div className="mb-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 relative">
            <img
              src={review.avatar}
              alt={review.name}
              className="h-10 w-10 shrink-0 rounded-full bg-slate-100 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm h-5 w-5 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill="#4285F4" />
                <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" fill="#34A853" />
                <path d="M12.19 19.27C15.19 19.27 18.36 17.64 18.69 13.83L21.35 11.1C21.35 11.1 21.5 11.76 21.5 12.91C21.5 18.33 17.6 22 12.25 22C6.16 22 2.03 17.05 2.03 12C2.03 11.18 2.14 10.39 2.34 9.64L6.2 12.83C6.7 17.2 9.68 19.27 12.19 19.27Z" fill="#FBBC05" />
                <path d="M12.1 2C16.56 2 19 4.72 19 4.72L17.1 6.7C17.1 6.7 15.29 4.73 12.2 4.73C8.2 4.73 5 7.9 5 12C5 12.78 5.14 13.52 5.38 14.21L2.34 16.89C2.14 16.14 2.03 15.35 2.03 14.5C2.03 6.8 6.42 2 12.1 2Z" fill="#EA4335" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-semibold text-sm line-clamp-1">{review.name}</h4>
                <svg className="w-3 h-3 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" /></svg>
              </div>
              <span className="text-xs text-slate-500">{review.time}</span>
            </div>
          </div>
        </div>

        <div className="mb-3 flex gap-[2px] shrink-0">
          {renderStars(review.rating)}
        </div>

        <div className={`overflow-y-auto pr-1 text-sm leading-relaxed text-slate-700 ${expanded ? '' : 'flex-1'} custom-scrollbar`}>
          <p className={`review-card-content ${expanded ? 'expanded' : ''}`}>
            {review.content}
          </p>
        </div>

        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="text-blue-500 font-medium text-xs mt-3 text-left hover:text-blue-600 transition-colors shrink-0"
          >
            Ler mais
          </button>
        )}
        {isLong && expanded && (
          <button
            onClick={() => setExpanded(false)}
            className="text-slate-400 font-medium text-xs mt-3 text-left hover:text-slate-600 transition-colors shrink-0"
          >
            Mostrar menos
          </button>
        )}
      </div>
    </div>
  );
}
