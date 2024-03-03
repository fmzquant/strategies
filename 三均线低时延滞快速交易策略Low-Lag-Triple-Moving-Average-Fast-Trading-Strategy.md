
> Name

三均线低时延滞快速交易策略Low-Lag-Triple-Moving-Average-Fast-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d7ad3cd423121aaa02.png)

## 策略原理

该策略使用三条低时延移动平均线,包括12周期、26周期和55周期的低时延tema均线。这三条均线分别代表:快速均线、中速均线和慢速均线。当快速均线上穿中速均线时产生买入信号;当快速均线下穿中速均线时产生卖出信号。这样通过三条均线的交叉来判断市场买卖点,实现高频交易。

代码中定义了模板函数tema()来计算低时延tema均线。其计算公式为:TEMA = 2\*EMA - EMA(EMA),使用二次指数移动平均线EWMA来计算,本质上是一种双重指数平滑移动平均线,主要优点是大大降低了滞后。这样可以更快速地响应价格变化,提高交易信号判断的实时性。

具体来说,该策略的入场判断为:快速均线上穿中速均线且快速均线高于慢速均线时产生买入信号;快速均线下穿中速均线且快速均线低于慢速均线时产生卖出信号。

## 优势分析

该策略最大的优势在于出入场判断快速准确。三均线低时延设计大大减小了滞后,能够快速响应价格变化。同时使用三均线进行交叉判定,避免了误判。

另外,该策略适合高频交易,可以捕捉短线价格波动获利。通过快进快出的操作模式,可以在波动较大的市场中获利。

## 风险分析

该策略最大的风险在于可能出现超短线套利。三均线低时延设计决定了它对价格变化极为敏感,在某些市场中会出现超短线震荡。这时就很容易被套住。

另外,高频交易需要支付较多的手续费和滑点。如果获利能力不足,很容易被交易费用反向套利。

此外,该策略对交易者的实时监控能力要求较高,需要及时更新止损点和止盈点。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化三均线的周期参数,使其更好地适应不同市场的特点;

2. 增加波动性指标或者交易量指标来确认信号,避免在震荡行情中被套;

3. 结合更多因子来设定止损止盈机制,实现动态跟踪;

4. 优化仓位管理,通过资金管理手段控制单笔风险;

5. 结合机器学习算法来动态优化策略参数。

## 总结

本策略为三均线低时延快速交易策略。其通过低时延设计,实现快进快出,适合高频交易捕捉短线机会。该策略最大优势是信号判断快速准确,最大劣势是容易在震荡行情中被套。本文通过详细的原理剖析、优势分析、风险分析和优化探讨,全面概述了该交易策略。

||

The strategy is named "Low Lag Triple Moving Average Fast Trading Strategy". Its main idea is to determine entries and exits based on the golden cross and death cross of three moving averages with different parameters and low lag design.  

## Strategy Principle 

The strategy uses three low-lag moving averages, including 12-, 26-, and 55-period low-lag TEMA. These three MAs represent fast, medium and slow MAs.  When the fast MA crosses over the medium MA, a buy signal is generated. When the fast MA crosses below the medium MA, a sell signal is generated. By using the crossover of the three MAs to determine market entry and exit points, high frequency trading can be achieved.

The template function tema() is defined in the code to calculate the low-lag TEMA. Its calculation formula is: TEMA = 2*EMA - EMA(EMA). It uses the double exponential moving average EWMA for calculation. Essentially it is a double smoothed EMA with the main merit of largely reducing the lagging effect. Thus it can respond to price changes faster and improve the timeliness of trading signals.  

Specifically, the entry rules of this strategy are: when the fast MA crosses over the medium MA and the fast MA is above the slow MA, a buy signal is generated. When the fast MA crosses below the medium MA and the fast MA is below the slow MA, a sell signal is generated.

## Advantage Analysis

The biggest advantage of this strategy is that the entries and exits are determined quickly and accurately. The low-lag design of the three MAs greatly reduces the lagging effect so that they can respond to price changes rapidly. Also, using the crossover of three MAs to determine signals avoids false signals.  

In addition, this strategy is suitable for high-frequency trading to capture profits from short-term price fluctuations. Through fast entries and exits it can profit from high volatility markets.

## Risk Analysis 

The biggest risk is that ultra short-term whipsaws may occur. Due to the high sensitivity to price changes from the low-lag design, some markets may experience high-frequency oscillations. Then whipsaws are very likely to happen.

Also, high-frequency trading requires paying relatively high commissions and slippage costs. If the profiting ability is insufficient, it is easy to suffer losses from the trading costs.

Moreover, this strategy requires the trader to have strong real-time monitoring abilities to update the stop loss and take profit timely.

## Optimization Directions

The strategy can be optimized from the following aspects:

1. Optimize the period parameters of the three MAs to better suit different market characteristics.  

2. Add volatility indicators or volume indicators to confirm signals and avoid whipsaws in ranging markets.

3. Incorporate more factors to set up dynamic trailing stop mechanisms.  

4. Optimize position sizing to control single trade risks through money management techniques.

5. Incorporate machine learning algorithms to dynamically optimize the strategy parameters.

## Conclusion
This is a low-lag triple moving average fast trading strategy. Through its low-lag design, fast entries and exits can be achieved, which is suitable for high-frequency trading to capture short-term opportunities. The biggest advantage of this strategy is that its signal determination is fast and accurate. The biggest disadvantage is that it is prone to be whipsawed in ranging markets. This article comprehensively summarizes this trading strategy through detailed analysis of its rationale, advantages, risks and optimization directions.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: temadelay|ema|emadelay|fastema|tema|nkclose|
|v_input_2|8|N|
|v_input_3|1.2|K|
|v_input_4|true|fracCap|
|v_input_5|200|TP|
|v_input_6|130|SL|
|v_input_7|true|TS|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("scalping low lag tema etal", shorttitle="Scalping tema",initial_capital=10000, overlay=true)
mav = input(title="Moving Average Type", defval="temadelay", options=["nkclose", "ema", "emadelay", "fastema", "tema", "temadelay"])
lenb = 3
N = input(8)
K = input(1.2)
fracCap = input(1.0)
in = close + K*mom(close,N)
source = close
length = 8
sigma  = 12.0
offset = 0.9
p = 4
// length = 10
// sigma  = 6.0
// offset = 0.85
tema(src,len) => fastemaOut = 2*ema(src, len) - ema(ema(src, len), len)


a = 0.0
b = 0.0
c = 0.0
if mav == "nkclose"
    a := ema(in, 12)
    b := a[1]
    c := a[2]
if mav == "ema"
    a := ema(close, 12)
    b := ema(close, 26)
    c := ema(close, 55)
if mav == "emadelay"
    a := ema(close, 12)
    b := a[1]
    c := a[2]
if mav == "fastema"
    a := ema(in, 12)
    b := ema(in, 26)
    c := ema(in, 55)
if mav == "tema"
    a := tema(close, 12)
    b := tema(close, 26)
    c := tema(close, 55)
if mav == "temadelay"
    a := tema(close, 12)
    b := a[1]
    c := a[2]

TP = input(200)
SL = input(130)
TS = input(1)
// TP = input(50)
// SL = input(110)
// TS = input(1)

orderSize = floor((fracCap * strategy.equity) / close)
long = cross(a, c) and a > b
short = cross(a, c) and a < b
plot(a, title="12", color=color.red, linewidth=1)
plot(b, title="26", color=color.blue, linewidth=1)
plot(c, title="55", color=color.green, linewidth=1)

strategy.entry("Long", strategy.long, qty=orderSize,  when=long)
strategy.entry("Short", strategy.short, qty=orderSize,  when=short)
// strategy.entry("Long", strategy.long,  100.0, when=long)
// strategy.entry("Short", strategy.short,  100.0, when=short)
// strategy.entry("Long", strategy.long, 100.0, when=long)
// strategy.entry("Short", strategy.short, 100.0, when=short)
// strategy.entry("Long", strategy.long, 1.0, when=long)
// strategy.entry("Short", strategy.short, 1.0, when=short)

TPP = (TP > 0) ? TP : na
SLP = (SL > 0) ? SL : na
TSP = (TS > 0) ? TS : na
// strategy.exit("Close Short", "Short", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP, when=long)
// strategy.exit("Close Long", "Long", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP, when=short)
// strategy.exit("Close Long", "Long", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP, when=long[1])
// strategy.exit("Close Short", "Short", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP, when=short[1])
strategy.exit("Close Long", "Long", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP)
strategy.exit("Close Short", "Short", qty_percent=100, profit=TPP, loss=SLP, trail_points=TSP)

```

> Detail

https://www.fmz.com/strategy/436519

> Last Modified

2023-12-25 14:24:38
