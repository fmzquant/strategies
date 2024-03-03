
> Name

双EMA快慢线交叉策略Dual-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/209e374f223308fa9fe.png)
[trans]
### 概述

双EMA快慢线交叉策略(Dual EMA Crossover Strategy)是一个基于两条不同周期的EMA均线交叉进行开仓和平仓的量化交易策略。该策略简单有效,容易理解,是量化交易的一种常用策略。

### 策略原理

该策略使用两条EMA均线,一条为25周期的EMA线,作为快线,一条为50周期的EMA线,作为慢线。当快线上穿慢线时,做多;当快线下穿慢线时,做空。

做多之后,设置止盈为入场价格的2%,止损为入场价格的2%,当价格达到止盈或止损后,平掉仓位。做空同理。

该策略的核心就是利用EMA快慢线的交叉来判断市场趋势和反转。上穿时判断为牛市并做多,下穿时判断为熊市并做空。止盈止损设置来锁定利润和控制风险。

### 优势分析

双EMA快慢线交叉策略具有以下优势:

1. 思路清晰,逻辑简单,容易理解实施。
2. 快线和慢线配合使用,可以抓住中短线趋势。
3. 可以顺势而为,及时抓住市场转折点。
4. 风险控制到位,止盈止损设置合理。

总的来说,该策略通过清晰的逻辑判断市场,运用EMA本身的优点,在风险可控的前提下,获取不错的中短线收益。

### 风险分析

双EMA快慢线交叉策略也存在一些风险:  

1. 市场出现剧烈波动时,EMA线交叉信号可能不准确,存在其误判的概率。
2. 止盈止损点设置不合理时,可能错过更大的行情或承担更大的亏损。
3. 交易费用和滑点的影响也不能忽略。

这些风险都可通过以下方式得到优化解决:

1. 结合其他指标判断市场,避免EMA交叉的误判信号。
2. 测试并优化止盈止损的设置点,在收益和风险之间找到平衡。 
3. 选择手续费低廉的交易平台,适当放大交易量。

### 优化方向  

该策略还具有以下主要的优化方向:

1. 优化EMA的周期参数,寻找最佳参数组合。
2. 增加其他指标判断,形成交易组合,提高准确率。  
3. 动态调整止盈止损点。当亏损达到一定幅度时止损点跟踪放大,当盈利达到一定幅度止盈点移动等。
4. 区分多头和空头市场,做定向交易。

这些优化都可以在保持策略简单清晰的基础上,提升收益率和胜率。

### 总结  

双EMA快慢线交叉策略总的来说是一种非常实用的量化交易策略。它易于理解和实现,有效把握市场趋势。同时也具有一定的优化空间,通过参数调整和组合可以进一步提高收益率。这种简单直接的策略思路值得投资者学习和运用。

||

### Overview

The Dual EMA Crossover Strategy is a quantitative trading strategy that opens and closes positions based on the crossover of two EMA lines with different periods. This strategy is simple, effective, easy to understand, and commonly used in quantitative trading.

### Strategy Logic

The strategy uses two EMA lines, one is a 25-period EMA line as the fast line, and the other is a 50-period EMA line as the slow line. When the fast line crosses above the slow line, go long. When the fast line crosses below the slow line, go short. 

After going long, set the take profit to 2% of the entry price and the stop loss to 2% of the entry price. When the price reaches the take profit or stop loss, close the position. Going short is the same.

The core of this strategy is to use the crossover of the EMA fast and slow lines to judge market trends and reversals. When the fast line crosses above, it is judged as a bull market and goes long. When the fast line crosses below, it is judged as a bear market and goes short. Take profit and stop loss are set to lock in profits and control risks.

### Advantage Analysis 

The Dual EMA Crossover Strategy has the following advantages:

1. The idea is clear and the logic is simple, easy to understand and implement.
2. The fast and slow lines work together to capture medium and short-term trends.  
3. It can follow the trend in a timely manner and seize market turning points.
4. The risk control is in place with reasonable take profit and stop loss settings.

In general, this strategy judges the market clearly, utilizes the advantages of the EMA itself, and obtains good medium and short-term returns while controlling risks.

### Risk Analysis

The Dual EMA Crossover Strategy also has some risks:

1. In case of violent market fluctuations, EMA crossover signals may be inaccurate, with a probability of misjudgement.  
2. Unreasonable take profit and stop loss points may miss bigger moves or take on greater losses.
3. The impact of trading fees and slippage cannot be ignored either.

These risks can be optimized and solved in the following ways:

1. Combine other indicators to judge the market and avoid misjudged EMA crossover signals.
2. Test and optimize the take profit and stop loss points to strike a balance between returns and risks.
3. Choose trading platforms with low fees and appropriately increase position sizes.

### Optimization Directions

The main optimization directions for this strategy include:  

1. Optimize the EMA period parameters to find the best parameter combination.
2. Increase other indicators for judgement to form a trading combination and improve accuracy.
3. Dynamically adjust take profit and stop loss points. For example, when the loss reaches a certain level, expand the stop loss point, and when the profit reaches a certain level, move the take profit point.
4. Distinguish bull and bear markets for directional trading.

These optimizations can improve return and win rates while keeping the strategy simple and clear.

### Summary

In summary, the Dual EMA Crossover Strategy is a very practical quantitative trading strategy. It is easy to understand and implement, and effectively captures market trends. At the same time, it has room for optimization. Further improvements on return rates can be achieved through parameter tuning and combinations. The simplicity and directness of this strategy is worth learning and applying for investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|25|(?[EMA]----------)Short|
|v_input_int_2|50|Long|
|v_input_bool_1|true|(?[TP & SL%]----------)Long - |
|v_input_float_1|2|TP|
|v_input_float_2|2|SL|
|v_input_bool_2|false|Short - |
|v_input_float_3|2|TP|
|v_input_float_4|2|SL|
|v_input_1|timestamp(0001-01-01)|(?[Backtest]----------)Start|
|v_input_2|timestamp(9999-01-01)|End|
|v_input_bool_3|false|Backtest BGcolor|
|v_input_bool_4|false|Position BGcolor|
|v_input_string_1|0|(?[IRISBOT]----------)Exchange: binance|bybit|upbit|
|v_input_string_2|account1|Account|
|v_input_string_3|BTC/USDT|Symbol|
|v_input_string_4|sema-x|Strategy|
|v_input_string_5|token|Token|
|v_input_float_5|100|Ratio(%)|
|v_input_float_6|true|Leverage|
|v_input_bool_5|false|View alert msg|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// SEMA-X(SEMA CROSS) [AB] : Simple EMA cross strategy Alert & Backtest
// 1. 2 EMA cross
// 2. Next candle entry
// 3. TP & SL

//@version=5
strategy("SEMA-X", "SEMA-X", overlay=false, margin_long=1,
 initial_capital=1000000, default_qty_type=strategy.percent_of_equity, default_qty_value=100,
 commission_type=strategy.commission.percent, commission_value=0.075, slippage=3)

//****************************************************************************//
// Input
//****************************************************************************//
// EMA length
emaLen25 = input.int(25, "Short", minval=1, confirm=true, group="[EMA]----------", inline="1")
emaLen50 = input.int(50, "Long",  minval=1, confirm=true, group="[EMA]----------", inline="1")

// TP & SL
isLong   = input.bool(true, "Long - ",    confirm=true, group="[TP & SL(%)]----------", inline="1")
tpLong   = input.float(2, "TP", minval=0, confirm=true, group="[TP & SL(%)]----------", inline="1")*0.01
slLong   = input.float(2, "SL", minval=0, confirm=true, group="[TP & SL(%)]----------", inline="1")*0.01
isShort  = input.bool(false, "Short - ",  confirm=true, group="[TP & SL(%)]----------", inline="2")
tpShort  = input.float(2, "TP", minval=0, confirm=true, group="[TP & SL(%)]----------", inline="2")*0.01
slShort  = input.float(2, "SL", minval=0, confirm=true, group="[TP & SL(%)]----------", inline="2")*0.01

// Backtest period
sTime = input(timestamp("0001-01-01"), "Start", group="[Backtest]----------")
eTime = input(timestamp("9999-01-01"), "End",   group="[Backtest]----------")
inDateRange   = true
periodBg      = input.bool(false, "Backtest BGcolor", confirm=true, group="[Backtest]----------", inline="1")
bgLong        = input.bool(false, "Position BGcolor", confirm=true, group="[Backtest]----------", inline="1")
periodBgColor = periodBg and inDateRange ? color.new(color.green, 95) : na
bgcolor(periodBgColor, title="Backtest BGcolor")
bgColorLong   = bgLong and strategy.position_size>0 ? color.new(color.green, 95) : na
bgcolor(bgColorLong, title="Position BGcolor")

// IRISBOT
exchange = input.string("binance",  "Exchange", confirm=true, group="[IRISBOT]----------", inline="2", options=["binance", "bybit", "upbit"])
account  = input.string("account1", "Account",  confirm=true, group="[IRISBOT]----------", inline="2")
symbol   = input.string("BTC/USDT", "Symbol",   confirm=true, group="[IRISBOT]----------", inline="3")
strategy = input.string("sema-x",   "Strategy", confirm=true, group="[IRISBOT]----------", inline="3")
token    = input.string("token",    "Token",    confirm=true, group="[IRISBOT]----------", inline="4")
stRatio  = input.float(100.0,       "Ratio(%)", confirm=true, group="[IRISBOT]----------", inline="5", tooltip="하나의 거래소에서 이 전략을 몇 % 비중으로 투자할 것인가?") * 0.01
leverage = input.float(1,           "Leverage", confirm=true, group="[IRISBOT]----------", inline="5")
isPlotMsg = input.bool(false, "View alert msg", confirm=true, group="[IRISBOT]----------", inline="6")

//****************************************************************************//
// Process
//****************************************************************************//
ema25=ta.ema(close, emaLen25)
ema50=ta.ema(close, emaLen50)

// Entry condition
longCondition  = isLong and ta.crossover(ema25, ema50)
shortCondition = isShort and ta.crossunder(ema25, ema50)

// Entry price
var price=0.0
var pricePlot=0.0
if (longCondition or shortCondition) and strategy.position_size == 0
    price:=close
pricePlot:=price
if (strategy.position_size==0)
    pricePlot:=na

// Amount
amount = str.tostring(stRatio*100)

// IRISBOT alert msg (for auto trading, you can change this for autoview, tvextbot, thanksbot, etc webhookbot)
msgLong  = '{"exchange":"'+exchange+'","account":"'+account+'","strategy":"'+strategy+'","symbol":"'+symbol+'","type":"market","side":"buy","amount":"'+amount+'%","leverage":"'+str.tostring(leverage)+'","token":"'+token+'"}'
msgShort = '{"exchange":"'+exchange+'","account":"'+account+'","strategy":"'+strategy+'","symbol":"'+symbol+'","type":"market","side":"sell","amount":"'+amount+'%","leverage":"'+str.tostring(leverage)+'","token":"'+token+'"}'
msgExit  = '{"exchange":"'+exchange+'","account":"'+account+'","strategy":"'+strategy+'","symbol":"'+symbol+'","type":"market","side":"close","token":"'+token+'"}'

// Entry signal
if inDateRange
    strategy.entry("L", strategy.long,  when=longCondition,  comment="L", alert_message=msgLong)
    strategy.entry("S", strategy.short, when=shortCondition, comment="S", alert_message=msgShort)
    strategy.exit("XL", "L", profit=price*tpLong/syminfo.mintick,  loss=price*slLong/syminfo.mintick,  comment="X", alert_message=msgExit)
    strategy.exit("XS", "S", profit=price*tpShort/syminfo.mintick, loss=price*slShort/syminfo.mintick, comment="X", alert_message=msgExit)

//****************************************************************************//
// Plot
//****************************************************************************//
// Alert msg plot
var msgTable = table.new(position = position.bottom_right, columns = 2, rows = 3, bgcolor = color.new(color.blue, 80), border_width = 1)
if isPlotMsg
    if isLong
        table.cell(msgTable, 0, 0, "Long",  text_halign = text.align_left)
        table.cell(msgTable, 1, 0, msgLong,  text_halign = text.align_left)
    
    if isShort
        table.cell(msgTable, 0, 1, "Short", text_halign = text.align_left, bgcolor=color.new(color.red, 80))
        table.cell(msgTable, 1, 1, msgShort, text_halign = text.align_left, bgcolor=color.new(color.red, 80))
    
    if isLong or isShort
        table.cell(msgTable, 0, 2, "Exit",  text_halign = text.align_left, bgcolor=color.new(color.purple, 80))
        table.cell(msgTable, 1, 2, msgExit,  text_halign = text.align_left, bgcolor=color.new(color.purple, 80))

// EMA
e0=plot(ema25, "Short", color.green)
e1=plot(ema50, "Long", color.red)
fill(e0, e1, ema25>ema50 ? color.new(color.green, 50) : color.new(color.red, 50), "EMA BG")

// TP & SL
p0=plot(pricePlot, "Entry", color.black, style=plot.style_linebr)
p1=plot(pricePlot*(strategy.position_size>0 ? 1+tpLong : 1-tpShort), "TP", color.new(color.green, 50), style=plot.style_linebr)
p2=plot(pricePlot*(strategy.position_size>0 ? 1-slLong : 1+slShort), "SL", color.new(color.red, 50), style=plot.style_linebr)
fill(p0, p1, color.new(color.green, 80), "TP BG")
fill(p0, p2, color.new(color.red, 80), "SL BG")
```

> Detail

https://www.fmz.com/strategy/442537

> Last Modified

2024-02-22 16:18:39
