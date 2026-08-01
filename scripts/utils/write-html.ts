import fs from "node:fs";
import path from "node:path";
import { interpolate } from "./interpolate.ts";
import { BUILD_CONFIG } from "../config.ts";

const templateHtml = fs.readFileSync("./scripts/template.html", "utf-8");

function generateHtml(slug: string): string {
    let baseUrl = BUILD_CONFIG.BASE_URL;

    if (!baseUrl.startsWith("/")) {
        baseUrl = "/" + baseUrl;
    }

    if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
    }

    const scriptPath = "./index.js";
    const globalCssPath = baseUrl + "globals.css";
    return interpolate(templateHtml, { scriptPath, globalCssPath });
}

export function writeHtml(slug: string, outputDirectory: string) {
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(path.join(outputDirectory, "index.html"), generateHtml(slug));
}
