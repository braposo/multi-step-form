import { Machine, assign, actions } from "xstate";
import { checkIf } from "./validation";

export type FormSchema = {
     states: {
          active: {};
          invalid: {};
          submitted: {};
     };
};

export type FormContext = {
     currentStep: number;
     name: string;
     role: string;
     email: string;
     password: string;
     productUpdates: boolean;
     otherUpdates: boolean;
     errors: Partial<Record<Field, string[]>>;
};

export type Field = Exclude<keyof FormContext, "errors" | "currentStep">;

export type FormEvents =
     | {
            type: "CHANGE_VALUE";
            value: string | boolean;
            field: Field;
       }
     | { type: "SUBMIT" }
     | { type: "GO_BACK" };

const updateErrors = (field: Field, value: string | boolean) => {
     const mapFieldToValidation: Partial<Record<Field, string[]>> = {
          name: checkIf(String(value))
               .hasMinLength(1, "can't be blank")
               .hasErrors(),
          email: checkIf(String(value))
               .isEmail()
               .hasErrors(),
          password: checkIf(String(value))
               .hasMinLength(9)
               .hasDigit()
               .hasUpperCase()
               .hasLowerCase()
               .hasErrors(),
     };

     const errors = mapFieldToValidation[field];

     return errors ? errors : [];
};

export const multiStepFormMachine = Machine<
     FormContext,
     FormSchema,
     FormEvents
>(
     {
          initial: "active",
          context: {
               currentStep: 1,
               name: "",
               role: "",
               email: "",
               password: "",
               productUpdates: false,
               otherUpdates: false,
               errors: {
                    name: updateErrors("name", ""),
                    email: updateErrors("email", ""),
                    password: updateErrors("password", ""),
               },
          },
          states: {
               active: {},
               invalid: {},
               submitted: {
                    type: "final",
               },
          },
          on: {
               CHANGE_VALUE: {
                    target: "active",
                    actions: ["saveValue"],
               },
               GO_BACK: {
                    target: "active",
                    actions: ["goToPreviousStep"],
                    cond: "canGoBack",
               },
               SUBMIT: [
                    {
                         target: "invalid",
                         cond: "checkIfInvalid",
                    },
                    {
                         target: "submitted",
                         actions: ["goToNextStep", "submitForm"],
                         cond: "isReadyToSubmit",
                    },
                    {
                         target: "active",
                         actions: ["goToNextStep"],
                    },
               ],
          },
     },
     {
          actions: {
               saveValue: assign((ctx, event) => {
                    if ("field" in event) {
                         return {
                              [event.field]: event.value,
                              errors: {
                                   ...ctx.errors,
                                   [event.field]: updateErrors(
                                        event.field,
                                        event.value
                                   ),
                              },
                         };
                    }

                    return ctx;
               }),
               goToNextStep: assign({
                    currentStep: ctx => ctx.currentStep + 1,
               }),
               goToPreviousStep: assign({
                    currentStep: ctx => ctx.currentStep - 1,
               }),
               submitForm: actions.log(ctx => {
                    const { currentStep, ...fields } = ctx;
                    return fields;
               }, "Submitted data"),
          },
          guards: {
               checkIfInvalid: ctx => {
                    if (ctx.currentStep === 1) {
                         const invalidName = (ctx.errors.name || []).length > 0;
                         const invalidEmail =
                              (ctx.errors.email || []).length > 0;
                         const invalidPassword =
                              (ctx.errors.password || []).length > 0;

                         return invalidName || invalidEmail || invalidPassword;
                    }

                    return false;
               },
               isReadyToSubmit: ctx => ctx.currentStep + 1 === 3,
               canGoBack: ctx => ctx.currentStep > 1,
          },
     }
);
