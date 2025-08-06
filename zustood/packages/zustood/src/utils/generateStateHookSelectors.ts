import { EqualityChecker, State } from 'zustand';
import { GetRecord, UseImmerStore } from '../types';

export const generateStateHookSelectors = <T extends State>(
  store: UseImmerStore<T>
) => {
  const selectors: GetRecord<T> = {} as any;

  Object.keys(store.getState()).forEach((key) => {
    // selectors[`use${capitalize(key)}`] = () =>
    selectors[key] = (equalityFn?: EqualityChecker<T[keyof T]>) => {
      return store((state: T) => state[key as keyof T], equalityFn);
    };
  });

  return selectors;
};
