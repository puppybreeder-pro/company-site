import { Card } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { ShieldCheck } from 'lucide-react';

export const EthicalCommitment = () => {
  return (
    <section
      id="ethical-commitment"
      className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 bg-background"
      data-testid="ethical-commitment-section"
    >
      <div className="container-custom">
        <Card
          className="max-w-4xl mx-auto bg-card border-2 border-primary/20 shadow-lg overflow-hidden"
          data-testid="ethical-commitment-card"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ethics" className="border-b-0">
              <AccordionTrigger
                className="px-8 md:px-12 py-6 hover:no-underline [&[data-state=open]>div]:text-primary"
                data-testid="ethical-commitment-toggle"
              >
                <div className="flex items-center gap-4 text-foreground transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" strokeWidth={2.25} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-normal leading-tight text-left">
                    Our Ethical Commitment
                    <span className="ml-3 text-sm md:text-base text-muted-foreground italic align-middle" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
                      (click to read)
                    </span>
                  </h3>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-8 md:px-12 pb-8">
                <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-foreground/85 font-medium">
                  <p>
                    The <em>global illegal puppy trade</em> has devastating consequences for animal
                    welfare, consumers, and society—research, including{' '}
                    <a
                      href="https://www.gov.scot/publications/scoping-research-sourcing-pet-dogs-illegal-importation-puppy-farms-2016/pages/10/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-bold hover:underline"
                      data-testid="scottish-gov-link"
                    >
                      findings from the Scottish Government
                    </a>
                    , confirms that irresponsible and illegal puppy
                    trafficking undermines the wellbeing of dogs and the public alike.{' '}
                    <span className="text-accent font-bold">PuppyBreeder.PRO</span> exists to combat this crisis by exclusively serving
                    licensed, professional breeders who prioritize animal welfare and
                    ethical practices.
                  </p>

                  <blockquote
                    className="border-l-4 border-accent bg-accent/5 pl-5 pr-4 py-4 my-2 rounded-r-md"
                    data-testid="scottish-gov-quote"
                  >
                    <p className="italic text-foreground text-sm sm:text-base leading-relaxed font-medium">
                      "Irresponsible and illegal puppy trade has a variety of negative impacts related to welfare and wellbeing of dogs, people and society."
                    </p>
                    <footer className="text-xs text-muted-foreground mt-2">
                      — Scottish Government Research (2017)
                    </footer>
                  </blockquote>

                  <p>
                    We promise to uphold integrity at every step: every{' '}
                    <span className="text-accent font-bold">PuppyBreeder.PRO</span> website carries a <span className="text-primary font-bold">Compliance Badge</span> signaling adherence to our ethical
                    standards, breeders are required to maintain full documentation
                    including health clearances, genetic testing, and pedigree records, and
                    our commitment doesn't end at launch—we maintain ongoing communication
                    and monitoring to ensure continued compliance. If you ever suspect
                    illegal or unethical breeding activity, you can confidentially report it
                    to{' '}
                    <a
                      href="mailto:report@puppybreeder.pro"
                      className="text-primary font-bold hover:underline"
                      data-testid="report-email-link"
                    >
                      report@puppybreeder.pro
                    </a>
                    , because protecting dogs and the families who love them is the
                    foundation of everything we build.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </section>
  );
};