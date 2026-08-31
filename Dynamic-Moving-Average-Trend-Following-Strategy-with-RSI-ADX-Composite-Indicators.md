
> Name

Dynamic-Moving-Average-Trend-Following-Strategy-with-RSI-ADX-Composite-Indicators

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d942fe4a0a5ac3ee1f8e.png)
![IMG](https://www.fmz.com/upload/asset/2d8b7be81bd7f5074d143.png)




[trans]
#### 概述
该策略是一个基于200周期简单移动平均线(MA200)的趋势跟踪系统,结合了相对强弱指标(RSI)、平均趋向指数(ADX)和平均真实波幅(ATR)等技术指标,形成了一个完整的交易决策框架。策略通过动态止损和获利目标的设置,实现了风险的有效控制。从回测结果来看,该策略在多个交易品种上都取得了较好的胜率,展现出较强的适应性和稳定性。

#### 策略原理 
策略的核心逻辑建立在以下几个关键点上:
1. 使用MA200作为主要趋势判断指标,当价格突破MA200时产生初始信号
2. 采用RSI指标进行超买超卖判断,买入信号要求RSI>40,卖出信号要求RSI<60
3. 引入ADX指标判断趋势强度,要求ADX>20以确保趋势明确
4. 通过2个周期的信号确认来过滤假突破
5. 基于ATR设置动态止损,take profit固定为2%

#### 策略优势
1. 多指标协同验证,提高了信号的可靠性
2. 动态止损的设计有效控制了风险
3. 采用信号延迟确认机制,降低了假突破带来的影响
4. 策略逻辑清晰,参数设置合理,具有较强的实用性
5. 回测结果显示在多个交易品种上都能保持较高胜率

#### 策略风险
1. MA200周期较长,可能导致入场时机滞后
2. 固定的2%获利目标可能在强趋势中过早离场
3. RSI和ADX的参数设置可能需要针对不同市场特征进行优化
4. 信号确认机制可能在快速行情中错过交易机会

#### 策略优化方向
1. 可以考虑引入自适应的移动平均线周期
2. 设计动态的获利目标计算方法
3. 增加成交量指标作为辅助判断
4. 优化信号确认周期的动态调整机制
5. 引入波动率过滤器,在高波动期间调整仓位规模

#### 总结
该策略通过结合多个技术指标,构建了一个稳健的趋势跟踪系统。策略在设计上注重了风险控制,通过动态止损和信号确认机制来提高交易的可靠性。虽然存在一些优化空间,但整体而言是一个具有实用价值的交易策略。后续可以通过参数优化和增加辅助指标来进一步提升策略的表现。 || 

#### Overview
This strategy is a trend following system based on the 200-period Simple Moving Average (MA200), combined with technical indicators including the Relative Strength Index (RSI), Average Directional Index (ADX), and Average True Range (ATR) to form a complete trading decision framework. The strategy implements effective risk control through dynamic stop-loss and profit targets. Backtesting results show that the strategy has achieved good win rates across multiple trading instruments, demonstrating strong adaptability and stability.

#### Strategy Principles
The core logic of the strategy is built on the following key points:
1. Uses MA200 as the primary trend indicator, generating initial signals when price breaks through MA200
2. Employs RSI for overbought/oversold judgment, requiring RSI>40 for buy signals and RSI<60 for sell signals
3. Incorporates ADX to judge trend strength, requiring ADX>20 to ensure clear trends
4. Filters false breakouts through 2-period signal confirmation
5. Sets dynamic stop-loss based on ATR, with fixed take profit at 2%

#### Strategy Advantages
1. Multiple indicator collaboration validates signals, improving reliability
2. Dynamic stop-loss design effectively controls risk
3. Signal delay confirmation mechanism reduces false breakout impacts
4. Clear strategy logic with reasonable parameter settings, highly practical
5. Backtesting shows maintained high win rates across multiple trading instruments

#### Strategy Risks
1. Long MA200 period may lead to delayed entry timing
2. Fixed 2% profit target might exit too early in strong trends
3. RSI and ADX parameters may need optimization for different market characteristics
4. Signal confirmation mechanism might miss trading opportunities in fast markets

#### Strategy Optimization Directions
1. Consider introducing adaptive moving average periods
2. Design dynamic profit target calculation methods
3. Add volume indicators as auxiliary judgment
4. Optimize dynamic adjustment mechanism for signal confirmation periods
5. Introduce volatility filters to adjust position sizing during high volatility periods

#### Summary
The strategy builds a robust trend following system by combining multiple technical indicators. The design emphasizes risk control through dynamic stop-loss and signal confirmation mechanisms to improve trading reliability. While there is room for optimization, it is overall a practical trading strategy with real value. Future improvements can be made through parameter optimization and additional auxiliary indicators to further enhance strategy performance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"TRB_USDT"}]
*/

//@version=5
strategy("BTC/USD MA200 with RSI, ADX, ATR", overlay=true)

// Definition of the main moving average
ma_trend = ta.sma(close, 200)  // Main trend filter

// Definition of RSI and ADX
rsi = ta.rsi(close, 14)
[diplus, diminus, adx] = ta.dmi(14, 14)  // Correction for ADX

// Definition of ATR for Stop Loss and Take Profit
atr = ta.atr(14)

// Conditions for crossing of the MA200
crossover_condition = ta.crossover(close, ma_trend)
crossunder_condition = ta.crossunder(close, ma_trend)

// Trend confirmation after 2 bars
buy_confirmation = crossover_condition[2] and (rsi > 40) and (adx > 20) and close > ma_trend
sell_confirmation = crossunder_condition[2] and (rsi < 60) and (adx > 20) and close < ma_trend

// Definition of Stop Loss and Take Profit
take_profit = close * 1.02  // 2% profit
stop_loss = close - (1.5 * atr)  // Dynamic stop based on ATR

// Execution of orders
if (buy_confirmation and strategy.opentrades == 0)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit/Stop Loss", from_entry="Buy", limit=take_profit, stop=stop_loss)
    label.new(bar_index, high, "BUY", style=label.style_label_down, color=color.green, textcolor=color.white, size=size.normal)

if (sell_confirmation)
    if (strategy.opentrades > 0)
        strategy.close("Buy")
    label.new(bar_index, low, "SELL", style=label.style_label_up, color=color.red, textcolor=color.white, size=size.normal)

// Draw the main moving average
plot(ma_trend, color=color.purple, title="MA 200")

```

> Detail

https://www.fmz.com/strategy/482901

> Last Modified

2025-02-27 17:27:00
