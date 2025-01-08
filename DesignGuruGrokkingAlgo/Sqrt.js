function func(x) {
  if (x < 2) return x; // return x if it is 0 or 1

  let left = 2;
  let right = Math.floor(x / 2);
  let mid;
  let num;
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2);
    num = mid * mid;
    if (num > x)
      right = mid - 1; // if mid * mid is greater than x, set right to mid - 1
    else if (num < x)
      left = mid + 1; // if mid * mid is less than x, set left to mid + 1
    else return mid; // if mid * mid is equal to x, return mid
  }

  return right;
}

const num = 8;

const result = func(num);
console.log(result);

// Step-by-Step Algorithm
// Handle Base Cases: If x is less than 2, return x directly (since the square root of 0 is 0, and the square root of 1 is 1).
// Initialize Pointers: Set left to 2 and right to x / 2.
// Binary Search Loop:
// While left is less than or equal to right:
// Calculate mid as left + (right - left) // 2.
// Calculate num as mid * mid.
// If num is greater than x, move right to mid - 1.
// If num is less than x, move left to mid + 1.
// If num equals x, return mid.
// Return Result: Return right as the integer part of the square root of x.
// Algorithm Walkthrough
// Let's consider the input n = 8:

// Initialize:

// Input x = 8.
// Since x is not less than 2, proceed to the next step.
// Set left = 2 and right = 4 (8 // 2).
// First Iteration:

// Calculate mid = 2 + (4 - 2) // 2 = 3.
// Calculate num = 3 * 3 = 9.
// Since num (9) is greater than x (8), move right to mid - 1 = 2.
// Second Iteration:

// Now left = 2 and right = 2.
// Calculate mid = 2 + (2 - 2) // 2 = 2.
// Calculate num = 2 * 2 = 4.
// Since num (4) is less than x (8), move left to mid + 1 = 3.
// End Loop:

// Now left = 3 and right = 2.
// Since left (3) is greater than right (2), exit the loop.
// Return Result:

// Return right = 2 as the integer part of the square root of x = 8.
