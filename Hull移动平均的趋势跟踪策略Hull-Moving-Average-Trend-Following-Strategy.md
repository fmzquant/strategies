
> Name

Hull移动平均的趋势跟踪策略Hull-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157eafa900f2fc0da45.png)

[trans]


## 概述

本策略基于Hull移动平均指标构建趋势跟踪交易系统,根据Hull曲线的方向决定做多做空,属于典型的趋势追踪策略。

## 策略原理

本策略使用Hull移动平均线作为主要技术指标。Hull移动平均线由美国交易员Alan Hull于2005年提出,是在移动平均线基础上进行改进,使用平方根函数减少了移动平均线的滞后性。

具体来说,Hull移动平均线包含两个平均线,一个是期间n的移动平均线MA(n),另一个是期间n/2的移动平均线MA(n/2)。两条平均线之差构成Hull差值曲线,再对Hull差值曲线计算其自身的移动平均线,即得出Hull曲线。

当Hull曲线上涨时,代表短期移动平均线上穿长期移动平均线,为触发做多信号;当Hull曲线下穿时,代表短期移动平均线下穿长期移动平均线,为触发做空信号。

本策略设置Hull期间n为16,分别计算n/2=8期移动平均线、n=16期移动平均线,并计算两者之差的Hull曲线,再对Hull曲线计算自身的n=4期移动平均(取平方根n=4)。当Hull曲线上穿时做多,下穿时做空。

## 策略优势分析

相比普通移动平均线,Hull移动平均线具有以下优势:

1. 减少滞后。运用平方根函数,Hull曲线更贴近价格,能够更快捕捉价格转折。

2. 减少假突破。传统移动平均线tend to generate more false crosses,而Hull曲线可以过滤掉一些噪音,避免不必要的交易。

3.  parameter少。Hull曲线只需要一个n参数,方便优化,而双均线系统需要优化两个参数。

4. 可自定义。Hull曲线的n值可以根据市场调整,可自定义周期,适应不同品种。

5. 系统性强。Hull曲线系统性强,规避人工选择,遵循机械交易系统的一致性。

## 风险分析

尽管相比移动平均线系统,Hull系统具有诸多优点,但仍存在以下风险:

1. 趋势跟踪策略本身的局限。Hull系统作为趋势跟随策略,在趋势剧烈变化时容易止损。

2. 容易产生频繁交易。Hull曲线的快速响应特征会增加交易频率,容易过度交易。

3. parameters易过优化。只有一个参数n易导致过度优化,curve fitting的风险。

4. 效果因品种不同而异。Hull系统对一些具有高波动率的品种效果不佳,需要针对品种调整参数。

## 策略优化方向 

基于上述Hull移动平均策略的局限性,可以从以下方面进行优化:

1. 结合附加指标过滤交易信号,避免假突破。可加入MACD,KD等指标判断趋势。

2. 增加止损策略,控制单笔损失。如设置移动止损或挂单止损。

3. 优化参数n的选择,避免过优化。可以采用walk forward analysis方法进行滚动优化。

4. 结合机器学习技术动态优化参数。使用RNN等模型预测参数n的最优值。

5. 分品种参数优化。使用机器学习对不同品种参数进行优化拟合。

6. 优化仓位管理,降低交易频率。可采用固定份额法则等方法。

## 总结

Hull移动平均策略是一个典型的趋势跟踪策略。相比移动平均线具有优势,但也存在过优化,频繁交易等问题。我们可以通过参数优化,止损策略,仓位管理等方法来改进该策略。Hull系统简单实用,值得进一步研究与优化,可结合更多指标和技术来制定一个稳定的交易系统。

||

## Overview

This strategy is based on the Hull Moving Average indicator to construct a trend following trading system. It decides to go long or go short based on the direction of the Hull curves, making it a typical trend chasing strategy.

## Strategy Logic

This strategy uses the Hull Moving Average as the main technical indicator. The Hull Moving Average was proposed by American trader Alan Hull in 2005. It improves on moving averages by using a square root function to reduce lag. 

Specifically, the Hull Moving Average contains two averages - one is the moving average MA(n) of period n, the other is the moving average MA(n/2) of period n/2. The difference between the two moving averages forms the Hull difference curve. Taking the moving average of the Hull difference curve itself gives the Hull curve.

When the Hull curve slopes up, the shorter period moving average crosses above the longer period one, giving a long signal. When the Hull curve slopes down, the shorter MA crosses below the longer MA, giving a short signal.

This strategy sets period n of the Hull curve to 16. It calculates the 8-period MA (n/2=8), the 16-period MA, and the difference between them to get the Hull curve. It then takes the 4-period MA (square root of n=4) of the Hull curve itself. When the Hull curve crosses up, it goes long. When the Hull curve crosses down, it goes short.

## Advantage Analysis

Compared to ordinary moving averages, the Hull Moving Average has the following advantages:

1. Reduces lag. By using a square root function, the Hull curve hugs price action closer and is quicker to catch trend reversals.

2. Reduces false crosses. Traditional MAs tend to generate more false crosses. The Hull curve can filter out some noise and avoid unnecessary trades.

3. Fewer parameters. The Hull curve only needs one parameter n, making optimization easier. A dual-MA system needs to optimize two parameters.

4. Customizable. The n value of the Hull curve can be adjusted for different markets and customized to suit different instruments. 

5. Systematic. The Hull system is robust and avoids manual selection, adhering to the consistency of mechanical trading systems.

## Risk Analysis

Despite its advantages over moving average systems, the Hull system still carries the following risks:

1. Limitations of trend following itself. As a trend chasing strategy, Hull systems are prone to stop outs during drastic trend changes.

2. Potential for overtrading. The fast response of Hull curves may increase trade frequency and lead to overtrading.

3. Overoptimization of parameters. Having just one parameter n can lead to curve fitting risks from overoptimization.

4. Varying effectiveness across instruments. The Hull system works less well for instruments with high volatility. Parameters need to be adjusted accordingly.

## Improvement Directions

Based on the limitations above, the Hull moving average strategy can be improved in the following aspects:

1. Add filters with additional indicators to avoid false crosses. MACD, KD etc. can help gauge the trend. 

2. Add stop loss strategies to control single trade loss, e.g. with trailing stops or take profit stops.

3. Optimize parameter n selection to prevent overoptimization. Walk forward analysis can be used for rolling optimization.

4. Use machine learning models like RNNs to dynamically optimize parameter values.

5. Optimize parameters separately for different instruments using machine learning fitting. 

6. Optimize position sizing to lower trade frequency. Fixed fractional position sizing can help.

## Conclusion

The Hull Moving Average strategy is a typical trend following strategy. Despite its advantages over MAs, it still faces issues like overoptimization and overtrading. We can improve the strategy through parameter optimization, stop losses, position sizing etc. The Hull system is simple and practical. It deserves further research and enhancement by incorporating more indicators and techniques to build a robust trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|16|HullMA period|
|v_input_5|1900|From Year|
|v_input_6|2100|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-25 00:00:00
end: 2023-11-01 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's HullMA Strategy", shorttitle = "HullMA str", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
n = input(title = "HullMA period", defval=16)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//HullMA
n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))
n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
c=n1>n2?green:red
ma=plot(n1,color=c)
    
//Trading
lot = 0.0
lot := strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]
if n1 > n2
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)
if n1 < n2
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot)
if true
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430853

> Last Modified

2023-12-01 15:02:29
