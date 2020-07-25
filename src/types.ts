type Field = {
     id: string;
     type: "text" | "email" | "password" | "checkbox";
     isRequired?: boolean;
     validation?: Function;
};

type Step = {
     id: string;
     fields?: Field[];
};

export type MultiStepForm = {
     id: string;
     steps: Step[];
};
