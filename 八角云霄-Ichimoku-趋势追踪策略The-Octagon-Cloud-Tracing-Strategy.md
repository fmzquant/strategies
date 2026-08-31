
> Name

八角云霄-Ichimoku-趋势追踪策略The-Octagon-Cloud-Tracing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/120a41164a3b4f6a854.png)


## Overview  

This is a quantitative trend-following strategy based on the Ichimoku indicator. It mainly constructs long and short positions under specific conditions to track market trends, combined with certain stop loss mechanisms to control risks.   

## Strategy Principle

The core of this strategy is to build trading signals based on the Ichimoku indicator with certain parameter settings. The Ichimoku indicator consists of four lines: the conversion line, the base line, the leading span A and the lagging span B. The conversion line is commonly known as the Tenkan-sen and the base line is called the Kijun-sen. This strategy sets up different parameters for Tenkan-sen and Kijun-sen to generate golden cross and dead cross trading signals. In addition, it also incorporates cloud breakouts as an auxiliary condition to trigger entries.   

Specifically, the strategy mainly follows these trading rules:

1. Go long when price breaks above the Tenkan-sen and leaves the cloud;  

2. Close long positions when price falls below the Tenkan-sen;   

3. Go short when price breaks below the Kijun-sen and enters the cloud;  

4. Close short positions when price rises back above the Tenkan-sen.

Through such long and short trading principles, the strategy can effectively capture trending moves in the market. Meanwhile, incorporating cloud breakouts filters out false signals to some extent.   

## Advantage Analysis   

Compared with other common moving average trading strategies, this strategy has the following advantages:

1. More accurate trend judgment based on Ichimoku. Ichimoku consists of multiple moving averages, making it more reliable for trend recognition and filtering out noise from single MAs.

2. Better filter effect with multiple lines. Additional filter from cloud breakouts avoids false signals.   

3. Controllable risks. Setting stop loss line allows timely stop loss and risk control.

4. Smaller drawdowns. Less adverse trades compared to other trend following strategies reduces drawdown loss.   

5. Flexible parameter tuning. Parameters can be adjusted to adapt to different market conditions.

## Risks and Optimization   

There are still some risks to note for this strategy:

1. Poor performance in range-bound markets. Whipsaws may occur leading to float losses.   

2. Inadequate reversal recognition. Weak in identifying short-term trend reversals, may miss opportunities or encounter sudden reversals.

3. Reliance on empirical parameter tuning. Different parameters can significantly impact performance which requires abundant historical experience.   

The following aspects can be optimized to address the above risks:

1. Add volatility indicators to detect non-trending markets and pause strategy.

2. Incorporate additional reversal signals like moving average crossovers. 

3. Utilize machine learning for automated parameter optimization instead of manual tuning.  

4. Set up dynamic stop loss lines based on market volatility.

## Conclusion  

In general, this strategy leverages the strength of Ichimoku in catching trending moves. With proper parameter tuning and optimizations, it can achieve better robustness and serve as an efficient strategy worth considering for live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Tenkan-sen|
|v_input_2|30|Kijun-sen|
|v_input_3|60|Senkou Span B|
|v_input_4|30|Chikou Span (Displacement)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-13 00:00:00
end: 2023-12-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="RENKO ICHIMOKU STRATEGY", shorttitle="RENKO ICHIMOKU STRATEGY", overlay=true)
ro = open
rc = close

tenkanSenPeriods = input(10, minval=1, title="Tenkan-sen"),
kijunSenPeriods = input(30, minval=1, title="Kijun-sen")
SenkouSpanBPeriods = input(60, minval=1, title="Senkou Span B"),
displacement = input(30, minval=1, title="Chikou Span (Displacement)")

donchian(len) => avg(lowest(len), highest(len))

tenkanSen = donchian(tenkanSenPeriods)
kijunSen = donchian(kijunSenPeriods)
SenkouSpanA = avg(tenkanSen, kijunSen)
SenkouSpanB = donchian(SenkouSpanBPeriods)

plot(tenkanSen, color=#0496ff, linewidth=2, title="Tenkan-sen")
// plot(kijunSen, color=#991515, title="Kijun-sen")
// plot(close, offset = -displacement, color=#459915, title="Chikou Span")

p1 = plot(SenkouSpanA, offset = displacement, color=green, title="Senkou Span A")
p2 = plot(SenkouSpanB, offset = displacement, color=red, title="Senkou Span B")
fill(p1, p2, color = SenkouSpanA > SenkouSpanB ? green : red)

// Entry/Exit Signals
tk_cross_bull = tenkanSen > kijunSen
tk_cross_bear = tenkanSen < kijunSen

price_below_tenkan = open < tenkanSen and close < tenkanSen
price_above_tenkan = open > tenkanSen and close > tenkanSen

price_below_kinjun = close < kijunSen
price_above_kinjun = close > kijunSen

tekan_above_kinjun = tenkanSen > kijunSen
tekan_below_kinjun = tenkanSen < kijunSen

ss_high = max(SenkouSpanA[displacement-1], SenkouSpanB[displacement-1])
ss_low = min(SenkouSpanA[displacement-1], SenkouSpanB[displacement-1])
price_inside_kumo = close > ss_high and close < ss_low

price_below_kumo = rc[1] < ro[1] and rc[0] < ro[0] and rc[1] < ss_low 
price_above_kumo = rc[1] > ro[1] and rc[0] > ro[0] and rc[1] > ss_high 

cs_cross_bull = mom(close, displacement-1) > 0
cs_cross_bear = mom(close, displacement-1) < 0

bullish = cs_cross_bull and not price_inside_kumo
bearish = cs_cross_bear and not price_inside_kumo



strategy.entry("Long", strategy.long, when=price_above_kumo and price_above_tenkan )
strategy.close("Long", when=price_below_tenkan )

strategy.entry("Short", strategy.short, when=price_below_kumo and price_below_tenkan )
strategy.close("Short", when=price_above_tenkan )

// longCondition = crossover(sma(close, 14), sma(close, 28))
// if (longCondition)
//     strategy.entry("My Long Entry Id", strategy.long)

// shortCondition = crossunder(sma(close, 14), sma(close, 28))
// if (shortCondition)
//     strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/435974

> Last Modified

2023-12-20 15:08:22
