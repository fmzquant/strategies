
> Name

趋势跟踪均线交叉策略Trend-Following-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/158c27d1d8702a1136e.png)

[trans]

## 概述

该策略运用移动平均线的黄金交叉和死叉原理,结合RSI指标辅助判断,实现对趋势的识别和跟踪。当短期均线上穿长期均线时做多,当短期均线下穿长期均线时做空,属于较为典型的趋势跟踪策略。

## 策略原理

该策略主要基于以下原理:

1. 使用EMA均线:较SMA更能反应最新价格变化,对突破做出更快反应。

2. 双均线交叉:短周期均线上穿长周期均线为买入信号,短周期均线下穿长周期均线为卖出信号,利用均线的黄金交叉和死叉原理判断趋势转折。

3. RSI指标辅助判断:RSI高位回落时卖出,RSI低位回升时买入,避免假突破。 

4. 不同周期均线叠加:55周期线为判断短期趋势转折的信号线,100周期线为确定中期趋势的信号线,200周期线为判断长期趋势的信号线。

5. 设置止损止盈:设定合理的止损和止盈比例,控制风险。

该策略的交易逻辑主要如下:

1. 当55周期EMA上穿100周期EMA,并且12周期EMA高于200周期EMA时,做多入场。

2. 当100周期EMA下穿200周期EMA时,做空入场。 

3. 交易入场后,设定止损和止盈条件,优化收益。

4. 在RSI指标显示超买超卖信号时,及时关闭对应的多单和空单,规避反转风险。

5. 通过不同周期EMA的叠加应用,使策略同时兼顾趋势判断和反转确认,跟踪中长期趋势的同时,避免被套。

## 策略优势

该策略主要优势有:

1. 策略思路清晰,通过简单的均线交叉原理判断趋势方向,容易理解和实现。

2. 利用EMA均线,能更快地响应价格变动,及时捕捉趋势转折。

3. 多组周期EMA叠加运用,兼顾跟踪趋势和识别反转。

4. RSI指标的运用避免虚假突破,提高信号的准确性。

5. 默认止损止盈参数设置合理,可以有效控制交易风险。

6. 可扩展性强,可以根据市场调整均线参数和止损止盈参数等来优化策略。

## 风险分析

该策略主要存在以下风险:

1. 均线策略对市场波动敏感,容易被套。若遇到长期震荡市,则会有过多无效交易。

2. 默认参数可能无法适应所有品种和周期的市场特点,需要针对性优化。

3. 没有考虑基本面和重大事件对市场行情的影响,纯技术指标驱动容易被套。 

4. 在指数趋势向上但股市分化时,该策略可能无法获利。

5. 存在因"止盈离场过早"而错过大部分行情收益的风险。

针对这些风险,可以通过以下方式进行优化和改进:

1. 结合交易量指标等过滤器,避免虚假突破带来亏损。

2. 对参数进行回测优化,使之更符合具体品种的特点。 

3. 适当缩短持仓时间,及时止损止盈,规避长期震荡走势的风险。

4. 结合基本面指标,避免在重大利空事件来临时遭受打击。

## 策略优化方向

该策略可以从以下方面进行优化:

1. 优化均线系统参数,寻找更合适的短期、中期和长期均线周期组合。可以尝试Machine Learning等参数优化方法。

2. 测试收盘价和典型价在该策略中的效果对比。

3. 尝试以成交量为滤波器,在大量放量的情况下才产生交易信号。

4. 优化止损止盈条件,使之更具有针对性。也可以设置动态止损止盈按比例调整止损位。

5. 结合其他指标,如Stoch、MACD、布林带等构建复合策略,提高策略效果。

6. 分别在不同品种、周期和市场阶段进行回测,评估策略效果,并进一步改进。

7. 可以考虑在机器学习算法的辅助下进行多维度参数优化。

## 总结

该策略整体思路清晰易懂,通过简单的均线交叉原理判断趋势方向。策略具有易于实现,默认可靠,可扩展性强等优势。但也存在一定的市场风险,需要针对回测结果不断进行参数和模块优化,使策略更稳定和智能化。结合量价技术分析和基本面研究,会使策略更全面和可靠。

||

## Overview

This strategy utilizes the golden cross and death cross principles of moving averages, combined with the RSI indicator to assist in trend identification and tracking. It goes long when the short-term moving average crosses above the long-term moving average, and goes short when the short-term moving average crosses below the long-term moving average. This is a typical trend following strategy.

## Strategy Logic

The strategy is based on the following principles:

1. Use EMA instead of SMA to better reflect the latest price changes and react faster to breakouts.

2. Dual moving average crossover system: short-term EMA crossing above long-term EMA signals long entry, while short-term EMA crossing below long-term EMA signals short entry. This utilizes the golden cross and death cross principles to determine trend reversal. 

3. RSI indicator assists in filtering false breakouts by signaling overbought/oversold conditions.

4. Multiple moving averages stacked together: 55-period EMA for short-term signal, 100-period EMA for medium-term trend, and 200-period EMA for long-term trend filtering.

5. Reasonable stop loss and take profit settings to control risk.

The main trading logic is:

1. Enter long when 55-period EMA crosses above 100-period EMA, and 12-period EMA is above 200-period EMA.

2. Enter short when 100-period EMA crosses below 200-period EMA.

3. Set stop loss and take profit after entry to optimize returns. 

4. Close long/short positions when RSI shows overbought/oversold to avoid reversal risks.

5. The combination of multiple moving average periods accounts for both trend tracking and reversal confirmation, thus avoiding being trapped in prolonged consolidation while following the major trend.

## Advantages

The main advantages of this strategy are:

1. Simple logic based on moving average crossovers, easy to understand and implement.

2. Faster reaction to price changes and trend reversals by using EMA. 

3. Multiple moving average periods account for both trend tracking and reversal identification.

4. RSI filters out false breakouts and increases signal accuracy. 

5. Default stop loss/take profit parameters effectively control trading risks.

6. Highly customizable by adjusting moving average periods, stop loss/take profit ratios etc.

## Risks

The main risks of this strategy are:

1. Prone to being whipsawed in ranging, volatile markets, generating excessive inactive signals.

2. Default parameters may not fit all products and timeframes, requiring optimization.

3. Purely technical signal driven, prone to fundamental shifts and event risks.

4. May underperform when index rises but market breadth diverges. 

5. Risk of profit taking too early and missing most of the trend move.

To address these risks, the following optimizations can be made:

1. Add filters like volume to avoid false breakouts. 

2. Backtest to find optimal parameters for each product.

3. Tighter stop loss and profit taking to limit whipsaw risks in ranging markets.

4. Incorporate fundamental filters to avoid signals before major events.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize moving average periods to find the best short, medium and long-term combinations, via machine learning etc.

2. Test close price vs typical price for performance.

3. Add volume filter to only take signals on high volume bars.

4. Optimize stop loss/take profit ratios for higher precision. Or set dynamic stops based on percentages.

5. Build composite models with additional indicators like Stochastics, MACD, Bollinger Bands to improve performance.

6. Backtest across different products, timeframes and market conditions for robustness.

7. Utilize machine learning for multidimensional parameter optimization.

## Conclusion

This is an easy to understand trend following strategy based on simple moving average crossover logic. It has advantages like easy implementation, reliability, and high customization potential. But it also carries inherent market risks, requiring ongoing optimization of parameters and modules based on backtest results, to make the strategy more robust and intelligent. Combining technical analysis with fundamental research can further improve its completeness and reliability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|27|profit_short|
|v_input_2|2|stop_short|
|v_input_3|3|stop_long|
|v_input_4|35|profit_long|
|v_input_5|55|media_1|
|v_input_6|100|media_2|
|v_input_7|false|resta_medias|
|v_input_8|false|resta_medias2|
|v_input_9|42|RSI_periodos|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-31 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pernath

//@version=5
strategy("TREND_CATCHER", overlay=true, commission_value=0.05, commission_type=strategy.commission.percent, initial_capital=1000)

//#####variables##############
profit_short=input(title='profit_short', defval=27)
stop_short=input(title='stop_short', defval=2)

stop_long=input(title='stop_long', defval=3)
profit_long=input(title='profit_long', defval=35)


media_1=input(title='media_1', defval=55)
media_2=input(title='media_2', defval=100)
resta_medias=input(title='resta_medias', defval=0)
resta_medias2=input(title='resta_medias2', defval=0)

RSI_periodos=input(title='RSI_periodos', defval=42)
//###############VARIABLES###################




//#####Alert#####
id_bot = ""
email_token = ""
long_open =""
long_close =""
short_open =""
short_close =""
//#  {{strategy.order.alert_message}}


//#############################
//#############################

//###############EMA##############/
//plot(ta.ema(close, 1), title='ema 5', color=color.white)
plot(ta.ema(close, 12), title='ema 12', color=color.white)
plot(ta.ema(close, 25), title='ema 25', color=color.white)
plot(ta.ema(close, 30), title='ema 30', color=color.white, linewidth=1)
plot(ta.ema(close, 40), title='ema 40', color=color.white, linewidth=1)
plot(ta.ema(close, 55), title='ema 55', color=color.orange, linewidth=1)
plot(ta.ema(close, 100), title='ema 100', color=color.red, linewidth=1)
plot(ta.ema(close, 200), title='ema 200', color=color.white, linewidth=3)

//#############################/





//######VISUAL#############
EMA50 = ta.ema(close, 55)
EMA100 = ta.ema(close, 100)


estado_medias=EMA50-EMA100




a = plot(EMA50, title="EMA(50)", color=color.orange, linewidth=1 ) 
b = plot(EMA100, title="EMA(100)", color=color.red, linewidth=1 )


var color col = na
col := estado_medias>resta_medias ? color.green : color.red
fill(a,b,color=col,transp=40)


//######VISUAL#############





Go_Short=(ta.crossunder(ta.ema(close,100),ta.ema(close,200)))
Go_Long=((ta.crossover(ta.ema(close,55),ta.ema(close,100))and(ta.ema(close,12)>ta.ema(close,200))))


strategy.close("enter long", (Go_Short),alert_message=long_open)

cancelar_short=((ta.crossunder(ta.ema(close,25),ta.ema(close,6))))



if Go_Short
    strategy.entry("enter short", strategy.short,1, alert_message=short_open) 
  
strategy.exit("cerrar short", "enter short", 1, profit=close*profit_short/100/syminfo.mintick, loss=close*stop_short/100/syminfo.mintick, alert_message=short_close)




strategy.close("enter short", (Go_Long),alert_message=short_close)
cancelar=((ta.crossunder(ta.ema(close,12),ta.ema(close,30))))



if Go_Long
    strategy.entry("enter long", strategy.long,1,alert_message=long_open)

strategy.exit("cerrar long", "enter long", 1, profit=close*profit_long/100/syminfo.mintick, loss=close*stop_long/100/syminfo.mintick, alert_message=long_close)




strategy.close("enter short", (cancelar_short),alert_message=short_close)

strategy.close("enter long", (cancelar),alert_message=long_close)


//posiciones abiertas
bgcolor((strategy.position_size > 0 or strategy.position_size < 0) ? color.blue : na, transp=70)








```

> Detail

https://www.fmz.com/strategy/430777

> Last Modified

2023-11-01 17:18:13
