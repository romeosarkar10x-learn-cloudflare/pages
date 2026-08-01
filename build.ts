import path from "node:path";
import fs from "node:fs";
import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
import z from "zod";
import { PageMetadataSchema } from "./src/schemas/page-metadata.ts";

const SCRIPT_DIR = import.meta.dirname;
const OUT_DIR = "dist";
const DIR = "src/pages";

const templateHtml = fs.readFileSync("./template.html", "utf-8");

function generateHtml(slug: string): string {
    return templateHtml.replace("${slug}", slug);
}

function writeHtml(slug: string, outputDirectory: string) {
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(path.join(outputDirectory, "index.html"), generateHtml(slug));
}

const searchPath = path.join(SCRIPT_DIR, DIR);

let contents: string[];

try {
    contents = fs.readdirSync(searchPath, { recursive: true }) as string[];
} catch (e) {
    const error = e as NodeJS.ErrnoException;

    if (error.code === "ENOTDIR") {
        console.error(`ERROR: '${searchPath}' is not a directory`);
    }

    process.exit(-1);
}

function getRouteName(entryPoint: string) {
    const route = entryPoint.slice(0, -9);

    if (route.endsWith("/")) {
        return route;
    }

    return route + "/";
}

const entryPoints = contents.filter((v) => v.endsWith(path.sep + "index.tsx"));

const pages = await Promise.all(
    entryPoints.map(async (entryPoint) => {
        const importPath = "./" + path.join(DIR, entryPoint.slice(0, -9) + "metadata.ts");
        // console.log("importPath:", importPath);
        const { metadata } = z.object({ metadata: PageMetadataSchema }).parse(await import(importPath));
        return { pathname: entryPoint, route: getRouteName(entryPoint), metadata };
    }),
);

// const routes = entryPoints.map(getRouteName);

pages.forEach(({ pathname }) => {
    const directory = path.dirname(pathname);
    const fileName = path.basename(pathname).slice(0, -4);
    const outputDirectory = path.join(OUT_DIR, directory);

    esbuild.build({
        entryPoints: [path.join(DIR, pathname)],
        bundle: true,
        minify: true,
        jsx: "automatic",
        // sourcemap: true,
        format: "esm",
        target: ["es2022"],
        outdir: outputDirectory,
        define: {
            __PAGES: JSON.stringify(pages),
            __CURRENT_ROUTE: JSON.stringify(getRouteName(pathname)),
        },
    });

    writeHtml(fileName, outputDirectory);
});

esbuild.build({
    outdir: OUT_DIR,
    plugins: [
        copy({
            assets: [{ from: "./public/**/*", to: "." }],
        }),
    ],
});
