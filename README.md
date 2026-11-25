# Aorta website

Marketing site for Aorta Breakline. Next.js (App Router), TypeScript, Tailwind CSS. Exports to static files.

## Run

Needs Node 22.18 or later.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # date and repo-URL logic
npm run typecheck
npm run build      # static site in out/
npm run preview    # serve out/
```

## Edit content

Everything you would normally change is in `content/`.

| File | What it holds |
| --- | --- |
| `site.ts` | URLs, emails, install and sign-in links, social links, navigation |
| `deadlines.ts` | Retirements: home strip, Radar, detail pages, sitemap, social images |
| `home.ts` | Hero, terminal, steps, parity report, FAQ |
| `pricing.ts` | Plans, comparison table, pricing FAQ |
| `security.ts`, `about.ts`, `legal.ts` | Those pages |
| `docs.ts`, `docs/*.mdx` | Docs sidebar order and pages |
| `blog/*.mdx` | Posts. Front matter: `title`, `description`, `author`, `date`, `draft` |
| `tokens.ts` | Colours, type scale, radius, spacing (shown at `/styleguide`) |

### Add a deadline

Add an entry to `content/deadlines.ts`. Set `verified: true` only after reading the date at `sourceUrl`; otherwise the site shows an "unverified" badge. Past dates are dimmed on the Radar and drop off the home strip. The hero pill in `home.ts` is written by hand, so update it when its date passes.

Day counts are computed in the browser from the visitor's clock. The HTML carries the count from build time until scripts run.

### Add a doc or post

Docs: add `content/docs/<slug>.mdx` and a line in `content/docs.ts`. Posts: add `content/blog/<slug>.mdx`. Posts with `draft: true` are marked, `noindex` and left out of the sitemap.

## Deploy to Vercel

1. Push the repository to GitHub and import it at vercel.com/new. The Next.js preset needs no changes.
2. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the real domain, such as `https://your-domain.com`. It drives canonical links, social images, the sitemap and structured data.
3. Deploy.

If GitHub Pages is still publishing this repository from `main`, turn it off: the repository root no longer contains a built page.

## Before launch

- [ ] Real domain, contact and security emails (`content/site.ts` uses `.example`)
- [ ] GitHub App install and sign-in URLs (both point to the install guide today)
- [ ] GitHub, X, LinkedIn and status links
- [ ] Founder name, photo and story (`content/about.ts`)
- [ ] Lawyer review of privacy and terms, and a retention period for account data
- [ ] Publish the `breakline` npm package, or change the `npx` commands (the current proof of concept is Python)
- [ ] Confirm which plan features include which (`content/pricing.ts` assumes Team includes Pro)

There are no customer logos, testimonials or usage numbers on the site. Add them only when they are real.

## Structure

`app/` routes, `components/` UI, `content/` data, `lib/` helpers, `public/brand/` logo files copied from `logo/`. `breakline/` is the product's own code and is not part of the website build.
