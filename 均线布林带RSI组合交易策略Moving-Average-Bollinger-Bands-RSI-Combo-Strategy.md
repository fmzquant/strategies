
> Name

均线布林带RSI组合交易策略Moving-Average-Bollinger-Bands-RSI-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过组合运用均线、布林带和RSI指标,对价格趋势和超买超卖现象进行判断,以发现交易机会。该策略汇集多个指标的优势,追求提高交易决策的准确性。

策略原理:

1. 计算均线及其布林带,判断价格中长线走势。

2. 计算RSI指标,判断是否进入超买或超卖状态。

3. 当价格由下向上突破布林带下轨,且RSI出现多头交叉时,做多。

4. 当价格由上向下突破布林带上轨,且RSI出现空头交叉时,做空。

5. 设置止损线,控制单笔损失。

该策略的优势:

1. 多指标组合验证,可减少错误交易概率。

2. RSI指标可补充均线系统的不足。

3. 均线布林带可识别突破点位。

该策略的风险:

1. 多指标组合需要费时进行参数优化。

2. RSI与布林带存在一定程度的重复。

3. 突破交易易形成头部效应,出现反转。

总之,该策略通过组合均线、布林带与RSI指标,在判断趋势的同时识别反转交易机会。组合使用指标可提高效果,但需要关注参数优化问题,控制风险。

||

This strategy combines moving averages, Bollinger Bands and RSI to assess price trends and overbought/oversold levels for trade signals. It harnesses strengths of multiple indicators to improve accuracy.

Strategy Logic:

1. Calculate moving average and Bollinger Bands to determine price trend.

2. Calculate RSI to identify overbought/oversold levels.

3. Enter long when price breaks above BB lower band and RSI bullish crossover. Vice versa for short.

4. Use stop loss to control loss per trade.

Advantages:

1. Multi-indicator verification reduces bad trades.

2. RSI complements limitations of MAs. 

3. BB identifies breakout levels.

Risks:

1. Time-consuming to optimize multiple parameters.

2. Some redundancy between RSI and BBs.

3. Breakouts prone to failures and reversals. 

In summary, this strategy combines MAs, BBs and RSI to identify both trend and reversal trade opportunities. Using multiple indicators can improve results but requires parameter optimization and risk control.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Price source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|6|(?RSI)RSI Length|
|v_input_3|50|RSI Overbough|
|v_input_4|50|RSI Oversold|
|v_input_5|50|RSI Neutral|
|v_input_6|200|(?MABB)MA Length|
|v_input_7|200|BB Length|
|v_input_8|2|BB multiplier|
|v_input_9|0|MA type: SMA|EMA|HMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LucasVivien

//@version=4
strategy("MA Bolinger Bands + RSI ", shorttitle="MABB + RSI", overlay=true)

// User input
source   = input(title="Price source"    , type=input.source  , defval=close)
RSIlen   = input(title="RSI Length"      , type=input.integer , defval=6    , group="RSI") 
RSIlvlOB = input(title="RSI Overbough"   , type=input.integer , defval=50   , group="RSI")
RSIlvlOS = input(title="RSI Oversold"    , type=input.integer , defval=50   , group="RSI")
RSIN     = input(title="RSI Neutral"     , type=input.integer , defval=50   , group="RSI")
MAlen    = input(title="MA Length"       , type=input.integer , defval=200  , group="MABB")
BBlen    = input(title="BB Length"       , type=input.integer , defval=200  , group="MABB")
BBmult   = input(title="BB multiplier"   , type=input.float   , defval=2.0  , group="MABB" , tooltip="Set BB closer / appart", minval=0.001, maxval=50)
MAtype   = input(title="MA type"         , type=input.string  , defval="SMA", group="MABB" , tooltip="MA type used in BB", options=["SMA", "EMA", "HMA"])
//SLmult   = input(title="SL value"        ,type=input.float    , defval=0.06)

// Used indicators 
RSI = rsi(source, RSIlen)
MA  = sma(source, MAlen)

if MAtype == "EMA"
    MA := ema(source, MAlen)
if MAtype == "HMA"
    MA := hma(source, MAlen)

// Perform Calculations
BBdev   = BBmult * stdev(source, BBlen)
BBupper = MA + BBdev
BBlower = MA - BBdev

longSL  = close - close * 0.06
shortSL = close + close * 0.06

// Signals validation ([0] is trade displayed from strategy() on chart => long/short entry)
BBbull      = (open < BBlower) and (close > BBlower)
BBbear      = (open > BBupper) and (close < BBupper)

RSIbull     = crossover(RSI , RSIN)
RSIbear     = crossunder(RSI, RSIN)

Longsignal  = (BBbull) and (RSIbull or RSIbull[1] or
 RSIbull[2] or RSIbull[3] or RSIbull[4] or 
 RSIbull[5] or RSIbull[6] or RSIbull[7] or 
 RSIbull[8] or RSIbull[9] or RSIbull[10])
Shortsignal = (BBbear) and (RSIbear or RSIbear[1] or 
 RSIbear[2] or RSIbear[3] or RSIbear[4] or 
 RSIbear[5] or RSIbear[6] or RSIbear[7] or 
 RSIbear[8] or RSIbear[9] or RSIbear[10])

// Save SL values
var SLlongsaved  = 0.0 
var SLshortsaved = 0.0 
if Longsignal  and (strategy.position_size == -1) ///////////////////////////////
    SLlongsaved  := longSL 
if Shortsignal and (strategy.position_size == 1)  ////////////////////////////////
    SLshortsaved := shortSL

// Plots
  //plotshape(Longsignal , size=size.small, color=color.teal)
  //plotshape(Shortsignal, size=size.small, color=color.fuchsia)
plot(Longsignal  ? longSL  : na, color=color.red, style=plot.style_linebr, linewidth=6)
plot(Shortsignal ? shortSL : na, color=color.red, style=plot.style_linebr, linewidth=6)
p1 = plot(BBupper,title="Bollinger Bands Upper Line", color=color.gray, transp=60)
p2 = plot(BBlower,title="Bollinger Bands Lower Line", color=color.gray, transp=60)
plot(MA, title="Bollinger Bands MA Basis Line" , color=color.white, transp=50)
fill(p1, p2, color=color.white, transp=92)

// Strategy Entry & Exit
  //if Longsignal
strategy.entry(id="Long entry", long=true, when=Longsignal) //, oca_name="x", oca_type=strategy.oca.cancel)
  //if Shortsignal
strategy.entry(id="Short entry", long=false, when=Shortsignal) //, oca_name="x", oca_type=strategy.oca.cancel)
strategy.close(id="Long exit", when=strategy.position_size > 0)//, from_entry="Long entry"  //, when=strategy.position_size > 0 // , stop=SLlongsaved)
strategy.close(id="Short Exit", when=strategy.position_size < 0)//, from_entry="Short entry" //, when=strategy.position_size < 0 //, stop=SLshortsaved)

plot(strategy.position_size) //////////////////////////////////////////////


```

> Detail

https://www.fmz.com/strategy/426557

> Last Modified

2023-09-13 11:57:39
