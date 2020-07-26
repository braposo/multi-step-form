import * as React from "react";
import { View } from "@adobe/react-spectrum";

type Props = {
     children: React.ReactNode;
     isHidden?: boolean;
};

export function StepContent({
     children,
     isHidden = false,
}: Props): JSX.Element | null {
     if (isHidden) {
          return null;
     }

     return (
          <View paddingBottom="size-200" paddingX="size-200">
               {children}
          </View>
     );
}
