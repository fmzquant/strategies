
> Name

RSI-Dynamic-Stop-Loss-Intelligent-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/100b6af3faa1fee8422.png)


#### Overview
This strategy is a dynamic stop-loss trading system based on the RSI indicator, combining SMA and ATR indicators to optimize trading decisions. It employs a multi-level take-profit approach with pyramid-style position closing to maximize returns while using ATR dynamic stop-loss for risk control. The strategy features high adaptability and automatically adjusts trading parameters based on market volatility.

#### Strategy Principles
The strategy primarily uses RSI oversold conditions (RSI<30) as entry signals while requiring price to be above the 200-day moving average to ensure an uptrend. It implements three take-profit targets (5%, 10%, 15%) combined with ATR dynamic stop-loss. Specifically:
1. Entry conditions: RSI below 30 and price above SMA200
2. Position management: 75% capital per trade
3. Stop-loss: Dynamic stop based on 1.5x ATR
4. Take-profit: Three levels at 5%, 10%, 15%, closing 33%, 66%, and 100% respectively

#### Strategy Advantages
1. Dynamic risk management: ATR adaptation to market volatility
2. Staged profit-taking: Reduces emotional interference and improves profit probability
3. Trend confirmation: Uses moving average to filter false signals
4. Money management: Percentage-based position sizing for different account sizes
5. Commission optimization: Considers trading costs for practical implementation

#### Strategy Risks
1. Moving average lag may delay entries
2. RSI oversold doesn't guarantee reversal
3. Large position sizes may lead to significant drawdowns
4. Frequent partial exits may increase trading costs
These risks can be managed through parameter adjustments and additional filters.

#### Optimization Directions
1. Add volume confirmation signals
2. Incorporate trend strength indicators
3. Optimize profit-taking ratios
4. Add time-frame filters
5. Consider volatility-adaptive position sizing

#### Summary
This strategy combines technical indicators with dynamic risk management to create a comprehensive trading system. Its strengths lie in adaptability and controlled risk, though parameter optimization based on market conditions is still necessary. The strategy is suitable for medium to long-term investors and serves as a solid foundation for systematic trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA/4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © wielkieef

//@version=5
strategy("Simple RSI stock Strategy [1D] ", overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=75, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.03)

// Rsi
oversoldLevel = input(30, title="Oversold Level")
overboughtLevel = input(70, title="Overbought Level")
rsi = ta.rsi(close, 5)
rsi_overbought = rsi > overboughtLevel  
rsi_oversold = rsi < oversoldLevel

// Sma 200
lenghtSMA = input(200, title = "SMA lenght")
sma200 = ta.sma(close, lenghtSMA)

// ATR stop-loss
atrLength = input.int(20, title="ATR Length")
atrMultiplier = input.float(1.5, title="ATR Multiplier")
atrValue = ta.atr(atrLength)
var float long_stop_level = na
var float short_stop_level = na
var float tp1_level = na
var float tp2_level = na
var float tp3_level = na

// Strategy entry
long = (rsi_oversold ) and close > sma200 

// Take Profit levels
tp_1 = input.float(5.0, "TP 1", minval=0.1, step=0.1)
tp_2 = input.float(10.0, "TP 2", minval=0.2, step=0.1)
tp_3 = input.float(15.0, "TP 3", minval=0.3, step=0.1)

if long
    strategy.entry('Long', strategy.long)
    long_stop_level := close - atrMultiplier * atrValue
    tp1_level := strategy.position_avg_price * (1 + tp_1 / 100)
    tp2_level := strategy.position_avg_price * (1 + tp_2 / 100)
    tp3_level := strategy.position_avg_price * (1 + tp_3 / 100)

// basic SL - this code is from author RafaelZioni, modified by wielkieef
sl = input.float(25.0, 'Basic Stop Loss %', step=0.1)
per(procent) =>
    strategy.position_size != 0 ? math.round(procent / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

// ATR SL
if (strategy.position_size > 0 and (close <= long_stop_level))
    strategy.close("Long")
    tp1_level := na
    tp2_level := na
    tp3_level := na
plot(long_stop_level, color=color.orange, linewidth=2, title="Long Stop Loss")

// TP levels
if (strategy.position_size > 0)
    if (not na(tp1_level) and close >= tp1_level)
        tp1_level := na
    if (not na(tp2_level) and close >= tp2_level)
        tp2_level := na
    if (not na(tp3_level) and close >= tp3_level)
        tp3_level := na

plot(strategy.position_size > 0 and not na(tp1_level) ? tp1_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 1")
plot(strategy.position_size > 0 and not na(tp2_level) ? tp2_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 2")
plot(strategy.position_size > 0 and not na(tp3_level) ? tp3_level : na, color=color.gray, style=plot.style_circles , linewidth=1, title="Take Profit 3")

// Strategy exit points for Take Profits
strategy.exit('TP 1', from_entry="Long", qty_percent=33, profit=per(tp_1), loss=per(sl))
strategy.exit('TP 2', from_entry="Long", qty_percent=66, profit=per(tp_2), loss=per(sl))
strategy.exit('TP 3', from_entry="Long", qty_percent=100, profit=per(tp_3), loss=per(sl))

// by wielkieef
```

> Detail

https://www.fmz.com/strategy/471673

> Last Modified

2024-11-12 11:39:06
