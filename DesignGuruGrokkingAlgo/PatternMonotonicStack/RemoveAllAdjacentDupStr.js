function func(input) {
  let stack = [];
  let i = 0;
  while (i < input.length) {
    const ele = input[i];

    if (stack.length && ele == stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(ele);
    }

    i++;
  }
  return stack.join("");
}
// Remove duplicate when k element
function removeDuplicates(s, k) {
  let stack = []; // Initialize an empty stack to track characters and their counts.

  for (let c of s) {
    if (stack.length > 0 && stack[stack.length - 1][0] === c)
      // If the stack is not empty and the current character is the same as the top of the stack.
      stack[stack.length - 1][1]++; // Increment the count of the top character in the stack.
    else stack.push([c, 1]); // Otherwise, push a new character-count pair onto the stack.

    if (stack[stack.length - 1][1] === k)
      // If the count of the top character in the stack reaches 'k'.
      stack.pop(); // Remove it from the stack.
  }

  let result = "";
  for (let [c, n] of stack) // Reconstruct the string from the characters remaining in the stack.
    result += c.repeat(n);
  return result;
}

const result = func("abcd");
console.log(result);

// Solution
// This problem can be solved efficiently using a stack, which can mimic the process of eliminating adjacent duplicates.

// Algorithm Walkthrough

// Initialize an empty stack.
// Loop through the characters in the given string s.
// For each character:
// If the stack is not empty and the current character is the same as the top character on the stack, pop the character from the stack.
// Otherwise, push the current character onto the stack.
// Finally, build the result string from the characters remaining on the stack.
// Image

// Understanding Time and Space Complexity
// Beginner Level
// Time Complexity:

// Time complexity refers to the amount of time an algorithm takes to complete, based on the input size.
// In this case, the time complexity of the algorithm is described as O(N), where N is the length of the input string s.
// This means that the number of operations the algorithm performs increases linearly with the length of the input string.
// Space Complexity:

// Space complexity refers to the amount of memory space an algorithm uses based on the input size.
// The space complexity of this algorithm is also O(N), as in the worst case scenario, every character in the input string is stored onto the stack.
// Intermediate Level
// Time Complexity:

// Time complexity is commonly denoted using the Big O notation.
// For example, if a loop iterates through each character in a string, the time complexity would be O(N) where N is the length of the string.
// Space Complexity:

// Space complexity describes the amount of memory an algorithm uses in relation to the input size.
// In the case mentioned, the space complexity is O(N) as every character in the input string could potentially be stored in the stack.
// Advanced Level
// Time Complexity:

// The time complexity of an algorithm describes the amount of time it takes to complete in relation to the size of the input.
// In this case, O(N) indicates that the algorithm's time requirement grows linearly with the length of the input string.
// Space Complexity:

// Space complexity defines the amount of memory space an algorithm requires relative to the input size.
// The algorithm's space complexity is also O(N) because the worst-case scenario involves pushing every character in the input string onto the stack, requiring space proportional to the input size.
