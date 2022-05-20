
> 策略名称

吕神简易波动率策略Pine语言版本

> 策略作者

发明者量化

> 策略描述

来自于两年前用户公开的一个简单的波动率策略

https://www.fmz.com/strategy/200131

无意翻到, 用PINE重写了下代码量减少了 90% 给量化的朋友们学习参考

 ![IMG](https://www.fmz.com/upload/asset/143fce25524c3447937.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|50|指数计算周期|


> 源码 (javascript)

``` javascript
/*backtest
start: 2021-05-16 00:00:00
end: 2022-05-15 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/

N = input(50, '指数计算周期')

vix = math.log(close) / math.log(close[N-1]) - 1
vix_ma = ta.sma(vix, N)
vix_ma_up = ta.highest(vix_ma, N)
vix_ma_down = ta.lowest(vix_ma, N)

plot(vix, 'vix')
plot(vix_ma, 'vix_ma')
plot(vix_ma_up, 'vix_ma_up')
plot(vix_ma_down, 'vix_ma_down')

qty = strategy.equity / close

if strategy.position_size == 0
    if vix > vix_ma_up and vix[1] <= vix_ma_up[1]
        strategy.entry("LONG", strategy.long, qty=qty)
    else if vix < vix_ma_down and vix[1] >= vix_ma_down[1]
        strategy.entry("SHORT", strategy.short, qty=qty)
else if strategy.position_size > 0
    if vix < vix_ma and vix[1] >= vix_ma[1]
        strategy.close_all()
else if strategy.position_size < 0
    if vix > vix_ma and vix[1] <= vix_ma[1]
        strategy.close_all() 
    

```

> 策略出处

https://www.fmz.com/strategy/361827

> 更新时间

2022-05-17 21:45:45
