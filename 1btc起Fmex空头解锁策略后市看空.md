
> Name

1btc起Fmex空头解锁策略后市看空

> Author

gulishiduan_高频排序

> Strategy Description

FMex排序挖矿空头版本代码使用说明。（注意api地址）（微信：ying5737）
（预计日缓慢跌幅1%以上，赚币赚矿，反之亏损明显）
保证金市场风险巨大，你可能随时面临100%损失。或有不明bug100%损失，概不负责。

原理：盘口下单随机成交/
先持仓SHORT1-1000u。//
- 检测现有订单是否超过界限，如果超过了就立马取消该订单/
- 检测是否成交形成了仓位，如果大于仓位xxu，则减仓到既定仓位以下/

几种情况：
全局挂单：为区别市商策略，特定定义远端排序为挂单。参数可调。
市商：
最大多头持仓，若大于该仓位，约每6s减仓位.
最大空头持仓，若大于该仓位，约每6s减仓位.
大于1u多仓启动减多仓策略，挂单为shor为主
大于空头仓位，启动减空仓策略，挂单为long为主
正常持仓

//参数中的备注描述，仅供参考，另可加挡位
风险自负/参数可调，微信：ying5737

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Url|https://api.fmex.com|交易所api地址|
|maxPrice|30000|区间最高价|
|minPrice|9000|区间最低价|
|g_maxHoldingLong|5000|多单最大持仓量|
|g_maxHoldingShort|32000|空单最大持仓量|
|sp_baseAmountShort|25000|空头仓位大于该数值后，优先成交long|
|sp_perAmount|600|市商排序：单量。(深度排序单量=市商单量*3)(正常多头单量=市商单量*0.8)|
|sp_baseAmountLong|500|多仓大于该数字后，挂单调整为优先成交short|
|Interval|3|轮询时间，（默认参数即可）|
|RetryInterval|1000|容错重试间隔(毫秒)（默认参数即可）|
|Debug|true|显示重试记录（默认参数即可）|
|EnableErrorFilter|false|显示重试记录屏蔽常见网络错误信息（默认参数即可）|
|ApiList|GetAccount,GetDepth,GetTicker,GetRecords,GetTrades,GetOrders,SetContractType|容错API列表（默认参数即可）|


> Source (javascript)

``` javascript
//保证金市场风险巨大，你可能随时面临100%损失。或有不明bug100%损失，概不负责。本策略使用的杠杆相对不大，可放心体验
//注意：默认近端排序不启动(给手动平仓预留空间),多头版先持仓long1u-1000u,空头版先持仓short1u-1000u.用来激活近端排序
var eName = exchange.GetName();
            if (eName == "Futures_FMex") {
                exchange.IO("extend", '{"POST/v3/contracts/orders$":{"affiliate_code":"9y40d8"}}');
            } if (eName == "FCoin") {
                exchange.IO("extend", '{"POST/v2/orders$":{"affiliate_code":"9y40d8"}}');
            }
exchange.IO("base", Url)//（联系微信：ying5737）策略仅限个人使用，若用于商业传播，请提前联系
var ordersInfo = {
    buyId: 0,    buyPrice: 0,    sellId: 0,    sellPrice: 0,    minPrice: 0,    maxPrice: 0
}
var depthInfo = {
    asks: [],
    bids: []
}
var symbol = "BTCUSD_P"
function getTicker(symbol) {
    url = "/v2/market/ticker/" + symbol;
    data = _C(exchange.IO,"api", "GET", url);
    return data.data;
}    
function getAccounts() {
    data = _C(exchange.IO,"api", "GET", "/v3/contracts/accounts")
    return data.data;
}
function createOrderPrice(body) {
    parameter = "symbol=" + body.symbol + "&type=" + body.type + "&direction=" + body.direction + "&post_only=" + body.post_only +  "&price=" + body.price + "&quantity=" + body.quantity + "&affiliate_code=9y40d8";   
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders", parameter)
    return resultData;
}
function createOrder(body) {
    parameter = "symbol=" + body.symbol + "&type=" + body.type + "&direction=" + body.direction + "&quantity=" + body.quantity + "&affiliate_code=9y40d8";   
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders", parameter)    
    return resultData;
}
function getOrders() {
    resultData = _C(exchange.IO,"api", "GET", "/v3/contracts/orders/open");
    return resultData.data
}
function cancelOrder(id) {
    if (typeof(id) == 'undefined') {
        return
    }
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders/" + id + "/cancel");//+ id 
    return resultData;    
}
function cancelAllOrder() {
    resultData = exchange.IO("api", "POST", "/v3/contracts/orders/cancel");
    return resultData;    
}
function getPosition() {
    resultData = _C(exchange.IO,"api", "GET", "/v3/broker/auth/contracts/positions");
    return resultData.data;
}
function getMatches(id) {
    resultData = _C(exchange.IO,"api", "GET", "/v3/contracts/orders/" + id + "/matches");
    return resultData.data;
}
function getCandles(resolution, symbol) {
    resultData = _C(exchange.IO,"api", "GET", "/v2/market/candles/" + resolution + "/" + symbol);
    return resultData.data;
}

function cleanPosition() {
    res = getPosition();    
    res.results.forEach(function(it) {
        if (it.symbol == symbol) {
            if (it.quantity) {
                if (it.quantity > g_maxHoldingLong && it.direction.toUpperCase() == 'LONG') { 
                    data = createOrder({symbol: symbol,type: "MARKET",direction: "SHORT",quantity:sp_perAmount * 2
                    })
                    Log("LONG超最大仓位,减仓");
                }
                if (it.quantity > g_maxHoldingShort && it.direction.toUpperCase() == 'SHORT') {
                    data = createOrder({symbol: symbol,type: "MARKET",direction: 'LONG',quantity: sp_perAmount * 2
                    })
                    Log("SHORT超最大仓位,减仓");
                }
            }
        }
    });
}
// add new 
var hasElephantOrder = false
// var elephantOrder  = []
var elephantOrderTime = 0
function underElephant (ticker) {
    var buyPrice = ticker[2] 
    var sellPrice = ticker[4] 
    var bestAskAmount = ticker[5];
    var bestBidAmount = ticker[3];
    var now = new Date().getTime()
    if (hasElephantOrder) {
        if (now - elephantOrderTime < 3000) {
            return
        }
        // for (var index = 0; index < elephantOrder.length; index++) {
        //     cancelOrder(elephantOrder[index].id)
        //     Sleep(1000)
        // }
        hasElephantOrder = false
    }
    if (bestBidAmount > 40000 && bestBidAmount > bestAskAmount * 2) {
        //如果，买一档的单量＞X万，且买一的单量大于卖一的单量的Y倍，挂单.
        //等待，撤单。重新检测，重新挂。       
        // elephantOrder.push(order.data)
      //  order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 2,quantity: sp_perAmount * 2 })
      //  Log("大象挂单买4 LONG" );
       order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 3,quantity: sp_perAmount * 3})
       Log("大象挂单买6 LONG" );
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 4,quantity: sp_perAmount * 3})
        Log("大象挂单买8 LONG" );        
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 4.5,quantity: sp_perAmount * 3})
        Log("大象挂单买9 LONG" );
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 5,quantity: sp_perAmount * 3})
        Log("大象挂单买10 LONG" );        
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 6.5,quantity: sp_perAmount * 3})
        Log("大象挂单买13 LONG" );
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "LONG",post_only: true,price: buyPrice - 7,quantity: sp_perAmount * 3})
        Log("大象挂单买14 LONG" );        
        // elephantOrder.push(order.data)
        
        // elephantOrder.push(order.data)
        hasElephantOrder = true
        elephantOrderTime = now
    }  if (bestAskAmount > 40000 && bestAskAmount > bestBidAmount * 2) {
        //如果，卖一档的单量＞X万，且卖一的单量大于买一的单量的Y倍，挂单.
        //等待，撤单。重新检测，重新挂。
       // order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 1,quantity: sp_perAmount * 3})
       // Log("大象挂单卖2 LONG" );
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 2,quantity: sp_perAmount * 3})
        Log("大象挂单卖4 LONG" );
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 3,quantity: sp_perAmount * 3})
        Log("大象挂单卖6 LONG" );
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 4,quantity: sp_perAmount * 3})
        Log("大象挂单卖8 LONG" );
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 5,quantity: sp_perAmount * 3})
        Log("大象挂单卖10 LONG" );
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 6,quantity: sp_perAmount * 3})
        Log("大象挂单卖12 LONG" );
        // elephantOrder.push(order.data)
        order = createOrderPrice({symbol: symbol,type: "LIMIT",direction: "SHORT",post_only: true,price: sellPrice + 7,quantity: sp_perAmount * 3})
        Log("大象挂单卖14 LONG" );
        // elephantOrder.push(order.data)
        hasElephantOrder = true
        elephantOrderTime = now
    }
}
function marketMaker(ticker) {
    Log("市商/排序挖矿**********************************");
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
    res = getPosition();
    Log("市商/排序挖矿Position：" + JSON.stringify(res));

    res.results.forEach(function(it) {
        if (it.quantity) {
            var index = 0
            if (it.quantity > sp_baseAmountLong && it.direction.toUpperCase() == 'LONG') {//多仓过多，改变挂单档位,short3-9,long9-10
                for (index = 0; index < 9; index++) {
                    order = createOrderPrice({symbol: symbol, type: "LIMIT", direction: "SHORT",  post_only: true,  price: lastPrice + 1 + 0.5 * index,   quantity: sp_perAmount                   })
                    Log("市商/排序SHORT卖" + (2 + index) );                            
                }
        
                for (index = 0; index < 3; index++) {
                    order = createOrderPrice({ symbol: symbol,  type: "LIMIT",   direction: "LONG",   post_only: true,   price: lastPrice - 4 - (0.5 * index),   quantity: sp_perAmount                 })
                    Log("市商/排序LONG买" + (8 + index));
                }
                
            } else if (it.quantity > sp_baseAmountShort && it.direction.toUpperCase() == 'SHORT' ) {       
                for (index = 0; index < 9; index++) {
                    order = createOrderPrice({symbol: symbol, type: "LIMIT", direction: "LONG",  post_only: true,  price: lastPrice - 1 - 0.5 * index,   quantity: sp_perAmount                   })
                    Log("市商/排序LONG买" + (2 + index) );                            
                }
            } else {//正常持仓状态，long (非全档)           short  
              
               order = createOrderPrice({  symbol: "BTCUSD_P",  type: "LIMIT",   direction: "SHORT",    post_only: true,     price: lastPrice + 1.5,     quantity: sp_perAmount                    })
                    Log("市商/排序SHORT3" );
                    order = createOrderPrice({  symbol: "BTCUSD_P",     type: "LIMIT",   direction: "SHORT",   post_only: true,  price: lastPrice + 2,     quantity: sp_perAmount                    })
                    Log("市商/排序SHORT4" );
                    order = createOrderPrice({symbol: "BTCUSD_P",    type: "LIMIT",     direction: "SHORT",  post_only: true,    price: lastPrice + 2.5,    quantity: sp_perAmount                    })
                    Log("市商/排序SHORT5" ); 
                    order = createOrderPrice({  symbol: "BTCUSD_P",  type: "LIMIT",   direction: "SHORT",    post_only: true,     price: lastPrice + 3,     quantity: sp_perAmount                   })
                    Log("市商/排序SHORT6" );
                  //  order = createOrderPrice({  symbol: "BTCUSD_P",     type: "LIMIT",   direction: "SHORT",   post_only: true,  price: lastPrice + 3.5,     quantity: sp_perAmount                   })
                   // Log("市商/排序SHORT7" );
                    order = createOrderPrice({symbol: "BTCUSD_P",    type: "LIMIT",     direction: "SHORT",  post_only: true,    price: lastPrice + 4,    quantity: sp_perAmount                     })
                    Log("市商/排序SHORT8" );   
                    order = createOrderPrice({  symbol: "BTCUSD_P",     type: "LIMIT",   direction: "SHORT",   post_only: true,  price: lastPrice + 6.5,     quantity: sp_perAmount                     })
                    Log("市商/排序SHORT7" );
                    order = createOrderPrice({symbol: "BTCUSD_P",    type: "LIMIT",     direction: "SHORT",  post_only: true,    price: lastPrice + 7,    quantity: sp_perAmount                         })
                    Log("市商/排序SHORT8" ); 
                    order = createOrderPrice({ symbol: "BTCUSD_P",  type: "LIMIT",   direction: "LONG",   post_only: true,   price: lastPrice - 3.5,   quantity: sp_perAmount  * 0.6            })
                    Log("市商/排序LONG买7" );
                    order = createOrderPrice({ symbol: "BTCUSD_P",  type: "LIMIT",   direction: "LONG",   post_only: true,   price: lastPrice - 4,   quantity: sp_perAmount   * 0.6            })
                    Log("市商/排序LONG买8" );
                    order = createOrderPrice({ symbol: "BTCUSD_P",  type: "LIMIT",   direction: "LONG",   post_only: true,   price: lastPrice - 4.5,   quantity: sp_perAmount    * 0.6           })
                    Log("市商/排序LONG买9" ); 
            }
        }
    })
}

var lastPrintfTime = null
function printfBanner() {
    var now = new Date().getTime()

    if (lastPrintfTime == null || now - lastPrintfTime > 60 * 5 * 1000) {
        Log("FMex排序挖矿多头版本代码使用说明见描述。（注意api地址）微信：ying5737）#ff0000")
        lastPrintfTime = now
    }
}

/********************END 市商/排序挖矿***************************************************************************************************/
// 模板初始化时调用
function init() {    // 过滤常见错误
    if (EnableErrorFilter) {
        SetErrorFilter("502:|503:|tcp|character|connection|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");
    }
     _CDelay(RetryInterval)
   // 重定义需要容错的函数
    var names = ApiList.split(',');
    _.each(exchanges, function(e) {
        _.each(names, function(name) {
            if (typeof(e[name]) !== 'function') {
                throw "尝试容错 " + name + " 失败, 请确认存在此API并且输入正确.";
            }
            var old = e[name];
            e[name] = function() {
                var r;
                while (!(r = old.apply(this, Array.prototype.slice.call(arguments)))) {
                    if (Debug) {
                        Log(e.GetLabel(), name, "调用失败", RetryInterval, "毫秒后重试...");
                    }
                    Sleep(RetryInterval);
                }
                return r;
            };
        });
    });
    Log("容错机制开启", names);
}

function checkRisk(ticker) {
    lastPrice = ticker[0]
    if (lastPrice< minPrice || lastPrice > maxPrice) {
        Log(
        '===== 价格已超出箱体震荡区间 [',
        minPrice,
        ',',
        maxPrice,
        ']，挂单暂停 1 分钟，1分钟后重新检测 ====='
        );
        Sleep(1000 * 60);
        return true;
    }
    return false
}

function main() {
    while(true){
        cancelAllOrder()
        tickerInfo = getTicker(symbol);
        ticker = tickerInfo.ticker;
        if (!checkRisk(ticker)) {
            marketMaker(ticker);
            underElephant(ticker)
        }
        cleanPosition();
        printfBanner()
        Sleep(Interval * 1000) 
    }    
}//FMex排序挖矿多头版本代码使用说明见描述。（注意api地址）微信：ying5737）

function onexit() {
    Log("退出，撤所有订单")
    cancelAllOrder()
}

```

> Detail

https://www.fmz.com/strategy/178417

> Last Modified

2020-12-25 23:51:31
