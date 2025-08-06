function func(input) {
  let stack = [];
  let i = 0;
  let lengthOfInput = input.length;
  let min = Infinity;
  while (input.length) {
    stack.push(input.pop());
  }
  while (i < lengthOfInput) {
    while (stack.length) {
      const ele = stack.pop();
      if (ele < min) {
        if (min == Infinity) {
          min = ele;
        } else {
          input.push(min);
          min = ele;
        }
      } else {
        input.push(ele);
      }
    }

    while (input.length > i) {
      stack.push(input.pop());
    }
    i++;
    input.push(min);
    min = Infinity;
  }
  return input;
}
function fun2(stack) {
  let tempStack = [];

  while (stack.length) {
    let temp = stack.pop();

    while (tempStack.length && tempStack[tempStack.length - 1] > temp) {
      stack.push(tempStack.pop());
    }

    tempStack.push(temp);
  }
  return tempStack;
}
const input = [4, 3, 2, 10, 12, 1, 5, 6];
const result = func2(input);
console.log(result);

// Solution
// This problem can be solved by using a temporary stack as auxiliary storage. The algorithm takes an input stack and sorts it using a temporary stack tmpStack. The sorting process is done by continuously popping elements from the input stack and pushing them onto the tmpStack in sorted order, rearranging elements as necessary between the stacks until the original stack is empty.

// This algorithm leverages the LIFO (last in, first out) nature of a stack. It removes elements from the original stack one by one and uses a second stack to keep the elements sorted. If the top element of the sorted stack is larger than the current element, it moves the larger elements back to the original stack until it finds the correct spot for the current element, at which point it pushes the current element onto the sorted stack. Because of this, the smaller elements end up at the bottom of the sorted stack and the largest element on the top, resulting in a stack sorted in descending order from top to bottom.

// Step-by-Step Algorithm
// The sort method receives an input stack.

// It initializes an empty temporary stack tmpStack.

// The algorithm enters a loop that continues until the input stack is empty.

// In each iteration, it pops the top element (tmp) from the input stack.

// Then it enters another loop, which continues as long as tmpStack is not empty and the top of tmpStack is larger than tmp. In each iteration of this inner loop, it pops the top element from tmpStack and pushes it back onto the input stack.

// After the inner loop ends, it pushes tmp onto tmpStack. The inner loop ensures that tmpStack is always sorted in descending order, with smaller elements at the bottom and larger elements at the top, and tmp is placed into its correct position in this order.

// Once the outer loop ends and the input stack is empty, tmpStack contains all the elements originally in the input stack but sorted in descending order.

// It then returns tmpStack.

// Algorithm Walkthrough
// Initial Setup:

// Input Stack (top to bottom): [34, 3, 31, 98, 92, 23]
// Temporary Stack (tmpStack): Empty
// Process Element: 23

// Pop 23 from the input stack.
// tmpStack is empty, so push 23 onto tmpStack.
// Input Stack: [34, 3, 31, 98, 92], tmpStack: [23]
// Process Element: 92

// Pop 92 from the input stack.
// Since 23 < 92, push 92 onto tmpStack.
// Input Stack: [34, 3, 31, 98], tmpStack: [23, 92]
// Process Element: 98

// Pop 98 from the input stack.
// Since 92 < 98, push 98 onto tmpStack.
// Input Stack: [34, 3, 31], tmpStack: [23, 92, 98]
// Process Element: 31

// Pop 31 from the input stack.
// Move elements from tmpStack to input stack until the correct position for 31 is found.
// Pop 98, then 92 from tmpStack and push them onto the input stack.
// Push 31 onto tmpStack.
// Input Stack: [34, 3, 98, 92], tmpStack: [23, 31]
// In next 2 iterations, pop 98, and 92 from input stack and push back to the tmpStack. Updated stack will be: Input Stack: [34, 3], tmpStack: [23, 31, 92, 98].
// Process Element: 3

// Pop 3 from the input stack.
// Move elements from tmpStack to input stack until the correct position for 3 is found.
// Pop 98, 92, 31, then 23 from tmpStack and push them onto the input stack.
// Push 3 onto tmpStack.
// Input Stack: [34, 98, 92, 31, 23], tmpStack: [3]
// In next 4 iterations, pop 98, 92, 31, and 23 from the input stack and push back to the tmpStack. Updated stack will be: Input Stack: [34], tmpStack: [3, 23, 31, 92, 98].
// Process Element: 34

// Pop 34 from the input stack.
// Move elements from tmpStack to input stack until the correct position for 34 is found.
// Pop 98, then 92 from tmpStack and push them onto the input stack.
// Push 34 onto tmpStack.
// Input Stack: [98, 92], tmpStack: [3, 23, 31, 34].
// In next 2 iterations, pop 98, and 92 from the input stack and push to the tmpStack.
// Final Result:

// Input Stack: Empty
// tmpStack (Sorted, top to bottom): [3, 23, 31, 34, 92, 98]

// Complexity Analysis
// Time Complexity
// Explanation at Beginner Level

// Outer while loop: This loop runs until all elements in the input stack are moved to the temporary stack.
// Inner while loop: This loop runs for each element being moved from the input stack to the temporary stack, and in the worst case, it can take a long time if the elements are in a certain order.
// Overall time complexity: The time it takes to complete the sorting algorithm, which depends on the number of elements in the input stack (N).
// Example: If we have 5 elements in the input stack, the time it takes to sort them could depend on the order of the elements and how many times they need to be moved between the stacks.

// Space Complexity
// Explanation at Beginner Level

// Temporary stack: The extra space used by the temporary stack to hold the sorted elements.
// Input stack: The space used by the input stack itself, which is not considered extra space since it's part of the input.
// Other variables: Additional space used by variables in the algorithm.
// Overall space complexity: The total amount of space used by the algorithm.
// Example: If we have 5 elements in the input stack, the space complexity considers the space used by the temporary stack and other variables used in the sorting process.

// Summary
// Understanding the time and space complexity of an algorithm helps us analyze its efficiency and performance based on the input size. For this specific sorting algorithm, the time and space complexity depend on the number of elements in the input stack.
