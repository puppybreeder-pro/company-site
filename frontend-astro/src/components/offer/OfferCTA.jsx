import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { CALENDLY_URL, BRAND_EMAIL } from "../../constants";

const nextSteps = [
  "We'll learn about your breeding program and what matters most to you",
  "Together we'll plan a site that families can find and trust",
  "Your site goes live — usually within 72 hours",
  "Quick training, then you're in control — no developer needed",
];

export const OfferCTA = () => {
  return (
    <section
      id="cta"
      className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your dogs deserve families who can find you easily. Let&rsquo;s make
            that happen.
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Join professional breeders who&rsquo;ve stopped fighting their
            website and started focusing on what matters.
          </p>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="default" size="xl" className="text-lg px-10 group">
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free 30-Minute Call
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Button>
          </a>

          <p className="text-sm text-muted-foreground mt-4">
            No credit card. No commitment. Just a conversation.
          </p>

          <Card className="mt-12 p-8 bg-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              What Happens Next
            </h3>
            <ul className="space-y-4 text-left max-w-lg mx-auto">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span className="text-foreground/80">{step}</span>
                </li>
              ))}
            </ul>
          </Card>

          <p className="mt-8 text-sm text-foreground/80">
            <span className="font-semibold text-foreground">
              Have questions first?
            </span>
            <br />
            Email me directly at{" "}
            <a
              href={`mailto:${BRAND_EMAIL}`}
              className="text-primary hover:underline"
            >
              {BRAND_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
