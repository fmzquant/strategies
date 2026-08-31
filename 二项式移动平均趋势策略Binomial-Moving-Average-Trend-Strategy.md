
> Name

二项式移动平均趋势策略Binomial-Moving-Average-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187be3b285275656da1.png)


## Overview

The Binomial Moving Average (BMA) is a novel type of moving average indicator. It uses half of the binomial coefficients to calculate the average price, featuring unique calculation methods, good smoothness and strong practicality.

This strategy combines fast BMA and slow BMA to generate trading signals like MACD, belonging to the trend-following strategy. It can be applied to multiple timeframes and is suitable for medium-to-long term operations.

## Strategy Details 

### Strategy Name  

Binomial Moving Average Trend Strategy

### Strategy Logic

1. Calculate the Binomial Moving Average (BMA). According to the user-set period, it calculates the binomial coefficients and takes half of them as weights to average prices. For example, with period 5, it calculates 9 binomial coefficients and takes their half for weighted average. This gives more weight to recent candles and better smoothness.

2. Set fast BMA period and slow BMA period. Fast BMA is more sensitive to price changes while slow BMA is more stable. Their crossover generates trading signals.  

3. When fast BMA goes above slow BMA, long position is opened. When fast BMA falls below slow BMA, short position is opened. Hold the position until opposite signal appears.

### Advantage Analysis

The biggest advantage of this strategy lies in the innovative calculation of BMA. It enhances the strengths of moving averages with improved smoothness and practicality. Compared to EMA and SMA, BMA gives more weight to recent candles while retaining more historical information. This allows it to better capture trends and generate fewer false signals.

In addition, the fast and slow BMA combo makes full use of the advantages of moving averages. It filters out lots of noise and only produces signals at trend turning points. The strategy itself is simple to understand and implement, suitable for medium-to-long term trading.  

### Risk Analysis

The main risks of this strategy include:

1. Like all trend-following strategies, it can lead to losses when trend reverses. Solutions are setting stop loss or optimizing parameters to make BMA more sensitive.  

2. Improper BMA parameter setup also impacts strategy performance. Overly sensitive fast BMA may generate false signals while lagging slow BMA may miss trend opportunities. Extensive tests are needed to find the optimal parameter combination.

3. The strategy by default uses full position. Position sizing can be added according to risk preference to limit per trade loss.

### Optimization Directions   

The main optimization directions are testing of BMA itself and the parameter combination.

1. Period setting: Test different fast BMA and slow BMA periods to find the optimal combo. Generally fast period is between 10-30, slow period between 20-60.  

2. BMA weight: Test different weighting schemes, like fully distributing half binomial coefficients or putting more weight on recent candles. This may further improve BMA's smoothness.

3. Filter conditions like breakouts and rising volume can be added to avoid unreasonable signals. 

4. Stop loss mechanism and position sizing can also be tested to better control risks.

## Conclusion

This strategy firstly proposes the unique Binomial Moving Average indicator. It enhances moving average calculation and improves the overall usefulness and stability of the strategy. Crossovers between fast and slow BMA generate simple yet effective trading signals. There remains room for further optimization on parameter smoothness and risk control. It's a very promising trend-following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast MA|
|v_input_2|30|Slow MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-07 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HosseinDaftary

//@version=4
strategy("Binomial Moving Average","BMA", overlay=true, margin_long=100, margin_short=100 ,max_bars_back=96)
//Binomial Moving Average:This type of moving average that is made by myself and i did not see anywhere before uses the half of binomial cofficients for
//averaging the prices for example if the period be 5 then we use the 9 degree binomial cofficients(that yields 10 cofficients) and use half of them.
//we use 126/256 for last bar,84/256,36/256,9/256 and finally use 1/256 for 5th bar. Seemingly this MA works better than EMA.
fa_ma=input(title='Fast MA',defval=10)
sl_ma=input(title='Slow MA',defval=30)

fac(n)=>
    fact=1
    for i= 1 to n
        fact:=fact*i
    fact
cof= array.new_float(sl_ma) 

hn_ma(price,length)=>
    sum=1.0
    sum1=0.0
    array.set(cof,length-1,1)
    for i=2 to length
        array.set(cof,length-i,fac(2*length-1)/(fac(i-1)*fac(2*length-i)))
        sum:=sum+array.get(cof,length-i)
    for i=0 to length-1
        array.set(cof,i,array.get(cof,i)/sum)
        sum1:=sum1+array.get(cof,i)*price[i]
    sum1
hn1=plot(hn_ma(close,sl_ma) , color=#00ff00)
hn2=plot(hn_ma(close,fa_ma) ,color=#ff0000)
fill(hn1,hn2,color=hn_ma(close,fa_ma)>hn_ma(close,sl_ma)?color.green:color.red)


longCondition = crossover(hn_ma(close, fa_ma), hn_ma(close, sl_ma))
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = crossunder(hn_ma(close, fa_ma), hn_ma(close, sl_ma))
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/434695

> Last Modified

2023-12-08 14:55:19
