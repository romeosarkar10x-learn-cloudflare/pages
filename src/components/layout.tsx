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
                    {Object.entries(__PAGES).map(
                        ([
                            route,
                            {
                                metadata: { slug, label },
                            },
                        ]) => (
                            <a key={slug} href={route} className={isActive(slug) ? "nav-link is-active" : "nav-link"}>
                                {label}
                            </a>
                        ),
                    )}
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
