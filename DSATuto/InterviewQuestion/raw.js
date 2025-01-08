const nums1 = [4, 5, 6, 0, 0, 0];
const m = 3;
const nums2 = [1, 2, 3];
const n = 3;

function mergeSortedArray(nums1, m, nums2, n) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < m + n; i++) {
    if (i >= m) {
      if (a == nums2.length - 1) {
        nums1[i] = nums2[a];
      }
      if (nums2[a] > nums2[a + 1]) {
        nums1[i] = nums2[a + 1];
        nums2[a + 1] = nums2[a];
        a++;
      } else {
        nums1[i] = nums2[a];
        a++;
      }
    } else if (nums1[i] > nums2[a]) {
      let temp = nums1[i];
      nums1[i] = nums2[a];
      nums2[a] = temp;
    }
  }
  return nums1;
}

const result = mergeSortedArray(nums1, m, nums2, n);

console.log(result);
