
> Name

MartinGale-Strategy1

> Author

Zer3192





> Source (javascript)

``` javascript
// 在FMZ平台上实现马丁格尔的例子
function main() {
  // 设置基本参数
  var initAsset = 1000000; // 初始资产
  var baseBet = 0.001; // 基础单价
  var profitRate = 0.2; // 盈利时加注比例
  var lossRate = 0.5; // 亏损时加注比例
  var maxBetTimes = 10; // 最大加注次数
  var maxLoseTimes = 4; // 连续亏损次数

  // 初始化参数
  var asset = initAsset; // 当前资产
  var bet = baseBet; // 当前单注
  var betTimes = 0; // 当前加注次数
  var loseTimes = 5; // 当前连续亏损次数
  var win = 0; // 当前连续胜利次数

  // 下单函数
  function placeOrder(direction) {
    var amount = bet; // 下单量
    if (direction == "buy") {
      // 买入
      exchange.Buy(-1,bet);
      Log("买入", bet);
    } else if (direction == "sell") {
      // 卖出
      exchange.Sell(-1,bet);
      Log("卖出", bet);
    }
  }

  // 交易循环
  while (true) {
    // 获取当前K线上的信息
    var records = exchange.GetRecords();
    var lastRecord = records[records.length - 1];
    var currPrice = lastRecord.Close;

    // 判断当前趋势
    var trend = "none";
    if (lastRecord.Open < lastRecord.Close) {
      trend = "up";
    } else if (lastRecord.Open > lastRecord.Close) {
      trend = "down";
    }

    // 根据趋势执行交易
    if (trend == "up") {
      // 如果上升
      if (loseTimes > 0) {
        // 如果之前有亏损，重置加注次数和连续亏损次数
        betTimes = 0;
        loseTimes = 0;
      }
      placeOrder("buy");
      
      win++;
      if (win == maxBetTimes) {
        // 如果连续胜利次数达到最大加注次数，重置
        betTimes = 0;
        win = 0;
      }
    } else if (trend == "down") {
      // 如果下降
      if (win > 0) {
        // 如果之前有胜利，重置加注次数
        betTimes = 0;
      }
      if (loseTimes == maxLoseTimes) {
        // 如果连续亏损次数达到最大次数，停止交易
        break;
      }
      if (betTimes == 0) {
        // 如果是第一次加注，计算加注量
        bet *= (1 + lossRate);
      } else {
        // 如果不是第一次加注，计算加注量
        bet *= 1.1;
      }
      placeOrder("sell");
      loseTimes++;
      betTimes++;
    }

    // 更新资产
    var currAsset = exchange.GetAccount().Balance;
    if (currAsset > asset) {
      // 盈利，加注
      bet *= (1 + profitRate);
    }
    asset = currAsset;

    // 等待下一次交易
    Sleep(1000);
  }
}

```

> Detail

https://www.fmz.com/strategy/416875

> Last Modified

2023-07-12 17:41:56
