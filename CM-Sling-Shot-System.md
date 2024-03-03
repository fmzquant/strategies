
> Name

CM-Sling-Shot-System

> Author

ChaoZhang

> Strategy Description

Sling Shot System + Even Better System.

I get this email about a Trend Following System that sells for $1000 but I could get it that day for only $500!!!

I watch the video showing this Amazing System which may have taken me an entire minute to figure out the code.

I code it up. And Hey…It’s not a bad system. It’s good for people who may need a Entry Signal to get them in a Trending Move, and KEEP them in a Trending Move while providing a defined Stop.

So I thought I would save the community the Very Fair price of Only $500 for a system that consists of a couple of EMA’s and a few Rules…and give it to you for free.

See Link Below for Main Chart Showing 2nd System!!!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1cff6c996298e8426b1.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Aggressive Entry?, Or Use as Alert To Potential Conservative Entry?|
|v_input_2|true|Show Conservative Entry?|
|v_input_3|true|Show Trend Arrows at Top and Bottom of Screen?|
|v_input_4|false|Only Choose 1 - Either Conservative Entry Arrows or 'B'-'S' Letters|
|v_input_5|true|Show Conservative Entry Arrows?|
|v_input_6|true|Show 'B'-'S' Letters?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-06 00:00:00
end: 2022-05-05 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Created by ChrisMoody on 10-05-2014
//Known as SlingShot Method that keeps Traders on Trending Side of Market.
study("CM_SlingShotSystem", overlay=true)
sae = input(true, title="Show Aggressive Entry?, Or Use as Alert To Potential Conservative Entry?")
sce = input(true, title="Show Conservative Entry?")
st = input(true, title="Show Trend Arrows at Top and Bottom of Screen?")
def = input(false, title="Only Choose 1 - Either Conservative Entry Arrows or 'B'-'S' Letters")
pa = input(true, title="Show Conservative Entry Arrows?")
sl = input(true, title="Show 'B'-'S' Letters?")

//EMA Definitions
emaSlow = ta.ema(close, 62)
emaFast = ta.ema(close, 38)
//Aggressive Entry or Alert To Potential Trade
pullbackUpT() => emaFast > emaSlow and close < emaFast
pullbackDnT() => emaFast < emaSlow and close > emaFast
//Conservative Entry Code For Highlight Bars
entryUpT() => emaFast > emaSlow and close[1] < emaFast and close > emaFast
entryDnT() => emaFast < emaSlow and close[1] > emaFast and close < emaFast
//Conservative Entry True/False Condition
entryUpTrend = emaFast > emaSlow and close[1] < emaFast and close > emaFast ? 1 : 0
entryDnTrend = emaFast < emaSlow and close[1] > emaFast and close < emaFast ? 1 : 0
//Define Up and Down Trend for Trend Arrows at Top and Bottom of Screen
upTrend = emaFast >= emaSlow
downTrend = emaFast < emaSlow
//Definition for Conseervative Entry Up and Down PlotArrows
codiff = entryUpTrend == 1 ? entryUpTrend : 0
codiff2 = entryDnTrend == 1 ? entryDnTrend : 0
//Color definition for Moving Averages
col = emaFast > emaSlow ? color.lime : emaFast < emaSlow ? color.red : color.yellow
//Moving Average Plots and Fill
p1 = plot(emaSlow, title="Slow MA", style=plot.style_linebr, linewidth=4, color=col)
p2 = plot(emaFast, title="Slow MA", style=plot.style_linebr, linewidth=2, color=col)
//fill(p1, p2, color=silver, transp=50)


if sl and codiff
    strategy.entry("SELL", strategy.short)
else if sl and codiff2
    strategy.entry("BUY", strategy.long)
    
    
    
```

> Detail

https://www.fmz.com/strategy/361675

> Last Modified

2022-05-07 17:06:50
