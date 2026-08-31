
> Name

RSI-Moving-Average-Crossover-Strategy-433521

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18094372b81879e8fc4.png)

## Overview

The RSI Moving Average Crossover Strategy generates trading signals by calculating the crossover between fast and slow moving averages of RSI indicators. When the moving average of the fast RSI crosses above that of the slow RSI, it is a buy signal. When the fast RSI moving average crosses below the slow RSI moving average, it is a sell signal. This strategy combines the strengths of RSI indicators and moving averages to effectively filter out market noise and identify trend reversal opportunities.  

## Strategy Logic

This strategy first calculates two RSI indicators with lengths of 100 and 40, representing the fast and slow RSIs respectively. It then calculates 21-day simple moving averages of these two RSIs, where the moving average of the 100 RSI is the fast moving average and the 40 RSI moving average is the slow one.  

The strategy goes long when the fast moving average crosses above the slow moving average, indicating an uptrend is forming. It goes short when the fast moving average crosses below the slow one, signaling a potential trend reversal. In addition, it uses the 200-day moving average to filter signals, entering long only if the closing price is above the 200-day MA line.

## Advantage Analysis

The RSI Moving Average Crossover Strategy utilizes the strengths of dual RSI setups and moving averages to effectively identify reversal opportunities. The main advantages include:

1. Using two RSIs can more accurately detect reversals by describing both fast and slow price cycles. Crossover signals are more meaningful.  
2. Moving averages help filter out whipsaws and catch key turning points.
3. Incorporating the 200-day MA avoids false signals and ensures trading only in relatively strong trends.  
4. The strategy logic is simple and intuitive, easy to understand, validate and optimize.
5. Widely applicable to stocks, forex, cryptocurrencies, etc.  

## Risk Analysis  

Potential risks include:

1. Crossovers may still lead to false breakouts. Other indicators should be used for signal confirmation.
2. Stop loss can be frequently triggered during choppy periods. Wider stops or waiting for clearer reversal signal is recommended. 
3. Extensive backtesting and optimization is needed for ideal parameter selection.
4. Larger trend analysis is not considered. Significant trend changes may lead to large losses. Using with other trend/pattern analysis tools is advised.

## Optimization Directions

There is great room for optimization:  

1. Test different parameter combinations to find optimal settings.
2. Add other indicators for signal filtering, e.g. KDJ, MACD, etc.
3. Optimize stop loss mechanisms, e.g. fixed, trailing, Chandelier Exits.  
4. Incorporate higher timeframe trend analysis tools to avoid trading against major trends, e.g. adding ADX for trend strength.
5. Test performance across different markets (stocks, forex, crypto, etc.) to find best asset class fit. 
6. Employ machine learning and genetic algorithms for robust parameter optimization.  

## Conclusion  

The RSI Moving Average Crossover Strategy effectively combines the strengths of dual RSI setups and moving averages to identify high-probability reversal trades. The logic is simple and applicable across markets, with great optimization flexibility. Proper optimizations in stop loss, filter tools and trend analysis integration are advised to control risks. When set up optimally, this can be a very effective quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|Length Of Fast RSI|
|v_input_int_2|40|Length Of Slow RSI|
|v_input_int_3|21|Length Of Moving Average|
|v_input_int_4|200|Length Of Deciding Moving Average|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-28 00:00:00
end: 2023-11-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sapt_Jash

//@version=5
strategy("SRJ RSI Outperformer Strategy", overlay=true)

srcperiod1 = input.int(100, minval=1, title="Length Of Fast RSI")
srcperiod2 = input.int(40, minval=1, title="Length Of Slow RSI")
srcperiod3 = input.int(21, minval=1, title="Length Of Moving Average")
srcperiod4 = input.int(200, minval=1, title="Length Of Deciding Moving Average")
rsi1 = ta.rsi(close, srcperiod1)
rsi2 = ta.rsi(close, srcperiod2)
divergence1 = (rsi2/rsi1)
divergence2 = (rsi1/divergence1)
ma1 = ta.sma(rsi1, srcperiod3)
ma2 = ta.sma(divergence2, srcperiod3)



//Long Conditions//



longcondition = (ta.crossover(ma2, ma1) and (close > ta.sma(close, srcperiod4)))

    

//Exit onditions//


exitcondition = (ta.crossunder(ma2, ma1) or (ta.crossunder(close, ta.sma(close, srcperiod4))))


if (longcondition)
    strategy.entry("Long Entry", strategy.long)
    
if (exitcondition)
    
    strategy.exit("Long Exit", profit = close * 1.20, loss = close * 0.95)



```

> Detail

https://www.fmz.com/strategy/433521

> Last Modified

2023-11-28 11:23:19
