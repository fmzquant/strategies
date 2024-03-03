
> Name

趋势突破双均线过滤策略Range-Breakthrough-Dual-Moving-Average-Filtering-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e2eddffa37fe5c91cd.png)
[trans]

## 概述

这是一个利用均线和布林通道进行趋势判断,并结合突破过滤和止损原理的策略。它可以在趋势变化时及时捕捉信号,通过双均线过滤减少错误信号,设置止损来控制风险。

## 策略原理

该策略主要由以下几部分组成:

1. 趋势判断:使用MACD判断价格趋势,区分多头和空头趋势。

2. 范围过滤:使用布林通道判断价格波动范围,过滤掉不突破范围的信号。

3. 双均线确认:快速EMA和慢速EMA组成的双均线,用于确认趋势信号。只有快速EMA>慢速EMA时才产生买入信号。

4. 止损机制:设定止损点,在价格向不利方向突破止损点时平仓止损。

进入信号的判断逻辑是:

1. MACD判断为向上趋势
2. 价格突破布林通道上轨
3. 快速EMA高于慢速EMA

当以上3个条件同时满足时产生买入信号。

平仓逻辑分两种,止盈平仓和止损平仓。止盈点为进入价乘以一定比例,止损点为进入价乘以一定比例。当价格突破其中一个点时平仓。

## 优势分析

这种策略具有以下优势:

1. 能及时捕捉趋势变化,traceback较少。
2. 通过双均线过滤错误信号,提高信号质量。 
3. 止损机制有效控制单笔损失。
4. 参数优化空间大,可以调整至最佳状态。

## 风险分析

该策略也存在一些风险:  

1. 在震荡行情中产生的错误信号可能造成损失。
2. 止损点设置不当可能造成不必要的损失。
3. 参数不当可能导致策略效果不佳。

针对这些风险,可以通过优化参数,调整止损位置等方式进行优化和改进。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 调整双均线长度,寻找最佳参数组合。
2. 测试不同的止损方式,如追踪止损、震荡止损等。 
3. 对MACD参数进行测试寻找最优参数。
4. 利用机器学习对参数进行自动优化。
5. 增加附加条件过滤信号。

通过测试不同的参数设置,评估收益率和夏普比率,可以找到该策略的最佳状态。

## 总结

这是一个利用趋势判断、范围过滤、双均线确认和止损思想的量化策略。它能够有效判断趋势方向,在利润最大化和风险控制之间找到平衡。通过参数优化和机器学习等方式,该策略还有很大的改进空间,能够得到更好的效果。

|| 

## Overview  

This is a strategy that utilizes moving averages and Bollinger Bands for trend judgment, combined with breakout filtering and stop loss principles. It can capture signals in a timely manner when trend changes, reduce false signals through dual moving average filtering, and control risks by setting stop loss.

## Strategy Principle  

The strategy consists of the following main parts:  

1. Trend judgment: Use MACD to judge the price trend and distinguish bullish and bearish trends.  

2. Range filtering: Use Bollinger Bands to judge the price fluctuation range and filter out signals that do not break through the range.

3. Dual moving average confirmation: The fast EMA and slow EMA form the dual moving average to confirm trend signals. Buy signals are generated only when fast EMA > slow EMA.  

4. Stop loss mechanism: Set stop loss points. Close positions when prices break through stop loss points in unfavorable directions.

The logic for entry signals is:  

1. MACD judges an upward trend  
2. Price breaks through the upper rail of Bollinger Bands
3. Fast EMA is higher than slow EMA  

When all three conditions are met at the same time, a buy signal is generated.

There are two types of closing positions, take profit and stop loss. The take profit point is the entry price multiplied by a certain percentage, and the stop loss point is the entry price multiplied by a certain percentage. When the price breaks through either point, close positions.

## Advantage Analysis   

The advantages of this strategy are:

1. Can capture trend changes in a timely manner with fewer tracebacks.  
2. Reduce false signals by filtering with dual moving averages, improving signal quality.
3. The stop loss mechanism effectively controls single loss.
4. Large parameter optimization space that can be adjusted to the optimal state.

## Risk Analysis   

There are also some risks in this strategy:   

1. False signals generated in sideways markets may lead to losses.  
2. Improper settings of stop losses may lead to unnecessary losses.   
3. Inappropriate parameters may result in poor strategy performance.  

To address these risks, the strategy can be optimized by adjusting parameters, setting stop loss positions, etc.  

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Adjust the dual moving average length to find the optimal parameter combination.  
2. Test different stop loss methods, such as trailing stop loss, oscillating stop loss, etc.   
3. Test MACD parameters to find the optimal settings.  
4. Use machine learning for automated parameter optimization.
5. Add additional conditions to filter signals.  

By testing different parameter settings and evaluating returns and Sharpe ratios, the optimal state of the strategy can be found.  

## Conclusion  

This is a quantitative strategy that utilizes trend judgment, range filtering, dual moving average confirmation and stop loss ideas. It can effectively determine the trend direction and strike a balance between profit maximization and risk control. Through parameter optimization, machine learning and other means, the strategy has great room for improvement to achieve better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Percentage Take Profit Stop Loss|
|v_input_float_1|1.5|LongProfit(%)|
|v_input_float_2|1.5|ShortProfit(%)|
|v_input_float_3|1.5|LongStop(%)|
|v_input_float_4|1.5|ShortStop(%)|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|100|Sampling Period|
|v_input_float_5|3|Range Multiplier|
|v_input_2|150|Sensitivity|
|v_input_3|20|FastEMA Length|
|v_input_4|40|SlowEMA Length|
|v_input_5|20|BB Channel Length|
|v_input_6|2|BB Stdev Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Range Filter Buy and Sell Strategies", shorttitle="Range Filter Strategies", overlay=true,pyramiding = 5)

// Original Script > @DonovanWall
// Adapted Version > @guikroth
// 
// Updated PineScript to version 5
// Republished by > @tvenn
// Strategizing by > @RonLeigh
//////////////////////////////////////////////////////////////////////////
// Settings for 5min chart, BTCUSDC. For Other coin, change the parameters
//////////////////////////////////////////////////////////////////////////



SS = input.bool(false,"Percentage Take Profit Stop Loss")


longProfitPerc = input.float(title='LongProfit(%)', minval=0.0, step=0.1, defval=1.5) * 0.01

shortProfitPerc = input.float(title='ShortProfit(%)', minval=0.0, step=0.1, defval=1.5) * 0.01


longLossPerc = input.float(title='LongStop(%)', minval=0.0, step=0.1, defval=1.5) * 0.01

shortLossPerc = input.float(title='ShortStop(%)', minval=0.0, step=0.1, defval=1.5) * 0.01


// Color variables
upColor   = color.white
midColor  = #90bff9
downColor = color.blue

// Source
src = input(defval=close, title="Source")

// Sampling Period
// Settings for 5min chart, BTCUSDC. For Other coin, change the paremeters
per = input.int(defval=100, minval=1, title="Sampling Period")

// Range Multiplier
mult = input.float(defval=3.0, minval=0.1, title="Range Multiplier")

// Smooth Average Range
smoothrng(x, t, m) =>
    wper = t * 2 - 1
    avrng = ta.ema(math.abs(x - x[1]), t)
    smoothrng = ta.ema(avrng, wper) * m
    smoothrng
smrng = smoothrng(src, per, mult)

// Range Filter
rngfilt(x, r) =>
    rngfilt = x
    rngfilt := x > nz(rngfilt[1]) ? x - r < nz(rngfilt[1]) ? nz(rngfilt[1]) : x - r : 
       x + r > nz(rngfilt[1]) ? nz(rngfilt[1]) : x + r
    rngfilt
filt = rngfilt(src, smrng)

// Filter Direction
upward = 0.0
upward := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])

// Target Bands
hband = filt + smrng
lband = filt - smrng

// Colors
filtcolor = upward > 0 ? upColor : downward > 0 ? downColor : midColor
barcolor = src > filt and src > src[1] and upward > 0 ? upColor :
   src > filt and src < src[1] and upward > 0 ? upColor : 
   src < filt and src < src[1] and downward > 0 ? downColor : 
   src < filt and src > src[1] and downward > 0 ? downColor : midColor

filtplot = plot(filt, color=filtcolor, linewidth=2, title="Range Filter")

// Target
hbandplot = plot(hband, color=color.new(upColor, 70), title="High Target")
lbandplot = plot(lband, color=color.new(downColor, 70), title="Low Target")

// Fills
fill(hbandplot, filtplot, color=color.new(upColor, 90), title="High Target Range")
fill(lbandplot, filtplot, color=color.new(downColor, 90), title="Low Target Range")

// Bar Color
barcolor(barcolor)

// Break Outs
longCond = bool(na)
shortCond = bool(na)
longCond := src > filt and src > src[1] and upward > 0 or 
   src > filt and src < src[1] and upward > 0
shortCond := src < filt and src < src[1] and downward > 0 or 
   src < filt and src > src[1] and downward > 0

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1



// alertcondition(longCondition, title="Buy alert on Range Filter", message="Buy alert on Range Filter")
// alertcondition(shortCondition, title="Sell alert on Range Filter", message="Sell alert on Range Filter")
// alertcondition(longCondition or shortCondition, title="Buy and Sell alert on Range Filter", message="Buy and Sell alert on Range Filter")


////////////// 副

sensitivity = input(150, title='Sensitivity')
fastLength = input(20, title='FastEMA Length')
slowLength = input(40, title='SlowEMA Length')
channelLength = input(20, title='BB Channel Length')
multt = input(2.0, title='BB Stdev Multiplier')

DEAD_ZONE = nz(ta.rma(ta.tr(true), 100)) * 3.7

calc_macd(source, fastLength, slowLength) =>
    fastMA = ta.ema(source, fastLength)
    slowMA = ta.ema(source, slowLength)
    fastMA - slowMA

calc_BBUpper(source, length, multt) =>
    basis = ta.sma(source, length)
    dev = multt * ta.stdev(source, length)
    basis + dev

calc_BBLower(source, length, multt) =>
    basis = ta.sma(source, length)
    dev = multt * ta.stdev(source, length)
    basis - dev

t1 = (calc_macd(close, fastLength, slowLength) - calc_macd(close[1], fastLength, slowLength)) * sensitivity

e1 = calc_BBUpper(close, channelLength, multt) - calc_BBLower(close, channelLength, multt)

trendUp = t1 >= 0 ? t1 : 0
trendDown = t1 < 0 ? -1 * t1 : 0

duoad = trendUp > 0 and trendUp > e1

kongad = trendDown > 0 and trendDown > e1



duo =  longCondition and duoad

kong = shortCondition and kongad


//Alerts
plotshape(longCondition  and trendUp > e1 and  trendUp > 0 , title="Buy Signal", text="Buy", textcolor=color.white, style=shape.labelup, size=size.small, location=location.belowbar, color=color.new(#aaaaaa, 20))
plotshape(shortCondition  and trendDown > e1 and  trendDown > 0 , title="Sell Signal", text="Sell", textcolor=color.white, style=shape.labeldown, size=size.small, location=location.abovebar, color=color.new(downColor, 20))




if  longCondition and trendUp > e1 and  trendUp > 0 
    strategy.entry('Long',strategy.long, comment = "buy" )

if  shortCondition and trendDown > e1 and  trendDown > 0 
    strategy.entry('Short',strategy.short, comment = "sell" )




longlimtPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortlimtPrice = strategy.position_avg_price * (1 - shortProfitPerc)
   
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)



if (strategy.position_size > 0)  and SS == true
    
    strategy.exit(id="Long",comment_profit = "Profit",comment_loss = "StopLoss", stop=longStopPrice,limit = longlimtPrice)
    

if (strategy.position_size < 0)  and SS == true
    
    strategy.exit(id="Short",comment_profit = "Profit",comment_loss = "StopLoss", stop=shortStopPrice,limit = shortlimtPrice)

```

> Detail

https://www.fmz.com/strategy/433442

> Last Modified

2023-11-27 17:03:08
