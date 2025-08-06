function func(num) {
  let result = 0;
  let hash = {};

  while (result != 1) {
    result = find_square_sum(num);
    if (result == 1) {
      return true;
    }
    if (hash[result]) {
      return false;
    } else {
      hash[result] = result;
    }
    num = result;
  }
}

//it calculate per number like 12 = 1^2 + 2^2 = 5
function find_square_sum(num) {
  let sum = 0;
  while (num > 0) {
    let digit = num % 10; //it give last digit of num
    sum += digit * digit;
    num = Math.floor(num / 10); //it give first digit of num
  }
  return sum;
}

const num = 23;
const result = func(num);
console.log(result);

//we will put the result after calculation(ab=a^2+b^2)
//into hash and if result already in hash then it mean
//we have cycle and can not get 1 from this number
//hence not a happu number

class Solution {
  find(num) {
    let slow = num,
      fast = num;
    while (true) {
      slow = this.find_square_sum(slow); // move one step
      fast = this.find_square_sum(this.find_square_sum(fast)); // move two steps
      if (slow === fast) {
        // found the cycle
        break;
      }
    }
    return slow === 1; // see if the cycle is stuck on the number '1'
  }

  find_square_sum(num) {
    let sum = 0;
    while (num > 0) {
      let digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }
}

const sol = new Solution();
console.log(sol.find(23));
console.log(sol.find(12));

// Time Complexity Analysis:

// For any number, we're:

// Breaking it into digits
// Squaring each digit
// Adding them up
// Repeating until we get 1 or find a cycle

// Key Observations:

// For any number with n digits, next number will be at most 9² * n
// For n digit number, max next number is 81n
// Numbers quickly get smaller and converge
// Most numbers converge to cycle or 1 in less than logN steps

// Therefore:

// Time Complexity: O(logN) where N is input number
// For each step: O(1) time to process digits
// Number of steps: O(logN) as numbers quickly get smaller
