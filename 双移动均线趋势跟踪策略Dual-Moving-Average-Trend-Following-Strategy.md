
> Name

双移动均线趋势跟踪策略Dual-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16e512ae1870d04d4f5.png)


## Overview

The dual moving average trend following strategy calculates the double exponential moving averages of the price to form fast and slow lines. It identifies price trends based on the crossover of the two lines to implement trend following trading. This strategy belongs to quantitative trading strategies based on trend following.

## Strategy Logic

The strategy first calculates the double exponential moving averages of the price, including fast and slow lines. The fast line has a period of 4, and the slow line has a period of 8. Trading signals are generated when the two lines cross. When the fast line crosses above the slow line, a buy signal is generated. When the fast line crosses below the slow line, a sell signal is triggered. In addition, the strategy also calculates the MACD indicator to provide additional trading signals. Diverging red MACD bars are sell signals, while converging green bars are buy signals. By combining the crossover of dual moving averages and MACD indicator, the strategy identifies price trend directions for trend following trading.

## Advantage Analysis

Firstly, this strategy trades along the price trend to avoid transaction costs. Secondly, the dual moving averages filter out some price noises and capture the price trend smoothly. Also, the flexible parameter optimization of the moving averages and MACD makes the strategy adaptable to different products and environments. Finally, the simple and clear logic makes this strategy easy to understand and implement, suitable for quantitative trading algorithm design.

## Risk Analysis

The strategy relies heavily on parameter optimization. Improper parameter settings may generate many false signals. Additionally, the lagging nature of dual moving averages may cause missed turning points. Trend following strategies are also prone to chasing uptrends and killing downtrends, which poses certain risks. Moreover, the liquidity of the trading products and transaction costs will also affect the strategy's profitability. To mitigate risks, parameters can be optimized, additional filters can be added, and position sizing can be controlled.

## Improvement Directions

The following aspects of the strategy can be improved:

1. Optimize the periods of the dual moving averages to find the optimal combination. 

2. Add other indicators like RSI and KD to filter signals and improve quality.

3. Incorporate stop loss strategies to exit trades at trend reversals.

4. Dynamically adjust position sizing based on market conditions to control risk.

5. Optimize parameters for different trading products. 

6. Incorporate advanced strategies like machine learning to improve performance.

## Conclusion

In summary, this is a simple dual moving average trend following strategy. The strategy logic is straightforward and easy to implement. The flexible parameter tuning makes it suitable as an introductory quantitative trading strategy. However, the risks of chasing trends and signal lagging need to be addressed through further enhancements to improve stability and risk control. Overall, this strategy provides a great learning opportunity for beginners and establishes a foundation for advanced strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|fastPeriod|
|v_input_2|8|slowPeriod|
|v_input_3|3|SmthLen|
|v_input_4|0.5|TopBand|
|v_input_5|-0.5|LowBand|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-14 00:00:00
end: 2023-11-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/11/2017
// The SMI Ergodic Indicator is the same as the True Strength Index (TSI) developed by 
// William Blau, except the SMI includes a signal line. The SMI uses double moving averages 
// of price minus previous price over 2 time frames. The signal line, which is an EMA of the 
// SMI, is plotted to help trigger trading signals. Adjustable guides are also given to fine 
// tune these signals. The user may change the input (close), method (EMA), period lengths 
// and guide values.
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
//
// WARNING:
// - For purpose educate only
////////////////////////////////////////////////////////////
strategy(title="SMI Ergodic Oscillator")
fastPeriod = input(4, minval=1)
slowPeriod = input(8, minval=1)
SmthLen = input(3, minval=1)
TopBand = input(0.5, step=0.1)
LowBand = input(-0.5, step=0.1)
reverse = input(false, title="Trade reverse")
// hline(0, color=gray, linestyle=dashed)
// hline(TopBand, color=red, linestyle=line)
// hline(LowBand, color=green, linestyle=line)
xPrice = close
xPrice1 = xPrice - xPrice[1]
xPrice2 = abs(xPrice - xPrice[1])
xSMA_R = ema(ema(xPrice1,fastPeriod),slowPeriod)
xSMA_aR = ema(ema(xPrice2, fastPeriod),slowPeriod)
xSMI = xSMA_R / xSMA_aR
xEMA_SMI = ema(xSMI, SmthLen)
pos = iff(xEMA_SMI < xSMI, -1,
	   iff(xEMA_SMI > xSMI, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(xSMI, color=green, title="Ergotic SMI")
plot(xEMA_SMI, color=red, title="SigLin")
```

> Detail

https://www.fmz.com/strategy/432119

> Last Modified

2023-11-14 16:56:21
