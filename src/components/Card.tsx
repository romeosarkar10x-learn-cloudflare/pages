type CardProps = {
    title: string;
    children: React.ReactNode;
    accent?: string;
};

export function Card({ title, children, accent }: CardProps) {
    return (
        <section className="card" style={accent === undefined ? undefined : { ["--accent" as string]: accent }}>
            <h2 className="card-title">{title}</h2>
            <div className="card-body">{children}</div>
        </section>
    );
}

export function Grid({ children }: { children: React.ReactNode }) {
    return <div className="grid">{children}</div>;
}
