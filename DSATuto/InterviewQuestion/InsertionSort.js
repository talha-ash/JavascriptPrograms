const arr = [1, 3, 7, 4, 2];
const arr1 = [12, 11, 13, 5, 6];
function InsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (key < arr[j]) {
        temp = arr[j];
        arr[j] = key;
        arr[j + 1] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
}
debugger;
let result = InsertionSort(arr);
console.log(result);

result = InsertionSort(arr1);
console.log(result);

//on each iteration  big element is at end
//thats why we skip by i on each iteration

// Advantage:

// It can be easily computed.
// Best case complexity is of O(N) while the array is already sorted.
// Number of swaps reduced than bubble sort.
// For smaller values of N, insertion sort performs efficiently like other quadratic sorting algorithms.
// Stable sort.
// Adaptive: total number of steps is reduced for partially sorted array.
// In-Place sort.

// Disadvantage:

// It is generally used when the value of N is small. For larger values of N, it is inefficient.
// Similar as selection sort it requires n-squared number of steps for sorting n elements.
