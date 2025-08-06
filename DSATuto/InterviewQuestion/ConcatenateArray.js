const arr = [1, 3, 2, 1];
const arr2 = [1, 2, 1];
function concatenateArray(nums) {
  let resultedArray = new Array(nums.length * 2);

  for (let i = 0; i < nums.length; i++) {
    resultedArray[i] = nums[i];
    resultedArray[i + nums.length] = nums[i];
  }
  return resultedArray;
}

const result = concatenateArray(arr2);

console.log(result);
