
> Name

基于价格通道的VWAP交易策略Price-Channel-VWAP-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b39fdf6004987758ec.png)

## Overview  

This strategy is called "Price Channel VWAP Trading Strategy". It is a strategy that implements VWAP trading based on price channels. The main idea of this strategy is: within the price channel, use the moving average line of the VWAP indicator and its upper and lower offset channel lines for buy and sell point judgment. When the channel lines are broken, open positions according to the fixed percentage of the total assets, and close positions when prices regress to the VWAP moving average line.

## Strategy Principle   

This strategy calculates the current average transaction price through the VWAP indicator. VWAP represents the average price and is the ratio of turnover to trading volume. The VWAP indicator reflects the degree of deviation between the current price and the historical average trading price.

The strategy uses the moving average line of the VWAP indicator and its offset channel lines. The proportions of the offset channel lines are set through the parameters "longlevel1" and "shortlevel1". When the price breaks through the upper offset channel line, open long positions according to the percentage of positions set by the parameter "lotsizelong"; when the price breaks through the lower offset channel line, open short positions according to the percentage of positions set by the parameter "lotsizeshort". After opening positions, choose to close positions when prices regress to around the VWAP moving average line.  

The parameter settings of this strategy fully reflect the idea of channel trading. Users can adjust the channel width and size of positions as a percentage of total assets according to their own preferences, thereby realizing different degrees of trading frequency.

## Advantage Analysis   

This trading strategy has the following advantages:  

1. Using VWAP indicators to determine value midpoints can capture mainstream market direction  
2. Trading within channel ranges avoids noise interference for clearer operation  
3. Combining channels of different levels, deploying in batches reduces risk
4. Timely profit taking by regression avoids losses caused by rapid reversals  

Since the VWAP indicator can well reflect the average price level, trading based on its channel lines can effectively lock in value midpoints and avoid being biased by short-term fluctuations. At the same time, combining channels with different parameters and building positions in batches can effectively control risks and prevent one-sided risk concentrations resulting in forced liquidations. Finally, by timely profit taking to close positions near the regression of the VWAP moving average line can reduce losses caused by price reversals.

## Risk Analysis  

This strategy also has some risks to note:  

1. The VWAP indicator is insensitive to high-frequency trading and cannot reflect extreme price anomalies  
2. Improper channel width parameter settings may lead to overly aggressive trading  
3. If the range of regression operations to close positions is too wide, it may cause trapped losses  

The VWAP indicator is insensitive to high-frequency trading volatility. In case of extreme price gaps or short-term anomalies, it will still trigger unnecessary trading signals and losses. In addition, if the channel parameters are set too loose, it will easily form invalid price penetration signals. Finally, if the range of positions closing in regression operations is set too wide, it may miss the best timing for profit taking and cause trapped losses.  

The countermeasures are to reasonably assess parameter settings and appropriately adjust channel parameters; while combining other indicators to judge price anomalies and avoid blind following signals; finally evaluating parameter optimization of channels of different levels and regression ranges to achieve better profit taking effects.  

## Optimization Directions   

This strategy can be optimized in the following directions:  

1. Increase the level of channels and optimize parameter combinations  
2. Combine trading volume indicators to determine the validity of breakthroughs  
3. Add stop loss strategies and set stop loss by drawdown ratio  

More levels of channel lines can be added and parameters combined for optimization to achieve more stable trading effects. In addition, trading volume judgment rules can be added to avoid invalid price gaps causing trading losses. Finally, stop loss rules can also be set so that when the loss of positions reaches a certain percentage, stop loss to exit positions, effectively controlling risks.  

## Summary   

This strategy combines the VWAP indicator with price channels to achieve a relatively stable trading strategy. The strategy parameter settings are flexible for users to adjust according to their own preferences. This strategy can effectively determine the direction of value midpoints. Through parameter combination and batch building of positions, stable profitability can be achieved. Although there is still room for improvement in the strategy, overall it is a quantitative trading strategy with high practicality.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot long, %|
|v_input_2|100|Lot short, %|
|v_input_3|true|short 1|
|v_input_4|true|long 1|
|v_input_5|true|Short line 1|
|v_input_6|-1|Long line 1|
|v_input_7|true|Offset|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "VWAP Bands Backtest", shorttitle = "VWAP Bands Backtest", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
lotsizelong = input(100, defval = 100, minval = 0, maxval = 10000, title = "Lot long, %")
lotsizeshort = input(100, defval = 100, minval = 0, maxval = 10000, title = "Lot short, %")
short1 = input(true, title = "short 1")
long1 = input(true, title = "long 1")
shortlevel1 = input(1.0, title = "Short line 1")
longlevel1 = input(-1.0, title = "Long line 1")
needoffset = input(true, title = "Offset")

fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Variables
size = strategy.position_size
mult = 1 / syminfo.mintick
truetime = true

//VWAP
ma = vwap(hlc3)

//Levels
longline1 = long1 ? round(ma * ((100 + longlevel1) / 100) * mult) / mult : close
shortline1 = short1? round(ma * ((100 + shortlevel1) / 100) * mult) / mult : close


//Lines
colorlong1 = long1 ? color.lime : na
colorshort1 = short1 ? color.red : na
offset = needoffset ? 1 : 0
plot(shortline1, offset = offset, color = colorshort1, title = "Short line 1")
plot(ma, offset = offset, color = color.blue, title = "MA line")
plot(longline1, offset = offset, color = colorlong1, title = "Long line 1")


//Trading
lotlong = 0.0
lotshort = 0.0
lotlong := size == 0 ? (strategy.equity / close) * (lotsizelong / 100) : lotlong[1]
lotshort := size == 0 ? (strategy.equity / close) * (lotsizeshort / 100) : lotshort[1]


if ma > 0
    if lotlong > 0
        lotslong = 0.0
        lotslong := strategy.position_size > 0 ? round(strategy.position_size / lotlong) : 0.0
        strategy.entry("L1", strategy.long, lotlong, limit = longline1, when = (lotslong == 0 and long1 and truetime))
    if lotshort > 0
        lotsshort = 0.0
        lotsshort := strategy.position_size < 0 ? round(strategy.position_size / lotshort) : 0.0
        strategy.entry("S1", strategy.short, lotshort, limit = shortline1, when = (lotsshort == 0 and short1 and truetime))
if strategy.position_size > 0
    strategy.exit("TPL", "L1", limit = ma)
if strategy.position_size < 0
    strategy.exit("TPS", "S1", limit = ma)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("L1")
    strategy.cancel("S1")
    strategy.cancel("TPL")
    strategy.cancel("TPS")
```

> Detail

https://www.fmz.com/strategy/442111

> Last Modified

2024-02-19 14:25:18
