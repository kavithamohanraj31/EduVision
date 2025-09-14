import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load Firebase seeder for development
if (import.meta.env.DEV) {
  import('./firebase-seeder.js');
}

createRoot(document.getElementById("root")!).render(<App />);
