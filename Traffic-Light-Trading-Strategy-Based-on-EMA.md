
> Name

Traffic-Light-Trading-Strategy-Based-on-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/159417a56d76df0b6f0.png)


## Overview

This strategy uses 4 EMA lines of different periods to generate trading signals based on their arrangement order, similar to the red, yellow and green traffic light. So it is named “Traffic Light Trading Strategy”. It comprehensively judges the market from both trend and reversal perspectives, aiming to improve the accuracy of trading decisions.  

## Strategy Principle   

1. Set up 3 EMA lines of fast (8 periods), medium (14 periods) and slow (16 periods), plus 1 long-period (100 periods) EMA line as a filter.

2. Determine long and short opportunities based on the order of the 3 EMA lines and their crossover with the filter:

  - When fast line crosses above medium line or medium line crosses above slow line, it is determined as long signal.
  - When medium line crosses below fast line, it is determined as close long signal.

  - When fast line crosses below medium line or medium line crosses below slow line, it is determined as short signal. 
  - When medium line crosses above fast line, it is determined as close short signal.

3. Judge the trend direction and strength through the order of the 3 EMA lines, combined with the crossover between the EMA lines and filter to determine reversal points, which organically incorporates trend following and reversal trading.

## Advantage Analysis   

This strategy integrates the advantages of both trend following and reversal trading, which can grasp market opportunities well. The main advantages are:  

1. Using multiple EMA lines makes the judgment more solid and reduces false signals.
2. Flexible settings for long and short conditions avoid missing trading opportunities.
3. The combination of long-period and short-period EMA lines makes comprehensive judgments.  
4. Customizable profit taking and stop loss allows better risk control.

Through parameter optimization, this strategy can adapt to more products and has demonstrated strong profitability and stability in backtests.

## Risk Analysis

The main risks of this strategy lies in:

1. When the order of the multiple EMA lines becomes messy, it increases the difficulty in judgment and causes hesitation in trading.
2. It cannot effectively filter out the false signals from abnormal market fluctuations, which may cause losses in significant volatility.
3. Improper parameter settings may result in over-relaxed or over-strict stop profit/loss criteria, leading to missing profits or over-losses.  

It is suggested to further improve the stability of the strategy and control risks by optimizing parameters, setting stop loss level, trading cautiously etc.

## Optimization Directions  

The main optimization directions of this strategy:

1. Adjust the cycle parameters of EMA lines to adapt to more products.
2. Add other indicators like MACD, Bollinger Bands etc to increase judgment accuracy. 
3. Optimize profit taking/stop loss proportions to achieve the best balance between risk and return.
4. Add adaptive stop loss mechanisms like ATR Stop Loss to further control downside risk.

Continuous enhancement in stability and profitability of the strategy can be achieved by introducing parameters adjustments and risk control measures in multiple aspects.  

## Conclusion  

This Traffic Light Trading Strategy incorporates trend following and reversal trading by using 4 sets of EMA lines to form trading signals. It has demonstrated strong profitability through parameter optimization to adapt to more products. Going forward, by further strengthening risk control and introducing diversified indicators, it has the potential to become a stable and efficient quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|============ System Conditions ============|
|v_input_2|true|Enable Long Positions|
|v_input_3|true|Enable Short Positions|
|v_input_4|false|============ Indicator Parameters ============|
|v_input_5|8|Fast EMA Length|
|v_input_6|14|Medium EMA Length|
|v_input_7|16|Slow EMA Length|
|v_input_8|100|EMA Filter|
|v_input_9|D|Filter Resolution|
|v_input_10|false|============LONG Profit-Loss Parameters============|
|v_input_11|true|Enable a Profit Level?|
|v_input_12|false|Enable a S.Loss Level?|
|v_input_13|true|Enable a Trailing Stop?|
|v_input_14|40|Take Profit %|
|v_input_15|true|Stop Loss %|
|v_input_16|2|ATR Multiplier|
|v_input_17|14|ATR Length|
|v_input_18|false|============SHORT Profit-Loss Parameters============|
|v_input_19|true|Enable a Profit Level?|
|v_input_20|false|Enable a S.Loss Level?|
|v_input_21|true|Enable a Trailing Stop?|
|v_input_22|30|Take Profit %|
|v_input_23|true|Stop Loss %|
|v_input_24|2|ATR Multiplier|
|v_input_25|14|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © maxits

// 4HS Crypto Market Strategy
// This strategy uses 4 ema to get Long or Short Signals
// Length are: 8, 14, 16, 100
// We take long positions when the order of the emas is the following:
// green > yellow > red (As the color of Traffic Lights) and they are above white ema (Used as a filter for long positions)
  
// We take short positions when the order of the emas is the following:
// green < yellow < red (As the color of inverse Traffic Lights) and they are below white ema (Used as a filter for short positions)

//@version=4
strategy(title="Trafic Lights Strategy",
         shorttitle="TLS",
         overlay=true,
         initial_capital=1000,
         default_qty_value=20,
         default_qty_type=strategy.percent_of_equity,
         commission_value=0.1,
         pyramiding=0
         )

// User Inputs
// i_time         = input(defval = timestamp("28 May 2017 13:30 +0000"), title = "Start Time", type = input.time) //Starting time for Backtesting

sep1           = input(title="============ System Conditions ============", type=input.bool, defval=false)

enable_Long    = input(true, title="Enable Long Positions")   // Enable long  Positions
enable_Short   = input(true, title="Enable Short Positions") // Enable short Positions

sep2           = input(title="============ Indicator Parameters ============", type=input.bool, defval=false)

f_length       = input(title="Fast EMA Length",   type=input.integer, defval=8,   minval=1) 
m_length       = input(title="Medium EMA Length", type=input.integer, defval=14,   minval=1) 
s_length       = input(title="Slow EMA Length",   type=input.integer, defval=16,  minval=1) 
filter_L       = input(title="EMA Filter",        type=input.integer, defval=100, minval=1) 
filterRes      = input(title="Filter Resolution", type=input.resolution, defval="D")        // ema Filter Time Frame

sep3           = input(title="============LONG Profit-Loss Parameters============", type=input.bool, defval=false)

e_Long_TP      = input(true, title="Enable a Profit Level?")
e_Long_SL      = input(false, title="Enable a S.Loss Level?")
e_Long_TS      = input(true, title="Enable a Trailing Stop?")           
long_TP_Input  = input(40.0,   title='Take Profit %',   type=input.float,   minval=0)/100
long_SL_Input  = input(1.0,   title='Stop Loss %',     type=input.float,   minval=0)/100 
atrLongMultip  = input(2.0,   title='ATR Multiplier',  type=input.float,   minval=0.1)   // Parameters to calculate Trailing Stop Loss
atrLongLength  = input(14,    title='ATR Length',      type=input.integer, minval=1)

sep4           = input(title="============SHORT Profit-Loss Parameters============", type=input.bool, defval=false)

e_Short_TP     = input(true, title="Enable a Profit Level?")
e_Short_SL     = input(false, title="Enable a S.Loss Level?")
e_Short_TS     = input(true, title="Enable a Trailing Stop?")
short_TP_Input = input(30.0,   title='Take Profit %',   type=input.float,   minval=0)/100
short_SL_Input = input(1.0,   title='Stop Loss %',     type=input.float,   minval=0)/100
atrShortMultip = input(2.0,   title='ATR Multiplier',  type=input.float,   minval=0.1)
atrShortLength = input(14,    title='ATR Length',      type=input.integer, minval=1)

// Indicators

fema   = ema(close, f_length)
mema   = ema(close, m_length)
sema   = ema(close, s_length)
filter = security(syminfo.tickerid, filterRes, ema(close, filter_L))

plot(fema,   title="Fast EMA",   color=color.new(color.green,  0))
plot(mema,   title="Medi EMA",   color=color.new(color.yellow, 0))
plot(sema,   title="Slow EMA",   color=color.new(color.red,    0))
plot(filter, title="EMA Filter", color=color.new(color.white,  0))

// Entry Conditions

longTrade  = strategy.position_size >  0
shortTrade = strategy.position_size <  0
notInTrade = strategy.position_size == 0
inTrade    = strategy.position_size != 0
priceEntry = strategy.position_avg_price

goLong  = fema > mema and mema > sema and fema > filter and  enable_Long  and (crossover (fema, mema) or crossover (mema, sema) or crossover (sema, filter))
goShort = fema < mema and mema < sema and fema < filter and  enable_Short and (crossunder (fema, mema) or crossunder (mema, sema) or crossunder (sema, filter))

close_L = crossunder(fema, mema)
close_S = crossover (fema, mema)

// Profit and Loss conditions

// Long
 
long_TP = priceEntry * (1 + long_TP_Input)  // Long Position Take Profit Calculation
long_SL = priceEntry * (1 - long_SL_Input)  // Long Position Stop Loss Calculation
atrLong = atr(atrLongLength)                // Long Position ATR Calculation
long_TS = low - atrLong * atrLongMultip

long_T_stop  = 0.0                          // Code for calculating Long Positions Trailing Stop Loss/
long_T_stop := if (longTrade)
    longStop = long_TS
    max(long_T_stop[1], longStop)
else 
    0
    
//Short

short_TP = priceEntry * (1 - short_TP_Input) // Long  Position Take Profit Calculation
short_SL = priceEntry * (1 + short_SL_Input) // Short Position Stop Loss Calculation
atrShort = atr(atrShortLength)               // Short Position ATR Calculation
short_TS = high + atrShort * atrShortMultip

short_T_stop   = 0.0                // Code for calculating Short Positions Trailing Stop Loss/
short_T_stop  := if shortTrade
    shortStop  = short_TS
    min(short_T_stop[1], shortStop)
else 
    9999999

// Strategy Long Entry

if goLong and notInTrade 
    strategy.entry("Go Long", long=strategy.long, comment="Go Long", alert_message="Open Long Position")

if longTrade and close_L
    strategy.close("Go Long", when=close_L, comment="Close Long", alert_message="Close Long Position")
    
if e_Long_TP    // Algorithm for Enabled Long Position Profit Loss Parameters
    if (e_Long_TS and not e_Long_SL)
        strategy.exit("Long TP & TS", "Go Long", limit = long_TP, stop = long_T_stop)
    else
        if (e_Long_SL and not e_Long_TS)
            strategy.exit("Long TP & TS", "Go Long",limit = long_TP, stop = long_SL)
        else 
            strategy.exit("Long TP & TS", "Go Long",limit = long_TP)
else
    if not e_Long_TP 
        if (e_Long_TS and not e_Long_SL)
            strategy.exit("Long TP & TS", "Go Long", stop = long_T_stop)
        else
            if (e_Long_SL and not e_Long_TS)
                strategy.exit("Long TP & TS", "Go Long",stop = long_SL)
    

// Strategy Short Entry

if goShort and notInTrade 
    strategy.entry("Go Short", long=strategy.short, comment="Go Short", alert_message="Open Short Position")

if shortTrade and close_S
    strategy.close("Go Short", comment="Close Short", alert_message="Close Short Position")

if e_Short_TP   // Algorithm for Enabled Short Position Profit Loss Parameters
    if (e_Short_TS and not e_Short_SL)
        strategy.exit("Short TP & TS", "Go Short", limit = short_TP, stop = short_T_stop)
    else
        if (e_Short_SL and not e_Short_TS)
            strategy.exit("Short TP & SL", "Go Short",limit = short_TP, stop = short_SL)
        else 
            strategy.exit("Short TP & TS", "Go Short",limit = short_TP)
else
    if not e_Short_TP 
        if (e_Short_TS and not e_Short_SL)
            strategy.exit("Short TS", "Go Short", stop = short_T_stop)
        else
            if (e_Short_SL and not e_Short_TS)
                strategy.exit("Short SL", "Go Short",stop = short_SL)

// Long  Position Profit and Loss Plotting

plot(longTrade and e_Long_TP  and long_TP                          ? long_TP      : na, title="TP Level", color=color.green, style=plot.style_linebr, linewidth=2)
plot(longTrade and e_Long_SL  and long_SL and not e_Long_TS        ? long_SL      : na, title="SL Level", color=color.red,   style=plot.style_linebr, linewidth=2)
plot(longTrade and e_Long_TS  and long_T_stop and not e_Long_SL    ? long_T_stop  : na, title="TS Level", color=color.red,   style=plot.style_linebr, linewidth=2)

// Short Position Profit and Loss Plotting

plot(shortTrade and e_Short_TP and short_TP                        ? short_TP     : na, title="TP Level", color=color.green, style=plot.style_linebr, linewidth=2)
plot(shortTrade and e_Short_SL and short_SL and not e_Short_TS     ? short_SL     : na, title="SL Level", color=color.red,   style=plot.style_linebr, linewidth=2)
plot(shortTrade and e_Short_TS and short_T_stop and not e_Short_SL ? short_T_stop : na, title="TS Level", color=color.red,   style=plot.style_linebr, linewidth=2)


```

> Detail

https://www.fmz.com/strategy/433122

> Last Modified

2023-11-24 15:46:48
