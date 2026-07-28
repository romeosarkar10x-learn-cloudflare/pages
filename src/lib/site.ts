export type NavItem = {
    /** Entry file name in src/pages, without extension. "index" maps to "/". */
    slug: string;
    label: string;
    title: string;
};

function capitalize(word: string) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export const NAV: NavItem[] = (function () {
    const routes = __ROUTES as string[];
    return routes.map((v) => ({ slug: v, label: capitalize(v.slice(0, -1)), title: v }));
})();

// export const NAV: NavItem[] = ;

export function hrefFor(slug: string): string {
    return slug === "index" ? "/" : `/${slug}`;
}
