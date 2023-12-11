
> Name

Squeeze-Momentum-on-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/19689a930d8082aa3e5.png) 
The Squeeze Momentum on Reversal Strategy is a technical trading strategy that uses the Bollinger Bands (BB) and Keltner Channel (KC) indicators to identify potential reversals in the market. The strategy is based on the idea that when the BB and KC bands are squeezed together, it indicates that the market is in a period of consolidation. This can be a sign that a reversal is imminent.

The strategy works by first calculating the BB and KC bands for the specified length. The default length is 20 bars. The BB bands are then multiplied by the specified multiplier, which is 2.0 by default. The KC bands are then multiplied by the specified multiplier, which is 1.5 by default.

The next step is to check if the BB and KC bands are squeezed together. If they are, then the strategy will enter a long position if the price is above the KC band and a short position if the price is below the KC band. The size of the position will be determined by the specified reversal strength, which is 0.0018 by default.

The strategy will exit the position when the BB and KC bands widen apart. The exit signal will be generated when the price moves outside of the KC band.

The Squeeze Momentum on Reversal Strategy is a relatively simple strategy to implement, but it can be effective in identifying potential reversals in the market. However, it is important to remember that no trading strategy is guaranteed to be profitable. It is always important to backtest the strategy on historical data before using it in live trading.

Here is a more detailed explanation of the different components of the strategy:

Bollinger Bands (BB): The BB indicator is a volatility indicator that uses a moving average and standard deviation to create bands around the price. The bands widen when volatility is high and narrow when volatility is low.
Keltner Channel (KC): The KC indicator is similar to the BB indicator, but it uses a different moving average and standard deviation calculation. The KC bands are typically narrower than the BB bands, which makes them more sensitive to changes in volatility.
Reversal Strength: The reversal strength is a parameter that determines the size of the position that is taken when the strategy enters a trade. A higher reversal strength will result in a larger position size.
The Squeeze Momentum on Reversal Strategy is a versatile strategy that can be used on a variety of timeframes and markets. However, it is important to note that the strategy is most effective in trending markets. In choppy markets, the strategy may generate a lot of false signals.

Here are some tips for using the Squeeze Momentum on Reversal Strategy:

Use a stop loss to protect your profits.
Use a trailing stop loss to lock in profits as the market moves in your favor.
Backtest the strategy on historical data before using it in live trading.
Use a variety of other indicators to confirm the signals generated by the Squeeze Momentum on Reversal Strategy.
The Squeeze Momentum on Reversal Strategy is a powerful tool that can be used to identify potential reversals in the market. However, it is important to use the strategy wisely and to understand its limitations. By following the tips above, you can increase your chances of success when using this strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|20|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|0.0018|Reversal Strength|
|v_input_6|true|Use TrueRange (KC)|


> Source (PineScript)

``` javascript
/*backtest
start: 2022-09-02 00:00:00
end: 2023-09-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//
// @author Odyssee
// @version=2
//
strategy(shorttitle = "Squeeze MOM", title="Squeeze Momentum on Reversal Strategy", overlay=false)

length = input(20, title="BB Length")
mult = input(2.0,title="BB MultFactor")
lengthKC=input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")
strength = input(0.0018, title="Reversal Strength")

useTrueRange = input(true, title="Use TrueRange (KC)", type=bool)

// Calculate BB
source = close
basis = sma(source, length)
dev = multKC * stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
ma = sma(source, lengthKC)
range = useTrueRange ? tr : (high - low)
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC

sqzOn  = (lowerBB > lowerKC) and (upperBB < upperKC)
sqzOff = (lowerBB < lowerKC) and (upperBB > upperKC)
noSqz  = (sqzOn == false) and (sqzOff == false)

highest = highest(high, lengthKC)
lowest = lowest(low, lengthKC)
lastsma = sma(close,lengthKC)

valin = linreg(source  -  avg(avg(highest, lowest), lastsma), lengthKC,0)

bcolor = iff( valin > 0, iff( valin > nz(valin[1]), lime, green), iff( valin < nz(valin[1]), red, maroon))
scolor = noSqz ? blue : sqzOn ? black : gray 
plot(valin, color=bcolor, style=histogram, linewidth=4)
plot(0, color=scolor, style=cross, linewidth=2)

shortcondition = valin > strength and valin < nz(valin[1]) // line become green
longcondition = valin < (strength*-1) and valin > nz(valin[1]) // line become maroon

if(longcondition)
    strategy.entry("BUY", strategy.long)
if(shortcondition)
    strategy.entry("SELL", strategy.short)

```

> Detail

https://www.fmz.com/strategy/426259

> Last Modified

2023-09-09 23:57:41