const arr = [51, 3, 2, 3, 4, 10];

debugger;
function findPeakByBinarySearch(arr, l, r) {
  //   const mid = parseInt(arr.length / 2);
  const mid = l + Math.floor((r - l) / 2);

  if ((mid == 0 || arr[mid] > arr[mid - 1]) && (mid == arr.length - 1 || arr[mid] > arr[mid + 1])) return arr[mid];

  if (mid >= 1 && arr[mid] < arr[mid + 1]) {
    return findPeakByBinarySearch(arr, mid + 1, r);
  } else {
    return findPeakByBinarySearch(arr, l, mid - 1);
  }
}

const result = findPeakByBinarySearch(arr, 0, arr.length - 1);

console.log(result);

//we need one peak element from array then we use this method becuase it have less time complexity
// we use binary search trick to do this
//Using Binary Search, check if the middle element is the peak element or not. If the middle element
//  is not the peak element, then check if the element on the right side
//  is greater than the middle element then there is always a peak element on the
//  right side. If the element on the left side is greater than the middle element then
//  there is always a peak element on the left side.
