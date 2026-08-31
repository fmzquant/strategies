
> Name

震荡突破-市场结构转变策略Oscillation-Breakthrough-Market-Structure-Shift-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11bcc59e0fcc084b127.png)

The Oscillation Breakthrough - Market Structure Shift Strategy (ICT_MSS) is a trend following strategy that identifies market structure shifts using the relationships between different timeframes. The strategy uses timeframe relationships as a signal for market structure shifts in order to capture new trend directions.  

## Strategy Logic  

The core logic of this strategy is to use short timeframe downward and upward engulfing patterns as signals for longer timeframe market structure shifts. Specifically, the strategy concurrently monitors a longer timeframe (e.g. 60m bars) and a shorter timeframe (e.g. 15m bars). When a downward engulfing red bar appears on the shorter timeframe while the longer timeframe bar is green, it is determined that a market structure shift has occurred and a long position is taken. When an upward engulfing green bar appears on the shorter timeframe while the longer timeframe bar is red, it is determined that a market structure shift has occurred and a short position is taken.  

After entering a directional position, the strategy utilizes the short timeframe high/low to set a stop loss in order to control risk. When the longer timeframe bar close price hits the take profit level, the strategy will close out the position for profit.

## Advantage Analysis   

The advantages of this strategy are:  

1. Reliable market structure shift signals. Using timeframe relationships avoids being misled by noise from a single timeframe.  

2. Automatically determines new trend direction. Market structure shifts automatically trigger long/short entries without needing manual judgment.   

3. Effective risk control. Short timeframe high/low used for risk control helps limit single trade loss.  

4. Relatively better drawdown control. Using short timeframe extremes for entry and stop loss can help control drawdowns to some extent.   

## Risk Analysis  

The main risks of this strategy are:   

1. Risk of incorrect market structure assessment. Signals may fail when short timeframe noise is high. Timeframe parameters need to be adjusted.   

2. Risk of trend reversal. Strategy struggles to control drawdown during V-shaped reversals. Stop loss algorithm needs to be tweaked.   

3. Parameter mismatch risk. Incorrect long/short timeframe combo leads to poor signal quality and needs optimization testing.  

## Optimization Directions  

Further optimization directions for the strategy include:

1. Add trend filters to avoid incorrect signals during trend reversal.  

2. Optimize timeframe parameter matching to improve signal quality.  

3. Utilize machine learning for optimal take profit/stop loss.   

4. Add supplementary filters like larger timeframe trend.   

5. Expand strategy variants to form strategy ensemble.

## Conclusion  

The ICT_MSS strategy is an overall reliable trend following strategy. It automatically determines new trend direction based on market structure shifts and also has good risk control built in. Next steps are further enhancements around improving signal quality, optimizing exits, and preventing reversals to make it a commercial grade strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|60|Focused Time Frame|
|v_input_timeframe_2|15|Focused Time Frame(LTF)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-28 00:00:00
end: 2023-12-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jl01794

//@version=5
strategy(title="ICT_MSS[PROTOTYPE]", overlay=true, initial_capital=10000, currency="USD", margin_long=15, margin_short=15, max_lines_count=500)


// INPUTS
Time_Frame  = input.timeframe("60", title="Focused Time Frame")
FTF_LTF = input.timeframe("15", title="Focused Time Frame(LTF)")
//

// SECURITY DATA [FOR ONE TIMEFRAME REFERENCE]

FTF_Close = request.security(syminfo.tickerid, Time_Frame, close)
FTF_Open = request.security(syminfo.tickerid, Time_Frame, open)
FTFLTF_High = request.security(syminfo.tickerid, FTF_LTF, ta.highest(2)) 
FTFLTF_Low = request.security(syminfo.tickerid, FTF_LTF, ta.lowest(2)) 
FTFLTF_Close = request.security(syminfo.tickerid, FTF_LTF, close)
FTFLTF_Open = request.security(syminfo.tickerid, FTF_LTF, open)

// TIME BASED CLOSE AND OPEN
_close = FTF_Close
_open = FTF_Open
_LTFclose = FTFLTF_Close
_LTFopen = FTFLTF_Open

// CANDLE STATE
greenCandle = close > open
redCandle = close < open
LTFgreenCandle = FTFLTF_Close > FTFLTF_Open
LTFredCandle = FTFLTF_Close < FTFLTF_Open

// ENGULFING TIMEFRAME REFERENCE
FTF_greenCandle = request.security(syminfo.tickerid, Time_Frame, greenCandle)
FTF_redCandle = request.security(syminfo.tickerid, Time_Frame, redCandle)
FTFLTF_greenCandle = request.security(syminfo.tickerid, FTF_LTF, LTFgreenCandle)
FTFLTF_redCandle = request.security(syminfo.tickerid, FTF_LTF, LTFredCandle)

//--------------------------------------------------------------------------------------------------------------

//ENGULFING_FTF_LTF
B_EnP_mss = FTFLTF_redCandle[1] and        // 1E PIVOT BUY
     FTFLTF_greenCandle
//


B_EnPs_mss = FTFLTF_greenCandle[1] and        // 1E PIVOT SELL
     FTFLTF_redCandle
//  

//--------------------------------------------------------------------------------------------------------------

display_LTF = timeframe.isintraday and timeframe.multiplier <= 15

//--------------------------------------------------------------------------------------------------------------

// STORED DATAS
var float EH_MSS1 = na
var float EL_MSS1 = na
var bool can_draw = false
var line l1_mss = na
var line l1s_mss = na

//--------------------------------------------------------------------------------------------------------------

// MSS BUY
if (B_EnPs_mss) and (display_LTF)                                                 
    EH_MSS1 := FTFLTF_High 
    can_draw := true                                                            
    l1_mss := line.new(bar_index, EH_MSS1, bar_index -3, EH_MSS1, color=color.purple)     
else
    if (can_draw)
        if (FTFLTF_High > EH_MSS1)                                                    
            can_draw := false                                                  
        else
            line.set_x2(l1_mss, bar_index) 
//

// MSS SELL
if (B_EnP_mss) and (display_LTF)                                                 
    EL_MSS1 := FTFLTF_Low 
    can_draw := true                                                            
    l1s_mss := line.new(bar_index, EL_MSS1, bar_index -3, EL_MSS1, color=color.purple)     
else
    if (can_draw)
        if (FTFLTF_Low < EL_MSS1)                                                    
            can_draw := false                                                  
        else
            line.set_x2(l1s_mss, bar_index) 
          

//--------------------------------------------------------------------------------------------------------------

// ORDER

// BUY
longCondition_mssB = B_EnPs_mss and FTFLTF_High and close and high[1]
openOr = FTFLTF_High 

//SELL
shortCondition_mssS = B_EnP_mss and FTFLTF_Low and close and low[1]
openOrs = FTFLTF_Low 


if (longCondition_mssB) 
    strategy.entry("Buy", strategy.long, 1, stop = openOr, when = longCondition_mssB)
//

if (shortCondition_mssS) 
    strategy.entry("Sell", strategy.short, 1, stop = openOrs, when = shortCondition_mssS)
//

// EXIT 
long_tp = open < FTFLTF_Close[1]
short_tp = open > FTFLTF_Close[1]

//if (long_tp)
    //strategy.close("Buy", qty_percent = 100, when = long_tp)
//

//if (short_tp)
    //strategy.close("Sell", qty_percent = 100, when = short_tp)
//
```

> Detail

https://www.fmz.com/strategy/434333

> Last Modified

2023-12-05 15:17:01
