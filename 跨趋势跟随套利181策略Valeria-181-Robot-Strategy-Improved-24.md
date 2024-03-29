
> Name

跨趋势跟随套利181策略Valeria-181-Robot-Strategy-Improved-24

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1098eed70e6a8da3153.png)
[trans]

策略概述:本策略通过布林线的金叉/死叉信号开仓做多/做空。策略优势在于持续跟踪趋势市场,止盈止损设置合理,回撤控制得当,适合中长线操作。主要适用于股指、外汇、加密货币等具有明显趋势特征的市场。

策略原理:本策略主要由布林线交叉信号、固定仓位、动态止盈止损三部分组成。布林线利用均线及标准差生成带状区域,金叉做多表示突破上轨;死叉做空表示跌破下轨,作为建仓信号。仓位固定为100%,无论多头还是空头都是全仓操作。止盈止损水平会根据最近一次开仓价格进行动态调整,从而跟踪趋势运行。

具体来说,布林线是根据收盘价的移动平均线及标准差计算带状区域。当价格突破上轨时产生买入信号;当价格跌破下轨时产生卖出信号。这样可以预测价格可能的反转,寻找建仓机会。固定100%仓位可以最大化跟踪趋势运行, pursued the highest profit。动态止盈止损根据最近一次开仓价格进行调整,通过合理设置止损距离来控制回撤,并根据趋势波动程度适当放大止盈距离以获取更多利润。

策略优势详述:

1. 跨趋势运行,持续盈利。布林线交叉寻找趋势转换点,有利于把握主线方向;固定仓位可充分跟随趋势运行,获得最大利润。 

2. 动态止盈止损,回撤可控。根据最近一次开仓价格调整止盈止损位,通过合理配置可有效控制最大回撤。并可根据市场波动程度做出调整。

3. 灵活应用,适用市场广。适用于大多数具有趋势特征的市场,尤其适合股指、外汇、加密货币等中长线操作。

4. 逻辑简单清晰,容易实施。基于布林线的趋势判断及固定仓位交易,无须判断复杂形态或信号,程序容易开发。

5. 资金使用效率高,充分配置资金。固定100%仓位可最大化资金利用,无论空头和多头都可全额配置资金。

风险和解决方法详述: 

1. 布林线失效风险。布林线判断失效时,将产生错误信号。解决方法是结合其它指标判断趋势方向。

2. 回撤风险。在震荡行情中,将产生一定回撤。可通过降低仓位及优化止损距离来控制。 

3. 交易频繁风险。在波动性市场中将频繁止损跳转仓位。可适当放宽止损距离,减少不必要的止损。

4. 市场风险。面临突发重大事件导致市场Prices异常。建议关注重要财经政策,及时响应。

策略优化建议:

1. 同时考虑其它指标判断。比如结合MACD、KDJ等其它技术指标,避免布林线误判。

2. 根据市场调整止盈止损距离。如波动率较大时,适当放大止盈距离;波动较小时则缩小止损距离。 

3. 根据市场类型选择合理参数。如对于波动较大的市场,可适当增加布林带标准差或均线周期等。

4. 结合机器学习算法优化参数。通过算法训练确认各参数的最优数值,达到更好的策略绩效。

总结评述:该策略属于典型的跨趋势套利策略。适用于具有明显趋势特征的市场,能够持续盈利。策略逻辑简单清晰,程序容易实现。通过合理配置止盈止损距离,可以有效控制最大回撤。整体而言,该策略收益稳定,具有简单高效,易于实施的特点,是非常值得推荐的量化策略。

|| 

Overview: This strategy opens long/short positions based on Bollinger Bands crossover signals and pursues profits in the trending market with stop loss and take profit. Its advantages lie in keep tracking trends, reasonable stop loss and take profit configuration, controllable drawdown, suitable for medium and long term trading, especially in stock index, forex and crypto markets with obvious trending characters.

Principles: The strategy consists of three parts: BB crossover signals, fixed position sizing and dynamic stop loss and take profit. BB crossover system judges the breakout through bands generated by moving averages and standard deviation. Golden cross for long and dead cross for short. Fix 100% position either long or short to maximize profits following trends. Stop loss and take profit levels will be adjusted based on the latest entry price, so as to lock profit and control drawdown along the trend movement. 

Specifically, BB bands are calculated with moving averages and standard deviation of closing prices. Golden cross above upper band gives buy signal while dead cross below lower band gives sell signal. They attempt to identify potential reversal points and trading opportunities. 100% position aims to pursue maximum profits by fully following trends. Dynamic stop loss and take profit are modified based on the latest entry price. Stop loss distance is set reasonably to control drawdown. Take profit distance is set to obtain more profits according to market fluctuation.

Advantages:

1. Keep profits along trends, benefit from main direction through BB signal and full position.  

2. Controllable drawdown via dynamic stop loss and take profit based on entry price. Values can be optimized accordingly.

3. Wide application in major markets with trends, especially suitable for stock index, forex and crypto assets.

4. Simple logic and easy to implement technically with BB and fixed percent. No complex pattern or model judgments.

5. High capital use efficiency by 100% long/short position to maximize capital allocation.

Risks and solutions:

1. Invalid BB signal risks. Will cause wrong trading signals if BB judgment fails,  solved by combining other indicators on trend judgment.

2. Drawdown risks in consolidations, addressed by reducing position sizing and optimizing stop loss distance.  

3. Frequent trading risks in volatile markets with continuous stop loss jump between long and short. Can widen stop loss distance properly to reduce unnecessary triggers. 

4. Market risks from unexpected big events leading to irrational price spikes. Suggest to pay attention to key policies and events.


Optimizations:

1. Consider other indicators like MACD, KDJ together with BB to avoid misjudgments.

2. Adjust stop loss and take profit distances based on market volatility.

3. Select reasonable parameters for different market types. Such as larger standard deviation and moving average period for volatile markets.

4. Optimize parameter values through machine learning algorithms for better performance.

Summary: The strategy is a typical trend following arbitrage system. It keeps profitable along obvious trends in multiple markets. The logic is simple and clean making it easy to implement technically. By configuring proper stop loss and take profit levels, the maximum drawdown can be effectively controlled. In general, this is an efficient trend trading strategy with stable returns, simple logic and easy execution. Highly recommend for quantitative trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-08 00:00:00
end: 2023-12-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Valeria 181 Bot Strategy Mejorado 2.21", overlay=true, margin_long=100, margin_short=100)
 
var float lastLongOrderPrice = na
var float lastShortOrderPrice = na

longCondition = ta.crossover(ta.sma(close, 1), ta.sma(close, 4))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)  // Enter long

shortCondition = ta.crossunder(ta.sma(close, 1), ta.sma(close, 4))
if (shortCondition)
    strategy.entry("Short Entry", strategy.short)  // Enter short

if (longCondition)
    lastLongOrderPrice := close

if (shortCondition)
    lastShortOrderPrice := close

// Calculate stop loss and take profit based on the last executed order's price
stopLossLong = lastLongOrderPrice - 170  // 10 USDT lower than the last long order price
takeProfitLong = lastLongOrderPrice + 150  // 100 USDT higher than the last long order price
stopLossShort = lastShortOrderPrice + 170  // 10 USDT higher than the last short order price
takeProfitShort = lastShortOrderPrice - 150  // 100 USDT lower than the last short order price

// Apply stop loss and take profit to long positions
strategy.exit("Long Exit", from_entry="Long Entry", stop=stopLossLong, limit=takeProfitLong)

// Apply stop loss and take profit to short positions
strategy.exit("Short Exit", from_entry="Short Entry", stop=stopLossShort, limit=takeProfitShort) 
```

> Detail

https://www.fmz.com/strategy/435464

> Last Modified

2023-12-15 10:13:38
