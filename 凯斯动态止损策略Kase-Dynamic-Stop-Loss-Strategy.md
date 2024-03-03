
> Name

凯斯动态止损策略Kase-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略基于凯斯(Kase)先生的动态止损理论而设计。该策略通过计算价格的动态波动范围,寻找最佳的止损和止盈价格点,实现盈亏平衡。

策略原理:

1. 计算价格的动态波动范围指数RWH和RWL。

2. 根据RWH和RWL得到价格偏离程度指数Pk。

3. 当Pk>0时,根据偏离程度计算止损价位。当Pk<0时,计算止盈价位。

4. 可选择止损止盈的偏离倍数,一般为标准差的1-3倍。

5. 当价格触碰止损止盈价位时,进行反向操作。

该策略的优势:

1. 动态计算止损止盈点,可根据市场波动进行调整。

2. 停损点不会过于接近或过于宽松。

3. 数学计算方式可避免主观情绪影响判断。

该策略的风险:

1. 计算止损价位存在滞后,可能错过最佳止损时点。

2. 需优化偏离倍数参数,以平衡止损止盈。

3. 无法限制单笔亏损大小,存在大单损失风险。

总之,该策略可在一定程度上智能优化止损止盈设置,但其效果仍需经过回测验证,且不能完全规避SUBJECTIVE 主观风险,投资者仍需谨慎。

||

This strategy is based on Mr. Kase's dynamic stop loss approach, computing price's dynamic range to find optimal stop loss and take profit levels for balancing profits and losses. 

Strategy Logic:

1. Calculate price's dynamic range indices RWH and RWL.

2. Derive deviation level index Pk from RWH and RWL. 

3. When Pk>0, compute stop loss based on deviation level. When Pk<0, compute take profit.

4. Deviation multiples generally range from 1-3 standard deviations.

5. Take opposing position when price hits stop loss/profit.

Advantages:

1. Dynamic stops/profits adapt to changing volatility.

2. Stops are neither too tight nor too loose.

3. Mathematical approach avoids emotional and subjective judgments.

Risks:

1. Stop calculations lag, potentially missing best stop timing.

2. Parameter tuning needed to balance stops and targets.

3. No limit on loss size, risks large losing trades.

In summary, this approach can intelligently optimize stops and targets to some extent but still requires robust backtesting. It also cannot fully eliminate subjective risks so prudent trading remains essential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Length|
|v_input_2|0|Trade From Level: 4|2|3|1|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 09/10/2019
//  The Kase Dev Stops system finds the optimal statistical balance between letting profits run, 
//  while cutting losses.  Kase DevStop seeks an ideal stop level by accounting for volatility (risk),
//  the variance in volatility (the change in volatility from bar to bar), and volatility skew 
//  (the propensity for volatility to occasionally spike incorrectly).
//
//  Kase Dev Stops are set at points at which there is an increasing probability of reversal against 
//  the trend being statistically significant based on the log normal shape of the range curve.  
//  Setting stops will help you take as much risk as necessary to stay in a good position, but not more.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Kase Dev Stops Backtest", overlay = true)
Length = input(30, minval=2, maxval = 100)
Level = input(title="Trade From Level", defval=4, options=[1, 2, 3, 4])
reverse = input(false, title="Trade reverse")
RWH = (high - low[Length]) / (atr(Length) * sqrt(Length))
RWL = (high[Length] - low) / (atr(Length) * sqrt(Length))
Pk = wma((RWH-RWL),3)
AVTR = sma(highest(high,2) - lowest(low,2), 20)
SD = stdev(highest(high,2) - lowest(low,2),20)
Val4 = iff(Pk>0, highest(high-AVTR-3*SD,20), lowest(low+AVTR+3*SD,20))
Val3 = iff(Pk>0, highest(high-AVTR-2*SD,20), lowest(low+AVTR+2*SD,20))
Val2 = iff(Pk>0, highest(high-AVTR-SD,20), lowest(low+AVTR+SD,20))
Val1 = iff(Pk>0, highest(high-AVTR,20), lowest(low+AVTR,20))
ResPrice = iff(Level == 4, Val4,
             iff(Level == 3, Val3,
               iff(Level == 2, Val2,
                 iff(Level == 1, Val1, Val4))))
pos = iff(close < ResPrice , -1, 1)
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/426571

> Last Modified

2023-09-13 14:08:47
