import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { offerFaqData } from '../../data/offerFaqData';

export const OfferFAQ = () => {
  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Questions? Good. Here Are the Answers.
            </h2>
            <p className="text-lg text-muted-foreground">
              Honest answers — including who this isn&rsquo;t for.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {offerFaqData.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};