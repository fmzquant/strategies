
> Name

Multi-Period-Moving-Average-Trend-Following-with-VWAP-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11e7764c35cee6f497f.png)

#### Overview
This strategy is a trend following system that combines multiple period moving averages with Volume Weighted Average Price (VWAP). The strategy identifies trend direction through the crossover of three Simple Moving Averages (SMA) - 9-period, 50-period, and 200-period, while using VWAP as a price strength confirmation indicator, implementing a multi-dimensional trading signal confirmation mechanism. The strategy is suitable for both intraday trading (1-minute chart) and swing trading (1-hour chart).

#### Strategy Principles
The core logic of the strategy is built on several key elements:
1. Using SMA9 and SMA50 crossover to trigger trading signals
2. Using SMA200 as a long-term trend filter
3. Incorporating VWAP for price strength confirmation

Long entry conditions require:
- SMA9 crosses above SMA50
- SMA200 is below SMA50 (confirming uptrend)
- Closing price is above VWAP (confirming price strength)

Short entry conditions require:
- SMA9 crosses below SMA50
- SMA200 is above SMA50 (confirming downtrend)
- Closing price is below VWAP (confirming price weakness)

#### Strategy Advantages
1. Multiple confirmation mechanism: The triple moving average system combined with VWAP greatly reduces false breakout risks
2. High adaptability: The strategy can be used across different timeframes, suitable for various trading styles
3. Trend filtering: Using SMA200 as a trend filter avoids frequent trading in ranging markets
4. Volume-price integration: Incorporating VWAP achieves organic combination of price and volume
5. Simple execution: Strategy logic is clear, easy to understand and implement
6. Controlled risk: Clear stop-loss conditions enable timely exit

#### Strategy Risks
1. Lag risk: Moving averages inherently have lag, which may delay entry and exit timing
2. Consolidation risk: May generate frequent false signals in ranging markets
3. Trend reversal risk: May experience significant drawdowns during rapid trend reversals
4. Parameter sensitivity: Optimal parameters may vary across different market conditions

Risk control suggestions:
- Recommend combining other technical indicators for trade confirmation
- Set appropriate stop-loss levels
- Adjust parameters according to different market cycles
- Control position size for each trade

#### Strategy Optimization Directions
1. Dynamic parameter optimization:
- Dynamically adjust moving average periods based on market volatility
- Introduce adaptive parameter mechanisms

2. Signal filtering enhancement:
- Add volume confirmation mechanism
- Implement volatility filters
- Incorporate price pattern analysis

3. Risk management optimization:
- Implement dynamic position sizing
- Optimize stop-loss and take-profit mechanisms
- Add drawdown control

4. Market adaptability enhancement:
- Add market condition identification mechanism
- Apply different parameter settings for different market states

#### Summary
This is a complete trading system combining multiple period moving averages and VWAP, providing reliable trading signals through multiple confirmation mechanisms. The strategy's strengths lie in its clear logic, ease of execution, and good risk control capabilities. While it has certain risks related to lag and parameter sensitivity, these can be addressed through the suggested optimization directions to further enhance stability and adaptability. The strategy serves as a solid foundation framework that traders can customize according to their trading style and market environment.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-05 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5  
strategy("SMA Crossover Strategy with VWAP", overlay=true)  

// Input lengths for SMAs  
sma9Length = 9  
sma50Length = 50  
sma200Length = 200  

// Calculate SMAs  
sma9 = ta.sma(close, sma9Length)      // 9-period SMA  
sma50 = ta.sma(close, sma50Length)    // 50-period SMA  
sma200 = ta.sma(close, sma200Length)  // 200-period SMA  

// Calculate VWAP  
vwapValue = ta.vwap(close)  

// Long entry condition: SMA 9 crosses above SMA 50 and SMA 200 is less than SMA 50, and close is above VWAP  
longCondition = ta.crossover(sma9, sma50) and (sma200 < sma50) and (close > vwapValue)  
if (longCondition)  
    strategy.entry("Long", strategy.long)  

// Exit condition for long: SMA 9 crosses below SMA 50  
longExitCondition = ta.crossunder(sma9, sma50)  
if (longExitCondition)  
    strategy.close("Long")  

// Short entry condition: SMA 9 crosses below SMA 50 and SMA 200 is greater than SMA 50, and close is below VWAP  
shortCondition = ta.crossunder(sma9, sma50) and (sma200 > sma50) and (close < vwapValue)  
if (shortCondition)  
    strategy.entry("Short", strategy.short)  

// Exit condition for short: SMA 9 crosses above SMA 50  
shortExitCondition = ta.crossover(sma9, sma50)  
if (shortExitCondition)  
    strategy.close("Short")  

// Plotting the indicators on the chart  
plot(sma9, color=color.blue, title="SMA 9")  
plot(sma50, color=color.orange, title="SMA 50")  
plot(sma200, color=color.red, title="SMA 200")  
plot(vwapValue, color=color.green, title="VWAP")
```

> Detail

https://www.fmz.com/strategy/477582

> Last Modified

2025-01-06 15:30:00
