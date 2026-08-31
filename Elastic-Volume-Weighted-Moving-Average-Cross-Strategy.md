
> Name

Elastic-Volume-Weighted-Moving-Average-Cross-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses two EVWMA lines with different periods to generate crossovers and produce buy and sell signals. When the short period line crosses over the long period line, it generates a buy signal. When the short period line crosses below the long period line, it generates a sell signal.

## Strategy Logic

The strategy identifies trend changes by calculating and crossing two EVWMA lines with different periods. 

Specifically, it first calculates two EVWMA lines:

1. Short period line m1, with period length1, default to 5

2. Long period line m2, with period length2, default to 40

It then uses the crossover and crossunder functions to determine the crossover situations between m1 and m2:

- If m1 crosses over m2, it generates a buy signal and executes long operation

- If m1 crosses below m2, it generates a sell signal and executes short operation

Note that EVWMA gives more weight to recent data compared to simple moving average. The calculation formula is:

```
data = (nz(data[1]) * (nb_floating_shares - volume)/nb_floating_shares) + (volume_price/nb_floating_shares)
```

Where nz(data[1]) is the EVWMA value of previous period, nb_floating_shares is total volume of the period, volume is current period volume, and volume_price is current period turnover. This achieves the effect of assigning higher weights on recent data.

## Advantage Analysis

The advantages of this strategy include:

1. EVWMA responds faster to price changes and improves profit opportunities 

2. Crossover of dual EVWMA lines identifies turning points timely

3. Simple logic and easy to implement

4. Customizable period lengths to adapt different market environments

5. No complex parameter optimization needed and easy for live trading

## Risks and Solutions

There are also some risks with this strategy:

1. Crossovers may generate excessive invalid signals without filtering market noise

   - Solution: Combine with volume or other indicators to filter signals

2. Hard to identify trend reversal points and risks missing reversals

   - Solution: Adjust period parameters or add other reversal indicators 

3. No stop loss or take profit, unable to effectively control risks

   - Solution: Set proper stop loss and take profit ratios based on historical data and volatility
   
4. Insufficient parameter optimization leads to improper period settings

   - Solution: Optimize parameters through backtesting and choose proper lengths
   
## Improvement Directions

Some directions to improve the strategy:

1. Add stop loss and take profit to strictly control risks

2. Optimize period lengths to find the best parameters

3. Add volume filter to reduce invalid trades

4. Combine with reversal indicators to avoid missing reversals

5. Dynamically optimize parameters based on market changes

6. Differentiate bull and bear markets and use different parameters

7. Introduce machine learning models to determine trading timing based on big data

## Conclusion

In summary, this EVWMA cross strategy can effectively identify trend changes and generate trading signals by calculating and crossing dual EVWMA lines. The logic is simple but there are risks and improvement directions. By optimizing stop loss, parameter selection, integrating other indicators etc, the strategy can be strengthened for live trading. Overall, this is a beneficial exploration of moving average cross strategies and worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|EVWMA Short|
|v_input_2|40|EVWMA Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-08-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy("Elastic Volume Weighted Moving Average Cross Strategy", shorttitle="EVWMA Cross", overlay=true)
length1=input(5, title="EVWMA Short")
length2=input(40, title="EVWMA Long")

nbfs1=sum(volume, length1)
nbfs2=sum(volume, length2)

medianSrc=close

calc_evwma(price, length, nb_floating_shares) => 
    data = (nz(data[1]) * (nb_floating_shares - volume)/nb_floating_shares) + (volume*price/nb_floating_shares)
    data
    

m1=calc_evwma(medianSrc, length1, nbfs1)
m2=calc_evwma(medianSrc, length2, nbfs2)

if (crossover(m1, m2))
    strategy.entry("MA2CrossLE", strategy.long, comment="MA2CrossLE")

if (crossunder(m1, m2))
    strategy.entry("MA2CrossSE", strategy.short, comment="MA2CrossSE")

p1=plot(m1,color=orange,linewidth=2, title="evwma")
p2=plot(m2,color=orange,linewidth=2, title="evwma")
```

> Detail

https://www.fmz.com/strategy/427192

> Last Modified

2023-09-18 22:08:05
