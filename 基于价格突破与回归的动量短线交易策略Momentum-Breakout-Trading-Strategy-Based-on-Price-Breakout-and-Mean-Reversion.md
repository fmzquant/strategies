
> Name

基于价格突破与回归的动量短线交易策略Momentum-Breakout-Trading-Strategy-Based-on-Price-Breakout-and-Mean-Reversion

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1899c7f9f996e07acc5.png)


## Overview

This strategy combines price breakout and mean reversion to determine and track trends. It uses multiple indicators for confirmation and filtration. The strategy is suitable for short-term and medium-term trading by locking in small profits through strict entry and exit mechanisms.

## Strategy Logic

1. Use HMA as the baseline to determine the price trend direction. Price above HMA indicates upward trend, price below HMA indicates downward trend.

2. SSL Channel serves as the confirmation indicator by confirming the trend based on the price relationship with the channel direction.

3. TDFI as the momentum indicator to gauge the strength. Trade entry is allowed only when momentum reaches a certain level.

4. RVI indicator serves as the exit indicator. Trend exhaustion when RVI line shape changes.

5. ATR calculates stop loss and take profit. 

6. Entry conditions: Price breaks through baseline, SSL channel direction aligns with price, TDFI reaches threshold.

7. Exit conditions: RVI line shape change, price break back through baseline and SSL channel.

## Advantage Analysis

1. Combining multiple indicators helps filter out false breakouts effectively.

2. Strict entry conditions and stop loss exit control single loss.

3. Take full advantage of price trends to obtain excess returns.

4. Large optimization space for indicator parameters, adaptable to different products and timeframes.

## Risk Analysis  

1. Unable to identify trend reversal, risks of overtrading by chasing highs/lows.

2. Short-term operations, risks of overtrading.

3. Subjective influence in stop loss level setting, may be too loose or too tight.

4. Improper parameter settings may lead to too frequent or insufficient trades.

## Optimization Directions

1. Add trend judgment indicators to ensure accuracy in determining trend direction.

2. Incorporate reversal signal indicators to reduce probability of chasing highs/lows.

3. Consider dynamic adjustment of ATR to ATR Trailing Stop for more dynamic stop loss.

4. Test different MA systems to find parameter optimization directions.  

5. Optimize parameters for specific trading products.

## Conclusion

This strategy achieves precision in trading signals through multi-indicator confirmation. Strict stop loss mechanism controls single loss. It suits people familiar with technical analysis operations. Parameters can be adjusted for different market cycles. Overall, the strategy has positive expected benefit and return, but risks of incorrect trend judgment and overtrading should be noted.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Length|
|v_input_2|1.5|SL|
|v_input_3|true|TP|
|v_input_4|20|hmaslowlength|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|10|SSL Period|
|v_input_7|4|TDFI Lookback|
|v_input_8|0.05|Filter High|
|v_input_9|-0.05|Filter Low|
|v_input_10|4|RVI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-06 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Designed per No Nonsense Forex VP rules
//Made to be as modular as possible, so we can swap the indicators in and out.
//Originated from causecelebre
//Tried to put in as much VP rules as possible

///////////////////////////////////////////////////
//Rules Implemented:
///////////////////////////////////////////////////
// - SL 1.5 x ATR
// - TP 1 x ATR
//
// - Entry conditions
//// - Entry within 1 candles of baseline + 1 x confirmation + volume
//// - Entry only if baseline is < 1 x ATR
// - Exit conditions
//// - Exit on exit indicator or when baseline or confirmation flip 

///////////////////////////////////////////////////
//Trades entries
///////////////////////////////////////////////////
// - First entry L1 or S1 with standard SL and TP
// - Second entry L2 or S2 with standard SL and exit upon the exit conditions

///////////////////////////////////////////////////
//Included Indicators and settings
///////////////////////////////////////////////////
// - Baseline = HMA 20
// - Confirmtion = SSL 10
// - Volume = TDFI 4
// - Exit = RVI 4

///////////////////////////////////////////////////
//Credits
// Strategy causecelebre https://www.tradingview.com/u/causecelebre/
// TDFI causecelebre https://www.tradingview.com/u/causecelebre/
// SSL Channel ErwinBeckers https://www.tradingview.com/u/ErwinBeckers/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

strategy(title="NNFX Strategy | jh", overlay = true )

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Set the main stuff  ****
///////////////////////////////////////////////////

//Price
price = close

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ATR stuff
///////////////////////////////////////////////////

atrLength = input(14, "ATR Length")
slMultiplier = input(1.5, "SL")
tpMultiplier = input(1, "TP")
atr = atr(atrLength)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Baseline ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//HMA 20
///////////////////////////////////////////////////

hmaslowlength = input(20, minval=1)
src = input(close, title="Source")
slowhullma = wma(2*wma(src, hmaslowlength/2)-wma(src, hmaslowlength), round(sqrt(hmaslowlength)))
plot(slowhullma, title = "baseline", color = yellow, linewidth=2, transp=0)

///////////////////////////////////////////////////
// Base Signals
///////////////////////////////////////////////////

///////////////////////////////////////////////////
baseline = slowhullma

//Signals based on crossover
//baseShort = crossover(baseLine, price)
//baseLong = crossover(price, baseLine)

//Signals based on signal position
b_Short = baseline > price ? 1 : 0
l_Long = baseline < price ? 1 : 0

baseShort = b_Short
baseLong = l_Long

///////////////////////////////////////////////////
//ATR Check
///////////////////////////////////////////////////

distBasefromPrice = abs(baseline - price)
atrCheck = distBasefromPrice <= atr ? 1 : 0

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Confirmation ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//SSL Channel
///////////////////////////////////////////////////

sslLen=input(title="SSL Period", defval=10)
smaHigh=sma(high, sslLen)
smaLow=sma(low, sslLen)
Hlv = na
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh: smaLow
sslUp   = Hlv < 0 ? smaLow : smaHigh

///////////////////////////////////////////////////
//Confirm Signals
///////////////////////////////////////////////////

c_Up = sslUp
c_Down = sslDown

//Signals based on crossover
c_Long = crossover(c_Up, c_Down)
c_Short = crossover(c_Down, c_Up)

confirmLong = c_Long
confirmShort = c_Short

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  **** Volume Indicator Start ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//TDFI
///////////////////////////////////////////////////

lookback = input(4, title = "TDFI Lookback") 
filterHigh = input(0.05, title = "Filter High") 
filterLow = input(-0.05, title = "Filter Low") 

mma = ema(price * 1000, lookback)
smma = ema(mma, lookback)

impetmma = mma - mma[1]
impetsmma= smma - smma[1]
divma = abs(mma - smma)
averimpet = (impetmma + impetsmma) / 2

number = averimpet
pow = 3
result = na

for i = 1 to pow - 1
    if i == 1
        result := number
    result := result * number

tdf = divma * result
ntdf = tdf / highest(abs(tdf), lookback * 3)

///////////////////////////////////////////////////
//Volume Signals
///////////////////////////////////////////////////
v_Long = ntdf > filterHigh ? 1 : 0
v_Short = filterLow > ntdf ? 1 : 0

volumeLong = v_Long
volumeShort = v_Short

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **** Exit Indicator ****
///////////////////////////////////////////////////

///////////////////////////////////////////////////
//RVI 4
///////////////////////////////////////////////////

rgvlen = input(4, title="RVI Length", minval=1)
rvi = sum(swma(close-open), rgvlen)/sum(swma(high-low),rgvlen)
sig = swma(rvi)

///////////////////////////////////////////////////
//Exit Signals
///////////////////////////////////////////////////
e_Short = crossover(rvi, sig)
e_Long = crossover(sig, rvi)

exitOutofShort = e_Short
exitOutofLong = e_Long

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **************************** Logic to handle NNFX rules ****************************
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Checking for base and confirmation indication with 1 candle difference
baseandConfirmLong = ((baseLong[0] and confirmLong[0]) or (baseLong[1] and confirmLong[0]) or (baseLong[1] and confirmLong[1]) or (baseLong[0] and confirmLong[1])) ? 1 : 0
baseandConfirmShort = ((baseShort[0] and confirmShort[0]) or (baseShort[1] and confirmShort[0]) or (baseShort[1] and confirmShort[1]) or (baseShort[0] and confirmShort[1])) ? 1 : 0

//Combining with volume with 1 candle difference
enterLong = ((baseandConfirmLong[0] and volumeLong[0]) or (baseandConfirmLong[1] and volumeLong[0]) or (baseandConfirmLong[1] and volumeLong[1]) or (baseandConfirmLong[0] and volumeLong[1])) ? 1 : 0
enterShort = ((baseandConfirmShort[0] and volumeShort[0]) or (baseandConfirmShort[1] and volumeShort[0]) or (baseandConfirmShort[1] and volumeShort[1]) or (baseandConfirmShort[0] and volumeShort[1])) ? 1 : 0

//Exit on base or confirmation flip over
baseandConfirmFliptoShort = ((baseShort[0] or confirmShort[0]) or (baseShort[1] or confirmShort[0]) or (baseShort[1] or confirmShort[1]) or (baseShort[0] or confirmShort[1])) ? 1 : 0
baseandConfirmFliptoLong = ((baseLong[0] or confirmLong[0]) or (baseLong[1] or confirmLong[0]) or (baseLong[1] or confirmLong[1]) or (baseLong[0] or confirmLong[1])) ? 1 : 0

//Exit on base and confirmation flip or exit indicator 
exitLong = exitOutofLong or baseandConfirmFliptoShort ? 1 : 0 
exitShort = exitOutofShort or baseandConfirmFliptoLong ? 1 : 0 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Entries and Exits
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (year>2009)

    //Long entries with standard 1.5 ATR for SL, 1 ATR for TP
    long_sl = price - atr * slMultiplier
    long_tp = price + atr * tpMultiplier
    strategy.entry("L1", strategy.long, when = enterLong and atrCheck)
    strategy.exit("L1 SL Exit", "L1", stop = long_sl, limit = long_tp)
    strategy.close("L1", when = exitLong)
    
    //Long entries with no TP
    strategy.entry("L2", strategy.long, when = enterLong and atrCheck)
    strategy.exit("L2 SL Exit", "L2", stop = long_sl)
    strategy.close("L2", when = exitLong)

    //Short entries with standard 1.5 ATR for SL, 1 ATR for TP
    short_sl = price + atr * slMultiplier
    short_tp = price - atr * tpMultiplier
    strategy.entry("S1", strategy.short, when = enterShort and atrCheck)
    strategy.exit("S1 SL Exit", "Short1", stop = short_sl, limit = short_tp)
    strategy.close("S1", when = exitShort)
    
    //Short entries with no TP
    strategy.entry("S2", strategy.short, when = enterShort and atrCheck)
    strategy.exit("S2 Exit", stop = short_sl)
    strategy.close("S2", when = exitShort)
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//End
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    



```

> Detail

https://www.fmz.com/strategy/431958

> Last Modified

2023-11-13 16:50:45
