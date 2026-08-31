
> Name

Bitcoin-Short-Term-Trading-Strategy-Based-on-True-Strength-Index

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy identifies bitcoin market trends by calculating the True Strength Index (TSI) and enters long/short positions filtered by RSI indicator to implement algorithmic trading of bitcoin. It suits investors who want to trade bitcoin tick data programmatically.

## Strategy Logic

The core of this strategy is the True Strength Index (TSI). TSI measures the absolute magnitude and direction of price changes by double smoothing the percentage price change, thereby identifying the absolute strength of price up and down moves. The specific calculation is as follows:

1. Calculate the percentage price change Pc
2. Double smooth Pc using long-term EMA and short-term EMA to generate double_smoothed_pc
3. Double smooth the absolute value of Pc to generate double_smoothed_abs_pc  
4. TSI value equals double_smoothed_pc divided by double_smoothed_abs_pc multiplied by 100

When TSI crosses over its signal line tsi2, a long signal is generated. When TSI crosses below tsi2, a short signal is generated. In addition, the strategy filters TSI signals with RSI - only taking long signals when RSI is above 50 and short signals when RSI is below 50, to avoid some false signals.

## Advantage Analysis

The advantages of this strategy include:

1. TSI can detect the absolute strength and direction of price moves, and is sensitive in capturing trends.
2. The double EMA smooths price change rate and is resilient to market noise and spikes.
3. RSI filter further avoids wrong trades due to noise.  
4. Short-term trading allows capturing temporary opportunities in the market.
5. The strategy has large parameter tuning space for optimization, like EMA periods, RSI parameters etc.

## Risk Analysis

The risks of this strategy include:

1. As a trend following indicator, TSI has lagging issue and may miss price reversal points.
2. The RSI filter condition is too strict and may miss some trading chances.
3. The double EMA filter may also filter out some valid signals.  
4. High trading frequency of short-term trading introduces higher trading cost and slippage risks.

The lagging issue and filter effect can be reduced by relaxing RSI filter rules and shortening EMA periods. Proper stop loss strategy should be used to strictly control per trade risks.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize TSI and RSI parameters to find the best combination. Tuning long/short EMA periods, RSI parameters etc.

2. Introduce more technical indicators to build a multifactor model. MA, KD etc can be added to take advantage of each indicator.

3. Optimize entry rules to avoid long in downtrend and short in uptrend. Judge direction based on higher timeframe trends. 

4. Optimize stop loss strategies like trailing stop loss, time-based stop loss, breakout stop loss etc.

5. Optimize exit rules to avoid premature or late exits. Volatility indicators can help determine proper exit points.

6. Optimize trading products, trading sessions to focus on the most effective ones.

## Conclusion

This strategy identifies bitcoin short-term trends with True Strength Index and filters signals with RSI for algorithmic bitcoin trading. It has the advantage of sensitively capturing trends and filtering noise, but also has some lagging issues and trading risks. Multi-faceted optimizations can further improve strategy performance to develop a reliable bitcoin trading expert advisor.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Timeframe|
|v_input_2|25|Long Length|
|v_input_3|13|Short Length|
|v_input_4|13|Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// strategy("True Strength Indicator BTCUSD 15p", shorttitle="TSI BTCUSD 15p",initial_capital=1000, commission_value=0.15, commission_type =strategy.commission.percent, default_qty_value=100 , overlay = false, pyramiding=10, default_qty_type=strategy.percent_of_equity)

//BASED ON True Strength Indicator MTF
resCustom = input(title="Timeframe",  defval="15" )
long = input(title="Long Length",  defval=25)
short = input(title="Short Length",  defval=13)
signal = input(title="Signal Length",  defval=13)
price = request.security(syminfo.tickerid,resCustom,close)


double_smooth(src, long, short) =>
    fist_smooth = ta.ema(src, long)
    ta.ema(fist_smooth, short)
pc = ta.change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(math.abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
tsi2=ta.ema(tsi_value, signal)
plot(tsi_value, color=color.lime,linewidth=2)
plot(tsi2, color=color.red,linewidth=2)




rsiserie = ta.rsi(price,7)
cciserie = ta.cci(price,14)
stochserie = ta.stoch(price,14,3,3)

plot(rsiserie,color=color.purple)



hline(30, title="Zero")
hline(50, title="Zero",linestyle=hline.style_solid, linewidth=2)
hline(70, title="Zero")

buy = ta.crossover(tsi_value, tsi2) //and rsiserie[1]<25 //and cciserie<-100 and stochserie<20
sell = ta.crossunder(tsi_value, tsi2) //and rsiserie[1]>85 //and cciserie>100 and stochserie>80


alertcondition(buy, title='TSI system', message='Buy signal at!' )
alertcondition(sell, title='TSI system', message='Sell signal at!' )

strategy.entry("BUY", strategy.long, 1, when = buy)
strategy.entry("SELL", strategy.short, 1, when = sell ) 

greentsi =tsi_value
redtsi = tsi2

bgcolor( greentsi>redtsi and rsiserie > 50 ? color.lime : na, transp=90)
bgcolor( greentsi<redtsi and rsiserie < 50 ? color.red : na, transp=90)

yellow1= redtsi > greentsi and rsiserie > 50 
yellow2 = redtsi < greentsi and rsiserie < 50 
bgcolor( yellow1 ? yellow : na, transp=80)
bgcolor( yellow2  ? yellow : na, transp=50)

bgcolor( yellow1 and yellow1[1] ? yellow : na, transp=70)
bgcolor( yellow2  and yellow2[2] ? yellow : na, transp=70)

bgcolor( rsiserie > 70 ? color.lime : na, transp=60)
bgcolor( rsiserie < 30  ? color.red : na, transp=60)

```

> Detail

https://www.fmz.com/strategy/428611

> Last Modified

2023-10-07 15:12:08
