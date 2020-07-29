import { Machine, actions, Interpreter, spawn } from "xstate";
import { checkIf } from "../utils/validation";
import { Step } from "../utils/types";
import { stepMachine } from "./step";
import { FieldContext, FieldSchema, FieldEvents, fieldMachine } from "./field";

const { assign, log } = actions;

export type FormSchema = {
     states: {
          setup: {};
          [key: string]: {}
     };
};

export type FormContext = {
     currentStep: number;
     steps: Step[];
     fields: Record<
          string,
          Interpreter<FieldContext, FieldSchema, FieldEvents>
     >;
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

const steps: Step[] = [
     {
          id: "step1",
          fields: [
               {
                    id: "name",
                    type: "text",
                    validation: str =>
                         checkIf(str)
                              .hasMinLength(1, "can't be blank")
                              .hasErrors(),
               },
               {
                    id: "role",
                    type: "text",
               },
               {
                    id: "email",
                    type: "email",
                    validation: str =>
                         checkIf(str)
                              .isEmail()
                              .hasErrors(),
               },
               {
                    id: "password",
                    type: "password",
                    validation: str =>
                         checkIf(str)
                              .hasMinLength(9)
                              .hasDigit()
                              .hasUpperCase()
                              .hasLowerCase()
                              .hasErrors(),
               },
          ],
     },
     {
          id: "step2",
          fields: [
               {
                    id: "productUpdates",
                    type: "checkbox",
               },
               {
                    id: "otherUpdates",
                    type: "checkbox",
               },
          ],
     },
     {
          id: "step3",
     },
];

export const createMultiStepFormMachine = (steps: Step[]) => Machine<
     FormContext,
     FormSchema,
     FormEvents
>(
     {
          initial: "setup",
          context: {
               currentStep: 1,
               steps,
               fields: {},
          },
          states: steps.reduce((prevState, step) => ({
               ...prevState,
               [step.id]: {
                    states: {
                         idle: {},
          submitting: {},
          invalid: {},
          valid: {}
                    }
               }
          }), {
               setup: {
                    entry: "createFields",
                    always: "step1",
               }
          }),
          on: {
               GO_BACK: {
                    target: "active",
                    actions: ["goToPreviousStep"],
                    cond: "canGoBack",
               },
          },
     },
     {
          services: {
               stepMachine,
          },
          actions: {
               logForm: log(ctx => {
                    const { currentStep, ...fields } = ctx;
                    return fields;
               }, "Submitted data"),
               moveToNextStep: assign({
                    currentStep: (ctx, e) => {
                         console.log(e);
                         return ctx.currentStep + 1;
                    },
               }),
               createFields: assign({
                    fields: ctx =>
                         ctx.steps.reduce(
                              (prevSteps, step) => ({
                                   ...prevSteps,
                                   [step.id]: step.fields?.reduce(
                                        (prevFields, field) => ({
                                             ...prevFields,
                                             [field.id]: spawn(
                                                  fieldMachine.withContext({
                                                       name: field.id,
                                                       value: "",
                                                       validation:
                                                            field.validation,
                                                       errors: [],
                                                  }),
                                                  {
                                                       name: field.id,
                                                       sync: true,
                                                  }
                                             ),
                                        }),
                                        {}
                                   ),
                              }),
                              {}
                         ),
               }),
          },
          guards: {
               isReadyToSubmit: ctx => ctx.currentStep + 1 === 3,
               canGoBack: ctx => ctx.currentStep > 1,
               hasMoreSteps: ctx => ctx.currentStep < ctx.steps.length,
          },
     }
);
