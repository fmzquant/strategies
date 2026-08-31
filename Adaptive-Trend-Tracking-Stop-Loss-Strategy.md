
> Name

Adaptive-Trend-Tracking-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/195b3e58c7a1830d2ba.png)


### Overview

This strategy utilizes the Wilder volatility trailing stop method, combined with ATR indicator and different types of moving averages, to implement an adaptive trend tracking stop loss strategy. 

### Strategy Logic

The core of this strategy is the Wilder volatility trailing stop algorithm. It first calculates the ATR indicator, and dynamically plots the stop loss line according to the input ATR length and multiplier. It then tracks the highest high and lowest low of the stop loss line based on the chosen price option among close, high and low prices. It sends trading signals when price breaks the stop loss line.

In the code, the f_ma function implements various moving averages including RMA, EMA, SMA and Hull MA. The ATR indicator is calculated and multiplied by the user defined multiplier to generate the volatility based trailing stop line. The highest and lowest levels of this line are tracked using highest and lowest functions. Trades are taken when price penetrates this trailing stop line.

By flexibly utilizing the ATR indicator, different moving averages and adjustable parameters, this strategy realizes an highly adaptive trend tracking stop loss system. It can effectively track trends and stop out with losses when major pullbacks occur in the market.

### Advantage Analysis

- This strategy leverages the Wilder Volatility Trailing Stop algorithm, which is a mature and reliable trend tracking stop loss methodology.

- The strategy uses ATR indicator to dynamically calculate the stop loss line, avoiding rigid stop loss points. ATR can effectively reflect market volatility and risk levels.

- The implementation of various moving averages including RMA, EMA, SMA and Hull MA enhances the adaptability of the strategy.

- By tuning the ATR length, multiplier parameters, optimized parameters can be found for different markets, improving strategy performance.

- The use of different price options like high, low, close prices allows optimization across different products.

- In summary, this is a reliable, adaptive and easily optimizable trend tracking stop loss strategy.

### Risk Analysis

- The strategy relies heavily on parameter optimization. Appropriate ATR and multiplier parameters need to be found through testing for different markets and products, otherwise the stop loss effect may not be ideal.

- In ranging markets, the ATR stop loss line may trigger frequent unwarranted stop outs. Trend filtering indicators need to be introduced to optimize this.

- If the stop loss line is too wide, loss opportunities will be missed. If too tight, trade frequency and slippage costs will increase. A balanced point needs to be found through careful testing.

- Too many moving average options may lead to performance deviation. One major moving average should be selected for each product, others used only for reference. 

- This strategy focuses on trend tracking and does not directly target profits. It needs to be combined with other entry/exit strategies or take profit techniques.

- With improper parameters, the strategy may exhibit excessive trading or oversized holding periods. This needs to be addressed through optimization.

### Optimization Directions

- Trend identification indicators can be introduced to avoid whipsaws in ranging markets.

- Reversal indicators may be tested to allow faster stop out and reverse when uptrend and downtrend alternate.

- The ATR period parameter can be correlated with product characteristics, so that different products use different ATR periods.

- Volume indicators can be used to tighten the stop loss line faster when volume declines significantly. 

- The stop loss percentage may be increased, but not too tight to avoid stopping out at normal retracements.

- Other indicators can be used to gauge momentum, and optimize parameters to loosen stops when momentum is weak.

### Summary

Based on the Wilder Volatility Trailing Stop concept, this strategy utilizes the ATR indicator to design a highly adaptive trend tracking stop loss system. Through parameter optimization it can be fitted to different trading products, and is a reliable and practical stop loss approach. But risks need to be managed by further enhancements like trend filters and volume elements to make it more robust. It also needs to be combined with other strategies to maximize the utility of stop loss techniques.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|ATR multiplier|
|v_input_2|7|ATR length|
|v_input_3|0|ATR moving average type: RMA|EMA|SMA|HULL|
|v_input_4|0|significant close type for trail calculation: close|high-low|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Wilder's Volatility Trailing Stop Strategy with various MA's
// by SparkyFlary

//For Educational Purposes
//Results can differ on different markets and can fail at any time. Profit is not guaranteed.
strategy(title="Wilder's Volatility Trailing Stop Strategy with various MA's", shorttitle="Trailing Stop Strategy", overlay=true)

AtrMult = input(3.0, title="ATR multiplier")
ATRlength = input(7, title="ATR length")
ATRavgType = input("RMA", title="ATR moving average type", options=["RMA", "EMA", "SMA", "HULL"])
sicType = input("close", title="significant close type for trail calculation", options=["close", "high-low"])

//function for choosing moving averages
f_ma(type, src, len) =>
    float result = 0
    if type == "RMA" // Wilder's moving averaege or Running moving average
        result := rma(src, len)
    if type == "EMA" // Exponential moving average
        result := ema(src, len)
    if type == "SMA" // Simple moving average
        result := sma(src, len)
    if type == "HULL" // Hull moving average
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    result

ATR = f_ma(ATRavgType, tr, ATRlength)
upperTrail = lowest(sicType=="close"?close:low, ATRlength) + AtrMult * ATR
lowerTrail = highest(sicType=="close"?close:high, ATRlength) - AtrMult * ATR

float TS = 0
TS := close < TS[1] ? upperTrail[1] : close > TS[1] ? lowerTrail[1] : TS

//plot
plot(TS, title="trailing stop", color=close<TS?color.red:color.green)

//Strategy
buy = crossover(close, TS)
//sell = close < TS
short = crossunder(close, TS)
//cover = close > TS

strategy.entry(id="enter long", long=true, when=buy)
//strategy.close(id="enter long", comment="exit long", when=sell)
strategy.entry(id="enter short", long=false, when=short)
//strategy.close(id="enter short", comment="exit short", when=cover)
```

> Detail

https://www.fmz.com/strategy/429467

> Last Modified

2023-10-17 14:04:28
