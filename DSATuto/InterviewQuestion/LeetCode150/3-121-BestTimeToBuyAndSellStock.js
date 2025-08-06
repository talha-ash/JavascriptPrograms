const prices = [7, 1, 5, 3, 6, 4];
const maxProfit = (prices) => {
  let buyIndex = 0;
  let result = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[buyIndex] > prices[i]) {
      buyIndex = i;
    } else if (result < prices[i] - prices[buyIndex]) {
      result = prices[i] - prices[buyIndex];
    }
  }
  return result;
};

const result = maxProfit(prices);
console.log(result);

/*let sellIndex = 0;
  let buyIndex = 0;
  let result = 0;
  for (let i = 0; i < prices.length; i++) {
    let buy = prices[buyIndex];
    let sell = prices[sellIndex];
    let current = prices[i];
    if (buy > current) {
      buyIndex = i;
      sellIndex = i + 1;
      sell = prices[sellIndex];
    }

    if (sell < current) {
      sellIndex = i;
    }
    if (result < prices[sellIndex] - prices[buyIndex]) {
      result = prices[sellIndex] - prices[buyIndex];
    }
  }

  return result;
  */
