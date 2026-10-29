# Universal Dental Clinic — landing page

A static, dependency-free landing page (HTML, CSS, vanilla JS). No build step.

Scroll effects (word reveal, horizontal visit section) are progressive enhancements:
they switch off for visitors who prefer reduced motion, and the page reads fully without JavaScript.

## Structure

```
udc-landing/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── favicon.svg
│   └── images/        # WebP versions of the supplied photos
├── README.md
└── .gitignore
```

## Run locally

```bash
cd udc-landing
python3 -m http.server 8000
# open http://localhost:8000
```

## Before going live — content to supply

Placeholders are shown on the page in dashed blue `[brackets]`, or marked with `data-todo`.

- [ ] Branch address (mall name, unit number) — `#find-us`
- [ ] Opening hours — `#find-us`
- [ ] Phone number — the `tel:` link and the Phone row
- [ ] Facebook page URL — the "Message us on Facebook" button
- [ ] Confirm the treatments list matches what the clinic offers — `#services`
- [ ] Absolute `og:image` URL once the domain is known
- [ ] Higher-resolution photos (current sources are 251–506 px wide and soften on high-density screens)

The third Google review (John De Leon) is commented out in `index.html` because it names
"Urban Smiles Parqal branch". Re-enable it only if it genuinely belongs to this business.

## Deploy to GitHub Pages (free)

1. Push this folder to a GitHub repository.
2. Repository **Settings → Pages**.
3. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<username>.github.io/<repo>/` within a minute or two.
