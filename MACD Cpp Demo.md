
> 策略名称

MACD Cpp Demo

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
    if (!r.Valid || r.size() < 20) {
        return false;
    }

    auto macd = TA.MACD(r);
    auto slow = macd[0][macd[0].size() - 2];
    auto fast = macd[1][macd[1].size() - 2];
    string action;
    if (fast >= slow && position <= 0) {
        action = "buy";
    } else if (fast <= slow && position >= 0) {
        action = "sell";
    }
    if (action.size() > 0) {
        if (position != 0) {
            ext::Trade("cover", symbol);
        }
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

https://www.fmz.com/strategy/142259

> 更新时间

2019-03-29 10:21:35
