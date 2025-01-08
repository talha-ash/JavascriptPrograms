const arr = [2, 3, 4, 10, 40];
const element = 3;

function findByBinarySearch(arr, element) {
  let lo = 0;
  let hi = arr.length;
  do {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] == element) {
      return arr[mid];
    }
    if (element > arr[mid]) {
      lo = mid + 1;
    } else if (element < arr[mid]) {
      hi = mid;
    }
  } while (lo < hi);

  return null;
}

const result = findByBinarySearch(arr, element);

console.log(result);

//low is inclusive and high is enclusi ve
