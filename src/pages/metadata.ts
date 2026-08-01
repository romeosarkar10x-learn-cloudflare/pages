import type { PageMetadata } from "../schemas/page-metadata.ts";

export const metadata: PageMetadata = {
    slug: "index",
    label: "Home",
    title: "Pagelab",
    description:
        "A hand-rolled multi-page React app. Every page is its own bundle, its own HTML file, and its own full page load — no client-side router anywhere.",
    accent: "#7c5cff",
    views: 4812,
    ms: 41,
} as const;
