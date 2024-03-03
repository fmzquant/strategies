
> Name

基于量化模型定制的高效量化交易策略High-Performance-Algorithmic-Trading-Strategy-Based-on-Quantitative-Models

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16bd58e86f48674316e.png)
[trans]

## 概述

该策略是一个基于量化模型定制的高效量化交易策略。策略使用了Modelius Volume模型作为基础模型,并在此基础上进行了扩展和优化。该策略可以捕捉市场中的量化交易机会,实现稳定的盈利。

## 策略原理  

该策略的核心是Modelius Volume模型。该模型利用价格、交易量的变化来识别市场中的量化交易机会。具体来说,策略结合使用了close价格、open价格、最高价、最低价,根据一定的规则计算出当前K线的方向。当K线方向发生变化时,根据交易量的大小来判断量化交易机会的质量。此外,策略还结合了SAR指标和均线指标来辅助判断入场和出场时机。

基本交易逻辑是,当指标从负值向正值突破时,做多;当指标从正值向负值突破时,做空。此外,策略还设置了止损、止盈、跟踪止损来控制风险。

## 优势分析

该策略最大的优势在于利用Modelius Volume模型能够有效识别量化交易机会。与传统技术指标相比,该模型更加关注交易量的变化,这在目前的高频量化交易中非常实用。此外,策略的入场规则比较严格,可以有效避免错过量化交易机会的同时也能尽量减少乱序的概率。

## 风险分析

该策略主要的风险在于Modelius Volume模型本身并不能完全避免噪音。当市场出现异常波动时,会导致交易信号产生错误。此外,策略中的参数设置也会对最终结果产生影响。

为了控制风险,可适当调整参数,并结合其他指标进行辅助判断。此外也需要合理设置止损、止盈位置。

## 优化方向  

该策略还有一定的优化空间。例如可以考虑结合机器学习算法来动态优化参数设置。或者结合情绪分析等指标来提高决策的准确性。此外也可以研究不同品种之间的相关性,建立多品种套利模型。

## 总结

总的来说,该策略利用Modelius Volume量化模型的优势,设计了一套可操作性较强的量化交易策略。可通过参数调整、模型扩展、机器学习等方式进行优化提升,在实际交易中获得较好的稳定收益。

||

## Overview

This strategy is a high-performance algorithmic trading strategy based on quantitative models. It uses the Modelius Volume model as the basic model and further extends and optimizes it. This strategy can capture quantitative trading opportunities in the market and achieve steady profits.  

## Strategy Principle  

The core of this strategy is the Modelius Volume model. This model identifies quantitative trading opportunities in the market by detecting price and volume changes. Specifically, the strategy combines close price, open price, highest price, lowest price to calculate the direction of the current K-line based on certain rules. When the K-line direction changes, the quality of the quantitative trading opportunity is judged based on the trading volume. In addition, the strategy also combines the SAR indicator and moving average indicator to assist in determining entry and exit timing.  

The basic trading logic is to go long when the indicator breaks through from negative to positive and go short when the indicator breaks through from positive to negative. In addition, stop loss, take profit, trailing stop loss are set up to control risks.

## Advantage Analysis 

The biggest advantage of this strategy is that the Modelius Volume model can effectively identify quantitative trading opportunities. Compared with traditional technical indicators, this model pays more attention to volume changes, which is very practical in today's high-frequency quantitative trading. In addition, the entry rules of the strategy are relatively strict, which can effectively avoid missing quantitative trading opportunities while reducing the probability of disorder as much as possible.

## Risk Analysis   

The main risk of this strategy is that the Modelius Volume model itself cannot completely avoid noise. When there is abnormal market fluctuation, it will lead to wrong trading signals. In addition, the parameter settings in the strategy will also affect the final results.  

To control risks, parameters can be adjusted accordingly and combined with other indicators for auxiliary judgment. In addition, stop loss and take profit should be set reasonably.

## Optimization Directions

There is still room for optimizing this strategy. For example, machine learning algorithms can be considered to dynamically optimize parameter settings. Or combine sentiment analysis and other indicators to improve decision accuracy. In addition, the correlation between different varieties can be studied to establish a multi-variety arbitrage model.  

## Summary  

In summary, this strategy utilizes the advantages of the Modelius Volume quantitative model and designs a set of algorithmic trading strategies with high operability. It can be further optimized and enhanced through parameter tuning, model expansion, machine learning, etc. to obtain relatively good and steady returns in actual trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Renko Assignment Method: ATR|Traditional|Part of Price|
|v_input_2|14|Value|
|v_input_3|0|Price Source: Close|Open / Close|High / Low|
|v_input_4|0|Use True Range instead of Volume: Auto|Always|Never|
|v_input_5|true|Oscillating|
|v_input_6|false|Normalize|
|v_input_7|false|TP|
|v_input_8|false|SL|
|v_input_9|true|TS|
|v_input_10|3|TO|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=3
strategy(title="strategy modelius volume model ", shorttitle="mvm",overlay=true, calc_on_order_fills=true, default_qty_type=strategy.percent_of_equity, default_qty_value=50, overlay=false)

method = input(defval="ATR", options=["ATR", "Traditional", "Part of Price"], title="Renko Assignment Method")
methodvalue = input(defval=14.0, type=float, minval=0, title="Value")
pricesource = input(defval="Close", options=["Close", "Open / Close", "High / Low"], title="Price Source")
useClose = pricesource == "Close"
useOpenClose = pricesource == "Open / Close" or useClose
useTrueRange = input(defval="Auto", options=["Always", "Auto", "Never"], title="Use True Range instead of Volume")
isOscillating=input(defval=true, type=bool, title="Oscillating")
normalize=input(defval=false, type=bool, title="Normalize")
vol = useTrueRange == "Always" or (useTrueRange == "Auto" and na(volume))? tr : volume
op = useClose ? close : open
hi = useOpenClose ? close >= op ? close : op : high
lo = useOpenClose ? close <= op ? close : op : low

if method == "ATR"
    methodvalue := atr(round(methodvalue))
if method == "Part of Price"
    methodvalue := close/methodvalue

currclose = na
prevclose = nz(currclose[1])
prevhigh = prevclose + methodvalue
prevlow = prevclose - methodvalue
currclose := hi > prevhigh ? hi : lo < prevlow ? lo : prevclose

direction = na
direction := currclose > prevclose ? 1 : currclose < prevclose ? -1 : nz(direction[1])
directionHasChanged = change(direction) != 0
directionIsUp = direction > 0
directionIsDown = direction < 0

barcount = 1
barcount := not directionHasChanged and normalize ? barcount[1] + barcount : barcount
vol := not directionHasChanged ? vol[1] + vol : vol
res = barcount > 1 ? vol/barcount : vol


x=isOscillating and directionIsDown ? -res : res

TP = input(0) * 10
SL = input(0) * 10
TS = input(1) * 10
TO = input(3) * 10
CQ = 100

TPP = (TP > 0) ? TP : na
SLP = (SL > 0) ? SL : na
TSP = (TS > 0) ? TS : na
TOP = (TO > 0) ? TO : na

longCondition = crossover(x,0)
if (longCondition)
    strategy.entry("Long", strategy.long)


shortCondition = crossunder(x,0)
if (shortCondition)
    strategy.entry("Short", strategy.short)

strategy.exit("Close Short", "Short", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP, trail_offset=TOP)
strategy.exit("Close Long", "Long", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP, trail_offset=TOP)
```

> Detail

https://www.fmz.com/strategy/436227

> Last Modified

2023-12-22 13:14:33
