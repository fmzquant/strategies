
> Name

Dual-Moving-Average-Trading-Strategy-440078

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19593d399da9dc214da.png)

## Overview  

The Dual Moving Average Trading Strategy is a quantitative trading strategy that constructs trading signals using two moving average lines with different cycles. This strategy judges market trends and opportunities by calculating the relationship between the two moving average lines and has good tracking performance in trending markets.

## Strategy Principle  

The core technique this strategy utilizes is the analysis of two moving average lines. The strategy defines a 5-day short cycle moving average line ma0 and a 21-day long cycle moving average line ma1. By comparing the difference values osc0 between price and ma0 and osc1 between ma0 and ma1, the strategy determines the current trend status.  

When osc0>0 and osc1>0, it means the short-term moving average line has crossed above the long-term line, indicating a bullish trend. When osc0<0 and osc1<0, it means the short-term line has crossed below, indicating a bearish trend. The strategy takes long position when a bullish trend is identified and takes short position when a bearish trend is identified.

After taking positions, the strategy keeps monitoring the real-time change of osc0 and osc1 to judge the profit range of the position. When osc0<0 and osc1<0 after taking long position, it means a trend reversal, so the long position should be closed. When osc0>0 and osc1>0 after taking short position, it also means a reversal, so the short position should be closed.

## Advantage Analysis   

The Dual Moving Average Trading Strategy has the following advantages:

1. Simple principle and easy to understand and implement, suitable for quant trading beginners;  

2. Trend following, good at tracking trending markets with decent profit;

3. The cycle parameters of the moving averages can be adjusted for different market conditions;  

4. Can be combined with other indicators or strategies for greater profits.

## Risk Analysis

There are also some risks with this strategy:   

1. Unable to exit positions timely when trend reverses, may lead to huge losses;

2. Difficult to profit in range-bound markets due to frequent stop loss;

3. Hard to optimize parameters like 5-day and 21-day cycles;  

4. Lagging trading signals, late market entrance, may influence profit rate.

## Optimization Directions   

The Dual Moving Average Trading Strategy can be optimized from the following aspects:

1. Combine with VOL to confirm real trend start, avoid false breakouts; 

2. Add other filters like price breakout, volume expansion to ensure signal reliability;

3. Set dynamic stops to cut losses in time;

4. Optimize parameters like the threshold of moving average difference to reduce errors;

5. Utilize machine learning to auto optimize the cycles of the moving averages.

## Conclusion  

In conclusion, the Dual Moving Average Trading Strategy is a quite classic and practical trend following strategy. It has simple logic for beginners to practice, good at tracking trends, highly extensible to combine with other techniques. But it also has some flaws, further optimizations are needed to handle exceptional market conditions, reduce risk and improve stability.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|length0|
|v_input_2|21|length1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("[STRATEGY][RS]MA Strategy test V0", overlay=true)
length0 = input(5)
length1 = input(21)

isinsession = not na(time('1', '0400-1500'))
price = open

ma0 = ema(ema(price, length0), length0)
ma1 = ema(ema(price, length1), length1)
plot(ma0, color=navy)
plot(ma1, color=black)

osc0 = price-ma0
osc1 = ma0-ma1

isbull = osc0 > 0 and osc1 > 0
buy_condition = isinsession and isbull and not isbull[1]
buy_exit_condition = osc0 < 0 and osc1 < 0
strategy.entry("buy", strategy.long, comment="buy", when=buy_condition)
strategy.close(id='buy', when=buy_exit_condition)

isbear = osc0 < 0 and osc1 < 0
sell_condition = isinsession and isbear and not isbear[1]
sell_exit_condition = osc0 > 0 and osc1 > 0
strategy.entry("sell", strategy.short, comment="sell", when=sell_condition)
strategy.close(id='sell', when=sell_exit_condition)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/440078

> Last Modified

2024-01-26 14:45:55
