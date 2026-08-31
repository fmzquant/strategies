
> Name

Trend-Following-Buy-and-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c95443fc38295b404d.png)



## Overview

The Trend Following Buy and Sell Strategy is a simple trend following day trading strategy. The premise is to determine the trend direction based on the Moving Average and buy/sell the dips and blips in the trend.

## Strategy Logic

The strategy uses Simple Moving Average (SMA) to determine the trend direction. In an uptrend, when the candle action offers a "dip", the strategy will go long when the high of the current candle breaks the high of the previous candle. In a downtrend, when the candle action offers a "blip", the strategy will go short when the low of the current candle breaks the low of the previous candle.

The strategy also uses %K and %D of the Blanchflower Oscillator for trend determination. It will close the position and trade in the opposite direction when %K crosses above %D. Additionally, MACD and Signal line act as filters to only take trades that align with the trend direction determined by MACD and Signal.

The strategy can go Long only, Short only, or both. The start month and year allow backtesting from that point until now. All parameters such as SMA period, %K period, %D period, MACD parameters etc. are customizable. 

## Advantage Analysis

- Using SMA to determine trend avoids whipsaws and incorrect trades
- Applying Blanchflower Oscillator timely detects trend reversal and controls risk 
- MACD and Signal filter reduce noise trades against the trend  
- Customizable parameters adapt to different price behaviors
- Long only, Short only or dual direction trading adapts to market regimes

## Risk Analysis

The main risks of this strategy are:

- Large loss risk from huge penetration of SMA. Can increase SMA period to lower risk.
- Frequent trading and overtrading in range-bound market. Can increase %K period to reduce trade frequency.
- Ineffective filtering from poor MACD and Signal parameter setting. Should optimize parameters per instrument.  
- Accumulated large position from dual direction trading causing loss. Should limit position size.

## Enhancement Opportunities

The strategy can be improved in the following aspects:

- Optimize SMA period to filter whipsaw while keeping trend detection ability 
- Optimize %K, %D parameters to capture trend reversal while reducing whipsaws
- Optimize MACD parameters for more effective noise filtering
- Add position sizing control e.g. fixed quantity, floating % of equity etc.
- Add stop loss mechanisms e.g. trailing stop, time stop, ATR stop etc.

## Conclusion

The Trend Following Buy and Sell Strategy has a simple and straightforward logic to trade pullbacks in trends identified by SMA and filtered by indicators. Fine tuning parameters and risk controls can lead to decent results, but Combine encapsulation is still needed to prevent overfitting and improve robustness. Overall it is a practical intraday trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long or Short Only|
|v_input_2|true|Use MACD Filter|
|v_input_3|true|Use Signal Filter|
|v_input_4|10|Month|
|v_input_5|2020|Year|
|v_input_6|20|Period SMA|
|v_input_7|5|Period %K|
|v_input_8|5|Period Fast|
|v_input_9|20|Period Slow|
|v_input_10|30|Signal Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Higher High / Lower Low Strategy", overlay=true)

// Getting inputs
longOnly = input(true, title="Long or Short Only")
useMACD = input(true, title="Use MACD Filter")
useSignal = input(true, title="Use Signal Filter")
//Filter backtest month and year
startMonth = input(10, minval=1, maxval=12, title="Month")
startYear = input(2020, minval=2000, maxval=2100, title="Year")
//Filter funtion inputs
periodA = input(20, minval=1, title="Period SMA")
periodK = input(5, minval=1, title="Period %K")
fast_length = input(title="Period Fast", type=input.integer, defval=5)
slow_length = input(title="Period Slow", type=input.integer, defval=20)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 30)

//Calculations
smoothD = 3 //input(3, minval=1, title="Smooth %D")
smoothK = 2 //input(2, minval=1, title="Smooth %K")
ma50 = sma(close, periodA)
k = sma(stoch(close, high, low, periodK), smoothK) - 50
d = sma(k, smoothD)
macd = ema(close,fast_length) - ema(close,slow_length)
signal = ema(macd,signal_length)
hist = macd - signal

if (not na(k) and not na(d) and not na(macd) and not na(signal) and longOnly and month>=startMonth and year>=startYear)//	if(k > k[1] and k[2] >= k[1] and (ma50 > ma50[1]) and (not useK or k[1] <= -threshold_k) and (not useMACD or macd > macd[1]) and (not useSignal or signal > signal[1]) and (not useHHLL or close >= high[1]) and (not useD or d <= -threshold_d))
    if(high[2] >= high[1] and high > high[1] and (ma50 > ma50[1]) and (not useMACD or macd > macd[1]) and (not useSignal or signal > signal[1]))
		strategy.order("HH_LE", strategy.long, when=strategy.position_size == 0, comment="HH_LE")
    if (k < k[1])
		strategy.order("HH_SX", strategy.short, when=strategy.position_size != 0, comment="HH_SX")

if (not na(k) and not na(d) and not na(macd) and not na(signal) and not longOnly and month>=startMonth and year>=startYear)
    if(low[2] <= low[1] and low < low[1] and (ma50 < ma50[1]) and (not useMACD or macd < macd[1]) and (not useSignal or signal < signal[1]))
		strategy.order("HH_SE", strategy.short, when=strategy.position_size == 0, comment="HH_SE")
    if (k > k[1])
		strategy.order("HH_LX", strategy.long, when=strategy.position_size != 0, comment="HH_LX")

//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/429459

> Last Modified

2023-10-17 12:59:59
