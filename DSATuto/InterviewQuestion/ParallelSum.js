function ParallelSums(arr) {
    const combs = new Set(combinations(arr, arr.length / 2));
    console.log(combs);
    for (let a of combs) {
      const a_sum = sum(a);
      let b = arr.slice();
      for (let i of a) {
        b.splice(b.indexOf(i), 1);
      }
      const b_sum = sum(b);
      if (a_sum === b_sum) {
        const ans = compose(Array.from(a), b);
        return ans;
      }
    }
    return -1;
  }
  
  function compose(a, b) {
    a.sort();
    b.sort();
    if (a[0] <= b[0]) {
      return a.concat(b).join(",");
    } else {
      return b.concat(a).join(",");
    }
  }
  
  function combinations(arr, k) {
    const result = [];
    function backtrack(start, curr) {
      if (curr.length === k) {
        result.push(curr.slice());
        return;
      }
      for (let i = start; i < arr.length; i++) {
        curr.push(arr[i]);
        backtrack(i + 1, curr);
        curr.pop();
      }
    }
    backtrack(0, []);
    return result;
  }
  
  function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }
  
  const result = ParallelSums([16, 22, 35, 8, 20, 1, 21, 11]);
  console.log(result);
  