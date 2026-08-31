
> Name

KST-EMA-Momentum-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c7ec5249d6664c4fb3.png)


## Overview

The core idea of this strategy is to combine the KST indicator and EMA lines to identify and follow trends. It generates buy signals when the KST indicator crosses above 0 and closes above the EMA line, and sell signals when it crosses below 0 and closes below the EMA line. This simple and practical strategy can automatically track trends and is suitable for medium to long term holdings.

## Strategy Logic

1. Calculate the KST indicator: Compute the ROC of 10, 15, 20 and 30 periods, take a weighted sum, and smooth it with a 9-period SMA to derive the KST indicator.

2. Calculate the EMA line: Compute a 50-period EMA line. 

3. Generate buy signal: When the fast KST line crosses above the slow KST line (golden cross) and is below 0, while the close is above the EMA line, a buy signal is triggered.

4. Generate sell signal: When the fast KST line crosses below the slow KST line (dead cross) and is above 0, while the close is below the EMA line, a sell signal is triggered.

5. Set trailing stop loss: The stop loss tracks 1% of account value to realize automatic stop loss.

## Advantages

1. KST identifies trend changes, EMA confirms direction. Combining both accurately detects entry timing.

2. Using fast/slow crossovers and 0-line avoids unnecessary trades. 

3. EMA as support/resistance further filters fake signals. Only enter on EMA breakouts.

4. Auto trailing stop loss controls risk and allows profits to run.

5. Simple parameters make implementation and optimization easy.

## Risks

1. KST has lag in detecting trend changes, may miss some chances. Can shorten periods or optimize weighting.

2. EMA has lag around trend reversals. Other indicators or MA combos may work better.

3. Stop loss too wide increases losses, too tight gets stopped out by spikes. Careful testing needed to optimize.

4. Frequent signals may increase transaction costs. Can tighten entry rules to reduce trades.

## Optimization Directions 

1. Optimize KST periods for sensitivity to specific instruments.

2. Test other moving averages like MA, WMA to see which combines best with KST.

3. Experiment dynamic stops based on volatility metrics like ATR. 

4. Add filters like volume spikes to avoid traps.

5. Consider combining with indicators like RSI, MACD for more dimensions.

6. Test parameters across instruments to optimize for each.

## Conclusion

This strategy has clear, reliable logic that is easy to implement. KST identifies trend turns, EMA filters further, and stops control risk. It automatically tracks medium to long term trends. Reasonable parameters provide large optimization space. Users can tweak for different instruments. Applicable for beginners to learn and professionals to build on. With further optimization it shows promise as a robust trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ROC Length #1|
|v_input_2|15|ROC Length #2|
|v_input_3|20|ROC Length #3|
|v_input_4|30|ROC Length #4|
|v_input_5|10|SMA Length #1|
|v_input_6|10|SMA Length #2|
|v_input_7|10|SMA Length #3|
|v_input_8|15|SMA Length #4|
|v_input_9|9|Signal Line Length|
|v_input_10|50|Length EMA|
|v_input_11_close|0|Source EMA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|false|Offset|
|v_input_13|true|Trail Long Loss (%)|
|v_input_14|true|Trail Short Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-31 00:00:00
end: 2023-11-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Know Sure Thing and EMA Strategy by JLX", shorttitle="KST EMA JLX", format=format.price, precision=4, initial_capital = 1000, default_qty_type=strategy.percent_of_equity, default_qty_value = 100)
roclen1 = input(10, minval=1, title = "ROC Length #1")
roclen2 = input(15, minval=1, title = "ROC Length #2")
roclen3 = input(20, minval=1, title = "ROC Length #3")
roclen4 = input(30, minval=1, title = "ROC Length #4")
smalen1 = input(10, minval=1, title = "SMA Length #1")
smalen2 = input(10, minval=1, title = "SMA Length #2")
smalen3 = input(10, minval=1, title = "SMA Length #3")
smalen4 = input(15, minval=1, title = "SMA Length #4")
siglen = input(9, minval=1, title = "Signal Line Length")
smaroc(roclen, smalen) => sma(roc(close, roclen), smalen)
kst = smaroc(roclen1, smalen1) + 2 * smaroc(roclen2, smalen2) + 3 * smaroc(roclen3, smalen3) + 4 * smaroc(roclen4, smalen4)
sig = sma(kst, siglen)
plot(kst, color=color.green, title="KST")
plot(sig, color=color.red, title="Signal")
hline(0, title="Zero")

len = input(50, minval=1, title="Length EMA")
src = input(close, title="Source EMA")
offset = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
fastEMA = ema(src, len)

delta = kst - sig

buySignal = crossover(delta, 0) and kst < 0 and close > fastEMA
sellSignal = crossunder(delta, 0) and kst > 0 and close < fastEMA

longTrailPerc = input(title="Trail Long Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
shortTrailPerc = input(title="Trail Short Loss (%)",type=input.float, minval=0.0, step=0.1, defval=1) * 0.01

// STEP 2:
// Determine trail stop loss prices
longStopPrice = 0.0, shortStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0
shortStopPrice := if (strategy.position_size < 0)
    stopValue = close * (1 + shortTrailPerc)
    min(stopValue, shortStopPrice[1])
else
    999999

// Submit entry orders
if (buySignal)
    strategy.entry(id="EL", long=true)

if (sellSignal)
    strategy.entry(id="ES", long=false)

// STEP 3:
// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="XL TRL STP", stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit(id="XS TRL STP", stop=shortStopPrice)



alertcondition(crossover(delta, 0) and kst < 0 and close > fastEMA,'Long alert', 'You should buy')

alertcondition(crossunder(delta, 0) and kst > 0 and close < fastEMA, 'Short alert', 'You should sell')




```

> Detail

https://www.fmz.com/strategy/431413

> Last Modified

2023-11-07 16:36:21
