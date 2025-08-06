function fact(num) {
  if (num == 0) {
    return 1;
  }
  return num * fact(num - 1);
}

const result = fact(5);
console.log(result);
