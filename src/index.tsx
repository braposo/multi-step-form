import * as React from "react";
import { render } from "react-dom";
import { View, Provider, defaultTheme } from "@adobe/react-spectrum";

import App from "./App";

const rootElement = document.getElementById("root");
render(
     <Provider theme={defaultTheme}>
          <View backgroundColor="static-white">
               <App />
          </View>
     </Provider>,
     rootElement
);
