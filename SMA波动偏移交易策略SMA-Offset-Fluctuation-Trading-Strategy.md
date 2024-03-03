
> Name

SMA波动偏移交易策略SMA-Offset-Fluctuation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c52fdaee272021af6e.png)
 [trans]

## SMA波动偏移交易策略

### 策略概述

该策略利用简单移动平均线和一些数学计算来确定买入/卖出点。我们使用100天SMA作为基准线。如果收盘价低于该线,我们根据低于该线的程度选择开仓点,这个值(低偏移量)是一个可配置的百分比。对于平仓,如果收盘价高于我们的100天SMA,我们确定在何时卖出之前的偏移量。如果我们试图太早卖出(价格仍在上涨),追踪止损会启动。

### 策略原理

该策略使用三条SMA线:快线(默认14天)、慢线(默认100天)和参考线(默认30天)。

当收盘价低于参考线,并且相对于慢线的低偏移量大于配置的低偏移量时,且快线上涨而慢线下跌,进入多头。当满足这些条件时,快线和慢线极有可能交叉,因此是一个较好的入场点。

当收盘价高于参考线,并且相对于慢线的高偏移量大于配置的高偏移量时,且收盘价已连续3根K线上涨,已实现盈利,且快线高于慢线时,平仓多单。如果价格继续大涨,追踪止损会启动。

每次交易的头寸根据权益的一定比例进入,通过这种方式控制仓位。

### 策略优势分析

1. 利用SMA的优势,即平滑价格曲线,过滤市场噪音。
2. SMA交叉具有一定的预测趋势能力。
3. 相对于SMA线设置偏移量,避免假突破。
4. 结合趋势和交叉指标,提高决策的准确性。
5. 利用追踪止损锁定盈利,避免回撤。

### 策略风险分析 

1. SMA本身滞后性较强,可能错过价格转折点。
2. 偏移量设置不当可能导致过于激进或者过于谨慎。
3. 追踪止损参数设置不当可能过早止损或者止损幅度过大。
4. 无法应对价格剧烈波动的市场。

对应优化措施:
1. 结合其他先行指标过滤入场。  
2. 对偏移量进行反复测试优化。
3. 对止损参数进行反复回测找到最优参数。
4. 在高波动阶段降低仓位。

### 策略优化方向

1. 测试不同周期的SMA寻找最优参数
2. 加入其他指标判断市场结构和趋势
3. 优化追踪止损参数以锁定更多盈利
4. 根据市场波动程度调整仓位
5. 同时应用于多种品种并进行组合

### 总结

SMA波动偏移交易策略通过设定偏移量参考不同的SMA均线,寻找最佳入场时机。同时,退出机制设定了追踪止损来锁定收益。该策略简单易懂,容易实施。通过优化SMA参数、偏移量设置、止损水平等,可以获得更好的效果。该策略适用于中长线周期,追求稳定盈利的投资者。

||

### Strategy Overview  

This strategy uses simple moving averages (SMA) and some math calculations to determine buy/sell points. We keep a 100-day SMA line as our basis. If the closing price is below this line, we determine the opening position based on the percentage the price is below the line (low offset), which is configurable. Similarly, we set a high offset percentage above the 100-day SMA before closing long positions. If we try to close too early while price is still rising, the trailing stop loss will be triggered.  

### Strategy Logic  

The strategy uses three SMA lines: fast line (default 14 days), slow line (default 100 days), and reference line (default 30 days).  

It goes long when closing price is below reference line, percentage below slow line (low offset) is greater than configured value, fast line is rising and slow line is falling. When this condition satisfies, fast and slow line are very likely to cross soon, so it's a good entry point.

It closes long when closing price is above reference line, percentage above slow line (high offset) is greater than configured value, closing price rose for 3 consecutive candles, we have open profits, and fast line is above slow line. If price keeps rising after closing long, trailing stop loss will be triggered.  

The order size is based on a percentage of total equity, this controls our position size.  

### Advantage Analysis  

1. Utilize the advantage of SMA being able to smooth price fluctuations and filter out market noise.  
2. SMA crossovers have some ability to predict trend changes. 
3. Setting offsets avoids false breakouts of SMA lines.  
4. Combining trend and crossover indicators improves accuracy of trading signals.
5. Trailing stop loss locks in profits and prevents drawdowns.

### Risk Analysis

1. SMA itself has lag and may miss price turning points.  
2. Improper offset setting can make strategy too aggressive or too conservative.  
3. Improper stop loss parameter may stop out too early or stop loss percentage too large.  
4. Unable to cope with violent price swings.

Corresponding improvements:
1. Add other leading indicators to filter entries.
2. Backtest and optimize offsets.  
3. Backtest and find optimal stop loss parameters.  
4. Reduce position size during high volatility periods.

### Optimization Directions  

1. Test SMAs of different periods to find optimal parameters.
2. Add other indicators to determine market structure and trend.  
3. Optimize trailing stop loss parameters to lock in more profits.
4. Adjust position sizing based on market volatility.  
5. Apply strategy to multiple products simultaneously for diversification.  

### Conclusion  

The SMA Offset Fluctuation Trading Strategy identifies optimal entry points by setting offsets based on different SMA lines. The exit mechanism sets a trailing stop loss to lock in gains. This strategy is simple to understand and implement. By optimizing parameters like SMA periods, offsets, stop loss levels, better results can be achieved. It suits medium-long term investors seeking steady profits.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|SMA Fast (days)|
|v_input_2|100|SMA Slow (days)|
|v_input_3|30|SMA Reference (days)|
|v_input_4|0.001|Low Offset (%)|
|v_input_5|0.0164|High Offset (%)|
|v_input_6|0.96|Order Stake (%)|
|v_input_7|1.35|Trailing Stoploss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Author: Sonny Parlin (highschool dropout)
strategy(shorttitle="SMA+Strategy", title="SMA Offset Strategy",
                                      overlay=true,  currency=currency.USD,
                                      initial_capital=10000)

// Inputs and variables
ss = input(14, minval=10, maxval=50, title="SMA Fast (days)")
ff = input(100, minval=55, maxval=200, title="SMA Slow (days)")
ref = input(30, minval=20, maxval=50, title="SMA Reference (days)")
lowOffset = input(0.001, "Low Offset (%)", minval=0, step=0.001)
highOffset = input(0.0164, "High Offset (%)", minval=0, step=0.0001)
orderStake = input(0.96, "Order Stake (%)", minval=0, step=0.01)

// SMA
smaFast = sma(close, ss)
smaSlow = sma(close, ff)
smaRef = sma(close, ref)
distanceLow = (close - smaSlow) / close
distanceHigh = (close - smaSlow) / close

// Set up SMA plot but don't show by default
plot(smaFast, "smaFast", color=#00ff00, display = 0)
plot(smaSlow, "smaSlow", color=#ff0000, display = 0)
plot(smaRef, "smaRef", color=#ffffff, display = 0)

// The buy stratey:
// guard that the low is under our sma low reference line by our lowOffset %, 
// default is 0.001. (low < smaRef) and (distanceLow > lowOffset)
// SMA fast is on the rise and SMA slow is falling and they are very likely
// to cross. (rising(smaFast,1)) and (falling(smaSlow, 1)) 
enterLong = (low < smaRef) and (distanceLow > lowOffset) and (rising(smaFast,1)) and (falling(smaSlow, 1)) 

// The sell Strategy:
// Guard that close is higher than our sma high reference line by our 
// highOffset %, default is 0.0164. (close > smaRef) and (distanceHigh > highOffset)
// Guard that close has risen by 3 candles in a row (rising(close,3)) 
// Guard that we currently have profit (strategy.openprofit > 0)
// Guard that SMA fast is higher than smaSlow (smaFast > smaSlow)
// If it keeps going up past our close position the trailing stoploss will kick in!
enterShort = (close > smaRef) and (distanceHigh > highOffset) and (rising(close,3)) and (strategy.openprofit > 0) and (smaFast > smaSlow)

// Order size is based on total equity
// Example 1:
// startingEquity = 2000
// close = 47434.93
// orderStake = 0.45
// (2,000 × orderStake) / close = orderSize = 0.0189733599 = approx $900

// Example 2:
// startingEquity = 2000
// close = 1.272
// orderStake = 0.45
// (startingEquity × orderStake) / close = orderSize = 707.5471698113 = approx $900
orderSize = (strategy.equity * orderStake) / close

// Trailing Stoploss
// I'm using 1.35 as my default value, play with this for different results.
longTrailPerc = input(title="Trailing Stoploss (%)",
     type=input.float, minval=0.0, step=0.1, defval=1.35) * 0.01
     
longStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0

if (enterLong)
    strategy.entry("Open Long Position", strategy.long, orderSize, when=strategy.position_size <= 0)
    
if (enterShort)
    strategy.exit(id="Close Long Position", stop=longStopPrice)


//plot(strategy.equity)
```

> Detail

https://www.fmz.com/strategy/435831

> Last Modified

2023-12-19 10:52:10
