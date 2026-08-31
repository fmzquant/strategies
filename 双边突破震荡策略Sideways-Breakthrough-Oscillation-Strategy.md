
> Name

双边突破震荡策略Sideways-Breakthrough-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15bfed43ea6d525de35.png)

### Overview

The Sideways Breakthrough Oscillation Strategy is a quantitative trading strategy that uses Bollinger Bands and the MACD indicator to determine buy and sell signals. This strategy is mainly suitable for oscillating products such as stock index futures, forex and digital currencies. The main idea of the strategy is to issue buy and sell signals when the price breaks through the upper and lower bands of the Bollinger Bands.

### Strategy Principle   

The Sideways Breakthrough Oscillation Strategy uses Bollinger Bands to judge the range of price fluctuations. Bollinger Bands include the middle band, upper band and lower band. The middle band is the n-day simple moving average, and the upper and lower bands are k times the n-day true range above and below the middle band respectively. When the price breaks through the lower band, it is believed that the market may reverse, a buy signal is issued. When the price breaks through the upper band, it is believed that the market may reverse, a sell signal is issued.

In addition to using Bollinger Bands to determine trading points, this strategy also incorporates the MACD indicator to determine trading signals. The MACD indicator includes the DIF line, DEA line and MACD line. The DIF line is the difference between the 12-day exponential moving average and the 26-day exponential moving average, the DEA line is the 9-day exponential moving average, and the MACD line is the difference between the DIF and DEA lines. A buy signal is generated when the MACD line turns from negative to positive, and a sell signal is generated when it turns from positive to negative.

Combining Bollinger Bands and MACD indicators, the trading signal generation rules for the Sideways Breakthrough Oscillation Strategy are: a buy signal is issued when the price breaks through the lower band of the Bollinger Channel; A sell signal is issued when the price breaks through the upper band of the Bollinger Channel. Close the position when the price breaks through the channel rails again.


### Advantage Analysis  

The Sideways Breakthrough Oscillation Strategy has the following advantages:

1. The strategy is simple, clear and easy to understand and implement, suitable for beginners to learn;
2. Using Bollinger Bands to judge the price fluctuation range, and combining the MACD indicator to filter signals, can effectively identify reversal opportunities;  
3. Bilateral operation can repeatedly capture oscillation opportunities in the market, reduce false positives and increase profitability;
4. The strategy has few parameters and is easy to optimize with stable operations;  
5. The strategy has a certain degree of robustness and performs well in various markets.  

### Risk Analysis   

Although the Sideways Breakthrough Oscillation Strategy has many advantages, there are still some risks in actual trading, which are mainly reflected in the following aspects:

1. Changes in oscillating trends may cause strategy failure. If the price quickly re-enters the channel after breaking through the channel, there is a risk of being trapped;
2. Improper Bollinger Channel parameter settings will also affect strategy performance. If the bandwidth is set too large or too small, it will affect the capture effect of trading points;  
3. Improper MACD indicator parameters may cause signals to be advanced or lagged, thereby affecting the strategy's profit level;  
4. The strategy does not consider risk management factors and there is a risk of enlarged losses.  

To reduce the above risks, we can optimize from the following aspects:  

1. Incorporate trend indicators to avoid signals when prices are only short-term retracements;  
2. Test and optimize the parameters of Bollinger Channels and MACD indicators to select the optimal parameters;
3. Incorporate stop-loss strategies to control single losses;  
4. Increase position management module to control risk.  

### Optimization Direction   

The Sideways Breakthrough Oscillation Strategy also has room for further optimization, which can mainly be done in the following directions:

1. Incorporate more indicators to identify trading signals. For example, add volume judgment, issue signals at points where price and volume are simultaneously amplified; or add RSI indicators to issue signals in overbought and oversold areas;  
2. Increase automatic stop loss mechanism. The use of moving stop loss or percentage stop loss can effectively control single losses;
3. Increase position management mechanism. For example, fixed position management, martingale management, etc., to reasonably allocate the funds for each opening position;
4. Parameter tuning. Through backtesting with more historical data, find the optimal combination of parameters for Bollinger Bands and MACD indicators to improve the strategy's profitability.  
5. Walk forward analysis. Dynamically optimize parameters in real time for more stable strategy performance.  

### Summary  

The Sideways Breakthrough Oscillation Strategy integrates Bollinger Bands and MACD indicators to determine entry and exit timing, and can effectively capture reversal opportunities in oscillating trends by using price breakthroughs on both sides. This strategy is simple, flexible in parameter selection, and performs well across different products. However, there are still some risks to the strategy that require further testing and optimization. We have proposed some optimization ideas. With continuous improvement, we believe the performance of this strategy will get better and better. In general, the Sideways Breakthrough Oscillation Strategy is a recommended quantitative strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|20|length|
|v_input_3|4|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy("Seitwärtsdoppelpenetration", overlay=false)

//Keltner Channel
source = open

useTrueRange = input(true)
length = input(20, minval=1)
mult = input(4.0)

ma = sma(source, length)
range = useTrueRange ? tr : high - low
rangema = sma(range, length)
upper = ma + rangema * mult
lower = ma - rangema * mult

crossUpper = crossover(source, upper)
crossLower = crossunder(source, lower)

//Entry
buyEntry = cross(lower,source)
sellEntry = cross(upper,source)

if (cross(lower,source))
    strategy.entry("buyEntry", strategy.long, comment="buyEntry")

if (cross(source, upper))
    strategy.entry("sellEntry", strategy.short, comment="sellEntry")

buyExit = cross(source, upper)
sellExit = cross(lower,source)

strategy.close("buyEntry", buyExit)
strategy.close("sellEntry", sellExit)

```

> Detail

https://www.fmz.com/strategy/437490

> Last Modified

2024-01-03 11:29:24
