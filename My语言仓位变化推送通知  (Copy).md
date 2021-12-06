
> 策略名称

My语言仓位变化推送通知  (Copy)

> 策略作者

程文





> 源码 (麦语言)

``` pascal

C>HV(H, 10),SPK;
C<LV(L, 15),BPK;
AUTOFILTER;

%%
// 下面代码附加到任何My语言策略最后都可以实现仓位变化推送到手机App与微信
if (typeof(scope._tmp) !== 'number') {
    scope._tmp = 0;
}
var pos = scope.get_locals('BKVOL') - scope.get_locals('SKVOL');
if (pos != scope._tmp) {
   scope._tmp = pos;
   Log('通知仓位变化:', scope.symbol, pos, '@');
}
%%
```

> 策略出处

https://www.fmz.cn/strategy/328005

> 更新时间

2021-11-05 09:22:23
