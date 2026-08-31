
> Name

Multi-Indicator-Adaptive-Trading-Strategy-Based-on-Gaussian-Channel-and-Stochastic-RSI

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8faca5beda094d2d67a.png)
![IMG](https://www.fmz.com/upload/asset/2d8aa8828b00689eaf96c.png)



#### Overview
This strategy is a comprehensive trading system combining Gaussian Channel Filter and Stochastic RSI indicators. It identifies trading opportunities through directional changes in the Gaussian Channel and price position, coupled with overbought/oversold signals from the Stochastic RSI. The strategy employs sophisticated mathematical models to construct adaptive channels, effectively filtering market noise and capturing significant price movements.

#### Strategy Principles
The core logic is based on the following key components:
1. Gaussian Channel Calculation: Uses multi-pole Gaussian filters to process HLC3 price data, creating adaptive channels. Optimizes filtering through beta and alpha parameters, with optional lag reduction.
2. Channel Width Adjustment: Dynamically adjusts channel width based on True Range (TR), using 1.414 as the default multiplier.
3. Stochastic RSI Signals: Combines 14-period RSI and stochastic indicators, generating signals above 80 or below 20.
4. Entry Conditions: Requires simultaneous satisfaction of upward Gaussian Channel, price breakthrough upper band, and Stochastic RSI trigger signals.
5. Exit Logic: Closes positions when price breaks below the Gaussian Channel upper band.

#### Strategy Advantages
1. Signal Reliability: Multiple indicator confirmation mechanism significantly improves trading signal reliability.
2. Strong Adaptability: Gaussian Channel automatically adjusts channel width based on market volatility.
3. Noise Filtering: Gaussian filters effectively reduce market noise impact.
4. High Flexibility: Offers multiple adjustable parameters, including channel period, number of poles, and RSI parameters.
5. Visual Intuition: Displays trend direction and trading signals through color changes intuitively.

#### Strategy Risks
1. Parameter Sensitivity: Strategy performance is highly dependent on Gaussian Channel pole count and sampling period settings.
2. Lag Risk: Despite lag reduction options, indicators still have inherent lag.
3. False Breakout Risk: Frequent false breakout signals may occur in ranging markets.
4. Insufficient Money Management: Current version lacks detailed position management mechanisms.

#### Strategy Optimization Directions
1. Market Environment Recognition: Add trend strength indicators to adjust strategy parameters in different market environments.
2. Dynamic Parameter Optimization: Automatically adjust Gaussian Channel parameters based on market volatility.
3. Position Management Enhancement: Introduce volatility-based dynamic position management system.
4. Exit Mechanism Enhancement: Add trailing stops and partial profit-taking mechanisms.
5. Timeframe Optimization: Validate signals across multiple timeframes to improve trading stability.

#### Summary
The strategy constructs a highly adaptive trading system by combining Gaussian Channel filters and Stochastic RSI indicators. The mathematical foundation of the Gaussian Channel ensures signal smoothness and reliability, while the Stochastic RSI combination further improves entry timing accuracy. The strategy's main advantages lie in its effective filtering of market noise and accurate trend capture, though attention must be paid to parameter optimization and risk management. Through the suggested optimization directions, there is room for further improvement in the strategy's overall performance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy(title="Gaussian Channel Strategy v3.0", overlay=true, calc_on_every_tick=false, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, slippage=0, fill_orders_on_standard_ohlc=true)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Gaussian Filter Functions (Must be declared first)
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
f_filt9x(_a, _s, _i) =>
    var int _m2 = 0, var int _m3 = 0, var int _m4 = 0, var int _m5 = 0, var int _m6 = 0, 
    var int _m7 = 0, var int _m8 = 0, var int _m9 = 0, var float _f = .0
    _x = 1 - _a
    _m2 := _i == 9 ? 36  : _i == 8 ? 28 : _i == 7 ? 21 : _i == 6 ? 15 : _i == 5 ? 10 : _i == 4 ? 6 : _i == 3 ? 3 : _i == 2 ? 1 : 0
    _m3 := _i == 9 ? 84  : _i == 8 ? 56 : _i == 7 ? 35 : _i == 6 ? 20 : _i == 5 ? 10 : _i == 4 ? 4 : _i == 3 ? 1 : 0
    _m4 := _i == 9 ? 126 : _i == 8 ? 70 : _i == 7 ? 35 : _i == 6 ? 15 : _i == 5 ? 5  : _i == 4 ? 1 : 0
    _m5 := _i == 9 ? 126 : _i == 8 ? 56 : _i == 7 ? 21 : _i == 6 ? 6  : _i == 5 ? 1  : 0 
    _m6 := _i == 9 ? 84  : _i == 8 ? 28 : _i == 7 ? 7  : _i == 6 ? 1  : 0 
    _m7 := _i == 9 ? 36  : _i == 8 ? 8  : _i == 7 ? 1  : 0 
    _m8 := _i == 9 ? 9   : _i == 8 ? 1  : 0 
    _m9 := _i == 9 ? 1   : 0
    _f := math.pow(_a, _i) * nz(_s) + _i * _x * nz(_f[1]) - (_i >= 2 ? _m2 * math.pow(_x, 2) * nz(_f[2]) : 0) + (_i >= 3 ? _m3 * math.pow(_x, 3) * nz(_f[3]) : 0) - (_i >= 4 ? _m4 * math.pow(_x, 4) * nz(_f[4]) : 0) + (_i >= 5 ? _m5 * math.pow(_x, 5) * nz(_f[5]) : 0) - (_i >= 6 ? _m6 * math.pow(_x, 6) * nz(_f[6]) : 0) + (_i >= 7 ? _m7 * math.pow(_x, 7) * nz(_f[7]) : 0) - (_i >= 8 ? _m8 * math.pow(_x, 8) * nz(_f[8]) : 0) + (_i == 9 ? _m9 * math.pow(_x, 9) * nz(_f[9]) : 0)

f_pole(_a, _s, _i) =>
    _f1 = f_filt9x(_a, _s, 1)
    _f2 = _i >= 2 ? f_filt9x(_a, _s, 2) : 0.0
    _f3 = _i >= 3 ? f_filt9x(_a, _s, 3) : 0.0
    _f4 = _i >= 4 ? f_filt9x(_a, _s, 4) : 0.0
    _f5 = _i >= 5 ? f_filt9x(_a, _s, 5) : 0.0
    _f6 = _i >= 6 ? f_filt9x(_a, _s, 6) : 0.0
    _f7 = _i >= 7 ? f_filt9x(_a, _s, 7) : 0.0
    _f8 = _i >= 8 ? f_filt9x(_a, _s, 8) : 0.0
    _f9 = _i == 9 ? f_filt9x(_a, _s, 9) : 0.0
    _fn = _i == 1 ? _f1 : _i == 2 ? _f2 : _i == 3 ? _f3 : _i == 4 ? _f4 : _i == 5 ? _f5 : _i == 6 ? _f6 : _i == 7 ? _f7 : _i == 8 ? _f8 : _i == 9 ? _f9 : na
    [_fn, _f1]

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


// Gaussian Channel
int poles = input.int(4, "Poles", 1, 9, group="Gaussian Channel")
int period = input.int(144, "Sampling Period", 2, group="Gaussian Channel")
float mult = input.float(1.414, "True Range Multiplier", group="Gaussian Channel")
bool reducedLag = input.bool(false, "Reduced Lag Mode", group="Gaussian Channel")
bool fastResponse = input.bool(false, "Fast Response Mode", group="Gaussian Channel")

// Stochastic RSI
smoothK = input.int(3, "K", 1, group="Stochastic RSI")
smoothD = input.int(3, "D", 1, group="Stochastic RSI")
lengthRSI = input.int(14, "RSI Length", 1, group="Stochastic RSI")
lengthStoch = input.int(14, "Stochastic Length", 1, group="Stochastic RSI")

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Calculations
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Gaussian Channel
beta = (1 - math.cos(4*math.asin(1)/period)) / (math.pow(1.414, 2/poles) - 1)
alpha = -beta + math.sqrt(math.pow(beta, 2) + 2*beta)
lag = (period - 1)/(2*poles)

src = hlc3
srcData = reducedLag ? src + (src - src[lag]) : src
trData = reducedLag ? ta.tr + (ta.tr - ta.tr[lag]) : ta.tr

[filterMain, filter1] = f_pole(alpha, srcData, poles)
[filterTRMain, filterTR1] = f_pole(alpha, trData, poles)

finalFilter = fastResponse ? (filterMain + filter1)/2 : filterMain
finalTR = fastResponse ? (filterTRMain + filterTR1)/2 : filterTRMain

hband = finalFilter + finalTR * mult
lband = finalFilter - finalTR * mult

// Stochastic RSI
rsi = ta.rsi(close, lengthRSI)
k = ta.sma(ta.stoch(rsi, rsi, rsi, lengthStoch), smoothK)
d = ta.sma(k, smoothD)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Trading Logic
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
gaussianGreen = finalFilter > finalFilter[1]
priceAbove = close > hband
stochCondition = k > 80 or k < 20

longCondition = gaussianGreen and priceAbove and stochCondition 
exitCondition = ta.crossunder(close, hband) 

strategy.entry("Long", strategy.long, when=longCondition)
strategy.close("Long", when=exitCondition)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Visuals
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
filterColor = finalFilter > finalFilter[1] ? #0aff68 : #ff0a5a
plot(finalFilter, "Filter", filterColor, 2)
plot(hband, "High Band", filterColor)
plot(lband, "Low Band", filterColor)
fill(plot(hband), plot(lband), color.new(filterColor, 90), "Channel Fill")

```

> Detail

https://www.fmz.com/strategy/483064

> Last Modified

2025-02-21 11:28:34
