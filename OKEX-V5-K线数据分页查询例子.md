
> Name

OKEX-V5-K线数据分页查询例子

> Author

小小梦

> Strategy Description

## OKEX V5 K线数据分页查询例子

由于OKEX V5接口一次调用最多只有100根，需要分页查询。所以封装了一个例子，如何分页查询K线接口，获取1440根K线数据。

```js
function main() {
    // 访问接口获取数据
    var r = GetRecords("ETH-USDT-SWAP", "1H")   // 例如获取ETH U本位永续合约的1小时K线数据

    // 输出数据
    Log("K线数据：", r)
    Log("K线数据数量：", r.length)

    // 画图输出
    $.PlotRecords(r, "K")

    // 简单验证
    for (var i = 0 ; i < r.length - 1 ; i++) {
        if (r[i + 1].Time - r[i].Time != 1000 * 60 * 60) {
            Log(_D(r[i + 1].Time), _D(r[i].Time), r[i + 1].Time - r[i].Time)
        }
    }
}
```

![IMG](https://www.fmz.com/upload/asset/16d33bb293b09726b5dc.png) 

```main```函数是使用例子，其它函数可以摘出来直接使用。



> Source (javascript)

``` javascript
function encodeParams(params) {
    var ret = ""
    var index = 0
    for (var key in params) {
        if (index == 0) {
            ret += key + "=" + params[key]
        } else {
            ret += "&" + key + "=" + params[key]
        }
        index++
    }
    return ret
}

function GetRecords(symbol, period) {
    /*
    https://www.okex.com
    GET /api/v5/market/candles   instId   after   before   bar  limit  
    [1m/3m/5m/15m/30m/1H/2H/4H/6H/12H/1D/1W/1M/3M/6M/1Y]
    */
    var arr = []
    var after = 0
    while (true) {
        var params = {
            "instId": symbol,
            "bar": period,
            "limit": 100,
        }
        if (after != 0) {
            params["after"] = after
        }
        var query = encodeParams(params)
        try {
            var ret = HttpQuery("https://www.okex.com/api/v5/market/candles?" + query)
            /*
            {
                "code":"0",
                "msg":"",
                "data":[
                 [
                    "1597026383085",
                    "3.721",
                    "3.743",
                    "3.677",
                    "3.708",
                    "8422410",
                    "22698348.04828491"
                ],
                [
                    "1597026383085",   // ts
                    "3.731",           // o
                    "3.799",           // h
                    "3.494",           // l
                    "3.72",            // c
                    "24912403",        // vol
                    "67632347.24399722"
                ]
                ]
            }
            */
            var r = JSON.parse(ret).data
            for (var i = 0 ; i < r.length ; i++) {
                var record = {}
                record.Time = parseInt(r[i][0])
                record.High = parseFloat(r[i][2])
                record.Open = parseFloat(r[i][1])
                record.Low = parseFloat(r[i][3])
                record.Close = parseFloat(r[i][4])
                record.Volume = parseFloat(r[i][5])
                arr.push(record)
                after = record.Time
            }
            if (arr.length >= 1440 || r.length == 0) {
                break
            }
        } catch (e) {
            Log("e.name:", e.name, "e.stack:", e.stack, "e.message:", e.message)
            return
        }
        Sleep(1000)
    }
    arr.reverse()
    return arr
}


function main() {
    // 访问接口获取数据
    var r = GetRecords("ETH-USDT-SWAP", "1H")

    // 输出数据
    Log("K线数据：", r)
    Log("K线数据数量：", r.length)

    // 画图输出
    $.PlotRecords(r, "K")

    // 简单验证
    for (var i = 0 ; i < r.length - 1 ; i++) {
        if (r[i + 1].Time - r[i].Time != 1000 * 60 * 60) {
            Log(_D(r[i + 1].Time), _D(r[i].Time), r[i + 1].Time - r[i].Time)
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/316500

> Last Modified

2021-09-15 15:11:48
