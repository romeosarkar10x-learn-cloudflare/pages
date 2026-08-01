import type { PageMetadata } from "../../schemas/page-metadata.ts";

export const metadata: PageMetadata = {
    slug: "counter",
    label: "Counter",
    title: "Counter · Pagelab",
    description: "The smallest possible React state demo, with an event log.",
    accent: "#22d3ee",
    views: 1500,
    ms: 45,
} as const;
