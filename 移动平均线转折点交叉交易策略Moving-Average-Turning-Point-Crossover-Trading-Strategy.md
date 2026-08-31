
> Name

移动平均线转折点交叉交易策略Moving-Average-Turning-Point-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9103cf5b2adf212866.png)

## Overview  

The Moving Average Turning Point Crossover Trading Strategy is a classic technical indicator strategy. The core idea of this strategy is to generate buy and sell signals by combining moving averages of different periods and further optimize trade exits using moving average turning points. This strategy is suitable for various timeframes and products and can achieve stable returns.

## Strategy Principle

The strategy mainly uses two moving averages, one with a shorter period as the fast line and the other with a longer period as the slow line. When the fast line breaks through the slow line upward, a buy signal is generated. When the fast line breaks through the slow line downward, a sell signal is generated. This is the trading signal generation mechanism of the classic moving average crossover strategy.

Furthermore, the strategy exits trades using the turning points of the moving averages. When the fast line turns from rising to falling, long positions will exit. When the fast line turns from falling to rising, short positions will exit. Moving average turning points can capture short-term market reversal points, which helps the strategy to cut losses or take profits in time, thereby improving overall return.  

## Advantage Analysis  

The Moving Average Turning Point Crossover Trading Strategy has the following advantages:

1. Simple to implement. The strategy only uses two indicators: Moving Average and ROC indicator. The code is not complicated.  

2. Strong ability to withstand consecutive losses. The inherent lag and price smoothing characteristics of moving averages can filter out some noise and avoid generating too many invalid trades in ranging trends.

3. Can effectively control unilateral losses. Timely stop losses using moving average turning points can reduce large unilateral losses.  

4. Wide applicability. The strategy principle is simple and can be applied to different products and trading timeframes such as daily and hourly bars. Large parameter optimization space.

5. Stable returns. Compared with strategies chasing market hotspots, this strategy focuses more on risk control instead of pursuing super high returns, but it can obtain stable positive returns.

## Risk Analysis   

The Moving Average Turning Point Crossover Trading Strategy also has some risks, mainly in the following aspects:

1. Lagging of moving averages. When fast market comes, the crossover signals of moving averages will lag, possibly missing the best entry point.  

2. Long empty holding periods. This strategy has timely exits but slower entry signals. This can lead to excessive empty holding periods. Profit opportunities are missed during empty holding periods.

3. Difficult parameter optimization. The choice of parameters like moving average length and ROC cycle will have great impact on the strategy's performance. But parameter optimization requires a lot of historical data for backtesting, posing difficulties in optimization.  

4. Poor performance in high volatility trends. In high volatility ranging trends, moving averages will generate multiple invalid crossovers, impairing the strategy's performance.  

## Optimization Directions  

The trading strategy can be further optimized in the following aspects:

1. Incorporate trend filtering indicators. Add indicators like ADX and ATR to judge trend status. Disable the strategy when there is no clear trend to avoid useless trades.

2. Combine multiple timeframes. Identify main trend direction on higher timeframes to avoid trading against main trend.  

3. Adaptive parameter optimization. Enable parameters like moving average length to adjust adaptively based on real-time market volatility to improve parameter robustness.  

4. Introducing pattern recognition. Identify candlestick patterns at MA crossover points to filter out false signals.

## Summary  

Overall, the Moving Average Turning Point Crossover Trading Strategy balances risk and returns. It has advantages like ease of implementation, resistance to consecutive losses, and stable returns. It also has disadvantages like the lagging issue of MAs and excessive empty holding periods. By optimizing parameters, incorporating trend judgment, pattern recognition etc, the strategy's performance can be further improved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|25|1st MA Length|
|v_input_3|0|1st MA Type: SMA|EMA|
|v_input_4|50|2nd MA Length|
|v_input_5|0|2nd MA Type: SMA|EMA|
|v_input_6|true|Lookback 1|
|v_input_7|2|Minimum slope magnitude * 100|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//study(title="MA Crossover Strategy", overlay = true)
strategy("MA Crossover Strategy with MA Turning Point Exits", overlay=true)
src = input(close, title="Source")

price = request.security(syminfo.tickerid, timeframe.period, src)
ma1 = input(25, title="1st MA Length")
type1 = input("SMA", "1st MA Type", options=["SMA", "EMA"])

ma2 = input(50, title="2nd MA Length")
type2 = input("SMA", "2nd MA Type", options=["SMA", "EMA"])

price1 = if (type1 == "SMA")
    sma(price, ma1)
else
    ema(price, ma1)
    
price2 = if (type2 == "SMA")
    sma(price, ma2)
else
    ema(price, ma2)


//plot(series=price, style=line,  title="Price", color=black, linewidth=1, transp=0)
plot(series=price1, style=line,  title="1st MA", color=blue, linewidth=2, transp=0)
plot(series=price2, style=line, title="2nd MA", color=green, linewidth=2, transp=0)


longCondition = crossover(price1, price2)
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = crossunder(price1, price2)
if (shortCondition)
    strategy.entry("Short", strategy.short)

lookback1 = input(1, "Lookback 1")
roc1 = roc(price1, lookback1)

ma1up = false
ma1down = false
ma2up = false
ma2down = false

ma1up := nz(ma1up[1])
ma1down := nz(ma1down[1])
ma2up := nz(ma2up[1])
ma2down := nz(ma2down[1])

trendStrength1 = input(2, title="Minimum slope magnitude * 100", type=float) * 0.01

if crossover(roc1, trendStrength1)
    ma1up := true
    ma1down := false
    
if crossunder(roc1, -trendStrength1) 
    ma1up := false
    ma1down := true

shortexitCondition = ma1up and ma1down[1]
if (shortexitCondition)
    strategy.close("Short")

longexitCondition = ma1down and ma1up[1]
if (longexitCondition)
    strategy.close("Long")


```

> Detail

https://www.fmz.com/strategy/440310

> Last Modified

2024-01-29 11:15:42
