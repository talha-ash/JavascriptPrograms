"use strict";
const { produce } = require("immer");

const baseState = [
  {
    title: "Learn TypeScript",
    done: true,
  },
  {
    title: "Try Immer",
    done: false,
  },
];

const updateDone = (draftState)=>{
  const newState = draftState[1];
  newState.done = true;
}
const nextState = produce(baseState, (draftState) => {
  updateDone(draftState);
});

console.log(nextState === baseState);
// nextState[0].done = false;


//thats why we cant simply change or mutate nextsate thats how immer work
console.log(Object.getOwnPropertyDescriptors(nextState));
