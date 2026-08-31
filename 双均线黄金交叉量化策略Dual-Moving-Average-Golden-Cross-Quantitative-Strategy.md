
> Name

双均线黄金交叉量化策略Dual-Moving-Average-Golden-Cross-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1586f33d890795e25c1.png)


## Overview  

The Dual Moving Average Golden Cross Quantitative Strategy is a technical indicator-based quantitative trading strategy. It determines market trends by calculating two moving averages of different periods and enables low-risk trading. When the shorter-period moving average crosses above the longer-period moving average, a golden cross signal is generated for going long. When the shorter moving average crosses below the longer one, a death cross signal is generated for going short. This strategy also incorporates price channel indicators to avoid false breaks.

## Strategy Principle

The Dual Moving Average Golden Cross Quantitative Strategy is based on moving average theory. Moving averages can effectively filter market noise and indicate long-term trend directions. When the shorter-period moving average crosses above the longer-period moving average, it indicates an upward reversal of the market and is a buy signal. When the shorter moving average crosses below the longer one, it indicates a downward reversal and is a sell signal. This strategy sets two groups of moving averages - the first is the 2-day and 3-day moving averages, and the second is the 420-day moving average. A buy signal is generated when the 2-day crosses above the 3-day moving average, and a sell signal is generated when it crosses below. The 420-day moving average is used to determine the long-term trend to avoid trading short-term pullbacks.

The key logic of the strategy code is:

1. Calculate the 2-day, 3-day, and 420-day moving averages  
2. Judge the golden cross and death cross between the 2-day and 3-day moving averages
3. Use the 420-day moving average to filter signals and avoid false breaks
4. Generate buy and sell signals

The specific principles are:

1. Calculate the 2-day simple moving average n2ma and 3-day simple moving average nma based on the closing prices of the last 3 days
2. Calculate the 420-day weighted moving average rvwma of the closing prices from the last 420 days  
3. A buy signal is generated when n2ma crosses above nma
4. A sell signal is generated when n2ma crosses below nma
5. Use rvwma to filter signals, generating a buy signal only when n2ma is below rvwma and a sell signal only when n2ma is above rvwma

It catches trend reversal opportunities after short-term adjustments by determining turning points with dual moving average crossings and sets parameter filters to avoid mistaken trades. This strategy can effectively capture trend reversal opportunities after short-term adjustments with a relatively high profit factor.

## Advantage Analysis   

The Dual Moving Average Golden Cross Quantitative Strategy has the following advantages:

1. **Simple and reliable**: Uses dual moving average crossings to determine short-term price trends, generating straightforward and clear signals  
2. **High sensitivity**: The 2-day and 3-day moving average parameters are set to be sensitive enough to quickly capture short-term price changes
3. **Noise filtering**: Incorporates price channel indicators to effectively filter out noise and avoid mistaken trades
4. **Strong adaptability**: The theory of dual moving average crossings is adaptable to different products and timeframes, making it easy to implement
5. **Easy to optimize**: Large optimization space by changing moving average parameter combinations and adjusting filter parameters
6. **Real-trading validation**: Dual moving average crossover strategies have been validated in live trading with relatively stable performance

## Risk Analysis  

The Dual Moving Average Golden Cross Quantitative Strategy also has the following risks:  

1. **Pullback risk**: Short-term rebounds may trigger stops
2. **Trend reversal risk**: Sudden events leading to long-term trend reversals may cause losses
3. **Parameter optimization risk**: Improper parameters may worsen strategy performance  
4. **Overoptimization risk**: Excessive parameter optimization may lead to overfitting  
5. **Live trading deviation risk**: Divergence between backtesting and live trading may affect performance

The following methods can be used to reduce risks:

1. Set reasonable stop loss to control single loss
2. Combine fundamentals to avoid trading against the market
3. Select suitable products and periods for optimization
4. Do proper parameter sensitivity testing
5. Add live trading verification

## Optimization Directions   

The Dual Moving Average Golden Cross Quantitative Strategy can also be optimized in the following aspects:

1. **Parameter optimization**: Adjust moving average and channel indicator parameters to select the optimal parameter combination. Genetic algorithms can assist optimization.

2. **Timing selection**: Choose the most suitable moving average parameters based on different product characteristics. For example, set shorter-period moving averages for interest-related products.  

3. **Stop loss strategy optimization**: Set dynamic stops, trailing stops etc. to avoid pullback stops.

4. **Directional trading optimization**: Incorporate trend indicators and adopt trend-following operations to prevent countertrend trading.   

5. **Machine learning combination**: Use LSTM, RNN and other deep learning models to assist in judging signal quality and determining entry timing.

## Conclusion  

The Dual Moving Average Golden Cross Quantitative Strategy determines short-term price trends through the simple principle of moving average crossovers. Setting channel indicators effectively filters false signals. The strategy has straightforward logic and is easy to implement. Flexible parameter adjustments are possible with relatively good performance validated in live trading. It is a recommended quantitative strategy that can be upgraded through parameter optimization, stop loss optimization, machine learning and more to achieve even better performance. The strategy is suitable for algorithmic trading across products like cryptocurrencies and stocks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|420|HullMA|
|v_input_2|3|HullMA cross|
|v_input_3|14|VWMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-24 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//                                                Indicator420 by SeaSide420
strategy("Indicator420 strategy", overlay=true)
q=input(title="HullMA",defval=420)
z=input(title="HullMA cross",defval=3)
a=input(title="VWMA",defval=14)
rvwma=vwma(close,round(a))
rvwma2=vwma(close,round(a*2))
rvwma3=vwma(close,round(a*3))
n2ma=2*wma(close,round(z/2))
nma=wma(close,z)
diff=n2ma-nma
sqn=round(sqrt(z))
n2ma1=2*wma(close[1],round(z/2))
nma1=wma(close[1],z)
diff1=n2ma1-nma1
sqn1=round(sqrt(z))
n2ma2=2*wma(close[2],round(q/2))
nma2=wma(close[2],q)
diff2=n2ma2-nma2
sqn2=round(sqrt(q))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
n3=wma(diff2,sqn)
b=n1>n2?red:lime
c=n1>n2?green:red
d=n3>rvwma3?red:green
e=rvwma2>rvwma3?green:red
f=n1>n2?red:green
//plot(rvwma3, color=e, linewidth=1)
plot(cross(rvwma, rvwma2) ? rvwma : na, style = line,color=e, linewidth = 1)
plot(cross(n1, n2) ? n1 : na, style = line,color=b, linewidth = 3)
plot(cross(n1, n2) ? n1 : na, style = circles,color=c, linewidth = 4)
closelong = n1<n2
if (closelong)
    strategy.close("Long")
closeshort = n1>n2
if (closeshort)
    strategy.close("Short") 
longCondition = n1>n2 and strategy.opentrades<1 and n1<rvwma3
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = n1<n2 and strategy.opentrades<1 and n1>rvwma3
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/436658

> Last Modified

2023-12-26 17:02:29
