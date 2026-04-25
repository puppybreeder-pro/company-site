import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CountUp } from './CountUp';
import { CALENDLY_URL, TRUST_SIGNALS } from '../constants';
import { useFormSubmission } from '../hooks/useFormSubmission';

const HERO_FORM_INITIAL = { email: '', source: 'hero', botcheck: '' };

export const Hero = () => {
  const { values: email, submitting, handleChange, handleSubmit } = useFormSubmission(
    HERO_FORM_INITIAL,
    {
      title: "You're in!",
      description: "We'll reach out within 24 hours to set up your free 15-min demo.",
    },
    { title: 'Could not save your email', description: 'Something went wrong. Please try again.' },
    { subject: 'New lead — Puppy Breeder Pro website' }
  );

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
              Your Breeding Program Deserves a
              <span className="block text-primary mt-2">Professional Website</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up max-w-xl">
              Relax. Stop fighting with website builders. Get a beautiful site that you can actually manage — without any tech headaches. We're here to help you every 🐾.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl animate-fade-in-up"
              data-testid="hero-lead-form"
            >
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={!!email.botcheck} onChange={handleChange} />
              </div>
              <Input
                type="email"
                required
                name="email"
                value={email.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-label="Your email"
                className="h-14 px-4 text-base bg-background border-2 flex-1 min-w-0"
                data-testid="hero-email-input"
              />
              <Button
                type="submit"
                variant="default"
                size="xl"
                disabled={submitting}
                className="group flex-1 min-w-0 px-4 text-base"
                data-testid="hero-submit-btn"
              >
                {submitting ? 'Sending…' : 'Book Free Demo'}
                {!submitting && (
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform shrink-0" size={20} />
                )}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-3 animate-fade-in-up">
              Free 15-min demo. No credit card. No hard sell.
            </p>
            <p className="text-sm text-muted-foreground mt-1 animate-fade-in-up">
              Or{' '}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
                data-testid="hero-calendly-link"
              >
                book a time directly →
              </a>
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