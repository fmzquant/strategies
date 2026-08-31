
> Name

Mean-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

The core idea of this strategy is to buy when there is an upward breakout of the short-term moving average during the session, in order to capture opportunities for short-term trend reversals.

### Strategy Logic

1. Define buy condition: When the low price breaks below the downward short-term SMA
2. Buy signal: Go long when the buy condition is met
3. Stop loss EXIT: Default exit after 20 bars 

Specifically, the strategy calculates the crossover between the low price and the SMA of length smoothness as the buy signal. When the low price breaks down from above across the SMA line, a buy signal is generated. Then it exits unconditionally after 20 bars.

The strategy attempts to capture short-term reversal opportunities. When the price falls to a certain level, the short-term SMA provides support, and the bullish forces could take over again, pushing the price to bounce back. Buying at this time could gain profits from the pullback.

### Advantage Analysis

1. The strategy idea is simple and intuitive, easy to understand and implement, suitable for beginners
2. Utilizes the support of short-term moving averages, has some probability of capturing reversal opportunities  
3. No need to select specific products, can be widely applied across different markets
4. Flexible adjustment of MA parameters to adapt to different cycles
5. Clear stop loss controls single trade loss

### Risk Analysis

1. Failed reversal risk. Price may continue to fall after breaking the MA instead of bouncing back
2. Frequent stop loss risk. High reversal frequency leads to frequent stop loss
3. Parameter optimization risk. Different products and cycles need parameter tuning, otherwise the results may be poor
4. Transaction cost risk. Frequent trading increases transaction costs

Risks can be reduced by optimizing stop loss strategy, adding trend filter, allowing loose holding position etc.

### Optimization Directions

1. Optimize stop loss methods to track price changes in real time, avoid fixed stop loss being trapped
2. Add trend judgment, only buy when the trend turns around, avoiding counter-trend trading
3. Consider adding re-entry opportunities, pyramiding during pullback
4. Test the impact of different MA parameters on results to find optimal parameter combinations
5. Evaluate parameter effectiveness across different products, build parameter optimization system
6. Compare impact of different stop loss bar quantities, optimize stop loss strategy

### Summary

This is a simple short-term mean reversal strategy, using MA breakout as entry timing. The advantages are being simple and widely applicable; the disadvantages are vulnerablility to stop loss and failed reversal risks. Risks can be managed through strict stop loss control, and the strategy can be improved by optimizing rules around trend filters, re-entry etc. It is suitable for beginners to learn and optimize such basic strategy ideas.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Dipness|
|v_input_2|10|Smoothing|
|v_input_3|20|Exit After This Many Bars|


> Source (PineScript)

``` pinescript
//@version=3
strategy(title="Buy The Dip", shorttitle="BTFD", overlay=true)
dipness = input(title="Dipness",defval=2)
smoothness = input(title="Smoothing",defval=10,minval=0)
lookforward = input(title="Exit After This Many Bars", defval=20)

thedip = low - (atr(20) * dipness)
thedipsma = sma(thedip,smoothness)

buyCondition = crossunder(low,thedipsma)

if (buyCondition)
    strategy.entry("long", strategy.long)
    
strategy.close("long",when=buyCondition[20]) 

plot(thedipsma)
```

> Detail

https://www.fmz.com/strategy/427438

> Last Modified

2023-09-21 10:35:47
