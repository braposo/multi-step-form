import * as React from "react";
import { StepContent } from "./StepContent";
import { Flex } from "@adobe/react-spectrum";
import { StateValue } from "xstate";
import { StepHeader } from "./StepHeader";
import { StepTextField } from "./StepTextField";
import { StepCheckbox } from "./StepCheckbox";

type StepContextType = {
     id: string;
     currentState: string;
     isCurrentStep: boolean;
};

export const StepContext = React.createContext<StepContextType>({
     id: "",
     currentState: "",
     isCurrentStep: false,
});

export type StepProps = {
     children: React.ReactElement | React.ReactElement[];
     id: string;
     currentState: StateValue;
};

export function Step({ id, children, currentState }: StepProps): JSX.Element {
     const currentStateString =
          typeof currentState === "string"
               ? currentState.toString()
               : currentState[id]?.toString();

     const isCurrentStep =
          typeof currentState === "string"
               ? id === currentStateString
               : Object.keys(currentState)[0] === id;

     return (
          <StepContext.Provider
               value={{
                    id,
                    currentState: currentStateString,
                    isCurrentStep,
               }}
          >
               <Flex direction="column" gap="size-100">
                    {children}
               </Flex>
          </StepContext.Provider>
     );
}

Step.StepContent = StepContent;
Step.StepHeader = StepHeader;
Step.TextField = StepTextField;
Step.Checkbox = StepCheckbox;
