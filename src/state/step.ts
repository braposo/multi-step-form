import { Machine, actions, spawn, Interpreter } from "xstate";
import { FieldContext, FieldSchema, FieldEvents, fieldMachine } from "./field";
import { Field } from "../utils/types";

const { assign } = actions;

export type StepSchema = {
     states: {
          start: {};
          idle: {};
          submitting: {};
          invalid: {};
          valid: {};
     };
};

export type StepContext = {
     id: string;
     fields: Field[];
     services: Record<
          string,
          Interpreter<FieldContext, FieldSchema, FieldEvents>
     >;
};

export type StepEvents = { type: "SUBMIT" } | { type: "GO_BACK" };

export const stepMachine = Machine<StepContext, StepSchema, StepEvents>(
     {
          initial: "idle",
          context: {
               id: "",
               fields: [],
               services: {},
          },
          states: {
               start: {
                    always: [
                         { target: "idle", cond: "hasFields" },
                         { target: "valid" },
                    ],
               },
               idle: {
                    entry: "createFields",
               },
               submitting: {
                    invoke: {
                         src: () =>
                              // simulates a network request by waiting 1s
                              new Promise(resolve =>
                                   setTimeout(() => resolve(), 1000)
                              ),
                         onDone: {
                              target: "valid",
                         },
                         onError: {
                              target: "invalid",
                         },
                    },
               },
               invalid: {},
               valid: {
                    type: "final",
                    data: (_, e) => ({
                         forward: e.type === "GO_BACK" ? false : true,
                    }),
               },
          },

          on: {
               SUBMIT: [
                    {
                         target: "submitting",
                         cond: "isValid",
                    },
                    {
                         target: "invalid",
                    },
               ],
               GO_BACK: {
                    target: "valid",
               },
          },
     },
     {
          actions: {
               createFields: assign({
                    services: ctx =>
                         ctx.fields.reduce(
                              (all, field) => ({
                                   ...all,
                                   [field.id]: spawn(
                                        fieldMachine.withContext({
                                             name: field.id,
                                             value: "",
                                             validation: field.validation,
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
          },
          guards: {
               isValid: ctx =>
                    Object.keys(ctx.services).every(field =>
                         ctx.services[field].state.matches("valid")
                    ),
               hasFields: ctx => ctx.fields.length > 0,
          },
     }
);
