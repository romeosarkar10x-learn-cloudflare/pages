import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export function mount(node: React.ReactNode): void {
    const rootElement = document.createElement("div");
    rootElement.id = "root";

    createRoot(rootElement).render(<StrictMode>{node}</StrictMode>);
    document.body.appendChild(rootElement);
}
