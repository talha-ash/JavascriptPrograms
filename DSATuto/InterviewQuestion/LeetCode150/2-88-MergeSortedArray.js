const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;

function mergeSortedArray(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let index = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[index] = nums1[i];
      index--;
      i--;
    } else {
      nums1[index] = nums2[j];
      index--;
      j--;
    }
  }

  while (i >= 0) {
    nums1[index] = nums1[i];
    index--;
    i--;
  }

  while (j >= 0) {
    nums1[index] = nums2[j];
    index--;
    j--;
  }
  return nums1;
}

const result = mergeSortedArray(nums1, m, nums2, n);

console.log(result);

// we compare both array from last as last element are max  in each array
//we compare them and then put them in last index of first array as requirement
