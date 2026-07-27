import { createRoot } from "react-dom/client";

const body = document.body;

const rootElement = document.createElement("div");
rootElement.id = "root";

createRoot(rootElement).render(<App />);

function App() {
    return (
        <>
            <h1>This is the [index] page</h1>
            <p>This is a sample paragraph</p>
        </>
    );
}

body.appendChild(rootElement);
