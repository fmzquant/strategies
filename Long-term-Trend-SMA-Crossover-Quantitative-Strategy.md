
> Name

Long-term-Trend-SMA-Crossover-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

#### Overview
This strategy is a quantitative trading system based on multi-period Simple Moving Average (SMA) crossover signals. It primarily identifies pullback opportunities within long-term uptrends. The strategy utilizes SMAs of five different periods (5, 10, 20, 60, and 120 days) to determine market trends and trading opportunities through their relative positions and crossover signals.

#### Strategy Principles
The core logic includes several key components:
1. Long-term trend identification through the relative position of SMA20 and SMA60, confirming an uptrend when SMA20 is above SMA60.
2. Buy signals are triggered when the short-term SMA5 crosses above SMA20 after a pullback, indicating a rebound within the uptrend.
3. Exit signals occur when SMA20 crosses above SMA5, suggesting weakening short-term momentum.
4. The strategy includes a time filter functionality to limit backtesting periods, enhancing flexibility.

#### Strategy Advantages
1. Clear and simple logic that is easy to understand and implement, avoiding complex calculations.
2. Effective noise filtering through the use of multiple period moving averages, improving signal reliability.
3. Focus on pullback opportunities within trending markets, aligning with core trend-following principles.
4. Use of SMA instead of EMA reduces price sensitivity and false signals.
5. Clear entry and exit logic facilitates execution and risk management.

#### Strategy Risks
1. Inherent lag in moving average systems may lead to suboptimal entry and exit timing.
2. Frequent crossovers in ranging markets may generate excessive false signals.
3. Lack of volatility filtering mechanism exposes the strategy to significant drawdown risk in high volatility periods.
4. Reliability of signals may be compromised without volume confirmation.
5. Fixed moving average parameters may not suit all market conditions.

#### Optimization Directions
1. Implement ATR indicator for volatility filtering to avoid trading in high volatility periods.
2. Incorporate volume confirmation mechanism to enhance signal reliability.
3. Develop adaptive moving average periods to better suit different market environments.
4. Add trend strength filters, such as ADX indicator, to ensure trading in strong trends only.
5. Enhance stop-loss mechanisms, including trailing stops, for better risk control.

#### Summary
The strategy builds a trading system focused on capturing pullback opportunities within long-term uptrends through the coordinated use of multiple-period SMAs. Its design is practical and straightforward, offering good comprehensibility and executability. The strategy's robustness and reliability can be further enhanced through the introduction of volatility filtering, volume confirmation, and other optimization measures.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Long-Term Growing Stock Strategy", overlay=true)
// Date Range
// STEP 1. Create inputs that configure the backtest's date range
useDateFilter = input.bool(true, title="Filter Date Range of Backtest",group="Backtest Time Period")
backtestStartDate = input(timestamp("1 Jan 2014"),title="Start Date", group="Backtest Time Period",tooltip="This start date is in the time zone of the exchange " + "where the chart's instrument trades. It doesn't use the time " +"zone of the chart or of your computer.")
backtestEndDate = input(timestamp("31 Dec 2024"), title="End Date", group="Backtest Time Period")
// STEP 2. See if current bar falls inside the date range
inTradeWindow = true


// Calculate EMAs
// ema20 = ta.ema(close, ema20_length)
// ema60 = ta.ema(close, ema60_length)
// ema120 = ta.ema(close, ema120_length)
sma5 = ta.sma(close, 5)
sma10 = ta.sma(close, 10)
sma20 = ta.sma(close, 20)
sma60 = ta.sma(close, 60)
sma120 = ta.sma(close, 120)

// Long-term growth condition: EMA 20 > EMA 60 > EMA 120
longTermGrowth = sma20 > sma60
//  and ema60 > ema120

// Entry condition: Stock closes below EMA 20 and then rises back above EMA 10

// entryCondition = ta.crossover(close, ema20) or (close[1] < ema20[1] and close > ema20)
entryCondition =  sma5[1] <= sma20[1] and sma5 > sma20
// ta.crossover(sma5, sma20)

// Exit condition: EMA 20 drops below EMA 60
// exitCondition = ema5 < ema60 or (year == 2024 and month == 12 and dayofmonth == 30)
exitCondition = ta.crossover(sma20, sma5)

// Execute trades
if entryCondition and inTradeWindow
    strategy.entry("Long Entry", strategy.long)

if exitCondition and inTradeWindow
    strategy.close("Long Entry")
// plotchar(true, char="sma5: " + str.tostring(sma5))
// plotchar(true, char="sma5: " + sma20)
// label.new(x=bar_index, y=high + 10, text="SMA 5: " + str.tostring(sma5), color=color.blue, style=label.style_label_down, textcolor=color.white, size=size.small)
// label.new(x=bar_index, y=low, text="SMA 20: " + str.tostring(sma20), color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)


// x = time + (time - time[1]) * offset_x

//     var label lab = na
//     label.delete(lab)
//     lab := label.new(x=x, y=0, text=txt, xloc=xloc.bar_time, yloc=yloc.belowbar, color=color.red, textcolor=color.black, size=size.normal, style=label.style_label_up)
//     label.set_x(lab, x)



// Plot EMAs for visualization
// plot(ema20, color=color.red, title="EMA 20")
// plot(ema60, color=color.green, title="EMA 60")
// plot(ema120, color=color.blue, title="EMA 120")
```

> Detail

https://www.fmz.com/strategy/477614

> Last Modified

2025-01-06 17:01:08
