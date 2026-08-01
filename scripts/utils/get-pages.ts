import fs from "node:fs";
import path from "node:path";
import z from "zod";
import { type PageMetadata, PageMetadataSchema } from "../../src/schemas/page-metadata.ts";
import { BUILD_CONFIG } from "../config.ts";

export function getRouteName(entryPoint: string) {
    let baseUrl = BUILD_CONFIG.BASE_URL;

    if (!baseUrl.startsWith("/")) {
        baseUrl = "/" + baseUrl;
    }

    if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
    }

    let route = entryPoint.slice(0, -9);

    if (!route.endsWith("/")) {
        route += "/";
    }

    if (route.startsWith("/")) {
        route = route.slice(1);
    }

    return baseUrl + route;
}

export async function getPages(searchPath: string) {
    const cwd = process.cwd();

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

    const entryPoints = contents.filter((v) => v.endsWith(path.sep + "index.tsx") || v === "index.tsx");

    const pages = await Promise.all(
        entryPoints.map(async (entryPoint) => {
            const importPath = path.join(cwd, searchPath, entryPoint.slice(0, -9) + "metadata.ts");
            const { metadata } = z.object({ metadata: PageMetadataSchema }).parse(await import(importPath));
            return { pathname: entryPoint, route: getRouteName(entryPoint), metadata };
        }),
    );

    const pagesObject: Record<string, { pathname: string; metadata: PageMetadata }> = {};

    pages.forEach((page) => {
        pagesObject[page.route] = { pathname: page.pathname, metadata: page.metadata };
    });

    return pagesObject;
}
