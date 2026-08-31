
> Name

Lunar-Phase-Based-Bitcoin-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b7d266631abad693bd.png)


## Overview  

This strategy uses the lunar phase cycle as trading signals, combined with RSI, MACD, OBV and other indicators to identify trading opportunities for cryptocurrencies like Bitcoin. The key advantage of this strategy is utilizing the lunar phase, an external factor, as the trading trigger, which is different from most strategies solely relying on technical indicators, thus can avoid market manipulation to some extent.  

## Strategy Logic  

The core logic of this strategy is to determine long or short opportunities based on different stages of the lunar phase cycle. The lunar phase is calculated as:  

Lunar phase cycle length = 29.5305882 days
Given a known full moon time, the number of days from that full moon to the current time can be calculated  
Lunar age = Days since known full moon % Lunar phase cycle length 
Lunar phase value = (1 + cos(Lunar age / Lunar phase cycle length * 2 * π)) / 2

The lunar phase value fluctuates between 0 to 1. The larger the value means closer to the full moon, while the smaller value means closer to the new moon.

The strategy judges long or short opportunities based on lunar phase thresholds. If lunar phase value is greater than the long threshold (default 0.51), there is chance to go long. If the lunar phase value is less than the short threshold (default 0.49), there is chance to go short.

In addition, the strategy also combines indicators like trading volume, RSI and MACD to avoid trading signals during unfavorable conditions. It only opens positions when volume surges, RSI and MACD signals align.  

## Advantage Analysis 

The main advantages of this strategy:

1. Utilize unique lunar phase trading signal, avoid market manipulation to some extent  
2. Combine indicators to determine market condition, avoid trading in unfavorable environments
3. Use ATR to calculate reasonable position size, effectively control maximum loss per trade
4. Set drawdown stop loss to prevent huge loss
5. Judge fund flow direction with OBV, avoid trading against the trend 
6. Set trailing stop loss to lock in profits   

In summary, this strategy makes full use of the unique advantages of lunar phases, and combines multiple technical indicators to identify high probability trading chances, while leverages risk control mechanisms to effectively define trading risks.  

## Risk Analysis   

The main risks of this strategy includes:   

1. Lunar phase and market moves may occasionally fail  
2. Improper drawdown stop loss may stop the strategy prematurely
3. Probability of false signals from MACD, RSI  
4. Improper trailing stop loss may cause strategy to miss larger profits  

To control these risks, the following measures can be taken:  

1. Adjust lunar phase thresholds to ensure valid lunar signals  
2. Test multiple drawdown stop loss parameters and select optimal 
3. Fine tune MACD and RSI parameters to efficiently generate signals
4. Test multiple sets of trailing stop loss parameters for maximum profits   

Through parameter optimization and combined indicators, trading risks can be mitigated to a large extent.   

## Optimization Directions   

There is still room for further optimization of this strategy:

1. Test different lunar parameters to find optimal thresholds  
2. Try combining more indicators for ensemble trading and improve efficiency
3. Optimize stop loss mechanisms parameters to balance risks and returns  
4. Expand to more trading assets to test generalization ability  

## Conclusion  

This strategy realizes efficient Bitcoin trading through unique lunar phase trading signals, combined with mainstream technical indicators. Compared to single indicator strategies, this strategy can better hedge against market manipulation risks and has unique advantages. By leveraging stop loss to prevent risks and parameter optimization, steady and good returns can be obtained stably. There is still large room for improving this strategy and it has promising application prospects.   



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2023|Start year|
|v_input_2|2023|End year|
|v_input_3|0.51|Long Phase Threshold|
|v_input_4|0.49|Short Phase Threshold|
|v_input_5|0.05|Risk Per Trade (as a % of Equity)|
|v_input_6|0.01|Stop Loss Percentage|
|v_input_7|21|ATR Length for Volatility|
|v_input_8|0.1|Trailing Stop Percentage|
|v_input_9|0.1|Maximum Drawdown Percentage|
|v_input_10|7|Volume MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-08 00:00:00
end: 2024-01-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Lunar Phase Strategy by Symphoenix", overlay=true)

// Input parameters
start_year = input(2023, title="Start year")
end_year = input(2023, title="End year")
longPhaseThreshold = input(0.51, title="Long Phase Threshold")
shortPhaseThreshold = input(0.49, title="Short Phase Threshold")
riskPerTrade = input(0.05, title="Risk Per Trade (as a % of Equity)")
stopLossPerc = input(0.01, title="Stop Loss Percentage")
atrLength = input(21, title="ATR Length for Volatility")
trailPerc = input(0.1, title="Trailing Stop Percentage")
maxDrawdownPerc = input(0.1, title="Maximum Drawdown Percentage")
volumeLength = input(7, title="Volume MA Length")

// Constants for lunar phase calculation and ATR
atr = ta.atr(atrLength)
volMA = ta.sma(volume, volumeLength) // Volume moving average

// Improved Lunar Phase Calculation
calculateLunarPhase() =>
    moonCycleLength = 29.5305882
    daysSinceKnownFullMoon = (time - timestamp("2019-12-12T05:12:00")) / (24 * 60 * 60 * 1000)
    lunarAge = daysSinceKnownFullMoon % moonCycleLength
    phase = ((1 + math.cos(lunarAge / moonCycleLength * 2 * math.pi)) / 2)
    phase

lunarPhase = calculateLunarPhase()

// Advanced Volume Analysis
priceChange = ta.change(close)
obv = ta.cum(priceChange > 0 ? volume : priceChange < 0 ? -volume : 0)

// Additional Technical Indicators
rsi = ta.rsi(close, 14)
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Calculate Position Size based on Volatility and Account Equity
calculatePositionSize() =>
    equity = strategy.equity
    riskAmount = equity * riskPerTrade
    positionSize = riskAmount / atr
    if positionSize > 1000000000000
        positionSize := 1000000000000
    positionSize

positionSize = calculatePositionSize()

// Maximum Drawdown Tracking
var float maxPortfolioValue = na
maxPortfolioValue := math.max(maxPortfolioValue, strategy.equity)
drawdown = (maxPortfolioValue - strategy.equity) / maxPortfolioValue

// Check for maximum drawdown
if drawdown > maxDrawdownPerc
    strategy.close_all()
    strategy.cancel_all()

// Volume Analysis
isVolumeConfirmed = volume > volMA

// Date Check for Backtesting Period
isWithinBacktestPeriod = year >= start_year and year <= end_year

// Entry and Exit Conditions
// Adjusted Entry and Exit Conditions
longCondition = lunarPhase > longPhaseThreshold and lunarPhase < 0.999 and isVolumeConfirmed and obv > obv[1] and rsi < 70 and macdLine > signalLine and isWithinBacktestPeriod
shortCondition = lunarPhase < shortPhaseThreshold and lunarPhase > 0.001 and isVolumeConfirmed and obv < obv[1] and rsi > 30 and macdLine < signalLine and isWithinBacktestPeriod

if longCondition
    if strategy.position_size < 0
        strategy.close_all()
    if strategy.position_size < positionSize
        strategy.entry("Long", strategy.long, qty=positionSize)
        strategy.exit("Exit Long", "Long", trail_offset=atr * trailPerc, trail_points=atr)

if shortCondition
    if strategy.position_size > 0
        strategy.close_all()
    if strategy.position_size > -positionSize
        strategy.entry("Short", strategy.short, qty=positionSize)
        strategy.exit("Exit Short", "Short", trail_offset=atr * trailPerc, trail_points=atr)

// Implementing Stop-Loss Logic
longStopLoss = strategy.position_avg_price * (1 - stopLossPerc)
shortStopLoss = strategy.position_avg_price * (1 + stopLossPerc)

if strategy.position_size > 0 and close < longStopLoss
    strategy.close("Long")

if strategy.position_size < 0 and close > shortStopLoss
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/438784

> Last Modified

2024-01-15 12:31:06
