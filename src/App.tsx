import * as React from "react";
import { Flex, View, Heading, Button, Text } from "@adobe/react-spectrum";
import Checkmark from "@spectrum-icons/workflow/Checkmark";
import { Step } from "./components/Step";
import {
     multiStepFormMachine,
     FormContext,
     FormEvents,
     FormSchema,
} from "./utils/state";
import { useMachine } from "@xstate/react";
import { StateMachine } from "xstate";

type Props = {
     machine?: StateMachine<FormContext, FormSchema, FormEvents>;
};

export default function App({ machine = multiStepFormMachine }: Props) {
     const [state, send] = useMachine(machine);
     const { fields } = state.context;

     return (
          <Flex direction="column" gap="size-200">
               <Heading level={1}>Multi step form example</Heading>
               <Step id="step1" currentState={state.value}>
                    <Step.StepHeader>1. Add details</Step.StepHeader>
                    <Step.StepContent>
                         <Step.TextField
                              label="Name:"
                              isRequired={true}
                              placeholder="Jon Smith"
                              field={fields.name}
                              onChange={value =>
                                   send({
                                        type: "CHANGE_VALUE",
                                        field: "name",
                                        value,
                                   })
                              }
                         />
                         <Step.TextField
                              label="Role:"
                              placeholder="Software Engineer"
                              field={fields.role}
                              onChange={value =>
                                   send({
                                        type: "CHANGE_VALUE",
                                        field: "role",
                                        value,
                                   })
                              }
                         />
                         <Step.TextField
                              field={fields.email}
                              label="Email:"
                              isRequired={true}
                              type="email"
                              placeholder="email@example.com"
                              onChange={value =>
                                   send({
                                        type: "CHANGE_VALUE",
                                        field: "email",
                                        value,
                                   })
                              }
                         />
                         <Step.TextField
                              field={fields.password}
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
                         />
                         <View marginTop="size-200">
                              <Button
                                   variant="cta"
                                   onPress={() => send({ type: "SUBMIT" })}
                              >
                                   Submit details
                              </Button>
                         </View>
                    </Step.StepContent>
               </Step>
               <Step id="step2" currentState={state.value}>
                    <Step.StepHeader>2. Choose preferences</Step.StepHeader>
                    <Step.StepContent>
                         <Step.Checkbox
                              field={fields.productUpdates}
                              onChange={value =>
                                   send({
                                        type: "CHANGE_VALUE",
                                        field: "productUpdates",
                                        value,
                                   })
                              }
                         >
                              Receive updates about Tray.io products by email
                         </Step.Checkbox>
                         <Step.Checkbox
                              field={fields.otherUpdates}
                              onChange={value =>
                                   send({
                                        type: "CHANGE_VALUE",
                                        field: "otherUpdates",
                                        value,
                                   })
                              }
                         >
                              Receive communication by email about other
                              products created by the Tray.io team
                         </Step.Checkbox>
                         <Flex
                              direction="row"
                              gap="size-100"
                              marginTop="size-200"
                         >
                              <Button
                                   variant="cta"
                                   onPress={() => send({ type: "SUBMIT" })}
                              >
                                   Confirm preferences
                              </Button>
                              <Button
                                   variant="secondary"
                                   onPress={() => send({ type: "GO_BACK" })}
                              >
                                   Go back
                              </Button>
                         </Flex>
                    </Step.StepContent>
               </Step>
               <Step id="completed" currentState={state.value}>
                    <Step.StepHeader>3. Verify email</Step.StepHeader>
                    <Step.StepContent>
                         <Flex alignItems="center" gap="size-200">
                              <Checkmark size="XXL" />
                              <Text>
                                   Please verify your email address, you should
                                   have received an email from us already!
                              </Text>
                         </Flex>
                    </Step.StepContent>
               </Step>
          </Flex>
     );
}
