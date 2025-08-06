function func(str) {
  let stack = [];
  let result = "";

  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }
  for (let i = 0; i < str.length; i++) {
    result += stack.pop();
  }
  return result;
}

const input = "Hello--World!";
const result = func(input);
console.log(result);

// Solution
// The solution to reverse a string can be elegantly achieved using a stack. The algorithm involves pushing each character of the string onto a stack and then popping them off, which naturally reverses their order. As we iterate through the string, each character is added to the top of the stack.

// Once the entire string has been processed, we remove the characters from the stack one by one and append them to a new string. This process ensures that the characters are appended in reverse order, as the last character pushed onto the stack will be the first to be popped off. This method efficiently reverses the string while maintaining the integrity of the original data.

// Here is the step-by-step algorithm.

// Initialize an empty stack.
// For each character in the input string, push the character into the stack.
// Initialize an empty string to hold the reversed string.
// While the stack is not empty, pop out the top character from the stack and append it to the reversed string.
// Finally, return the reversed string.

//   Complexity Analysis
//   Time Complexity
//   Pushing characters onto the stack:

//   This operation takes O(N) time, where N is the length of the input string.
//   For example, if the input string has 5 characters, the operation takes 5 units of time.
//   Popping characters from the stack:

//   After pushing all characters onto the stack, the algorithm pops each character to form the reversed string.
//   This also takes O(N) time, since every character is popped once.
//   Overall time complexity:

//   The overall time complexity is O(N) because both pushing and popping operations are O(N).
//   Space Complexity
//   Stack space:

//   In the worst case, the stack will contain N characters, requiring O(N) space.
//   StringBuilder:

//   The StringBuilder used to construct the reversed string also stores N characters, requiring O(N) space.
//   Additional variables:

//   The algorithm uses a few additional variables, requiring constant space.
//   Overall space complexity:

//   The space complexity is dominated by O(N) due to the stack and StringBuilder scaling with the size of the input.
//   In summary, the time complexity of the algorithm is O(N) and the space complexity is O(N).
