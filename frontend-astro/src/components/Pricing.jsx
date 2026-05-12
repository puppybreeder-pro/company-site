import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { scrollToSection } from '../utils/scrollTo';
import { PRICING, planFeatures, addOns, pricingComparison } from '../data/pricingData';
import { faqData } from '../data/faqData';

const PRICING_FAQ_QUESTIONS = [
  'Can I cancel anytime?',
  'Do I need technical skills to manage my site?',
  'How long does it take to launch my site?',
  'Is hosting and security included?',
];
const pricingFaqs = PRICING_FAQ_QUESTIONS
  .map((q) => faqData.find((f) => f.question === q))
  .filter(Boolean);

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const currentPricing = PRICING[billingCycle];

  return (
    <section id="pricing" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No surprises. Just an honest price for a professional website.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BillingToggle
            billingCycle={billingCycle}
            onToggle={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          />

          <Card className="p-8 md:p-12 bg-card border-2 border-primary/30 shadow-xl">
            <PlanHeader pricing={currentPricing} billingCycle={billingCycle} />

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {planFeatures.map((feature, index) => (
                <FeatureItem key={index} feature={feature} />
              ))}
            </div>

            <AddOnsList addOns={addOns} />

            <Button
              variant="default"
              size="xl"
              onClick={() => scrollToSection('cta')}
              className="w-full"
            >
              Get Started Today
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Launch in 72 hours · Cancel anytime
            </p>

            <CommonQuestions />
          </Card>

          <PricingComparisonSection billingCycle={billingCycle} />
        </div>
      </div>
    </section>
  );
};

const BillingToggle = ({ billingCycle, onToggle }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
      Monthly
    </span>
    <button
      onClick={onToggle}
      className={`relative w-14 h-7 rounded-full border-2 transition-colors ${
        billingCycle === 'yearly'
          ? 'bg-accent border-accent'
          : 'bg-background border-accent/50'
      }`}
      aria-label="Toggle billing cycle"
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transition-transform ${
          billingCycle === 'yearly' ? 'bg-background translate-x-7' : 'bg-accent translate-x-0'
        }`}
      />
    </button>
    <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
      Yearly
    </span>
  </div>
);

const PlanHeader = ({ pricing, billingCycle }) => (
  <div className="text-center mb-8">
    <Badge variant="outline" className="mb-4 text-accent border-accent">
      Simple Pricing
    </Badge>
    <h3 className="text-3xl font-bold text-foreground mb-2">"Gold Standard" Plan</h3>
    <div className="flex items-baseline justify-center gap-2 mb-2">
      <span className="text-5xl font-bold text-accent">
        {pricing.displayPrice}
      </span>
      <span className="text-xl text-muted-foreground">
        /{pricing.period}
      </span>
    </div>
    <div className="mb-3 flex justify-center h-6">
      {billingCycle === 'yearly' ? (
        <p className="text-sm font-medium text-accent">(save $198)</p>
      ) : (
        <p className="text-sm font-medium text-muted-foreground">
          or $990/year <span className="text-accent">(save $198)</span>
        </p>
      )}
    </div>
    <div className="inline-flex items-center gap-2 bg-[#FA8072] border border-[#E56F63] rounded-full px-4 py-2 shadow-md">
      <span className="text-sm font-semibold text-white">
        + ${PRICING.setupFee} one-time design & setup fee
      </span>
    </div>
  </div>
);

const FeatureItem = ({ feature }) => (
  <div className="flex gap-3 items-start">
    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
      <Check className="w-3 h-3 text-success" />
    </div>
    <span className="text-foreground/90">{feature}</span>
  </div>
);

const AddOnsList = ({ addOns }) => (
  <div className="border-t border-border pt-6 mb-8">
    <h4 className="font-semibold text-foreground mb-4">Optional Add-ons:</h4>
    <div className="space-y-2">
      {addOns.map((addon, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-foreground/80">{addon.name}</span>
          <span className="font-semibold text-primary">{addon.price}</span>
        </div>
      ))}
    </div>
  </div>
);

const CommonQuestions = () => (
  <div className="mt-8 pt-8 border-t border-border" data-testid="pricing-common-questions">
    <h4 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
      Common Questions
    </h4>
    <Accordion type="single" collapsible className="w-full">
      {pricingFaqs.map((faq, idx) => (
        <AccordionItem key={idx} value={`pricing-faq-${idx}`}>
          <AccordionTrigger className="text-left text-foreground hover:text-primary text-base font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const PricingComparisonSection = ({ billingCycle }) => (
  <div className="mt-12 text-center">
    <p className="text-sm text-muted-foreground mb-4">Compare the real costs:</p>
    <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
      {pricingComparison.map((option, index) => {
        const { price, note } = option[billingCycle];
        return (
          <Card
            key={index}
            className={`p-4 ${
              option.highlighted
                ? 'comparison-highlight-card'
                : 'bg-background'
            }`}
            data-testid={`comparison-card-${option.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <p className={`text-xs mb-1 ${
              option.highlighted ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {option.name}
            </p>
            <p className="text-lg font-bold text-foreground">{price}</p>
            <p className={`text-xs mt-1 ${
              option.highlighted ? 'text-primary' : 'text-destructive'
            }`}>
              {note}
            </p>
          </Card>
        );
      })}
    </div>
  </div>
);