
> Name

Previous-Days-Close-with-ATR-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1767cffa0bc8a78a8d2.png)

### Overview  

This strategy sets long and short entry price levels and stop loss price levels based on previous day's close price and ATR indicator to track the trend. It goes long or short when price breaks through the entry price levels, and flattens positions on stop loss or take profit.

### Strategy Logic  

This strategy uses previous day's close price, high price, low price and ATR indicator to calculate entry price levels and stop loss levels. The specific formulas are as follows:

Long entry price level TPup = Previous day's close + ATR * 0.8  
Short entry price level TPdown = Previous day's close - ATR * 0.8

Long stop loss level slup = Previous day's close + ATR * 0.2  
Short stop loss level sldown = Previous day's close - ATR * 0.2  

Long take profit level profitlevelup = Previous day's low + ATR * 1.7   
Short take profit level profitleveldown = Previous day's high - ATR * 1.7  

When price breaks through TPup, go long 10 lots. When price breaks through TPdown, go short 10 lots. Then set stop loss and take profit. Exit positions on stop loss trigger or take profit trigger.

### Advantage Analysis   

The main advantages of this strategy are:  

1. Using ATR indicator to set dynamic entry price levels and stop loss levels based on market volatility, making trades more adaptive to market conditions.  

2. Using previous day's close to determine direction and combining with ATR indicator to identify specific trade levels, avoiding being misled by too much real-time price noise.

3. Setting both stop loss and take profit mechanisms to effectively control the risk of each trade.  

### Risk Analysis

The main risks of this strategy are:

1. The price levels set by ATR may be too idealistic to truly reflect market conditions, leading to frequent stop loss triggers. Parameters of ATR can be adjusted or stop loss range can be widened.  

2. Previous day's close cannot determine future trends. Drastic reversals may mislead directional choices. Other indicators can be combined to confirm trends.

3. Stop loss and take profit may be manipulated to trigger, failing to truly stop loss. Batch stop loss can be used to avoid being trapped.  

### Optimization Directions   

This strategy can be optimized in the following aspects:

1. Optimize ATR parameters to make trade levels fit better with market volatility.  

2. Add trend judging mechanisms to avoid trading reversals, e.g. combining with MA indicators.

3. Adjust take profit range, keeping profitability while reducing probability of profit taking triggers.   

4. Set batch stop loss and profit taking to reduce probability of being trapped or losing.

5. Add position sizing mechanism to increase positions in trending phases.  

### Conclusion  

This strategy sets dynamic trade levels based on previous day's close and ATR to effectively track trends. It also uses stop loss and take profit to control single trade risks. Optimization directions include parameter tuning, judging mechanism enhancement, take profit adjustment and position sizing etc. In general, this strategy achieves good trend following effects.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of ATR|
|v_input_2|0.8|Entry level for ATR|
|v_input_3|1.7|Exit level for ATR|
|v_input_4|0.2|Stop loss level for ATR|
|v_input_5|2014|Backtest Starting year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("PC with ATR Strategy (by Zhipengcfel)", shorttitle="PC_ATR", pyramiding=1, overlay=true)

// Zhipengcfel's Previous day's close with ATR Strategy
//
// Version 1.0
// @copyright Idea by Zhipengcfel on June 29, 2017.

//Previous day's close plus ATR strategy. 
//Buy (if breaking PC+ATR*0.8) or sell (if breaking PC-0.8*ATR). 

//This is just a demo vision and can not be used for real auto trading



///////////// ATR value
ATRlength = input(14, minval=1, title="lookback length of ATR")
//ATR = atr(ATRlength)
ATR = request.security(syminfo.tickerid, 'D', atr(ATRlength))

///////////// Entry levels and target levels
entr = input(0.8, minval=0.1, step = 0.05, title="Entry level for ATR")
tplevel = input(1.7, minval=0.1, step = 0.05, title="Exit level for ATR")
yesterday = request.security(syminfo.tickerid, 'D', close[1])
dl = request.security(syminfo.tickerid, 'D', low[1])
dh = request.security(syminfo.tickerid, 'D', high[1])
TPup = yesterday+entr*ATR
TPdown = yesterday-entr*ATR
profitlevelup = dl+tplevel*ATR
profitleveldown = dh-tplevel*ATR

///////////// Stop loss level
sl = input( 0.2  ,minval=0.01, step = 0.05, title="Stop loss level for ATR") //82 for 2, 83 for 3 and more positions
slup = yesterday+sl*ATR
sldown = yesterday-sl*ATR

///////////// Starting year to backtest
yer = input( 2014  , title="Backtest Starting year")


///////////// strategy: PC + ATR
if (close > TPup) and (close < profitlevelup)
    strategy.entry("LONG", strategy.long, 10, comment="Buy", when = year > yer, oca_name="My oca")
    strategy.exit("Stopped", "LONG",  stop = slup, limit= profitlevelup, oca_name="My oca")
            

if (close < TPdown) and (close > profitleveldown)
    strategy.entry("SHORT", strategy.short, 10, comment="Sell", when = year > yer, oca_name="My oca")
    strategy.exit("Stopped", "SHORT", stop = sldown, limit= profitleveldown, oca_name="My oca")
 
```

> Detail

https://www.fmz.com/strategy/440536

> Last Modified

2024-01-31 14:39:09
