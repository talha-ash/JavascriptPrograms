const arr = [2, 3, 4, 10, 40];
const element = 233;

function findByBinarySearch(arr, l, r, element) {
  if (r >= l) {
    //   const mid = parseInt(arr.length / 2);
    const mid = l + Math.floor((r - l) / 2);
    if (arr[mid] == element) {
      return arr[mid];
    }

    if (element > arr[mid]) {
      return findByBinarySearch(arr, mid + 1, r, element);
    } else if (element < arr[mid]) {
      return findByBinarySearch(arr, l, mid - 1, element);
    }
  }
  return null;
}

const result = findByBinarySearch(arr, 0, arr.length - 1, element);

console.log(result);
