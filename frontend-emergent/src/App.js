import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Showroom } from './components/Showroom';
import { LeadMagnet } from './components/LeadMagnet';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FounderSection } from './components/FounderSection';
import { FAQ } from './components/FAQ';
import { EthicalCommitment } from './components/EthicalCommitment';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Reveal } from './components/Reveal';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        {/* Hero stays unwrapped — it's above the fold and has its own entrance animations */}
        <Hero />
        <Reveal><ProblemSolution /></Reveal>
        <Reveal><HowItWorks /></Reveal>
        <Reveal><Features /></Reveal>
        <Reveal><Showroom /></Reveal>
        <Reveal><LeadMagnet /></Reveal>
        <Reveal><Pricing /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><FounderSection /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><EthicalCommitment /></Reveal>
        <Reveal><CTA /></Reveal>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
