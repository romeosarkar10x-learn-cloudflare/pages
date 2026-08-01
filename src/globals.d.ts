import type { __CurrentRoute, __PagesType } from "./generated/types.ts";
import type { PageMetadata } from "./schemas/page-metadata.ts";

declare global {
    const __PAGES: __PagesType;
    const __CURRENT_ROUTE: __CurrentRoute;
}
