function func(input) {
  let stack = [];
  let i = 0;
  let result = new Array(input.length).fill(0);
  let resultPointer = input.length - 1;
  for (let i = input.length - 1; i >= 0; i--) {
    let stackEle = stack.length ? stack[stack.length - 1] : null;
    let ele = input[i];
    if (!stackEle) {
      stack.push(ele);
      result[resultPointer] = -1;
      resultPointer--;
    } else if (ele < stackEle) {
      stack.push(ele);
      result[resultPointer] = stackEle;
      resultPointer--;
    } else {
      stack.pop();
      while (true) {
        if (stack.length) {
          stackEle = stack[stack.length - 1];
          if (ele < stackEle) {
            stack.push(ele);
            result[resultPointer] = stackEle;
            resultPointer--;

            break;
          } else {
            stack.pop();
          }
        } else {
          stack.push(ele);
          result[resultPointer] = -1;
          resultPointer--;
          break;
        }
      }
    }
  }
  return result;
}

const input = [13, 7, 6, 12];
const result = func(input);
console.log(result);

class Solution {
  nextLargerElement(arr) {
    let stack = []; // Initialize an empty stack to store indices of elements
    let res = new Array(arr.length).fill(-1); // Initialize a result array with -1 values

    // Iterate through the input array from right to left
    for (let i = arr.length - 1; i >= 0; i--) {
      while (stack.length && stack[stack.length - 1] <= arr[i]) {
        // While the stack is not empty and the element at the top of the stack
        // is less than or equal to the current element, pop elements from the stack
        stack.pop();
      }

      if (stack.length) {
        // If the stack is not empty after popping, it means the current element
        // has found its next larger element
        res[i] = stack[stack.length - 1];
      }

      // Push the current element's index onto the stack
      stack.push(arr[i]);
    }

    return res; // Return the result array containing the next larger elements
  }
}

// Test cases
let sol = new Solution();
console.log(sol.nextLargerElement([4, 5, 2, 25])); // [5, 25, 25, -1]
console.log(sol.nextLargerElement([13, 7, 6, 12])); // [-1, 12, 12, -1]
console.log(sol.nextLargerElement([1, 2, 3, 4, 5])); // [2, 3, 4, 5, -1]

// Solution:
// A simple algorithm is to run two loops: the outer loop picks all elements one by one, and the inner loop looks for the first greater element for the element picked by the outer loop. However, this algorithm has a time complexity of .

// We can use a more optimized approach using Stack data structure. The algorithm will leverage the nature of the stack data structure, where the most recently added (pushed) elements are the first ones to be removed (popped). Starting from the end of the array, the algorithm always maintains elements in the stack that are larger than the current element. This way, it ensures that it has a candidate for the "next larger element". If there is no larger element, it assigns -1 to that position. It handles each element of the array only once, making it an efficient solution.

// Detailed Step-by-Step Walkthrough

// The function receives an array arr.

// Initialize an empty stack s and an output array res of size equal to the input array, with all elements initialized to -1. res will store the result, i.e., the next larger element for each position in the array.

// Start a loop that goes from the last index of the array to the first (0 index).

// In each iteration, while there are elements in the stack and the top element of the stack is less than or equal to the current element in the array, remove elements from the stack. This step ensures that we retain only the elements in the stack that are larger than the current element.

// After the popping process, if there is still an element left in the stack, it is the next larger element for the current array element. So, assign the top element of the stack to the corresponding position in the res array.

// Now, push the current array element into the stack. This action considers the current element as a possible "next larger element" for the upcoming elements in the remaining iterations.

// Repeat steps 4-6 for all the elements of the array.

// At the end of the loop, res will contain the next larger element for each position in the array. Return this array res.

// Algorithm Walkthrough
// Let's consider the input and observe how above algorithm works.

// Initialize Data Structures:

// Input Array: [13, 7, 6, 12]
// Result Array: [0, 0, 0, 0] (Initially set to zeros)
// Stack: Empty (Will store elements during iteration)
// Processing Each Element (Reverse Order):

// The algorithm processes the array from right to left.
// Last Element (Value 12):

// Stack is empty, indicating no greater element for 12.
// Result Array: [0, 0, 0, -1] (Updates the last position to -1)
// Push element 12 onto the stack.
// Third Element (Value 6):

// Stack's top element is 12, which is greater than 6.
// Result Array: [0, 0, 12, -1] (Updates the value at the third position to 12)
// Push element 6 onto the stack.
// Second Element (Value 7):

// Stack's top element is 6, which is less than 7, so it's popped.
// Next, the stack's top element is 12, which is greater than 7.
// Result Array: [0, 12, 12, -1] (Updates the value at the second position to 12)
// Push element 7 onto the stack.
// First Element (Value 13):

// Stack's top element is 7, which is less than 13, so it's popped.
// Next, stack's top element is 12, which is also less than 13, so it's popped.
// Stack is now empty, indicating no greater element for 13.
// Result Array: [-1, 12, 12, -1] (Updates the first position to -1)
// Push element 13 onto the stack.

// Time Complexity
// Single pass (reverse iteration)
// The algorithm goes through the input list in reverse order, processing each element exactly once.
// This operation takes O(N) time, where N is the number of elements in the list.
// Stack operations
// For each element in the list, the algorithm performs push and pop operations on the stack.
// Each element is pushed onto the stack once and popped at most once, leading to a time complexity of O(N).
// Reversing the result list
// Reversing the result list takes O(N) time.
// Overall time complexity
// The overall time complexity is O(N).
// Space Complexity
// Stack space
// In the worst case, if the input list is strictly decreasing, all elements will be pushed onto the stack, requiring O(N) space.
// Result list
// The result list stores the Next Greater Element (NGE) for each element in the input list, so it also requires O(N) space.
// Overall space complexity
// The overall space complexity is O(N).
// This explanation is at an intermediate level and assumes familiarity with basic programming concepts and data structures. If the student is new to these concepts, I would start with more basic explanations and examples.
