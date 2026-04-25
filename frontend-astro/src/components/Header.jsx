import { useState } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useScrollDetection } from '../hooks/useScrollDetection';
import { scrollToSection, scrollToTop } from '../utils/scrollTo';
import { navItems } from '../data/navigationData';
import { BRAND_NAME, BRAND_SUFFIX } from '../constants';

export const Header = () => {
  const isScrolled = useScrollDetection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-2xl">🐾</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">
              {BRAND_NAME}<span className="text-accent">{BRAND_SUFFIX}</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="cursor-pointer text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              variant="default"
              size="lg"
              onClick={() => scrollToSection('cta')}
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container-custom py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="cursor-pointer text-left text-base font-medium text-foreground/80 hover:text-primary py-2 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="default"
              size="lg"
              onClick={() => handleNavClick('cta')}
              className="w-full"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};