
> Name

STEM和MATCS组合动量交易策略STEM-and-MATCS-Combined-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略名为STEM和MATCS组合动量交易策略。该策略将Supertrend指标与MACD指标组合使用,形成交易信号。

策略运作原理:
1. 计算Supertrend指标,当价格转折时产生买入和卖出信号。
2. 计算MACD指标的快线、中线和慢线。当快线上穿中线时产生买入信号,当快线下穿中线时产生卖出信号。
3. 结合Supertrend和MACD指标,只有两者同时发出信号时才入场。
4. 使用ATR指标计算动态止损位。

具体交易规则:
1. 当Supertrend转折由跌转涨,且MACD快线上穿中线时,做多入场。
2. 当Supertrend转折由涨转跌,且MACD快线下穿中线时,做空入场。 
3. 平仓条件:止损或止盈(可选)。

该策略的优势:
1. 组合多个指标,提高信号准确率。
2. 动态止损,可以限制个别巨亏。
3. 兼具趋势跟踪和反转交易能力。

该策略的风险:
1. Supertrend和MACD指标参数设置不当,可能产生错误信号。
2. 止损点过于接近,可能会被频繁止损。
3. 交易费用和滑点影响盈利。

总之,STEM和MATCS组合动量策略通过指标集成提升效果,适合于短线和中线交易。止损策略的应用对控制风险非常关键。交易者需要通过参数优化和严格的资金管理来降低实盘交易中的风险。

|| 

This strategy is called the STEM and MATCS Combined Momentum Trading Strategy. It combines the Supertrend indicator with the MACD indicator to generate trading signals.

How the strategy works:
1. Calculate the Supertrend indicator to generate buy and sell signals when price reverses.  
2. Calculate the fast, medium and slow MAs of the MACD indicator. Buy signals are generated when the fast MA crosses above the medium MA. Sell signals are generated when the fast MA crosses below the medium MA.
3. Combine the signals from Supertrend and MACD, only taking trades when both indicators agree.
4. Use the ATR indicator to calculate dynamic stop loss levels.

Specific trading rules:
1. When Supertrend flips from down to up, and MACD fast MA crosses above medium MA, go long.
2. When Supertrend flips from up to down, and MACD fast MA crosses below medium MA, go short.
3. Exit rules: stop loss or take profit (optional).

Advantages of this strategy:
1. Combining multiple indicators improves signal accuracy. 
2. Dynamic stop loss can limit individual big losses.
3. Has both trend following and mean reversion capabilities.

Risks of this strategy:  
1. Incorrect Supertrend and MACD parameters may generate bad signals.
2. Stop loss too close may result in frequent stop outs. 
3. Fees and slippage impact profits.

In summary, the STEM and MATCS Combined Momentum Trading Strategy enhances effects through indicator integration, suitable for short-term and medium-term trading. Stop loss application is critical for risk control. Traders need to reduce risks in live trading through parameter optimization and strict money management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|ST_EMA_PERIOD|
|v_input_2|95|ATR_PERIOD|
|v_input_3|2.1|ATR_TUNE|
|v_input_4|true|Show_Buy/Sell_Labels ?|
|v_input_5|true|Highlight_State ?|
|v_input_6|3|fastLength|
|v_input_7|9|medLength|
|v_input_8|12|slowLength|
|v_input_9|16|signalLength|
|v_input_10|5|ATR_CrossOver_Period|
|v_input_11|0.962|ATR_SIGNAL_FINE_TUNE|
|v_input_12|false|StopLoss_Initial_Short|
|v_input_13|false|StopLoss_Initial_Long|
|v_input_14|false|StopLoss_Long_Adjust|
|v_input_15|false|StopLoss_Short_Adjust|
|v_input_16|200|VOLUME_CHECK|
|v_input_17|false|From Minute|
|v_input_18|false|From Hour|
|v_input_19|true|From Day|
|v_input_20|true|From Month|
|v_input_21|2019|From Year|
|v_input_22|false|Till Minute|
|v_input_23|false|Till Hour|
|v_input_24|true|Till Day|
|v_input_25|true|Till Month|
|v_input_26|2020|Till Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © IncomePipelineGenerator
//@version=4
// strategy("STRAT_STEM_MATCS_BTC", overlay=true, pyramiding = 0, default_qty_value = 20, slippage = 5)


ST_EMA_PERIOD = input(1, minval=1)
ST_EMA = ema(close, ST_EMA_PERIOD)

LENGTH = input(title="ATR_PERIOD", type=input.integer, defval=95)
ATR_TUNE = input(title="ATR_TUNE", type=input.float, step=0.1, defval=2.1)
showLabels = input(title="Show_Buy/Sell_Labels ?", type=input.bool, defval=true)
highlightState = input(title="Highlight_State ?", type=input.bool, defval=true)

ATR = ATR_TUNE * atr(LENGTH)

longStop = ST_EMA - ATR
longStopPrev = nz(longStop[1], longStop)
longStop := (close[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = ST_EMA + ATR
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := (close[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and (close) > shortStopPrev ? 1 : dir == 1 and (close) < longStopPrev ? -1 : dir


fastLength = input(3, minval=1), medLength=input(9, minval=1), slowLength=input(12, minval=1), signalLength=input(16,minval=1)
fastMA = ema(close, fastLength), medMA = ema(close, medLength), slowMA = ema(close, slowLength)

macd = fastMA - slowMA
fmacd = fastMA - medMA
smacd = slowMA - medMA

signal = ema(macd, signalLength)
fsignal = ema(fmacd, signalLength)
ssignal = ema(smacd, signalLength)


SetStopLossShort = 0.0
SetStopLossShort := if(strategy.position_size < 0)
    StopLossShort = shortStop
    min(StopLossShort,SetStopLossShort[1])

SetStopLossLong = 0.0
SetStopLossLong := if(strategy.position_size > 0)
    StopLossLong = longStop
    max(StopLossLong,SetStopLossLong[1])


ATR_CrossOver_Period = input(5, type=input.integer, minval=1, maxval=2000)
ATR_SIGNAL_FINE_TUNE = input(0.962, type=input.float)  
ATR_CS = atr(ATR_CrossOver_Period)*ATR_SIGNAL_FINE_TUNE

StopLoss_Initial_Short = input(0.0, type=input.float) 
StopLoss_Initial_Long = input(0.0, type=input.float) 

StopLoss_Long_Adjust = input(0.0, type=input.float) 
StopLoss_Short_Adjust = input(0.0, type=input.float) 

VOLUME_CHECK = input(200)

//Custom Time Interval
fromMinute = input(defval = 0, title = "From Minute", minval = 0, maxval = 60)
fromHour = input(defval = 0, title = "From Hour", minval = 0, maxval = 24)
fromDay = input(defval = 1, title = "From Day", minval = 1)
fromMonth = input(defval = 1, title = "From Month", minval = 1)
fromYear = input(defval = 2019, title = "From Year", minval = 1900)
tillMinute = input(defval = 0, title = "Till Minute", minval = 0, maxval = 60)
tillHour = input(defval = 0, title = "Till Hour", minval = 0, maxval = 24)
tillDay = input(defval = 1, title = "Till Day", minval = 1)
tillMonth = input(defval = 1, title = "Till Month", minval = 1)
tillYear = input(defval = 2020, title = "Till Year", minval = 1900)
timestampStart = timestamp(fromYear,fromMonth,fromDay,fromHour,fromMinute)
timestampEnd = timestamp(tillYear,tillMonth,tillDay,tillHour,tillMinute)


//Custom Buy Signal Code --  This is where you design your own buy and sell signals. You now have millions of possibilites with the use of simple if/and/or statements.
if (  dir==1 and dir[1]==-1  and volume > VOLUME_CHECK and ((fsignal[1] -fsignal) <= 0) and  cross(fmacd, smacd) )
    strategy.exit("SELL")
    strategy.entry("BUY", strategy.long)
    strategy.exit("BUY_STOP","BUY", stop = close - StopLoss_Initial_Long)

//Custom Sell Signal Code
if  ( dir == -1 and dir[1] == 1 and dir[2] == 1 and dir[3] == 1 and dir[4] == 1 and  cross(fmacd, smacd) )
    strategy.exit( "BUY")
    strategy.entry("SELL", strategy.short)
    strategy.exit("SELL_STOP","SELL", stop = close + StopLoss_Initial_Short)

//Slight adjustments to ST for fine tuning
if (strategy.opentrades > 0 )
    strategy.exit("BUY_TRAIL_STOP","BUY", stop = longStop - StopLoss_Long_Adjust)
    strategy.exit("SELL_TRAIL_STOP","SELL", stop = shortStop + StopLoss_Short_Adjust)
```

> Detail

https://www.fmz.com/strategy/426931

> Last Modified

2023-09-15 16:22:48
