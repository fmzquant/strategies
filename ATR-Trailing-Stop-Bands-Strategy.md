
> Name

ATR-Trailing-Stop-Bands-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13597c3de6e3f62e876.png)



## Overview

The core idea of this strategy is to use the Average True Range (ATR) indicator to set an adaptive trailing stop loss line to maximize the protection of profitable positions while avoiding premature stop loss. The ATR indicator can dynamically capture the volatility of the market and adjust the stop loss distance based on market volatility, ensuring effective stop loss while minimizing the probability of stop loss being triggered. This strategy also incorporates Bollinger Bands for visualizing the upper and lower limits of the stop loss line, with the option of adding wick protection to counter the whipsaw effect in ranging markets.

## Strategy Logic

This strategy uses the N period average of ATR indicator multiplied by a factor as the base stop loss distance. The larger the ATR value, the larger the market volatility, so the wider the stop loss distance is set. The smaller the ATR value, the narrower the stop loss distance is set. This allows dynamic adjustment of stop loss distance based on market volatility.

Specifically, the strategy uses the following core logic:

1. Calculate the ATR value of the ATR period (nATRPeriod). 

2. Obtain the base stop loss distance nLoss by multiplying the ATR value by a factor (nATRMultip).

3. Update the stop loss line xATRTrailingStop based on current high, low and stop loss line of previous period.

4. If current low triggers previous period's stop loss line, the stop loss line moves up to below the low by nLoss distance.

5. If current high triggers previous period's stop loss line, the stop loss line moves down to above the high by nLoss distance.

6. If stop loss is not triggered, adjust the stop loss line based on the distance of close price to it. 

7. Add optional wick protection distance for further optimization of stop loss line.

8. Plot Bollinger Bands to visualize upper and lower limit of stop loss line.

9. Determine position direction based on color of stop loss line.

The strategy flexibly uses ATR indicator to enable the stop loss line to adjust adaptively based on market volatility, ensuring reasonable stop loss distance while avoiding excessive stop loss that causes unnecessary loss of positions.

## Advantages

The advantages of this strategy:

1. Use ATR indicator to adjust stop loss distance dynamically adapting to different market conditions.

2. Customizable multiplier allows flexible adjustment of stop loss distance. 

3. Addition of Bollinger Bands provides visualization of upper and lower limits of stop loss line.

4. Optional wick protection avoids whipsaw in ranging markets.

5. Can be used as trailing stop loss to maximize drawdown of profitable positions.

6. Strategy logic is clear and easy to understand with few optimizable parameters. 

7. Applicable to multiple products and timeframes.

## Risks 

Some risks of this strategy to note:

1. ATR indicator reacts slowly to market shocks, leading to large stop loss distance.

2. Excessive multiplier setting also enlarges stop loss distance, increasing loss risk.

3. Wick protection can make stop loss line too loose when whipsaw increases.

4. Entry rules not considered, cannot be used as Entries/Exits strategy.

5. Extensive testing and optimization of parameters needed for different products and timeframes.

6. Stop loss breakout may enlarge losses, requiring effective capital management.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different ATR periods to optimize stop loss distance.

2. Adjust multiplier to balance between stop loss distance and probability.

3. Optimize wick protection period to prevent whipsaw. 

4. Try adding entry conditions on top of stop loss to make it Entries/Exits strategy.

5. Add trend indicator to adjust stop loss distance based on trend.

6. Adjust stop loss based on Elliott Waves theory.

7. Add position sizing to limit single loss amount.

## Summary

This strategy utilizes the adaptive characteristic of ATR indicator to design a dynamic stop loss mechanism. While ensuring stop loss, it also minimizes unnecessary stop loss triggers. The strategy logic is simple and clear, allowing flexible optimization based on needs. It works best as trailing stop loss to maximize protection of profits. With proper parameter optimization and risk control, this strategy can be an effective stop loss tool in quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|nATRPeriod|
|v_input_2|4|nATRMultip|
|v_input_3|30|#Periods of Wick Protection|
|v_input_4|false|Max [1] or Avg Wick Protection [0]|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-12 00:00:00
end: 2023-10-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v2.0 13/10/2014
// Average True Range Trailing Stops Strategy, by Sylvain Vervoort 
// The related article is copyrighted material from Stocks & Commodities Jun 2009 
// Modified by River to add Bands, and change color of Trailing Stop and add Wick Protection. Now turned into a Strategy for Backtesting Purposes.
// After backtesting, it seems clear that it functions well as a Trailing Stop, but not as an Entry/Exit strategy.
////////////////////////////////////////////////////////////
strategy(title="ATR Trailing Stop Bands Strategy[R] ", overlay = true)
nATRPeriod = input(5)
nATRMultip = input(4)
length = input(30, "#Periods of Wick Protection", minval=2)
bType = input(0, "Max [1] or Avg Wick Protection [0]", minval=0, maxval=1)
avgupperwick = sma(close[1] <= open[1] ? high[1] - open[1] : high[1] - close[1], length)
maxupperwick = highest(close[1] <= open[1] ? high[1] - open[1] : high[1] - close[1], length)
avglowerwick = sma(close[1] > open[1] ? open[1] - low[1] : close[1] - low[1], length)
maxlowerwick = highest(close[1] > open[1] ? open[1] - low[1] : close[1] - low[1], length)
upperwick = bType == 0 ? avgupperwick : maxupperwick
lowerwick = bType == 0 ? avglowerwick : maxlowerwick
xATR = atr(nATRPeriod)
nLoss = nATRMultip * xATR 
upperband = iff(high < nz(upperband[1], 0) and high[1] < nz(upperband[1], 0), min(nz(upperband[1]), high + nLoss + upperwick), high + nLoss + upperwick)
lowerband = iff(low > nz(lowerband[1], 0) and low[1] > nz(lowerband[1], 0), max(nz(lowerband[1]), low - nLoss - lowerwick), low - nLoss - lowerwick) 
xATRTrailingStop = iff(low > nz(xATRTrailingStop[1], 0) and low[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), low - nLoss - lowerwick),
 iff(high < nz(xATRTrailingStop[1], 0) and high[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), high + nLoss + upperwick), 
//                        iff(low <= nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), high + nLoss + upperwick, iff(high >= nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), low - nLoss - lowerwick,0))))
 iff(low <= nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), upperband[1], iff(high >= nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), lowerband[1],0))))

pos =	iff(close[1] > nz(xATRTrailingStop[1], 0) and low <= nz(xATRTrailingStop[1], 0), 1,
 iff(close[1] < nz(xATRTrailingStop[1], 0) and high >= nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
color = pos == 1 ? red: pos == -1 ? green : blue 
plot(upperband, color=red, title="ATR Upper")
plot(xATRTrailingStop, color=color, title="ATR Trailing Stop", linewidth=2)
plot(lowerband, color=green, title="ATR Lower")

longCondition = (color == green and color[1] == red)
if (longCondition)
    strategy.entry("Long", strategy.long)
longExitCondition = (color == red and color[1] == green)
if (longExitCondition)
    strategy.close("Long")

shortCondition = (color == red and color[1] == green)
if (shortCondition)
    strategy.entry("Short", strategy.short)
shortexitCondition = (color == green and color[1] == red)
if (shortexitCondition)
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/429651

> Last Modified

2023-10-19 12:42:26
