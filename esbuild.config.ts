import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

import { NAV } from "./src/lib/site.ts";

const OUT_DIR = "dist";

const entryPoints = Object.fromEntries(NAV.map((item) => [item.slug, `src/pages/${item.slug}.tsx`]));

function html(title: string, slug: string): string {
    return `<!doctype html>

<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <link rel="stylesheet" href="/styles.css" />
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/${slug}.js"></script>
    </body>
</html>
`;
}

await esbuild.build({
    entryPoints,
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "esm",
    target: ["es2022"],
    outdir: OUT_DIR,
    /* plugins: [
        copy({
            assets: {
                from: ["src/public/** /*"],
                to: ["."],
            },
        }),
    ], */
});

await mkdir(OUT_DIR, { recursive: true });

await Promise.all(NAV.map((item) => writeFile(path.join(OUT_DIR, `${item.slug}.html`), html(item.title, item.slug))));

console.log(`built ${NAV.length} pages into ${OUT_DIR}/`);
