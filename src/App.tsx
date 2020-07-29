import * as React from "react";
import {
     Flex,
     View,
     Heading,
     Form,
     TextField,
     Checkbox,
     Button,
     Text,
} from "@adobe/react-spectrum";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import { StepHeader } from "./components/StepHeader";
import { StepContent } from "./components/StepContent";
import {
     multiStepFormMachine,
     FormContext,
     FormEvents,
     FormSchema,
     Field,
} from "./state/form";
import { useMachine } from "@xstate/react";
import { StateMachine } from "xstate";

type Props = {
     machine?: StateMachine<FormContext, FormSchema, FormEvents>;
};

export default function App({ machine = multiStepFormMachine }: Props) {
     const [state, send] = useMachine(multiStepFormMachine);
     const { currentStep, name, email, role, password } = state.context;

     const showErrors = state.matches("invalid");
     const getValidationProps = (field: Field) =>
          showErrors
               ? ({
                      validationState:
                           (state.context.errors[field] || []).length === 0
                                ? "valid"
                                : "invalid",
                 } as const)
               : {};

     const step1Variant =
          currentStep === 1
               ? state.matches("invalid")
                    ? "invalid"
                    : "active"
               : "valid";
     const step2Variant =
          currentStep === 2
               ? state.matches("invalid")
                    ? "invalid"
                    : "active"
               : currentStep > 2
               ? "valid"
               : "default";

     return (
          <Flex direction="column" gap="size-100">
               <Heading level={1}>Multi step form example</Heading>
               <Flex
                    direction="column"
                    gap="size-100"
                    maxWidth="static-size-6000"
               >
                    <Flex direction="column">
                         <StepHeader id="step1-header" variant={step1Variant}>
                              1. Add details
                         </StepHeader>
                         <StepContent isHidden={currentStep !== 1}>
                              <Form
                                   aria-labelledby="step1-header"
                                   necessityIndicator="icon"
                              >
                                   <TextField
                                        label="Name:"
                                        autoFocus={true}
                                        isRequired={true}
                                        placeholder="Jon Smith"
                                        value={name}
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "name",
                                                  value,
                                             })
                                        }
                                        {...getValidationProps("name")}
                                   />
                                   <TextField
                                        label="Role:"
                                        placeholder="Software Engineer"
                                        value={role}
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "role",
                                                  value,
                                             })
                                        }
                                        {...getValidationProps("role")}
                                   />
                                   <TextField
                                        label="Email:"
                                        isRequired={true}
                                        type="email"
                                        placeholder="email@example.com"
                                        value={email}
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "email",
                                                  value,
                                             })
                                        }
                                        {...getValidationProps("email")}
                                   />
                                   <TextField
                                        value={password}
                                        label="Password:"
                                        isRequired={true}
                                        type="password"
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "password",
                                                  value,
                                             })
                                        }
                                        {...getValidationProps("password")}
                                   />
                                   <View marginTop="size-200">
                                        <Button
                                             variant="cta"
                                             onPress={() =>
                                                  send({ type: "SUBMIT" })
                                             }
                                        >
                                             Submit details
                                        </Button>
                                   </View>
                              </Form>
                         </StepContent>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                         <StepHeader id="step2-header" variant={step2Variant}>
                              2. Choose communications
                         </StepHeader>
                         <StepContent isHidden={currentStep !== 2}>
                              <Form
                                   aria-labelledby="step2-header"
                                   necessityIndicator="icon"
                              >
                                   <Checkbox
                                        isSelected={
                                             state.context.productUpdates
                                        }
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "productUpdates",
                                                  value,
                                             })
                                        }
                                   >
                                        Receive updates about Tray.io products
                                        by email
                                   </Checkbox>
                                   <Checkbox
                                        isSelected={state.context.otherUpdates}
                                        onChange={value =>
                                             send({
                                                  type: "CHANGE_VALUE",
                                                  field: "otherUpdates",
                                                  value,
                                             })
                                        }
                                   >
                                        Receive communication by email about
                                        other products created by the Tray.io
                                        team
                                   </Checkbox>
                                   <Flex
                                        direction="row"
                                        gap="size-100"
                                        marginTop="size-200"
                                   >
                                        <Button
                                             variant="cta"
                                             onPress={() =>
                                                  send({ type: "SUBMIT" })
                                             }
                                        >
                                             Confirm preferences
                                        </Button>
                                        <Button
                                             variant="secondary"
                                             onPress={() =>
                                                  send({ type: "GO_BACK" })
                                             }
                                        >
                                             Go back
                                        </Button>
                                   </Flex>
                              </Form>
                         </StepContent>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                         <StepHeader
                              variant={currentStep === 3 ? "valid" : "default"}
                         >
                              3. Verify email
                         </StepHeader>
                         <StepContent isHidden={currentStep !== 3}>
                              <Flex alignItems="center" gap="size-200">
                                   <Checkmark size="XXL" />
                                   <Text>
                                        Please verify your email address, you
                                        should have received an email from us
                                        already!
                                   </Text>
                              </Flex>
                         </StepContent>
                    </Flex>
               </Flex>
          </Flex>
     );
}
