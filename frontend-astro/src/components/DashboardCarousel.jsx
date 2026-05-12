import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { dashboardSlides } from '../data/featuresData';

export const DashboardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + dashboardSlides.length) % dashboardSlides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <Card className="relative bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden pb-12">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
          style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
          aria-live="polite"
        >
          {dashboardSlides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              isActive={index === currentSlide}
            />
          ))}
        </div>
      </div>

      <NavigationButton direction="prev" onClick={prevSlide} ariaLabel="Previous slide" />
      <NavigationButton direction="next" onClick={nextSlide} ariaLabel="Next slide" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {dashboardSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              index === currentSlide
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
};

const Slide = ({ slide, isActive }) => (
  <div
    className="shrink-0 grow-0 basis-full"
    aria-hidden={!isActive}
  >
    <div className="p-8">
      <div className="w-fit max-w-full mx-auto rounded-lg overflow-hidden shadow-xl mb-6">
        <img
          src={slide.image}
          alt={slide.imageAlt ?? slide.title}
          className="block h-auto max-w-full w-auto border-0"
          style={
            slide.imageInsetClipPx != null
              ? { clipPath: `inset(${slide.imageInsetClipPx}px)` }
              : undefined
          }
          loading="lazy"
          draggable="false"
        />
      </div>
      <div className="text-center">
        <h4 className="text-xl font-bold text-foreground mb-2">{slide.title}</h4>
        <p className="text-muted-foreground max-w-2xl mx-auto">{slide.description}</p>
      </div>
    </div>
  </div>
);

const NavigationButton = ({ direction, onClick, ariaLabel }) => {
  const positionClass = direction === 'prev' ? 'left-4' : 'right-4';
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors`}
      aria-label={ariaLabel}
    >
      <Icon className="w-5 h-5 text-foreground" />
    </button>
  );
};