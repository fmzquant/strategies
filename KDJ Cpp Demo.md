
> 策略名称

KDJ Cpp Demo

> 策略作者

Zero





> 源码 (cpp)

``` cpp
/*backtest
start: 2019-02-26 09:00:00
end: 2019-03-27 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

double position = 0;

bool onTick(string symbol) {
    auto ct = exchange.SetContractType(symbol);
    if (ct == false) {
        return false;
    }
    auto r = exchange.GetRecords();
    if (!r.Valid || r.size() < 10) {
        return false;
    }

    auto arr = TA.KDJ(r, 9, 3, 3);
    auto k = arr[0][arr[0].size() - 2];
    auto d = arr[1][arr[1].size() - 2];
    auto dPre = arr[1][arr[1].size() - 3];
    auto j = arr[2][arr[2].size() - 2];
    string action;
    if ((d < dPre && position > 0) || (d > dPre && position < 0)) {
        action = "cover";
    } else if (k > d && position <= 0) {
        action = "buy";
    } else if (k < d && position >= 0) {
        action = "sell";
    }
    if (action.size() > 0) {
        position = ext::Trade(action, symbol, 1);
    }
    return true;
}

void main() {
    while (true) {
        if (exchange.IO("status") == 0) {
            Sleep(1000);
            continue;
        }
        if (!onTick("MA888")) {
            Sleep(1000);
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/142260

> 更新时间

2019-03-29 10:21:16
