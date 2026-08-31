
> Name

Bullish-Harami-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



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
