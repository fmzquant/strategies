
> Name

RSI-Crossover-Momentum-Cyclical-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c145165b1221647f54.png)

## Overview

The RSI Crossover Momentum Cyclical strategy is a quantitative trading strategy based on the Relative Strength Index (RSI) indicator. It generates buy and sell signals through RSI crossovers to achieve profitable trades. Buy signals are triggered when the RSI crosses above a user-defined threshold, while sell signals are triggered when the RSI falls below the threshold, closing positions gradually at a profit.

## Strategy Logic

The strategy is built upon the RSI indicator, which gauges a stock's momentum and overbought/oversold levels. It first calculates RSI values, then trades based on the relationship between the RSI and preset buy/sell thresholds. 

Specifically, when the RSI crosses above the buy threshold (default 60), a buy signal is generated. The strategy would then open a long position. Later when the RSI falls below the sell threshold (default 80), a sell signal occurs. The strategy would close the existing long position accordingly. By oscillating between the two thresholds, the momentum cycles back and forth to book profits.

The strategy is written in Pine Script using clear conditional logic for entries and exits. The RSI line is plotted with markers for buy/sell signals.

## Advantages

- Captures short-term trends effectively using price momentum
- Customizable RSI parameters adaptive to market changes  
- Clean modern code style, easy to understand
- Intuitive visualization of RSI curve and trade signals
- Customizable thresholds catering to personal needs

## Risks

- Higher risks in short-term trading, needing close monitoring  
- Potential false signals and RSI divergence  
- Overeager entries risking chase trades  
- No stop loss mechanism to limit losses

We can set stop loss, optimize RSI parameters, or add filters to improve it.

## Enhancement Opportunities

There are a few ways we can further optimize the strategy:

1. Add filters like moving averages to reduce false signals
2. Incorporate stop loss logic to control losses
3. Optimize RSI parameters for different stocks and markets
4. Develop adaptive systems that auto-adjust parameters  
5. Test different holding periods to find optimal combinations

## Conclusion

This basic example demonstrates using RSI for quant trading. We can build on it with more indicators and risk management techniques. In practice, rigorous optimization and customization based on personal risk tolerance is needed before application. With sound methodology, this strategy can become an effective quantitative investment tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Period|
|v_input_1|60|RSI Threshold for Buy|
|v_input_2|80|RSI Threshold for Sell|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Cross 60/80 Strategy", overlay=true)

// Input for RSI period
rsiPeriod = input.int(14, title="RSI Period", minval=1)

// Calculate RSI
rsiValue = ta.rsi(close, rsiPeriod)

// Input for RSI thresholds
rsiBuyThreshold = input(60, title="RSI Threshold for Buy")
rsiSellThreshold = input(80, title="RSI Threshold for Sell")

// Conditions for Buy and Sell signals
buySignal = ta.crossover(rsiValue, rsiBuyThreshold)
sellSignal = ta.crossunder(rsiValue, rsiSellThreshold)

// Plot RSI on the chart
plot(rsiValue, title="RSI", color=color.blue)

// Strategy entry and exit
if (buySignal)
    strategy.entry("Buy", strategy.long)

if (sellSignal)
    strategy.close("Buy")

// Plot Buy and Sell signals on the chart
plotshape(series=buySignal, title="Buy Signal", color=color.green, style=shape.labelup, location=location.belowbar)
plotshape(series=sellSignal, title="Sell Signal", color=color.red, style=shape.labeldown, location=location.abovebar)

```

> Detail

https://www.fmz.com/strategy/435251

> Last Modified

2023-12-13 15:41:33
