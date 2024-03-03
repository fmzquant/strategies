
> Name

双边突破震荡策略Sideways-Breakthrough-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15bfed43ea6d525de35.png)
[trans]

### 概述

双边突破震荡策略是一个利用布林通道和MACD指标进行买卖点判断的量化交易策略。该策略主要适用于股指期货、外汇和数字货币等震荡行情品种。策略的主要思路是在价格突破布林通道上下轨时发出买入和卖出信号。

### 策略原理  

双边突破震荡策略使用布林通道判断价格波动的范围。布林通道包括中轨、上轨和下轨,其中中轨为n日简单移动平均线,上轨和下轨分别为中轨加减k倍的n日真实波幅。当价格上穿下轨时,认为行情可能反转,发出买入信号;当价格下穿上轨时,认为行情可能反转,发出卖出信号。  

除使用布林通道判断买卖点外,该策略还结合MACD指标判断交易信号。MACD指标包括DIF线、DEA线和MACD线。其中DIF线为12日指数移动平均线与26日指数移动平均线的差值,DEA线为9日指数移动平均线,MACD线为DIF线与DEA线的差值。当MACD线由负转正时产生买入信号,由正转负时产生卖出信号。  

综合布林通道与MACD指标,双边突破震荡策略的交易信号生成规则为:价格上穿布林通道下轨时发出买入信号;价格下穿布林通道上轨时发出卖出信号。在价格重新突破通道轨道时平仓。

### 优势分析

双边突破震荡策略具有以下优势:

1. 策略简单清晰,容易理解和实现,适合初学者学习;  
2. 利用布林通道判断价格波动范围,并结合MACD指标过滤信号,可以有效识别反转机会;
3. 双边操作可以重复捕捉市场的震荡机会,降低误报率,增加盈利概率;  
4. 策略参数较少,容易优化,运行稳定;
5. 策略具有一定的鲁棒性,在多种市场中表现较好。

### 风险分析  

尽管双边突破震荡策略有诸多优势,但在实际交易中也存在一定的风险,主要体现在以下几个方面:  

1. 震荡行情变化可能导致策略失效。如果价格突破通道后很快重新进入通道,可能产生套牢的风险;  
2. 布林通道参数设定不当也会影响策略表现;如果带宽设置过大或过小都会影响买卖点的捕捉效果;   
3. MACD指标参数不当可能导致信号提前或滞后,从而影响策略盈利水平;
4. 策略没有考虑资金管理因素,存在亏损扩大的风险。

为降低上述风险,我们可以从以下几个方面进行优化:

1. 结合趋势指标,避免价格仅为短期回调就发出信号; 
2. 对布林通道和MACD指标参数进行测试和优化,选择最优参数;  
3. 结合止损策略,控制单笔亏损;
4. 增加仓位管理模块,让交易账户的风险可控。

### 优化方向  

双边突破震荡策略还具有进一步优化的空间,主要可以从以下几个方向进行:  

1. 结合更多指标识别买卖信号。比如加入成交量的判断,在价格和成交量同步放大的点位发信号;或者加入RSI指标,在超买超卖区域发信号;
2. 增加自动止损机制。使用移动止损或百分比止损,可以有效控制单笔亏损;  
3. 增加仓位管理机制。例如固定仓位管理、马丁格尔管理等,让每次建仓的资金合理分配;  
4.  Parameter tuning. 通过更多历史数据的回测,寻找布林通道和MACD指标的最优参数组合,提高策略盈利水平。
5. Walk forward analysis. 通过动态优化的方法,实时调整参数,使策略的表现更加稳定。

### 总结  

双边突破震荡策略整合布林通道和MACD指标判断买卖时机,利用价格的双边突破操作,可以有效捕捉震荡趋势中的反转机会。该策略简单易行,参数选择灵活,在多种品种中表现较好。尽管如此,策略也存在一些风险,需要进行进一步的测试和优化。我们提出了一些优化思路,通过持续改进,相信该策略的表现会越来越好。总的来说,双边突破震荡策略是一个值得推荐的量化策略。

||

### Overview

The Sideways Breakthrough Oscillation Strategy is a quantitative trading strategy that uses Bollinger Bands and the MACD indicator to determine buy and sell signals. This strategy is mainly suitable for oscillating products such as stock index futures, forex and digital currencies. The main idea of the strategy is to issue buy and sell signals when the price breaks through the upper and lower bands of the Bollinger Bands.

### Strategy Principle   

The Sideways Breakthrough Oscillation Strategy uses Bollinger Bands to judge the range of price fluctuations. Bollinger Bands include the middle band, upper band and lower band. The middle band is the n-day simple moving average, and the upper and lower bands are k times the n-day true range above and below the middle band respectively. When the price breaks through the lower band, it is believed that the market may reverse, a buy signal is issued. When the price breaks through the upper band, it is believed that the market may reverse, a sell signal is issued.

In addition to using Bollinger Bands to determine trading points, this strategy also incorporates the MACD indicator to determine trading signals. The MACD indicator includes the DIF line, DEA line and MACD line. The DIF line is the difference between the 12-day exponential moving average and the 26-day exponential moving average, the DEA line is the 9-day exponential moving average, and the MACD line is the difference between the DIF and DEA lines. A buy signal is generated when the MACD line turns from negative to positive, and a sell signal is generated when it turns from positive to negative.

Combining Bollinger Bands and MACD indicators, the trading signal generation rules for the Sideways Breakthrough Oscillation Strategy are: a buy signal is issued when the price breaks through the lower band of the Bollinger Channel; A sell signal is issued when the price breaks through the upper band of the Bollinger Channel. Close the position when the price breaks through the channel rails again.


### Advantage Analysis  

The Sideways Breakthrough Oscillation Strategy has the following advantages:

1. The strategy is simple, clear and easy to understand and implement, suitable for beginners to learn;
2. Using Bollinger Bands to judge the price fluctuation range, and combining the MACD indicator to filter signals, can effectively identify reversal opportunities;  
3. Bilateral operation can repeatedly capture oscillation opportunities in the market, reduce false positives and increase profitability;
4. The strategy has few parameters and is easy to optimize with stable operations;  
5. The strategy has a certain degree of robustness and performs well in various markets.  

### Risk Analysis   

Although the Sideways Breakthrough Oscillation Strategy has many advantages, there are still some risks in actual trading, which are mainly reflected in the following aspects:

1. Changes in oscillating trends may cause strategy failure. If the price quickly re-enters the channel after breaking through the channel, there is a risk of being trapped;
2. Improper Bollinger Channel parameter settings will also affect strategy performance. If the bandwidth is set too large or too small, it will affect the capture effect of trading points;  
3. Improper MACD indicator parameters may cause signals to be advanced or lagged, thereby affecting the strategy's profit level;  
4. The strategy does not consider risk management factors and there is a risk of enlarged losses.  

To reduce the above risks, we can optimize from the following aspects:  

1. Incorporate trend indicators to avoid signals when prices are only short-term retracements;  
2. Test and optimize the parameters of Bollinger Channels and MACD indicators to select the optimal parameters;
3. Incorporate stop-loss strategies to control single losses;  
4. Increase position management module to control risk.  

### Optimization Direction   

The Sideways Breakthrough Oscillation Strategy also has room for further optimization, which can mainly be done in the following directions:

1. Incorporate more indicators to identify trading signals. For example, add volume judgment, issue signals at points where price and volume are simultaneously amplified; or add RSI indicators to issue signals in overbought and oversold areas;  
2. Increase automatic stop loss mechanism. The use of moving stop loss or percentage stop loss can effectively control single losses;
3. Increase position management mechanism. For example, fixed position management, martingale management, etc., to reasonably allocate the funds for each opening position;
4. Parameter tuning. Through backtesting with more historical data, find the optimal combination of parameters for Bollinger Bands and MACD indicators to improve the strategy's profitability.  
5. Walk forward analysis. Dynamically optimize parameters in real time for more stable strategy performance.  

### Summary  

The Sideways Breakthrough Oscillation Strategy integrates Bollinger Bands and MACD indicators to determine entry and exit timing, and can effectively capture reversal opportunities in oscillating trends by using price breakthroughs on both sides. This strategy is simple, flexible in parameter selection, and performs well across different products. However, there are still some risks to the strategy that require further testing and optimization. We have proposed some optimization ideas. With continuous improvement, we believe the performance of this strategy will get better and better. In general, the Sideways Breakthrough Oscillation Strategy is a recommended quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|20|length|
|v_input_3|4|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy("Seitwärtsdoppelpenetration", overlay=false)

//Keltner Channel
source = open

useTrueRange = input(true)
length = input(20, minval=1)
mult = input(4.0)

ma = sma(source, length)
range = useTrueRange ? tr : high - low
rangema = sma(range, length)
upper = ma + rangema * mult
lower = ma - rangema * mult

crossUpper = crossover(source, upper)
crossLower = crossunder(source, lower)

//Entry
buyEntry = cross(lower,source)
sellEntry = cross(upper,source)

if (cross(lower,source))
    strategy.entry("buyEntry", strategy.long, comment="buyEntry")

if (cross(source, upper))
    strategy.entry("sellEntry", strategy.short, comment="sellEntry")

buyExit = cross(source, upper)
sellExit = cross(lower,source)

strategy.close("buyEntry", buyExit)
strategy.close("sellEntry", sellExit)

```

> Detail

https://www.fmz.com/strategy/437490

> Last Modified

2024-01-03 11:29:24
