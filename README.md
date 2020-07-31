# multi-step-form

Hey, I'll be adding my notes from each session as I go through this!

## Session 1 - The UI (2h)

So for this first session I had the objective of building the entire layout, without any interactivity. There's a few reasons why I usually do this when approaching a new problem:

1. Sets the context of the work and puts everything in place in the UI
2. Creates a visual playground to start adding interactivity/features
3. Can be used for tests so we take a more TDD-like approach

I'm used to using a design system or component library and in this case I wanted to take this opportunity to also learn something new so I decided to try the [react-spectrum](https://react-spectrum.adobe.com/) library that was recently open-sourced by Adobe as an extension to their design system. I had never used it before so the majority of the time was spent going through the documentation and playing with it for a bit, it was fun though!

The library seems to be a bit too restrictive to my personal taste but I can see the appeal of limiting the options in such a large organisation like Adobe. There's also a big focus on the accessibility of the system, which was one of my main motivations to try it, so I'll use it as much as possible for tests.

But enough about that, for the next session it will be all about the state! I'm pretty sure I'm going to go with xstate for it, but I'll explain the reasoning behind that in the next session.

See ya!

## Session 2 - The State (3h)

This session was all about the state and most of the interactivity that is expected in this exercise.

Like I mentioned in the previous session, I opted to use [xstate](https://xstate.js.org/) as the state management library just because it's a mental model that I like and it's very handy for these kinds of interfaces that have a sequence of steps and need some sort of validation.

I know that you're using redux, but for me xstate has some advantages over it, while keeping a very similar flow in a React app. The way that the machine was setup at this point is very similar to redux where the context has all the data for the form (as a redux store would) and there are a few events that are dispatched from the different components (as redux actions would). What I like about xstate is that we can attach actions to the events in the machine that update the context just like the reducer would in redux, but in a much more explicit and logical way in my opinion.

Another thing that I ended up using already is the transition guards that can be associated with each event so they only happen if a given condition is met, which is very helpful when we're dealing with a multi-step form with validation.

For now I created a really basic machine with just 3 states but to be honest only one of them is actually used. I didn't focus on the form validation at all so that will be the focus of my next session.

One thing that I added as well was a kind of end-to-end test for the app. Because we already have the UI components from last session and the state management from this session, we actually have a fully functional form that can be tested. For that I'm using [react-testing-library](https://github.com/testing-library/react-testing-library) and the [user-event](https://github.com/testing-library/user-event) extension which allows me to simulate how the users would interact with the form with just the keyboard for example so we can check how accessible it is.

This end-to-end test ended up highlighting one of the main selling points of the react-spectrum library as it performed really well on a keyboard-only navigation. It will also help with the refactoring that may exist later on so we are always sure that the app is working as expected.

So for the next session I'll take care of the validation of the form!

## Session 3 - The Validation (3h)

Ok so I'm just going to start this by saying that I really got carried away with the validation bit and ended up building a small utility library for it as part of this exercise. Don't worry, this isn't something that would usually happen but as I was doing a bit of research around this topic I didn't find anything that was really suitable for this kind of validation so decided to quickly put something together. It also shows a different side of my thinking, completely outside of React.

Anyway! After that was done, I wired things together with the existing code so we can validate the data that is entered. The approach to this was to simply keep an up to date list of validation errors per field as they are being updated in the state machine and then implement a simple logic in `checkIfInvalid` guard to transition the machine to the right state/step based on the data.

Then it was just a matter of displaying some feedback to the user based on the validation information and updating the UI accordingly.

This means that at this point we have a fully functional multi-step form that matches the requirements from the test.

But although this is enough for this task, I'd like to take the opportunity to do a final session to bring this closer to a production setup, one that tries to answer the extra questions that you also ask in the test. How can we extend the form, add new fields or have a better UX by showing better information about the validation errors for example?

I'll try to answer those questions in the next session!

## Session 4 - The Refactor (4h)

The last session was to do some refactoring on the existing code. This is completely out of scope and way over what was required for the test but I wanted to use a few different concepts in React, like the use of context, component API design and data flow.

Also made updates to the state model so it's a bit more in line with a real-case scenario. The initial solution worked fine for this test, but was too simplistic and didn't have things like handling form submission or restricting the events in specific states, which is one of the main advantages of statecharts.

The new model probably requires a bit more work to extend but that's a good trade-off in my opinion as the state flow is much more explicit. You can check how it behaves in [this visualisation](https://xstate.js.org/viz/?gist=5570869f6d360fcd91e67fb5321e127c).

This refactor also includes some UX improvements like disabling the form while is submitting the data, the error messages that are now shown if a given field is invalid and the instant feedback on the validation after the first submission. I've added a simple test for the validation as well just to make sure that the UI is updating correctly after an invalid submission.

Overall this refactor was mostly to give additional talking points for further discussions and show different ways of achieving the same tasks. I actually started it with something else in mind, more focused on the state machine, but then realised it was just becoming too complex and didn't really bring much benefit to the discussion as it would just show some advanced uses of xstate so ended up dropping all of that and focusing on the React/UX improvements instead. It's still [in a PR](https://github.com/braposo/multi-step-form/pull/2) if you want to have a look although it's a very incomplete solution as I dropped it at some point.

# Running this locally

This is a normal create-react-app so you can clone this repo or download the files and run `yarn` followed by `yarn start`.

To run the tests please run `yarn test`.

Hopefully you'll find this refactor useful as well!
