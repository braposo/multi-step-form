import * as React from "react";
import { MultiStepForm } from "./types";
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
import { ViewProps } from "@react-types/view";
import Checkmark from "@spectrum-icons/workflow/Checkmark";

type StepHeaderProps = {
     label: string;
     id?: string;
     variant?: "default" | "active" | "valid" | "invalid" | "disabled";
};

function StepHeader({
     id,
     label,
     variant = "default",
}: StepHeaderProps): JSX.Element {
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
                    {label}
               </Heading>
          </View>
     );
}

export default function App() {
     return (
          <Flex direction="column" gap="size-100">
               <Heading level={1}>Multi step form example</Heading>
               <Flex direction="column" gap="size-100" maxWidth="size-5000">
                    <Flex direction="column">
                         <StepHeader
                              id="step1-header"
                              label="1. User"
                              variant="active"
                         />
                         <View paddingBottom="size-200" paddingX="size-200">
                              <Form
                                   aria-labelledby="step1-header"
                                   necessityIndicator="icon"
                              >
                                   <TextField
                                        label="Name:"
                                        isRequired={true}
                                        placeholder="Jon Smith"
                                   />
                                   <TextField
                                        label="Role:"
                                        placeholder="Software Engineer"
                                   />
                                   <TextField
                                        label="Email:"
                                        isRequired={true}
                                        type="email"
                                        placeholder="email@example.com"
                                   />
                                   <TextField
                                        label="Password:"
                                        isRequired={true}
                                        type="password"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{9,}$"
                                   />
                                   <View marginTop="size-200">
                                        <Button
                                             variant="cta"
                                             onPress={e => console.log(e)}
                                        >
                                             Submit
                                        </Button>
                                   </View>
                              </Form>
                         </View>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                         <StepHeader
                              id="step2-header"
                              label="2. Privacy"
                              variant="disabled"
                         />
                         <View paddingBottom="size-200" paddingX="size-200">
                              <Form
                                   aria-labelledby="step2-header"
                                   necessityIndicator="icon"
                              >
                                   <Checkbox>
                                        Receive updates about Tray.io products
                                        by email
                                   </Checkbox>
                                   <Checkbox>
                                        Receive communication by email about
                                        other products created by the Tray.io
                                        team
                                   </Checkbox>
                                   <View marginTop="size-200">
                                        <Button
                                             variant="cta"
                                             onPress={e => console.log(e)}
                                        >
                                             Submit
                                        </Button>
                                   </View>
                              </Form>
                         </View>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                         <StepHeader
                              label="3. Verify email"
                              variant="disabled"
                         />
                         <View paddingBottom="size-200" paddingX="size-200">
                              <Flex alignItems="center" gap="size-200">
                                   <Checkmark size="XXL" />
                                   <Text>
                                        Please verify your email address, you
                                        should have received an email from us
                                        already!
                                   </Text>
                              </Flex>
                         </View>
                    </Flex>
               </Flex>
          </Flex>
     );
}
