
> Name

JavaScript版分页查询K线历史数据模板教学

> Author

小小梦

> Strategy Description

相关文章参考：https://www.fmz.com/bbs-topic/10105



> Source (javascript)

``` javascript
/**
 * desc: $.GetRecordsByLength 是该模板类库的接口函数，该函数用于获取指定K线长度的K线数据
 * @param {Object} e - 交易所对象
 * @param {Int} period - K线周期，秒数为单位
 * @param {Int} length - 指定获取的K线数据的长度，具体和交易所接口限制有关
 * @returns {Array<Object>} - K线数据
 */
$.GetRecordsByLength = function(e, period, length) {
    if (!Number.isInteger(period) || !Number.isInteger(length)) {
        throw "params error!"
    }

    var exchangeName = e.GetName()
    if (exchangeName == "Futures_Binance") {
        return getRecordsForFuturesBinance(e, period, length)
    } else {
        throw "not support!"
    }
}

/**
 * desc: getRecordsForFuturesBinance 币安期货交易所获取K线数据函数的具体实现
 * @param {Object} e - 交易所对象
 * @param {Int} period - K线周期，秒数为单位
 * @param {Int} length - 指定获取的K线数据的长度，具体和交易所接口限制有关
 * @returns {Array<Object>} - K线数据
 */
function getRecordsForFuturesBinance(e, period, length) {
    var contractType = e.GetContractType()
    var currency = e.GetCurrency()
    var strPeriod = String(period)

    var symbols = currency.split("_")
    var baseCurrency = ""
    var quoteCurrency = ""
    if (symbols.length == 2) {
        baseCurrency = symbols[0]
        quoteCurrency = symbols[1]
    } else {
        throw "currency error!"
    }

    var realCt = e.SetContractType(contractType)["instrument"]
    if (!realCt) {
        throw "realCt error"
    }
    
    // m -> 分钟; h -> 小时; d -> 天; w -> 周; M -> 月
    var periodMap = {}
    periodMap[(60).toString()] = "1m"
    periodMap[(60 * 3).toString()] = "3m"
    periodMap[(60 * 5).toString()] = "5m"
    periodMap[(60 * 15).toString()] = "15m"
    periodMap[(60 * 30).toString()] = "30m"
    periodMap[(60 * 60).toString()] = "1h"
    periodMap[(60 * 60 * 2).toString()] = "2h"
    periodMap[(60 * 60 * 4).toString()] = "4h"
    periodMap[(60 * 60 * 6).toString()] = "6h"
    periodMap[(60 * 60 * 8).toString()] = "8h"
    periodMap[(60 * 60 * 12).toString()] = "12h"
    periodMap[(60 * 60 * 24).toString()] = "1d"
    periodMap[(60 * 60 * 24 * 3).toString()] = "3d"
    periodMap[(60 * 60 * 24 * 7).toString()] = "1w"
    periodMap[(60 * 60 * 24 * 30).toString()] = "1M"
    
    var records = []
    var url = ""
    if (quoteCurrency == "USDT") {
        // GET https://fapi.binance.com  /fapi/v1/klines  symbol , interval , startTime , endTime , limit 
        // limit 最大值:1500

        url = "https://fapi.binance.com/fapi/v1/klines"
    } else if (quoteCurrency == "USD") {
        // GET https://dapi.binance.com  /dapi/v1/klines  symbol , interval , startTime , endTime , limit
        // startTime 与 endTime 之间最多只可以相差200天
        // limit 最大值:1500

        url = "https://dapi.binance.com/dapi/v1/klines"
    } else {
        throw "not support!"
    }

    var maxLimit = 1500
    var interval = periodMap[strPeriod]
    if (typeof(interval) !== "string") {
        throw "period error!"
    }

    var symbol = realCt
    var currentTS = new Date().getTime()

    while (true) {
        // 计算limit
        var limit = Math.min(maxLimit, length - records.length)
        var barPeriodMillis = period * 1000
        var rangeMillis = barPeriodMillis * limit
        var twoHundredDaysMillis = 200 * 60 * 60 * 24 * 1000
        
        if (rangeMillis > twoHundredDaysMillis) {
            limit = Math.floor(twoHundredDaysMillis / barPeriodMillis)
            rangeMillis = barPeriodMillis * limit
        }

        var query = `symbol=${symbol}&interval=${interval}&endTime=${currentTS}&limit=${limit}`
        var retHttpQuery = HttpQuery(url + "?" + query)
        
        var ret = null 
        try {
            ret = JSON.parse(retHttpQuery)
        } catch(e) {
            Log(e)
        }
        
        if (!ret || !Array.isArray(ret)) {
            return null
        }
        
        // 超出交易所可查询范围，查询不到数据时
        if (ret.length == 0 || currentTS <= 0) {
            break
        }

        for (var i = ret.length - 1; i >= 0; i--) {
            var ele = ret[i]
            var bar = {
                Time : parseInt(ele[0]),
                Open : parseFloat(ele[1]),
                High : parseFloat(ele[2]),
                Low : parseFloat(ele[3]), 
                Close : parseFloat(ele[4]),
                Volume : parseFloat(ele[5])
            }

            records.unshift(bar)
        }

        if (records.length >= length) {
            break
        }

        currentTS -= rangeMillis
        Sleep(1000)
    }

    return records
}

/**
 * desc: $.UpdataRecords 是该模板类库的接口函数，该函数用于更新K线数据
 * @param {Object} e - 交易所对象
 * @param {Array<Object>} records - 需要更新的K线数据源
 * @param {Int} period - K线周期，需要和records参数传入的K线数据周期一致
 * @returns {Bool}  - 是否更新成功
 */
$.UpdataRecords = function(e, records, period) {
    var r = e.GetRecords(period)
    if (!r) {
        return false 
    }

    for (var i = 0; i < r.length; i++) {
        if (r[i].Time > records[records.length - 1].Time) {
            // 添加新Bar
            records.push(r[i])
            // 更新上一个Bar
            if (records.length - 2 >= 0 && i - 1 >= 0 && records[records.length - 2].Time == r[i - 1].Time) {
                records[records.length - 2] = r[i - 1]
            }            
        } else if (r[i].Time == records[records.length - 1].Time) {
            // 更新Bar
            records[records.length - 1] = r[i]
        }
    }
    return true
}

// 模板测试函数
function main() {
    Log("当前测试的交易所：", exchange.GetName())

    // 如果是期货则需要设置合约
    exchange.SetContractType("swap")

    // 使用$.GetRecordsByLength获取指定长度的K线数据，指定周期为60秒，即一分钟K线，指定长度为8000根
    var r = $.GetRecordsByLength(exchange, 60, 8000)
    Log(r)

    // 检测数据
    var diffTime = r[1].Time - r[0].Time 
    Log("diffTime:", diffTime, " ms")
    for (var i = 0; i < r.length; i++) {
        for (var j = 0; j < r.length; j++) {
            // 检查重复Bar
            if (i != j && r[i].Time == r[j].Time) {
                Log(r[i].Time, i, r[j].Time, j)
                throw "有重复Bar"
            }
        }
        
        // 检查Bar连续性
        if (i < r.length - 1) {            
            if (r[i + 1].Time - r[i].Time != diffTime) {
                Log("i:", i, ", diff:", r[i + 1].Time - r[i].Time, ", r[i].Time:", r[i].Time, ", r[i + 1].Time:", r[i + 1].Time)
                throw "Bar不连续"
            }            
        }
    }
    Log("检测通过")
    Log("$.GetRecordsByLength函数返回的数据长度：", r.length)

    // 使用GetRecords函数获取的数据更新r
    while (true) {
        $.UpdataRecords(exchange, r, 60)
        LogStatus(_D(), ", r.length:", r.length)
        Log(_D(r[r.length - 1].Time), r[r.length - 1])
        Sleep(5000)
    }
}
```

> Detail

https://www.fmz.com/strategy/418803

> Last Modified

2023-06-27 15:24:55
