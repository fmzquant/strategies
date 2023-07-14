
> Name

Bitmex获取amount

> Author

扁豆子





> Source (javascript)

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
    XLMUSDT: 0.001,
    BNBUSDT: 0.000001,
    SOLUSDT: 0.00001,
    FILUSDT: 0.000001,
    VETUSDT: 0.001,
    MATICUSDT: 0.0001,
    AAVEUSDT: 0.000001,
    SUSHIUSDT: 0.00001,
    AXSUSDT: 0.00001,
    SRMUSDT: 0.00001,
    LUNAUSD: 0.00001,
    AVAXUSD: 0.00001,
}

function Bitmex_amount(symbol, value, price) {
    var amount = 0
    if (symbol == "XBT") {
        amount = value * price / config.XBTUSD
        if (amount <= 100) {
            amount = 100
        } else {
            amount = 100 * _N(amount / 100, 0)
        }
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
    if (symbol == "BNB") {
        amount = value / price / config.BNBUSDT
    }
    if (symbol == "SOL") {
        amount = value / price / config.SOLUSDT
    }
    if (symbol == "FIL") {
        amount = value / price / config.FILUSDT
    }
    if (symbol == "VET") {
        amount = value / price / config.VETUSDT
    }
    if (symbol == "MATIC") {
        amount = value / price / config.MATICUSDT
    }
    if (symbol == "AAVE") {
        amount = value / price / config.AAVEUSDT
    }
    if (symbol == "SUSHI") {
        amount = value / price / config.SUSHIUSDT
    }
    if (symbol == "AXS") {
        amount = value / price / config.AXSUSDT
    }
    if (symbol == "SRM") {
        amount = value / price / config.SRMUSDT
    }
    if (symbol == "LUNA") {
        amount = value / price / config.LUNAUSD
    }
    if (symbol == "AVAX") {
        amount = value / price / config.AVAXUSD
    }
    amount = _N(amount, 0)
    if (amount > 0) {
        return amount
    }
    if (amount < 1) {
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
    if (symbol == "BNB") {
        value = amount * config.BNBUSDT * price
    }
    if (symbol == "SOL") {
        value = amount * config.SOLUSDT * price
    }
    if (symbol == "FIL") {
        value = amount * config.FILUSDT * price
    }
    if (symbol == "VET") {
        value = amount * config.VETUSDT * price
    }
    if (symbol == "MATIC") {
        value = amount * config.MATICUSDT * price
    }
    if (symbol == "AAVE") {
        value = amount * config.AAVEUSDT * price
    }
    if (symbol == "SUSHI") {
        value = amount * config.SUSHIUSDT * price
    }
    if (symbol == "AXS") {
        value = amount * config.AXSUSDT * price
    }
    if (symbol == "SRM") {
        value = amount * config.SRMUSDT * price
    }
    if (symbol == "LUNA") {
        value = amount * config.LUNAUSD * price
    }
    if (symbol == "AVAX") {
        value = amount * config.AVAXUSD * price
    }
    value = _N(parseFloat(value), 8)
    if (value > 0) {
        return value
    }
    if (value <= 0) {
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

> Detail

https://www.fmz.com/strategy/223326

> Last Modified

2021-10-01 11:02:46
