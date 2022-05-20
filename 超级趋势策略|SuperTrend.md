
> 策略名称

超级趋势策略|SuperTrend

> 策略作者

发明者量化

> 策略描述


应平台用户要求, FMZ正在兼容TradingView的Pine语言函数库,现已完成工作

* 语法完全兼容到v5版本
* ta库所有指标完全实现
* math库完全实现
* array库完全实现
* input输入参数自动识别到界面
* request.security对heikinashi的支持
* strategy库实现
* plot/plotchar/alert/alertcondition 兼容
* strategy函数pyramiding参数控制仓位的实现

对语言的函数完全支持是一个持续努力的过程, 此公开版本为方便用户测试提前公开

后期FMZ会进行持续不段的增加完善对TradingView的Pine语言的函数库支持, 有需求可以本策略留言

注: 如果遇到变量未定义证明尚不支持此属性可删除相关调用(比如颜色画线相关)后续后逐渐完善支持

 ![IMG](https://www.fmz.com/upload/asset/114b4feedd1ae4f8550.png) 


> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|3|factor|
|v_input_int_1|6|atrPeriod|


> 源码 (javascript)

``` javascript
/*backtest
start: 2020-04-27 00:00:00
end: 2022-04-26 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/
strategy("supertrend", overlay=true)

[supertrend, direction] = ta.supertrend(input(3, "factor"), input.int(6, "atrPeriod"))

plot(direction < 0 ? supertrend : na, "Up direction", color = color.green, style=plot.style_linebr)
plot(direction > 0 ? supertrend : na, "Down direction", color = color.red, style=plot.style_linebr)

if direction < 0
    if supertrend > supertrend[2]
        strategy.entry("entry long", strategy.long)
    else if strategy.position_size < 0
        strategy.close_all()
else if direction > 0
    if supertrend < supertrend[3]
        strategy.entry("entry short", strategy.short)
    else if strategy.position_size > 0
        strategy.close_all()

```

> 策略出处

https://www.fmz.com/strategy/359806

> 更新时间

2022-05-15 16:30:07
