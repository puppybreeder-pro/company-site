/**
 * SHOWROOM DATA
 * ──────────────
 * Edit this list to add, remove, or update breeder websites in the Showroom grid.
 *
 * Each entry:
 *   kennel   → Display name shown below the screenshot (string)
 *   breed    → Breed(s) of dogs the kennel raises (string)
 *   location → City, State (string)
 *   url      → Domain only, no "https://". Used for the faux browser bar
 *              AND as the link target (opens in a new tab).
 *   image    → Screenshot to show. Two options:
 *                • Local: drop a file in /app/frontend/public/showroom/
 *                  and reference it as '/showroom/filename.jpg'
 *                • Remote: any full https:// URL
 *
 * See /app/frontend/public/showroom/README.md for the full workflow.
 */

export const showroomSites = [
  {
    kennel: 'Sunrise Golden Retrievers',
    breed: 'Golden Retrievers',
    location: 'Asheville, NC',
    url: 'sunrisegoldens.com',
    image: 'https://placehold.co/1200x750/f3f5f9/231f21?text=Sunrise+Golden+Retrievers&font=lora',
  },
  {
    kennel: 'Northwood Cavaliers',
    breed: 'Cavalier King Charles',
    location: 'Burlington, VT',
    url: 'northwoodcavaliers.com',
    image: 'https://placehold.co/1200x750/f0f0f0/231f21?text=Northwood+Cavaliers&font=lora',
  },
  {
    kennel: 'Silverpaw Australian Shepherds',
    breed: 'Australian Shepherds',
    location: 'Bend, OR',
    url: 'silverpawaussies.com',
    image: 'https://placehold.co/1200x750/dbc5ef/231f21?text=Silverpaw+Aussies&font=lora',
  },
  {
    kennel: 'Evergreen French Bulldogs',
    breed: 'French Bulldogs',
    location: 'Portland, OR',
    url: 'evergreenfrenchies.com',
    image: 'https://placehold.co/1200x750/f3f5f9/231f21?text=Evergreen+Frenchies&font=lora',
  },
];
