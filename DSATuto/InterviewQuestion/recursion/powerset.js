function recursePowerSubset(arr) {
  function recurseEfficient(arr, i, subset, ans) {
    if (i >= arr.length) {
      ans.push([...subset]);
      return;
    }

    subset.push(arr[i]);
    recurseEfficient(arr, i + 1, subset, ans);

    subset.pop();
    recurseEfficient(arr, i + 1, subset, ans);
    return;
  }

  //space complexity O(n)
  //time complexity O(2n)
  function recurse(arr, i) {
    if (i < 0) {
      return [[]];
    }

    let pa = recurse(arr, i - 1);
    let ans = [];

    for (let x = 0; x < pa.length; x++) {
      ans.push([...pa[x]]);
    }

    for (let x = 0; x < pa.length; x++) {
      pa[x].push(arr[i]);
      ans.push(pa[x]);
    }

    return ans;
  }

  // return recurse(arr, arr.length - 1);
  let ans = [];
  recurseEfficient(arr, 0, [], ans);
  return ans;
}

const result = recursePowerSubset([1, 2, 3]);
console.log(result);
