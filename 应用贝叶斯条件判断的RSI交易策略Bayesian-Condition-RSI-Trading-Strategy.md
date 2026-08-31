
> Name

应用贝叶斯条件判断的RSI交易策略Bayesian-Condition-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9e75fbc8a1b5e34401.png)


## Overview

This article mainly analyzes a quantitative trading strategy called "Bayesian Condition RSI Trading Strategy". This strategy calculates the probability distribution of the RSI indicator and applies Bayesian rule to infer the probability of the RSI indicator continuing to rise or fall to judge future price trends and make profits.

## Strategy Principle 

The core logic of this strategy is:

1. Calculate probability distribution A of whether the closing price has risen within a certain cycle
2. Calculate probability distribution B of whether the RSI indicator continues to rise within the corresponding cycle
3. Apply Bayesian rule to calculate the probability of A and B occurring simultaneously
4. When this probability is higher than the threshold, judge that the trend will continue and take trading signals

Specifically, the strategy first defines the parameter p as the cycle parameter for calculating the RSI indicator, and r as the time range for predicting future price changes. Then within the p cycle, count the number of times the closing price rises to calculate the probability distribution A. At the same time, within the p cycle, count the number of times the RSI continues to rise within the r cycle after this cycle ends, and calculate the probability distribution B.

After that, apply the Bayesian formula to calculate the probability that the two conditions of "closing price rise" and "RSI continue to rise" are satisfied at the same time, as the final probability judgment indicator. When this probability is higher than a given threshold, judge that the uptrend will continue and take long positions; when the probability is lower than the threshold, judge that the trend is reversed and close positions.

In this way, the strategy comprehensively considers price information and technical indicators, applies probability statistics and Bayesian rules to judge future trends and generate trading signals.

## Advantages of the Strategy

The main advantages of this strategy are:

1. **Combining multiple information**: The strategy considers not only price information, but also technical indicator information such as RSI to comprehensively judge future trends and improve judgment accuracy.

2. **Probability prediction**: Make probability predictions on the direction of price and RSI changes through statistical probability distribution, instead of simple numerical comparison, making the judgment more scientific.

3. **Bayesian optimization**: Use Bayesian rules to calculate relevant probabilities and optimize original statistical probabilities to make judgments more accurate.

4. **Flexible parameters**: Provide multiple parameters for adjustment and optimization to fit different markets and assets and improve adaptability of the strategy.

5. **Simple and effective**: The strategy idea is clear and simple statistical and probability operations are used to generate trading signal judgments, which is easy to understand and optimize, and the effect is significant.

## Risks of the Strategy  

The main risks of this strategy also include:

1. **Parameter dependence**: The performance relies heavily on parameter settings. Different markets need to adjust many parameters to achieve optimal results, increasing complexity of strategy operation.

2. **Probability error**: Due to limited statistical time and samples, the calculated probability may not match the real trend, leading to judgment deviation.  

3. **Special events**: Major emergencies may affect the correlation between market prices and RSI indicators, causing strategy failure.

4. **Technical indicator failure**: In some market situations, technical indicators like RSI may produce invalid signals, leading to strategy judgment failure.

Solutions include: optimizing parameter setting process, adjusting statistical time and sample size, combining more auxiliary information, manual intervention in abnormal situations, etc.

## Optimization Directions

The main optimization directions of this strategy include:

1. **Multiple timeframes**: Running strategies across multiple timeframes (daily, weekly etc) for integrated judgment to improve stability.  

2. **More indicators**: Adding more technical indicator signals like candlestick patterns, moving averages etc to enrich basis for judgment.

3. **Model optimization**: Using machine learning etc to optimize the Bayesian model for more accurate calculations.  

4. **Dynamic parameters**: Adding dynamic optimization modules for parameters to adjust in real-time with market changes.

5. **Risk control mechanism**: Setting risk metrics like maximum drawdown and trade frequencies to prevent huge losses in extreme markets.

6. **Ensemble improvements**: Ensemble with other strategy types or models to form voting mechanisms and improve stability.

## Conclusion

This strategy first statistically calculates probability distributions of price and RSI, then uses Bayesian rules to compute combined probabilities, generating trading signals when probabilities exceed set thresholds, thus profiting. This strategy combines multi-source information, leverages probability prediction and Bayesian optimization for decent judgment performance. Main optimization directions include timeframe expansion, more indicators, dynamic parameters etc. In conclusion, this strategy has a unique idea and remarkable effect that is worth exploring and applying.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|Period|
|v_input_2|1.003|Movement Thresh|
|v_input_3|7|Look Range|
|v_input_4|8|Jump|
|v_input_5|3|SM|
|v_input_6|14|RSIP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-03-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Stealthy7 trading scripts are radikal. You have entered the mystical realm of demonic profit.
// If you like this script, check out my bots at cryptotrader.org/?r=51
// Let me know if you find any improvements to this script. It is beta. 
// Please subscribe.
strategy("Stealthy7 Bayes Conditional RSI Trader Strategy", overlay=true)
p = input(title="Period",  defval=30, minval=5, maxval=500)
t = input(title="Movement Thresh", type=float, defval=1.003, minval=1.001, maxval=1.5, step=0.001)
r = input(title="Look Range",  defval=7, minval=1,maxval=500, step=1)
RSIT = input(title="Jump",  defval=8, minval=1,maxval=99, step=1)
BAYEST = input(title="SM",  defval=3, minval=1,maxval=99, step=1)
RSIP = input(title="RSIP",  defval=14, minval=2,maxval=100, step=1)
countup = 1
countdn = 1
countupS = 1
countdnS = 1
for i = p to 1
    if close[i]/close[i + r] > t
        countup := countup + 1
    else
        countdn := countdn + 1
    if close[i]/close[i + r] < 2 - t
        countupS := countupS + 1
    else
        countdnS := countdnS + 1

rsi = rsi(open,RSIP)

countup2 = 1
countup3 = 1
countup2S = 1
countup3S = 1
for i = p to 1
    if close[i]/close[i + r] > t and rsi[i + r + 1] > rsi[i + r + 2] + RSIT
        countup2 := countup2 + 1
    else
        countup3 := countup3 + 1
    if close[i]/close[i + r] < 2 - t and rsi[i + r + 1] < rsi[i + r + 2] - RSIT
        countup2S := countup2S + 1
    else
        countup3S := countup3S + 1

countup2b = countup2 / p
countup3b = countup3 / p
countupb = countup / p
countdnb = countdn / p

countup2bS = countup2S / p
countup3bS = countup3S / p
countupbS = countupS / p
countdnbS = countdnS / p
bayes = 0
bayes := ((countupb * countup2b) / ((countupb * countup2b) + (countdnb * countup3b))) * 100
bayesS = 0
bayesS := ((countupbS * countup2bS) / ((countupbS * countup2bS) + (countdnbS * countup3bS))) * 100
SN1 = sma(bayes,BAYEST)
SN2 = sma(bayesS,BAYEST)
shortCondition = crossunder(bayesS, SN2) //and rsi < 49
longCondition = crossover(bayes, SN1) //and rsi > 59
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/435763

> Last Modified

2023-12-18 17:09:00
