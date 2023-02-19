import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Web3Provider from "./provider/Web3Provider";
import App from "./app/app";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </ChakraProvider>
  </React.StrictMode>
);
