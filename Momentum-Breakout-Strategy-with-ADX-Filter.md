
> Name

Momentum-Breakout-Strategy-with-ADX-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/179ae7c4ef9e2048aa3.png)

## Overview  

This is a short-term trading strategy that utilizes the ADX indicator to filter breakout signals. It goes short when price breaks above the Upper Bollinger Band and ADX is falling, and goes long when price breaks below the Lower Bollinger Band and ADX is rising. The strategy also sets stop loss and take profit automatically for fully automated trading.

## Strategy Logic

The core of this strategy is using Bollinger Bands for breakout signals. The upper and lower bands of Bollinger Bands represent two standard deviations of price, so breakouts usually imply that price is entering a strong trend. Additionally, the ADX indicator is introduced here as a filter to avoid false breakouts. Short signals are only considered when ADX is falling while long signals are only considered when ADX is rising. This helps filtering out some whipsaws during range-bound periods.

Specifically, this strategy calculates Bollinger Bands using 33 periods of closing prices. The middle band is a 33-period simple moving average, and the upper/lower bands are placed at two standard deviations above/below the middle band. The strategy signals short when price closes below the upper band and 8-period ADX is below 15-period ADX. It signals long when price closes above the lower band and 8-period ADX is above 15-period ADX. Exits are set at 800 points profit and 400 points stop loss.  

## Advantage Analysis

As a breakout strategy incorporating trend and momentum filters, it has several advantages:

1. Using Bollinger Bands to detect breakouts aligns with most traders’ habits.  
2. The additional ADX filter helps avoid losses from whipsaws.
3. The logic is simple and easy to understand and optimize.  
4. The automated stop loss and take profit facilitates algorithm trading.

## Risk Analysis

There are also some risks with this strategy:  

1. Improper BB parameters may generate over-frequent signals and increase costs.
2. Improper ADX parameters could filter out valid signals. 
3. The stop loss distance may be too wide leading to large losses.

To mitigate these risks, we can fine-tune the BB parameter to narrow the bands, adjust the ADX periods to avoid over-filtering, and reduce the stop loss to control single-trade loss. Of course, these optimizations need to be walk-forward tested to prevent overfitting.

## Optimization Directions

There is room for further optimization:

1. Test on different market data to find the optimal parameter set.
2. Incorporate other indicators like volume and Moving Average for signal filtering.
3. Utilize machine learning methods to auto-optimize parameters. 
4. Consider dynamic stop loss and take profit.

## Conclusion

In conclusion, this is a simple and practical breakout strategy with filter. Identifying trends with BBs and filtering signals with ADX help avoid noise during range-bound periods and capture trend opportunities to some extent. There is still large room for further testing and improvement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|33|Length|
|v_input_2|2|Mult|
|v_input_3|4|ADX_Length|
|v_input_4|8|v_input_4|
|v_input_5|15|v_input_5|
|v_input_6|800|Take_Profit|
|v_input_7|400|Stop_Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Hizbullah XAUUSD Sniper", overlay=true)

Price = close

Length = input(33)
Mult = input(2)
Basis = sma(Price, Length)
StdDev = Mult * stdev(Price, Length)
Upper = Basis + StdDev
Lower = Basis - StdDev

ADX_Length = input(4)
TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
SmoothedTrueRange = sma(TrueRange, ADX_Length)
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0
SmoothedDirectionalMovementPlus = sma(DirectionalMovementPlus, ADX_Length)
SmoothedDirectionalMovementMinus = sma(DirectionalMovementMinus, ADX_Length)
DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus - DIMinus) / (DIPlus + DIMinus)*100
SmoothedADX1 = ema(DX, input(8))
SmoothedADX2 = ema(DX, input(15))

Condition1 = crossunder(Price, Upper) and SmoothedADX1 < SmoothedADX2

Take_Profit = input(800)
Stop_Loss = input(400)

strategy.entry("ShortEntry", true, when = Condition1)
strategy.exit("ShortExit", "ShortEntry", profit = Take_Profit, loss = Stop_Loss)

```

> Detail

https://www.fmz.com/strategy/437672

> Last Modified

2024-01-04 17:12:30
