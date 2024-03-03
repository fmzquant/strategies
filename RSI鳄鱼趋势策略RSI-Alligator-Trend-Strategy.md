
> Name

RSI鳄鱼趋势策略RSI-Alligator-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b879246e0062392917.png)
[trans]
## 概述

RSI鳄鱼趋势策略是基于RSI指标的鳄鱼指标组合,用于判断趋势的进入和退出。它使用三条平均线 - 鳄鱼的上颚线、牙齿线和唇线,采用不同周期的RSI构建。当牙齿线上穿唇线且RSI上颚线高于牙齿线时做多;当牙齿线下穿唇线且RSI上颚线低于牙齿线时做空。该策略同时设定了止损和止盈条件。

## 策略原理

RSI鳄鱼趋势策略使用RSI指标构建鳄鱼指标的三条移动平均线。具体设置如下:

- 上颚线:5周期的RSI线
- 牙齿线:13周期的RSI线  
- 唇线:34周期的RSI线

进入信号的判断逻辑是:

多头信号:当牙齿线上穿唇线,同时上颚线高于牙齿线时,做多。

空头信号:当牙齿线下穿唇线,同时上颚线低于牙齿线时,做空。

该策略同时设定了止损和止盈条件:

- 止损设置为进入价格的10% 
- 止盈设置为进入价格的90%

## 优势分析

RSI鳄鱼趋势策略具有以下优势:

1. 使用鳄鱼线指标判断趋势,能够有效滤除市场噪音,锁定主要趋势
2. 结合多周期RSI,避免假突破,提高信号的可靠性
3. 设定合理的止损止盈条件,有助于策略的稳定运行
4. 策略思路清晰易懂,参数设置简单,容易实盘操作
5. 可同时做多做空,兼顾趋势的两个方向,灵活性强

## 风险分析

RSI鳄鱼趋势策略也存在以下风险:  

1. 牙齿线与唇线的交叉可能出现假突破,导致不必要的亏损。可以适当调整周期参数降低假突破概率。

2. 止损设置可能过于激进,无谓止损的概率较大。可以适当放宽止损范围,或添加其他条件作为止损激活的前提条件。  

3. 若行情剧烈,止损或无法起到应有的保证金效果。这时则需要人工干预,及时止损。

4. 多空切换频繁时,交易费用压力较大。可以适当放宽进入条件,减少不必要的反复。

## 优化方向  

RSI鳄鱼趋势策略可以从以下几个方面进行优化:

1. 优化鳄鱼线的参数设置,调整周期参数,找到最佳参数组合

2. 优化进入的条件逻辑,比如新增交易量指标等过滤信号

3. 优化止盈止损策略,使其更加顺应行情与保证金水平

4. 增加对突发事件的处理机制,避免异常行情的暴露

5. 增加开仓算法,控制单笔投入资金占比,规避风险

## 总结

RSI鳄鱼趋势策略整体来说是一种可靠、易操作的趋势跟踪策略。它使用鳄鱼指标判断趋势方向,配合RSI指标设定参考阈值,能有效锁定趋势并设定合理的出场点。同时,策略本身也具备较强的灵活性与扩展性,值得实盘应用与后续优化。

||

## Overview  

The RSI Alligator Trend strategy is based on the combination of RSI indicator and Alligator indicator to determine the entry and exit of trends. It uses three moving average lines - the alligator's jaw line, tooth line and lip line, constructed by RSI of different periods. It goes long when the tooth line crosses above the lip line and the RSI jaw line is higher than the tooth line; it goes short when the tooth line crosses below the lip line and the RSI jaw line is lower than the tooth line. The strategy also sets stop loss and take profit conditions.  

## Strategy Logic  

The RSI Alligator Trend strategy builds the three lines of the Alligator indicator using RSI indicator. The specific settings are:

- Jaw line: 5-period RSI line
- Tooth line: 13-period RSI line
- Lip line: 34-period RSI line  

The entry signal logic is: 

Long signal: when the tooth line crosses above the lip line and the jaw line is higher than the tooth line, go long.  

Short signal: when the tooth line crosses below the lip line and the jaw line is lower than the tooth line, go short.

The strategy also sets stop loss and take profit conditions:  

- Stop loss is set at 10% below the entry price
- Take profit is set at 90% above the entry price

## Strength Analysis

The RSI Alligator Trend strategy has the following strengths:

1. Using the Alligator lines to determine the trend can effectively filter out market noise and lock in the major trend 
2. Combining multiple-period RSI avoids false breakouts and improves signal reliability
3. Setting reasonable stop loss and take profit conditions helps stabilize strategy operations  
4. The strategy idea is clear and easy to understand, the parameter settings are simple, and it is easy to implement for live trading
5. It can go both long and short, taking into account both directions of the trend, and has strong flexibility

## Risk Analysis   

The RSI Alligator Trend strategy also has the following risks:

1. There may be false breakouts at the crossover between the tooth line and the lip line, leading to unnecessary losses. The cycle parameters can be adjusted to reduce the probability of false breakouts.

2. The stop loss setting may be too aggressive, with a high probability of unnecessary stop loss. The stop loss range can be appropriately relaxed, or other conditions can be added as prerequisites for activating the stop loss.

3. If the market moves violently, the stop loss may fail to play its proper role of protecting the margin. In this case, manual intervention is required to stop the loss in time.  

4. When long and short positions switch frequently, the trading cost pressure is greater. The entry conditions can be appropriately relaxed to reduce unnecessary round trips.

## Optimization Directions   

The RSI Alligator Trend strategy can be optimized in the following aspects:

1. Optimize the Alligator line parameter settings to find the best parameter combination  

2. Optimize the entry condition logic, such as adding indicators like trading volume to filter signals

3. Optimize the take profit and stop loss strategies to make them more adaptive to market conditions and margin levels  

4. Add mechanisms to deal with extreme events and avoid exposure to abnormal market conditions  

5. Add open position algorithms to control the proportion of capital invested in a single trade to mitigate risks

## Conclusion  

In general, the RSI Alligator Trend strategy is a reliable and easy-to-use trend following strategy. It uses the Alligator indicator to determine the trend direction, combined with the RSI indicator to set reference thresholds, which can effectively lock in the trend and set reasonable exit points. At the same time, the strategy itself also has strong flexibility and extensibility, making it worthwhile for live trading and further optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|70|Over bought|
|v_input_2|30|Over sold|
|v_input_3|5|Jaw Periods|
|v_input_4|false|Jaw Offset|
|v_input_5|13|Teeth Periods|
|v_input_6|false|Teeth Offset|
|v_input_7|34|Lips Periods|
|v_input_8|false|Lips Offset|
|v_input_9|0|strategyType: Long Only|Long & Short|Short Only|
|v_input_10|7|From Month|
|v_input_11|true|From Day|
|v_input_12|2018|From Year|
|v_input_13|12|To Month|
|v_input_14|true|To Day|
|v_input_15|2020|To Year|
|v_input_16|10|Stop Loss %|
|v_input_17|90|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=3
// RSI Alligator
// Forked from Author: Reza Akhavan
// Updated by Khalid Salomão

strategy("RSI Alligator Strategy", overlay=false, pyramiding=0, default_qty_type=strategy.cash, default_qty_value=25000, initial_capital=25000, commission_type=strategy.commission.percent, commission_value=0.15, slippage=3)

// === TA LOGIC ===
overBought = input(70, minval=0, maxval=100, title="Over bought")
overSold = input(30, minval=0, maxval=100, title="Over sold")
jawPeriods = input(5, minval=1, title="Jaw Periods")
jawOffset = input(0, minval=0, title="Jaw Offset")
teethPeriods = input(13, minval=1, title="Teeth Periods")
teethOffset = input(0, minval=0, title="Teeth Offset")
lipsPeriods = input(34, minval=1, title="Lips Periods")
lipsOffset = input(0, minval=0, title="Lips Offset")

jaws = rsi(close, jawPeriods)
teeth = rsi(close, teethPeriods)
lips = rsi(close, lipsPeriods)
plot(jaws, color=green, offset=jawOffset, title="Jaw")
plot(teeth, color=red, offset=teethOffset, title="Teeth")
plot(lips, color=blue, offset=lipsOffset, title="Lips")

//
// === Signal logic ===
// 
LONG_SIGNAL_BOOLEAN  = crossover(teeth, lips) and jaws > teeth
SHORT_SIGNAL_BOOLEAN = crossunder(teeth, lips) and jaws < teeth

// === INPUT BACKTEST DATE RANGE ===
strategyType = input(defval="Long Only", options=["Long & Short", "Long Only", "Short Only"])

FromMonth = input(defval = 7, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2017)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2017)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        
window()  => true

// === STRATEGY BUY / SELL ENTRIES ===

// TODO: update the placeholder LONG_SIGNAL_BOOLEAN and SHORT_SIGNAL_BOOLEAN to signal
// long and short entries
buy()  => window() and LONG_SIGNAL_BOOLEAN
sell() => window() and SHORT_SIGNAL_BOOLEAN

if buy()
    if (strategyType == "Short Only")
        strategy.close("Short")
    else
        strategy.entry("Long", strategy.long, comment="Long")

if sell()
    if (strategyType == "Long Only")
        strategy.close("Long")
    else
        strategy.entry("Short", strategy.short, comment="Short")
        

// === BACKTESTING: EXIT strategy ===
sl_inp = input(10, title='Stop Loss %', type=float)/100
tp_inp = input(90, title='Take Profit %', type=float)/100

stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)

strategy.exit("Stop Loss/Profit", "Long", stop=stop_level, limit=take_level)
```

> Detail

https://www.fmz.com/strategy/440337

> Last Modified

2024-01-29 14:40:07
