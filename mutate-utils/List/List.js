import { create, rawReturn } from "mutative";

export function newList(initial) {
  const produce = create((draft) => {
    return rawReturn([...draft]);
  });
  return produce(initial || []);
}

export function push(state, payload) {
  let [draft, finalize] = create(state);
  draft.push(payload);
  return finalize();
}

export function pop(state) {
  let [draft, finalize] = create(state);
  draft.pop();
  return finalize();
}

export function map(state, fn) {
  let [draft, finalize] = create(state);
  draft.forEach((item, index) => {
    draft[index] = payload(item);
  });
  return finalize();
}
export function filter(state, fn) {
  let [draft, finalize] = create(state);

  draft.forEach((item, index) => {
    const bool = payload(item);
    if (!bool) {
      draft.splice(index, 1);
    }
  });
  return finalize();
}
