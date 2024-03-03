
> Name

三重高点价量突破交易策略Triple-High-Price-Volume-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过判断价格和成交量在尾盘时段是否形成三重更高高点,来预测次日是否存在缺口突破机会。属于典型的高频交易策略。

策略原理:

1. 计算价格的连续3根K线高点关系,判断是否出现三重更高高点。 

2. 计算成交量的连续3根K线关系,判断成交量是否扩大。

3. 判断收盘价是否全部收阳线,表现强势特征。

4. 在尾盘关键时间段,如果符合 Above 条件,则预测次日可能出现缺口突破行情。

5. 进行高杠杆Operations,追求在缺口后开盘阶段套现止盈。

该策略的优势:

1. 三重高点价量判决可提高预测的准确性。

2. 关键时段操作,可放大获利空间。

3. 止盈时间固定,免除决策困难。

该策略的风险:

1. 预测仅基于简单K线形态,容易被反转套牢。

2. 高杠杆操作风险极大,资金管理尤为关键。 

3. 无法限制亏损大小,存在极大回撤的可能。

总之,该策略试图通过尾盘形态预测次日行情,在明确回撤风险的前提下,可获得一定概率的高杠杆获利机会。但投资者仍需非常谨慎。

||

This strategy judges if price and volume make triple higher highs near market close to predict next day gap opportunities. It aims to capitalize on short-term patterns.

Strategy Logic:

1. Check if latest 3 bars make triple higher highs in price.

2. Check if latest 3 bars show increasing volume. 

3. Check if latest 3 bars all closed higher than open. 

4. If above conditions met near market close, predict possible gap next day.

5. Take highly leveraged positions to profit from gap open.

Advantages:

1. Triple high price/volume improves accuracy. 

2. Trading in critical periods maximizes profit potential.

3. Fixed profit-taking avoids decision difficulties.

Risks:

1. Prediction relies simply on candle patterns, prone to reversals and traps.

2. Extremely high leverage entails huge risk, requiring prudent management. 

3. Unable to limit loss size, potentially large drawdowns.

In summary, this strategy attempts to predict next day moves based on end-of-day patterns, providing high probability leveraged profit opportunities balanced with clear loss risks. But extreme caution remains essential.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SharemarketRaja

//@version=4

//Scanner available 

strategy("3 Higher High Price & Vol", overlay=true)

volma = sma(volume, 20)

PriceHH = high > high[1] and high[1] > high[2] 
VolHH = volume > volume[1] and volume[1] > volume[2]
Volma =  volume > volma and volume[1] > volma[1] and volume[2] > volma[2]
Allgreen = close > open and close[1] > open[1] and close[2] > open[2]

PriceLL = low < low[1] and low[1] < low[2]
Allred = close < open and close[1] < open[1] and close[2] < open[2]

Qty = 100
Buy = (PriceHH == true and VolHH == true and Volma == true and Allgreen == true) and time("15", "1515-1530")
Reversal = (PriceLL == true and VolHH == true and Volma == true and Allred == true) and time("15", "1515-1530")


plotshape(Buy, style=shape.arrowup, size=size.large, color=color.green, location=location.belowbar)
plotshape(Reversal, style=shape.arrowup, size=size.large, color=color.red, location=location.belowbar)

strategy.entry(id="L", long=true, when=Buy)
strategy.entry(id="R", long=true, when=Reversal)
// strategy.exit(id="LE", from_entry="L", profit=Profit, loss=Loss)

// strategy.close_all(when=(time("15", "1500-1515")) )
```

> Detail

https://www.fmz.com/strategy/426572

> Last Modified

2023-09-13 14:17:22
