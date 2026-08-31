
> Name

基于趋势跟随策略Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1468aa7244f7540d194.png)
## Overview

This strategy is based on the principle of trend following. It uses the Parabolic SAR indicator to determine the market trend direction and combines the barcolor indicator to visualize the bull/bear state of prices. It goes long when the trend goes up and goes short when the trend goes down, aiming to capture profits from market trends.

## Strategy Logic

The strategy mainly uses the Parabolic SAR indicator to judge the market trend direction. Parabolic SAR, also known as the parabolic stop and reverse indicator, consists of two parameters: Step, which represents the step of SAR point movement, and Max, which represents the max step allowed for SAR points. When the market is in a trend, SAR points will stick close to prices and move up or down continuously along with the trend. When the trend reverses, SAR points will cross prices and appear on the other side. Therefore, by comparing SAR points with high/low prices, the current trend direction can be determined. 

Specifically, when SAR points are below the lowest price, it indicates an uptrend, and the strategy will go long. When SAR points cross above the highest price, it signifies a trend reversal, and the strategy will close long positions. Conversely, when SAR points are above the highest price, it signals a downtrend, and the strategy will go short. When SAR points cross below the lowest price, it represents a reversal, and the strategy will close short positions.

To visually determine the current trend condition more intuitively, the strategy also uses the barcolor indicator to color the bars. Green bars represent an uptrend when the close is higher than SAR points, while red bars signify a downtrend when the close is lower.

## Advantage Analysis

The biggest advantage of this strategy is that it can accurately capture market trends and follow the trends to trade, avoiding interference from frequent market noises. The specific advantages are:

1. Using Parabolic SAR to determine trends, the design of SAR points is ingenious and can quickly and precisely capture trend reversals.

2. Adopting the barcolor indicator to visually display the current bull/bear state in an intuitive manner.

3. Trade signals come from the trend itself instead of other factors, avoiding being misguided by short-term price fluctuations.

4. Employing trend tracking stops loss, timely stopping out without being too sensitive, preventing being caught in traps.

5. Maintaining consistent trade direction, avoiding unnecessary reverse trades, being beneficial for simplicity. 

6. The trading rules are simple and clear, easy to understand and implement, suitable for beginners to learn.

## Risk Analysis

The biggest risks of this strategy are:

1. Unable to determine specific entry and exit points, likely to miss early and late trend opportunities.

2. Stop trading and hold positions during consolidation, unable to profit or stop loss, with the risk of being caught.

3. Unable to limit the risk/reward ratio of each trade, single trade loss could be too big. 

4. Only doing unilateral trades, only able to capture either uptrends or downtrends. 

5. Not considering the analysis of greater trend, carries the risk of trading against the major trend.

To address these risks, optimizations can be made in the following aspects:

1. Combine other indicators to determine specific entry and exit points.

2. Add trend discovering indicators to avoid opening positions during consolidation.

3. Set risk management rules to limit per trade loss. 

4. Optimize the long/short switching logic to capture more trading opportunities.

5. Add multi-timeframe analysis to determine the major trend direction.

## Optimization Directions

This strategy can be further optimized in the following aspects:

1. Optimize the Parabolic SAR parameters to better suit different products and timeframes.

2. Add filters like moving averages to filter entry points. 

3. Incorporate breakout strategies to get in a trend early after trend starts.

4. Optimize stop loss strategies to avoid being too sensitive or too insensitive.

5. Add profit taking strategies to actively take profit when reaching a certain level.

6. Enhance money management strategies to improve risk-adjusted returns.

7. Multi-timeframe optimizations to ensure major trend alignment with trade direction.

8. Introduce machine learning etc. to dynamically optimize parameters.

## Summary

This strategy determines the trend direction with the Parabolic SAR indicator and follows the trend immediately after it starts. The advantage is trade signals come from the trend itself, less susceptible to market noises. But it also has weaknesses like unable to limit per trade risks and missing entry points. Future optimizations include setting stop loss/take profit, parameter tuning, adding filters etc. to improve strategy performance in backtests and live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Trend Code|
|v_input_2|true|From Day|
|v_input_3|true|From Month|
|v_input_4|2019|From Year|
|v_input_5|true|To Day|
|v_input_6|true|To Month|
|v_input_7|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Trader Strategy (Trend Code)", shorttitle="Trend Trader Strategy (Trend Code)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

//Inputs
TrendCode = input(5, title = "Trend Code")

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

//Parabolic SAR
psar = sar(0.02, 0.02, TrendCode * 0.005)


//Plot PSAR
plot(psar, title="PSAR", color = color.teal , trackprice=true)

//Barcolor
barcolor(close > psar ? color.green : color.red, title = "Bar Color")

if (psar >= high and time_cond)
    strategy.entry("long", strategy.long, stop=psar, comment="long")
else
    strategy.cancel("long")

if (psar <= low and time_cond)
    strategy.entry("short", strategy.short, stop=psar, comment="short")
else
    strategy.cancel("short")
        
if (not time_cond)
    strategy.close_all()





 

```

> Detail

https://www.fmz.com/strategy/431219

> Last Modified

2023-11-06 10:09:02
