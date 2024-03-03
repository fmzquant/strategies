
> Name

九日均线和二十日均线交叉策略Nine-and-Twenty-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略利用九日均线和二十日均线的交叉来判断趋势方向,以此制定买入和卖出策略。它综合了移动均线、K线和量价指标,是一个典型的短线交易策略。

## 策略原理

这是一个基于九日均线和二十日均线交叉的简单趋势跟随策略。具体来说,它包括以下几个部分:

1. 设置K线的颜色。当今日收盘价高于昨日时,K线设为绿色;当今日收盘价低于昨日时,K线设为红色。

2. 设置九日均线的颜色。当九日均线上涨且二十日均线也上涨时,九日均线设置为绿色;当九日均线下跌且九日均线也下跌时,设置为红色;其余情况设置为黑色。

3. 设置二十日均线的颜色。当二十日均线上涨时设置为黑色,下跌时设置为黑色,其余不变。

4. 绘制二百日均线,设置为深蓝色。

5. 绘制九日均线和二十日均线的交叉点,设置为洋红色。

6. 绘制成交量加权平均价(VWAP),设置为白色。

7. 当九日均线上穿二十日均线时,做多;当九日均线下穿二十日均线时,做空。

以上部分综合运用了均线、K线、交叉点和量价指标来判断市场趋势和信号,是一个典型的技术分析策略。

## 策略优势分析

这是一个简单实用的短线策略,具有以下几个优势:

1. 操作简单,容易掌握。仅需要观察两个均线的关系即可。

2. 回撤较小,适合短线操作。九日和二十日均线具有一定的平滑性,可以减少短线市场噪音的影响。

3. 容易发现趋势信号。均线交叉是明确的趋势转折信号,不易错过。

4. 综合多种技术指标,提高决策质量。结合K线、均线和量价指标,可以更全面判断趋势方向。

5. 实现代码简洁,容易测试和优化。MQL4语言可以快速实现该策略逻辑,便于参数调整。

6. 可适用于不同品种和周期。股票、外汇、数字货币等只要有OHLC数据都可以运用该策略。

## 风险分析

尽管该策略有一定优势,但也存在以下风险:

1. 九日和二十日均线参数需要优化。在不同市场周期下效果可能会有较大差异。

2. 容易产生假突破和回调。均线交叉信号可能会被迅速抹平。

3. 无法处理趋势震荡市。当市场长期处于无明确趋势时,该策略会产生频繁交易亏损。

4. 需承担震荡调整风险。如果发生错误的做空,震荡行情可能导致亏损加剧。

5. 无法响应突发重大消息。该策略完全依赖历史K线,无法考虑重大消息对价格的影响。

针对上述风险,可以考虑适当调整持仓比例,使用止损策略,优化参数,或与其他因子结合使用。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化均线参数,找到最佳周期组合。可以尝试不同的短期和中期均线周期,寻找最匹配的组合。

2. 增加其他指标过滤Signals,如MACD,KD,布林带等。可以减少假信号。

3. 增加止损策略。设定移动止损或指数移动止损,可以控制单笔亏损。

4. 结合趋势过滤器操作。只在趋势明显时参与交易,避免震荡市场。

5. 优化资金管理策略。设置仓位大小、止损幅度、追踪止损等细节,可以提高策略稳定性。

6. 测试不同品种和周期下的数据。调整参数,使策略更具鲁棒性。

7. 增加机器学习等高级技术。使用RNN,LSTM等方法进行特征工程和参数优化。

## 总结

该策略整体而言是一个简单实用的短期趋势跟随策略。它使用均线交叉判定趋势方向,结合K线、均线和量价指标进行决策,可以有效识别趋势信号。但该策略也存在一些风险,需要对参数、止损和资金管理进行优化,才能长期稳定运用。机器学习等新技术也可以提升策略的效果。总体来说,该策略为量化交易提供了一个简单可靠的思路,值得研究和应用。


||


## Overview

This strategy uses the crossover of the 9-day and 20-day moving averages to determine the trend direction and make trading decisions. It integrates moving averages, candlesticks, and volume price analysis, making it a typical short-term trading strategy.

## Strategy Logic

This is a simple trend-following strategy based on the crossover of the 9-day and 20-day moving averages. Specifically, it includes the following parts:

1. Set candlestick colors. The candlestick is colored green if the closing price today is higher than yesterday, and red if lower. 

2. Set the color of the 9-day MA. It is colored green if the 9-day MA goes up and the 20-day MA also goes up. It is colored red if the 9-day MA goes down and the 20-day MA also goes down. Otherwise, it is black.

3. Set the color of the 20-day MA. It is colored black if the 20-day MA goes up and black if it goes down. Otherwise, no change.  

4. Plot the 200-day MA in navy.

5. Plot the crossover points of the 9-day and 20-day MAs in magenta. 

6. Plot the Volume Weighted Average Price (VWAP) in white.

7. Go long when the 9-day MA crosses above the 20-day MA, and go short when crossing below.

The above combines moving averages, candlesticks, crossover points and volume price analysis to determine market trends and signals. It is a typical technical analysis strategy.

## Advantages

This simple short-term strategy has the following advantages:

1. Easy to use. Just observe the relationship between the two MAs.

2. Small drawdowns suitable for short-term trading. The 9-day and 20-day MAs have smoothing effects and reduce market noise.

3. Easy to identify trend signals. MA crosses are clear trend reversal signals. 

4. Integrates multiple technical indicators for better decisions. Candlesticks, MAs and volume price analysis give a comprehensive view of the trend.

5. Simple and clean code for easy testing and optimization. MQL4 allows quick implementation and parameter tuning.

6. Applicable to different products and timeframes. It works on any product with OHLC data.

## Risks

Despite the advantages, the strategy also has the following risks:

1. The MA parameters need optimization for different markets.

2. Prone to false breaks and pullbacks. Signals may be quickly invalidated.

3. Unable to handle range-bound markets. Frequent losses may occur in trendless markets.

4. Vulnerable to whipsaws. Wrong short signals may lead to mounting losses in choppy markets.

5. Unable to respond to major news events. It relies solely on historical data.

To address the risks, consider adjusting position sizing, using stop loss, optimizing parameters, or combining with other factors.

## Optimization

The strategy can be optimized in the following aspects:

1. Optimize MA periods to find the best combination for different markets.

2. Add other indicators to filter signals, e.g. MACD, KD, Bollinger Bands. This can reduce false signals.

3. Add stop loss strategies like trailing stop loss to limit losses.

4. Only trade in apparent trends and avoid range-bound markets. 

5. Optimize money management models including position sizing, stop loss, trailing stop loss etc. to improve stability.

6. Test performance across different products and timeframes and adjust parameters.

7. Apply machine learning models like RNN and LSTM for feature engineering and parameter optimization.

## Conclusion

In summary, this is a simple and practical short-term trend following strategy. It identifies trends using MA crosses and integrates candlesticks, MAs and volume price analysis for decision making. But it also has some risks that need to be addressed through parameter optimization, stop loss, and money management. Machine learning can further improve performance. Overall, it provides a reliable approach to quantitative trading worth researching and applying.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=1
strategy("Dieyson daytrade EMA 9+20+200+VWAP and bar & line color", overlay=true)


//bar color rules
Dgbar = close>close[1] and ema(close,20)>ema(close[1],20)
Drbar = close<close[1] and ema(close,20)<ema(close[1],20)

//Barcolors
barcolor(Dgbar ? green : na)
barcolor(Drbar ? red : na)

//MM09 Colorful

MMgreen9 = ema(close,9)>ema(close[1],9) and ema(close,20)>ema(close[1],20)
MMred9 = ema(close,9)<ema(close[1],9) and ema(close,9)<ema(close[1],9)
col8 = (MMgreen9 ? color(green,0) : na)
col28 = (MMred9 ? color(red,0) : na)
col38 = (not MMgreen9 and not MMred9 ? color(black,0) : na)

plot(ema(close,9), color=col8, style=line, linewidth=2)
plot(ema(close,9), color=col28, style=line, linewidth=2)
plot(ema(close,9), color=col38, style=line, linewidth=2)

//MM20 Colorful

MMgreen = ema(close,20)>ema(close[1],20)
MMred = ema(close,20)<ema(close[1],20)
col = (MMgreen ? color(black,0) : na)
col2 = (MMred ? color(black,0) : na)
col3 = (not MMgreen and not MMred ? color(black,0) : na)
col4 = color(navy,0)
plot(ema(close,20), color=col, style=line, linewidth=1)
plot(ema(close,20), color=col2, style=line, linewidth=1)
plot(ema(close,20), color=col3, style=line, linewidth=1)
plot(ema(close,200), color=col4, style=line, linewidth=3)
plot(cross(ema(close,9), ema(close,20)) ? ema(close,9) : na, style = cross,color=fuchsia, transp=0, linewidth = 4)
//plot(cross(ema(close,9), ema(close,200)) ? ema(close,9) : na, style = cross, color=fuchsia, transp=0,linewidth = 4)

colorvwap = color(white,0)
plot(vwap, color=colorvwap, style=line, linewidth=1)

c = crossover(ema(close,9), ema(close,20)) and ema(close,9) > ema(close,20)
v = crossunder(ema(close,9), ema(close,20))

strategy.entry("COMPRA", strategy.long,when=c)
strategy.entry("VENDA", strategy.short,when=v)



```

> Detail

https://www.fmz.com/strategy/428058

> Last Modified

2023-09-28 11:17:10
