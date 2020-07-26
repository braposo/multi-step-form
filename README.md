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

Like I mentioned in the previous session, I opted to use xstate as the state management library just because it's a mental model that I like and it's very handy for these kind of interfaces that have a sequence of steps and need some sort of validation.

I know that you're using redux, but for me xstate has some advantages over it, while keeping a very similar flow in a React app. The way that the machine was setup at this point is very similar to redux where the context has all the data for the form (as a redux store would) and there are a few events that are dispatched from the different components (as redux actions would). What I like about xstate is that we can attach actions to the events in the machine that update the context just like the reducer would in redux, but in a much more explicit and logical way in my opinion.

Another thing that I ended up using already is the transition guards that can be associated to each event so they only happen if a given condition is met, which is very helpful when we're dealing with a multi-step form with validation.

For now I created a really basic machine with just 3 states but to be honest only one of them is actually used. I didn't focus in the form validation at all so that will be the focus of my next session.

One thing that I added as well was a kind of end-to-end test for the app. Because we already have the UI components from last session and the state managemente from this session, we actually have a fully functional form that can be tested. For that I'm using react-testing-library and the user-event extension which allows me to simulate how the users would interact with the form with just the keyboard for example so we can check how accessible it is.

This end-to-end test ended up highlighting one of the main selling points fo the react-spectrum library as it performed really well on a keyboard-only navigation. It will also help with the refactoring that may exist later on so we are always sure that the app is working as expected.

So for the next session I'll take care of the validation of the form!
