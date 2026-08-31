
> Name

Multi-Factor-Strategy-Combination

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a743e41de34840b43c.png)

这里是我根据你提供的交易策略代码撰写的详细策略分析文章:


### Overview

This strategy combines multiple factors to form a comprehensive trading strategy. It aims to leverage the advantages of different factors, including:  

1. Stoch.RSI - Stochastic RSI  
2. RSI - Relative Strength Index
3. Double Strategy - Combination of Stochastic and RSI
4. CM Williams Vix Fix - Finds market bottoms  
5. DMI - Directional Movement Index

By combining multiple factors, it seeks to capitalize on the strengths of each factor and reduce the risks associated with relying on a single factor.

### Strategy Logic  

The main technical indicators used in this strategy are:

1. **Stoch.RSI** - A stochastic oscillator applied to RSI values rather than price. It identifies overbought/oversold levels.

2. **RSI** - Relative Strength Index, gauges overbought/oversold conditions. Above 70 is overbought, below 30 is oversold.  

3. **Double Strategy** - Combines Stochastic and RSI for trading signals. Buy when Stochastic %K crosses below %D and RSI crosses below oversold level. Sell when the opposite occurs.

4. **CM Williams Vix Fix** - Calculates percentile range of price volatility over lookback period. Signals potential reversals when threshold is breached.

5. **DMI** - Directional Movement Index. Uses +DI/-DI differential to determine trend direction/strength. 

By integrating signals from these indicators, the strategy provides a more robust system to identify trends and turning points.

### Advantages

- Diversification through multiple factors, offset individual weaknesses
- Provides both trend-following and mean-reversion signals  
- Identifies overbought/oversold extremes and reversals
- Optimized parameters tailored for different market regimes
- Incorporates trend direction/strength filter 

### Risks

- Overall robustness of multifactor systems remains unproven
- Potential redundancy between some indicators
- Unclear priority between conflicting signals
- Parameter tuning requires rigorous backtesting
- Long holding periods may underperform

### Enhancement 

- Further filter/optimize the indicator set 
- Fine-tune parameters to fit target markets
- Establish clear entry/exit rules
- Incorporate stop loss, profit taking to control risk
- Test impact of holding period on performance

### Summary

This strategy combines strengths of Stoch.RSI, RSI, Double Strategy, CM Williams Vix Fix and DMI. It provides more comprehensive signals but also complicates parameter optimization. Further enhancements around optimizing parameters, filtering unique factors, and defining trading rules can improve robustness. Long-term viability and robustness still require rigorous validation. Overall it provides a good example of multifactor systems worth learning from.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Stochastic %K Smoothing|
|v_input_2|3|Stochastic %K Moving Average|
|v_input_3|14|RSI Lenght|
|v_input_4|14|Stochastic Lenght|
|v_input_5|80|Stochastic overbought condition|
|v_input_6|20|Stochastic oversold condition|
|v_input_7|70|RSI overbought condition|
|v_input_8|30|RSI oversold condition|
|v_input_9|22|LookBack Period Standard Deviation High|
|v_input_10|20|Bollinger Band Length|
|v_input_11|2|Bollinger Band Standard Devaition Up|
|v_input_12|50|Look Back Period Percentile High|
|v_input_13|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_14|1.01|Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%|
|v_input_15|false|Show High Range (Based on Percentile and LookBack Period)?|
|v_input_16|false|Show Standard Deviation Line?|
|v_input_17|14|DI Length|
|v_input_18|14|ADX Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-18 00:00:00
end: 2023-10-25 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


     //////////////////////////////////////////////////////////////////////
    ////  STOCHASTIC_RSI+RSI+DOUBLE_STRATEGY+CM_WILLIAMS_VIX_FIX+DMI  ////
   //////////////////////////////////////////////////////////////////////


//  This is a simple combination of integrated and published scripts, useful 
//  if you don't have a PRO account and want to bypass the 3 indicator limit. 
//  It includes:
//  1) Stoch.RSI
//  2) Relative strenght index
//  3) Stochastic + RSI, Double Strategy (by ChartArt)
//  4) CM_Williams_Vix_Fix Finds Market Bottoms (by ChrisMoody)
//  5) Directional Movement Index (DMI)
//  For more details about 3) and 4) check the original scripts.


//@version=3

strategy(title="Stoch.RSI+RSI+DoubleStrategy+CMWilliamsVixFix+DMI", shorttitle="Stoch.RSI+RSI+DoubleStrategy+CMWilliamsVixFix+DMI")


///STOCH.RSI///
smoothK = input(3, minval=1, title="Stochastic %K Smoothing")
smoothD = input(3, minval=1, title="Stochastic %K Moving Average")
lengthRSI = input(14, minval=1, title="RSI Lenght")
lengthStoch = input(14, minval=1, title="Stochastic Lenght")
RSIprice = close
rsi1 = rsi(RSIprice, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
plot(k, color=blue, linewidth=2)
plot(d, color=silver, linewidth=2)
h0 = hline(80)
h1 = hline(20)
fill(h0, h1, color=purple, transp=78)


///RSI///
up = rma(max(change(RSIprice), 0), lengthRSI)
down = rma(-min(change(RSIprice), 0), lengthRSI)
rsi2 = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
plot(rsi2, color=fuchsia, linewidth=2)
// band0 = hline(70, linestyle=dotted)
// band1 = hline(30, linestyle=dotted)
// fill(band0, band1, color=purple, transp=100)


///OVERBOUGHT-OVERSOLD STRATEGY///
StochOverBought = input(80, title="Stochastic overbought condition")
StochOverSold = input(20, title="Stochastic oversold condition")
ks = sma(stoch(close, high, low, lengthStoch), smoothK)
ds = sma(k, smoothD)
RSIOverBought = input( 70  , title="RSI overbought condition")
RSIOverSold = input( 30  , title="RSI oversold condition")
vrsi = rsi(RSIprice, lengthRSI)
if (not na(ks) and not na(ds))
    if (crossover(ks,ds) and k < StochOverSold)
        if (not na(vrsi)) and (crossover(vrsi, RSIOverSold))
            strategy.entry("LONG", strategy.long, comment="LONG")
if (crossunder(ks,ds) and ks > StochOverBought)
    if (crossunder(vrsi, RSIOverBought))
        strategy.entry("SHORT", strategy.short, comment="SHORT")
 
 
///CM WILLIAMS VIX FIX///
pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bollinger Band Length")
mult = input(2.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")
lb = input(50  , title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
pl = input(1.01, title="Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%")
hp = input(false, title="Show High Range (Based on Percentile and LookBack Period)?")
sd = input(false, title="Show Standard Deviation Line?")
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100
sDev = mult * stdev(wvf, bbl)
midLine = sma(wvf, bbl)
lowerBand = midLine - sDev
upperBand = midLine + sDev
rangeHigh = (highest(wvf, lb)) * ph
rangeLow = (lowest(wvf, lb)) * pl
col = wvf >= upperBand or wvf >= rangeHigh ? lime : gray
plot(hp and rangeHigh ? rangeHigh : na, title="Range High Percentile", style=line, linewidth=4, color=orange)
plot(hp and rangeLow ? rangeLow : na, title="Range High Percentile", style=line, linewidth=4, color=orange)
plot(wvf, title="Williams Vix Fix", style=columns, linewidth = 4, color=col, transp=85)
plot(sd and upperBand ? upperBand : na, title="Upper Band", style=line, linewidth = 3, color=aqua)


///DIRECTIONAL MOVEMENT INDEX///
len3 = input(14, minval=1, title="DI Length")
lensig3 = input(14, title="ADX Smoothing", minval=1, maxval=50)
up3 = change(high)
down3 = -change(low)
plusDM3 = na(up3) ? na : (up3 > down3 and up3 > 0 ? up3 : 0)
minusDM3 = na(down3) ? na : (down3 > up3 and down3 > 0 ? down3 : 0)
trur3 = rma(tr, len3)
plus3 = fixnan(100 * rma(plusDM3, len3) / trur3)
minus3 = fixnan(100 * rma(minusDM3, len3) / trur3)
sum3 = plus3 + minus3
adx3 = 100 * rma(abs(plus3 - minus3) / (sum3 == 0 ? 1 : sum3), lensig3)
plot(plus3, color=green, style=circles, linewidth=2, title="+DI")
plot(minus3, color=red, style=circles, linewidth=2, title="-DI")
plot(adx3, color=aqua, style=circles, linewidth=3, title="ADX")
```

> Detail

https://www.fmz.com/strategy/430244

> Last Modified

2023-10-26 15:18:34
