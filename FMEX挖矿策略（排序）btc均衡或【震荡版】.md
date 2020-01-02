
> 策略名称

FMEX挖矿策略（排序）btc均衡或【震荡版】

> 策略作者

古力十段

> 策略描述

FMex排序挖矿均衡代码使用说明。（注意api地址）（加强版-增加仓位管理-增加时间设定，调整单量,方向等-购买联系微信：ying5737）

保证金市场风险巨大，你可能随时面临100%损失。或有不明bug100%损失，概不负责。

原理：盘口下单随机成交/
//注意：先手动持仓long1u。

- 检测现有订单是否超过界限，如果超过了就立马取消该订单/
- 检测是否成交形成了仓位，如果大于仓位xxu，则减仓到既定仓位以下/

几种情况：
全局挂单：为区别市商策略，特定定义远端排序为挂单，参数为买（35u）单量卖（35u）左右。参数可调。
市商：
最大多头持仓700u，若大于该仓位，约每6s减20u仓位，直到小于700u.
最大空头持仓700u，若大于该仓位，约每6s减20u仓位，直到小于700u.
大于500u多仓启动减多仓策略，挂单为short：卖3卖4卖5（各30u单量）
大于500u空仓，启动减空仓策略，挂单为long：买2买3买4（各30u单量）
正常持仓，SHORT 卖7卖8卖9 long买4买7买8



//可其他账户持仓对冲，对行情有把握后，亦可以单独开

//参数中的备注描述，仅供参考，另可加挡位
风险自负/参数可调，购买加强版联系微信：ying5737

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Url|https://api.fmex.com|交易所api地址|
|g_minPercent|0.05|挂单：挖矿的下限，离最新价的百分比，如果是 1% 则填写 1|
|g_maxPercent|0.05|挂单：挖矿的上限，离最新价的百分比，如果是 1% 则填写 1|
|g_perAmount|35|挂单：每个订单量多少张，最多只能挂50个订单|
|g_kongtouAmount|35|挂单：|
|g_maxHoldingLong|700|挂单：多单最大持仓量|
|g_maxHoldingShort|700|挂单：空单最大持仓量|
|sp_jiancangAmount|true|市商/排序：减仓多仓|
|sp_jiacangAmount|true|市商/排序：增加多仓|
|sp_kongtouAmount|30|市商/排序：	空头数|
|sp_perAmount|30|市商/排序：单个订单大小|
|mainIntervel|false|Intervel|
|Intervel|false|Intervel0|
|sp_baseAmountLong|500|多仓|
|sp_baseAmountShort|500|空仓|


> 源码 (javascript)

``` javascript
exchange.IO("base", Url)//保证金市场风险巨大，你可能随时面临100%损失。或有不明bug100%损失，概不负责。
//实盘地址：https://api.fmex.com 测试网https://api.testnet.fmex.com//注意：先持仓long1u。
var ordersInfo = {//（加强版-增加仓位管理-增加时间设定-调整单量方向等-价格美丽/购买联系微信：ying5737）
    buyId: 0,
    buyPrice: 0,
    sellId: 0,
    sellPrice: 0,
    minPrice: 0,
    maxPrice: 0
}
var depthInfo = {//注意：先手动持仓long1u。
    asks: [],
    bids: []
}
function getTicker(symbol) {
    url = "/v2/market/ticker/" + symbol;
    data = exchange.IO("api", "GET", url);
    return data.data;
}
function getAccounts() {
    data = exchange.IO("api", "GET", "/v3/contracts/accounts")
    return data.data;
}

function createOrderPrice(body) {
    parameter = "symbol=" + body.symbol + "&type=" + body.type + "&direction=" + body.direction + "&post_only=" + body.post_only +  "&price=" + body.price + "&quantity=" + body.quantity;
   
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders", parameter)
    return resultData;
}
function createOrder(body) {
    parameter = "symbol=" + body.symbol + "&type=" + body.type + "&direction=" + body.direction + "&quantity=" + body.quantity;
   
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders", parameter)
    
    return resultData;
}

function getOrders() {
    resultData = exchange.IO("api", "GET", "/v3/contracts/orders/open");
    return resultData.data
}

function cancelOrder(id) {
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders/" + id + "/cancel");
    return resultData;
    
}

function getPosition() {
    resultData = exchange.IO("api", "GET", "/v3/broker/auth/contracts/positions");
    return resultData.data;
}

function getMatches(id) {
    resultData = exchange.IO("api", "GET", "/v3/contracts/orders/" + id + "/matches");
    return resultData.data;
}

function getCandles(resolution, symbol) {
    resultData = exchange.IO("api", "GET", "/v2/market/candles/" + resolution + "/" + symbol);
    return resultData.data;
}
function cleanOrders(lastPrice) {
    ordersInfo = getOrders();
    orders = ordersInfo.results;
    for (var i = 0; i < orders.length; i++) {
        diffPercent = Math.abs(lastPrice - orders[i].price) / lastPrice * 100
        if (diffPercent < g_minPercent || diffPercent > g_maxPercent) {
            orderInfo = cancelOrder(orders[i].id);
         
            Log("挂单取消订单：");
        }
    }
}
function getToOrderPrice(basePrice, direct) {
    return parseInt(basePrice * (direct * (g_minPercent + Math.random() * (g_maxPercent - g_minPercent)) / 100 + 1))
}
function cleanPosition() {
    res = getPosition();    
    res.results.forEach(function(it) {
        if (it.symbol == 'BTCUSD_P') {
            if (it.quantity) {
                if (it.quantity > g_maxHoldingLong && it.direction.toUpperCase() == 'LONG') { 
                    data = createOrder({
                        symbol: "BTCUSD_P",
                        type: "MARKET",
                        direction: it.direction.toUpperCase() == 'LONG' ? "SHORT" : "LONG",
                        quantity: 20,              
                    })
                    Log("平仓:");
                }
                if (it.quantity > g_maxHoldingShort && it.direction.toUpperCase() == 'SHORT') {
                    data = createOrder({
                        symbol: "BTCUSD_P",
                        type: "MARKET",
                        direction: it.direction.toUpperCase() == 'LONG' ? "SHORT" : "LONG",
                        quantity: 20,              
                    })
                    Log("平仓:");
                }
            }
        }
    });
}
function guadan() {
    tickerInfo = getTicker('BTCUSD_P');
    ticker = tickerInfo.ticker;
    
    var lastPrice = ticker[0]; 
    Log("lastPrice: "+lastPrice);
    buyPrice = getToOrderPrice(lastPrice, -1);
    sellPrice = getToOrderPrice(lastPrice, 1);
      
    LongOrderInfo = createOrderPrice({
        symbol: "BTCUSD_P",
        type: "LIMIT",
        direction: "LONG",
        post_only: true,
        price: buyPrice,
        quantity: g_perAmount,
    })
    Log("挂单LONG：" );
    shortOrderInfo = createOrderPrice({
        symbol: "BTCUSD_P",
        type: "LIMIT",
        direction: "SHORT",
        post_only: true,
        price: sellPrice,
        quantity: g_kongtouAmount,
    })
    Log("挂单SHORT：" );
  
    cleanOrders(lastPrice)
    cleanPosition();
}
function shishang() {
    Log("市商/排序挖矿**********************************");
    tickerInfo = getTicker('BTCUSD_P');
    ticker = tickerInfo.ticker;
    Log("市商/排序挖矿ticker：");
    lastPrice = ticker[0] 
    buyPrice = ticker[2] 
    sellPrice = ticker[4] 
    Log("lastPrice："+lastPrice+"：buyPrice："+buyPrice+"：sellPrice：" + sellPrice);
    if (lastPrice == buyPrice) {
        sellPrice = (buyPrice + 0.5).toFixed(1)
    }
    if (lastPrice == sellPrice) {
        buyPrice = (sellPrice - 0.5).toFixed(1)
    }
    Log("buyPrice："+buyPrice+"：sellPrice：" + sellPrice);
    // const LastK7 = k[7]; 
    res = getPosition();
    Log("市商/排序挖矿Position：" + JSON.stringify(res));
    res.results.forEach(function(it) {
        
        if (it.symbol == 'BTCUSD_P') {
            if (it.quantity) {
                if (it.quantity > sp_baseAmountLong && it.direction.toUpperCase() == 'LONG') {
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice + 1.5,
                        quantity: sp_perAmount,
                    })
                    Log("排序10：" );
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice + 2,
                        quantity: sp_perAmount,
                    })
                    Log("排序9：" );
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice + 2.5,
                        quantity: sp_perAmount,
                    })
                    Log("排序8：");
                } else if (it.quantity > sp_baseAmountShort && it.direction.toUpperCase() == 'SHORT') {
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 0.5,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-2：");
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 1,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-3：" );
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 1.5,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-4：" );
                } else {
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice - 3.5,
                        quantity: sp_perAmount,
                    })
                    Log("市商-3：" );
                     order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice - 4.5,
                        quantity: sp_perAmount,
                    })
                    Log("市商-4：" );
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "SHORT",
                        post_only: true,
                        price: lastPrice - 4,
                        quantity: sp_perAmount,
                    })
                    Log("市商-5：");
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 2,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-3：" );
                    order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 3.5,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-4：" );
                  order = createOrderPrice({
                        symbol: "BTCUSD_P",
                        type: "LIMIT",
                        direction: "LONG",
                        post_only: true,
                        price: lastPrice - 4,
                        quantity: sp_perAmount,
                    })
                    Log("市商/排序-4：" );
                }
            }
        }
    })
}
/********************END 市商/排序挖矿***************************************************************************************************/
function main() {
   
    while(true){
        
        guadan();
        Sleep(Intervel * 1000)
       
        shishang()
        Sleep(mainIntervel * 1000)
    }    
}//FMex排序挖矿多头版本代码使用说明。（注意api地址）（加强版-增加仓位管理-增加时间设定等-购买联系微信：ying5737）
```

> 策略出处

https://www.fmz.com/strategy/178700

> 更新时间

2019-12-21 07:31:42
