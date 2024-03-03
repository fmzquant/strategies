
> Name

双向霍尔移动平均线交易策略Dual-Hull-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135c02e99fd30d3e94d.png)

[trans]

## 概述

双向霍尔移动平均线交易策略是一种利用双向霍尔移动平均线作为交易信号的量化交易策略。该策略借鉴了传统技术分析中使用单一移动平均线的方法,改用双向霍尔移动平均线,在突破点进行买入和卖出。

## 策略原理

双向霍尔移动平均线交易策略的核心是双向霍尔移动平均线(Dual Hull Moving Average)。双向霍尔移动平均线由中轨、上轨和下轨三条线组成,代表不同的价格平均值。其计算公式为:

中轨:Mode(modeSwitch, src, len)
上轨:HULL[0] 
下轨:HULL[2]

这里的Mode函数可以选择Hull移动平均线的不同变种,包括HMA、EHMA和THMA。src代表价格源,len代表周期长度。

该策略以双向霍尔移动平均线的中轨为基准,判断价格与中轨的关系,制定交易信号:

- 当价格上穿中轨时,做多
- 当价格下穿中轨时,平仓

也就是说,如果当前K线的收盘价大于中轨的值,则在下一根K线开盘时做多;如果当前K线的收盘价小于中轨的值,则在下一根K线开盘时平仓。

## 优势分析

双向霍尔移动平均线交易策略具有以下优势:

1. 使用双向带状区域而不是单一均线,有更好的支持和阻力效应,也更有利于跟踪趋势。

2. 相比一般移动平均线,Hull移动平均线有更低的滞后性,可以更快速地响应价格变动。

3. 借鉴传统技术分析方法,容易理解,适合用于自动化交易。

4. 策略逻辑简单清晰,容易实现,适合高频算法交易。

5. 可自定义Hull移动平均类型和参数,可以针对不同品种和交易时间框架进行优化。

## 风险分析

尽管双向霍尔移动平均线交易策略有许多优势,但也存在一些风险需要注意:

1. 当价格震荡时,可能出现较多止损。可以适当调整参数,过滤部分噪声交易。

2. 该策略主要基于趋势跟随,在价格横盘时效果不佳。可以加入其他指标或机制来判断趋势。 

3. Hull移动平均线本身也存在滞后性,特别是在短期内。 Parameter优化和组合指标可以部分解决。

4. 交易信号频繁,容易过度交易。适当控制仓位管理和交易频率。

## 优化方向  

双向霍尔移动平均线交易策略还有以下几个主要的优化方向:

1. 优化Hull移动平均线的类型和参数,调整中轨的灵敏度,适应不同交易品种。

2. 加入止损机制。trailing stop或增量止损,有效控制单笔损失。

3. 结合其他指标,判断趋势方向和力度,避免被套。例如MACD,KD等。

4. 加入基于交易次数或收益率的策略激活条件。控制闭合循环次数,减少平仓。

5. 多时间框架结合。利用更高时间框架确定趋势方向,避免被噪声误导。

6. 优化出入场逻辑。可基于candle形态,增加入场确定性。

## 总结

双向霍尔移动平均线交易策略整体来说是一种利用趋势指数型移动平均线构建交易信号的量化策略。相比传统移动平均线,其响应更迅速,跟踪效果更好。该策略逻辑简单清晰,容易实现,适合自动化交易。当然也存在一些噪声风险和趋势跟随缺陷。通过参数优化,止损机制,以及组合其他指标等手段,可以强化该策略在实盘中的表现。


||


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

[/trans]

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
