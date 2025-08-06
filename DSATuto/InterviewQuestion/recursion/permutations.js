//permutation is arrage number of element in different position.

//like [1,2,3] how we can suffle into different poistion called permutations

// formula to how many differernt arrage these element like [2,3,1], [1,3,2], [3,2,1 etc]
// we use factorial of number of element
// here is 3! , 3*2*1 = 6
//we can make 6 type of arragement of these element

function swapInArray(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
function permutaionsOfArray(arr, pos, ans) {
  if (pos >= arr.length) {
    ans.push([...arr]);
    return;
  }
  for (let i = pos; i < arr.length; i++) {
    swapInArray(arr, i, pos);
    permutaionsOfArray(arr, pos + 1, ans);
    swapInArray(arr, i, pos);
  }
}
let ans = [];
debugger;
const result = permutaionsOfArray([1, 2, 3], 0, ans);

console.log(ans);

/////////////////////////

const permutations = (array = []) => {
  let len = array.length;
  let results = [];

  const permute = (queue = []) => {
    if (queue.length === len) {
      results.push(queue);
    } else {
      for (let ele of array) {
        permute(queue.concat(ele));
      }
    }
  };

  permute();
  return results;
};

console.log(permutations(["a", "b", "c"])); // 3125
