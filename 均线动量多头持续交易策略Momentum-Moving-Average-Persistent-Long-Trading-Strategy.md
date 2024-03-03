
> Name

均线动量多头持续交易策略Momentum-Moving-Average-Persistent-Long-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过观察均线动量的持续情况,在连续上涨阶段做多,实现持续追涨操作。该策略属于趋势跟踪类策略,旨在持续捕捉多头行情的升势动能。

策略原理: 

1. 计算加权移动平均线,以反映价格动量。

2. 当加权移动平均线连续5日上涨时,进行做多入场。

3. 当加权移动平均线连续4日下跌时,进行多单离场。

4. 通过持续上涨天数判断持久趋势,避免被短期调整反转。

5. 设定最大止损,控制单日最大损失。

该策略的优势:

1. 跟踪持续上涨动能,可持久捕捉行情热点。

2. 连续天数判断,有利于跳过短期调整震荡。 

3. 最大止损设置可限制尾部风险。

该策略的风险:

1. 无法限制持续上涨后出现的回调损失。

2. 若出现深度调整,可能带来较大亏损。

3. 停损设定过于宽松,亦存在损失过大的风险。

总之,该策略在判断到持续上涨后进行追涨,可有效捕捉行情热点。但需警惕深度回调的风险,适当调整止损参数,并做好充分的风险管理。

||

This strategy trades long during sustained momentum by observing persistent moving average uptrends, aiming to continuously ride the momentum of bull runs. It is a trend-following strategy focused on capturing upside momentum.

Strategy Logic:

1. Calculate weighted moving average to reflect price momentum. 

2. Enter long when weighted moving average rises persistently for 5 days.

3. Exit long when weighted moving average falls for 4 consecutive days.

4. Persistent uptrend days filter out short-term reversals. 

5. Set maximum stop loss to limit maximum daily loss.

Advantages:

1. Tracking upside momentum allows holding hot trends.

2. Persistence filter skips short consolidations.

3. Maximum stop loss defends tail risks.

Risks:

1. No limit on pullback losses after persistent uptrends.

2. Deep corrections can bring large losses.

3. Overly wide stops bring risk of outsized losses.

In summary, this strategy persists in trading the momentum after identifying sustained uptrends, benefiting from hot trends. But deep pullback risks remain, requiring calibrated stops and prudent risk management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|risk|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-11 00:00:00
period: 3d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
// strategy("My Script", initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent , commission_value=0.1 )


var candela = 0.0


candela := (high+low+open+close)/4

long = candela > candela[1] and candela[1] > candela[2] and candela[2] > candela[3] and candela[3] > candela[4] and candela[4] > candela[5]
short = candela< candela[1] and candela[1] < candela[2] and candela[2] < candela[3] and candela[3] < candela[4] //and candela[4] < candela[5] 

plot(candela, color=long? color.green : short? color.red : color.white ,linewidth=4)



strategy.entry("long",1,when=long)
//strategy.entry('short',0,when=short)
    
strategy.close("long", when = short)

risk= input(25)
// strategy.risk.max_intraday_loss(risk, strategy.percent_of_equity)
//strategy.close("short", when = not long or short)

```

> Detail

https://www.fmz.com/strategy/426502

> Last Modified

2023-09-12 16:15:44
