
> Name

双移动平均量化交易策略An-Optimization-of-Dual-Moving-Average-Trend-Following-Strategy-Based-on-Indicators-Combination

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15961e9eefd6dacced0.png)
[trans]
### 概述
本策略通过计算快速移动平均线和慢速移动平均线,并结合抛物线指标进行买卖判断,属于趋势跟踪类型策略。当快速移动平均线上穿慢速移动平均线时做多;当快速移动平均线下穿慢速移动平均线时做空。同时结合抛物线指标过滤假突破。

### 策略原理
1. 计算快速移动平均线和慢速移动平均线。移动平均线参数可以自定义。
2. 比较两条移动平均线,判断市场趋势方向。当快速移动平均线上穿越慢速移动平均线时,判断为多头市场;当快速移动平均线下穿越慢速移动平均线时,判断为空头市场。
3. 结合收盘价与移动平均线关系作为进一步确认。只有当快速线上穿慢速线,且收盘价高于快速线时,才产生买入信号;只有当快速线下穿慢速线,且收盘价低于快速线时,才产生卖出信号。
4. 使用抛物线指标过滤假突破。只有快速线上穿慢速线,且收盘价高于快速线,且股价高于抛物线时,才最终产生买入信号;反之亦然。
5. 根据最大承受损失设定止损线。结合ATR指标计算具体的止损价

### 策略优势
1. 利用移动平均线判断市场趋势方向,避免在无明确方向的盘整市场频繁交易
2. 双重过滤条件可有效避免常见的假突破问题
3. 结合止损策略有效控制单笔亏损

### 策略风险
1. 指标策略容易产生虚假信号
2. 未考虑货币风险
3. 可能错过初期不同方向的行情

针对以上问题,可以从以下几个方面进行优化
1. 优化移动平均线参数,使其更贴合具体品种
2. 可以结合其他指标或模型进行信号过滤
3. 考虑实时对冲或自动转换券商账户的货币风险

### 优化方向
1. 优化移动平均线参数,更好捕捉趋势
2. 增加模型组合,提高信号准确性
3. 多时间周期验证,避免被套
4. 优化止损策略,提高策略稳定性

### 总结
本策略属于典型的双移动平均线以及指标组合趋势跟踪策略。通过比较快慢两条移动平均线方向,判断市场趋势;并结合多种过滤指标避免假信号,从而产生交易信号。同时,策略具备止损功能以控制单笔亏损。优点是策略逻辑简单清晰,容易理解实现,可根据需要灵活优化。缺点是作为粗略趋势判断工具,信号准确性有待提高,可通过引入机器学习等高级模型进行优化。

||

### Overview
This strategy generates trading signals by calculating fast and slow moving average lines and combining Parabolic SAR indicator. It belongs to the trend following strategy. When the fast MA crosses over the slow MA, long position will be opened. When the fast MA crosses below the slow MA, short position will be opened. Parabolic SAR is used to filter fake breakouts.  

### Strategy Principle  
1. Calculate fast and slow moving average lines. The parameters can be customized.
2. Compare the two MA lines to determine market trend. When fast MA crosses over slow MA, it indicates bullish trend. When fast MA crosses below slow MA, it indicates bearish trend.
3. Further confirmation is made by checking if close price is above/below fast MA. Only when fast MA crosses over slow MA and close price is above fast MA, long signal is generated. Only when fast MA crosses below slow MA and close price is below fast MA, short signal is generated.  
4. Parabolic SAR is used to filter fake signals. Only when all the three criteria are met, final signal is generated.
5. Stop loss is set based on maximum tolerable loss. ATR indicator is used to calculate dynamic stop loss price.

### Advantages
1. MA lines determine market trend and avoid excessive trading in range-bound market.  
2. Dual filters lower risk of fake breakout significantly.
3. Stop loss strategy effectively limits per trade loss.

### Risks  
1. Indicator strategies tend to generate false signals
2. No consideration of currency exposure risk
3. Potentially miss initial trend in opposite direction

The strategy can be optimized in below aspects:
1. Optimize MA parameters to fit specific product  
2. Add other indicators or models for signal filtering
3. Consider real-time hedging or auto currency conversion  

### Directions for Optimization
1. Optimize MA parameters to better capture trends
2. Increase model diversity to improve signal accuracy 
3. Multi-timeframe verification to avoid being trapped
4. Enhance stop loss strategy to increase stability

### Conclusion
This is a typical dual moving average cross and indicators combination trend following strategy. By comparing fast and slow MA directions, market trend is determined. Various filter indicators are used avoid false signals. At the same time, stop loss function is implemented to control per trade loss. The advantage is that the strategy logic is simple and easy to understand and optimize. The disadvantage is that as a coarse trend tool, there is still room to improve signal accuracy, by introducing machine learning models for example.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Backtest Time Period)Filter Date Range of Backtest|
|v_input_1|timestamp(1 jan 2000)|Start Date|
|v_input_2|timestamp(1 Jul 2100)|End Date|
|v_input_bool_2|true|(?Long & Short Position)On/Off Long Postion|
|v_input_bool_3|true|On/Off Short Postion|
|v_input_string_1|0|(?Slow MA Inputs)Slow MA Type: SMA|EMA|WMA|HMA|RMA|SWMA|ALMA|VWMA|VWAP|
|v_input_int_1|160|Slow MA Length|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_2|0|(?Fast MA Inputs)Fast MA Type: SMA|EMA|WMA|HMA|RMA|SWMA|ALMA|VWMA|VWAP|
|v_input_int_2|40|Fast MA Length|
|v_input_4_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_4|true|(?Parabolic SAR Inputs)Use Parabolic Sar?|
|v_input_bool_5|false|Display Parabolic Sar?|
|v_input_float_1|0.02|Start|
|v_input_float_2|0.02|Increment|
|v_input_float_3|0.2|Maximum|
|v_input_int_3|14|(?Risk Management Inputs)ATR Length|
|v_input_float_4|2|Long Position - Stop Loss - ATR Multiplier|
|v_input_float_5|2|Short Position - Stop Loss - ATR Multiplier|
|v_input_float_6|2|% of Equity at Risk|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © sosacur01

//@version=5
strategy(title="2 MA | Trend Following", overlay=true, pyramiding=1, commission_type=strategy.commission.percent, commission_value=0.2, initial_capital=10000)

//==========================================


//BACKTEST RANGE
useDateFilter = input.bool(true, title="Filter Date Range of Backtest",
     group="Backtest Time Period")
backtestStartDate = input(timestamp("1 jan 2000"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")
backtestEndDate = input(timestamp("1 Jul 2100"),
     title="End Date", group="Backtest Time Period",
     tooltip="This end date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")
inTradeWindow = true
if not inTradeWindow and inTradeWindow[1]
    strategy.cancel_all()
    strategy.close_all(comment="Date Range Exit")

//--------------------------------------

//LONG/SHORT POSITION ON/OFF INPUT
LongPositions   = input.bool(title='On/Off Long Postion', defval=true, group="Long & Short Position")
ShortPositions  = input.bool(title='On/Off Short Postion', defval=true, group="Long & Short Position")

//---------------------------------------

//SLOW MA INPUTS
averageType1   = input.string(defval="SMA", group="Slow MA Inputs", title="Slow MA Type", options=["SMA", "EMA", "WMA", "HMA", "RMA", "SWMA", "ALMA", "VWMA", "VWAP"])
averageLength1 = input.int(defval=160, group="Slow MA Inputs", title="Slow MA Length", minval=50)
averageSource1 = input(close, title="Slow MA Source", group="Slow MA Inputs")
           

//SLOW MA TYPE
MovAvgType1(averageType1, averageSource1, averageLength1) =>
	switch str.upper(averageType1)
        "SMA"  => ta.sma(averageSource1, averageLength1)
        "EMA"  => ta.ema(averageSource1, averageLength1)
        "WMA"  => ta.wma(averageSource1, averageLength1)
        "HMA"  => ta.hma(averageSource1, averageLength1)
        "RMA"  => ta.rma(averageSource1, averageLength1)
        "SWMA" => ta.swma(averageSource1)
        "ALMA" => ta.alma(averageSource1, averageLength1, 0.85, 6)
        "VWMA" => ta.vwma(averageSource1, averageLength1)
        "VWAP" => ta.vwap(averageSource1)
        => runtime.error("Moving average type '" + averageType1 + 
             "' not found!"), na


//----------------------------------

//FAST MA INPUTS
averageType2   = input.string(defval="SMA", group="Fast MA Inputs", title="Fast MA Type", options=["SMA","EMA","WMA","HMA","RMA","SWMA","ALMA","VWMA","VWAP"])
averageLength2 = input.int(defval=40, group="Fast MA Inputs", title="Fast MA Length", maxval=40)
averageSource2 = input(close, title="Fast MA Source", group="Fast MA Inputs")

//FAST MA TYPE
MovAvgType2(averageType2, averageSource2, averageLength2) =>
	switch str.upper(averageType2)
        "SMA"  => ta.sma(averageSource2, averageLength2)
        "EMA"  => ta.ema(averageSource2, averageLength2)
        "WMA"  => ta.wma(averageSource2, averageLength2)
        "HMA"  => ta.hma(averageSource2, averageLength2)
        "RMA"  => ta.rma(averageSource2, averageLength2)
        "SWMA" => ta.swma(averageSource2)
        "ALMA" => ta.alma(averageSource2, averageLength2, 0.85, 6)
        "VWMA" => ta.vwma(averageSource2, averageLength2)
        "VWAP" => ta.vwap(averageSource2)
        => runtime.error("Moving average type '" + averageType2 + 
             "' not found!"), na

//---------------------------------------------------

//MA VALUES
FASTMA = MovAvgType2(averageType2, averageSource2, averageLength2)
SLOWMA = MovAvgType1(averageType1, averageSource1, averageLength1)

//BUY/SELL TRIGGERS
bullish_trend = FASTMA > SLOWMA and close > FASTMA
bearish_trend = FASTMA < SLOWMA and close < FASTMA

//MAs PLOT
plot1 = plot(SLOWMA,color=color.gray, linewidth=1, title="Slow-MA")
plot2 = plot(FASTMA,color=color.yellow, linewidth=1, title="Fast-MA")
fill(plot1, plot2, color=SLOWMA>FASTMA ? color.new(color.red, 70) : color.new(color.green, 70), title="EMA Clouds")

//-----------------------------------------------------

//PARABOLIC SAR USER INPUT
usepsarFilter = input.bool(title='Use Parabolic Sar?', defval=true, group = "Parabolic SAR Inputs")
psar_display  = input.bool(title="Display Parabolic Sar?", defval=false, group="Parabolic SAR Inputs")
start         = input.float(title="Start", defval=0.02, group="Parabolic SAR Inputs", step=0.001)
increment     = input.float(title="Increment", defval=0.02, group="Parabolic SAR Inputs", step=0.001)
maximum       = input.float(title="Maximum", defval=0.2, group="Parabolic SAR Inputs", step=0.001)

//SAR VALUES
psar        = request.security(syminfo.tickerid, "D", ta.sar(start, increment, maximum))

//BULLISH & BEARISH PSAR CONDITIONS
bullish_psar = (usepsarFilter ? low > psar : bullish_trend )
bearsish_psar = (usepsarFilter ? high < psar : bearish_trend)

//SAR PLOT
psar_plot    = if low > psar
    color.rgb(198, 234, 199, 13)
else
    color.rgb(219, 134, 134, 48)
    
plot(psar_display ? psar : na, color=psar_plot, title="Par SAR")

//-------------------------------------

//ENTRIES AND EXITS
long_entry  = if inTradeWindow and bullish_trend  and bullish_psar and LongPositions
    true
long_exit   = if inTradeWindow and bearish_trend   
    true

short_entry = if inTradeWindow  and bearish_trend and bearsish_psar and ShortPositions
    true
short_exit  = if inTradeWindow  and bullish_trend 
    true

//--------------------------------------

//RISK MANAGEMENT - SL, MONEY AT RISK, POSITION SIZING
atrPeriod                = input.int(14, "ATR Length", group="Risk Management Inputs")
sl_atr_multiplier        = input.float(title="Long Position - Stop Loss - ATR Multiplier", defval=2, group="Risk Management Inputs", step=0.5)
sl_atr_multiplier_short  = input.float(title="Short Position - Stop Loss - ATR Multiplier", defval=2, group="Risk Management Inputs", step=0.5)
i_pctStop                = input.float(2, title="% of Equity at Risk", step=.5, group="Risk Management Inputs")/100

//ATR VALUE
_atr = ta.atr(atrPeriod)

//CALCULATE LAST ENTRY PRICE
lastEntryPrice = strategy.opentrades.entry_price(strategy.opentrades - 1)

//STOP LOSS - LONG POSITIONS 
var float sl = na

//CALCULTE SL WITH ATR AT ENTRY PRICE - LONG POSITION
if (strategy.position_size[1] != strategy.position_size)
    sl := lastEntryPrice - (_atr * sl_atr_multiplier)

//IN TRADE - LONG POSITIONS
inTrade = strategy.position_size > 0

//PLOT SL - LONG POSITIONS
plot(inTrade ? sl : na, color=color.blue, style=plot.style_circles, title="Long Position - Stop Loss")

//CALCULATE ORDER SIZE - LONG POSITIONS
positionSize = (strategy.equity * i_pctStop) / (_atr * sl_atr_multiplier)

//============================================================================================

//STOP LOSS - SHORT POSITIONS 
var float sl_short = na

//CALCULTE SL WITH ATR AT ENTRY PRICE - SHORT POSITIONS 
if (strategy.position_size[1] != strategy.position_size)
    sl_short := lastEntryPrice + (_atr * sl_atr_multiplier_short)

//IN TRADE SHORT POSITIONS
inTrade_short = strategy.position_size < 0

//PLOT SL - SHORT POSITIONS
plot(inTrade_short ? sl_short : na, color=color.red, style=plot.style_circles, title="Short Position - Stop Loss")

//CALCULATE ORDER - SHORT POSITIONS
positionSize_short = (strategy.equity * i_pctStop) / (_atr * sl_atr_multiplier_short) 


//===============================================

//LONG STRATEGY
strategy.entry("Long", strategy.long, comment="Long", when = long_entry, qty=positionSize)
if (strategy.position_size > 0)
    strategy.close("Long", when = (long_exit), comment="Close Long")
    strategy.exit("Long", stop = sl, comment="Exit Long")

//SHORT STRATEGY
strategy.entry("Short", strategy.short, comment="Short", when = short_entry, qty=positionSize_short)
if (strategy.position_size < 0) 
    strategy.close("Short", when = (short_exit), comment="Close Short")
    strategy.exit("Short", stop = sl_short, comment="Exit Short")

//ONE DIRECTION TRADING COMMAND (BELLOW ONLY ACTIVATE TO CORRECT BUGS)

```

> Detail

https://www.fmz.com/strategy/440730

> Last Modified

2024-02-01 15:13:13
