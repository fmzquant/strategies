
> Name

Confirmed-Divergence-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/201e6d02c0899b6d7f3.png)


## Overview

The Confirmed Divergence Strategy utilizes the dual divergence signals from the RSI indicator and Awesome Oscillator to determine more reliable entry points. When prices form new highs or lows while the RSI and AO indicators form reversals of highs or lows, it is a divergence signal. This strategy requires divergence from both indicators at the same time to filter out some false signals and improve entry effectiveness.  

## Strategy Principle  

This strategy judges buy and sell points based on the divergence between the magnitude of price rises and falls and the values of the RSI and AO indicators. The specific judgment methods are as follows:

Bullish divergence: prices form a newer low while RSI and AO form newer highs, that is, prices fall while RSI and AO rise, constituting a bullish divergence signal.  

Bearish divergence: prices form a newer high while RSI and AO form newer lows, that is, prices rise while RSI and AO fall, constituting a bearish divergence signal.

The strategy requires both indicators to simultaneously meet the divergence criteria to avoid erroneous signals from false divergence of a single indicator. When the divergence signal is established, set a stop loss near the lower or upper rail of the Bollinger Bands, specifically just above the lower rail or just below the upper rail.

## Advantage Analysis   

This strategy has the following advantages:

1. The double indicator filtering increases the reliability of signals and avoids false divergence signals from a single indicator.

2. Using the divergence characteristics of indicators to determine buy and sell points has a relatively small chance of pullback. 

3. Divergence signals have good sustainability and greater profit potential.  

4. Setting stop loss near key support or resistance reduces the possibility of individual huge losses.

## Risk Analysis

This strategy also has some risks:

1. The conditions for double filtering are met less frequently, possibly missing some trading opportunities.

2. Divergence is not a 100% reliable signal, and losses may occur in some individual situations.  

3. Improper parameter settings for Bollinger Bands can result in stop loss that is too loose or too tight.

## Optimization Directions

This strategy can be optimized in several ways:

1. Adjust the cycle parameters for judging divergence to optimize parameters for divergence signals.

2. Test different stop loss methods such as trailing stop or dynamic stop loss. 

3. Increase filtering by other indicators such as trading volume to further improve signal reliability.  

4. Comprehensively consider trends, support/resistance and other factors to identify the quality of divergence signals. 

## Summary  

The Confirmed Divergence Strategy determines entry points through the dual divergence signals of RSI and AO. The double filtering mechanism effectively reduces false signals and increases profitability. The strategy also sets stop loss at key levels to control risks, with good risk-reward characteristics. By means of parameter optimization, increased signal filtering, etc., the stability and trading effect of the strategy can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|length|
|v_input_2|2|mult|
|v_input_3|14|RSI period|
|v_input_4|70|Overbought Level|
|v_input_5|30|Oversold Level|
|v_input_6|5|Awesome Short MA|
|v_input_7|34|Awesome Long MA|
|v_input_8|5|short lookback period|
|v_input_9|25|long lookback period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-15 00:00:00
end: 2024-01-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Confirmed Divergence Strategy", overlay=true)
source = close
length = input(30, minval=1)
mult = input(2.0, minval=0.001, maxval=50)
// SETTING UP VARIABLES //

src = close

// RSI //
rsiprd = input(title="RSI period",defval=14)
rv = rsi(src,rsiprd)
ob = input(title="Overbought Level",  defval=70)
os = input(title="Oversold Level",  defval=30)
lengthAO1=input(title="Awesome Short MA", defval=5, minval=1) //5 periods
lengthAO2=input(title="Awesome Long MA", defval=34, minval=1) //34 periods


//Awesome//

AO = sma((high+low)/2, lengthAO1) - sma((high+low)/2, lengthAO2)

// look back periods //
x = input(title = "short lookback period",defval=5)
z = input(title = "long lookback period",defval=25)


// END SETUP //

////////////////////////
// BULLISH DIVERGENCE //
////////////////////////

// define lower low in price //

srcLL = src > lowest(src,x) and  lowest(src,x)<lowest(src,z)[x]

// define higher low in rsi //

rsiHL = rv>lowest(rv,x) and lowest(rv,x) > lowest(rv,z)[x] and lowest(rv,z)<os

// define higher low in AO //


aoHL = AO > lowest(AO,x) and lowest(AO,x) > lowest(AO,z)[x] and lowest(AO, x) < 0



BullishDiv = srcLL and rsiHL and aoHL


////////////////////////
// BEARISH DIVERGENCE //
////////////////////////

// define higher high in price //

srcHH = src < highest(src,x) and  highest(src,x)>highest(src,z)[x]

// define lower high in RSI //

rsiLH = rv<highest(rv,x) and highest(rv,x) < highest(rv,z)[x] and highest(rv,z)>ob

// define lower high in AO //
aoLH = AO<highest(AO,x) and highest(AO,x) < highest(AO,z)[x] and highest(AO, x) > 0

BearishDiv = srcHH and rsiLH and aoLH


basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev



if (BullishDiv)
    strategy.entry("DivLE", strategy.long, stop=lower, oca_name="BullishDiv",comment="DivLE")
else
    strategy.cancel(id="DivLE")
    
if (crossover(close, lower))
    strategy.close("DivSE")
    
if (crossunder(close, upper))
    strategy.close("DivLE")

if (BearishDiv)
    strategy.entry("DivSE", strategy.short, stop=upper, oca_name="BearishDiv",comment="DivSE")
else
    strategy.cancel(id="DivSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)

```

> Detail

https://www.fmz.com/strategy/438822

> Last Modified

2024-01-15 15:19:56
