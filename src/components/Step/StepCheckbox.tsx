import * as React from "react";
import { Flex, Text, Checkbox } from "@adobe/react-spectrum";
import { FieldDef } from "../../utils/state";
import { StepContext } from "./index";

type StepCheckboxProps = {
     field: FieldDef;
} & React.ComponentProps<typeof Checkbox>;

export function StepCheckbox({
     field,
     ...props
}: StepCheckboxProps): JSX.Element {
     const { currentState } = React.useContext(StepContext);
     const errors = (field.errors && field.errors(String(field.value))) || [];
     const showErrors = currentState === "invalid";
     const validationState = errors.length > 0 ? "invalid" : "valid";

     return (
          <Flex direction="column" gap="size-10">
               <Checkbox
                    isSelected={Boolean(field.value)}
                    validationState={(showErrors && validationState) || null}
                    width="100%"
                    {...props}
               />
               {showErrors && errors.length > 0 && (
                    <Text>
                         <small>
                              <em>It {errors.join(", ")}</em>
                         </small>
                    </Text>
               )}
          </Flex>
     );
}
