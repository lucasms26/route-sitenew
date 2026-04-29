import React from 'react';

const GreatPlaceToWork = () => {
  return (
    <section className="relative z-10 py-24 bg-background border-t border-border/10">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-12 px-6 w-full">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          {/* Logo badge image inserted EXACTLY without altering its intrinsic dimensions as requested. */}
          <img 
            src="/ROUTE_SECURITY_BR_Portuguese_2026_Certification_Badge.png" 
            alt="Great Place to Work 2026 Certification Badge" 
          />
        </div>
        <div className="md:w-1/2 text-left">
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground">
            Uma das <span className="text-primary text-glow">Melhores Empresas</span> para Trabalhar
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            É com muito orgulho que anunciamos nossa certificação pelo <strong>Great Place to Work®</strong>. 
            Esse reconhecimento comprova nosso compromisso em construir um ambiente de trabalho excepcional, baseado na confiança, na inovação e no respeito.
            <br className="mb-4" />
            Nossa equipe é o nosso maior diferencial, e um excelente lugar para se trabalhar se traduz diretamente na excelência das soluções que entregamos aos nossos clientes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GreatPlaceToWork;
