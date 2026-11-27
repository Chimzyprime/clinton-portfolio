# Clinton Chimaroke — portfolio

Dark Swiss editorial portfolio with a muted gold accent, Manrope headings and Inter body text, a cinematic portrait hero, a floating glass navbar, and a warm light theme toggle in the footer.
Next.js (App Router) · TypeScript · Tailwind CSS. No runtime dependencies beyond React and Next.

## Edit your content

Everything you will want to change is in **`src/data/site.ts`**: name, services, work, book, toolkit, about, links.
Layout code in `src/components/` only renders what that file contains.

### Add an image to a project

1. Put the file in `public/work/` (for example `public/work/talorify.jpg`).
2. In `src/data/site.ts`, add to that project:

   ```ts
   image: { src: "/work/talorify.jpg", alt: "Talorify logo on a cream background", width: 1600, height: 1000 },
   ```

   `width` and `height` must be the file's real pixel size. They let the browser reserve the space, which keeps layout shift at zero.

### Add a project link or the book link

Set `href` on the project, or uncomment `href` on `book`. The link only appears when it is set.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Notes

- Portrait: `public/portrait.webp` is a transparent cutout. To replace it, export a new cutout and update `portrait` in `src/data/site.ts` with its real width and height. The blue and red light behind it is CSS (`.portrait-light` in `globals.css`), not part of the image.
- Fonts are bundled in `src/fonts`, so builds never download fonts.
- Theme: dark by default; the choice is saved in `localStorage` and applied before first paint (no flash).
- Colours and contrast ratios are documented at the top of `src/app/globals.css`.
- Deploys on Vercel: push to `main`.
