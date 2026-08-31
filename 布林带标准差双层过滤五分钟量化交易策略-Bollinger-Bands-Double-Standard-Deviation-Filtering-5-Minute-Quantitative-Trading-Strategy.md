
> Name

布林带标准差双层过滤五分钟量化交易策略-Bollinger-Bands-Double-Standard-Deviation-Filtering-5-Minute-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f949dd7c0f7e1e4088.png)


#### Overview
This strategy is based on the Bollinger Bands indicator and uses double standard deviation filtering to achieve fast trading on a 5-minute timeframe. It buys when the price breaks below the lower band and sells when it breaks above the upper band. The upper and lower bands are set by different standard deviations and marked with different colors, visually showing the strength of the trend.

#### Strategy Principle
1. Calculate the Bollinger Bands baseline, upper band 1, upper band 2, lower band 1, and lower band 2.
2. Generate a buy signal when the closing price crosses above the lower band 1 from below.
3. Generate a sell signal when the closing price crosses below the upper band 1 from above.
4. After buying, close the position when a sell signal appears. After selling, close the position when a buy signal appears.
5. Upper band 2 and lower band 2 indicate trend strength and provide auxiliary judgment.

#### Strategy Advantages
1. The double standard deviation setting improves the accuracy of trend judgment.
2. The high trading frequency at the 5-minute level is suitable for fast in and out.
3. Auxiliary judgment of trend strength helps with risk control.
4. Adjustable parameters adapt to different markets.

#### Strategy Risks
1. Frequent trading may lead to high commissions.
2. Errors in trend judgment will bring losses.
3. Lack of stop-loss measures exposes greater risks.
4. Insufficient grasp of unilateral trends.

#### Strategy Optimization Directions
1. Introduce stop-loss and take-profit mechanisms to control single transaction risks.
2. Optimize Bollinger Bands parameters to improve trend capture ability.
3. Add auxiliary indicators for trend judgment, such as MA, to increase win rate.
4. Set filtering conditions for range-bound markets.

#### Summary
This strategy uses the statistical properties of Bollinger Bands, with double-layer filtering to enhance trend judgment, suitable for quickly capturing trend opportunities at the 5-minute level. However, issues with frequent trading and insufficient risk control measures still need optimization. In the future, improvements can continue to be made in terms of stop-loss and take-profit, parameter optimization, and auxiliary judgment to enhance overall robustness and profitability.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|Length|
|v_input_float_1|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//This displays the traditional Bollinger Bands, the difference is
//that the 1st and 2nd StdDev are outlined with two colors and two
//different levels, one for each Standard Deviation

strategy("Five Min Scalping Strategy", overlay=true)

src = input(close, title="Source")
length = input.int(20, minval=1, title="Length")
mult = input.float(2.0, minval=0.001, maxval=50, title="Multiplier")

basis = ta.sma(src, length)
dev = ta.stdev(src,length)
dev2 = mult * dev

upper1 = basis + dev
lower1 = basis - dev
upper2 = basis + dev2
lower2 = basis - dev2

LongCondition = close[1] < lower1 and close > lower1
ShortCondition = close[1] > upper1 and close < upper1

strategy.entry("Long", strategy.long, when = LongCondition)
strategy.entry("Short", strategy.short, when = ShortCondition)

strategy.close("Long", when = ShortCondition)
strategy.close("Short", when = LongCondition)

colorBasis = src >= basis ? color.blue : color.orange

pBasis = plot(basis, linewidth=2, color=colorBasis)
pUpper1 = plot(upper1, color=color.new(color.blue, 0), style=plot.style_circles)
pUpper2 = plot(upper2, color=color.new(color.blue, 0), style=plot.style_circles)
pLower1 = plot(lower1, color=color.new(color.orange, 0), style=plot.style_circles)
pLower2 = plot(lower2, color=color.new(color.orange, 0), style=plot.style_circles)

fill(pBasis, pUpper2, color=color.new(color.blue, 80))
fill(pUpper1, pUpper2, color=color.new(color.blue, 80))
fill(pBasis, pLower2, color=color.new(color.orange, 80))
fill(pLower1, pLower2, color=color.new(color.orange, 80))

```

> Detail

https://www.fmz.com/strategy/449947

> Last Modified

2024-04-30 16:03:11
