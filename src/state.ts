import { Machine, assign, actions } from "xstate";

type FormStateSchema = {
     states: {
          active: {};
          invalid: {};
          submitted: {};
     };
};

type FormContext = {
     currentStep: number;
     name: string;
     role: string;
     email: string;
     password: string;
     productUpdates: boolean;
     otherUpdates: boolean;
};

type FormEvent =
     | {
            type: "CHANGE_VALUE";
            value: string | boolean;
            field: keyof FormContext;
       }
     | { type: "SUBMIT" }
     | { type: "GO_BACK" };

export const multiStepFormMachine = Machine<
     FormContext,
     FormStateSchema,
     FormEvent
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
               checkIfInvalid: ctx => false,
               isReadyToSubmit: ctx => ctx.currentStep + 1 === 3,
               canGoBack: ctx => ctx.currentStep > 1,
          },
     }
);
