function getNumber(str) {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 97;
    num = num - code;
  }
  return num;
}
function insertionSort(arr) {
  const hash = {};

  arr.map((item) => {
    // const sorted = item.split("").sort().join();
    const count = new Array(26).fill(0);
    for (let c of item) {
      count[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    const key = count.join(",");
    if (hash[key]) {
      hash[key].push(item);
    } else {
      hash[key] = [item];
    }
  });
  console.log(hash);
  return Object.values(hash);
}

const result = insertionSort([
  "cab",
  "tin",
  "pew",
  "duh",
  "may",
  "ill",
  "buy",
  "bar",
  "max",
  "doc",
]);
console.log(result);

//find code of charactor and put it one in array at index code
// with this we can group anagrams
//
//
