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

  console.log(input);
  for (let i = 0; i < input.length; i++) {
    if (input[i] != i + 1) {
      console.log(input[i]);
      result.push(input[i]);
    }
  }
  return result;
}

const input = [3, 4, 4, 5, 5];

const result = func(input);
console.log(result);

// Explanation of the Cyclic Sort Pattern
// The Cyclic Sort pattern is a technique used to place each number at its correct index within an array. This is done by iteratively swapping the elements until they are in their correct positions. This pattern is especially useful for finding duplicates within an array.

// Similarities with Find the Duplicate Number
// The problem at hand shares similarities with the "Find the Duplicate Number" problem, which also involves identifying duplicate numbers within an array. Both problems can be solved using the Cyclic Sort pattern.

// Approach to the Solution
// Placing Numbers at Correct Index: We use the Cyclic Sort pattern to place each number at its correct index within the array.

// For example, given the array [3, 1, 4, 2, 2], we would start by placing the number 3 at index 2, then 1 at index 0, and so on.
// Identifying Duplicate Numbers: After placing the numbers at their correct indices, we iterate through the array to find all numbers that are not in the expected positions.

// For the example array [3, 1, 4, 2, 2], we would find that the number 2 is at index 3 instead of at index 1, indicating a duplicate.
// Duplicate Numbers: All the numbers that are not at the correct indices are duplicates.

// In the example array, the number 2 is a duplicate because it appears more than once and is not at the correct index.
// This approach allows us to efficiently identify and find duplicate numbers within an array using the Cyclic Sort pattern.

// This explanation is tailored for an intermediate level of understanding.
// Time Complexity The time complexity of an algorithm measures how the amount of
// time it takes to run increases with the size of the input. In this case, the
// time complexity of the algorithm mentioned is O(n), where "n" represents the
// size of the input.

// Example:
// If the input size doubles, the time taken for the algorithm to run will also approximately double.

// Space Complexity
// The space complexity of an algorithm measures how the amount of memory it uses increases with the size of the input.

// Ignoring the space required for storing the duplicates, the algorithm runs in constant space O(1), which means its memory usage does not increase with the size of the input.
// This is good because it means the algorithm is efficient in terms of memory usage, regardless of input size.
// Example:
// Even if the input data becomes very large, the amount of memory the algorithm uses to process it remains relatively constant.
