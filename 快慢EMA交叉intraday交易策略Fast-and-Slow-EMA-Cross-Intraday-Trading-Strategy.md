
> Name

快慢EMA交叉intraday交易策略Fast-and-Slow-EMA-Cross-Intraday-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This intraday strategy trades the crossover of a fast and slow EMA for high-frequency trading. It uses EMA crosses to judge short-term trends and capture market oscillation. 

Strategy Logic:

1. Set a fast and slow EMA period, typically 110 and 40. 

2. Go long when fast EMA crosses above slow EMA.

3. Go short when fast EMA crosses below slow EMA.

4. Set fixed point stop loss for risk control.

5. Use for high-frequency periods (1-min) to trade intraday.

Advantages:

1. Fast/slow EMA cross accurately judges short-term trends.

2. Breakout trading timely captures short spikes. 

3. Fixed stop loss manages trade risk.

Risks:

1. High-frequency trading requires sufficient capacity to absorb trading costs.

2. Stop loss too tight causes excessive stops.

3. EMA crossover lags may delay signals.

In summary, this strategy trades fast/slow EMA crosses for short-term intraday oscillation. The high frequency requires trading cost control and reasonable stop loss calibration for steady returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|110|fastLength|
|v_input_2|40|slowLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Eli Strategy", overlay=true)
fastLength = input(110)
slowLength = input(40)
price = close

emafast = ema(price, fastLength)
emaslow = ema(price, slowLength)


if (crossover(emafast, emaslow))
    strategy.entry("EMA2CrossLE", strategy.long, comment="long")
    strategy.exit("Exit Long", from_entry = "EMA2CrossLE", loss = 500, comment= "Rshort")

if (crossunder(emafast, emaslow))
    strategy.entry("EMA2CrossSE", strategy.short, comment="short")
    strategy.exit("Exit short", from_entry = "EMA2CrossSE", loss = 500, comment= "RLong")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426506

> Last Modified

2023-09-12 16:28:09
