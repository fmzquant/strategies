
> Name

My语言仓位变化推送通知

> Author

发明者量化





> Source (MyLanguage)

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

> Detail

https://www.fmz.com/strategy/305745

> Last Modified

2021-08-09 14:01:30
