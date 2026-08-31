
> Name

Supertrend结合RSI的量化交易策略Supertrend-Combined-with-RSI-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/823226b94aea93a628.png)

### Overview   

The strategy is named “Dual-drive Strategy”. The main idea is to combine the Supertrend and RSI, which are two powerful technical indicators, in order to give full play to their respective advantages and achieve excellent quantitative trading performance.

### Strategy Logic   

The core of the strategy uses the Change function to determine the direction change of the Supertrend indicator to generate trading signals. It will generate a buy signal when Supertrend changes from up to down, and it will generate a sell signal when Supertrend turns from down to up.   

At the same time, the RSI indicator is introduced to help determine when to close positions. When the RSI breaks through the set overbought line, long positions will be closed; when the RSI breaks through the set oversold line, short positions will be closed. In this way, the RSI helps determine reasonable stop loss points to lock in profits.

### Advantage Analysis  

The major advantages of this strategy are:   

1. Supertrend is good at identifying market trend changes for accurate long and short entries.  

2. RSI excels at locating overstretched turning points to assist reasonable profit taking and stop loss.

3. The two complement each other with combined strengths for better opportunity capturing and more steady gains.  

4. The strategy logic is simple and clean for easy understanding and tracking even for less experienced investors.

5. Robust implementation with controllable drawdowns and stable profitability.

### Risk Analysis   

Despite having those merits, there are some risks with Dual-drive Strategy:

1. Wrong signals may occur with Supertrend and RSI leading to unnecessary losses. Parameters can be tuned or additional indicators introduced for verification.  

2. Two-way trading with higher risks calls for stricter money management rules and risk control.

3. Stop loss may fail with abnormal price swings using backups to control risks.  

4. Supertrend is sensitive to parameters requiring adjustments for different markets.

### Optimization Directions   

Considering the risks, optimizations can be made in below aspects:  

1. Adding Volume, MACD for additional signal filtering and more accurate entry.   

2. Setting up dynamic stop loss to react to risk events.

3. Optimizing parameters of Supertrend and RSI for better fit with different markets.  

4. Introducing machine learning for parameters and indicator selection.

5. Applying derivatives like futures and options for hedging risks.

6. Varying position sizing rules to limit losses and drawdowns.  

### Summary   

The Dual-drive Strategy effectively combines Supertrend and RSI for efficient trend capturing and profit taking. Compared to single indicator strategies, it provides more reliable signals, smaller drawdowns, and stable algorithm trading performance. Further optimizations on parameter tuning, signal filtering and risk management will lead to even better results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|(?Supertrend)ATR Length|
|v_input_float_1|3|Factor|
|v_input_2_close|0|(?RSI)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|Length|
|v_input_bool_1|true|(?Strategy)Long entries|
|v_input_bool_2|false|Short entries|
|v_input_int_2|72|Exit Long|
|v_input_int_3|28|Exit Short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © alorse

//@version=5
strategy("Supertrend + RSI Strategy [Alose]", overlay=true )

stGroup = 'Supertrend'
atrPeriod = input(10, "ATR Length", group=stGroup)
factor = input.float(3.0, "Factor", step = 0.01, group=stGroup)

[_, direction] = ta.supertrend(factor, atrPeriod)

// RSI
rsiGroup = 'RSI'
src = input(title='Source', defval=close, group=rsiGroup)
lenRSI = input.int(14, title='Length', minval=1, group=rsiGroup)
RSI = ta.rsi(src, lenRSI)

// Strategy Conditions
stratGroup = 'Strategy'
showLong = input.bool(true, title='Long entries', group=stratGroup)
showShort = input.bool(false, title='Short entries', group=stratGroup)
RSIoverbought = input.int(72, title='Exit Long', minval=1, group=stratGroup, tooltip='The trade will close when the RSI crosses up this point.')
RSIoversold = input.int(28, title='Exit Short', minval=1, group=stratGroup, tooltip='The trade will close when the RSI crosses below this point.')


entryLong = ta.change(direction) < 0
exitLong = RSI > RSIoverbought or ta.change(direction) > 0

entryShort = ta.change(direction) > 0
exitShort = RSI < RSIoversold or ta.change(direction) < 0

if showLong
    strategy.entry("Long", strategy.long, when=entryLong)
    strategy.close("Long", when=exitLong)

if showShort
    strategy.entry("Short", strategy.short, when=entryShort)
    strategy.close("Short", when=exitShort)

```

> Detail

https://www.fmz.com/strategy/440563

> Last Modified

2024-01-31 17:19:28
