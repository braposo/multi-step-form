import * as React from "react";
import { View } from "@adobe/react-spectrum";

type Props = {
     children: React.ReactNode;
};

export function StepContent({ children }: Props) {
     return (
          <View paddingBottom="size-200" paddingX="size-200">
               {children}
          </View>
     );
}
