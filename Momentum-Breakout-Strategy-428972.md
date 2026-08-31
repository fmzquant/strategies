
> Name

Momentum-Breakout-Strategy-428972

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on momentum breakout principles and combines RSI and Stochastic indicators for trend following. It uses the DEMA indicator to determine price momentum direction, RSI to judge overbought and oversold levels, and Stochastic KDJ lines to confirm the trend. It performs longing and shorting operations according to these indicator signals. The strategy is suitable for medium-to-long term trend trading.

## Strategy Logic

The strategy uses the DEMA indicator to determine the direction of price momentum. DEMA is a double exponential moving average that is more sensitive than regular EMA, allowing earlier detection of trend changes. The strategy calculates the percentage difference between price and DEMA to judge the direction and strength of price momentum.

When the price rise is greater than the set parameter, the price is considered to be in an uptrend. When the price fall is greater than the set parameter, the price is considered to be in a downtrend. Combined with the RSI indicator to determine if it is in overbought or oversold zones, if the RSI is lower than the oversold line, it indicates an oversold state and long positions can be opened. If the RSI is higher than the overbought line, it indicates an overbought state and short positions can be opened.

In addition, the strategy also uses the KDJ indicator's stochastic lines K and D to confirm the trend. When the K line crosses above the D line, a long signal is triggered. When the K line crosses below the D line, a short signal is triggered.

Finally, the strategy also includes time filter conditions that are only effective within specified years, months and days, thus avoiding unnecessary trades.

## Advantage Analysis

This strategy has the following advantages:

1. Using DEMA to judge price momentum is more sensitive and can detect trend changes earlier.

2. Combining RSI to determine overbought and oversold prevents wrongly entering at market turning points. 

3. Using Stochastic KDJ to confirm signals can filter out some wrong signals.

4. Adding time filters only allows trading within specified periods, avoiding unnecessary capital occupation.

5. Clear and easy-to-understand logic flow for analysis.

6. Adjustable indicator parameters can be optimized for different products and timeframes.

## Risk Analysis

There are also some risks to note for this strategy:

1. DEMA, RSI and other indicators can give false signals, leading to unnecessary losses. Parameters can be adjusted or more filters added to reduce misjudgement probability.

2. Dual indicator combos cannot fully avoid reversals in huge market moves. Stop losses may be triggered in high volatility markets.

3. Fixed time intervals may miss some trading opportunities, more flexible trade time controls are recommended.

4. Trend trading methods require tolerating drawdowns and consecutive losses psychologically.

5. Continuous monitoring of parameter optimization is needed to adapt to changing market conditions.

## Improvement Directions

The strategy can be optimized in the following aspects:

1. Test combinations of more indicators to find more stable and smooth trading logic. Such as MACD, KD, MOVING AVERAGE etc.

2. Test and optimize indicator parameters to find optimal value ranges.

3. Add stop loss strategies like moving stop loss, trailing stop loss etc. to reduce drawdowns. 

4. Add money management functions like fixed trade size, dynamic position adjustment to control risk.

5. Optimize entry and exit logic to ensure high-probability entry and early stop loss.

6. Add more filters to ensure entry only after a clear trend. Such as volume indicators, channel indicators etc.

7. Optimize time controls to fit market rhythms. For example, only trade during US or Asia sessions.

## Conclusion

This strategy focuses on trend trading, using DEMA for trend direction, RSI for overbought/oversold levels, and KDJ for confirmation to control risk. It has simple logic, high customizability, and is suitable for medium-to-long term holding. With continuous improvements in parameter optimization, stop loss strategies and risk control, this strategy has the potential to become a stable system for following the major market trend. Of course, no strategy can fully avoid market risks. Traders need patience and discipline, always remembering the "capital preservation" principle.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-1|buyper|
|v_input_2|true|sellper|
|v_input_3|50|Dema Length|
|v_input_4|true|Band for OverBought|
|v_input_5|-1|Band for OverSold|
|v_input_6|10|lengthrsi|
|v_input_7|30|overSold|
|v_input_8|55|overBought|
|v_input_9|3|smoothK|
|v_input_10|3|smoothD|
|v_input_11|14|lengthRSI|
|v_input_12|14|lengthStoch|
|v_input_13_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|20|srsilow|
|v_input_15|80|srsiup|
|v_input_16|2018|yearfrom|
|v_input_17|2019|yearuntil|
|v_input_18|6|monthfrom|
|v_input_19|12|monthuntil|
|v_input_20|true|dayfrom|
|v_input_21|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version= 2
strategy("DPD+STOCH+RSI ", overlay=false)

buyper =input(-1,step=0.1)
sellper=input(1,step=0.1)

demalen = input(50,title="Dema Length")

e1= ema(close,demalen)
e2=ema(e1,demalen)
demaprice  =   2 * e1 - e2

price=close

demadifper =  ((price-demaprice)/price)*100



plot(demadifper, color=red)
OverDemaPer = input(1, title="Band for OverBought")
UnderDemaPer= input(-1,title="Band for OverSold")




band1 = hline(OverDemaPer)
band0 = hline(UnderDemaPer)
zeroline=0
fill(band1, band0, color=green, transp=90)


lengthrsi = input(10)
overSold = input( 30 )
overBought = input( 55 )
vrsi = rsi(price, lengthrsi)


smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src = input(close, title="RSI Source")

rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
srsilow=input(20)
srsiup=input(80)







yearfrom = input(2018)
yearuntil =input(2019)
monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if ( ( (demadifper<buyper) or crossover(demadifper,buyper)) and (vrsi<overSold) ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( vrsi>overBought  and ( crossunder(k,d) ) and ( demadifper>sellper  or crossunder(demadifper,sellper)  )  ) 

    strategy.entry("SELL", strategy.short,stop=close, oca_name="TREND",  comment="SELL")
else
    strategy.cancel(id="SELL")
    
    
    
```

> Detail

https://www.fmz.com/strategy/428972

> Last Modified

2023-10-11 15:01:12
