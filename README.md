# jareds.codes

Source for my portfolio site. It is a single-page React app: a landing page, a
Work index, and a case study per project.

Live at [jareds.codes](https://jareds.codes). The site sends `noindex` on every
route by design, so it is meant to be visited from a link rather than found in
search.

## Stack

React 19 and React Router 7, built with Vite. Tailwind CSS v4 for styling, with
the palette and spacing defined as `@theme` tokens in `src/index.css` and a dark
mode driven by a `.dark` class on `<html>`. Animation is Motion for React,
wrapped in four primitives so reveals and transitions stay consistent.

## Running it

```bash
npm install
npm run dev      # vite dev server on :5173
npm run build    # production build to dist/
npm run preview  # serve the built output
npm run lint     # eslint
```

## Layout

```
src/
  App.jsx              routing, header, footer, page transitions
  data/projects.js     every project: copy, tech, links, case study sections
  pages/               one component per route
  components/motion/   FadeIn, Stagger, AnimatedPage, AnimatedCard
  components/work/     project cards, case study nav, media lightbox
  lib/                 shared class strings and animation tokens
public/
  images/              case study screenshots
  notebooks/           the executed plane crash analysis notebook
```

## Adding or editing a project

`src/data/projects.js` is the single source of truth. Each entry carries its own
copy, tech list, action buttons and case study sections, and the Home page, the
Work index and the case study route all read from it. Two rules the file relies
on:

- `repo` stays `null` unless the repository is public. The UI only renders a
  GitHub button when `repo` is set, and falls back to `repoNote` otherwise.
- A deep-link action's `to` is `/work/<slug>#<id>`, and `<id>` has to match a
  `caseStudy.sections[].id` on the same project.

## Deployment

Vercel. `vercel.json` rewrites every path to `index.html` so client-side routes
survive a hard load, and sets the `X-Robots-Tag` header that matches the
`noindex` meta tags.
