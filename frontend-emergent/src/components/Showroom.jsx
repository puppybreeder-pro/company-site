import React from 'react';
import { SiteShowcaseCard } from './SiteShowcaseCard';
import { showroomSites } from '../data/showroomData';

export const Showroom = () => {
  return (
    <section
      id="showroom"
      className="section-padding bg-background"
      data-testid="live-sites-showcase"
    >
      <div className="container-custom">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Showroom
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Recent websites built on PuppyBreeder.PRO — each custom-designed to reflect the breed, the kennel, and the families they serve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {showroomSites.map((site) => (
            <SiteShowcaseCard key={site.url} site={site} />
          ))}
        </div>
      </div>
    </section>
  );
};
