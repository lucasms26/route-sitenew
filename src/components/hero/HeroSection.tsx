
import ParticleField from './ParticleField';
import HeroOverlay from './HeroOverlay';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <ParticleField />
      <HeroOverlay />
    </section>
  );
}
