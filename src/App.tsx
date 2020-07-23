import * as React from "react";
import { MultiStepForm } from "./types";

const formDef: MultiStepForm = {
     id: "multi-step",
     steps: [
          {
               id: "step-1",
               label: "Step 1",
               fields: [
                    {
                         id: "name",
                         type: "text",
                    },
               ],
          },
     ],
};

export default function App() {
     console.log(formDef);
     return <div>Hey</div>;
}
