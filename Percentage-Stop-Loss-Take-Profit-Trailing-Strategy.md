
> Name

Percentage-Stop-Loss-Take-Profit-Trailing-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview 

This is a simple trend following strategy that uses SMA to determine trend direction and sets percentage-based stop loss and take profit to lock in profits and control risk. It belongs to the moving stop loss strategy category.

## Strategy Logic

The strategy first calculates a 200-day SMA line. When price crosses above the SMA line, it signals an uptrend and goes long. After entering, the strategy uses a fixed percentage stop loss level, such as 2% below entry price, and a fixed percentage take profit level, such as 1% above entry price. It will close the position when either level is touched.

Specifically, the strategy uses close price crossing above the 200-day SMA as the trading signal. When close goes above SMA, it enters long. After entry, the strategy records entry price, and calculates stop loss = entry price * (1 - stop loss %); take profit = entry price * (1 + take profit %). If price drops below stop loss or rises above take profit, it will close the long position.

This way, the strategy can lock in profit as long as price moves in the right direction. If a loss occurs, it will be limited by the stop loss. By adjusting the percentages, profit and risk can be customized.

## Advantage Analysis

- Simple to implement

Using SMA for trend and percentage stop loss/take profit is straightforward and easy to implement.

- Limits loss per trade

The pre-set stop loss keeps the loss below a fixed percentage, helping to control risk.

- Trailing stop locks in profit

Take profit level moves up with profit increase, helping to lock in gains instead of being stopped out.

- Customizable profit/loss characteristics 

The percentages can be adjusted to define profit and risk parameters.

## Risk Analysis

- Whipsaws in ranging market

In choppy range-bound markets, stop loss may be frequently hit leading to small losses.

- SMA lags price

SMA itself lags price, can miss best entry timing.

- Ignores trading costs

Small stop/take profit settings increase frequency, without considering trading costs.

- Static percentage stop loss 

Percentage stop loss does not adapt to volatility changes. Easily taken out during big moves.

## Improvement Directions

- Optimize parameters for market

Adjust SMA parameters, test different stop/take percentages to find optimal balance.

- Dynamic stop based on volatility

Adjust stop percentage based on recent volatility to lower chance of stop out.

- Backtest with real trading costs

Incorporate slippage, commission costs for backtest to optimize take profit.

- Multi-session backtests

Separately backtest on high and low activity sessions to find best parameters.

## Summary

This strategy combines SMA for trend and percentage stop/take for profit management in a simple format while allowing profit/risk tuning. But its signals and stop setting can be improved. Aspects like volatility adaptive stops, trading costs etc should be considered to achieve steady results on a simple basis.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|SMA Lookback Period|
|v_input_2|2|Stop Loss %|
|v_input_3|true|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-25 00:00:00
end: 2023-09-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Stop Loss Example: Simple Stoploss", overlay=true)

sma_per = input(200, title='SMA Lookback Period', minval=1)
sl_inp = input(2.0, title='Stop Loss %', type=float)/100
tp_inp = input(1.0, title='Take Profit %', type=float)/100

sma = sma(close, sma_per)

stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)

strategy.entry("Simple SMA Entry", strategy.long, when=crossover(close, sma))

strategy.exit("Stop Loss/TP","Simple SMA Entry", stop=stop_level, limit=take_level)

plot(sma, color=orange, linewidth=2)
plot(stop_level, color=red, style=linebr, linewidth=2)
plot(take_level, color=green, style=linebr, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/427821

> Last Modified

2023-09-25 18:09:14
