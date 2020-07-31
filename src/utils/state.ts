import { Machine, actions } from "xstate";
import { assign } from "@xstate/immer";
import { checkIf } from "./validation";

export type FormSchema = {
     states: {
          step1: {
               states: {
                    active: {};
                    invalid: {};
                    submitting: {};
                    error: {};
               };
          };
          step2: {
               states: {
                    active: {};
                    invalid: {};
                    submitting: {};
                    error: {};
               };
          };
          completed: {};
     };
};

export type FieldDef = {
     value: string | boolean;
     errors?: (str: string) => string[];
};

export type FormContext = {
     fields: {
          name: FieldDef;
          role: FieldDef;
          email: FieldDef;
          password: FieldDef;
          productUpdates: FieldDef;
          otherUpdates: FieldDef;
     };
};

type Field = keyof FormContext["fields"];

export type FormEvents =
     | {
            type: "CHANGE_VALUE";
            value: string | boolean;
            field: Field;
       }
     | { type: "SUBMIT" }
     | { type: "GO_BACK" };

export const multiStepFormMachine = Machine<
     FormContext,
     FormSchema,
     FormEvents
>(
     {
          initial: "step1",
          context: {
               fields: {
                    name: {
                         value: "",
                         errors: str =>
                              checkIf(str)
                                   .hasMinLength(1, "can't be blank")
                                   .hasErrors(),
                    },
                    role: {
                         value: "",
                    },
                    email: {
                         value: "",
                         errors: str =>
                              checkIf(str)
                                   .isEmail()
                                   .hasErrors(),
                    },
                    password: {
                         value: "",
                         errors: str =>
                              checkIf(str)
                                   .hasMinLength(9)
                                   .hasDigit()
                                   .hasUpperCase()
                                   .hasLowerCase()
                                   .hasErrors(),
                    },
                    productUpdates: {
                         value: false,
                    },
                    otherUpdates: {
                         value: false,
                    },
               },
          },
          states: {
               step1: {
                    id: "step1",
                    initial: "active",
                    states: {
                         active: {},
                         invalid: {},
                         submitting: {
                              invoke: {
                                   src: "fakeService",
                                   onDone: {
                                        target: "#step2",
                                   },
                                   onError: {
                                        target: "error",
                                   },
                              },
                         },
                         error: {},
                    },
                    on: {
                         CHANGE_VALUE: {
                              actions: ["saveValue"],
                         },
                         SUBMIT: [
                              {
                                   target: ".invalid",
                                   cond: "isStep1Invalid",
                              },
                              {
                                   target: ".submitting",
                              },
                         ],
                    },
               },
               step2: {
                    id: "step2",
                    initial: "active",
                    states: {
                         active: {},
                         invalid: {},
                         submitting: {
                              invoke: {
                                   src: "fakeService",
                                   onDone: {
                                        target: "#completed",
                                   },
                                   onError: {
                                        target: "error",
                                   },
                              },
                         },
                         error: {},
                    },
                    on: {
                         CHANGE_VALUE: {
                              actions: ["saveValue"],
                         },
                         GO_BACK: {
                              target: "#step1",
                         },
                         SUBMIT: [
                              {
                                   target: ".invalid",
                                   cond: "isStep2Invalid",
                              },
                              {
                                   target: ".submitting",
                              },
                         ],
                    },
               },
               completed: {
                    id: "completed",
                    entry: "logForm",
                    type: "final",
               },
          },
     },
     {
          services: {
               fakeService: () =>
                    new Promise(resolve => setTimeout(() => resolve(), 2000)),
          },
          actions: {
               saveValue: assign((ctx, event: FormEvents) => {
                    if ("field" in event) {
                         ctx.fields[event.field].value = event.value;
                    }
               }),
               logForm: actions.log(ctx => ctx.fields, "Submitted data"),
          },
          guards: {
               isStep1Invalid: ctx => {
                    const { name, email, password } = ctx.fields;
                    const nameInvalid =
                         name.errors(String(name.value)).length > 0;
                    const emailInvalid =
                         email.errors(String(email.value)).length > 0;
                    const passwordInvalid =
                         password.errors(String(password.value)).length > 0;

                    return nameInvalid || emailInvalid || passwordInvalid;
               },
               isStep2Invalid: ctx => false,
          },
     }
);
