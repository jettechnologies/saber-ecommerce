import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { DataProvider } from "./context/productCatergoriesContext.tsx";
import { AuthProvider } from "./context/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
        <DataProvider>
          <CartContextProvider>
            <BrowserRouter>
              <ScrollToTop />
              <App />
            </BrowserRouter>
          </CartContextProvider>
        </DataProvider>
      </AuthProvider>
  </React.StrictMode>
);

