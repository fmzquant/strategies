
> Name

Efficient-Oscillation-Breakthrough-Dual-Stop-Profit-and-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a9971cd6c5260a969.png)

## Overview
This is a highly efficient dual-directional trading strategy designed based on channel indicators and breakout principles. It can achieve high win-rate dual-directional trading on stocks and cryptocurrencies in 1-minute timeframes.

## Strategy Logic  
The strategy uses SMA indicators to build channels. It enters long when price breaks out above the channel and enters short when prices breaks out below the channel. Take profit and stop loss are also set to lock in profits and control risks.   

Specifically, the strategy calculates the upper and lower rail of the channel. The upper rail is the 10-period SMA of close price multiplied by 1.02; The lower rail is the 10-period SMA of lowest price divided by 1.02. Go long when close price breaks out above upper rail, go short when close price breaks below lower rail.

After going long, two take profit levels are set at 1% and 3% respectively, with a 3% stop loss. Going short has similar profit/loss settings. Through breakout principles the strategy can achieve relatively high entry win rate; through dual take profits it can lock in more profits; through stop loss it controls per trade loss amount.  

## Advantage Analysis
Channel breakout strategies like this have advantages like clear entry signals, high operation frequency, multi-level profit taking, etc. The main advantages are:  

1. Using channel indicators to identify price oscillation range and picking breakout points to enter can obtain relatively high win rate.

2. Operating on 1-minute chart to capture more opportunities and suit need for speed trading.

3. Having two take profit levels allows locking in more profits when trend goes well. Higher reward compared to just one take profit target.  

4. Relatively wide stop loss gives the price movement some space, avoiding premature stop loss.

## Risk Analysis   
The biggest risk with such breakout strategies is false breakouts leading to losses. Also, large stop loss can increase loss risks. Main risk points:

1. Breakout signals may be false breakouts and fail to reach take profit or stop loss. A common issue in technical analysis. Parameter optimization can help avoid.  

2. Stop loss threshold at 3% could be hard for some traders to withstand. Adjust based on personal risk tolerance.

3. This strategy suits more short-term trading and needs monitoring. Reduce positions if unable to watch the markets.  

## Optimization Directions
Trend breakout strategies like this can optimize mainly in below aspects:  

1. Test more indicators to build channels and find more reliable ones to reduce false breakouts.

2. Optimize moving average parameter tuning, discover best parameter combinations. 

3. Test more complex entry mechanisms, like adding volume filters etc.  

4. Set parameter combos adaptive to different products' characteristics to achieve parameter self-adaption.

5. Add auto stop loss mechanisms that dynamically adjust stop loss over time.

## Conclusion  
This is an efficient dual-directional trading strategy built upon channel indicators. It enters markets through breakout principles, dual take profits to lock in rewards, stop loss to control risks. Further optimization can achieve even better results. But traders still need to beware risks like false breakouts.  



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Period|
|v_input_2|10|Length|
|v_input_3|true|Multiplier|
|v_input_4|true|Take Profit 1 (%)|
|v_input_5|20|Take Profit 2 (%)|
|v_input_6|3|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Erweiterte SSL Channel Strategy mit 2 TPs, SL und BE", overlay=true)

period = input(title="Period", defval=10)
len = input(title="Length", defval=10)
multiplier = input(title="Multiplier", defval=1.0, minval=1.0)
tp1Percent = input(title="Take Profit 1 (%)", defval=1.0) / 100
tp2Percent = input(title="Take Profit 2 (%)", defval=20.0) / 100
slPercent = input(title="Stop Loss (%)", defval=3.0) / 100

var float tp1Price = na
var float tp2Price = na
var float slPrice = na
var bool tp1Reached = false

smaHigh = sma(high * multiplier, len)
smaLow = sma(low / multiplier, len)

Hlv = 0
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : nz(Hlv[1])
sslDown = Hlv < 0 ? smaHigh : smaLow
sslUp = Hlv < 0 ? smaLow : smaHigh

plot(sslDown, linewidth=2, color=color.red)
plot(sslUp, linewidth=2, color=color.lime)

longCondition = crossover(close, sslUp)
shortCondition = crossunder(close, sslDown)

if (longCondition)
    strategy.entry("Long", strategy.long)
    tp1Price := strategy.position_avg_price * (1 + tp1Percent)
    tp2Price := strategy.position_avg_price * (1 + tp2Percent)
    slPrice := strategy.position_avg_price * (1 - slPercent)
    tp1Reached := false

if (shortCondition)
    strategy.entry("Short", strategy.short)
    tp1Price := strategy.position_avg_price * (1 - tp1Percent)
    tp2Price := strategy.position_avg_price * (1 - tp2Percent)
    slPrice := strategy.position_avg_price * (1 + slPercent)
    tp1Reached := false

// Take Profit, Break-even und Stop-Loss Logik
if (strategy.position_size > 0) // Long-Positionen
    if (not tp1Reached and close >= tp1Price)
        strategy.close("Long", qty_percent = 50)
        strategy.exit("BE Long", "Long", stop = strategy.position_avg_price)
        tp1Reached := true
    if (tp1Reached and close < tp1Price)
        strategy.exit("BE Long", "Long", stop = strategy.position_avg_price)
    if (close >= tp2Price)
        strategy.close("Long", qty_percent = 100)
    if (not tp1Reached)
        strategy.exit("SL Long", "Long", stop = slPrice)

if (strategy.position_size < 0) // Short-Positionen
    if (not tp1Reached and close <= tp1Price)
        strategy.close("Short", qty_percent = 50)
        strategy.exit("BE Short", "Short", stop = strategy.position_avg_price)
        tp1Reached := true
    if (tp1Reached and close > tp1Price)
        strategy.exit("BE Short", "Short", stop = strategy.position_avg_price)
    if (close <= tp2Price)
        strategy.close("Short", qty_percent = 100)
    if (not tp1Reached)
        strategy.exit("SL Short", "Short", stop = slPrice)

```

> Detail

https://www.fmz.com/strategy/440719

> Last Modified

2024-02-01 14:46:00
