
> Name

基于形态与蜡烛线的量化交易策略Fractal-and-Pattern-Based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b589721f196ad7ad04.png)
[trans]
### 概述

本文将要介绍的是一种结合形态分析与蜡烛线形态的量化交易策略。该策略通过检测价格图形中的重要拐点和代表强势反转的蜡烛形态,实现低风险高效益的自动化交易。

### 策略原理

该策略基于对价格走势的详细分析,结合形态分析和蜡烛线分析,设定了清晰的进场逻辑和止损逻辑,能够实现能够实现对趋势的有效跟踪。

具体来说,其进场条件是:价格上穿前两个K线的最高价并且出现突破前期高点形态或多头吞没形态或锤头形态之一。这个组合条件能够有效确认看涨机会。同时其止损条件是:价格下穿前两个K线的最低价。这样的止损逻辑保证了止损及时高效。

在判断形态方面,该策略结合使用了识别重要拐点的分型线,以及判断趋势反转的三种典型蜡烛形态。其中重要拐点分型的判断使用比较广泛的分型理论,判断多头、空头吞没和锤子等形态则使用了比较成熟的算法。

在具体实现上,该策略使用pine脚本编写。其检测分型的实现逻辑是当当前K线的最高价等于之前3根K线的最高价时,即为顶分型。底分型的判断原理类似。检测吞没类形态则基于开盘价、收盘价大小关系的严格判断。

### 策略优势

该策略的主要优势有:
1. 结合分型与蜡烛形态,判断准确可靠;
2. 进场、止损逻辑清晰简单,易于实施;  
3. 使用成熟理论与指标,可避免过拟合问题;
4. Pine脚本编写,适用于TradingView等主流平台。

### 策略风险

该策略仍存在一定的风险需要注意:  
1. 分型与形态判断仍存在一定主观性;
2. 短期内可能产生连续的错误信号;
3. 高频交易时止损幅度需要调整。  

针对上述风险,可通过优化止损策略,引入趋势过滤,使用量化工具验证策略参数等方法加以控制。

### 策略优化

该策略可进一步优化的方向包括:
1. 调整蜡烛形态的参数,确保判断的准确性;  
2. 增加对趋势的判断,避免因短期震荡产生错误信号;
3. 引入机器学习等方法,实现参数的自动优化。

通过上述优化,可以进一步增强策略的稳定性与盈利能力。

### 总结

本文详细介绍了一种基于分型线和蜡烛形态的量化交易策略。该策略判断准确、易于实施,能够有效捕捉价格趋势并实现自动化交易。经过持续优化与验证,其表现将进一步提升,值得投资者或交易员深入研究与应用。

||

### Overview  

This article introduces a quantitative trading strategy that combines fractal analysis and candlestick patterns. By detecting key reversal points and bullish/bearish reversal candlestick patterns, this strategy enables low-risk high-return automated trading.  

### Strategy Principle  

This strategy is based on detailed price action analysis, using a combination of fractal analysis and candlestick pattern recognition to define clear entry and stop loss logic for capturing the trend.  

Specifically, its entry condition is: price breaks above the high of the previous 2 bars, and a fractal breakout or bullish engulfing or hammer pattern occurs. This combination solidly confirms long signals. The stop loss logic which defines exit at price breaking below the low of the previous 2 bars ensures quick and effective stops.  

For pattern detection, this strategy uses the commonly used fractal theory to identify key reversal points, as well as algorithms to detect the 3 classic candlestick reversal patterns.  

The coding is done in Pine script. Fractal high/low is identified when price makes 3-bar new high/low, and strict rules on open/close prices are used for engulfing patterns.  

### Advantages  

Main advantages of this strategy:

1. Accurate signal combining fractals and patterns  
2. Clear entry and stop loss logic  
3. Mature theories prevent overfitting  
4. Pine script allows backtesting 

### Risks

There are still risks to note:   

1. Subjectivity in fractal and pattern detection  
2. Whipsaws potentially generating consecutive losing trades 
3. Stop loss sizing requires adjustment for high frequency trading   

Methods like optimized stops, trend filtering and walk forward analysis can help control the above risks.  

### Enhancements

Areas for further enhancements:

1. Fine tune candlestick pattern parameter for robustness  
2. Add trend bias filter to avoid whipsaws
3. Introduce machine learning for automatic parameter optimization

These improvements will further strengthen the strategy’s stability and profitability.  

### Conclusion  

This article thoroughly covers a price action trading strategy combining fractals and candlestick patterns. With accurate signaling, easy implementation and effective trend following, this strategy can greatly benefit systematic traders and discretionary traders alike. Continual improvements and verification will further elevate its performance for practical trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Fractal & Pattern Entry/Exit Strategy", overlay=true)

// Fractal calculation
fractalHigh = high == highest(3)
fractalLow = low == lowest(3)

// Pattern detection
bullishEngulfing = open < close[1] and close > open[1] and close > open + (open[1] - close[1]) * 2 and low < min(open, close) and high > max(open, close) and open[1] > close[1]
bearishEngulfing = open > close[1] and close < open[1] and open > close + (close[1] - open[1]) * 2 and high > max(open, close) and low < min(open, close) and open[1] < close[1]
hammer = open < close and close > (high + low + open * 2) / 4 and close - open > (high - low) * 0.6 and high - close < (high - low) * 0.1 and open - low < (high - low) * 0.1
hangingMan = open > close and open < (high + low + close * 2) / 4 and open - close > (high - low) * 0.6 and high - open < (high - low) * 0.1 and close - low < (high - low) * 0.1

// Entry condition
longCondition = crossover(close, highest(2)[1]) and (fractalHigh or bullishEngulfing or hammer)
shortCondition = crossunder(close, lowest(2)[1]) and (fractalLow or bearishEngulfing or hangingMan)

// Exit condition
exitLongCondition = crossunder(close, lowest(2)[1])
exitShortCondition = crossover(close, highest(2)[1])

// Entry and exit orders
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)
if (exitLongCondition)
    strategy.close("Long")
if (exitShortCondition)
    strategy.close("Short")

// Plot fractals
plotshape(fractalHigh, title="Fractal High", style=shape.triangledown, location=location.abovebar, color=color.green, size=size.small)
plotshape(fractalLow, title="Fractal Low", style=shape.triangleup, location=location.belowbar, color=color.red, size=size.small)

// Plot patterns
plotshape(bullishEngulfing, title="Bullish Engulfing", style=shape.arrowup, location=location.belowbar, color=color.green, size=size.small)
plotshape(bearishEngulfing, title="Bearish Engulfing", style=shape.arrowdown, location=location.abovebar, color=color.red, size=size.small)
plotshape(hammer, title="Hammer", style=shape.arrowup, location=location.belowbar, color=color.green, size=size.small)
plotshape(hangingMan, title="Hanging Man", style=shape.arrowdown, location=location.abovebar, color=color.red, size=size.small)

```

> Detail

https://www.fmz.com/strategy/442113

> Last Modified

2024-02-19 14:32:45
