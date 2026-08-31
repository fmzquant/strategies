
> Name

TSI-and-CCI-Hull-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1674aec3ecb384ea6f5.png)



## Overview

This strategy integrates the Relative Strength Index (TSI), Commodity Channel Index (CCI) and Hull Moving Average (Hull MA) indicators to form a trend tracking trading strategy. It can perform long-term tracking trades on any trading variety in hourly or higher time frames.

## Strategy Principle 

The strategy mainly uses the TSI and CCI indicators to judge the trend direction and overbought/oversold situations of the market, as well as the Hull MA to determine the intermediate trend of prices, and the three are combined as the basic conditions for opening positions.

Specifically, when the fast line of TSI crosses above the slow line, CCI indicator crosses above +20 && n1 rises, go long; when the fast line of TSI crosses below the slow line, CCI indicator crosses below -20 && n1 falls, go short. Hull MA is used to filter the intermediate trend, only going long when the price is below Hull MA, and going short when the price is above Hull MA.

By confirming with indicators across different cycles, false breakouts can be effectively filtered to track medium- and long-term trends.

## Advantage Analysis

This is a relatively stable and efficient trend tracking strategy, with the following main advantages:

1. Using TSI to judge long-term trend directions is more reliable, avoiding interference from short-term market noise;

2. The addition of the CCI indicator can confirm overbought/oversold phenomena and filter out some false signals;  

3. Hull MA’s judgement makes entry points more precise, greatly improving the probability of profit;

4. The integration of indicators with different parameters can improve the reliability of signals and reduce interference probability.

5. Flexible parameter settings of the strategy can be optimized for different market cycles.


## Risk Analysis  

Although the strategy is relatively stable, there are still some risks to note:

1. The market may experience violent reversals that cannot be quickly stopped for loss, causing relatively large losses;

2. TSI Diff and CCI indicators may both have false signals and lags, missing some entry points;

3. Improper parameter settings can also lead to excessively high trading frequency or decline in signal quality.

Countermeasures:

1. Adjust stop loss appropriately to control single loss;

2. Confirm with other indicators as appropriate to improve signal accuracy; 

3. Adjust parameters according to market to ensure strategy stability.

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Try different combinations of parameter indicators to find the best match;  

2. Introduce machine learning algorithms to achieve adaptive optimization of parameters;

3. Increase capital management module for more stable profits;

4. Incorporate more filters to increase strategy win rate.

These will be the focuses for future optimizations.

## Summary  

This strategy comprehensively utilizes the TSI, CCI and Hull MA indicators to form a relatively stable and efficient trend tracking strategy. It successfully leverages the advantages of multi-cycle indicators to improve signal quality. The next step will be to further enhance the stability and profitability of the strategy through parameter optimization, filter enhancement and other means.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Long Length|
|v_input_2|50|Short Length|
|v_input_3|25|Signal Length|
|v_input_4_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|25|Period|
|v_input_6|100|Upper Line|
|v_input_7|-100|Lower Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="TSI CCI Hull", shorttitle="TSICCIHULL", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= false, calc_on_every_tick=true, pyramiding=0)
long = input(title="Long Length", type=input.integer, defval=50)
short = input(title="Short Length", type=input.integer, defval=50)
signal = input(title="Signal Length", type=input.integer, defval=25)
price=input(title="Source",type=input.source,defval=open)
Period=input(25, minval=1)
lineupper = input(title="Upper Line", type=input.integer, defval=100)
linelower = input(title="Lower Line", type=input.integer, defval=-100)
p=price
length= Period
double_smooth(src, long, short) =>
    fist_smooth = ema(src, long)
    ema(fist_smooth, short)
pc = change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
keh = tsi_value*5 > linelower ? color.red : color.lime
teh = ema(tsi_value*5, signal*5) > lineupper ? color.red : color.lime
meh = ema(tsi_value*5, signal*5) > tsi_value*5 ? color.red : color.lime
i1=plot(tsi_value*5, title="TSI Value", color=color.black, linewidth=1,transp=100)
i2=plot(ema(tsi_value*5, signal*5), title="TSI Signal", color=color.black, linewidth=1,transp=100)
fill(i1,i2,color=meh,transp=85)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=color.black, linewidth=10)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=color.white, linewidth=8,transp=0)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=meh, linewidth=5)
n2ma = 2 * wma(p, round(length / 2))
nma = wma(p, length)
diff = n2ma - nma
sqn = round(sqrt(length))
n1 = wma(diff, sqn)
cci = (p - n1) / (0.015 * dev(p, length))
c = cci > 0 ? color.lime : color.red
c1 = cci > 20 ? color.lime : color.silver
c2 = cci < -20 ? color.red : color.silver
cc=plot(cci, color=c, title="CCI Line", linewidth=2)
cc2=plot(cci[1], color=color.gray, linewidth=1,transp=100)
fill(cc,cc2,color=c,transp=85)
plot(cross(20, cci) ? 20 : na, style=plot.style_cross,title="CCI cross UP",  color=c1, linewidth=2,transp=100,offset=-2)
plot(cross(-20, cci) ? -20 : na, style=plot.style_cross,title="CCI cross down",  color=c2, linewidth=2,transp=100,offset=-2)

TSI1=ema(tsi_value*5, signal*5)
TSI2=ema(tsi_value*5, signal*5)[2]

hullma_smoothed = wma(2*wma(n1, Period/2)-wma(n1, Period), round(sqrt(Period)))
//plot(hullma_smoothed*200)

longCondition = TSI1>TSI2 and hullma_smoothed<price and cci>0
if (longCondition and cci>cci[1] and cci > 0 and n1>n1[1])
    strategy.entry("Buy Here", strategy.long)

shortCondition = TSI1<TSI2 and hullma_smoothed>price and cci<0
if (shortCondition and cci<cci[1] and cci < 0 and n1<n1[1])
    strategy.entry("Sell Here", strategy.short)
```

> Detail

https://www.fmz.com/strategy/433570

> Last Modified

2023-11-28 15:53:03
