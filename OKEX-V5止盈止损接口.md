
> Name

OKEX-V5止盈止损接口

> Author

夏天不打你





> Source (javascript)

``` javascript


// 挂多单止损
function longStopLossInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=sell" + "&posSide=long" + "&ordType=conditional" + "&sz=" + size.toString() + "&slTriggerPx=" + price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止损：", ret);
    return true;
}

// 挂多单止盈
function longTakeProfitInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=sell" + "&posSide=long" + "&ordType=conditional" + "&sz=" + size.toString() + "&tpTriggerPx=" + price.toString() + "&tpOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止盈：", ret);
    return true;
}

// 挂空单止损
function shortStopLossInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=buy" + "&posSide=short" + "&ordType=conditional" + "&sz=" + size.toString() + "&slTriggerPx=" + price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止损：", ret);
    return true;
}

// 挂空单止盈
function shortTakeProfitInOkex(num, symbol, price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=buy" + "&posSide=short" + "&ordType=conditional" + "&sz=" + size.toString() + "&tpTriggerPx=" + price.toString() + "&tpOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止盈：", ret);
    return true;
}

// 挂多单止盈止损
function longTpAndSlInOkex(num, symbol, tp_price, sl_price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=sell" + "&posSide=long" + "&ordType=oco" + "&sz=" + size.toString() + "&tpTriggerPx=" + tp_price.toString() + "&tpOrdPx=-1"
                    + "&slTriggerPx=" + sl_price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂多单止盈止损：", ret);
    return true;
}

// 挂空单止盈止损
function shortTpAndSlInOkex(num, symbol, tp_price, sl_price, size) {
    let real_symbol = symbol.replace("_USDT", "") + "-USDT-SWAP";
    var param = "instId=" + real_symbol + "&tdMode=cross" + "&side=buy" + "&posSide=short" + "&ordType=oco" + "&sz=" + size.toString() + "&tpTriggerPx=" + tp_price.toString() + "&tpOrdPx=-1"
                    + "&slTriggerPx=" + sl_price.toString() + "&slOrdPx=-1";
    var ret = exchanges[num].IO("api", "POST", "/api/v5/trade/order-algo", param);
    Log(exchanges[num].GetLabel(), ": 挂空单止盈止损：", ret);
    return true;
}

function main() {
    shortTakeProfitInOkex(0, "ETH_USDT", 2800, 1);
    shortTpAndSlInOkex(0, "ETH_USDT", 2800, 3000, 1);
}
```

> Detail

https://www.fmz.com/strategy/340820

> Last Modified

2022-04-07 19:38:37
