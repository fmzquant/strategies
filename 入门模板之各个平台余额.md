
> Name

入门模板之各个平台余额

> Author

Zero

> Strategy Description

查看各个平台的余额和货币数量

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|DisableRate|false|禁用汇率转换|


> Source (javascript)

``` javascript
function main() {
    for (var i = 0; i < exchanges.length; i++) {
        if (DisableRate) {
            exchanges[i].SetRate(1);
        }

        if (exchanges[i].GetName().indexOf('CTP') != -1) {
            while (!exchanges[i].IO("status")) {
                LogStatus("正在等待" + exchanges[i].GetLabel() + "连接到交易所服务器, 行情服务器: " + (exchanges[i].IO("status", 0) ? '正常' : '断开') + ', 交易服务器: ' + (exchanges[i].IO("status", 1) ? '正常' : '断开'));
                Sleep(1000);
            }
            LogStatus("连接成功");
        }

        while (true) {
            var account = exchanges[i].GetAccount();
            if (account) {
                Log(exchanges[i].GetName(), exchanges[i].GetLabel(), exchanges[i].GetCurrency(), exchanges[i].GetAccount());
                break;
            }
            Sleep(3000);
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/48

> Last Modified

2016-07-25 16:10:13
