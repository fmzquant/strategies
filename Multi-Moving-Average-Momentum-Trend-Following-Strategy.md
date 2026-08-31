
> Name

Multi-Moving-Average-Momentum-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dce0946cc23be168d4.png)


#### Overview
This strategy is a trend following trading system based on multiple moving averages and momentum indicators. It primarily utilizes the dynamic relationships between the 20-day, 50-day, 150-day, and 200-day Simple Moving Averages (SMA), combined with volume and RSI indicators to capture strong uptrends on the daily timeframe and exit positions when trends weaken. The strategy effectively filters false signals and improves trading accuracy through the coordinated use of multiple technical indicators.

#### Strategy Principles
The core logic includes the following key components:
1. Moving Average System: Uses 20/50/150/200-day moving averages to build a trend judgment system, requiring bullish alignment.
2. Momentum Confirmation: Uses RSI indicator and its moving average to judge price momentum, requiring RSI above 55 or RSI SMA above 50 and rising.
3. Volume Verification: Confirms signal validity through comparison of 20-day volume average and recent volume.
4. Trend Persistence Verification: Checks if 50-day MA maintains uptrend for at least 25 days out of 40 trading days.
5. Position Confirmation: Price must remain above 150-day MA for at least 20 trading days.

Buy conditions require:
- More than 4 bullish days in last 10 days with at least 1 high volume day
- RSI indicator meeting momentum conditions
- Moving average system showing bullish alignment and continuous rise
- Price stable above 150-day MA

Sell conditions include:
- Price breaking below 150-day MA
- Consecutive high-volume decline
- 50-day MA crossing below 150-day MA
- Recent bearish candles with increased volume

#### Strategy Advantages
1. Multiple technical indicators cross-validation reduces misjudgment
2. Strict trend persistence requirements filter short-term fluctuations
3. Volume analysis integration improves signal reliability
4. Clear stop-loss and profit-taking conditions control risk effectively
5. Suitable for capturing medium to long-term trends, reducing trading frequency
6. Clear strategy logic, easy to understand and execute

#### Strategy Risks
1. Moving average system has lag, may miss early trend stages
2. Strict entry conditions may miss some trading opportunities
3. May generate frequent false signals in choppy markets
4. Delay in identifying market reversals
5. Requires larger capital scale to withstand drawdowns

Risk Control Suggestions:
- Set reasonable stop-loss positions
- Conservative money management
- Consider adding trend confirmation indicators
- Adjust parameters based on market environment

#### Strategy Optimization Directions
1. Add Adaptive Parameters
- Dynamically adjust MA periods based on market volatility
- Optimize RSI threshold settings

2. Improve Stop-Loss Mechanism
- Add trailing stops
- Set time-based stops

3. Introduce Market Environment Analysis
- Add trend strength indicators
- Consider volatility indicators

4. Optimize Trading Size
- Design dynamic position management
- Adjust based on signal strength

#### Summary
This is a rigorously designed trend following strategy that effectively captures strong trending opportunities through the coordinated use of multiple technical indicators. The strategy's main advantages lie in its comprehensive signal confirmation mechanism and strict risk control system. While there is some lag, through reasonable parameter optimization and risk management, the strategy can maintain stable performance in long-term operation. Investors are advised to pay attention to market environment adaptability, control positions reasonably, and make targeted optimizations based on actual conditions when applying the strategy in live trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Micho's 150 (1D Time Frame Only)", overlay=true)

// Define the length for the SMAs and RSI
sma20Length = 20
sma50Length = 50
sma150Length = 150
sma200Length = 200
volumeMaLength = 20
rsiLength = 14
rsiSmaLength = 14
smaCheckLength = 40  // Check the last month of trading days (~20 days)
requiredRisingDays = 25  // Require SMA to rise in at least 16 of the past 20 days
sma150AboveSma200CheckDays = 1  // Require SMA150 > SMA200 for the last 10 days

// Calculate the SMAs for price
sma20 = ta.sma(close, sma20Length)
sma50 = ta.sma(close, sma50Length)
sma150 = ta.sma(close, sma150Length)
sma200 = ta.sma(close, sma200Length)

// Calculate the 20-period moving average of volume
volumeMA20 = ta.sma(volume, volumeMaLength)

// Calculate the 14-period RSI
rsi = ta.rsi(close, rsiLength)

// Calculate the 14-period SMA of RSI
rsiSMA = ta.sma(rsi, rsiSmaLength)

// Check if most of the last 5 days are buyer days (close > open)
buyerDays = 0
for i = 0 to 9
    if close[i] > open[i]
        buyerDays := buyerDays + 1

// Check if at least 1 day has volume higher than the 20-period volume MA
highVolumeDays = 0
for i = 0 to 9
    if close[i] > open[i] and volume[i] > volumeMA20
        highVolumeDays := highVolumeDays + 1

// Define the new RSI condition
rsiCondition = (rsi >= 55) or (rsiSMA > 50 and rsi > rsi[1])

// Check if the 50-day SMA has been rising on at least 16 of the last 20 trading days
risingDays = 0
for i = 1 to smaCheckLength
    if sma50[i] > sma50[i + 1]
        risingDays := risingDays + 1

// Check if the SMA has risen on at least 16 of the last 20 days
sma50Rising = risingDays >= requiredRisingDays

// Check if the price has been above the SMA150 for the last 20 trading days
priceAboveSma150 = true
for i = 1 to smaCheckLength
    if close[i] < sma150[i]
        priceAboveSma150 := false

// Check if the SMA150 has been above the SMA200 for the last 10 days
sma150AboveSma200 = true
for i = 1 to sma150AboveSma200CheckDays
    if sma150[i] < sma200[i]
        sma150AboveSma200 := false

// Define the conditions for the 150-day and 200-day SMAs being rising
sma150Rising = sma150 > sma150[1]
sma200Rising = sma200 > sma200[1]

// Check if most of the last 5 days are seller days (close < open)
sellerDays = 0
for i = 0 to 9
    if close[i] < open[i]
        sellerDays := sellerDays + 1

// Check if at least 1 day has seller volume higher than the 20-period volume MA
highSellerVolumeDays = 0
for i = 0 to 9
    if close[i] < open[i] and volume[i] > volumeMA20
        highSellerVolumeDays := highSellerVolumeDays + 1

// Check in the last N days the price below 150
priceBelowSma150 = true
for i = 0 to 0
    if close[i] > sma150[i]
        priceBelowSma150 := false

// Restrict the strategy to 1D time frame
if timeframe.isdaily
    // Buy condition:
    // - Most of the last 5 days are buyer days (buyerDays > 2)
    // - At least 1 of those days has high buyer volume (highVolumeDays >= 1)
    // - RSI SMA (14-period) between 45 and 50 with RSI >= 55, or RSI SMA > 50 and RSI rising
    // - 50-day SMA > 150-day SMA and 150-day SMA > 200-day SMA
    // - 50-day SMA has been rising on at least 16 of the last 20 trading days
    // - The price hasn't been below the 150-day SMA in the last 20 days
    // - 150-day SMA has been above the 200-day SMA for the last 10 days
    // - 150-day and 200-day SMAs are rising
    buyCondition = (close > sma150 and buyerDays > 4 and highVolumeDays >= 1 and rsiCondition  and sma50 > sma150 and sma50Rising and sma150Rising and sma200Rising and priceAboveSma150)

    // Sell condition:
    // - Price crossing below SMA 150
    // - Seller volume (current volume > volume MA 20)
    // - 150-day SMA crosses below 200-day SMA
    // - Most of the last 5 days are seller days (sellerDays > 2) and at least 1 day of higher seller volume (highSellerVolumeDays >= 1)
    sellCondition = (priceBelowSma150 and (sma50 < sma150 or (sellerDays >5 and highSellerVolumeDays >= 5)))

    // Execute buy when all conditions are met
    if (buyCondition)
        strategy.entry("Buy", strategy.long)

    // Execute sell when all conditions are met
    if (sellCondition)
        strategy.close("Buy")

```

> Detail

https://www.fmz.com/strategy/471693

> Last Modified

2024-11-12 15:05:09
