
> Name

自适应移动平均和加权移动平均交叉交易策略Adaptive-Moving-Average-and-Weighted-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/924407fb2b24d0f126.png)
[trans]
### 概述

本策略基于自适应移动平均指标(AIOMA)和加权移动平均指标(WMA)实现交易信号。它通过 AIOMA 和 WMA 的交叉来产生买入和卖出信号。

### 策略名称

AIOMA-WMA 自适应交叉策略

### 策略原理

该策略主要包含以下部分:

1. AIOMA 指标计算

   - 指定长度参数,计算一系列指数移动平均线(EMA)
   - 将这些 EMA 平滑连接,形成平滑序列
   - 最终的 AIOMA 是最后一个平滑值的 EMA

2. WMA 指标计算

   - 指定长度参数,计算 WMA

3. 交易信号生成

   - WMA 上穿 AIOMA 时,产生买入信号
   - WMA 下穿 AIOMA 时,产生卖出信号

4. 交易逻辑

   - 买入信号时,进入多头仓位
   - 卖出信号时,进入空头仓位
   - 平仓信号时,关闭对应方向的仓位

### 策略优势

1. 使用两种不同类型的移动平均线,可以提高交易信号的准确性
2. AIOMA 通过多次指数平滑,可以减少假信号
3. WMA 作为主要指标,对价格变化更为敏感,可以提早捕捉趋势
4. 简单的交易逻辑,容易理解和实施

### 策略风险

1. 多次 EMA 平滑可能导致过度滞后
2. WMA 容易受到短期价格震荡的影响产生错误信号
3. 未考虑止损逻辑,可能导致较大亏损

可以通过适当优化参数,设置止损点,或结合其他指标过滤来减少风险。

### 策略优化方向

1. 测试不同长度参数的组合,寻找最佳参数
2. 在买入/卖出信号时同时触发止损单
3. 结合市场波动性指标过滤假信号
4. 增加仓位管理策略 

### 总结

本策略整合 AIOMA 和 WMA 两个指标的优势,通过交叉产生交易信号。相比单一移动平均线,可以提高信号质量。通过参数优化、止损策略和波动性过滤等进一步完善,可以成为一个稳定可靠的交易系统。

||

## Overview

This strategy generates trading signals based on the Adaptive Indicator for Moving Averages (AIOMA) and the Weighted Moving Average (WMA) indicators. It produces buy and sell signals based on the crossovers between AIOMA and WMA.  

### Strategy Name

AIOMA-WMA Adaptive Crossover Strategy

### Strategy Logic

The strategy includes the following main components:

1. AIOMA Indicator Calculation

   - Calculate a series of Exponential Moving Averages (EMA) with specified length 
   - Chain these EMAs to create smoothed values  
   - The final AIOMA is an EMA of the last smoothed value

2. WMA Indicator Calculation

   - Calculate WMA with specified length

3. Signal Generation

   - Buy signal when WMA crosses above AIOMA
   - Sell signal when WMA crosses below AIOMA

4. Trading Logic

   - Enter long position on buy signal
   - Enter short position on sell signal  
   - Close position on reverse crossover signals

### Advantages

1. Using two different types of moving averages improves signal accuracy 
2. AIOMA reduces false signals through multiple exponential smoothings
3. WMA as the main indicator reacts faster to price changes to capture trends early  
4. Simple trading logic, easy to understand and implement

### Risks

1. Excessive lagging due to multiple EMA smoothings  
2. WMA prone to wrong signals from short-term price fluctuations
3. No stop loss logic, can lead to large losses

Can reduce risks through parameter optimization, adding stop loss, filtering with other indicators etc.

### Enhancement Areas

1. Test different parameter combinations to find optimal values
2. Trigger stop loss orders together with entry signals 
3. Filter signals using volatility indicators 
4. Incorporate position sizing strategies

### Conclusion

This strategy combines the strengths of AIOMA and WMA by using crossovers to generate trading signals. Compared to single moving averages, it improves signal quality. Further refinements like parameter optimization, stop loss strategies, volatility filtering etc. can make it a robust trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|AIOMA Length|
|v_input_2|21|WMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SDTA

//@version=5
strategy("AIOMA-WMA Strategy", overlay=true)

// Parametreler
aioma_length = input(14, "AIOMA Length")
wma_length = input(21, "WMA Length")

// AIOMA hesaplama
length1 = aioma_length
ema1 = ta.ema(close, length1)
length2 = aioma_length
ema2 = ta.ema(ema1, length2)
length3 = aioma_length
ema3 = ta.ema(ema2, length3)
length4 = aioma_length
ema4 = ta.ema(ema3, length4)
aioma = ta.ema(ema4, aioma_length)

// WMA hesaplama
wma = ta.wma(close, wma_length)

// Kesişim kontrolü
cross_up = ta.crossover(wma, aioma)
cross_down = ta.crossunder(wma, aioma)

// İşlem fonksiyonu
enterTrade(dir, price, signalText, color) =>
    if dir
        strategy.entry("Enter", strategy.long)
        label.new(x = bar_index, y = price, text = signalText, color = color, textcolor = color, style = label.style_label_up, size = size.small, tooltip = "Entry Signal")
    else if not dir
        strategy.entry("Exit", strategy.short)
        label.new(x = bar_index, y = price, text = signalText, color = color, textcolor = color, style = label.style_label_down, size = size.small, tooltip = "Exit Signal")

// Long pozisyon girişi
if cross_up
    enterTrade(true, low, "Buy Signal", color.green)

// Short pozisyon girişi
if cross_down
    enterTrade(false, high, "Sell Signal", color.red)

// Pozisyon kapatma
if cross_up and strategy.position_size > 0
    strategy.close("Enter")
if cross_down and strategy.position_size < 0
    strategy.close("Exit")

// Grafiğe plot
plot(aioma, color=color.blue, linewidth=2, title="AIOMA")
plot(wma, color=color.red, linewidth=2, title="WMA")

```

> Detail

https://www.fmz.com/strategy/439735

> Last Modified

2024-01-23 14:13:55
