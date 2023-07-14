
> Name

通过HttpQuery直接获取币安K线数据

> Author

夏天不打你





> Source (javascript)

``` javascript
// GetRecords_Binance_Swap("5m", "ETHUSDT")
// GetRecords_Binance_Swap("4h", "ETHUSDT")
function GetRecords_Binance_Swap(period, symbol) {
    //  var url = "https://api.binance.com/api/v3/klines?symbol=" + symbol + "&interval=" + period    // 现货
    var url = "https://fapi.binance.com/fapi/v1/klines?symbol=" + symbol + "&interval=" + period       //  U本位永续
    var ret = HttpQuery(url)

    try {
        var jsonData = JSON.parse(ret)
        var records = []
        for (var i = 0; i < jsonData.length; i++) {
            records.push({
                Time: jsonData[i][0],
                High: Number(jsonData[i][2]),
                Open: Number(jsonData[i][1]),
                Low: Number(jsonData[i][3]),
                Close: Number(jsonData[i][4]),
                Volume: Number(jsonData[i][5]),
            });
        }
        return records
    } catch (e) {
        Log(e)
    }
}
```

> Detail

https://www.fmz.com/strategy/334026

> Last Modified

2021-12-07 20:17:06
