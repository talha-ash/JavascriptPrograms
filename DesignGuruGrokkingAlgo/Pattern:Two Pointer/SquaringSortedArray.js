function func(list) {
  let l = 0;
  let r = list.length - 1;
  let resultList = new Array(list.length);
  let c = resultList.length - 1;

  while (l <= r) {
    const f = Math.pow(list[l], 2);
    const s = Math.pow(list[r], 2);
    if (f <= s) {
      resultList[c] = s;
      c--;
      r--;
    } else if (f > s) {
      resultList[c] = f;
      c--;
      l++;
    }
  }
  return resultList;
}

const nums = [-3, -1, 0, 1, 2];

const result = func(nums);
console.log(result);

// Algorithm Walkthrough
// Example Input: [-2, -1, 0, 2, 3]

// Initialization:

// squares = [0, 0, 0, 0, 0]
// left = 0, right = 4, highestSquareIdx = 4
// Iteration:

// First Iteration:
// leftSquare = (-2)^2 = 4
// rightSquare = 3^2 = 9
// rightSquare > leftSquare
// squares[4] = 9
// Move right to 3, decrement highestSquareIdx to 3
// Second Iteration:
// leftSquare = 4
// rightSquare = 2^2 = 4
// rightSquare >= leftSquare
// squares[3] = 4
// Move right to 2, decrement highestSquareIdx to 2
// Third Iteration:
// leftSquare = 4
// rightSquare = 0^2 = 0
// leftSquare > rightSquare
// squares[2] = 4
// Move left to 1, decrement highestSquareIdx to 1
// Fourth Iteration:
// leftSquare = (-1)^2 = 1
// rightSquare = 0
// leftSquare > rightSquare
// squares[1] = 1
// Move left to 2, decrement highestSquareIdx to 0
// Fifth Iteration:
// leftSquare = 0
// rightSquare = 0
// squares[0] = 0
// Move right to 1, decrement highestSquareIdx to -1
// Result:

// squares = [0, 1, 4, 4, 9]
