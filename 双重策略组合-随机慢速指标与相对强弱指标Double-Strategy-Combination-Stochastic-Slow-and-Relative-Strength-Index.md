
> Name

双重策略组合-随机慢速指标与相对强弱指标Double-Strategy-Combination-Stochastic-Slow-and-Relative-Strength-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12848735667b4fbe6b8.png)


## Overview

This strategy combines the classic Stochastic Slow strategy and Relative Strength Index (RSI) strategy to form a double strategy. It will open position when Stochastic exceeds 80 (short) or drops below 20 (long) meanwhile RSI exceeds 70 (short) or drops below 30 (long).

## Strategy Logic  

This strategy mainly utilizes two classic indicators – Stochastic Slow indicator and RSI indicator, and sets threshold values to determine overbought and oversold conditions.

**Stochastic Slow Part:**  

- Set Stochlength as 14, the lookback period for Stochastic calculation   
- Set StochOverBought as 80 and StochOverSold as 20, threshold values for overbought and oversold  
- Set smoothK as 3 and smoothD as 3, smoothing parameters for %K and %D line

The calculated %K and %D lines are named as k and d in the code. 

When %K crosses over %D from below, it is a long signal. When crosses under from above, it is a short signal. Combine with overbought/oversold judgment, it can be used to identify opportunities.

**RSI Part:**

- Set RSIlength as 14, the lookback period for RSI calculation  
- Set RSIOverBought as 70 and RSIOverSold as 30, threshold values for overbought and oversold

The calculated RSI indicator is named as vrsi in the code.  

When RSI rises above 70, it sends an overbought signal. When drops below 30, it sends an oversold signal.

**Double Strategy Entry Logic:**

This strategy will only open position when both Stochastic and RSI indicate overbought/oversold signals at the same time, meaning passing their own threshold values.

This combination utilizes the complementary property of two indicators to increase signal reliability and decrease false signals.  

## Advantage Analysis   

The advantages of this double strategy combination are:

1. Combination of two indicators can validate each other, decrease false signals and increase signal quality  
2. Stochastic judges overbought/oversold conditions, RSI does the same job. Combination makes the results more reliable.   
3. Stochastic uses %K and %D crossover system, smoothing parameters make it robust to outliers
4. RSI reacts fast to latest changes, Stochastic judges middle-to-long term trends and turning points. Complete strategy.
5. Conservative trading style, only open positions when both indicators agree. Less trades, avoid over-trading.

## Risks and Solutions

There are some risks associated with this strategy:

1. Parameter tuning risk

   Improper parameter settings may lead to missing good opportunities or generating false signals. We can optimize parameters through quantitative algorithms or manual tuning to find the best combination.  

2. Lack of signals

   Due to the dual indicator system, signal frequency could be relatively low and position utilization ratio is not high. We can properly relax the parameters to generate more entry signals.

3. Lagging risk 

   Both Stochastic and RSI have some lagging effect, which may cause missing rapid chances. More sensitive indicators can be introduced for assistance.

4. Instruments specificity

   This strategy may fits better for some violent fluctuated instruments like stock indices and gold. For smooth instruments, it may not be applicable.

## Optimization Directions  

This strategy can be further optimized in the following aspects:  

1. Parameter optimization

   Optimize the parameters quantitatively or manually to find the best parameter combination.  

2. Introduce stop loss mechanism

   Set stop loss based on price movement or percentage to control single trade loss.  

3. Combine with other indicators

   Introduce other indicators like volume, moving average to assist judging signal quality.

4. Relax double strategy conditions

   Appropriately relax the thresholds of double strategy to generate more entry signals.

## Conclusion

This strategy combines Stochastic Slow and RSI in double-confirmation mode, entering positions only when both indicators agree on overbought/oversold signals. It features high signal reliability, conservative trading style etc. Also has some risks like parameter tuning, lack of signals. Further improvements can be made through parameter optimization, stop loss introduction, adding assisting indicators to enhance stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of Stochastic|
|v_input_2|80|Stochastic overbought condition|
|v_input_3|20|Stochastic oversold condition|
|v_input_4|3|smoothing of Stochastic %K |
|v_input_5|3|moving average of Stochastic %K|
|v_input_6|14|lookback length of RSI|
|v_input_7|70|RSI overbought condition|
|v_input_8|30|RSI oversold condition|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-19 00:00:00
end: 2023-12-26 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Stochastic + RSI, Double Strategy (by ChartArt)", shorttitle="CA_-_RSI_Stoch_Strat", overlay=true)

// ChartArt's Stochastic Slow + Relative Strength Index, Double Strategy
//
// Version 1.0
// Idea by ChartArt on October 23, 2015.
//
// This strategy combines the classic RSI
// strategy to sell when the RSI increases
// over 70 (or to buy when it falls below 30),
// with the classic Stochastic Slow strategy
// to sell when the Stochastic oscillator
// exceeds the value of 80 (and to buy when
// this value is below 20).
//
// This simple strategy only triggers when
// both the RSI and the Stochastic are together
// in overbought or oversold conditions.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/


///////////// Stochastic Slow
Stochlength = input(14, minval=1, title="lookback length of Stochastic")
StochOverBought = input(80, title="Stochastic overbought condition")
StochOverSold = input(20, title="Stochastic oversold condition")
smoothK = input(3, title="smoothing of Stochastic %K ")
smoothD = input(3, title="moving average of Stochastic %K")
k = sma(stoch(close, high, low, Stochlength), smoothK)
d = sma(k, smoothD)

 
///////////// RSI 
RSIlength = input( 14, minval=1 , title="lookback length of RSI")
RSIOverBought = input( 70  , title="RSI overbought condition")
RSIOverSold = input( 30  , title="RSI oversold condition")
RSIprice = close
vrsi = rsi(RSIprice, RSIlength)


///////////// Double strategy: RSI strategy + Stochastic strategy

if (not na(k) and not na(d))
    if (crossover(k,d) and k < StochOverSold)
        if (not na(vrsi)) and (crossover(vrsi, RSIOverSold))
            strategy.entry("LONG", strategy.long, comment="StochLE + RsiLE")
 
 
if (crossunder(k,d) and k > StochOverBought)
    if (crossunder(vrsi, RSIOverBought))
        strategy.entry("SHORT", strategy.short, comment="StochSE + RsiSE")
 
 
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)WQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ
```

> Detail

https://www.fmz.com/strategy/436762

> Last Modified

2023-12-27 15:18:40
