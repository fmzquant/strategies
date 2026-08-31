
> Name

趋势追踪移动平均策略Trend-Following-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1906bfbf8840c7fdefd.png)

### Overview  

This strategy combines the Exponential Moving Average (EMA), Simple Moving Average (SMA) and Relative Strength Index (RSI) to implement an automated trading system that can profit from trending markets. It generates buy signals when the fast EMA crosses over the slow SMA from below, and sell signals when the fast EMA crosses below the slow SMA. The RSI indicator is used to detect overbought and oversold situations for stop loss purposes.

### Strategy Logic

1. EMA(50): 50-period Exponential Moving Average, representing short-term trend. 
2. SMA(100): 100-period Simple Moving Average, representing medium to long-term trend.
3. RSI(14): 14-period Relative Strength Index for identifying overbought/oversold levels.

When the short-term EMA(50) crosses over the medium-long term SMA(100), a buy signal is generated, indicating strengthening short-term trend, and we can follow the trend to buy.

When the EMA(50) crosses below the SMA(100), a sell signal is generated. It means that the short-term momentum has been exhausted, and we should follow the trend to sell out.  

If RSI is greater than 70 (overbought zone), it generates a profit-taking signal. If RSI is less than 30 (oversold zone), it generates a stop-loss signal.


### Advantage Analysis   

This is a very classic trend following strategy using moving averages. It incorporates both trend tracking and overbought/oversold detection, which allows us to capture the major trend while avoiding buying at the peak on short-term spikes. The strategy works well in markets with significant sector rotations. For example, at the early stage of a bull market, the overall index shows a strong upward trend, but occasional medium-term corrections are common. The moving average strategy can capture the major uptrend while getting out timely during trend reversal. Compared to traditional tracking and stop loss methods, the moving averages strategy is more stable, with less violent drawdowns. In addition, this strategy is very simple and easy to understand. The parameters are convenient to adjust. Therefore it is a very friendly method for beginners.  

### Risk Analysis

The biggest problem of moving average strategy is that it does not address the disconnect between "price" and "value". Near the end of an uptrend, price often overshoots way above the reasonable valuation range. If we focus only on the price action itself regardless of valuation, it inevitably leads to over-exposure during the final stage. At that time the short-term EMA(50) and medium-term SMA(100) may still show a strong upward trend, generating "buy signals", while the actual price has been severely overvalued. Continuing to buy at the peak in this case means facing huge drawdown risk later. Therefore, this strategy fits better for the growing stage of the markets, and we need rational judgement on the major trend direction.

Also, the overbought/oversold criteria relies solely on a single RSI indicator here, which can easily cause false signals. For instance, there could be short-term price spikes with RSI above 70, while substantial upside momentum still exists in the market afterwards. Premature profit-taking signals in this case may miss opportunities. So further optimization is needed regarding risk control. 


### Improvement Directions   

1. Incorporate more indicators for overbought/oversold judgment to avoid false signals, e.g. adding KD indicator etc.

2. Add more metrics to judge the medium-long term trend, e.g MACD etc, to detect the divergence between price and value .

3. Use different parameter sets for varying market conditions. For example, increase the SMA period if the trend is clearer.  

4. Consider taking profits partially instead of a full exit around overbought/oversold zones, keeping core positions.


### Conclusion   

In general, the simple moving average strategy is a very practical quantitative approach. It is stable, easy to understand and optimize, one of the best choices for quant beginners. Its biggest advantage is to ride the major trends and avoid repeatedly buying tops and selling bottoms. Also it provides some degree of risk protection.  However we must recognize its limitations in failing to send early warning signals around major turning points. So investors need to track trends patiently and take profits in time.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|70|Overbought Level|
|v_input_3|30|Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-30 00:00:00
end: 2024-02-29 00:00:00
period: 5h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wallstwizard10

//@version=4
strategy("Estrategia de Trading", overlay=true)

// Definir las EMA y SMA
ema50 = ema(close, 50)
sma100 = sma(close, 100)

// Definir el RSI
rsiLength = input(14, title="RSI Length")
overbought = input(70, title="Overbought Level")
oversold = input(30, title="Oversold Level")
rsi = rsi(close, rsiLength)

// Condiciones de Compra
buyCondition = crossover(ema50, sma100) // EMA de 50 cruza SMA de 100 hacia arriba

// Condiciones de Venta
sellCondition = crossunder(ema50, sma100) // EMA de 50 cruza SMA de 100 hacia abajo

// Salida de Operaciones
exitBuyCondition = rsi >= overbought // RSI en niveles de sobrecompra
exitSellCondition = rsi <= oversold // RSI en niveles de sobreventa

// Lógica de Trading
if (buyCondition)
    strategy.entry("Buy", strategy.long)
    
if (sellCondition)
    strategy.entry("Sell", strategy.short)
    
if (exitBuyCondition)
    strategy.close("Buy")
    
if (exitSellCondition)
    strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/443244

> Last Modified

2024-03-01 12:21:13
