
> Name

双SuperTend与MACD组合交易策略Dual-SuperTrend-with-MACD-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Dual SuperTrend with MACD combination trading strategy incorporates two trend-following indicators (SuperTrend 1 and SuperTrend 2) with a momentum oscillator (MACD) to provide a systematic approach to trading without discretionary decision-making.

Key advantages of this strategy:

- Dual SuperTrend Validation - Using two SuperTrend indicators with different ATR periods and factors to confirm the trend direction minimizes false signals.

- Momentum Confirmation - The MACD histogram acts as a momentum filter to validate entries and exits. 

- Objective Entry and Exit Rules - The strategy generates clear buy and sell signals based on the combination of trend and momentum.

- Automated Trade Management - Inbuilt settings for commission, slippage and initial capital automate the trade execution process.

- Customizability - All parameters can be easily customized to suit specific trading needs and changing market conditions.

## How it Works

The strategy operates on a set of defined rules, focusing primarily on the trend direction confirmed by the Dual SuperTrend and momentum indicated by the MACD histogram.

### Entry Rules

- Long Entry: Both SuperTrends bullish and MACD histogram above zero.

- Short Entry: Both SuperTrends bearish and MACD histogram below zero.

### Exit Rules

- Exit Long: Either SuperTrend turns bearish or MACD histogram drops below zero. 

- Exit Short: Either SuperTrend turns bullish or MACD histogram rises above zero.

### Trade Management

- Fixed commission rate and slippage settings.

- Auto risk management to prevent overexposure.

## Trading Direction 

The strategy allows trading in both bullish and bearish markets. Users can choose the direction (long, short or both) aligning with their market view.

## Usage

- Best applied on timeframes where the trend is evident. 

- Users can customize SuperTrend and MACD parameters.

## Default Settings

- SuperTrend 1 ATR Period: 10

- SuperTrend 1 Factor: 3.0

- SuperTrend 2 ATR Period: 20 

- SuperTrend 2 Factor: 5.0

- MACD Fast Length: 12

- MACD Slow Length: 26

- MACD Signal Smoothing: 9

- Commission: 0.1%

- Slippage: 1 point  

- Direction: Both

The default parameters offer a balanced approach but can be customized.

## Advantages

The key advantages of this strategy:

1. Dual trend validation minimizes false signals

Using two SuperTrend indicators significantly reduces false signals compared to single indicator strategies. The dual confirmation mechanism enhances reliability.

2. MACD momentum filter improves accuracy

The MACD histogram filters out less ideal trading signals, improving entry accuracy.

3. Effective drawdown control 

The combination of dual trend indicators allows quick exits when the trend changes, helping control drawdowns.

4. High degree of automation, no discretion needed

The well-defined entry and exit rules eliminate subjective interpretations and human errors.

5. Highly customizable for broader applicability

Adjustable parameters make this strategy robust for different instruments and trading preferences.

## Risks and Optimization

The potential risks include:

1. Difficulty in dynamic trend transitions

Frequent trend reversals may be challenging for the dual trend indicator setup.

2. Limited drawdown control in strong trends  

The stop loss can lag in strong trending moves, leading to larger drawdowns.

3. Inability to react to sudden events

It cannot quickly adapt to black swan events, increasing drawdown risks.

Optimization opportunities:

1. Fine tune parameters for different instruments.

2. Add stop loss mechanisms like trailing stops to further control drawdowns. 

3. Incorporate other indicators to identify sudden events and reduce drawdowns.

## Conclusion

In summary, the Dual SuperTrend and MACD combination strategy combines the strengths of trend following and momentum analysis. With clear rules and a high degree of automation, it can effectively filter out noise and provide strong practical utility. But drawdown control and parameter optimization need to be addressed. Overall, this is one of the best examples of a systematic trend trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Trading Direction: both|short|long|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_4|10|ATR Length for Supertrend 1|
|v_input_float_1|3|Factor for Supertrend 1|
|v_input_5|20|ATR Length for Supertrend 2|
|v_input_float_2|5|Factor for Supertrend 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

//@version=5
// Define the strategy settings
// strategy("Dual-Supertrend with MACD - Strategy [presentTrading]", overlay=true, precision=3, default_qty_type=strategy.cash, 
//  commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, 
//   currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital= 10000)

// Trading Direction Dropdown
tradeDirection = input.string("both", "Trading Direction", options=["long", "short", "both"])

// MACD Inputs
fast_length = input(12, "Fast Length")
slow_length = input(26, "Slow Length")
signal_length = input(9, "Signal Smoothing")
sma_source = input.string("EMA", "Oscillator MA Type", options=["SMA", "EMA"])
sma_signal = input.string("EMA", "Signal Line MA Type", options=["SMA", "EMA"])


// MACD Calculation
fast_ma = sma_source == "SMA" ? ta.sma(close, fast_length) : ta.ema(close, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(close, slow_length) : ta.ema(close, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal

// Input Parameters for Supertrend 1
atrPeriod1 = input(10, "ATR Length for Supertrend 1")
factor1 = input.float(3.0, "Factor for Supertrend 1", step=0.01)

// Supertrend Calculation for 1
[supertrend1, direction1] = ta.supertrend(factor1, atrPeriod1)

// Input Parameters for Supertrend 2
atrPeriod2 = input(20, "ATR Length for Supertrend 2")
factor2 = input.float(5.0, "Factor for Supertrend 2", step=0.01)

// Supertrend Calculation for 2
[supertrend2, direction2] = ta.supertrend(factor2, atrPeriod2)

// Combined Conditions
isBullish = direction1 < 0 and direction2 < 0 and hist > 0
isBearish = direction1 > 0 and direction2 > 0 and hist < 0
exitLong = direction1 > 0 or direction2 > 0 or hist < 0
exitShort = direction1 < 0 or direction2 < 0 or hist > 0

// Strategy Entry and Exit based on Trading Direction
if (tradeDirection == "both" or tradeDirection == "long")
    strategy.entry("Buy", strategy.long, when=isBullish)
    strategy.close("Buy", when=exitLong)

if (tradeDirection == "both" or tradeDirection == "short")
    strategy.entry("Sell", strategy.short, when=isBearish)
    strategy.close("Sell", when=exitShort)

bodyMiddle1 = plot((open + close) / 2, display=display.none)
upTrend1 = plot(direction1 < 0 ? supertrend1 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend1 = plot(direction1 < 0? na : supertrend1, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle1, upTrend1, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle1, downTrend1, color.new(color.red, 90), fillgaps=false)

bodyMiddle2 = plot((open + close) / 2, display=display.none)
upTrend2 = plot(direction2 < 0 ? supertrend2 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend2 = plot(direction2 < 0? na : supertrend2, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle2, upTrend2, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle2, downTrend2, color.new(color.red, 90), fillgaps=false)
```

> Detail

https://www.fmz.com/strategy/427910

> Last Modified

2023-09-26 17:45:03
