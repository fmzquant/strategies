
> Name

高低TEMA平均值震荡策略Oscillation-Strategy-of-High-and-Low-TEMA-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187d54c57fe7604338a.png)

[trans]

## 概述

本策略使用TEMA, VWMACD和HMA三个指标来捕捉比特币的下跌行情。它的主要逻辑是在VWMACD下穿0轴、价格低于HMA均线和快线TEMA低于慢线TEMA时做空。当VWMACD上穿0轴、价格高于HMA均线或快线TEMA上穿慢线TEMA时平仓。

## 原理

首先计算VWMACD(和普通MACD的区别只在于计算移动平均线的方式不同)并画成柱状图。然后添加HMA作为趋势过滤器。接着创建并添加快线TEMA(5周期)和慢线TEMA(8周期),并计算两者的差值绘制在0轴附近。这是做空决策的关键。

具体入场规则是:当VWMACD低于0轴、价格低于HMA均线和快线TEMA低于慢线TEMA时做空。

具体出场规则是:当VWMACD上穿0轴、价格高于HMA均线或快线TEMA上穿慢线TEMA时平仓。

## 优势分析

- 使用了三个指标组合,提高了交易信号的可靠性
- VWMACD能识别背离提供较准的趋势判断
- HMAfilt作为趋势滤波器,避免被噪音误导
- 快慢TEMA组合,捕捉短期反转点位
- 采用短周期参数,适合高频交易,捕捉短期下跌行情

## 风险分析 

- 多指标组合,参数设置较复杂,需要经验进行调优
- 虽有HMA滤波器,但仍需防止震荡市场的假突破
- 短周期参数容易被市场噪音干扰,出现失误信号
- 需严格控制止损,避免出现超出预期的大幅度损失
- 需关注交易成本控制,高频交易容易被手续费摩擦损耗

## 优化方向

- 可以测试不同周期的参数组合,寻找最佳参数
- 可以添加其他指标,如RSI,KD等辅助判断
- 可以根据不同市场情况使用自适应参数
- 可以优化止损策略,如随价格移动止损
- 可以结合量能指标,避免量能不足的假突破

## 总结

本策略采用VWMACD,HMA和快慢TEMA的组合, Ziel在捕捉比特币短期下跌行情。它的优势是信号较可靠,适合高频交易。但也存在参数调优复杂,容易被噪音干扰等风险。通过继续优化参数组合、加入辅助指标等方式,可以使策略更稳定可靠。总体来说,本策略利用多指标确认和短周期参数的特点,能够对比特币的短期下跌行情做出较准确判断,属于一个行之有效的高频做空策略。

||


## Overview

This strategy uses TEMA, VWMACD and HMA indicators to capture the downtrend of Bitcoin. Its main logic is to go short when VWMACD crosses below 0, price is below HMA and fast TEMA is below slow TEMA. It will exit the position when VWMACD crosses above 0, price is above HMA or fast TEMA crosses above slow TEMA.

## Principle 

First calculate VWMACD (the only difference from regular MACD is the way to calculate moving average) and plot it as histogram. Then add HMA as a trend filter. After that create and add fast TEMA (5 periods) and slow TEMA (8 periods), and calculate the difference between them to plot around 0. This is the key decision for going short.  

The specific entry rule is: when VWMACD is below 0, price is below HMA and fast TEMA is below slow TEMA, go short.

The specific exit rule is: when VWMACD crosses above 0, price is above HMA or fast TEMA crosses above slow TEMA, close position.

## Advantage Analysis

- Uses a combination of three indicators, improves reliability of trading signals.
- VWMACD can identify divergences and provide accurate trend judgements.  
- HMAfilt as a trend filter, avoids noise interference.
- Fast and slow TEMA combo catches short-term reversal points.
- Adopts short-period parameters, suitable for high frequency trading, catches short-term downtrends.

## Risk Analysis

- Multiple indicators combo, complex parameter tuning needed.
- Although having HMA filter, still need to prevent false breakouts in ranging markets.
- Short periods prone to market noise interference, wrong signals may occur.  
- Need strict stop loss to prevent unexpected large losses.
- Need to focus on transaction cost control, high frequency trading easily hurt by friction.

## Optimization Directions

- Can test different parameter combinations to find optimal parameters.
- Can add other indicators like RSI, KD for assistance.
- Can use adaptive parameters according to different market conditions.
- Can optimize stop loss strategy, like trailing stop loss.
- Can combine with volume indicators to avoid insufficient thrust.

## Conclusion

This strategy uses the combination of VWMACD, HMA and fast/slow TEMA to capture short-term downtrends of Bitcoin. Its advantages are relatively reliable signals and suitability for high frequency trading. But it also has risks like complex parameter tuning, prone to noise interference. Further optimizing parameter combos and adding auxiliary indicators can make the strategy more stable and reliable. Overall, by utilizing multiple indicator confirmation and short period parameters, this strategy can make relatively accurate judgements on Bitcoin's short-term downtrends, and is an effective high frequency short strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Start Year|
|v_input_2|12|Month|
|v_input_3|17|Day|
|v_input_4|13|Short period|
|v_input_5|21|Long period|
|v_input_6|5|Smoothing period|
|v_input_7|400|HMA|
|v_input_8|5|Fast moving TEMA|
|v_input_9|8|Slow moving TEMA|
|v_input_10|true|Take Profit (%)|
|v_input_11|4|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="TEMA_HMA_VWMACD short strategy", shorttitle="Short strategy", overlay=false, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.018, currency='USD')
startP = timestamp(input(2017, "Start Year"), input(12, "Month"), input(17, "Day"), 0, 0)
end   = timestamp(9999,1,1,0,0)
_testPeriod() =>
    iff(time >= startP and time <= end, true, false)
    

slow = input(13, "Short period")
fast = input(21, "Long period")
signal = input(5, "Smoothing period")

Fast = ema( volume * close, fast ) / ema( volume, fast ) 
Slow = ema( volume * close, slow ) / ema( volume, slow ) 
Macd = Slow - Fast 
Signal = ema(Macd, signal) 
Hist=Macd-Signal
plot(Hist, color=color.silver, linewidth=1, style=plot.style_histogram)
plot(0, color=color.red)

length = input(400, minval=1, title = "HMA")
hullma = wma(2*wma(close, length/2)-wma(close, length), floor(sqrt(length)))

tema_length_1 = input(5, "Fast moving TEMA")
tema_length_2 = input(8, "Slow moving TEMA")


tema(sec, length)=>
    tema1= ema(sec, length)
    tema2= ema(tema1, length)
    tema3= ema(tema2, length)
    tema = 3*tema1-3*tema2+tema3

tema1 = tema(hlc3, tema_length_1)
tema2 = tema(hlc3, tema_length_2)

threshold  = 0
tm = tema1 - tema2
plot_fast = plot(tm, color = tm > 0 ? color.green : color.red)
plot(threshold, color=color.purple)

up =  crossover(tm, 0) 
down = crossunder(tm, 0)

longCondition =  (Hist < 0) and hullma > close and (tema1 < tema2)  and _testPeriod() 
strategy.entry('BUY', strategy.short, when=longCondition)  
 
shortCondition =  (Hist > 0) or hullma < close or up
strategy.close('BUY', when=shortCondition)


// Take profit  
tp = input(1, type=input.float, title='Take Profit (%)')  
sl = input(4, type=input.float, title='Stop Loss (%)')  
strategy.exit('XLong', from_entry='BUY', profit=(close * (tp/100) * (1/syminfo.mintick)), loss=(close * (sl/100) * (1/syminfo.mintick)))
```

> Detail

https://www.fmz.com/strategy/432239

> Last Modified

2023-11-15 17:49:52
