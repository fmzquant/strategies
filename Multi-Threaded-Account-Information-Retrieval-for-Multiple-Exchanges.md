
> Name

Multi-Threaded-Account-Information-Retrieval-for-Multiple-Exchanges

> Author

Zero

> Strategy Description

Retrieve account information from multiple exchanges concurrently with multithreading.

> Source (javascript)

``` javascript
function main() {
    var accounts = [];
    while (true) {
        for (var i = 0; i < exchanges.length; i++) {
            if (accounts[i] == null) {
                // 创建异步操作
                accounts[i] = exchanges[i].Go("GetAccount");
            }
        }
        var failed = 0;
        for (var i = 0; i < exchanges.length; i++) {
            if (typeof(accounts[i].wait) != "undefined") {
                // 等待结果
                var ret = accounts[i].wait();
                if (ret) {
                    accounts[i] = ret;
                    Log(exchanges[i].GetName(), accounts[i]);
                } else {
                    // 重试
                    accounts[i] = null;
                    failed++;
                }
            }
        }
        if (failed == 0) {
            break;
        } else {
            Sleep(100);
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/3297

> Last Modified

2014-12-11 03:56:53
