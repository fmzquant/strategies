
> Name

The-Genesis-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

The Genesis trading strategy is a trend following strategy that uses a crossover of two exponential moving averages (EMAs) to generate trade signals.

How it Works

The strategy uses a faster EMA (default 20 periods) and a slower EMA (default 50 periods). When the faster EMA crosses above the slower EMA, a long position is taken. When the faster EMA crosses below the slower EMA, a short position is taken.

The crossovers aim to capture the start of short-term and long-term trends. The longer EMA provides trend direction and the shorter EMA gives signal sensitivity.

Benefits

The main advantages of this strategy are:

Simple and easy to implement
Captures momentum from trend continuations
Long and short signals for flexibility
Customizable EMA lengths
Risks

Some potential risks and drawbacks include:

Whipsaws possible during range-bound markets
Lagging signals in quickly reversing markets
No stop loss defined, can lead to large drawdowns
The Genesis strategy works well when strong directional trends occur. Sideways choppy markets may trigger false signals and stop outs. Using proper risk management is advised.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © genesisjgonzalezh

//@version=5
strategy("GENESIS", overlay=true)

lenght1= (20)
lenght2= (50)

ema1= ta.ema(close, lenght1)
ema2 = ta.ema(close, lenght2)

long = ta.crossover(ema1,ema2)


short = ta.crossover(ema2,ema1)

LongSignal  = ta.crossover (ema1,ema2)
ShortSignal = ta.crossunder (ema1,ema2)
plotshape(LongSignal , title="Señal para Long", color= color.green, location=location.belowbar, size=size.tiny, text="Long", textcolor=color.white)
plotshape(ShortSignal , title="Señal para Short", color= color.red, location=location.abovebar, size=size.tiny, text="Short", textcolor=color.white)

strategy.entry("long", strategy.long, when = long)
strategy.exit("Exit", "Long", profit = 10, loss = 2)
strategy.entry("short", strategy.short, when = short)
strategy.exit("Exit", "short", profit = 10, loss = 2)


```

> Detail

https://www.fmz.com/strategy/426300

> Last Modified

2023-09-10 21:38:32
