
> Name

多MACD与RSI策略Multiple-MACD-and-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

多MACD与RSI策略综合利用MACD指标和RSI指标的信号,在缓慢线与快速线均正叉且RSI未进入超买区时做多,在缓慢线与快速线均死叉且RSI进入超卖区时做空,以捕捉价格的中长线趋势。

## 原理

该策略利用两个MACD指标提供信号,一个MACD指标的参数为快速线长度10,慢速线长度22,MACD线长度9;另一个MACD指标的参数为快速线长度21,慢速线长度45,MACD线长度20。当两个MACD的快速线都上穿慢速线时产生买入信号,当两个MACD的快速线都下穿慢速线时产生卖出信号。

同时结合RSI指标判断是否进入超买超卖区域,RSI参数设置为14,超买线设置为70,超卖区域设置为20。当RSI低于超买线时可以买入,当RSI高于超卖区域时可以卖出。

只有当两个MACD指标同时产生买入信号且RSI未超买时,才发出买入;只有当两个MACD指标同时产生卖出信号且RSI进入超卖区时,才发出卖出。

## 优势

多MACD与RSI策略最大的优势是能够利用双重MACD指标过滤掉部分假信号,在两个MACD指标都发出信号时才入场,可以减少不必要的交易,降低交易频率,提高盈利概率。

另外,结合RSI指标判断超买超卖情况,可以避免在价格已经走势过于强势时仍然做多做空,减小亏损风险。

综合双重MACD滤波与RSI判断,使策略只在趋势行情中交易,可以获得较好的中间趋势获利。

## 风险

多MACD与RSI策略也存在一定风险。双重MACD滤波可能会错过价格开始反转的时机,导致亏损扩大。当两条MACD都正叉且RSI尚未超买时做多,很可能已经错过价格底部而导致亏损。

另外,MACD指标本身对交易市场的特点非常敏感。在不同交易周期及市场环境下,需要调整MACD的参数才能发挥其效用。如果参数设置不当,容易产生错误信号而造成损失。

此外,RSI指标可能产生多次超买超卖信号,在等待RSI完全反转前过早入场也会增加损失。

## 优化

该策略可以考虑优化以下几点:

1. 优化MACD参数,改变快速线与慢速线的参数,找到不同交易品种及周期下MACD最佳参数组合,提高信号有效性。

2. 调整RSI参数,适当缩短或放宽RSI超买超卖区间,优化入场时机。

3. 增加止损策略,在亏损达到一定比例时止损退出,避免博弈亏损进一步扩大。

4. 考虑加入突破点位等辅助判断,进一步确认趋势确立后再入场。


## 总结

多MACD与RSI策略综合运用双重MACD指标和RSI指标,提高信号的有效性,在中长线趋势行情中可以获得较好的收益。但该策略也存在一定风险,需要进一步测试优化MACD参数与RSI参数,并增加辅助策略控制风险,才能将策略运用到实际交易当中。

|| 

## Overview

The Multiple MACD and RSI strategy comprehensively utilizes the signals of the MACD indicator and the RSI indicator. It goes long when both fast and slow lines of the two MACD cross up and RSI is below overbought level, and goes short when both fast and slow lines of the two MACD cross down and RSI enters oversold level, aiming to capture mid-long term trends.

## Principle 

This strategy employs two MACD indicators to generate signals. One MACD has parameters of fast length 10, slow length 22 and MACD length 9. The other MACD has parameters of fast length 21, slow length 45 and MACD length 20. It generates a buy signal when fast lines of both MACDs cross above their slow lines, and a sell signal when fast lines of both MACDs cross below their slow lines. 

In the meantime, it incorporates the RSI indicator to judge overbought and oversold conditions. The RSI parameter is set to 14, with overbought level at 70 and oversold level at 20. It can buy when RSI is below overbought level and sell when RSI is above oversold level.

Only when both MACDs generate a buy signal and RSI is not overbought, a long entry will be triggered. Only when both MACDs generate a sell signal and RSI enters oversold zone, a short entry will be triggered.

## Advantages

The biggest advantage of this strategy is that it utilizes dual MACD indicators to filter out some false signals and only enters when both MACDs give out signals. This reduces unnecessary trades and trading frequency while improving profitability rate.

Also, incorporating RSI to judge overbought/oversold conditions avoids going long/short when the price is already trending strongly, thus reducing loss risks.

Combining dual MACD filtering and RSI judgment, this strategy only trades in trending markets and can gain decent profits from mid-term trends.

## Risks

This strategy also possesses some risks. The dual MACD filtering may miss the timing of price reversal and lead to enlarged losses. Going long when both MACDs are positive crossing and RSI is not overbought yet may have already missed the bottom and lead to losses.

Moreover, MACD itself is very sensitive to the characteristics of the trading markets. MACD parameters need to be adjusted for different trading cycles and market environments to take effect. If the parameters are not set properly, it is prone to generating false signals and causing losses.

In addition, RSI may produce multiple overbought/oversold signals. Prematurely entering before RSI fully reverses can add to the losses.

## Optimization

Some aspects can be considered to optimize this strategy:

1. Optimize MACD parameters, adjust fast/slow line lengths to find optimal MACD parameter combinations for different products and timeframes, improving signal efficiency. 

2. Fine tune RSI parameters, moderately shorten or widen overbought/oversold levels to optimize entry timing.

3. Add stop loss strategies to cut losses when drawdown reaches a certain level, avoiding further losses.

4. Consider adding auxiliary judgements like breakout points to further confirm the trend before entering.

## Conclusion

The Multiple MACD and RSI strategy combines dual MACD indicators and RSI indicator to improve signal validity, and can gain decent profits from mid-long term trending moves. But it also bears some risks. MACD and RSI parameters need further testing and optimizing, and risk control mechanisms need to be added, before the strategy can be applied to actual trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|fastLength|
|v_input_2|22|slowlength|
|v_input_3|9|MACDLength|
|v_input_4|21|fastLength2|
|v_input_5|45|slowlength2|
|v_input_6|20|MACDLength2|
|v_input_7|14|Length|
|v_input_8|20|Oversold|
|v_input_9|70|Overbought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-07 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACDbl RSI", overlay=true)

fastLength = input(10)
slowlength = input(22)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = sma(MACD, MACDLength)
delta = MACD - aMACD

fastLength2 = input(21)
slowlength2 = input(45)
MACDLength2 = input(20)

MACD2 = ema(open, fastLength2) - ema(open, slowlength2)
aMACD2 = sma(MACD2, MACDLength2)
delta2 = MACD2 - aMACD2

Length = input(14, minval=1)
Oversold = input(20, minval=1)
Overbought = input(70, minval=1)
xRSI = rsi(open, Length)


if (delta > 0) and (year>2015) and (delta2 > 0) and (xRSI < Overbought)
    strategy.entry("buy", strategy.long, comment="buy")

if (delta < 0) and (year>2015) and (delta2 < 0) and (xRSI > Oversold)
    strategy.entry("sell", strategy.short, comment="sell")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/428693

> Last Modified

2023-10-08 14:03:47
