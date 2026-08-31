
> Name

休眠范围反转策略Dormant-Range-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cf919468e92a0dfb16.png)



## Overview

The dormant range reversal strategy utilizes periods of decreasing volatility as entry signals and aims to profit when volatility picks up again. It identifies situations where price is contained within a narrow dormant range and captures the upcoming price trend. This strategy works well when current volatility is low but a breakout is expected.

## Strategy Logic

The strategy first identifies a dormant range, which is when price is contained within the price range of the previous trading day. This indicates volatility has decreased compared to a few days ago. We check if current day high < high of n days ago (typically 4 days) and current day low > low of n days ago to qualify as a dormant range.

Once a dormant range is identified, the strategy places two pending orders - a buy stop near the top of the range and a sell stop near the bottom of the range. It then waits for price to breakout of the range either upwards or downwards. If price breaks upwards, the buy order is triggered to go long. If price breaks downwards, the sell order is triggered to go short. 

After entry, stop loss and take profit orders are placed. The stop loss controls downside risk and the take profit closes the trade for profit. The stop loss is placed at a % distance from entry price as defined in risk parameters. The take profit is placed at a distance equal to the dormant range size since we expect price to move similar to previous volatility.

Finally, a fixed fractional position sizing model manages trade size. It increases size for profits and reduces size for losses to improve risk-adjusted returns.

## Advantages

The advantages of this strategy are:

1. Captures upcoming trend by using decreased volatility as signal.

2. Dual-directional orders catch uptrend or downtrend. 

3. Stop loss and take profit controls single trade risk.

4. Fixed fractional sizing improves capital efficiency.

5. Simple logic easy to implement.

## Risks

The risks to consider are:

1. Wrong breakout direction if range breakout is unclear.

2. Breakout may just be short reversal, not lasting trend.

3. Stop loss risk of being taken out by huge moves.

4. Fixed fraction sizing may amplify losses when adding to losing trades.

5. Poor performance if parameters not properly set.

## Enhancement Opportunities

Some ways to enhance the strategy:

1. Add filters like divergence to avoid false breakouts.

2. Improve stop loss with trailing or order stop losses. 

3. Add trend filter to avoid counter-trend entries.

4. Optimize fixed fraction ratios for balanced risk/reward.

5. Look at multiple timeframes to improve edge.

6. Utilize machine learning for automated parameter optimization.

## Conclusion

The dormant range reversal strategy has a clear logic and profit potential. Fine-tuning via optimizations, risk management and signal filtering can further improve consistency. But all mean reversion strategies carry inherent risks and position sizing needs to be controlled. It suits traders familiar with reversal tactics and possessing sound risk awareness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|4|(?Strategy parameters)Narrow Range Length|
|v_input_float_1|0.5|Stop Loss (in percentage of reference range)|
|v_input_int_2|400|(?Money Management)Fixed Ratio Value ($)|
|v_input_int_3|200|Increasing Order Amount ($)|
|v_input_1|timestamp(1 Janv 2020 00:00:00)|(?Backtesting Period)Start Date|
|v_input_2|timestamp(1 July 2024 00:00:00)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gsanson66


//This code is based on the Narrow Range strategy
//Interactive Broker fees are applied on this strategy
//@version=5
strategy("NARROW RANGE BACKTESTING", shorttitle="NR BACKTESTING", overlay=true, initial_capital=1000, default_qty_type=strategy.fixed, commission_type=strategy.commission.percent, commission_value=0.18)


//--------------------------------FUNCTIONS------------------------------------//

//@function to print label
debugLabel(txt, color) =>
    label.new(bar_index, high, text = txt, color=color, style = label.style_label_lower_right, textcolor = color.black, size = size.small)

//@function which looks if the close date of the current bar falls inside the date range
inBacktestPeriod(start, end) => (time >= start) and (time <= end)


//--------------------------------USER INPUTS------------------------------------//

//Narrow Range Length 
nrLength = input.int(4, minval=2, title="Narrow Range Length", group="Strategy parameters")
//Risk Management
stopLossInput = input.float(0.5, title="Stop Loss (in percentage of reference range)", group="Strategy parameters")
//Money Management
fixedRatio = input.int(defval=400, minval=1, title="Fixed Ratio Value ($)", group="Money Management")
increasingOrderAmount = input.int(defval=200, minval=1, title="Increasing Order Amount ($)", group="Money Management")
//Backtesting period
startDate = input(title="Start Date", defval=timestamp("1 Janv 2020 00:00:00"), group="Backtesting Period")
endDate = input(title="End Date", defval=timestamp("1 July 2024 00:00:00"), group="Backtesting Period")


//--------------------------------VARIABLES INITIALISATION--------------------------//
strategy.initial_capital = 50000
bool nr = na
var bool long = na
var bool short = na
var float stopPriceLong = na
var float stopLossLong = na
var float takeProfitLong = na
var float stopPriceShort = na
var float stopLossShort = na
var float takeProfitShort = na
var float takeProfit = na
var float stopLoss = na
bool inRange = na
int closedtrades = strategy.closedtrades
equity = math.abs(strategy.equity - strategy.openprofit)
var float capital_ref = strategy.initial_capital
var float cashOrder = strategy.initial_capital * 0.95


//------------------------------CHECKING SOME CONDITIONS ON EACH SCRIPT EXECUTION-------------------------------//

//Checking if the date belong to the range
inRange := true

//Checking performances of the strategy
if equity > capital_ref + fixedRatio
    spread = (equity - capital_ref)/fixedRatio
    nb_level = int(spread)
    increasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder + increasingOrder
    capital_ref := capital_ref + nb_level*fixedRatio
if equity < capital_ref - fixedRatio
    spread = (capital_ref - equity)/fixedRatio
    nb_level = int(spread)
    decreasingOrder = nb_level * increasingOrderAmount
    cashOrder := cashOrder - decreasingOrder
    capital_ref := capital_ref - nb_level*fixedRatio

//We check if a trade has been closed to cancel all previous orders
if closedtrades > closedtrades[1]
    strategy.cancel("Long")
    strategy.cancel("Short")
    stopPriceLong := na
    stopPriceShort := na

//Checking if we close all trades in case where we exit the backtesting period
if strategy.position_size!=0 and not inRange
    debugLabel("END OF BACKTESTING PERIOD : we close the trade", color=color.rgb(116, 116, 116))
    strategy.close_all()
    long := na
    short := na
    stopPriceLong := na
    stopLossLong := na
    takeProfitLong := na
    stopPriceShort := na
    stopLossShort := na
    takeProfitShort := na
    takeProfit := na
    stopLoss := na

//----------------------------------FINDING NARROW RANGE DAY------------------------------------------//

// We find the Narrow Range Day
if low > low[nrLength] and high < high[nrLength]
    nr := true 


//------------------------------------STOP ORDERS--------------------------------------------//

// We handle plotting of stop orders and cancellation of other side order if one order is triggered
if strategy.position_size > 0 and not na(stopPriceLong) and not na(stopPriceShort)
    long := true
    strategy.cancel("Short")
    stopPriceLong := na
    stopPriceShort := na
    takeProfit := takeProfitLong
    stopLoss := stopLossLong
if strategy.position_size < 0 and not na(stopPriceLong) and not na(stopPriceShort)
    short := true
    strategy.cancel("Long") 
    stopPriceLong := na
    stopPriceShort := na
    takeProfit := takeProfitShort
    stopLoss := stopLossShort


//------------------------------------STOP LOSS & TAKE PROFIT--------------------------------//

// If an order is triggered we plot TP and SL
if not na(takeProfit) and not na(stopLoss) and long
    if high >= takeProfit and closedtrades == closedtrades[1] + 1
        takeProfit := na
        stopLoss := na
        long := na
    if low <= stopLoss and closedtrades == closedtrades[1] + 1
        takeProfit := na
        stopLoss := na
        long := na
if not na(takeProfit) and not na(stopLoss) and short
    if high >= stopLoss and closedtrades == closedtrades[1] + 1
        takeProfit := na
        stopLoss := na
        short := na
    if low <= takeProfit and closedtrades == closedtrades[1] + 1
        takeProfit := na
        stopLoss := na
        short := na


//-----------------------------LONG/SHORT CONDITION-------------------------//

// Conditions to create two stop orders (one for Long and one for Short) and SL & TP calculation
if nr and inRange and strategy.position_size == 0
    stopPriceLong := high[4]
    takeProfitLong := high[4] + (high[4] - low[4])
    stopLossLong := high[4] - (high[4] - low[4])*stopLossInput
    qtyLong = cashOrder/stopPriceLong
    strategy.entry("Long", strategy.long, qtyLong, stop=stopPriceLong)
    strategy.exit("Exit Long", "Long", limit=takeProfitLong ,stop=stopLossLong)
    stopPriceShort := low[4]
    takeProfitShort := low[4] - (high[4] - low[4])
    stopLossShort := low[4] + (high[4] - low[4])*stopLossInput
    qtyShort = cashOrder/stopPriceShort
    strategy.entry("Short", strategy.short, qtyShort, stop=stopPriceShort)
    strategy.exit("Exit Short", "Short", limit=takeProfitShort ,stop=stopLossShort)


//--------------------------PLOTTING ELEMENT----------------------------//

plotshape(nr, "NR", shape.arrowdown, location.abovebar, color.rgb(255, 132, 0), text= "NR4", size=size.huge)
plot(stopPriceLong, "Stop Order", color.blue, 3, plot.style_linebr)
plot(stopPriceShort, "Stop Order", color.blue, 3, plot.style_linebr)
plot(takeProfit, "Take Profit", color.green, 3, plot.style_linebr)
plot(stopLoss, "Stop Loss", color.red, 3, plot.style_linebr)
```

> Detail

https://www.fmz.com/strategy/430548

> Last Modified

2023-10-30 10:54:00
