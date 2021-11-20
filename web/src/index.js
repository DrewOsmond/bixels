import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalProvider } from "./components/modal/modal";
import App from "./components/app/App";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <Router>
          <App />
        </Router>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
