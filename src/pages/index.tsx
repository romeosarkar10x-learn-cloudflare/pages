import { Card, Grid } from "../components/card.tsx";
import { Layout } from "../components/layout.tsx";
import { mount } from "../lib/mount.tsx";
import type { PageMetadata } from "../schemas/page-metadata.ts";

const BLURBS: Record<string, { text: string; accent: string }> = {
    about: { text: "What this project is and how the build pipeline fits together.", accent: "#7c5cff" },
    gallery: { text: "A grid of pure-CSS gradient art. Click a tile to blow it up.", accent: "#f472b6" },
    counter: { text: "The smallest possible React state demo, with an event log.", accent: "#22d3ee" },
    todos: { text: "A todo list that survives reloads via localStorage.", accent: "#34d399" },
    colors: { text: "Roll a random palette and copy any hex with one click.", accent: "#fbbf24" },
    clock: { text: "A live ticking clock plus a handful of world timezones.", accent: "#60a5fa" },
    dashboard: { text: "Fake metrics, CSS bar charts, no chart library.", accent: "#fb7185" },
};

function Page() {
    return (
        <Layout
            slug="index"
            title="Pagelab"
            tagline="A hand-rolled multi-page React app. Every page is its own bundle, its own HTML file, and its own full page load — no client-side router anywhere."
        >
            <div className="hero-actions">
                <a className="btn btn-primary" href={hrefFor("gallery")}>
                    Browse the pages
                </a>
                <a className="btn btn-ghost" href={hrefFor("about")}>
                    How it works
                </a>
            </div>

            <Grid>
                {NAV.filter((item) => item.slug !== "index").map((item) => {
                    const blurb = BLURBS[item.slug];

                    return (
                        <a key={item.slug} className="tile" href={hrefFor(item.slug)}>
                            <Card title={item.label} accent={blurb?.accent ?? "#7c5cff"}>
                                {blurb?.text ?? ""}
                            </Card>
                        </a>
                    );
                })}
            </Grid>
        </Layout>
    );
}

mount(<Page />);
