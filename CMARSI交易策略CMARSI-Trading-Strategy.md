
> Name

CMARSI交易策略CMARSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

CMARSI交易策略是一种结合RSI指标和均线的趋势跟随策略。它利用改进后的RSI指标来识别趋势,并以均线作为确定入场退出的信号。该策略适用于中长线交易,通过跟随趋势来获得较好的盈利。

## 原理分析 

CMARSI策略使用了改进后的RSI指标,称为Connors RSI。Connors RSI结合了经典RSI、RSI多空均线和价格变化率ROC这三个指标。它的计算公式是:

Connors RSI = (RSI + RSI多空均线 + ROC百分位) / 3

其中,RSI使用3日计算周期,RSI多空均线使用2日计算周期,ROC百分位使用100日计算周期。

Connors RSI的优点是综合多个指标,可以更准确地识别趋势的变化。当Connors RSI上穿40分界时为看多信号,下穿70分界时为看空信号。

CMARSI策略则在Connors RSI的基础上,额外引入了均线factor。该策略计算2日均线,并以Connors RSI与均线的金叉死叉作为交易信号。具体交易规则为:

1. 当Connors RSI上穿40分界且金叉2日均线时,做多入场。

2. 当Connors RSI下穿70分界且死叉2日均线时,平仓离场。

通过利用均线的滤波,可以避免Connors RSI出现的部分假信号,从而提高策略的稳定性。

## 优势分析

CMARSI策略最大的优势在于综合多个指标识别趋势,避免单一RSI指标的局限性。具体来说,该策略有以下几个优势:

1. Connors RSI指标比经典RSI指标更稳定,可以准确识别趋势转折点。

2. 均线的引入有效过滤掉部分噪音,避免追高杀跌。

3. 多指标组合可以提高胜率,通过跟随趋势获利。

4. 交易规则简单清晰,容易实现。

5. 作为趋势跟随策略,可以充分捕捉中长线趋势的利润。

## 风险分析

CMARSI策略的主要风险来自于趋势判断错误和止损位置设置。具体风险有:

1. Connors RSI指标发出错误信号,导致不必要的入场。可以适当调整参数,或者增加 autres指标的确认。

2. 止损位置设置不合理,可能过早止损或止损幅度太大。应针对不同品种和市场环境优化止损位置。 

3. 震荡行情下,均线过滤效果可能不佳,应对策略参数进行优化。

4. 长期运行可能导致过优化,应定期回测并根据市场环境调整参数。

## 优化方向

CMARSI策略可以从以下几个方面进行优化:

1. 优化Connors RSI的参数,适应不同周期和品种。

2. 尝试不同类型的均线,进一步提高滤波效果。

3. 增加其他指标,如MACD、布林带等来确认交易信号。

4. 优化止损策略,设置合理的移动止损或级差止损。

5. 对交易品种进行筛选,使策略更适合特定品种。

6. 利用Walk Forward Analysis方法定期优化参数,避免过优化。

## 总结

CMARSI策略综合运用Connors RSI和均线指标,通过跟随趋势进行中长线交易。该策略稳定、易于实现,可以有效跟踪趋势获利。我们应针对市场环境不断优化策略参数,并进行风险管理,然后可以获得较好的盈利回报。总的来说,CMARSI是一种值得推荐的趋势交易策略。

||


## Overview

The CMARSI trading strategy is a trend-following strategy that combines the RSI indicator and moving averages. It uses an improved RSI indicator to identify trends and moving averages as signals for entries and exits. This strategy is suitable for medium-to-long term trading and aims to profit by following the trend. 

## Principle Analysis

The CMARSI strategy uses an enhanced RSI indicator called Connors RSI. Connors RSI incorporates three indicators - classical RSI, RSI Up/Down lines, and ROC percentile. Its calculation formula is:

Connors RSI = (RSI + RSI Up/Down + ROC Percentile) / 3

Where RSI uses a 3-day period, RSI Up/Down uses 2 days, and ROC percentile uses 100 days. 

The advantage of Connors RSI is that it combines multiple indicators and can more accurately identify trend changes. A crossing above 40 is a long signal, while a crossing below 70 is a short signal.

The CMARSI strategy further introduces a moving average factor on top of Connors RSI. It calculates a 2-day moving average and uses crossovers of Connors RSI and the MA as trading signals. The specific rules are:

1. Enter long when Connors RSI crosses above 40 and has a golden cross of 2-day MA. 

2. Exit when Connors RSI crosses below 70 and has a death cross of 2-day MA.

Using the MA filter can avoid some false signals from Connors RSI and improve the stability of the strategy.

## Advantage Analysis 

The biggest advantage of the CMARSI strategy is the combination of multiple indicators to identify trends, avoiding the limitations of single RSI indicators. Specifically, the strategy has the following advantages:

1. Connors RSI is more stable than classical RSI for identifying trend turning points.

2. The introduction of moving averages effectively filters out some noise and prevents chasing highs and selling lows. 

3. The combination of multiple indicators can improve win rate by following trends.

4. The trading rules are simple and easy to implement. 

5. As a trend-following strategy, it can fully capture profits from medium-to-long term trends.

## Risk Analysis

The main risks of the CMARSI strategy come from incorrect trend judgement and stop loss placement. The specific risks are:

1. Connors RSI gives incorrect signals, causing unnecessary entries. Parameters can be adjusted or other indicators added for confirmation.

2. Stop loss placement is unreasonable, which may cause premature stop out or too large of a stop loss. Stop loss should be optimized for different products and market environments.

3. Moving average filters may not work well in ranging markets. Strategy parameters should be optimized accordingly. 

4. Prolonged use may lead to overfitting. Regular backtesting and parameter tuning based on market conditions are necessary.

## Optimization Directions 

The CMARSI strategy can be optimized in the following aspects:

1. Optimize Connors RSI parameters for different periods and products. 

2. Try different types of moving averages to further improve the filtering effect.

3. Add other indicators like MACD, Bollinger Bands for trade confirmation. 

4. Optimize stop loss strategies, such as trailing stop loss or staggered stop loss.

5. Select products that fit the strategy better through screening.

6. Use Walk Forward Analysis to regularly optimize parameters and prevent overfitting.

## Conclusion

The CMARSI strategy combines Connors RSI and moving averages to follow trends for medium-to-long term trading. It is stable, easy to implement, and can effectively capture trend profits. We should continuously optimize parameters based on market conditions, manage risks, and generate good profitability. Overall, CMARSI is a recommended trend trading strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
src = close, lenrsi = 3, lenupdown = 2, lenroc = 100, malengt = 2, low = 40, high = 70, a = 1
updown(s) => 
    isEqual = s == s[1]
    isGrowing = s > s[1]
    ud = 0.0
    ud := isEqual ? 0 : isGrowing ? (nz(ud[1]) <= 0 ? 1 : nz(ud[1])+1) : (nz(ud[1]) >= 0 ? -1 : nz(ud[1])-1)
    ud
rsi = rsi(src, lenrsi)
updownrsi = rsi(updown(src), lenupdown)
percentrank = percentrank(roc(src, 1), lenroc)
crsi = avg(rsi, updownrsi, percentrank)
MA = sma(crsi, malengt)

band1 = 70
band0 = 40

ColorMA = MA>=band0 ? lime : red

p1 = plot(MA, title="BuyNiggers", style=line, linewidth=4, color=ColorMA)

p2 = plot(low, title="idk", style=line, linewidth=2, color=blue)
p3 = plot(high, title="idk2", style=line, linewidth=2, color=orange)

//@version=2
strategy("CMARSI")


if crossover(MA,band0)
    strategy.entry("buy", strategy.long, when=strategy.position_size <= 0)
    
if crossunder(MA,band1)
    strategy.exit("sell", "buy", profit=1000000, stop=10000000)
    
plot(strategy.equity)

    




```

> Detail

https://www.fmz.com/strategy/427929

> Last Modified

2023-09-26 20:44:53
