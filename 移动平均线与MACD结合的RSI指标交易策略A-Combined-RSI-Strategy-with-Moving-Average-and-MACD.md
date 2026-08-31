
> Name

移动平均线与MACD结合的RSI指标交易策略A-Combined-RSI-Strategy-with-Moving-Average-and-MACD

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b5ef41c0b59bc24a9e.png)

## Overview  

This strategy identifies price trends and makes buy low sell high decisions by combining moving averages, the MACD indicator and the RSI indicator. It generates buy signals when the short period moving average crosses above the long period moving average and the close price is above the 50-day moving average. It generates sell signals when the opposite happens. In addition, the strategy uses the RSI indicator to avoid overbought and oversold zones, and the MACD histogram to determine the intermediate-to-long term trend.

## Strategy Logic

The core of this strategy relies on the dual moving average crossover system, which generates buy and sell signals when a short period EMA (3-day) crosses over a long period EMA (30-day). This is a common technique to determine short-term and long-term trend of the price.  

In addition, the strategy incorporates a 50-day moving average line to avoid frequent trading, using it as a filter for trade signals. Only above the 50-day line will buy signals trigger, and vice versa.

Moreover, the RSI indicator identifies overbought (above 70) and oversold (below 30) scenarios. The strategy will skip taking positions even if MA crossover signals emerge in these irrational zones. 

Finally, the MACD histogram is used to determine the intermediate-to-long term trend of the market. With MACD histogram > 0, the background is uptrend so buy signals are more reliable. When MACD histogram < 0, the background is downtrend so buy signals may face corrections soon.

## Pros

The biggest advantage of this strategy is the combinational use of multiple indicators, which makes every trading decision highly confident and reliable. False signals can happen to individual indicators quite often, while this strategy improves accuracy by confirming signals in terms of short-term trend, long-term trend, overbought/oversold status, intermediate trend, etc.

Another advantage is that it combines trend trading and mean reversion trading. Following the trend is pivotal for trend traders, but advanced strategies won't be rigid about it. Taking contrarian positions in rational zones can also lead to lucrative excess returns. 

## Risks 

Major risks come from sudden price shocks due to significant news events, which may penetrate stop loss points and incur big losses. Policy changes can also create disruptions to the strategy performances.  

Another risk is being stopped out during temporary pullbacks in an intermediate-to-long term bull market. The strategy may fail to capture the full upside potentials if stopped out prematurally.

## Enhancements

The strategy can be optimized in the following dimensions:

1. Parameter optimization to find the optimal combinations. 

2. Incorporate more indicators like Bollinger Bands and KDJ to enrich the model.

3. Test more advanced stop loss mechanisms like trailing stop loss and volatility stop loss.

4. Optimize parts of the strategy to adapt to more types of markets.

## Conclusion

In conclusion, by combining moving averages, RSI and MACD, this strategy manages to generate high-quality signals and avoid limitations of single indicators. It makes every trade confidently by confirming the trend. Also, the strategy balances trend trading and contrarian trading, excelling in both chasing the momentum and taking anticyclical positions when appropriate. It is a solid and efficient quantitative strategy overall.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Length|
|v_input_int_2|70|RSI Overbought Level|
|v_input_int_3|30|RSI Oversold Level|
|v_input_1|3|EMA 3 Length|
|v_input_2|30|EMA 30 Length|
|v_input_3|50|EMA 50 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('sachin 3.30 ', overlay=true)

// Input parameters
length = input.int(14, title='RSI Length', minval=1)
overbought = input.int(70, title='RSI Overbought Level', minval=0, maxval=100)
oversold = input.int(30, title='RSI Oversold Level', minval=0, maxval=100)
ema3_length = input(3, title='EMA 3 Length')
ema30_length = input(30, title='EMA 30 Length')
ema50_length = input(50, title='EMA 50 Length')

// Calculate EMAs
ema3 = ta.ema(close, ema3_length)
ema30 = ta.ema(close, ema30_length)
ema50 = ta.ema(close, ema50_length)

// Calculate RSI
rsiValue = ta.rsi(close, length)

// Calculate MACD
[macdLine, signalLine, hist] = ta.macd(close, 12, 26, 9)

var float buyPrice = na

// Buy condition: EMA 3 crosses above EMA 30 and price is above EMA 50
buyCondition = ta.crossover(ema3, ema30) and close > ema50
if (buyCondition)
    buyPrice := close
    strategy.entry('Buy', strategy.long)

// Exit long position when close is below EMA30 and below the low of the previous 3 candles after the buy entry
exitLongCondition = close < ema30 and close < ta.lowest(low, 3) and close < buyPrice
if (exitLongCondition)
    strategy.close('BuyExit')

// Sell condition: EMA 3 crosses below EMA 30 and price is below EMA 50
sellCondition = ta.crossunder(ema3, ema30) and close < ema50
if (sellCondition)
    strategy.entry('Sell', strategy.short)

// Exit short position when close is above EMA30 and above the high of the previous 3 candles after the sell entry
exitShortCondition = close > ema30 and close > ta.highest(high, 3)
if (exitShortCondition)
    strategy.close('SellExit')

// Plot EMAs on the chart
plot(ema3, color=color.new(color.blue, 0), title='EMA 3')
plot(ema30, color=color.new(color.red, 0), title='EMA 30')

// Change color of EMA 50 based on MACD histogram
ema50Color = hist > 0 ? color.new(color.blue, 0) : hist < 0 ? color.new(color.black, 0) : color.new(color.blue, 0)
plot(ema50, color=ema50Color, title='EMA 50 Colored')

// Change color of EMA 30 based on RSI trend
ema30Color = rsiValue > oversold ? color.new(color.green, 0) : rsiValue < overbought ? color.new(color.red, 0) : color.new(color.blue, 0)
plot(ema30, color=ema30Color, title='EMA 30 Colored')

// Highlight Buy and Sell signals on the chart
bgcolor(buyCondition ? color.new(color.green, 90) : na)
bgcolor(sellCondition ? color.new(color.red, 90) : na)

// Plotting Buy and Sell Signals on the Chart until strategy exit
barcolor(strategy.position_size > 0 and rsiValue > overbought ? color.new(color.yellow, 0) : strategy.position_size < 0 and rsiValue < oversold ? color.new(color.black, 0) : na)

```

> Detail

https://www.fmz.com/strategy/442233

> Last Modified

2024-02-20 14:28:59
