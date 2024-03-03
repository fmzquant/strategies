
> Name

吕神简易波动率策略Pine语言版本

> Author

发明者量化

> Strategy Description

来自于两年前用户公开的一个简单的波动率策略

https://www.fmz.com/strategy/200131

无意翻到, 用PINE重写了下代码量减少了 90% 给量化的朋友们学习参考

 ![IMG](https://www.fmz.com/upload/asset/143fce25524c3447937.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|指数计算周期|


> Source (PineScript)

``` pinescript
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
upline = plot(vix_ma_up, 'vix_ma_up')
downline = plot(vix_ma_down, 'vix_ma_down')
fill(upline, downline, color=color.new(color.gray, 50))

qty = math.round(strategy.equity / close, 2)

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

> Detail

https://www.fmz.com/strategy/361827

> Last Modified

2022-05-29 20:51:28
