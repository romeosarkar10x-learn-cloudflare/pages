import { hrefFor, NAV } from "../lib/site.js";

type LayoutProps = {
    slug: string;
    title: string;
    tagline: string;
    children: React.ReactNode;
};

function isActive(slug: string): boolean {
    const path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "");
    return slug === "index" ? path === "" : path === `/${slug}`;
}

export function Layout({ slug, title, tagline, children }: LayoutProps) {
    return (
        <>
            <header className="site-header">
                <a className="brand" href="/">
                    <span className="brand-mark" />
                    pagelab
                </a>

                <nav className="site-nav">
                    {NAV.map((item) => (
                        <a
                            key={item.slug}
                            href={hrefFor(item.slug)}
                            className={isActive(item.slug) ? "nav-link is-active" : "nav-link"}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </header>

            <main className="page">
                <div className="page-head">
                    <h1>{title}</h1>
                    <p className="tagline">{tagline}</p>
                </div>

                {children}
            </main>

            <footer className="site-footer">
                <span>
                    static multi-page app · page <code>{slug}</code>
                </span>
                <span>built with esbuild, deployed on Cloudflare Pages</span>
            </footer>
        </>
    );
}
