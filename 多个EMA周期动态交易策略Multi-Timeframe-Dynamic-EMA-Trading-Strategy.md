
> Name

多个EMA周期动态交易策略Multi-Timeframe-Dynamic-EMA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14e488eaf152980d1de.png)
[trans]

## 概述

这个策略的核心思想是基于多个指数移动平均线(EMA)的交叉来产生交易信号。当短期EMA上穿较长期的EMA时,做多;当短期EMA下穿较长期的EMA时,平仓。这个策略允许配置多个EMA周期,每个EMA都可以独立启用,策略会在所有启用的EMA上进行交叉交易。

## 策略原理

该策略设置了8个EMA周期,分别是8日线、13日线、21日线、34日线、55日线、89日线、144日线和233日线。这些EMA被配置为可以独立启用或禁用。

当较短期的EMA从下方上穿较长期的EMA时,产生买入信号;当较短期的EMA从上方下穿较长期的EMA时,产生卖出信号。如果两个EMA都被启用, shorterEMA > longerEMA 为做多信号,shorterEMA < longerEMA 为平仓信号。

举例来说,如果启用55日EMA和89日EMA,当55日EMA上穿89日EMA时,做多;当55日EMA下穿89日EMA时,平仓。这允许这个策略动态调整使用的EMA组合,从更长的周期转换到更短的周期,或者反过来。

持仓数量设置为账户权益除以close再除以启用的EMA组数。这确保了每个EMA上的头寸大小是相同的。

## 优势分析

- 可以通过配置不同的EMA来调整策略的周期灵活度
- 每个EMA可以独立配置,允许高度自定义
- 持仓按比例分配在每个EMA上,有利于风险管理
- 使用了多个EMA,可以在不同市场阶段切换更适合的EMA
- 策略简单清晰,容易理解和调试

## 风险分析

- EMA作为单一指标无法确定市场结构,可能发出错误信号
- 大幅震荡市场中EMA容易互相交叉,增加交易频率和滑点成本
- 需要优化EMA参数以适应不同市场
- 可能需要结合其他指标来确认交易信号

可以考虑与其他指标组合使用EMA,例如通道指标或震荡指标来过滤信号,或结合趋势和反转指标。 此外,优化EMA参数非常重要,需要针对不同市场调整。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. EMA参数优化。可以通过参数扫描和Walk Forward Analysis方法找到最佳EMA参数组合。

2. 增加过滤条件。可以在EMA交叉时增加额外过滤条件来避免错误信号,例如交易量过滤,波动率过滤等。

3. 结合其他指标。可以将EMA与MACD,KDJ,布林带等其他指标组合,利用它们的互补性获利。

4. 动态调整仓位。可以根据市场波动率或趋势力度动态调整每个EMA上的仓位。

5. 损益比优化。优化止损止盈水平,找到最佳风险回报比。

## 总结
该策略整体来说非常简单直接,通过EMA交叉来捕捉短期和中长期趋势。它的优势在于高度可配置性和灵活性,允许交易者选择最适合自己的EMA组合。但是作为单一指标的EMA容易产生错误信号,这是该策略最大的风险。通过与其他指标组合以及参数优化,可以获得更好的交易表现。

||

## Overview

The core idea of this strategy is to generate trading signals based on the crossover of multiple exponential moving averages (EMA). It goes long when shorter term EMA crosses over longer term EMA from below, and closes positions when shorter term EMA crosses under longer term EMA. This strategy allows configuring multiple EMA periods, and each EMA can be enabled independently. The strategy will trade crossovers on all the enabled EMAs.  

## Strategy Name

Multi Timeframe Dynamic EMA Trading Strategy

## Strategy Principle

The strategy sets up 8 EMA periods - 8 days, 13 days, 21 days, 34 days, 55 days, 89 days, 144 days and 233 days. These EMAs can be enabled or disabled independently.

It generates long signals when the shorter term EMA crosses over the longer term EMA from below. It generates exit signals when the shorter term EMA crosses under the longer term EMA from above. So if two EMAs are enabled, shorterEMA > longerEMA is long signal, shorterEMA < longerEMA is exit signal.  

For example, if 55 days EMA and 89 days EMA are enabled, the strategy goes long when 55 days EMA crosses over 89 days EMA, and exits when 55 days EMA crosses under 89 days EMA. This allows the strategy to dynamically adjust the EMA combinations used, switching from longer timeframes to shorter or vice versa.

The position sizing is set to account equity divided by close divided by number of enabled EMAs. This makes sure the position sizes on each EMA crossover is equal.

## Advantage Analysis

- Flexibility to adjust timeframe by configuring different EMAs
- Each EMA can be enabled/disabled independently, highly customizable  
- Positions evenly distributed across EMAs, good for risk management
- Utilizes multiple EMAs, can switch to more suitable EMAs for different market stages
- Simple and clear logic, easy to understand and debug

## Risk Analysis  

- EMA alone cannot determine market structure, prone to false signals
- Whipsaw markets lead to excessive EMA crossovers, increasing trade frequency and slippage cost
- Needs optimization of EMA parameters for different markets
- May need other indicators to confirm signals

Consider combining EMA with other indicators e.g. channels or oscillators to filter signals, or incorporate trend and reversal indicators. Also optimizing EMA parameters is very important, needs tuning for different markets.  

## Optimization Directions

The strategy can be optimized in several aspects:

1. Optimize EMA parameters via parameter scanning and walk forward analysis to find best EMA combinations.  

2. Add filter conditions on EMA crossovers to avoid false signals e.g. volume filter, volatility filter etc.

3. Combine with other indicators like MACD, KDJ, Bollinger Bands to take advantage of complementarity.  

4. Dynamically adjust position sizing on each EMA based on market volatility or trend strength.
  
5. Optimize stop loss and take profit levels to achieve best risk-reward ratio.

## Conclusion

Overall this is a very simple and straightforward strategy generating signals from EMA crossovers to catch short term and medium term trends. Its main advantage lies in the high configurability and flexibility to allow traders to select the EMAs suitable for them. However EMA alone can give false signals easily which is the biggest risk. Combining with other indicators and parameter optimization can lead to better trading performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|EMA1|
|v_input_2|13|EMA2|
|v_input_3|21|EMA3|
|v_input_4|34|EMA4|
|v_input_5|55|EMA5|
|v_input_6|89|EMA6|
|v_input_7|144|EMA7|
|v_input_8|233|EMA8|
|v_input_9|true|EnableEMA1|
|v_input_10|true|EnableEMA2|
|v_input_11|true|EnableEMA3|
|v_input_12|true|EnableEMA4|
|v_input_13|true|EnableEMA5|
|v_input_14|true|EnableEMA6|
|v_input_15|true|EnableEMA7|
|v_input_16|true|EnableEMA8|
|v_input_17|true|From Month|
|v_input_18|true|From Day|
|v_input_19|2018|From Year|
|v_input_20|true|To Month|
|v_input_21|true|To Day|
|v_input_22|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-11 00:00:00
end: 2023-12-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("EMA Fan", shorttitle = "EMA Fan", overlay=true)

// Revision:        1
// Author:          @ToS_MavericK

buyprice = 0.0
buyprice := buyprice[1]

// === INPUT SMA ===
EMA1  = input(8)
EMA2  = input(13)
EMA3  = input(21)
EMA4  = input(34)
EMA5  = input(55)
EMA6  = input(89)
EMA7  = input(144)
EMA8  = input(233)

EnableEMA1 = input(true)
EnableEMA2 = input(true)
EnableEMA3 = input(true)
EnableEMA4 = input(true)
EnableEMA5 = input(true)
EnableEMA6 = input(true)
EnableEMA7 = input(true)
EnableEMA8 = input(true)

//Profit  = input(defval = 5, type = integer, title = "Profit", minval = 1, step = 1)
//StopLoss    = input(defval = 15, type = integer, title = "StopLoss", minval = 1, step = 1)

// === INPUT BACKTEST RANGE ===
FromMonth   = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear    = input(defval = 2018, title = "From Year", minval = 2012)
ToMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay   = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear  = input(defval = 2020, title = "To Year", minval = 2012)


// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// === SERIES SETUP ===
vEMA1 = ema(close, EMA1)
vEMA2 = ema(close, EMA2)
vEMA3 = ema(close, EMA3)
vEMA4 = ema(close, EMA4)
vEMA5 = ema(close, EMA5)
vEMA6 = ema(close, EMA6)
vEMA7 = ema(close, EMA7)
vEMA8 = ema(close, EMA8)

count = -1
if (EnableEMA1 == true)
    count := count + 1
if (EnableEMA2 == true)
    count := count + 1
if (EnableEMA3 == true)
    count := count + 1
if (EnableEMA4 == true)
    count := count + 1
if (EnableEMA5 == true)
    count := count + 1
if (EnableEMA6 == true)
    count := count + 1
if (EnableEMA7 == true)
    count := count + 1
if (EnableEMA8 == true)
    count := count + 1

// set position size
Amount = 1 / (close * count)

// === EXECUTION ===
strategy.entry("EMA1", strategy.long, qty = Amount, when = window() and crossover(vEMA1,vEMA2) and EnableEMA1 and EnableEMA2)
strategy.close("EMA1", time > finish or crossunder(vEMA1,vEMA2))

strategy.entry("EMA2", strategy.long, qty = Amount, when = window() and crossover(vEMA2,vEMA3) and EnableEMA2 and EnableEMA3)
strategy.close("EMA2", time > finish or crossunder(vEMA2,vEMA3))

strategy.entry("EMA3", strategy.long, qty = Amount, when = window() and crossover(vEMA3,vEMA4) and EnableEMA3 and EnableEMA4)
strategy.close("EMA3", time > finish or crossunder(vEMA3,vEMA4))

strategy.entry("EMA4", strategy.long, qty = Amount, when = window() and crossover(vEMA4,vEMA5) and EnableEMA4 and EnableEMA5)
strategy.close("EMA4", time > finish or crossunder(vEMA4,vEMA5))

strategy.entry("EMA5", strategy.long, qty = Amount, when = window() and crossover(vEMA5,vEMA6) and EnableEMA5 and EnableEMA6)
strategy.close("EMA5", time > finish or crossunder(vEMA5,vEMA6))

strategy.entry("EMA6", strategy.long, qty = Amount, when = window() and crossover(vEMA6,vEMA7) and EnableEMA6 and EnableEMA7)
strategy.close("EMA6", time > finish or crossunder(vEMA6,vEMA7))

strategy.entry("EMA7", strategy.long, qty = Amount, when = window() and crossover(vEMA7,vEMA8) and EnableEMA7 and EnableEMA8)
strategy.close("EMA7", time > finish or crossunder(vEMA7,vEMA8))

plot(vEMA1, title = 'EMA1', color = red, linewidth = 2, style = line)  // plot FastMA
plot(vEMA2, title = 'EMA2', color = orange, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA3, title = 'EMA3', color = yellow, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA4, title = 'EMA4', color = green, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA5, title = 'EMA5', color = teal, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA6, title = 'EMA6', color = blue, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA7, title = 'EMA7', color = maroon, linewidth = 2, style = line)    // plot SlowMA
plot(vEMA8, title = 'EMA8', color = white, linewidth = 2, style = line)    // plot SlowMA

//plot(long_stop, title = 'High-ATR', color = red, linewidth = 2, style = line)    // plot SlowMA
//plot(short_stop, title = 'Low+ATR', color = green, linewidth = 2, style = line)    // plot SlowMA

```

> Detail

https://www.fmz.com/strategy/435101

> Last Modified

2023-12-12 12:18:41
