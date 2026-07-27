export type NavItem = {
    /** Entry file name in src/pages, without extension. "index" maps to "/". */
    slug: string;
    label: string;
    title: string;
};

export const NAV: NavItem[] = [
    { slug: "index", label: "Home", title: "Pagelab" },
    { slug: "about", label: "About", title: "About · Pagelab" },
    { slug: "gallery", label: "Gallery", title: "Gallery · Pagelab" },
    { slug: "counter", label: "Counter", title: "Counter · Pagelab" },
    { slug: "todos", label: "Todos", title: "Todos · Pagelab" },
    { slug: "colors", label: "Colors", title: "Colors · Pagelab" },
    { slug: "clock", label: "Clock", title: "Clock · Pagelab" },
    { slug: "dashboard", label: "Dashboard", title: "Dashboard · Pagelab" },
];

export function hrefFor(slug: string): string {
    return slug === "index" ? "/" : `/${slug}`;
}
