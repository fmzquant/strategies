
> Name

多周期趋势跟踪与随机震荡优化策略-Multi-Timeframe-Trend-Following-with-Stochastic-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1442328dd20e2bf87f9.png)


#### Overview
This strategy is a multi-timeframe trend following trading system that combines Exponential Moving Average (EMA) and Stochastic Oscillator to determine trading direction and entry timing. It confirms trends on the 15-minute timeframe and seeks specific entry opportunities on the 1-5 minute timeframe, optimizing trading performance through strict risk management and scaled profit-taking.

#### Strategy Principles
The strategy employs a multi-level trade validation mechanism:
1. Trend Confirmation: Uses 50-period EMA as a trend direction benchmark, with price above EMA indicating uptrend and below indicating downtrend
2. Entry Conditions: After trend confirmation, uses Stochastic Oscillator (14,3,3) to identify oversold/overbought opportunities, entering longs below 30 and shorts above 70
3. Position Management: Uses fixed position size of 0.02 units per trade
4. Risk Control: Sets stop-loss at 1.5x ATR and moves it to breakeven when price reaches 50% of target
5. Profit Taking: Implements two-stage profit-taking, first at 1:1 risk-reward ratio and second at 1.5x target

#### Strategy Advantages
1. Multi-timeframe Analysis Accuracy: Combines higher and lower timeframes to ensure both trend direction accuracy and precise entry timing
2. Comprehensive Risk Management: Uses volatility-based dynamic stop-loss to avoid the limitations of fixed stops
3. Flexible Profit-taking: Scaled exit strategy allows for both profit protection and participation in larger moves
4. Moving Stop-loss Protection: Protects accumulated profits by moving stops to breakeven as price moves favorably

#### Strategy Risks
1. Choppy Market Risk: May generate false signals leading to consecutive losses in range-bound markets
2. Slippage Risk: Actual execution prices may significantly deviate from theoretical prices during volatile periods
3. Money Management Risk: Fixed position sizing may not suit all account sizes
4. Parameter Sensitivity: Strategy performance heavily depends on EMA and Stochastic parameter settings

#### Strategy Optimization Directions
1. Market Environment Filtering: Introduce volatility or trend strength indicators to adjust parameters or suspend trading in different market conditions
2. Dynamic Position Sizing: Adjust trade size based on account equity and market volatility
3. Entry Condition Enhancement: Add price pattern or additional technical indicator confirmation to improve signal reliability
4. Stop/Target Optimization: Implement dynamic risk-reward ratios based on market conditions for more flexible capital management

#### Summary
This strategy constructs a comprehensive trend following system through multi-timeframe analysis and multiple technical indicators. Its core strengths lie in strict risk management and flexible profit-taking, though practical application requires parameter optimization based on market conditions and account size. Through the suggested optimization directions, the strategy has potential for more stable performance across various market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("15-Min Trend Strategy", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1)

// Define EMA for trend confirmation
ema50 = ta.ema(close, 50)
trendLong = close > ema50
trendShort = close < ema50

// Stochastic settings
length = 14
smoothK = 3
smoothD = 3
stochK = ta.sma(ta.stoch(close, high, low, length), smoothK)
stochD = ta.sma(stochK, smoothD)

// Entry conditions
longCondition = stochK < 30 and trendLong
shortCondition = stochK > 70 and trendShort

// ATR-based stop-loss calculation
atrValue = ta.atr(14)
stopLossLong = close - (1.5 * atrValue)
stopLossShort = close + (1.5 * atrValue)
takeProfitLong = close + (2 * atrValue)
takeProfitShort = close - (2 * atrValue)

// Execute trades
if longCondition
    strategy.entry("Long", strategy.long, qty=2)
    strategy.exit("TP Long 1", from_entry="Long", qty=1, stop=stopLossLong, limit=takeProfitLong)
    strategy.exit("TP Long 2", from_entry="Long", qty=1, stop=stopLossLong, limit=takeProfitLong * 1.5)

if shortCondition
    strategy.entry("Short", strategy.short, qty=2)
    strategy.exit("TP Short 1", from_entry="Short", qty=1, stop=stopLossShort, limit=takeProfitShort)
    strategy.exit("TP Short 2", from_entry="Short", qty=1, stop=stopLossShort, limit=takeProfitShort * 1.5)

// Move SL to breakeven after 50% move to target
if strategy.position_size > 0
    if strategy.position_avg_price != 0
        moveToBELong = close >= (strategy.position_avg_price + (takeProfitLong - strategy.position_avg_price) * 0.5)
        if moveToBELong
            strategy.exit("BE Long", from_entry="Long", qty=1, stop=strategy.position_avg_price)
        
        moveToBEShort = close <= (strategy.position_avg_price - (strategy.position_avg_price - takeProfitShort) * 0.5)
        if moveToBEShort
            strategy.exit("BE Short", from_entry="Short", qty=1, stop=strategy.position_avg_price)
```

> Detail

https://www.fmz.com/strategy/482456

> Last Modified

2025-02-18 15:09:41
