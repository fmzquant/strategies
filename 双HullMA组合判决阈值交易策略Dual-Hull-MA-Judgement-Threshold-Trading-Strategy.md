
> Name

双HullMA组合判决阈值交易策略Dual-Hull-MA-Judgement-Threshold-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过组合使用双Hull移动平均线和日K线比较,设定多空条件判决阈值进行交易。还设置了止损止盈价格进行风险管理。

策略原理:

1. 计算双Hull移动平均线,并比较当前值与前一周期大小关系。

2. 计算日K线收盘价变化率,设定多空判决阈值。

3. 当快线上穿慢线,且日变化率超过阈值时做多。当快线下穿慢线,且日变化率低于阈值时做空。

4. 设置固定止损止盈价格。价格触及止损止盈时主动平仓。

5. 还可设置最大开仓数量。

该策略的优势:

1. 双HullMA可提高判断准确性。日K线变化率确认龙头方向。

2. 阈值设置避免被反向小幅价格影响。

3. 止损止盈有助锁定利润,控制风险。

该策略的风险:

1. 过高过低的阈值设置会错过交易机会。需谨慎测试。

2. 固定止损止盈价格无法灵活调整,存在不合理设置风险。

3. HullMA及日变化率均存在滞后问题。

总之,该策略通过双指标判决和风险管理措施进行交易,可在一定程度上提高稳定性。但仍需关注参数优化问题,寻找最佳配置。

||

This strategy trades based on a combination of dual Hull Moving Averages and daily candle comparison, with judgement thresholds for long/short conditions. It also uses fixed stop loss/take profit for risk management. 

Strategy Logic:

1. Calculate dual Hull MAs and compare current value versus previous period.

2. Compute daily close change rate, and set long/short judgement thresholds.

3. Go long when fast MA crosses above slow MA, and daily change exceeds threshold. Vice versa for short.

4. Use fixed stop loss and take profit prices. Close positions when hit. 

5. Can also set maximum open position limit.

Advantages:

1. Dual HullMA improves accuracy. Daily change confirms bias.

2. Thresholds avoid being swayed by small counter-trend moves.

3. SL/TP helps lock in profits and control risks.

Risks:

1. Bad threshold settings can miss opportunities. Prudent testing needed.

2. Fixed SL/TP Unable to flexibly adjust, risks improper settings.

3. Both Hull MA and daily change lag. 

In summary, this dual-indicator judgement system with risk controls can improve stability to some extent. But optimization is still required to find the ideal configurations.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Double HullMA|
|v_input_2|0.001|Decision Threshold|
|v_input_3|-50000|Stop Loss in $|
|v_input_4|100000|Target Point in $|
|v_input_5_ohlc4|0|p: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-02-21 00:00:00
period: 5d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//                                                        Hull_MA_cross & Daily_Candle_cross combination with TP$ & SL$ setting
//                                                              (new script reducing effect of repaint on results)
//
strategy("Decision Threshold", shorttitle="DT", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=720, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
keh=input(title="Double HullMA",defval=14, minval=1)
dt = input(defval=0.0010, title="Decision Threshold",  step=0.0001)
SL = input(defval=-50000.00, title="Stop Loss in $",  step=1)
TP = input(defval=100000.00, title="Target Point in $", step=1)
p=input(ohlc4)
ot=1
n2ma=2*wma(p,round(keh/2))
nma=wma(p,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(p[1],round(keh/2))
nma1=wma(p[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
b=n1>n2?lime:red
c=n1>n2?green:red
d=n1>n2?red:green
a1=plot(n1,color=c)
a2=plot(n2,color=c)
plot(cross(n1, n2) ? n1 : na, style = circles, color=b, linewidth = 4)
plot(cross(n1, n2) ? n1 : na, style = line, color=d, linewidth = 4)
confidence=(security(syminfo.tickerid, 'D', p)-security(syminfo.tickerid, 'D', p[1]))/security(syminfo.tickerid, 'D', p[1])
closelong = n1<n2 and p<n2 and confidence<dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closelong)
    strategy.close("Long")
closeshort = n1>n2 and p>n2 and confidence>dt or strategy.openprofit<SL or strategy.openprofit>TP
if (closeshort)
    strategy.close("Short")
longCondition = n1>n2 and strategy.opentrades<ot and confidence>dt and p>n2
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = n1<n2 and strategy.opentrades<ot and confidence<dt and p<n2 
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/426568

> Last Modified

2023-09-13 13:48:30
