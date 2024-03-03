
> Name

快慢EMA交叉intraday交易策略Fast-and-Slow-EMA-Cross-Intraday-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]  

本策略通过设置快速EMA和慢速EMA,并根据其交叉情况进行高频intraday交易。该策略利用EMA曲线的交叉判断短期价格趋势,追求捕捉市场的短线震荡。

策略原理:

1. 设置一快一慢两个EMA周期,典型参数为快线110周期,慢线40周期。

2. 当快线从下方向上穿越慢线时,进行做多操作。

3. 当快线从上方向下穿越慢线时,进行做空操作。 

4. 设置固定点数止损,进行风险管理。

5. 适用于高频周期(1分钟),进行Intraday交易。

该策略的优势:

1. 快慢EMA交叉判断市场短期趋势较为精确。

2. 突破交叉交易方式可及时捕捉短线震荡。

3. 设置止损点数有助于控制单笔交易风险。

该策略的风险:

1. 高频交易需要较高的交易成本承受能力。

2. 停损点数设置过小可能造成过于频繁的止损。

3. EMA曲线交叉存在时滞后问题。

总之,本策略利用快慢EMA交叉进行高频短线震荡交易。操作频率较高,需要警惕交易成本控制问题,同时合理设置止损点数,方能获得稳定收益。

||

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

[/trans]

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
