function func(nums, k) {
  let maxSum = 0;
  let windowSum = 0;
  let windowSart = 0;

  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= nums[windowSart];
      windowSart += 1;
    }
  }
  return maxSum;
}

const nums = [2, 3, 4, 1, 5];

const result = func(nums, 2);
console.log(result);

// A Better Approach
// To solve this problem, we will use a sliding window technique. This approach allows us to maintain the sum of the current subarray of size K, and as we move through the array, we update this sum by subtracting the element that is no longer in the subarray and adding the next element in the array. This method is effective because it avoids the need to repeatedly sum elements for overlapping subarrays, thus reducing the time complexity to linear time, O(n). By keeping track of the maximum sum encountered, we ensure that we can efficiently find the solution.

// The sliding window approach works well because it maintains a running sum of a fixed number of elements. This avoids the inefficiencies of recalculating sums for each subarray, which would be necessary if we were to use a brute force method. The efficiency and simplicity of updating the sum as we slide the window over the array make this approach optimal for this problem.

// Step-by-Step Algorithm
// Initialize Variables:
// windowSum to store the sum of the current window of size k.
// maxSum to store the maximum sum encountered.
// windowStart to mark the start of the current window.
// Iterate through the array:
// Use a for loop where windowEnd goes from 0 to the end of the array.
// Add the current element to windowSum:
// windowSum += arr[windowEnd]
// Check if we have hit the window size:
// If windowEnd is greater than or equal to k-1, perform the following steps:
// Update maxSum:
// Set maxSum to the greater of maxSum and windowSum: maxSum = Math.Max(maxSum, windowSum)
// Slide the window:
// Subtract the element at windowStart from windowSum: windowSum -= arr[windowStart]
// Increment windowStart by 1 to slide the window: windowStart++
// Return maxSum:
// After the loop ends, maxSum will contain the maximum sum of any subarray of size k.
// Algorithm Walkthrough
// Using the array [2, 1, 5, 1, 3, 2] and K = 3:

// Initialization:

// windowSum = 0
// maxSum = 0
// windowStart = 0
// Iteration:

// windowEnd = 0:
// Add arr[0] (2) to windowSum: windowSum = 2
// windowEnd = 1:
// Add arr[1] (1) to windowSum: windowSum = 3
// windowEnd = 2:
// Add arr[2] (5) to windowSum: windowSum = 8
// Since windowEnd is >= k-1:
// Update maxSum = Math.Max(0, 8) = 8
// Subtract arr[0] (2) from windowSum: windowSum = 6
// Increment windowStart: windowStart = 1
// windowEnd = 3:
// Add arr[3] (1) to windowSum: windowSum = 7
// Since windowEnd is >= k-1:
// Update maxSum = Math.Max(8, 7) = 8
// Subtract arr[1] (1) from windowSum: windowSum = 6
// Increment windowStart: windowStart = 2
// windowEnd = 4:
// Add arr[4] (3) to windowSum: windowSum = 9
// Since windowEnd is >= k-1:
// Update maxSum = Math.Max(8, 9) = 9
// Subtract arr[2] (5) from windowSum: windowSum = 4
// Increment windowStart: windowStart = 3
// windowEnd = 5:
// Add arr[5] (2) to windowSum: windowSum = 6
// Since windowEnd is >= k-1:
// Update maxSum = Math.Max(9, 6) = 9
// Subtract arr[3] (1) from windowSum: windowSum = 5
// Increment windowStart: windowStart = 4
// Result:

// The final maxSum is 9, which is the maximum sum of any subarray of size k = 3.

// Complexity Analysis
// Time Complexity
// Single pass:

// The algorithm goes through the entire array once, so its time complexity is O(N) where N is the number of elements in the array.
// Sliding window:

// The sliding window technique allows the algorithm to efficiently calculate the sum of subarrays. Instead of recalculating the sum from scratch for each subarray, it updates the sum by adding the new element entering the window and subtracting the old element leaving the window in constant time, O(1).
// Overall time complexity:

// The overall time complexity of the algorithm is O(N) due to the single pass nature of the algorithm and the efficiency gained from using the sliding window technique.
// Space Complexity
// Additional variables:

// The algorithm uses extra variables like windowSum, maxSum, windowStart, and windowEnd, which require constant space, O(1).
// Overall space complexity:

// The overall space complexity of the algorithm is O(1) because it uses a constant amount of space regardless of the input size.
// Example
// Suppose we have an array [1, 4, 5, 2, 3].

// With the sliding window technique, when we calculate the sum of the subarray [4, 5, 2], we don't need to start from scratch but just update the sum based on the elements entering and leaving the window.
// This approach optimizes both the time and space complexities by efficiently maintaining the sum of subarrays without redundant calculations.
