
> Name

Adaptive-Zero-Lag-EMA-Strategy

> Author

ChaoZhang

> Strategy Description


The script you've provided is based on the Adaptive Zero Lag EMA (AZLEMA) strategy. This script uses the principles of John Ehlers' signal processing research and a method known as Cosine Instantaneous Frequency Measurement (IFM) for determining the dominant cycle period, i.e., the length of time between two identical points in successive cycles in your trading data.

Here's a brief overview of what the trading script does:

1. Initially, it sets up the strategy using a configuration of default inputs like period, adaptive mode, gain limit, threshold, stop loss points and take profit points. The currency is set to USD and the initial capital to 1000. 

2. It then sets up calculations for the adaptive mode using a combination of differential equations and Ehlers' method (used when the 'Adaptive?' setting is set to true). 

3. It calculates the average value (EMA) of the selected source of data over the selected period.

4. It performs a loop operation to find the Gain and Error Correlation (EC) values that minimize the absolute Error. 

5. Using these values, it calculates the final EC value and plots the value of EC and EMA on the chart. 

6. It creates potential buy and sell conditions based on the crossover and crossunder of EC and EMA above a certain defined threshold. 

7. It sets up rules for entering and exiting long and short positions based on the buy and sell conditions determined earlier. For each position, it calculates the lot size and enters a position when the respective condition (buy/sell) is true. It sets a stop loss and a trailing take profit for each position. 

This script seems quite comprehensive and versatile as it allows you to change multiple parameters to adapt to different trading styles and market conditions. As always, it's recommended to backtest this strategy using historical data before using it in live trading.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Period|
|v_input_3|true|Adaptive?|
|v_input_4|15|Gain Limit|
|v_input_5|0.03|Threshold|
|v_input_6|50|SL Points|
|v_input_7|10|TP Points|
|v_input_8|0.01|Risk|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-08 00:00:00
end: 2023-09-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Adaptive Zero Lag EMA", shorttitle="AZLEMA", overlay = true, initial_capital=1000, currency="USD", commission_type=strategy.commission.cash_per_contract, commission_value=0.000005, slippage = 5, pyramiding=1, calc_on_every_tick=true)

src = input(title="Source",  defval=close)
Period = input(title="Period", defval = 20)
adaptive = input(title="Adaptive?", defval=true)
GainLimit = input(title="Gain Limit",  defval = 15)
Threshold = input(title="Threshold",  defval=0.03, step=0.01)
fixedSL = input(title="SL Points", defval=50)
fixedTP = input(title="TP Points", defval=10)
risk = input(title='Risk', defval=0.01, step=0.01)

PI = 3.14159265359
s2 = 0.0
s3 = 0.0
delta = 0.0
inst = 0.0
len = 0.0
v1 = 0.0
v2 = 0.0
v4 = 0.0

//IF adaptive is true, use the Cosine IFM strategy for determining the dominant
//cycle period
if(adaptive)
    v1 := src - src[7]
    s2 := 0.2*(v1[1] + v1)*(v1[1] + v1) + 0.8*nz(s2[1])
    s3 := 0.2*(v1[1] - v1)*(v1[1] - v1) + 0.8*nz(s3[1])
    if (s2 != 0)
        v2 := sqrt(s3/s2)
    if (s3 != 0)
        delta := 2*atan(v2)
    for i = 0 to 100
        v4 := v4 + delta[i]
        if (v4 > 2*PI and inst == 0.0)
            inst := i - 1
    if (inst == 0.0)
        inst := inst[1]
    len := 0.25*inst + 0.75*nz(len[1])
    Period := round(len)

LeastError = 1000000.0
EC = 0.0
Gain = 0.0
EMA = 0.0
Error = 0.0
BestGain = 0.0

alpha =2/(Period + 1)
EMA := alpha*src + (1-alpha)*nz(EMA[1])

for i = -GainLimit to GainLimit
    Gain := i/10
    EC := alpha*(EMA + Gain*(src - nz(EC[1]))) + (1 - alpha)*nz(EC[1])
    Error := src - EC
    if(abs(Error)<LeastError)
        LeastError := abs(Error)
        BestGain := Gain

EC := alpha*(EMA + BestGain*(src - nz(EC[1]))) + (1-alpha)*nz(EC[1])

plot(EC, title="EC", color=orange, linewidth=2)
plot(EMA, title="EMA", color=red, linewidth=2)

buy = crossover(EC,EMA) and 100*LeastError/src > Threshold
sell = crossunder(EC,EMA) and 100*LeastError/src > Threshold

if buy
    strategy.entry("Enter Long", strategy.long)
else if sell
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/426143

> Last Modified

2023-09-08 16:24:02
