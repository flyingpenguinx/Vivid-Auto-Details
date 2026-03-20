# Cielonline Template + Vivid Handoff

This file is the instruction package for the AI working in the original Vivid website repo or any duplicate of it.

## Objective

Keep the Vivid website visually premium and recognizably Vivid while making it easier to manage from Cielonline.

The goal is not to redesign the site into a generic builder layout.

The goal is to:

1. Preserve the current Vivid visual direction.
2. Match Vivid spacing, sizing, hierarchy, and tone when creating any new sections.
3. Let Cielonline manage copy, services, booking links, and quote submissions.
4. Keep the static site usable as a direct client-facing website.
5. Make future client sites easier to launch from reusable Vivid-inspired templates inside Cielonline.

## Current Cielonline Side Capabilities

The Cielonline repo now supports:

1. Multiple reusable website templates in the Website tab block editor.
2. Vivid-inspired starter layouts that can be applied to a hosted Cielonline site.
3. Inline editing of text inside blocks.
4. Color editing for major content blocks.
5. Drag-to-reorder sections in the block editor.
6. External-site bridge integration through bridge.js.
7. Managed content fields for the existing Vivid static layout.
8. Hosted booking links and CRM inquiry capture.

Important implementation detail:

The template system is block-based. It does not require a separate templates table. Templates are just starter arrays of site_blocks that users can edit and save.

## What The Other AI Must Preserve

When editing the Vivid website code, do not flatten the design into a generic template.

Preserve these characteristics:

1. Dark luxury aesthetic.
2. High-contrast hero treatment.
3. Spacious section padding.
4. Clear premium-service typography hierarchy.
5. Strong CTA placement.
6. Service-first and results-first messaging.
7. Existing page structure unless there is a functional reason to change it.

If new sections are added, they should feel like they belong to the current Vivid site, not like a new brand.

## Hosting Direction

The target hosting direction is now Vercel, not GitHub Pages.

Why:

1. Better embedded preview reliability inside Cielonline.
2. Better control over headers and future preview deployments.
3. Cleaner long-term onboarding for more client sites.

When moving the Vivid site, the other AI should preserve the same public-facing design and only make the minimum platform-related adjustments needed for the Vercel deployment.

## What The Other AI Should Do In The Vivid Repo

### 1. Keep the static site structure intact

Work from the files in website-copy/ as the baseline.

Do not migrate the site to React or another framework.

The Vivid site should remain:

1. Static HTML
2. Shared CSS
3. Shared JavaScript

### 2. Preserve and expand bridge integration

If any page is missing the Cielonline bridge script, add it using the same pattern already used in the updated website-copy files.

Use the bridge script to support:

1. data-ciel-field for text managed by Cielonline
2. data-ciel-link="booking" for booking CTAs
3. data-ciel="contact" for quote or inquiry forms
4. data-ciel="services" for service rendering when appropriate

Do not remove existing markup classes unless necessary. Add bridge attributes on top of the current structure.

### 3. Keep Vivid as the design baseline for new reusable sections

If the other AI needs to create new pages or sections, use these rules:

1. Match the spacing rhythm from the existing home, services, and detail pages.
2. Keep section widths and content density close to the current site.
3. Use the same premium tone of voice.
4. Avoid adding busy UI controls or dashboard-looking layouts on the public site.
5. Favor strong hero sections, proof sections, services, gallery, and concise quote forms.

### 4. Quote form behavior

The preferred path is now Cielonline-managed inquiry capture, not the old Google Apps Script flow.

The AI should:

1. Keep the form visually identical or extremely close.
2. Use Cielonline bridge attributes so the bridge can submit inquiries.
3. Avoid introducing a second competing submission flow unless explicitly required.
4. Normalize field names to the bridge-friendly set when possible:
   - firstName
   - lastName
   - name
   - email
   - phone
   - vehicle
   - preferred_date
   - message

### 5. Booking links

Booking buttons should point to the hosted Cielonline booking route using the site slug.

Pattern:

```html
<a href="https://cielonline.com/book/YOUR_SITE_SLUG" data-ciel-link="booking">Book Now</a>
```

### 5b. Payment links

If the site needs CTA buttons for deposits, invoices, or balances, prefer bridge-managed payment links instead of hardcoding them.

Pattern:

```html
<a href="#" data-ciel-link="payment">Pay Now</a>
```

This allows Cielonline to inject the active payment URL without modifying the public site layout.

### 6. Service rendering

If services need to be Cielonline-managed on the static Vivid site, prefer adding bridge targets instead of hardcoding duplicate pricing in multiple places.

Pattern:

```html
<div data-ciel="services" data-show-price="true" data-show-duration="true"></div>
```

Only use this where the existing visual design can still be preserved.

### 7. Managed content fields

For text that needs admin control without code edits, add data-ciel-field attributes to existing elements instead of changing the layout.

Examples:

```html
<h1 data-ciel-field="home.hero.title_line_1">Your ride.</h1>
<p data-ciel-field="home.hero.description">Premium detailing copy lives here.</p>
```

## If The Other AI Needs To Build A New Vivid-Like Page

Tell it to use this section order by default:

1. Hero
2. Primary CTA
3. Trust / differentiators
4. Services or packages
5. Gallery or proof
6. Quote / booking form

This matches the direction of the new Cielonline starter templates.

## What Not To Do

1. Do not replace the Vivid brand language with a generic SaaS layout.
2. Do not move the site into a different tech stack unless explicitly asked.
3. Do not remove animations and reveal behavior unless they cause a real bug.
4. Do not build a separate duplicate CRM flow in the static repo.
5. Do not hardcode content that should now be controlled from Cielonline.
6. Do not build a payment flow that uses the platform owner as the merchant of record for the client business.

## Payment Architecture Rule

For real customer payments, use Stripe Connect Standard.

This means:

1. The client business connects its own Stripe account.
2. The client receives the money directly.
3. Cielonline generates checkout links and stores payment records in the CRM.
4. The public Vivid site should only surface booking or payment links already managed by Cielonline.

## Recommended Prompt For The Other AI

Use this prompt in the other VS Code tab:

```text
Work from the files inside ai-agent-handoff/website-copy as the source of truth for the Vivid website. Follow ai-agent-handoff/CIELONLINE_TEMPLATE_HANDOFF.md exactly. Preserve the current Vivid design language, spacing, hierarchy, and premium tone. Do not redesign the site into a generic template.

Your job is to keep the static Vivid website visually intact while making it compatible with Cielonline-managed content, services, booking links, and inquiry capture. Prefer adding bridge attributes and minimal structural edits over rewriting sections. If you create any new page or section, it must feel like it belongs to the current Vivid site and match the Vivid-inspired starter templates now used in Cielonline.
```

## Final Alignment Rule

If there is a choice between:

1. preserving Vivid visual quality
2. using a faster but generic implementation

choose preserving Vivid visual quality.