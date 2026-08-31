
> Name

Bollinger-Band-and-Stoch-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the Bollinger Bands and Stoch RSI indicators for multiple indicator trading. It belongs to the typical combined indicators strategy type. The Bollinger Bands determine trend direction and the Stoch RSI optimizes entry timings for trade signals.

## Strategy Logic

The strategy is based on two main indicators:

1. Bollinger Bands

   Calculate the upper, middle and lower bands. A buy signal is generated when price breaks above the lower band.
   
2. Stoch RSI

   Calculate the Stoch RSI indicator. A buy signal is generated when the K line crosses above the D line.
   
The specific trading logic is: open long when both the Bollinger Bands lower breakout and Stoch RSI golden cross occur together.

The exit logic uses the bands for take profit and stop loss: close for profit when price touches the upper or middle band again, close for loss when price breaks back below the lower band. 

## Advantages 

- Combines Bollinger Bands and Stoch RSI
- Bands judge overall trend, Stoch RSI optimizes entry
- Stoch RSI filters false band breakouts
- Middle and lower bands provide exits
- Multiple adjustable parameters for optimizations

## Risks

- MA-based indicators lag, missing best entries 
- Purely indicator-driven, slow reaction to sudden events
- Improper band settings invalidate stops
- Bad Stoch RSI parameters generate false signals
- Separate parameter tuning needed for different products

Risks can be reduced by:

- Optimizing parameters for higher accuracy
- Adding confirming filters like MACD
- Using trailing stops instead of band stops 
- Testing parameters for different products
- Adjusting position sizing system

## Enhancement Directions

The strategy can be improved by:

1. Optimizing Bollinger Bands parameters

   Adjust upper/lower calculation ratios for best fit
   
2. Optimizing Stoch RSI parameters

   Finding optimal K and D values
   
3. Adding confirming indicators like MACD

   Avoid false signals relying on single indicator
   
4. Using trailing profit stops instead of fixed stops

   Trail stops based on price volatility
   
5. Testing parameters separately for different products

   Optimal parameters vary across different products

## Summary 

This strategy leverages the Bollinger Bands for trend direction and Stoch RSI for entry optimization, taking advantage of a multi-indicator approach. But challenges like difficult parameter optimization and signal accuracy exist. Rigorous backtesting for parameter optimization, adding filters, and continuously adjusting rules based on results can improve accuracy while retaining the strengths of a combined system. Persistent optimizations lead to robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|bblength|
|v_input_2|2|Multiplier for BB Upper Band|
|v_input_3|2|Multiplier for BB Lower Band|
|v_input_4|6|lengthrsi|
|v_input_5|20|overSold|
|v_input_6|70|overBought|
|v_input_7|3|smoothK|
|v_input_8|3|smoothD|
|v_input_9|14|lengthRSI|
|v_input_10|14|lengthStoch|
|v_input_11_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|6|monthfrom|
|v_input_13|12|monthuntil|
|v_input_14|true|dayfrom|
|v_input_15|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "BB+RSI v2", overlay = true)

price=close
////////// ///////  BB /////////////////////////

bblength = input(50)
bbupmult =input(2,step=0.1,title="Multiplier for BB Upper Band")
bblowmult = input(2,step=0.1,title="Multiplier for BB Lower Band")

basis =  sma(close,bblength)

devup = bbupmult * stdev(close, bblength)
devlow = bblowmult * stdev(close, bblength)

upper = basis + devup
lower = basis - devlow
plot(basis, color=red)
p1 = plot(upper, color=blue)
p2 = plot(lower, color=blue)
fill(p1, p2)


bbbuy= crossover(price,lower)
bbsell = crossunder(price,upper) or price>upper or crossunder(price,basis)



//////////////////// BB //////////////////////




////////////////////////  S RSI  /////////////////////

lengthrsi = input(6)
overSold = input( 20 )
overBought = input( 70 )
vrsi = rsi(price, lengthrsi)

smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src = input(close, title="RSI Source")

rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

SRSIbuy=crossover(k,d)

////////////////////// S  RSI  ///////////////////////

// Conditions



longcond = bbbuy and SRSIbuy
closelong = bbsell


monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longcond ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( closelong  ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/427515

> Last Modified

2023-09-21 21:02:02
