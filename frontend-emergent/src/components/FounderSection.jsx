import React from 'react';
import { Card } from './ui/card';

export const FounderSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Photo */}
              <div className="md:col-span-1">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzcwNDI0ODh8MA&ixlib=rb-4.1.0&q=85"
                  alt="Steven Olsen, Founder"
                  className="w-full aspect-square object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  From a Fellow Dog Lover
                </h3>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Hi, I'm Steven Olsen. I've been a lifelong dog lover and a web developer for over 20 years. I built PuppyBreeder.PRO because I kept seeing the same problem: amazing breeders with amateur websites.
                  </p>
                  <p>
                    You shouldn't have to choose between a professional site and one you can actually manage. Generic website builders don't understand puppy statuses, lineage tracking, or breeding-specific needs. And custom development is expensive and leaves you dependent on a developer.
                  </p>
                  <p>
                    PuppyBreeder.PRO is different. It's purpose-built for breeders, fully managed, and designed so you stay in control. I work personally with every breeder from launch through any changes you need.
                  </p>
                  <p className="font-semibold text-foreground">
                    Your breeding program deserves better. Let's build something you're proud of.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground">Steven Olsen</p>
                  <p className="text-sm text-muted-foreground">Founder, PuppyBreeder.PRO</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};