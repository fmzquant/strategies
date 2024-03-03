
> Name

动量突破ATR波动率策略Momentum-Breakthrough-ATR-Volatility-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15e6a28cd806778c5cc.png)

[trans]

### 概述

本策略利用简单移动平均线组合双均线策略,辅以ATR波动率指标判断市场波动率。当短周期均线上穿长周期均线时判断为多头市场,做多入场。当短周期均线下穿长周期均线时判断为空头市场,做空入场。同时结合成交量加权平均价VWAP判定均线信号的可靠性。此外,结合RSI指标避免反转。用ATR波动率指标判断市场波动率,从而选择较低波动率时段交易。

### 策略原理  

核心部分是双均线策略。双均线策略一般选取短期均线和长期均线,如50日均线和200日均线。当短期均线上穿长期均线时产生买入信号。当短期均线下穿长期均线时产生卖出信号。双均线策略判断市场长短期趋势的变化,通过均线的突破来捕捉趋势的转折点。

本策略中选取了50日均线作为短周期均线,200日均线作为长周期均线。结合成交量加权平均价VWAP判断均线信号的可靠性。即只有当均线信号和VWAP同向时才入场。这样可以过滤掉一些假信号。 

另外加入RSI指标避免买入过头和卖出过头。RSI高于70时避免买入,RSI低于30时避免卖出。

最后通过ATR平均波动幅度指标判断市场的波动率和风险水平。ATR值大于1.18时定义为高波动,这时通过改变背景色提示风险较高,可以暂时避开交易,等待波动率降低后的时机。

### 优势分析

本策略优势主要体现在三个方面:

1. 双均线捕捉市场中长期趋势的转折点,利用趋势交易获得较大利润。

2. 结合VWAP过滤假信号,提高信号的可靠性。

3. 引入RSI指标避免逆市交易,可以减少亏损。

4. 应用ATR波动率指标判断市场风险状况,避开高波动时段,可以降低损失。

5. 各种指标组合使用简单明了,容易理解实现,适合量化交易入门。

### 风险分析

本策略也存在一些风险:  

1.双均线产生信号时,价格可能已经发生较大变动,存在被套利的风险。解决方法是降低均线周期,加快指标反应速度。

2.VWAP可能出现误差,导致过滤掉正确的交易信号。解决方法是辅以其他指标确认。  

3.在趋势末期,RSI可能长时间处于超买超卖区域,导致错过趋势反转点。解决方法是结合其他指标确认,如MACD。  

4.ATR判断市场波动时可能存在滞后。解决方法是结合最高价、最低价等判断市场波动。

5.收益可能达不到预期,需要适当调整参数。

### 优化方向  

本策略还存在很大优化空间:  

1.测试更多均线组合,寻找最佳参数。  

2.加入更多辅助指标过滤信号。比如MACD,KDJ等。

3.优化止损止盈参数,降低亏损,提高盈利。

4.评估强势股和弱势股的交易策略差异性,进行分类建模。

5.结合机器学习算法如RNN等,实现参数的自动优化和策略评估。

6.开发自动交易系统,连接 실盘进行回测验 .

### 总结  

本策略整体来说是一个较为简单的趋势追踪策略。核心运用双均线判断长短期趋势。结合VWAP和RSI对信号进行处理,应用ATR评估风险。策略思路简单,容易理解操作。通过一定优化空间,可以获得较好的收益。作为量化交易入门选择,是非常适合的。

||

### Overview  

This strategy utilizes a combination of simple moving average double moving average strategy, supplemented by ATR volatility index to determine market volatility. When the short-term average line crosses above the long-term average line, it is determined as a bull market and a long position is taken. When the short-term average line crosses below the long-term average line, it is determined as a bear market and a short position is taken. At the same time, the reliability of the moving average signal is judged by combining the volume weighted average price VWAP. In addition, RSI indicator is incorporated to avoid reversals. The ATR volatility index is used to determine market volatility so as to select trading during lower volatility periods.

### Strategy Principle   

The core is the double moving average strategy. The double moving average strategy typically selects a short-term moving average and a long-term moving average, such as the 50-day moving average and the 200-day moving average. A buy signal is generated when the short-term moving average crosses above the long-term moving average. A sell signal is generated when the short-term moving average crosses below the long-term moving average. The double moving average strategy judges changes in long-term and short-term market trends, and uses moving average breakthroughs to capture trend turning points.  

This strategy selects the 50-day moving average as the short-term moving average and the 200-day moving average as the long-term moving average. Combined with the volume weighted average price VWAP to determine the reliability of the moving average signal. That is, only enter the market when the moving average signal is aligned with VWAP. This filters out some false signals.   

In addition, the RSI indicator is incorporated to avoid overbuying and overselling. Avoid buying when RSI is above 70 and avoid selling when RSI is below 30.  

Finally, the average amplitude of fluctuation of the ATR indicator is used to determine the volatility and risk level of the market. When the ATR value is greater than 1.18, it is defined as high volatility. At this point, by changing the background color, the higher risk is prompted and trading can be avoided temporarily until the volatility decreases.  

### Advantage Analysis  

The main advantages of this strategy are reflected in three aspects:  

1. The double moving average captures the turning point of the medium and long-term trend in the market, and uses the trend trading to obtain relatively large profits.

2. Combine VWAP to filter false signals and improve signal reliability.  

3. Introduction of RSI indicator to avoid trading against the market, which can reduce losses.

4. Application of ATR volatility index to determine market risk conditions avoids high volatility periods, which can reduce losses.

5. The combination of various indicators is simple and easy to understand and implement, suitable for quantitative trading entry.

### Risk Analysis   

This strategy also has some risks:   

1. When the moving average generates a signal, the price may have changed greatly, posing the risk of overtrading. The solution is to reduce the cycle of the moving average to speed up the reaction speed of the indicator.  

2. VWAP may have errors, resulting in filtering out correct trading signals. The solution is to confirm with other indicators.

3. At the end of the trend, RSI may stay in the overbought/oversold area for a long time, missing the turning point of the trend reversal. The solution is to combine other indicators to confirm, such as MACD.  

4. ATR may lag when judging market volatility. The solution is to combine the highest price, the lowest price, etc. to determine market volatility.  

5. The return may not meet expectations and parameters need to be adjusted accordingly.  

### Optimization Direction   

There is still great room for optimization in this strategy:  

1. Test more moving average combinations to find optimal parameters.  

2. Add more auxiliary indicators to filter signals. Such as MACD, KDJ etc.  

3. Optimize stop loss and take profit parameters to reduce losses and increase profits.  

4. Evaluate the difference in trading strategies between strong stocks and weak stocks for classification modeling.  

5. Incorporate machine learning algorithms such as RNN to automatically optimize parameters and evaluate strategies.  

6. Develop automated trading systems and connect to live trading for backtesting.  

### Summary   

Overall, this strategy is a relatively simple trend tracking strategy. The core uses double moving averages to determine long and short term trends. Combine VWAP and RSI to process signals and apply ATR to assess risks. The strategy idea is simple and easy to understand and operate. Through some optimization space, good returns can be obtained. As a choice for quantitative trading entry, it is very suitable.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Simple Moving Averages", overlay=true)

sma50 = ta.sma(close, 50)
sma200 = ta.sma(close, 200)
vwap = ta.vwap(close)
rsi = ta.rsi(close, 14)
[diPlus, diMinus, adx_val] = ta.dmi(14, 14)
atr_val = ta.atr(14)

plot(sma50, color=color.new(color.green, 0))
plot(sma200, color=color.new(color.red, 0))
plot(vwap)

longCondition = ta.crossover(sma50, sma200) and vwap > close
shortCondition = ta.crossunder(sma50, sma200) and vwap < close

if (longCondition)
    strategy.entry("Long", strategy.long)
    
if (shortCondition)
    strategy.entry("Short", strategy.short)

barcolor = sma50 > sma200 ? (vwap < close ? (rsi < 70 ? color.green : color.blue) : color.yellow) : (sma50 < sma200 ? (vwap > close ? (rsi > 30 ? color.red : color.orange) : color.yellow) : na)
barcolor(barcolor)
bgcolor(adx_val > 25 and atr_val > 1.18 ? color.new(color.gray, 50) : color.new(color.black, 50), transp=90)

// ADX and ATR Label Box
// label.new(bar_index, high, "ADX: " + str.tostring(adx_val, "#.##") + "\nATR: " + str.tostring(atr_val, "#.##"), color=color.new(color.white, 0), textcolor=color.new(color.black, 0), style=label.style_labeldown, yloc=yloc.price, xloc=xloc.bar_index, size=size.small, textalign=text.align_left)

// Exit conditions (optional)
strategy.close("Long", when = ta.crossunder(sma50, sma200))
strategy.close("Short", when = ta.crossover(sma50, sma200))

// Take Profit and Stop Loss
takeProfitPercentage = 5
stopLossPercentage = 3

strategy.exit("Take Profit / Stop Loss", "Long", profit = takeProfitPercentage, loss = stopLossPercentage)
strategy.exit("Take Profit / Stop Loss", "Short", profit = takeProfitPercentage, loss = stopLossPercentage)
```

> Detail

https://www.fmz.com/strategy/438480

> Last Modified

2024-01-12 13:50:44
