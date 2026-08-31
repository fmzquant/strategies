
> Name

Triple-Moving-Average-Cross-Filter-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d828565f2e3b93466b1c.png)
![IMG](https://www.fmz.com/upload/asset/2d93cd1c874c556f91db5.png)



[trans]
#### 概述
这是一个基于三条简单移动平均线(SMA)的趋势跟踪策略。该策略利用21、50和100周期移动平均线的交叉和位置关系来识别市场趋势,并在合适的时机进行交易。策略主要在5分钟时间框架上运行,同时建议参考30分钟图表进行趋势确认。

#### 策略原理
策略使用三重过滤机制来确定交易信号:
1. 使用21周期均线作为快速均线,用于捕捉短期价格变动
2. 使用50周期均线作为中期均线,与快速均线形成交叉信号
3. 使用100周期均线作为趋势过滤器,确保交易方向与主趋势一致

买入条件需同时满足:
- 21均线向上穿越50均线
- 21均线和50均线都位于100均线之上

卖出条件需同时满足:
- 21均线向下穿越50均线
- 21均线和50均线都位于100均线之下

#### 策略优势
1. 多重确认机制降低虚假信号
2. 趋势过滤提高交易成功率
3. 清晰的进场和出场规则
4. 可在多个时间框架上使用
5. 风险回报比设定为1:2,有利于长期盈利
6. 策略逻辑简单,易于理解和执行

#### 策略风险
1. 震荡市场可能产生频繁交易
2. 均线滞后性可能导致入场和出场延迟
3. 快速反转行情可能造成较大损失
4. 不同市场环境需要调整参数

风险控制建议:
- 设置止损位于最近的重要低点下方
- 结合更大时间周期确认趋势
- 避免在横盘震荡市场交易
- 定期评估和优化策略参数

#### 策略优化方向
1. 引入成交量指标确认趋势强度
2. 增加动态止损机制
3. 添加趋势强度过滤器
4. 优化参数自适应机制
5. 结合其他技术指标进行信号确认
6. 增加市场波动率过滤器

#### 总结
这是一个结构完整、逻辑清晰的趋势跟踪策略。通过三重均线过滤和趋势确认机制,能够有效降低虚假信号,提高交易成功率。策略具有良好的可扩展性,可以根据不同市场环境进行优化调整。建议在实盘交易前进行充分的回测和参数优化。 || 

#### Overview
This is a trend-following strategy based on three Simple Moving Averages (SMA). The strategy utilizes the crossover and relative positions of 21, 50, and 100-period moving averages to identify market trends and generate trading signals. It primarily operates on a 5-minute timeframe, with recommended confirmation from the 30-minute chart.

#### Strategy Principle
The strategy employs a triple-filter mechanism to determine trading signals:
1. Uses 21-period MA as fast line to capture short-term price movements
2. Uses 50-period MA as medium-term line for crossover signals
3. Uses 100-period MA as trend filter to ensure alignment with main trend

Buy conditions require:
- 21 MA crosses above 50 MA
- Both 21 MA and 50 MA are above 100 MA

Sell conditions require:
- 21 MA crosses below 50 MA
- Both 21 MA and 50 MA are below 100 MA

#### Strategy Advantages
1. Multiple confirmation mechanisms reduce false signals
2. Trend filtering improves trading success rate
3. Clear entry and exit rules
4. Applicable across multiple timeframes
5. Risk-reward ratio set at 1:2 for long-term profitability
6. Simple logic, easy to understand and execute

#### Strategy Risks
1. Frequent trades in ranging markets
2. MA lag may cause delayed entries and exits
3. Quick reversals can lead to significant losses
4. Parameters need adjustment for different market conditions

Risk control suggestions:
- Set stop loss below recent significant low
- Confirm trends on higher timeframes
- Avoid trading in sideways markets
- Regular strategy parameter evaluation

#### Strategy Optimization
1. Incorporate volume indicators for trend strength confirmation
2. Implement dynamic stop-loss mechanism
3. Add trend strength filters
4. Optimize parameter adaptation
5. Integrate additional technical indicators
6. Add market volatility filters

#### Summary
This is a well-structured trend-following strategy with clear logic. Through triple moving average filtering and trend confirmation mechanisms, it effectively reduces false signals and improves trading success rate. The strategy offers good scalability and can be optimized for different market conditions. Thorough backtesting and parameter optimization are recommended before live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2024-06-08 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Vezpa
//@version=5
strategy("Vezpa's Gold Strategy", overlay=true)

// ======================== MAIN STRATEGY ========================
// Input parameters for the main strategy
fast_length = input.int(21, title="Fast MA Length", minval=1)
slow_length = input.int(50, title="Slow MA Length", minval=1)
trend_filter_length = input.int(100, title="Trend Filter MA Length", minval=1)

// Calculate moving averages for the main strategy
fast_ma = ta.sma(close, fast_length)
slow_ma = ta.sma(close, slow_length)
trend_ma = ta.sma(close, trend_filter_length)

// Plot moving averages
plot(fast_ma, color=color.blue, title="21 MA")
plot(slow_ma, color=color.red, title="50 MA")
plot(trend_ma, color=color.orange, title="100 MA")

// Buy condition: 21 MA crosses above 50 MA AND both are above the 100 MA
if (ta.crossover(fast_ma, slow_ma) and fast_ma > trend_ma and slow_ma > trend_ma)
    strategy.entry("Buy", strategy.long)

// Sell condition: 21 MA crosses below 50 MA AND both are below the 100 MA
if (ta.crossunder(fast_ma, slow_ma) and fast_ma < trend_ma and slow_ma < trend_ma)
    strategy.close("Buy")

// Plot buy signals as green balloons
plotshape(series=ta.crossover(fast_ma, slow_ma) and fast_ma > trend_ma and slow_ma > trend_ma, 
     title="Buy Signal", 
     location=location.belowbar, 
     color=color.green, 
     style=shape.labelup, 
     text="BUY", 
     textcolor=color.white, 
     size=size.small, 
     transp=0)

// Plot sell signals as red balloons
plotshape(series=ta.crossunder(fast_ma, slow_ma) and fast_ma < trend_ma and slow_ma < trend_ma, 
     title="Sell Signal", 
     location=location.abovebar, 
     color=color.red, 
     style=shape.labeldown, 
     text="SELL", 
     textcolor=color.white, 
     size=size.small, 
     transp=0)



```

> Detail

https://www.fmz.com/strategy/483045

> Last Modified

2025-02-21 10:48:37
