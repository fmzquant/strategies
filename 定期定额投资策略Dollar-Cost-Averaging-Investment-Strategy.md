
> Name

定期定额投资策略Dollar-Cost-Averaging-Investment-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18a69f8370ec501e1f9.png)


### Overview

The dollar cost averaging investment strategy is a very simple investment approach, especially suitable for beginning investors. The core idea of this strategy is to invest a fixed amount of money at preset intervals (e.g. annually), regardless of market price fluctuations. This strategy is also known as DCA (dollar cost averaging). For example, one can invest $10,000 in SPY (S&P 500 ETF) every year, no matter the market prices. Assuming favorable macroeconomic conditions, DCA strategies can result in good capital gains over long periods, e.g. 10 years. DCA is the safest strategy for novice investors, and all other strategies should be benchmarked against DCA - if a strategy cannot beat DCA, it is useless.

### Strategy Logic

The core logic of this strategy is very straightforward. The investor only needs to set two input parameters - contribution amount and frequency. The strategy will check the current bar against these intervals (hourly, daily, weekly, monthly) to determine if investment should occur. If yes, it calculates the # of units to buy based on contribution, and opens a long position. 

For example on monthly timeframe, the logic checks if current bar index % frequency == 0. The equity curve shows the cumulative returns from this strategy.

It is important to note this strategy assumes a long holding period of at least 5-10 years. The longer the holding period, the better the returns. The only thing for investors to watch out for are the macroeconomic conditions mentioned earlier. When in doubt, buy ETFs rather than individual stocks or crypto.

### Advantage Analysis

The biggest advantage of dollar cost averaging is its simplicity, which allows any beginning investor to easily implement it without complex quantitative skills or market forecasts. DCA helps investors buy lows and reduce buys at highs, lowering cost basis over time. It also reduces short term market noise, helping to cultivate long term holding habits. DCA is easy to stick to without strategy changes due to market gyrations.

### Risk Analysis

The main risk of DCA is that the asset prices decrease for long periods, leading to losses. This usually happens when the overall economy is depressed, or the competitiveness of the specific asset held falls. Another risk is not holding for long enough periods to realize the long term gains. These risks can be mitigated by selecting quality assets with long term growth potential, and holding for at least 5-10 years.

### Improvement Areas

DCA strategies can be enhanced by: 1) Adjusting the buying frequency, e.g. weekly or biweekly to smooth cost basis; 2) Dynamically changing buy amounts, increasing during market troughs and decreasing during peaks; 3) Buying negatively correlated assets to lower overall volatility; 4) Fundamental stock picking rather than broad index funds.

### Conclusion

Dollar cost averaging strategies excel in their simplicity, making them suitable for any beginning investor. They help smooth into the markets and cultivate long term holding habits. While optimizations can be made around buying intervals, amounts, and targets, the core benefit remains the fixed investing approach. All investment strategies should be benchmarked against DCA's long term returns. By picking quality assets and holding for extended periods, DCA can provide stable long term growth for investors.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10000|Contribution (USD)|
|v_input_2|12|Frequency (Months)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// To simplify matters for newbies, this script only computes DCA on H1, D1, W1 and M1 timeframes
// If you want a script that DCAs per x-bars, let me know in the comments.
// © TsangYouJun

//@version=4
strategy("DCA Strategy v1", overlay=false)

//user inputs
contribution = input(title="Contribution (USD)",type=input.integer,minval=1,maxval=1000000,step=1,defval=10000,confirm=false)
frequency = input(title="Frequency (Months)",type=input.integer,minval=1,maxval=1000000,step=1,defval=12,confirm=false)

//units to buy
units = contribution / close

//when to dca
hourDca = bar_index[0] % (frequency * 28 * 24)
dayDca = bar_index[0] % (frequency * 28)
weekDca = bar_index[0] % (frequency * 4)
monthDca = bar_index[0] % frequency

//when to dca
if(timeframe.period == "60" and hourDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "D" and dayDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "W" and weekDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "M" and monthDca == 0)
    strategy.order("DCA", strategy.long, units)

//plot strategy equity
// plot(strategy.equity - strategy.initial_capital, color=color.blue, linewidth=2, title="Net Profit")
```

> Detail

https://www.fmz.com/strategy/430762

> Last Modified

2023-11-01 16:24:56
