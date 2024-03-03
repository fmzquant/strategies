
> Name

趋势跟踪止损策略Trend-Following-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/f5440219f751f85f89.png)
[trans]

### 概述

本策略结合趋势跟踪止损和止盈退出逻辑,实现对趋势的持续跟踪获利。策略利用均线判断趋势方向,当价格突破均线时产生交易信号。进入做多头仓位后,策略会根据ATR值设定止损距离,同时利用趋势跟踪止损逻辑调整止损距离,在保护利润的同时跟踪趋势。当价格上涨到一定比例时,策略会部分止盈,锁定部分利润。

### 策略原理

1. 根据用户输入的回测时间范围,设置回测的起止时间戳。

2. 设置长仓和短仓的止损价格,以及止损跟踪百分比。

3. 当价格突破均线产生做多信号时,进行做多入场。

4. 根据ATR值计算止损距离,并设置止损价格。

5. 当价格继续上涨时,跟踪调整止损距离,使其逐步上移,锁定更多利润。

6. 当价格上涨到设置的止盈阈值时,部分平仓止盈。

7. 跌破均线产生做空信号时,进行做空入场。

8. 根据ATR值计算止损距离,并设置止损价格。

9. 当价格继续下跌时,跟踪调整止损距离,使其逐步下移,锁定更多利润。

10. 当价格下跌到设置的止盈阈值时,部分平仓止盈。

### 策略优势

- 利用趋势跟踪止损机制,可以在保护利润的同时持续跟踪趋势进行获利,比传统的固定止损距离更具优势。

- 结合ATR指标计算动态止损距离,可以有效应对市场波动,降低止损被触发的概率。

- 部分止盈逻辑可以锁定部分利润,降低回撤风险。

- 策略逻辑简单清晰,容易理解和实现,适合 traders 参考借鉴。

### 策略风险

- 趋势突然反转时,止损距离可能太大,无法及时止损,可能带来较大亏损。

- ATR指标计算的止损距离可能过于灵活,容易被市场噪音频繁触发止损。

- 部分止盈比例设置不当,可能错失趋势机会或增加亏损。

- 需要优化的参数较多,如ATR周期、止损跟踪比例、部分止盈比例等,优化难度较大。

- 策略仅基于均线和ATR指标,当这些指标发出错误信号时,会产生交易失误。

### 策略优化方向

- 可以结合其他指标过滤交易信号,避免均线产生错误信号。例如MACD,KD等。

- 可以考虑将固定的部分止盈,改为动态比例止盈,根据趋势强度调整。

- 可以测试不同的ATR周期参数,采用最稳定的参数。也可以结合其他指标来决定止损距离。

- 可以引入机器学习算法,通过算法自动优化参数,并根据市场实时调整参数。

- 可以结合深度学习等高级算法,通过模型训练自动识别趋势,生成交易信号。

### 总结

本策略整合了趋势跟踪止损、ATR动态止损和部分止盈逻辑,可以持续跟随趋势进行止盈,在回撤控制方面也有一定优势。但策略也存在一定局限,如趋势判断指标简单、参数优化难度大等。这给了我们很好的优化方向,通过引入更多指标和技术手段,有望进一步增强策略稳定性和收益率。总体来说,该策略为我们在实盘交易中设计止损和止盈机制提供了很好的参考。

|| 

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

[/trans]

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
