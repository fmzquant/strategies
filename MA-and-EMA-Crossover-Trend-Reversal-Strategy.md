
> Name

MA-and-EMA-Crossover-Trend-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses EMA and MA crossover to determine trend reversals, belonging to typical trend following strategies. 

## Strategy Logic

1. Calculate EMA and MA with specified periods respectively.

2. EMA crossover above MA generates buy signals. 

3. EMA crossover below MA generates sell signals.

4. Can set trading only in specific months and date ranges.

5. Hold only one direction at a time, no reverse openings.

6. Simple and clear rules easy to implement.

## Advantages

1. EMA and MA crossovers can capture trend reversal opportunities.

2. Date filter avoids erroneous trades around major events.

3. Holding one direction reduces unnecessary reverse trades.

4. Higher capital usage efficiency.

5. Suitable for short-term trend trading.

## Risks

1. Crossovers may have false signals causing unnecessary losses.

2. No effective control over loss size per trade. 

3. Larger loss risks without a stop loss.

4. Rigid date settings may miss trading opportunities. 

5. Inappropriate parameters negatively affect performance.

## Enhancement

1. Test different MA periods to find optimal values.

2. Evaluate additional filters on crossovers. 

3. Incorporate stop loss to control loss per trade.

4. Optimize date filter rules to maintain flexibility.

5. Research proper take profit positioning. 

6. Consider dynamic position sizing.

## Conclusion

This strategy trades EMA and MA crossover reversals simply and efficiently but has some room for improvement. Further refinements like parameter optimization and risk controls can turn it into a steady short-term system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|emaLength|
|v_input_2|89|maLength|
|v_input_3|8|monthfrom|
|v_input_4|12|monthuntil|
|v_input_5|true|dayfrom|
|v_input_6|31|dayuntil|


> Source (PineScript)

``` pinescript
//@version=2
strategy(title = "MA + EMA Crossover Strategy ",shorttitle="eMA", overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100,commission_type=strategy.commission.percent,commission_value=0.1,initial_capital=100000)


emaLength =input(34)

maLength = input(89)

ema=ema(close,emaLength)
ma=sma(close,maLength)

plot(ema,linewidth=3,color=green)
plot(ma,linewidth=3,color=red)
longCond= crossover(ema,ma)
shortCond=crossover(ma,ema)





monthfrom =input(8)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longCond    and  month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil) 
    strategy.entry("LONG", strategy.long, stop=close, oca_name="TREND",  comment="LONG")
    
else
    strategy.cancel(id="LONG")
    



if ( shortCond   and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil ) 

    strategy.entry("SHORT", strategy.short,stop=close, oca_name="TREND",  comment="SHORT")
else
    strategy.cancel(id="SHORT")
    



```

> Detail

https://www.fmz.com/strategy/427393

> Last Modified

2023-09-20 16:54:46
