
> Name

Flawless-Victory-Strategy

> Author

ChaoZhang

> Strategy Description

Hello everyone, I am a heavy Python programmer bringing machine learning to TradingView. This 15 minute Bitcoin Long strategy was created using a machine learning library and 1 year of historical data in Python. Every parameter is hyper optimized to bring you the most profitable buy and sell signals for Bitcoin on the 15min chart. The historical Bitcoin data was gathered from Binance API , in case you want to know the best exchange to use this long strategy. It is a simple Bollinger Band and RSI strategy with two versions included in the tradingview settings. The first version has a Sharpe Ratio of 7.5 which is amazing, and the second version includes the best stop loss and take profit positions with a Sharpe Ratio of 2.5 . Let me talk a little bit more about how the strategy works. The buy signal is triggered when close price is less than lower Bollinger Band at Std Dev 1, and the RSI is greater than a certain value. The sell signal is triggered when close price is greater than upper Bollinger Band at Std Dev 1, and the RSI is greater than a certain value. What makes this strategy interesting is the parameters the Machine Learning library found when backtesting for the best Sharpe Ratio. I left my computer on for about 28 hours to fully backtest 5000 EPOCHS and get the results. I was able to create a great strategy that might be one of TradingView's best strategies out on the website today. I will continue to apply machine learning to all my strategies from here on forward. Please Let me know if you have any questions or certain strategies you would like me to hyper optimize for you. I'm always willing to create profitable strategies!

P.S. You can always pyramid this strategy for more gains! I just don't add pyramiding when creating my strategies because I want to show you the true win/loss ratio based buying one time and one selling one time. I feel like when creating a strategy that includes pyramiding right off the bat falsifies the win rate. This is my way of being transparent with you all. Have fun trading!


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/196cd937cba374aaca1.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Version 1 - Doesn't Use SL/TP|
|v_input_2|false|Version 2 - Uses SL/TP|
|v_input_3|false|Version 3 - Uses SL/TP|
|v_input_4|6.604|Stop Loss %|
|v_input_5|2.328|Take Profit %|
|v_input_6|8.882|Stop Loss %|
|v_input_7|2.317|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00:00
end: 2022-05-23 23:59:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Bunghole

//@version=4
strategy(overlay=true, shorttitle="Flawless Victory Strategy", default_qty_type = strategy.percent_of_equity, initial_capital = 100000, default_qty_value = 100, pyramiding = 0, title="Flawless Victory Strategy", currency = 'USD')

////////// ** Inputs ** //////////

// Stoploss and Profits Inputs

v1 = input(true, title="Version 1 - Doesn't Use SL/TP")
v2 = input(false, title="Version 2 - Uses SL/TP")
v3 = input(false, title="Version 3 - Uses SL/TP")
v2stoploss_input = input(6.604, title='Stop Loss %', type=input.float, minval=0.01)/100
v2takeprofit_input = input(2.328, title='Take Profit %', type=input.float, minval=0.01)/100
v2stoploss_level = strategy.position_avg_price * (1 - v2stoploss_input)
v2takeprofit_level = strategy.position_avg_price * (1 + v2takeprofit_input)

v3stoploss_input = input(8.882, title='Stop Loss %', type=input.float, minval=0.01)/100
v3takeprofit_input = input(2.317, title='Take Profit %', type=input.float, minval=0.01)/100
v3stoploss_level = strategy.position_avg_price * (1 - v3stoploss_input)
v3takeprofit_level = strategy.position_avg_price * (1 + v3takeprofit_input)

plot(v2 and v2stoploss_input and v2stoploss_level ? v2stoploss_level: na, color=color.red, style=plot.style_linebr, linewidth=2, title="v2 Stoploss")
plot(v2 and v2takeprofit_input ? v2takeprofit_level: na, color=color.green, style=plot.style_linebr, linewidth=2, title="v2 Profit")

plot(v3 and v3stoploss_input and v3stoploss_level ? v3stoploss_level: na, color=color.red, style=plot.style_linebr, linewidth=2, title="v3 Stoploss")
plot(v3 and v3takeprofit_input ? v3takeprofit_level: na, color=color.green, style=plot.style_linebr, linewidth=2, title="v3 Profit")

////////// ** Indicators ** //////////

// RSI

len = 14
src = close
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)

// MFI

MFIlength = 14
MFIsrc = hlc3
MFIupper = sum(volume * (change(MFIsrc) <= 0 ? 0 : MFIsrc), MFIlength)
MFIlower = sum(volume * (change(MFIsrc) >= 0 ? 0 : MFIsrc), MFIlength)
_rsi(MFIupper, MFIlower) =>
    if MFIlower == 0
        100
    if MFIupper == 0
        0
	100.0 - (100.0 / (1.0 + MFIupper / MFIlower))
mfi = _rsi(MFIupper, MFIlower)

// v1 Bollinger Bands

length1 = 20
src1 = close
mult1 = 1.0
basis1 = sma(src1, length1)
dev1 = mult1 * stdev(src1, length1)
upper1 = basis1 + dev1
lower1 = basis1 - dev1

// v2 Bollinger Bands

length2 = 17
src2 = close
mult2 = 1.0
basis2 = sma(src2, length2)
dev2 = mult2 * stdev(src2, length2)
upper2 = basis2 + dev2
lower2 = basis2 - dev2

////////// ** Triggers and Guards ** //////////

// v1 Strategy Parameters

RSILowerLevel1 = 42
RSIUpperLevel1 = 70
BBBuyTrigger1 = src1 < lower1
BBSellTrigger1 = src1 > upper1
rsiBuyGuard1 = rsi > RSILowerLevel1
rsiSellGuard1 = rsi > RSIUpperLevel1

// v2 Strategy Parameters

RSILowerLevel2 = 42
RSIUpperLevel2 = 76
BBBuyTrigger2 = src2 < lower2
BBSellTrigger2 = src2 > upper2
rsiBuyGuard2 = rsi > RSILowerLevel2
rsiSellGuard2 = rsi > RSIUpperLevel2

// v3 Strategy Parameters

MFILowerLevel3 = 60
RSIUpperLevel3 = 65
MFIUpperLevel3 = 64
BBBuyTrigger3 = src1 < lower1
BBSellTrigger3 = src1 > upper1
mfiBuyGuard3 = mfi < MFILowerLevel3
rsiSellGuard3 = rsi > RSIUpperLevel3
mfiSellGuard3 = mfi > MFIUpperLevel3 

//////////** Strategy Signals ** //////////

// v1 Signals

Buy_1 = BBBuyTrigger1 and rsiBuyGuard1
Sell_1 = BBSellTrigger1 and rsiSellGuard1

if v1 == true
    
    strategy.entry("Long", strategy.long, when = Buy_1, alert_message = "v1 - Buy Signal!")
    strategy.entry("Sell", when = Sell_1, alert_message = "v1 - Sell Signal!")

// v2 Signals

Buy_2 = BBBuyTrigger2 and rsiBuyGuard2
Sell_2 = BBSellTrigger2 and rsiSellGuard2

if v2 == true
    strategy.entry("Long", strategy.long, when = Buy_2, alert_message = "v2 - Buy Signal!")
    strategy.entry("Sell", when = Sell_2, alert_message = "v2 - Sell Signal!")
    strategy.exit("Stoploss/TP", "Long", stop = v2stoploss_level, limit = v2takeprofit_level)

// v3 Signals

Buy_3 = BBBuyTrigger3 and mfiBuyGuard3
Sell_3 = BBSellTrigger3 and rsiSellGuard3 and mfiSellGuard3

if v3 == true
    strategy.entry("Long", strategy.long, when = Buy_3, alert_message = "v2 - Buy Signal!")
    strategy.entry("Sell", when = Sell_3, alert_message = "v2 - Sell Signal!")
    strategy.exit("Stoploss/TP", "Long", stop = v3stoploss_level, limit = v3takeprofit_level)


```

> Detail

https://www.fmz.com/strategy/365687

> Last Modified

2022-05-25 17:08:13
