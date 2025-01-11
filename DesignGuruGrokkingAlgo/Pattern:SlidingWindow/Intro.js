// Intermediate Level Explanation
// Problem Description
// The problem presents an array of numbers and asks for the average value of every subarray of a given size 'K'.

// Example
// We have an array: [1, 3, 2, 6, -1, 4, 1, 8, 2] and 'K' (subarray size) is 5.

// Solution
// Compute the average of the first 5 numbers:
// (1 + 3 + 2 + 6 + (-1)) / 5 = 2.2
// Compute the average of the next 5 numbers:
// (3 + 2 + 6 + (-1) + 4) / 5 = 2.8
// Repeat this process for the rest of the subarrays of size 5.
// Final Output
// The final output contains the averages of all subarrays of size 5: Output: [2.2, 2.8, 2.4, 3.6, 2.8]

// This process must be repeated for all subarrays of size 5.

// Code Example
// The problem can be solved using a simple program or a function. In Python, the code could look like this:

// def findAverages(arr, K):
//     result = []
//     windowSum = 0.0
//     windowStart = 0
//     for windowEnd in range(len(arr)):
//         windowSum += arr[windowEnd]
//         if windowEnd >= K - 1:
//             result.append(windowSum / K)
//             windowSum -= arr[windowStart]
//             windowStart += 1
//     return result
// This function finds the averages of all subarrays of size K using a sliding window approach.

// Overall, the problem involves calculating the average of every subarray of a given size within the given array and returning a list of these averages. This can be accomplished using a sliding window approach or other techniques in the context of programming or problem-solving.

function func(nums, k) {
  const result = [];
  let windowSum = 0,
    windowStart = 0;

  for (let i = 0; i < nums.length; i++) {
    windowSum += nums[i];
    if (i >= k - 1) {
      result.push(windowSum / k);
      windowSum = windowSum - nums[windowStart];
      windowStart += 1;
    }
  }
  return result;
}

const nums = [1, 3, 2, 6, -1, 4, 1, 8, 2];

const result = func(nums, 5);
console.log(result);

// Sliding Window Approach
// Time Complexity
// Single pass: When using the sliding window approach, the algorithm only requires one pass through the array, resulting in a time complexity of O(N), where N is the number of elements in the array.
// Sliding window: This approach allows for constant-time operations, as it adds a new element to the sum and subtracts the outgoing element. This leads to a time complexity of O(N).
// Space Complexity
// Result array: The space required for the result array is approximately O(N) for storing the averages of all possible subarrays of size K.
// Additional variables: The algorithm uses a few extra variables that take up constant space, resulting in a space complexity of O(1).
// Application of the Sliding Window Approach
// The sliding window approach is particularly useful for solving problems where the size of the window is not fixed. It allows us to efficiently handle expanding or shrinking the window based on the problem constraints.

// Example
// For instance, consider a problem where we need to find the maximum sum of any subarray of size K within an array. In this case, we can efficiently use the sliding window approach to calculate the sum of subarrays without re-calculating the sum for overlapping subarrays.

// Next Steps
// In the subsequent chapters, we will explore and apply the sliding window approach to solve various problems, including those where the window size is dynamic. This will provide a comprehensive understanding of how to effectively use the sliding window pattern in problem-solving.
