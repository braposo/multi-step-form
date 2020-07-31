import * as React from "react";
import { View, Flex, Form } from "@adobe/react-spectrum";
import { StepContext } from "./index";

type StepContentProps = {
     children: React.ReactElement | React.ReactElement[];
};

export function StepContent({
     children,
}: StepContentProps): JSX.Element | null {
     const { id, currentState, isCurrentStep } = React.useContext(StepContext);

     if (!isCurrentStep) {
          return null;
     }

     return (
          <View
               paddingBottom="size-200"
               paddingX="size-200"
               maxWidth="size-6000"
          >
               <Form
                    aria-labelledby={`${id}-header`}
                    necessityIndicator="icon"
                    isDisabled={currentState === "submitting"}
               >
                    <Flex direction="column" gap="size-100">
                         {children}
                    </Flex>
               </Form>
          </View>
     );
}
