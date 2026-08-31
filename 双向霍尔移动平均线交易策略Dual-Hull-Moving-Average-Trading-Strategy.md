
> Name

双向霍尔移动平均线交易策略Dual-Hull-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135c02e99fd30d3e94d.png)



## Overview

The Dual Hull Moving Average Trading Strategy is a quantitative trading strategy that uses the Dual Hull Moving Average as trading signals. It draws on the traditional technical analysis approach of using a single moving average line and replaces it with the Dual Hull Moving Average to make long and short decisions at crossover points.

## Principles  

At the core of the Dual Hull Moving Average Trading Strategy is the Dual Hull Moving Average (DHMA). The DHMA consists of three lines: middle, upper and lower rails, representing different average price values. The formulas are:

Middle Rail: Mode(modeSwitch, src, len)  
Upper Rail: HULL[0]
Lower Rail: HULL[2]  

Here the Mode function can choose between different Hull MA variants like HMA, EHMA or THMA. Src stands for the price source, and len is the period parameter.   

The strategy uses the middle rail of the DHMA as reference to determine the price relationship and generate trading signals:  

- When price crosses above middle rail, go long.  
- When price crosses below middle rail, close position.

In other words, if the closing price of the current bar is above the middle rail value, go long on the next bar; if the closing price is below, close long position on the next bar.

## Advantages

The Dual Hull Moving Average Trading Strategy has the following advantages:

1. Uses a triple bands mechanism instead of a single moving average line for better support/resistance effects and trend tracking.  

2. Compared to common MAs, The Hull Moving Averages have less lag and respond better to price changes.  

3. Adopts traditional technical analysis techniques for easy understanding, suitable for algo trading.
   
4. The logic is simple and clear, easy to implement, fitting high frequency algorithmic trading.  

5. Customizable Hull MA types and parameters for optimization across different products and time frames.

## Risks

While having many merits, the strategy also poses some risks to note:   

1. More whipsaws may occur during choppy sideways markets. Fine tune parameters to filter out some noise trades.

2. The strategy mainly follows trends, less effective during flat periods. Additional filters for trend strength may help.   

3. Hull MAs still have some degree of lag, especially for short terms. Parameter optimization and combo indicators could alleviate this.  

4. Frequent signals may lead to over-trading. Manage position sizing and trade frequency.

## Optimization Directions

Here are some major aspects to optimize for the strategy:

1. Optimize Hull MA types and parameters to fine tune middle rail sensitivity for different products.  

2. Add stop loss mechanisms like trailing stop or incremental stop loss to control single trade loss amount.

3. Combine with other indicators to determine trend direction and strength, avoiding traps. E.g. MACD, KD etc.   

4. Add strategy activation conditions based on number of trades or profit ratio to control cycle closure counts, reducing exits.
   
5. Multi-timeframe combination. Use higher TFs to decide overall trend to avoid noise.  

6. Refine entry logic. Confirm entries with candle patterns to improve entry certainties. 

## Conclusion

In summary, the Dual Hull Moving Average Trading Strategy is a quantitative approach utilizing the fast responding, trend following Hull Moving Averages to construct trading signals. Compared to traditional MAs, it has quicker response and better tracking abilities. The strategy logic is simple and clear, easy to automate for algorithm trading. There are still risks of noises and trend following limitations. Techniques like parameter tuning, stop loss, and combining other indicators can enhance its practical performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2016|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|0|Hull Variation: Hma|Thma|Ehma|
|v_input_9|55|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_10|true|Color Hull according to trend?|
|v_input_11|false|Color candles based on Hull's Trend?|
|v_input_12|true|Show as a Band?|
|v_input_13|true|Line Thickness|
|v_input_14|40|Band Transparency|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Basic Hull Ma Pack tinkered by InSilico 
//Converted to Strategy by DashTrader
strategy("Hull Suite Strategy", overlay=true, pyramiding=1, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0)
//////////////////////////////////////////////////////////////////////
// Testing Start dates
testStartYear = input(2016, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
//Stop date if you want to use a specific range of dates
testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)


testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
// Component Code Stop
//////////////////////////////////////////////////////////////////////
//INPUT
HAClose = security(heikinashi(syminfo.tickerid), timeframe.period, close)
src = input(close, title="Source")
modeSwitch = input("Hma", title="Hull Variation", options=["Hma", "Thma", "Ehma"])
length = input(55, title="Length(180-200 for floating S/R , 55 for swing entry)")
switchColor = input(true, "Color Hull according to trend?")
candleCol = input(false,title="Color candles based on Hull's Trend?")
visualSwitch  = input(true, title="Show as a Band?")
thicknesSwitch = input(1, title="Line Thickness")
transpSwitch = input(40, title="Band Transparency",step=5)

//FUNCTIONS
//HMA
HMA(_src, _length) =>  wma(2 * wma(_src, _length / 2) - wma(_src, _length), round(sqrt(_length)))
//EHMA    
EHMA(_src, _length) =>  ema(2 * ema(_src, _length / 2) - ema(_src, _length), round(sqrt(_length)))
//THMA    
THMA(_src, _length) =>  wma(wma(_src,_length / 3) * 3 - wma(_src, _length / 2) - wma(_src, _length), _length)
    
//SWITCH
Mode(modeSwitch, src, len) =>
      modeSwitch == "Hma"  ? HMA(src, len) :
      modeSwitch == "Ehma" ? EHMA(src, len) : 
      modeSwitch == "Thma" ? THMA(src, len/2) : na
      
//OUT
HULL = Mode(modeSwitch, src, length)
MHULL = HULL[0]
SHULL = HULL[2]

//COLOR
hullColor = switchColor ? (HULL > HULL[2] ? #00ff00 : #ff0000) : #ff9800

//PLOT
///< Frame
Fi1 = plot(MHULL, title="MHULL", color=hullColor, linewidth=thicknesSwitch, transp=50)
Fi2 = plot(visualSwitch ? SHULL : na, title="SHULL", color=hullColor, linewidth=thicknesSwitch, transp=50)
///< Ending Filler
fill(Fi1, Fi2, title="Band Filler", color=hullColor, transp=transpSwitch)
///BARCOLOR
barcolor(color = candleCol ? (switchColor ? hullColor : na) : na)


if HULL[0] > HULL[2] and testPeriod()
    strategy.entry("long", strategy.long)
if HULL[0] < HULL[2] and testPeriod()
    strategy.close("long")
```

> Detail

https://www.fmz.com/strategy/434954

> Last Modified

2023-12-11 11:30:15
