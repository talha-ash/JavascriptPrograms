function func(nums, k) {
  let windowStart = 0;
  let minLength = Infinity;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    while (sum >= k) {
      minLength = Math.min(minLength, i - windowStart + 1);
      sum -= nums[windowStart];
      windowStart++;
    }
  }
  if (minLength === Infinity) {
    return 0;
  }
  return minLength;
}

const nums = [2, 1, 5, 2, 8];

const result = func(nums, 7);
console.log(result);

// Solution
// To solve this problem, we use a sliding window approach. This technique involves expanding and contracting a window over the array to find the shortest subarray that meets the condition. By keeping a running sum of the elements in the window, we can check if the current window meets or exceeds the target sum S. If it does, we try to shrink the window from the left to see if we can get a smaller subarray that still meets the requirement. This approach is efficient because it processes each element of the array only once, resulting in a linear time complexity.

// The sliding window approach is effective because it avoids the need for nested loops, which would result in higher time complexity. By dynamically adjusting the window size, we can efficiently find the smallest subarray that meets the condition without re-evaluating the sum for different subarrays multiple times.

// Step-by-Step Algorithm
// Initialize windowSum to 0, minLength to a very large value, and windowStart to 0.
// Iterate through the array with a variable windowEnd from 0 to the end of the array.
// For each element at windowEnd, add it to windowSum.
// While windowSum is greater than or equal to S, do the following:
// Update minLength to be the smaller value between minLength and the current window size (windowEnd - windowStart + 1).
// Subtract the element at windowStart from windowSum.
// Move windowStart one position to the right.
// After the loop ends, check if minLength was updated. If it was, return minLength; otherwise, return 0.
// Algorithm Walkthrough
// Given the input array [2, 1, 5, 2, 3, 2] and S = 7:

// windowStart = 0, windowSum = 0, minLength = Infinity.
// Iterate windowEnd from 0 to 5:
// windowEnd = 0, windowSum = 2.
// windowEnd = 1, windowSum = 3.
// windowEnd = 2, windowSum = 8 (5 + 3), which is >= 7.
// Update minLength to 3 (indices 0 to 2).
// Subtract element at windowStart (2), windowSum = 6, windowStart = 1.
// windowEnd = 3, windowSum = 8 (1 + 5 + 2), which is >= 7.
// Update minLength to 3 (Unchanged).
// Subtract element at windowStart (1), windowSum = 7, windowStart = 2.
// Update minLength to 2.
// Subtract element at windowStart (5), windowSum = 2, windowStart = 3.
// windowEnd = 4, windowSum = 5 (2 + 3).
// windowEnd = 5, windowSum = 7 (2 + 5), which is >= 7.
// Update minLength to 2 (unchanged).
// Subtract element at windowStart (2), windowSum = 5, windowStart = 4.

// Time Complexity
// Single pass: The algorithm employs a sliding window approach, traversing the array in a single pass. The outer loop runs N times, where N is the number of elements in the array.
// Sliding window adjustment: Within the outer loop, the inner loop adjusts the window size and runs in O(N) time, cumulatively.
// Overall time complexity
// Total complexity: The overall time complexity is O(N) because the combined outer and inner loops process each element at most twice - once for expanding the window and once for shrinking it.
// Space Complexity
// Additional variables: The algorithm uses a few extra variables (windowSum, minLength, windowStart, and windowEnd), all of which require constant space. No additional data structures dependent on the input size are used.
