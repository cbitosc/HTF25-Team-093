
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { GamificationProvider } from "./components/gamification/GamificationContext";

createRoot(document.getElementById("root")!).render(
	<GamificationProvider>
		<App />
	</GamificationProvider>
);
  