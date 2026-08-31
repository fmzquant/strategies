
> Name

EMA趋势结合轮回位突破交易策略-EMA-Trend-with-Round-Number-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/deb58225b936ed5401.png)


#### Overview
This is a quantitative trading strategy that combines EMA trend, round number breakout, and trading session filtering. The strategy primarily relies on EMA trend direction, coupled with price breakout patterns at key round number levels as trading signals, while incorporating session filtering to enhance trade quality. The strategy employs percentage-based stop-loss and take-profit for risk management.

#### Strategy Principles
The core logic includes the following key elements:
1. Uses 20-day EMA as a trend identification tool, only going long above EMA and short below
2. Looks for engulfing patterns near key round numbers ($5 intervals)
3. Only trades during London and New York sessions to avoid low volatility periods
4. Long signals require: bullish engulfing pattern, price above EMA, active trading session
5. Short signals require: bearish engulfing pattern, price below EMA, active trading session
6. Implements 1% stop-loss and 1.5% take-profit risk-reward ratio for trade management

#### Strategy Advantages
1. Multiple signal confirmation mechanism significantly improves trade reliability
2. Combines technical analysis with psychological price levels for higher win rate
3. Session filtering ensures trading during active market periods, avoiding false breakouts
4. Fixed percentage stop-loss and take-profit facilitates risk management
5. Clear strategy logic, easy to understand and execute
6. Suitable for markets with higher volatility

#### Strategy Risks
1. May generate excessive false signals in ranging markets
2. Fixed stop-loss and take-profit lack flexibility, might miss larger moves
3. Relies solely on technical indicators, ignoring fundamental factors
4. Subject to slippage risk during major news releases
5. Session restrictions might miss opportunities in other periods

#### Optimization Directions
1. Introduce adaptive stop-loss and take-profit mechanisms based on market volatility
2. Add volume confirmation indicators to enhance breakout reliability
3. Incorporate trend strength filters to avoid trading in weak trends
4. Consider adding market sentiment indicators to optimize entry timing
5. Develop more intelligent round number level identification algorithms

#### Summary
The strategy constructs a logically rigorous trading system by combining multiple mechanisms including EMA trends, price patterns, and session filtering. While it has certain limitations, continuous optimization and refinement can potentially enhance the strategy's stability and profitability. The strategy serves as a solid foundation for a medium to long-term trend following system, suitable for customization based on specific trading requirements.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-17 00:00:00
end: 2025-01-16 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/


//@version=6
strategy("The Gold Box Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=200)

// Inputs
roundNumberInterval = input.int(5, title="Round Number Interval ($)", minval=1)
useEMA = input.bool(true, title="Use 20 EMA for Confluence")
emaLength = input.int(20, title="EMA Length")

// Session times for London and NY
londonSession = input("0300-1200", title="London Session (NY Time)")
nySession = input("0800-1700", title="New York Session (NY Time)")

// EMA Calculation
emaValue = ta.ema(close, emaLength)

// Plot Round Number Levels
roundLow = math.floor(low / roundNumberInterval) * roundNumberInterval
roundHigh = math.ceil(high / roundNumberInterval) * roundNumberInterval

// for level = roundLow to roundHigh by roundNumberInterval
//     line.new(x1=bar_index - 1, y1=level, x2=bar_index, y2=level, color=color.new(color.gray, 80), extend=extend.both)

// Session Filter
inLondonSession = not na(time("1", londonSession))
inNYSession = not na(time("1", nySession))
inSession = true

// Detect Bullish and Bearish Engulfing patterns
bullishEngulfing = close > open[1] and open < close[1] and close > emaValue and inSession
bearishEngulfing = close < open[1] and open > close[1] and close < emaValue and inSession

// Entry Conditions
if bullishEngulfing
    strategy.entry("Long", strategy.long, comment="Bullish Engulfing with EMA Confluence")
if bearishEngulfing
    strategy.entry("Short", strategy.short, comment="Bearish Engulfing with EMA Confluence")

// Stop Loss and Take Profit
stopLossPercent = input.float(1.0, title="Stop Loss (%)", minval=0.1) / 100
takeProfitPercent = input.float(1.5, title="Take Profit (%)", minval=0.1) / 100

strategy.exit("Exit Long", "Long", stop=close * (1 - stopLossPercent), limit=close * (1 + takeProfitPercent))
strategy.exit("Exit Short", "Short", stop=close * (1 + stopLossPercent), limit=close * (1 - takeProfitPercent))

```

> Detail

https://www.fmz.com/strategy/478736

> Last Modified

2025-01-17 16:17:10
