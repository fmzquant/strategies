
> Name

OKXBinance-Websocket高频交易模板-多品种OKEX-Binance-Websocket-High-Frequency-Multi-Symbols-Trading-Template

> Author

发明者量化

> Strategy Description

[trans]
实现功能:
* 公共流订阅, trades及深度合成
* 私有流订阅, 维护本地委托单与仓位以及余额信息
* 维护取消订单超时状态, 支持OKX的amendOrders修改订单
* 支持多个品种, 方便高频策略以最低的延迟同时操作多个市场
* 添加函数 EventLoop(需要最新托管者支持), 此函数可以在多个websocket连接的情况下, 等待任意websocket数据返回, 避免轮询
* 支持OKX与Binance期货与Binance的现货与现货杠杆交易, OKX的现货暂未加入支持, 感兴趣的可以自己更改一下
* OKX的私有流订阅需要Key与密码已经做为参数写在模板里
* 自动处理断线重连等一些基本的网络功能
* 支持私有流订单成交取消回报的事件回调
* 统一两个交易所的下单逻辑, 具体可以看模板源码或者例子
* 支持同时订阅多个交易所的websocket接口
* 订单的报单修改以及删除可以批量做为任务返回, 会自动处理交易任务

高频下单的时候，交易所返回的定单会不及时(private通道)，但这时侯行情可能已经变化，我们需要本地维护一个订单状态, 策略已经实现，
模板会自动识别是OKX还是Binance, 下面是一个简单的例子, 强烈建议阅读源码，这样能更深层次的定制你自己的功能

下面是一个简单的例子
||
This template implements the following features:

Public stream subscription for trades and depth synthesis
Private stream subscription to maintain local order and position information, as well as balance information
Maintenance of timeout states for canceling orders and support for OKEX's amendOrders to modify orders
Support for multiple varieties for easy high-frequency strategy operations with the lowest possible latency across multiple markets
The addition of the EventLoop function (which requires the latest docker support) which allows for waiting for any websocket data return in the case of multiple websocket connections to avoid polling.
Support for OKEX and Binance futures and Binance spot and leverage trading, OKEX spot is not yet supported but can be modified by those interested.
OKEX private stream subscription requires a Key and password to be included as parameters in the template.
Automated handling of basic network functions such as reconnection in case of disconnection.
Support for event callbacks of order and cancellation reports in private streams.
Unifies the order placement logic for both exchanges and can be viewed in the template source code or examples.
Support for subscribing to multiple exchange websockets at the same time.
Order placement modification and deletion can be done in bulk as tasks and will be handled automatically.
When placing high-frequency orders, the exchange may not return order information promptly (on the private channel) but in such case, market conditions may have already changed. The template maintains a local order status and strategy implementation is included. It automatically recognizes whether it is OKEX or Binance.
A simple example is provided below and it is strongly recommended to read the source code to better customize your own functionality.

an example: 
[/trans]
```

function onTick(ctx, event) {
    if (event.depth) {
        Log("depth update", event)
    }
    if (event.trades) {
        Log("trades received", event)
    }
    if (event.balance || event.positions) {
        Log("account update", event)
    }
    if (event.orders) {
        Log("private orders update", event)
    }
    
    // include orders, positions, balance for latest
    Log("account", ctx.wsPrivate.account)
    
    // for test only
    if (false) {
        return {
            amendOrders: [{
                instId: event.instId,
                clOrdId: "xxxx*****",
                cxlOnFail: true,
                newSz: "2",
            }],
            newOrders: [{
                instId: event.instId,
                clOrdId: UUID(),
                side: "sell",
                tdMode: "cross",
                ordType: "post_only",
                px: event.depth.asks[0].price.toFixed(4),
                sz: "1",
            }, {
                instId: event.instId,
                clOrdId: UUID(),
                side: "sell",
                tdMode: "cross",
                ordType: "post_only",
                px: event.depth.asks[0].price.toFixed(4),
                sz: "1",
            }],
            cancelOrders: [{
                instId: order.instId,
                clOrdId: order.Id
            }]
        }
    }
}

function main() {
    let instId = exchange.SetContractType("swap").InstrumentID

    let ctx = $.NewWSS(exchange, function(ws) {
        let msg = null
        if (exchange.GetName() === 'Futures_OKCoin') {
            msg = {
                op: "subscribe",
                args: [{
                    channel: "books5",
                    instId: instId,
                }, {
                    channel: "trades",
                    instId: instId,
                }]
            }
        } else {
            let symbol = exchange.GetCurrency().replace('_', '').toLowerCase()
            msg = {
                method: "SUBSCRIBE",
                params: [symbol + "@aggTrade", symbol + "@depth20@100ms"],
                id: "1",
            }
        }
        ws.write(JSON.stringify(msg))
        Log("subscribe", msg, "channel")
        LogStatus("Ready")
    }, onTick, Debug)

    while (true) {
        ctx.poll()
        EventLoop(1000)
    }
}
```
[trans]
运行效果如下, 也可以在订阅函数里订阅多个品种
||
The running status is as follows, you can also subscribe to multiple symbols in the subscribe function
[/trans]

 ![IMG](https://www.fmz.com/upload/asset/107646c11b93b32c493.png) 
 
 [trans]
下面是一个基于此模板实现的OKX与币安通用的市商策略的效果
||
The following is the a common market maker robot for OKX and Binance based on this template
[/trans]

 ![IMG](https://www.fmz.com/upload/asset/73393d2122c1f41a2a.png) 
 
 
 ![IMG](https://www.fmz.com/upload/asset/17efd8896a74dc9e271.gif) 





> Source (javascript)

``` javascript

/* jshint esversion: 6 */
// AccessKey and Phassphrase only need if OKX
$.NewWSS = function(e, onWSSLogin, onWSSTick, Debug, UseMargin, AccessKey, Passphrase) {
    function NewOKXWebSocketPrivate(ctx) {
        let self = {
            ws: null,
            isReadyDic: {},
            lastPing: 0,
            ctx: ctx,
            account: {
                orders: {},
                cancelPending: {},
                ordersCount: {
                    pending: 0,
                    buy: 0,
                    amend: 0,
                    canceled: 0,
                    filled: 0,
                    push: 0,
                    sell: 0
                },
                positions: {},
                balance: {},
                init_balance: {},
                balanceUpdate: 0,
                positionsUpdate: 0,
                ordersUpdate: 0
            }
        }
        let acc = _C(ctx.e.GetAccount)
        let pair = ctx.e.GetCurrency().split('_')
        self.account.balance[pair[1]] = {
            free: acc.Balance,
            borrowed: 0,
            locked: 0
        }
        self.account.balance[pair[0]] = {
            free: acc.Stock,
            borrowed: 0,
            locked: 0
        }
        self.account.init_balance[pair[1]] = {
            free: acc.Balance,
            borrowed: 0,
            locked: 0
        }
        self.account.init_balance[pair[0]] = {
            free: acc.Stock,
            borrowed: 0,
            locked: 0
        }

        self.reset = function() {
            if (self.ws) {
                self.ws.close()
                self.ws = null
            }
            self.isReadyDic = {}
        }
        self.send = function(msg) {
            if (!self.ws) {
                return
            }
            self.ws.write(JSON.stringify(msg))
        }

        self.getOrdersMap = function(instId) {
            let mp = self.account.orders[instId]
            if (typeof(mp) === 'undefined') {
                mp = {}
                self.account.orders[instId] = mp
            }
            return mp
        }

        self.batchOrders = function(orders) {
            for (let i = 0; i < orders.length; i += 20) {
                self.send({
                    "id": "batchOrders",
                    "op": "batch-orders",
                    "args": orders.slice(i, i + 20)
                })
                if (Debug) {
                    Log("batchOrders", orders.slice(i, i + 20))
                }
            }
            let ts = new Date().getTime()
            orders.forEach(function(item) {
                let mp = self.getOrdersMap(item.instId)
                mp[item.clOrdId] = {
                    Id: item.clOrdId,
                    Created: ts,
                    instId: item.instId,
                    Price: Number(item.px),
                    Amount: Number(item.sz),
                    Type: item.side == "sell" ? ORDER_TYPE_SELL : ORDER_TYPE_BUY,
                    DealAmount: 0,
                    Status: ORDER_STATE_PENDING
                }
            })
        }

        self.cancelOrders = function(orders) {
            let ts = new Date().getTime()

            orders.forEach(function(item) {
                if (typeof(self.account.cancelPending[item.clOrdId]) === 'undefined') {
                    self.account.cancelPending[item.clOrdId] = {
                        retry: 0,
                        ts: ts,
                        data: item
                    }
                }
            })

            // remove from orders
            orders.forEach(function(item) {
                delete self.getOrdersMap(item.instId)[item.clOrdId]
            })

            for (let id in self.account.cancelPending) {
                let item = self.account.cancelPending[id]
                if (ts - item.ts > 10000) {
                    // recancel
                    orders.push(item.data)
                    Log("remove timeout order", item, "#ff0000")
                    item.retry += 1
                    item.ts = ts
                }
                if (item.retry > 10) {
                    Log("force remove order", item, "#ff0000")
                    delete self.account.cancelPending[id]
                }
            }

            for (let i = 0; i < orders.length; i += 20) {
                self.send({
                    "id": "cancelOrders",
                    "op": "batch-cancel-orders",
                    "args": orders.slice(i, i + 20)
                })
            }

            if (Debug) {
                Log("cancelOrders", orders)
            }
        }

        self.amendOrders = function(orders) {
            let ts = new Date().getTime()
            orders.forEach(function(item) {
                let order = self.getOrdersMap(item.instId)[item.clOrdId]
                if (order) {
                    order.Price = Number(item.newPx)
                    order.Amount = Number(item.newSz)
                    order.Update = undefined
                    order.Created = ts
                }
            })

            self.send({
                "id": "amendOrders",
                "op": "batch-amend-orders",
                "args": orders,
            })

            if (Debug) {
                Log("amendOrders", orders)
            }
        }

        self.processOrders = function(data, reset) {
            let ret = []
            if (Debug) {
                Log("ORDERS: ", data)
            }
            if (reset) {
                self.account.orders = {}
                for (let k in self.account.ordersCount) {
                    self.account.ordersCount[k] = 0
                }
            }

            data.forEach(function(item) {
                let mp = self.getOrdersMap(item.instId)
                let dataOrder = {
                    Id: item.clOrdId,
                    instId: item.instId,
                    Info: item,
                    Price: Number(item.px),
                    Amount: Number(item.sz),
                    Update: Number(item.uTime || item.cTime),
                    Created: Number(item.cTime),
                    Type: item.side == "buy" ? ORDER_TYPE_BUY : ORDER_TYPE_SELL,
                    DealAmount: Number(item.accFillSz)
                }
                if (item.state == "canceled") {
                    dataOrder.Status = ORDER_STATE_CANCELED
                    self.account.ordersCount.canceled += 1
                    self.account.ordersCount.pending -= 1
                } else if (item.state == "live") {
                    dataOrder.Status = ORDER_STATE_PENDING
                    if (item.amendResult == "0") {
                        self.account.ordersCount.amend += 1
                    } else {
                        self.account.ordersCount.push += 1
                        self.account.ordersCount.pending += 1
                    }
                } else if (item.state == "partially_filled") {
                    dataOrder.Status = ORDER_STATE_PENDING
                } else if (item.state == "filled") {
                    dataOrder.Status = ORDER_STATE_CLOSED
                    self.account.ordersCount.filled += 1
                    self.account.ordersCount.pending -= 1
                } else {
                    throw "unknow order state " + JSON.stringify(item)
                }

                // remove from cancelPending orders
                if (dataOrder.Status != ORDER_STATE_PENDING) {
                    delete self.account.cancelPending[dataOrder.Id]
                    if (Debug) {
                        Log("remove from cancel pending orders", dataOrder)
                    }
                }


                // update anyway
                let oldOrder = mp[dataOrder.Id]

                if ((!oldOrder) || (dataOrder.DealAmount != oldOrder.DealAmount)) {
                    if (item.state == "partially_filled" || item.state == "filled") {
                        Log(item.state, item.side, dataOrder, (item.clOrdId.indexOf('YYYYY') == 0 ? '#ff0000' : ''))
                    }
                }

                let update = false
                if (dataOrder.Status == ORDER_STATE_PENDING) {
                    // 修改订单的命令还没返回就收到了new订单的update导致时间序列错乱
                    if (oldOrder) {
                        update = true
                        Object.assign(oldOrder, dataOrder)
                    } else {
                        mp[dataOrder.Id] = dataOrder
                        update = true
                    }
                    if (Debug) {
                        let suffix = ''
                        if (self.ctx.depth) {
                            suffix = 'bid:' + JSON.stringify(self.ctx.depth.bids[0]) + ', ask:' + JSON.stringify(self.ctx.depth.asks[0])
                        }
                        Log("update order", Boolean(oldOrder), mp[dataOrder.Id], item, suffix)
                    }
                } else {
                    update = true
                    if (oldOrder) {
                        // avoid ref
                        oldOrder.Status = dataOrder.Status
                        delete mp[dataOrder.Id]
                    }
                    if (Debug) {
                        Log("order " + item.state, dataOrder)
                    }
                }

                if (update) {
                    ret.push(dataOrder)
                }
                self.account.ordersUpdate = Number(item.uTime || item.cTime)
            })
            return ret
        }

        self.processMsg = function(msg) {
            if (Debug) {
                Log("MSG:", msg)
            }
            let obj = JSON.parse(msg)
            if (obj.event == "error") {
                Log("Error:", obj.msg)
                Sleep(1000)
                self.ws.close()
            } else if (obj.event == "login") {
                Log("Login success")
                self.ws.write(JSON.stringify({
                    "op": "subscribe",
                    "args": [{
                        "channel": "balance_and_position"
                    }, {
                        "channel": "orders",
                        "instType": "ANY"
                    }]
                }))
            } else if (obj.event == "subscribe") {
                Log("subscribe OK", obj.arg.channel)
                if (obj.arg.channel == "orders" && !self.isReadyDic["orders"]) {
                    let ret = self.ctx.e.IO("api", "GET", "/api/v5/trade/orders-pending")
                    if (ret && ret.code == "0") {
                        self.processOrders(ret.data, true)
                        Log("pocess orders ok", self.account.ordersCount)
                    } else {
                        Log("process order failed", ret, "#ff0000")
                    }
                    self.isReadyDic["orders"] = true
                }
            } else if (obj && obj.arg && obj.data && obj.data.length > 0) {
                let event = {}
                if (obj.arg.channel == 'balance_and_position') {
                    if (Debug) {
                        Log(obj, "#ff0000")
                    }
                    event.ts = Number(obj.data[0].pTime)
                    if (obj.data[0].posData) {
                        let positions = {}
                        obj.data[0].posData.forEach(function(item) {
                            if (typeof(positions[item.instId]) === 'undefined') {
                                positions[item.instId] = 0
                            }
                            positions[item.instId] = {
                                Amount: Number(item.pos),
                                Price: Number(item.avgPx)
                            }
                            self.account.positionsUpdate = Number(item.uTime)
                        })
                        for (let instId in positions) {
                            self.account.positions[instId] = positions[instId]
                        }
                        event.positions = positions
                    }
                    if (obj.data[0].balData) {
                        let balance = {}
                        obj.data[0].balData.forEach(function(item) {
                            balance[item.ccy] = {
                                free: Number(item.cashBal),
                                locked: 0
                            }
                            self.account.balanceUpdate = Number(item.uTime)
                        })
                        for (let instId in balance) {
                            self.account.balance[instId] = balance[instId]
                        }
                        event.balance = balance
                    }
                    self.isReadyDic["account"] = true
                } else if (obj.arg.channel == 'orders') {
                    event.orders = self.processOrders(obj.data)
                    event.ts = Number(obj.data[0].uTime)
                } else {
                    // {"id":"amendOrders","op":"batch-amend-orders" ...}
                    //Log("DATA RECV", "<" + msg + ">")
                }
                // position change
                if (event.ts) {
                    self.ctx.processTick(event)
                }
            } else {
                //Log("RECV", "<" + msg + ">")
            }
        }

        self.poll = function(timeout) {

            if (typeof(AccessKey) === 'undefined' || AccessKey.length == 0) {
                return
            }

            let ts = new Date().getTime()
            if (self.lastPing == 0) {
                self.lastPing = ts
            }
            if (self.ws == null) {
                self.ws = Dial("wss://ws.okx.com:8443/ws/v5/private")
                if (self.ws) {
                    let tsStr = (ts / 1000).toString()
                    let authMsg = {
                        "op": "login",
                        "args": [{
                            "apiKey": AccessKey,
                            "passphrase": Passphrase,
                            "timestamp": tsStr,
                            "sign": self.ctx.e.HMAC("sha256", "base64", tsStr + "GET" + "/users/self/verify", "{{secretkey}}")
                        }]
                    }
                    self.ws.write(JSON.stringify(authMsg))
                }
            }
            if (!self.ws) {
                return;
            }

            if (ts - self.lastPing > 10000) {
                self.ws.write("ping")
                self.lastPing = ts
            }

            let lastRead = false
            while (true) {
                let msg = self.ws.read(-1)
                if (msg == "") {
                    self.reset()
                    break
                }
                if (msg == null) {
                    if (typeof(timeout) == 'number' && timeout > 0) {
                        msg = self.ws.read(timeout)
                        lastRead = true
                    }
                }
                if (msg != null && msg != "") {
                    if (msg != "pong" && msg != "ping") {
                        self.processMsg(msg)
                    }
                } else {
                    break
                }
                if (lastRead) {
                    break
                }
            }
        }
        return self
    }


    function NewOKXWebSocketPublic(e, onLogin, onTick) {
        var crc32 = function(r) {
            for (var a, o = [], c = 0; c < 256; c++) {
                a = c;
                for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                o[c] = a
            }
            for (var n = -1, t = 0; t < r.length; t++) n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))];
            return (-1 ^ n) >>> 0
        };

        let self = {
            e: e,
            key: e.GetName() + '/' + e.GetCurrency(),
            quoteCurrency: e.GetQuoteCurrency(),
            name: e.GetName(),
            isFutures: e.GetName().indexOf("Futures_") == 0,
            ws: null,
            cache: {},
            channles: [],
            depthCount: 0,
            depthConsumed: 0,
            lastPing: 0,
            depthDic: {},
            lastMarket: 0
        }
        self.wsPrivate = NewOKXWebSocketPrivate(self)

        self.processTick = function(event) {
            if (typeof(onTick) !== 'function') {
                return
            }
            let ret = onTick(self, event)
            if (ret) {
                if (ret.newOrders && ret.newOrders.length > 0) {
                    ret.ctx.wsPrivate.batchOrders(ret.newOrders)
                }
                if (ret.amendOrders && ret.amendOrders.length > 0) {
                    ret.ctx.wsPrivate.amendOrders(ret.amendOrders)
                }
                if (ret.cancelOrders && ret.cancelOrders.length > 0) {
                    ret.ctx.wsPrivate.cancelOrders(ret.cancelOrders)
                }
            }
        }

        self.processMsg = function(msg) {
            if (Debug) {
                Log("MSG:", msg)
            }
            let obj = JSON.parse(msg)
            if (obj.event == 'subscribe') {
                self.channles.push(obj)
            } else if (obj.event == 'error') {
                throw obj.msg
            } else if (obj.event == 'login') {
                self.channles = []
                if (typeof(onLogin) === 'function') {
                    onLogin(self.ws, self.e)
                }
            } else {
                self.lastMarket = new Date().getTime();
                let instId = obj.arg.instId
                let event = {
                    instId: instId
                }
                obj.data.forEach(function(item) {
                    if (obj.arg.channel == 'trades') {
                        if (typeof(event.trades) === 'undefined') {
                            event.trades = []
                        }
                        event.ts = Number(item.ts)
                        event.trades.push({
                            ts: Number(item.ts),
                            side: item.side,
                            price: Number(item.px),
                            qty: Number(item.sz)
                        })
                    } else if (obj.arg.channel == 'books5' || obj.arg.channel == 'books' || obj.arg.channel == 'books50-l2-tbt') {
                        let tsBegin = UnixNano()
                        let depth = {
                            asks: [],
                            bids: []
                        }
                        if (obj.arg.channel == 'books5') {
                            item.asks.forEach(function(pair) {
                                depth.asks.push({
                                    price: Number(pair[0]),
                                    qty: Number(pair[1])
                                })
                            })
                            item.bids.forEach(function(pair) {
                                depth.bids.push({
                                    price: Number(pair[0]),
                                    qty: Number(pair[1])
                                })
                            })
                        } else {
                            let depthDic = self.depthDic[instId]
                            if (typeof(depthDic) === 'undefined') {
                                depthDic = {
                                    count: 0,
                                    dic: {
                                        asks: {},
                                        bids: {}
                                    }
                                }
                                self.depthDic[instId] = depthDic
                            }
                            depthDic.count += 1
                            for (let k in depthDic.dic) {
                                if (obj.action == 'snapshot') {
                                    depthDic.dic[k] = {}
                                }
                                let mp = depthDic.dic[k]
                                item[k].forEach(function(book) {
                                    if (book[1] == '0') {
                                        delete mp[book[0]]
                                    } else {
                                        mp[book[0]] = [book[1], book[3], item['ts']]
                                    }
                                })
                            }

                            for (let k in depth) {
                                let n = k == 'asks' ? 1 : -1
                                let mp = depthDic.dic[k]
                                Object.keys(depthDic.dic[k]).sort(function(a, b) {
                                    return n * (Number(a) - Number(b))
                                }).forEach(function(x) {
                                    // keep string for 
                                    depth[k].push({
                                        price: x,
                                        qty: mp[x][0]
                                    })
                                })
                            }

                            if (depthDic.count % 5000 == 0) {
                                let s = []
                                for (let i = 0; i < 25; i++) {
                                    ['bids', 'asks'].forEach(function(k) {
                                        if (i < depth[k].length) {
                                            s.push(depth[k][i].price + ':' + depth[k][i].qty)
                                        }
                                    })
                                }
                                if (crc32(s.join(":")) != Uint32Array.from(Int32Array.of(item.checksum))[0]) {
                                    throw "depth checksum error"
                                }
                            }
                            // convert to number
                            for (let dir in depth) {
                                let books = depth[dir]
                                for (let i = 0; i < books.length; i++) {
                                    books[i].price = Number(books[i].price)
                                    books[i].qty = Number(books[i].qty)
                                }
                            }
                        }
                        event.depth = depth
                        event.ts = Number(item.ts)
                    }
                })
                if (event.ts) {
                    self.processTick(event)
                }
            }
        }

        self.isReady = function() {
            return self.wsPrivate.isReadyDic["account"] && self.wsPrivate.isReadyDic["orders"]
        }

        self.reset = function() {
            if (self.ws) {
                self.ws.close()
                self.ws = null
            }
            self.depthDic = {}
            self.isReadyDic = {}
        }

        self.poll = function(timeout) {
            let ts = new Date().getTime()
            if (self.lastPing == 0) {
                self.lastPing = ts
            }
            if (!self.ws) {
                self.ws = Dial("wss://ws.okx.com:8443/ws/v5/public")
                if (!self.ws) {
                    return
                }
                if (typeof(AccessKey) === 'undefined' || AccessKey.length == 0) {
                    if (typeof(onLogin) === 'function') {
                        onLogin(self.ws, self.e)
                    }
                } else {
                    let tsStr = (new Date().getTime() / 1000).toString()
                    let authMsg = {
                        "op": "login",
                        "args": [{
                            "apiKey": AccessKey,
                            "passphrase": Passphrase,
                            "timestamp": tsStr,
                            "sign": self.e.HMAC("sha256", "base64", tsStr + "GET" + "/users/self/verify", "{{secretkey}}")
                        }]
                    }
                    self.ws.write(JSON.stringify(authMsg))
                }
            }
            if (!self.ws) {
                return
            }
            if (ts - self.lastPing > 10000) {
                self.ws.write("ping")
                self.lastPing = ts
            }
            let lastRead = false
            while (true) {
                let msg = self.ws.read(-1)
                if (msg == "") {
                    self.reset()
                    break
                }
                if (msg == null) {
                    if (typeof(timeout) == 'number' && timeout > 0) {
                        msg = self.ws.read(timeout)
                        lastRead = true
                    }
                }
                if (msg != null && msg != "") {
                    if (msg != "pong") {
                        self.wsPrivate.poll()
                        self.processMsg(msg)
                        self.wsPrivate.poll()
                    }
                } else {
                    break
                }
                if (lastRead) {
                    break
                }
            }
            self.wsPrivate.poll()
        }
        return self
    }


    function NewBinanceSocketPrivate(ctx) {
        let self = {
            ws: null,
            isFutures: ctx.isFutures,
            isReadyDic: {},
            lastPing: 0,
            ctx: ctx,
            useMargin: UseMargin,
            quoteCurrency: ctx.e.GetQuoteCurrency(),
            listenKey: null,
            listenKeyUpdate: 0,
            account: {
                cancelPending: {},
                orders: {},
                ordersCount: {
                    pending: 0,
                    buy: 0,
                    amend: 0,
                    canceled: 0,
                    filled: 0,
                    push: 0,
                    sell: 0
                },
                positions: {},
                balance: {},
                init_balance: {},
                balanceUpdate: 0,
                positionsUpdate: 0,
                ordersUpdate: 0
            }
        }

        if (ctx.isFutures) {
            // TODO change to api
            let positions = _C(exchange.GetPosition)
            positions.forEach(function(pos) {
                // avoid self.instId
                self.account.positions[self.instId] = {
                    Amount: pos.Amount * (pos.Type == PD_LONG ? 1 : -1),
                    Price: pos.Price
                }
            })
        }
        let pair = ctx.e.GetCurrency().split('_')
        if (self.useMargin && !ctx.isFutures) {
            let ret = _C(ctx.e.IO, "api", "GET", "/sapi/v1/margin/account")
            ret.userAssets.forEach(function(item) {
                if (item.asset == pair[0] || item.asset == pair[1]) {
                    self.account.balance[item.asset] = {
                        free: Number(item.free),
                        locked: Number(item.locked),
                        borrowed: Number(item.borrowed),
                    }
                    self.account.init_balance[item.asset] = {
                        free: Number(item.free),
                        locked: Number(item.locked),
                        borrowed: Number(item.borrowed)
                    }
                }
            })
            self.tradePath = "/sapi/v1/margin/order"
        } else {
            let acc = _C(ctx.e.GetAccount)
            self.account.balance[pair[1]] = {
                free: acc.Balance,
                locked: acc.FrozenBalance,
                borrowed: 0
            }
            self.account.balance[pair[0]] = {
                free: acc.Stocks,
                locked: acc.FrozenStocks,
                borrowed: 0
            }
            self.account.init_balance[pair[1]] = {
                free: acc.Balance,
                locked: acc.FrozenBalance,
                borrowed: 0
            }
            self.account.init_balance[pair[0]] = {
                free: acc.Stocks,
                locked: acc.FrozenStocks,
                borrowed: 0
            }
            self.tradePath = "/api/v3/order"
        }
        Log(ctx.e.GetName(), self.account.init_balance)

        self.getOrdersMap = function(instId) {
            let mp = self.account.orders[instId]
            if (typeof(mp) === 'undefined') {
                mp = {}
                self.account.orders[instId] = mp
            }
            return mp
        }

        self.reset = function() {
            if (self.ws) {
                self.ws.close()
                self.ws = null
            }
            self.isReadyDic = {}
        }

        self.send = function(msg) {
            if (!self.ws) {
                return
            }
            self.ws.write(JSON.stringify(msg))
        }

        self.batchOrders = function(orders) {
            let args = []
            let ts = new Date().getTime()
            orders.forEach(function(item) {
                args.push({
                    symbol: item.instId,
                    side: item.side.toUpperCase(),
                    newClientOrderId: item.clOrdId,
                    type: "LIMIT",
                    price: item.px,
                    quantity: item.sz,
                    timeInForce: "GTX",
                })
                self.getOrdersMap(item.instId)[item.clOrdId] = {
                    Id: item.clOrdId,
                    Created: ts,
                    instId: item.instId,
                    Price: Number(item.px),
                    Amount: Number(item.sz),
                    Type: item.side == "sell" ? ORDER_TYPE_SELL : ORDER_TYPE_BUY,
                    DealAmount: 0,
                    Status: ORDER_STATE_PENDING
                }
            })
            let rets = []
            if (self.ctx.isFutures) {
                for (let i = 0; i < args.length; i += 5) {
                    let ret = self.ctx.e.IO("api", "POST", "/fapi/v1/batchOrders", "", JSON.stringify({
                        batchOrders: args.slice(i, i + 5)
                    }))
                    if (Debug) {
                        Log("batchOrders", args, ret)
                    }
                    rets.push(ret)
                }
            } else {
                orders.forEach(function(order) {
                    let ret = self.ctx.e.IO("api", "POST", self.tradePath, "", JSON.stringify(order))
                    if (Debug) {
                        Log("batchOrders", args, ret)
                    }
                    rets.push(ret)
                })
            }
            return rets
        }

        self.cancelOrders = function(orders) {
            let ts = new Date().getTime()

            orders.forEach(function(item) {
                if (typeof(self.account.cancelPending[item.clOrdId]) === 'undefined') {
                    self.account.cancelPending[item.clOrdId] = {
                        retry: 0,
                        ts: ts,
                        data: item
                    }
                }
            })

            for (let id in self.account.cancelPending) {
                let item = self.account.cancelPending[id]
                if (ts - item.ts > 10000) {
                    // recancel
                    orders.push(item.data)
                    Log("remove timeout order", item, "#ff0000")
                    item.retry += 1
                    item.ts = ts
                }
                if (item.retry > 10) {
                    Log("force remove order", item, "#ff0000")
                    delete self.account.cancelPending[id]
                }
            }


            let mp = {}
            orders.forEach(function(item) {
                if (typeof(mp[item.instId]) === 'undefined') {
                    mp[item.instId] = []
                }
                mp[item.instId].push(item.clOrdId)
                delete self.getOrdersMap(item.instId)[item.clOrdId]
            })
            let rets = []
            if (self.ctx.isFutures) {
                for (let instId in mp) {
                    let arr = mp[instId]
                    for (let i = 0; i < arr.length; i += 5) {
                        let ids = arr.slice(i, i + 5)
                        let ret = self.ctx.e.IO("api", "DELETE", "/fapi/v1/batchOrders", "", JSON.stringify({
                            symbol: instId,
                            origClientOrderIdList: ids
                        }))
                        if (Debug) {
                            Log("cancelOrders", instId, arr, ret)
                        }
                        // cancel success
                        if (ret && ret.length == ids.length) {
                            ids.forEach(function(id) {
                                delete self.account.cancelPending[id]
                            })
                        }
                        rets.push(ret)
                    }
                }
            } else {
                for (let i = 0; i < orders.length; i += 5) {
                    let ret = self.ctx.e.IO("api", "DELETE", self.tradePath, "", JSON.stringify(orders[i]))
                    if (Debug) {
                        Log("cancelOrders", orders[i], ret)
                    }
                    rets.push(ret)
                }
            }

            return rets
        }

        self.processOrders = function(ts, data, reset) {
            if (Debug) {
                Log("ORDERS: ", data)
            }
            if (reset) {
                self.account.orders = {}
                for (let k in self.account.ordersCount) {
                    self.account.ordersCount[k] = 0
                }
            }
            let ret = []
            data.forEach(function(item) {
                let instId = item.s
                let dataOrder = {
                    Id: item.C || item.c,
                    instId: instId,
                    Info: item,
                    Price: Number(item.p),
                    Amount: Number(item.q),
                    Update: Number(item.T || item.E || ts),
                    Created: Number(item.O || item.E || ts),
                    Type: item.S == "BUY" ? ORDER_TYPE_BUY : ORDER_TYPE_SELL,
                    DealAmount: Number(item.z)
                }
                if (typeof(item.ap) !== 'undefined') {
                    dataOrder.AvgPrice = Number(item.ap)
                } else if (Number(item.z) > 0 && typeof(item.Z) !== 'undefined') {
                    dataOrder.AvgPrice = Number(item.Z) / Number(item.z)
                }

                if (item.X == "NEW") {
                    dataOrder.Status = ORDER_STATE_PENDING
                    self.account.ordersCount.push += 1
                    self.account.ordersCount.pending += 1
                } else if (item.X == "PARTIALLY_FILLED") {
                    dataOrder.Status = ORDER_STATE_PENDING
                } else if (item.X == "FILLED") {
                    dataOrder.Status = ORDER_STATE_CLOSED
                    self.account.ordersCount.filled += 1
                    self.account.ordersCount.pending -= 1
                } else if (item.X == "CANCELED" || item.X == "EXPIRED" || item.X == "REJECT" || item.X == "NEW_INSURANCE" || item.X == "NEW_ADL") {
                    dataOrder.Status = ORDER_STATE_CANCELED
                    self.account.ordersCount.canceled += 1
                    self.account.ordersCount.pending -= 1
                } else {
                    throw "unknow order state " + JSON.stringify(item)
                }

                // remove from cancelPending orders
                if (dataOrder.Status != ORDER_STATE_PENDING) {
                    delete self.account.cancelPending[dataOrder.Id]
                    if (Debug) {
                        Log("remove from cancel pending orders", dataOrder)
                    }
                }

                let mp = self.getOrdersMap(instId)
                let oldOrder = mp[dataOrder.Id]

                if ((!oldOrder) || (dataOrder.DealAmount != oldOrder.DealAmount)) {
                    if (item.X == "PARTIALLY_FILLED" || item.X == "FILLED") {
                        Log(item.X, item.S, dataOrder)
                    }
                }

                let update = false
                if (dataOrder.Status == ORDER_STATE_PENDING) {
                    // 修改订单的命令还没返回就收到了new订单的update导致时间序列错乱
                    if (oldOrder) {
                        update = true
                        Object.assign(oldOrder, dataOrder)
                    } else {
                        mp[dataOrder.Id] = dataOrder
                        update = true
                    }
                    if (Debug) {
                        Log("update order", Boolean(oldOrder), mp[dataOrder.Id], item)
                    }
                } else {
                    update = true
                    if (oldOrder) {
                        // avoid ref
                        Object.assign(oldOrder, dataOrder)
                        delete mp[dataOrder.Id]
                    }
                    if (Debug) {
                        Log("order " + item.X, dataOrder)
                    }
                }
                if (update) {
                    ret.push(dataOrder)
                }
                self.account.ordersUpdate = ts
            })
            return ret
        }

        self.processPrivateMsg = function(msg) {
            let obj = JSON.parse(msg)
            if (Debug) {
                Log(obj, "#ff0000")
            }
            let event = {}
            if (obj.e == "ORDER_TRADE_UPDATE") {
                event.orders = self.processOrders(obj.E, [obj.o])
                event.ts = obj.E
                self.isReadyDic["orders"] = true
            } else if (obj.e == "ACCOUNT_UPDATE" && obj.a) {
                event.ts = obj.E
                self.account.balanceUpdate = obj.E
                if (obj.a.B) {
                    obj.a.B.forEach(function(item) {
                        self.account.balance[item.a] = {
                            free: Number(item.wb),
                            locked: 0
                        }
                    })
                    event.balance = self.account.balance
                }
                if (obj.a.P) {
                    obj.a.P.forEach(function(item) {
                        self.account.positions[item.s] = {
                            Amount: Number(item.pa),
                            Price: Number(item.ep)
                        }
                        self.account.positionsUpdate = obj.E
                    })
                    event.positions = self.account.positions
                }
                self.isReadyDic["account"] = true
            } else if (obj.e == "outboundAccountPosition") {
                event.ts = obj.E
                self.account.balanceUpdate = obj.E
                if (obj.B) {
                    obj.B.forEach(function(item) {
                        self.account.balance[item.a] = {
                            free: Number(item.f),
                            locked: Number(item.l)
                        }
                    })
                    event.balance = self.account.balance
                }
                self.isReadyDic["account"] = true
            } else if (obj.e == "executionReport") {
                event.orders = self.processOrders(obj.E, [obj])
                event.ts = obj.E
                self.isReadyDic["orders"] = true
            } else {
                //Log("RECV", "<" + msg + ">")
            }

            if (event.ts) {
                self.ctx.processTick(event)
            }
        }

        self.poll = function(timeout) {
            let ts = new Date().getTime()
            if (self.lastPing == 0) {
                self.lastPing = ts
            }
            if (!self.listenKey || ts - self.listenKeyUpdate > 60000 * 30) {
                let ret = self.ctx.e.IO("api", "POST", self.ctx.isFutures ? "/fapi/v1/listenKey" : (self.useMargin ? "/sapi/v1/userDataStream" : "/api/v3/userDataStream"))
                if (ret && ret.listenKey) {
                    self.listenKey = ret.listenKey
                    self.listenKeyUpdate = ts
                    //Log("ListenKey Update", ret)
                }
            }
            if (!self.listenKey) {
                return
            }
            if (self.ws == null) {
                let base = (self.ctx.isFutures ? 'wss://fstream.binance.com' : 'wss://stream.binance.com:9443') + "/ws"
                Log("Dial: ", base + "/*****")
                self.ws = Dial(base + "/" + self.listenKey)
            }

            if (!self.ws) {
                return;
            }

            let lastRead = false
            while (true) {
                let msg = self.ws.read(-1)
                if (msg == "") {
                    Log("Binance private websocket reset")
                    self.reset()
                    break
                }
                if (msg == null) {
                    if (typeof(timeout) == 'number' && timeout > 0) {
                        msg = self.ws.read(timeout)
                        lastRead = true
                    }
                }
                if (msg != null && msg != "") {
                    //Log("BP", msg)
                    if (msg == "ping") {
                        self.ws.write("pong")
                        self.lastPing = ts
                    } else if (msg != "pong") {
                        self.processPrivateMsg(msg)
                    }
                } else {
                    break
                }
                if (lastRead) {
                    break
                }
            }
        }
        return self
    }

    function NewBinanceWebSocketPublic(e, onLogin, onTick) {
        let self = {
            e: e,
            key: e.GetName() + '/' + e.GetCurrency(),
            quoteCurrency: e.GetQuoteCurrency(),
            name: e.GetName(),
            isFutures: e.GetName().indexOf("Futures_") == 0,
            ws: null,
            cache: {},
            depthCount: 0,
            depthConsumed: 0,
            lastPing: 0,
            isReadyDic: {}
        }
        self.base = self.isFutures ? "wss://fstream.binance.com/ws" : "wss://stream.binance.com/ws"

        self.wsPrivate = NewBinanceSocketPrivate(self)

        self.reset = function() {
            if (self.ws) {
                self.ws.close()
                self.ws = null
            }
            self.isReadyDic = {}
        }

        self.processTick = function(event) {
            if (typeof(onTick) !== 'function') {
                return
            }
            let ret = onTick(self, event)
            if (ret) {
                if (ret.amendOrders && ret.amendOrders.length > 0) {
                    ret.ctx.wsPrivate.amendOrders(ret.amendOrders)
                }
                if (ret.cancelOrders && ret.cancelOrders.length > 0) {
                    ret.ctx.wsPrivate.cancelOrders(ret.cancelOrders)
                }
                if (ret.newOrders && ret.newOrders.length > 0) {
                    ret.ctx.wsPrivate.batchOrders(ret.newOrders)
                }
            }
        }

        self.processMsg = function(msg) {
            if (Debug) {
                Log("MSG:", msg)
            }
            let obj = JSON.parse(msg)
            if (obj.error) {
                Log(obj)
                throw obj.error.msg
            }

            let event = {
                ts: obj.E,
                instId: obj.s
            }

            if (obj.e == "depthUpdate") {
                let depth = {
                    asks: [],
                    bids: []
                }
                obj.b.forEach(function(item) {
                    depth.bids.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                obj.a.forEach(function(item) {
                    depth.asks.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                event.depth = depth
                //self.depthTime = obj.data.E
            } else if (obj.e == 'aggTrade') {
                event.ts = obj.E
                event.trades = [{
                    price: Number(obj.p),
                    qty: Number(obj.q),
                    ts: obj.T,
                    side: obj.m ? "sell" : "buy"
                }]
            } else if (typeof(obj.asks) !== 'undefined') {
                let depth = {
                    asks: [],
                    bids: []
                }
                obj.bids.forEach(function(item) {
                    depth.bids.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                obj.asks.forEach(function(item) {
                    depth.asks.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                event.ts = obj.E || new Date().getTime()
                event.depth = depth
            } else {
                Log(">>>", msg)
                return
            }

            self.processTick(event)
        }

        self.isReady = function() {
            return self.wsPrivate.ws != null
        }

        self.poll = function(timeout) {
            let ts = new Date().getTime()
            if (!self.ws) {
                Log("Dial: ", self.base)
                self.ws = Dial(self.base)
                if (self.ws) {
                    onLogin(self.ws, self.e)
                }
            }
            if (!self.ws) {
                return
            }
            let lastRead = false
            while (true) {
                let msg = self.ws.read(-1)
                if (msg == "") {
                    if (Debug) {
                        Log("DEBUG> RESET websocket", self.base, "#ff0000")
                    }
                    self.reset()
                    break
                }
                if (msg == null) {
                    if (typeof(timeout) == 'number' && timeout > 0) {
                        msg = self.ws.read(timeout)
                        lastRead = true
                    }
                }
                if (msg != null && msg != "") {
                    if (msg == "ping") {
                        self.ws.write("pong")
                        self.lastPing = ts
                    } else if (msg == "pong") {
                        // ignore
                    } else {
                        self.wsPrivate.poll()
                        self.processMsg(msg)
                        self.wsPrivate.poll()
                    }
                } else {
                    break
                }
                if (lastRead) {
                    break
                }
            }
            self.wsPrivate.poll()
        }
        return self
    }
    if (typeof(__threadId) == 'function' && __threadId() != 0) {
        // thread register
        this.NewWSS = function(e, onWSSLogin, onWSSTick) {
            let pfn = null
            if (e.GetName().indexOf("Binance") != -1) {
                pfn = NewBinanceWebSocketPublic
                Log("New Binance websocket", e.GetName(), e.GetCurrency())
            } else {
                pfn = NewOKXWebSocketPublic
                Log("New OKX Websocket", e.GetName(), e.GetCurrency())
            }
            return pfn(e, onWSSLogin, onWSSTick)
        }
        return
    }
    let pfn = null
    if (e.GetName().indexOf("Binance") != -1) {
        pfn = NewBinanceWebSocketPublic
        Log("New Binance websocket", e.GetName(), e.GetCurrency())
    } else {
        pfn = NewOKXWebSocketPublic
        Log("New OKX Websocket", e.GetName(), e.GetCurrency())
    }
    return pfn(e, onWSSLogin, onWSSTick)
}


function onTick(ctx, event) {
    if (event.depth) {
        Log("depth update", event)
    }
    if (event.trades) {
        Log("trades received", event)
    }
    if (event.balance || event.positions) {
        Log("account update", event)
    }
    if (event.orders) {
        Log("private orders update", event)
    }

    // include orders, positions, balance for latest
    Log("account", ctx.wsPrivate.account)

    // for test only
    if (false) {
        return {
            amendOrders: [{
                instId: event.instId,
                clOrdId: "xxxx*****",
                cxlOnFail: true,
                newSz: "2",
            }],
            newOrders: [{
                instId: event.instId,
                clOrdId: UUID(),
                side: "sell",
                tdMode: "cross",
                ordType: "post_only",
                px: event.depth.asks[0].price.toFixed(4),
                sz: "1",
            }, {
                instId: event.instId,
                clOrdId: UUID(),
                side: "sell",
                tdMode: "cross",
                ordType: "post_only",
                px: event.depth.asks[0].price.toFixed(4),
                sz: "1",
            }],
            cancelOrders: [{
                instId: order.instId,
                clOrdId: order.Id
            }]
        }
    }
}

function main() {
    let instId = exchange.SetContractType("swap").InstrumentID

    let ctx = $.NewWSS(exchange, function(ws) {
        let msg = null
        if (exchange.GetName() === 'Futures_OKCoin') {
            msg = {
                op: "subscribe",
                args: [{
                    channel: "books5",
                    instId: instId,
                }, {
                    channel: "trades",
                    instId: instId,
                }]
            }
        } else {
            let symbol = exchange.GetCurrency().replace('_', '').toLowerCase()
            msg = {
                method: "SUBSCRIBE",
                params: [symbol + "@aggTrade", symbol + "@depth20@100ms"],
                id: 1,
            }
        }
        ws.write(JSON.stringify(msg))
        Log("subscribe", msg, "channel")
        LogStatus("Ready")
    }, onTick, false)

    while (true) {
        ctx.poll()
        EventLoop(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/395045

> Last Modified

2024-01-02 16:36:13
