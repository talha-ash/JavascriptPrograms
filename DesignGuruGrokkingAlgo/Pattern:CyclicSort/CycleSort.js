// Explanation of Cyclic Sort Pattern
// Beginner Level

// Understanding the Problem
// The problem involves finding missing numbers in an unsorted array containing a range of numbers 1 to n.
// The array may have duplicates, and our goal is to find the missing numbers efficiently.
// Approach Using Cyclic Sort Pattern
// Utilizing Range of Numbers: Because the input array contains numbers in the range of 1 to n, we can use this fact to efficiently solve the problem.

// Placing Numbers at Correct Index: To sort the array efficiently, we can attempt to place each number at its correct position in the array. For example, we can place 1 at index 0, 2 at index 1, and so on.

// Finding Missing Numbers: After sorting, we can iterate through the array to identify the indices that do not contain the correct numbers, as these will correspond to the missing numbers in the range.

// Example
// Given unsorted array: [3, 1, 3, 5, 2, 2]
// After sorting efficiently: [1, 2, 3, 3, 5, 2]
// Missing numbers: 4, 6
// This way, we can efficiently find the missing numbers in the given range using the Cyclic Sort pattern.

// The goal of this explanation is to introduce the concept of the Cyclic Sort pattern and its application in solving the problem of finding missing numbers in an unsorted array with a range of numbers from 1 to n. This beginner-level explanation breaks down the approach and provides a simple example to illustrate the concept.

function func(input) {
  let i = 0;
  while (i < input.length) {
    let correctIndex = input[i] - 1;
    if (input[correctIndex] != input[i]) {
      const temp = input[correctIndex];
      input[correctIndex] = input[i];
      input[i] = temp;
    } else {
      i++;
    }
  }
  return input;
}

const input = [2, 5, 6, 4, 3, 1];

const result = func(input);
console.log(result);

// Solution
// As we know, the input array contains numbers from the range 1 to n. We can use this fact to devise an efficient way to sort the numbers. Since all numbers are unique, we can try placing each number at its correct place, i.e., placing 1 at index ‘0’, placing 2 at index ‘1’, and so on.

// To place a number (or an object in general) at its correct index, we first need to find that number. If we first find a number and then place it at its correct place, it will take us , which is not acceptable as mentioned in the problem statement.

// Instead, what if we iterate the array one number at a time, and if the current number we are iterating is not at the correct index, we swap it with the number at its correct index. This way, we will go through all numbers and place them at their correct indices, hence, sorting the whole array.

// Time Complexity

// In simple terms, time complexity measures how the number of operations an algorithm performs grows as the size of the input (denoted as n) grows. In the given algorithm, the time complexity is O(n), which means that the number of operations will grow linearly with the size of the input.

// Explanation: This means that as the input size increases, the time taken by the algorithm will also increase proportionally.

// Example: If you have an array with 10 elements, the algorithm may take a certain amount of time. If the array size doubles to 20 elements, the algorithm may take approximately twice as much time to complete.

// Space Complexity

// Space complexity refers to the amount of memory (space) an algorithm uses in relation to the input size. In this algorithm, the space complexity is O(1), indicating that the amount of memory used remains constant, regardless of the input size.

// Explanation: This means that the algorithm uses a consistent amount of memory, regardless of how large the input is.

// Example: Even if the input array grows larger, the algorithm will still use the same amount of memory to complete its tasks.

// If you have any specific questions or need further explanation, feel free to ask!
