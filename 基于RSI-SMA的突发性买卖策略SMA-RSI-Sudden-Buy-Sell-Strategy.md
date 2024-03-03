
> Name

基于RSI-SMA的突发性买卖策略SMA-RSI-Sudden-Buy-Sell-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/950d769e62fbc99660.png)
 [trans]

## 概述

本策略主要利用 RSI 的平均值以及价格的突发性变动来识别市场的趋势和反转点。核心思路是在 RSI 超买超卖的情况下考虑建仓,并在出现突发性价格变动时寻找反转机会。同时,辅助使用 EMA 进行过滤信号。

## 策略原理

1. 计算 RSI 的平均值 SMA。当 RSI 的 SMA 线上穿60 或下穿 40 时,视为超买超卖现象,考虑反向开仓。

2. 当 RSI 的变动超过某一数值时,认为出现突发性变动。结合实际收盘价验证后,作为建立反向头寸的信号。

3. 使用 EMA 多档过滤,只有当价格上穿较短周期的 EMA 时,才会考虑建立多头;只有当价格下穿较短周期的 EMA 时,才会考虑建立空头。

4. 通过组合使用 RSI 的平均值、突发性变动以及 EMA 的过滤,寻找较优的建仓点位。

## 优势分析

1. 使用 RSI 的平均值能较为准确地判断超买超卖现象,有利于抓住反转机会。

2. 突发性变动往往预示着价格趋势和方向的改变,使用这一信号可以提高入场的时间liness。

3. EMA 的多档过滤可以进一步避免错误信号,从而减少不必要的损失。

4. 综合多种参数作为判决标准,可以提高策略稳定性和可靠性。

## 风险及对策

1. RSI 表现不稳定,SMA 值命中率不高。可以适当优化 RSI 的参数或使用其他指标替换。 

2. 突发性变动可能是短期震荡,并非真实反转。可以增大感应周期长度提高判断准确性。

3. EMA 方向过滤存在滞后性。可以测试更短周期的 EMA 提高灵敏度。

4. 整体而言,本策略对参数调整比较敏感,需要仔细测试寻找最优参数组合。同时配合止损来控制风险。

## 优化建议

1. 测试 ADX, MACD 等其他指标与 RSI 结合使用,寻找更优入场点位。

2. 增加机器学习算法,通过模型训练判断突发性买卖信号的真实性和稳定性。

3. 进一步增强 EMA 方向过滤的效果,如改进为不同周期 EMA 的综合判断。

4. 添加自适应止损策略,可以根据市场波动程度来动态调整止损幅度。

5. 继续优化参数,寻找最佳的参数组合。优化评价标准可以考虑夏普比率等。


## 总结

本策略首先利用 RSI 的平均值判断超买超卖情况。然后在突发性变动时建立反向头寸。同时使用 EMA 进行辅助过滤。通过合理的参数设定,可以有效判断市场的趋势转折点。总体而言,本策略稳定性较好,具有一定的实战价值。后续仍有进一步提升空间,需要持续测试和优化。

||


## Overview

This strategy mainly uses the average value of RSI and sudden price changes to identify market trend and reversal points. The core idea is to consider establishing positions when RSI is overbought or oversold, and look for reversal opportunities when sudden price changes occur. EMA is also used as a filter.

## Principles 

1. Calculate the SMA of RSI. When RSI SMA crosses above 60 or falls below 40, it is considered overbought or oversold, and reverse positions will be considered.

2. When the change of RSI exceeds a certain value, it is regarded as a sudden change. Combined with the actual close price verification, it serves as a signal to establish reverse position.

3. Use multiple EMAs for filtering. Only when price crosses above shorter period EMA, long position will be considered. Only when price falls below shorter period EMA, short position will be considered. 

4. By combining the use of RSI average, sudden changes and EMA filtering, better entry points can be identified.

## Advantage Analysis  

1. Using RSI average can accurately judge overbought and oversold conditions, which is conducive to capturing reversal opportunities.

2. Sudden changes often signify shifts in price trend and direction, using this signal can improve the timeliness of entries.

3. Multi-level EMA filtering can further avoid false signals and reduce unnecessary losses.

4. The combination of multiple parameters as decision criteria can enhance the stability and reliability of the strategy. 

## Risks and Mitigations

1. RSI performance may be unstable and SMA hit rate may be low. RSI parameters can be optimized or other indicators can replace it.

2. Sudden changes could just be short-term fluctuations rather than true reversals. Increase sensing cycle length to improve judgment accuracy.

3. There is lag in EMA direction filtering. Test shorter period EMAs to improve sensitivity.

4. In general, this strategy is quite sensitive to parameter tuning. Careful tests are needed to find optimum parameter combinations. Use stop loss to control risks.

## Optimization Suggestions  

1. Test other indicators like ADX, MACD combined with RSI to find better entry points.  

2. Increase machine learning algorithms to judge the authenticity and stability of sudden buy/sell signals.

3. Further enhance EMA direction filtering such as using composite judgment of different period EMAs.  

4. Add adaptive stop loss strategy to dynamically adjust stop loss range based on market volatility.

5. Continue parameter optimization to find optimum parameter combinations. Evaluation criteria could be Sharpe Ratio etc.


## Conclusion  

This strategy firstly uses RSI average to determine overbought/oversold conditions. Reverse positions are then established when sudden changes occur. EMA is also used as an auxiliary filter. With proper parameter settings, this strategy can effectively determine market trend shifts. Overall speaking, it has good stability and practical value. There is still room for further improvement, requiring persistent testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|10|inst_length|
|v_input_3|10|bars|
|v_input_int_1|20|lookbackno2|
|v_input_int_2|20|input_ema20|
|v_input_int_3|50|input_ema50|
|v_input_int_4|100|input_ema100|
|v_input_int_5|200|input_ema200|
|v_input_int_6|400|input_ema400|
|v_input_int_7|800|input_ema800|
|v_input_4|40|over40|
|v_input_5|60|over60|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-19 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © samwillington

//@version=5


strategy("sma RSI & sudden buy and sell Strategy v1", overlay=true)
price = close
length = input( 14 )
inst_length = input( 10 )
var rbc = 0
var float rsiBP = 0.0
var rsc = 0
var float rsiSP = 0.0
bars = input(10)

lookbackno2 = input.int(20)
rsi_buy = 0
rsi_sell = 0



//EMA inputs

input_ema20 = input.int(20)
ema20 = ta.ema(price, input_ema20)
input_ema50 = input.int(50)
ema50 = ta.ema(price, input_ema50)
input_ema100 = input.int(100)
ema100 = ta.ema(price, input_ema100)
input_ema200 = input.int(200)
ema200 = ta.ema(price, input_ema200)
input_ema400 = input.int(400)
ema400 = ta.ema(price, input_ema400)
input_ema800 = input.int(800)
ema800 = ta.ema(price, input_ema800)


vrsi = ta.rsi(price, length)


hi2 = ta.highest(price, lookbackno2)
lo2 = ta.lowest(price, lookbackno2)

buy_diff_rsi = vrsi - ta.rsi(close[1], length)
sell_diff_rsi = ta.rsi(close[1],length) - vrsi


//RSI high low

var int sudS = 0
var int sudB = 0
var float sudSO = 0.0
var float sudSC = 0.0
var float sudBO = 0.0
var float sudBC = 0.0
var sudBuy = 0
var sudSell = 0 
var countB = 0
var countS = 0



var co_800 = false
var co_400 = false
var co_200 = false
var co_100 = false
var co_50 = false
var co_20 = false

co_800 := ta.crossover(price , ema800)
co_400 := ta.crossover(price , ema400)
co_200 := ta.crossover(price , ema200)
co_100 := ta.crossover(price , ema100)
co_50 := ta.crossover(price , ema50)
co_20 := ta.crossover(price , ema20)

if(ta.crossunder(price , ema20))
    co_20 := false
if(ta.crossunder(price , ema50))
    co_50 := false
if(ta.crossunder(price , ema100))
    co_100 := false
if(ta.crossunder(price , ema200))
    co_200 := false
if(ta.crossunder(price , ema400))
    co_400 := false
if(ta.crossunder(price , ema800))
    co_800 := false
    
if((price> ema800) and (price > ema400))
    if(co_20)
        if(co_50)
            if(co_100)
                if(co_200)
                    strategy.close("Sell")
                    strategy.entry("Buy", strategy.long, comment="spl Buy")
                    co_20 := false
                    co_50 := false
                    co_100 := false
                    co_200 := false



// too much rsi

if(vrsi > 90)
    strategy.close("Buy")
    strategy.entry("Sell", strategy.short, comment="RSI too overbuy")
if(vrsi < 10)
    strategy.close("Sell")
    strategy.entry("Buy", strategy.long, comment="RSI too oversold")


var sudbcount = 0  // counting no. of bars till sudden rise
var sudscount = 0  // counting no. of bars till sudden decrease



if(sudB == 1)
    sudbcount := sudbcount + 1
if(sudS == 1)
    sudscount := sudscount + 1


if((buy_diff_rsi > inst_length) and (hi2 > price))
    sudB := 1
    sudBO := open
    sudBC := close
if((sell_diff_rsi > inst_length) )
    sudS := 1
    sudSO := open
    sudSC := close   

if(sudbcount == bars)
    if(sudBC < price)
        strategy.close("Sell")
        strategy.entry("Buy", strategy.long, comment="sudd buy")
        sudbcount := 0
        sudB := 0
    sudbcount := 0
    sudB := 0
if(sudscount == bars) 
    if(sudSC > price)
        strategy.close("Buy")
        strategy.entry("Sell", strategy.short, comment="sudd sell")
        sudscount := 0
        sudS := 0
    sudscount := 0
    sudS := 0


over40 = input( 40 )
over60 = input( 60 )
sma =ta.sma(vrsi, length)
coo = ta.crossover(sma, over60)
cuu = ta.crossunder(sma, over40)

if (coo)
    strategy.close("Sell")
	strategy.entry("Buy", strategy.long, comment="modified buy")
if (cuu)
    strategy.close("Buy")
	strategy.entry("Sell", strategy.short, comment="modefied sell")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/436008

> Last Modified

2023-12-20 17:33:04
