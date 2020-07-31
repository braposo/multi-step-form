import * as React from "react";
import { View, Provider, defaultTheme } from "@adobe/react-spectrum";

type Props = {
     children: React.ReactNode;
};

export const AppWrapper = ({ children }: Props) => {
     return (
          <Provider theme={defaultTheme}>
               <View backgroundColor="static-white">{children}</View>
          </Provider>
     );
};
