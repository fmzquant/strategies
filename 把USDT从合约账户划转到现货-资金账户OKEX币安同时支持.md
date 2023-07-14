
> Name

把USDT从合约账户划转到现货-资金账户OKEX币安同时支持

> Author

夏天不打你





> Source (javascript)

``` javascript
function main() {
    transferToMain(100);
}

// 从U本位合约钱包向现货钱包划转指定数量的USDT
function transferToMain(amount){
    var ret = null;
    if (isOKexExchange()) {
        let param = "ccy=USDT" + "&from=18" + "&amt=" + amount.toString() + "&to=6";
        ret = exchange.IO("api", "POST", "/api/v5/asset/transfer", param);
    } else if (isBinanceExchange()) {
        let time = UnixNano() / 1000000;
        let param = "type=UMFUTURE_MAIN" + "&asset=USDT" + "&amount=" + amount.toString() + "&timestamp=" + time.toString();
        exchange.SetBase('https://api.binance.com');
        ret = exchange.IO("api", "POST", "/sapi/v1/asset/transfer", param);
        exchange.SetBase('https://fapi.binance.com');
    } else {
        Log("资金划转失败，不支持的交易所！");
    }
    if (ret) {
        Log("已经从合约划转到现货账户: ", amount, " USDT");
        return true;
    } else {
        Log("资金划转失败！");
        return false;
    }
}

// 判断是否币安交易所
function isBinanceExchange() {
    if (exchange.GetName() == "Futures_Binance") {
        return true;
    }
    return false;
}

// 判断是否OKEX交易所
function isOKexExchange() {
    if (exchange.GetName() == "Futures_OKCoin") {
        return true;
    }
    return false;
}
```

> Detail

https://www.fmz.com/strategy/338145

> Last Modified

2021-12-30 16:11:11
