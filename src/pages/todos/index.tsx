import { useEffect, useState } from "react";

import { Layout } from "../../components/Layout.js";
import { mount } from "../../lib/mount.js";

type Todo = {
    id: string;
    text: string;
    done: boolean;
};

type Filter = "all" | "open" | "done";

const STORAGE_KEY = "pagelab:todos";

const SEED: Todo[] = [
    { id: "seed-1", text: "Read the Cloudflare Pages docs", done: true },
    { id: "seed-2", text: "Wire up a multi-entry esbuild build", done: true },
    { id: "seed-3", text: "Deploy dist with wrangler", done: false },
];

function load(): Todo[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw === null ? SEED : (JSON.parse(raw) as Todo[]);
    } catch {
        return SEED;
    }
}

function Page() {
    const [todos, setTodos] = useState<Todo[]>(load);
    const [draft, setDraft] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const visible = todos.filter((todo) => (filter === "all" ? true : filter === "done" ? todo.done : !todo.done));
    const openCount = todos.filter((todo) => !todo.done).length;

    function add() {
        const text = draft.trim();

        if (text === "") {
            return;
        }

        setTodos((current) => [{ id: crypto.randomUUID(), text, done: false }, ...current]);
        setDraft("");
    }

    return (
        <Layout
            slug="todos"
            title="Todos"
            tagline="A list that outlives a reload. State goes to localStorage, which is the easiest way to persist anything on a fully static host."
        >
            <div className="panel">
                <div className="row">
                    <input
                        className="input"
                        placeholder="What needs doing?"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                add();
                            }
                        }}
                    />
                    <button className="btn btn-primary" onClick={add}>
                        Add
                    </button>
                </div>

                <div className="row" style={{ marginTop: "16px" }}>
                    {(["all", "open", "done"] as Filter[]).map((value) => (
                        <button
                            key={value}
                            className={value === filter ? "btn btn-primary" : "btn btn-ghost"}
                            onClick={() => setFilter(value)}
                        >
                            {value}
                        </button>
                    ))}
                    <span className="muted" style={{ marginLeft: "auto" }}>
                        {openCount} open · {todos.length} total
                    </span>
                </div>

                <ul className="todo-list">
                    {visible.map((todo) => (
                        <li key={todo.id} className={todo.done ? "todo is-done" : "todo"}>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() =>
                                    setTodos((current) =>
                                        current.map((item) =>
                                            item.id === todo.id ? { ...item, done: !item.done } : item,
                                        ),
                                    )
                                }
                            />
                            <span className="todo-text">{todo.text}</span>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setTodos((current) => current.filter((item) => item.id !== todo.id))}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {visible.length === 0 && (
                    <p className="muted" style={{ marginBottom: 0 }}>
                        Nothing in this filter.
                    </p>
                )}
            </div>
        </Layout>
    );
}

mount(<Page />);
