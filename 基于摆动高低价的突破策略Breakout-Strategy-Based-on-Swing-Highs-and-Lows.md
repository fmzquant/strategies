
> Name

基于摆动高低价的突破策略Breakout-Strategy-Based-on-Swing-Highs-and-Lows

> Author

ChaoZhang

> Strategy Description



This article explains in detail a quantitative breakout trading strategy based on price swing highs and lows. It generates trading signals by identifying breaks of key price levels.

I. Strategy Logic

The main trading logic is:

1. Calculate the highest high and lowest low of recent 3 bars for current short-term swing.

2. Calculate highest high and lowest low of recent 50 bars for the near-term range.

3. A buy signal is generated when price breaks below the short-term low and lower than the near-term low.

4. A sell signal is generated when price breaks above the short-term high and higher than the near-term high.

5. Stop loss and take profit are set to control risks.

By identifying breaks of key levels, this can effectively detect new emerging trends. 

II. Advantages of the Strategy

The main advantages are:

Firstly, the breakout rules are simple and easy to implement.

Secondly, stop loss and take profit settings directly control trade risks.

Lastly, backtest time ranges can be set for testing different periods.

III. Potential Weaknesses

However, some potential issues exist:

Firstly, breakouts alone may generate false signals, failing to determine trends accurately.

Secondly, the lack of parameter tuning leads to limited stability. 

Lastly, stop loss and take profit levels require optimization for risk-reward.

IV. Summary

In summary, this article has explained a quantitative breakout trading strategy based on price swing highs and lows. It aims to discover opportunities through key level breaks. While the concept is simple and clear, improvements in parameter tuning are required. Overall it provides a unique breakout approach.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Stop Loss $|
|v_input_2|100|Profit Target $|
|v_input_3|true|Month|
|v_input_4|2021|Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("JetzGiantz Strategy", overlay=true)

// Getting inputs
StopTgt = input(10, minval=1, title="Stop Loss $")
ProfTgt = input(100, minval=1, title="Profit Target $")

//Filter backtest month and year
startMonth = input(1, minval=1, maxval=12, title="Month")
startYear = input(2021, minval=2000, maxval=2100, title="Year")
//Filter funtion inputs


//Calculations
Low3 = lowest(low,3)
Low50 = lowest(low,50)
High3 = highest(high,3)
High50 = highest(high,50)

if (month>=startMonth and year>=startYear)
    if(close[1] < open[1] and close > open and close > open[1] and (Low3 < Low50[1] or Low3 < Low50[2] or Low3 < Low50[3]))
		strategy.order("BuyEntry", strategy.long, when=strategy.position_size == 0, comment="BuyEntry")

if (month>=startMonth and year>=startYear)
    if(close[1] > open[1] and close < open and close > open[1] and (High3 > High50[1] or High3 > High50[2] or High3 > High50[3]))
		strategy.order("SellEntry", strategy.short, when=strategy.position_size == 0, comment="SellEntry")

strategy.exit("bracket", loss=StopTgt, profit=ProfTgt, when=strategy.position_size > 0)
strategy.exit("bracket", loss=StopTgt, profit=ProfTgt, when=strategy.position_size < 0)


```

> Detail

https://www.fmz.com/strategy/426885

> Last Modified

2023-09-15 11:47:13
