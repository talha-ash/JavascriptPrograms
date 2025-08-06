//Template literals inside generic functions are
const inferValueFromColor = <
  N extends string,
  C extends string,
  T extends number
>(
  colorTag: `${N}-${C}-${T}`
) => {
  const [nameSpace, color, tone] = colorTag.split("-");
  return {
    nameSpace: nameSpace as N,
    color: color as C,
    tone: Number(tone) as T,
  };
};

const example = inferValueFromColor("red-100-200");
