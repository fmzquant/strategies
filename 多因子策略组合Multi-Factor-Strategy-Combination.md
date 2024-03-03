
> Name

多因子策略组合Multi-Factor-Strategy-Combination

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a743e41de34840b43c.png)

这里是我根据你提供的交易策略代码撰写的详细策略分析文章:

[trans]

### 概述

该策略是多个因子组合而成,旨在利用不同因子的优势,构建一个综合性的交易策略。主要组合了以下几个因子:

1. Stoch.RSI - 随机指数平滑移动平均线
2. RSI - 相对强弱指数
3. Double Strategy - 随机指标和RSI的双重策略 
4. CM Williams Vix Fix - 威廉姆斯波动率修复,寻找市场底部
5. DMI - 趋向指标 

通过组合多个因子,可以发挥各因子的优势,获取更多交易机会,降低单一因子依赖的风险。

### 策略原理

该策略主要运用了以下几种技术指标:

1. **Stoch.RSI** - 随机RSI指标,结合了RSI和随机指标的优点。它使用RSI值作为随机指标的输入值,来判断市场是否处于超买或超卖状态。当%K线从超买区下穿%D线时,做多;当%K线从超卖区上穿%D线时,做空。

2. **RSI** - 相对强弱指数,判断市场的超买超卖状态。RSI大于70时为超买区,小于30时为超卖区。RSI在30-70区间震荡,代表着市场处于横盘整理状态。 

3. **Double Strategy** - 结合使用随机指标和RSI的双重策略。当随机指标%K线从超卖区下穿%D线,并且RSI从超卖区下穿时,做多;当随机指标%K线从超买区上穿%D线,并且RSI从超买区上穿时,做空。

4. **CM Williams Vix Fix** - 威廉姆斯波动率修复指标,通过计算最近一段时间内价格波动率的百分位数范围,判断市场是否处于反转点。超过阈值时为反转信号。

5. **DMI** - 趋向指标,通过计算+DI和-DI的差值,来判断市场的趋势方向。ADX指数可用来判断趋势的力度。

综合利用这些指标的各自优势,从不同角度判断市场趋势和买卖点,可以提高策略的稳定性和成功率。

### 策略优势

- 多因子组合,不同因子取长补短,更加全面;
- 包含趋势、反转等不同类型交易信号,机会更多;  
- 同时判断超买超卖区域,及时发现极端状态的形成和反转;
- 采用参数优化的指标设定,更符合不同市场环境;
- 结合趋向指标判断趋势力度,避免逆势交易。

### 风险分析

- 多因子组合,策略整体鲁棒性有待验证;
- 部分指标存在同质化问题,可进一步优化组合;
- 多空信号同时出现时,需明确策略方向选择原则;  
- 参数设置需要严格的回测优化,不适合随意改动参数;
- 长期持有效果可能不佳,需要适时止损退出。

### 优化方向 

- 对组合中的指标进行进一步筛选,保留作用独特的因子;
- 优化每种指标的参数设置,使之更加适合目标市场;
-建立清晰的入场和出场原则;  
- 结合止损、获利回撤等方法,以控制风险;
- 测试不同持仓时间对绩效的影响。

### 总结

该策略综合运用了多种技术指标的优势,通过 Stoch.RSI、RSI、Double Strategy、CM Williams Vix Fix和DMI等因子形成交易信号。它提供了更全面和稳定的判断依据,也使策略参数优化变得更加复杂。通过进一步优化参数设定、筛选独特因子、建立明确的入场出场原则等方法,可以有效提升策略的稳定性和绩效。但整体鲁棒性和长期持有能力还需经过严格验证。该策略为多因子交易策略提供了一个很好的范例,值得学习借鉴。


|| 

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

[/trans]

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
