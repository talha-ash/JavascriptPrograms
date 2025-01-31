function func(input) {
  let i = 0;
  let result = [];
  while (i < input.length) {
    let correctIndex = input[i] - 1;
    if (input[i] < input.length + 1 && input[correctIndex] != input[i]) {
      const temp = input[correctIndex];
      input[correctIndex] = input[i];
      input[i] = temp;
    } else {
      i++;
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] != i + 1) {
      return input[i];
    }
  }
}

const input = [2, 1, 3, 3, 5, 4];

const result = func(input);
console.log(result);

class Solution {
  findNumber(nums) {
    let i = 0;
    while (i < nums.length) {
      if (nums[i] !== i + 1) {
        let j = nums[i] - 1; // Calculate the correct index for the current element
        if (nums[i] !== nums[j]) {
          [nums[i], nums[j]] = [nums[j], nums[i]]; // Swap elements to their correct positions
        } else {
          // We have found the duplicate
          return nums[i]; // Return the duplicate number
        }
      } else {
        i += 1; // Move to the next element
      }
    }
    return -1; // No duplicate found
  }
}

// Solution
// This problem follows the Cyclic Sort pattern and shares similarities with Find the Missing Number. Following a similar approach, we will try to place each number on its correct index. Since there is only one duplicate, if while swapping the number with its index both the numbers being swapped are same, we have found our duplicate!

// Explanation of Time and Space Complexity
// Time Complexity
// The time complexity of an algorithm tells us how the running time of the algorithm grows as the input size increases.
// In this case, the time complexity of the algorithm is given as O(n) which means that the time taken by the algorithm to run is directly proportional to the size of the input (n).
// For example, if the input has 10 elements, the algorithm will take 10 units of time. If the input has 100 elements, the algorithm will take 100 units of time.
// Space Complexity
// The space complexity of an algorithm tells us how the space (memory) used by the algorithm grows as the input size increases.
// The algorithm in question runs in constant space O(1), which means that the amount of space it uses remains the same regardless of the input size.
// Even though it modifies the input array, the additional space it uses does not increase with the input size.
// Practical Example
// Consider a simple algorithm that sums up all the elements in an array:

// def sum_array(arr):
//     total = 0
//     for num in arr:
//         total += num
//     return total
// The time complexity of this algorithm is O(n) because the time taken to compute the sum grows linearly with the size of the input array.
// The space complexity is O(1) because the space used for the total variable does not increase with the input size.
