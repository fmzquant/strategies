
> Name

Multi-Timeframe-EMA-Trend-Strategy-with-Daily-High-Low-Breakout-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18b7662527b7f1342ed.png)

[trans]
#### 概述
这是一个结合了日线高低点突破和多时间周期EMA趋势的量化交易策略。策略主要通过监测价格对前一日高低点的突破情况,结合EMA均线和资金流向指标(CMF)来判断交易时机。策略同时运用了小时线和日线两个时间周期的200周期EMA均线,通过多重技术指标的验证来提高交易的准确性。

#### 策略原理
策略的核心逻辑包含以下几个关键要素:
1. 使用request.security函数获取前一日的最高价和最低价作为关键的支撑阻力位。
2. 结合24周期EMA均线作为趋势判断的基准线。
3. 引入CMF(20周期)作为交易量和价格的综合指标,用于判断市场资金流向。
4. 同时计算当前时间周期和1小时周期的200均线,用于判断更大周期的趋势方向。

具体的交易规则如下:
做多条件:价格突破前一日高点 + 收盘价在EMA之上 + CMF为正值
做空条件:价格跌破前一日低点 + 收盘价在EMA之下 + CMF为负值
平仓条件:做多时价格跌破EMA,做空时价格突破EMA

#### 策略优势
1. 多重技术指标的综合验证提高了交易的可靠性
2. 通过多时间周期分析,能更全面地把握市场趋势
3. 结合量价关系的CMF指标,可以更好地判断市场的资金状况
4. 使用前一日高低点作为关键价位,符合市场参与者的交易习惯
5. 策略逻辑清晰,易于理解和执行
6. 具有明确的入场和出场条件,减少主观判断

#### 策略风险
1. 在震荡市场中可能频繁产生错误信号
2. 对于瞬间的价格突破反应不够敏感
3. 可能在关键位置错过交易机会
4. 未考虑更大周期的趋势环境
5. 在市场剧烈波动时可能造成较大回撤

风险控制建议:
1. 设置合理的止损位置
2. 根据不同市场环境调整参数
3. 增加趋势过滤器
4. 考虑加入波动率指标

#### 策略优化方向
1. 引入自适应的参数优化机制
2. 增加更多的市场环境过滤条件
3. 优化止损和止盈机制
4. 加入波动率指标以适应不同市场环境
5. 考虑加入位置管理机制
6. 增加交易量分析指标

#### 总结
这是一个结合了多重技术指标和多时间周期分析的完整交易系统。策略通过日内高低点突破、均线趋势和资金流向的综合分析来寻找交易机会。虽然存在一定的风险,但通过合理的风险控制和持续的优化改进,该策略具有良好的应用价值。建议交易者在实盘使用前进行充分的回测和参数优化。

|| 

#### Overview
This is a quantitative trading strategy that combines daily high-low breakouts with multi-timeframe EMA trends. The strategy primarily identifies trading opportunities by monitoring price breakouts of the previous day's high and low levels, combined with EMA trends and the Chaikin Money Flow (CMF) indicator. It utilizes 200-period EMAs on both hourly and daily timeframes to enhance trading accuracy through multiple technical indicator validation.

#### Strategy Principles
The core logic includes the following key elements:
1. Uses request.security function to obtain previous day's high and low prices as key support and resistance levels.
2. Incorporates 24-period EMA as the baseline for trend determination.
3. Implements CMF (20-period) as a comprehensive indicator of volume and price to assess market money flow.
4. Calculates 200 EMAs on both current and 1-hour timeframes to determine larger trend directions.

Specific trading rules:
Long Entry: Price breaks above previous day's high + Close above EMA + Positive CMF
Short Entry: Price breaks below previous day's low + Close below EMA + Negative CMF
Exit: Cross below EMA for longs, cross above EMA for shorts

#### Strategy Advantages
1. Multiple technical indicator validation improves trading reliability
2. Multi-timeframe analysis provides comprehensive trend assessment
3. CMF indicator integration better captures market money flow conditions
4. Previous day's high-low levels align with market participants' trading habits
5. Clear strategy logic that's easy to understand and execute
6. Well-defined entry and exit conditions minimize subjective judgment

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Not sufficiently responsive to instantaneous price breakouts
3. Potential missed opportunities at key levels
4. Lacks consideration of larger timeframe trends
5. May experience significant drawdowns during extreme market volatility

Risk Control Suggestions:
1. Implement appropriate stop-loss levels
2. Adjust parameters based on market conditions
3. Add trend filters
4. Consider incorporating volatility indicators

#### Optimization Directions
1. Implement adaptive parameter optimization mechanisms
2. Add more market condition filters
3. Optimize stop-loss and take-profit mechanisms
4. Include volatility indicators for different market conditions
5. Consider position management mechanisms
6. Add volume analysis indicators

#### Summary
This is a complete trading system combining multiple technical indicators and multi-timeframe analysis. The strategy seeks trading opportunities through comprehensive analysis of intraday high-low breakouts, moving average trends, and money flow. While certain risks exist, the strategy holds good practical value through proper risk control and continuous optimization. Traders are advised to conduct thorough backtesting and parameter optimization before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-28 00:00:00
end: 2024-11-27 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='The security Daily HIGH/LOW strategy', overlay=true, initial_capital=10000, calc_on_every_tick=true, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=100, 
         commission_type=strategy.commission.percent, commission_value=0.1)

// General Inputs
len = input.int(24, minval=1, title='Length MA', group='Optimization parameters')
src = input.source(close, title='Source MA', group='Optimization parameters')
out = ta.ema(src, len)

length = input.int(20, minval=1, title='CMF Length', group='Optimization parameters')
ad = close == high and close == low or high == low ? 0 : (2 * close - low - high) / (high - low) * volume
mf = math.sum(ad, length) / math.sum(volume, length)

// Function to get daily high and low
f_secureSecurity(_symbol, _res, _src) =>
    request.security(_symbol, _res, _src[1], lookahead=barmerge.lookahead_on)

pricehigh = f_secureSecurity(syminfo.tickerid, 'D', high)
pricelow = f_secureSecurity(syminfo.tickerid, 'D', low)

// Plotting previous daily high and low
plot(pricehigh, title='Previous Daily High', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))
plot(pricelow, title='Previous Daily Low', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))

// Entry Conditions
short = ta.crossunder(low, pricelow) and close < out and mf < 0
long = ta.crossover(high, pricehigh) and close > out and mf > 0

if short and barstate.isconfirmed
    strategy.entry('short', strategy.short, stop=pricelow[1])
    strategy.close('short', when=close > out)

if long and barstate.isconfirmed
    strategy.entry('long', strategy.long, stop=pricehigh[1])
    strategy.close('long', when=close < out)

// 200 EMA on 1-hour timeframe
ema_200 = ta.ema(close, 200)
ema_200_1h = request.security(syminfo.tickerid, "60", ta.ema(close, 200))

plot(ema_200_1h, color=color.purple, title="200 EMA (1H)")
plot(ema_200, color=color.white, title="200 EMA")
```

> Detail

https://www.fmz.com/strategy/473239

> Last Modified

2024-11-28 15:20:59
