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
      result.push(i + 1);
    }
  }
  return result;
}

const input = [2, 4, 1, 2];

const result = func(input);
console.log(result);

// Solution
// This problem follows the Cyclic Sort pattern and shares similarities with Find the Missing Number with one difference. In this problem, there can be many duplicates whereas in ‘Find the Missing Number’ there were no duplicates and the range was greater than the length of the array.

// However, we will follow a similar approach though as discussed in Find the Missing Number to place the numbers on their correct indices. Once we are done with the cyclic sort we will iterate the array to find all indices that are missing the correct numbers.

//   Time Complexity
//   The time complexity of an algorithm describes how the time taken to run the algorithm changes as the size of the input (denoted as 'n') increases.

//   O(n) indicates that the time taken by the algorithm grows linearly with the size of the input. For example, if the input size doubles, the time taken also doubles.
//   Space Complexity
//   The space complexity of an algorithm refers to how much memory or space it requires to run.

//   O(1) signifies constant space complexity, meaning that the amount of memory used by the algorithm does not change as the size of the input increases. It remains the same regardless of the input size.
//   Example
//   For example, let's consider an algorithm that adds up all the numbers in an array.

//   If the input array has 10 elements, and the algorithm takes 10 seconds to run, its time complexity is O(n) because as the input size (number of elements in the array) grows, the time taken to run the algorithm also grows linearly.
//   If the algorithm only needs a fixed amount of memory to store the result, regardless of the input array size, its space complexity is O(1) because the space used is constant.
//   Understanding time and space complexity helps us analyze and compare the efficiency of different algorithms when solving problems.
