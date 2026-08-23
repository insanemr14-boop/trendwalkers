# Trend Walkers — trendwalkers.dpdns.org

Static marketing site. No framework, no build dependencies.

## Editing

Page content lives in `body-*.html`. The first three lines of each are
metadata comments (`title`, `desc`, `canon`). Shared chrome lives in
`_head.part`, `_header.part`, `_footer.part`, `_schema.part`.

After editing, regenerate the deployed pages:

```
./build.sh
```

Commit both the `body-*.html` source and the generated `*.html` output —
Cloudflare Pages serves the repo as-is with no build command.

## Deploy

Push to `main`. Cloudflare Pages watches the repo and publishes automatically.
