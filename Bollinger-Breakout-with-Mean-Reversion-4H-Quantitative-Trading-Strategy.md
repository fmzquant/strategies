
> Name

Bollinger-Breakout-with-Mean-Reversion-4H-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127bd5afed6ba204042.png)

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
