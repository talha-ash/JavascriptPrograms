function func(input) {
  let stack = [];
  let result = "";
  let splitted = input.split(/\/+/);

  for (let i = 0; i < splitted.length; i++) {
    const ele = splitted[i];
    if (ele == "..") {
      stack.pop();
    } else if (ele != "" && ele != ".") {
      stack.push(ele);
    }
  }
  return "/" + stack.join("/");
}
const input = "/a//b////c/d//././/..";
const result = func(input);
console.log(result);

// Solution

// To simplify the path, we'll use a stack to track the directories we're currently in. We'll split the input path into components by the "/" character, then process each component one by one. If a component is "..", we go to the previous directory by popping the top of the stack. If a component is "." or an empty string, we do nothing. Otherwise, we push the component into the stack as a new directory.

// Detailed Algorithm steps:

// Split the input path by the "/" character into an array of components.

// Initialize an empty stack.

// For each component in the array:

// If the component is "..", pop the top of the stack (if it's not already empty).
// Else if the component is "." or an empty string, do nothing.
// Else, push the component into the stack as a new directory.
// Finally, combine the components in the stack into a string, separated by the "/" character. Add a "/" at the start to denote an absolute path.

// Algorithm walkthrough
// let's walk through the code using the input "/a//b////c/d//././/.." step by step:

// Initialize a Stack: A Stack<String> is created to store components of the simplified path.

// Split the Path: The input path "/a//b////c/d//././/.." is split using "/" as the delimiter. The resulting parts are: ["", "a", "", "b", "", "", "", "c", "d", "", ".", "", ".", "", "", ".."]. Empty strings and dots (".") represent the current directory and will be ignored in further processing.

// Process Each Part:

// First Part (""): It's empty, so it's ignored.
// Second Part ("a"): It's a directory name and is pushed onto the stack.
// Third Part (""): Ignored.
// Fourth Part ("b"): Another directory name, pushed onto the stack.
// Next Several Parts ("", "", ""): All empty, so ignored.
// Part "c": A directory name, pushed onto the stack.
// Part "d": Another directory name, pushed onto the stack.
// Part ".": Represents the current directory, ignored.
// Part "." (again): Again, represents the current directory, ignored.
// Last Part (".."): Represents moving up one directory. It pops "d" from the stack.
// After processing, the stack contains: ["a", "b", "c"].

// Reconstruct Simplified Path:

// A StringBuilder is used to construct the final simplified path.
// The stack is processed in LIFO (Last-In-First-Out) order. Each component is popped and appended to the start of the result string, preceded by "/".
// After processing the stack, the StringBuilder contains "/a/b/c".
// Return the Result:

// The StringBuilder is converted to a string and returned.
// For the given input, the output is "/a/b/c".
// Here is the visual representation of the algorithm:

// Complexity Analysis
// **Time Complexity
// **

// Splitting the path:

// The input string is divided into smaller parts using the / symbol. This takes O(N) time, where N is the length of the input path.
// Processing the components:

// Each part of the path is then processed. It can either be added to the stack, removed from the stack, or skipped if it is . or empty. Since each part is processed at most once, this step takes O(N) time in total.
// Building the result:

// After processing all the parts, the algorithm reconstructs the simplified path. This also takes O(N) time as we iterate over the parts in the stack and combine them to form the result.
// Overall time complexity: O(N)

// **Space Complexity
// **

// Stack space:

// The stack stores the parts of the simplified path, requiring O(N) space in the worst-case scenario.
// Additional space:

// The algorithm uses extra space for the split array and the StringBuilder, both of which require O(N) space.
// Overall space complexity: O(N)

// This analysis gives us an understanding of how the time and space requirements of the algorithm grow as the input size increases.

// Example
// Suppose the input path is "/home/user/.././documents/". The time complexity analysis helps us understand that regardless of the length of the path, the algorithm will take linear time (O(N)) to process and simplify the path. Similarly, the space complexity analysis shows us that the space required will also grow linearly with the length of the input path.

// Understanding the complexity of algorithms is important for evaluating their efficiency and the resources they require.
