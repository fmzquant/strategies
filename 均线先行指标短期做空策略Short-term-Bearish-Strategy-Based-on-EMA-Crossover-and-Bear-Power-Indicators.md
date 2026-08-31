
> Name

均线先行指标短期做空策略Short-term-Bearish-Strategy-Based-on-EMA-Crossover-and-Bear-Power-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9d32367073d93d7443.png)



## Overview

This strategy combines the EMA crossover indicator and the bear power indicator to generate short-term bearish signals. The EMA crossover judges the trend while the bear power pinpoints the short selling timing. The strategy is suitable for short-term trading to catch market corrections.

## Strategy Logic

1. EMA Crossover: Calculates the 2/20 period exponential moving average (EMA) and generates sell signals when price is below EMA. 

2. Bear Power: Calculates the difference between the closing price and opening price of the day as the "power value". Power value greater than the sell threshold gives bearish signal (-1 for short); power value lower than the buy threshold gives bullish signal (1 for long); otherwise 0 for neutral.

3. Combining the two indicators, short signal is generated when EMA crossover <0 and bear power <-1. 

4. The strategy opens short based on the sell signal and closes position based on the exit signal. The reverse parameter can switch the long/short directions.

## Advantages

1. EMA crossover can predict trend reversal points in advance.

2. Bear power captures short-selling opportunities during strong intraday drops.

3. Combining two indicators helps filter false breakouts and identify stronger bearish momentum. 

4. Flexible parameters suit different products and market environments. 

5. Reversal function adapts to two-way markets.

## Risks

1. EMA crossover may lag behind the optimal turning points.

2. Bear power may generate false signals during range-bound consolidations.

3. It fails to determine medium-long term trends, with risk of being trapped.

4. Parameter tuning required as inappropriate settings like overly short EMA period or too high sell threshold could increase false signals.

5. Pay attention to key economic events to avoid planned trading sessions.

## Enhancement

1. Consider adding stop loss to limit per trade loss.

2. Add filters like momentum indicators to avoid weak bearish signals.

3. Add longer period EMAs to determine major trend direction and avoid counter-trend trades. 

4. Optimize parameters like adaptive EMA period and dynamic sell threshold.

5. Consider combining multiple timeframes to incorporate short, medium and long-term indicators.

## Conclusion

This strategy first uses EMA crossover to determine the major trend and reversal points, then captures strong intraday sell-off opportunities using the bear power indicator, forming a robust short-term bearish strategy. The advantages lie in its simplicity, flexibility to adapt to different market environments, and ability to reverse long/short directions. However, risks like missing optimal points and generating false signals remain. Further improvements on parameter optimization, adding filters and stop loss could help enhance the strategy stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_float_1|10|(?●═════ Bear Power ═════●)SellLevel|
|v_input_float_2|true|BuyLevel|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_2|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_3|true|From Month|
|v_input_int_4|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
//  Bear Power Indicator
//  To get more information please see "Bull And Bear Balance Indicator" 
//  by Vadim Gimelfarb. 
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


BP(SellLevel,BuyLevel) =>
    pos = 0.0
    value =  close < open  ?  
                 close[1] > open ?  math.max(close - open, high - low): high - low: 
                     close > open ? 
                         close[1] > open ? math.max(close[1] - low, high - close): math.max(open - low, high - close): 
                             high - close > close - low ? 
                                 close[1] > open ? math.max(close[1] - open, high - low) : high - low : 
                                  high - close < close - low ? 
                                   close > open ? math.max(close - low, high - close) : open - low : 
                                      close > open ? math.max(close[1] - open, high - close) :
                                       close[1] < open ? math.max(open - low, high - close) : high - low
    pos := value > SellLevel ? -1 :
    	     value <= BuyLevel ? 1 :nz(pos[1], 0) 

    pos

strategy(title='Combo 2/20 EMA & Bear Power', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ Bear Power ═════●'
SellLevel = input.float(10, step=0.01, group=I2)
BuyLevel = input.float(1, step=0.01, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosBP = BP(SellLevel,BuyLevel)
iff_1 = posEMA20 == -1 and prePosBP == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosBP == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/429466

> Last Modified

2023-10-17 14:00:41
