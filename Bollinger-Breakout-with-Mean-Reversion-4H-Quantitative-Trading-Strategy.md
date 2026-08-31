
> Name

Bollinger-Breakout-with-Mean-Reversion-4H-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127bd5afed6ba204042.png)

[trans]
#### 概述
该策略是一个基于布林带指标的四小时级别量化交易系统,结合了趋势突破和均值回归的交易理念。策略通过布林带上下轨的突破来捕捉市场动量,同时利用价格回归均值的特性来进行获利了结,并通过止损控制风险。策略采用3倍杠杆,在保证收益的同时也充分考虑了风险控制。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用20周期的移动平均线作为布林带的中轨,并以2倍标准差作为波动区间
2. 开仓信号:当K线实体(开盘价和收盘价的均值)突破上轨时开多,突破下轨时开空
3. 平仓信号:多头持仓时,如果连续两根K线收盘价和开盘价都低于上轨且收盘价低于开盘价时平仓;空头持仓采用相反逻辑
4. 风险控制:建仓时以当前K线最高/最低点设置止损,确保单笔损失可控

#### 策略优势
1. 交易逻辑清晰:结合趋势和回归两种交易思路,能够在不同市场环境下都有良好表现
2. 风险控制完善:设置了基于K线波动的动态止损,可以有效控制回撤
3. 过滤伪信号:通过判断K线实体的位置而非仅靠收盘价来确认突破,减少假突破带来的损失
4. 资金管理合理:基于账户权益动态调整持仓规模,既保证了收益又控制了风险

#### 策略风险
1. 震荡市场风险:在横盘震荡行情下可能频繁触发假突破信号,导致连续止损
2. 杠杆风险:使用3倍杠杆在剧烈波动时可能带来较大损失
3. 止损设置风险:以K线最高/最低点设置止损可能过于宽松,增加单笔损失
4. 时间周期依赖:四小时级别在某些市场环境下可能反应过慢,错过行情

#### 策略优化方向
1. 引入趋势过滤器:可以添加更长周期的趋势判断指标,在主趋势方向上进行交易
2. 优化止损方案:考虑使用ATR或布林带宽度来动态调整止损距离
3. 增加仓位管理:根据波动率或趋势强度动态调整杠杆倍数
4. 添加市场环境判断:引入成交量或波动率指标来识别当前市场状态,选择性开仓

#### 总结
这是一个将布林带指标的趋势跟随和均值回归特性相结合的策略,通过严格的开平仓条件和风险控制措施,实现了在趋势和震荡市场中都能获得稳定收益的目标。策略的核心优势在于其清晰的交易逻辑和完善的风险控制体系,但仍需要注意杠杆使用和市场环境判断等方面的优化,以进一步提高策略的稳定性和收益能力。 ||

#### Overview
This strategy is a 4-hour timeframe quantitative trading system based on Bollinger Bands, combining trend breakout and mean reversion trading concepts. The strategy captures market momentum through Bollinger Bands breakouts while using price mean reversion for profit-taking and implementing stop-loss for risk control. It employs 3x leverage, ensuring returns while thoroughly considering risk management.

#### Strategy Principles
The core logic is based on the following key elements:
1. Uses 20-period moving average as the middle band, with 2 standard deviations for the volatility range
2. Entry signals: Long when candle body (average of open and close) breaks above upper band, short when breaks below lower band
3. Exit signals: Close long positions when two consecutive candles have both open and close prices below the upper band and close below open; reverse logic for short positions
4. Risk control: Sets stop-loss at current candle high/low points to ensure controlled losses per trade

#### Strategy Advantages
1. Clear trading logic: Combines trend and reversion trading approaches for good performance in various market conditions
2. Comprehensive risk control: Implements dynamic stop-loss based on candle volatility for effective drawdown control
3. False signal filtering: Confirms breakouts using candle body position rather than just closing price to reduce false breakout losses
4. Sound money management: Dynamically adjusts position size based on account equity, balancing returns and risk

#### Strategy Risks
1. Sideways market risk: May trigger frequent false breakout signals in ranging markets, leading to consecutive stops
2. Leverage risk: 3x leverage may cause significant losses during extreme volatility
3. Stop-loss setting risk: Using candle high/low points for stops may be too loose, increasing per-trade losses
4. Timeframe dependency: 4-hour timeframe may react too slowly in certain market conditions, missing opportunities

#### Strategy Optimization Directions
1. Implement trend filter: Add longer-term trend indicators to trade in primary trend direction
2. Optimize stop-loss approach: Consider using ATR or Bollinger Band width for dynamic stop-loss distances
3. Enhance position management: Dynamically adjust leverage based on volatility or trend strength
4. Add market condition analysis: Incorporate volume or volatility indicators to identify market states for selective entry

#### Summary
This strategy combines Bollinger Bands' trend-following and mean-reversion characteristics, achieving stable returns in both trending and ranging markets through strict entry/exit conditions and risk control measures. Its core strengths lie in clear trading logic and comprehensive risk management system, but attention must be paid to leverage usage and market condition judgment optimization to further improve strategy stability and profitability. 
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-10 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger 4H Follow", overlay=true, initial_capital=300, commission_type=strategy.commission.percent, commission_value=0.04)
// StartYear = input(2022,"Backtest Start Year") 
// StartMonth = input(1,"Backtest Start Month") 
// StartDay = input(1,"Backtest Start Day")

// testStart = timestamp(StartYear,StartMonth,StartDay,0,0)

// EndYear = input(2023,"Backtest End Year")
// EndMonth = input(12,"Backtest End Month")
// EndDay = input(31,"Backtest End Day")

// testEnd = timestamp(EndYear,EndMonth,EndDay,0,0)

lev = 3

// Input parameters
length = input.int(20, title="Bollinger Band Length")
mult = input.float(2.0, title="Bollinger Band Multiplier")

// Bollinger Bands calculation
basis = ta.sma(close, length)
upperBand = basis + mult * ta.stdev(close, length)
lowerBand = basis - mult * ta.stdev(close, length)

// Conditions for Open Long
openLongCondition = strategy.position_size == 0 and close > open and (close + open) / 2 > upperBand

// Conditions for Open Short
openShortCondition = strategy.position_size == 0 and close < open and (close + open) / 2 < lowerBand

// Conditions for Close Long
closeLongCondition = strategy.position_size > 0 and strategy.position_size > 0 and (close < upperBand and open < upperBand and close < open)

// Conditions for Close Short
closeShortCondition = strategy.position_size < 0 and strategy.position_size < 0 and (close > lowerBand and open > lowerBand and close > open)


// Long entry
if openLongCondition
    strategy.entry("Long", strategy.long, qty=strategy.equity * lev / close)
    strategy.exit("Long SL", from_entry="Long", stop=low)  // Set Stop-Loss

// Short entry
if openShortCondition
    strategy.entry("Short", strategy.short, qty=strategy.equity * lev / close)
    strategy.exit("Short SL", from_entry="Short", stop=high)  // Set Stop-Loss

// Long exit
if closeLongCondition
    strategy.close("Long", comment = "TP")

// Short exit
if closeShortCondition
    strategy.close("Short", comment = "TP")

// Plot Bollinger Bands
plot(upperBand, color=color.yellow, title="Upper Band")
plot(lowerBand, color=color.yellow, title="Lower Band")
```

> Detail

https://www.fmz.com/strategy/474810

> Last Modified

2024-12-12 11:24:28
