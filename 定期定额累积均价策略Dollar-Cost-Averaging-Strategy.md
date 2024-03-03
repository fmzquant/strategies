
> Name

定期定额累积均价策略Dollar-Cost-Averaging-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
本策略称为定期定额累积均价策略。该策略通过定期定额购买,逐步达到目标仓位,实现资产的长期持有。

策略运作原理:
1. 设置固定的购买金额和购买频率。
2. 在固定周期内,按照设置的金额定期购买资产。
3. 当累计持仓量达到阈值后,平仓套现。
4. 重复上述步骤,继续定期累积仓位。

具体操作流程:
1. 每隔一定周期(如每月),购买固定金额的资产(如200美元)。
2. 当累计持仓量超过设定阈值(如200份)时,全部平仓。
3. 然后重新启动定期购买过程,继续累积持仓。

该策略的优势:
1. 长期持有成本降低,通过均价实现盈利。
2. 回撤风险较小,不会出现针对性追击的高买点。
3. 易于持续执行,不需要频繁关注市场。

该策略的风险:
1. 需要长期持有,无法应对短期价格波动。
2. 当价格长期下跌时,可能面临亏损。
3. 卖出时点选择不当,可能错过最佳出货点位。

总之,定期定额策略通过分批建仓的方式积累资产,对长线投资者较为友好。但交易者仍需注意大行情的风险,并优化销售策略,在行情高点通过分批平仓实现利润最大化。

|| 

This strategy is called the Dollar Cost Averaging Strategy. It aims to accumulate a target position size through periodic fixed-amount purchases, enabling long-term holdings.

How it works:
1. Set a fixed purchase amount and frequency.  
2. Make periodic purchases of the asset at fixed intervals according to set amount.
3. Sell when accumulated position size reaches a threshold.
4. Repeat to continue accumulating positions periodically.

Typical workflow:
1. Buy a fixed amount of assets periodically (e.g. $200 every month).
2. Sell all when accumulated position size exceeds a threshold (e.g. 200 shares).
3. Restart periodic buying to continue accumulating positions.

Advantages of this strategy:
1. Lower averaged cost through long-term holdings.
2. Lower drawdown risks, avoids buying at high points.  
3. Easy to execute consistently without frequent market monitoring.

Risks of this strategy:  
1. Requires long holding periods, cannot adapt to short-term price swings.
2. May face losses during prolonged downtrends.
3. Suboptimal exit timing may miss best selling point.

In summary, the dollar cost averaging strategy accumulates assets through batched buys, friendly to long-term investors. But traders still need to watch out for broad market risks and optimize exit strategies to maximize profits through batched sells at highs.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-08 00:00:00
end: 2023-09-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tanoshimooo

//@version=5
strategy ("DCA", initial_capital=44700, overlay=true)

// To start script at a given date
tz = 0 //timezone
timeadj = time + tz * 60 * 60 * 1000 //adjust the time (unix)
t1 = timeadj >= timestamp(2003, 03, 01, 0, 0) ? 1 : 0 //get the starting time

// Variables
var float lastRef = na
if barstate.isfirst
    lastRef := close
var float cash = 50000 // available money
var float sell_contracts = na
var bool first_trade_done = false

// Parameters
var float sell_min = 200 //200 sell more than sell_min or sell all
var float buy_dollars = 200

var int bi = 90

// LONGS
// if bar_index < bi
strategy.order("Long", strategy.long, int(buy_dollars/close))
cash := cash - int(buy_dollars/close)*close
// label.new(bar_index, na, na, xloc.bar_index, yloc.abovebar, color.blue, label.style_triangleup, color.blue, size.tiny)

//plot(cash)

// SHORTS
// if longExit  
//     if (strategy.position_size*sf*close > sell_min) and (strategy.position_size*sf >= 1)
//         strategy.order ("Long", strategy.short, strategy.position_size*sf)
//         cash := cash + strategy.position_size*sf*close
//     else 
//         strategy.order ("Long", strategy.short, strategy.position_size)
//         cash := cash + strategy.position_size*close
//     lastRef := close
//     label.new(bar_index, na, na, xloc.bar_index, yloc.belowbar, color.red, label.style_triangledown, color.red, size.tiny)

if bar_index == last_bar_index - 2 // bi
    strategy.order ("Long", strategy.short, strategy.position_size)
```

> Detail

https://www.fmz.com/strategy/426936

> Last Modified

2023-09-15 16:52:06
