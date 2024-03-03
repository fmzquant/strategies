
> Name

相对强弱指标RSI策略Relative-Strength-Index-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fbcb15d8a86fa3b308.png)
[trans]

## 概述

RSI策略是一种根据相对强弱指标RSI来进行交易的策略。该策略利用RSI的过买过卖区域来判断市场的超买超卖状态,以捕捉价格反转机会。当RSI进入超卖区时做多,进入超买区时做空,以期捕捉价格从一个极端回归到平均水平的机会。

## 策略原理  

RSI策略的核心逻辑基于RSI指标的计算原理。RSI指标是通过比较一段时期内的平均收盘涨幅和平均收盘跌幅来衡量证券价格强弱的技术分析工具。其计算公式为:

RSI = 100 - (100 / (1 + RS))

其中,RS=近n日平均收盘涨幅/近n日平均收盘跌幅

根据公式可知,RSI值固定介于0到100之间。当证券价格持续上涨,平均收盘涨幅明显高于平均收盘跌幅,RSI将接近100;当证券价格持续下跌,平均收盘跌幅远超平均收盘涨幅,RSI将接近0。

RSI策略所依据的经验法则是,当RSI进入超卖区(一般认为低于30),表示证券可能超卖,这时做多;当RSI进入超买区(一般认为超过70),表示证券可能超买,这时做空。这样通过在两个极端之间反复交易,可以捕捉证券价格从一个极端回归平均的机会。

具体来看,该策略代码通过设置Length参数指定RSI的计算周期,设置Oversold和Overbought参数来指定RSI的超买超卖区阈值。根据当前RSI值与阈值的关系来判断做多做空信号。同时设置了reverse参数以控制交易方向。

## 策略优势

RSI策略的最大优势在于简单易用。RSI是一种非常常用的技术指标,大部分交易软件都内置了RSI功能。该策略直接调用RSI指标实现交易信号判断,不需要复杂的数学计算和模型,相当容易理解和使用。

另一个优势是参数设置灵活。策略允许自定义RSI计算周期和超买超卖区阈值,可以根据不同市场调整参数,较好适应市场变化。此外,反向交易设置也增加了策略的灵活性。

RSI策略还具有较高的胜率。由于追踪超买超卖现象形成交易信号,可以有效过滤曲折盘整阶段的头假信号,确保入市时确有趋势。这也使RSI策略能够在趋势性行情中获取较佳回报。

## 策略风险

RSI策略的首要风险在于容易产生虚假信号。当价格出现短期调整但并未发生趋势反转时,RSI可能会临时进入超买超卖区域向反方向发出错误信号。若交易者追随这样的信号进行反向建仓,很可能造成止损。

另一个风险是RSI发生背离。价格波动可能已形成新趋势,但RSI指标仍停留在之前的超买超卖区域,此时产生的信号就是错误的。若在此时仍机械跟随RSI信号,则可能导致建仓失败。

此外,仅依赖RSI单一指标而忽视价格行情和大盘环境也存在一定盲目性,这将提高策略的系统性风险。一旦行情进入非理性阶段,单纯的RSI信号将难以应对。

## 策略优化方向 

RSI策略可以从以下几个方面进行优化:

1. 结合其他指标过滤信号,如MACD、布林带等,避免出现虚假信号

2. 增加止损机制,避免单笔损失过大

3. 根据大盘走势和市场环境调整参数,如牛市时提高超买线,熊市时降低超卖线

4. 优化交易时间,避开重要新闻事件,只在趋势明显时交易

5. 尝试在趋势加速阶段加大仓位,利用趋势获利

6. 设置waiting期,避免RSI短期脱离超买超卖区域发出反向信号

7. 增加资金管理策略,如固定交易额,控制仓位规模等

## 总结

RSI策略是一个非常典型的跟踪超买超卖现象的反转策略。它简单实用,参数可调,在出现明显超买超卖的趋势行情中可以获得较好收益。但也存在一定的系统性风险,需要配合其他指标进行优化,并控制止损加强资金管理。如果使用得当,RSI策略可以成为短线游资获取较稳定收益的有效工具。

||


## Overview

The RSI strategy is a trading strategy that utilizes the Relative Strength Index (RSI) indicator to generate trade signals. It identifies overbought and oversold conditions in the market by observing extreme RSI values, aiming to capture price reversal opportunities. It goes long when RSI enters oversold territory and goes short when RSI reaches overbought area, expecting prices to revert back to the mean from extremes.

## Strategy Logic

The RSI strategy is based on the calculation principle of the RSI indicator. RSI measures the strength of price movements by comparing the average closing price gains and average closing price losses over a period of time. Its formula is:

RSI = 100 - (100 / (1 + RS))

Where RS = Average Closing Price Gains / Average Closing Price Losses over past n days.

According to the formula, RSI value is fixed between 0 and 100. When the security price has been rising consistently, pushing RS higher, RSI will approach 100. When price has been falling persistently, making RS smaller, RSI will go near 0.

The empirical rule followed by the RSI strategy is: when RSI goes below 30, which is considered oversold area, go long; when RSI rises above 70, deemed as overbought zone, go short. By trading back and forth between the two extremes, it aims to capture opportunities of price reverting from one extreme back to the mean. 

Specifically, the strategy sets the Length parameter to define the calculation period of RSI, and the Oversold and Overbought parameters to specify the threshold values for RSI oversold/overbought zones. It generates long/short signals by checking the current RSI value against the threshold values. The reverse parameter is also available to control the trade direction.

## Advantages

The biggest advantage of the RSI strategy is its simplicity. RSI is a very common technical indicator available in most trading platforms. The strategy directly uses RSI to determine trade signals without complex math or models, which makes it really easy to understand and use.

Another advantage is the flexibility in parameter tuning. The strategy allows customizing RSI period and overbought/oversold threshold values, which helps adapt to changing market conditions. The reverse trade setting also adds flexibility.

The RSI strategy also has a higher win rate. By tracking overbought/oversold extremes, it can effectively filter out false signals during range-bound periods and ensure entering the market with an established trend. This enables the strategy to deliver superior returns in trending markets.

## Risks

The primary risk of the RSI strategy is generating false signals. When prices experience a short-term pullback within a trend rather than a full reversal, RSI may briefly poke into the overbought/oversold area and trigger wrong signals. Following such signals and trading in the opposite direction is likely to cause stops to be hit.

Another risk is RSI divergence. Price moves may have started a new trend, but RSI remains stuck in the previous overbought/oversold zone, leading to incorrect signal generation. Blindly following RSI signals in such cases could lead to failed trades. 

Also, solely relying on RSI and ignoring price action and market context introduces biases. Mechanical RSI signals may fail in irrational market conditions. 

## Improvement Directions

The RSI strategy can be enhanced in the following aspects:

1. Add filters using other indicators like MACD, Bollinger Bands to avoid false signals.

2. Incorporate stop loss to limit losses on single trades. 

3. Adjust parameters based on market trends and regimes, such as raising overbought threshold in bull market.

4. Optimize trading time to avoid major news events, only trade when trend is obvious.

5. Consider sizing up when trend accelerates to ride the trend. 

6. Add waiting period to prevent premature RSI signal reversals.

7. Introduce money management rules like fixed trade size, position sizing etc.

## Conclusion

The RSI strategy is a typical mean-reversion strategy that tracks overbought/oversold conditions. It is simple to use, customizable and can deliver decent profits when clear overextensions exist in trending markets. But inherent systematic risks call for enhancements like filtering, stop loss, parameter tuning, money management etc. When properly executed, the RSI strategy can be an effective tool for short-term traders to harvest relatively steady gains.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2|30|Oversold|
|v_input_3|70|Overbought|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/01/2017
// The RSI is a very popular indicator that follows price activity. 
// It calculates an average of the positive net changes, and an average 
// of the negative net changes in the most recent bars, and it determines 
// the ratio between these averages. The result is expressed as a number 
// between 0 and 100. Commonly it is said that if the RSI has a low value, 
// for example 30 or under, the symbol is oversold. And if the RSI has a 
// high value, 70 for example, the symbol is overbought. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Strategy RSI", shorttitle="Strategy RSI", overlay = true )
Length = input(12, minval=1)
Oversold = input(30, minval=1)
Overbought = input(70, minval=1)
reverse = input(false, title="Trade reverse")
xRSI = rsi(close, Length)
pos = iff(xRSI > Overbought, 1,
	   iff(xRSI < Oversold, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
```

> Detail

https://www.fmz.com/strategy/430871

> Last Modified

2023-11-02 15:54:24
