
> Name

Dynamic-Trend-Tracking-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/139e068b9320f373031.png)
 ## Overview

The Dynamic Trend Tracking Reversal Strategy is a short-term quantitative trading strategy based on the JD Sequential indicator. By tracking price highs and lows in real-time, this strategy determines the current trend direction and momentum to efficiently capture market reversal points for entry and exit timing. Compared to traditional JD Sequential strategies, this strategy makes the following enhancements:  

1. Use price highs and lows instead of close prices to determine trends, which can capture price changes faster.
2. The maximum counter number is 7 instead of 9, enabling faster trade signal generation.  
3. Add options for support/resistance lines and 5-count reversals as stop loss.

This strategy is suitable for short-term time frames such as 5-min and 15-min charts, which can effectively capture short-term price fluctuations and reversal opportunities.

## Strategy Logic   

The core logic of the Dynamic Trend Tracking Reversal Strategy is based on the JD Sequential indicator. By comparing the current period's high and low prices with those of the previous two periods, this indicator determines if successive higher highs or lower lows have occurred, and generates a sequential count from 1 to 7. When the count accumulates to 7, trading signals are generated.
 
Specifically, the following variables are defined in the strategy:
 
- sp_up: true when the current high price exceeds the high price 2 periods ago 
- sp_dn: true when the current low price drops below the low price 2 periods ago
- sp_ct: the current count, increments by 1 each time sp_up or sp_dn is true, with a maximum of 7   
- sp_com: true when count equals 7
- sp_usr: the mid-price at count 7 and sp_up, serving as upside resistance
- sp_dsr: the mid-price at count 7 and sp_dn, serving as downside support
 
The logic for trade signal generation is:
 
- Long signal: sp_com is true and sp_dn is true, indicating count completion and a downtrend
- Short signal: sp_com is true and sp_up is true, indicating count completion and an uptrend
 
The stop loss logic is:  

- Long SL: count reversal to 5 (sp_up true) or price crossing above sp_usr
- Short SL: count reversal to 5 (sp_dn true) or price crossing below sp_dsr
 
By comparing highs/lows in real-time to determine trend direction and strength, alongside count-based timing for entry, this strategy can effectively capture short-term reversal opportunities. Stop loss lines are also configured to control risks.  

## Advantage Analysis   

Compared to traditional JD Sequential strategies, the Dynamic Trend Tracking Reversal Strategy has the following advantages:
 
1. Faster signal generation. Using high/low comparison is faster than close prices in capturing trends, and a 7 count generates signals faster than 9 counts. 
2. Enhanced stop loss mechanism. The additions of 5-count reversals and support/resistance stop loss allows better risk control.
3. Flexible configurations. Options to include stop loss and display partial counts add flexibility.  
4. Suitable for short-term trading. The high-frequency signals combined with proper stop loss fit short-term time frames well.
 
The key advantage of this strategy is its swift response, which can effectively capture large fluctuations caused by short-term events. Also, algorithmic signal generation and stop loss mechanization can reduce emotional interference from traders, improving consistency.  

## Risk Analysis

The Dynamic Trend Tracking Reversal Strategy also carries some risks:
 
1. Increased trading costs from high frequency trading. More trades lead to higher commission fees and slippage costs.
2. Prone to false signals. Comparing highs and lows in ranging markets may frequently trigger unwarranted trades and losses. 
3. Potentially aggressive stops. Hard stops are vulnerable to spikes and must be adjusted in a timely manner.
 
To mitigate the above risks, the strategy can be optimized in the following aspects:
 
1. Reduce position sizing to lower capital usage per trade.  
2. Halt trading during choppy/ranging markets to avoid ineffective trades.  
3. Employ trailing stops or breakout stops to reduce chances of being trapped.

## Optimization Directions  

There is ample room for the Dynamic Trend Tracking Reversal Strategy to be further optimized, mainly in the following directions:
  
1. Multi-timeframe combinations. Determine the major trend direction on higher timeframes to avoid trading against it.  

2. Combinations with other indicators. Incorporate volatility metrics, volume data etc. to improve signal quality.
 
3. Machine learning for additional validation. Utilize AI/ML algorithms as auxiliary judgment on trade signals to reduce erroneous trades.  

4. Parameter tuning. Optimize parameters like count periods, trading sessions, position sizing etc. to fit different market conditions.
   
5. Expand risk control mechanisms. Introduce more sophisticated risk management techniques like adaptive stops, position sizing etc. to further restrict risks.

6. Strategy evaluation through backtesting. Expand sample sizes and timeframes for backtests to gauge parameter robustness.  

## Conclusion

The Dynamic Trend Tracking Reversal Strategy captures short-term reversal opportunities through real-time comparison of price highs and lows to determine trend direction and strength, alongside the 7-count rules within the JD Sequential indicator for trade timing. Compared to traditional JD strategies, this strategy makes enhancements like using highs/lows instead of close prices, shortened count periods, additional stop loss mechanisms etc., enabling faster signal generation.
 
The key strength of this strategy lies in its swift response suitable for short-term reversal trading. At the same time, risks like high trading frequencies and aggressive stops do exist. Future optimization directions include parameter tuning, enhancement of risk controls, multi-timeframe combinations etc. Through continual optimizations and iterations, this strategy has the potential to become a powerful tool for efficiently capturing short-term reversal signals.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Include S/R Crosses Into Stop Loss|
|v_input_2|true|Show Count 1-4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-16 00:00:00
end: 2024-01-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @NeoButane 7 Dec. 2018
// JD Aggressive Sequential Setup
// Not based off official Tom DeMarke documentation. As such, I have named the indicator JD instead oF TD to reflect this, and as a joke.
//
// Difference vs. TD Sequential: faster trade exits and a unique entry. Made for low timeframes.
// - Highs or lows are compared instead of close.
// - Mirrors only the Setup aspect of TD Sequential (1-9, not to 13)
// - Count maxes out at 7 instead of 9. Also part of the joke if I'm going to be honest here

// v1 - Release - Made as a strategy, 7 count
//    . S/R on 7 count
//   .. Entry on 7 count
//  ... Exit on 5 count or S/R cross

//@version=3
title = "JD Aggressive Sequential Setup"
vers  = " 1.0 [NeoButane]"
total = title + vers
strategy(total, total, 1, 0)

xx        = input(true, "Include S/R Crosses Into Stop Loss")
show_sp   = input(true, "Show Count 1-4")
sp_ct     = 0
inc_sp(x) => nz(x) == 7 ? 1 : nz(x) + 1
sp_up     = high > high[2]
sp_dn     = low < low[2]
sp_col    = sp_up ? green : red
sp_comCol = sp_up ? red : green
sp_ct    := sp_up ? (nz(sp_up[1]) and sp_col == sp_col[1] ? inc_sp(sp_ct[1]) : 1) : sp_dn ? (nz(sp_dn[1]) and sp_col == sp_col[1] ? inc_sp(sp_ct[1]) : 1) : na
sp_com    = sp_ct == 7
sp_sr     = valuewhen(sp_ct == 5, close, 0)
sp_usr    = valuewhen(sp_ct == 7 and sp_up, sma(hlc3, 2), 0)
sp_usr   := sp_usr <= sp_usr[1] * 1.0042 and sp_usr >= sp_usr[1] * 0.9958 ? sp_usr[1] : sp_usr
sp_dsr    = valuewhen(sp_ct == 7 and sp_dn, sma(hlc3, 2), 0)
sp_dsr   := sp_dsr <= sp_dsr[1] * 1.0042 and sp_dsr >= sp_dsr[1] * 0.9958 ? sp_dsr[1] : sp_dsr
locc = location.abovebar
plotchar(show_sp and sp_ct == 1, 'Setup: 1', '1', locc, sp_col, editable=false)
plotchar(show_sp and sp_ct == 2, 'Setup: 2', '2', locc, sp_col, editable=false)
plotchar(show_sp and sp_ct == 3, 'Setup: 3', '3', locc, sp_col, editable=false)
plotchar(show_sp and sp_ct == 4, 'Setup: 4', '4', locc, sp_col, editable=false)
plotshape(sp_ct == 5, 'Setup: 5', shape.xcross, locc, sp_comCol, 0, 0, '5', sp_col)
plotshape(sp_ct == 6, 'Setup: 6', shape.circle, locc, sp_comCol, 0, 0, '6', sp_col)
plotshape(sp_ct == 7, 'Setup: 7', shape.circle, locc, sp_comCol, 0, 0, '7', sp_col)
// plot(sp_sr, "5 Count Support/Resistance", gray, 2, 6)
plot(sp_usr, "7 Count Resistance", maroon, 2, 6)
plot(sp_dsr, "7 Count Support", green, 2, 6)

long  = (sp_com and sp_dn)
short = (sp_com and sp_up)
sl_l  = xx ? crossunder(close, sp_dsr) or (sp_ct == 5 and sp_up) or short : (sp_ct == 5 and sp_up) or short
sl_s  = xx ? crossover(close, sp_usr) or (sp_ct == 5 and sp_dn) or long : (sp_ct == 5 and sp_dn) or long

strategy.entry('L', 1, when = long)
strategy.close('L', when = sl_l)
strategy.entry('S', 0, when = short)
strategy.close('S', when = sl_s)
```

> Detail

https://www.fmz.com/strategy/438948

> Last Modified

2024-01-16 15:35:18
