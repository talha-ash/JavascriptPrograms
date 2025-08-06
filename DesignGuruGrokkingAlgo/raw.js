function subSet(input) {
  const subsets = [[]];
  function recur(list, pos) {
    for (let i = pos; i < list.length; i++) {
      const ele = list[i];

      recur(list, pos + 1);
    }
  }

  recur(input, 0, []);
  return subsets;
}

const input = [1, 3, 3];
const result = subSet(input);
console.log(result);
