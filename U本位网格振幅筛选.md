
> Name

U本位网格振幅筛选

> Author

ChaoZhang

> Strategy Description

找出平均振幅最大的币种,用于网格交易

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Day|30|Day|


> Source (javascript)

``` javascript

/* jshint esversion: 6 */
// var Day = 30; //统计天数
var Quote = "USDT"; //计价货币,BUSD或者USDT
function GetAmplitude(klineList) {
    let ret = {
        ampl: 0,
        change: 0,
        maxAmpl: 0,
        maxAmplTime: 0,
        minAmpl: 100,
        minAmplTime: 0,
        maxChange: 0,
        minChange: 0,
        avgAmpl: 0,
        avgChange: 0,
        day: 0,
    };
    for (let i = 0; i < klineList.length; i++) {
        const item = klineList[i];
        amp = (parseFloat(item.High - item.Low) / parseFloat(item.Open)) * 100.0; //振幅
        change = (parseFloat(item.Close - item.Open) / parseFloat(item.Open)) * 100.0; //涨幅
        if (amp > ret.maxAmpl) {
            ret.maxAmpl = amp;
            ret.maxAmplTime = item.Time;
        }
        if (amp < ret.minAmpl) {
            ret.minAmpl = amp;
            ret.minAmplTime = item.Time;
        }
        if (change > ret.maxChange) {
            ret.maxChange = change;
        }
        if (change < ret.minChange) {
            ret.minChange = change;
        }
        ret.ampl += amp;
        ret.change += change;
        ret.day = i + 1;
    }
    ret.avgAmpl = ret.ampl / klineList.length;
    ret.avgChange = ret.change / klineList.length;
    return ret;
}

function main() {
    exchange.SetContractType("swap");
    exchange.SetMaxBarLen(1000);
    let table = {
        type: "table",
        title: "振幅信息",
        cols: ["币种", "天数", "平均振幅%", "最大振幅%", "最大振幅时间", "最小振幅", "最小振幅时间", "总振幅%", "平均涨跌幅%", "最大涨幅%", "最大跌幅%", "涨跌幅%"],
        rows: [],
    };
    let info = exchange.IO("api", "GET", "/fapi/v1/exchangeInfo");
    for (let i = 0; i < info.symbols.length; i++) {
        const ele = info.symbols[i];
        if (ele.contractType == "PERPETUAL" && ele.status == "TRADING" && ele.quoteAsset == Quote) {
            let symbol = ele.baseAsset + "_" + Quote;
            exchange.SetCurrency(symbol);
            let records = exchange.GetRecords(PERIOD_D1);
            if (records.length < Day) {
                Log(symbol, records.length);
                continue; //只统计够天数的币种
            }
            let ampls = GetAmplitude(records.splice(-1 * (Day + 1), Day));
            // 
            table.rows.push([
                symbol, //币种
                ampls.day, //天数
                _N(ampls.avgAmpl, 2), //平均振幅
                _N(ampls.maxAmpl, 2), //最大振幅
                _D(ampls.maxAmplTime), //最大振幅时间
                _N(ampls.minAmpl, 2), //最小振幅
                _D(ampls.minAmplTime), //最小振幅时间
                _N(ampls.ampl, 2), //总振幅
                _N(ampls.avgChange, 2), //平均涨幅
                _N(ampls.maxChange, 2), //最大涨幅
                _N(ampls.minChange, 2), //最小涨幅
                _N(ampls.change, 2), //总涨幅
            ]);
        }
    }
    LogStatus("`" + JSON.stringify(table) + "`\n");
}

```

> Detail

https://www.fmz.com/strategy/364968

> Last Modified

2024-01-08 17:52:48
