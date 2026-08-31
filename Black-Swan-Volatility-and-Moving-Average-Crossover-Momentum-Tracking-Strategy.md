
> Name

Black-Swan-Volatility-and-Moving-Average-Crossover-Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

#### Overview
This strategy is a momentum tracking trading system based on price volatility and moving average crossovers. It triggers signals by monitoring price volatility exceeding 1.91% (Black Swan events) and combines EMA144 and EMA169 crossovers to confirm trend direction and exit timing. The strategy is particularly suitable for short-term trading on 1-3 minute timeframes, capable of quickly capturing significant market volatility opportunities.

#### Strategy Principle
The core logic consists of two main components:
1. Volatility Monitoring: Calculates the absolute difference between closing and opening prices relative to the closing price, triggering trading signals when this ratio exceeds 1.91%.
2. Trend Confirmation: Uses EMA144 and EMA169 crossovers to confirm trend direction, going long on upward crosses and short on downward crosses. SMA60 and SMA20 are also incorporated as auxiliary indicators.

The strategy enters long positions when detecting upward volatility above 1.91% and short positions for downward volatility. Positions are automatically closed when moving averages cross in the opposite direction to manage risk.

#### Strategy Advantages
1. Quick Response: The strategy promptly captures sharp market movements, ideal for short-term trading.
2. Risk Control: Uses moving average crossovers as exit signals to effectively manage position risk.
3. High Flexibility: Allows for backtesting period customization and parameter adjustment to optimize for different market conditions.
4. Comprehensive Position Management: Uses account equity percentage for position sizing and supports up to 3x pyramid scaling.

#### Strategy Risks
1. False Breakout Risk: May generate false signals in highly volatile markets leading to unnecessary trades.
2. Slippage Risk: Short-term operations may face significant slippage losses.
3. Trend Reversal Risk: Possibility of rapid trend reversals following extreme volatility.
4. Parameter Sensitivity: Strategy performance is highly dependent on parameter settings, requiring frequent adjustments under different market conditions.

#### Optimization Directions
1. Incorporate Volatility Filtering: Recommend adding ATR indicator to filter market noise and improve signal quality.
2. Optimize Entry Timing: Consider adding volume confirmation to enhance entry accuracy.
3. Dynamic Parameter Adjustment: Suggest developing an adaptive parameter system to automatically adjust trigger thresholds based on market conditions.
4. Enhanced Stop-Loss Mechanism: Recommend adding trailing stop-loss functionality to better protect accumulated profits.

#### Summary
This strategy achieves quick response to market anomalies and trend following by combining volatility monitoring with moving average crossovers. While the strategy design is sound with good risk control mechanisms, traders need to optimize parameters and manage risks according to actual market conditions. It's recommended to start with small positions in live trading and gradually validate strategy performance across different market environments.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-05 00:00:00
end: 2024-12-12 00:00:00
period: 45m
basePeriod: 45m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

//黑天鹅警报器，作者（）：道格拉斯机器人
//适合1分钟-3分钟的k线，发生波动超过百分之二时，自动报警
strategy('黑天鹅警报', overlay=true, initial_capital=10000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075, pyramiding=3)
//-------------------------------------------
//-------------------------------------------
timecondition = timeframe.period == '480' or timeframe.period == '240' or timeframe.period == 'D' or timeframe.period == '720'
// Make input options that configure backtest date range
startDate = input.int(title='Start Date', defval=1, minval=1, maxval=31)
startMonth = input.int(title='Start Month', defval=11, minval=1, maxval=12)
startYear = input.int(title='Start Year', defval=2018, minval=1800, maxval=2100)
endDate = input.int(title='End Date', defval=1, minval=1, maxval=31)
endMonth = input.int(title='End Month', defval=11, minval=1, maxval=12)
endYear = input.int(title='End Year', defval=2031, minval=1800, maxval=2100)
// Look if the close time of the current bar
// falls inside the date range
inDateRange = time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0) and time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0)



// Inputs
a = input(1, title='Key Vaule. \'This changes the sensitivity\'')
c = input(10, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')


ma60 = ta.sma(close, 60)
ema144 = ta.ema(close, 144)

ema169 = ta.ema(close, 169)
ma20 = ta.sma(close, 20)


plot(ema144, color=color.new(color.yellow, 0), title='144')
plot(ema169, color=color.new(color.orange, 0), title='169')


heitiane = close - open
heitiane := math.abs(heitiane)
heitiane /= close

if inDateRange and heitiane > 0.0191 and close < open  //  and close>f3
    strategy.entry('botsell20', strategy.short, comment='黑天鹅追空' + str.tostring(heitiane))

if ta.crossover(ema144, ema169)
    strategy.close('botsell20', comment='平空')
if inDateRange and heitiane > 0.0191 and close > open  //  and close>f3
    strategy.entry('botbuy20', strategy.long, comment='白天鹅追多' + str.tostring(heitiane))

if ta.crossunder(ema144, ema169)
    strategy.close('botbuy20', comment='平多')



```

> Detail

https://www.fmz.com/strategy/474981

> Last Modified

2024-12-13 11:52:51
