
> Name

Go-With-The-Trend-RSI-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the pivot point reversal strategy with the Relative Strength Index (RSI) indicator to detect potential trend reversal opportunities at pivot levels by checking RSI signals.

## Strategy Logic

The strategy first calculates the key support and resistance levels by looking left and right over a number of bars to find the highest high pivot and lowest low pivot. When a pivot level is established, it further checks if RSI meets overbought or oversold conditions. Specifically, if RSI is below oversold line at resistance, it is considered oversold for long entry. If RSI is above overbought line at support, it is considered overbought for short entry. This allows using RSI to filter false breakouts and identify better entry timing at trend reversal points. 

The code details are as follows:

1. Calculate pivot support and resistance

  - Use pivothigh() and pivotlow() to compute pivot levels based on left and right N bars
  - Save pivots and define conditions to determine uptrend or downtrend

2. Compute RSI 

  - Use rsi() to calculate RSI values
  - Define overbought/oversold thresholds for RSI

3. Combine pivot and RSI signals

  - Go long if uptrend at resistance and RSI below oversold line
  - Go short if downtrend at support and RSI above overbought line

4. Set stop loss and take profit

  - Long stop loss below support by one minimum tick 
  - Short stop loss above resistance by one minimum tick

## Advantage Analysis 

The main advantages of this strategy are:

1. Trend confirmation: RSI filters false breakouts and avoids wrong entries during temporary pullbacks.

2. Risk control: Stops are placed near key supports and resistances for better risk management. 

3. Versatility: Applicable to different products and timeframes. 

4. Simplicity: Minimal indicators and parameters for easy implementation.

5. Data efficiency: Only OHLC data needed and not sensitive to data quality.

## Risk Analysis

The potential risks are:

1. Pivot failure risk: Key levels may be broken during huge market swings, causing strategy failure. This can be mitigated by adjusting lookback periods to widen pivot ranges.

2. RSI divergence risk: RSI may diverge and become ineffective for overbought/oversold in choppy markets. RSI parameters can be tuned and additional filters added to validate RSI signals.

3. Stop loss risk: Stops can be hit during strong trends leading to increased losses. Wider stop loss distances could help but require balancing profits and risks. 

4. Drawdown risk: The strategy is executed on every tick and can face drawdowns during unfavorable reversals. Drawdowns can be controlled via risk management.

## Optimization Directions

The strategy can be improved in several aspects:

1. Optimize pivot calculation by testing different left/right lookback periods and adding filters to improve accuracy.

2. Optimize RSI parameters for better overbought/oversold detection. Test different lengths and threshold levels.

3. Add additional filters to avoid whipsaws in choppy markets, such as volatility indicators.

4. Optimize stops to balance profits and risks. Consider trailing stops and other dynamic mechanisms. 

5. Employ statistical stops based on historical data analysis to determine stop loss ranges.

6. Add multi-timeframe confirmation to improve win rate using multiple periods.

## Conclusion

The Go With The Trend RSI strategy combines pivot points and RSI to identify potential trend turning points and find optimal entries. Compared to using single techniques like pivot or RSI alone, this strategy improves robustness and consistency. Further optimizations on parameters and filters can enhance win rate and risk-adjusted returns. Overall, it is a practical system to trade short-term trend reversals.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|PP - Left Bars|
|v_input_2|3|PP - Right Bars|
|v_input_3|14|RSI - Length|
|v_input_4|70|RSI - Overbought level|
|v_input_5|30|RSI - Overold level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-07 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Pivot Point Reversal + RSI Strategy", shorttitle = 'PP + RSI Strategy', overlay=true)

////////////
// Inputs //

leftBars   = input(3,  title = 'PP - Left Bars')
rightBars  = input(3,  title = 'PP - Right Bars')
rsi_length = input(14, title = "RSI - Length")
rsi_long   = input(70, title = "RSI - Overbought level")
rsi_short  = input(30, title = "RSI - Overold level")

//////////////////
// Calculations //

// Pivot Points
swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

// Pivot High 
swh_cond = not na(swh)
 
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
 
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

// Pivot Low 
swl_cond = not na(swl)
 
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
 
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

// RSI 
rsi = rsi(close, 14)

//////////////
// STRATEGY //

if (le and rsi[rightBars] < rsi_long )
    strategy.entry("PivRevLE", strategy.long,  comment = "PivRSI Long",  stop = hprice + syminfo.mintick)
 
if (se and rsi[rightBars] > rsi_short)
    strategy.entry("PivRevSE", strategy.short, comment = "PivRSI Short", stop = lprice - syminfo.mintick)
 
```

> Detail

https://www.fmz.com/strategy/428680

> Last Modified

2023-10-08 11:36:01
