
> 策略名称

【测试】不同交易对、不同周期的K线数据最好分别用单独的变量来保存

> 策略作者

韬奋量化

> 策略描述

使用同一个变量值保存不同交易对的K线数据会导致错误，会使程序紊乱。

如果不同交易对的K线数据分别用单独的变量来保存，就没有报错了。

正如小小梦所说：exchange.GetRecords() 返回的不是副本，是个引用。

（不明觉厉。我感觉副本大概像是在黑板上写粉笔字，把旧的字擦掉，然后写上新的字。但是引用可能是屏幕投影，一个屏幕对应一个投影仪，如果我们把几个投影仪同时对准同一块屏幕，那么影像就重叠了，信息就紊乱了。）

=====我是低调的分界线=====

好的交易平台可以让你的策略扶摇直上九万里，通过链接注册可获得两个月VIP5的手续费率优惠：
（现货：挂单0%，吃单0.07%。合约：挂单0%，吃单0.04%）
https://www.kucoin.cc/ucenter/signup?rcode=1wxJ2fQ&lang=zh_CN&utmsource=VIP_TF



> 源码 (javascript)

``` javascript
/*backtest
start: 2020-12-09 00:00:00
end: 2020-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Huobi","currency":"BTC_USDT"}]
*/

var Symbols;

//if (IsVirtual() | exchange.GetName == "WexApp") {
Symbols = "BTC,ETH,LTC,EOS"; //    
//}

var symbols = Symbols.split(',');
for (i = 0; i <= symbols.length - 1; i++) {
    symbols[i] = symbols[i] + "_USDT";
}

var messages = [];

for (i = 0; i <= symbols.length - 1; i++) {
    messages[i] = {
        symbol: symbols[i],
        D2: {
            Kcycle: "2日",
            record: []
        },
        D1: {
            Kcycle: "1日",
            record: []
        },
        H6: {
            Kcycle: "6小时",
            record: []
        },
        H4: {
            Kcycle: "4小时",
            record: []
        },
        H2: {
            Kcycle: "2小时",
            record: []
        },
        H1: {
            Kcycle: "1小时",
            record: []
        }
    };
}

Log(messages);

//获取K线数据
function Get_Records(cycle) {
    //var records = _C(exchange.GetRecords, cycle);
    var records = exchange.GetRecords(cycle);//通过同一个变量去获取不同交易对、不同周期的K线数据，是错误的做法，会导致程序出错
    Log(cycle, ": ", records);

    //打印每一根K线
    for (i = 0; i <= records.length - 1; i++) {
        Log(records[i]);
    }

    Log(_D(records[records.length - 1].Time), ": ", records.length)
    return records;

}

function main() {
    for (i = 0; i <= symbols.length - 1; i++) {

        exchange.SetCurrency(symbols[i]);
        //exchange.IO("currency", symbols[i]);
        //Log(symbols[i]);
        if (IsVirtual() | exchange.GetName == "WexApp") {

        } else {
            exchange.SetContractType('swap');
        }
        
        /*错误的做法：通过同一个函数Get_Records()去获取不同交易对、不同周期的K线数据。
        由于函数Get_Records()中只有1个变量records来临时保存K线数据，会导致代码报错。
        messages[i].D2.record = Get_Records(PERIOD_D1 * 2);
        messages[i].D1.record = Get_Records(PERIOD_D1);
        messages[i].H6.record = Get_Records(PERIOD_H1 * 6);
        messages[i].H4.record = Get_Records(PERIOD_H1 * 4);
        messages[i].H2.record = Get_Records(PERIOD_H1 * 2);
        messages[i].H1.record = Get_Records(PERIOD_H1);
        */

        //正确的做法：不同交易对、不同周期的K线数据最好分别用单独的变量来保存。
        messages[i].D2.record = exchange.GetRecords(PERIOD_D1 * 2);
        Log(PERIOD_D1 * 2, ": ", messages[i].D2.record);
        Log(_D(messages[i].D2.record[messages[i].D2.record.length - 1].Time), ": ", messages[i].D2.record.length);
        
        messages[i].D1.record = exchange.GetRecords(PERIOD_D1);
        Log(PERIOD_D1 * 1, ": ", messages[i].D1.record);
        Log(_D(messages[i].D1.record[messages[i].D1.record.length - 1].Time), ": ", messages[i].D1.record.length);        
        
        messages[i].H6.record = exchange.GetRecords(PERIOD_H1 * 6);
        Log(PERIOD_H1 * 6, ": ", messages[i].H6.record);
        Log(_D(messages[i].H6.record[messages[i].H6.record.length - 1].Time), ": ", messages[i].H6.record.length);        
        
        messages[i].H4.record = exchange.GetRecords(PERIOD_H1 * 4);
        Log(PERIOD_H1 * 4, ": ", messages[i].H4.record);
        Log(_D(messages[i].H4.record[messages[i].H4.record.length - 1].Time), ": ", messages[i].H4.record.length);        
        
        messages[i].H2.record = exchange.GetRecords(PERIOD_H1 * 2);
        Log(PERIOD_H1 * 2, ": ", messages[i].H2.record);
        Log(_D(messages[i].H2.record[messages[i].H2.record.length - 1].Time), ": ", messages[i].H2.record.length);        
        
        messages[i].H1.record = exchange.GetRecords(PERIOD_H1);
        Log(PERIOD_H1 * 1, ": ", messages[i].H1.record);
        Log(_D(messages[i].H1.record[messages[i].H1.record.length - 1].Time), ": ", messages[i].H1.record.length);        

    }
}
```

> 策略出处

https://www.fmz.com/strategy/249318

> 更新时间

2021-01-20 15:20:40
