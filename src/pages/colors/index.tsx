import { useState } from "react";

import { Layout } from "../../components/layout.js";
import { mount } from "../../lib/mount.js";
import type { PageMetadata } from "../../types/page-metadata.js";

type Swatch = {
    hex: string;
    hue: number;
};

function hslToHex(hue: number, saturation: number, lightness: number): string {
    const a = (saturation * Math.min(lightness, 1 - lightness)) / 100;

    const channel = (n: number) => {
        const k = (n + hue / 30) % 12;
        const value = lightness / 100 - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
        return Math.round(255 * value)
            .toString(16)
            .padStart(2, "0");
    };

    return `#${channel(0)}${channel(8)}${channel(4)}`;
}

function makePalette(): Swatch[] {
    const base = Math.floor(Math.random() * 360);

    return [0, 1, 2, 3, 4].map((index) => {
        const hue = (base + index * 28) % 360;
        return { hue, hex: hslToHex(hue, 62 + index * 4, 72 - index * 11) };
    });
}

function Page() {
    const [palette, setPalette] = useState<Swatch[]>(makePalette);
    const [copied, setCopied] = useState<string | null>(null);

    async function copy(hex: string) {
        try {
            await navigator.clipboard.writeText(hex);
            setCopied(hex);
            window.setTimeout(() => setCopied(null), 1200);
        } catch {
            setCopied("clipboard blocked");
        }
    }

    return (
        <Layout
            slug="colors"
            title="Colors"
            tagline="Roll a five-stop palette off a random base hue, then click any swatch to copy its hex."
        >
            <div className="panel">
                <div className="row">
                    <button className="btn btn-primary" onClick={() => setPalette(makePalette())}>
                        Roll palette
                    </button>
                    <span className="muted">{copied === null ? "click a swatch to copy" : `copied ${copied}`}</span>
                </div>

                <div className="swatches">
                    {palette.map((swatch) => (
                        <button key={swatch.hex} className="swatch" onClick={() => void copy(swatch.hex)}>
                            <div className="swatch-fill" style={{ background: swatch.hex }} />
                            <div className="swatch-label mono">
                                <span>{swatch.hex}</span>
                                <span className="muted">{swatch.hue}°</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="panel"
                style={{
                    marginTop: "18px",
                    background: `linear-gradient(120deg, ${palette.map((s) => s.hex).join(", ")})`,
                }}
            >
                <strong style={{ color: "#0b0d12" }}>Gradient preview</strong>
                <p className="mono" style={{ color: "#0b0d12", margin: "6px 0 0", opacity: 0.8 }}>
                    linear-gradient(120deg, {palette.map((s) => s.hex).join(", ")})
                </p>
            </div>
        </Layout>
    );
}

mount(<Page />);

export const metadata: PageMetadata = {
    slug: "colors",
    label: "Colors",
    title: "Colors · Pagelab",
};
