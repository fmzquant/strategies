
> Name

EMA-Dual-Crossover-Fixed-Risk-Stop-Loss-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aae70800c516f5a39b.png)


#### Overview
This strategy employs a dual EMA crossover approach as trading signals, with the fast EMA having a period of 65 and the slow EMA having a period of 240. It also uses volume as a filter condition, only executing trades when the current volume exceeds a specified threshold. The strategy sets a fixed risk amount ($10) for each trade and dynamically calculates position sizes based on the risk amount. When the fast EMA crosses above the slow EMA and the volume condition is met, it enters a long position. Conversely, when the fast EMA crosses below the slow EMA and the volume condition is satisfied, it enters a short position. Stop loss and take profit levels are set based on fixed price distances, with the stop loss placed $100 below the entry price and the take profit placed $1500 above the entry price for long positions, and vice versa for short positions.

#### Strategy Principles
1. Calculate two EMA lines: the fast EMA (ema_fast) with a period of 65 and the slow EMA (ema_slow) with a period of 240.
2. Determine whether a bullish crossover (bullish_crossover) or a bearish crossover (bearish_crossover) occurs.
3. Set a volume threshold (volume_threshold) and only execute trades when the current volume exceeds this threshold.
4. Set a fixed risk amount (risk_per_trade) of $10 for each trade.
5. Calculate the position size (position_size) based on the risk amount and the stop loss distance (stop_loss_distance).
6. When a bullish crossover occurs and the volume condition is met, enter a long position with the stop loss set $100 below the entry price and the take profit set $1500 above the entry price.
7. When a bearish crossover occurs and the volume condition is met, enter a short position with the stop loss set $100 above the entry price and the take profit set $1500 below the entry price.

#### Strategy Advantages
1. The dual EMA crossover approach can effectively capture market trends, with the 65/240 period combination filtering out most noise and focusing on the main trends.
2. Introducing the volume filter condition helps avoid trading during periods of low volume, reducing market volatility risks.
3. The fixed risk amount position sizing method effectively controls the risk exposure of each trade, preventing excessive losses from a single trade.
4. The dynamic stop loss and take profit settings based on price distances allow for a larger profit potential than the loss potential, improving the long-term performance of the strategy.
5. Suitable for highly volatile instruments like BTC/USD, enabling the strategy to fully capture investment opportunities arising from price fluctuations.

#### Strategy Risks
1. As a trend-following indicator, EMA may lag in detecting trend reversals, potentially leading to delayed entries or exits.
2. The fixed risk amount may not dynamically adapt to market volatility conditions, resulting in suboptimal performance during extreme market movements (e.g., sharp rises or falls).
3. The setting of the volume threshold involves a certain level of subjectivity, and improper threshold settings may impact the strategy's effectiveness.
4. The fixed stop loss and take profit levels may not match the actual market volatility, leading to frequent stop-outs or profit-takings.
5. The strategy may underperform in choppy markets, with frequent crossovers potentially resulting in consecutive losing trades.

#### Strategy Optimization Directions
1. Consider introducing more EMA combinations as filter conditions, such as incorporating intermediate-term EMAs to build a multi-EMA system for improving signal reliability.
2. Optimize the position sizing approach, such as adopting a percentage risk method or the Kelly Criterion to dynamically adjust positions based on different market states.
3. Perform parameter optimization on the volume threshold to find the optimal threshold setting for enhancing strategy stability.
4. Optimize the stop loss and take profit level settings, adjusting them in real-time based on the latest market volatility conditions to increase flexibility and adaptability to the market.
5. Incorporate certain hedging components into the trend-following approach, such as utilizing counter-trend indicators like PSAR to assist in judging market oscillations and improve the strategy's ability to handle choppy markets.

#### Summary
This strategy employs a 65/240 dual EMA crossover as the basis for trend determination, combined with a volume filter condition to improve signal reliability. The fixed risk position sizing and fixed price stop loss/take profit settings can control risks to a certain extent and tilt the risk-reward ratio in a favorable direction. However, the strategy also faces issues such as relatively lagging trend detection, insufficient flexibility in position sizing, and lack of dynamic adjustments for stop loss and take profit levels. Future optimizations and improvements can focus on constructing a multi-EMA system, optimizing position sizing, implementing dynamic stop loss and take profit mechanisms, and incorporating hedging indicators to achieve more stable and reliable trading performance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-06 00:00:00
end: 2024-05-13 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy with 1:3 RR, Volume Filter, and Custom Stop Loss/Take Profit (BTC)", overlay=true, currency="USD", initial_capital=100)

// Define EMA lengths
ema_length_fast = 65
ema_length_slow = 240

// Calculate EMAs
ema_fast = ta.ema(close, ema_length_fast)
ema_slow = ta.ema(close, ema_length_slow)

// Define crossover conditions
bullish_crossover = ta.crossover(ema_fast, ema_slow)
bearish_crossover = ta.crossunder(ema_fast, ema_slow)

// Plot EMAs
plot(ema_fast, color=color.blue, title="Fast EMA")
plot(ema_slow, color=color.red, title="Slow EMA")

// Define volume filter
volume_threshold = 1000 // Adjust as needed

// Define risk amount per trade
risk_per_trade = 0.5 // $10 USD

// Calculate position size based on risk amount
stop_loss_distance = 100
take_profit_distance = 1500
position_size = risk_per_trade / syminfo.mintick / stop_loss_distance

// Execute trades based on crossovers and volume filter
if (bullish_crossover and volume > volume_threshold)
    strategy.entry("Buy", strategy.long, qty=position_size)
    strategy.exit("Exit", "Buy", stop=close - stop_loss_distance, limit=close + take_profit_distance)
if (bearish_crossover and volume > volume_threshold)
    strategy.entry("Sell", strategy.short, qty=position_size)
    strategy.exit("Exit", "Sell", stop=close + stop_loss_distance, limit=close - take_profit_distance)

```

> Detail

https://www.fmz.com/strategy/451392

> Last Modified

2024-05-14 15:48:48
