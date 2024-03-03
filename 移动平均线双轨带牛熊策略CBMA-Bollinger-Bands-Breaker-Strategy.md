
> Name

移动平均线双轨带牛熊策略CBMA-Bollinger-Bands-Breaker-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171bc0f959082c4028d.png)

[trans]


### 概述

本策略采用碎石移动平均线作为主要技术指标,结合布林带双轨,实现识别市场趋势的breaker策略。当价格突破布林带上轨时看空,当价格突破布林带下轨时看多,属于流行的双轨突破系统。

### 策略原理

1. 计算碎石移动平均线(CBMA):采用自适应EMA平滑碎石移动平均线,可以有效跟踪价格变化。

2. 设置布林带参数:选取碎石移动平均线作为中轨,上下轨采用标准差 stomach 倍数设置,可根据市场调整。

3. 突破交易:价格上破上轨时看空,下破下轨时看多,采用趋势跟踪breaker策略。

4. 采用cancel闪电下单模式,一次只做单边方向交易。

5. 设置固定交易量,可根据资金调整。

### 优势分析

1. 碎石移动平均线平滑性好,能有效跟踪价格。

2. 自适应EMA算法优化了移动平均线的实时性。 

3. 布林带上下轨明确了突破的方向信号。

4. 采用趋势跟踪模式,避免whipsaw。

5. 固定交易量可控制单次亏损。

### 风险分析 

1. 布林带参数设置需要优化,幅度过大过小都存在问题。

2. 突破信号可能出现假突破。

3. 需要设置止损来控制损失。

4. 固定交易量无法根据市场调整仓位。

5. 仅做单边方向交易,无法获利更大。

### 优化方向

1. 动态优化布林带参数,使布林带更贴合市场情况。

2. 加入更多指标进行滤波,避免假突破。 

3. 加入跟踪止损来锁定利润。

4. 对冲交易,同时做多做空获利更大。 

5. 加入仓位管理系统。

### 总结

本策略作为一款breaker趋势跟踪策略,采用自适应移动平均线技术指标,结合布林带双轨设置了清晰的突破信号。策略简单易操作,固定交易量可控制风险,具有一定的实盘价值。但也存在一些问题,如假突破和参数优化等,这需要通过加入更多技术指标来优化,在控制风险的同时,进一步提升策略的实盘效果。总体来说,本策略作为入门的突破系统还不错,有较大的优化空间。

||

## Overview

This strategy uses CBMA as the major technical indicator combined with Bollinger Bands to identify market trends and implement a breaker strategy. It goes short when price breaks above the upper band and goes long when price breaks below the lower band, belonging to the popular dual-track breakout system.

## Strategy Logic

1. Calculate CBMA: Use adaptive EMA to smooth CBMA which can track price changes effectively.

2. Set Bollinger Bands parameters: Use CBMA as middle band, and set upper/lower bands using standard deviation multiplier, which can be adjusted based on market. 

3. Breakout trading: Sell when price breaks above upper band, buy when price breaks below lower band, using trend following breaker strategy.

4. Use cancel flash orders, only trade one direction at a time.

5. Set fixed order size, can be adjusted based on capital.

## Advantage Analysis

1. CBMA has good smoothness and can track price effectively.

2. Adaptive EMA optimizes the responsiveness of moving average.

3. Upper/lower bands give clear directional signals when breakout happens.

4. Trend following model avoids whipsaw trades.

5. Fixed order size controls single trade risk.

## Risk Analysis

1. Bollinger Bands parameters need optimization, too wide or too narrow can cause issues.

2. Breakout signals may have false breakouts. 

3. Need stop loss to control loss.

4. Fixed order size cannot adjust position based on market.

5. Only trade one direction, cannot profit more.

## Optimization Directions

1. Dynamically optimize Bollinger Bands parameters to fit market better.

2. Add more indicators for filtration, avoid false breakouts.

3. Add trailing stop loss to lock in profits.

4. Hedge trading, go both long and short for bigger profit.

5. Add position sizing system. 

## Conclusion

This strategy is a breaker trend following system using adaptive moving average technology combined with Bollinger Bands for clear breakout signals. It has simple logic and fixed order size controls risk, having some practical value. But issues like false breakouts and parameter optimization remain, which need more indicators to improve and enhance real trading performance while controlling risk. Overall it is a decent starter breakout system with much room for improvement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2|false|Regular BB Or CBMA?|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|2.3|Multipler|
|v_input_5|11|EMA Length|
|v_input_6|50|EMA Gain Limit|
|v_input_7|true|Highlight On/Off|
|v_input_8|false|Strategy Direction|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-29 00:00:00
end: 2023-11-05 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="CBMA Bollinger Bands Strategy directed [ChuckBanger]", shorttitle="CBMA BB CB", 
   overlay=true )


length = input(title="Length", type=input.integer, defval=12, minval=1)
regular = input(title="Regular BB Or CBMA?", type=input.bool, defval=false)
src = input(title="Source", type=input.source, defval=close)
mult = input(title="Multipler", type=input.float, defval=2.3, minval=.001, maxval=50, step=.1)
emaLen = input(title="EMA Length", type=input.integer, defval=11, minval=1)
emaGL = input(title="EMA Gain Limit", type=input.integer, defval=50, minval=1)
highlight = input(title="Highlight On/Off", type=input.bool, defval=true)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)

strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

//strategy.risk.max_drawdown(50, strategy.percent_of_equity)

calc_hma(src, length) =>
    hullma = wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))
    hullma

calc_cbma(price, length, emaLength, emaGainLimit) =>
    alpha = 2 / (emaLength + 1)
    ema = ema(price, emaLength)
    int leastError = 1000000
    
    float ec = 0
    float bestGain = 0
    
    for i = emaGainLimit to emaGainLimit
        gain = i / 10
        ec := alpha * ( ema + gain * (price - nz(ec[1])) ) + (1 - alpha) * nz(ec[1])
        error = price - ec
        if (abs(error) < leastError)
            leastError = abs(error)
            bestGain = gain
    
    ec := alpha * ( ema + bestGain * (price - nz(ec[1])) ) + (1 - alpha) * nz(ec[1])
    hull = calc_hma(price, length)
    
    cbma = (ec + hull) / 2
    cbma

cbma = calc_cbma(src, length, emaLen, emaGL)
basis = regular ? sma(src, length) : cbma
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
cbmaColor = fixnan(highlight and not regular ? cbma > high ? color.purple : cbma < low ? color.aqua : na : color.red)
plot(basis, color=cbmaColor)
p1 = plot(upper, color=color.blue)
p2 = plot(lower, color=color.blue)
fill(p1, p2)

if (crossover(src, lower))
    strategy.entry("CBMA_BBandLE", strategy.long, stop=lower, oca_name="BollingerBands", comment="CBMA_BBandLE")
else
    strategy.cancel(id="CBMA_BBandLE")

if (crossunder(src, upper))
    strategy.entry("CBMA_BBandSE", strategy.short, stop=upper, oca_name="BollingerBands", comment="CBMA_BBandSE")
else
    strategy.cancel(id="CBMA_BBandSE")

```

> Detail

https://www.fmz.com/strategy/431277

> Last Modified

2023-11-06 16:25:01
