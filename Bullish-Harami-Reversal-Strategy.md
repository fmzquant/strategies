
> Name

Bullish-Harami-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
多头包围K线反转策略

该策略通过识别“多头包围”K线形态来进行多头反转交易。具体来说,满足以下条件时产生买入信号:

1. 当前K线实体小,完全包围在前一根大阴线内部
2. 当前K线实体颜色与前一根K线相反
3. 当前K线开盘价高于前一根K线收盘价
4. 当前K线实体大小比前一根K线实体小

当满足这些条件时,说明市场出现多头力量反转的迹象,这时做多入场。入场后设置止损和止盈平仓。

这种策略的优点是利用典型的K线形态来识别反转点位,比较直观。但是也存在一定的缺陷:

1. 多头包围形态不一定持续,存在被反转的风险
2. K线形态识别难度较大,需要参数优化
3. 滞后信号,入场时机不佳
4. 回测曲线拟合风险较大

总体来说,多头包围反转策略可以作为趋势判断的参考,但实盘中仍需审慎。应该适当 loosen 参数,并配合其他指标来验证形态。此外,严格的资金管理也是成功运用该策略的关键。

||

This strategy identifies "bullish harami" candlestick patterns for bullish reversal trades. Specifically, long signals are generated when:

1. Current candle has a small body that is engulfed by the large previous bearish body
2. Current candle body color is opposite of previous candle  
3. Current candle opens higher than previous candle's close
4. Current candle body is smaller than previous candle's body

When these conditions are met, it signifies bullish reversal momentum, at which point a long entry is taken. Stop loss and take profit exits are set after entry.

The advantage of this strategy is it uses classical candlestick patterns to identify reversal points visually. However, some limitations exist:

1. Bullish harami may not sustain, risks being reversed
2. Difficulty in accurately identifying candlestick patterns, requires optimization
3. Lagging signals, poor entry timing
4. Backtest curve fitting risk is high

Overall, the bullish harami reversal strategy can serve as a reference for trend analysis, but should be applied cautiously in live trading. Parameters should be loosened and combined with other indicators for pattern verification. Also, strict risk management is key to successfully implementing this strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|Take Profit pip|
|v_input_2|18|Stop Loss pip|
|v_input_3|true|Min. Size Body pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/01/2019
//    This is a bullish reversal pattern formed by two candlesticks in which a small 
//    real body is contained within the prior session's unusually large real body.
//    Usually the second real body is the opposite color of the first real body. 
//    The Harami pattern is the reverse of the Engulfing pattern. 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title = "Bullish Harami Backtest", overlay = true)
input_takeprofit = input(60, title="Take Profit pip")
input_stoploss = input(18, title="Stop Loss pip")
input_minsizebody = input(1, title="Min. Size Body pip", step = 0.01)
barcolor(abs(close - open) >= input_minsizebody ? open[1] > close[1] ? close > open ? close <= open[1] ? close[1] <= open ? close - open < open[1] - close[1] ? yellow :na :na : na : na : na : na)
pos = 0.0
barcolor(nz(pos[1], 0) == -1 ? red: nz(pos[1], 0) == 1 ? green : blue ) 
posprice = 0.0
posprice := abs(close - open) >= input_minsizebody? open[1] > close[1] ? close > open ? close <= open[1] ? close[1] <= open ? close - open < open[1] - close[1] ? close :nz(posprice[1], 0) :nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0): nz(posprice[1], 0)
pos := iff(posprice > 0, 1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == 1)
    strategy.entry("Long", strategy.long)
posprice := iff(low <= posprice - input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
```

> Detail

https://www.fmz.com/strategy/426376

> Last Modified

2023-09-11 16:26:57
