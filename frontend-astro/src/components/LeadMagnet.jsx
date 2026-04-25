import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { useFormSubmission } from '../hooks/useFormSubmission';

const LEAD_MAGNET_INITIAL = { email: '', source: 'lead-magnet-pdf', botcheck: '' };

export const LeadMagnet = () => {
  const { values, submitting, handleChange, handleSubmit } = useFormSubmission(
    LEAD_MAGNET_INITIAL,
    {
      title: 'Sent! Check your inbox shortly.',
      description: "We'll email the guide within a few minutes.",
    },
    { title: 'Could not send the guide', description: 'Please try again.' },
    { subject: 'New lead magnet download — Puppy Breeder Pro website' }
  );

  return (
    <section
      id="lead-magnet"
      className="py-10 md:py-12 bg-pastel-purple/50"
      data-testid="lead-magnet-section"
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center max-w-3xl mx-auto">
          <div className="hidden md:flex w-20 h-20 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
            <FileText className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
              Free Guide · No Sales Pitch
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
              The 7 Must-Haves for a Professional Breeder Website
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              (and 3 red flags that quietly kill puppy inquiries). Built from years of working with licensed breeders. Yours free—just tell us where to send it.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
              data-testid="lead-magnet-form"
            >
              <div style={{ display: 'none' }} aria-hidden="true">
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={!!values.botcheck} onChange={handleChange} />
              </div>
              <Input
                type="email"
                required
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="your@email.com"
                aria-label="Your email"
                className="h-12 text-base bg-background border-2"
                data-testid="lead-magnet-email"
              />
              <Button
                type="submit"
                variant="default"
                size="lg"
                disabled={submitting}
                className="whitespace-nowrap"
                data-testid="lead-magnet-submit"
              >
                {submitting ? 'Sending…' : 'Send Me the PDF'}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              We hate spam too. One email, and you can unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};