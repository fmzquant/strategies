
> Name

绝对价格振荡器趋势跟踪策略Absolute-Price-Oscillator-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用绝对价格振荡器(APO)指标生成交易信号,实现趋势跟踪交易。APO指标计算两个不同期限的指数移动平均线之差得到oscillator,根据其值上穿或下穿进行做多做空。

## 策略原理 

- APO指标由一个短期和长期EMA构成,计算二者差值。

- 当APO上穿入买入区(默认3)时做多,当APO下穿卖出区(默认-3)时做空。

- 可选择反转信号,APO上穿时做空,下穿时做多。 

- 指标曲线表示价格动量,可寻找背离形成的趋势反转信号。

该策略属于趋势跟踪策略,利用APO指标确定价格趋势方向,产生持续的做多做空信号。指标参数优化后可追踪到大趋势的中期走势。

## 策略优势

- 使用简单的移动平均指标组合,易于实现。

- 利用APO指标判断价格动量和方向。

- 默认参数产生中期持续信号,避免过度交易。

- 可寻找价格与APO背离的趋势反转机会。

## 策略风险

- 在盘整市场中容易产生假信号和 whipsaws。

- 存在一定的滞后,可能错过快速反转。

- 没有止损和仓位管理,风险控制不完善。

应对风险措施:

- 优化参数,测试不同品种合适的参数组合。

- 增加其他过滤器,避免在震荡市中交易。

- 设定止损策略,如跟踪止损等方式。

## 策略优化方向

- 对每个交易品种单独进行参数优化,寻找最佳参数对。

- 增加价格行情或交易量等过滤条件,减少假信号。 

- 根据波动率或余额比例进行动态仓位管理。

- 优化止盈方式,设置趋势跟踪止盈。

- 应用机器学习算法判断指标背离信号的成功率。

## 总结

该策略以APO指标为基础,实现了基于移动平均线交叉的趋势跟踪交易。优化参数和风险控制后,可成为一个有效的量化交易系统。核心思路简单可靠,值得进一步发展与提高。

|| 

## Overview

This strategy uses the Absolute Price Oscillator (APO) indicator to generate trading signals and follow trends. The APO calculates the difference between two EMAs and trades crossovers above/below zero.

## Strategy Logic

- APO consists of a faster and slower EMA, taking the difference between them.

- When APO crosses above the buy zone (default 3), go long. When it crosses below the sell zone (default -3), go short.

- Option to reverse signals - cross above sells, cross below buys.

- Curve shows price momentum, can find reversals on divergence.

This is a trend following strategy, using APO to determine trend direction for sustained long/short signals. Optimized parameters can track medium-term trends.

## Advantages

- Simple implementation using basic moving average combination.

- APO gauges price momentum and direction. 

- Default parameters generate medium-term sustained signals, avoiding over-trading.

- Can detect trend reversals based on price/indicator divergence.

## Risks 

- Prone to false signals and whipsaws in ranging markets.

- Lagging signals may miss quick reversals. 

- No stop loss or position sizing, incomplete risk management.

Mitigations:

- Optimize parameters and test different combinations per instrument.

- Add filters to avoid trading in choppy conditions. 

- Implement stop loss, e.g. trailing stop.

## Enhancement Opportunities

- Parameter optimization for each instrument to find ideal pairs.

- Additional filters on price action or volume to reduce false signals.

- Dynamic position sizing based on volatility or account %. 

- Optimized take profit such as trailing stop to follow trends.

- ML to assess probability of successful divergence signals. 

## Conclusion

This EMA crossover system using APO provides a solid foundation for trend following. With optimizations in parameters, risk management and filters, it can become an effective quantitative strategy. The core concept is simple and robust for further development.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|LengthShortEMA|
|v_input_2|20|LengthLongEMA|
|v_input_3|3|BuyZone|
|v_input_4|-3|SellZone|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/09/2018
// The Absolute Price Oscillator displays the difference between two exponential 
// moving averages of a security's price and is expressed as an absolute value.
// How this indicator works
//    APO crossing above zero is considered bullish, while crossing below zero is bearish.
//    A positive indicator value indicates an upward movement, while negative readings 
//      signal a downward trend.
//    Divergences form when a new high or low in price is not confirmed by the Absolute Price 
//      Oscillator (APO). A bullish divergence forms when price make a lower low, but the APO 
//      forms a higher low. This indicates less downward momentum that could foreshadow a bullish 
//      reversal. A bearish divergence forms when price makes a higher high, but the APO forms a 
//      lower high. This shows less upward momentum that could foreshadow a bearish reversal.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Absolute Price Oscillator (APO) Backtest 2.0", shorttitle="APO")
LengthShortEMA = input(10, minval=1)
LengthLongEMA = input(20, minval=1)
BuyZone = input(3, step = 0.01)
SellZone = input(-3, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
hline(0, color=gray, linestyle=line)
xPrice = close
xShortEMA = ema(xPrice, LengthShortEMA)
xLongEMA = ema(xPrice, LengthLongEMA)
xAPO = xShortEMA - xLongEMA
pos = iff(xAPO > BuyZone, 1,
       iff(xAPO < SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(xAPO, color=blue, title="APO")
```

> Detail

https://www.fmz.com/strategy/427479

> Last Modified

2023-09-21 15:27:59
