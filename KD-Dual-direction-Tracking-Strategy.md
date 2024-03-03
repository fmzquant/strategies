
> Name

KD-Dual-direction-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
KD指标双向追踪策略

该策略通过KD指标判断市场的强弱趋势,并基于强弱态势进行双向追踪交易。具体来说,当K值上穿80时判定为强势市场;当K值下穿20时判定为弱势市场。在强势市场,当K值首次下穿50时做多追涨;在弱势市场,当K值首次上穿50时做空追跌。平仓条件为强势转弱做多平仓,弱势转强做空平仓。

该策略的优点是可以顺势而为,及时追踪市场的各种转折点。但KD本身滞后性较强,无法提前判断转折。同时,该策略存在加仓追涨追跌的高风险。这需要严格的止损控制,否则亏损将快速扩大。

总的来说,KD指标双向追踪策略可以抓住强势行情但风险很大。它需要详尽的回测优化参数,并配合好的止损机制,才能在实盘中稳定运用。

|| 

This strategy uses the KD indicator to determine market strength and weakness, and trades both directions based on the momentum. Specifically, the market is considered strong when K crosses above 80, and weak when K crosses below 20. In a strong market, long positions are added when K first crosses below 50. In a weak market, short positions are added when K first crosses above 50. Exits occur when strong turns weak or vice versa. 

The advantage of this strategy is seizing various turning points in a timely manner. However, KD itself has strong lagging, and cannot preempt turns. Also, the pyramiding carries high risk. Strict stop loss is crucial, otherwise losses could expand rapidly.

In summary, the KD dual-direction tracking strategy can capitalize on strong momentum but with substantial risk. Exhaustive backtesting, parameter optimization, and good stop loss mechanisms are required for stable live application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|庫存上限(share)|
|v_input_2|-10|庫存下限(share)|
|v_input_3|9|KD 週期(KD period)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Tonyder

//@version=4
// strategy("KD base strategy", overlay=true, pyramiding=1000, process_orders_on_close=true, precision=6, max_bars_back=720)


max=input(defval=20, title="庫存上限(share)", type=input.integer)
min=input(defval=-10, title="庫存下限(share)", type=input.integer)
period=input(defval=9, title="KD 週期(KD period)", type=input.integer, minval=2)

k=0.0
rsv=0.0
dir2=0
sum2=0.0
share2=0
first=0
up=0.0
bottom=0.0
k80=0.0
k50=0.0
k20=0.0
k_value=0.0

share=strategy.position_size
rsv:=stoch(close, high, low, period)

up:=highest(high,period)
bottom:=lowest(low,period)

if bar_index <= period
    k:=rsv
    dir2:=0
    sum2:=0
else
    k:=k[1]*2/3 + rsv/3
    dir2 := dir2[1]
    sum2 := sum2[1]

// rsv = 100 * (close - lowest(low, period)) / (highest(high, period) - lowest(low, period))
// k=k[1]*2/3 + rsv/3
// 3k=k[1]*2 + rsv
// 3k-k[1]*2= 100 * (close - lowest(low, period)) / (highest(high, period) - lowest(low, period))
// (3k-k[1]*2)/100*(highest(high, period) - lowest(low, period)) + lowest(low, period) = close
// let k = 80, close = (3*80-k[1]*2)/100*(highest(high, period) - lowest(low, period)) + lowest(low, period)
k80:=(3*80-k[1]*2)/100*(highest(high, period) - lowest(low, period)) + lowest(low, period)
k50:=(3*50-k[1]*2)/100*(highest(high, period) - lowest(low, period)) + lowest(low, period)
k20:=(3*20-k[1]*2)/100*(highest(high, period) - lowest(low, period)) + lowest(low, period)

// rule 1, strong target, buy when k < 50.
if (dir2 == 1 and k[1] >= 50 and k < 50 and sum2 < 1 and sum2 >= 0 and sum2 < 0.66)
    sum2 := sum2 + 0.33
// rule 2, weak target, sell when k > 50.
if (dir2 == -1 and k[1] <= 50 and k > 50 and sum2 > -1 and sum2 <= 0 and sum2 > -0.66) 
    sum2 := sum2 -0.33

// become to strong    
if (k >= 80) 
    dir2 := 1

// become to weak
if (k <= 20) 
    dir2 := -1

// rule 3, strong become to weak, buy when k < 20
if (dir2 == -1 and dir2[1] == 1)
    sum2 := sum2 + 0.33
// rule 4, weak become to strong, buy when k > 80
if (dir2 == 1 and dir2[1] == -1)
    sum2 := sum2 - 0.33

// rule 5, strong but share is smaller than 0    
if (dir2 == 1 and k[1] >= 50 and k < 50 and sum2 <= 0)
    sum2 := 0.33

// rule 6, weak but share is bigger than 0
if (dir2 == -1 and k[1] >= 50 and k < 50 and sum2 >= 0)
    sum2 := -0.33
    
if sum2 > 0
    share2 := round(sum2 * max)
else
    if sum2 < 0
        share2 := round(abs(sum2) * min)

if share2 > share
    strategy.order(id='buy', long=true)
else
    if share2 < share
        strategy.order(id="sell", long=false)

plot(share, "持股(share)")
plot(dir2, "方向(direction)")
plot(k80, "Strong", color.red)
plot(k50, "Middle", color.white)
plot(k20, "Weak", color.green)
plot(k, "k")

```

> Detail

https://www.fmz.com/strategy/426364

> Last Modified

2023-09-11 15:06:36
