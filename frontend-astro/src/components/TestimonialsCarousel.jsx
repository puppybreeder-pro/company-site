import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsCarousel = ({ testimonials }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, index) => (
            <div key={index} className="flex-none w-full px-4">
              <div className="p-8 md:p-10 bg-card rounded-xl border shadow">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={`${t.author} testimonial headshot`}
                      className="w-12 h-12 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary text-lg">
                        {t.author.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background hover:shadow-md transition-all"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background hover:shadow-md transition-all"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-primary w-8'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};