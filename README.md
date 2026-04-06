# Vivid Auto Details Website

Premium auto detailing website for Vivid Auto Details, serving Elk Grove and the Greater Sacramento area.

## 🚗 About

Vivid Auto Details offers professional car detailing services including:
- Exterior & Interior Detailing
- Ceramic Coating
- Paint Protection Film (PPF)
- Paint Correction
- Window Tinting
- Mobile Detailing Service

## 📁 Project Structure

```
vivid-website/
├── index.html              # Main homepage
├── gallery.html            # Photo gallery with Instagram feed
├── blog.html               # Blog listing page
├── blog-ceramic-vs-ppf.html        # Blog: Ceramic vs PPF
├── blog-ceramic-maintenance.html   # Blog: Ceramic maintenance guide
├── blog-sacramento-car-damage.html # Blog: Local car care tips
├── faqs.html               # Frequently Asked Questions
├── style.css               # All styles
├── script.js               # JavaScript functionality
└── images/                 # All website images
```

## 🚀 Deployment

### Vercel
1. Import the repository into Vercel as a static site
2. Keep the output as the repository root with no build command
3. Add the custom domain in Vercel and keep the existing `CNAME` aligned with the production domain
4. Redeploy after any HTML, CSS, image, or bridge configuration change

### GitHub
GitHub remains the source of truth for the codebase. Vercel should deploy directly from the default branch so content and bridge updates stay versioned in one place.

### Cielonline Bridge
The live site is wired for Cielonline bridge support:
- `bridge.js` is loaded on every page
- booking CTAs use `data-ciel-link="booking"`
- quote forms use dual submission: Google Apps Script plus `window.Cielonline.submitInquiry(...)`
- key editable text uses `data-ciel-field`

## 📞 Contact

- **Phone:** (916) 583-8532
- **Address:** 9918 Kent St Unit 3, Elk Grove, CA 95624
- **Hours:** Mon-Sat 9am-7pm
- **Instagram:** [@vivid.autodetails](https://www.instagram.com/vivid.autodetails/)
- **Yelp:** [Vivid Auto Details](https://www.yelp.com/biz/vivid-auto-details-elk-grove)
- **Book Online:** [cielonline.com/book/vivid-auto-details](https://cielonline.com/book/vivid-auto-details)

## 📝 License

© 2025 Vivid Auto Details. All rights reserved.
