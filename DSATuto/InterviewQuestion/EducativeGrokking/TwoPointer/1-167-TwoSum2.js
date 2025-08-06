const nums = [1, 11, 5, 4, 7, 3];
const target = 9;
function TwoSumTwo(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  nums = nums.sort(compareNumbers)
  console.log(nums)
  while (left != right) {
    if (nums[left] + nums[right] > target) {
      right--;
    } else if (nums[left] + nums[right] < target) {
      left++;
    } else {
      return [left, right];
    }
  }
}

const result = TwoSumTwo(nums, target);
console.log(result);


function compareNumbers(a, b) {
  return a - b;
}
// we have sorted array thats why we have diff sol than two sum
// in this solution we have two pointer and we have to find the target
// one pointer is at start and other is at end 
// if sum is greater than target then we have to decrease the right pointer
// why because we know that if  sum is greater than if we add right value to any other value it will be greater than target
// so we skip this value and move to next value
// if sum is less than target then we have to increase the left pointer
// if sum is equal to target then we have to return the index of left and right pointer
