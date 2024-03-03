
> Name

三分钟短仓专家顾问策略3-Min-Short-Only-Expert-Advisor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a5a2bf8ba4db0402db.png)

[trans]

## 概述
本策略是一个针对美元指数(ES)3分钟间隔的短仓专家顾问策略。它通过计算一系列指数移动平均线,结合特定的形态条件来产生交易信号。

## 策略原理
该策略的核心指标是T3平均线。T3平均线首先计算一组指数移动平均线xe1~xe6,时间间隔为用户设定的T3参数。然后通过一组特定的加权系数,计算这些指数移动平均的加权平均值,作为最终的T3平均线。

当收盘价低于T3平均线时产生买入信号;当收盘价高于T3平均线时产生卖出信号。此外,策略还判断了特定的K线形态作为入场信号的辅助条件。只有当符合形态条件和T3平均线信号同时出现时,才会发出交易指令。

## 优势分析
该策略最大的优势在于多重过滤和参数优化。一方面,结合价位指标和图形指标进行多重过滤,可以减少许多噪声交易。另一方面,关键参数T3和形态判断规则可以进行优化,从而针对不同市场调整入场精度。

此外,相比简单移动平均线等指标,T3指标的叠加平滑可以有效过滤市场噪音,识别趋势转换点。而三分钟周期适合日内交易,可以快速捕捉短期机会。

## 风险及解决方法
该策略主要的风险在于参数优化不当和持仓时间过长。如果T3参数设定过大,那么策略的指标变化会滞后;如果设定过小,则会增加噪声交易的概率。此外,三分钟周期操作如果没有及时止损,亏损风险较大。 

为控制风险,首先需要针对不同品种反复测试,确定参数的最优范围。其次,要严格执行止损策略,及时止损退出,控制单笔亏损在一定比例以内。

## 优化方向
该策略主要有以下几个优化方向:

1. 优化T3参数,找到不同交易品种的参数最优区间

2. 优化图形指标判断逻辑,提高形态识别准确率

3. 增加滞后止损,追踪止损等止损优化方法

4. 增加基于收益率或最大回撤的资金管理模块

5. 增加机器学习模型判断的辅助入场模块

通过以上几个方向的优化,可以逐步提升策略的稳定性和盈利能力。

## 总结
本策略作为一个短线日内交易策略,具有指标优化空间大、多重过滤和快速出手等优势。通过参数优化、止损优化、资金管理等一系列优化手段,可以将其调教为一个适应高频交易的有效策略。

||


## Overview
This is a 3-min short-only expert advisor strategy for E-mini S&P500 futures (ES). It generates trading signals by calculating a series of exponential moving averages and combining specific pattern conditions.  

## Principles  
The core indicator of this strategy is the T3 average line. The T3 first calculates a set of exponential moving averages xe1~xe6 based on the user-defined T3 parameter. Then it calculates the weighted average of these EMAs using specific coefficients as the final T3 average line.  

When the close price is below the T3 average line, a buy signal is generated. When the close price is above the T3 average line, a sell signal is generated. In addition, the strategy also judges specific candlestick patterns as supplementary entry conditions. Trading orders will only be sent out when both pattern conditions and T3 signals emerge at the same time.

## Strengths
The biggest strength of this strategy lies in multi-filter design and parameter optimization. On one hand, combining price action and chart pattern filters can reduce noise trades. On the other hand, key parameters like T3 and pattern judging rules can be optimized to adapt to different markets and improve entry accuracy.  

Compared to simple moving averages, the triple smoothing mechanism of the T3 indicator is effective in filtering out market noise and identifying trend reversal points. The 3-min timeframe allows fast order execution to capture short-term opportunities.  

## Risks & Solutions
The main risks of this strategy come from inappropriate parameter tuning and oversized holding period. If T3 parameter is set too large, the indicators will lag behind the market; if set too small, it increases the probability of noise trades. In addition, 3-min operations can face huge loss without timely stop loss.

To control risks, the first thing is to repeatedly backtest to determine the optimal parameter range for different products. Secondly, a strict stop loss strategy should be executed to exit positions with acceptable loss percentage per trade. 

## Improvements  
There are several directions to improve the strategy:

1. Optimize T3 parameter to find the optimal range for different trading instruments  

2. Improve pattern judging logic to increase accuracy of pattern recognition
   
3. Add more advanced stop loss mechanisms like trailing stop loss
  
4. Add money management module based on profit factor or max drawdown
  
5. Add machine learning assisted entry module

Through these improvements, the stability and profitability of the strategy can be enhanced step by step.
  
## Conclusion
As a short-term intraday trading strategy, this strategy has advantages like huge optimization space, multiple filters and fast order execution. With a series of optimization methods like parameter tuning, stop loss optimization, money management, it can be tuned into an effective strategy suitable for high frequency trading.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|150|T3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-23 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ES 3m Short Only (Triple RED)", overlay=true)
// Alert Message '{{strategy.order.alert_message}}'
//3min
T3 = input(150)//to 600

xPrice3 = close
xe1 = ta.ema(xPrice3, T3)
xe2 = ta.ema(xe1, T3)
xe3 = ta.ema(xe2, T3)
xe4 = ta.ema(xe3, T3)
xe5 = ta.ema(xe4, T3)
xe6 = ta.ema(xe5, T3)

b3 = 0.7
c1 = -b3*b3*b3
c2 = 3*b3*b3+3*b3*b3*b3
c3 = -6*b3*b3-3*b3-3*b3*b3*b3
c4 = 1+3*b3+b3*b3*b3+3*b3*b3
nT3Average = c1 * xe6 + c2 * xe5 + c3 * xe4 + c4 * xe3

// Buy Signal - Price is below T3 Average
buySignal3 = xPrice3 < nT3Average
sellSignal3 = xPrice3 > nT3Average

//NinjaTrader Settings.
acct = "Sim101"
ticker = "ES 12-23"
qty = 1
takeProfitTicks = 4
stopLossTicks = 16
tickSize = 0.25

takeProfitShort = close - takeProfitTicks * tickSize
stopLossShort = close + stopLossTicks * tickSize

OCOMarketShort = '{ "alert": "OCO Market Short", "account": "' + str.tostring(acct) + '", "ticker": "' + str.tostring(ticker) + '", "qty": "' + str.tostring(qty) + '", "take_profit_price": "' + str.tostring(takeProfitShort) + '", "stop_price": "' + str.tostring(stopLossShort) + '", "tif": "DAY" }'
CloseAll = '{ "alert": "Close All", "account": "' + str.tostring(acct) + '", "ticker": "' + str.tostring(ticker) + '" }'

IsUp = close > open
IsDown = close < open
PatternPlot = IsDown[2] and IsDown[1] and IsDown and close[1] <= high[0] and close[1] > close[0] and low[1] > low[0] and high[2] > high[1] and low[2] <= low[1]
if (PatternPlot and sellSignal3)
    strategy.entry('Short', strategy.short, alert_message=OCOMarketShort)
    strategy.exit('Close Short', 'Short', profit=takeProfitTicks, loss=stopLossTicks, alert_message=CloseAll)

//plotshape(PatternPlot, title="Custom Pattern", style=shape.circle, location=location.abovebar, color=color.red, size=size.small)

```

> Detail

https://www.fmz.com/strategy/433126

> Last Modified

2023-11-24 15:58:01
