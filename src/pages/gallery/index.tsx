import { useState } from "react";

import { Layout } from "../../components/layout.js";
import { mount } from "../../lib/mount.js";
import type { PageMetadata } from "../../types/page-metadata.js";

type Art = {
    name: string;
    background: string;
};

const ARTWORKS: Art[] = [
    { name: "Dusk Signal", background: "linear-gradient(135deg, #7c5cff, #22d3ee)" },
    { name: "Ember Field", background: "linear-gradient(160deg, #fb7185, #fbbf24)" },
    { name: "Deep Current", background: "radial-gradient(circle at 30% 20%, #22d3ee, #0f172a 70%)" },
    { name: "Moss Static", background: "repeating-linear-gradient(45deg, #34d399 0 14px, #065f46 14px 28px)" },
    { name: "Neon Rift", background: "conic-gradient(from 210deg, #7c5cff, #f472b6, #22d3ee, #7c5cff)" },
    { name: "Paper Sun", background: "radial-gradient(circle at 70% 80%, #fbbf24, #7c2d12 75%)" },
    { name: "Cold Grid", background: "repeating-linear-gradient(0deg, #1e293b 0 10px, #334155 10px 12px)" },
    { name: "Violet Fog", background: "linear-gradient(200deg, #312e81, #a78bfa 60%, #f0abfc)" },
    { name: "Split Horizon", background: "linear-gradient(#0ea5e9 0 50%, #f97316 50% 100%)" },
];

function Page() {
    const [openName, setOpenName] = useState<string | null>(null);

    return (
        <Layout
            slug="gallery"
            title="Gallery"
            tagline="Nine pieces of generated art, every one of them a single CSS background declaration. Click a tile to expand it."
        >
            <div className="row" style={{ marginBottom: "18px" }}>
                <span className="pill">{ARTWORKS.length} pieces</span>
                {openName !== null && (
                    <button className="btn btn-ghost" onClick={() => setOpenName(null)}>
                        Collapse
                    </button>
                )}
            </div>

            <div className="grid">
                {ARTWORKS.map((art) => {
                    const isOpen = art.name === openName;

                    return (
                        <figure key={art.name} style={{ margin: 0, gridColumn: isOpen ? "1 / -1" : undefined }}>
                            <div
                                className={isOpen ? "art is-open" : "art"}
                                style={{ background: art.background }}
                                onClick={() => setOpenName(isOpen ? null : art.name)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        setOpenName(isOpen ? null : art.name);
                                    }
                                }}
                            />
                            <figcaption
                                className="row"
                                style={{ justifyContent: "space-between", marginTop: "8px", fontSize: "0.85rem" }}
                            >
                                <strong>{art.name}</strong>
                                <span className="muted mono">#{ARTWORKS.indexOf(art) + 1}</span>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
        </Layout>
    );
}

mount(<Page />);

export const metadata: PageMetadata = {
    slug: "gallery",
    label: "Gallery",
    title: "Gallery · Pagelab",
};
