import path from "node:path";
import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import { getPages } from "./utils/get-pages.ts";
import { writeHtml } from "./utils/write-html.ts";
import { BUILD_CONFIG } from "./config.ts";

async function build() {
    const pages = await getPages(BUILD_CONFIG.DIR);

    Object.entries(pages).forEach(([routeName, { pathname }]) => {
        const directory = path.dirname(pathname);
        const fileName = path.basename(pathname).slice(0, -4);
        const outputDirectory = path.join(BUILD_CONFIG.OUT_DIR, directory);

        esbuild.build({
            entryPoints: [path.join(BUILD_CONFIG.DIR, pathname)],
            bundle: true,
            minify: true,
            jsx: "automatic",
            // sourcemap: true,
            format: "esm",
            target: ["es2022"],
            outdir: outputDirectory,
            define: {
                __PAGES: JSON.stringify(pages),
                __CURRENT_ROUTE: JSON.stringify(routeName),
            },
        });

        writeHtml(fileName, outputDirectory);
    });

    esbuild.build({
        outdir: BUILD_CONFIG.OUT_DIR,
        plugins: [
            copy({
                assets: [{ from: "./public/**/*", to: "." }],
            }),
        ],
    });
}

build();
