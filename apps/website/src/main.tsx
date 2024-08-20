import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import HomeScreen from "./home/home-screen";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store/store";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./store/api/apolloApiClient";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <StrictMode>
  <ApolloProvider client={apolloClient}>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </ApolloProvider>
  // </StrictMode>
);
