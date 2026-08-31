
> Name

Dual-Moving-Average-Convergence-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1452c3fcf0735c860f1.png)

### Overview  

The Dual Moving Average Convergence Trend Tracking Strategy calculates fast, slow and superslow moving average lines, combined with the MACD indicator to determine price trend direction and implement trend tracking transactions. It goes long when the fast and slow moving averages have golden cross, and goes short when dead cross happens. Use the long term moving average to filter false breaks.

### Principle  

The strategy first calculates the 12-day fast moving average, 26-day slow moving average, and 200-day superslow moving average. When the fast moving average crosses above the slow one, golden cross happens, indicating a bull market. When fast crosses below slow, dead cross happens, indicating a bear market. The strategy goes long on golden crosses and goes short on dead crosses.

The strategy also uses the MACD indicator to determine trend direction. MACD consists of fast line, slow line and MACD bars. When fast line crosses above slow line, it's a bullish signal and when crossing below it's bearish. Combined with the long term moving average to filter false signals, only when fast line breaks up slow line, MACD bar turns from negative to positive, and price stands above 200-day MA, long signal triggers. Only when fast line breaks down slow line, MACD bar turns from positive to negative and price drops below 200-day MA, short signal triggers.  

With dual confirmation from moving averages system and MACD indicator, false breaks can be avoided and ensure entering at trend start.

### Advantages

1. Dual confirmation avoids false breaks, ensuring entering at trend start.  

2. 200-day MA filters erroneous trades during market fluctuations.

3. Stop loss set to limit maximum loss.  

4. Customizable parameters like MA lengths, stop loss level, etc. to adapt to different products.

5. Simple and clear logic, easy to understand and optimize.

### Risks 

1. Long term trend tracking unable to capture short term opportunities.  

2. Tracking effect depends on parameter settings. Wrong parameters fail to capture trends.

3. Improper stop loss setting may be too loose or too tight, enlarging loss or stopping out prematurely.  

4. Long holding periods lead to certain capital pressure.

### Optimization

1. Optimize MA lengths parameter for best parameter combination.  

2. Add other indicators like KDJ for auxiliary judgement.

3. Optimize stop loss strategies like tighten stops, trailing stops etc.

4. Adjust MA parameters based on product and timeframe.  

5. Add volume filter to avoid false signals.

### Conclusion

The Dual MA Convergence Trend Tracking Strategy judges trend direction by calculating multiple MA systems and uses MACD filter. Its advantages are simple and clear logic, controllable risks, suitable for trend tracking. It can be improved by parameters optimization, stop loss optimization, adding auxiliary indicators etc. A recommendable trend tracking strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|MACD fast moving average|
|v_input_3|26|MACD slow moving average|
|v_input_4|9|MACD signal line moving average|
|v_input_5|200|Very slow moving average|
|v_input_6|true|Enable Bar Color?|
|v_input_7|true|Enable Moving Averages?|
|v_input_8|true|Enable Background Color?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Trend Strategy", shorttitle="TSTrend Strategy", overlay=true)


// Trend Strategy
// If the inverse logic is true, the strategy
// goes short. For the worst case there is a
// max intraday equity loss of 50% filter.


// Input
source = input(close)
fastLength = input(12, minval=1, title="MACD fast moving average")
slowLength=input(26,minval=1, title="MACD slow moving average")
signalLength=input(9,minval=1, title="MACD signal line moving average")
veryslowLength=input(200,minval=1, title="Very slow moving average")
switch1=input(true, title="Enable Bar Color?")
switch2=input(true, title="Enable Moving Averages?")
switch3=input(true, title="Enable Background Color?")

// Calculation
fastMA = sma(source, fastLength)
slowMA = sma(source, slowLength)
veryslowMA = sma(source, veryslowLength)
macd = fastMA - slowMA
signal = sma(macd, signalLength)
hist = macd - signal

// Colors
MAtrendcolor = change(veryslowMA) > 0 ? green : red
trendcolor = fastMA > slowMA and change(veryslowMA) > 0 and close > slowMA ? green : fastMA < slowMA and change(veryslowMA) < 0 and close < slowMA ? red : blue
bartrendcolor = close > fastMA and close > slowMA and close > veryslowMA and change(slowMA) > 0 ? green : close < fastMA and close < slowMA and close < veryslowMA and change(slowMA) < 0 ? red : blue
backgroundcolor = slowMA > veryslowMA and crossover(hist, 0) and macd > 0 and fastMA > slowMA and close[slowLength] > veryslowMA ? green : slowMA < veryslowMA and crossunder(hist, 0) and macd < 0 and fastMA < slowMA and close[slowLength] < veryslowMA ? red : na
bgcolor(switch3?backgroundcolor:na,transp=80)
barcolor(switch1?bartrendcolor:na)

// Output
F=plot(switch2?fastMA:na,color=trendcolor)
S=plot(switch2?slowMA:na,color=trendcolor,linewidth=2)
V=plot(switch2?veryslowMA:na,color=MAtrendcolor,linewidth=4)
fill(F,V,color=gray)

// Strategy
buyprice = low
sellprice = high
cancelLong = slowMA < veryslowMA
cancelShort = slowMA > veryslowMA

if (cancelLong)
    strategy.cancel("MACDLE")

if crossover(hist, 0) and macd > 0 and fastMA > slowMA and close[slowLength] > veryslowMA 
    strategy.entry("MACDLE", strategy.long, stop=buyprice, comment="Bullish")

if (cancelShort)
    strategy.cancel("MACDSE")

if crossunder(hist, 0) and macd < 0 and fastMA < slowMA and close[slowLength] < veryslowMA 
    strategy.entry("MACDSE", strategy.short, stop=sellprice, comment="Bearish")

// maxIdLossPcnt = input(50, "Max Intraday Loss(%)", type=float)
// strategy.risk.max_intraday_loss(maxIdLossPcnt, strategy.percent_of_equity)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/436899

> Last Modified

2023-12-28 17:24:53
