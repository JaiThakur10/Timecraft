import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/toaster";
import MaxWidthWrapper from "./components/MaxWidthWrapper";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MaxWidthWrapper >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
        <Toaster richColors position="top-right" />
      </MantineProvider>
    </MaxWidthWrapper>
  </StrictMode>
);
