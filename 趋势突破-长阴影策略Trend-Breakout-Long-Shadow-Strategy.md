
> Name

趋势突破-长阴影策略Trend-Breakout-Long-Shadow-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/732a07d27f3d5d1e21.png)
[trans]


本策略通过计算K线的阳阴影长度比率,判断目前趋势方向,配合平均真实波幅ATR进行趋势识别,在突破点进行反向开仓,设置止损止盈,捕捉短期趋势。

### 策略原理

该策略主要通过计算K线的阳阴影长度比率,判断目前的趋势方向,当阴线长度过长时判断为向下趋势,当阳线长度过长时判断为向上趋势。

策略具体逻辑是:

1. 计算K线的下阴影长度:close-low(收盘价-最低价)
2. 计算K线的上阴影长度:high-open(最高价-开盘价) 
3. 取下阴影和上阴影的最大值作为阴影长度
4. 计算K线实体长度:high-low(最高价-最低价)
5. 计算阴影长度与实体长度之比
6. 当比率大于0.5并且下阴影大于上阴影时,判断为向下趋势,设置多单进场
7. 当比率大于0.5并且上阴影大于下阴影时,判断为向上趋势,设置空单进场
8. 进场时要同时判断K线实体长度是否大于0.75倍的ATR平均真实波幅,避免无效突破
9. 进场后设置止损止盈,止损为入场价乘以系数,止盈为入场价乘以2倍系数,实现盈亏比为2:1

以上就是策略的基本交易逻辑,通过识别趋势突破点进行反向开仓,设置止损止盈后进行盈利优化。

### 策略优势

1. 使用阳阴影比率判断趋势方向,区分度高
2. 结合ATR指标进行有效突破判断,避免头假信号
3. 设置止损止盈,有利于风险控制
4. 实现2:1盈亏比,符合量化交易标准
5. 适用于高波动股票的短线交易
6. 策略逻辑简单清晰,容易理解实现

### 策略风险

1. 股价剧烈波动时,止损可能被突破,造成损失扩大
2. 效果与参数设定密切相关,需要优化参数
3. 趋势产生转折时,可能形成损失
4. 同步扩大止损和止盈范围会增加亏损概率
5. 突破失败时会损失较大资金

可通过合理止损,优化参数,及时止损来控制风险。

### 策略优化

策略可从以下几个方面进行优化:

1. 优化阳阴影比率参数,找出最佳数值
2. 优化ATR参数,找出最好的K线长度判定
3. 优化止损止盈系数,实现最佳风险收益比
4. 增加仓位管理,例如逐步加仓
5. 增加跟踪止损,实现盈利保护
6. 结合其他指标过滤入场信号
7. 优化回测时间段,测试不同市场阶段的效果

通过多方位测试与优化,可将策略效果最大化。

总体来说,该策略通过趋势识别与风险控制的方式,利用短期价格波动获利,是一个效果稳定的短线突破策略。优化后可成为量化交易的关键部分。

||

This strategy judges the current trend direction by calculating the ratio of bullish/bearish shadow length, and identifies trend with ATR indicator. It opens reverse position on breakout points and sets stop loss and take profit to capture short-term trends.  

### Strategy Logic

The strategy mainly judges the current trend by calculating bullish/bearish shadow ratio. Long bearish indicates downward trend while long bullish indicates upward trend.

The specific logic is:

1. Calculate bearish shadow: close - low
2. Calculate bullish shadow: high - open
3. Take the max of bearish and bullish shadow as shadow length 
4. Calculate candle body length: high - low
5. Calculate ratio between shadow and body length
6. If ratio > 0.5 and bearish > bullish, judge downward trend and long position
7. If ratio > 0.5 and bullish > bearish, judge upward trend and short position  
8. Validate breakout with candle length > 0.75 * ATR
9. Set stop loss and take profit after entry, with 2:1 ratio

The above is the basic trading logic, identifying reverse breakout points with trend detection and optimizing profit with stop loss/take profit.

### Advantages

1. Shadow ratio accurately judges the trend
2. ATR filters out false breakout signals 
3. Stop loss and take profit manages risk
4. 2:1 risk-reward ratio meets quant trading standard
5. Suitable for short-term trading on high volatility stocks
6. Simple and clear logic, easy to understand

### Risks

1. Price volatility may hit stop loss and increase loss
2. Performance relies heavily on parameter tuning  
3. Trend reversal may lead to loss
4. Expanding stop loss/take profit may increase loss probability
5. Failed breakout can lead to large loss

Risks can be managed by reasonable stop loss, parameter optimization, and timely position exit.

### Enhancement

The strategy can be optimized in the following ways:

1. Optimize shadow ratio parameter for best value
2. Optimize ATR parameter for best candle length
3. Optimize stop loss/take profit coefficients for optimal risk-reward 
4. Add position sizing like gradual position increase
5. Add trailing stop loss for profit protection
6. Add other indicators to filter signals
7. Optimize backtest time period and test different market stages

With multi-faceted testing and optimization, the strategy performance can be maximized.

Overall, this strategy profits from short-term price swings through trend identification and risk management. When optimized, it can become a robust short-term breakout strategy for quant trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2025|Backtest End Year|
|v_input_5|true|Backtest End Month|
|v_input_6|true|Backtest End Day|
|v_input_7|0.8|N - % offset for N*SL and (2N)*TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ondrej17

//@version=4
strategy("longWickstrategy", overlay=true )
 
// Inputs
st_yr_inp = input(defval=2020, title='Backtest Start Year')
st_mn_inp = input(defval=01, title='Backtest Start Month')
st_dy_inp = input(defval=01, title='Backtest Start Day')
en_yr_inp = input(defval=2025, title='Backtest End Year')
en_mn_inp = input(defval=01, title='Backtest End Month')
en_dy_inp = input(defval=01, title='Backtest End Day')
sltp_inp = input(defval=0.8, title='N - % offset for N*SL and (2N)*TP')/100
 
// Dates
start = timestamp(st_yr_inp, st_mn_inp, st_dy_inp,00,00)
end = timestamp(en_yr_inp, en_mn_inp, en_dy_inp,00,00)
canTrade = time >= start and time <= end
// Indicators Setup


 
// Strategy Calcuations
lowerWick = (open > close) ? close-low : open - low
upperWick = (open > close) ? high-open : high-close
wickLength = max(lowerWick,upperWick)
candleLength = high-low
wickToCandleRatio = wickLength / candleLength
entryFilterCandleLength = candleLength > 0.75*atr(48)


// Entries and Exits
 
longCondition = entryFilterCandleLength and wickToCandleRatio > 0.5 and lowerWick > upperWick and canTrade and strategy.position_size == 0
shortCondition = entryFilterCandleLength and wickToCandleRatio > 0.5 and lowerWick < upperWick and canTrade and strategy.position_size == 0

strategy.entry("pendingLong", strategy.long, limit=low+wickLength/2, when = longCondition)
strategy.entry("pendingShort", strategy.short, limit=high-wickLength/2, when = shortCondition)

longStop = strategy.position_size > 0 ? strategy.position_avg_price*(1-sltp_inp) : na
longTP = strategy.position_size > 0 ? strategy.position_avg_price*(1+2*sltp_inp) : na
shortStop = strategy.position_size < 0 ? strategy.position_avg_price*(1+sltp_inp) : na
shortTP = strategy.position_size < 0 ? strategy.position_avg_price*(1-2*sltp_inp) : na

strategy.exit("longSLTP","pendingLong", stop=longStop, limit = longTP)
strategy.exit("shortSLTP","pendingShort", stop=shortStop, limit = shortTP)  
 

plot(longStop, color=color.red, style=plot.style_linebr, linewidth=2)
plot(shortStop, color=color.red, style=plot.style_linebr, linewidth=2)
plot(longTP, color=color.green, style=plot.style_linebr, linewidth=2)
plot(shortTP, color=color.green, style=plot.style_linebr, linewidth=2)

plotLongCondition = longCondition ? high+abs(open-close) : na
plot(plotLongCondition, style=plot.style_circles, linewidth=4, color=color.green)
plotShortCondition = shortCondition ? high+abs(open-close) : na
plot(plotShortCondition, style=plot.style_circles, linewidth=4, color=color.red)


```

> Detail

https://www.fmz.com/strategy/432223

> Last Modified

2023-11-15 16:43:17
