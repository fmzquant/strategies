
> Name

多交易所并发插件

> Author

@cqz



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|AsyncTimeout|2000|异步操作超时|


> Source (javascript)

``` javascript
/*
-- 策略引用该模板以后直接用 $.Test() 调用此方法
-- main 函数在策略中不会触发, 只做为模板调试的入口
*/

//AsyncTimeout

function asyncExchangeCmd(param) {
    let beginTime = new Date().getTime();
    let elapses = [];
    let results = [];
    while (true) {
        for (let i = 0; i < exchanges.length; i++) {
            if (results[i] == null && (elapses[i] == null || elapses[i] <= AsyncTimeout)) {
                // 创建异步操作
                results[i] = exchanges[i].Go.apply(this, param)
            }
        }
        let failed = 0;
        for (let i = 0; i < exchanges.length; i++) {
            if (results[i] == null) {
                continue;
            }
            if (typeof (results[i].wait) != "undefined") {
                // 等待结果
                let result = results[i].wait(2);
                if (typeof (result) != "undefined") {
                    if (result) {
                        results[i] = result;
                    } else {
                        // 重试
                        results[i] = null;
                        failed++;
                    }
                } else {
                    failed++;
                }
                elapses[i] = new Date().getTime() - beginTime;
            }
        }
        if (failed === 0) {
            break;
        }
    }
    let failed = 0;
    for (let i = 0; i < exchanges.length; i++) {
        if (results[i] == null) {
            failed++;
        }
    }
    let finishTime = new Date().getTime();
    return {
        "failed": failed,
        "totalElapse": finishTime - beginTime,
        "elapses": elapses,
        "results": results
    };
}

$.GetTickerInfo = function () {
    return asyncExchangeCmd(["GetTicker"]);
};


$.GetDepthInfo = function () {
    return asyncExchangeCmd(["GetDepth"]);
};

function main() {
    var depthInfo = $.GetDepthInfo();
    Log(JSON.stringify(depthInfo));
}
```

> Detail

https://www.fmz.com/strategy/365412

> Last Modified

2022-05-24 17:55:21
