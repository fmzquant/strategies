
> Name

ATR-Trailing-Stops-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy sets a dynamic stop loss line based on the Average True Range (ATR) indicator to trail stock price changes, in order to protect stop loss while maximizing profit taking.

### Strategy Logic

The strategy is mainly implemented through the following steps:

1. Calculate the ATR indicator, the ATR period is set by the nATRPeriod parameter, default to 5;

2. Calculate the stop loss line based on the ATR value, the stop loss magnitude is set by the nATRMultip parameter, default to 3.5 times the ATR;

3. When the price rises, if higher than the previous stop loss line, adjust the stop loss line up to the price minus the stop loss magnitude; when the price falls, if lower than the previous stop loss line, adjust the stop loss line down to the price plus the stop loss magnitude; 

4. Judge if the price breaks through the stop loss line, if breaks through, send buy or sell signals;

5. Enter long or short positions based on the stop loss line breakout signals, and close positions when price touches the stop loss line again.

When the price rises, the stop loss line will move up continuously to lock in profits. When the price falls, the stop loss line will move down continuously to stop losses. The ATR indicator can reflect price fluctuation more accurately. Dynamically adjusting the stop loss line based on ATR can avoid over-aggressive or over-conservative stop loss.

### Advantage Analysis

- Dynamically adjust stop loss line for timely stop loss to avoid loss expansion
- The stop loss line adjustment is relatively smooth to avoid premature stop loss
- Use ATR indicator to calculate more reasonable stop loss magnitude based on latest volatility  
- Trail stop loss line to lock in profits effectively

### Risk Analysis

- ATR parameter setting needs to be cautious, too short ATR period may cause excessive fluctuation of stop loss line, too long may fail to reflect price change in time
- Stop loss magnitude needs to be set according to specific stock volatility, excessively large or small values will affect strategy performance
- Trailing stop loss may reduce profit margin by stopping profit before another price rise
- Frequent position adjustment may lead to higher trading costs

Parameters can be optimized by adjusting ATR period and stop loss magnitude to find the optimal balance between stopping loss and trailing. Other technical indicators can also be used to filter entry timing to reduce unnecessary stop loss. 

### Optimization Directions

- Optimize ATR period parameter to make stop loss line changes follow price fluctuation more closely 
- Optimize stop loss magnitude parameter for more reasonable stop loss
- Add other indicators to filter entry timing
- Only go long when obvious uptrend emerges 
- Consider adding re-entry mechanism to participate in stocks with stop loss but continued expectation of rise

### Summary

The strategy realizes stop loss and profit taking during holding through dynamic ATR trailing stop loss line. Compared with fixed stop loss points, it adapts better to price fluctuation, avoiding over-aggressive or over-conservative stop loss. The ATR indicator makes the stop loss line adjustment more targeted. But parameters and re-entry strategies need further optimization to reduce unnecessary stops and expand profit margin. Overall this is a good dynamic trailing stop loss idea worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|ATR Period|
|v_input_2|3.5|ATR Multiplier|
|v_input_3|false|Test w/Shorts?|
|v_input_4|360|Max Days Back to Test|
|v_input_5|false|Min Days Back to Test|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//@okadoke
////////////////////////////////////////////////////////////
// Based on Average True Range Trailing Stops Strategy by HPotter
// Average True Range Trailing Stops Strategy, by Sylvain Vervoort 
// The related article is copyrighted material from Stocks & Commodities Jun 2009 
////////////////////////////////////////////////////////////
strategy(title="ATR Trailing Stops Strategy", shorttitle="ATRTSS", overlay = true, 
  initial_capital=100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type="percent", commission_value=0.0)
  
nATRPeriod      = input(5, "ATR Period")
nATRMultip      = input(3.5, "ATR Multiplier")
useShorts       = input(false, "Test w/Shorts?")
daysBackMax     = input(defval = 360, title = "Max Days Back to Test", minval = 0)
daysBackMin     = input(defval = 0, title = "Min Days Back to Test", minval = 0)
msBackMax       = 1000 * 60 * 60 * 24 * daysBackMax
msBackMin       = 1000 * 60 * 60 * 24 * daysBackMin

xATR = atr(nATRPeriod)
nLoss = nATRMultip * xATR
xATRTrailingStop = na
xATRTrailingStop := 
 iff(close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), close - nLoss),
  iff(close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), close + nLoss), 
   iff(close > nz(xATRTrailingStop[1], 0), close - nLoss, close + nLoss))) 
                       
pos = na 
pos := 
 iff(close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0), 1, 
  iff(close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0)))
        
color = pos == -1 ? red: pos == 1 ? green : blue 
plot(xATRTrailingStop, color=color, title="ATR Trailing Stop")

isWithinTimeBounds = (msBackMax == 0 or (time > (timenow - msBackMax))) and (msBackMin == 0 or (time < (timenow - msBackMin)))

buy     = crossover(close, xATRTrailingStop)
sell    = crossunder(close, xATRTrailingStop)

strategy.entry("LONG", long=true, when=buy and isWithinTimeBounds)
strategy.close("LONG", when=sell and isWithinTimeBounds)
strategy.entry("SHORT", long=false, when=useShorts and sell and isWithinTimeBounds)
strategy.close("SHORT", when=useShorts and buy and isWithinTimeBounds)


```

> Detail

https://www.fmz.com/strategy/428813

> Last Modified

2023-10-09 16:59:57
