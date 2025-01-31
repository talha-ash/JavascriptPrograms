function func(input, k) {
  let wStart = 0;
  let maxOne = 0;
  let maxLength = 0;
  let maxRepeated = 0;

  for (let i = 0; i < input.length; i++) {
    const ele = input[i];
    if (ele == 1) {
      maxOne++;
    }

    let windowSize = i - wStart + 1;

    if (windowSize - maxOne > k) {
      if (input[wStart] == 1) {
        maxOne--;
      }
      wStart++;
    }

    maxLength = Math.max(maxLength, i - wStart + 1);
  }
  return maxLength;
}

const input = [1, 0, 0, 1, 1, 0, 1, 1];

const result = func(input, 2);
console.log(result);

// Solution
// This problem follows the Sliding Window pattern and is quite similar to Longest Substring with same Letters after Replacement. The only difference is that, in the problem, we only have two characters (1s and 0s) in the input arrays.

// Following a similar approach, we’ll iterate through the array to add one number at a time in the window. We’ll also keep track of the maximum number of repeating 1s in the current window (let’s call it maxOnesCount). So at any time, we know that we can have a window with 1s repeating maxOnesCount time, so we should try to replace the remaining 0s. If we have more than ‘k’ remaining 0s, we should shrink the window as we are not allowed to replace more than ‘k’ 0s.

// Step-by-Step Algorithm
// Initialize windowStart to 0, maxLength to 0, and maxOnesCount to 0.
// Iterate over the array using windowEnd from 0 to the end of the array.
// If the current element is 1, increment maxOnesCount.
// Calculate the current window size as windowEnd - windowStart + 1.
// If the number of 0s in the current window (windowEnd - windowStart + 1 - maxOnesCount) is greater than k, shrink the window from the start.
// If the element at windowStart is 1, decrement maxOnesCount.
// Increment windowStart.
// Update maxLength to be the maximum of maxLength and the current window size.
// Return maxLength as the length of the longest subarray.
// Algorithm Walkthrough
// Consider the input arr = [0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k = 2.

// Let's walk through the algorithm step-by-step, keeping track of all the important variables:

// Initialization:

// windowStart = 0
// maxLength = 0
// maxOnesCount = 0
// Iterating over the array:

// Iteration 1:

// windowEnd = 0, arr[0] = 0
// maxOnesCount = 0
// Window size: windowEnd - windowStart + 1 = 1
// Condition: 1 - 0 > 2 is False
// Update maxLength = 1
// Iteration 2:

// windowEnd = 1, arr[1] = 1
// maxOnesCount = 1
// Window size: windowEnd - windowStart + 1 = 2
// Condition: 2 - 1 > 2 is False
// Update maxLength = 2
// Iteration 3:

// windowEnd = 2, arr[2] = 1
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 3
// Condition: 3 - 2 > 2 is False
// Update maxLength = 3
// Iteration 4:

// windowEnd = 3, arr[3] = 0
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 4
// Condition: 4 - 2 > 2 is False
// Update maxLength = 4
// Iteration 5:

// windowEnd = 4, arr[4] = 0
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 2 > 2 is True
// Shrink window: windowStart = 1
// Since arr[0] = 0, maxOnesCount remains 2
// Iteration 6:

// windowEnd = 5, arr[5] = 0
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 2 > 2 is True
// Shrink window: windowStart = 2
// Since arr[1] = 1, maxOnesCount = 1
// Iteration 7:

// windowEnd = 6, arr[6] = 1
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 2 > 2 is True
// Shrink window: windowStart = 3
// Since arr[2] = 1, maxOnesCount = 1
// Iteration 8:

// windowEnd = 7, arr[7] = 1
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 2 > 2 is True
// Shrink window: windowStart = 4
// Since arr[3] = 0, maxOnesCount remains 2
// Iteration 9:

// windowEnd = 8, arr[8] = 0
// maxOnesCount = 2
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 2 > 2 is True
// Shrink window: windowStart = 5
// Since arr[4] = 0, maxOnesCount remains 2
// Iteration 10:

// windowEnd = 9, arr[9] = 1
// maxOnesCount = 3
// Window size: windowEnd - windowStart + 1 = 5
// Condition: 5 - 3 > 2 is False
// Update maxLength = 5
// Iteration 11:

// windowEnd = 10, arr[10] = 1
// maxOnesCount = 4
// Window size: windowEnd - windowStart + 1 = 6
// Condition: 6 - 4 > 2 is False
// Update maxLength = 6
// The maximum length of the subarray with at most k replacements is 6.
// The final values of the variables are:
// windowStart = 5
// windowEnd = 10
// maxOnesCount = 4
// maxLength = 6

// Beginner Level Explanation
// Time Complexity:

// The algorithm goes through the input array only once, so we say it has a time complexity of O(N), where N is the length of the array.
// When the algorithm adjusts the sliding window, it does so in constant time, which means it's very efficient.
// Space Complexity:

// The algorithm uses only a few extra variables which don't depend on the size of the input, so we say it has a space complexity of O(1), which is the best possible.
// Intermediate Level Explanation
// Time Complexity:

// The algorithm uses a single pass through the input array, giving it a time complexity of O(N) because it runs through the array exactly once.
// When adjusting the sliding window, the inner logic runs in constant time (O(1)) since adding or removing elements from the window involves constant-time operations.
// Space Complexity:

// The algorithm uses additional variables (e.g., windowStart, windowEnd, maxLength, maxOnesCount) that require constant space, O(1).
// It doesn't use any additional data structures that depend on the input size, so the space complexity is O(1).
// Advanced Level Explanation
// Time Complexity:

// The algorithm uses a sliding window approach and makes a single pass through the input array, resulting in a time complexity of O(N), where N is the length of the array.
// During the sliding window adjustment, the inner logic runs in constant time (O(1)) because adding or removing elements from the window involves constant-time operations.
// Space Complexity:

// The algorithm uses additional variables that require constant space (O(1)) to store things like the window's start and end positions, maximum length, and the count of ones.
// Additionally, the algorithm doesn't use any additional data structures such as arrays or maps that would increase space complexity, so the overall space complexity is O(1).
