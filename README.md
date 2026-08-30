# XDzzzzzZyq.github.io

Personal website of Yuqian Zhang (XDzZyq).

The site is an Astro 5 static app. Pages are authored as components and compiled to HTML for GitHub Pages.

- `/` landing selector
- `/design/` art works, plugins, and scripts
- `/research/` research homepage
- `/research/<slug>/` English project detail
- `/research/cn/` Chinese research homepage
- `/research/cn/<slug>/` Chinese project detail

## Local development

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:5500/](http://127.0.0.1:5500/).
`npm run dev` already pins the host and port, so do not append extra `--host` or `--port` flags.

```bash
npm run build
npm run preview
```

## Content

- Project metadata: `src/data/projects.json`
- Project bodies: `src/content/projects/en/<slug>.md` and `src/content/projects/cn/<slug>.md`
- UI strings: `src/content/i18n/en.json` and `src/content/i18n/cn.json`
- Publications: `src/data/publications.json`
- Shared assets: `public/res/`
- Research cover images: `public/research/assets/`
