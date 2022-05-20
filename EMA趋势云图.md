
> 策略名称

EMA趋势云图

> 策略作者

雨幕

> 策略描述

这不是交易建议-没有保证-使用风险自负

绘制9期和20期指数移动平均线（EMA），并在两者之间绘制云图，直观地识别日内趋势及其强度。青云长，红云短。云层越厚，趋势越强。长期进场是指9均线越过20均线，导致云图变绿，简称相反。

激进的入场是在K线BAR收盘发生交叉时。保守进场是指交叉后的第二根K线收盘在9均线以上时，并在相同交易方向上时。

当价格在云中或云中的另一边收盘时，或当平均值在交易的相反方向交叉时（取决于个人的风险承受能力），可能会发生退出。

这不是交易建议-没有保证-使用风险自负


![IMG](https://www.fmz.cn/upload/asset/17720204137fa51da9f54.png) 

![IMG](https://www.fmz.cn/upload/asset/176d8109fcec66d27741c.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|6|EMA快线周期|
|v_input_2|20|EMA慢线周期|
|v_input_bool_1|true|(?交叉移动平均线)使用基于文本的交叉标签?|


> 源码 (PineScript)

``` javascript
/*backtest
start: 2021-08-01 09:00:00
end: 2022-05-14 14:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb888",360008]]
*/



// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ron Westbrook (discord: disturbinglymellow#4075)
// Date: 5/17/2021
// Description: Plots two exponential moving averages and places a colored cloud between to indicate trend direction. Default values of 9 and 20 periods have worked well for me, but inputs are available if you choose to change them. If you like my work and want to support more of it please consider leaving me a tip here. https://tinyurl.com/tipron


//@version=5
indicator(title='EMA TREND CLOUD', overlay=true)

fastLen = input(title='EMA快线周期', defval=6)
slowLen = input(title='EMA慢线周期', defval=20)
useTextLabels = input.bool(true, title='使用基于文本的交叉标签?', group='交叉移动平均线')

fastEMA = ta.ema(close, fastLen)
slowEMA = ta.ema(close, slowLen)

fema = plot(fastEMA, title='FastEMA', color=color.new(color.green, 0), linewidth=1, style=plot.style_line)
sema = plot(slowEMA, title='SlowEMA', color=color.new(color.red, 0), linewidth=1, style=plot.style_line)

fill(fema, sema, color=fastEMA > slowEMA ? color.new(#417505, 50) : color.new(#890101, 50), title='Cloud')

// Bull and Bear Alerts
Bull = ta.crossover(fastEMA, slowEMA)
Bear = ta.crossunder(fastEMA, slowEMA)

plotshape(Bull, title='Calls Label', color=color.new(color.green, 25), textcolor=useTextLabels ? color.white : color.new(color.white, 100), style=useTextLabels ? shape.labelup : shape.triangleup, text='Calls', location=location.belowbar)

plotshape(Bear, title='Puts Label', color=color.new(color.red, 25), textcolor=useTextLabels ? color.white : color.new(color.white, 100), style=useTextLabels ? shape.labeldown : shape.triangledown, text='Puts', location=location.abovebar)


if Bull
    alert('Calls Alert: 9ema crossed over 20ema', alert.freq_once_per_bar_close)
if Bear
    alert('Puts Alert: 9ema crossed under 20ema', alert.freq_once_per_bar_close)


if Bull
    strategy.entry("Enter Long", strategy.long)
else if Bear
    strategy.entry("Enter Short", strategy.short)
```

> 策略出处

https://www.fmz.cn/strategy/364210

> 更新时间

2022-05-19 10:09:12
