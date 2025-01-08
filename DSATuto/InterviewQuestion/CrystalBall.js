//Assume arr is sort
const arr = [false, false, false, false, false, false, false, true, true, true];
function twoCrystalBalls(breaks) {
  const jumpAmount = Math.floor(Math.sqrt(breaks.length));

  console.log("jumpAmount", jumpAmount);
  debugger;
  let i = jumpAmount;
  for (; i < breaks.length; i += jumpAmount) {
    if (breaks[i]) {
      break;
    }
  }

  let j = i - jumpAmount;

  for (; j <= i; j++) {
    if (breaks[j]) {
      return j;
    }
  }

  return -1;
}

const result = twoCrystalBalls(arr);
console.log(result);
// 00x11nana22z99--=0=--
