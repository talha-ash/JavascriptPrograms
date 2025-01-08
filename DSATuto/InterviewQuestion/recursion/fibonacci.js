function fib(n) {
  if (n <= 2) {
    return 1;
  }

  const pr1 = fib(n - 2);
  const pr2 = fib(n - 1);
  return pr1 + pr2;
}

debugger;
const result = fib(5);

console.log(result);


// time complexity is O(2n) node in tree
// Space complexity is O(n) height of tree