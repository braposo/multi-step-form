import * as React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { AppWrapper } from "../components/AppWrapper";

import "@testing-library/jest-dom";

describe("App", () => {
     // This is more of an end-to-end test but it gives us assurance
     // that the form is doing what is meant to do.
     // We can now refactor the code with more guarantees that it won't
     // break the existing behaviour.
     it("should get from first to the last step", async () => {
          const { queryByRole, queryByText } = render(<App />, {
               wrapper: AppWrapper,
          });

          // Validate step 1 active
          let step1Element = queryByRole("textbox", { name: /name/i });
          let step2Element = queryByRole("checkbox", {
               name: /receive updates/i,
          });
          let step3Element = queryByText(/verify your email address/i);
          expect(step1Element).toBeInTheDocument();
          expect(step2Element).not.toBeInTheDocument();
          expect(step3Element).not.toBeInTheDocument();

          // Simulate step 1 interactions
          // We simulate the keyboard interaction to guarantee that
          // the form is accessible
          userEvent.click(step1Element);
          userEvent.type(document.activeElement, "bernardo");

          userEvent.tab();
          userEvent.type(document.activeElement, "engineer");

          userEvent.tab();
          userEvent.type(document.activeElement, "hi@bernardoraposo.com");

          userEvent.tab();
          userEvent.type(document.activeElement, "veryStrongPassword1");

          userEvent.tab();
          userEvent.type(document.activeElement, "{enter}");

          // Validate step 2 active
          step1Element = queryByRole("textbox", { name: /name/i });
          step2Element = queryByRole("checkbox", {
               name: /receive updates/i,
          });
          step3Element = queryByText(/verify your email address/i);
          expect(step1Element).not.toBeInTheDocument();
          expect(step2Element).toBeInTheDocument();
          expect(step3Element).not.toBeInTheDocument();

          // Simulate step 2 interactions
          userEvent.tab();
          userEvent.type(document.activeElement, "{space}");
          userEvent.tab();
          userEvent.tab();
          userEvent.type(document.activeElement, "{enter}");

          // Validate step 3 active
          step1Element = queryByRole("textbox", { name: /name/i });
          step2Element = queryByRole("checkbox", {
               name: /receive updates/i,
          });
          step3Element = queryByText(/verify your email address/i);
          expect(step1Element).not.toBeInTheDocument();
          expect(step2Element).not.toBeInTheDocument();
          expect(step3Element).toBeInTheDocument();
     });
});
