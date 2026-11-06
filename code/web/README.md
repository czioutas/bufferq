# bufferq — web

Astro port of the `code/Landing page-html` design mockup. Intended to replace
`code/web` once it's ready.

## Develop

```sh
npm install
npm run dev
```

## Deploy

Pushes to `main` that touch `code/web/**` trigger
`.github/workflows/deploy-web.yml`, which builds the site and publishes it
to GitHub Pages.

`astro.config.mjs` is pinned to `site: https://czioutas.github.io` and
`base: /bufferq` (a project page at `czioutas.github.io/bufferq`). If the
repo is renamed, moved to a different org, or switched to a custom domain,
update those two values (and add a `public/CNAME` file for a custom domain).

GitHub Pages itself also needs to be turned on once, under the repo's
Settings → Pages → Build and deployment → Source → "GitHub Actions".
