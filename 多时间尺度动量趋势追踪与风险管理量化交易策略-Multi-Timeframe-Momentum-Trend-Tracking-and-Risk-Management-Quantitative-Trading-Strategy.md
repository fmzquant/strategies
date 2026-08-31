
> Name

多时间尺度动量趋势追踪与风险管理量化交易策略-Multi-Timeframe-Momentum-Trend-Tracking-and-Risk-Management-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d82d56144acee2606b21.png)
![IMG](https://www.fmz.com/upload/asset/2d8453adbca65a5c5a955.png)





#### Overview

This is a quantitative trading strategy based on multi-timeframe technical indicator combinations, achieving precise market entry and risk control through comprehensive analysis of moving averages, Stochastic Relative Strength Index (SRI), and price momentum. The strategy aims to capture market trends while effectively managing trading risks, suitable for quantitative traders seeking stable returns.

#### Strategy Principles

The strategy's core consists of five key technical indicators:
1. Moving Average Indicators:
- 5-day, 10-day, 50-day, and 100-day Simple Moving Averages (SMA)
- Determine market trend direction through relative positions of moving averages
- Confirm entry signals based on price and moving average relationships

2. Stochastic Relative Strength Index (SRI):
- Calculated using 1-minute timeframe
- SRI below 70 as long entry signal
- SRI above 30 as short entry signal

3. Candlestick Patterns:
- Analyze opening price relative to previous candle's close
- Determine current price momentum and market sentiment

4. Risk Management Mechanism:
- Set Take Profit (TP) and Stop Loss (SL) points
- Implement Break-Even (BE) strategy
- Dynamically adjust stop loss positions

#### Strategy Advantages

1. Multi-Dimensional Signal Verification
- Comprehensive use of moving averages, SRI, and price momentum
- Significantly reduce false signal probability
- Improve trading signal reliability

2. Flexible Risk Control
- Preset take profit and stop loss points
- Dynamic break-even mechanism
- Effectively control maximum loss per trade

3. Multi-Timeframe Analysis
- Combine moving averages of different periods
- Comprehensively capture market trends
- Enhance strategy adaptability

4. Parameter Adjustability
- Customizable take profit and stop loss points
- Adapt to different market environments and trading varieties

#### Strategy Risks

1. Parameter Sensitivity Risk
- Moving average and SRI parameters significantly impact strategy performance
- Require comprehensive backtesting and parameter optimization

2. Extreme Market Volatility Risk
- Strategy may fail under extreme market conditions
- Recommend setting maximum drawdown limits

3. Over-Trading Risk
- Frequent trading may increase transaction costs
- Need adjustment based on actual trading expenses

4. Indicator Lagging Risk
- Moving averages have inherent lag
- May miss early-stage trend signals

#### Strategy Optimization Directions

1. Introduce Machine Learning Algorithms
- Use supervised learning to optimize parameters
- Dynamically adjust take profit and stop loss points
- Enhance strategy adaptability

2. Add Additional Filtering Conditions
- Introduce volume indicators
- Incorporate trend strength indicators
- Improve signal accuracy

3. Multi-Variety Adaptability Optimization
- Develop universal parameter adaptation mechanism
- Reduce manual intervention
- Improve strategy universality

#### Summary

This is a quantitative trading strategy based on multi-timeframe analysis, aiming to capture market trends and control trading risks through comprehensive technical indicators and advanced risk management mechanisms. The strategy's core advantages lie in multi-dimensional signal verification and flexible risk control. Future improvements will focus on enhancing stability and return rates through machine learning and more complex technical indicator combinations.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-17 00:00:00
end: 2025-04-15 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"TRX_USD"}]
*/

//@version=6
strategy("Strategia LONG & SHORT con TP, SL e BE", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1)

// === INPUT === //
tp_points = input.int(60000, "Take Profit (punti)")
sl_points = input.int(25000, "Stop Loss (punti)")
breakeven_trigger = tp_points * 0.5

// === MEDIE MOBILI === //
ma5  = ta.sma(close, 5)
ma10 = ta.sma(close, 10)
ma50 = ta.sma(close, 50)
ma100 = ta.sma(close, 100)

// === SRI da timeframe 1 minuto === //
sri_tf = "1"
sri_length = 10
sri_src = close
sri = request.security(syminfo.tickerid, sri_tf, ta.stoch(sri_src, sri_src, sri_src, sri_length))

// === CONDIZIONI LONG === //
long_candle        = open > close[1]
price_above_ma100  = close > ma100
ma50_above_ma100   = ma50 > ma100
ma5_above_ma10     = ma5 > ma10
sri_below_75       = sri < 70

long_condition = long_candle and price_above_ma100 and ma50_above_ma100 and ma5_above_ma10 and sri_below_75

// === CONDIZIONI SHORT === //
short_candle       = open < close[1]
price_below_ma100  = close < ma100
ma50_below_ma100   = ma50 < ma100
ma5_below_ma10     = ma5 < ma10
sri_above_25       = sri > 30

short_condition = short_candle and price_below_ma100 and ma50_below_ma100 and ma5_below_ma10 and sri_above_25

// === ENTRY LONG === //
if (long_condition)
    strategy.entry("Long", strategy.long)

// === ENTRY SHORT === //
if (short_condition)
    strategy.entry("Short", strategy.short)

// === GESTIONE USCITE === //
var float long_entry_price  = na
var float short_entry_price = na

// LONG: TP/SL + break-even
if (strategy.position_size > 0)
    if (na(long_entry_price))
        long_entry_price := strategy.position_avg_price

    tp_price_long = long_entry_price + tp_points * syminfo.mintick
    sl_price_long = long_entry_price - sl_points * syminfo.mintick
    be_trigger_long = long_entry_price + breakeven_trigger * syminfo.mintick
    sl_be = close >= be_trigger_long ? long_entry_price : sl_price_long

    strategy.exit("Exit Long", from_entry="Long", limit=tp_price_long, stop=sl_be)

// SHORT: TP/SL + break-even
if (strategy.position_size < 0)
    if (na(short_entry_price))
        short_entry_price := strategy.position_avg_price

    tp_price_short = short_entry_price - tp_points * syminfo.mintick
    sl_price_short = short_entry_price + sl_points * syminfo.mintick
    be_trigger_short = short_entry_price - breakeven_trigger * syminfo.mintick
    sl_be_short = close <= be_trigger_short ? short_entry_price : sl_price_short

    strategy.exit("Exit Short", from_entry="Short", limit=tp_price_short, stop=sl_be_short)

// Reset quando flat
if (strategy.position_size == 0)
    long_entry_price := na
    short_entry_price := na

```

> Detail

https://www.fmz.com/strategy/490908

> Last Modified

2025-04-17 14:01:16
