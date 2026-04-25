import React from 'react';
import { Card } from './ui/card';

/**
 * Single site card in the Showroom grid.
 * Wraps a faux browser chrome + screenshot + kennel metadata in a link
 * that opens the site in a new tab.
 */
export const SiteShowcaseCard = ({ site }) => (
  <a
    href={`https://${site.url}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Open ${site.kennel} website in a new tab`}
    data-testid={`site-showcase-${site.url}`}
    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
  >
    <Card className="overflow-hidden group hover-lift bg-card cursor-pointer">
      {/* Faux browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-salmon" />
        <span className="w-2.5 h-2.5 rounded-full bg-mediumpurple" />
        <span className="w-2.5 h-2.5 rounded-full bg-darkseagreen" />
        <span className="ml-3 text-[10px] text-muted-foreground font-mono truncate">
          {site.url}
        </span>
      </div>

      <img
        src={site.image}
        alt={`${site.kennel} website preview`}
        className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div className="p-5 border-t border-border">
        <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
          {site.kennel}
        </h4>
        <p className="text-sm text-muted-foreground">
          {site.breed} <span className="text-foreground/40 mx-1">•</span> {site.location}
        </p>
      </div>
    </Card>
  </a>
);
