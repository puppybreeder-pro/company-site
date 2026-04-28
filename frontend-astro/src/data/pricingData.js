export const PRICING = {
  monthly: {
    price: 99,
    period: 'month',
    displayPrice: '$99',
    note: 'or $990/year (save $198)',
  },
  yearly: {
    price: 990,
    period: 'year',
    displayPrice: '$990',
    note: 'equals $82.50/month',
  },
  setupFee: 349,
};

export const planFeatures = [
  'Hosted, branded website with breed-specific design',
  'Intuitive admin dashboard — update puppies in minutes',
  'Puppy listings with one-click status management',
  'Parent dog profiles with pedigrees & health clearances',
  'Pre-qualified adoption applications',
  'AI-powered puppy descriptions — one click, written for you',
  'Photo galleries with one-click upload & cloud storage',
  'YouTube video embeds',
  'Health certification displays, front and center',
  'Testimonial system',
  'Breeder-specific FAQ section',
  'Mobile-responsive design',
  'SSL certificate & domain migration',
  'Fully managed hosting',
  'Calendly scheduling integration — included',
  'Google Analytics with breed tracking — included',
  'Printable online contracts — included',
  '1 free design change per month',
  'Email support',
];

export const addOns = [];

export const pricingComparison = [
  {
    name: 'DIY Builder',
    monthly: { price: '$30-50/mo', note: '+ your time + addons' },
    yearly: { price: '$360-600/yr', note: '+ your time + addons' },
    highlighted: false,
  },
  {
    name: 'Custom Developer',
    monthly: { price: '$3,000-8,000', note: "+ can't update yourself" },
    yearly: { price: '$3,000-8,000', note: "+ can't update yourself" },
    highlighted: false,
  },
  {
    name: 'PuppyBreeder.PRO',
    monthly: { price: '$99/mo', note: '+ $349 setup • fully managed' },
    yearly: { price: '$990/yr', note: '+ $349 setup • fully managed' },
    highlighted: true,
  },
];