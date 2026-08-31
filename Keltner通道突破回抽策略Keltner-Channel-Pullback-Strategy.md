
> Name

Keltner通道突破回抽策略Keltner-Channel-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f4046dbc10d2b3b9c8.png)



## Overview
This strategy designs a pullback trading strategy based on the Keltner Channel indicator. It judges the timing of potential price reversals by comparing the price with the upper and lower rails of the Keltner Channel, and takes appropriate long and short positions.

## Strategy Principle  
This strategy uses the Keltner Channel indicator to judge price trends. The Keltner Channel consists of a moving average and average true range (ATR). The upper rail equals the moving average plus N times ATR; the lower rail equals the moving average minus N times ATR. When the price breaks through the lower rail of the channel from bottom up, it is considered that the bullish power is enhanced and long positions can be taken; when the price breaks through the upper rail from top down, it is considered that the bearish power is enhanced and short positions can be taken.

In addition, the basis for the strategy to judge pullback opportunities is that the price touches or breaks through the channel boundary again. For example, after the price rises to break through the lower rail, if it falls again to touch the lower rail without touching the upper rail, it is an opportunity to take a long pullback. The strategy will open long positions at this time.  

## Advantage Analysis
This is a trading strategy that utilizes the pullback characteristics of prices. Its advantages are:

1. Using Keltner Channel to judge the direction of price trends can effectively filter out noise.  
2. Adopting pullback strategy can enter the market ahead of reversals and capture larger trends.

## Risk Analysis
The main risks of this strategy are:  

1. In long term one-way markets, there may be fewer pullback opportunities, unable to profit.
2. Inaccurate judgment of pullback signals may lead to losses.

Countermeasures:
1. Optimize parameters to adjust channel width to adapt to market conditions.  
2. Increase position management to reduce single loss.
  
## Optimization Directions
The strategy can be optimized in the following aspects:

1. Breakthrough filtering based on trading volume to avoid false breakthroughs.
2. Adjust position size based on volatility. 
3. Update stop loss methods with moving stops to lock in more profits.

## Summary  
This strategy integrates trend judgment and pullback trading methods, and has unique advantages in capturing reversal trends. By adjusting parameters and expanding functions, the stability and profitability of the strategy can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Keltner EMA Period Length|
|v_input_2|200|Keltner ATR Period Length (the same as EMA length in classic Keltner Channels)|
|v_input_3|8|Keltner band width (in ATRs)|
|v_input_4|false|Close trade on EMA touch? (less drawdown, but less profit and higher commissions impact)|
|v_input_5|false|Enter on border touch from inside? (by default from outside, which is less risky but less profitable)|
|v_input_6|50|Stop loss in ticks (leave zero to skip)|
|v_input_7|true|Trade size|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Keltner bounce from border. No repaint. (by Zelibobla)", shorttitle="Keltner border bounce", overlay=true)

price = close

// build Keltner
keltnerLength = input(defval=200, minval=1, title="Keltner EMA Period Length")
keltnerATRLength = input(defval=200, minval=1, title="Keltner ATR Period Length (the same as EMA length in classic Keltner Channels)")
keltnerDeviation = input(defval=8, minval=1, maxval=15, title="Keltner band width (in ATRs)")
closeOnEMATouch = input(type=bool, defval=false, title="Close trade on EMA touch? (less drawdown, but less profit and higher commissions impact)")
enterOnBorderTouchFromInside = input(type=bool, defval=false, title="Enter on border touch from inside? (by default from outside, which is less risky but less profitable)")
SL = input(defval=50, minval=0, maxval=10000, title="Stop loss in ticks (leave zero to skip)")
EMA = sma(price, keltnerLength)
ATR = atr(keltnerATRLength)
top = EMA + ATR * keltnerDeviation
bottom = EMA - ATR * keltnerDeviation

buyEntry = crossover(price, bottom)
sellEntry = crossunder(price, top)
plot(EMA, color=aqua,title="EMA")
p1 = plot(top, color=silver,title="Keltner top")
p2 = plot(bottom, color=silver,title="Keltner bottom")
fill(p1, p2)

tradeSize = input(defval=1, minval=1, title="Trade size")

if ( enterOnBorderTouchFromInside and crossunder(price, bottom) )
    strategy.entry("BUY", strategy.long, qty=tradeSize, comment="BUY")
else
    if( crossover(price, bottom) )
        strategy.entry("BUY", strategy.long, qty=tradeSize, comment="BUY")

if( crossover(price,EMA) and closeOnEMATouch )
    strategy.close("BUY")

if( 0 != SL )
    strategy.exit("EXIT BUY", "BUY", qty=tradeSize, loss=SL)
    strategy.exit("EXIT SELL", "SELL", qty=tradeSize, loss=SL)
   
if( enterOnBorderTouchFromInside and crossover(price, bottom) )
    strategy.entry("SELL", strategy.long, qty=tradeSize, comment="SELL")
else
    if ( crossunder(price, top) )
        strategy.entry("SELL", strategy.short, qty=tradeSize, comment="SELL")
    
    
if( crossunder(price, EMA) and closeOnEMATouch )
    strategy.close("SELL")
```

> Detail

https://www.fmz.com/strategy/436758

> Last Modified

2023-12-27 14:49:39
