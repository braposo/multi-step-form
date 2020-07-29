import { Machine, actions } from "xstate";

const { assign } = actions;

export type FieldSchema = {
     states: {
          idle: {};
          invalid: {};
          valid: {};
     };
};

export type FieldContext = {
     name: string;
     value: string | boolean;
     validation?: (str: string) => string[];
     errors: string[];
};

export type FieldEvents = {
     type: "CHANGE_VALUE";
     value: string | boolean;
};

export const fieldMachine = Machine<FieldContext, FieldSchema, FieldEvents>(
     {
          initial: "idle",
          context: {
               name: "",
               value: "",
               errors: [],
          },
          states: {
               idle: {
                    entry: "validateValue",
                    always: [
                         {
                                   target: "valid",
                                   cond: "isValid",
                              },
                              { target: "invalid" },
                         ],

               },
               valid: {},
               invalid: {},
          },
          on: {
               CHANGE_VALUE: {
                    target: "idle",
                    actions: ["saveValue", "validateValue"],
               },
          },
     },
     {
          actions: {
               saveValue: assign({
                    value: (_, event) => event.value,
               }),
               validateValue: assign({
                    errors: (ctx, event) =>
                         (ctx.validation &&
                         ctx.validation(String(event?.value || ctx.value))) || [],
               }),
          },
          guards: {
               isValid: ctx => ctx.errors.length === 0,
          },
     }
);
