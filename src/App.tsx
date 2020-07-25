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

export default function App() {
     return (
          <Flex direction="column" gap="size-100">
               <Heading level={1}>Multi step form example</Heading>
               <Flex direction="column" gap="size-100" maxWidth="size-5000">
                    <Flex direction="column">
                         <StepHeader id="step1-header" variant="active">
                              1. Add details
                         </StepHeader>
                         <StepContent>
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
                         </StepContent>
                    </Flex>
                    <Flex direction="column" gap="size-100">
                         <StepHeader id="step2-header" variant="disabled">
                              2. Choose communications
                         </StepHeader>
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
                         <StepHeader variant="disabled">
                              3. Verify email
                         </StepHeader>
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
