function adjacentSwap(arr) {
  function recurse(arr, l, r) {
    if (r <= l) {
      return l;
    }

    const mid = Math.floor((l + r) / 2);

    const r1 = recurse(arr, l, mid);

    const r2 = recurse(arr, mid + 1, r);

    console.log(r1);
    console.log(r2);
    return r1 + r2;
  }

  return recurse(arr, 0, arr.length);
}
debugger;
const result = adjacentSwap([1, 2, 3, 4, 5]);
console.log(result);
