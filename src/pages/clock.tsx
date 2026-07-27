import { useEffect, useState } from "react";

import { Card, Grid } from "../components/Card.js";
import { Layout } from "../components/Layout.js";
import { mount } from "../lib/mount.js";

const ZONES = [
    { city: "Kolkata", zone: "Asia/Kolkata", accent: "#fbbf24" },
    { city: "London", zone: "Europe/London", accent: "#60a5fa" },
    { city: "New York", zone: "America/New_York", accent: "#fb7185" },
    { city: "São Paulo", zone: "America/Sao_Paulo", accent: "#34d399" },
    { city: "Tokyo", zone: "Asia/Tokyo", accent: "#f472b6" },
    { city: "Sydney", zone: "Australia/Sydney", accent: "#22d3ee" },
];

function timeIn(zone: string, now: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(now);
}

function dateIn(zone: string, now: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        weekday: "short",
        day: "numeric",
        month: "short",
    }).format(now);
}

function Page() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000);
        return () => window.clearInterval(id);
    }, []);

    const seconds = now.getSeconds();
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <Layout
            slug="clock"
            title="Clock"
            tagline="One setInterval, Intl.DateTimeFormat for the rest. No date library, no network call."
        >
            <div className="panel" style={{ textAlign: "center" }}>
                <div className="big-number mono">{timeIn(local, now)}</div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    {dateIn(local, now)} · {local}
                </p>

                <div className="bars" style={{ height: "40px", marginTop: "20px" }}>
                    {Array.from({ length: 60 }, (_, index) => (
                        <div
                            key={index}
                            className="bar"
                            style={{ height: index <= seconds ? "100%" : "12%", opacity: index <= seconds ? 1 : 0.25 }}
                        />
                    ))}
                </div>
            </div>

            <Grid>
                {ZONES.map((entry) => (
                    <Card key={entry.zone} title={entry.city} accent={entry.accent}>
                        <div className="mono" style={{ fontSize: "1.7rem", color: "var(--text)" }}>
                            {timeIn(entry.zone, now)}
                        </div>
                        <div>{dateIn(entry.zone, now)}</div>
                    </Card>
                ))}
            </Grid>
        </Layout>
    );
}

mount(<Page />);
