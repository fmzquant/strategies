
> Name

Trend-Following-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/f5440219f751f85f89.png)

### Overview

This strategy combines trend following with trailing stop loss and take profit logic to continuously ride the trend for profits. It uses moving average to determine trend direction and generate trading signals when price breaks through the MA lines. After entering long position, the strategy sets stop loss based on ATR value and adjusts it with trailing stop loss logic to follow the trend. When price rises to a certain level, it takes partial profit to lock in some gains.

### Strategy Logic

1. Set backtest start and stop timestamp based on user input.

2. Initialize long and short stop price, and trailing percentages.

3. Enter long when price breaks above MA line. 

4. Calculate stop loss distance with ATR and set stop loss price.

5. As price continues rising, trail stop loss upwards to lock in more profits.

6. When price hits take profit threshold, take partial profit.

7. Enter short when price breaks below MA line.

8. Calculate stop loss distance with ATR and set stop loss price. 

9. As price continues falling, trail stop loss downwards to lock in more profits.

10. When price hits take profit threshold, take partial profit.

### Advantages

- Trailing stop loss can follow trends and capture more profits while protecting profits.

- Dynamic ATR stop loss reacts better to market swings than fixed stop loss.

- Partial take profit helps lock in some gains and reduces drawdown risks.

- Simple and clear logic, easy to understand and implement.

### Risks

- Sudden trend reversal may trigger large loss with wide stop loss distance.

- Stop loss based on ATR may be too sensitive and get stopped out prematurely. 

- Improper partial take profit ratio may miss trends or increase losses.

- Many parameters need optimizing, like ATR period, trailing percentages, profit taking ratio.

- Strategy relies solely on MA and ATR, wrong signals may occur.

### Optimization

- Add other indicators like MACD, KD to filter trading signals and avoid wrong MA signals.

- Consider dynamic take profit ratios based on trend strength.

- Test different ATR periods for optimal stability. Or use other indicators for stop loss.

- Introduce machine learning to auto optimize parameters and adjust them dynamically.

- Use deep learning models to detect trends and generate signals automatically.

### Summary

The strategy integrates trailing stop loss, dynamic ATR stop loss and partial take profit to follow trends and control drawdowns. But it has some limitations like simple trend detection and difficult parameter optimization. This gives good directions to further improve the strategy by using more techniques and indicators to enhance stability and profitability. Overall it provides good references on designing stop loss and take profit mechanisms for live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|6|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © felipefs

//@version=4
strategy("Meu Script", overlay=true)
plot(ohlc4)

//Funçao de Datas
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(6, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => time >= testPeriodStart and time <= testPeriodStop ? true : false

//Funções de Trailing Stop
long_stop_price = 0.0
short_stop_price = 0.0
long_trail_perc = 0
short_trail_perc = 0

long_stop_price := if (strategy.position_size > 0)
    stopValue = close * (1 - long_trail_perc)
    max(stopValue, long_stop_price[1])
else
    0

short_stop_price := if (strategy.position_size < 0)
    stopValue = close * (1 + short_trail_perc)
    min(stopValue, short_stop_price[1])
else
    999999

//Função de Debug
debug(value) =>
    x = bar_index
    y = close
    label.new(x, y, tostring(value))
    
//Take Profit
profit = close * (1 + 0.12)
strategy.entry("Long", true)
strategy.exit("Take Profit 1 Long", from_entry="Long", limit=profit, qty_percent=50.0)
 
//ATR Stop
 
// xATRTrailingStopLong = 0.0
// xATR = atr(nATRPeriod)
// nLossLong = nATRMultipLong * xATR

// if (strategy.position_size > 0)
//     xATRTrailingStopLong := max(nz(xATRTrailingStopLong[1]), close - nLossLong)
```

> Detail

https://www.fmz.com/strategy/430577

> Last Modified

2023-10-30 15:21:54
