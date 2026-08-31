
> Name

威美均线策略WAMI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1201dcd0fb4853144db.png)

## Overview

The WAMI Strategy is a trading strategy based on Fourier analysis that aims to find consistent and profitable trades on historical market data through an iterative optimization process. It combines the Exponential Moving Average (EMA), Weighted Moving Average (WMA), and Momentum indicator (MOM) to form a composite trading indicator called WAMI. When the WAMI crosses above or below a threshold, the strategy will issue buy or sell signals.

## Strategy Logic

The core indicator of this strategy is WAMI. Its calculation is: first compute the momentum of price, then take the n-day WMA, and finally perform EMA twice to derive the final WAMI. Among them, momentum reflects the speed of price changes, WMA filters out short-term noise, and EMA smoothes the price.

When WAMI rises above a given threshold, a buy signal is generated, implying an uptrend is forming in the market. When it falls below the threshold, a sell signal is generated, meaning a downtrend has commenced. Users can adjust the threshold based on backtest results to better optimize the strategy.

## Advantage Analysis 

This strategy combines trend-following and overbought-oversold analysis, which can capture medium-to-long term price trends while avoiding being trapped. Compared to plain moving average strategies, WAMI improves the quality and consistency of trading signals.

The main advantages are:

1. Fourier optimization improves parameter tuning  
2. Double EMA filter reduces false signals
3. WMA+MOM combo improves sensitivity  
4. Flexible for both short and long-term trading

## Risk Analysis

There are also some risks with this strategy:

1. Optimization process is complex, improper settings may fail
2. Performance decreases in ranging markets  
3. Performance highly depends on parameter settings
4. Slow to switch on trend reversals

These risks can be reduced by adjusting parameter combinations, setting stop loss, and having reasonable profit expectations. The strategy should be stopped or position sized down when markets become excessively volatile.

## Optimization Directions

Some aspects this strategy can be further optimized on:

1. Test more parameter sets to find optimum
2. Add supporting conditions like volume filter for entries
3. Incorporate stop loss mechanisms
4. Combine with other indicators to gauge overall trend
5. Dynamically adjust parameters to fit changing market environments

## Conclusion

In conclusion, the WAMI Strategy is a recommended medium-to-long term trend following strategy. By thoroughly analyzing price and volume changes, it generates quality trading signals. Given proper parameter optimization and risk control, this strategy can achieve steady profits. However, users should note that any strategy may fail, so prudent evaluation is a must before committing real capital.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Length_EMA|
|v_input_2|4|Length_WMA|
|v_input_3|false|Trigger|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 17/01/2017
// The WAMI-based trading lies in the application and iteration of the 
// optimization process until the indicated trades on past market data 
// give consistent, profitable results. It is rather difficult process 
// based on Fourier analysis. 
// You can to change Trigger parameter for to get best values of strategy.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="WAMI Strategy", shorttitle="WAMI Strategy")
Length_EMA = input(13, minval=1)
Length_WMA = input(4, minval=1)
Trigger = input(0)
reverse = input(false, title="Trade reverse")
hline(Trigger, color=purple, linestyle=line)
xWAMI = ema(ema(wma(mom(close, 1),Length_WMA),Length_EMA),Length_EMA)
pos = iff(xWAMI > Trigger, 1,
	   iff(xWAMI < Trigger, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xWAMI, color=blue, title="WAMI")
```

> Detail

https://www.fmz.com/strategy/435285

> Last Modified

2023-12-13 17:42:01
