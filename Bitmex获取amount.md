
> 策略名称

Bitmex获取amount

> 策略作者

扁豆子





> 源码 (javascript)

``` javascript
config = {
    XBTUSD: 1,
    BCHUSD: 0.000001,
    ETHUSD: 0.000001,
    LTCUSD: 0.000002,
    XRPUSD: 0.0002,
    LINKUSDT: 0.0001,
    ADAUSDT: 0.01,
    DOGEUSDT: 0.001,
    DOTUSDT: 0.0001,
    EOSUSDT: 0.0001,
    UNIUSDT: 0.00001,
    TRXUSDT: 0.001,
    XLMUSDT: 0.001
}

function Bitmex_amount(symbol, value, price) {
    var amount = 0
    if (symbol == "XBT") {
        amount = value * price / config.XBTUSD
    }
    if (symbol == "BCH") {
        amount = value / price / config.BCHUSD
    }
    if (symbol == "ETH") {
        amount = value / price / config.ETHUSD
    }
    if (symbol == "LTC") {
        amount = value / price / config.LTCUSD
    }
    if (symbol == "XRP") {
        amount = value / price / config.XRPUSD
    }
    if (symbol == "LINK") {
        amount = value / price / config.LINKUSDT
    }
    if (symbol == "ADA") {
        amount = value / price / config.ADAUSDT
    }
    if (symbol == "DOGE") {
        amount = value / price / config.DOGEUSDT
    }
    if (symbol == "DOT") {
        amount = value / price / config.DOTUSDT
    }
    if (symbol == "EOS") {
        amount = value / price / config.EOSUSDT
    }
    if (symbol == "UNI") {
        amount = value / price / config.UNIUSDT
    }
    if (symbol == "TRX") {
        amount = value / price / config.TRXUSDT
    }
    if (symbol == "XLM") {
        amount = value / price / config.XLMUSDT
    }
    amount = _N(amount, 0)
    if (amount > 0) {
        return amount
    }
    if (amount < 1){
        return 1
    }
}

function Bitmex_value(symbol, amount, price) {
    var value = 0
    if (symbol == "XBT") {
        value = amount * config.XBTUSD / price
    }
    if (symbol == "BCH") {
        value = amount * config.BCHUSD * price
    }
    if (symbol == "ETH") {
        value = amount * config.ETHUSD * price
    }
    if (symbol == "LTC") {
        value = amount * config.LTCUSD * price
    }
    if (symbol == "XRP") {
        value = amount * config.XRPUSD * price
    }
    if (symbol == "LINK") {
        value = amount * config.LINKUSDT * price
    }
    if (symbol == "ADA") {
        value = amount * config.ADAUSDT * price
    }
    if (symbol == "DOGE") {
        value = amount * config.DOGEUSDT * price
    }
    if (symbol == "DOT") {
        value = amount * config.DOTUSDT * price
    }
    if (symbol == "EOS") {
        value = amount * config.EOSUSDT * price
    }
    if (symbol == "UNI") {
        value = amount * config.UNIUSDT * price
    }
    if (symbol == "TRX") {
        value = amount * config.TRXUSDT * price
    }
    if (symbol == "XLM") {
        value = amount * config.XLMUSDT * price
    }
    value = _N(parseFloat(value), 8)
    if (value > 0) {
        return value
    }
    if (value <= 0){
        return 0
    }
}

$.Bitmex_amount = function(symbol, value, price) {
    return Bitmex_amount(symbol, value, price);
};

$.Bitmex_value = function(symbol, amount, price) {
    return Bitmex_value(symbol, amount, price);
};

// 仅调试模板策略用
function main() {
    id1 = $.Bitmex_amount("XBT", 0.00499979, 12400)
    Log(id1)
    //id2 = $.Bitmex_value("XRP", 1, 0.00002557)
    //Log(id2)
}
```

> 策略出处

https://www.fmz.com/strategy/223326

> 更新时间

2021-04-04 20:24:51
