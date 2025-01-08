function PowerN(x, n) {
  if (n == 1) {
    return x;
  }

  return x * PowerN(x, n - 1);
}


//we use this technique to reduce time complexity because we know 2 power 2 == 2 power 2 why caqlculate again in case of 2^4 we
//do simply 2^2 * 2^2
function PowerNImprove(x, n) {
  if (x == 0) return 0;
  if (n == 0) {
    return 1;
  }
  let temp = PowerNImprove(x, Math.floor(n / 2));
  //but if temp is odd then we do temp * temp * x 
  if (n % 2 === 1) {
    return temp * temp * x;//n = 5 then x * x^2 * x^2
  }
  return temp * temp;
}


const result = PowerNImprove(2, 5);


console.log(result);

// time complexity is O(n)
// Space complexity is O(n)

//improve  time complexity is O(log n)
//improve  Space complexity is O(log n)
