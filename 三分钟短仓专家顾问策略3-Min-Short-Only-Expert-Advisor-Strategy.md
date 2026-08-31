
> Name

三分钟短仓专家顾问策略3-Min-Short-Only-Expert-Advisor-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a5a2bf8ba4db0402db.png)



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
