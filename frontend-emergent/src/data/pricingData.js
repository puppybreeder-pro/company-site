export const PRICING = {
  monthly: {
    price: 79,
    period: 'month',
    displayPrice: '$79',
    note: 'or $790/year (save 2 months)',
  },
  yearly: {
    price: 790,
    period: 'year',
    displayPrice: '$790',
    note: 'equals $65.83/month',
  },
  setupFee: 150,
};

export const planFeatures = [
  'Hosted, branded website with custom design',
  'Intuitive admin dashboard',
  'Puppy listings with status management',
  'Parent dog profiles with pedigrees',
  'Online adoption applications & contact forms',
  'AI-powered puppy descriptions',
  'Photo galleries with cloud storage & compression',
  'YouTube video embeds',
  'Health certification displays',
  'Testimonial system',
  'Breeder-specific FAQ section',
  'Mobile-responsive design',
  'SSL certificate & domain migration',
  'Fully managed hosting',
  '1 free design change per month',
  'Email support',
];

export const addOns = [
  { name: 'Calendly Scheduling Integration', price: '+$10/mo' },
  { name: 'Google Analytics with Breed Tracking', price: '+$15/mo' },
  { name: 'Printable Online Contracts', price: '+$15/mo' },
];

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
    monthly: { price: '$79/mo', note: '+ $150 setup • fully managed' },
    yearly: { price: '$790/yr', note: '+ $150 setup • fully managed' },
    highlighted: true,
  },
];