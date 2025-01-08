const arr = [1, 2, 3, 41000];

function findMinMax(arr) {
  let min = arr[0];
  let max = arr[1];
  if (arr.length == 1) {
    max = arr[0];
    min = arr[0];
    return { max, min };
  }

  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }
  for (let i = 2; i < arr.length; i++) {
    if (arr[i] >= max) {
      max = arr[i];
    } else if (arr[i] < min) {
      min = arr[i];
    }
  }

  return { max, min };
}

const result = findMinMax(arr);

console.log(result);
