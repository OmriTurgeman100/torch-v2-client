import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { BreadcrumbProvider } from "./Context/BreadcrumbContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <BreadcrumbProvider>
        <App />
      </BreadcrumbProvider>
    </AuthContextProvider>
  </StrictMode>
);
