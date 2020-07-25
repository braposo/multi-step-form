import * as React from "react";
import { View, Heading } from "@adobe/react-spectrum";
import { ViewProps } from "@react-types/view";

type Props = {
     children: React.ReactNode;
     id?: string;
     variant?: "default" | "active" | "valid" | "invalid" | "disabled";
};

export function StepHeader({
     id,
     children,
     variant = "default",
}: Props): JSX.Element {
     const mapExtraPropsToVariant: { [key in typeof variant]: ViewProps } = {
          default: { borderColor: "gray-100" },
          active: { borderColor: "blue-600" },
          valid: { borderColor: "green-600" },
          invalid: { borderColor: "red-600" },
          disabled: { borderColor: "gray-100" },
     };

     return (
          <View
               backgroundColor="gray-100"
               paddingX="size-200"
               borderStartWidth="thick"
               flexGrow={1}
               {...mapExtraPropsToVariant[variant]}
          >
               <Heading id={id} level={3}>
                    {children}
               </Heading>
          </View>
     );
}
