function func(input) {
  let stack = [];
  let hash = {};
  let i = 0;

  while (i < input.length) {
    const ele = input[i];

    while (stack.length && ele > input[stack[stack.length - 1]]) {
      const popEle = stack.pop();
      hash[popEle] = i - popEle;
    }
    stack.push(i);
    i++;
  }
  while (stack.length) {
    const popEle = stack.pop();
    hash[popEle] = 0;
  }

  let result = [];
  for (let i = 0; i < input.length; i++) {
    result.push(hash[i]);
  }
  return result;
}

const result = func([70, 71, 72, 73]);
console.log(result);

// Solution
// This problem is quite similar to 'Next Greater Element'. We can use a monotonically increasing stack to find the next higher temperature.

// We will use a stack to store the indices of the temperatures array. We iterate over the array, and for each temperature, we check whether the current temperature is greater than the temperature at the index on the top of the stack. If it is, we update the corresponding position in the result array and pop the index from the stack.

// Algorithm Walkthrough

// Initialize an empty stack to store the indices of the temperatures array. Also, initialize a result array of the same length as temperatures with all values set to 0.

// Iterate over the temperatures array. For each temperature:

// While the stack is not empty and the current temperature is greater than the temperature at the index on the top of the stack, set the value in the result array at the top index of the stack to the difference between the current index and the top index of the stack. Pop the index from the stack.
// Push the current index onto the stack.
// Return the result array.

//   Intermediate Explanation:
//   Time Complexity:
//   The time complexity of an algorithm measures how the runtime of the algorithm grows as the size of its input grows.
//   In this case, the time complexity is O(N) where N is the size of the temperatures array.
//   This means that the time taken by the algorithm to process the temperatures array increases linearly with the size of the array.
//   Space Complexity:
//   The space complexity of an algorithm measures how much additional memory it requires as the size of its input grows.
//   In this case, the space complexity is also O(N) where N is the size of the temperatures array.
//   This is because the algorithm uses extra space for a stack and an output list, and the amount of space used grows linearly with the size of the input array.
//   Example:
//   temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
//   # Let's say N = 8
//   # The time complexity is O(N) and space complexity is also O(N)
//   By understanding time and space complexity, we can evaluate how an algorithm performs as the input size increases. It helps in comparing different algorithms and choosing the most efficient one for a specific task.
