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
      result.push(input[i], i + 1);
    }
  }
  return result;
}

const input = [3, 1, 2, 3, 6, 4];

const result = func(input);
console.log(result);

// Explanation of User's Selected Text
// Cyclic Sort Pattern:
// Beginner: Cyclic Sort is a technique to sort an array of numbers by placing each number at its correct index in the array.
// Similarities with Find all Duplicate Numbers:
// Intermediate: The problem being discussed is similar to another problem called "Find all Duplicate Numbers," which suggests that the approach used to solve the latter problem can be applied here as well.
// Approach:
// Intermediate: The approach involves placing each number at its correct index using the cyclic sort technique. After sorting, the algorithm iterates through the array to identify the number that is not at the correct index.
// Identifying Duplicated and Missing Numbers:
// Intermediate: Since only one number got corrupted, the number at the wrong index represents the duplicated number, and the index itself represents the missing number.
// Example:
// Advanced: For example, if the input array is [3, 1, 4, 2, 5, 5], after applying the cyclic sort, the array becomes [1, 2, 3, 4, 5, 5]. In this case, the number 5 at index 5 is the duplicated number, and the missing number is 6 (based on the index).
// By breaking down the explanation into these sections, the student can gradually understand the concept of using the Cyclic Sort pattern to identify duplicated and missing numbers in an array.
//
//

// Explanation of Time and Space Complexity
// Beginner Level
// Time complexity refers to the amount of time it takes for an algorithm to run and complete its task.
// For example, if you have a list of 10 numbers and you need to find the sum of all the numbers, the time complexity would refer to how long it takes to do that.
// Space complexity refers to the amount of memory space used by an algorithm to carry out a task.
// For instance, if you need to store a list of 1000 numbers in memory to find the average, the space complexity would refer to how much memory space is used.
// Intermediate Level
// The notation O(n) used to denote time complexity means that the time taken by the algorithm increases linearly with the size of the input.
// For instance, if you have an algorithm that sums up the numbers in a list, and the size of the list doubles, the time taken to find the sum will also approximately double.
// The notation O(1) for space complexity means that the algorithm uses a constant amount of memory space, regardless of the input size.
// Consider a function that calculates the average of a list of numbers. Even if the list gets larger, the space used by the algorithm to perform this task remains the same.
// Advanced Level
// In the case of the algorithm mentioned, with a time complexity of O(n), this means that as the input size increases, the time taken for the algorithm to run will increase linearly.
// For example, if the algorithm needs to perform a task on a list of 100 items, it will take roughly twice as long as for a list of 50 items.
// The space complexity of O(1) indicates that the algorithm uses a constant amount of space, regardless of the input size.
// In practical terms, this means that the amount of memory needed by the algorithm does not increase with the size of the input.
// By understanding time and space complexity, software engineers can make informed decisions about which algorithms to use based on the scale of data being processed.
