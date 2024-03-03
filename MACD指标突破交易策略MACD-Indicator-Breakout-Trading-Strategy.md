
> Name

MACD指标突破交易策略MACD-Indicator-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略利用MACD指标的差值曲线突破进行交易决策。MACD由快、慢EMA组成,差值曲线突破零轴时产生交易信号。该策略属于典型的跟踪型量化交易策略。

策略原理:

1. 计算快線EMA和慢线EMA,两者差值形成MACD曲线。

2. 对MACD曲线进行EMA平滑,得到MACD信号线。

3. 当MACD上穿信号线时做多,下穿信号线时做空。

4. 设置百分比止损止盈点,进行风险管理。

该策略的优势:

1. MACD指标优于单一EMA,可以更清晰判断趋势。

2. 突破交易方式及时捕捉转折机会。

3. 止损止盈机制有助控制交易风险。

该策略的风险:

1. MACD曲线零轴附近可能出现较多假突破信号。

2. 需要优化参数以匹配不同交易品种。

3. 趋势交易易受突发事件影响,必须设置止损。

总之,该策略利用MACD差值曲线的突破关系进行判断。MACD指标的优点有利于提高效果,但需警惕假突破风险,采取适当的风险管理措施以获得长期稳定回报。

||

This strategy trades MACD crossover signals for entry and exit decisions. MACD is composed of fast and slow EMAs, and crossover of the MACD line over zero generates trade signals. It is a typical trend-following quantitative strategy.

Strategy Logic:

1. Calculate fast EMA and slow EMA, their difference forms the MACD line. 

2. Smooth the MACD line using another EMA to derive the signal line.

3. Go long on MACD crossing above signal, and short on crossing below.

4. Set percentage stop loss and take profit for risk management.

Advantages:

1. MACD improves on single EMA for clearer trend identification.

2. Breakout trading captures turning points in a timely manner.

3. Stop loss/take profit mechanisms help control trade risks.

Risks:

1. More false breakouts near MACD zero line.

2. Parameter tuning needed for different trading instruments.

3. Trend trading prone to event risks, requiring stops. 

In summary, this strategy trades based on MACD and signal line crossover. MACD's strengths benefit performance but false breakout risks remain. Prudent risk controls are still required for steady gains over the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|From Month|
|v_input_2|true|From Day|
|v_input_3|2018|From Year|
|v_input_4|6|To Month|
|v_input_5|true|To Day|
|v_input_6|2020|To Year|
|v_input_7|12|MACD fast|
|v_input_8|26|MACD slow|
|v_input_9|9|MACD length|
|v_input_10|10|Stop Loss (price %)|
|v_input_11|50|Take Profit (price %)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3 
strategy("uray MACD", overlay=false, pyramiding = 0, calc_on_every_tick=true, precision=2, currency="USD", default_qty_value=10, default_qty_type=strategy.cash,initial_capital=100,commission_type=strategy.commission.percent,commission_value=0.1) 

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 6, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2017)
ToMonth   = input(defval = 6, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
inTimeframe()  => true


isPosLong    = strategy.position_size > 0
isPosShort   = strategy.position_size < 0
isNoMarginPos= strategy.position_size == 0

fastLength    = input(12, minval = 1, title = "MACD fast")
slowlength    = input(26, minval = 1, title = "MACD slow")
MACDLength    = input( 9, minval = 1, title = "MACD length")
stopLoss      = input( 10, minval = 1, title = "Stop Loss (price %)", type=float)
takeProfit    = input( 50, minval = 1, title = "Take Profit (price %)", type=float)
src           = close   // Source of Calculations (Close of Bar)

MACD  = ta.ema(src, fastLength) - ta.ema(src, slowlength)
aMACD = ta.ema(MACD, MACDLength)
delta = MACD - aMACD
stopLossValue      = close*(stopLoss/100)/syminfo.mintick
takeProfitValue    = close*(takeProfit/100)/syminfo.mintick
switchLongTrigger  = ta.crossover(delta, 0)
switchShortTrigger = ta.crossunder(delta, 0)
closeLongTrigger   = ta.crossunder(delta, 0)
closeShortTrigger  = ta.crossover(delta, 0)
entryLongTrigger   = ta.crossover(delta, 0)
entryShortTrigger  = ta.crossunder(delta, 0)

// if inTimeframe()
//     if isNoMarginPos
//         if entryLongTrigger
//             strategy.entry("Long", strategy.long,  comment="Entry Long")
//             strategy.exit("Stop (long SL/TP)", loss=stopLossValue, profit=takeProfitValue)   
//         if entryShortTrigger
//             strategy.entry("Short", strategy.short, comment="Entry Short")  
//             strategy.exit("Stop (short SL/TP)", loss=stopLossValue, profit=takeProfitValue)   
//     if isPosShort
//         if switchLongTrigger
//             strategy.close_all()    
//             strategy.entry("Long", strategy.long, comment="switch Long")
//             strategy.exit("Stop (long SL/TP)", loss=stopLossValue, profit=takeProfitValue)   
//         if closeLongTrigger
//             strategy.close_all()    
//     if isPosLong 
//         if switchShortTrigger
//             strategy.close_all()   
//             strategy.entry("Short", strategy.short, comment="switch Short")
//             strategy.exit("Stop (short SL/TP)", loss=stopLossValue, profit=takeProfitValue) 
//         if closeShortTrigger
//             strategy.close_all()   

if inTimeframe()
    strategy.entry("Long", strategy.long,  comment="Entry Long", when=entryLongTrigger)
    strategy.close("Long", when=entryShortTrigger)
    strategy.entry("Short", strategy.short,  comment="Entry Short", when=entryShortTrigger)
    strategy.close("Short", when=entryLongTrigger)
    strategy.exit("Stop (short SL/TP)", loss=stopLossValue, profit=takeProfitValue, when=entryShortTrigger) 
    strategy.exit("Stop (long SL/TP)", loss=stopLossValue, profit=takeProfitValue, when=entryLongTrigger) 



```

> Detail

https://www.fmz.com/strategy/426492

> Last Modified

2023-09-12 15:32:12
