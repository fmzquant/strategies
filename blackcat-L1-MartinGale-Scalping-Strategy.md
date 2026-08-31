
> Name

blackcat-L1-MartinGale-Scalping-Strategy

> Author

Zer3192

> Strategy Description

The Martingale strategy is a popular capital management approach commonly used in trading. It is typically applied by increasing position size after each loss in an attempt to recover drawdowns. In that sense, Martingale does not refer to one specific strategy, but rather to a broad family of averaging-in and position-adding methods.

In a Martingale framework, traders double their position after each losing trade. The goal is for a subsequent winning trade to recover prior losses and still generate a profit.

The idea behind Martingale relies on a law-of-averages mindset. By increasing size after losses, the method assumes that a profitable trade will eventually appear and more than offset the previous losses. This can sound appealing to traders who want to recover quickly from drawdowns.

However, Martingale also carries significant risk. If the trader encounters a prolonged losing streak or lacks sufficient capital, the strategy can produce very large losses. It depends on the assumption that a winning trade will occur within a manageable time window, which is never guaranteed.

Traders considering a Martingale approach should carefully evaluate their risk tolerance and fully understand the potential drawbacks. A robust risk management plan is essential to limit possible damage. They should also recognize that this style may not suit every market environment and may require adjustment as volatility changes.

In short, Martingale is a position-sizing method that increases exposure after losses in an attempt to recover from a losing streak. While it offers the possibility of rapid recovery, it also introduces substantial risk that must be considered before using this approach.

Although I do not fully agree with this trading philosophy, someone messaged me and asked for a discussion of the idea, so I wrote a simple 38-line framework for a short-term Martingale strategy.

This Martingale scalping strategy aims to profit from frequent trades. It uses moving-average crossovers to generate entry and exit signals and is implemented in TradingView Pine Script.

The strategy first defines input variables such as take-profit and stop-loss levels, along with the trading mode (long, short, or bidirectional). It then applies a rule that only allows entries in the direction permitted by the selected trading mode.

The core logic uses simple moving average crossover signals. It calculates a short-term SMA (SMA3) and a long-term SMA (SMA8), then plots both on the chart. The crossoverSignal and crossunderSignal variables track bullish and bearish crossover events, while crossoverState and crossunderState define the current state of those conditions.

Execution depends on current position size. If there is no open position, the strategy checks the crossover conditions. When a bullish crossover state appears and the trading mode allows long entries, it opens a long position. The entry price, stop price, take-profit price, and stop-loss price are calculated from the current close and the SMA8 value. Likewise, when a bearish crossover state appears and short entries are allowed, it opens a short position and calculates the corresponding price levels.

If a long position exists and the current close reaches either the take-profit or stop-loss level while a bearish crossover state appears, the strategy closes the long and resets the price variables to zero.

Similarly, if a short position exists and the current close reaches either the take-profit or stop-loss level while a bullish crossover state appears, the strategy closes the short and resets the price variables.

The strategy also uses plotshape to mark entries and exits on the chart. An upward triangle marks a buy entry, a downward triangle marks a buy exit, a downward triangle marks a sell entry, and an upward triangle marks a sell exit.

Overall, this Martingale scalp strategy is designed to capture small profits from short-term moving-average crossovers. It uses take-profit and stop-loss levels for risk control and supports multiple trading modes to adapt to different market conditions.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.03|Take Profit|
|v_input_2|0.95|Stop Loss|
|v_input_string_1|0|Trading Mode: Long|Short|BiDir|


> Source (PineScript)

``` pinescript
//@version=5
 strategy('[blackcat] L1 MartinGale Scalping Strategy', overlay=true, pyramiding = 5)
 
 // Define input variables
// martingaleMultiplier = input(2, title="加倍倍数")
 takeProfit = input(1.03, title='Take Profit')
 stopLoss = input(0.95, title='Stop Loss')
 inputTradingMode = input.string(defval='Long', options=['Long', 'Short', 'BiDir'], title='Trading Mode')
 
 //The purpose of this rule is to forbid short entries, only long etries will be placed. The rule affects the following function: 'entry'.
strategy.risk.allow_entry_in(inputTradingMode == 'Long' ? strategy.direction.long : inputTradingMode == 'Short' ? strategy.direction.short : strategy.direction.all)

// Define strategy logic 
entryPrice = 0.0
stopPrice = 0.0
takeProfitPrice = 0.0
stopLossPrice = 0.0

// Define SMA crossover and crossunder signals
sma3 = ta.sma(close, 3)
sma8 = ta.sma(close, 8)
plot(sma3, color=color.yellow)
plot(sma8, color=color.fuchsia)
crossoverSignal = ta.crossover(sma3, sma8)
crossunderSignal = ta.crossunder(sma3, sma8)
crossoverState = sma3 > sma8
crossunderState = sma3 < sma8

if strategy.position_size == 0
    if crossoverState
       strategy.entry('Buy',strategy.long)
       entryPrice := close
       stopPrice := close - stopLoss * sma8[1]
       takeProfitPrice := close + takeProfit * sma8[1]
       stopLossPrice := stopPrice
       stopLossPrice
    if crossunderState
        strategy.entry('Sell', strategy.short)
        entryPrice := close
        stopPrice := close + stopLoss *  sma8[1]
        takeProfitPrice := close - takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

if strategy.position_size > 0
    if (close > takeProfitPrice or close < stopLossPrice) and crossunderState
        strategy.close('Buy')
        entryPrice := 0.0
        stopPrice := 0.0
        takeProfitPrice := 0.0
        stopLossPrice := 0.0
        stopLossPrice
    else
        strategy.entry('Buy', strategy.long)
        entryPrice := close
        stopPrice := close - stopLoss *  sma8[1]
        takeProfitPrice := close + takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

if strategy.position_size < 0
    if (close > takeProfitPrice or close < stopLossPrice) and crossoverState
        strategy.close('Sell')
        entryPrice := 0.0
        stopPrice := 0.0
        takeProfitPrice := 0.0
        stopLossPrice := 0.0
        stopLossPrice
    else
        strategy.entry('Sell', strategy.short)
        entryPrice := close
        stopPrice := close + stopLoss *  sma8[1]
        takeProfitPrice := close - takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

// Plot entry and exit points
plotshape(strategy.position_size > 0 and crossoverSignal, 'Buy Entry', shape.triangleup, location.belowbar, color.new(color.green, 0), size=size.small)
plotshape(strategy.position_size > 0 and (close >= takeProfitPrice or close <= stopLossPrice), 'Buy Exit', shape.triangledown, location.abovebar, color.new(color.red, 0), size=size.small)
plotshape(strategy.position_size < 0 and crossunderSignal, 'Sell Entry', shape.triangledown, location.abovebar, color.new(color.red, 0), size=size.small)
plotshape(strategy.position_size < 0 and (close >= takeProfitPrice or close <= stopLossPrice), 'Sell Exit', shape.triangleup, location.belowbar, color.new(color.green, 0), size=size.small)
```

> Detail

https://www.fmz.com/strategy/428756

> Last Modified

2023-11-03 17:27:45
