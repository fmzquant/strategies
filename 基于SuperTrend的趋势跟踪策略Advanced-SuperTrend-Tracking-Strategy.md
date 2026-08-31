
> Name

基于SuperTrend的趋势跟踪策略Advanced-SuperTrend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168d899ce904ef1ea68.png)

The strategy uses the SuperTrend indicator to determine the trend direction and combines the ATR indicator to set stop loss and take profit to achieve low risk trend following.

#### Strategy Principle 

The core indicator of this strategy is SuperTrend. SuperTrend indicator combines ATR to judge the trend direction based on price breakthroughs. The specific calculation method is as follows:

Upper Band: Upper Band = Current Price - (ATR x Multiplier)
Lower Band: Lower Band = Current Price + (ATR x Multiplier)

When the price is higher than the upper band, it is an uptrend; when the price is lower than the lower band, it is a downtrend.

The strategy determines the trend direction based on the SuperTrend indicator, goes long in an uptrend and goes short in a downtrend. At the same time, the strategy uses the average fluctuation range of the ATR indicator to set stop loss and take profit positions to control risks.

#### Advantages of the Strategy

- Use SuperTrend indicator to determine the trend and accurately capture market trends
- ATR stop loss and take profit effectively controls single loss
- Combining trend and stop loss realizes overall high winning rate trading
- Easy to enter the market and easy to stop loss, suitable for short term tracking

#### Risks of the Strategy

- SuperTrend indicator has repaint problems, cannot completely rely on signals to enter the market
- ATR indicator cannot completely adapt to violent fluctuations, stop loss is too close and tends to be stopped out
- The strategy itself cannot judge the quality of the trend and requires manual verification

Risk Mitigation Methods:
1) Manually verify the quality of the trend to avoid reverse operations during false breakouts 
2) Appropriately loosen the stop loss point to prevent being stopped out by small fluctuations during normal volatility

#### Optimization Directions

- Increase multifactor verification to judge trend quality
- Combine volatility indicators to dynamically adjust ATR parameters
- Add machine learning models to assist in judging entry and exit timing
- Optimize stop loss mechanism to prevent normal fluctuations from being stopped out

In summary, this strategy uses the SuperTrend indicator to determine the trend direction and sets stop loss and take profit with the ATR indicator to achieve low risk trend following trading. The strategy idea is clear and easy to understand. Parameters can be adjusted according to personal risk preferences. It is a versatile trend tracking strategy. However, the strategy itself cannot judge the quality of the trend, so it is recommended to use with other indicators or models to reduce the risk of misoperation.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Length|
|v_input_2|1.5|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Advanced Trend Strategy", overlay=true)

// Input parameters
length = input(14, title="ATR Length")
multiplier = input(1.5, title="Multiplier")
src = close

// Calculate ATR
atr_value = ta.atr(length)

// Calculate Supertrend
upst = src - multiplier * atr_value
downst = src + multiplier * atr_value

var float supertrend = na
var float trend_direction = na

if (na(supertrend))
    supertrend := upst

if (src > supertrend)
    supertrend := upst

if (src < supertrend)
    supertrend := downst

// Buy and Sell conditions
buyCondition = ta.crossover(src, supertrend)
sellCondition = ta.crossunder(src, supertrend)

// Execute Buy and Sell orders
if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.close("Buy")  // Close the long position

if (sellCondition)
    strategy.entry("Sell", strategy.short)

if (buyCondition)
    strategy.close("Sell")  // Close the short position

// Plot Supertrend
plot(supertrend, color=color.blue, title="Supertrend")

// Highlight bars based on trend direction
bgcolor(src > supertrend ? color.new(color.green, 95) : src < supertrend ? color.new(color.red, 95) : na)

// Plot ATR for reference
plot(atr_value, color=color.gray, title="ATR", linewidth=2)

// Plot arrows for buy and sell signals
plotshape(buyCondition, color=color.green, style=shape.triangleup, location=location.belowbar, size=size.small, title="Buy Signal")
plotshape(sellCondition, color=color.red, style=shape.triangledown, location=location.abovebar, size=size.small, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/435103

> Last Modified

2023-12-12 12:27:36
