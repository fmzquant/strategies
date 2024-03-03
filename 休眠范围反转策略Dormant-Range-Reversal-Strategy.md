
> Name

休眠范围反转策略Dormant-Range-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cf919468e92a0dfb16.png)

[trans]

## 概述

休眠范围反转策略利用价格波动率降低的时期作为建仓信号,并在价格波动率重新上升时获利平仓。它通过识别价格被限制在窄幅震荡的休眠范围内的情况,来捕捉即将爆发的价格趋势。这种策略通常在目前波动率处于较低水平,但未来有爆发可能时适用。

## 策略原理

该策略首先识别出休眠范围,也就是价格被限制在前一个交易日价格范围之内的情况。这表示出目前的波动率较之前几日有所下降。我们通过将当前交易日的最高价与n日前(通常为4日)的最高价进行比较,以及将当前交易日的最低价与n日前的最低价进行比较来判断是否符合休眠范围的条件。 

一旦确认了休眠范围,该策略会同时开两个挂单:一个买入挂单放在范围高点附近,一个卖出挂单放在范围低点附近。随后等待价格突破休眠范围继续向上运行或下跌。如果价格向上突破,买入单会被触发建立多头仓位;如果向下突破,卖出单会被触发建立空头仓位。

建立仓位后,策略会设置止损单和止盈单。止损单可限制下行风险,止盈单用于在获利后平仓。止损单距离入场价一个比例距离,这个比例由风险管理参数设定;止盈单距离入场价为休眠范围大小,因为我们预期价格移动的幅度会与此前波动率相当。

最后,该策略还包含资金管理模块。通过固定倍率法调整订单交易资金量,在盈利时增加资金利用率,在亏损时降低风险。

## 优势分析

这种策略具有以下几点优势:

1. 利用波动率降低的时机作为建仓信号,可在价格趋势发生前捕捉机会。

2. 同时设置多空双向交易订单,可捕捉上涨或下跌趋势。

3. 采用止损止盈策略,可有效控制单次交易风险。

4. 应用固定倍率资金管理法,可提高资金使用效率。

5. 策略逻辑简单清晰易于实施。

## 风险分析

该策略也存在一些风险需要注意:

1. 休眠范围破裂方向判断错误风险。价格可能上下突破都不明显,导致入场方向错误。

2. 突破后无法继续方向性运行的风险。突破仅仅是短期的反转现象。

3. 止损被击穿的风险。特大行情可能直接突破止损线。

4. 固定倍率法加仓亏损扩大的风险。可降低固定倍率值以减小风险。

5. 参数设定不当可能导致策略效果不佳。

## 优化方向

该策略还可从以下几个方面进行优化:

1. 增加突破背离等过滤信号,避免错误突破。

2. 改进止损策略,例如移动止损、挂单止损等。

3. 增加趋势判断指标,避免反转入场。

4. 优化固定倍率值,平衡盈亏比例。

5. 结合多个时间周期分析,提高获利概率。

6. 利用机器学习方法自动优化参数。

## 总结

休眠范围反转策略整体思路清晰,具有一定的获利潜力。通过参数优化、风险管理、信号过滤等手段可进一步提升策略稳定性。但任何趋势反转策略都存在一定的风险,需谨慎使用且适当调整仓位规模。该策略适合熟悉反转操作、有风险意识的交易者使用。

||


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

[/trans]

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
