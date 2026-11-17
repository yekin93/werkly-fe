# Approved homepage implementation

The composition follows `design/reference-homepage.png.png`: full-width navy header and hero, golden house outline, city backdrop, transparent tradesperson, stacked workflow cards, overlapping service categories, connected four-step cards, and the regional/benefits/business row. The old cream-and-green homepage has been replaced.

## Structure

- `src/features/home/components/home-page.tsx`: section composition.
- `marketplace-hero.tsx`: hero layers, benefits, workflow cards and reduced-motion-aware entrance/floating animation.
- `service-categories.tsx`: repository-backed categories, preselected request links and keyboard-accessible horizontal scroller.
- `process-steps.tsx`: connected four-step cards.
- `regional-overview.tsx`: city photo, honest benefits and business registration.
- `home-faq.tsx`: accessible single-open accordion.
- `src/components/layout`: shared brand, sticky responsive header, footer and marketplace navigation.
- `src/styles/foundation.css`: navy/yellow tokens and shared chrome.
- `src/styles/home.css`: reference-led responsive composition, including 390px layouts.
- `src/styles/workspace.css`: retained request, dashboard, offer and auth styles.

## Preserved marketplace behavior

The request wizard, customer/business demo identities, dashboards, public business profiles, offer submission/comparison/acceptance, completion and privacy checks remain behind the existing repository interfaces and TanStack Query hooks. The catalogue adds `repair` and `other` while retaining all existing category IDs. Every featured category is validated by the request schema.

No verified-business badges, ratings, counts or response-time guarantees are copied from the reference. The headline's “schnell” refers to the simple request process, not a guaranteed business response time. Although the hero introduces the surrounding region, the form and FAQ clearly state that only configured postal codes are active.

## Visual differences and QA limits

The tradesperson is an original AI-generated cut-out rather than the exact person in the supplied reference. The city photograph is an alternate licensed view of the same landmarks. The lower business card reuses the tradesperson asset. Copy is adapted to the product's actual demo capabilities and privacy rules. At narrower desktop/tablet widths the workflow cards reorganize to avoid overlap; at mobile widths they stack over the photographic composition.

The requested 1536px and 390px rendered screenshots require a working browser automation host. Do not treat build success, HTTP checks or the reference image itself as proof that those screenshots or a rendered visual comparison were performed.

## Generated cut-out

Built-in imagegen was used, with the final project image at `public/assets/tradesperson-720.png`. Alpha is preserved. The original output remains in the generation tool's default output folder.

Generation prompt: “A single friendly professional male tradesperson aged about 35, short dark hair, neatly trimmed beard, dark navy baseball cap, blue and red plaid work shirt, charcoal navy work overalls with subtle golden yellow suspender details. Facing the camera with arms comfortably crossed and a confident natural smile. Frame head to upper thighs, entire head, shoulders and elbows within image. Authentic European craftsman, realistic anatomy, warm photographic lighting, editorial commercial photography. Genuine transparent background; no scene, logos, text, watermark or UI.”

The generated person is decorative, not a claim about an actual registered business. The public image-credits route makes that distinction explicit.
