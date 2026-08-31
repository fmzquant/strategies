
> Name

均线黄金交叉策略EMA-Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The EMA golden cross strategy is a common quantitative trading strategy. It uses two exponential moving averages (EMAs) with different parameters. When the shorter period EMA crosses above the longer period EMA, it goes long. When the shorter period EMA crosses below the longer period EMA, it closes the position. This strategy utilizes the faster reaction of short period EMA and the trend following ability of long period EMA to generate trading signals.

## Strategy Logic

The strategy first defines two EMAs, ema1 with length 10 and ema2 with length 21. Then it calculates the values of the two EMAs. When ema1 crosses above ema2, it signals an upward breakthrough, which is a long signal. When ema1 crosses below ema2, it signals a breakdown through the EMAs, which is a close position signal.

To filter false breakouts, the code also defines a threshold value, calculated as:

```pine
threshold = ((ema1 - ema2)*100) / ((ema1 + ema2)/2) 
```

This threshold represents the percentage of EMA distance versus the EMA average. When threshold is above 0.15%, it is a long signal. When threshold is below -0.006%, it is a close position signal. 

In summary, the trading signals of this strategy are:

- Long signal: ema1 crosses above ema2, and threshold >= 0.15%  
- Close position signal: ema1 crosses below ema2, and threshold <= -0.006%

## Advantage Analysis

The advantages of this strategy include:

1. Using EMAs can smooth the price data and help generate trading signals.

2. The dual EMA setup balances responsiveness and stability. 

3. The threshold filters false breakouts and avoids unnecessary trades.

4. The strategy logic is simple and clear, suitable for beginners.

5. The EMA parameters and threshold can be optimized.

## Risk Analysis

The risks of this strategy include:

1. EMAs lag prices and may miss short-term opportunities. 

2. Risk of being trapped when trend reverses, potentially leading to large losses.

3. Improper threshold may filter valid signals or generate false signals. 

4. If EMA parameters are unsuitable, the two EMAs may not show significant differences, generating false signals.

5. Stop loss should be set reasonably to avoid being broken by large market swings.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize EMA parameters and test different periods.

2. Optimize the threshold value to balance false signals and valid signals.

3. Add other technical indicators like MACD, KDJ to confirm signals.

4. Add stop loss mechanisms like trailing stop or OCO orders to limit losses.

5. Consider partial position entries to lower risk. 

6. Test different holding periods to find optimal duration.

## Conclusion

The EMA golden cross strategy has clear and simple logic, utilizing the characteristics of EMAs to generate trading signals. The strategy has certain advantages but potential risks exist. The strategy can be improved by optimizing parameters, setting stop loss, filtering signals etc. It is suitable as a beginner's quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|EMA #1 length|
|v_input_2_close|0|EMA Source #1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|21|EMA #2 length|
|v_input_4_close|0|EMA Source #2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

if high > ta.highest(high[1], 5)
    strategy.entry("Enter Long", strategy.long)
else if low < ta.lowest(low[1], 5)
    strategy.entry("Enter Short", strategy.short)//@version=3
strategy(title="ema10-21", shorttitle="10/21", overlay=true, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 2500, commission_type = strategy.commission.percent, commission_value = 0.2)

len1 = input(10, minval=1, title="EMA #1 length")
src1 = input(close, title="EMA Source #1")
a = ta.ema(src1, len1)
plot(a, title="EMA #1", color=color.orange, linewidth=2, style=plot.style_line)

len2 = input(21, minval=1, title="EMA #2 length")
src2 = input(close, title="EMA Source #2")
b = ta.ema(src2, len2)
plot(b, title="EMA #2", color=color.blue, linewidth=2, style=plot.style_line)

threshold = ((a-b)*100)/((a+b)/2)
thresholdUp = threshold > 0.15
thresholdDown = threshold < -0.006

if (thresholdUp) 
    strategy.entry("Buy", strategy.long)
if (thresholdDown) 
    strategy.close("Buy", strategy.long)

//goLong() => (crossover(a, b)) and (threshold >= 0.0025)
//killLong() => (crossunder(a, b)) and (threshold <= -0.0025)
//strategy.entry("Buy", strategy.long, when = goLong())
//strategy.close("Buy", when = killLong())

//threshold = ((a-b)*100)/((a+b)/2)

//achat = out1 > out2
//vente = out1 < out2 //and threshold < -0.025

//strategy.entry("long", true, when = achat)
//strategy.exit("exit", "long", when = vente)
```

> Detail

https://www.fmz.com/strategy/427182

> Last Modified

2023-09-18 21:18:17
