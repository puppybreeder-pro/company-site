import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Card } from '../../ui/card';
import { ShieldAlert, Send } from 'lucide-react';
import { useFormSubmission } from '../../hooks/useFormSubmission';
import { reportFormConfig } from '../../data/reportData';

const INITIAL_VALUES = {
  name: '',
  email: '',
  breeder_name: '',
  breeder_website: '',
  description: '',
  source: reportFormConfig.source,
  botcheck: '',
};

export const ReportForm = () => {
  const { values, submitting, handleChange, handleSubmit } = useFormSubmission(
    INITIAL_VALUES,
    reportFormConfig.successMessage,
    reportFormConfig.errorMessage,
    { subject: reportFormConfig.subject, fromNameField: 'name' }
  );

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 bg-card border border-border shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                File a Report
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={!!values.botcheck}
                  onChange={handleChange}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Your Name *" htmlFor="report-name">
                  <Input
                    id="report-name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full"
                  />
                </FormField>
                <FormField label="Your Email *" htmlFor="report-email">
                  <Input
                    id="report-email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Breeder Name *" htmlFor="breeder-name">
                  <Input
                    id="breeder-name"
                    name="breeder_name"
                    type="text"
                    required
                    value={values.breeder_name}
                    onChange={handleChange}
                    placeholder="Breeder or Kennel name"
                    className="w-full"
                  />
                </FormField>
                <FormField label="Breeder Website (Optional)" htmlFor="breeder-website">
                  <Input
                    id="breeder-website"
                    name="breeder_website"
                    type="url"
                    value={values.breeder_website}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full"
                  />
                </FormField>
              </div>

              <FormField label="Description of Violation *" htmlFor="report-description">
                <Textarea
                  id="report-description"
                  name="description"
                  required
                  value={values.description}
                  onChange={handleChange}
                  placeholder="Please describe the unethical breeding practices you've observed. Include any relevant details such as dates, locations, or specific concerns."
                  className="w-full min-h-[160px]"
                />
              </FormField>

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full group"
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Submit Report'}
                {!submitting && (
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your report is confidential. We review every submission and take
                appropriate action.
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, htmlFor, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-foreground mb-2"
    >
      {label}
    </label>
    {children}
  </div>
);