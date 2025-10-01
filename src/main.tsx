import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import Modal from "react-modal";

const rootElement = document.getElementById("root");

if (rootElement !== null) {
  Modal.setAppElement(rootElement);

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
