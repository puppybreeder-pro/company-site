import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Calendar, Mail, ArrowRight, Phone } from 'lucide-react';
import { CALENDLY_URL } from '../constants';
import { useFormSubmission } from '../hooks/useFormSubmission';

const CONTACT_INITIAL = { name: '', email: '', breed: '', message: '', botcheck: '' };
const CALLBACK_INITIAL = { name: '', phone: '', callback_time: '', email: 'callback@noreply.puppybreeder.pro', source: 'callback-request', botcheck: '' };

export const CTA = () => {
  const { values: formData, submitting: isSubmitting, handleChange, handleSubmit } = useFormSubmission(
    CONTACT_INITIAL,
    {
      title: "Thank you! We'll be in touch within 24 hours.",
      description: 'Check your email for our onboarding guide.',
    },
    { title: 'Unable to send message', description: 'Something went wrong. Please try again.' },
    { subject: 'New contact — Puppy Breeder Pro website', fromNameField: 'name' }
  );

  return (
    <section id="cta" className="section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Ready to Upgrade Your Online Presence?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join professional breeders who've made the switch. Let's build something you're proud of.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={!!formData.botcheck} onChange={handleChange} />
                </div>
                <FormField label="Your Name *" htmlFor="name">
                  <Input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="John Smith" className="w-full" />
                </FormField>
                <FormField label="Email Address *" htmlFor="email">
                  <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full" />
                </FormField>
                <FormField label="What Breed(s) Do You Breed? *" htmlFor="breed">
                  <Input id="breed" name="breed" type="text" required value={formData.breed} onChange={handleChange} placeholder="Golden Retrievers" className="w-full" />
                </FormField>
                <FormField label="Tell Us About Your Needs (Optional)" htmlFor="message">
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="I currently use Squarespace and I'm looking for something easier..." className="w-full min-h-[100px]" />
                </FormField>

                <Button type="submit" variant="default" size="lg" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Start Your Journey'}
                  {!isSubmitting && (
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                We'll respond within 24 hours. Usually much faster.
              </p>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-card">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-foreground mb-2">Or Schedule a Demo</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Prefer to talk first? Book a 15-minute demo call to see if we're the right fit.
                    </p>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" data-testid="schedule-demo-btn">
                      <Button variant="outline" className="w-full">
                        Schedule Demo Call
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              <CallbackRequestCard />

              <Card className="p-6 bg-primary/5 border-primary/20">
                <h4 className="text-2xl font-bold text-foreground mb-4">What Happens Next?</h4>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>We'll review your needs and send you a personalized onboarding guide</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Schedule a quick 15-minute call to finalize your design preferences</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>We build your site—usually live within 48 hours</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Quick training session, then you're in control</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-card">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <span className="font-semibold text-foreground">Have questions first?</span>
                  <br />
                  Email me directly at{' '}
                  <a href="mailto:steven@puppybreeder.pro" className="text-primary hover:underline">
                    steven@puppybreeder.pro
                  </a>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, htmlFor, children }) => (
  <div>
    <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground mb-2">
      {label}
    </label>
    {children}
  </div>
);

const CallbackRequestCard = () => {
  const { values: form, submitting, handleChange, handleSubmit } = useFormSubmission(
    CALLBACK_INITIAL,
    {
      title: "Got it! We'll call you back.",
      description: 'Steven personally returns every callback within one business day.',
    },
    { title: 'Could not submit callback request', description: 'Please try again.' },
    { subject: 'New callback request — Puppy Breeder Pro website', fromNameField: 'name' }
  );

  return (
    <Card className="p-6 bg-card" data-testid="callback-request-card">
      <div className="flex gap-4">
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Phone className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-bold text-foreground mb-2">Prefer a Phone Call?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Drop your number and the best time to reach you—Steven will call you back, no form-filling required.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div style={{ display: 'none' }} aria-hidden="true">
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" checked={!!form.botcheck} onChange={handleChange} />
            </div>
            <Input
              type="text"
              required
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              data-testid="callback-name"
            />
            <Input
              type="tel"
              required
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              data-testid="callback-phone"
            />
            <Input
              type="text"
              name="callback_time"
              placeholder="Best time to call (e.g., weekday afternoons)"
              value={form.callback_time}
              onChange={handleChange}
              data-testid="callback-time"
            />
            <Button
              type="submit"
              variant="outline"
              className="w-full"
              disabled={submitting}
              data-testid="callback-submit"
            >
              {submitting ? 'Sending…' : 'Request a Callback'}
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};