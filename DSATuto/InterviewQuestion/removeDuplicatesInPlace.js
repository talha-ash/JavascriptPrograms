const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const nums1 = [-3, -1, -1, 0, 0, 0, 0, 0, 2];

function removeDuplicatesByTwoPointer(arr) {    
    let lp = 0;
    let rp = 1;
    while (rp <= arr.length) {
        if(arr[lp] == arr[rp]){
            rp++
        }else{
            lp++;
            arr[lp] = arr[rp];
            rp++;
        }
    }
    return lp;
  }

function removeDuplicatesByHash(arr) {
  let dupObj = {};
  let emptyPointer = null;
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    if (!(dupObj[value] != undefined)) {
      dupObj[value] = value;
      if (emptyPointer >= 0) {
        arr[emptyPointer] = value;
        emptyPointer = emptyPointer + 1;
      }
      continue;
    }
    if (emptyPointer === null) {
      emptyPointer = i;
    }
  }
  return emptyPointer;
}
debugger;
const result = removeDuplicatesByHash(nums);

console.log(result);
console.log(nums);
