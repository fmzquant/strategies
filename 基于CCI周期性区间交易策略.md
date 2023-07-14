
> Name

基于CCI周期性区间交易策略

> Author

深蓝



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Diff|40|周期区间|
|Length|100|周期长度|
|AvgLength|10|CCI均值|
|Name|rb1810|合约代码|


> Source (javascript)

``` javascript
/*backtest
start: 2015-01-01 09:00:00
end: 2018-04-22 15:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","minfee":0,"fee":[0,0]}]
*/


//语法固定格式，调用main主函数
function main() {
    //调用商品期货交易类库中的CTA框架
    $.CTA(Name, function(st) {
        //获取K线数组
        var j = st.records;
        //指标运算参考的最大K线数量
        if (j.length < Length) {
            return;
        }
        //获取上根K线的收盘价
        var c1 = j[j.length - 2].Close;
        //获取前根K线的收盘价
        var c2 = j[j.length - 3].Close;
        //获取CCI指标数组
        var cci = talib.CCI(j, Length);
        //计算上根K线的CCI平均值
        var sum1 = 0;
        for (var i = cci.length - 1 - 1; i >= cci.length - AvgLength - 1; i--) {
            sum1 += cci[i];
        }
        var ccima1 = sum1 / AvgLength;
        //计算前根K线的CCI平均值
        var sum2 = 0;
        for (var k = cci.length - 1 - 2; k >= cci.length - AvgLength - 2; k--) {
            sum2 += cci[k];
        }
        var ccima2 = sum2 / AvgLength;
        //获取当前的持仓数量，正数指多仓, 负数指空仓, 0则不持仓
        var mp = st.position.amount;
        //如果当前无持仓，并且上根K线的收盘价大于上根K线的MA值，并且上根K线的K值大于上根K线的D值，开多单
        if (mp === 0 && ccima2 < Diff && ccima1 > Diff) {
            return 1; //如果当前无持仓，指定返回值为N，就是开N手多单。
        }
        //如果当前无持仓，并且上根K线的收盘价小于上根K线的MA值，并且上根K线的K值小于上根K线的D值，开空单
        if (mp === 0 && ccima2 > -Diff && ccima1 < -Diff) {
            return -1; //如果当前无持仓，指定返回值为-N，就是开N手空单。
        }
        //如果当前持有多单，并且上根K线的K值小于上根K线的D值，平多单
        if (mp > 0 && ccima2 > Diff && ccima1 < Diff) {
            return -1; //如果当前有多单，指定返回值为-N，就是平N手多单。
        }
        //如果当前持有空单，并且上根K线的K值大于上根K线的D值，平空单
        if (mp < 0 && ccima2 < -Diff && ccima1 > -Diff) {
            return 1; //如果当前有空单，指定返回值为N，就是平N手空单。
        }
    });
}
```

> Detail

https://www.fmz.com/strategy/60287

> Last Modified

2018-04-23 17:42:32
