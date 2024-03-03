
> Name

动量均线信封交易策略Moving-Average-Envelopes-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a99bda5f6bd999c4e6.png)
[trans]

## 概述

动量均线信封交易策略是一种趋势跟踪策略。它通过设置移动均线以及上下两个百分比区间作为买卖信号。当价格突破上行或下行区间时产生交易信号。该策略既可以用于趋势跟踪,也可以用于识别超买超卖的市场状态。

## 策略原理  

该策略基于长度为14的简单移动均线。上行百分比区间计算为:移动均线 + 移动均线 × 输入的百分比数值。下行百分比区间计算为:移动均线 - 移动均线 × 输入的百分比数值。这样就形成了上下平行的交易区间带。

当收盘价格大于上行区间时,做多;当收盘价格小于下行区间时,做空。否则保持空仓。输入参数“reverse”可实现反向操作。

该策略使用了3个指标:

1. xSMA - 14周期的简单移动均线,代表中线。

2. xHighBand - 上行百分比区间。

3. xLowBand - 下行百分比区间。   

## 策略优势

该策略具有以下优势:

1. 规则清晰,容易理解和实现。

2. 可用于趋势跟踪,也可用于识别超买超卖。避免在震荡行情中错失方向。

3. 通过调整百分比区间参数,可以控制交易频率。降低交易风险。

4. 可灵活选择移动均线周期,适用于不同周期和市场品种。

5. 反向输入参数增加策略灵活性。可顺势操作,也可逆势操作。

## 风险及解决方法 

该策略也存在一些风险:  

1. 在强势趋势中,有可能出现超过区间范围的深度拉升或回落。导致错过部分利润。可通过降低百分比区间控制风险。

2. 在震荡行情中,可能出现频繁的错误交易信号。可通过增加移动均线周期来过滤信号。

3. 区间范围较小时,价格可能出现频繁触及上下区间的情况。交易频率过高增加交易成本和滑点损失。可适当扩大区间范围。  

4. 快速变化的突发事件可能导致策略亏损。建议结合止损来管理风险。

## 策略优化

该策略可从以下几个方面进行优化:

1. 测试不同长度周期的移动均线,选择产生信号最佳的周期参数。

2. 优化上下百分比区间参数,找到最大化盈利且风险可控的组合参数。

3. 添加其他技术指标作为过滤器,避免在震荡和复杂行情中产生错误信号。例如MACD,KD等。

4. 结合趋势判断指标,改进入场timing。例如ADX,中断等。

5. 测试不同品种参数实效性。调整参数适应不同交易品种。  

6. 结合止损策略,限制单笔亏损风险。

## 总结

动量均线信封交易策略整体来说是一个典型的趋势跟踪策略。它参数设置简单,易于理解和回测。同时也可用于判断超买超卖的复杂行情。通过参数优化和指标组合,可以大幅提高策略实盘效果。该策略值得进一步研究和应用。

||

## Overview  

The Moving Average Envelopes trading strategy is a trend following strategy. It sets up percentage envelopes above and below a moving average line as trading signals when price breaks out the envelopes. The strategy can be used for both trend following and identifying overbought/oversold market conditions.

## Strategy Logic

The strategy is based on a 14-period simple moving average (SMA). The upper envelope is calculated as: SMA + SMA × input percentage. The lower envelope is calculated as: SMA - SMA × input percentage. This forms up and down trading bands parallel to the SMA. 

When close price goes above the upper band, a long position is taken. When close price goes below the lower band, a short position is taken. Otherwise, maintain a flat position. The input parameter "reverse" allows reverse trading.

The strategy uses 3 indicators:  

1. xSMA - 14-period simple moving average, the midline.  

2. xHighBand - Upper percentage envelope.

3. xLowBand - Lower percentage envelope.

## Advantages  

The advantages of this strategy include:

1. Simple logic, easy to understand and implement.  

2. Can be used for both trend following and identifying overbought/oversold levels. Avoids missing trends in rangy markets.

3. Trade frequency can be controlled by adjusting the percentage envelopes parameters. Lowers trading risk.  

4. Flexibility in choosing moving average periods for different timeframes and instruments.

5. The reverse input parameter adds flexibility. Can trade with or against the trend.

## Risks and Solutions

There are some risks to the strategy:

1. Deep pullbacks beyond the envelope range can happen in strong trends, missing some profits. Can lower percentage parameters to control risk.

2. Frequent false signals may occur in choppy/ranging markets. Can increase moving average period to filter signals. 

3. Too narrow envelopes may trigger excessive whipsaws. Can wisely widen envelope range.

4. Sudden volatility from news events can cause losses. Using stop loss helps manage risk.

## Optimization  

The strategy can be optimized:  

1. Test moving averages of different periods and find optimal parameters with best signals.

2. Optimize percentage envelopes for maximum profitability and controllable risk.  

3. Adding filters like MACD and KD to avoid bad signals in choppy/complex market conditions.

4. Combine with trend strength indicators like ADX to improve entry timing. 

5. Test effectiveness across different instruments. Customize parameters per product.

6. Incorporate stop loss strategy to limit downside risk per trade.

## Conclusion  

Overall this is a typical trend following strategy with easy backtesting parameters. It can also identify overbought/oversold levels. Further parameter optimization and combination with other indicators can significantly improve its practical effectiveness for trading. This is a valuable strategy worthy of further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|PercentShift|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/03/2018
// Moving Average Envelopes are percentage-based envelopes set above and 
// below a moving average. The moving average, which forms the base for 
// this indicator, can be a simple or exponential moving average. Each 
// envelope is then set the same percentage above or below the moving average. 
// This creates parallel bands that follow price action. With a moving average 
// as the base, Moving Average Envelopes can be used as a trend following indicator. 
// However, this indicator is not limited to just trend following. The envelopes 
// can also be used to identify overbought and oversold levels when the trend is 
// relatively flat. 
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Moving Average Envelopes", overlay = true)
Length = input(14, minval=1)
PercentShift = input(1, minval = 0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
xSMA = sma(close, Length)
xHighBand = xSMA + (xSMA * PercentShift / 100)
xLowBand = xSMA - (xSMA * PercentShift / 100)
pos = iff(close > xHighBand, 1,
       iff(close <xLowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xSMA, color=blue, title="SMA")
plot(xHighBand, color=red, title="High Band")
plot(xLowBand, color=red, title="Low Band")
```

> Detail

https://www.fmz.com/strategy/436647

> Last Modified

2023-12-26 15:55:43
