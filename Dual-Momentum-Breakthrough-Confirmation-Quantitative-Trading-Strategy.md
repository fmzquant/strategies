
> Name

Dual-Momentum-Breakthrough-Confirmation-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c396085912c9e11605.png)

[trans]
#### 概述
这是一个基于威廉指标(Williams %R)和相对强弱指数(RSI)双重动量突破确认的量化交易策略。该策略通过观察两个动量指标的交叉突破来确认交易信号,有效降低了假突破带来的风险。策略在超买超卖区域寻找交易机会,通过两个指标的共同确认来提高交易的准确性。

#### 策略原理
策略使用30周期的Williams %R和7周期的RSI作为主要指标。当Williams %R向上突破-80且RSI同时向上突破20时,触发做多信号；当Williams %R向下突破-20且RSI同时向下突破80时,触发做空信号。这种双重确认机制能够有效过滤掉单一指标可能产生的虚假信号。策略在编程实现上采用了手动计算Williams %R的方式,通过计算周期内的最高价和最低价来得到更精确的指标值。

#### 策略优势
1. 双重确认机制显著提高了交易信号的可靠性
2. 超买超卖区域的交易具有较高的胜率和盈利潜力
3. 指标参数可根据不同市场情况灵活调整
4. 策略逻辑简单清晰,易于理解和维护
5. 手动计算指标值提供了更大的优化空间

#### 策略风险
1. 在震荡市场中可能产生过多交易信号
2. 双重确认机制可能导致入场时机略有滞后
3. 固定的超买超卖阈值在不同市场环境下可能需要调整
4. 短周期RSI可能对价格波动较为敏感
5. 需要考虑交易成本对策略收益的影响

#### 策略优化方向
1. 引入趋势过滤器,在强趋势市场中避免反趋势交易
2. 添加移动止损机制以保护既有利润
3. 开发自适应的超买超卖阈值计算方法
4. 优化Williams %R和RSI的周期参数组合
5. 考虑加入成交量指标作为辅助确认信号

#### 总结
该策略通过Williams %R和RSI的协同作用,构建了一个稳健的交易系统。双重动量确认机制有效降低了假信号风险,超买超卖区域的交易具有良好的盈利潜力。通过合理的风险控制和持续优化,策略可以在不同市场环境下保持稳定表现。 || 

#### Overview
This is a quantitative trading strategy based on dual momentum breakthrough confirmation using Williams %R and Relative Strength Index (RSI). The strategy identifies trading signals through the cross-breakthrough of two momentum indicators, effectively reducing the risk of false breakouts. It seeks trading opportunities in overbought and oversold areas, improving trading accuracy through mutual confirmation of both indicators.

#### Strategy Principle
The strategy employs a 30-period Williams %R and 7-period RSI as primary indicators. A buy signal is triggered when Williams %R crosses above -80 and RSI simultaneously crosses above 20; a sell signal is generated when Williams %R crosses below -20 and RSI simultaneously crosses below 80. This dual confirmation mechanism effectively filters out potential false signals from single indicators. The strategy implements manual calculation of Williams %R by computing the highest and lowest prices within the period for more precise indicator values.

#### Strategy Advantages
1. Dual confirmation mechanism significantly improves trading signal reliability
2. Trading in overbought and oversold zones offers higher win rates and profit potential
3. Indicator parameters can be flexibly adjusted for different market conditions
4. Strategy logic is simple and clear, easy to understand and maintain
5. Manual calculation of indicator values provides greater optimization potential

#### Strategy Risks
1. May generate excessive trading signals in ranging markets
2. Dual confirmation mechanism might lead to slightly delayed entry points
3. Fixed overbought and oversold thresholds may need adjustment in different market environments
4. Short-period RSI might be sensitive to price fluctuations
5. Trading costs need to be considered for strategy profitability

#### Strategy Optimization Directions
1. Introduce trend filters to avoid counter-trend trading in strong trend markets
2. Add trailing stop-loss mechanisms to protect existing profits
3. Develop adaptive overbought and oversold threshold calculation methods
4. Optimize period parameter combinations for Williams %R and RSI
5. Consider adding volume indicators as auxiliary confirmation signals

#### Summary
The strategy constructs a robust trading system through the synergy of Williams %R and RSI. The dual momentum confirmation mechanism effectively reduces false signal risks, while trading in overbought and oversold zones offers good profit potential. Through proper risk control and continuous optimization, the strategy can maintain stable performance across different market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-12 00:00:00
end: 2024-12-11 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Williams %R + RSI Strategy", overlay=true)

// Inputs for Williams %R
wpr_length = input.int(30, title="Williams %R Length", minval=1)
wpr_upper = input.int(-20, title="Williams %R Upper Band", minval=-100, maxval=0)
wpr_lower = input.int(-80, title="Williams %R Lower Band", minval=-100, maxval=0)

// Inputs for RSI
rsi_length = input.int(7, title="RSI Length", minval=1)
rsi_upper = input.int(80, title="RSI Upper Band", minval=0, maxval=100)
rsi_lower = input.int(20, title="RSI Lower Band", minval=0, maxval=100)

// Calculate Williams %R Manually
highest_high = ta.highest(high, wpr_length)
lowest_low = ta.lowest(low, wpr_length)
wpr = ((highest_high - close) / (highest_high - lowest_low)) * -100

// Calculate RSI
rsi = ta.rsi(close, rsi_length)

// Entry and Exit Conditions
longCondition = ta.crossover(wpr, wpr_lower) and ta.crossover(rsi, rsi_lower)
shortCondition = ta.crossunder(wpr, wpr_upper) and ta.crossunder(rsi, rsi_upper)

// Plot Buy/Sell Signals
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Strategy Entry and Exit
if (longCondition)
    strategy.entry("Buy", strategy.long)

if (shortCondition)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/474961

> Last Modified

2024-12-13 10:37:00
