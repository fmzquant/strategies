
> Name

Consecutive-Candlestick-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is based on a classic short-term trading idea - going short after consecutive bullish candlesticks and going long after consecutive bearish candlesticks. Specifically, this strategy detects the body height and color of candlesticks to determine the occurrence of consecutive candlesticks with the same color, and then uses the RVI indicator to determine if a reversal should take place. Overall, this is a strategy that combines candlestick patterns and the RVI indicator to implement short-term reversal trading. It aims to capture reversal opportunities when abnormal short-term price behaviors occur.

## Strategy Logic

The core logic of this strategy includes:

1. Check if the candlestick body height exceeds the minimum threshold to filter out insignificant bullish/bearish moves. 

2. Determine if the previous two candlesticks have the same color, which may indicate a potential short-term reversal.

3. If the current candlestick has a different color than the previous two, a trading signal is generated. I.e. go long after two bearish candlesticks and one bullish, go short after two bullish candlesticks and one bearish.

4. After entering a trade, the crossovers of RVI line and signal line are used to determine exit positions. The RVI indicator can identify short-term reversals.

5. In summary, this strategy combines candlestick patterns and the RVI indicator to create a short-term mean reversion system, capturing profitable reversals from abnormal short-term price behaviors.

## Advantage Analysis

The main advantages of this strategy include:

1. Capturing short-term price anomalies. Consecutive candlesticks of the same color often indicate anomalies ready for reversals.

2. RVI indicator assists reversal determinations, complementing candlestick patterns for more stable signals. 

3. Relatively high trading frequency for short-term trading. Consecutive same-color candlesticks occur frequently, enabling ample trading opportunities.

4. Controllable risks from fixed trade size and stop loss/profit taking. 

5. Simple and clear logic that is easy to understand and implement for live trading.

## Risk Analysis

Some risks to note:

1. Short-term reversals are not guaranteed during strong trends when signals may fail.

2. RVI may generate incorrect signals in special market conditions.

3. Inadequate stop loss setting could lead to large losses.

4. Consecutive candlestick criteria is too rigid. Consider optimizing to required percentage of same color candles within N periods.

5. Fixed trade size cannot control overall position risks. Larger sizes risk account blowup. 

## Optimization Directions

Some ways to further optimize the strategy:

1. Optimize consecutive candlestick logic using statistics rather than fixed periods. 

2. Optimize RVI parameters to find best combinations.

3. Add trailing stop loss based on market volatility.

4. Add position sizing based on account usage.

5. Add more filters like channels, trends to improve system stability.

6. Parameter tuning for different products.

7. Machine learning on historical data to dynamically optimize parameters.

## Summary

In summary, this is a typical short-term mean reversion strategy based on candlestick patterns and RVI. It has advantages but also risks. Further optimizations on parameters and robustness can improve its stability and profitability. However, no strategy eliminates losses entirely. Traders must stay disciplined in risk management.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|42|Minimum body height|
|v_input_3|55|RVI period|
|v_input_4|false|Custom Backtesting Dates|
|v_input_5|2011|Backtest Start Year|
|v_input_6|10|Backtest Start Month|
|v_input_7|7|Backtest Start Day|
|v_input_8|false|Backtest Start Hour|
|v_input_9|2018|Backtest Stop Year|
|v_input_10|12|Backtest Stop Month|
|v_input_11|31|Backtest Stop Day|
|v_input_12|23|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-07 00:00:00
end: 2023-10-07 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//This is part of a series of strategies developed automatically by a online software. I cannot share the site url, which is not related to me in any way, because it is against the TV reules.
//
//This strategy was optimized for GBPUSD, timeframe 1D, fixed lots 0.1, initial balance 1000€
//LOGIC:
//- LONG ENTRY when previous candle is bear
//- LONG EXIT: RVI > signal line
//- SHORT ENTRY when previous candle is bull
//- SHORT EXIT: RVI <  signal line
//
//NOTE: I considered the open of actual candle instead of close otherwise there will be a back shift of 1 candle in pine script
//
//Take profit = no
//Stop loss = no

// strategy("Expert studio strategy 1 - GBPUSD", overlay=false, precision=6, initial_capital=1000,calc_on_every_tick=true, pyramiding=0, default_qty_type=strategy.fixed, default_qty_value=10000, currency=currency.EUR)

//INPUTS
src = input(close, "source")
min_body_height = input(42, "Minimum body height", type=input.float)
//bars_back=input(2, "Consecutive bars of same color")
rvi_period = input(55, "RVI period")

//CALCULATIONS_____________________________
//candle color
body_height = abs(open - close) / syminfo.mintick
body_color = open > close ? color.red : color.green

//da migliorare for i=0 to bars_back-1

//RVI -------- thanks to hecate
p = rvi_period

CO = close - open
HL = high - low

value1 = (CO + 2 * CO[1] + 2 * CO[2] + CO[3]) / 6
value2 = (HL + 2 * HL[1] + 2 * HL[2] + HL[3]) / 6

num = sum(value1, p)
denom = sum(value2, p)

RVI = denom != 0 ? num / denom : 0

RVIsig = (RVI + 2 * RVI[1] + 2 * RVI[2] + RVI[3]) / 6

plot(RVI, color=color.green, style=plot.style_line, linewidth=1)
plot(RVIsig, color=color.red, style=plot.style_line, linewidth=1)

//----------------------------------

longCondition = body_height[1] >= min_body_height and body_color[1] == color.red and 
   body_height[0] >= min_body_height and body_color[0] == color.red and 
   RVIsig > RVI
exitLong = RVI > RVIsig

shortCondition = body_height[1] >= min_body_height and body_color[1] == color.green and 
   body_height[0] >= min_body_height and body_color[0] == color.green and 
   RVIsig < RVI
exitShort = RVI < RVIsig

if longCondition and strategy.opentrades == 0
    strategy.entry("Long", strategy.long)

strategy.close("Long", when=exitLong)

if shortCondition and strategy.opentrades == 0
    strategy.entry("Short", strategy.short)

strategy.close("Short", when=exitShort)

// === Backtesting Dates === thanks to Trost

testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2011, "Backtest Start Year")
testStartMonth = input(10, "Backtest Start Month")
testStartDay = input(7, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, testStartHour, 0)
testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testStopHour = input(23, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, testStopHour, 0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
testPeriod_1 = testPeriod()
isPeriod = testPeriodSwitch == true ? testPeriod_1 : true
// === /END

if not isPeriod
    strategy.cancel_all()
    strategy.close_all()




```

> Detail

https://www.fmz.com/strategy/428691

> Last Modified

2023-10-08 13:56:39
