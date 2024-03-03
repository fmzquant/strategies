
> Name

霍尔指标与随机指标组合交易策略Hull-Moving-Average-and-Stochastic-RSI-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13b90cadc852da13483.png)

[trans]

## 概述

该策略运用霍尔指标判断趋势方向,再结合随机指标进行入场。当霍尔中轨上穿下轨时看涨入场,下穿时看空入场。同时,当随机指标K线从超买区下穿D线时做多,从超卖区上穿时做空。

## 策略原理

该交易策略主要利用霍尔指标判断市场趋势方向,再利用随机指标进行具体的入场。

首先,策略中定义了霍尔指标的计算方法,包括中轨、上轨和下轨的计算公式。中轨采用加权移动平均线WMA计算,上轨和下轨分别是中轨的偏移。

然后,根据中轨与上下轨的关系判断趋势方向。当中轨上穿下轨时,代表着买盘较强,属于看涨的趋势;当中轨下穿上轨时,卖盘较强,属于看空的趋势。

此外,策略中还定义了随机指标的计算方法,包括K值和D值的计算公式。K值采用的是RSI的SMA平滑,D值则是K值的再次SMA平滑。

在判断趋势方向后,如果看涨,则当随机指标的K线从超卖区域下穿D线时做多;如果看空,则当K线从超买区上穿D线时做空。

这样,结合霍尔指标的趋势判断和随机指标的超买超卖判断,可以进行比较稳定和准确的入场。

## 优势分析

该策略最大的优势在于结合趋势判断和超买超卖判断,可以对市场进行多维度的分析,入场准确性较高。

具体来说,主要有以下几点优势:

1. 霍尔指标可以有效判断市场趋势方向,进行大级别的定位;

2. 随机指标判断超买超卖,可以掌握买卖力量的变化,把握较好的入场时机;

3. 两者配合使用,可以发挥各自的优势,相互验证信号,减少假信号;

4. 通过参数调整,可以灵活适应不同品种和时间周期,适用性强;

5. 采用中轨偏移形成上下轨构建交易通道,可以发现潜在支持与阻力。

6.  STOP LOSS, EXIT ON TARGETS percent used to scale positions 大笔头寸调控

7.  Use of hull data Dictionary gives multiple asset class flexibility

8. 选定的优化方向可以提高策略稳定性和收益率

## 风险分析

该策略也存在一定的风险需要注意,主要有:

1. 霍尔指标存在滞后性,可能会错过趋势转折点,导致不必要的亏损。

2. 随机指标参数设置不当可能会产生多余信号,应适当筛选K线与D线的交叉信号。

3. 霍尔指标与随机指标配合使用,如果参数匹配不当,也可能出现错误信号。

4. 上下轨宽度过大过小都会影响交易信号质量,需要仔细测试寻找最佳参数。 

5. 近期行情不稳定,中长线指标效果可能不佳。

6. Data mismatches between hull and stoch causing false signals

7. Sharp trend changes not caught by hull can cause losses

8. Testing on more timeframes/symbols needed to verify robustness

针对这些风险,可以从以下几点进行优化:

1. 适当缩短霍尔指标长度,提高对趋势变化的敏感性。

2. 优化随机指标的参数,减少假信号。

3. 调整上下轨参数,寻找最佳通道宽度。

4. 增加其他指标验证信号,如MACD等。

5. 增加止损策略,以控制风险。

## 优化方向

该策略还可以从以下几个方面进行优化:

1. 测试更多品种和更多时间周期参数,验证策略稳定性。

2. 增加止损机制。如尾随止损,移动止损等,可以更好控制风险。

3. 优化入场条件逻辑,设置更严格的过滤条件,减少假信号。

4. 研究如何利用霍尔指标通道更好确定支持与阻力位。

5. 探索是否可以加入其他指标的验证信号。

6. 参数优化。如霍尔指标长度,随机指标K、D平滑参数等的优化。

7. 增加仓位管理功能。根据回撤、连胜次数等调整仓位大小。

8. 增加了止损,止盈规则。实盘必须。

9. Optimize hull length parameter for better trend sensitivity

10. Add additional filters or confirming indicators to improve signal quality 

11. Explore using hull bands to identify dynamic support/resistance levels

12. Parameter optimization for stoch RSI lengths, overbought/oversold levels

13. Introduce better position sizing and risk management rules

## 总结

整体来说,该策略整合趋势判断和超买超卖判断进行入场是一个行之有效的思路。但由于指标本身存在的问题,其交易信号也并非完全可靠,需要进一步优化。如果能够找到最佳的参数组合,并辅以其他验证指标和风险控制手段,该策略的效果还是可以期待的。总之,在参数调整、止损机制、仓位管理等方面都需要更多的测试和优化,才能使该策略稳定可靠并能够在实盘中获利。

||

## Overview

This strategy uses the Hull Moving Average to determine the trend direction and combines it with the Stochastic RSI for entry signals. Long trades are taken when the HMA middle line crosses above the lower line, and short trades when it crosses below the upper line. In addition, long trades are entered when the Stochastic RSI K line crosses below the D line from the overbought zone, while short trades are entered on crosses above from the oversold zone.

## Strategy Logic

The key components of this strategy are the Hull Moving Average for trend direction and the Stochastic RSI for timing entry signals.

Firstly, the Hull MA calculation includes formulas for the middle, upper and lower bands. The middle band uses a Weighted Moving Average, while the upper and lower bands are offset from the middle line.

The trend direction is determined by the relationship between the middle band and the upper/lower bands. An upward crossover of the middle line indicates buying pressure and an uptrend, while a downward crossover signals increased selling pressure and a downtrend.

The Stochastic RSI calculation is also defined, including the Smoothed K and D values. The K value uses an SMA smoothing on the RSI, while the D value is a second SMA smoothing on the K. 

After the trend direction is determined, long trades are taken when the Stoch RSI K line crosses below the D line from the overbought zone during an uptrend. Short trades are taken when the K line crosses above the D line from the oversold area during a downtrend.

Combining the Hull trend filter and Stoch RSI overbought/oversold analysis provides a robust multi-factor approach to entering trades.

## Advantages

The key benefits of this strategy are:

1. The Hull MA effectively identifies the overall market trend direction.

2. The Stoch RSI determines overbought/oversold levels to time entries. 

3. Using both together reduces false signals and combines strengths.

4. Flexibility to optimize parameters for different symbols and timeframes.

5. Hull bands identify potential dynamic support and resistance. 

6. Incorporates position sizing and risk management rules.

7. Multi-asset capability through hull data dictionary.

8. Optimizable components to improve profitability and reduce drawdowns.

## Risks

Some risks to consider:

1. Hull MA has lag and may miss trend changes.

2. Stoch RSI may generate excessive signals if parameters not optimized.

3. Mismatch between Hull and Stoch parameters can cause bad signals.

4. Hull bands too wide or narrow will impact signal quality.

5. Recent volatile markets challenge medium/long-term indicators. 

6. Data mismatches between Hull and Stoch causing false signals. 

7. Sharp trend changes not caught by Hull can cause losses.

8. Need expanded testing on multiple timeframes and symbols.

Some ways to address these:

1. Shorten Hull MA length for greater trend sensitivity.

2. Optimize Stoch RSI to filter out false crosses. 

3. Find optimal Hull band channel width.

4. Add additional confirming indicators like MACD.

5. Incorporate stop loss strategies to control risk.

## Optimization Opportunities

Some ways this strategy could be improved:

1. Test on more symbols across various timeframes to verify robustness.

2. Incorporate stop loss mechanics like trailing stops or moving averages.

3. Optimize entry rules, set stricter filters to reduce false signals.

4. Explore using Hull bands to better define support and resistance. 

5. Evaluate additional confirming indicators to improve signal reliability. 

6. Parameter optimization for lengths, overbought/oversold levels, etc.

7. Introduce better position sizing and risk management.

8. Added entry, stop loss and take profit rules essential for live trading.

9. Optimize Hull length for better trend sensitivity.

10. Add filters or confirming indicators to improve signal quality.

11. Explore Hull bands for dynamic support/resistance levels.

12. Optimize Stoch RSI parameters like length, overbought/oversold. 

13. Implement advanced position sizing and risk management.

## Conclusion

Overall this is an effective approach combining trend and momentum. However, inherent indicator weaknesses mean signals should not be blindly trusted without further optimization and risk controls. With refined parameters, additional filters, and stop losses, this strategy offers potential. More extensive testing is needed for parameters, risk management, and position sizing to make it robust and profitable for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: all|short|long|
|v_input_2|2016|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2030|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|30|Backtest Stop Day|
|v_input_8|88|Stoch Upper Threshold|
|v_input_9|5|Stoch Lower Threshold|
|v_input_10|0.7|SL %|
|v_input_11|2.1|TP %|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13|0|Hull Variation: Hma|Thma|Ehma|
|v_input_14|180|Length(180-200 for floating S/R , 55 for swing entry)|
|v_input_15|true|Color Hull according to trend?|
|v_input_16|false|Color candles based on Hull's Trend?|
|v_input_17|true|Show as a Band?|
|v_input_18|true|Line Thickness|
|v_input_19|40|Band Transparency|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Basic Hull Ma Pack tinkered by InSilico 
//Converted to Strategy by DashTrader
strategy("Hull Suite + Stoch RSI Strategy v1.1", overlay=true, pyramiding=1, initial_capital=100, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.023)
strat_dir_input = input(title="Strategy Direction", defval="all", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)
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

stoch_upper_input = input(88, "Stoch Upper Threshold", type=input.float)
stoch_lower_input = input(5, "Stoch Lower Threshold", type=input.float)
sl = input(0.7, "SL %", type=input.float, step=0.1)
tp = input(2.1, "TP %", type=input.float, step=0.1)
// slowEMA = ema(close, slowEMA_input)

// vwap = vwap(close)
// rsi = rsi(close, rsi_input)


// stoch rsi
smoothK = 3
smoothD = 3
lengthRSI = 14
lengthStoch = 14
rsi1 = rsi(close, 14)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
// Component Code Stop
//////////////////////////////////////////////////////////////////////
//INPUT
src = input(close, title="Source")
modeSwitch = input("Hma", title="Hull Variation", options=["Hma", "Thma", "Ehma"])
length = input(180, title="Length(180-200 for floating S/R , 55 for swing entry)")
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

bgcolor(color = k < stoch_lower_input  and crossover(k, d) ? color.green : na)
bgcolor(color = d > stoch_upper_input and crossover(d, k) ? color.red : na)

notInTrade = strategy.position_size == 0

if notInTrade and HULL[0] > HULL[2] and testPeriod() and k < stoch_lower_input and crossover(k, d)
// if HULL[0] > HULL[2] and testPeriod()
    stopLoss = close * (1 - sl / 100) 
    profit25 = close * (1 + (tp / 100) * 0.25)
    profit50 = close * (1 + (tp / 100) * 0.5)
    takeProfit = close * (1 + tp / 100)
    
    
    strategy.entry("long", strategy.long, alert_message="buy")
    strategy.exit("exit long 25%", "long", stop=stopLoss, limit=profit25, qty_percent=25, alert_message="profit_25")
    strategy.exit("exit long 50%", "long", stop=stopLoss, limit=profit50, qty_percent=25, alert_message="profit_50")
    strategy.exit("exit long", "long", stop=stopLoss, limit=takeProfit)
    
    // line.new(bar_index, profit25, bar_index + 4, profit25, color=color.green)
    // line.new(bar_index, profit50, bar_index + 4, profit50, color=color.green)
    // box.new(bar_index, stopLoss, bar_index + 4, close, border_color=color.red, bgcolor=color.new(color.red, 80))
    // box.new(bar_index, close, bar_index + 4, takeProfit, border_color=color.green, bgcolor=color.new(color.green, 80))

    
if notInTrade and HULL[0] < HULL[2] and testPeriod() and d > stoch_upper_input and crossover(d, k)
// if HULL[0] < HULL[2] and testPeriod()
    stopLoss = close * (1 + sl / 100)
    profit25 = close * (1 - (tp / 100) * 0.25)
    profit50 = close * (1 - (tp / 100) * 0.5)
    takeProfit = close * (1 - tp / 100)
    
    

    strategy.entry("short", strategy.short, alert_message="sell")
    strategy.exit("exit short 25%", "short", stop=stopLoss, limit=profit25, qty_percent=25, alert_message="profit_25")
    strategy.exit("exit short 50%", "short", stop=stopLoss, limit=profit50, qty_percent=25, alert_message="profit_50")
    strategy.exit("exit short", "short", stop=stopLoss, limit=takeProfit)
    
    // line.new(bar_index, profit25, bar_index + 4, profit25, color=color.green)
    // line.new(bar_index, profit50, bar_index + 4, profit50, color=color.green)
    // box.new(bar_index, stopLoss, bar_index + 4, close, border_color=color.red, bgcolor=color.new(color.red, 80))
    // box.new(bar_index, close, bar_index + 4, takeProfit, border_color=color.green, bgcolor=color.new(color.green, 80))

// var table winrateDisplay = table.new(position.bottom_right, 1, 1)
// table.cell(winrateDisplay, 0, 0, "Winrate: " + tostring(strategy.wintrades / strategy.closedtrades * 100, '#.##')+" %", text_color=color.white)
```

> Detail

https://www.fmz.com/strategy/429581

> Last Modified

2023-10-18 12:40:23
