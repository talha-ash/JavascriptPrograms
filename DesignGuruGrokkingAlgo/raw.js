function func(arr) {
  function recur(pos, list, ans) {
    if (pos >= list.length) {
      ans.push([...list]);
    }
    for (let i = pos; i < list.length; i++) {
      swap(list, i, pos);
      recur(pos + 1, list, ans);
      swap(list, i, pos);
    }
  }
  const ans = [];
  recur(0, arr, ans);
  return ans;
}

function swap(list, sourceIndex, destIndex) {
  [list[destIndex], list[sourceIndex]] = [list[sourceIndex], list[destIndex]];
}

const result = func([1, 3, 5]);
console.log(result);
