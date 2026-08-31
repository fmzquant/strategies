
> Name

Trend-Following-Strategy-Based-on-Ichimoku-Cloud

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117a4dcc02c6ddb184b.png)
 ## Overview

This is a simple trend following strategy based on daily candlesticks. It uses the Ichimoku Cloud to determine the trend direction and track it with the Chikou Span. It goes long when the Chikou Span crosses above the equilibrium lines and exits when it crosses below. This strategy is suitable for medium-to-long term trend trading and aims for steady profits.  

## Strategy Logic

The strategy mainly relies on three lines of the Ichimoku Cloud: Senkou Span A, Senkou Span B and the Chikou Span. Senkou Span A and B are used to determine the major trend direction – above the cloud is bullish and below is bearish. The Chikou Span generates trading signals. 

Specifically, if the Chikou Span crosses above Senkou Span B from below, it is a buy signal; if it crosses below from above, it is a sell signal. The strategy simply follows this logic to trade.

## Advantage Analysis

- Uses Ichimoku Cloud to determine trend, avoiding false signals from short-term fluctuations and ensuring reliability of trading signals
- Only buys and sells around trend turning points, fully capturing profit opportunities from medium-to-long term trends  
- Relatively low trading frequency, helps reduce commissions and slippage costs
- Simple and clear rules, easy to understand and implement, suitable for beginners

## Risk Analysis

- As a trend following strategy, it may suffer frequent stop loss in ranging markets and fail to profit
- The equilibrium lines may give wrong trend readings during violent swings, resulting in unnecessary losing trades
- Referencing historical data means delayed reaction to sudden events, possibly missing best entry points
- Risk of overtrading still exists in long run, position sizing needs adjustment

## Improvement Directions 

- Consider optimizing position sizing based on market volatility
- Try changing parameters like Senkou Span periods or stop loss levels
- Incorporate other indicators like MACD, KD to avoid false signals
- Add machine learning algorithms to auto tune parameters for more market regimes

## Conclusion

This is a very classic medium-to-long term trend following strategy built on Ichimoku Cloud with simple and easy-to-grasp rules, and certain advantages in filtering out noises and capturing trends. But some typical weaknesses exist as well which require vigilance and proper enhancements for more steady profits. Overall a good strategy for beginners to learn algorithmic trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("My Custom Strategy", overlay=true)

// Ichimoku Cloud components
tenkanSenPeriods = 9
kijunSenPeriods = 26
displacement = 26

highTenkanSen = ta.highest(high, tenkanSenPeriods)
lowTenkanSen = ta.lowest(low, tenkanSenPeriods)
tenkanSen = (highTenkanSen + lowTenkanSen) / 2

highKijunSen = ta.highest(high, kijunSenPeriods)
lowKijunSen = ta.lowest(low, kijunSenPeriods)
kijunSen = (highKijunSen + lowKijunSen) / 2

chikouSpan = close[displacement]

// Buy condition: Chikou Span crosses over both Tenkan Sen and Kijun Sen
buyCondition = chikouSpan > tenkanSen[displacement] and chikouSpan > kijunSen[displacement]
if (buyCondition)
    strategy.entry("Buy", strategy.long)

// Sell condition: Chikou Span crosses down both Tenkan Sen and Kijun Sen
sellCondition = chikouSpan < tenkanSen[displacement] and chikouSpan < kijunSen[displacement]
if (sellCondition)
    strategy.close("Buy")

plot(tenkanSen, color=color.red)
plot(kijunSen, color=color.blue)
plot(chikouSpan, color=color.green, offset=-displacement)

```

> Detail

https://www.fmz.com/strategy/435699

> Last Modified

2023-12-18 10:20:01
