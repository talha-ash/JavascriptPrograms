// type Properties = "propsA" | "propsB";

// type MappedType = {
//   [P in Properties]: P;
// };

// type MappedType<Properties extends string | number | symbol> = {
//   [P in Properties]: P;
// };

// let a: MappedType<"PropsA" | "PropsB">;

// a = {
//   PropsA: "PropsA",
//   PropsB: "PropsB",
// };

type MappedType<T> = {
  [P in keyof T]: T;
};

let a: MappedType<{ a: number; b: number }>;

type Pick1<T, Properties extends keyof T> = {
  [P in Properties]: T[P];
};

let aa: Pick1<{ a: number; b: number; c: string }, "a" | "b">;

type Record1<K extends string | number | symbol, T> = {
  [P in K]: T;
} & { someProperty: number };
type Record2<K extends any, T> = {
  [P in keyof K]: T;
};
let record: Record1<number | string, number> = { a: 10, someProperty: 10 };
let record1: Record1<"a" | "b", number> = { a: 10, b: 10 };
let record2: Record2<{ a: number; b: number }, number> = { a: 10, b: 10 };

// extends mean assigable
