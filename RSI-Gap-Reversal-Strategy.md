
> Name

RSI-Gap-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b699fb5968f049d3f5.png)
# Overview

The GBP RSI Gap Reversal strategy is a short-term trading strategy that identifies trend reversal opportunities based on the RSI indicator. It enters trades after the RSI breaks out of overbought or oversold areas, forming a gap reversal pattern, to capture market turning points in a timely manner.  

# Principles  

The core logic relies on RSI to identify overbought/oversold formations. The specific rules are:

1. Check if RSI breaks through 23 from oversold area, forming a bottom reversal. Go long if the gap reversal pattern is validated.  

2. Set profit target when RSI crosses above 75. Set stop loss at 189 pips loss.

3. Check if RSI breaks through 75 from overbought area, forming a top reversal. Go short if the gap reversal pattern is validated.

4. Set profit target when RSI crosses below 23. Set stop loss at 152 pips loss.

Capturing reversals by identifying breakthrough reversal patterns is the key idea. Profit targets and stop losses lock in profits and prevent the risk of failed reversals.

# Advantage Analysis 

1. Captures market turning points by identifying RSI reversal patterns.

2. High success rate with gap reversal breakdowns/breakouts.   

3. Effective risk control by setting profit targets and stop losses.

4. Simple and clear logic, easy to understand and implement.

# Risk Analysis

1. Probability of false RSI reversal signals exists, price may reverse back after entry.

2. Improper profit target and stop loss setting may lead to premature exit or oversized losses.

3. Parameters like RSI period, overbought/oversold levels need continuous optimization. 

4. Parameters vary significantly across symbols and timeframes.

# Optimization Directions

1. Test different RSI parameters for better reversal identification.  

2. Add filtering indicators like MACD to avoid false reversals. 

3. Add volume filters for reversal breakdowns/breakouts.  

4. Optimize across timeframes to find best fit.

# Conclusion

The GBP RSI Gap Reversal Strategy captures reversals by identifying RSI gap signals. It has advantages like high success rate, risk control, and simplicity. But the risk of failed reversals still exists and further optimization is needed, along with additional filtering indicators. It suits short-term traders familiar with trading reversals, especially GBP traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|length|
|v_input_2|23|overSold|
|v_input_3|75|overBought|
|v_input_4|35|overSoldP|
|v_input_5|78|overBoughtP|
|v_input_6|406|ProfitL|
|v_input_7|189|LossL|
|v_input_8|370|ProfitS|
|v_input_9|152|LossS|
|v_input_10|16|BarssinceL|
|v_input_11|26|BarssinceS|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-23 00:00:00
end: 2023-06-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("GBP combine", overlay=true)
length = input( 8 )
overSold = input( 23 )
overBought = input( 75 )
price = close
overSoldP = input( 35 )
overBoughtP = input (78)
ProfitL = input(406)
LossL = input(189)
ProfitS = input(370)
LossS = input(152)
BarssinceL = input(16)
BarssinceS = input(26)

vrsi = rsi(price, length)

longCondition() => crossunder(vrsi, overSold)
closeLPLCondition() => crossover(vrsi, overBoughtP)
closeLCondition() => barssince(longCondition())>BarssinceL

shortCondition() => crossover (vrsi, overBought)
closeLPSCondition() => crossunder(vrsi, overSoldP)
closeSCondition() => barssince(shortCondition())>BarssinceS

if (longCondition())
    strategy.entry("Long", strategy.long)
    strategy.exit ("Exit", "Long", profit=ProfitL,loss=LossL)
strategy.close("Long", when = closeLPLCondition() or closeLCondition())

if (shortCondition())
    strategy.entry("Short", strategy.short)
    strategy.exit ("Exit", "Short", profit=ProfitS,loss=LossS)
strategy.close("Short", when = closeLPSCondition() or closeSCondition())


//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)

```

> Detail

https://www.fmz.com/strategy/433128

> Last Modified

2023-11-24 16:01:31
