import { ArrowRight } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { scrollToSection } from '../utils/scrollTo';
import { steps } from '../data/howItWorksData';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Site Ready in 2 Days, Not Months - Here's How
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No complicated onboarding. No endless back-and-forth. Just a straightforward path to your professional website.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="relative p-8 hover-lift bg-card h-full">
                <div className="absolute top-4 right-4 text-4xl font-bold text-muted/20">
                  {step.number}
                </div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="default"
            size="xl"
            onClick={() => scrollToSection('cta')}
            className="group"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};