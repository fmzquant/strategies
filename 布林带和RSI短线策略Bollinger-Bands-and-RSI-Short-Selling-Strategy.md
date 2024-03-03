
> Name

布林带和RSI短线策略Bollinger-Bands-and-RSI-Short-Selling-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/191f647a64855f85373.png)

[trans]

## 概述

布林带和RSI短线策略是一个以布林带和相对强弱指数(RSI)为基础的短线交易策略。它结合了布林带判断市场是否过热和RSI判断市场动能的方法,寻找做空机会。当股价突破布林带上轨,且RSI大于70时,认为行情过热,此时做空;当布林带下轨突破股价时,认为行情转冷,平仓止损。

## 策略原理

该策略主要基于两个指标:

1. 布林带。布林带由中轨、上轨和下轨组成。中轨是n天的移动平均线,上下轨分别是中轨上下n*标准差所构成。当价格从下轨反弹到上轨时,认为行情过热;当价格从上轨回落到下轨时,认为行情冷却。

2. RSI。RSI通过比较一段时间内的平均涨幅和跌幅,来判断涨势和跌势的强弱。RSI大于70时表示股价行情过热,小于30时表示股价行情超卖。

具体交易逻辑为:

1. 当股价上穿布林带上轨,且RSI大于70时,符合布林带过热信号和RSI超买信号,因此做空;

2. 当股价下破布林带下轨时,行情转冷,因此平仓止损;

该策略同时设置了止损和止盈:

1. 止损设置为入场价*(1+1%),即承受1%的亏损; 

2. 止盈设置为入场价*(1-7%),即获得7%的盈利后平仓。

## 策略优势

该策略具有以下优势:

1. 结合布林带和RSI两个指标,避免单一技术指标判断失误的概率;

2. 利用布林带上下轨和RSI过买过卖区域判断入场和出场时机,精准定位短线交易机会;

3. 在入场前设置止损和止盈点位,可控制风险;

4. 简单明确的交易逻辑,容易理解实施;

5. 可灵活设置布林带和RSI参数,适应不同周期和市场环境。

## 策略风险 

尽管该策略具有以上优势,也存在一定风险需要规避:

1. 布林带和RSI皆为追随趋势的指标,不适合震荡或无明确方向的行情;

2. 无法保证止损和止盈总是会被完美触发;

3. 极端行情可能会突破止损位,带来超出预期的亏损;

4. 需要不断优化布林带和RSI参数以适应市场变化。

对应风险规避方法:

1. 结合志愿者锚定移动平均等基础指标判断局部趋势方向,避免无谓反转;

2. 适当缩小持仓规模,多组合多策略,分散风险;

3. 提高止损幅度或设置超级止损来应对极端行情;

4. 根据实盘测试结果持续调整布林带和RSI参数设置。

## 策略优化方向

该策略可考虑以下几个方向进一步优化:

1. 结合其它指标避免无谓反转。例如EMA,MACD等。

2. 根据不同品种和周期测试最优参数。周期可以考虑15分钟,30分钟和1小时线等。主流数字货币和股票可作为测试品种。

3. 设置动态止损,根据市场波动程度实时调整止损点。这可以缓解止损被突破的风险。

4. 考虑结合算法交易的方法进行优化。利用机器学习和遗传算法自动寻找最优参数或捕捉更复杂的交易模式。

## 总结

该短线交易策略首先通过布林带和RSI判断市场热度和动能,找到最佳做空时机,然后利用止损止盈来控制风险。策略优势在于简单直接,易于实施。主要风险在于指标局限性和止损被套。应对方法是结合更多指标判断,动态调整参考数以及适当放宽止损。该策略有很大优化空间,未来可考虑引入更多指标判断和算力优化。

||

## Overview 

The Bollinger Bands and RSI short selling strategy is a short-term trading strategy based on Bollinger Bands and Relative Strength Index (RSI). It combines Bollinger Bands to gauge whether the market is overheated and RSI to determine the momentum of the market, to identify short selling opportunities. It goes short when the price breaks above the Bollinger upper band and RSI is greater than 70, indicating the market is overheated. It closes position when the Bollinger lower band breaks above the price, signaling a market reversal.

## Strategy Logic

The strategy relies on two main indicators:

1. Bollinger Bands. Bollinger Bands consist of a middle band, an upper band and a lower band. The middle band is the n-day moving average. The upper and lower bands are n standard deviations above and below the middle band. When price bounces from the lower band to the upper band, the market is considered overheated. When price falls back from the upper band to the lower band, the market has cooled off.  

2. RSI. RSI compares the average gain and loss over a period, to determine the strength of uptrends and downtrends. When RSI is above 70, it signals that the price is overheated. When RSI is below 30, it signals the price is oversold.

The specific trading logic is:

1. When price breaks above the Bollinger upper band and RSI is greater than 70, it triggers the Bollinger overheat signal and RSI overbought signal, thus goes short.

2. When price breaks below the Bollinger lower band, the market reverses colder, thus the position is closed. 

The strategy also sets a stop loss and take profit:

1. Stop loss is set at entry price * (1+1%), i.e. withstanding 1% loss.

2. Take profit is set at entry price * (1-7%), i.e. taking 7% profit then closing position.

## Advantages

The strategy has the following advantages:

1. Combines Bollinger Bands and RSI, avoids the probability of misjudgment from a single indicator.

2. Utilizes Bollinger Bands bands and RSI overbought-oversold areas to determine precise entry and exit timing for short-term trades.  

3. Sets stop loss and take profit pre-entry to control risks.

4. Simple and clear logic, easy to understand and implement.

5. Flexible Bollinger Bands and RSI parameters adjustable to different periods and market environments.

## Risks

Despite the advantages, the strategy has some risks to mitigate:

1. Both Bollinger Bands and RSI are trend following indicators, not suitable for ranging or directionless markets.

2. Cannot guarantee stop loss and take profit will always be triggered perfectly.  

3. Extreme market moves could penetrate stop loss and cause above-expectation losses.

4. Requires constant parameter tuning of indicators to adapt to changing markets.

Corresponding risk management methods:

1. Incorporate baseline indicators like moving averages to determine local trend, avoiding unnecessary whipsaws.  

2. Lower position sizing, diversify across strategies, to spread out risks.

3. Expand stop loss percentage or set super stops to withstand extreme market moves.  

4. Continuously adjust parameters based on live testing results.

## Optimization Opportunities 

Several aspects could be considered to further optimize the strategy:

1. Incorporate other indicators to avoid unnecessary whipsaws, e.g. EMA, MACD.  

2. Test for optimal parameters across different products and timeframes, e.g. 15m, 30m, 1h on leading cryptocurrencies and stocks.

3. Implement dynamic stops, adjusting stop level based on real-time market volatility, to smooth risk of stop runs.   

4. Consider optimizing via machine learning algorithms to automatically discover optimal parameters or more complex patterns.

## Conclusion

The short-term strategy first identifies optimal short sale timing through gauging market temperature and momentum with Bollinger Bands and RSI. It then controls risk with stop loss and take profit. Its advantage lies in simplicity and ease of implementation. Main risks stem from indicator limitations and stop runs. Solutions include incorporating more indicators, dynamically tuning parameters and allowing wider stops. Much room remains for optimization via introducing more indicators and computational enhancements.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|
|v_input_2|30|oversold|
|v_input_3|true|v_input_3|
|v_input_4|7|v_input_4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-07 00:00:00
end: 2023-12-14 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule
// Works best on 30m, 45m timeframe

//@version=5
strategy("Bollinger Bands and RSI Short Selling",
         overlay=true,
         initial_capital = 1000,
         default_qty_value = 30,
         default_qty_type = strategy.percent_of_equity,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

//Backtest period
timePeriod = time >= timestamp(syminfo.timezone, 2021, 12, 1, 0, 0)
notInTrade = strategy.position_size <= 0

//Bollinger Bands Indicator
length = input.int(20, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))


// RSI inputs and calculations
lengthRSI = 14
RSI = ta.rsi(close, lengthRSI)
oversold= input(30)


//Stop Loss and Take Profit for Shorting
Stop_loss= ((input (1))/100)
Take_profit= ((input (7)/100))

shortStopPrice  = strategy.position_avg_price * (1 + Stop_loss)
shortTakeProfit = strategy.position_avg_price * (1 - Take_profit)

//Entry and Exit
strategy.entry(id="short", direction=strategy.short, when=ta.crossover(close, upper) and RSI < 70 and timePeriod and notInTrade)

if (ta.crossover(upper, close) and RSI > 70 and timePeriod)
    strategy.exit(id='close', stop = shortTakeProfit, limit = shortStopPrice)

    

```

> Detail

https://www.fmz.com/strategy/435507

> Last Modified

2023-12-15 15:54:05
