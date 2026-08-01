import type { __CurrentRoute, __PagesType } from "./generated/types.ts";

declare global {
    const __PAGES: __PagesType;
    const __CURRENT_ROUTE: __CurrentRoute;
}
