import * as React from "react";
import { View, Heading } from "@adobe/react-spectrum";
import { ViewProps } from "@react-types/view";
import { StepContext } from "./index";

type StepHeaderProps = {
     children: string | React.ReactElement | React.ReactElement[];
     variant?: "default" | "active" | "valid" | "invalid" | "disabled";
};

export function StepHeader({ children }: StepHeaderProps): JSX.Element {
     const { id, currentState } = React.useContext(StepContext);

     const mapExtraPropsToVariant: {
          [key: string]: ViewProps;
     } = {
          default: { borderColor: "gray-100" },
          active: { borderColor: "blue-600" },
          invalid: { borderColor: "red-600" },
          completed: { borderColor: "green-600" },
     };

     return (
          <View
               backgroundColor="gray-100"
               paddingX="size-200"
               borderStartWidth="thick"
               {...mapExtraPropsToVariant[currentState || "default"]}
          >
               <Heading id={`${id}-header`} level={3}>
                    {children}
               </Heading>
          </View>
     );
}
