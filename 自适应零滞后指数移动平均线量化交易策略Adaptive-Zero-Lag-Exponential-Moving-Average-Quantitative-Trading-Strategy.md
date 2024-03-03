
> Name

自适应零滞后指数移动平均线量化交易策略Adaptive-Zero-Lag-Exponential-Moving-Average-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1084b606fda3922a695.png)
[trans]
## 概述

自适应零滞后指数移动平均线量化交易策略(Adaptive Zero Lag Exponential Moving Average Quantitative Trading Strategy)是一个基于Ehlers的零滞后指数移动平均线(Zero Lag Exponential Moving Average)思想开发的量化交易策略。该策略使用了指数移动平均线作为基线指标,并加入了即时频率测量(Instantaneous Frequency Measurement)的自适应方法来动态优化指数移动平均线的周期参数。

## 策略原理

该策略的核心思想来源于John Ehlers的零滞后滤波器理论。指数移动平均线虽然是一个广为人知的技术指标,但其天生就有滞后性的问题。Ehlers通过在指数移动平均线的计算公式中加入一个误差校正因子,可以有效消除滞后现象,使得零滞后指数移动平均线能够更加灵敏地跟踪价格变动。

在自适应零滞后EMA策略中,我们利用即时频率测量的方法自适应优化零滞后指数移动平均线的周期参数。即时频率测量分为余弦法和正交法两种,可以测量出价格序列变化的主导周期。我们实时跟踪这两个测量方法计算出的最佳周期,动态设定零滞后指数移动平均线的周期参数,使其更加符合当前市场环境。

当快线(零滞后指数移动平均线)上穿慢线(普通指数移动平均线)时做多,下穿时做空,这样形成一个类似于移动平均线交叉的交易策略信号。

## 策略优势

自适应零滞后EMA策略结合了零滞后滤波器和自适应周期优化的方法,具有如下优势:

1. 消除滞后,使信号更加灵敏可靠
2. 自适应周期参数,适应更广的市场环境
3. 策略参数较少,容易测试和优化
4. 可配置固定止损止盈点,风险容易控制

## 策略风险

自适应零滞后EMA策略也存在一定的风险,主要体现在:  

1. 在特定市场环境下,自适应优化的周期参数可能失效
2. 固定的止损止盈点设置不当可能导致过度亏损或失利
3. 参数优化测试不足可能导致实盘效果不佳

为控制这些风险,我们需要充分测试不同市场环境下的参数设置,适当调整止损止盈点,并在回测中尽量模拟实盘环境进行充分验证。

## 策略优化方向 

自适应零滞后EMA策略还有广阔的优化空间,主要方向包括:

1. 尝试不同的自适应周期测量方法,如波动率自适应MA等
2. 加入附加过滤条件,如交易量,移动平均线配对等
3. 优化止损止盈策略,如 trailing stop, Chandelier Exit 等
4. 动态调整仓位规模,配合风险管理
5. 多个时间周期确认,提高信号质量

通过这些优化手段,有望进一步提升策略的胜率、盈利率、风险调整指标等。

## 总结

自适应零滞后EMA策略成功结合零滞后滤波器和动态周期优化的思想,是一种参数较少、易于操作和优化的量化交易策略。它具有响应灵敏、自适应性强的特点,在趋势型市场中表现较好。配合适当的止损和仓位管理手段,其稳定性和盈利能力都可获得提升。该策略仍有较大的优化空间,值得进一步研究。

||

## Overview

The Adaptive Zero Lag Exponential Moving Average Quantitative Trading Strategy is a quantitative trading strategy developed based on John Ehlers's idea of Zero Lag Exponential Moving Average (ZLEMA). This strategy uses the exponential moving average as a baseline indicator and incorporates an adaptive method of Instantaneous Frequency Measurement (IFM) to dynamically optimize the period parameter of the exponential moving average.

## Strategy Logic

The core idea of this strategy originates from John Ehlers's theory of zero lag filters. Although the exponential moving average is a widely known technical indicator, it inherently has the problem of lagging. Ehlers introduces an error correction factor in the calculation formula of the exponential moving average to effectively eliminate the lagging phenomenon, making the Zero Lag EMA more sensitive in tracking price changes.

In the Adaptive Zero Lag EMA strategy, we utilize the instantaneous frequency measurement methods to adaptively optimize the period parameter of the ZLEMA. The IFM consists of two techniques - the Cosine method and the Inphase-Quadrature method, which can measure the dominant cycle of price oscillation. By real-time tracking of the optimal periods calculated by these two measurements, we dynamically set the period parameter of the ZLEMA to better suit the current market condition. 

When the fast EMA (ZLEMA) crosses over the slow EMA from below, a long signal is generated. When the fast EMA crosses below the slow EMA, a short signal is triggered. This forms a trading strategy similar to the moving average crossover system.

## Advantages

The Adaptive Zero Lag EMA strategy combines the zero lag filter and adaptive period optimization, with the following advantages:

1. Eliminates lagging and makes more sensitive signals  
2. Adaptive period parameter for a wide range of markets
3. Fewer parameters easy for testing and optimization  
4. Configurable fixed SL/TP for better risk control

## Risks

There are also some risks in this strategy:

1. The adaptive optimized period may fail in certain market environments
2. Improper fixed SL/TP settings could lead to oversized loss or missed profit  
3. Insufficient parameter optimization tests can lead to poor live performance

To control these risks, we need to fully test the parameters across different market conditions, adjust the SL/TP properly, and simulate the live trading environment in backtests.  

## Optimization Directions

There is still ample room to further optimize this strategy:  

1. Alternative adaptive period measurement methods, e.g. volatility adjusted MA
2. Additional filter conditions like volume, MA pairings etc.  
3. Enhanced SL/TP techniques, e.g. trailing stops or Chandelier Exit
4. Dynamic position sizing coupled with risk management
5. Multiple timeframe confirmation to improve signal quality

Through these optimization means, there is potential to further improve the win rate, profitability, risk-adjusted metrics of the strategy.

## Conclusion  

The Adaptive Zero Lag EMA strategy successfully combines the zero lag filter and dynamic period optimization. With fewer parameters and easy to operate, it is especially suitable for trending markets. Together with proper stop loss, position sizing and other risk management techniques, its stability and profitability can be further enhanced. There remains ample potential to optimize this strategy for even better performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Period|
|v_input_3|0|Adaptive Method: Off|Cos IFM|I-Q IFM|Average|
|v_input_4|10|Gain Limit|
|v_input_5|0.05|Threshold|
|v_input_6|70|SL Points|
|v_input_7|5|TP Points|
|v_input_8|0.01|Risk|
|v_input_9|60|Max Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Adaptive Zero Lag EMA v2", shorttitle="AZLEMA", overlay = true)

src = input(title="Source",  defval=close)
Period = input(title="Period",  defval = 20)
adaptive = input(title="Adaptive Method", options=["Off", "Cos IFM", "I-Q IFM", "Average"], defval="Off")
GainLimit = input(title="Gain Limit",  defval = 10)
Threshold = input(title="Threshold", type = float, defval=0.05, step=0.01)
fixedSL = input(title="SL Points", defval=70)
fixedTP = input(title="TP Points", defval=5)
risk = input(title='Risk', defval=0.01, step=0.01)

//##############################################################################
//I-Q IFM
//#############################################################################
range = input(title="Max Period",  defval=60, minval=8, maxval=100)

PI = 3.14159265359
imult = 0.635
qmult = 0.338
inphase = 0.0
quadrature = 0.0
re = 0.0
im = 0.0
deltaIQ = 0.0
instIQ = 0.0
lenIQ = 0.0
V = 0.0

P = src - src[7]
inphase := 1.25*(P[4] - imult*P[2]) + imult*nz(inphase[3])
quadrature := P[2] - qmult*P + qmult*nz(quadrature[2])
re := 0.2*(inphase*inphase[1] + quadrature*quadrature[1]) + 0.8*nz(re[1])
im := 0.2*(inphase*quadrature[1] - inphase[1]*quadrature) + 0.8*nz(im[1])
if (re!= 0.0)
    deltaIQ := atan(im/re)
for i=0 to range
    V := V + deltaIQ[i]
    if (V > 2*PI and instIQ == 0.0)
        instIQ := i
if (instIQ == 0.0)
    instIQ := nz(instIQ[1])
lenIQ := 0.25*instIQ + 0.75*nz(lenIQ[1])

//##############################################################################
//COSINE IFM
//#############################################################################
s2 = 0.0
s3 = 0.0
deltaC = 0.0
instC = 0.0
lenC = 0.0
v1 = 0.0
v2 = 0.0
v4 = 0.0

v1 := src - src[7]
s2 := 0.2*(v1[1] + v1)*(v1[1] + v1) + 0.8*nz(s2[1])
s3 := 0.2*(v1[1] - v1)*(v1[1] - v1) + 0.8*nz(s3[1])
if (s2 != 0)
    v2 := sqrt(s3/s2)
if (s3 != 0)
    deltaC := 2*atan(v2)
for i = 0 to range
    v4 := v4 + deltaC[i]
    if (v4 > 2*PI and instC == 0.0)
        instC := i - 1
if (instC == 0.0)
    instC := instC[1]
lenC := 0.25*instC + 0.75*nz(lenC[1])

if (adaptive == "Cos IFM")
    Period := round(lenC)
if (adaptive == "I-Q IFM")
    Period := round(lenIQ)
if (adaptive == "Average")
    Period := round((lenC + lenIQ)/2)

//##############################################################################
//ZERO LAG EXPONENTIAL MOVING AVERAGE
//##############################################################################
LeastError = 1000000.0
EC = 0.0
Gain = 0.0
EMA = 0.0
Error = 0.0
BestGain = 0.0

alpha =2/(Period + 1)
EMA := alpha*src + (1-alpha)*nz(EMA[1])

for i = -GainLimit to GainLimit
    Gain := i/10
    EC := alpha*(EMA + Gain*(src - nz(EC[1]))) + (1 - alpha)*nz(EC[1])
    Error := src - EC
    if(abs(Error)<LeastError)
        LeastError := abs(Error)
        BestGain := Gain

EC := alpha*(EMA + BestGain*(src - nz(EC[1]))) + (1-alpha)*nz(EC[1])

plot(EC, title="EC", color=orange, linewidth=2)
plot(EMA, title="EMA", color=red, linewidth=2)

buy = crossover(EC,EMA) and 100*LeastError/src > Threshold
sell = crossunder(EC,EMA) and 100*LeastError/src > Threshold
strategy.initial_capital = 50000
if (time>timestamp(2016, 1, 1 , 0, 0))
    //LONG
    balance = strategy.initial_capital + strategy.netprofit
    lots = ((risk * balance)/fixedSL)*1
    strategy.entry("BUY", strategy.long, qty=lots, oca_name="BUY",  when=buy)
    strategy.exit("B.Exit", "BUY", qty_percent = 100, loss=fixedSL, trail_offset=15, trail_points=fixedTP)
    //SHORT
    strategy.entry("SELL", strategy.short, qty=lots, oca_name="SELL", when=sell)
    strategy.exit("S.Exit", "SELL", qty_percent = 100, loss=fixedSL, trail_offset=15, trail_points=fixedTP)

```

> Detail

https://www.fmz.com/strategy/442127

> Last Modified

2024-02-19 15:38:02
