
> Name

Fibonacci-Golden-Ratio-and-Relative-Strength-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ecd7b008a7cd35139.png)

### Overview

The Fibonacci golden ratio and relative strength index (RSI) strategy is an intraday trading strategy. It combines the Fibonacci golden ratio principle and the RSI indicator to issue buy or sell signals when price approaches golden ratio key points and RSI shows overbought or oversold status.  

### Strategy Logic

1. Calculate the price midline based on certain period of bars.  

2. Calculate golden ratio key points including 0.618 level and 1 level based on midline and standard deviation.  

3. When price approaches golden ratio key points, check if RSI enters overbought or oversold zone.

4. Issue buy or sell signals if both golden ratio rule and RSI condition are met.  

5. Set stop loss and take profit to control risks.

### Advantage Analysis

1. Combining multiple indicators improves signal quality and reduces false signals.  

2. Utilize support/resistance feature of golden ratio rule to ensure quality entry.

3. RSI measures market psychology to avoid extreme reversals.  

4. Suitable for high frequency intraday trading to accumulate profits from multiple small trades.

### Risk Analysis

1. Golden ratio cannot guarantee 100% price reversal.  

2. RSI may give misleading signals, needs to combine price action.

3. Too tight stop loss could be stopped out by price fluctuations.  

4. High frequency trading requires more trading costs and stricter risk control.

Solutions:  

1. Strictly follow stop loss rule to limit single trade loss.  

2. Loosen RSI parameters properly to avoid misleading signals.

3. Optimize stop loss point to reduce stopping out probability while ensuring effective stop loss.

### Optimization Directions  

1. Test results from different cycle period parameters.  

2. Try combining other indicators like MACD, Bollinger Bands etc to improve signal quality.

3. Research different stop loss strategies to find optimal configurations.  

4. Evaluate optimal holding period to balance profit and cost.

## Conclusion

The Fibonacci golden ratio and RSI strategy filters noise trades through dual confirmation. Compared to single indicator strategies, it generates higher quality trading signals. With parameter optimization and strict rule following, this strategy can become an effective intraday trading tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Stop Loss (%)|
|v_input_2|14|[RSI] Length|
|v_input_3|30|[RSI] Over Sold %|
|v_input_4|70|[RSI] Over Bought %|
|v_input_5|200|[Fibonacci] Length|
|v_input_6_hlc3|0|[Fibonacci] Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_7|3|[Fibonacci] Multiplier|
|v_input_8|764|[Fibonacci] Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MohamedYAbdelaziz

// Intraday Trading
// Best used for Short Timeframes [1-30 Minutes]
// If you have any modifications please tell me to update it

//@version=4
strategy(title="Fibonacci + RSI - Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=10000, currency=currency.USD)

// Inputs
timeFilter = year >= 2000
    // Stop Loss %
loss_percent = input(title="Stop Loss (%)", minval=0.0, step=0.1, defval=2) * 0.001
    // RSI Inputs
len = input(title="[RSI] Length", minval=0, step=1, defval=14)
overSold = input(title="[RSI] Over Sold %", defval=30)
overBought = input(title="[RSI] Over Bought %", defval=70)
    // Fibonacci Levels
length = input(title="[Fibonacci] Length", defval=200, minval=1)
src = input(hlc3, title="[Fibonacci] Source")
mult = input(title="[Fibonacci] Multiplier", defval=3.0, minval=0.001, maxval=50)
level = input(title="[Fibonacci] Level", defval=764)


// Calculate Fibonacci
basis = vwma(src, length)
dev = mult * stdev(src, length)
fu764= basis + (0.001*level*dev)
fu1= basis + (1*dev)
fd764= basis - (0.001*level*dev)
fd1= basis - (1*dev)

// Calculate RSI
vrsi = rsi(close, len)

// Calculate the Targets
targetUp = fd764
targetDown = fu764
    // Actual Targets
bought = strategy.position_size[0] > strategy.position_size[1]
exit_long = valuewhen(bought, targetUp, 0)
sold = strategy.position_size[0] < strategy.position_size[1]
exit_short = valuewhen(sold, targetDown, 0)

// Calculate Stop Losses
stop_long = strategy.position_avg_price * (1 - loss_percent)
stop_short = strategy.position_avg_price * (1 + loss_percent)

// Conditions to Open Trades
openLong = low < fd1 and crossover(vrsi[1], overSold)
openShort = high > fu1 and crossunder(vrsi[1], overBought)

// Conditions to Close Trades
closeLong = high > exit_long
closeShort = low < exit_short 


// Plots
plot(basis, color=color.blue, linewidth=2, title="[Fibonacci Level] Basis")
plot(fu764, color=color.white, linewidth=1, title="[Fibonacci Level] Short Target")
plot(fu1, color=color.red, linewidth=2, title="1", title="[Fibonacci Level] Top")
plot(fd764, color=color.white, linewidth=1, title="[Fibonacci Level] Long Target")
plot(fd1, color=color.green, linewidth=2, title="1", title="[Fibonacci Level] Bottom")


// Strategy Orders
if timeFilter
    // Entry Orders
    strategy.entry(id="Long", long=true, when=openLong and high < targetUp, limit=close)
    strategy.entry(id="Short", long=false, when=openShort and low > targetDown, limit=close)

    // Exit Orders
    strategy.exit(id="Long", when=closeLong and strategy.position_size > 0, limit=exit_long, stop=stop_long)
    strategy.exit(id="Short", when=closeShort and strategy.position_size < 0, limit=exit_short, stop=stop_short)
```

> Detail

https://www.fmz.com/strategy/437554

> Last Modified

2024-01-03 16:54:32
