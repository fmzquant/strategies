
> Name

Bitcoin-Momentum-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14b59777f9bf5d971ca.png)

## Strategy Overview

The Bitcoin Momentum Trailing Stop Strategy is a long-only momentum-based strategy designed to capture Bitcoin's uptrends while mitigating downside risk through dynamically adjusted stop-losses. The strategy employs a simple yet clever momentum trailing stop technique, which tightens the stop-loss during highly bearish volatility to protect open profits and loosens the stop-loss during sustained bullish momentum to let profits run. The strategy remains invested as long as the Bitcoin price is above the 20-week exponential moving average (EMA) and exits when the price closes below it. It trades only one position and does not short, but it can be easily tweaked to do whatever you like if you know what you're doing.

## Strategy Principle

1. Bitcoin's current price must be trading above the higher-timeframe EMA (20-week EMA).
2. Bitcoin must not be in a "caution" state, defined as the recent swing high minus the current bar's low being greater than 1.5 times the ATR, or the daily close being lower than the daily 20 EMA.
3. The stop-loss is set at the recent swing high minus 1 ATR, or minus 20% of the ATR (i.e., 0.2 ATR) if in the caution state.
4. Exit on the next bar's open when the price closes below the stop-loss.

The strategy uses the weekly chart and the 20-week EMA as a trend filter, only entering when the price is above the 20-week EMA. A 5-period ATR is used to dynamically adjust the distance of the trailing stop, which tightens in the caution state. The caution state is defined by two conditions: the distance from the recent swing high to the current low being greater than 1.5 times the ATR, or the daily close being below the daily 20 EMA. This dynamic stop-loss adjustment approach allows for greater pullback room when the trend is strong and quickly locks in profits when the trend weakens.

## Strategy Advantages

1. Simplicity and effectiveness: The strategy logic is simple, clear, easy to understand and implement, while effectively capturing Bitcoin's major uptrends.

2. Dynamic stop-loss: The stop-loss position is dynamically adjusted based on market volatility conditions, controlling drawdowns while letting profits run, which is a relatively balanced and robust approach to stop-loss management.

3. Trend filtering: By filtering with a higher-level moving average (20-week EMA), the strategy only enters during clear uptrends, greatly improving the strategy's win rate and risk-reward ratio.

4. Position sizing: The default is to trade with a full position, maximizing capital utilization and improving capital efficiency. Position size can also be flexibly adjusted.

5. Wide applicability: The strategy logic can be easily ported to other assets and markets, having good generalizability.

## Strategy Risks

1. Parameter applicability: The strategy parameters are set based on the characteristics of the Bitcoin market, and their applicability to other markets needs to be validated and may require parameter optimization for different assets.

2. Trend identification: The strategy mainly relies on technical indicators such as higher-level EMAs and ATRs to judge trends, which is not as comprehensive as fundamental analysis in grasping market conditions and is prone to errors at market turning points.

3. Stop-loss risk: Although dynamic stop-losses can control risk to a certain extent, significant drawdowns may still occur in extreme market conditions (such as sharp drops or rapid deep fluctuations). Moreover, the stop-loss position is relatively tight, which may lead to frequent stop-outs in choppy markets.

4. Profit potential: The strategy performs well in unidirectional uptrends but is more likely to fall into the dilemma of frequent stop-losses in rangebound markets, potentially limiting overall profit potential.

5. Live performance: While the strategy performs well in backtesting, live trading is affected by factors such as slippage and commissions, and actual results may differ from theoretical returns, requiring careful evaluation.

## Optimization Directions

1. Trend determination: Consider introducing more higher-level moving averages, volatility indicators, or even fundamental data to improve the accuracy and reliability of trend identification.

2. Dynamic parameters: Stop-loss positions and ATR parameters can be further optimized by introducing dynamic adjustment mechanisms related to price or volatility to adapt to different market states.

3. Position sizing: Dynamically adjust position size based on indicators such as trend strength and volatility, increasing position size when the trend is strong and reducing position size during high volatility to improve the risk-reward ratio.

4. Long/short mechanism: Introduce a short-selling mechanism in bear markets to expand the strategy's applicability and potential profitability. However, entry and stop-loss rules need to be redesigned.

5. Strategy combination: Combine this strategy with other strategies (such as mean reversion) to complement each other's strengths and improve strategy stability and profitability.

## Strategy Summary

The Bitcoin Momentum Trailing Stop Strategy is a simple and effective momentum strategy that captures Bitcoin's strong uptrends using higher-level moving averages and ATR indicators while controlling downside risk through dynamically adjusted stop-losses. The strategy logic is clear, easy to implement and optimize, and suitable for medium to long-term investors seeking steady returns. However, it performs averagely in rangebound markets with limited overall profit potential.
This strategy can serve as a basic template, and investors can further refine it based on their own needs and experience in areas such as trend determination, parameter optimization, position management, and long/short mechanisms, or combine it with other strategies to achieve a higher risk-reward ratio. However, it should be noted that the live performance of the strategy may differ from backtesting results, requiring careful risk assessment and control. Any strategy should be thoroughly backtested on historical data and forward tested before use, and dynamically adjusted based on market changes.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|W|(?G_STRATEGY)Higher Timeframe|
|v_input_int_1|20|EMA Length|
|v_input_int_2|5|ATR Length|
|v_input_source_1_low|0|(?G_EXIT)Trail Stop Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|7|Trail Stop Lookback|
|v_input_float_1|0.2|Trailing Stop Ratchet Multiplier|
|v_input_1|timestamp(01 Jan 2000 13:30 +0000)|(?G_FILTER)Start Filter|
|v_input_2|timestamp(1 Jan 2099 19:30 +0000)|End Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-08 00:00:00
end: 2024-03-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading
// ------------------------------------------------------------------------------------------------------
// System Concept: Capture as much Bitcoin upside volatility as possible while side-stepping downside volatility.
//  Entry Rule #1: Bitcoin must be trading above higher-timeframe EMA (Weekly 20 EMA)
//  Entry Rule #2: Bitcoin must not be in 'caution' condition
//      -> Caution: True if BTC's recent swing high minus its current low is > 1.5x ATR OR close < Daily EMA
//  Trailing Stop: Stop is trailed 1 ATR from recent swing high, OR 20% of ATR if in caution condition
// ------------------------------------------------------------------------------------------------------
// @version=5
strategy("Bitcoin Momentum Strategy", 
     overlay=true)

// Get user input
var const string    G_STRATEGY  = "Strategy Entry Settings"
var const string    G_EXIT      = "Strategy Exit Settings"
var const string    G_FILTER    = "Strategy Filters"
i_HigherTimeframe   = input.timeframe("W", "Higher Timeframe", group=G_STRATEGY, tooltip="Higher timeframe MA reference")
i_EmaLength         = input.int(20, "EMA Length", group=G_STRATEGY, tooltip="Moving average period length")
i_AtrLength         = input.int(5, "ATR Length", group=G_STRATEGY, tooltip="ATR period length")
i_TrailStopSource   = input.source(low, "Trail Stop Source", group=G_EXIT, tooltip="Lowest price source for trailing stop")
i_TrailStopLookback = input.int(7, "Trail Stop Lookback", group=G_EXIT, tooltip="How many bars to look back for trailing price source")
i_TrailStopMulti    = input.float(0.2, "Trailing Stop Ratchet Multiplier", group=G_EXIT, tooltip="When momentum is yellow (caution), shrink ATR distance for TS by this much")
i_StartTime         = input(timestamp("01 Jan 2000 13:30 +0000"), "Start Filter", group=G_FILTER, tooltip="Start date & time to begin searching for setups")
i_EndTime           = input(timestamp("1 Jan 2099 19:30 +0000"), "End Filter", group=G_FILTER, tooltip="End date & time to stop searching for setups")

// Define custom security function which does not repaint
RequestSecurity_NonRP(_market, _res, _exp) => request.security(_market, _res, _exp[barstate.isrealtime ? 1 : 0])[barstate.isrealtime ? 0 : 1]

// Define date filter check
DateFilter(int start, int end) => time >= start and time <= end

// Get indicator values
float   atrValue    = ta.atr(i_AtrLength)
float   emaValue    = ta.ema(close, i_EmaLength)
float   htfEmaValue = RequestSecurity_NonRP(syminfo.tickerid, i_HigherTimeframe, emaValue)
float   marketPrice = close

// Check for bullishness / bearish volatility caution
bool    isBullish   = marketPrice > htfEmaValue
bool    isCaution   = isBullish and (ta.highest(high, 7) - low > (atrValue * 1.5) or marketPrice < emaValue) 

// Set momentum color
color bgCol = color.red
if isBullish[1]
    bgCol := color.green
if isCaution[1]
    bgCol := color.orange

// Handle strategy entry, and reset trailing stop
var float trailStop = na
if isBullish and strategy.position_size == 0 and not isCaution
    strategy.entry(id="Buy", direction=strategy.long)
    trailStop := na

// Update trailing stop
float temp_trailStop = ta.highest(i_TrailStopSource, i_TrailStopLookback) - (isCaution[1] ? atrValue * i_TrailStopMulti : atrValue)
if strategy.position_size > 0
    if temp_trailStop > trailStop or na(trailStop)
        trailStop := temp_trailStop

// Handle strategy exit
if (close < trailStop or close < htfEmaValue) and barstate.isconfirmed
    strategy.close("Buy", comment="Sell")

// Draw trailing stop, HTF EMA and color-coded momentum indicator
plotshape(true, color=bgCol, style=shape.square, location=location.bottom, size=size.auto, title="Momentum Strength")
plot(htfEmaValue, color=close > htfEmaValue ? color.green : color.red, linewidth=2, title="HTF EMA")
plot(emaValue, color=close > emaValue ? color.green : color.red, linewidth=1, title="CTF EMA")
plot(strategy.position_size[1] > 0 ? trailStop : na, style=plot.style_linebr, color=color.red, title="Stop Loss")
```

> Detail

https://www.fmz.com/strategy/444020

> Last Modified

2024-03-08 16:20:16
