const prices = [7, 6, 4, 3, 1];
const maxProfit = (prices) => {
  let buyIndex = 0;
  let result = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[buyIndex] < prices[i]) {
      result += prices[i] - prices[buyIndex];
    }
    buyIndex++;
  }
  return result;
};

const result = maxProfit(prices);
console.log(result);

return result;
