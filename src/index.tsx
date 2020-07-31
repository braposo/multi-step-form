import * as React from "react";
import { render } from "react-dom";
import { AppWrapper } from "./components/AppWrapper";
import App from "./App";

const rootElement = document.getElementById("root");
render(
     <AppWrapper>
          <App />
     </AppWrapper>,
     rootElement
);
