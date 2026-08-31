
> Name

基于双移动平均线突破策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7a5025622e3b3d9002.png)

### Overview  

This strategy calculates and plots the 20-period simple moving average (SMA) and 21-period exponential moving average (EMA), fills the color between them to visualize the price fluctuation zone. It generates buy signals when the price crosses above the 20-period SMA and sell signals when the price crosses below the 21-period EMA. The strategy also has trailing stop loss and take profit functions.  

### Strategy Logic

The core idea of the dual moving average crossover strategy is to use the crossovers between fast and slow moving averages as trading signals. The 20-period SMA responds faster to price changes while the 21-period EMA is slightly lagging but smoother. When the short-term and long-term trends are consistent, i.e. the two moving averages crossover up or down, it indicates the trend is strengthening and the trading decisions made will likely be more profitable.  

Specifically, when the closing price crosses above the 20-period SMA, it indicates that both short-term and long-term are in uptrends, so go long. When the closing price crosses below the 21-period EMA, it indicates that both short-term and long-term are in downtrends, so go short. The exit signals are opposite of the entry signals. For example, when price drops below the 20-period SMA, close long positions. When price crosses back above the 21-period EMA, close short positions.

The fill technique is also used to fill color between the two moving averages to form a visual indicator to aid in judging market trends.  

### Advantages

The dual moving average crossover strategy has the following advantages:

1. Simple logic and easy to understand and implement;  
2. Crossovers of the two moving averages reliably indicate changes in trend direction;
3. Visual indicator intuitively displays price fluctuation levels;
4. Trailing stop loss and take profit locks in profits and reduces risks; 
5. High extensibility for various optimizations based on this strategy.

### Risks

There are also some risks with this strategy:  

1. Prone to whipsaws and generating false signals during range-bound periods;
2. Improper stop loss and take profit settings may lead to losses or reduced profits;
3. Inadequate parameter tuning (e.g. period lengths) may adversely affect strategy performance;  
4. Automated trading may trigger consecutive losses.

The following measures can be adopted to address the above risks:

1. Add filters to avoid entering during choppy periods;
2. Optimize stop loss and take profit parameters to balance risk-return;
3. Test parameter robustness and select appropriate parameters for the market;
4. Manually intervene during exceptional circumstances to prevent enlarged losses.
   
### Enhancement Opportunities 

The strategy can be improved in the following aspects:

1. Add other technical indicator filters, such as volume and volatility, to avoid false breakouts;  
2. Dynamically optimize moving average parameters based on machine learning;
3. Incorporate sentiment and news analytics to improve decisions;  
4. Build in adaptive stop loss mechanism to adjust stop loss scale based on market conditions.

### Summary

This strategy identifies trend changes using crossovers between fast and slow moving averages, and makes corresponding long and short decisions. It has advantages like simplicity, intuitiveness and ease of implementation, but also bears some risks. The risks can be reduced and performance improved via parameter optimization, adding filters, manual oversight etc. The strategy has great extensibility and is worth in-depth research and application.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("BMSB Breakout Strategy", shorttitle="BMSB Breakout", overlay=true)

source = close
smaLength = 20
emaLength = 21

sma = ta.sma(source, smaLength)
ema = ta.ema(source, emaLength)

outSma = request.security(syminfo.tickerid, timeframe.period, sma)
outEma = request.security(syminfo.tickerid, timeframe.period, ema)

smaPlot = plot(outSma, color=color.new(color.red, 0), title='20w SMA')
emaPlot = plot(outEma, color=color.new(color.green, 0), title='21w EMA')

fill(smaPlot, emaPlot, color=color.new(color.orange, 75), fillgaps=true)

// Definir condiciones para la estrategia de compra y venta
buyCondition = ta.crossover(close, outSma)
sellCondition = ta.crossunder(close, outEma)

// Entrada larga (compra) y salida corta
strategy.entry("Long", strategy.long, when=buyCondition and not na(sellCondition))
strategy.close("Short", when=buyCondition)

// Entrada corta (venta) y salida larga
strategy.entry("Short", strategy.short, when=sellCondition and not na(buyCondition))
strategy.close("Long", when=sellCondition)

// Puedes ajustar la configuración de la estrategia y los valores predeterminados según tus preferencias

plotshape(series=buyCondition, location=location.belowbar, color=color.green, style=shape.triangleup, title="Buy Signal")
plotshape(series=sellCondition, location=location.abovebar, color=color.red, style=shape.triangledown, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/442921

> Last Modified

2024-02-27 13:51:51
