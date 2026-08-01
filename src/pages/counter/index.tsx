import { useState } from "react";

import { Layout } from "../../components/layout.tsx";
import { mount } from "../../lib/mount.tsx";

function Page() {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);
    const [log, setLog] = useState<string[]>([]);

    function apply(delta: number, label: string) {
        setCount((current) => current + delta);
        setLog((entries) => [`${new Date().toLocaleTimeString()} · ${label}`, ...entries].slice(0, 8));
    }

    return (
        <Layout
            slug="counter"
            title="Counter"
            tagline="State lives in this page and nowhere else. Navigate away and it resets — that is what a real multi-page app feels like."
        >
            <div className="stack">
                <div className="panel" style={{ textAlign: "center" }}>
                    <div
                        className="big-number"
                        style={{ color: count === 0 ? "var(--muted)" : count > 0 ? "var(--good)" : "var(--bad)" }}
                    >
                        {count}
                    </div>

                    <div className="row" style={{ justifyContent: "center", marginTop: "24px" }}>
                        <button className="btn" onClick={() => apply(-step, `−${step}`)}>
                            −{step}
                        </button>
                        <button className="btn btn-primary" onClick={() => apply(step, `+${step}`)}>
                            +{step}
                        </button>
                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                setCount(0);
                                setLog((entries) => [`${new Date().toLocaleTimeString()} · reset`, ...entries]);
                            }}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="row" style={{ justifyContent: "center", marginTop: "18px" }}>
                        <span className="muted">step</span>
                        {[1, 5, 10, 25].map((value) => (
                            <button
                                key={value}
                                className={value === step ? "btn btn-primary" : "btn btn-ghost"}
                                onClick={() => setStep(value)}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel">
                    <h2 style={{ marginTop: 0 }}>Event log</h2>
                    {log.length === 0 ? (
                        <p className="muted" style={{ margin: 0 }}>
                            Nothing yet. Press a button.
                        </p>
                    ) : (
                        <ul className="mono muted" style={{ margin: 0, paddingLeft: "18px" }}>
                            {log.map((entry, index) => (
                                <li key={`${entry}-${index}`}>{entry}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Layout>
    );
}

mount(<Page />);
