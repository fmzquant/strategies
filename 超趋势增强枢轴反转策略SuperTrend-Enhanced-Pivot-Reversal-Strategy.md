
> Name

超趋势增强枢轴反转策略SuperTrend-Enhanced-Pivot-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb65f38c4c3a979f6e.png)



## Overview

The SuperTrend Enhanced Pivot Reversal is a unique trading approach that combines the precision of pivot reversal points and the trend-following power of the SuperTrend indicator. This strategy aims to provide clear entry and exit signals for traders while using the SuperTrend indicator to filter out potentially false signals.

Unlike traditional pivot reversal strategies, this approach utilizes the SuperTrend indicator as a filter. This means it only takes trades that align with the overall trend, as determined by the SuperTrend indicator. This can help reduce false signals and improve the overall profitability of the strategy.

The Enhanced Pivot Reversal Strategy is particularly well-suited for the cryptocurrency market due to the high volatility. This allows for rapid price changes in short periods, making it possible to profit quickly. The strategy's use of pivot points enables capturing these swift price movements by identifying potential reversal points.

## Strategy Logic

The strategy works by identifying pivot reversal points, which are points on the price chart where the price is likely to reverse. These points are identified using a combination of the ta.pivothigh and ta.pivotlow functions to locate the highest and lowest price points over a given period.

Once a pivot reversal point is identified, the strategy checks the direction of the SuperTrend indicator. If the SuperTrend is positive (indicating an uptrend), the strategy will only take long trades. If the SuperTrend is negative (indicating a downtrend), it will only take short trades. 

The strategy also incorporates a stop loss level, set as a percentage of the entry price, to limit potential losses if the price moves against the trade.

The trade direction can be set to "Long", "Short" or "Both", allowing the trader to take only long, short or both long and short trades depending on their market view and risk appetite.

## Advantages 

The main advantage of this strategy is combining the precision of pivot reversal strategies with the trend filtering capacity of the SuperTrend indicator.

The pivot reversal approach identifies key support and resistance levels and captures quick breakouts. The SuperTrend filters out many false breakouts and only enters on genuine trend reversals. This combination eliminates noise and can significantly improve win rate and profitability.

Another advantage is the adaptability of the strategy. The parameters can be adjusted to suit different market conditions. For example, the ATR period can be tuned for varying volatility, stop loss tweaked to control risk, and trade direction limited to long or short only.

Adding the SuperTrend filter also improves performance in trending markets. It accurately determines trend direction, avoiding whipsaws in ranging markets.

## Risks

The main risk is that pivot reversal points may have false breakouts, where the price quickly reverts after breaking key levels. Entering trades immediately may lead to being stopped out. Appropriate stop loss levels are crucial.

Another risk is trend reversal failure. Sometimes prices continue the trend after breaking pivot points, rather than reversing. The SuperTrend filter mitigates this but the risk remains in strong trending markets.

Using SuperTrend as a filter has pros and cons. Incorrect SuperTrend signals could lead to missing valid reversals. Parameters may need adjustment for different market conditions.  

Overall, appropriate stop loss levels, position sizing, and dynamic parameter tuning can effectively control risks.

## Enhancement Opportunities 

The strategy can be improved by:

1. Adding multi-timeframe analysis to avoid whipsaws.

2. Incorporating volume indicators to confirm breakouts.

3. Optimizing stop loss mechanisms like trailing stops and increased post-profit stops.

4. Adding machine learning for adaptive capability, like auto-parameter tuning and dynamic stops.

5. Implementing inter-timeframe trading with separate entry and stop/target timeframes.

6. Testing alternate filter indicators to potentially improve performance over SuperTrend.

7. Portfolio optimization via combining with low-correlation strategies to improve stability.

These enhancements can significantly improve performance, making the strategy more robust across diverse market environments and producing superior returns.

## Conclusion

The SuperTrend Enhanced Pivot Reversal Strategy is a highly effective approach. It combines the precision of pivot points and the strong trend-following of SuperTrend to filter noise and boost probability of success. The adaptable parameters suit various market conditions. Risks exist but can be controlled via appropriate position sizing and stops. Further optimizations can enhance stability and returns. Overall, it provides traders with a powerful technical analysis tool for added trading edge.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|leftBars|
|v_input_2|3|rightBars|
|v_input_3|5|ATR Length|
|v_input_float_1|2.618|Factor|
|v_input_string_1|0|Trade Direction: Both|Short|Long|
|v_input_4|20|Stop Loss Level (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

//@version=5
strategy("SuperTrend Enhanced Pivot Reversal - Strategy [PresentTrading]", overlay=true, precision=3, default_qty_type=strategy.cash, 
 commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, 
  currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital= 10000)

// Pivot Reversal parameters
leftBars = input(6)
rightBars = input(3)
swh = ta.pivothigh(leftBars, rightBars)
swl = ta.pivotlow(leftBars, rightBars)

// SuperTrend parameters
atrPeriod = input(5, "ATR Length")
factor = input.float(2.618, "Factor", step = 0.01)

[superTrend, direction] = ta.supertrend(factor, atrPeriod)

// Plot the SuperTrend
plot(superTrend, title="SuperTrend", color=color.blue)


// Trade Direction parameter
tradeDirection = input.string(title="Trade Direction", defval="Both", options=["Long", "Short", "Both"])

// Stop Loss Level (in %)
stopLossLevel = input(20, title="Stop Loss Level (%)")

// Convert the stop loss level to a price difference
stopLossPrice = stopLossLevel / 100


// Long entry
swh_cond = not na(swh)
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])
if (le and direction > 0 and (tradeDirection == "Long" or tradeDirection == "Both"))
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)
    strategy.exit("Exit Long", "PivRevLE", stop = hprice * (1 - stopLossPrice))

// Short entry
swl_cond = not na(swl)
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])
if (se and direction < 0 and (tradeDirection == "Short" or tradeDirection == "Both"))
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)
    strategy.exit("Exit Short", "PivRevSE", stop = lprice * (1 + stopLossPrice))


// Closing positions when the tradeDirection is one-sided or when SuperTrend direction changes
if ((tradeDirection == "Long" and se and direction < 0) or (tradeDirection == "Long" and direction < 0))
    strategy.close("PivRevLE")
if ((tradeDirection == "Short" and le and direction > 0) or (tradeDirection == "Short" and direction > 0))
    strategy.close("PivRevSE")

// Plot pivot highs and lows
plotshape(swh_cond, title="Pivot Highs", location=location.belowbar, color=color.green, style=shape.triangleup)
plotshape(swl_cond, title="Pivot Lows", location=location.abovebar, color=color.red, style=shape.triangledown)

// Closing positions when the tradeDirection is one-sided
if (tradeDirection == "Long" and se and direction < 0)
    strategy.close("PivRevLE")
if (tradeDirection == "Short" and le and direction > 0)
    strategy.close("PivRevSE")


```

> Detail

https://www.fmz.com/strategy/430119

> Last Modified

2023-10-25 11:15:40
