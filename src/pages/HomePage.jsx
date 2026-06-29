import Hero from '@/components/sections/Hero';
import FeaturedEvents from '@/components/sections/FeaturedEvents';
import About from '@/components/sections/About';
import Founder from '@/components/sections/Founder';
import LegendaryGuests from '@/components/sections/LegendaryGuests';
import QuoteOfDay from '@/components/sections/QuoteOfDay';
import Testimonials from '@/components/sections/Testimonials';
import Sponsors from '@/components/sections/Sponsors';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedEvents />
      <About />
      <QuoteOfDay />
      <Founder />
      <LegendaryGuests />
      <Testimonials />
      <Sponsors />
      <Newsletter />
    </main>
  );
}
