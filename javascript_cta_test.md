
> 策略名称

javascript_cta_test

> 策略作者

Hukybo





> 源码 (javascript)

``` javascript
/*backtest
start: 2015-02-22 00:00:00
end: 2020-10-21 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/


function main() {
    $.CTA("MA000/MA888,rb000/rb888,i000/i888", function(st) {
        records = st.records
        if (records.length < 100) {
            return
        }
        amount = st.position.amount
        last_price = records[records.length - 2].Close
        records.pop()
        on_line = TA.Highest(records, 55, 'High') * 0.999
        under_line = TA.Lowest(records, 55, 'Low') * 1.001
        middle_line = (on_line + under_line) / 2
        if (amount > 0 && last_price < middle_line) {
            return -5
        }
        if (amount < 0 && last_price > middle_line) {
            return 5
        }
        if (amount == 0) {
            if (last_price > on_line) {
                return 5
            }
            if (last_price < under_line) {
                return -5
            }
        }
    })
}
```

> 策略出处

https://www.fmz.com/strategy/233079

> 更新时间

2020-12-03 09:42:02
