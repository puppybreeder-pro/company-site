import { X, Check } from 'lucide-react';
import { Card } from './ui/card';
import { problems, solutions } from '../data/problemSolutionData';

export const ProblemSolution = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We Get It. Website Builders Weren't Made for Breeders.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You're a professional breeder, not a web developer. Your time should be spent with your dogs, not debugging drag-and-drop layouts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-card border-2 border-destructive/20">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">The Old Way</h3>
            </div>
            <div className="flex justify-center lg:justify-start">
              <ul className="space-y-4 text-left">
                {problems.map((problem, index) => (
                  <li key={index} className="flex gap-3">
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="p-8 bg-card border-2 border-success">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">The PuppyBreeder.PRO Way</h3>
            </div>
            <div className="flex justify-center lg:justify-start">
              <ul className="space-y-4 text-left">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};