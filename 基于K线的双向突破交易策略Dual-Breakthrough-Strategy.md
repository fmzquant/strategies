
> Name

基于K线的双向突破交易策略Dual-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/133e58ba984f14c0c26.png)
[trans]

## 概述
这是一个基于K线的双向突破交易策略。它会在当前K线收盘价相对前两根K线的最高价和最低价都有突破时,产生交易信号。

## 策略原理
该策略的基本逻辑是:

1. 定义公牛信号:`bull = close > open and close > math.max(close[2], open[2]) and low[1] < low[2] and high[1] < high[2]`。也就是说,当前K线的收盘价大于开盘价,并且大于前两K线的最高价,而当前K线的最低价又低于前一根K线的最低价。

2. 定义熊信号:`bear = close < open and close < math.min(close[2], open[2]) and low[1] > low[2] and high[1] > high[2]`。也就是说,当前K线的收盘价小于开盘价,并且小于前两K线的最低价,而当前K线的最高价又高于前一根K线的最高价。

3. 当触发公牛信号时,做多;当触发熊信号时,做空。

4. 可设置止损位和止盈位。

该策略利用了双向突破的特征,通过突破关键价格区间来判断趋势的变化,从而产生交易信号。

## 优势分析
这是一个相对简单直观的突破策略,具有如下优势:

1. 逻辑清晰,易于理解实现,门槛不高。

2. 突破是常见的交易信号,容易形成趋势。

3. 同时做多做空,可以双向交易,增加获利机会。

4. 可灵活设置止损止盈,控制风险。

## 风险分析
该策略也存在一些风险:

1. 双向交易风险较大,需要密切监控。

2. 突破容易被套,可能形成虚假信号。

3. 参数设置不当可能导致过度交易。

4. 止损止盈设置不当也会影响盈利空间。

可以优化参数,适当筛选品种来降低风险。

## 优化方向
该策略可以从以下几个方面进行优化:

1. 优化参数,如突破周期参数、止损止盈幅度等。

2. 增加过滤条件,避免套利、震荡等行情的错误信号。

3. 结合趋势指标,避开盘整范围。

4. 优化资金管理,改进仓位算法。

5. 不同品种参数不一样,可以分别测试优化。

## 总结
这是一个基于双向突破思想的简单策略。具有逻辑清晰、易于实现的优点,也存在一定的监控风险。通过参数和条件优化,可望获得较好的策略效果。

||

## Overview
This is a dual breakthrough trading strategy based on K-line. It will generate trading signals when the closing price of the current K-line has a breakthrough relative to the highest and lowest prices of the previous two K-lines.  

## Strategy Principle  
The basic logic of the strategy is:  

1. Define bull signal: `bull = close > open and close > math.max(close[2], open[2]) and low[1] < low[2] and high[1] < high[2]`. That is, the closing price of the current K-line is greater than the opening price, and greater than the highest price of the previous two K-lines, while the lowest price of the current K-line is lower than the lowest price of the previous K-line.  

2. Define bear signal: `bear = close < open and close < math.min(close[2], open[2]) and low[1] > low[2] and high[1] > high[2]`. That is, the closing price of the current K-line is less than the opening price, and less than the lowest price of the previous two K-lines, while the highest price of the current K-line is higher than the highest price of the previous K-line.  

3. When a bull signal is triggered, go long; when a bear signal is triggered, go short.  

4. Stop loss and take profit can be set.  

The strategy utilizes the characteristics of dual breakthroughs to judge changes in trends through breakthroughs of key price zones, thereby generating trading signals.

## Advantage Analysis
This is a relatively simple and intuitive breakout strategy with the following advantages:  

1. The logic is clear and easy to understand and implement, with a low barrier to entry.  

2. Breakthroughs are common trading signals that tend to form trends easily.  

3. Going both long and short allows for dual directional trading, increasing profit opportunities.  

4. Flexible stop loss and take profit settings help control risk.

## Risk Analysis 
The strategy also carries some risks:

1. Dual directional trading carries higher risks and requires close monitoring.  

2. Breakouts can be vulnerable to traps, potentially forming false signals.  

3. Improper parameter settings may lead to overtrading. 

4. Improper stop loss and take profit settings can also affect profit potential.

Risks can be reduced by optimizing parameters and appropriately filtering products.

## Optimization Directions
The strategy can be optimized in the following aspects:  

1. Optimize parameters like breakout cycle, stop loss/take profit range etc.  

2. Add filtering conditions to avoid errors from arbitrage, sideways movements etc.  

3. Incorporate trend indicators to avoid consolidation ranges. 
  
4. Optimize capital management, improve position algorithms.
  
5. Different parameters for different products, test and optimize separately.

## Summary  
This is a simple strategy based on the dual breakout concept. It has the advantage of clear logic and easy implementation, but also carries certain monitoring risks. Better strategy results can be expected through parameter and condition optimization.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Debug)Show Alerts Debug Label?|
|v_input_string_1|0|(?Automation)Use Demo or Live Broker: DEMO|LIVE|
|v_input_string_2|0|Broker Name: Tradovate|AscendEX|Binance|Binance Futures|Binance US|Binance Delivery|Kraken|Deribit|Poloniex|Okcoin|Bitfinex|Oanda|Kucoin|Okex|Bybit|FTX|Bitmex|Alpaca|Gemini|
|v_input_bool_2|true|Enable trades?|
|v_input_string_3|*|Account Name|
|v_input_string_4|btcusd_perp|Symbol Name|
|v_input_int_1|2|Nb Contracts|
|v_input_bool_3|false|Use Delay between orders|
|v_input_int_2|true|Delay in seconds|
|v_input_bool_4|false|(?Binance Automation)Use Borrow/Repay Mode?|
|v_input_string_5|BTC|Asset to Borrow/Repay|
|v_input_float_1|true|Quantity of assets to borrow?|
|v_input_1|false|(?Date)Date Range Filtering|
|v_input_2|timestamp(01 Jan 2019 13:30 +0000)|Start Time|
|v_input_3|timestamp(30 Dec 2021 23:30 +0000)|End Time|
|v_input_string_6|0|(?Stop Loss)Select Stop Loss Mode: None|Percent|Price|
|v_input_float_2|3|(?Stop Loss %)Stop Loss (%)|
|v_input_float_3|30|(?Stop Loss USD)Stop Loss (USD)|
|v_input_string_7|0|(?Take Profit)Select Take Profit Mode: None|Percent|Price|
|v_input_float_4|3|(?Take Profit %)Take Profit (%)|
|v_input_float_5|30|(?Take Profit USD)Take Profit (USD)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

// # ========================================================================= #
// #                   |   Strategy  |
// # ========================================================================= #

SystemName = "Strategy Template Autoview"
TradeId = "S"
// These values are used both in the strategy() header and in the script's relevant inputs as default values so they match.
// Unless these values match in the script's Inputs and the TV backtesting Properties, results between them cannot be compared.
InitCapital = 1000000
InitPosition = 2
InitCommission = 0.075
InitPyramidMax = 1
CalcOnorderFills = false
ProcessOrdersOnClose = true // display the signals one candle earlier
CalcOnEveryTick = true // forward testing
//CloseEntriesRule = "ANY"

strategy(title=SystemName, shorttitle=SystemName, 
 overlay=true, pyramiding=InitPyramidMax, initial_capital=InitCapital, default_qty_type=strategy.fixed, process_orders_on_close=ProcessOrdersOnClose,
 default_qty_value=InitPosition, commission_type=strategy.commission.percent, commission_value=InitCommission, calc_on_order_fills=CalcOnorderFills, 
 calc_on_every_tick=CalcOnEveryTick, 
 precision=6, max_lines_count=500, max_labels_count=500)

// # ========================================================================= #
// # ========================================================================= #
// #                   ||   Alerts  ||
// # ========================================================================= #
// # ========================================================================= #

show_alerts_debug = input.bool(true, title = "Show Alerts Debug Label?", group = "Debug")

//i_alert_txt_entry_long = input.text_area(defval = "", title = "Long Entry Message", group = "Alerts")
//i_alert_txt_entry_short = input.text_area(defval = "", title = "Short Entry Message", group = "Alerts")
//i_alert_txt_exit_long = input.text_area(defval = "", title = "Long Exit Message", group = "Alerts")
//i_alert_txt_exit_short = input.text_area(defval = "", title = "Short Exit Message", group = "Alerts")

i_broker_mode = input.string("DEMO", title = "Use Demo or Live Broker", options=["DEMO", "LIVE"], group = "Automation")
i_broker_name = input.string("Tradovate", title = "Broker Name", options=["Tradovate", "AscendEX", "Binance", "Binance Futures", "Binance US", "Binance Delivery", "Kraken", "Deribit", "Poloniex", "Okcoin", "Bitfinex", "Oanda", "Kucoin", "Okex", "Bybit", "FTX", "Bitmex", "Alpaca", "Gemini"], group = "Automation")

i_enable_trades = input.bool(true, title = "Enable trades?", group = "Automation", tooltip = "If not enabled, disables live trades, but more importantly, it will output what Autoview is going to do when you go live.")

i_account_name = input.string("*", title = "Account Name", group = "Automation")
i_symbol_name  = input.string("btcusd_perp", title = "Symbol Name", group = "Automation")
nb_contracts = input.int(2, title = "Nb Contracts", group = "Automation")

use_delay = input.bool(false, title = "Use Delay between orders", group = "Automation", inline = "delay")
i_delay_qty = input.int(1, title = "Delay in seconds", group = "Automation", inline = "delay")

i_use_borrow_repay   = input.bool(false, title = "Use Borrow/Repay Mode?", group = "Binance Automation")
i_asset_borrow_repay = input.string("BTC", title = "Asset to Borrow/Repay", group = "Binance Automation")
i_qty_borrow_repay   = input.float(1., title = "Quantity of assets to borrow?", group = "Binance Automation")

// # ========================================================================= #
// # ========================================================================= #
// #                   ||   Dates Range Filtering  ||
// # ========================================================================= #
// # ========================================================================= #

DateFilter = input(false, "Date Range Filtering", group="Date")

// ————— Syntax coming from https://www.tradingview.com/blog/en/new-parameter-for-date-input-added-to-pine-21812/
i_startTime = input(defval = timestamp("01 Jan 2019 13:30 +0000"), title = "Start Time", group="Date")
i_endTime = input(defval = timestamp("30 Dec 2021 23:30 +0000"), title = "End Time", group="Date")

TradeDateIsAllowed() => true


// # ========================================================================= #
// #                   |   Custom Exits |
// # ========================================================================= #

//use_custom_exit = input.bool(true, title = "Use Custom Exits?", group = "Custom Exits")

// # ========================================================================= #
// #                   |   Stop Loss |
// # ========================================================================= #

use_sl        = input.string("None", title = "Select Stop Loss Mode", options=["None", "Percent", "Price"], group = "Stop Loss")
sl_input_perc = input.float(3, minval = 0, title = "Stop Loss (%)", group = "Stop Loss (%)") * 0.01
sl_input_pips = input.float(30, minval = 0, title = "Stop Loss (USD)", group = "Stop Loss (USD)")

// # ========================================================================= #
// #                   |   Take Profit |
// # ========================================================================= #

use_tp       = input.string("None", title = "Select Take Profit Mode", options=["None", "Percent", "Price"], group = "Take Profit")
tp_input_perc = input.float(3, minval = 0, title = "Take Profit (%)", group = "Take Profit (%)") * 0.01
tp_input_pips = input.float(30, minval = 0, title = "Take Profit (USD)", group = "Take Profit (USD)")


// # ========================================================================= #
// #                   |   Consolidated Entries |
// # ========================================================================= #

bull = close > open and close > math.max(close[2], open[2]) and low[1] < low[2] and high[1] < high[2] // low < low[1] and low[1] < low[2] 
bear = close < open and close < math.min(close[2], open[2]) and low[1] > low[2] and high[1] > high[2] // low < low[1] and low[1] < low[2] 

// # ========================================================================= #
// #       |   Entry Price |
// # ========================================================================= #

entry_long_price  = ta.valuewhen(condition=bull and strategy.position_size[1] <= 0, source=close, occurrence=0)
entry_short_price = ta.valuewhen(condition=bear and strategy.position_size[1] >= 0, source=close, occurrence=0)

var float entry_price = 0.

if bull
    entry_price := entry_long_price
if bear
    entry_price := entry_short_price

// # ========================================================================= #
// #                   ||   Global Trend Variables ||
// # ========================================================================= #

T1_sinceUP = ta.barssince(bull)
T1_sinceDN = ta.barssince(bear)

T1_nUP = ta.crossunder(T1_sinceUP,T1_sinceDN)
T1_nDN = ta.crossover(T1_sinceUP,T1_sinceDN)

T1_sinceNUP = ta.barssince(T1_nUP)
T1_sinceNDN = ta.barssince(T1_nDN)

T1_BuyTrend  = T1_sinceDN > T1_sinceUP
T1_SellTrend = T1_sinceDN < T1_sinceUP

T1_SellToBuy   = T1_BuyTrend and T1_SellTrend[1]
T1_BuyToSell   = T1_SellTrend and T1_BuyTrend[1]
T1_ChangeTrend = T1_BuyToSell or T1_SellToBuy

// # ========================================================================= #
// #                   |   Stop Loss |
// # ========================================================================= #

var float final_SL_Long  = 0.
var float final_SL_Short = 0.

if use_sl == "Percent"
    final_SL_Long := entry_long_price * (1 - sl_input_perc)
    final_SL_Short := entry_short_price * (1 + sl_input_perc)
else if use_sl == "Price"
    final_SL_Long := entry_long_price - (sl_input_pips)
    final_SL_Short := entry_short_price + (sl_input_pips)

plot(strategy.position_size > 0 and use_sl != "None" ? final_SL_Long : na, title = "SL Long", color = color.fuchsia, linewidth=2, style=plot.style_linebr)
plot(strategy.position_size < 0 and use_sl != "None" ? final_SL_Short : na, title = "SL Short", color = color.fuchsia, linewidth=2, style=plot.style_linebr)

// # ========================================================================= #
// #                   |   Take Profit |
// # ========================================================================= #

var float final_TP_Long  = 0.
var float final_TP_Short = 0.

if use_tp == "Percent"
    final_TP_Long := entry_long_price   * (1 + tp_input_perc)
    final_TP_Short := entry_short_price * (1 - tp_input_perc)
else if use_tp == "Price"
    final_TP_Long := entry_long_price   + (tp_input_pips)
    final_TP_Short := entry_short_price - (tp_input_pips)

plot(strategy.position_size > 0 and use_tp != "None" ? final_TP_Long : na, title = "TP Long", color = color.orange, linewidth=2, style=plot.style_linebr)
plot(strategy.position_size < 0 and use_tp != "None" ? final_TP_Short : na, title = "TP Short", color = color.orange, linewidth=2, style=plot.style_linebr)

// # ========================================================================= #
// #                   |   AutoView Calls |
// # ========================================================================= #

float quantity = nb_contracts

string product_type_ticker = i_symbol_name

var string broker_mode = ""

if i_broker_mode == "DEMO"

    broker_mode := switch i_broker_name
        "Tradovate" => "tradovatesim"
        "Ascendex"  => "ascendex-sandbox"
        "Binance Futures" => "binancefuturestestnet"
        "Binance Delivery" => "binancedeliverytestnet"
        "Oanda" => "oandapractice"
        "Bitmex" => "bitmextestnet"
        "Bybit" => "bybittestnet"
        "Alpaca" => "alpacapaper"
        "Kucoin" => "kucoinsandbox"
        "Deribit" => "deribittestnet"
        "Gemini" => "gemini-sandbox"
        => i_broker_name

else // "LIVE"

    broker_mode := switch i_broker_name
        "Tradovate" => "tradovate"
        "Ascendex"  => "ascendex"
        "Binance Futures" => "binancefutures"
        "Binance Delivery" => "binancedelivery"
        "Binance" => "binance"
        "Oanda" => "oanda"
        "Kraken" => "kraken"
        "Deribit" => "deribit"
        "Bitfinex" => "bitfinex"
        "Poloniex" => "poloniex"
        "Bybit" => "bybit"
        "Okcoin" => "okcoin"
        "Kucoin" => "kucoin"
        "FTX" => "ftx"
        "Bitmex" => "bitmex"
        "Alpaca" => "alpaca"
        "Gemini" => "gemini"
        => i_broker_name

enable_trades = i_enable_trades ? "" : " d=1"
string delay_qty = use_delay ? " delay=" + str.tostring(i_delay_qty) : ""

i_alert_txt_entry_long = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + enable_trades + " b=short c=position t=market" + 
 "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=long q=" + str.tostring(quantity, "#") + " t=market" + enable_trades + delay_qty
 
i_alert_txt_entry_short = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + enable_trades + " b=long c=position t=market" + 
 "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=short q=" + str.tostring(quantity, "#") + " t=market" + enable_trades + delay_qty

var string temp_txt_SL_long = ""
var string temp_txt_SL_short = ""

var string temp_txt_TP_long = ""
var string temp_txt_TP_short = ""

if use_sl == "Percent"

    temp_txt_SL_long  := "sl=-" + str.tostring(sl_input_perc * 100) + "%"
    temp_txt_SL_short := "sl=" + str.tostring(sl_input_perc * 100) + "%"

else if use_sl == "Price"

    temp_txt_SL_long  := "fsl=" + str.tostring(final_SL_Long)
    temp_txt_SL_short := "fsl=" + str.tostring(final_SL_Short)

if use_tp == "Percent"

    temp_txt_TP_long := "p=" + str.tostring(tp_input_perc * 100) + "%" 
    temp_txt_TP_short := "p=-" + str.tostring(tp_input_perc * 100) + "%" 

else if use_tp == "Price"

    temp_txt_TP_long  := "fpx=" + str.tostring(final_TP_Long)
    temp_txt_TP_short := "fpx=" + str.tostring(final_TP_Short)  

i_alert_txt_exit_SL_long  = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=long c=position t=market " + temp_txt_SL_long + enable_trades 
i_alert_txt_exit_SL_short = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=short c=position t=market " + temp_txt_SL_short + enable_trades 
i_alert_txt_exit_TP_long  = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=long c=position t=market " + temp_txt_TP_long + enable_trades 
i_alert_txt_exit_TP_short = "a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=short c=position t=market " + temp_txt_TP_short + enable_trades 

string final_alert_txt_entry_long = i_alert_txt_entry_long
string final_alert_txt_entry_short = i_alert_txt_entry_short

if i_use_borrow_repay and i_broker_name == "Binance"

    final_alert_txt_entry_long := "a=" + i_account_name + " e=" + broker_mode + "y=borrow w=" + i_asset_borrow_repay + " q=" + str.tostring(i_qty_borrow_repay, "#") + enable_trades +
     "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + enable_trades + " b=short c=position t=market" + delay_qty +
     "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=long q=" + str.tostring(quantity, "#") + " t=market" + enable_trades + delay_qty +
     "\n a=" + i_account_name + " e=" + broker_mode + "y=repay w=" + i_asset_borrow_repay + " q=" + str.tostring(i_qty_borrow_repay, "#") + enable_trades

    final_alert_txt_entry_short := "a=" + i_account_name + " e=" + broker_mode + "y=borrow w=" + i_asset_borrow_repay + " q=" + str.tostring(i_qty_borrow_repay, "#") + enable_trades +
     "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + enable_trades + " b=long c=position t=market" + delay_qty +
     "\n a=" + i_account_name + " e=" + broker_mode + " s=" + product_type_ticker + " b=short q=" + str.tostring(quantity, "#") + " t=market" + enable_trades + delay_qty +
     "\n a=" + i_account_name + " e=" + broker_mode + "y=repay w=" + i_asset_borrow_repay + " q=" + str.tostring(i_qty_borrow_repay, "#") + enable_trades

//i_alert_txt_entry_long  := final_alert_txt_entry_long
//i_alert_txt_entry_short := final_alert_txt_entry_short

if show_alerts_debug and barstate.islastconfirmedhistory

    var label lblTest = na

    label.delete(lblTest)

    string label_txt = i_alert_txt_entry_long

    if use_sl != "None"
        label_txt := label_txt + "\n" + i_alert_txt_exit_SL_long

    if use_tp != "None"
        label_txt := label_txt + "\n" + i_alert_txt_exit_TP_long

    t = time + (time - time[1]) * 25

    lblTest := label.new(
     x            = t,
     y            = ta.highest(50),
     text         = label_txt,
     xloc         = xloc.bar_time,
     yloc         = yloc.price,
     color        = color.new(color = color.gray, transp = 0),
     style        = label.style_label_left,
     textcolor    = color.new(color = color.white, transp = 0),
     size         =  size.large
     )

// # ========================================================================= #
// #                   |   Strategy Calls and Alerts |
// # ========================================================================= #

if bull and TradeDateIsAllowed() 

    strategy.entry(id = "Long", direction =  strategy.long, comment = "Long", alert_message = i_alert_txt_entry_long, qty = nb_contracts)
    alert(i_alert_txt_entry_long, alert.freq_once_per_bar)
    
else if bear and TradeDateIsAllowed()
    strategy.entry(id = "Short", direction =  strategy.short, comment = "Short", alert_message = i_alert_txt_entry_short, qty = nb_contracts)
    alert(i_alert_txt_entry_short, alert.freq_once_per_bar)

//quantity := quantity * 2

strategy.exit(id = "Exit Long",  from_entry = "Long",  stop = (use_sl != "None") ? final_SL_Long : na,  comment_loss = "Long Exit SL", alert_loss  = (use_sl != "None") ? i_alert_txt_exit_SL_long : na,   limit = (use_tp != "None") ? final_TP_Long  : na, comment_profit = "Long Exit TP", alert_profit = (use_tp != "None") ? i_alert_txt_exit_TP_long : na)   
strategy.exit(id = "Exit Short", from_entry = "Short", stop = (use_sl != "None") ? final_SL_Short : na, comment_loss = "Short Exit SL", alert_loss = (use_sl != "None") ? i_alert_txt_exit_SL_short : na, limit = (use_tp != "None") ? final_TP_Short : na, comment_profit = "Short Exit TP", alert_profit = (use_tp != "None") ? i_alert_txt_exit_TP_short : na)   

if strategy.position_size > 0 and low < final_SL_Long and use_sl != "None"
    alert(i_alert_txt_exit_SL_long, alert.freq_once_per_bar)

else if strategy.position_size < 0 and high > final_SL_Short and use_sl != "None"
    alert(i_alert_txt_exit_SL_short, alert.freq_once_per_bar)

if strategy.position_size > 0 and high > final_TP_Long and use_tp != "None"
    alert(i_alert_txt_exit_TP_long, alert.freq_once_per_bar)

else if strategy.position_size < 0 and low < final_TP_Short and use_tp != "None"
    alert(i_alert_txt_exit_TP_short, alert.freq_once_per_bar)

// # ========================================================================= #
// #                   |   Reset Variables |
// # ========================================================================= #
```

> Detail

https://www.fmz.com/strategy/440460

> Last Modified

2024-01-30 17:27:01
