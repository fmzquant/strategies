
> Name

三重EMA叠加突破策略Triple-EMA-Crossover-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10932b61f00228dfbaf.png)
[trans]

## 概述

三重EMA叠加突破策略利用三重指数移动平均线指标判断市场趋势方向,在趋势突破点进行入场。该策略同时结合K线形态判断信号优劣。

## 策略原理

该策略主要基于以下几点原理:

1. 使用三条不同周期的EMA线(200日线、50日线、20日线),判断市场大趋势、中期趋势和短期趋势。

2. 当短期趋势EMA(20日线)向上突破中期EMA(50日线)时产生买入信号;当向下突破时,产生卖出信号。

3. 结合K线形态,判断突破信号的可靠性。只有在第二根K线收盘价高于(低于)前一日的最高价(最低价)时,才认为是可靠的突破。

4. 设置止盈止损点,规避超出合理波动范围的风险。

## 策略优势

1. 使用多重EMA指标判断趋势,提高判断准确性。

2. 结合K线形态过滤误导信号,避免不必要的交易风险。 

3. 设置止盈止损点,有效控制单笔损失。

## 策略风险

1. 在震荡行情中,EMA指标产生大量误导信号,无法有效判断市场走势。

2. 单一指标组合方式简单,对复杂行情判断力较差。

3. 没有考虑交易成本,在高手续费市场中可能无法盈利。

## 策略优化

1. 可以引入MACD、KDJ等其他指标,形成指标组合,提高判断准确性。

2. 可以根据不同品种、周期参数进行测试优化,使策略参数更加符合该品种特点。

3. 可以引入交易量指标,避免低量的误导信号。

## 总结

三重EMA叠加突破策略整体思路清晰易懂,通过EMA判断市场主次趋势,并在趋势发生转折时寻找入场时机。但该策略有一定的局限性,无法很好地处理复杂行情,建议与其他指标组合使用,并进行参数优化,从而适应更广泛的市场环境。

||

## Overview

The Triple EMA Crossover Breakout strategy uses triple exponential moving average (EMA) indicators to determine market trend direction and enter at trend breakout points. It also combines candlestick patterns to filter signal reliability. 

## Strategy Logic

The strategy is mainly based on the following principles:

1. Use three EMAs with different periods (200-day, 50-day, 20-day) to determine major, medium-term and short-term market trends.  

2. When the short-term EMA (20-day) crosses above the medium-term EMA (50-day), a buy signal is generated. When it crosses below, a sell signal is generated.

3. Combine candlestick patterns to check signal reliability. Only when the closing price of the second candle is higher (lower) than the previous candle's high (low) price, the breakout is considered reliable.  

4. Set stop loss and take profit levels to limit risks beyond reasonable price fluctuations.

## Advantage Analysis 

1. Using multiple EMAs improves trend judgment accuracy.  

2. Filtering fake signals with candlestick patterns avoids unnecessary trading risks.

3. Stop loss and take profit controls single trade loss effectively.

## Risk Analysis

1. In ranging markets, EMAs may generate excessive fake signals and fail to determine market direction.  

2. The single indicator system has limited capacity in complex market situations.

3. It ignores trading costs which could lead to unprofitability in high-fee markets.

## Optimization

1. Introduce other indicators like MACD and KDJ to form a combined system and improve judgment accuracy.  

2. Optimize parameters through backtesting for specific symbols and timeframes to make the strategy fit better.

3. Add trading volume to avoid low-volume fake signals.

## Conclusion

The Triple EMA Crossover Breakout Strategy has clear, easy-to-understand logic to determine market trends and find entry timing using EMA crossovers. But it also has some limitations in dealing with complex market situations. It's recommended to combine with other indicators and optimize parameters to adapt to more diverse trading environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.5|ENTRY LEVEL 1|
|v_input_2|0.25|ENTRY LEVEL 2|
|v_input_3|false|ENTRY LEVEL 3|
|v_input_4|-0.35|STOP LEVEL|
|v_input_5|0.88|TP LEVEL|
|v_input_6|false|Don't Use EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("GHG RETRACEMENT MODE 1", overlay=true)

entryLevel1 = input(0.5, "ENTRY LEVEL 1")
entryLevel2 = input(0.25, "ENTRY LEVEL 2")
entryLevel3 = input(0.0, "ENTRY LEVEL 3")

stopLevel = input(-0.35, "STOP LEVEL")
tpLevel = input(0.88, "TP LEVEL")
dontUseEma = input(false, "Don't Use EMA")


get_level(level, level100, level0) =>
    level * (level100 - level0) + level0

buySignal = close[2] < open[2] and close[1] > open[1] and close[0] > open[0] and high[0] > open[2] and high[1] < high[2]
sellSignal = close[2] > open[2] and close[1] < open[1] and close[0] < open[0] and low[0] < open[2] and low[1] > low[2]

if buySignal and (close[0] > ta.ema(close, 200) or dontUseEma)
    l = label.new(bar_index, na)
    entryPrice1 = get_level(entryLevel1, high[0], low[2])
    entryPrice2 = get_level(entryLevel2, high[0], low[2])
    entryPrice3 = get_level(entryLevel3, high[0], low[2])
    
    exitPrice = get_level(tpLevel, high[0], low[2])
    stopPrice = get_level(stopLevel, high[0], low[2])
    
    strategy.order("BUY 1", strategy.long, comment="BUY 1", limit=entryPrice1)
    strategy.exit("exit", "BUY 1", limit=high[0], stop=stopPrice)
    strategy.order("BUY 2", strategy.long, comment="BUY 2", limit=entryPrice2)
    strategy.exit("exit", "BUY 2", limit=high[0], stop=stopPrice)

    label.set_text(l, "Buy => " + str.tostring(close[2]) + "\nSL=> " + str.tostring(stopPrice) + "\nTP => " + str.tostring(exitPrice) )
    label.set_color(l, color.green)
    label.set_yloc(l, yloc.belowbar)
    label.set_style(l, label.style_label_up)
    
if sellSignal and (close[0] < ta.ema(close, 200) or dontUseEma)
    a = label.new(bar_index, na)
    entryPrice1 = get_level(entryLevel1, low[0], high[2])
    entryPrice2 = get_level(entryLevel2, low[0], high[2])
    entryPrice3 = get_level(entryLevel3, low[0], high[2])
    
    exitPrice = get_level(tpLevel, low[0], high[2])
    stopPrice = get_level(stopLevel,low[0], high[2])
    
    strategy.order("SELL 1", strategy.short, comment="SELL 1", limit=entryPrice1)
    strategy.exit("exit", "SELL 1", limit=low[0], stop=stopPrice) 
    strategy.order("SELL 2", strategy.short, comment="SELL 2", limit=entryPrice2)
    strategy.exit("exit", "SELL 2", limit=low[0], stop=stopPrice) 

    label.set_text(a,"Sell => " + str.tostring(close[2]) + "\nSL=> " + str.tostring(stopPrice) + "\nTP => " + str.tostring(exitPrice) )
    label.set_color(a, color.red)
    label.set_yloc(a, yloc.abovebar)
    label.set_style(a, label.style_label_down)
   

```

> Detail

https://www.fmz.com/strategy/436884

> Last Modified

2023-12-28 15:56:54
