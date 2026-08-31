
> Name

Trend-Detection-Strategy-Based-on-Price-Action-Principles

> Author

ChaoZhang

> Strategy Description



### Overview

The core idea of this strategy is to determine the current trend direction based on the relationship between the high point and closing price of K-line bars, and smooth the results using moving average lines. When there are more high closing bars, it is determined as an upward trend. When there are more low closing bars, it is determined as a downward trend. This strategy is suitable for any digital asset with certain liquidity, and better results can be obtained through parameter optimization.

### Strategy Logic

This strategy uses M-minute bars. According to the position relationship between the closing price and the high and low points, it is determined whether the M-minute K-line bar belongs to a high closing type (closing price close to high point), low closing type (closing price close to low point) or normal type (closing price close to middle).

Specifically, first calculate delt = high - close, which is the difference between the high point and the closing price, and height = high - low, which is the difference between high and low. If delt > height * 2/3, it is determined as a high closing type. If delt < height/3, it is determined as a low closing type, otherwise it is a normal type. 

Then count the number of high closing, low closing and normal types in the most recent N K-line bars, calculate the percentage they account for, and use EMA to smooth them into rise, fall and middle curves. The rise curve represents the percentage of high closing bars, the fall curve represents the percentage of low closing bars, and the middle curve represents the percentage of normal bars.

When the rise curve crosses above the fall curve, it means that high closing bars begin to increase, indicating the market is entering an upward trend, and a long signal is issued. When the fall curve crosses below the rise curve, it means low closing bars begin to increase, indicating the market is entering a downward trend, and a short signal is issued.

### Advantages of the Strategy

This price action based trend judgment strategy has the following advantages:

1. The principle is clear and easy to understand and master.

2. It does not rely on any indicators, but purely judges the trend direction based on the characteristics of the price itself.

3. There are few configurable parameters, mainly N and EMA smoothing parameters, which are easy to optimize.

4. It can be widely applied to any digital asset with certain liquidity, including stocks, forex, cryptocurrencies, etc.

5. The backtest results are good, and risks can be strictly controlled. 

6. It can be further combined with trendlines, support/resistance levels and other technical methods for optimization.

7. Stop loss strategies can be configured to control single loss.

### Risks of the Strategy

Despite the advantages, the strategy also has the following risks:

1. When the market is in a shock state, the K-line type switches frequently, which may generate false signals.

2. Improper N and EMA parameter settings may lead to missing trends or too many invalid signals.

3. Judging the trend direction solely based on K-line types has some lag. 

4. It cannot effectively filter common chart patterns like triangle convergence, flags, etc., with the risk of reverse breakthroughs.

5. This strategy belongs to trend following, and cannot effectively capture reversal opportunities.

6. Stop loss should be used to control the risk of loss, otherwise single loss can be large.

### Directions for Strategy Optimization

To reduce risks and improve profitability, the strategy can be optimized in the following aspects:

1. Combine volatility indicators like ATR to adjust N and EMA parameters based on market volatility, avoiding excessive invalid signals in range-bound markets.

2. Add Volume analysis to filter false breakouts in high volume conditions.

3. Combine trendlines and key support/resistance levels to determine trend direction and breakthrough authenticity.

4. Add multiple timeframe analysis to avoid misjudgments on a single timeframe.

5. Add pattern recognition modules to reverse positions in a timely manner when significant reversal signals appear.

6. Optimize stop loss strategies based on market volatility and risk preference. 

7. Add trailing stop loss, moving stop loss etc. to lock in profits and prevent giving back.

### Summary

This strategy judges trend direction based on price action. The logic is clear and backtest results are good. It can be widely applied to crypto trading. But there are also some limitations. It needs to be combined with stop loss and optimizations to reduce risk. Overall, this strategy provides a simple and practical idea for quant trading and is worth learning from. With continuous optimizations and combinations, stable excess returns can be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|lenght|
|v_input_2|5|ema_smooth|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("trend detect", overlay=false)


lenght = input(34)
ema_smooth = input(5)

delt = high - close
height = high - low

color_plot=black
state=0

if delt > height/3*2
    state := 1
    color_plot := red
else
    if delt > height/3
        state := 2
        color_plot := blue
    else 
        state := 3
        color_plot := green
//plot(state, color=color_plot, style=histogram)
percOfType(len, state_for_count) =>
    num = 0
    for i=1 to len
        if state[i]==state_for_count
            num := num+1
    num/len*100
    
rise = ema(percOfType(lenght, 3), ema_smooth)
fall = ema(percOfType(lenght, 1), ema_smooth)
plot(rise, color = green)
plot(ema(percOfType(lenght, 2), ema_smooth), color = blue)
plot(fall, color = red)
plot(10, color=black)
plot(60, color=black)

longCondition = crossover(rise, fall)
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(rise, fall)
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427342

> Last Modified

2023-09-20 11:11:46
