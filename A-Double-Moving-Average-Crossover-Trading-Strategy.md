
> Name

A-Double-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b961dc2bfdea957d30.png)

## Overview  

This strategy generates buy and sell signals based on the crossover of two moving averages with different parameter settings. When the shorter period moving average crosses above the longer period moving average from below, a buy signal is generated. When the shorter period moving average crosses below the longer period moving average from above, a sell signal is generated.  

## Strategy Logic

The strategy is written in Pine script. It first defines two moving averages, named p1 and p2, with customizable type, length and price source through input. Here p1 represents the shorter period MA and p2 represents the longer period MA.  

The crossover and crossunder functions are used to detect the crossover between the two MAs. When p1 crosses over p2 from below, a buy signal is generated. When p1 crosses under p2 from above, a sell signal is generated.

To execute trades, the strategy enters long or short positions using strategy.entry when signals are triggered. If the shortOnly input is enabled, only sell signals will be traded.

## Advantage Analysis

The advantages of this strategy include:

1. Clear rules, easy to understand and implement  
2. MA crossover is a classical and widely known trading signal
3. Highly customizable MA types, lengths and price sources
4. Can trade only sell signals to lower trade frequency

## Risk Analysis  

There are also some risks with this strategy:

1. Multiple invalid crosses may happen during choppy markets, leading to over-trading. 
2. Parameters need optimization for different products and timeframes.
3. Unable to determine trend direction, may trade against the trend.

Risks can be lowered by adjusting MA lengths, adding filter conditions etc. Trend indicators can also be added to determine market bias.

## Enhancement Opportunities

The strategy can be enhanced from the following aspects:

1. Use VWAP or typical price as price source to make crossover signals more reliable.

2. Add a Validation Period to avoid short-term wrong crosses.  

3. Incorporate ATR stops based on maximum acceptable loss according to market volatility.

4. Parameter optimization through curve fitting to find optimum combinations.

5. Only consider signals along the direction of higher timeframe trends.

## Summary   

The double MA crossover strategy is easy to understand and implement, generating trade signals from two MA crossovers with high customizability. But it may also produce excessive invalid signals during choppy markets. Risks can be lowered through parameter and logic optimization with ample enhancement opportunities, worth further research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|MA Type 1: SMA|EMA|WMA|HMA|VWMA|RMA|TEMA|
|v_input_2|10|Length 1|
|v_input_3_close|0|Source 1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|0|MA Type 2: SMA|EMA|WMA|HMA|VWMA|RMA|TEMA|
|v_input_5|50|Length 2|
|v_input_6_close|0|Source 2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|false|Short only|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelPiccolo

//@version=4
strategy("Double MA Cross", overlay=true)

type1 = input("SMA", "MA Type 1", options=["SMA", "EMA", "WMA", "HMA", "VWMA", "RMA", "TEMA"])
len1 = input(10, minval=1, title="Length 1")
src1 = input(close, "Source 1", type=input.source)

type2 = input("SMA", "MA Type 2", options=["SMA", "EMA", "WMA", "HMA", "VWMA", "RMA", "TEMA"])
len2 = input(50, minval=2, title="Length 2")
src2 = input(close, "Source 2", type=input.source)

shortOnly = input(false, "Short only")

tema(src, len)=>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    return = 3 * (ema1 - ema2) + ema3

getPoint(type, len, src)=>
    return = type == "SMA" ? sma(src, len) : type == "EMA" ? ema(src, len) : type == "WMA" ? wma(src, len) : type == "HMA" ? hma(src, len) : type == "VWMA" ? vwma(src, len) : type == "RMA" ? rma(src, len) : tema(src, len)

p1 = getPoint(type1, len1, src1)
p2 = getPoint(type2, len2, src2)

shortCondition = crossunder(p1, p2)
longCondition = crossover(p1, p2)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (longCondition)
    if (shortOnly)
        strategy.close("Short")
    else
        strategy.entry("Long", strategy.long)

plot(p1, "MA 1", p1 < p2 ? color.red : color.green)
plot(p2, "MA 2", color.blue)

```

> Detail

https://www.fmz.com/strategy/433425

> Last Modified

2023-11-27 15:32:57
