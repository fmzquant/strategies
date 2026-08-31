
> Name

MACD-of-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the MACD indicator to determine the trend of the RSI indicator, generating trading signals. It belongs to the indicator combo filter strategy type.

## Strategy Logic

The strategy is based on two main indicators:

1. RSI 
   Calculates the regular 14-period RSI.

2. MACD of RSI
   Calculates MACD values on the RSI, with default fast MA 12, slow MA 26, signal line 9.

When MACD of RSI crosses up, the fast and slow MAs golden cross, it determines an uptrend and goes long. 

When MACD crosses down, the fast and slow MAs dead cross, it determines a downtrend and goes short.

The exponential moving averages of MACD help determine the longer term trend of RSI itself, resulting in more accurate signals.

## Advantages

- MACD judges RSI trend direction for higher accuracy
- RSI as primary indicator, MACD as secondary 
- Exponential MAs make trend determination stable
- Combination verifies each other, avoiding whipsaws
- Parameter tuning provides flexibility for different markets

## Risks

- Both RSI and MACD can lag, leading to inaccurate signals
- Wrong MACD parameters may generate more false signals
- Purely indicator-based, sensitive to sudden events
- Stop loss mechanism needs further improvements 
- Parameter optimization required for different products

Risks can be reduced by:

- Optimizing RSI and MACD parameter combinations
- Adding other filters for confirmation
- Relaxing TP/SL to avoid premature exit
- Considering re-entries 
- Position sizing to limit single loss

## Enhancement Directions

The strategy can be improved from:

1. Testing RSI and MACD parameter combinations

2. Adding secondary confirmation when MACD signals

   e.g. candlestick patterns, volume, Bollinger bands etc.

3. Optimizing stops to trailing stops

4. Adding re-entry rules

   Re-establish positions after stops are hit if trend continues

5. Adjusting position sizes by volatility

   Smaller size during high volatility, larger size in low volatility
   
## Summary

This strategy combines RSI and MACD indicators to verify each other for more accurate and stable trend detection. But parameters need optimization, and additional technical filters or trading rules are required for confirmation, avoiding sudden events. Also stop loss mechanisms and dynamic position sizing are important. Continued learning and optimizing is crucial for adapting to changing market conditions for steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|12|fastLength|
|v_input_3|26|slowLength|
|v_input_4|9|signalLength|
|v_input_5|6|monthfrom|
|v_input_6|12|monthuntil|
|v_input_7|true|dayfrom|
|v_input_8|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "MACD of RSI", overlay = false)

//////////////////////// RSI ///////////////////////////

src = close, len = input(14, minval=1, title="Length")
up = sma(max(change(src), 0), len)
down = sma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))


//////////////////////// RSI   //////////////////////////

//////////////// MACD  ////////////////////////////

sourcemacd = rsi 

fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(9,minval=1)


fastMA = ema(sourcemacd, fastLength)
slowMA = ema(sourcemacd, slowLength)

macd = fastMA - slowMA
signal = ema(macd, signalLength)
delta=macd-signal

swap1 = delta>0?green:red

plot(delta,color=swap1,style=columns,title='Histo',histbase=0,transp=20)
p1 = plot(macd,color=blue,title='MACD Line')
p2 = plot(signal,color=red,title='Signal')
fill(p1, p2, color=blue)
hline(0)




/////////////////////////MACD  //////////////////////////


// Conditions



longCond = na
sellCond = na
longCond :=  crossover(delta,0)
sellCond :=  crossunder(delta,0)




monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longCond  ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND", comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( sellCond   ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/427511

> Last Modified

2023-09-21 20:48:50
