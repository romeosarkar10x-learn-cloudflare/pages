import type { PageMetadata } from "../../schemas/page-metadata.ts";

export const metadata: PageMetadata = {
    slug: "clock",
    label: "Clock",
    title: "Clock · Pagelab",
    description: "A live ticking clock plus a handful of world timezones.",
    accent: "#60a5fa",
} as const;
