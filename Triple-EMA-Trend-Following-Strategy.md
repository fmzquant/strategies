
> Name

Triple-EMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad2a76dbea2ff35e5b.png)


## Overview

The Triple EMA Trend Following Strategy is a strategy very suitable for following market trends. It uses three EMAs of different periods as trading signals to establish long or short positions when there is sufficient trend confirmation.  

The advantage of this strategy is that it can reduce false signals and ensure sufficient trend strength before entering a position. At the same time, it has an adaptive stop loss system that can trail stop based on market volatility, thus achieving better risk management.

## Strategy Logic  

### Entry Logic

The strategy uses 7-, 14- and 21-period EMAs as entry signal indicators. The specific logic is when the price crosses above all three EMAs at the same time, go long; when the price crosses below all three EMAs at the same time, go short.  

This design can reduce false signals and ensure the trend is clear enough before entering. Also, the three EMA periods are set appropriately to capture market trends in a timely manner.  

### Stop Loss Method  

The strategy uses an adaptive stop loss system based on ATR and maximum drawdown. It calculates price volatility in real time and sets stop loss lines accordingly. Specifically, it calculates a certain multiple of ATR as the stop loss buffer zone.
  
During an uptrend, the stop loss line will move up with new highs, with good chasing effect. When the price falls back to the low point of the buffer zone, the stop loss line will be triggered to close positions. This can control stop loss risk according to market conditions.

### Profit Taking Method

The strategy uses a fixed percentage take profit method. After opening a position, a take profit line will be set at a certain percentage above the entry price. When the price rises to the take profit line, the position will be closed to take profits.

The benefit of this fixed percentage take profit is that it allows presetting a target profit level that will satisfy exiting once reached. It also avoids the risk of prices falling back again. The take profit percentage can be adjusted as needed.

## Advantage Analysis  

- Can reduce false signals and ensure a relatively strong price trend after opening positions 
- Use overlay of EMA periods to quickly capture market trends
- Adaptive stop loss system can control risk based on volatility  
- Fixed take profit percentage satisfies profit target before exiting 
- Stop loss method based on ATR and maximum drawdown can optimize based on market conditions
- Easy to adjust strategy style by changing parameters

## Risk Analysis   

- In ranging markets, EMAs may produce frequent crosses, easily being trapped
- Fixed take profit cannot adjust based on market conditions, may miss greater profits or increase losses
- After stop tracking stop loss, unable to track new highs again, price drops may increase losses
- In one-sided explosive trends, fixed take profit percentage may be too conservative, fail to obtain enough profits  

Can avoid blindly opening positions in volatile markets by combining with trend judgment indicators; can also use moving take profit or profit ratio methods to make take profit methods more flexible. In general, manual judgment is still needed to cooperate with strategy application.

## Optimization Directions  

The strategy can also be optimized in the following aspects:  

1. Use more indicators to determine entry timing, such as MACD, KD etc, avoid being trapped in volatile markets.

2. Try moving take profit, or profit ratio take profit methods, to make take profit methods more flexible. 

3. Add downward trailing mechanism to stop loss method, allowing tracking lower points again when price drops again, thereby controlling risk.  

4. Adjust EMA period parameters based on characteristics of different products, optimizing trend judgment.  

5. Add position sizing module, can adjust per trade size based on usage ratio of funds.

## Conclusion  

The Triple EMA Trend Following Strategy is a very practical trend following strategy. It has strong trend judgment capabilities, while also having adaptive take profit and stop loss mechanisms that can automatically manage orders. From the optimization perspective, the take profit and stop loss systems can be further improved to adjust based on real-time market conditions. But overall, this strategy is an easy to implement and controllable risk choice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|7|v_input_8|
|v_input_9|12|v_input_9|
|v_input_10|21|v_input_10|
|v_input_11|4|v_input_11|
|v_input_12|20|Length|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|3|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle='Three EMAs Trend-following Strategy',title='Three EMAs Trend-following Strategy (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)


//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

ema_1 = ema(close, input(7))
ema_2 = ema(close, input(12))
ema_3 = ema(close, input(21))

Take_profit= ((input (4))/100)

longTakeProfit = strategy.position_avg_price * (1 + Take_profit)


length = input(20, "Length", minval = 2)
src = input(close, "Source")
factor = input(3.0, "Multiplier", minval = 0.25, step = 0.25)
volStop(src, atrlen, atrfactor) =>
    var max     = src
    var min     = src
    var uptrend = true
    var stop    = 0.0
    atrM        = nz(atr(atrlen) * atrfactor, tr)
    max         := max(max, src)
    min         := min(min, src)
    stop        := nz(uptrend ? max(stop, max - atrM) : min(stop, min + atrM), src)
    uptrend     := src - stop >= 0.0
    if uptrend != nz(uptrend[1], true)
        max    := src
        min    := src
        stop   := uptrend ? max - atrM : min + atrM
    [stop, uptrend]

[vStop, uptrend] = volStop(src, length, factor)

go_long = crossover(close, ema_1) and crossover(close, ema_2) and crossover(close, ema_3)



closeLong = close > longTakeProfit or crossunder(close, vStop)



//Entry 
strategy.entry(id="long", long = true, when = go_long and window())



//Exit
strategy.close("long", when = closeLong and window())

plot(vStop,"Vstop", color.black, linewidth=2)
plot(ema_1,"EMA Short", color.green, linewidth=1)
plot(ema_2,"EMA Mid", color.purple, linewidth=1)
plot(ema_3,"EMA Long", color.red, linewidth=1)


```

> Detail

https://www.fmz.com/strategy/435972

> Last Modified

2023-12-20 15:00:44
