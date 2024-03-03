
> Name

Backtest-Engine

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|(?Orders)Long orders|
|v_input_2|true|Short orders|
|v_input_3|Long Entry|(?Bot Commands)Entry Long Command|
|v_input_4|Long Closed|Exit Long Command|
|v_input_5|Short Entry|Entry Short Command|
|v_input_6|Short Closed|Exit Short Command|
|v_input_int_1|2018|(?Backtest Period)Backtest Start Year|
|v_input_int_2|true|Backtest Start Month|
|v_input_int_3|true|Backtest Start Day|
|v_input_int_4|9999|Backtest Period (days)|
|v_input_float_1|false|(?Take Profit/Stop Loss)Long Take Profit (%)|
|v_input_float_2|false|Long Stop Loss (%)|
|v_input_float_3|false|Short Take Profit (%)|
|v_input_float_4|false|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
// Backtester v5 © gjfsdrtytru {
// On lines 31-37, use the variable longCondition to trigger your long entry, closeLong to trigger close long, etc.
// TP/SL are built into the script. There are also some inputs for bot commands in the settings UI if you want to set up a trading bot.
// No user input is required beyond line 49. Just define your strategy and let the engine do the rest!
// Thanks to Wunderbit Trading who helped in the making of this script with their open-source code and tutorials.
//@version=5
strategy(
  title                 = "Backtester v5", 
  shorttitle            = "Backtest",
  overlay               = true,
  calc_on_order_fills   = true,
  default_qty_type      = strategy.percent_of_equity,
  default_qty_value     = 100,
  initial_capital       = 10000) // }

// Start code here...
sma1 = ta.sma(close,50)
sma2 = ta.sma(close,200)
plot(sma1,"Fast MA",color.blue)
plot(sma2,"Slow MA",color.red)

// Define Entry/Close Conditions {
i_long  = input(true,"Long orders",group="Orders",tooltip="Toogle on/off long orders")
i_short = input(true,"Short orders",group="Orders",tooltip="Toogle on/off short orders")

longCondition   = false
closeLong       = false
shortCondition  = false
closeShort      = false

if i_long
    longCondition   := ta.crossover(sma1,sma2)      // Enter your conditions here
    closeLong       := ta.crossunder(sma1,sma2)     // Enter your conditions here

if i_short
    shortCondition  := ta.crossunder(sma1,sma2)     // Enter your conditions here
    closeShort      := ta.crossover(sma1,sma2)      // Enter your conditions here
// }
// Bot Web-link Alert - {{strategy.order.comment}} {
// LONG COMMENTS
botLong         = input("Long Entry",   title="Entry Long Command", group="Bot Commands",tooltip="Long entry bot command")
botLongClose    = input("Long Closed",  title="Exit Long Command",  group="Bot Commands",tooltip="Long close bot command")
// SHORT COMMENTS
botShort        = input("Short Entry",  title="Entry Short Command",group="Bot Commands",tooltip="Short entry bot command")
botShortClose   = input("Short Closed", title="Exit Short Command", group="Bot Commands",tooltip="Short close bot command")
// }

// BACKTEST ENGINE [NO USER INPUT REQUIRED] ////////////////// {
// Time period {
testStartYear   = input.int(2018,   title="Backtest Start Year",    minval=2010,maxval=2100,group="Backtest Period")
testStartMonth  = input.int(1,      title="Backtest Start Month",   minval=1,   maxval=12,  group="Backtest Period")
testStartDay    = input.int(1,      title="Backtest Start Day",     minval=1,   maxval=31,  group="Backtest Period")
testPeriodLen   = input.int(9999,   title="Backtest Period (days)", minval=1,               group="Backtest Period",tooltip="Days until strategy ends") * 86400000 // convert days into UNIX time
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testPeriodStop  = testPeriodStart + testPeriodLen
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
// }
// Calculate TP/SL {
// User inputs
i_longTP     = input.float(title="Long Take Profit (%)" ,minval=0.0, step=1, defval=0,group="Take Profit/Stop Loss") * 0.01
i_longSL     = input.float(title="Long Stop Loss (%)"   ,minval=0.0, step=1, defval=0,group="Take Profit/Stop Loss") * 0.01
i_shortTP    = input.float(title="Short Take Profit (%)",minval=0.0, step=1, defval=0,group="Take Profit/Stop Loss") * 0.01
i_shortSL    = input.float(title="Short Stop Loss (%)"  ,minval=0.0, step=1, defval=0,group="Take Profit/Stop Loss") * 0.01

// 0% TP/SL = OFF (a value of 0 turns off TP/SL feature)
longTP     = i_longTP  == 0 ? 1000 : i_longTP
longSL     = i_longSL  == 0 ? 1    : i_longSL
shortTP    = i_shortTP == 0 ? 1    : i_shortTP
shortSL    = i_shortSL == 0 ? 1000 : i_shortSL

// Determine TP/SL price based on percentage given
longTP      := strategy.position_avg_price * (1 + longTP)
longSL      := strategy.position_avg_price * (1 - longSL)
shortTP     := strategy.position_avg_price * (1 - shortTP)
shortSL     := strategy.position_avg_price * (1 + shortSL) 
// }
// Anti-overlap {
isEntry_Long    = false
isEntry_Long    := nz(isEntry_Long[1], false)
isExit_Long     = false
isExit_Long     := nz(isExit_Long[1], false)
isEntry_Short   = false
isEntry_Short   := nz(isEntry_Short[1], false)
isExit_Short    = false
isExit_Short    := nz(isExit_Short[1], false)

entryLong       = not isEntry_Long and longCondition
exitLong        = not isExit_Long and closeLong
entryShort      = not isEntry_Short and  shortCondition
exitShort       = not isExit_Short and closeShort

if (entryLong)
    isEntry_Long := true
    isExit_Long := false
if (exitLong)
    isEntry_Long := false
    isExit_Long := true
if (entryShort)
    isEntry_Short := true
    isExit_Short := false
if (exitShort)
    isEntry_Short := false
    isExit_Short := true
// }
// Order Execution {
// Entries
if testPeriod()
    strategy.entry("Long" ,strategy.long ,when=entryLong ,comment=botLong)
    strategy.entry("Short",strategy.short,when=entryShort,comment=botShort)

// TP/SL
if (strategy.position_size > 0) 
    strategy.exit(from_entry="Long", id="Long SL/TP",   qty_percent=100,limit=longTP, stop=longSL) 
    strategy.close(id       ="Long", when=exitLong,     qty_percent=100,comment=botLongClose)
if (strategy.position_size < 0)
    strategy.exit(from_entry="Short", id="Short TP/SL", qty_percent=100,limit=shortTP,stop=shortSL)
    strategy.close(id       ="Short", when=exitShort,   qty_percent=100,comment=botShortClose)
// }
// Draw Entry, TP and SL Levels {
// Long positions
plot(strategy.position_size > 0 ? strategy.position_avg_price   : na, style=plot.style_linebr, color=color.blue,    title="Long Entry")
plot(strategy.position_size > 0 ? i_longTP    == 0 ? na : longTP  : na, style=plot.style_linebr, color=color.green,   title="Long TP")
plot(strategy.position_size > 0 ? i_longSL    == 0 ? na : longSL  : na, style=plot.style_linebr, color=color.red,     title="Long SL")
// Short positions
plot(strategy.position_size < 0 ? strategy.position_avg_price   : na, style=plot.style_linebr, color=color.blue,    title="Short Entry")
plot(strategy.position_size < 0 ? i_shortTP   == 0 ? na : shortTP : na, style=plot.style_linebr, color=color.green,   title="Short TP")
plot(strategy.position_size < 0 ? i_shortSL   == 0 ? na : shortSL : na, style=plot.style_linebr, color=color.red,     title="Short SL")
// }
// }
```

> Detail

https://www.fmz.com/strategy/380262

> Last Modified

2022-08-27 18:23:44
