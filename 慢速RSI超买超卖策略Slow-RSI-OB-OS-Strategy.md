
> Name

慢速RSI超买超卖策略Slow-RSI-OB-OS-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc051de612e6c7fecf.png)


## Overview

The Slow RSI OB/OS strategy opens up new trading opportunities by extending the lookback period of RSI to reduce the fluctuation of the RSI curve. The strategy is also applicable to other technical indicators like MACD.  

## Strategy Logic  

The core idea of this strategy is to extend the lookback period of RSI to 500 bars by default and then smooth the RSI curve with a 250-bar SMA. This can significantly reduce the fluctuation of RSI and slow down its reaction speed, thus generating new trading signals.

The prolonged lookback period weakens the fluctuation of RSI, so the criteria for overbought and oversold levels also need to be adjusted. The strategy sets customizable overbought line at 52 and oversold line at 48. A long signal is triggered when the smoothed RSI crosses above the oversold line from below. A short signal is triggered when it crosses below the overbought line from above.

## Advantages

1. Highly innovative by exploring new trading ideas through extended periods 
2. Greatly reduce false signals and improve stability
3. Customizable OB/OS thresholds adaptive to different markets
4. Allow pyramiding to improve profitability  

## Risks

1. Missing short-term opportunities due to lengthy periods
2. Requires patience waiting for trading signals  
3. Improper OB/OS threshold settings may increase losses
4. Risks of being trapped  

Solutions:

1. Shorten the periods properly to increase trading frequency
2. Take partial positions to diversify risks
3. Optimize parameters to adapt to changing market conditions 
4. Set stop loss to avoid huge losses

## Optimization Directions  

1. Optimize RSI parameters to find the best period combination
2. Test different SMA smoothing periods  
3. Optimize OB/OS parameters to fit different markets
4. Add stop loss strategies to control single loss

## Conclusion

The Slow RSI OB/OS strategy successfully explored new trading ideas by extending periods and using SMA to suppress fluctuations. With proper parameter tuning and risk control, the strategy has the potential to achieve steady and profitable excess returns. In conclusion, the strategy is highly innovative and valuable to use.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|Price Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|500|RSI Length|
|v_input_3|250|RSI SMA|
|v_input_4|52|OB|
|v_input_5|48|OS|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-20 00:00:00
end: 2023-12-27 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// Wilder was a very influential man when it comes to TA. However, I'm one to always try to think outside the box. 
// While Wilder recommended that the RSI be used only with a 14 bar lookback period, I on the other hand think there is a lot to learn from RSI if one simply slows down the lookback period 
// Same applies for MACD.
// Every market has its dynmaics. So don't narrow your mind by thinking my source code input levels are the only levels that work.
// Since the long lookback period weakens the plot volatility, again, one must think outside the box when trying to guage overbought and oversold levels. 

// Good luck and don't bash me if some off-the-wall FA spurned divergence causes you to lose money.
// And NO this doesn't repaint and I won't answer those who ask. 
//@version=4

strategy("SLOW RSI OB/OS Strategy", overlay=false)
price = input(ohlc4, title="Price Source")
len = input(500, minval=1, step=5,  title="RSI Length")
smoother = input(250, minval=1, step=5, title="RSI SMA")
up = rma(max(change(price), 0), len)
down = rma(-min(change(price), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
EmaRSI = ema(rsi,smoother)
plot(EmaRSI, title="EmaRSI", style=line, linewidth=1, color=yellow)


OB = input(52, step=0.1)
OS = input(48, step=0.1)
hline(OB, linewidth=1, color=red)
hline(OS,linewidth=1, color=green)
hline(50,linewidth=1, color=gray)


long = change(EmaRSI) > 0 and EmaRSI <= 50 and crossover(EmaRSI, OS)
short = change(EmaRSI) < 0 and EmaRSI >= 50 and crossunder(EmaRSI, OB)


strategy.entry("Long", strategy.long, when=long) //_signal or long) //or closeshort_signal)
strategy.entry("Short", strategy.short, when=short) //_signal or short) // or closelong_signal)

// If you want to try to play with exits you can activate these!

//closelong = crossunder(EmaRSI, 0) //or crossunder(EmaRSI, OS)
//closeshort = crossover(EmaRSI, 0) //or crossover(EmaRSI, OB)

//strategy.close("Long", when=closelong)
//strategy.close("Short", when=closeshort)



```

> Detail

https://www.fmz.com/strategy/436910

> Last Modified

2023-12-28 18:07:48
