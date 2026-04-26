import { Button } from '../../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CountUp } from '../CountUp';
import { CALENDLY_URL } from '../../constants';

export const OfferHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1667386452776-b46d4bc435e7"
          alt="Professional dog breeder with dogs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="pt-20 pb-12 lg:pt-0 lg:pb-0">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Built exclusively for dog breeders</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
              Spending Your Weekend
              <span className="block text-primary mt-2">Updating Your Website?</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up max-w-xl">
              You shouldn't need a web developer to add a puppy photo. Every week without a professional site is another week families can't find you. With PuppyBreeder.PRO, you don't have to choose between your dogs and your website.
            </p>

            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="xl" className="group text-base">
                Book a Free 30-Minute Call
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </a>

            <p className="text-sm text-muted-foreground mt-3 animate-fade-in-up">
              No credit card. No hard sell. Just a conversation.
            </p>

            <div className="mt-12 pt-8 border-t border-border/50 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">Trusted by professional breeders</p>
              <div className="flex flex-wrap items-center gap-6">
                <TrustStat end={48} suffix="hrs" label="Average Launch" />
                <TrustStat end={28} suffix="+" label="Breed Designs" />
                <TrustStat end={100} suffix="%" label="Managed Hosting" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustStat = ({ end, suffix, label }) => (
  <div className="flex flex-col">
    <CountUp end={end} suffix={suffix} className="text-2xl font-bold text-foreground" />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);