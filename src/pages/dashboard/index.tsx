import { useState } from "react";

import { Card, Grid } from "../../components/card.js";
import { Layout } from "../../components/layout.js";
import { mount } from "../../lib/mount.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ROUTES = [
    { path: "/", views: 4812, ms: 41 },
    { path: "/gallery", views: 2190, ms: 58 },
    { path: "/todos", views: 1744, ms: 47 },
    { path: "/clock", views: 1288, ms: 39 },
    { path: "/colors", views: 976, ms: 44 },
    { path: "/about", views: 733, ms: 36 },
];

function series(): number[] {
    return DAYS.map(() => Math.round(30 + Math.random() * 70));
}

function Page() {
    const [data, setData] = useState<number[]>(series);

    const total = data.reduce((sum, value) => sum + value, 0);
    const peak = Math.max(...data);
    const last = data[data.length - 1] ?? 0;
    const previous = data[data.length - 2] ?? 0;
    const delta = previous === 0 ? 0 : Math.round(((last - previous) / previous) * 100);

    return (
        <Layout
            slug="dashboard"
            title="Dashboard"
            tagline="Made-up numbers rendered with flexbox and border-radius. Zero charting dependencies."
        >
            <div className="stack">
                <Grid>
                    <Card title="Requests this week" accent="#7c5cff">
                        <div className="big-number" style={{ fontSize: "2.4rem", color: "var(--text)" }}>
                            {(total * 137).toLocaleString()}
                        </div>
                        <span className={delta >= 0 ? "delta-up" : "delta-down"}>
                            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}% vs yesterday
                        </span>
                    </Card>

                    <Card title="Peak day" accent="#22d3ee">
                        <div className="big-number" style={{ fontSize: "2.4rem", color: "var(--text)" }}>
                            {peak}
                        </div>
                        <span>{DAYS[data.indexOf(peak)] ?? "—"} carried the load</span>
                    </Card>

                    <Card title="Edge cache hit" accent="#34d399">
                        <div className="big-number" style={{ fontSize: "2.4rem", color: "var(--text)" }}>
                            97.4%
                        </div>
                        <span>static assets served from cache</span>
                    </Card>

                    <Card title="Build time" accent="#fbbf24">
                        <div className="big-number" style={{ fontSize: "2.4rem", color: "var(--text)" }}>
                            0.9s
                        </div>
                        <span>eight bundles, one esbuild pass</span>
                    </Card>
                </Grid>

                <div className="panel">
                    <div className="row" style={{ justifyContent: "space-between" }}>
                        <h2 style={{ margin: 0 }}>Traffic by day</h2>
                        <button className="btn btn-ghost" onClick={() => setData(series())}>
                            Regenerate
                        </button>
                    </div>

                    <div className="bars">
                        {data.map((value, index) => (
                            <div key={DAYS[index] ?? index} className="bar" style={{ height: `${value}%` }} />
                        ))}
                    </div>

                    <div className="legend">
                        {DAYS.map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h2 style={{ marginTop: 0 }}>Top pages</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Path</th>
                                <th>Views</th>
                                <th>Avg TTFB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ROUTES.map((route) => (
                                <tr key={route.path}>
                                    <td className="mono">{route.path}</td>
                                    <td>{route.views.toLocaleString()}</td>
                                    <td className={route.ms < 45 ? "delta-up" : "delta-down"}>{route.ms} ms</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

mount(<Page />);
