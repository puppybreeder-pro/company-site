import { useState } from 'react';
import { scrollToSection } from '../utils/scrollTo';
import { X } from 'lucide-react';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-accent text-accent-foreground relative z-[100]">
      <div className="container-custom py-3">
        <div className="flex items-center justify-center gap-4 pr-8">
          <p className="text-sm md:text-base font-medium text-center">
            🎉 <span className="font-bold">Limited Offer:</span> First month 50% off for new breeders
            <button
              onClick={() => scrollToSection('cta')}
              className="ml-2 underline hover:no-underline font-semibold"
            >
              Get Started →
            </button>
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent-foreground/10 rounded transition-colors z-10"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};