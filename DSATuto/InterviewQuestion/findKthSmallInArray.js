const arr = [1, 2, 54, 76, 23, 5];

function findKthSmall(arr, kth) {
  const sortedArray = arr.sort((a,b) => a-b);
  return sortedArray[kth-1];
}

const result = findKthSmall(arr, 3);
console.log(result);
