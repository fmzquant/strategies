
> Name

boll傻瓜版

> Author

sabar





> Source (javascript)

``` javascript
 function main (){
    $.CTA("BTC_USDT", function(st){
        var r = st.records; //获取K线数组
        if (r.Length <20) return; // 过滤K线长度
        var close = r[r.length - 2].close; //获取上根K线收盘价
        var mp = st. positLon.amount; //获取持仓信息

        var boll = TA.BOLL(r, 20, 2); // 计算布林带指标
        var upLine = boll[0];
        //获取上轨数组
        var midLine = boll[1]; //获取中轨数组
        var downLine = boll[2];//获取下轨数组
        var upPrice = upLine [upLine.length -2];
        //获取上根K线的上轨数组
        var midPrice = midLine[midLine.length -2]; 
        //获取上根K线的中轨数姐
        var downPrice = downLine[ downLine.length -2];
        //获取上根K线的下轨数组
        if(mp == 1 && (close < midPrice)) return -1; //如果持多单，并且收盘价小于中轨。平多
        if (mp == -1 && (close > midPrice)) return 1; //如果持空单， 并且收盘价大于中轨。 平空
        if (mp == 0 && close > midPrice) return 1; //如果无持仓，井且收盘价大于上轨。 开多
        if (mp == 0 && close < midPrice) return -1; //如果无持仓， 并且收盘价小于 下轨。 开空
    });
 }     
```

> Detail

https://www.fmz.com/strategy/318249

> Last Modified

2021-09-23 09:43:52
