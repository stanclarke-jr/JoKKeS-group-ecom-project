import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import { JokkesProvider } from "./components/Context/JokkesContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <JokkesProvider>
        <App />
      </JokkesProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
