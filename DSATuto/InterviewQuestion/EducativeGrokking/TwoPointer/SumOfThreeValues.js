const target = 10;
const nums = [3, 7, 1, 2, 8, 4, 5];
//nums sorted  [1,2,3,4,5,7,8]

function SumOfThreeValue(nums, target) {
  nums = nums.sort();

  for (let i = 0; i < nums.length - 2; i++) {
    let low = i + 1;
    let high = nums.length - 1;

    while (low < high) {
      let triple = nums[i] + nums[low] + nums[high];

      if (triple == target) {
        return true;
      } else if (triple < target) low++;
      else high--;
    }
  }

  return false;
}

const result = SumOfThreeValue(nums, target);
console.log(result);
//time complexity O(n^2)
//space complexity O(1)
// we pick first element and then apply two sum on other elemnt
// if no target found then we pick second element and apply two sum on other elemnt like squeez 
//we pick element and apply two sum and repeat this process
//because its sorted array we can apply two sum two algo there
