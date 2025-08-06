function func(num) {
  let stack = [];
  let lastNum = num;
  let result = "1";

  if (num == 1) {
    return "1";
  }

  while (num > 0) {
    // Calculate the remainder when 'num' is divided by 2 and push it onto the stack
    stack.push(num % 2);

    // Update 'num' by performing integer division by 2 (removing the least significant bit)
    num = Math.floor(num / 2);
  }

  // while (true) {
  //   let value = Math.floor(lastNum / 2);
  //   let remainder = lastNum - value * 2;
  //   lastNum = value;

  //   stack.push(remainder);

  //   if (value == 1) {
  //     break;
  //   }
  // }

  const stackLength = stack.length;
  for (let i = 0; i < stackLength; i++) {
    result += stack.pop() + "";
  }
  return result;
}

const input = 7;
const result = func(input);
console.log(result);

// Solution
// We can use a stack to efficiently create the binary representation of a given decimal number. Our algorithm will take advantage of the 'Last In, First Out' property of stacks to reverse the order of the binary digits, since the binary representation is constructed from least significant bit to most significant bit, but needs to be displayed in the opposite order. The procedure involves repeatedly dividing the decimal number by 2, pushing the remainder onto the stack, which corresponds to the binary digit. When the number is reduced to 0, the algorithm pops elements off the stack and appends to the result string until the stack is empty, thereby reversing the order of digits. The result is the binary equivalent of the input decimal number.

// Here is a detailed walkthrough of the solution:

// First, the algorithm starts by creating an empty stack. A stack is chosen because of its "Last In, First Out" property which is perfect for this type of problem where we need to reverse the order of the operations.

// Then, it enters into a loop where the given number is repeatedly divided by 2. This is because the binary number system is base 2, and each bit represents a power of 2.

// Inside the loop, the remainder when the number is divided by 2 (which is either 0 or 1) is pushed onto the stack. This remainder is essentially the bit in the binary representation of the number.

// The number is then updated by integer division by 2 (in programming languages, this is usually denoted by num //= 2 or num = Math.floor(num / 2) or num /= 2). This step essentially "shifts" the number one bit to the right.

// Steps 3 and 4 are repeated until the number becomes zero.

// At this point, the stack contains the binary representation of the number, but in reverse order. This is because the first bit we calculated (the least significant bit, or the "rightmost" bit) is on the bottom of the stack, while the last bit we calculated (the most significant bit, or the "leftmost" bit) is on the top of the stack.

// So, the next step is to reverse this order. This is done by popping the stack until it's empty and appending each popped bit to the result. Since a stack follows "Last In, First Out" rule, this will correctly reverse the order of the bits.

// Finally, the algorithm returns the result, which is the binary representation of the original number.

// Beginner Explanation
// Time Complexity
// Converting decimal to binary involves repeatedly dividing the input number by 2 to get the binary digits. The number of times the division occurs is proportional to the number of bits in the binary representation of the number.
// For example, if we want to convert the decimal number 13 to binary, the number of iterations required is 4 because 13 in binary is 1101, which has 4 digits.
// Space Complexity
// The stack stores each binary digit, and the StringBuilder is used to construct the binary representation.
// Both the stack and StringBuilder will require space proportional to the number of bits in the binary representation of the input number.
// Intermediate Explanation
// Time Complexity
// Converting decimal to binary involves repeated division, and the time complexity for this operation is O(log n), where n is the input number. This is because the number of iterations is proportional to the number of bits required to represent the input number in binary.
// Stack operations take constant time for pushing and popping each binary digit, resulting in O(1) time complexity for each operation.
// Space Complexity
// The stack and StringBuilder both require space proportional to the number of bits in the binary representation of the input number, resulting in O(log n) space complexity.
// Advanced Explanation
// Time Complexity
// Converting decimal to binary using repeated division has a time complexity of O(log n), where n is the input number. This is because the number of iterations is proportional to the number of bits required to represent the input number in binary.
// Each stack operation (push and pop) and StringBuilder operation takes constant time, resulting in an overall time complexity of O(log n).
// Space Complexity
// The stack and StringBuilder require space proportional to the number of bits in the binary representation of the input number, resulting in O(log n) space complexity
