
> Name

Dynamic-Trend-Following-Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7e543ecd39c6548c02.png)


#### Overview
This strategy is a dynamic trend-following system based on technical analysis, primarily utilizing dual moving averages (200-day SMA and 21-week EMA) to identify market trends. The strategy integrates the Relative Strength Index (RSI) and Average Directional Index (ADX) as momentum filters, combined with Average True Range (ATR) for dynamic risk management, achieving precise capture of uptrends and effective risk control.

#### Strategy Principles
The core logic of the strategy is built on several key elements:
1. Uses dual confirmation from 200-day Simple Moving Average (SMA) and 21-week Exponential Moving Average (EMA) to define bullish market conditions
2. Ensures continued upward momentum through RSI>50 condition
3. Validates trend strength with ADX>25 condition
4. Implements dynamic stop-loss based on ATR, providing risk control adapted to market volatility
5. Employs percentage-based take-profit mechanism to secure gains at predetermined levels

#### Strategy Advantages
1. System demonstrates good adaptability with dynamic stop-loss adjustment based on market volatility
2. Dual moving average crossover provides reliable trend confirmation signals, effectively reducing false breakout risks
3. Combination of RSI and ADX significantly improves entry signal quality
4. Highly customizable strategy parameters facilitate optimization for different market environments
5. Daily timeframe trading reduces transaction costs and short-term volatility impact

#### Strategy Risks
1. May generate frequent false signals in ranging markets, increasing transaction costs
2. Moving average strategies inherently lag, potentially missing early trend gains
3. Multiple filter conditions might cause missed trading opportunities
4. ATR-based stops may become too wide in highly volatile markets
5. Fixed percentage take-profit might exit profitable positions too early in strong trends

#### Strategy Optimization Directions
1. Consider incorporating volume indicators for signal confirmation
2. Implement dynamic take-profit mechanism to better adapt to different market phases
3. Optimize RSI and ADX parameters to improve signal timeliness
4. Add trend strength classification for dynamic position management
5. Introduce volatility indicators to adjust trading frequency during high volatility periods

#### Summary
This is a well-designed trend-following strategy with clear logic, effectively balancing returns and risks through multiple technical indicators. The strategy's high customizability makes it suitable for maintaining effectiveness across different market environments through parameter optimization. While it carries some inherent lag risks, the comprehensive risk control mechanisms contribute to overall stability and reliability.



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-02-09 00:00:00
end: 2025-02-06 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("BTCUSDT Daily - Enhanced Bitcoin Bull Market Support [CYRANO]", shorttitle="BTCUSDT Daily BULL MARKET", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3)

// Inputs
smaLength = input.int(200, title="SMA Length (Bull Market)")
emaLength = input.int(147, title="EMA Length (21-Week Approximation)")
atrLength = input.int(14, title="ATR Length")
riskATR = input.float(2.0, title="ATR Multiplier for Stop Loss", step=0.1)
takeProfitPercent = input.float(10.0, title="Take Profit (%)", step=0.1)
rsiFilter = input.bool(true, title="Enable RSI Filter")
rsiLength = input.int(14, title="RSI Length")
adxFilter = input.bool(true, title="Enable ADX Filter")
adxThreshold = input.float(25, title="ADX Threshold")

// Date Range Filter
startDate = input(timestamp("2018-01-01 00:00 +0000"), title="Start Date")
endDate = input(timestamp("2069-12-31 00:00 +0000"), title="End Date")
inDateRange = true

// Moving Averages
sma200 = ta.sma(close, smaLength)
ema21w = ta.ema(close, emaLength)

// ATR Calculation
atr = ta.atr(atrLength)
stopLoss = close - (riskATR * atr)
takeProfit = close * (1 + takeProfitPercent / 100)

// RSI Filter
rsi = ta.rsi(close, rsiLength)
rsiCondition = rsiFilter ? rsi > 50 : true

// ADX Filter
[diplus, diminus, adx] = ta.dmi(14, 14)
adxCondition = adxFilter ? adx > adxThreshold : true

// Entry and Exit Conditions
buyCondition = inDateRange and close > sma200 and close > ema21w and rsiCondition and adxCondition
exitCondition = inDateRange and (close < sma200 or close < ema21w)

// Strategy Execution
if buyCondition
    strategy.entry("BUY", strategy.long, stop=stopLoss, limit=takeProfit)

if exitCondition
    strategy.close("BUY")

// Plot MAs
plot(sma200, title="200-Day SMA", color=color.blue, linewidth=2)
plot(ema21w, title="21-Week EMA", color=color.purple, linewidth=2)

// Background Highlight
bullColor = color.new(color.green, 80)
bearColor = color.new(color.red, 80)
bgcolor(close > sma200 and close > ema21w ? bullColor : bearColor, title="Bull Market Background")

```

> Detail

https://www.fmz.com/strategy/481107

> Last Modified

2025-02-08 15:18:58
