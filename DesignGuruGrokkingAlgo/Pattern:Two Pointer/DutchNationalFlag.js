function func(list) {
  let r = 0;
  let l = 0;
  let target = 0;
  let i = 0;
  while (i < list.length) {
    const ele = list[i];
    if (ele == target) {
      i++;
      continue;
    }

    r = i + 1;
    if (r >= list.length) {
      target++;
      i++;
    }
    while (r < list.length) {
      if (list[r] == target) {
        list[r] = list[i];
        list[i] = target;
        if (r >= list.length - 1) {
          target++;
        }
        r = list.length;
        i++;
      } else if (r >= list.length - 1) {
        target++;
      }
      r++;
    }
  }
  return list;
}

const nums = [1, 0, 2, 1, 0];

const result = sort(nums);
console.log(result);

//EffecientSolution
function sort(arr) {
  // all elements < low are 0, and all elements > high are 2
  // all elements from >= low < i are 1
  let low = 0,
    high = arr.length - 1,
    i = 0;
  while (i <= high) {
    if (arr[i] === 0) {
      [arr[i], arr[low]] = [arr[low], arr[i]]; // swap
      // increment 'i' and 'low'
      i += 1;
      low += 1;
    } else if (arr[i] === 1) {
      i += 1;
    } else {
      // the case for arr[i] === 2
      [arr[i], arr[high]] = [arr[high], arr[i]]; // swap
      // decrement 'high' only, after the swap the number at index 'i' could be 0, 1,
      // or 2
      high -= 1;
    }
  }
  return arr;
}

// The brute force solution will be to use an in-place sorting algorithm like Heapsort which will take . Can we do better than this? Is it possible to sort the array in one iteration?

// We can use a Two Pointers approach while iterating through the array. Let’s say the two pointers are called low and high which are pointing to the first and the last element of the array respectively. So while iterating, we will move all 0s before low and all 2s after high so that in the end, all 1s will be between low and high. In the end, all 0s are on the left, all 1s are in the middle, and all 2s are on the right.

// Here's a detailed walkthrough of the algorithm:

// We start by initializing three variables: low to 0, high to the last index of the array, and i also to 0. Low is meant to keep track of the latest position where a 0 should be placed, high is meant to keep track of the latest position where a 2 should be placed, and i is used to iterate through the array.

// We then start a loop that continues as long as i is less than or equal to high. In each iteration of the loop, we check the value of the array at the index i.

// If the value is 0, we swap the values at the indices i and low. We then increment both i and low, since we know that the new element at low is 0 (sorted in its correct place) and we can move to the next index.

// If the value is 1, we do nothing other than increment i. This is because we want 1s to be in the middle of the array.

// If the value is 2, we swap the values at i and high. However, after the swap, we only decrement high without incrementing i. This is because the new value at index i (after the swap) could be 0, 1 or 2, and we need to check this value again in the next iteration.

// The swap function simply switches the values at two given indices in the array.

// The process continues until i is greater than high, at which point every element in the array has been checked and placed in its correct position. Hence, the array is now sorted.

// Algorithm Walkthrough
// input: arr = [1, 0, 2, 1, 0].

// Initial State:

// Array: [1, 0, 2, 1, 0]
// low = 0, high = 4
// i = 0
// Step-by-Step Walkthrough:

// First Iteration (i = 0):

// arr[i] = 1
// Since it's 1, just increment i.
// State after iteration:
// Array: [1, 0, 2, 1, 0]
// low = 0, high = 4
// i = 1
// Second Iteration (i = 1):

// arr[i] = 0
// Swap arr[i] with arr[low] (Swap positions 1 and 0).
// Increment low and i.
// State after iteration:
// Array: [0, 1, 2, 1, 0]
// low = 1, high = 4
// i = 2
// Third Iteration (i = 2):

// arr[i] = 2
// Swap arr[i] with arr[high] (Swap positions 2 and 4).
// Decrement high.
// i remains the same to check the swapped element.
// State after iteration:
// Array: [0, 1, 0, 1, 2]
// low = 1, high = 3
// i = 2
// Fourth Iteration (i = 2):

// arr[i] = 0
// Swap arr[i] with arr[low] (Swap positions 2 and 1).
// Increment low and i.
// State after iteration:
// Array: [0, 0, 1, 1, 2]
// low = 2, high = 3
// i = 3
// Fifth Iteration (i = 3):

// arr[i] = 1
// Since it's 1, just increment i.
// State after iteration:
// Array: [0, 0, 1, 1, 2]
// low = 2, high = 3
// i = 4
// Final State:

// Array: [0, 0, 1, 1, 2]
// All 0s are at the beginning, followed by all 1s, and all 2s at the end.

// Time Complexity
// The algorithm uses a single for loop that iterates through the array once, processing each element in the array. The number of swaps and comparisons is proportional to the length of the array since each element is either swapped or incremented only once.

// The overall time complexity of the algorithm is $O(N)$, where $N$ is the number of elements in the array.

// Space Complexity
// The algorithm sorts the array in place, meaning that it doesn't require any additional space that scales with the size of the input array. The only extra space used is for a few integer variables (low, high, and i), which require constant space, $O(1)$.

// Overall, the space complexity of the algorithm is $O(1)$.
