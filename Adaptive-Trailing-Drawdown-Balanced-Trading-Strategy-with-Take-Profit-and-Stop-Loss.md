
> Name

Adaptive-Trailing-Drawdown-Balanced-Trading-Strategy-with-Take-Profit-and-Stop-Loss

> Author

ChaoZhang

> Strategy Description

#### Overview
This strategy is an adaptive trading system based on gaps and price movements, achieving stable returns through flexible entry points and dynamic take-profit/stop-loss settings. The strategy employs pyramiding position sizing combined with an OCA order management system for risk control. The system automatically adjusts position direction and closes positions promptly when reversal signals appear.

#### Strategy Principles
The strategy operates through several core mechanisms:
1. Gap trading mechanism: Identifies upward and downward gaps, placing stop orders at gap levels
2. Trend following: Determines trend direction based on the relationship between opening and closing prices
3. Pyramiding: Allows up to 100 orders in the same direction
4. Dynamic TP/SL: Sets take-profit and stop-loss levels dynamically based on average position price
5. OCA order management: Uses OCA order groups to ensure mutual exclusivity of TP and SL orders
6. Intraday trading limits: Controls risk through maximum intraday filled orders setting

#### Strategy Advantages
1. High adaptability: Strategy automatically adjusts trading direction and position size based on market conditions
2. Controlled risk: Multiple risk control mechanisms including stop-loss, OCA orders, and intraday limits
3. High flexibility: Supports pyramiding to capture more profits in trending markets
4. High execution efficiency: Uses stop orders for quick position building at key price levels
5. High systematization: Fully systematic trading decisions reduce emotional interference

#### Strategy Risks
1. Slippage risk: May face significant slippage in fast-moving markets
2. Overtrading risk: Frequent entries and exits may lead to high transaction costs
3. Systematic risk: May suffer larger losses in highly volatile markets
4. Capital management risk: Pyramiding may lead to excessive capital utilization
5. Technical risk: Program interruptions may cause order management issues

#### Strategy Optimization Directions
1. Incorporate volatility indicators: Dynamically adjust TP/SL parameters based on market volatility
2. Optimize pyramiding mechanism: Design more detailed position sizing rules to avoid excessive capital use
3. Enhance risk control: Add more risk control indicators like maximum intraday drawdown limits
4. Improve order execution: Optimize order progression mechanism to reduce slippage impact
5. Add market sentiment analysis: Optimize entry timing by incorporating volume and other indicators

#### Summary
This is a well-designed trading strategy with rigorous logic, ensuring trading stability and safety through multiple mechanisms. The core advantages lie in its adaptability and risk control capabilities, while attention must be paid to risks from market volatility. Through continuous optimization and improvement, the strategy has the potential to maintain stable performance across different market environments.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-04 00:00:00
end: 2024-12-11 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Greedy Strategy - maclaurin", pyramiding = 100, calc_on_order_fills=false, overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)
backtestStartDate = input(timestamp("1 Jan 1990"),
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " +
     "where the chart's instrument trades. It doesn't use the time " +
     "zone of the chart or of your computer.")
backtestEndDate = input(timestamp("1 Jan 2023"),
     title="End Date", group="Backtest Time Period",
     tooltip="This end date is in the time zone of the exchange " +
     "where the chart's instrument trades. It doesn't use the time " +
     "zone of the chart or of your computer.")
inTradeWindow = true
tp = input(10)
sl = input(10)
maxidf = input(title="Max Intraday Filled Orders", defval=5)
// strategy.risk.max_intraday_filled_orders(maxidf)
upGap = open > high[1]
dnGap = open < low[1]
dn = strategy.position_size < 0 and open > close
up = strategy.position_size > 0 and open < close
if inTradeWindow and upGap
    strategy.entry("GapUp", strategy.long, stop = high[1])
else
    strategy.cancel("GapUp")
if inTradeWindow and dn
    strategy.entry("Dn", strategy.short, stop = close)
else
    strategy.cancel("Dn")
if inTradeWindow and dnGap
    strategy.entry("GapDn", strategy.short, stop = low[1])
else
    strategy.cancel("GapDn")
if inTradeWindow and up
    strategy.entry("Up", strategy.long, stop = close)
else
    strategy.cancel("Up")
XQty = strategy.position_size < 0 ? -strategy.position_size : strategy.position_size
dir = strategy.position_size < 0 ? -1 : 1
lmP = strategy.position_avg_price + dir*tp*syminfo.mintick
slP = strategy.position_avg_price - dir*sl*syminfo.mintick
float nav = na
revCond = strategy.position_size > 0 ? dnGap : (strategy.position_size < 0 ? upGap : false)
if inTradeWindow and not revCond and XQty > 0
    strategy.order("TP", strategy.position_size < 0 ? strategy.long : strategy.short, XQty, lmP, nav, "TPSL",  "TPSL")
    strategy.order("SL", strategy.position_size < 0 ? strategy.long : strategy.short, XQty, nav, slP, "TPSL", "TPSL")
if XQty == 0 or revCond
    strategy.cancel("TP")
    strategy.cancel("SL")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/474835

> Last Modified

2024-12-12 14:25:36
