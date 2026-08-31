
> Name

Momentum-Breakthrough-EMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb59654b99268ddf7a.png)

## Overview  

This strategy is a trend-following strategy that enters positions when price momentum changes and breaks through moving averages, aiming to capture trending moves in stock prices.

## Strategy Logic

The core logic of this strategy is:

When today's closing price is higher than yesterday's high price, and yesterday's high price did not touch the 5-day EMA line, go long. This is the breakthrough signal indicating the stock price is breaking out upwards.  

After entering, set the stop loss to the low of the previous bar minus 100 points. Take profit is set to the entry price multiplied by the configured risk-reward ratio (default is 2). If price continues going up, trailing stop can be used to lock in more profit.

The above covers the basic trading logic of this strategy.

## Advantage Analysis

This strategy has the following advantages:

1. Captures trending moves in stock prices with large profit potential. Particularly suitable for riding price momentum during accelerating up or down trends.  

2. Filters out choppy price action using EMA. Avoids over-trading in ranging markets.

3. Breakout signals are clear and robust. Reduces false breakouts.   

4. Good risk control. Stops loss on a per trade basis to protect capital.

5. Simple and clear strategy logic that is easy to understand and optimize.

## Risk Analysis  

There are also some risks to this strategy:

1. Chasing trends runs the risk of missing major market turning points. Needs to monitor higher timeframe trends and manage overall position size.

2. Breakout trading is prone to false breakout risks. Requires checking with volume analysis to confirm valid breakouts. 

3. Inappropriate stop loss placement can cause stops being too wide or too tight. Needs tuning based on market volatility and personal risk preferences.  

4. Profit targets set too high may not be reached if prices reverse. Should consider using trailing stops to lock in profits.

## Optimization Directions

Some ways this strategy can be further optimized:

1. Optimize parameters like MA periods, stop loss size etc. to fit different stocks and market conditions better. Stepwise optimization and genetic algorithms can test combinations of parameters.

2. Add volume confirmation. Volume can validate the authenticity of breakout signals. Can set volume breakouts to filter entry signals.

3. Monitor larger timeframe trends. Ensure trading in alignment with major trends. For example only trade short when in a downward trend. 

4. Use dynamic trailing stops. When price reaches targets, trailing stop moves to lock in profits instead of using fixed take profit points. This maximizes trend following profit.

5. Add machine learning algorithms like neural networks or random forests for trade signal generation. Can significantly improve strategy stability and win rate. 

## Summary  

This strategy captures trending moves by detecting price momentum changes, using EMA filter and stop loss methods. Though simple, this breakout system has advantages and room for improvement. We can make the strategy more robust and efficient by optimizing parameters, adding supporting indicators, adjusting stops etc. to handle complex and ever-changing market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|false|Offset|
|v_input_2|2|Risk-Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom Strategy", overlay=true)

len = input.int(9, minval=1, title="Length")
src = input(close, title="Source")
offset = input.int(0, title="Offset", minval=-500, maxval=500)

ema5 = ta.ema(src, len)

// Condition for Buy Entry
buy_condition = close > high[1] and high[1] < ema5

// Set Target and Stop Loss
risk_reward_ratio = input(2.0, title="Risk-Reward Ratio")
target_price = close + (high[1] - low[1]) * risk_reward_ratio
stop_loss_price = low[1] - 100

// Execute Buy Order
if (buy_condition)
    strategy.entry("Buy", strategy.long)

// Exit conditions
if (strategy.position_size > 0)
    strategy.exit("Take Profit/Stop Loss", from_entry="Buy", profit=target_price, loss=stop_loss_price)

// Plotting
plot(ema5, title="EMA", color=color.blue, offset=offset)
plotshape(series=buy_condition, title="Buy Entry Signal", color=color.green, style=shape.triangleup, size=size.small, location=location.belowbar)

```

> Detail

https://www.fmz.com/strategy/441086

> Last Modified

2024-02-05 14:51:12
