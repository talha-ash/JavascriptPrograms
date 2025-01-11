function func(str, k) {
  let wStart = 0;
  let wEnd = 0;
  let hash = {};
  let max = 0;

  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    hash[ele] = (hash[ele] || 0) + 1;
    while (Object.keys(hash).length > k) {
      const leftEle = str[wStart];
      hash[leftEle] -= 1;
      if (hash[leftEle] == 0) {
        delete hash[leftEle];
      }
      wStart++;
    }
    max = Math.max(max, i - wStart + 1);
  }
  return max;
}

const str = "araaci";

const result = func(str, 2);
console.log(result);
