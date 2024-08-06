import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import HomeScreen from "./home/home-screen";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
