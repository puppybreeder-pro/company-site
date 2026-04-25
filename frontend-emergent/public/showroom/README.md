# Showroom Screenshots

Drop website screenshot images for the Showroom section here.

## How to add a new site to the Showroom

1. **Save the screenshot** into this folder (`/app/frontend/public/showroom/`).
   - Recommended size: `1200 × 750` (or any 16:10 aspect ratio)
   - Format: `.jpg` / `.png` / `.webp` — keep file names kebab-case, no spaces
   - Example: `sunrise-goldens.jpg`

2. **Open `/app/frontend/src/data/showroomData.js`** and add (or edit) an entry:

   ```js
   {
     kennel: 'Sunrise Golden Retrievers',
     breed: 'Golden Retrievers',
     location: 'Asheville, NC',
     url: 'sunrisegoldens.com',         // no "https://" needed
     image: '/showroom/sunrise-goldens.jpg',
   },
   ```

3. **Save.** The Showroom grid updates automatically.

## Notes

- Files in `/public/` are served from the site root. An image saved as
  `/app/frontend/public/showroom/my-kennel.jpg` is referenced in code as
  `/showroom/my-kennel.jpg`.
- You can mix local screenshots and remote URLs (e.g., `placehold.co` placeholders)
  in the same list.
- The grid is responsive: 1 column on mobile, 2 columns on ≥640px.
