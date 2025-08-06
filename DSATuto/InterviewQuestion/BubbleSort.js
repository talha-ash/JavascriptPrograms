const arr = [1, 3, 7, 4, 2];
debugger;
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const result = bubbleSort(arr);
console.log(result);

//on each iteration  big element is at end
//thats why we skip by i on each iteration

// Optimization
// of Algorithm: Check if there happened any swapping operation in the inner loop (pass execution loop) or not.
// If there is no swapping in any pass, it means the array is now fully sorted, hence no need to
// continue, stop the sorting operation. So we can optimize the number of passes when the array
// gets sorted before the completion of all passes. And it can also detect if the given / input
// array is sorted or not, in the first pass.

// Advantage:

// It is the simplest sorting approach.
// Best case complexity is of O(N) [for optimized approach] while the array is sorted.
// Using optimized approach, it can detect already sorted array in first pass with time complexity of O(N).
// Stable sort: does not change the relative order of elements with equal keys.
// In-Place sort.

// Disadvantage:

// Bubble sort is comparatively slower algorithm.
// Poor efficiency for large elements of array.
