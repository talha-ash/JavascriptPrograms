class Node {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
}

function func(arr) {
  for (let i = 0; i < arr.length; i++) {
    let isForward = arr[i] >= 0; // if we are moving forward or not
    let slow = i,
      fast = i;

    // if slow or fast becomes '-1' this means we can't find cycle for this number
    while (true) {
      // move one step for slow pointer
      slow = find_next_index(arr, isForward, slow);
      // move one step for fast pointer
      fast = find_next_index(arr, isForward, fast);
      if (fast !== -1) {
        // move another step for the fast pointer
        fast = find_next_index(arr, isForward, fast);
      }
      if (slow === -1 || fast === -1 || slow === fast) {
        break;
      }
    }

    if (slow !== -1 && slow === fast) {
      return true;
    }
  }

  return false;

  function find_next_index(arr, isForward, currentIndex) {
    let direction = arr[currentIndex] >= 0;

    if (isForward !== direction) {
      return -1; // change in direction, return -1
    }

    let nextIndex = (currentIndex + arr[currentIndex]) % arr.length;
    if (nextIndex < 0) {
      nextIndex += arr.length; // wrap around for negative numbers
    }

    // one element cycle, return -1
    if (nextIndex === currentIndex) {
      nextIndex = -1;
    }

    return nextIndex;
  }
}

const nums = [1, 2, -1, 2, 2];

const result = func(nums);
console.log(result);

// The problem involves finding a cycle in the array using the Fast & Slow pointer method. We start from each index of the array to find the cycle. If a number does not have a cycle, we move forward to the next element, taking care to ensure that the cycle has more than one element. To check for this, when moving a pointer forward, if it points to the same element after the move, we have a one-element cycle and can finish our cycle search for the current element.

// Additionally, the cycle should not contain both forward and backward movements. This is handled by remembering the direction of each element while searching for the cycle. If the number is positive, the direction is forward; if the number is negative, the direction is backward. Therefore, whenever we move a pointer forward and there is a change in the direction, we finish our cycle search right there for the current element.

// This approach ensures that we accurately identify cycles in the array.

// For the visual representation of this algorithm for Example-1, please see the complete solution provided earlier.

//   complexity
// The time complexity of the algorithm is O(N^2), where 'N' is the number of elements in the array. This is because the algorithm iterates through all elements of the array and tries to find a cycle for each element.

// Regarding space complexity, the algorithm runs in constant space O(1).

// An Alternate Approach
// In our algorithm, we don’t keep a record of all the numbers that have been evaluated for cycles. We know that all such numbers will not produce a cycle for any other instance as well. If we can remember all the numbers that have been visited, our algorithm will improve to  as, then, each number will be evaluated for cycles only once. We can keep track of this by creating a separate array, however, in this case, the space complexity of our algorithm will increase to .

// Step-by-Step Algorithm
// Initialize Visited Array:

// Create a boolean array visited to keep track of visited indices, initially set to false.
// Iterate Through Each Index:

// Loop through each index i in the array arr.
// If i is already visited, skip to the next index.
// Determine the direction of movement (isForward) based on the sign of arr[i].
// Initialize Slow and Fast Pointers:

// Set both slow and fast pointers to the current index i.
// Cycle Detection Using Slow and Fast Pointers:

// Enter a loop to move the slow and fast pointers.
// Move Slow Pointer:
// Move slow one step using the findNextIndex function.
// Move Fast Pointer:
// Move fast one step using the findNextIndex function.
// If fast is not -1, move fast another step using the findNextIndex function.
// Continue this loop until slow and fast pointers meet or one of them becomes -1.
// Check for Cycle:

// If slow and fast pointers meet (and neither is -1), a cycle is detected.
// Return true indicating a cycle is found.
// Mark Visited Indices:

// If no cycle is found, mark all indices visited during this cycle detection attempt:
// Initialize index to startIndex.
// While index is not -1 and not already visited:
// Mark visited[index] as true.
// Move index to the next index using the findNextIndex function.
// Return Result:

// If no cycle is detected for any index, return false.
// Thank you for the correction. Here is the revised walkthrough for the array [2, 2, -1, 2] with the proper explanation of each step:

// Algorithm Walkthrough
// Let's consider the input: arr = [2, 2, -1, 2].

// Initial Setup:

// Input array: [2, 2, -1, 2]
// Initialize visited array: [False, False, False, False]
// Index 0:

// Not visited, continue.
// isForward is True (since arr[0] is 2).
// slow = 0, fast = 0.
// First Loop:

// Move Slow Pointer:
// slow = findNextIndex([2, 2, -1, 2], True, 0) = 2
// Move Fast Pointer:
// fast = findNextIndex([2, 2, -1, 2], True, 0) = 2
// fast = findNextIndex([2, 2, -1, 2], True, 2) = -1 (direction change)
// The loop terminates as fast becomes -1.
// Mark Visited Indices:

// Mark all indices visited in this cycle detection attempt starting from index 0:
// visited = [True, False, True, False]
// Index 1:

// Not visited, continue.
// isForward is True (since arr[1] is 2).
// slow = 1, fast = 1.
// First Loop:

// Move Slow Pointer:
// slow = findNextIndex([2, 2, -1, 2], True, 1) = 3
// Move Fast Pointer:
// fast = findNextIndex([2, 2, -1, 2], True, 1) = 3
// fast = findNextIndex([2, 2, -1, 2], True, 3) = 1
// slow is 3, fast is 1. Continue loop.
// Second Loop:

// Move Slow Pointer:
// slow = findNextIndex([2, 2, -1, 2], True, 3) = 1
// Move Fast Pointer:
// fast = findNextIndex([2, 2, -1, 2], True, 1) = 3
// fast = findNextIndex([2, 2, -1, 2], True, 3) = 1
// slow is 1, fast is 1. They meet, cycle detected.
// So, return true.
// The cycle in arr is 1 -> 3 -> 1.

class Solution {
  loopExists(arr) {
    // Array to track visited indices
    const visited = new Array(arr.length).fill(false);

    for (let i = 0; i < arr.length; i++) {
      if (visited[i]) {
        continue; // Skip already visited indices
      }

      const isForward = arr[i] >= 0; // if we are moving forward or not
      let slow = i,
        fast = i;

      // if slow or fast becomes '-1' this means we can't find cycle for this number
      do {
        slow = this.findNextIndex(arr, isForward, slow); // move one step for slow pointer
        fast = this.findNextIndex(arr, isForward, fast); // move one step for fast pointer
        if (fast !== -1) {
          fast = this.findNextIndex(arr, isForward, fast); // move another step for fast pointer
        }
      } while (slow !== -1 && fast !== -1 && slow !== fast);

      if (slow !== -1 && slow === fast) {
        return true; // Cycle found
      }

      // Mark all indices visited in this cycle detection attempt
      this.markVisited(arr, i, isForward, visited);
    }

    return false;
  }

  findNextIndex(arr, isForward, currentIndex) {
    const direction = arr[currentIndex] >= 0;
    if (isForward !== direction) {
      return -1; // change in direction, return -1
    }

    let nextIndex = (currentIndex + arr[currentIndex]) % arr.length;
    if (nextIndex < 0) {
      nextIndex += arr.length; // wrap around for negative numbers
    }

    // one element cycle, return -1
    if (nextIndex === currentIndex) {
      nextIndex = -1;
    }

    return nextIndex;
  }

  markVisited(arr, startIndex, isForward, visited) {
    let index = startIndex;
    while (true) {
      visited[index] = true;
      const nextIndex = this.findNextIndex(arr, isForward, index);
      if (nextIndex === -1 || visited[nextIndex]) {
        break;
      }
      index = nextIndex;
    }
  }
}

// Test cases
const sol = new Solution();
console.log(sol.loopExists([1, 2, -1, 2, 2])); // Expected output: true
console.log(sol.loopExists([2, 2, -1, 2])); // Expected output: true
console.log(sol.loopExists([2, 1, -1, -2])); // Expected output: false

// Complexity Analysis
// Time Complexity: $O(N)$

// Outer Loop: The outer loop runs through each index in the array. Each index is visited at most once due to the visited array, ensuring that each element is processed only once.
// Inner Loop (Cycle Detection): The inner loop, which uses the slow and fast pointers to detect a cycle, runs in constant time for each element because we are using a do-while loop and breaking out as soon as a cycle is detected or the pointers meet a -1.
// Each element is processed a constant number of times, making the overall time complexity $O(N)$.

// Space Complexity: $O(N)$

// Visited Array: The additional visited array used to track which indices have been visited has a size equal to the input array, resulting in an $O(N)$ space complexity.
