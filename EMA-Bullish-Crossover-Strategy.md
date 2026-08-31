
> Name

EMA-Bullish-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b08e83a41b482da2fa.png)

#### Overview
This strategy utilizes three exponential moving averages (EMAs) with different periods and the Relative Strength Index (RSI) to determine market trends and trading signals. A buy signal is generated when the price breaks above the 200-day EMA and the RSI is above 50, while a sell signal is generated when the price falls below the 200-day EMA and the RSI is below 50. The strategy is suitable for swing trading on the daily timeframe.

#### Strategy Principles
1. Calculate the 200-day, 50-day, and 21-day EMAs, represented by blue, red, and green lines, respectively.
2. Calculate the 14-period RSI.
3. Generate a buy signal when the closing price crosses above the 200-day EMA and the RSI is above 50.
4. Generate a sell signal when the closing price crosses below the 200-day EMA and the RSI is below 50.
5. Position size is 1% of the account balance.
6. For buy trades, the stop loss is set 50 points below the 200-day EMA, and the take profit is set 100 points above the entry price.
7. For sell trades, the stop loss is set 50 points above the 200-day EMA, and the take profit is set 100 points below the entry price.

#### Strategy Advantages
1. Combining price and momentum indicators helps capture trend formation and reversal timings.
2. Three EMAs with different periods provide a comprehensive view of short, medium, and long-term trends, reducing signal frequency and false signals.
3. RSI filters out trading signals in choppy markets, reducing losing trades.
4. Fixed percentage position sizing helps control risk.
5. Setting stop losses and take profits protects against single-trade risk.

#### Strategy Risks
1. Signal lag at trend turning points may lead to partial profit loss.
2. RSI signals may generate premature reverse signals in strong trends.
3. Fixed percentage position sizing may be riskier in highly volatile markets.
4. Stop loss levels too close to the 200-day EMA may result in frequent stop-outs.

#### Strategy Optimization Directions
1. Introduce more medium and long-term moving average combinations to optimize signals.
2. Consider RSI divergences and overbought/oversold conditions to adjust signals.
3. Dynamically adjust position sizing based on volatility indicators like ATR.
4. Optimize stop loss and take profit levels based on support/resistance levels, percentages, or ATR.
5. Introduce trend filtering conditions, such as the ADX indicator, to avoid trading in choppy markets.
6. Perform parameter optimization and backtesting validation for different instruments and timeframes.

#### Summary
By utilizing trading signals based on EMA bullish crossovers and RSI in the bullish zone, this strategy can capture relatively clear medium to long-term trend moves. However, its performance may be average during early trend reversals and choppy markets, making it more suitable for trending markets overall. Further optimizations can be made in terms of signals, position sizing, stop losses and take profits, and filtering conditions to improve the strategy's stability and risk-adjusted returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Lexi Supreme", overlay=true)

// Calculate EMA 200
ema200 = ta.ema(close, 200)

// Calculate EMA 50
ema50 = ta.ema(close, 50)

// Calculate EMA 21
ema21 = ta.ema(close, 21)

// Calculate RSI
rsiValue = ta.rsi(close, 14)

// Buy condition: RSI above 50 and price crosses above EMA 200
buyCondition = ta.crossover(close, ema200) and rsiValue > 50

// Sell condition: RSI below 50 and price crosses below EMA 200
sellCondition = ta.crossunder(close, ema200) and rsiValue < 50

// Position Size (1% of account balance)
positionSize = 1

// Stop Loss and Take Profit values for buy trades
stopLossBuy = ema200 - 0.00050
takeProfitBuy = 0.00100

// Stop Loss and Take Profit values for sell trades
stopLossSell = ema200 + 0.00050
takeProfitSell = 0.00100

// Plot EMA 200 line in blue
plot(ema200, color=color.blue, title="EMA 200")

// Plot EMA 50 line in red
plot(ema50, color=color.red, title="EMA 50")

// Plot EMA 21 line in green
plot(ema21, color=color.green, title="EMA 21")

// Plot buy entry points in yellow
plotshape(series=buyCondition, title="Buy Signal", color=color.yellow, style=shape.triangleup, location=location.belowbar, size=size.small)

// Plot sell entry points in white
plotshape(series=sellCondition, title="Sell Signal", color=color.white, style=shape.triangledown, location=location.abovebar, size=size.small)

// Strategy entry and exit conditions with position size, stop loss, and take profit for buy trades
if (buyCondition)
    strategy.entry("Buy", strategy.long, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss Buy", from_entry="Buy", stop=stopLossBuy, limit=close + takeProfitBuy)

// Strategy entry and exit conditions with position size, stop loss, and take profit for sell trades
if (sellCondition)
    strategy.entry("Sell", strategy.short, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss Sell", from_entry="Sell", stop=stopLossSell, limit=close - takeProfitSell)

```

> Detail

https://www.fmz.com/strategy/454361

> Last Modified

2024-06-17 16:24:35
