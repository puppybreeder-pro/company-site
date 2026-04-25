import { Card } from './ui/card';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonialsData';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Breeders Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From frustrated to proud—hear from breeders who made the switch.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="p-8 md:p-10 hover-lift bg-card"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6">
                "{t.content}"
              </blockquote>

              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary text-lg">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};