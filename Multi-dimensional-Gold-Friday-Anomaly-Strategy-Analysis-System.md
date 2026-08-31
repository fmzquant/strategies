
> Name

Multi-dimensional-Gold-Friday-Anomaly-Strategy-Analysis-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16869e9123f0f539fd7.png)

[trans]
#### 概述
本策略是一个基于市场异常现象的交易系统,主要利用从周四晚间收盘到周五收盘期间的市场行为特征进行交易。该策略采用固定的进场和出场时间,通过回测验证这一市场模式的有效性。策略使用10%的资金进行单次交易,并考虑了滑点和佣金因素,以确保回测结果的真实性。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 入场条件:在周四收盘时进场做多,这个时间点选择基于历史数据分析。
2. 出场条件:在周五收盘时平仓,持仓时间固定。
3. 资金管理:每次交易使用10%的账户资金,这种保守的仓位管理有助于控制风险。
4. 交易执行:在收盘价执行订单,可以避免日内剧烈波动带来的影响。

#### 策略优势
1. 简单明确:交易规则清晰,没有复杂的指标组合,易于理解和执行。
2. 风险可控:固定的持仓时间和资金管理方案,使得风险更容易评估和控制。
3. 自动化程度高:策略逻辑简单,适合编程实现自动化交易。
4. 灵活性强:可以根据不同的市场环境调整参数,适应性较好。

#### 策略风险
1. 时间依赖:策略严重依赖特定的时间窗口,可能受到非交易时段重大新闻的影响。
2. 市场环境变化:历史统计规律在未来可能失效,需要持续监控策略表现。
3. 执行风险:在收盘时段流动性可能不足,导致滑点增加。
建议通过以下方式管理风险:
- 设置止损止盈
- 动态调整持仓时间
- 增加过滤条件

#### 策略优化方向
1. 引入波动率指标:可以添加ATR指标来动态调整仓位大小,使策略更具适应性。
2. 优化进场时机:可以结合价格形态和技术指标,提高入场的准确性。
3. 完善风险控制:增加动态止损机制,保护既有利润。
4. 增加过滤条件:考虑加入趋势过滤器,避免在不利市场环境下交易。

#### 总结
该策略是一个基于市场异常现象的经典交易系统,通过严格的时间管理和保守的资金管理来获取潜在收益。虽然策略逻辑简单,但仍需要注意市场环境变化带来的风险,建议在实盘交易时采用更保守的仓位控制和更完善的风险管理机制。 || 

#### Overview
This strategy is a trading system based on market anomalies, primarily utilizing market behavior characteristics between Thursday evening close and Friday close. The strategy employs fixed entry and exit times, validating this market pattern through backtesting. It uses 10% of capital per trade and considers slippage and commission factors to ensure realistic backtesting results.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. Entry Condition: Enter long positions at Thursday's close, based on historical data analysis.
2. Exit Condition: Close positions at Friday's close, with fixed holding periods.
3. Money Management: Uses 10% of account capital per trade, this conservative position sizing helps control risk.
4. Trade Execution: Orders are executed at closing prices, avoiding intraday volatility impacts.

#### Strategy Advantages
1. Simple and Clear: Trading rules are straightforward, without complex indicator combinations, easy to understand and execute.
2. Controlled Risk: Fixed holding periods and money management plans make risk easier to assess and control.
3. High Automation: Simple strategy logic suitable for automated trading implementation.
4. High Flexibility: Parameters can be adjusted for different market environments, showing good adaptability.

#### Strategy Risks
1. Time Dependency: Strategy heavily relies on specific time windows, may be affected by major news during non-trading hours.
2. Market Environment Changes: Historical statistical patterns may become invalid in the future, requiring continuous strategy performance monitoring.
3. Execution Risk: Liquidity may be insufficient during closing periods, leading to increased slippage.
Risk management suggestions:
- Set stop-loss and take-profit levels
- Dynamically adjust holding periods
- Add filtering conditions

#### Strategy Optimization Directions
1. Incorporate Volatility Indicators: Add ATR indicator for dynamic position sizing, making the strategy more adaptive.
2. Optimize Entry Timing: Combine price patterns and technical indicators to improve entry accuracy.
3. Enhance Risk Control: Add dynamic stop-loss mechanisms to protect existing profits.
4. Add Filtering Conditions: Consider adding trend filters to avoid trading in unfavorable market conditions.

#### Summary
This strategy is a classic trading system based on market anomalies, seeking potential returns through strict time management and conservative money management. While the strategy logic is simple, attention must be paid to risks from changing market environments. It's recommended to use more conservative position sizing and comprehensive risk management mechanisms in live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-11 00:00:00
end: 2024-12-10 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © piirsalu

//@version=5
strategy("Gold Friday Anomaly Strategy", 
     default_qty_type=strategy.percent_of_equity,
     slippage = 1, commission_value=0.0005,
     process_orders_on_close = true,
     initial_capital = 50000,
     default_qty_value=500,
     overlay = true)
     

/////////////////////////////////////////////////////////////////////////////////////
//                                 . USER INPUTS .                                 //
/////////////////////////////////////////////////////////////////////////////////////

// Define backtest start and end dates
st_yr_inp = input(defval=2000, title='Backtest Start Year')
st_mn_inp = input(defval=01, title='Backtest Start Month')
st_dy_inp = input(defval=01, title='Backtest Start Day')
en_yr_inp = input(defval=2025, title='Backtest End Year')
en_mn_inp = input(defval=01, title='Backtest End Month')
en_dy_inp = input(defval=01, title='Backtest End Day')

// Set start and end timestamps for backtesting
start = timestamp(st_yr_inp, st_mn_inp, st_dy_inp, 00, 00)
end = timestamp(en_yr_inp, en_mn_inp, en_dy_inp, 00, 00)

/////////////////////////////////////////////////////////////////////////////////////
//                              . STRATEGY LOGIC .                                 //
/////////////////////////////////////////////////////////////////////////////////////

// Check if the current day is Friday
isFriday = (dayofweek == dayofweek.friday)

// Initialize a candle counter
var int barCounter = 0

// Increment the candle counter on each new bar
barCounter := barCounter + 1

// Define trading session time ranges
pre_mkt = time(timeframe.period, '0400-0800:23456')
mkt_hrs = time(timeframe.period, '0800-1600:23456')
eod = time(timeframe.period, '1200-1600:23456')

/////////////////////////////////////////////////////////////////////////////////////
//                          . STRATEGY ENTRY & EXIT .                              //
/////////////////////////////////////////////////////////////////////////////////////

// Enter a long position on the first candle of Friday within the backtest period
if dayofweek == 4 and time >= start and time <= end
    strategy.entry("BuyOnFriday", strategy.long)

// Close the position after holding it for 4 candles
if (barCounter % 1 == 0)
    strategy.close("BuyOnFriday")


```

> Detail

https://www.fmz.com/strategy/474877

> Last Modified

2024-12-12 16:32:12
