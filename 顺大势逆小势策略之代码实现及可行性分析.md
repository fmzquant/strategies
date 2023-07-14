
> Name

顺大势逆小势策略之代码实现及可行性分析

> Author

深蓝



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|maLen|100|maLen|
|kd1|50|kd1|
|kd2|15|kd2|


> Source (javascript)

``` javascript
//语法固定格式，调用main主函数
function main() {
    
    //调用商品期货交易类库中的CTA框架
    $.CTA("RM000", function(st) {
        
        //获取K线数组
        var j = st.records;
        
        //指标运算参考的最大K线数量
        if (j.length < 100) {
            return;
        }
        
        //获取上根K线的收盘价
        var c = j[j.length - 2].Close;
        
        //获取KDJ指标数组
        var kds = TA.KDJ(j, kd1, kd2, kd2);
        
        //获取KDJ指标K的数组
        var ks = kds[0];
        
        //获取KDJ指标D的数组
        var ds = kds[1];
        
        //获取上根K线的K值
        var k = ks[ks.length - 2].toFixed(2);
        
        //获取上根K线的D值
        var d = ds[ds.length - 2].toFixed(2);
        
        //获取均线数组
        var mas = TA.MA(j, 100);
        
        //获取上根K线的MA值
        var ma = mas[mas.length - 2];
        
        //获取当前的持仓数量，正数指多仓, 负数指空仓, 0则不持仓
        var mp = st.position.amount;
        
        //如果当前持有多单，并且上根K线的K值小于上根K线的D值，平多单
        if (mp > 0 && k < d) {
            return -1; //如果当前有多单，指定返回值为-N，就是平N手多单。
        }

        //如果当前持有空单，并且上根K线的K值大于上根K线的D值，平空单
        if (mp < 0 && k > d) {
            return 1; //如果当前有空单，指定返回值为N，就是平N手空单。
        }

        //如果当前无持仓，并且上根K线的收盘价大于上根K线的MA值，并且上根K线的K值大于上根K线的D值，开多单
        if (mp === 0 && c > ma && k > d) {
            return 1; //如果当前无持仓，指定返回值为N，就是开N手多单。
        }
    
        //如果当前无持仓，并且上根K线的收盘价小于上根K线的MA值，并且上根K线的K值小于上根K线的D值，开空单
        if (mp === 0 && c < ma && k < d) {
            return -1; //如果当前无持仓，指定返回值为-N，就是开N手空单。
        }
    });
}
```

> Detail

https://www.fmz.com/strategy/59356

> Last Modified

2018-05-08 17:00:54
