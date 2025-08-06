function func(input) {
  let i = 0;

  while (i < input.length) {
    let correctIndex = input[i];
    if (input[i] < input.length && input[correctIndex] != input[i]) {
      const temp = input[correctIndex];
      input[correctIndex] = input[i];
      input[i] = temp;
    } else {
      i++;
    }
  }

  for (let i = 0; i < input.length; i++) {
    if (input[i] != i) {
      return i;
    }
  }
  return input.length;
}

const input = [8, 3, 5, 2, 4, 6, 0, 1];

const result = func(input);
console.log(result);

// Solution
// This problem follows the Cyclic Sort pattern. Since the input array contains unique numbers from the range 0 to ‘n’, we can use a similar strategy as discussed in Cyclic Sort to place the numbers on their correct index. Once we have every number in its correct place, we can iterate the array to find the index which does not have the correct number, and that index will be our missing number.

// However, there are two differences with Cyclic Sort:

// In this problem, the numbers are ranged from ‘0’ to ‘n’, compared to ‘1’ to ‘n’ in the Cyclic Sort. This will make two changes in our algorithm:

// In this problem, each number should be equal to its index, compared to index - 1 in the Cyclic Sort. Therefore => nums[i] == nums[nums[i]].

// Since the array will have ‘n’ numbers, which means array indices will range from 0 to ‘n-1’. Therefore, we will ignore the number ‘n’ as we can’t place it in the array, so => nums[i] < nums.length

// Say we are at index i. If we swap the number at index i to place it at the correct index, we can still have the wrong number at index i. This was true in Cyclic Sort too. It didn’t cause any problems in Cyclic Sort as over there, we made sure to place one number at its correct place in each step, but that wouldn’t be enough in this problem as we have one extra number due to the larger range. Therefore, before swapping we will check if the number at index i is within the permissible range i.e., it is less than the length of the input array, if not, we will skip ahead.

// Time Complexity
// The time complexity of an algorithm measures how the running time of the algorithm increases as the size of the input increases. In this case, the time complexity of the algorithm is denoted as O(n), where n represents the size of the input array.

// Explanation: The algorithm uses a while loop to swap numbers and find the first missing number in the array. Despite not always incrementing the loop index i when swapping numbers, the worst-case scenario results in the loop swapping n-1 numbers. Additionally, after a number is correctly placed, the algorithm iterates through the rest of the array. Overall, the algorithm's time complexity is asymptotically equivalent to O(n).
// Space Complexity
// The space complexity of an algorithm refers to the amount of memory space required by the algorithm as the input size increases. In this case, the algorithm runs in constant space O(1), meaning that the amount of memory used does not increase as the input size grows.

// Explanation: The algorithm uses a fixed amount of memory space, regardless of the size of the input array. This is denoted by the O(1) space complexity.
// By understanding both time and space complexity, we can evaluate and compare algorithms to determine their efficiency and scalability.
