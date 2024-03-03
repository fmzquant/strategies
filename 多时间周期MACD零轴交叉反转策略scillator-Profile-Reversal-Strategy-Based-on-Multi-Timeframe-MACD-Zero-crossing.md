
> Name

多时间周期MACD零轴交叉反转策略scillator-Profile-Reversal-Strategy-Based-on-Multi-Timeframe-MACD-Zero-crossing

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7a422427830a290110.png)
[trans]
## 概述
多时间周期MACD零轴交叉反转策略通过计算不同周期的MACD指标,识别价格可能反转的信号,采用趋势跟踪止损方式,追求较高的资金利用效率。

## 策略原理  
该策略同时计算3周期和10周期的SMA移动平均线,构建快慢线,再计算MACD指标和信号线。当快线和信号线发生向上或向下的零轴交叉时,说明价格达到临界点,有可能出现反转。此外,该策略还结合了成交量的多空态势判断、RSI指标等,来识别反转信号的可靠性。当反转信号达到一定可靠性要求时,做多或做空。

具体来说,策略通过以下方法判断价格反转:
1. MACD零轴交叉,说明价格达到临界点  
2. 成交量的买卖压力判断多空态势  
3. RSI指标看涨跌势力,结合MACD斜率变化,判断反转信号强度   
4. 快线和信号线反向交叉,形成反转信号

当反转信号可靠性较高时,策略采用趋势跟踪止损方式入场,追求较高收益。

## 优势分析
该策略具有以下几个优势:  

1. 多指标判断,使反转信号更加可靠  
2. 采用MACD零轴交叉判断反转点位,精准度较高  
3. RSI指标和成交量辅助判断,可靠性高  
4. 趋势跟踪止损方式,追求较高资金利用效率  

## 风险分析  
该策略也存在一些风险:  

1. MACD指标发出假信号的概率较大,容易被套住  
2. 多空交替过程中,止损被击穿概率较大  
3. 参数设置不当可能导致过于频繁交易,增加交易成本和滑点损失  

可以通过以下方式减少风险:
1. 适当放宽止损幅度,避免被套  
2. 优化参数,降低交易频率  
3. 只在关键支撑阻力位附近考虑入场  

## 优化方向  
该策略还可进一步优化的方向包括:  

1. 增加机器学习算法,辅助判断反转信号可靠性  
2. 增加情绪指标判断多空心理面  
3. 结合关键支撑阻力位,提高入场精确度  
4. 优化止损方式,进一步提高资金利用效率  
5. 测试最优参数组合,降低交易频率  

## 总结  
多时间周期MACD零轴交叉反转策略,综合考量了价格、成交量和波动指标等多个维度的信息,通过多指标判断确定反转入场时机,在盈利充分后及时止损,能够在反转行情中获得较好收益。该策略有望通过机器学习和关键位优化等方式进一步改进,以减少交易频率和风险,提高盈利空间。

||

## Overview  
The 3 10.0 Oscillator Profile Reversal strategy identifies potential price reversals by calculating MACD indicators across different timeframes. It adopts a trend-following stop loss approach to pursue higher capital efficiency.  

## Strategy Logic
The strategy calculates SMA moving averages of 3 and 10 periods to construct fast and slow lines and the MACD indicator and signal line. When the fast line and signal line cross the zero line upward or downward, it indicates the price has reached a critical point and a reversal may occur. In addition, it also incorporates volume pressure judgment, RSI index etc. to identify reliability of reversal signals. It goes long or short when reversal signals meet certain reliability requirements.  

Specifically, the strategy judges price reversals through:  
1. MACD zero-crossing indicates price reaches critical point
2. Volume pressure judges bullish or bearish sentiment  
3. RSI index with MACD slope change determines strength of reversal signals  
4. Fast line and signal line crossing in reverse direction forms reversal signal  

When reversal signal reliability is high, the strategy adopts trend-following stop loss to pursue higher profit.  

## Advantage Analysis  
The strategy has the following advantages:   

1. Multiple indicators make reversal signals more reliable
2. MACD zero-crossing accurately locates reversal points  
3. RSI and volume assist judgment to improve reliability   
4. Trend-following stop loss improves capital efficiency   

## Risk Analysis
There are also some risks:   

1. High probability of MACD false signals and being trapped  
2. High chance of stop loss being hit during alternating trends   
3. Improper parameter setting may increase trading frequency and cost  

Risks can be reduced through:  
1. Allow wider stop loss to avoid being trapped  
2. Optimize parameters to lower trading frequency  
3. Only consider entry near key support/resistance levels  

## Optimization Directions
The strategy can be further optimized through:   

1. Add machine learning algorithms to assist reversal signal reliability  
2. Add sentiment indices to determine bull/bear mentality  
3. Combine key support/resistance levels to improve entry precision   
4. Optimize stop loss for higher capital efficiency   
5. Test optimal parameter combinations to lower trading frequency   

## Conclusion
The multi timeframe MACD zero-crossing reversal strategy comprehensively considers price, volume and volatility indicators to determine entry timing through multi-indicator evaluation. It sets timely stop loss upon sufficient profitability. It can achieve good returns during reversal markets. Further improvements on machine learning and key level integration may lower risks and trading frequencies while improving profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.26|Signal Bias|
|v_input_2|0.8|MACD Bias|
|v_input_3|3|Short LookBack|
|v_input_4|10|Long LookBack|
|v_input_5|0.8|Take Profit|
|v_input_6|0.75|Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("3 10.0 Oscillator Profile Flagging", shorttitle="3 10.0 Oscillator Profile Flagging", overlay=false)

signalBiasValue = input(title="Signal Bias", defval=0.26)
macdBiasValue = input(title="MACD Bias", defval=0.8)
shortLookBack = input( title="Short LookBack", defval=3)
longLookBack = input( title="Long LookBack", defval=10.0)
takeProfit = input( title="Take Profit", defval=0.8)
stopLoss = input( title="Stop Loss", defval=0.75)

fast_ma = ta.sma(close, 3)
slow_ma = ta.sma(close, 10)
macd = fast_ma - slow_ma
signal = ta.sma(macd, 16)
hline(0, "Zero Line", color = color.black)

buyVolume = volume*((close-low)/(high-low))
sellVolume = volume*((high-close)/(high-low))
buyVolSlope = buyVolume - buyVolume[1]
sellVolSlope = sellVolume - sellVolume[1]
signalSlope = ( signal - signal[1] )
macdSlope = ( macd - macd[1] )
plot(macd, color=color.blue, title="Total Volume")
plot(signal, color=color.orange, title="Total Volume")
intrabarRange = high - low
rsi = ta.rsi(close, 14)
rsiSlope = rsi - rsi[1]

getRSISlopeChange(lookBack) =>
    j = 0
    for i = 0 to lookBack
        if ( rsi[i] - rsi[ i + 1 ] ) > -5
            j += 1
    j

getBuyerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if buyVolume[i] > sellVolume[i]
            j += 1
    j

getSellerVolBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if sellVolume[i] > buyVolume[i]
            j += 1
    j

getVolBias(lookBack) =>
    float b = 0.0
    float s = 0.0
    for i = 1 to lookBack
        b += buyVolume[i]
        s += sellVolume[i]
    b > s

getSignalBuyerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] > signalBiasValue
            j += 1
    j

getSignalSellerBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < ( 0.0 - signalBiasValue )
            j += 1
    j

getSignalNoBias(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if signal[i] < signalBiasValue and signal[i] > ( 0.0 - signalBiasValue )
            j += 1
    j

getPriceRising(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] > close[i + 1]
            j += 1
    j


getPriceFalling(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if close[i] < close[i + 1] 
            j += 1
    j

getRangeNarrowing(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] < intrabarRange[i + 1] 
            j+= 1
    j

getRangeBroadening(lookBack) =>
    j = 0
    for i = 1 to lookBack
        if intrabarRange[i] > intrabarRange[i + 1] 
            j+= 1
    j

bool isNegativeSignalReversal = signalSlope < 0.0 and signalSlope[1] > 0.0
bool isNegativeMacdReversal = macdSlope < 0.0 and macdSlope[1] > 0.0

bool isPositiveSignalReversal = signalSlope > 0.0 and signalSlope[1] < 0.0
bool isPositiveMacdReversal = macdSlope > 0.0 and macdSlope[1] < 0.0

bool hasBearInversion = signalSlope > 0.0 and macdSlope < 0.0
bool hasBullInversion = signalSlope < 0.0 and macdSlope > 0.0

bool hasSignalBias = math.abs(signal) >= signalBiasValue
bool hasNoSignalBias = signal < signalBiasValue and signal > ( 0.0 - signalBiasValue )

bool hasSignalBuyerBias = hasSignalBias and signal > 0.0
bool hasSignalSellerBias = hasSignalBias and signal < 0.0

bool hasPositiveMACDBias = macd > macdBiasValue
bool hasNegativeMACDBias = macd < ( 0.0 - macdBiasValue )

bool hasBullAntiPattern = ta.crossunder(macd, signal)
bool hasBearAntiPattern = ta.crossover(macd, signal)

bool hasSignificantBuyerVolBias = buyVolume > ( sellVolume * 1.5 )
bool hasSignificantSellerVolBias = sellVolume > ( buyVolume * 1.5 )

// 393.60 Profit 52.26% 15m
if ( hasBullInversion and rsiSlope > 1.5 and volume > 300000.0 )
    strategy.entry("15C1", strategy.long, qty=10.0)
strategy.exit("TPS", "15C1", limit=strategy.position_avg_price + takeProfit, stop=strategy.position_avg_price - stopLoss)

// 356.10 Profit 51,45% 15m
if ( getVolBias(shortLookBack) == false and rsiSlope > 3.0 and signalSlope > 0)
    strategy.entry("15C2", strategy.long, qty=10.0)
strategy.exit("TPS", "15C2", limit=strategy.position_avg_price + takeProfit, stop=strategy.position_avg_price - stopLoss)

// 124 Profit 52% 15m
if ( rsiSlope < -11.25 and macdSlope < 0.0 and signalSlope < 0.0)
    strategy.entry("15P1", strategy.short, qty=10.0)
strategy.exit("TPS", "15P1", limit=strategy.position_avg_price - takeProfit, stop=strategy.position_avg_price + stopLoss)

// 455.40 Profit 49% 15m
if ( math.abs(math.abs(macd) - math.abs(signal)) < .1 and buyVolume > sellVolume and hasBullInversion)
    strategy.entry("15P2", strategy.short, qty=10.0)
strategy.exit("TPS", "15P2", limit=strategy.position_avg_price - takeProfit, stop=strategy.position_avg_price + stopLoss)
```

> Detail

https://www.fmz.com/strategy/442002

> Last Modified

2024-02-18 15:27:21
