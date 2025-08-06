class Stack {
  constructor(size) {
    this.stack = new Array(size);
    this.top = -1;
  }

  push(data) {
    if (this.top == this.stack.length - 1) {
      throw new Error("Stack Overflow");
    }
    this.stack[++this.top] = data;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty Stack");
    }
    const data = this.stack[this.top];
    this.stack[this.top--] = null;
    return data;
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    return this.stack[this.top];
  }
  isEmpty() {
    return this.top === -1;
  }
}
// Applications of Stack
// Now that we have gained a solid understanding of stack operations and their implementation, it's time to bring it all together by exploring the real-world applications of stacks. This fascinating data structure has a multitude of uses across many different areas in computer science, from memory management and compiler design to problem-solving in data analysis. Let's dive in!

// Memory Management
// One of the primary uses of stacks is in memory management. Ever wondered how your computer remembers which functions it's running and in which order? The answer is stacks! When a function is called in a program, the system 'pushes' it onto a call stack. When the function finishes running, it's 'popped' off the stack. This mechanism allows for nested function calls, where one function can call another.

// This is also how recursion works in programming. When a function calls itself, each recursive call is added to the stack with its own set of variables. Once the base case is met, the functions start resolving and are popped off the stack one by one.

// Expression Evaluation and Syntax Parsing
// Another critical application of stacks is in evaluating mathematical expressions and parsing syntax in code compilers. Consider an arithmetic expression like 2 + 3 * 4. Before performing the operations, we need to check the precedence of the operators to get the correct result. Here, stacks come in handy to apply the BODMAS rule (Bracket, Order, Division and Multiplication, Addition and Subtraction).

// Storing operators in a stack can help manage their execution order. Similar logic applies when compilers parse code syntax. They use stacks to check if all opening brackets have matching closing ones, which helps validate the syntax.

// Undo Mechanism in Software Applications
// Have you ever wondered how the 'undo' feature works in software applications like text editors, image editors, or even web browsers? Once again, stacks save the day. Each action you perform is pushed onto a stack. When you hit 'undo', the most recent action is popped from the stack and reversed. It's a practical and elegant solution to a problem we encounter every day!

// Backtracking Algorithms
// Backtracking algorithms solve problems by trying out solutions and undoing them if they don't lead to a solution. This is common in puzzles like Sudoku, the Eight Queens problem, and the Knight's Tour problem.

// In such scenarios, stacks are used to store the intermediate stages of the problem. When an attempted solution doesn't work out, the algorithm can 'pop' back to a previous state and try a different path. It's like having a 'save game' feature when you're tackling a challenging puzzle!

// Depth-First Search (DFS)
// Stacks are also used in graph algorithms, specifically Depth-First Search (DFS). DFS explores a graph by visiting a node and recursively investigating all its unvisited neighbors. The algorithm uses a stack to remember which nodes to visit next when it finishes exploring a path.

// By 'pushing' unvisited nodes onto the stack and 'popping' them once visited, DFS systematically explores every node in the graph. This method is particularly useful in network routing, AI behavior in games, and detecting cycles in a graph.

// Web Page History in Browsers
// Finally, an everyday example of stacks in action is web page history in a browser. When you click a link, your current page is 'pushed' onto a stack, and you're taken to a new page. If you hit the 'back' button, your browser 'pops' the topmost page off the stack, taking you back to where you were. It's a simple, intuitive way to navigate the vast expanse of the internet.
