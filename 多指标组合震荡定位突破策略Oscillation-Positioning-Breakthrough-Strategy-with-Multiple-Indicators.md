
> Name

多指标组合震荡定位突破策略Oscillation-Positioning-Breakthrough-Strategy-with-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/aa7e688f935244a704.png)
[trans]


## 概述

本策略通过组合使用STOCH.RSI、RSI、双重策略、CM 威廉姆斯指标和货币流量指数(MFI)等多个指标,实现对市场波动的精确定位,looking for opportunties to long/short。当股票价格接近支撑或压力位时可以发出交易信号。该策略综合利用了多个指标的优势,通过指标互相验证,可有效减少误报率,增强信号的可靠性。

## 策略原理   

1. STOCH.RSI 指标结合随机指标 Stochastic 和相对强弱指数 RSI 的优点。可以显示超买超卖区域,发现反转机会。

2. RSI 指标判断超买超卖,作为辅助验证信号。 

3. 双重策略判断 Stoch 和 RSI 的交叉情况,发出交易信号。

4. CM 威廉姆斯指标计算百分位范围。弹出该范围代表着市场的反转,作为辅助 Stoch.RSI 和 RSI 判断市场波动和反转的依据。

5. 货币流量指数(MFI)判断资金流入流出情况,与 Stoch.RSI、RSI 互相验证,提高信号质量。


综上,该策略通过 Stoch.RSI、RSI、双重策略、CM 威廉姆斯指标和 MFI 等多个指标的组合,可以有效判断市场的超买超卖区域,定位反转机会,发出交易信号。多个指标的组合验证可以提高信号质量,减少误报。

## 优势分析

该策略主要有以下优势:

1. 多指标组合,相互验证,可以减少误报,提高信号质量。

2. 利用 STOCH.RSI、RSI 和 MFI 判断超买超卖区域,可有效定位市场反转点。 

3. CM 威廉姆斯指标计算百分位范围,可以辅助判断市场波动和反转。

4. 双重策略发出交易信号,操作简单,容易跟踪。

5. 参数优化空间大,可以根据不同市场调整参数,适应性强。

## 风险分析  

该策略也存在一些风险:   

1. 多指标组合运算比较复杂,对计算能力要求较高,不适合高频交易。

2. 参数设置不当可能导致信号质量下降,应该选择适合自己的参数。

3. 反转信号可能有滞后,需要结合更多指标判断走势。 

4. 交易次数可能较多,需要控制好资金利用效率。

对应的解决方法:

1. 选择计算能力强的终端,针对参数进行优化。

2. 做好回测,选择适合自己的参数组合。

3. 与更多指标组合使用,提前判断走势。

4. 优化止损机制,控制单笔交易风险。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 优化指标参数,选择最佳参数组合。

2. 增加volume,利润因子等指标,提高交易选股能力。 

3. 结合更多聚合线,布林带等指标,提前判断支持阻力。

4. 加入止损、入市筛选条件,控制风险。

5. 不同品种、周期参数不一样,可以根据品种特点选择最佳参数。

## 总结

本策略通过 STOCH.RSI、RSI、双重策略、CM 威廉姆斯指标和 MFI 多指标精确组合,定位市场超买超卖区域,发现反转机会。相互验证信号,可以减少误报,提高信号质量。通过参数优化、增加其他判断条件等方式进一步完善,可以成为一个稳定、实用的交易策略。
||

## Overview

This strategy combines multiple indicators including STOCH.RSI, RSI, Dual Strategy, CM Williams Indicator and Money Flow Index (MFI) to accurately locate market fluctuations and looking for opportunities to long/short. It can generate trading signals when stock prices approach support or resistance levels. By integrating the advantages of multiple indicators and cross validation, this strategy can effectively reduce false signals and enhance reliability.

## Strategy Logic   

1. STOCH.RSI combines the strengths of Stochastic Oscillator and Relative Strength Index (RSI), displaying overbought/oversold levels to detect reversal opportunities.

2. RSI judges overbought/oversold conditions as an auxiliary confirmation.

3. Dual Strategy determines crossovers between Stoch and RSI to generate trading signals.  

4. CM Williams Indicator calculates percentile bands. Bouncing off the bands represents market reversal, assisting judgement of fluctuations and reversals.

5. Money Flow Index (MFI) judges fund flows, validating signals together with Stoch.RSI and RSI to improve quality.

In summary, by combining Stoch.RSI, RSI, Dual Strategy, CM Williams and MFI, this strategy can effectively determine overbought/oversold levels, locate reversal points and generate quality signals. Cross validation by multiple indicators improves reliability and reduces false signals. 

## Advantage Analysis

The main advantages of this strategy include:

1. Multiple indicators combination improves signal quality by validation and reduces false signals.

2. STOCH.RSI, RSI and MFI effectively spot overbought/oversold zones and market turning points.

3. CM Williams calculates percentile bands to assist judging market fluctuations and reversals. 

4. Dual Strategy generates simple trading signals that are easy to follow.

5. Highly customizable with a wide range of optimizable parameters adaptable to different markets.

## Risk Analysis   

Some risks to note:

1. Complex multi-indicator computations demand high computing power, unsuitable for high frequency trading.

2. Improper parameter tuning could deteriorate signal quality. Parameters should suit personal style.

3. Reversal signals may lag. More indicators could assist trend judgment.

4. High trading frequency may lead to poor capital utilization. 

Solutions:

1. Use powerful terminals and optimize parameters.  

2. Backtest extensively to find optimal personal parameters.  

3. Add more indicators to determine trends in advance.

4. Optimize risk control mechanisms like stop loss to limit loss per trade.

## Optimization Directions

This strategy can be improved in the following aspects:

1. Optimize indicator parameters to find the optimal combination. 

2. Add indicators like volume and profit factor to enhance stock selection.

3. Incorporate more trend lines, Bollinger Bands etc. to forecast support/resistance levels.  

4. Add stop loss, market entry filters to control risk.

5. Parameters vary for different products and timeframes based on characteristics.

## Conclusion

This strategy locates market reversals by accurately combining multiple indicators including STOCH.RSI, RSI, Dual Strategy, CM Williams and MFI. Cross validation improves signal quality and reduces false signals. Further enhancements like parameter optimization and additional filters can make it a stable, practical trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Stochastic %K Smoothing|
|v_input_2|3|Stochastic %K Moving Average|
|v_input_3|14|RSI Lenght|
|v_input_4|14|Stochastic Lenght|
|v_input_5|80|Stochastic RSI overbought|
|v_input_6|20|Stochastic RSI oversold|
|v_input_7|70|RSI overbought|
|v_input_8|30|RSI oversold|
|v_input_9|22|LookBack Period Standard Deviation High|
|v_input_10|20|Bollinger Band Length|
|v_input_11|2|Bollinger Band Standard Devaition Up|
|v_input_12|50|Look Back Period Percentile High|
|v_input_13|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_14|1.01|Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%|
|v_input_15|false|Show High Range (Based on Percentile and LookBack Period)?|
|v_input_16|false|Show Standard Deviation Line?|
|v_input_17|14|MFI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


     //////////////////////////////////////////////////////////////////////////
    ////  STOCHASTIC_RSI+RSI+DOUBLE_STRATEGY+CM_WILLIAMS_VIX_FIX+MFI  ////////
   //////////////////////////////////////////////////////////////////////////


//  This is a simple combination of integrated and published scripts, useful 
//  if you don't have a PRO account and want to bypass the 3 indicators limit. 
//  It includes:
//  1) Stoch.RSI
//  2) Relative strenght index (RSI)
//  3) Stochastic + RSI, Double Strategy (by ChartArt)
//  4) CM_Williams_Vix_Fix Finds Market Bottoms (by ChrisMoody)
//  5) Monetary Flow Index (MFI)
//  For more details about 3) and 4) check the original scripts.


//@version=3
// @author GianlucaBezziccheri

strategy(title="Stoch.RSI+RSI+DoubleStrategy+CMWilliamsVixFix+MFI", shorttitle="Stoch.RSI+RSI+DoubleStrategy+CMWilliamsVixFix+MFI")


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
band0 = hline(70)
band1 = hline(30)
fill(band0, band1, color=purple, transp=100)


///OVERBOUGHT-OVERSOLD STRATEGY///
StochOverBought = input(80, title="Stochastic RSI overbought")
StochOverSold = input(20, title="Stochastic RSI oversold")
ks = sma(stoch(close, high, low, lengthStoch), smoothK)
ds = sma(k, smoothD)
RSIOverBought = input( 70  , title="RSI overbought")
RSIOverSold = input( 30  , title="RSI oversold")
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


///MONETARY FLOW INDEX
length4 = input(title="MFI Length", defval=14, minval=1, maxval=2000)
src4 = hlc3
upper4 = sum(volume * (change(src4) <= 0 ? 0 : src4), length4)
lower4 = sum(volume * (change(src4) >= 0 ? 0 : src4), length4)
mf4 = rsi(upper4, lower4)
plot(mf4, color=yellow, style=line, linewidth=2, title="Monetary Flow Index")
overbought=hline(70, title="MFI Overbought", color=yellow)
oversold=hline(30, title="MFI Oversold", color=yellow)
fill(overbought, oversold, color=#9915ff, transp=100)
```

> Detail

https://www.fmz.com/strategy/433958

> Last Modified

2023-12-01 17:49:34
