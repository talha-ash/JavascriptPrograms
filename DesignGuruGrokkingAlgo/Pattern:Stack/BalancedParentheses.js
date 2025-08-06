function func(str) {
  let stack = [];
  let hash = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  if (str.length < 2) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    const ele = str[i];
    if (ele === "(" || ele === "{" || ele === "[") {
      stack.push(ele);
    } else if (ele === ")" || ele === "}" || ele === "]") {
      const value = stack.pop();
      if (ele !== hash[value]) {
        return false;
      }
    }
  }
  return true;
}

const input = "{[}]";
const result = func(input);
console.log(result);

// Solution
// To solve this problem, we use a stack data structure. As we traverse the string, each time we encounter an opening parenthesis ('(', '{', or '['), we push it onto the stack. When we find a closing parenthesis (')', '}', or ']'), we check if it matches the type of the opening parenthesis at the top of the stack. If it matches, we pop the top element from the stack; if not, or if the stack is empty when we find a closing parenthesis, the string is not balanced, and we return false.

// After processing the entire string, if the stack is empty, it means all parentheses were properly closed and nested, so we return true. Otherwise, we return false.

// Here is a step-by-step algorithm:

// Initialize an empty Stack.
// Iterate over the string of parentheses.
// If the current character is an opening parenthesis, push it onto the Stack.
// If the current character is a closing parenthesis, check the top of the Stack.
// If the Stack is empty, then the string is not balanced (there is a closing parenthesis without a matching opening parenthesis), so return false.
// If the top of the Stack is the matching opening parenthesis, pop it off the Stack.
// If the top of the Stack is not the matching opening parenthesis, then the string is not balanced, so return false.
// After checking all parentheses, if the Stack is empty, then the string is balanced, so return true. If the Stack is not empty, then there are unmatched opening parentheses, so the string is not balanced, return false.
// Algorithm Walkthrough
// Let's consider the input "{[()]}", and observe how algorithm works.

// Initialization:

// Start with an empty stack.
// Iteration 1: Character = '{'

// Stack before operation: []
// Since '{' is an opening bracket, push it onto the stack.
// Iteration 2: Character = '['

// Stack before operation: ['{']
// Since '[' is an opening bracket, push it onto the stack.
// Iteration 3: Character = '('

// Stack before operation: ['{', '[']
// Since '(' is an opening bracket, push it onto the stack.
// Iteration 4: Character = ')'

// Stack before operation: ['{', '[', '(']
// ')' is a closing bracket. The top of the stack is '(', which is the corresponding opening bracket for ')'. So, pop '(' from the stack.
// Iteration 5: Character = ']'

// Stack before operation: ['{', '[']
// ']' is a closing bracket. The top of the stack is '[', which is the corresponding opening bracket for ']'. So, pop '[' from the stack.
// Iteration 6: Character = '}'

// Stack before operation: ['{']
// '}' is a closing bracket. The top of the stack is '{', which is the corresponding opening bracket for '}'. So, pop '{' from the stack.
// Final Check:

// After processing all characters, check the stack.
// The stack is empty, indicating that all opening brackets were properly matched and closed.
// Therefore, the input string "{[()]}" is valid with properly balanced parentheses.

// Explanation of Complexity Analysis
// Time Complexity
// Single pass: The algorithm goes through each character in the input string once, so the time complexity is O(N), where N is the length of the input string.
// Stack operations: Pushing and popping elements from the stack takes constant time, O(1).
// Overall time complexity: O(N) + O(1) = O(N)

// Space Complexity
// Stack space: In the worst case, the space used by the stack is proportional to the length of the input string, so the space complexity is O(N).
// Additional variables: The algorithm uses a few additional variables that require constant space, O(1).
// Overall space complexity: O(N) + O(1) = O(N)

// Example
// For example, if the input string is "((()))", the algorithm will go through all 6 characters in the string once, resulting in a time complexity of O(6) = O(6).

// The stack will hold all opening parentheses, and in the worst case (if the string only contains opening parentheses), the space complexity will also be O(6).

// Conclusion
// In summary, the time and space complexities of this algorithm are both O(N), where N is the length of the input string. This means that the algorithm's performance grows linearly with the size of the input string.
