"use strict";
const { produce } = require("immer");

const baseState = [
  { counter: 0, location: { address: 10, street: 10 } },
  { counter: 0, location: { address: 10, street: 10 } },
  { counter: 0, location: { address: 10, street: 10 } },
  { counter: 0, location: { address: 10, street: 10 } },
  { counter: 0, location: { address: 10, street: 10 } },
];

const reducer = produce((draft, action) => {
  console.log(action);
  switch (action.type) {
    case "inc":
      console.log(draft.counter);
      draft.counter = draft.counter + 1;
      return;
    case "dec":
      draft.counter = draft.counter - 1;
      return;
    case "addressChange":
      draft[2].location.address = 11;
      return;
    case "streetChange":
      draft.location.street = draft.location.street + 1;
      return;
    default:
      draft.counter = 0;
  }
});

const result = reducer(baseState, { type: "addressChange" });

console.log(baseState === result);
