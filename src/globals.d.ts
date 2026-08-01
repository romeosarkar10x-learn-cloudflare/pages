import type { PageMetadata } from "./schemas/page-metadata.ts";

declare global {
    const __PAGES: { route: string; metadata: PageMetadata }[];
    const __CURRENT_ROUTE: string;
}
