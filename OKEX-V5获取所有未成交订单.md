
> Name

OKEX-V5获取所有未成交订单

> Author

夏天不打你





> Source (javascript)

``` javascript


function getAllPendingOrdersInOkex(num) {
    var pending_orders = [];

    // 限价单
    var param = "instType=SWAP";
    var ret = exchanges[num].IO("api", "GET", "/api/v5/trade/orders-pending", param);
    // 止盈止损单
    param = "instType=SWAP" + "&ordType=oco,conditional";
    var ret2 = exchanges[num].IO("api", "GET", "/api/v5/trade/orders-algo-pending", param);

    if (!ret) {
        Log(exchanges[num].GetLabel(), "：限价挂单获取失败！", "@");
        return null;
    }
    if (!ret2) {
        Log(exchanges[num].GetLabel(), "：止盈止损挂单获取失败！", "@");
        return null;
    }

    for (let i = 0; i < ret.data.length; i++) {
        let type = "";
        if (ret.data[i].posSide == "long") {
            type = ret.data[i].side == "buy" ? "限价开多" : "限价平多";
        } else if (ret.data[i].posSide == "short") {
            type = ret.data[i].side == "sell" ? "限价开空" : "限价平空";
        } else {
            type = "挂单类型错误";
        }
        let symbol = ret.data[i].instId.replace("-USDT-SWAP", "") + "_USDT";
        pending_orders.push({
            OrderId: ret.data[i].ordId,
            Symbol: symbol,
            Price: Number(ret.data[i].px),
            Amount: Number(ret.data[i].sz),
            DealAmount: Number(ret.data[i].accFillSz),
            Type: type,
            StopPrice: 0,
            TakeProfitPrice: 0,
            Time: ret.data[i].uTime,
        });
    }
    for (let i = 0; i < ret2.data.length; i++) {
        let type = "";
        let stop_price = 0;
        let take_profit_price = 0;
        if (ret2.data[i].slTriggerPx && ret2.data[i].tpTriggerPx) {
            type = ret2.data[i].posSide == "long" ? "多单止盈止损" : "空单止盈止损";
            stop_price = Number(ret2.data[i].slTriggerPx);
            take_profit_price = Number(ret2.data[i].tpTriggerPx);
        } else if (ret2.data[i].slTriggerPx) {
            type = ret2.data[i].posSide == "long" ? "多单止损" : "空单止损";
            stop_price = Number(ret2.data[i].slTriggerPx);         
        } else if (ret2.data[i].tpTriggerPx) {
            type = ret2.data[i].posSide == "long" ? "多单止盈" : "空单止盈";
            take_profit_price = Number(ret2.data[i].tpTriggerPx);       
        } else {
            type = "挂单类型错误";
        }
        let symbol = ret2.data[i].instId.replace("-USDT-SWAP", "") + "_USDT";
        pending_orders.push({
            OrderId: ret2.data[i].algoId,
            Symbol: symbol,
            Price: 0,
            Amount: Number(ret2.data[i].sz),
            DealAmount: 0,
            Type: type,
            StopPrice: stop_price,
            TakeProfitPrice: take_profit_price,
            Time: ret2.data[i].cTime,
        });
    }

    return pending_orders;
} 

function main() {
    getAllPendingOrdersInOkex(0);
}
```

> Detail

https://www.fmz.com/strategy/340779

> Last Modified

2022-01-14 22:29:20
