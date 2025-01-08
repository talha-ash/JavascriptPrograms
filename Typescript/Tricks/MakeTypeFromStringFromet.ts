type inferValueFromColor<Color extends string> =
  Color extends `${infer N}-${infer C}-${infer T}`
    ? { namespace: N; color: C; tone: T }
    : never;

type Example = inferValueFromColor<"text-red-500">;

