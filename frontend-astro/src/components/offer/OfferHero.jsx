import { useState, useEffect, useRef } from "react";
import { Button } from "../../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CountUp } from "../CountUp";
import { CALENDLY_URL } from "../../constants";

const PLATFORMS = ["Squarespace", "Wix", "GoDaddy", "Wordpress"];
const TYPING_MS = 90;
const DELETING_MS = 45;
const PAUSE_TYPED_MS = 4200;
const PAUSE_DELETED_MS = 400;

export const OfferHero = () => {
  const [platformIdx, setPlatformIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState("typing");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const word = PLATFORMS[platformIdx];

    if (phase === "typing") {
      if (charIdx < word.length) {
        timeoutRef.current = setTimeout(
          () => setCharIdx((i) => i + 1),
          TYPING_MS,
        );
      } else {
        timeoutRef.current = setTimeout(
          () => setPhase("deleting"),
          PAUSE_TYPED_MS,
        );
      }
    } else if (phase === "deleting") {
      if (charIdx > 0) {
        timeoutRef.current = setTimeout(
          () => setCharIdx((i) => i - 1),
          DELETING_MS,
        );
      } else {
        timeoutRef.current = setTimeout(() => {
          setPlatformIdx((i) => (i + 1) % PLATFORMS.length);
          setPhase("typing");
        }, PAUSE_DELETED_MS);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, charIdx, platformIdx]);

  const displayed = PLATFORMS[platformIdx].slice(0, charIdx);
  const showCursor = phase === "typing" || phase === "deleting";

  return (
    <section className="relative min-h-screen flex items-start overflow-hidden pt-24 md:pt-28 lg:pt-32">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Professional dog breeder with dogs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="pb-12 lg:pb-20">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                <b>Websites</b> built exclusively for dog breeders
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
              Spending Your Weekend
              <span className="block text-primary mt-2">
                Updating Your <br />
                <span className="inline-block italic">
                  {displayed}
                  <span
                    className="inline-block w-[3px] ml-[2px] align-text-center bg-gray-500 animate-blink"
                    style={{
                      height: "0.85em",
                      opacity: showCursor ? 1 : 0,
                    }}
                  />
                </span>{" "}
                Website?
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up max-w-xl">
              Grrr. You shouldn't need a web developer to add a puppy photo.
              Every week without a professional site is another week families
              can't find you. With{" "}
              <span className="text-primary font-semibold">
                PuppyBreeder.PRO
              </span>
              , you don't have to choose between your dogs and your website.
            </p>

            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="xl" className="group text-base">
                Book a Free 30-Minute Call
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Button>
            </a>

            <p className="text-sm text-muted-foreground mt-3 animate-fade-in-up">
              No credit card. No hard sell. Just a conversation.
            </p>

            <div className="mt-12 pt-8 border-t border-border/50 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by professional breeders — 15-day risk-free trial, no
                lock-in contracts
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <TrustStat end={72} suffix="hrs" label="Average Launch" />
                <TrustStat end={28} suffix="+" label="Custom Breed Designs" />
                <TrustStat end={100} suffix="%" label="Managed Hosting" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustStat = ({ end, suffix, label }) => (
  <div className="flex flex-col">
    <CountUp
      end={end}
      suffix={suffix}
      className="text-2xl font-bold text-foreground"
    />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);
