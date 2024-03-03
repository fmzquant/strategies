
> Name

波动率压缩突破策略Volatility-Squeeze-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

#### 概述
波动率压缩突破策略是一种结合布林带（Bollinger Bands, BB）和凯尔特纳通道（Keltner Channel, KC）的交易系统。它旨在通过监测价格突破和趋势信号，捕捉市场的主要移动。策略关注市场的压缩期（低波动率）和随后的突破（高波动率），试图在大规模价格移动开始之前进入市场。

#### 策略原理
波动率压缩突破策略的核心是识别市场波动率的减少和增加。布林带是通过计算价格的标准偏差而形成的，而凯尔特纳通道则是基于平均真实范围（ATR）。当布林带在凯尔特纳通道内部压缩时，它表明市场波动率降低，可能会有一次大规模的价格突破。策略通过检查布林带是否处于凯尔特纳通道内部，以及价格是否突破布林带的上限或下限，来发出交易信号。此外，策略还考虑了指数移动平均线（EMA）的趋势排列，以增强信号的有效性。

#### 策略优势
该策略的主要优势在于它结合了波动率指标和趋势指标，提供了一种全面的市场视角。通过布林带和凯尔特纳通道的组合，策略能够有效地识别潜在的大规模市场移动。此外，EMA趋势排列的使用可以帮助确认市场方向，减少错误信号。

#### 策略风险
波动率压缩突破策略的主要风险在于假突破信号和市场的不确定性。在高波动率的市场条件下，布林带可能会频繁地被突破，从而产生误导性的信号。此外，如果没有正确地确定市场趋势，策略可能会产生不利的交易。为了降低这些风险，可以通过调整参数、结合其他指标或采用更严格的入场条件来优化策略。

#### 策略优化方向
该策略可以通过多种方式进行优化。首先，可以通过调整布林带和凯尔特纳通道的参数来适应不同的市场条件。其次，可以引入其他技术指标，如相对强弱指数（RSI）或移动平均收敛发散（MACD），以提供额外的交易信号确认。最后，可以考虑将此策略与其他类型的交易系统结合，以形成一个更加全面和多元化的交易框架。

#### 总结
波动率压缩突破策略是一个强大且灵活的交易系统，结合了布林带和凯尔特纳通道的优点。通过监测市场波动率和趋势信号，它能够有效地识别大规模的市场移动。虽然策略具有一定的风险，但通过适当的优化和参数调整，可以大大提高其效率和准确性。总的来说，这个策略提供了一种独特的视角，用于捕捉和利用市场的主要趋势和突破。

||

#### Overview
The Volatility Squeeze Breakout Strategy is a trading system that integrates Bollinger Bands (BB) and Keltner Channel (KC) to capture major market movements by monitoring breakout and trend signals. This strategy focuses on periods of market compression (low volatility) and subsequent breakouts (high volatility), aiming to enter the market before the start of major price movements.

#### Strategy Principle
The core of the Volatility Squeeze Breakout Strategy is to identify decreases and increases in market volatility. Bollinger Bands are formed by calculating the standard deviation of prices, while the Keltner Channel is based on the Average True Range (ATR). When the Bollinger Bands compress within the Keltner Channel, it indicates a reduction in market volatility, potentially leading to a significant price breakout. The strategy generates trading signals by checking whether the Bollinger Bands are within the Keltner Channel and whether the price breaks above or below the Bollinger Bands' limits. Additionally, the strategy considers the alignment of Exponential Moving Averages (EMA) to enhance the validity of signals.

#### Advantages of the Strategy
The primary advantage of this strategy is its combination of volatility and trend indicators, providing a comprehensive market perspective. By integrating Bollinger Bands and Keltner Channel, the strategy can effectively identify potential large market movements. Moreover, the use of EMA trend alignment can help confirm market direction and reduce false signals.

#### Risks of the Strategy
The main risk of the Volatility Squeeze Breakout Strategy lies in false breakout signals and market uncertainty. Under conditions of high volatility, the Bollinger Bands might be breached frequently, leading to misleading signals. Moreover, if the market trend is not correctly identified, the strategy may generate unfavorable trades. To mitigate these risks, the strategy can be optimized by adjusting parameters, incorporating additional indicators, or adopting stricter entry conditions.

#### Optimization Directions
This strategy can be optimized in several ways. Firstly, adjusting the

 parameters of the Bollinger Bands and Keltner Channel to adapt to different market conditions. Secondly, introducing additional technical indicators such as the Relative Strength Index (RSI) or Moving Average Convergence Divergence (MACD) for additional trade signal confirmation. Finally, considering combining this strategy with other types of trading systems to form a more comprehensive and diversified trading framework.

#### Conclusion
The Volatility Squeeze Breakout Strategy is a powerful and flexible trading system that combines the strengths of Bollinger Bands and Keltner Channel. By monitoring market volatility and trend signals, it can effectively identify major market movements. While the strategy carries certain risks, these can be significantly mitigated through proper optimization and parameter adjustments. Overall, this strategy provides a unique perspective for capturing and capitalizing on major market trends and breakouts.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|BB Length|
|v_input_2|2|BB StdDev|
|v_input_3|20|KC Length|
|v_input_4|1.5|KC Mult|
|v_input_5|20|ATR Length|
|v_input_6|10|Entry distance from alert|
|v_input_7|true|BB Squeeze Check|
|v_input_8|3|BB Squeeze Width|
|v_input_9|false|BB within KC Check|
|v_input_10|false|EMA Trend Check|
|v_input_11|true|Show BB|
|v_input_12|true|Show KC|
|v_input_13|true|Show 8EMA|
|v_input_14|false|Show EMAs|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bishnu103

//@version=4
strategy(title="Squeeze Breakout using BB and KC [v1.0][Bishnu103]",shorttitle="BB BREAKOUT",overlay=true,calc_on_every_tick=true)

// ***********************************************************************************************************************
// input variables
bbLength            = input(title="BB Length", minval=1, defval=20)
bbStdDev            = input(title="BB StdDev", minval=1, defval=2)
kcLength            = input(title="KC Length", minval=1, defval=20)
kcMult              = input(title="KC Mult", defval=1.5)
atrLength           = input(title="ATR Length", minval=1, defval=20)
entry_distance      = input(title="Entry distance from alert", minval=1, maxval=10, defval=10)
bb_squeeze_switch   = input(title="BB Squeeze Check", type=input.bool, defval=true)
bb_squeeze_width    = input(title="BB Squeeze Width", minval=1.0, defval=3.0)
bb_in_kc_switch     = input(title="BB within KC Check", type=input.bool, defval=false)
ema_trend_switch    = input(title="EMA Trend Check", type=input.bool, defval=false)
show_bb_switch      = input(title="Show BB", type=input.bool, defval=true)
show_kc_switch      = input(title="Show KC", type=input.bool, defval=true)
show_8ema_switch    = input(title="Show 8EMA", type=input.bool, defval=true)
show_emas_switch    = input(title="Show EMAs", type=input.bool, defval=false)

// ***********************************************************************************************************************
// global variables
closed_above_bb     = false
closed_below_bb     = false

// variable values available across candles
var entry_price     = 0.0  
var sl_price        = 0.0
var exit_price_8ema = 0.0
var candle_count    = 0

// ***********************************************************************************************************************
// function to return bollinger band values based on candle poition passed 
getBB(pos) =>
    float basis = sma(close[pos], bbLength)
    float dev = bbStdDev * stdev(close[pos], bbLength)
    [basis, basis + dev, basis - dev]

// function to return Keltner Channel values based on candle poition passed 
getKC(pos) => 
    mKC     = ema(close[pos],kcLength)
    range   = kcMult * atr(atrLength)[pos]
    uKC     = mKC + range
    lKC     = mKC - range
    [mKC,uKC,lKC]

// ***********************************************************************************************************************
// strategy
//
// get current bb value
[mBB_0,uBB_0,lBB_0] = getBB(0)
[mBB_1,uBB_1,lBB_1] = getBB(1)

// if a candle closes above bb and previous candle closed inside bb then it's a bullish signal
if close[0] > uBB_0
    closed_above_bb := true
    entry_price     := high[0]

// if a candle closes above bb and previous candle closed inside bb then it's a bullish signal
if close[0] < lBB_0
    closed_below_bb := true
    entry_price     := low[0]

// check if BB is in squeeze
bb_in_squeeze = bb_squeeze_switch ? ((uBB_1 - lBB_1) < (atr(20)[1] * bb_squeeze_width)) : true

// 6 candle's bb prior to the alert candle, are within keltner channel on either upper side of the bands or on lower side of the bands
// bb
[mBB_2,uBB_2,lBB_2] = getBB(2)
[mBB_3,uBB_3,lBB_3] = getBB(3)
[mBB_4,uBB_4,lBB_4] = getBB(4)
[mBB_5,uBB_5,lBB_5] = getBB(5)
[mBB_6,uBB_6,lBB_6] = getBB(6)
// kc
[mKC_1,uKC_1,lKC_1] = getKC(1)
[mKC_2,uKC_2,lKC_2] = getKC(2)
[mKC_3,uKC_3,lKC_3] = getKC(3)
[mKC_4,uKC_4,lKC_4] = getKC(4)
[mKC_5,uKC_5,lKC_5] = getKC(5)
[mKC_6,uKC_6,lKC_6] = getKC(6)
// check if either side 6 candle's bb are inside kc
lower_squeeze_is_good = uBB_1   < uKC_1 and uBB_2 < uKC_2 and uBB_3 < uKC_3 and uBB_4 < uKC_4 and uBB_5 < uKC_5 and uBB_6 < uKC_6
upper_squeeze_is_good = lBB_1   > lKC_1 and lBB_2 > lKC_2 and lBB_3 > lKC_3 and lBB_4 > lKC_4 and lBB_5 > lKC_5 and lBB_6 > lKC_6
squeeze_is_good                 = bb_in_kc_switch ? (upper_squeeze_is_good or lower_squeeze_is_good) : true

// EMAs (8, 21, 34, 55, 89) should be aligned in sequence
ema_8               = ema(close,8)
ema_21              = ema(close,21)
ema_34              = ema(close,34)
ema_55              = ema(close,55)
ema_89              = ema(close,89)
ema_trend_check1    = ema_trend_switch and closed_above_bb and ema_8 > ema_21 and ema_21 > ema_34 and ema_34 > ema_55 and ema_55 > ema_89
ema_trend_check2    = ema_trend_switch and closed_below_bb and ema_8 < ema_21 and ema_21 < ema_34 and ema_34 < ema_55 and ema_55 < ema_89
ema_trend_check     = ema_trend_switch ? (ema_trend_check1 or ema_trend_check2) : true

// ***********************************************************************************************************************
// entry conditions 
long_entry   = closed_above_bb and bb_in_squeeze and squeeze_is_good and ema_trend_check
short_entry  = closed_below_bb and bb_in_squeeze and squeeze_is_good and ema_trend_check

candle_count := candle_count + 1
if long_entry or short_entry
    candle_count := 0
    
if long_entry or short_entry
    exit_price_8ema := na

if long_entry or short_entry
    sl_price := mBB_0

// ***********************************************************************************************************************
// exit conditions
// long trade - a candle closes below 8ema and in next candle price crosses low of previous candle
// short trade - a candle closes above 8ema and in next candle price crosses high of previous candle
long_exit_8ema    = strategy.position_size > 0 and crossunder(close,ema(close,8))
short_exit_8ema   = strategy.position_size < 0 and crossover(close,ema(close,8))

if long_exit_8ema
    exit_price_8ema := low

if short_exit_8ema
    exit_price_8ema := high

// ***********************************************************************************************************************
// position sizing
price = if close[0] > 25000
    25000
else
    price = close[0]

qty = 25000/price

// ***********************************************************************************************************************
// entry
if long_entry
    strategy.entry("BUY", strategy.long, qty, stop=entry_price, comment="BUY @ "+ tostring(entry_price)) 

if short_entry and candle_count < 11
    strategy.entry("SELL", strategy.short, qty, stop=entry_price, comment="SELL @ "+ tostring(entry_price))

if candle_count > entry_distance 
    strategy.cancel("BUY",true)
    strategy.cancel("SELL",true)

// ***********************************************************************************************************************
// exit
if strategy.position_size > 0 and long_exit_8ema
    strategy.exit("EXIT using 8EMA", "BUY", stop=exit_price_8ema, comment="EXIT @ "+ tostring(exit_price_8ema))

if strategy.position_size < 0 and short_exit_8ema
    strategy.exit("EXIT using 8EMA", "SELL", stop=exit_price_8ema, comment="EXIT @ "+ tostring(exit_price_8ema))

// ***********************************************************************************************************************
// plots    
//
// plot BB
[mBBp,uBBp,lBBp] = getBB(0)
p_mBB = plot(show_bb_switch ? mBBp : na, color=color.teal)
p_uBB = plot(show_bb_switch ? uBBp : na, color=color.teal)
p_lBB = plot(show_bb_switch ? lBBp : na, color=color.teal)
fill(p_uBB,p_lBB,color=color.teal,transp=95)

// plot KC
[mKCp,uKCp,lKCp] = getKC(0)
p_uKC = plot(show_kc_switch ? uKCp : na, color=color.red)
p_lKC = plot(show_kc_switch ? lKCp : na, color=color.red)

// plot 8 ema
plot(show_8ema_switch?ema_8:na,color=color.blue)

// plot EMAs
plot(show_emas_switch ? ema_8  : na, color=color.green)
plot(show_emas_switch ? ema_21 : na, color=color.lime)
plot(show_emas_switch ? ema_34 : na, color=color.maroon)
plot(show_emas_switch ? ema_55 : na, color=color.orange)
plot(show_emas_switch ? ema_89 : na, color=color.purple)
```

> Detail

https://www.fmz.com/strategy/431661

> Last Modified

2023-11-10 11:03:25
