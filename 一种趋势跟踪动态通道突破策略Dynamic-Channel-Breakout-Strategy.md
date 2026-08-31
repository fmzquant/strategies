
> Name

一种趋势跟踪动态通道突破策略Dynamic-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc4f1452ecbf19c185.png)

## Overview 

The Dynamic Channel Breakout Strategy is a trend following strategy. It uses the Donchian Channel indicator to dynamically determine the breakout buy and sell prices, combines the ATR indicator to set stop loss points, and achieves full automation of trade signal generation and stop loss exits.

## Principles

### Donchian Channel

The Donchian Channel is a dynamic channel indicator that forms upper and lower bands by calculating the highest and lowest prices over a certain period in the past. The upper band is the highest price in the past n periods, and the lower band is the lowest price in the past n periods. The Donchian Channel reflects the fluctuation range and potential trend of the market.

This strategy sets the Donchian Channel period to 20 days. When the price breaks through the upper rail, a buy signal is generated, indicating that the market has entered an upward trend. When the price falls below the lower rail, a sell signal is generated, indicating that the market has entered a downward trend.

### ATR Indicator  

The ATR indicator is the abbreviation for Average True Range, which reflects the average fluctuation amplitude of a certain asset over a recent period of time. ATR can automatically adapt to changes in market volatility frequency to more accurately reflect the actual volatility of the market in the recent period.

This strategy uses the 20-day ATR indicator to calculate the stop loss point. The larger the ATR value, the greater the market fluctuation, and the farther the set stop loss point. This prevents the stop loss point from being too close and knocked out by minor market fluctuations.

### Signal Generation

When the price breaks through the middle line of the Donchian Channel upwards, a buy signal is generated. When the price breaks through the middle line downwards, a sell signal is generated. This indicates that the price has started to break through this channel and enter a new round of trend.

At the same time, combined with the stop loss point calculated by the ATR indicator, when the loss reaches the stop loss point, the position will be actively stopped out to control risks.


## Advantage Analysis  

### Automatic Trend Tracking

The Donchian Channel is a trend tracking indicator. By dynamically adjusting the channel range, this strategy can automatically track changes in market trends and generate buy and sell signals accordingly. This avoids the subjectivity of manual judgment and makes the trading signals more objective and reliable.

### Two-way Trading

The strategy contains both long and short rules, which allows two-way trading. This expands the market environments where the strategy can be applied, enabling profitability in both uptrend and downtrend.  

### Risk Management

The stop loss mechanism of the ATR indicator can effectively control the loss of a single trade. This is especially important for quantitative trading to ensure that strategies obtain stable positive returns in events of high probability.


## Risk Analysis

### Trapping Risk

The Donchian Channel strategy has some risk of being trapped. If the price reverses and re-enters the channel without a stop loss, significant losses may be incurred. The ATR stop loss mechanism in this strategy helps mitigate such risk.  

### Trend Reversal Risk  

At trend reversals, the Donchian Channel indicator will generate erroneous signals. The user needs to pay attention to market conditions to avoid blind trades when significant trend reversals occur. Trend judgment indicators can be added to reduce such risk.

### Parameter Optimization Risk

The period parameters of both the Donchian Channel and the ATR stop loss need to be optimized, otherwise excessive incorrect signals may be generated. The parameters in this strategy are empirical. In real trading, they need to be optimized based on historical data.

## Optimization Directions  

### Add Trend Judgment 

Trend judgment indicators such as moving averages can be added to avoid erroneous signals at significant trend turning points.

### Parameter Optimization

Optimize Donchian Channel and ATR parameters to find the best combination. Appropriately shortening the channel cycle can catch trend turns faster.  

### Add Price Patterns  

Combine other auxiliary judgment indicators such as candlestick patterns and trading volume changes to improve signal accuracy and reduce unnecessary reversal trades.

## Conclusion

The Dynamic Channel Breakout Strategy locates the trend direction through the upper and lower bands of the Donchian Channel and generates trading signals. The ATR stop loss mechanism controls the risk. This strategy has a high degree of automation and is suitable for quantitative trading. Optimization spaces lie in parameter selection optimization and combining other auxiliary indicators to improve signal accuracy. In general, this strategy judges market trends accurately and has strong practicality.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|ATR Length:|
|v_input_2|2018|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2018|Backtest Start Year|
|v_input_6|12|testEndMonth|
|v_input_7|31|Backtest Start Day|
|v_input_8|20|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "dc",  overlay = true)
atrLength = input(title="ATR Length:", defval=20, minval=1)

testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testEndYear = input(2018, "Backtest Start Year")
testEndMonth = input(12)
testEndDay = input(31, "Backtest Start Day")
testPeriodEnd = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testPeriod() =>
    true
    //time >= testPeriodStart  ? true : false

dcPeriod = input(20, "Period")

dcUpper = highest(close, dcPeriod)[1]
dcLower = lowest(close, dcPeriod)[1]
dcAverage = (dcUpper + dcLower) / 2
atrValue=atr(atrLength)


useTakeProfit   = na
useStopLoss     = na
useTrailStop    = na
useTrailOffset  = na

Buy_stop = lowest(low[1],3) - atr(20)[1] / 3
plot(Buy_stop, color=red, title="buy_stoploss")
Sell_stop = highest(high[1],3) + atr(20)[1] / 3
plot(Sell_stop, color=green, title="sell_stoploss")

plot(dcLower, style=line, linewidth=3, color=red, offset=1)
plot(dcUpper, style=line, linewidth=3, color=aqua, offset=1)

plot(dcAverage, color=yellow, style=line, linewidth=3, title="Mid-Line Average")

strategy.entry("simpleBuy", strategy.long, when=(close > dcAverage) and cross(close,dcAverage))
strategy.close("simpleBuy",when=((close < dcAverage) and  cross(close,dcAverage)) or ( close< Buy_stop))
    
strategy.entry("simpleSell", strategy.short,when=(close < dcAverage) and cross(close,dcAverage) )
strategy.close("simpleSell",when=((close > dcAverage) and cross(close,dcAverage)) or ( close > Sell_stop))
    
//strategy.exit("Exit simpleBuy", from_entry = "simpleBuy", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
//strategy.exit("Exit simpleSell", from_entry = "simpleSell", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)


```

> Detail

https://www.fmz.com/strategy/439076

> Last Modified

2024-01-17 15:29:55
