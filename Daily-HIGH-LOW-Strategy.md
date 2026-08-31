
> Name

Daily-HIGH-LOW-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview

This is a simple intraday trading strategy that combines daily high/low points, moving average and volume. The main idea is to use the breakout of previous day's high/low points, moving average direction and fund flow as entry signals.

### Strategy Logic

The strategy is mainly based on the following indicators:

1. Daily high/low points: Record the highest and lowest prices of the previous trading day as the benchmark for breakout judgment.

2. Moving average: Calculate the moving average of closing prices over a certain period as a reference for the overall trend. 

3. Volume money flow: Calculate the normalized long/short value of volume over a period to determine fund inflows and outflows.

The specific trading rules are:

1. Long condition: When the day high breaks the previous day's high, and the close is above the moving average, and volume money flow is positive, go long.

2. Close long position: When the close breaks below the moving average, close long positions.

3. Short condition: When the day low breaks the previous day's low, and the close is below the moving average, and volume money flow is negative, go short. 

4. Close short position: When the close breaks above the moving average, close short positions.

The strategy takes into account breakout, trend and capital flow comprehensively, forming a complete judgment system that can effectively filter out false breakout noises. But since it only makes decisions based on intraday data, it is a short-term trading strategy.

### Advantage Analysis 

This high/low breakout strategy has the following advantages:

1. The logic is simple and intuitive, easy to understand and implement.

2. Breaking the previous day's high/low points can capture the direction of stronger forces.

3. Filtering with moving averages avoids many noisy signals. 

4. Capital flow indicators help determine the long/short distribution of forces.

5. Intraday trading allows accumulating profits through multiple trades.

6. No complex parameter optimization is required, relatively easy to implement.

7. Applicable to different products with high flexibility.

8. Overall, the strategy idea is simple and clear, with little difficulty in implementation and considerable profit potential.

### Risk Analysis

Although the strategy has many advantages, there are also some risks:

1. Reliance on high/low breakouts may cause losses from false breakouts. 

2. Overly reliant on intraday trading, easily affected by overnight events.

3. Lagging of moving averages may miss trend turning points. 

4. Volume indicators can sometimes give wrong signals.

5. Unable to well control the loss size of single bets, with risk of oversized losses.

6. Frequent intraday trading is impacted by trading costs.

7. Limited optimization space makes it hard to achieve persistent alpha.

8. Overall, the strategy has high signal frequency but unproven stability and profitability.

### Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add stop loss to control single bet risk.

2. Optimize moving average parameters for more sensitivity or smoothness.

3. Try different volume indicators to improve capital flow judgment.

4. Add more filters to reduce false breakout chances. 

5. Run the strategy in higher timeframes to avoid over-trading. 

6. Introduce machine learning for adaptive signal generation.

7. Incorporate more data for decision making, e.g. news, macros etc.

8. Comprehensively evaluate stability and risk, not pursuing excess returns.

### Conclusion

In summary, this is a simple and intuitive high/low breakout strategy, focusing on price-volume relationship and trend judgment. It has some merits but also risks, requiring further optimization and verification. If properly risk-managed, it can be a practical short-term strategy idea. But more efficient and robust strategies need more modeling factors and rigorous backtesting.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|24|(?Optimization paramters)Length MA|
|v_input_source_1_close|0|Source MA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|CMF Length|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5

strategy(title='Daily HIGH/LOW strategy', overlay=true, initial_capital=10000, calc_on_every_tick=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)

////////////////////////////GENERAL INPUTS//////////////////////////////////////
len = input.int(24, minval=1, title='Length MA', group='Optimization paramters')
src = input.source(close, title='Source MA', group='Optimization paramters')
out = ta.ema(src, len)

length = input.int(20, minval=1, title='CMF Length', group='Optimization paramters')
ad = close == high and close == low or high == low ? 0 : (2 * close - low - high) / (high - low) * volume
mf = math.sum(ad, length) / math.sum(volume, length)

f_secureSecurity(_symbol, _res, _src) =>
    request.security(_symbol, _res, _src[1], lookahead=barmerge.lookahead_on)

pricehigh = f_secureSecurity(syminfo.tickerid, 'D', high)
pricelow = f_secureSecurity(syminfo.tickerid, 'D', low)

plot(pricehigh, title='Previous Daily High', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))
plot(pricelow, title='Previous Daily Low', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))

short = ta.crossunder(low, pricelow) and close < out and mf < 0
long = ta.crossover(high, pricehigh) and close > out and mf > 0


if short and barstate.isconfirmed
    strategy.entry('short', strategy.short, when=barstate.isconfirmed, stop=pricelow[1])
    strategy.close('short', when=close > out)

if long and barstate.isconfirmed
    strategy.entry('long', strategy.long, when=barstate.isconfirmed, stop=pricehigh[1])
    strategy.close('long', when=close < out)



```

> Detail

https://www.fmz.com/strategy/427668

> Last Modified

2023-09-23 15:07:58
