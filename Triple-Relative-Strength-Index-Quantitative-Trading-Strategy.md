
> Name

Triple-Relative-Strength-Index-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1298c4ef5259bb88875.png)

#### Overview
This strategy mainly uses the Relative Strength Index (RSI) to determine overbought and oversold conditions in the market, combined with the price above the 200-day Simple Moving Average (SMA) as a trend filter, to decide whether to enter a trade. The strategy constructs entry conditions through three RSI indicators. Only when the short-term RSI is below 35 and shows a downward trend for three consecutive periods, while the third-period RSI is below 60, and the current closing price is above the 200-day SMA, will it go long. The exit condition is when the RSI crosses above 50.

#### Strategy Principle
1. Calculate the RSI indicator for the specified period
2. Determine if the following entry conditions are met:
   - Current RSI is below 35
   - Current RSI is lower than the previous period RSI, previous period RSI is lower than the second previous period RSI, second previous period RSI is lower than the third previous period RSI
   - The third previous period RSI is below 60
   - Current closing price is above the 200-day SMA
3. If all four conditions above are met simultaneously, open a long position
4. During the holding period, if the RSI crosses above 50, close the position
5. Repeat steps 2-4 for the next trade

#### Strategy Advantages
1. By using RSI to determine overbought and oversold conditions and entering positions in the oversold area, it can capture market reversal opportunities
2. By constructing entry signals with three RSIs together, it reduces the probability of false signals and improves signal reliability
3. Adding the price above the 200-day moving average as a trend condition avoids trading in a downtrend
4. The exit condition is simple and clear, allowing for timely profit realization
5. The strategy logic is clear and easy to understand and implement

#### Strategy Risks
1. The RSI indicator has a signal lag, which may miss the best entry timing
2. The entry conditions are relatively strict, resulting in low trading frequency and potentially missing some market movements
3. It may not perform well in choppy markets, getting caught in frequent entries and exits
4. The strategy can only capture unilateral uptrends and cannot grasp downtrends after trend reversals

#### Strategy Optimization Directions
1. Consider adding a trailing stop or fixed stop loss to control single trade risk
2. Study the combination of RSI with other auxiliary indicators to improve the reliability and timeliness of entry and exit signals 
3. Optimize entry conditions to improve trading frequency while ensuring signal reliability
4. Introduce position management to dynamically adjust positions based on trend strength and volatility
5. Consider combining short-term and medium-term to develop strategy versions suitable for different market conditions
   
#### Summary
This strategy constructs entry conditions through a triple RSI, combined with the price above the long-term moving average as a trend filter, to capture oversold reversal setups. The strategy logic is simple and clear, easy to implement and optimize. However, the strategy also has risks and shortcomings such as signal lag, low trading frequency, and only being able to capture unilateral market moves. It needs continuous debugging and improvement in actual application. By introducing stop loss and profit taking, position management, combining with other indicators and other methods, the stability and profitability of the strategy can be further improved.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-15 00:00:00
end: 2024-05-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//@author Honestcowboy
//
strategy("Triple RSI [Honestcowboy]" )

  
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>
// ---------> User Inputs <----------- >>
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>

rsiLengthInput = input.int(5, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(close, "Source", group="RSI Settings")

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>
// ---------> VARIABLE CALCULATIONS <----------- >>
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>

up = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
down = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>
// ---------> CONDITIONALS <----------- >>
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>

rule1   = rsi<35
rule2   = rsi<rsi[1] and rsi[1]<rsi[2] and rsi[2]<rsi[3]
rule3   = rsi[3]<60
rule4   = close>ta.sma(close, 200)

longCondition = rule1 and rule2 and rule3 and rule4
closeCondition = rsi>50

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>
// ---------> GRAPHICAL DISPLAY <----------- >>
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>

hline(30, title="Long Condition Line")
hline(50, title="Exit Condition Line")
plot(rsi)
plotshape(longCondition ? rsi-3 : na, title="Long Condition", style=shape.triangleup, color=color.lime, location=location.absolute)
plotshape(closeCondition and rsi[1]<50? rsi+3 : na, title="Exit Condition", style=shape.triangledown, color=#e60000, location=location.absolute)

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>
// ---------> AUTOMATION AND BACKTESTING <----------- >>
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ >>

if longCondition and strategy.position_size==0
    strategy.entry("LONG", strategy.long)
if closeCondition
    strategy.close("LONG")
```

> Detail

https://www.fmz.com/strategy/451487

> Last Modified

2024-05-15 10:23:08
