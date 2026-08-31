
> Name

RSI50_EMA-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f8b046a78409c41320.png)


#### Overview
The strategy named "RSI50_EMA Long Only Strategy" mainly uses the crossover signals of two technical indicators, Relative Strength Index (RSI) and Exponential Moving Average (EMA), to make trading decisions. It opens a long position when the price breaks above the upper band of EMA from below and RSI is above 50, and closes all long positions when the price breaks below the lower band of EMA from above or RSI falls below 50. This strategy only takes long positions and does not short, it is a trend-following strategy.

#### Strategy Principle
1. Calculate EMA and ATR to get the upper and lower bands of EMA.
2. Calculate RSI.
3. When the closing price crosses above the upper band of EMA and RSI is above 50, open a long position.
4. When the closing price crosses below the lower band of EMA or RSI falls below 50, close all long positions.
5. Only long, no short.

#### Strategy Advantages
1. Suitable for use in a strong market, can effectively capture the upward trend of strong stocks.
2. Uses both EMA and RSI indicators to better confirm trend signals and improve signal reliability.
3. Position management uses percentage stop loss, risk is controllable.
4. The code logic is clear and simple, easy to understand and implement.

#### Strategy Risks
1. Prone to frequent trading and large drawdowns in volatile markets.
2. Improper parameter selection can lead to signal failure. For example, improper selection of EMA length will lead to lagging trend judgment; improper selection of RSI upper and lower limits will lead to undesirable entry and exit points.
3. The strategy can only capture unilateral upward trends, and cannot grasp downward and oscillating trends, easy to miss opportunities.

#### Strategy Optimization Directions
1. Introduce trend confirmation indicators, such as MACD, to improve the accuracy of trend judgment.
2. Optimize parameters for RSI, or introduce RSI divergence and other improvements to signals.
3. Consider adding trailing stop loss or volatility stop loss to improve risk control.
4. Consider adding reversal entry logic in oscillating markets and downward trends.

#### Summary
The RSI50_EMA Long Only Strategy is a simple and easy-to-use trend-following strategy based on RSI and EMA, suitable for use in unilateral upward trends. The strategy has clear logic and obvious advantages, but also has some shortcomings and risks. By introducing more auxiliary indicators, optimizing parameters, improving risk control and other measures, the stability and profitability of the strategy can be further improved. However, in actual application, it is necessary to flexibly adjust and improve according to market characteristics, personal risk preferences and other factors.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-05 00:00:00
end: 2024-05-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("RSI50_EMA Long Only Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(11, type=input.integer, minval=1, title="Length")
mul = input(2, type=input.float, minval=0, title="Multiplier")
rsicap = input(50, type=input.integer, minval=1, title="rsicap")
rsi_1 = rsi(close,20)
price = sma(close, 2)
average = ema(close, len)
diff = atr(len) * mul
bull_level = average + diff
bear_level = average - diff
bull_cross = crossover(price, bull_level) 
RENTRY = crossover(rsi_1,rsicap)
bear_cross = crossover(bear_level, price)
EXIT = crossunder(rsi_1,50)

strategy.entry("Buy", strategy.long, when=bull_cross)
strategy.close("Buy", when=bear_cross)  //strategy.entry("Sell", strategy.short, when=bear_cross)
if (RENTRY)
    strategy.entry("RSI", strategy.long, when=bull_cross)
if (EXIT)
    strategy.close("RSICLose", when=bull_cross)  //strategy.entry("Sell", strategy.short, when=bear_cross)

plot(price, title="price", color=color.black, transp=50, linewidth=2)
a0 = plot(average, title="average", color=color.red, transp=50, linewidth=1)
a1 = plot(bull_level, title="bull", color=color.green, transp=50, linewidth=1)
a2 = plot(bear_level, title="bear", color=color.red, transp=50, linewidth=1)
fill(a0, a1, color=color.green, transp=97)
fill(a0, a2, color=color.red, transp=97)

```

> Detail

https://www.fmz.com/strategy/451027

> Last Modified

2024-05-11 11:49:29
