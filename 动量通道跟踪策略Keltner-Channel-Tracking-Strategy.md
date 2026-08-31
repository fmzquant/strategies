
> Name

动量通道跟踪策略Keltner-Channel-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/e3b0c079fd0d658d0b.png)

### Overview  

This strategy is designed based on the Keltner Channel indicator to generate trading signals when price breaks through the upper and lower bands of the channel. The strategy only goes long, if a sell signal appears, it will flatten the position to neutral.   

### Strategy Logic

The strategy uses SMA and ATR to build the Keltner Channel. The upper and lower bands are calculated as:  

Upper Band = SMA + ATR * Multiplier
Lower Band = SMA - ATR * Multiplier

When price breaks above the upper band, a buy signal is generated. When price breaks below the lower band, a sell signal is generated.  

Since it only goes long, if a sell signal appears, it will cancel previous orders and flatten the position.  

The logic is:

1. Build Keltner Channel with SMA and ATR  
2. When price breaks above upper band, set entry price and go long
3. When price breaks below lower band, flatten previous long position 

### Advantage Analysis   

The advantages of this strategy:

1. Simple and clear logic, easy to understand and implement
2. Keltner Channel is intuitive for trend identification  
3. Only go long avoids chasing stop loss risk
4. Conditional orders for precision entries 

### Risk Analysis

There are also some risks:

1. Frequent open/close trades during market fluctuation
2. Unable to take advantage of short opportunities 
3. Lack of exit mechanism, need manual intervention

Solutions:

1. Optimize channel parameters to reduce false signals
2. Add short module for two-way trading
3. Add exit mechanisms like moving stop loss, trailing stop

### Optimization Directions  

The strategy can be optimized in the following aspects:

1. Optimize parameters like channel period, ATR multiplier etc
2. Add short module based on lower band breakout   
3. Incorporate stop loss mechanisms like ATR trailing stop
4. Consider more filters to avoid false signals
5. Test effectiveness across different products  

### Conclusion   

This strategy effectively catches market trends with simple Keltner Channel rules. The logic is clear and easy to understand. Although the lack of exits and short module, it has great potential for improvements like parameter tuning, adding stops, going short etc. Overall a valuable quant strategy worth in-depth research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|20|length|
|v_input_3|true|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Keltner Channel Strategy", overlay=true)
source = close

useTrueRange = input(true)
length = input(20, minval=1)
mult = input(1.0)

ma = sma(source, length)
range = useTrueRange ? tr : high - low
rangema = sma(range, length)
upper = ma + rangema * mult
lower = ma - rangema * mult

crossUpper = crossover(source, upper)
crossLower = crossunder(source, lower)

bprice = 0.0
bprice := crossUpper ? high+syminfo.mintick : nz(bprice[1])

sprice = 0.0
sprice := crossLower ? low -syminfo.mintick : nz(sprice[1]) 

crossBcond = false
crossBcond := crossUpper ? true 
 : na(crossBcond[1]) ? false : crossBcond[1]

crossScond = false
crossScond := crossLower ? true 
 : na(crossScond[1]) ? false : crossScond[1]

cancelBcond = crossBcond and (source < ma or high >= bprice )
cancelScond = crossScond and (source > ma or low <= sprice )

if (cancelBcond)
    strategy.cancel("KltChLE")

if (crossUpper)
    strategy.entry("KltChLE", strategy.long, stop=bprice, comment="KltChLE")

if (cancelScond)
    strategy.cancel("KltChSE")

if (crossLower)
    strategy.entry("KltChSE", strategy.short, stop=sprice, comment="KltChSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/436498

> Last Modified

2023-12-25 13:14:24
