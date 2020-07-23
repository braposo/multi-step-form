type Field = {
     id: string;
     type: "text";
     isRequired?: boolean;
     validation?: Function;
};

type Step = {
     id: string;
     label: string;
     fields?: Field[];
};

export type MultiStepForm = {
     id: string;
     steps: Step[];
};
