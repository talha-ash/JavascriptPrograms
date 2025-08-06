function sumofNaturalNumber(n) {
  if (n === 1) {
    return 1;
  }
  return n + sumofNaturalNumber(n - 1);
}

const result = sumofNaturalNumber(5);

console.log(result);


// time complexity is O(n)
// Space complexity is O(n) because function call and function store in memory