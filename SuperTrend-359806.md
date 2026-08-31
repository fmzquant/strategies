
> Name

SuperTrend-359806

> Author

发明者量化

> Strategy Description

[trans]

At the request of our platform users, FMZ is compatible with the Pine language function library of TradingView now, and has entered a stable version.

* the grammer is fully compatible with v5 version
* all indicators of ta library are fully implemented
* full implementation of math library
* full implementation of string library
* full implementation of array library
* input parameters are recognized in the interface automatically
* request.security support for heikinashi
* strategy library implementation (full support for stop loss/profit target/trailing stop/conditional orders, etc.)
* compatible with plot/plotchar/plotshape/plotcandle/alert/alertcondition etc.

It is a continuous process that provide full support for language functions, and this public version is made available in advance for user testing.

Later, FMZ will continue to increase and improve the function library support for Pine language of TradingView, if necessary, please leave a comment on this strategy.

Remark: If you encounter undefined variables, it is proved that this attribute is not supported. You can delete the relevant call, or send a work order to contact the technician to solve the problem.
||
应平台用户要求, FMZ正在兼容TradingView的Pine语言函数库, 现已进入稳定版本

* 语法完全兼容到v5版本
* ta库所有指标完全实现
* math库完全实现
* string库完全实现
* array库完全实现
* input输入参数自动识别到界面
* request.security对heikinashi的支持
* strategy库实现(支持止损/止盈/跟踪止盈/条件单等完整支持)
* plot/plotchar/plotshape/plotcandle/alert/alertcondition 等兼容

对语言的函数完全支持是一个持续努力的过程, 此公开版本为方便用户测试提前公开

后期FMZ会进行持续不段的增加完善对TradingView的Pine语言的函数库支持, 有需求可以本策略留言

注: 如果遇到变量未定义证明尚不支持此属性可删除相关调用, 或发工单联系技术人员解决
[/trans]
 ![IMG](https://www.fmz.com/upload/asset/114b4feedd1ae4f8550.png) 




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-08-17 08:00:00
end: 2024-08-29 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

strategy("supertrend", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 50)

[supertrend, direction] = ta.supertrend(input(5, "factor"), input.int(10, "atrPeriod"))

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

> Detail

https://www.fmz.com/strategy/359806

> Last Modified

2024-08-30 18:24:36
