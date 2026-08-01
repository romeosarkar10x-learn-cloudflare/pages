import { Card, Grid } from "../components/card.tsx";
import { Layout } from "../components/layout.tsx";
import { mount } from "../lib/mount.tsx";
import type { PageMetadata } from "../schemas/page-metadata.ts";

function PageCard([
    route,
    {
        metadata: { slug, label, accent, description },
    },
]: [string, { metadata: PageMetadata }]) {
    return (
        <a key={slug} className="tile" href={route}>
            <Card title={label} accent={accent}>
                {description}
            </Card>
        </a>
    );
}

function Page() {
    return (
        <Layout
            slug="index"
            title="Pagelab"
            tagline="A hand-rolled multi-page React app. Every page is its own bundle, its own HTML file, and its own full page load — no client-side router anywhere."
        >
            <div className="hero-actions">
                <a className="btn btn-primary" href="gallery/">
                    Browse the pages
                </a>
                <a className="btn btn-ghost" href="about/">
                    How it works
                </a>
            </div>

            <Grid>
                {Object.entries(__PAGES)
                    .filter(([route]) => route !== __CURRENT_ROUTE)
                    .map(PageCard)}
            </Grid>
        </Layout>
    );
}

mount(<Page />);
