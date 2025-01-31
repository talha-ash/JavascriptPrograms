function func(input) {
  let i = 0;

  while (i < input.length) {
    let correctIndex = input[i];
    let validNum = input[i] < input.length + 1 && input[i] > 0;
    if (validNum && input[correctIndex] != input[i]) {
      const temp = input[correctIndex];
      input[correctIndex] = input[i];
      input[i] = temp;
    } else {
      i++;
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] != i + 1) {
      return i + 1;
    }
  }
  return input.length + 1;
}

const input = [-1, -2, -3, -4];

const result = func(input);
console.log(result);

class Solution {
  findNumber(nums) {
    let i = 0;
    let n = nums.length;
    while (i < n) {
      let j = nums[i] - 1;
      // Check if the current element is a positive integer within the valid range
      // and if it's not already in its correct position (i.e., nums[i] !== nums[j]).
      if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]]; // Swap the current element with its correct position.
      } else {
        i += 1; // Move to the next element.
      }
    }
    for (i = 0; i < n; i++) {
      // Find the first index where the element does not match its expected positive value.
      if (nums[i] !== i + 1) {
        return i + 1;
      }
    }

    // If all elements from 1 to n are present, return n + 1.
    return n + 1;
  }
}

// Explanation of the Cyclic Sort Pattern
// In the Cyclic Sort pattern, we place the numbers in an array in their correct positions by iterating through the array and swapping each number with the one at its correct index. This pattern is used when the numbers in the array are within a specific range or have some other constraint.

// Applying Cyclic Sort to Find the Missing Positive Number
// Understanding the Problem: We are looking for the smallest positive number that is missing from an array of numbers, which could potentially include negative numbers and numbers greater than the length of the array.

// Ignoring Out-of-Range Numbers: Similar to the approach used in the "Find the Missing Number" problem, we will ignore all numbers that are out of the range of the array (i.e., all negative numbers and all numbers greater than the length of the array).

// Implementing Cyclic Sort: We will use the cyclic sort pattern to place the remaining numbers in their correct positions within the array.

// Finding the Missing Number: After applying the cyclic sort, we will iterate through the array to find the first index that does not have the correct number. This first index will represent the smallest missing positive number.

// Example
// Suppose we have the input array: [3, 4, -1, 1]

// After applying the cyclic sort:

// First iteration: [1, 4, -1, 3]
// Second iteration: [1, -1, 3, 4]
// The first index that does not have the correct number is 1, so the smallest missing positive number is 2.

// By applying the Cyclic Sort pattern and following the outlined approach, we can efficiently find the smallest missing positive number in an array.
