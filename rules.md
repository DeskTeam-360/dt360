Frontend Development Rules

1. Tech Stack

Framework: Next.js (App Router)  
Language: TypeScript (`.ts` / `.tsx`) — current codebase  
Styling: Tailwind CSS v4 + `styles/globals.css`  
Architecture: Component-based (NOT CMS-driven)

2. Core Principles

2.1 Frontend-Driven UI  
All layouts and UI are controlled in Next.js  
WordPress serves only as a data provider (API), not a layout engine  

2.2 Reusability First  
Components must be reusable  
Avoid duplication across pages  

2.3 Separation of Concerns  
UI (`components/`) is separated from data (`data/`) and site constants (`config/`).  
No API logic directly in presentation components — fetch/map data in services or Server Components / loaders when needed  

3. Folder Structure

Application code lives at the **repository root** next to `public/` and config files (this repo **does not** use a `src/` folder). Import alias **`@/*`** maps to **`./*`** (see `tsconfig.json`).

```
app/                          # App Router — routes, root layout, metadata routes
  layout.tsx
  page.tsx
  manifest.ts
  robots.ts
  sitemap.ts
  opengraph-image.tsx
  …                             # other Next.js conventions (favicon, icons, etc.)

components/
  layout/
    Navbar.tsx
    Footer.tsx
    DeskTeamLogo.tsx
    NavDropdown.tsx
  shared/
    Container.tsx
    Button.tsx
    Heading.tsx
  pages/
    {page-name}/
      Hero.tsx
      CTA.tsx
      …
  seo/
    OrganizationJsonLd.tsx

config/
  site.ts

data/
  home.tsx
  nav.tsx

lib/
  utils.tsx

styles/
  globals.css
```

**Outside this tree (repo root siblings):**  
**`public/`** — static assets. **`public/images/`** — all site images (logo, favicon copies, hero art, team photos, dummies). Use **`SafeImage`** (`components/shared/SafeImage.tsx`) where a broken file should show **“Image not found”**.  
**Tooling** — `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `package.json`, `.github/`, `rules.md`, `.env.example`, etc.

4. Component Rules

4.1 Component Types  

**Layout components** (`components/layout/`) — used from `app/layout.tsx`  
**Shared components** (`components/shared/`) — reusable UI, no page-specific business logic  
**Page sections** (`components/pages/{page-name}/`)  
**SEO** (`components/seo/`) — JSON-LD and similar  

4.2 Naming — descriptive names (Hero.tsx, TeamMembers.tsx); avoid Section1.tsx  

4.3 Rules — one primary component per file; props minimal and clear  

5. Routing

App Router under **`app/`** — e.g. `app/about/page.tsx`, `app/services/page.tsx`, optional `app/[slug]/page.tsx`  

6. Styling

Global tokens: **`styles/globals.css`** — prefer classes/utilities over heavy inline styles  

7. Do’s & Don’ts

✅ Separate `data/` and `components/`; keep brand/SEO defaults in `config/`; static files in **`public/`**  
❌ Don’t put large copy in components (use `data/` or CMS); don’t put public assets under `app/` or `components/`  

8. Content must same with screenshot

8.1 image file

all image stored at /public/images/ if you no have or not found the image please create dummy image with dummy name and preview as image not found.

8.2 text

must be same with screenshot