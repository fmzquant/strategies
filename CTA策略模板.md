
> 策略名称

CTA策略模板

> 策略作者

Hukybo



> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|5|short|


> 源码 (javascript)

``` javascript
/*backtest
start: 2019-05-01 09:00:00
end: 2020-06-21 15:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

function main() {
    $.CTA("rb000/rb888", function(st) {
        var r = st.records
        var mp = st.position.amount
        if (r.length < 20) {
            return
        }
        var cross = _Cross(TA.MA(r, short), TA.MA(r, 20));
        if (mp <= 0 && cross > 2) {
            return 1 * (mp < 0 ? 2 : 1)
        }
        if (mp >= 0 && cross < -2) {
            return -1 * (mp > 0 ? 2 : 1)
        }
    })
}
```

> 策略出处

https://www.fmz.com/strategy/83411

> 更新时间

2020-06-22 14:28:21
