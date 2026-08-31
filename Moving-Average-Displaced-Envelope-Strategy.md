
> Name

Moving-Average-Displaced-Envelope-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15e93b609a51ed804a3.png)

This strategy generates trading signals based on the Moving Average Displaced Envelope indicator. The envelope bands are calculated by percentage factors of the moving average. If the previous high breaks above the upper band, a sell signal is generated. If the previous low breaks below the lower band, a buy signal is generated.

## Strategy Logic

This strategy uses the displaced exponential moving average (EMA) as the core indicator, and forms the upper and lower bands after a certain period by percentage factors. This constructs the complete moving average displaced envelope system. Specifically, the envelope system consists of:

* EMA(Price, Period) - The core moving average line  
* top = sEMA\[disp\] \* ((100 + perAb)/100) - Upper band
* bott = sEMA\[disp\] \* ((100 - perBl)/100) - Lower band

Here Percent above and Percent below control the percentage range of the bands relative to the core moving average line. The Displacement parameter controls the period displacement between the bands and the core moving average line.  

In this way, we can form appropriate trading ranges by adjusting the above parameters. Trading signals are generated when prices break through the bands. Specifically:

* If close is lower than the lower band bott, a buy signal is generated
* If close is higher than the upper band top, a sell signal is generated

Note that this strategy also provides a reverse parameter. If set to true, the signal direction is opposite to the above.

## Advantage Analysis

The main advantages of this strategy are:

1. Using exponential moving average as the base indicator can reduce curve lagging and improve sensitivity to price changes  
2. More adjustable parameters allow better optimization of trading performance through parameter tuning
3. The reverse mode adapts to different market types  
4. Simple and clear rules, easy to understand and implement

## Risks and Precautions 

There are also some risks with this strategy:

1. False signals can occur frequently in range-bound markets  
2. Improper parameter settings may cause over-trading or signal missing
3. Market noise cannot be filtered effectively, generating some worthless signals

To prevent these risks, some optimizations can be made:  

1. Filter signals with other indicators like volume, volatility etc. 
2. Add parameter optimization process to find optimum parameter sets
3. Adjust stop loss properly to limit losses

## Optimization Directions

There is still large room for optimizing this strategy:

1. Add machine learning models to realize automatic parameter optimization and adjustment
2. Incorporate features like stop loss, trailing stop to control risks
3. Filter signals with sentiment indicators to improve quality 
4. Increase model combinations with other technical indicators to identify trends and improve overall accuracy  
5. Inherit this strategy template to develop other types of moving average systems and expand applicability

With these optimizations, the stability, adaptability and performance of the strategy can be further improved.

## Summary  

The moving average displaced envelope strategy utilizes simple exponential moving average systems and parameterized bands to form clear trading rules that are easy to interpret and implement. It is a typical trend following system. Through parameter tuning and optimizations, good results can be achieved. But the impacts of market environments should also be fully considered and potential risks should be prevented. This strategy serves as a basic template and has much room for expansions and optimizations.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|9|Period|
|v_input_3|0.5|Percent above|
|v_input_4|0.5|Percent below|
|v_input_5|13|Displacement|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-25 00:00:00
end: 2024-02-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/08/2020
// Moving Average Displaced Envelope. These envelopes are calculated 
// by multiplying percentage factors with their displaced expotential 
// moving average (EMA) core.
// How To Trade Using:
// Adjust the envelopes percentage factors to control the quantity and 
// quality of the signals. If a previous high goes above the envelope 
// a sell signal is generated. Conversely, if the previous low goes below 
// the envelope a buy signal is given.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Moving Average Displaced Envelope Backtest", shorttitle="MA DE", overlay = true)
Price = input(title="Source", type=input.source, defval=close)
Period =input(defval=9, minval=1)
perAb = input(title = "Percent above", defval=.5, minval=0.01, step = 0.1)
perBl = input(title = "Percent below", defval=.5, minval=0.01, step = 0.1)
disp = input(title = "Displacement", defval=13, minval=1) 
reverse = input(false, title="Trade reverse")
pos = 0
sEMA = ema(Price, Period)
top = sEMA[disp] * ((100 + perAb)/100)
bott = sEMA[disp]* ((100 - perBl)/100)
pos := iff(close < bott , 1,
	     iff(close > top, -1, pos[1])) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/440851

> Last Modified

2024-02-02 17:02:18
