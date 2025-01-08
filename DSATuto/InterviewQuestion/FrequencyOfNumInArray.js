const arr = [1, 2, 3, 54, 23, 1, 2, 4, 6, 4, 32, 1];

function frequencyOfNum(arr, num) {
  let freq = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      freq++;
    }
  }
  return freq;
}

const result = frequencyOfNum(arr, 1);

console.log(result);
