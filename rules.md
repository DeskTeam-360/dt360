Frontend Development Rules
1. Tech Stack
Framework: Next.js (App Router)
Language: JavaScript (ES6+)
Styling: Global CSS / modular styling (extendable)
Architecture: Component-based (NOT CMS-driven)

2. Core Principles
2.1 Frontend-Driven UI
All layouts and UI are controlled in Next.js
WordPress serves only as a data provider (API), not a layout engine
2.2 Reusability First
Components must be reusable
Avoid duplication across pages
2.3 Separation of Concerns
UI (components) is separated from data (data/services)
No API logic directly in components

3. Folder Structure
Use the following structure as a standard:

4. Component Rules
4.1 Component Types
**Layout Components
Navbar
Footer
Used globally in app/layout.tsx
**Shared Components
Reusable components (Button, Container, etc.)
Do not contain page-specific logic
**Page Components
Specific to a particular page
Stored in components/pages/{page-name}/
4.2 Naming Convention
Use descriptive names:
✅ Hero.tsx
✅ FeatureList.tsx
❌ Section1.tsx, Section2.tsx
4.3 Rules
1 file = 1 component
No nested components within a single large file
Props must be clear and minimal

5. Routing Rules
Use the App Router (/app)
Each page has its own folder:
/about/page.tsx
/services/page.tsx
Dynamic route /[slug] only as a fallback (optional)

6. Styling Rules
Global styles in:
/styles/globals.css
Avoid excessive inline styles
Use class-based styling for scalability

7. Do’s & Don’ts
✅ Do
Use reusable components
Separate logic and UI
Use a consistent folder structure
❌ Don’t
Hardcode data in components
Copy and paste between pages
Create components without a clear purpose
Use non-descriptive naming conventions