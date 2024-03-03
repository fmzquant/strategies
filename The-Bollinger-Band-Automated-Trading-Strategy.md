
> Name

The-Bollinger-Band-Automated-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

How it Works

The strategy combines a short and long period simple moving average (SMA) with Bollinger Bands to identify trading opportunities. When the price closes below the lower band, a long position is entered.

The initial trade size is fixed, but subsequent safety orders are scaled according to the user-defined percentage. Profit taking and stop loss levels trail the average entry price using target percentages.

Benefits

Key benefits of the strategy include:

Automated trading based on Bollinger Band breakouts
Flexible input parameters for optimization
Scales position size using safety orders
Implemented as a 3Commas trading bot
Risks

Potential risks to consider:

Breakout signals late when volatility expands
Increased exposure from pyramiding positions
Stop loss can lag behind in fast moving markets
The strategy aims to capitalize on trend continuations. Appropriate stop loss and risk management is required to limit downside.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Short MA Window|
|v_input_2|100|Long MA Window|
|v_input_3|2.5|Upper Band Offset|
|v_input_4|2.5|Lower Band Offset|
|v_input_5|15|Long Stop Loss (%)|
|v_input_6|1.4|Long Take Profit (%)|
|v_input_7|0.8|Initial SO Deviation (%)|
|v_input_8|1.55|Safety Order Vol Step (%)|
|v_input_9|true|Enable/Disable visual lines|
|v_input_10||3Commas Bot ID|
|v_input_11||Bot Email Token|
|v_input_12||3Commas Bot Trading Pair|
|v_input_13|true|Start Date|
|v_input_14|true|Start Month|
|v_input_15|2016|Start Year|
|v_input_16|31|End Date|
|v_input_17|12|End Month|
|v_input_18|2022|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-09 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tedwardd

// This strategy is intended to help users of the 3commas.io platform backtest bot performance based on a Bollinger Strategy.
// It can also be used to signal a bot to open a deal by providing the Bot ID, email token and trading pair in the strategy settings screen.
// As currently written, this strategy uses a basic Bollinger Band strategy, recommening a deal start when the closing price crosses under the lower band.
// The thick thick red line plotted on the chart shows the average entry price of the current deal.

// strategy("3Commas Bollinger Strategy", overlay=true, default_qty_type=strategy.cash, default_qty_value=100, initial_capital=1000, currency="USD", commission_value=0.1)


// USER INPUTS
sma_short_val           = input(title="Short MA Window", defval=20)
sma_long_val            = input(title="Long MA Window", defval=100)
ubOffset                = input(title="Upper Band Offset", defval=2.5, step=0.5)
lbOffset                = input(title="Lower Band Offset", defval=2.5, step=0.5)
stoploss_input          = input(title="Long Stop Loss (%)", minval=0, step=1, defval=15) * 0.01
takeprofit_input        = input(title="Long Take Profit (%)", minval=0, step=1, defval=1.4) * 0.01
initial_deviation_input = input(title="Initial SO Deviation (%)", minval=0, step=0.01, defval=0.8) * 0.01
volume_scale            = input(title="Safety Order Vol Step (%)", minval=0.00, step=0.01, defval=1.55)
plotlines               = input(title="Enable/Disable visual lines", type=input.bool, defval=true)

// 3Commas Bot settinsg
bot_id      = input(title="3Commas Bot ID", defval="")
email_token = input(title="Bot Email Token", defval="")
bot_pair    = input(title="3Commas Bot Trading Pair", defval="")

// Backtesting Date Ranges
startDate  = input(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", defval=1, minval=1, maxval=12)
startYear  = input(title="Start Year", defval=2016, minval=1800, maxval=2100)
endDate    = input(title="End Date", defval=31, minval=1, maxval=31)
endMonth   = input(title="End Month", defval=12, minval=1, maxval=12)
endYear    = input(title="End Year", defval=2022, minval=1800, maxval=2100)

// VARS
short_sma        = sma(close, sma_short_val-5)
long_sma         = sma(close, sma_long_val)
stdDev           = stdev(close, sma_short_val)
upperBand        = short_sma + (stdDev * ubOffset)
lowerBand        = short_sma - (stdDev * lbOffset)
stoploss_value   = strategy.position_avg_price * (1 - stoploss_input)
takeprofit_value = strategy.position_avg_price * (1 + takeprofit_input)
initial_dev_val  = strategy.position_avg_price * (1 - initial_deviation_input)
inDateRange      = true


initial_deviation = close < initial_dev_val

// Market Conditions
goodBuy    = crossunder(close, lowerBand) // Buy when close crossing under lower band
safety     = initial_deviation and (1-(close/strategy.position_avg_price))/.01 > strategy.opentrades * 1.55 and strategy.opentrades <= 6 // SO when price deviates below SO threshold %
stoploss   = close <= stoploss_value // Stoploss condition - true if closing price for current bar drops below stoploss %
takeprofit = close >= takeprofit_value // Take profit condition - true if closing price for current bar is >= take profit percentage

// goodSell is currently unused for any practical purpose. If you wish to try it, switch these two values. 
// Doing so will make sell suggestions at high crossover upper bollinger but it does not trigger the bot to sell as written but may affect backtest results
//goodSell = crossover(high, upperBand)
goodSell   = false

// Plot some lines
plot(short_sma, color=color.green)
plot(upperBand)
plot(lowerBand, color=color.yellow)
plot(strategy.position_avg_price, color=color.red, linewidth=3)


// Webhook message. Defaults to string. To signal 3c bot, fill in bot_id and email_token in user settings
var enter_msg = "Enter Position"
var exit_msg = "Exit Position"
var close_all = "Exit Position"
if bot_id != "" and email_token != ""
    enter_msg := '{"message_type": "bot",  "bot_id": ' + bot_id + ',  "email_token": "' + email_token + '", "delay_seconds": 0, "pair": "' + bot_pair + '"}'
    exit_msg := '{  "message_type": "bot",  "bot_id": ' + bot_id + ',  "email_token": ' + email_token + ',  "delay_seconds": 0,  "action": "close_at_market_price"}'
    close_all := '{ "message_type": "bot", "bot_id": ' + bot_id + ', "email_token": ' + email_token + ', "delay_seconds": 0, "action": "close_at_market_price_all"}'

// Strategy Actions
if inDateRange and goodBuy
    strategy.entry("Good Buy", strategy.long, when = strategy.opentrades <= 0, alert_message=enter_msg)
if inDateRange and safety
    strategy.order("Good Buy", strategy.long, strategy.position_size*volume_scale, when = strategy.opentrades > 0, comment = "safety order")
if inDateRange and goodSell
    strategy.close_all(comment="Good sell point")
if inDateRange and stoploss
    strategy.close_all(comment="Stoploss")
if inDateRange and takeprofit
    strategy.close_all(comment="TP Target")

```

> Detail

https://www.fmz.com/strategy/426302

> Last Modified

2023-09-10 21:52:06
