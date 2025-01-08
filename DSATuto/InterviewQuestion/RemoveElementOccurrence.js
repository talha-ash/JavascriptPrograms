const arr = [0, 1, 2, 2, 3, 0, 4, 2];
const arr1 = [3, 2, 2, 3];
function removeElementOccurrencesByTwoPointer(nums, val) {
  let lp = 0;
  let rp = 0;
  while (rp < nums.length) {
    if (nums[rp] == val) {
      rp++;
    } else {
      if (lp === rp) {
        lp++;
        rp++;
      } else {
        nums[lp] = nums[rp];
        lp++;
        rp++;
      }
    }
  }
  return lp;
}

const result = removeElementOccurrencesByTwoPointer(arr1, 3);

console.log(result);
console.log(arr1);

