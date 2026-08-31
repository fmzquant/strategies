
> Name

双平滑随机指数布雷瑟策略Dual-Smoothed-Stochastic-Bressert-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ad9856d943f5c411ed.png)

## Overview

The Dual Smoothed Stochastic Bressert strategy is designed by William Blau. It attempts to combine moving average methods with oscillator principles.

The strategy generates trading signals by calculating a series of dual smoothed stochastic indices. Specifically, it first calculates the smoothed stochastic index of prices, and then applies a smooth average to this stochastic index again to obtain the "dual smoothed stochastic index". When the trigger line crosses the dual smoothed stochastic index, buy or sell signals are generated.

## Principle

1. Calculate the PDS period smoothed stochastic index xPreCalc of prices 
2. Apply an EMAlen exponential moving average to xPreCalc to obtain xDSS, i.e., the "dual smoothed stochastic index"
3. Calculate the trigger line xTrigger, which is another EMA line of xDSS
4. Generate trading signals:
   - Go long when xTrigger is below xDSS and below the oversold line
   - Go short when xTrigger is above xDSS and above the overbought line
5. Plot the curves of dual smoothed stochastic index xDSS and trigger line xTrigger

## Pros

The strategy combines the trend following capability of moving averages and the overbought/oversold identification capability of stochastic indices. The main advantages are:

1. Dual smoothing filters false signals and improves stability
2. Trigger line generates trading signals and avoids frequent trading  
3. Customizable parameters adapt to different market conditions
4. Intuitive graphics for easy grasping and validation of the strategy

## Risks

The Dual Smoothed Stochastic Bressert Strategy also has some risks:

1. More false signals of Bressert indicator in low volatile markets
2. Dual smoothing may cause signal lag, missing price turning points  
3. Improper parameter settings may fail to identify price swings
4. Trading risk still exists  

Countermeasures:

1. Optimize parameters to improve accuracy  
2. Filter signals with other indicators
3. Use position sizing to hedge risks

## Optimization

The strategy can also be optimized in the following aspects:

1. Adjust the cycle parameters of the dual smoothed index to optimize the smoothing effect
2. Add stop loss mechanisms to control single loss
3. Add trend judgment indicators to avoid reverse operation  
4. Use position sizing to maximize profit space

## Conclusion

The Dual Smoothed Stochastic Bressert Strategy combines the advantages of moving averages and stochastic indices for identifying overbought/oversold points and following trends. Setting up dual smoothing and trigger lines can effectively filter out noisy signals. However, parameter optimization and risk control are still needed to obtain steady gains in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|PDS|
|v_input_2|9|EMAlen|
|v_input_3|5|TriggerLen|
|v_input_4|80|Overbought|
|v_input_5|20|Oversold|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/04/2017
// Double Smoothed Stochastics (DSS) is designed by William Blaw. 
// It attempts to combine moving average methods with oscillator principles. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="DSS Bressert (Double Smoothed Stochastic)", shorttitle="DSS Bressert")
PDS = input(10, minval=1)
EMAlen = input(9, minval=1)
TriggerLen = input(5, minval=1)
Overbought = input(80, minval=1)
Oversold = input(20, minval=1)
reverse = input(false, title="Trade reverse")
hline(Overbought, color=green, linestyle=line)
hline(Oversold, color=red, linestyle=line)
xPreCalc = ema(stoch(close, high, low, PDS), EMAlen)
xDSS = ema(stoch(xPreCalc, xPreCalc, xPreCalc, PDS), EMAlen)
//xDSS = stoch(xPreCalc, xPreCalc, xPreCalc, PDS)
xTrigger = ema(xDSS, TriggerLen)
pos = iff(xTrigger < xDSS and xTrigger < Oversold, -1,
	     iff(xTrigger > xDSS and xTrigger > Overbought, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xDSS, color=blue, title="DSS")
plot(xTrigger, color=red, title="Trigger")
```

> Detail

https://www.fmz.com/strategy/441102

> Last Modified

2024-02-05 15:57:37
