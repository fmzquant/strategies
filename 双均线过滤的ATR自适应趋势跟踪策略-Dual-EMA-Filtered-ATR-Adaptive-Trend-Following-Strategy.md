
> Name

双均线过滤的ATR自适应趋势跟踪策略-Dual-EMA-Filtered-ATR-Adaptive-Trend-Following-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d82952526444e8ba0f21.png)
![IMG](https://www.fmz.com/upload/asset/2d84926837c27050efb6d.png)




#### Overview  
This strategy combines a dual EMA filter system with ATR adaptive trailing stop mechanism, utilizing Heikin Ashi candles to smooth price fluctuations for high-probability trend following. The core logic employs fast/slow EMA crossovers as trend direction filters while implementing dynamic ATR-based stops. Historical backtests show over 90% win rate, suitable for medium-short term trend trading.  

#### Strategy Logic  
1. **Signal Generation Layer**:  
   - Uses Heikin Ashi converted price as base data source (switchable to raw price)  
   - Calculates ATR channel: Determines dynamic width via ATR length(20) and multiplier(1.0)  
   - Implements adaptive trailing stop: Triggers reversal signals when price breaks channel  

2. **Trend Filter Layer**:  
   - Dual EMA system (10-period fast / 50-period slow)  
   - Only allows long when fast EMA > slow EMA, vice versa for shorts  

3. **Risk Management Layer**:  
   - Dynamic trailing stop: Controlled by trail_step and trail_offset parameters  
   - Fixed-point take profit: take_profit_points sets absolute profit target  

4. **Execution Logic**:  
   - Enters when price breaks ATR channel with EMA confirmation  
   - Exits on reverse signals or stop/target triggers  

#### Advantages  
1. **High Win Rate Design**: Triple filtering (Heikin Ashi + ATR channel + EMA crossover) effectively reduces false signals  
2. **Adaptive Risk Control**: ATR dynamically adjusts stop levels, expanding tolerance during high volatility  
3. **Trend Continuity**: EMA filter ensures trading only in dominant trend direction  
4. **Multi-Timeframe Compatibility**: Adjustable parameters suit various instruments  
5. **Visual Assistance**: Built-in signal markers and EMA plots facilitate manual verification  

#### Risks  
1. **Trend Reversal Risk**: ATR channel may lag during sharp reversals causing excess loss  
   - Solution: Add hard maximum drawdown stop  
2. **Overfitting Risk**: 90% win rate might be optimized for specific historical data  
   - Solution: Conduct multi-period Walk-Forward testing  
3. **Range Whipsaws**: EMA crosses generate consecutive false signals in sideways markets  
   - Solution: Introduce ADX filter or volatility threshold  
4. **Slippage Impact**: Trailing stops may execute at unfavorable prices during fast markets  
   - Solution: Set minimum slippage tolerance  

#### Optimization Directions  
1. **Dynamic Parameter Adjustment**:  
   - Auto-adjust ATR multiplier based on market volatility (e.g. VIX index)  
   - Implementation: Calculate via standard deviation or historical volatility percentile  

2. **Composite Filter System**:  
   - Add volume-weighted confirmation: Require breakout with volume expansion  
   - Time filter: Avoid major economic data release times  

3. **Machine Learning Enhancement**:  
   - Use reinforcement learning to optimize EMA period combinations  
   - Predict optimal take-profit levels via LSTM  

4. **Multi-Dimensional Validation**:  
   - Incorporate weekly trend confirmation  
   - Add RSI divergence as auxiliary exit signal  

#### Conclusion  
The strategy achieves high-probability trend capture through Heikin Ashi-ATR-EMA triple architecture, with dynamic stops effectively protecting profits. Its core strength lies in the organic integration of trend direction (EMA), volatility adaptation (ATR) and noise filtration (Heikin Ashi). Further optimization should focus on parameter adaptability and multi-factor confirmation, recommending complementary hard risk rules in live trading.  



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-01 00:00:00
end: 2025-04-23 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"DOGE_USDT"}]
*/

//@version=5
strategy("UTBot + EMA Filter (HA + ATR Logic)", overlay = true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === INPUTS ===
bandwidth = input.float(8., 'Bandwidth')
atr_mult = input.float(1.0, 'ATR Multiplier')
atr_len = input.int(20, 'ATR Length')
ema_fast_len = input.int(10, 'EMA Fast Length')
ema_slow_len = input.int(50, 'EMA Slow Length')
use_heikin = input.bool(true, title='Use Heikin Ashi Candle')
trail_step = input.float(10.0, title='Trailing Step (Points)', minval=0.1)
trail_offset = input.float(10.0, title='Trailing Offset (Points)', minval=0.1)
take_profit_points = input.float(100.0, title='Take Profit (Points)', minval=0.1)

// === SOURCE ===
sr = use_heikin ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close) : close

// === ATR Trailing Stop ===
atr = ta.atr(atr_len)
nLoss = atr_mult * atr

var float trail = na
iff_1 = sr > nz(trail[1]) ? sr - nLoss : sr + nLoss
iff_2 = sr < nz(trail[1]) and sr[1] < nz(trail[1]) ? math.min(nz(trail[1]), sr + nLoss) : iff_1
trail := sr > nz(trail[1]) and sr[1] > nz(trail[1]) ? math.max(nz(trail[1]), sr - nLoss) : iff_2

// === EMA FILTER ===
ema_fast = ta.ema(sr, ema_fast_len)
ema_slow = ta.ema(sr, ema_slow_len)

// === ENTRY & EXIT CONDITIONS ===
buy = sr[1] < trail[1] and sr > trail and ema_fast > ema_slow
sell = sr[1] > trail[1] and sr < trail and ema_fast < ema_slow

// === EXIT on opposite signal ===
exit_buy = sell
exit_sell = buy

// === STRATEGY EXECUTION ===
if buy
    strategy.entry("Buy", strategy.long)
if sell
    strategy.entry("Sell", strategy.short)

if exit_buy and strategy.position_size > 0
    strategy.close("Buy")
if exit_sell and strategy.position_size < 0
    strategy.close("Sell")

// === TRAILING STOP + TAKE PROFIT ===
// Long
if strategy.position_size > 0
    strategy.exit("Exit Long", from_entry="Buy", trail_points=trail_step, trail_offset=trail_offset, limit=sr + take_profit_points)

// Short
if strategy.position_size < 0
    strategy.exit("Exit Short", from_entry="Sell", trail_points=trail_step, trail_offset=trail_offset, limit=sr - take_profit_points)

// === PLOTS ===
plotshape(buy, title='Buy Signal', text='Buy', location=location.belowbar, color=color.green, style=shape.labelup, textcolor=color.white, size=size.tiny)
plotshape(sell, title='Sell Signal', text='Sell', location=location.abovebar, color=color.red, style=shape.labeldown, textcolor=color.white, size=size.tiny)

plot(ema_fast, color=color.teal, title='EMA Fast')
plot(ema_slow, color=color.purple, title='EMA Slow')

// === ALERTS ===
alertcondition(buy, title='UTBot Buy', message='UTBot Buy Signal')
alertcondition(sell, title='UTBot Sell', message='UTBot Sell Signal')
```

> Detail

https://www.fmz.com/strategy/492009

> Last Modified

2025-04-25 15:01:18
