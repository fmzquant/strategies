
> Name

RSI-with-125-Day-High-Breakout-and-Volume-Filter-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8a54a29e14dbdef5aa5.png)
![IMG](https://www.fmz.com/upload/asset/2d8b6d879f5be3bfe4528.png)



[trans]
#### 概述
本策略是一个结合了相对强弱指数(RSI)、125日最高价突破和成交量过滤器的多维交易系统。该策略通过监控RSI超买超卖区域的交叉、价格对125日高点的突破以及成交量的显著增加来识别潜在的交易机会。这种多重确认机制有助于提高交易信号的可靠性。

#### 策略原理
策略采用三重过滤机制来确认交易信号：
1. RSI指标用于识别超买超卖区域，当RSI从超卖区域(30以下)向上突破时产生做多信号，从超买区域(70以上)向下突破时产生做空信号。
2. 125日高点作为中长期趋势的重要参考，价格突破该水平视为强势信号，跌破该水平则视为弱势信号。
3. 成交量确认要求当前成交量至少是前一个周期成交量的2倍，以确保市场有足够的参与度支撑价格走势。

只有当这三个条件同时满足时，策略才会执行相应的交易操作。

#### 策略优势
1. 多重确认机制显著降低了虚假信号的风险，提高了交易的准确性。
2. 成交量过滤器的引入确保了交易发生在市场流动性充足的环境下。
3. 125日高点的使用有助于捕捉中长期趋势的转折点。
4. RSI指标的应用可以及时发现超买超卖机会，有利于把握价格修正的时机。
5. 策略逻辑清晰，参数可调整性强，适合不同市场环境。

#### 策略风险
1. 在横盘震荡市场中可能产生过多交易信号，增加交易成本。
2. 对于低流动性品种，成交量条件可能较难满足，导致错过交易机会。
3. 125日高点的跟踪可能在剧烈波动市场中产生滞后反应。
4. RSI指标在强势趋势中可能产生频繁的超买超卖信号。
5. 多重过滤条件可能导致错过一些潜在的交易机会。

#### 策略优化方向
1. 引入自适应的成交量倍数阈值，根据市场波动情况动态调整。
2. 考虑添加趋势过滤器，在不同趋势环境下使用不同的参数设置。
3. 优化RSI参数，可以考虑使用自适应周期来提高指标的灵敏度。
4. 引入止损止盈机制，提高资金管理的有效性。
5. 考虑添加时间过滤器，避免在市场开盘和收盘等波动较大的时段交易。

#### 总结
该策略通过结合RSI、125日高点和成交量过滤器，构建了一个相对完善的交易系统。策略的多重确认机制有效降低了虚假信号的风险，而且各个组成部分都具有清晰的市场逻辑支撑。通过合理的参数优化和风险管理，该策略有望在实际交易中取得稳定的表现。 || 

#### Overview
This strategy is a multi-dimensional trading system that combines the Relative Strength Index (RSI), 125-day high breakout, and volume filter. It identifies potential trading opportunities by monitoring RSI crossovers in overbought and oversold zones, price breakouts above the 125-day high, and significant volume increases. This multiple confirmation mechanism helps improve the reliability of trading signals.

#### Strategy Principles
The strategy employs a triple-filter mechanism to confirm trading signals:
1. RSI indicator identifies overbought and oversold areas, generating long signals when RSI breaks up from the oversold zone (below 30) and short signals when breaking down from the overbought zone (above 70).
2. The 125-day high serves as a crucial reference for medium to long-term trends, with price breakouts above this level considered bullish and breakdowns bearish.
3. Volume confirmation requires current volume to be at least twice the previous period's volume, ensuring sufficient market participation to support price movements.

The strategy only executes trades when all three conditions are simultaneously satisfied.

#### Strategy Advantages
1. Multiple confirmation mechanisms significantly reduce the risk of false signals and improve trading accuracy.
2. The volume filter ensures trades occur in environments with adequate market liquidity.
3. Using the 125-day high helps capture medium to long-term trend turning points.
4. RSI application enables timely identification of overbought and oversold opportunities for price corrections.
5. The strategy logic is clear with adjustable parameters, suitable for different market environments.

#### Strategy Risks
1. May generate excessive trading signals in sideways markets, increasing transaction costs.
2. Volume conditions might be difficult to meet in low-liquidity instruments, leading to missed opportunities.
3. 125-day high tracking may produce lagging responses in volatile markets.
4. RSI indicator might generate frequent overbought/oversold signals in strong trends.
5. Multiple filter conditions could result in missing some potential trading opportunities.

#### Strategy Optimization Directions
1. Introduce adaptive volume multiplier thresholds that dynamically adjust based on market volatility.
2. Consider adding trend filters with different parameter settings for various trend environments.
3. Optimize RSI parameters, potentially using adaptive periods to improve indicator sensitivity.
4. Implement stop-loss and take-profit mechanisms to enhance capital management effectiveness.
5. Consider adding time filters to avoid trading during highly volatile market opening and closing periods.

#### Summary
This strategy builds a relatively comprehensive trading system by combining RSI, 125-day high, and volume filters. The multiple confirmation mechanism effectively reduces the risk of false signals, and each component has clear market logic support. Through proper parameter optimization and risk management, this strategy has the potential to achieve stable performance in actual trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("RSI Strategy with 125-Day High and Volume Filter", overlay=true)

// Input variables
length = input(14, title="RSI Length")
overSold = input(30, title="Oversold Level")
overBought = input(70, title="Overbought Level")
price = close

// RSI Calculation
vrsi = ta.rsi(price, length)

// Conditions for RSI crossover
co = ta.crossover(vrsi, overSold)
cu = ta.crossunder(vrsi, overBought)

// 125-day high calculation
high_125 = ta.highest(high, 125)

// Crossing conditions for 125-day high
cross_above_high_125 = ta.crossover(price, high_125)
cross_below_high_125 = ta.crossunder(price, high_125)

// Volume condition: Check if current volume is at least 2 times the previous volume
volume_increased = volume > 2 * volume[1]

// Entry logic for RSI and 125-day high with volume filter
if (not na(vrsi))
    if (co and volume_increased)
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    if (cu and volume_increased)
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")

// Entry logic for 125-day high crossing with volume filter
if (cross_above_high_125 and volume_increased)
    strategy.entry("BuyHigh125", strategy.long, comment="BuyHigh125")

if (cross_below_high_125 and volume_increased)
    strategy.entry("SellHigh125", strategy.short, comment="SellHigh125")

// Plot the 125-day high for visualization
plot(high_125, title="125-Day High", color=color.orange, linewidth=2, style=plot.style_line)

```

> Detail

https://www.fmz.com/strategy/483056

> Last Modified

2025-02-21 11:15:54
