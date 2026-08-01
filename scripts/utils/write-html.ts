import fs from "node:fs";
import path from "node:path";

const templateHtml = fs.readFileSync("./template.html", "utf-8");

function generateHtml(slug: string): string {
    return templateHtml.replace("${slug}", slug);
}

export function writeHtml(slug: string, outputDirectory: string) {
    fs.mkdirSync(outputDirectory, { recursive: true });
    fs.writeFileSync(path.join(outputDirectory, "index.html"), generateHtml(slug));
}
