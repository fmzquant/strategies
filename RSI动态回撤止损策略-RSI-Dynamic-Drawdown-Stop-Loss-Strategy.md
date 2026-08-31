
> Name

RSI动态回撤止损策略-RSI-Dynamic-Drawdown-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f5c5dfad07345b6208.png)


#### Overview
This strategy is based on the Wyckoff Methodology, combining the Relative Strength Index (RSI) and Volume Moving Average (Volume MA) to identify the accumulation and distribution phases of the market, generating buy and sell signals. Additionally, the strategy employs a dynamic drawdown stop-loss mechanism to control risk by setting a maximum drawdown threshold.

#### Strategy Principle
1. Calculate the RSI indicator and Volume Moving Average.
2. When the RSI crosses above the oversold area and the volume is greater than the Volume MA, it identifies the market's accumulation phase and generates a buy signal.
3. When the RSI crosses below the overbought area and the volume is greater than the Volume MA, it identifies the market's distribution phase and generates a sell signal.
4. The strategy simultaneously tracks the account's maximum equity and current drawdown. If the current drawdown exceeds the set maximum drawdown threshold, the strategy closes all positions.
5. Buy positions are closed during the distribution phase or when the drawdown exceeds the maximum drawdown, while sell positions are closed during the accumulation phase or when the drawdown exceeds the maximum drawdown.

#### Strategy Advantages
1. By combining RSI and volume indicators, the strategy can more accurately capture the accumulation and distribution phases of the market.
2. The dynamic drawdown stop-loss mechanism effectively controls the strategy's maximum drawdown, reducing overall strategy risk.
3. Suitable for 5-minute high-frequency data, allowing quick response to market changes and timely position adjustments.

#### Strategy Risks
1. RSI and volume indicators may generate misleading signals under certain market conditions, leading to incorrect trading decisions by the strategy.
2. The setting of the maximum drawdown threshold needs to be adjusted according to market characteristics and personal risk preferences; improper settings may lead to premature position closing or excessive risk-taking.
3. The strategy may generate frequent trading signals in choppy markets, increasing trading costs.

#### Strategy Optimization Directions
1. Consider introducing other technical indicators such as MACD, Bollinger Bands, etc., to improve the accuracy of the strategy's signals.
2. Optimize the parameters of the RSI and volume indicators, such as adjusting the length of the RSI, overbought/oversold thresholds, etc., to adapt to different market conditions.
3. In addition to drawdown stop-loss, incorporate trailing stop-loss or profit protection mechanisms to further control risk and lock in profits.

#### Summary
The RSI Dynamic Drawdown Stop-Loss Strategy identifies the accumulation and distribution phases of the market by combining RSI and volume indicators while employing a dynamic drawdown stop-loss mechanism to control risk. The strategy considers both market trend and risk management, making it practical to some extent. However, the strategy's performance depends on the choice of indicator parameters and market characteristics, requiring continuous optimization and adjustment to improve its stability and profitability.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-07 00:00:00
end: 2024-06-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Wyckoff Methodology Strategy with Max Drawdown", overlay=true)

// Define input parameters
length = input(14, title="RSI Length")
overbought = input(70, title="RSI Overbought Level")
oversold = input(30, title="RSI Oversold Level")
volume_length = input(20, title="Volume MA Length")
initial_capital = input(10000, title="Initial Capital")
max_drawdown = input(500, title="Max Drawdown")

// Calculate RSI
rsi = ta.rsi(close, length)

// Calculate Volume Moving Average
vol_ma = ta.sma(volume, volume_length)

// Identify Accumulation Phase
accumulation = ta.crossover(rsi, oversold) and volume > vol_ma

// Identify Distribution Phase
distribution = ta.crossunder(rsi, overbought) and volume > vol_ma

// Plot RSI
hline(overbought, "Overbought", color=color.red)
hline(oversold, "Oversold", color=color.green)
plot(rsi, title="RSI", color=color.blue)

// Plot Volume and Volume Moving Average
plot(volume, title="Volume", color=color.orange, style=plot.style_histogram)
plot(vol_ma, title="Volume MA", color=color.purple)

// Variables to track drawdown
var float max_equity = initial_capital
var float drawdown = 0.0

// Update max equity and drawdown
current_equity = strategy.equity
if (current_equity > max_equity)
    max_equity := current_equity
drawdown := max_equity - current_equity

// Generate Buy and Sell Signals
if (accumulation and drawdown < max_drawdown)
    strategy.entry("Buy", strategy.long)
if (distribution and drawdown < max_drawdown)
    strategy.entry("Sell", strategy.short)

// Plot Buy and Sell signals on chart
plotshape(series=accumulation, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY")
plotshape(series=distribution, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL")

// Close positions if drawdown exceeds max drawdown
if (drawdown >= max_drawdown)
    strategy.close_all("Max Drawdown Exceeded")

// Set strategy exit conditions
strategy.close("Buy", when=distribution or drawdown >= max_drawdown)
strategy.close("Sell", when=accumulation or drawdown >= max_drawdown)

// Display drawdown on chart
plot(drawdown, title="Drawdown", color=color.red, linewidth=2, style=plot.style_stepline)




```

> Detail

https://www.fmz.com/strategy/453660

> Last Modified

2024-06-07 15:47:51
