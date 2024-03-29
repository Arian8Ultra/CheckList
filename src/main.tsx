/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/Themes.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
// @ts-ignore
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";
import client from "./GraphQL/Apollo";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </CacheProvider>
    </ThemeProvider>
  </React.StrictMode>
);
