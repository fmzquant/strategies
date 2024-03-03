
> Name

趋势追踪移动平均策略Trend-Following-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1906bfbf8840c7fdefd.png)
[trans]

### 概述

该策略通过组合使用指数移动平均线(EMA)、简单移动平均线(SMA)和相对强弱指数(RSI)指标,实现了一个可以在趋势行情中获利的自动交易系统。 当快速移动平均线从下方上穿慢速移动平均线时,构成买入信号;当快速移动平均线从上方下穿慢速移动平均线时,构成卖出信号。RSI指标则用于判断超买超卖情况,以便及时止损。

### 策略原理  

1. EMA(50):50周期的指数移动平均线,代表短期趋势指标。
2. SMA(100):100周期的简单移动平均线,代表中长期趋势指标。  
3. RSI(14): 14周期的相对强弱指数,判断是否超买超卖。

当短期趋势指标EMA(50)上穿中长期趋势指标SMA(100)时,产生买入信号,表明短期趋势变强,可以跟踪买入。  

当EMA(50)下穿SMA(100)时,产生卖出信号,表明短期内力量消耗完毕,应当跟踪卖出。  

如果RSI大于70(超买区),产生止盈信号,如果RSI小于30(超卖区)时,产生止损信号。

### 优势分析

这是一个非常经典的追踪趋势的移动平均策略。它融合了趋势跟踪与超买超卖判断,既可以抓住市场主要趋势,又可以避免追高买入,乱割短线。该策略在一些具有明显风格轮动的市场中效果较好。比如牛市初期,指数整体呈现强势上升趋势,但是过程中也不乏中期调整,移动平均策略可以抓住主要的上升行情。当中长期趋势发生逆转时,就会产生止损信号,可以避免市场崩盘导致的前期收益归零。因此,该策略适合做长线追踪。与传统的追踪止损相比,移动平均策略更加稳定,少了山型回撤的烦恼。此外,该策略非常简单明了,容易理解,参数调整也非常方便,这对初学者来说是一个非常容易上手的方法。

### 风险分析  

移动平均策略最大的问题在于,它并没有解决“价格与值的背离”这个根本问题。在市场上升行情即将结束之际,价格往往已经严重超出合理的基本面价值估值区间,如果仍然只盯着价格本身的趋势,那必然导致最后阶段的超额暴露。这时短期指标EMA(50) 和 中长期指标SMA(100) 均呈现强势向上,产生“买入信号”,但实际上价格已经严重被高估。这时如果继续追高买入,将面临巨额回撤的风险。因此这种策略更适合于市场的增长阶段,需要理性判断大趋势的方向。

另外,该策略判断超买超卖区的标准较为简单,只用一个RSI指标。这很容易产生误判。比如行情短期内出现突破,RSI指标显示超买,但实际上后市仍有继续上涨的动力。如果此时产生止盈信号,则可能错失机会。所以风险控制这块还需要进一步优化。

### 优化方向  

1. 结合更多指标判断超买超卖,避免误判。可以考虑加入KD指标等。
2. 加入更多中长期趋势判断指标,例如MACD等。避免价格与价值背离的风险。 
3. 不同市场条件参数设置不同。例如趋势更为明显时,可以适当加大SMA周期。
4. 可以考虑只在超买超卖区附近部分止盈,继续持有核心仓位。

### 总结  

总的来说,简单移动平均策略是一个非常实用的量化策略。它稳定、简单,容易理解和优化,属于量化入门的最佳选择之一。该策略最大的优势就是抓大趋势,避免了追高杀跌的重复错误。此外它也具有一定的止损保护功能。但我们也需要清醒认识到它的不足,在大趋势转折点前无法给出提前警示。所以投资者需要耐心追踪,并适时止盈。

|| 

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

[/trans]

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
