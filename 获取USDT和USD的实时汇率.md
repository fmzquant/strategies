
> 策略名称

获取USDT和USD的实时汇率

> 策略作者

affroad

> 策略描述

通过Http请求读取coinmarketcap上的实时USDT汇率

我的博客：https://www.pcclean.io/yax2



> 源码 (javascript)

``` javascript
//获得美元汇率
function getUSDTratio(){
var r = _C(HttpQuery,"https://api.coinmarketcap.com/v2/ticker/825/");
var o = JSON.parse(r);
return o.data.quotes.USD.price;
}
```

> 策略出处

https://www.fmz.com/strategy/157364

> 更新时间

2019-07-16 14:21:58
