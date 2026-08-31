
> Name

Dynamic-Candlestick-Big-Yang-Line-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d508f18307dc540ca5.png)



## Overview  
The Dynamic Candlestick Big Yang Line Trading Strategy is a strategy that utilizes dynamic candlesticks to determine breakouts. It identifies big yang line candlestick patterns and calculates dynamic stop loss and take profit levels.  

## Strategy Logic   
The main logic of this strategy is:  

1. Calculate the body size percentage of the entire candlestick range. If the body size is greater than the set big yang line threshold, determine it as a big yang line candlestick.   

2. If a big yang line candlestick is identified, go long to open a long position. At the same time calculate the stop loss and take profit levels. The stop loss level is below the entry price by a certain number of points, and the take profit level is above the entry price by a certain number of points.   

3. If a big yin line candlestick is identified, go short to open a short position. At the same time calculate the stop loss and take profit levels. The stop loss level is above the entry price by a certain number of points, and the take profit level is below the entry price by a certain number of points.  

4. Close long positions when hitting stop loss or take profit levels. Close short positions when hitting take profit or stop loss levels.  

## Advantage Analysis   
The main advantages of this strategy are:  

1. The strategy logic is simple and clear, easy to understand and implement, suitable for beginners to learn.  

2. Captures market momentum effectively by using typical candlestick patterns like big yang line.   

3. Dynamically calculating stop loss and take profit levels can effectively control risks.   

4. Only one parameter is needed to implement, easy to optimize and adjust.   

## Risk Analysis   
There are also some risks for this strategy:   

1. Big yang line breakouts may not sustain and could be false breakouts.   

2. Improper stop loss and take profit level settings could lead to premature stop loss or take profit.   

3. Parameters need to be adjusted and optimized for different products and time frames.  

4. Slippage in live trading and other issues could lead to PnL differences.   

These risks can be mitigated by parameter optimization, strict risk management, adjusting holding time properly etc.  

## Optimization Directions
This strategy can be optimized in the following directions:  

1. Evaluate parameters for different trading products and time frames.  

2. Test different yang line body size thresholds.   

3. Optimize the stop loss and take profit points.  

4. Add other filters like trading volumes, ATR etc.  

5. Assess the number of breakout candles to further verify the reliability of breakouts.   

## Conclusion  
Overall, the Dynamic Candlestick Big Yang Line Trading Strategy is a very practical quant strategy. It generates profits by capturing high probability trend breakout opportunities, and effectively controls risks using dynamic stop loss and take profit. This strategy can be further improved through parameter optimization etc., and is a good choice for beginners to learn quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Lookback Period|
|v_input_2|26|Bullish Marubozu Threshold|
|v_input_3|30|Bearish Marubozu Threshold|
|v_input_4|37|Target Points|
|v_input_5|24|Stop Loss Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-29 00:00:00
end: 2023-12-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Manham Big Bar Trading Strategy", overlay=true)

// Define inputs
lookback_period = input(20, title="Lookback Period")
bullish_threshold = input(26, title="Bullish Marubozu Threshold")
bearish_threshold = input(30, title="Bearish Marubozu Threshold")
target_points = input(37, title="Target Points")
stop_loss_points = input(24, title="Stop Loss Points")

// Calculate body size as a percentage of the total range of the candle
body_size = abs(close - open) / (high - low) * 30

// Identify bullish Marubozu
is_bullish_marubozu = close > open and body_size >= bullish_threshold

// Identify bearish Marubozu
is_bearish_marubozu = open > close and body_size >= bearish_threshold

// Calculate stop loss and target levels
stop_loss = strategy.position_avg_price - stop_loss_points * syminfo.mintick
take_profit = strategy.position_avg_price + target_points * syminfo.mintick

// Strategy conditions
if is_bullish_marubozu
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell", "Buy", stop=stop_loss, limit=take_profit)

if is_bearish_marubozu
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", stop=take_profit, limit=stop_loss)

```

> Detail

https://www.fmz.com/strategy/434466

> Last Modified

2023-12-06 16:22:08
