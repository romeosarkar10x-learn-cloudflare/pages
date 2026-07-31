import { Card, Grid } from "../../components/card.js";
import { Layout } from "../../components/layout.js";
import { mount } from "../../lib/mount.js";
import type { PageMetadata } from "../../types/page-metadata.js";

const STEPS = [
    {
        title: "One entry point per page",
        body: "Every file in src/pages becomes an esbuild entry point. counter.tsx compiles to dist/counter.js and nothing else imports it.",
    },
    {
        title: "HTML is generated at build time",
        body: "esbuild.config.ts walks the page list and writes a tiny HTML shell per page, each one loading only its own bundle.",
    },
    {
        title: "Static assets get copied",
        body: "esbuild-plugin-copy mirrors src/public into dist, so styles.css ships once and is shared by every page.",
    },
    {
        title: "Cloudflare Pages serves dist",
        body: "Upload the folder and Pages maps /about to about.html automatically. Navigation is plain anchor tags, so each click is a real request.",
    },
];

const TRADEOFFS = [
    {
        title: "Tiny bundles",
        accent: "#34d399",
        body: "A page ships only the JavaScript it actually uses. The counter page never downloads the todo code.",
    },
    {
        title: "No router",
        accent: "#22d3ee",
        body: "No history API, no route config, no hydration mismatch. The browser does the routing.",
    },
    {
        title: "Full reloads",
        accent: "#fbbf24",
        body: "Cross-page state does not survive navigation. That is the cost, and it is fine for content-shaped sites.",
    },
    {
        title: "Shared code still shared",
        accent: "#7c5cff",
        body: "Components in src/components are imported by many pages; esbuild inlines them into each bundle.",
    },
];

function Page() {
    return (
        <Layout
            slug="about"
            title="About this build"
            tagline="Pagelab exists to try one thing: shipping a genuinely multi-page React app to Cloudflare Pages without a framework in the way."
        >
            <div className="stack">
                <div className="panel">
                    <span className="pill">Pipeline</span>
                    <ol className="timeline" style={{ marginTop: "20px" }}>
                        {STEPS.map((step) => (
                            <li key={step.title}>
                                <strong>{step.title}</strong>
                                <p className="muted" style={{ margin: "4px 0 0" }}>
                                    {step.body}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>

                <Grid>
                    {TRADEOFFS.map((item) => (
                        <Card key={item.title} title={item.title} accent={item.accent}>
                            {item.body}
                        </Card>
                    ))}
                </Grid>

                <div className="panel">
                    <h2 style={{ marginTop: 0 }}>Commands</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Command</th>
                                <th>What it does</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <code>pnpm run build</code>
                                </td>
                                <td>Bundle every page into dist</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>pnpm run dev</code>
                                </td>
                                <td>Build, then serve dist locally</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>pnpm run type-check</code>
                                </td>
                                <td>Run tsc with no emit</td>
                            </tr>
                            <tr>
                                <td>
                                    <code>wrangler pages deploy dist</code>
                                </td>
                                <td>Ship the folder to Cloudflare Pages</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

mount(<Page />);

export const metadata: PageMetadata = {
    slug: "about",
    label: "About",
    title: "About · Pagelab",
};
