import { Heart } from 'lucide-react';
import { scrollToSection } from '../utils/scrollTo';
import { footerLinks, breeds } from '../data/footerData';
import { BRAND_NAME, BRAND_SUFFIX } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-primary/5 border-t border-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {BRAND_NAME}<span className="text-accent">{BRAND_SUFFIX}</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              The website platform built for dog breeders—and only dog breeders. Professional sites you can actually manage.
            </p>
            <p className="text-xs text-muted-foreground">
              Supporting 28+ breeds including:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {breeds.slice(0, 4).map((breed, index) => (
                <span key={index} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                  {breed}
                </span>
              ))}
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-medium">
                +24 more
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  {link.id ? (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PuppyBreeder.PRO. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span>for dog breeders</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};