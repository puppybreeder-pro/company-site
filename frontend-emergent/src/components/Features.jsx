import { Card } from './ui/card';
import { publicFeatures, adminFeatures } from '../data/featuresData';
import { DashboardCarousel } from './DashboardCarousel';

export const Features = () => {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything You Need, Nothing You Don't
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for dog breeders. Not e-commerce. Not blogging. Just breeding.
          </p>
        </div>

        {/* Public Features */}
        <FeatureSection
          title="What Families See"
          subtitle="Professional, trustworthy, easy to navigate"
          features={publicFeatures}
          iconColor="success"
        />

        {/* Admin Features */}
        <div className="mt-16">
          <FeatureSection
            title="What You Control"
            subtitle="Simple dashboard, powerful features"
            features={adminFeatures}
            iconColor="primary"
          />
        </div>

        {/* Dashboard Carousel */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Your Command Center
          </h3>
          <DashboardCarousel />
        </div>
      </div>
    </section>
  );
};

const FeatureSection = ({ title, subtitle, features, iconColor }) => {
  const bgColorClass = iconColor === 'success' ? 'bg-success/10' : 'bg-primary/10';
  const textColorClass = iconColor === 'success' ? 'text-success' : 'text-primary';

  return (
    <>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 hover-lift flex flex-col">
              <div className={`w-12 h-12 ${bgColorClass} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${textColorClass}`} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>
    </>
  );
};