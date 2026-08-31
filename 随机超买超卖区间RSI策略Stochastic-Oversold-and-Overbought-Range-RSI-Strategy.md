
> Name

随机超买超卖区间RSI策略Stochastic-Oversold-and-Overbought-Range-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f291988659f8204639.png)


### Overview  

The Stochastic Oversold and Overbought Range RSI strategy dynamically adjusts the overbought and oversold thresholds of RSI to capture market opportunities more flexibly. This strategy uses the Relative Strength Index (RSI) as the main trading indicator and sets multiple random overbought and oversold parameters. It generates trading signals when the RSI line crosses the random threshold ranges.

### Strategy Logic

The core logic of this strategy is to use the RSI indicator to determine if the stock price is overbought or oversold. RSI compares the average value of closing up prices and closing down prices over a period to judge the current price trend. The Stochastic RSI Strategy does not use fixed overbought and oversold parameters. Instead, it sets multiple random threshold ranges and generates trading signals when the RSI line crosses these random ranges.

For example, a typical RSI strategy may use 30 as the threshold and go long when RSI falls below 30 and close position when RSI rises above 70. However, this Stochastic RSI Strategy sets multiple random values between 20 and 30 as threshold ranges. This enables more flexible trading strategies to open positions at more opportunity points. 

Specifically, the main logic of this strategy is:  

1. Set RSI parameter length, e.g. 6-day RSI
2. Set random overbought and oversold ranges 
3. Go long when RSI falls below the random oversold range
4. Close position when RSI rises above the random overbought range

### Advantages

Compared with traditional RSI strategies, this Stochastic Oversold and Overbought Range RSI Strategy has the following main advantages:

1. The random threshold setting is more flexible and can open positions at more opportunity points. The fixed thresholds only have two points, while this strategy sets multiple random ranges to capture more trading opportunities.

2. The random range setting can better reflect the cyclicality of the market. Reasonable threshold ranges may differ across market cycles. The random setting can adapt to different market conditions.

3. The combination of multiple random ranges forms a relatively complete trading system. A single trading signal is prone to failure, while the multiple trading logic formed by multiple ranges in this strategy can make the strategy more stable and reliable.

4. The RSI indicator itself has high stability. As a trending indicator, RSI can clearly determine price trends. Compared with price itself, RSI signals have smaller probability of false positives. 

5. The strategy is simple to implement and easy to backtest. It only involves basic RSI calculation without complex formulas, making it very easy to implement and test. This also makes the strategy easy to optimize and improve.

### Risks

Although the Stochastic RSI Strategy has some advantages, there are also major risks:   

1. Like any other indicators, RSI cannot perfectly predict market movements. RSI is calculated from historical data and does not have definitive predictive power over future prices.

2. There is still the risk of curve fitting with random range selection. We need to prevent the strategy from just fitting the historical market moves but fail to adapt to future market conditions.

3. The multiple trading logic may issue conflicting signals, e.g. a close position signal after the long entry signal. Careful testing is needed to find optimal parameters.  

4. The optimal range combination needs to be carefully identified. The density and direction of the ranges need constant adjustments and optimizations.

5. RSI strategies suit better for medium- to long-term trend trading. In the short run, RSI signals may lag in time. The trading frequency needs to be controlled to reduce reversal risks.

The main risk management approach is to adopt strict backtesting over long time periods and various market conditions to ensure stability and profitability. At the same time, position sizing needs to be controlled with sound risk management.

### Enhancements

For this Stochastic RSI Strategy, the main optimization directions include:  

1. Find the optimal RSI parameter length by testing 5-day, 10-day, 20-day etc.

2. Test more random ranges to find the optimal range distribution, ensuring sufficient coverage while avoiding excessive density.  

3. Incorporate profit taking or stop loss mechanisms to control single trade risks and ensure sustainable profitability.

4. Incorporate other auxiliary indicators to build more comprehensive multifactor models, e.g. adding moving averages as filters to improve signal quality.

5. Optimize and reduce trading frequency to suit better medium- to long-term holding, avoiding excessive trading that may compromise stability.

6. Optimize parameters separately for different products to adapt the strategy to more market environments. 

7. Adopt more advanced machine learning methods to dynamically optimize parameters so that key parameters can be updated according to real-time market changes.

These optimization measures help reduce curve fitting risks, uncover the inherent Alpha of the strategy, and achieve better live trading performance.

### Conclusion  

The Stochastic Oversold and Overbought Range RSI Strategy realizes richer trading logic than traditional RSI strategies by flexibly setting the buy and sell ranges of the key RSI indicator. This approach enables the indicator signals to better capture the cyclicality and short-term fluctuations of the market. Meanwhile, the introduction of random range parameters also provides greater room for strategy optimization, allowing continuous improvement of live trading performance. In summary, it is an easy-to-use yet powerful quantitative strategy paradigm worth live testing and further research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|6|RSI Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("imrich", shorttitle="imrich", overlay=true)


RSIlength = input(6,title="RSI Period Length") 
RSIoverSold1 = 1
RSIoverSold2 = 2
RSIoverSold3 = 3
RSIoverSold4 = 4
RSIoverSold5 = 5
RSIoverSold6 = 6
RSIoverSold7 = 7
RSIoverSold8 = 8
RSIoverSold9 = 9
RSIoverSold10 = 10
RSIoverSold11 = 11
RSIoverSold12 = 12
RSIoverSold13 = 13
RSIoverSold14 = 14
RSIoverSold15 = 15
RSIoverSold16 = 16
RSIoverSold17 = 17
RSIoverSold18 = 18
RSIoverSold19 = 19
RSIoverSold20 = 20
RSIoverSold21 = 21
RSIoverSold22 = 22
RSIoverSold23 = 23
RSIoverSold24 = 24
RSIoverSold25 = 25
RSIoverSold26 = 26
RSIoverSold27 = 27
RSIoverSold28 = 28
RSIoverSold29 = 29
RSIoverSold30 = 30
RSIoverSold31 = 31
RSIoverSold32 = 32

RSIoverBought1 = 70
RSIoverBought2 = 72
RSIoverBought3 = 73
RSIoverBought4 = 74
RSIoverBought5 = 75
RSIoverBought6 = 76
RSIoverBought7 = 77
RSIoverBought8 = 78
RSIoverBought9 = 79
RSIoverBought10 = 80
RSIoverBought11 = 81
RSIoverBought12 = 82
RSIoverBought13 = 83
RSIoverBought14 = 84
RSIoverBought15 = 85
RSIoverBought16 = 86
RSIoverBought17 = 87
RSIoverBought18 = 88
RSIoverBought19 = 89
RSIoverBought20 = 90
RSIoverBought21 = 91
RSIoverBought22 = 92
RSIoverBought23 = 93
RSIoverBought24 = 94
RSIoverBought25 = 95
RSIoverBought26 = 96
RSIoverBought27 = 97
RSIoverBought28 = 98
RSIoverBought29 = 99
RSIoverBought0 = 100

price = close
vrsi = rsi(price, RSIlength)





long = (crossover(vrsi, RSIoverSold5)  or crossover(vrsi, RSIoverSold10) or crossover(vrsi, RSIoverSold15) or crossover(vrsi, RSIoverSold20) or crossover(vrsi, RSIoverSold25) or crossover(vrsi, RSIoverSold30) or crossover(vrsi, RSIoverSold7) or crossover(vrsi, RSIoverSold8) or crossover(vrsi, RSIoverSold9))
close_long = (crossunder(vrsi, RSIoverBought1) or crossunder(vrsi, RSIoverBought5) or crossunder(vrsi, RSIoverBought10) or crossunder(vrsi, RSIoverBought15) or crossunder(vrsi, RSIoverBought20) or crossunder(vrsi, RSIoverBought25) or crossunder(vrsi, RSIoverBought29))

if (not na(vrsi))

    if long
        strategy.entry("RSI_BB", strategy.long, comment="RSI_BB")
    else
        strategy.cancel(id="RSI_BB")
        
    if close_long
        strategy.close("RSI_BB")


```

> Detail

https://www.fmz.com/strategy/434968

> Last Modified

2023-12-11 13:19:08
