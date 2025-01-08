//Remove Duplicates from Sorted Array

const a = [0, 0, 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 8];
const b = [1, 2, 3];
const c = [1, 2, 2];
const d = [0, 0, 1, 1, 1, 1, 2, 3, 3];

var rearrangeSort = function (nums) {
  let j = 1;
  if (nums.length === 0) {
    return 1;
  }
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[i - 1]) {
      nums[j] = nums[i];
      j++;
    }
  }
  return j;
};

const result = rearrangeSort(d);
console.log(result);
