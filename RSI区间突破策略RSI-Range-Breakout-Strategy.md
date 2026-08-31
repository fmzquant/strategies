
> Name

RSI区间突破策略RSI-Range-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The RSI range breakout strategy is a typical trend following strategy. It uses the Relative Strength Index (RSI) as the main technical indicator to look for breakout opportunities when RSI is in overbought or oversold levels, with the goal of following the trend.

## Strategy Logic

The strategy mainly relies on the RSI indicator to determine overbought and oversold levels in the market. The RSI calculation formula is: RSI = (Average Up Value / (Average Up Value + Average Down Value)) x 100. The Average Up Value is the simple moving average of close-up amplitudes over the past N days. The Average Down Value is the simple moving average of close-down amplitudes over the past N days.

When RSI is higher than the overbought line (default 80), it indicates the market is in an overbought state. When RSI is lower than the oversold zone (default 35), it indicates the market is in an oversold state. The strategy looks for short opportunities when RSI breaks down the overbought line, and long opportunities when RSI breaks up the oversold zone. 

Specifically, the strategy uses two SMA lines to determine the trend of the RSI indicator. When the faster SMA line breaks up the slower SMA line, while the RSI breaks through the oversold zone, go long. When the faster SMA line breaks down the slower SMA line, while the RSI breaks the overbought line, go short. The strategy also sets stop loss and take profit lines to control risks.

## Advantages

- Utilize RSI indicator to determine overbought and oversold levels, with certain trend judgment capability
- Combined with double SMA lines to avoid false breakouts caused by RSI oscillation  
- Set stop loss and take profit to control single loss
- Break-in entry, no frequent opening and closing

## Risks and Solutions

- RSI indicator has lagging effect, may miss trend reversal points
  - Adjust RSI parameters appropriately to optimize indicator sensitivity
- Overbought and oversold zone settings improper, increased difficulty of profit range
  - Adjust parameters according to different markets to ensure reasonable settings
- Stop loss point too close, easy to be stopped out by overnight fluctuation
  - Widen stop loss distance appropriately to avoid being trapped
- Take profit setting too small, unable to fully capture trend runs
  - Adjust take profit line flexibly based on market volatility

## Optimization Directions 

- Combine with other indicators to determine entry timing, such as KDJ, MACD, etc., to avoid RSI lagging issues
- Add judgment of major trend to avoid trading against the trend 
- Optimize stop loss and take profit strategies, such as trailing stop, moving take profit, etc.
- Distinguish parameter settings for different products, determine reasonable parameters based on market characteristics
- Add position management strategies, adjust positions through adding orders

## Summary

The RSI range breakout strategy is a typical trend following strategy overall. It determines trading signals through RSI indicator, filters signals with double SMA lines, and sets stop loss and take profit to control risks. But RSI indicator has lagging issues, and improper parameter settings also affect strategy performance. The trend following capability can be fully realized through further optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|RSI Length|
|v_input_2|35|Treshold Low|
|v_input_3|80|Treshold High|
|v_input_4|3|RSI Smoothing 1|
|v_input_5|5|RSI Smoothing 2|
|v_input_6|0.026|Stop loss %|
|v_input_7|300|TP|
|v_input_8|true|Long only ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//strategy("Strategy RSI | Fadior", shorttitle="Strategy RSI", pyramiding=10, calc_on_order_fills=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, currency="USD", default_qty_value=100, overlay=false)
 
len = input(3, minval=1, title="RSI Length") 
threshLow = input(title="Treshold Low", defval=35)
threshHigh = input(title="Treshold High", defval=80)
rsiLength1 = input(title="RSI Smoothing 1", defval=3)
rsiLength2 = input(title="RSI Smoothing 2", defval=5)
SL = input(title="Stop loss %", type=float, defval=.026, step=.001)
TP = input( defval=300)

// 3 40 70 2
// 14 40 70 2 16 0.05 50

src = close
  
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

plot(sma(rsi,rsiLength2), color=orange)
plot(sma(rsi,rsiLength1), color=green)

band1 = hline(threshHigh)
band0 = hline(threshLow)
fill(band1, band0, color=purple, transp=90)

strategy = input(type=bool, title="Long only ?", defval=true)
strategy.risk.allow_entry_in(strategy ? strategy.direction.long : strategy.direction.all)

longCondition = sma(rsi,rsiLength1) < threshLow and sma(rsi,rsiLength2) > sma(rsi,rsiLength2)[1] 

if (longCondition)
    strategy.entry("Long", strategy.long) //, qty=10)
    strategy.exit("Close Long", "Long", stop=src-close*SL, profit=TP)
    
shortCondition = sma(rsi,rsiLength1) > threshHigh and sma(rsi,rsiLength2) < sma(rsi,rsiLength2)[1]
if (shortCondition)
    strategy.entry("Short", strategy.short) //, qty=10)
    strategy.exit("Close Short", "Short") //, stop=src-close*SL, profit=TP)

```

> Detail

https://www.fmz.com/strategy/428981

> Last Modified

2023-10-11 15:54:11
