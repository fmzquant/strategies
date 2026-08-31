
> Name

动量随机平滑移动平均策略Stochastic-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17ad863810e29fd427a.png)

## Overview

This strategy combines Exponential Moving Average (EMA) with Stochastic Oscillator in a trend following and continuation manner, along with some cool functionalities. I designed this strategy especially for trading altcoins, but it works just as good on Bitcoin itself and some Forex pairs.  

## Strategy Logic

The strategy has 4 mandatory conditions to unlock a trading signal. Find these conditions for a long trade below (works the exact other way round for shorts)
-	Fast EMA must be higher than Slow EMA  
-   Stochastic K% line must be in overbought territory
-	Stochastic K% line must cross over Stochastic D% line
-	Price as to close between slow EMA and fast EMA
Once all the conditions are true, a trade will start at the opening of the next candle.

## Advantage Analysis 

The strategy combines the advantages of EMA and Stochastic to effectively capture the start and continuation of trends, suitable for medium and long term operations. At the same time, the strategy provides many customizable parameters for users to adjust based on their trading style and market characteristics.

Specifically, the advantages of the strategy include:

1. EMA crossings judge trend direction and enhance signal stability and reliability
2. Stochastic judges overbought and oversold levels to find reversal opportunities 
3. Combining two indicators, it has both trend following and mean reversion 
4. ATR automatically calculates stop loss distance, adjusting stops based on market volatility
5. Customizable risk reward ratio to meet needs of different users
6. Provides multiple customizable parameters for users to adjust based on markets

## Risk Analysis

The main risks of this strategy come from:

1. EMA crossings may have false breaks, thus generating incorrect signals
2. Stochastic itself has lagging properties, may miss best timing for price reversals
3. A single strategy cannot fully adapt to constantly changing market environments

To mitigate above risks, we can take following measures:

1. Adjust EMA period parameters to avoid too many false signals
2. Incorporate more indicators to judge trends and support levels to ensure reliable signals  
3. Define clear money management strategies to control risk exposure per trade
4. Adopt combinational strategies so different strategies can verify signals and improve stability

## Optimization Directions 

The strategy can be further optimized in following aspects:

1. Add volatility based position adjustment module. Reduce size when volatility surges and increase when calms down.
2. Add judgement of higher timeframe trends to avoid counter trend operations, e.g. combining daily or weekly trends.
3. Add machine learning models to aid signal generation. Train classification models based on historical data.  
4. Optimize money management modules to make stops and sizes more intelligent.

## Conclusion

This strategy integrates the pros of both trend following and mean reversion, considering both higher timeframe market environments and current price behaviors. It is an effective strategy worth real time tracking and testing. Through continuous optimization on parameters, adding trend judgement modules etc, there is still large room for performance improvement, worth pouring in more research efforts.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?     Trade Setup)Long Trades|
|v_input_bool_2|true|Short Trades|
|v_input_float_1|true|Risk : Reward|
|v_input_bool_3|false|Risk = % Equity    |
|v_input_float_2|true|riskPrctEqui|
|v_input_bool_4|false|Risk = $ Amount   |
|v_input_float_3|1000|riskUSD|
|v_input_float_4|true|(?     Stop Loss)ATR Multiplier|
|v_input_int_1|14|ATR Lookback|
|v_input_int_2|14|(?     Stochastic)K%|
|v_input_int_3|3| D%|
|v_input_int_4|80|OB|
|v_input_int_5|20| OS|
|v_input_int_6|false|Stoch. OB/OS lookback|
|v_input_bool_5|false|All must be OB/OS|
|v_input_color_1|#00ffff|   |
|v_input_color_2|#333333|  |
|v_input_int_7|50|   |
|v_input_int_8|21|(?     Exp. Moving Average)Fast EMA     |
|v_input_int_9|50|Slow EMA     |
|v_input_color_3|#0066ff|     |
|v_input_color_4|#0000ff|     |
|v_input_bool_6|false|(?     Reference Market)Reference Market Filter|
|v_input_1|BTC_USDT:swap|Market|
|v_input_timeframe_1|30|Timeframe|
|v_input_int_10|50|EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-12-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LucasVivien

// Since this Strategy may have its stop loss hit within the opening candle, consider turning on 'Recalculate : After Order is filled' in the strategy settings, in the "Properties" tabs

//@version=5
strategy("Stochastic Moving Average", shorttitle="Stoch. EMA", overlay=true, default_qty_type= strategy.cash, initial_capital=10000, default_qty_value=100)

//==============================================================================
//==============================   USER INPUT   ================================
//==============================================================================

var g_tradeSetup = "     Trade Setup"
activateLongs  = input.bool (title="Long Trades"        , defval=true                                       , inline="A1", group=g_tradeSetup, tooltip="")
activateShorts = input.bool (title="Short Trades"       , defval=true                                       , inline="A1", group=g_tradeSetup, tooltip="")
rr             = input.float(title="Risk : Reward"      , defval=1   , minval=0, maxval=100       , step=0.1, inline=""  , group=g_tradeSetup, tooltip="")
RiskEquity     = input.bool (title="Risk = % Equity    ", defval=false                                      , inline="A2", group=g_tradeSetup, tooltip="Set stop loss size as a percentage of 'Initial Capital' -> Strategy Parameter -> Properties tab (Low liquidity markets will affect will prevent to get an exact amount du to gaps)")
riskPrctEqui   = input.float(title=""                   , defval=1   , minval=0, maxval=100       , step=0.1, inline="A2", group=g_tradeSetup, tooltip="")
RiskUSD        = input.bool (title="Risk = $ Amount   " , defval=false                                      , inline="A3", group=g_tradeSetup, tooltip="Set stop loss size as a fixed Base currency amount (Low liquidity markets will affect will prevent to get an exact amount du to gaps)")
riskUSD        = input.float(title=""                   , defval=1000, minval=0, maxval=1000000000, step=100, inline="A3", group=g_tradeSetup, tooltip="")

var g_stopLoss = "     Stop Loss"
atrMult = input.float(title="ATR Multiplier", defval=1 , minval=0, maxval=100 , step=0.1, tooltip="", inline="", group=g_stopLoss)
atrLen  = input.int  (title="ATR Lookback"  , defval=14, minval=0, maxval=1000, step=1  , tooltip="", inline="", group=g_stopLoss)

var g_stochastic = "     Stochastic"
Klen            = input.int  (title="K%"                   , defval=14, minval=0, maxval=1000, step=1, inline="S2", group=g_stochastic, tooltip="")
Dlen            = input.int  (title=" D%"                  , defval=3 , minval=0, maxval=1000, step=1, inline="S2", group=g_stochastic, tooltip="")
OBstochLvl      = input.int  (title="OB"                   , defval=80, minval=0, maxval=100 , step=1, inline="S1", group=g_stochastic, tooltip="")
OSstochLvl      = input.int  (title=" OS"                  , defval=20, minval=0, maxval=100 , step=1, inline="S1", group=g_stochastic, tooltip="")
OBOSlookback    = input.int  (title="Stoch. OB/OS lookback", defval=0 , minval=0, maxval=100 , step=1, inline=""  , group=g_stochastic, tooltip="This option allow to look 'x' bars back for a value of the Stochastic K line to be overbought or oversold when detecting an entry signal (if 0, looks only at current bar. if 1, looks at current and previous and so on)")
OBOSlookbackAll = input.bool (title="All must be OB/OS"    , defval=false                            , inline=""  , group=g_stochastic, tooltip="If turned on, all bars within the Stochastic K line lookback period must be overbought or oversold to return a true signal")
entryColor      = input.color(title="   "                  , defval=#00ffff                          , inline="S3", group=g_stochastic, tooltip="")
baseColor       = input.color(title="  "                   , defval=#333333                          , inline="S3", group=g_stochastic, tooltip="Will trun to designated color when stochastic gets to opposite extrem zone of current trend / Number = transparency")
transp          = input.int  (title="   "                  , defval=50, minval=0, maxval=100, step=10, inline="S3", group=g_stochastic, tooltip="")

var g_ema = "     Exp. Moving Average"
ema1len = input.int  (title="Fast EMA     ", defval=21, minval=0, maxval=1000, step=1, inline="E1", group=g_ema, tooltip="")
ema2len = input.int  (title="Slow EMA     ", defval=50, minval=0, maxval=1000, step=1, inline="E2", group=g_ema, tooltip="")
ema1col = input.color(title="     "        , defval=#0066ff                          , inline="E1", group=g_ema, tooltip="")
ema2col = input.color(title="     "        , defval=#0000ff                          , inline="E2", group=g_ema, tooltip="")

var g_referenceMarket ="     Reference Market"
refMfilter = input.bool     (title="Reference Market Filter", defval=false            , inline="", group=g_referenceMarket)
market     = input   (title="Market"                 , defval="BTC_USDT:swap", inline="", group=g_referenceMarket)
res        = input.timeframe(title="Timeframe"              , defval="30"             , inline="", group=g_referenceMarket)
len        = input.int      (title="EMA Length"             , defval=50               , inline="", group=g_referenceMarket)


//==============================================================================
//==========================   FILTERS & SIGNALS   =============================
//==============================================================================

//------------------------------   Stochastic   --------------------------------
K = ta.stoch(close, high, low, Klen)
D = ta.sma(K, Dlen)
stochBullCross = ta.crossover(K, D)
stochBearCross = ta.crossover(D, K)
OSstoch = false
OBstoch = false
for i = 0 to OBOSlookback
    if K[i] < OSstochLvl
        OSstoch := true
    else 
        if OBOSlookbackAll
            OSstoch := false
for i = 0 to OBOSlookback
    if K[i] > OBstochLvl
        OBstoch := true
    else 
        if OBOSlookbackAll
            OBstoch := false

//----------------------------   Moving Averages   -----------------------------
ema1 = ta.ema(close, ema1len)
ema2 = ta.ema(close, ema2len)
emaBull = ema1 > ema2
emaBear = ema1 < ema2

//----------------------------   Price source   --------------------------------
bullRetraceZone = (close < ema1 and close >= ema2) 
bearRetraceZone = (close > ema1 and close <= ema2)

//---------------------------   Reference market   -----------------------------
ema      = ta.ema(close, len)
emaHTF   = request.security(market, res, ema  [barstate.isconfirmed ? 0 : 1])
closeHTF = request.security(market, res, close[barstate.isconfirmed ? 0 : 1])

bullRefMarket = (closeHTF > emaHTF or closeHTF[1] > emaHTF[1])
bearRefMarket = (closeHTF < emaHTF or closeHTF[1] < emaHTF[1])

//--------------------------   SIGNAL VALIDATION   -----------------------------
validLong  = stochBullCross and OSstoch and emaBull and bullRetraceZone 
 and activateLongs  and (refMfilter ? bullRefMarket : true) and strategy.position_size == 0
validShort = stochBearCross and OBstoch and emaBear and bearRetraceZone 
 and activateShorts and (refMfilter ? bearRefMarket : true) and strategy.position_size == 0


//==============================================================================
//===========================   STOPS & TARGETS   ==============================
//==============================================================================

SLdist      = ta.atr(atrLen) * atrMult
longSL      = close - SLdist
longSLDist  = close - longSL
longTP      = close + (longSLDist * rr)
shortSL     = close + SLdist
shortSLDist = shortSL - close
shortTP     = close - (shortSLDist * rr)
var SLsaved = 0.0
var TPsaved = 0.0
if validLong or validShort
    SLsaved := validLong ? longSL : validShort ? shortSL : na
    TPsaved := validLong ? longTP : validShort ? shortTP : na


//==============================================================================
//==========================   STRATEGY COMMANDS   =============================
//==============================================================================
 
if validLong 
    strategy.entry("Long", strategy.long, 
     qty = RiskEquity ? ((riskPrctEqui/100)*strategy.equity)/longSLDist : RiskUSD ? riskUSD/longSLDist : na)
if validShort 
    strategy.entry("Short", strategy.short, 
     qty = RiskEquity ? ((riskPrctEqui/100)*strategy.equity)/shortSLDist  : RiskUSD ? riskUSD/shortSLDist : na)

strategy.exit(id="Long Exit" , from_entry="Long" , limit=TPsaved, stop=SLsaved, when=strategy.position_size > 0)
strategy.exit(id="Short Exit", from_entry="Short", limit=TPsaved, stop=SLsaved, when=strategy.position_size < 0)


//==============================================================================
//=============================   CHART PLOTS   ================================
//==============================================================================
    
//----------------------------   Stops & Targets   -----------------------------
plot(strategy.position_size != 0 or (strategy.position_size[1] != 0 and strategy.position_size == 0) ? SLsaved : na,
 color=color.red  , style=plot.style_linebr)
plot(strategy.position_size != 0 or (strategy.position_size[1] != 0 and strategy.position_size == 0) ? TPsaved : na,
 color=color.green, style=plot.style_linebr) 

//---------------------------------   EMAs   -----------------------------------
l1 = plot(ema1, color=#0066ff, linewidth=2)
l2 = plot(ema2, color=#0000ff, linewidth=2)

//--------------------------   Stochastic gradient   ---------------------------
// fill(l1, l2, color.new(color.from_gradient(K, OSstochLvl, OBstochLvl,
//  emaBull ? entryColor : emaBear ? baseColor : na, 
//  emaBull ? baseColor  : emaBear ? entryColor : na), transp))
    
//----------------------------   Trading Signals   -----------------------------
plotshape(validLong, color=color.green, location=location.belowbar, style=shape.xcross, size=size.small)
plotshape(validShort, color=color.red , location=location.abovebar, style=shape.xcross, size=size.small)

//----------------------------   Reference Market   ----------------------------
bgcolor(bullRefMarket and refMfilter ? color.new(color.green,90) : na)
bgcolor(bearRefMarket and refMfilter ? color.new(color.red  ,90) : na)


```

> Detail

https://www.fmz.com/strategy/435848

> Last Modified

2023-12-19 11:41:40
