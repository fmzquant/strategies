
> Name

RSI-and-Bollinger-Bands-Profitable-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/834556d3211abbb416.png)


## Overview

This strategy mainly uses the RSI indicator and Bollinger Bands to design trading rules and make profits in trending markets. It goes long when RSI is below overbought line and price is near the Bollinger Bands lower band; it goes short when RSI is above oversold line and price is near the upper band. This is the basic trading logic.

## Strategy Logic

The strategy uses RSI indicator to identify overbought and oversold levels. RSI below the overbought threshold is considered oversold signal, while above oversold threshold is overbought signal. Bollinger Bands indicator is used to detect price breakouts. Upward breakout of the lower band is long signal, while downward breakout of upper band is short signal.

The strategy combines RSI for gauging market sentiment and Bollinger Bands for detecting price breakout. Trades are opened only when both conditions are met simultaneously. This helps filter out fake signals and improves strategy performance. 

## Strengths  

The strategy combines RSI and Bollinger Bands, which helps better determine market trend and capture momentum. Compared to single indicator strategies, it filters out more false signals and generates higher quality signals. RSI gauges overbought/oversold levels, while BB catches trend after the breakout. Together they work very effectively.

The strategy opens trades only when both RSI and BB give signals simultaneously. This avoids interference from fake signals. With stop loss in pace, risks can also be controlled when market turns around.  

## Risks Analysis

Although the strategy filters out some false signals, RSI and BB may still give out wrong signals simultaneously in ranging markets, causing unnecessary losses. Inappropriate parameter settings may also lead to poor strategy performance.  

It's recommended to optimize parameters through backtesting to find the best parameter combination. Also, consider pausing trading in ranging markets to avoid unnecessary losses. In addition, use stop loss properly to control single trade loss.

## Improvement Areas

The strategy can be improved in the following aspects:

1. Optimize RSI and BB parameters for best combination

2. Add other indicators as filter signals, like MACD, KD etc

3. Add breakthrough validation to avoid false breakouts  

4. Adjust parameters or stop trading per different market conditions

5. Optimize stop loss for dynamic stop loss

## Conclusion  

The strategy combines RSI and Bollinger Bands to design trading rules. By only taking signals when both agree, fake signals can be filtered out effectively. Through parameter optimization, adding signal filters, stop loss optimization etc., this strategy can be constantly refined for more stable profits.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|16|RSI Period Length|
|v_input_2|45|RSI Value Range|
|v_input_3|20|Bollinger Bands SMA Period Length|
|v_input_4|2|Bollinger Bands Standard Deviation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Get Funded Easily by mjanusic", shorttitle="FTMO Crusher by mjanusic", overlay=true)

///////////// RSI
RSIlength = input(16, title="RSI Period Length")
RSIvalue = input(45, title="RSI Value Range")
RSIoverSold = 0 + RSIvalue
RSIoverBought = 100 - RSIvalue
price = close
vrsi = ta.rsi(price, RSIlength)

///////////// Bollinger Bands
BBlength = input(20, title="Bollinger Bands SMA Period Length")
BBmult = input(2.0, title="Bollinger Bands Standard Deviation")
BBbasis = ta.sma(price, BBlength)
BBdev = BBmult * ta.stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
buyCondition = ta.crossover(vrsi, RSIoverSold) and ta.crossover(source, BBlower)
sellCondition = ta.crossunder(vrsi, RSIoverBought) and ta.crossunder(source, BBupper)

///////////// RSI + Bollinger Bands Strategy
if (not na(vrsi))
    if (buyCondition)
        strategy.entry("Long Entry", strategy.long, stop=BBlower, comment="Long Entry")
    else
        strategy.cancel(id="Long Entry")

    if (sellCondition)
        strategy.entry("Short Entry", strategy.short, stop=BBupper, comment="Short Entry")
    else
        strategy.cancel(id="Short Entry")

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_area)

```

> Detail

https://www.fmz.com/strategy/438018

> Last Modified

2024-01-08 11:14:31
