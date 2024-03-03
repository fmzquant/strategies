
> Name

基于趋势过滤的快速QQE交叉策略Fast-QQE-Crossover-Trading-Strategy-Based-on-Trend-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c89b198e6f1774e105.png)

[trans]

## 概述

基于趋势过滤的快速QQE交叉策略是一种跟踪趋势的交易策略,它使用快速QQE交叉以及移动平均线进行趋势方向过滤。QQE或定性定量估计基于相对强度指数,但使用平滑技术作为额外的转换。可以选择三种交叉(默认情况下全部选择):

- RSI信号交叉零线(XZERO)  
- RSI信号交叉快速RSIatr线(XQQE)
- RSI信号退出RSI阈值通道(买入/卖出)

买入/卖出信号可以可选地通过移动平均线进行过滤:

- 对于买入信号,收盘价必须高于快速移动平均线,并且快速移动平均线(EMA8)> 中速移动平均线(EMA20)> 慢速移动平均线(SMA50)
- 对于卖出信号,收盘价必须低于快速移动平均线,并且快速移动平均线(EMA8)< 中速移动平均线(EMA20)< 慢速移动平均线(SMA50)

和/或趋势方向过滤器:

- 对于买入信号,收盘价必须高于慢速移动平均线(SMA50),方向移动平均线(EMA20)必须为绿色。  
- 对于卖出信号,收盘价必须低于慢速移动平均线(SMA50),方向移动平均线(EMA20)必须为红色。

XZERO和XQQE不包括在过滤中,它们用于指示待定的买入/卖出信号,特别是XZERO。

这个策略应该可以在任何货币对和大多数时间框架的图表上工作。

## 策略原理

这个策略的核心思想是利用快速QQE指标的方向性交叉作为交易信号,并通过移动平均线的组合来过滤噪音交易信号,从而捕捉趋势方向。

具体来说,策略使用以下指标和信号:

**快速QQE指标**:这是一个基于RSI的指标,进行了额外的平滑处理,使其更敏感和快速。指标由三条线组成:中轨为RSI的指数移动平均线,上轨为中轨+ 快速ATR * 一个系数,下轨为中轨 - 快速ATR * 一个系数。当RSI上穿上轨时为卖出信号,当RSI下穿下轨时为买入信号。

**零线交叉**:当RSI中轨线交叉零线时产生信号,向上交叉为买入信号,向下交叉为卖出信号。这些信号表示趋势变化的先兆。  

**通道突破**:当RSI中轨线进入设定的阈值通道时产生信号,突破上通道为卖出信号,突破下通道为买入信号。这些是较强的趋势信号。

**移动平均线组合**:使用快中慢三组移动平均线,快速线为8周期,中速线为20周期,慢速线为50周期。当三条线排列为:快>中>慢时为上升趋势,当为快<中<慢时为下降趋势。组合用于判断总体趋势方向。

**趋势方向过滤**:收盘价在慢速移动平均线之上且中速移动平均线向上(该周期内最高价>最低价)才产生买入信号;收盘价在慢速移动平均线之下且中速移动平均线向下时产生卖出信号。这可以过滤掉部分反向的假信号。  

通过组合使用快速QQE指标的交叉信号和移动平均线的趋势过滤,可以在较大时间框架的趋势方向上捕捉中短期的反转点,形成比较完整的交易系统。同时,指标参数设置得比较敏感,可以尽早捕捉到趋势的转折点。

总的来说,这是一个追踪中长期趋势的策略,通过快速指标捕捉短期反转买入/卖出时机,并利用移动平均线过滤来减少反向操作的风险,而将收益最大化。

## 策略优势

- 使用快速敏感指标QQE,可以快速捕捉反转信号
- 应用多组移动平均线判断大周期方向,避免反向交易
- 包含多种交叉信号,可以组合使用,提高获利机会
- 参数可调整,可以针对不同品种和周期进行优化  
- 采用指标本身的通道突破信号,没有画定独立的通道,避免参数依赖
- 可以很好的在中长线大趋势下捕捉短期反转行情
- 概念简单清晰,容易理解和实现

## 策略风险

该策略也存在一些潜在风险:  

- 快速指标容易产生假信号,移动平均线无法完全过滤,存在追踪错误方向的风险
- 大周期发生转折时,容易形成风险的反向交易信号
- 未考虑资金管理因素,存在超量交易造成亏损的可能
- 没有止损设置,亏损扩大的风险较大 
- 回测数据拟合风险,实盘效果有待验证

对策和解决方法包括:

- 调整移动平均线参数,使用更多周期判断趋势
- 增加其他指标组合过滤,如MACD、bias等
- 加入止损策略,控制单笔亏损
- 实盘验证,优化参数

## 策略优化方向  

该策略还有进一步优化的空间:

1. 对QQE指标的快慢线参数进行优化,找到最佳参数组合
2. 测试更多的移动平均线组合,寻找最优过滤效果
3. 增加其他指标的组合,如MACD等辅助过滤信号
4. 应用资金管理策略,优化仓位管理  
5. 设定止损策略,控制单笔亏损风险
6. 针对不同品种参数进行优化
7. 在更高周期判断趋势,避免被短期反转误导

通过参数优化,组合更多指标,并辅以切实可行的资金与风险管理手段,有望提高该策略的实盘表现。

## 总结

整体来看,基于趋势过滤的快速QQE交叉策略是一个非常值得考虑的选择。它的优势在于快速抓取反转交易机会的同时,利用多组移动平均线判断大趋势,尽量避免反向错误交易。通过对指标参数和过滤条件的优化,并配合严格的资金管理,该策略可以获取较为稳定的投资收益。

当然风险也不能忽视,实盘验证和不断优化调整是必要的,以确保策略的实用性和可靠性。总的来说,值得投资人学习和长期跟踪实践。相信随着算法交易技术的进步,这类基于快速指标与趋势过滤的策略会得到进一步改进和普及。

||

## Overview  

The fast QQE crossover trading strategy based on trend filter is a trend following trading strategy that uses fast QQE crosses with Moving Averages for trend direction filtering. QQE or Qualitative Quantitative Estimation is based on the relative strength index, but uses a smoothing technique as an additional transformation. Three crosses can be selected (all selected by default):
 
- RSI signal crossing ZERO (XZERO)   
- RSI signal crossing Fast RSIatr line (XQQE)  
- RSI signal exiting the RSI Threshhold Channel (BUY/SELL)   

The (BUY/SELL) alerts can be optionally filtered by the Moving averages:  

- For BUY alert the Close must be above the fast MA and fast MA (EMA8) > medium MA (EMA20) > slow MA (SMA50).  
- For SELL alert the Close must be below the fast MA and fast MA (EMA8) < medium MA (EMA20) < slow MA (SMA50).

and/or directional filter:  

- For BUY alert the Close must be above the slow MA (SMA50) and the directional MA (EMA20) must be green.   
- For SELL alert the Close must be below the slow MA (SMA50) and the directional MA (EMA20) must be red.

The XZERO and XQQE are not included in the filtering, they are used to indicate pending BUY/SELL alerts, particularly the XZERO.  

This strategy should work on any currency pair and most chart timeframes.   

## Strategy Principle  

The core idea of this strategy is to use the directional crossover of the fast QQE indicator as trading signals and filter out noisy trading signals through the combination of moving averages to capture trend direction.  

Specifically, the strategy uses the following indicators and signals:  

**Fast QQE Indicator**: This is an RSI based indicator with additional smoothing to make it more sensitive and fast. The indicator consists of three lines: the middle line is the exponential moving average of RSI, the upper line is the middle line + fast ATR * a factor, and the lower line is the middle line - fast ATR * a factor. When the RSI goes above the upper line, it is a sell signal. When the RSI goes below the lower line, it is a buy signal.   

**Zero Line Crossover**: It generates signals when the middle line of RSI crosses the zero line. Upward crossover is buy signal and downward crossover is sell signal. These signals indicate the prelude of trend changes.   

**Channel Breakout**: It generates signals when the middle line of RSI enters the set threshold channel. Breaking the upper channel is the sell signal and breaking the lower channel is the buy signal. These are stronger trend signals.   

**Moving Average Combo**: Use a combination of fast (8 periods), medium (20 periods) and slow (50 periods) moving averages. When the three lines are arranged as: fast > medium > slow, it is an upward trend. When arranged as fast < medium < slow, it is a downward trend. The combo is used to determine the overall trend direction.  

**Trend Direction Filter**: A buy signal is only generated when the close price is above the slow moving average and the medium moving average (20 periods) is upward (highest price of the period > lowest price). A sell signal is generated only when the close price is below the slow moving average and the medium moving average (20 periods) is downward. This can filter out some reverse fake signals.   

By combining the use of crossover signals from the fast QQE indicator and trend filtering from moving averages, it captures short-term reversal points on major timeframe trends to form a relatively complete trading system. At the same time, the indicator parameters are set to be relatively sensitive so as to capture the turning point of trends as early as possible.    

In summary, this is a strategy that tracks medium and long term trends, uses fast indicators to capture timing of short term reversals for entry/exit, and utilizes moving average filtering to reduce the risk of trading against the direction and thus maximize returns.

## Advantages of the Strategy   

- Uses fast and sensitive QQE indicator to quickly capture reversal signals  
- Applies multiple moving averages to determine large cycle direction and avoid trading against trends 
- Includes multiple cross signals that can be used in combination to increase profit opportunities  
- Adjustable parameters that can be optimized for different products and timeframes
- Uses indicator's own channel breakout signals instead of drawing separate channels, avoiding parameter dependency   
- Can capture short term reversal moves very well under large trend cycles
- Simple and clear concepts, easy to understand and implement 

## Risks of the Strategy  

There are also some potential risks with this strategy:   

- Fast indicators tend to produce false signals which cannot be fully filtered out by moving averages, risk of tracking wrong direction exists  
- When large cycle trend reversal happens, reverse trade signals tend to form which poses risks
- No consideration of money management factors, risks of over trading and losses exists  
- No stop loss in place, risks of expanding losses is large
- Backtest data fitting risk, actual performance remains to be verified

Counter measures and solutions include:  

- Adjust moving average parameters, use more cycle lengths to determine trends
- Add other indicators like MACD, bias etc for combo filtering 
- Add stop loss strategies to control single trade loss size
- Real money testing, optimize parameters  

## Optimization Directions   

There is room for further optimization of this strategy:  

1. Optimize fast and slow line parameters of QQE indicator to find optimum parameter combination
2. Test more moving average combo to find optimal filtering performance  
3. Add other indicators like MACD for auxiliary signal filtering  
4. Apply money management strategies to optimize position sizing   
5. Set stop loss strategy to control downside risk per trade
6. Optimize parameters based on different products  
7. Determine trend on even higher timeframes to avoid being misled by short term reversals  

With parameter optimization, combining more indicators, and aided by feasible money and risk management practices, the performance of this strategy can be improved for real trading.  

## Conclusion  

Overall the fast QQE crossover trading strategy based on trend filter is a very considerable choice. Its strength lies in quickly capturing reversal trading opportunities while using multiple moving averages to determine major trends and avoid trading against them as much as possible. With optimization of indicator parameters and filtering criteria, coupled with strict money management, this strategy can generate relatively steady investment returns.  

Of course the risks cannot be ignored. Real money testing and continuous optimization adjustments are necessary to ensure practicality and reliability of the strategy. In conclusion, it is worthwhile for investors to study and track for long term practice. It is believed that with the advancement of algorithmic trading technologies, this type of strategies based on fast indicators and trend filtering will see further improvements and proliferation.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|EMA|Fast MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, ZEMA ( case sensitive )|
|v_input_2|8|Fast - Length|
|v_input_3|EMA|Medium Fast MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, ZEMA ( case sensitive )|
|v_input_4|20|Medium Fast - Length|
|v_input_5|SMA|Slow MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, LSMA, ZEMA ( case sensitive )|
|v_input_6|50|Slow Length|
|v_input_7|6|RSI Length|
|v_input_8|3|RSI Smoothing Factor|
|v_input_9|2.618|Fast QQE Factor|
|v_input_10|10|RSI Threshhold|
|v_input_11|false|Show QQE Signal crosses|
|v_input_12|false|Show QQE Zero crosses|
|v_input_13|false|Use Moving Average Filter|
|v_input_14|true|Use Trend Directional Filter|
|v_input_15_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_16|false|Take Profit Points|
|v_input_17|false|Stop Loss Points|
|v_input_18|100|Trailing Stop Loss Points|
|v_input_19|false|Trailing Stop Loss Offset Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2024-01-24 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//
// Title:   [STRATEGY][UL]QQE Cross v1.1
// Author:  JustUncleL
// Date:    22-Oct-2016
// Version: v1.1
//
// Description:
//  A trend following trading Strategy that uses fast QQE crosses with Moving Averages
//  for trend direction filtering. QQE or Qualitative Quantitative Estimation is based 
//  on the relative strength index, but uses a smoothing technique as an additional 
//  transformation. Three crosses can be selected (all selected by default): 
//    - RSI signal crossing ZERO (XZERO)
//    - RSI signal crossing Fast RSIatr line (XQQE)
//    - RSI signal exiting the RSI Threshhold Channel (BUY/SELL)
//  The (BUY/SELL) alerts can be optionally filtered by the Moving averages:
//    - For BUY alert the Close must be above the fast MA and 
//        fast MA (EMA8) > medium MA (EMA20) > slow MA (SMA50).
//    - For SELL alert the Close must be below the fast MA and
//        fast MA (EMA8) < medium MA (EMA20) < slow MA (SMA50).
//  and/or directional filter:
//    - For BUY alert the Close must be above the slow MA (SMA50) and the
//      directional MA (EMA20) must be green.
//    - For SELL alert the Close must be below the slow MA (SMA50) and the
//      directional MA (EMA20) must be red.
//. The XZERO and XQQE are not included in the filtering, they are used to indicate
//  pending BUY/SELL alerts, particularly the XZERO. 
//
//  This Strategy should work on any currency pair and most chart timeframes.
//  *** USE AT YOUR OWN RISK ***
//  
// 
//
// Mofidifications:
//  1.1 - Added Target Profit option, cleaned up the risk management code.
//        Changed Trade Close to EMA20 direction change instead of opposite BUY/SELL
//        signal, which will be earlier, this means stop loss setting should not be
//        required when an AutoTrader is available.
//        Modified code to prevent potential repaint issues.
//  1.0 - original
//
// References:
//  Some Code borrowed from:
//  - "Scalp Jockey - MTF MA Cross Visual Strategizer by JayRogers"
//  - "QQE MT4 by glaz"
//  - "Strategy Code Example by JayRogers"  
//  Inspiration from:
//  - http://www.forexstrategiesresources.com/binary-options-strategies-ii/189-aurora-binary-trading/
//  - http://www.forexstrategiesresources.com/metatrader-4-trading-systems-v/652-qqe-smoothed-trading/
//  - http://dewinforex.com/forex-indicators/qqe-indicator-not-quite-grail-but-accurately-defines-trend-and-flat.html
//

strategy(title='[STRATEGY][UL]QQE Cross v1.1', pyramiding=0, overlay=true )


// - INPUTS START
// Fast MA - type, source, length
type1   = input(defval="EMA", title="Fast MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, ZEMA ( case sensitive )")
len1    = input(defval=8, title="Fast - Length", minval=1)
// Medium Fast MA - type, source, length
type2   = input(defval="EMA", title="Medium Fast MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, ZEMA ( case sensitive )")
len2    = input(defval=20, title="Medium Fast - Length", minval=1)
// Slow MA - type, source, length
type3   = input(defval="SMA", title="Slow MA Type: SMA, EMA, WMA, VWMA, SMMA, DEMA, TEMA, HullMA, LSMA, ZEMA ( case sensitive )")
len3    = input(defval=50, title="Slow Length", minval=1)
//
// QQE rsi Length, Smoothing, fast ATR factor, source
RSILen  = input(6,title='RSI Length')
SF      = input(3,title='RSI Smoothing Factor')
QQE     = input(2.618,title='Fast QQE Factor')
threshhold = input(10, title="RSI Threshhold")
//
sQQEx   = input(false,title="Show QQE Signal crosses")
sQQEz   = input(false,title="Show QQE Zero crosses")
//
filter  = input(false,title="Use Moving Average Filter")
dfilter = input(true, title="Use Trend Directional Filter" )
RSIsrc  = input(close,title="Source")
srcclose= RSIsrc

// - INPUTS END

// - FUNCTIONS

// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = wma(src, len)                                                  // Weighted
    v4 = vwma(src, len)                                                 // Volume Weighted
    v5 = na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v6 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v7 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    v10 = ema1+(ema1-ema2)                                              // Zero Lag Exponential
    // return variant, defaults to SMA if input invalid.
    type=="EMA"?v2 : type=="WMA"?v3 : type=="VWMA"?v4 : type=="SMMA"?v5 : type=="DEMA"?v6 : type=="TEMA"?v7 : type=="HullMA"?v8 : type=="ZEMA"?v10 : v1

// - FUNCTIONS END

// - Fast ATR QQE
//
Wilders_Period = RSILen * 2 - 1
//
Rsi = rsi(RSIsrc,RSILen)
RSIndex = ema(Rsi, SF)
AtrRsi = abs(RSIndex[1] - RSIndex)
MaAtrRsi = ema(AtrRsi, Wilders_Period)
DeltaFastAtrRsi = ema(MaAtrRsi,Wilders_Period) * QQE
//
newshortband=  RSIndex + DeltaFastAtrRsi
newlongband= RSIndex - DeltaFastAtrRsi
longband=RSIndex[1] > longband[1] and RSIndex > longband[1] ? max(longband[1],newlongband) : newlongband
shortband=RSIndex[1] < shortband[1] and  RSIndex < shortband[1] ? min(shortband[1],newshortband) : newshortband
trend=cross(RSIndex, shortband[1])? 1 : cross(longband[1], RSIndex) ? -1 : nz(trend[1],1)
FastAtrRsiTL = trend==1 ? longband : shortband


// - SERIES VARIABLES
// MA's
ma_fast    = variant(type1, srcclose, len1)
ma_medium  = variant(type2, srcclose, len2)
ma_slow    = variant(type3, srcclose, len3)
// Get Direction From Medium Moving Average
direction = rising(ma_medium,3) ? 1 : falling(ma_medium,3) ? -1 : 0
//
// Find all the QQE Crosses
QQExshort = sQQEx and crossover(FastAtrRsiTL, RSIndex)
QQExlong  = sQQEx and crossunder(FastAtrRsiTL, RSIndex)
// Zero cross
QQEzlong = sQQEz and crossover(RSIndex,50)
QQEzshort  = sQQEz and crossunder(RSIndex,50)
//  
// Thresh Hold channel Crosses give the BUY/SELL alerts.
QQEclong = RSIndex>(50+threshhold) ? na(QQEclong[1]) ? 1 : QQEclong[1]+1 : 0
QQEcshort = RSIndex<(50-threshhold) ? na(QQEcshort[1]) ? 1 : QQEcshort[1]+1 : 0

//
// Check Filtering.
QQEflong = (not filter or (srcclose>ma_fast and ma_medium>ma_slow and ma_fast>ma_medium)) and 
  (not dfilter or (direction>0 and srcclose>ma_slow))
QQEfshort = (not filter or (srcclose<ma_fast and ma_medium<ma_slow and ma_fast<ma_medium)) and
  (not dfilter or (direction<0 and srcclose<ma_slow))
//
// Get final BUY / SELL alert determination
buy = QQEclong>0 and QQEflong ? na(buy[1]) ? 1 : buy[1]+1 : 0
sell= QQEcshort>0 and QQEfshort ? na(sell[1]) ? 1 : sell[1]+1 : 0

// - SERIES VARIABLES END

// - PLOTTING
// Ma's
plot(ma_fast, title="MA Fast", color=olive, linewidth=2, transp=20)
plot(ma_medium, title="MA Medium Fast", color=direction<0?red:green, linewidth=3, transp=0)
plot(ma_slow, title="MA Slow", color=blue, linewidth=2, transp=20)
// QQE crosses
plotshape(QQExlong and buy!=1, title="QQE Cross Over", style=shape.triangleup, location=location.belowbar, text="XQQE", color=blue, transp=20, size=size.tiny)
plotshape(QQExshort and sell!=1, title="QQE Cross Under", style=shape.triangledown, location=location.abovebar, text="XQQE", color=black, transp=20, size=size.tiny)
// Signal crosses zero line
plotshape(QQEzlong and buy!=1 and not QQExlong, title="QQE Zero Cross Over", style=shape.triangleup, location=location.belowbar, text="XZERO", color=aqua, transp=20, size=size.tiny)
plotshape(QQEzshort and sell!=1 and not QQExshort, title="QQE Zero Cross Under", style=shape.triangledown, location=location.abovebar, text="XZERO", color=fuchsia, transp=20, size=size.tiny)

// - PLOTTING END

// Create alert for cross, shunt back 1 if source is not 'open', this should prevent repaint issue.
//shunt = RSIsrc == open ? 0 : 1
shunt = 0
c_alert = (buy[shunt]==1 or sell[shunt]==1)
//alertcondition(c_alert, title="QQECROSS Alert", message="QQECROSS Alert")
// show only when alert condition is met and bar closed.
plotshape(c_alert,title= "Alert Indicator Closed", location=location.bottom, color=sell[shunt]==1?red:green, transp=0, style=shape.circle)


//  Strategy: (Thanks to JayRogers)
// === STRATEGY RELATED INPUTS ===
//tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// the risk management inputs
inpTakeProfit   = input(defval = 0, title = "Take Profit Points", minval = 0)
inpStopLoss     = input(defval = 0, title = "Stop Loss Points", minval = 0)
inpTrailStop    = input(defval = 100, title = "Trailing Stop Loss Points", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset Points", minval = 0)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === STRATEGY - LONG POSITION EXECUTION ===
strategy.entry(id = "Buy", long = true, when = buy[shunt]==1 )// use function or simple condition to decide when to get in
strategy.close(id = "Buy", when = direction[shunt]!=direction[shunt+1])// ...and when to get out

// === STRATEGY - SHORT POSITION EXECUTION ===
strategy.entry(id = "Sell", long = false, when = sell[shunt]==1)
strategy.close(id = "Sell", when = direction[shunt]!=direction[shunt+1])

// === STRATEGY RISK MANAGEMENT EXECUTION ===
// finally, make use of all the earlier values we got prepped
strategy.exit("Exit Buy", from_entry = "Buy", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Sell", from_entry = "Sell", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

//eof
```

> Detail

https://www.fmz.com/strategy/439949

> Last Modified

2024-01-25 11:34:58
