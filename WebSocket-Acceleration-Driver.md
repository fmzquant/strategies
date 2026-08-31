
> Name

WebSocket-Acceleration-Driver

> Author

发明者量化

> Strategy Description


### WebSocket Acceleration Strategy 

#### Title:
WebSocket Acceleration for Real-time Market Data Processing (FMZ Quant)

#### Description:
This strategy optimizes the use of WebSocket connections to accelerate the real-time data processing for multiple exchanges in the FMZ quant trading platform. By leveraging WebSocket connections for deep order books and trades, this code significantly reduces latency in fetching market data and enhances performance, particularly for high-frequency trading (HFT) systems.

Key Features:
- **Multi-exchange Support:** This strategy supports Binance, OKX, Bybit, Bitget, and other exchanges via WebSocket, ensuring a faster and more reliable data feed compared to traditional REST API polling.
- **Customizable Subscription:** It allows subscription to specific market channels (depth, trades, etc.) and processes the received data efficiently for immediate use in trading strategies.
- **Advanced Error Handling:** Built-in error tracing and WebSocket reconnection mechanisms ensure the reliability and continuity of the data feed.
- **CRC32 Checksum Validation:** For exchanges like OKX, the code integrates a CRC32 checksum validation to ensure the integrity of received order book data.

This WebSocket-based solution replaces the traditional API polling with real-time updates, making it ideal for traders who need to minimize latency and maximize market responsiveness.

#### How to Use:
1. **Initialization:** Use `$.setupWebsocket()` to initialize WebSocket connections for your target exchanges.
2. **Subscription:** The system automatically subscribes to relevant channels (depth, trades, etc.) for the symbols you are trading.
3. **Data Retrieval:** Market data (depth and trades) is processed and returned by calling `GetDepth()` and `GetTrades()`. These functions automatically utilize the real-time WebSocket data if available.
4. **Error Handling:** The strategy includes a trace mechanism to log connection and data errors, and automatically attempts to reconnect when connections drop.

This script is designed to run on the FMZ quant platform, providing fast, reliable, and scalable access to market data across multiple exchanges.



``` javascript
function main() {
    $.setupWebsocket()
    while (true) {
        exchanges.map(e=>{
            Log(e.GetName(), e.GetDepth())
            Log(e.GetName(), e.GetTrades())
            // support custom and auto subsribe Eg: e.GetDepth('ETH_USDT')
        })
        EventLoop(100) // trigger by websocket or use Sleep control delay
    }
}
```





> Source (javascript)

``` javascript
// @ts-check

$.setupWebsocket = function(main_exchanges) {
    let crc32 = function (r) {
        for (var a, o = [], c = 0; c < 256; c++) {
            a = c;
            for (var f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
            o[c] = a
        }
        for (var n = -1, t = 0; t < r.length; t++) n = n >>> 8 ^ o[255 & (n ^ r.charCodeAt(t))];
        return (-1 ^ n) >>> 0
    }

    let trace = function (...args: any[]) {
        args.unshift('#' + __threadId())
        Log.apply(this, args)
    }
    
    let MyDial = function(address) : IDial {
        let ws = Dial(address)
        if (ws) {
            let createTime = new Date().getTime()
            let oldClose = ws.close
            ws.close = function() {
                oldClose.apply(ws)
                trace(address, "closed after", (new Date().getTime() - createTime)/1e6, "seconds")
            }
        }
        trace("connect", address, ws ? "success" : "failed")
        return ws
    }

    interface ICtx {
        name: string
        symbols: string[]
        callback?: Function
    }
    let lastUpdateSymbolsTime = new Date().getTime()
    let updateSymbols = function(ctx: ICtx, callBack: Function) {
        let ts = new Date().getTime()
        if (ts - lastUpdateSymbolsTime < 5000) {
            return
        }
        lastUpdateSymbolsTime = ts
        let e = __threadPeekMessage(-1)
        if (e) {
            trace("subscribe", e, "#ff0000")
            callBack(e.symbol, e.method)
            if (e.method == "subscribe") {
                ctx.symbols.push(e.symbol)
            } else {
                ctx.symbols = ctx.symbols.filter(symbol=>symbol!=e.symbol)
            }
        }
    }

    let supports = {}
    supports["Binance"] = function (ctx:ICtx) {
        let processMsg = function (obj) {
            let event = {
                ts: obj.E,
                instId: obj.s,
                depth: null,
                trades: [],
            }

            if (obj.e == "depthUpdate") {
                let depth = {
                    asks: [],
                    bids: []
                }
                obj.b.forEach(function (item) {
                    depth.bids.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                obj.a.forEach(function (item) {
                    depth.asks.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                event.depth = depth
            } else if (obj.e == 'bookTicker') {
                event.depth = {
                    asks: [{ price: Number(obj.a), qty: Number(obj.A) }],
                    bids: [{ price: Number(obj.b), qty: Number(obj.B) }]
                }
            } else if (obj.e == 'aggTrade') {
                event.ts = obj.E
                event.trades = [{
                    price: Number(obj.p),
                    qty: Number(obj.q),
                    ts: obj.T,
                    side: obj.m ? "sell" : "buy"
                }]
            } else if (typeof (obj.asks) !== 'undefined') {
                event.ts = obj.E || new Date().getTime()
                let depth = {
                    asks: [],
                    bids: []
                }
                obj.bids.forEach(function (item) {
                    depth.bids.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                obj.asks.forEach(function (item) {
                    depth.asks.push({
                        price: Number(item[0]),
                        qty: Number(item[1])
                    })
                })
                event.depth = depth
            } else {
                return
            }
            return event
        }
        let channels = ["depth20@100ms", /*"bookTicker", */"aggTrade"]
 
        let ws = null
        let endPoint = "wss://stream.binance.com/stream"
        if (ctx.name == "Futures_Binance") {
            endPoint = "wss://fstream.binance.com/stream"
        }
        
        while (true) {
            if (!ws) {
                let subscribes = []
                ctx.symbols.forEach(function (symbol) {
                    channels.forEach(function (channel) {
                        subscribes.push(symbol.toLowerCase() + "@" + channel)
                    })
                })
                ws = MyDial(endPoint + (subscribes.length > 0 ? ("?streams=" + subscribes.join("/")) : ""))
            }
            if (!ws) {
                Sleep(1000)
                continue
            }
            updateSymbols(ctx, function(symbol:string, method:string) {
                ws.write(JSON.stringify({ 
                    "method": method.toUpperCase(), 
                    "params": channels.map(c=>symbol.toLowerCase()+'@'+c),
                    "id": 2
                }))
            })
            let ts = new Date().getTime()
            let msg = ws.read(1000)
            if (!msg) {
                if (msg == "") {
                    trace("websocket is closed")
                    ws.close()
                    ws = null
                }
                continue
            }
            if (msg == 'ping') {
                ws.write('pong')
            } else if (msg == 'pong') {

            } else {
                let obj = JSON.parse(msg)
                if (obj.error) {
                    trace(obj.error.msg, "#ff0000")
                    continue
                }
                if (!obj.stream) {
                    continue
                }
                if (obj.stream.indexOf("depth") != -1) {
                    if (typeof(obj.data.s) !== 'string') {
                        // patch
                        obj.data.s = obj.stream.split('@')[0].toUpperCase()
                    }
                }
                let event = processMsg(obj.data)
                if (event) {
                    ctx.callback(event)
                }
            }
        }
    }

    supports["OK"] = function (ctx:ICtx) {
        let depthDicAll = {}
        let processMsg = function (msg) {
            let obj = JSON.parse(msg)
            if (obj.error) {
                trace(obj.error.msg, "#ff0000")
                return
            }
    
            if (obj.event == 'subscribe') {
                // ignore
            } else if (obj.event == 'error') {
                trace(obj.msg, "#ff0000")
                return
            } else if (obj.event == 'login') {
            } else {
                if (!obj.data) {
                    trace(msg)
                    return
                }
                let instId = obj.arg.instId
    
                let event = {
                    ts: new Date().getTime(),
                    instId: instId,
                    depth: null,
                    trades: [],
                }
    
                obj.data.forEach(function (item) {
                    if (obj.arg.channel == 'trades') {
                        event.ts = Number(item.ts)
                        event.trades.push({
                            ts: Number(item.ts),
                            side: item.side,
                            price: Number(item.px),
                            qty: Number(item.sz)
                        })
                    } else if (obj.arg.channel == 'books5' || obj.arg.channel == 'books' || obj.arg.channel == 'books50-l2-tbt') {
                        let depth = {
                            asks: [],
                            bids: []
                        }
                        if (obj.arg.channel == 'books5') {
                            item.asks.forEach(function (pair) {
                                depth.asks.push({
                                    price: Number(pair[0]),
                                    qty: Number(pair[1])
                                })
                            })
                            item.bids.forEach(function (pair) {
                                depth.bids.push({
                                    price: Number(pair[0]),
                                    qty: Number(pair[1])
                                })
                            })
                        } else {
                            let depthDic = depthDicAll[instId]
                            if (typeof (depthDic) === 'undefined') {
                                depthDic = {
                                    count: 0,
                                    dic: {
                                        asks: {},
                                        bids: {}
                                    }
                                }
                                depthDicAll[instId] = depthDic
                            }
                            depthDic.count += 1
                            for (let k in depthDic.dic) {
                                if (obj.action == 'snapshot') {
                                    depthDic.dic[k] = {}
                                }
                                let mp = depthDic.dic[k]
                                item[k].forEach(function (book) {
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
                                Object.keys(depthDic.dic[k]).sort(function (a, b) {
                                    return n * (Number(a) - Number(b))
                                }).forEach(function (x) {
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
                                    ['bids', 'asks'].forEach(function (k) {
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
                return event
            }
        }
        let channels = ['books5', 'trades']
        let ws = null
        let lastPing = new Date().getTime()
        while (true) {
            if (!ws) {
                depthDicAll = {} // reset
                ws = MyDial("wss://ws.okx.com:8443/ws/v5/public")
                if (ws) {
                    let subscribes = []
                    ctx.symbols.forEach(function (symbol) {
                        channels.forEach(function (channel) {
                            subscribes.push({
                                channel: channel,
                                instId: symbol // "BTC-USDT"
                            })
                        })
                    })
                    if (subscribes.length > 0) {
                        ws.write(JSON.stringify({ "op": "subscribe", "args": subscribes }))
                    }
                }
            }
            if (!ws) {
                Sleep(1000)
                continue
            }
            updateSymbols(ctx, function(symbol:string, method:string) {
                ws.write(JSON.stringify({ 
                    "op": method, 
                    "args": channels.map(c=>({channel: c, instId: symbol})) 
                }))
            })
            // every 10 seconds
            let ts = new Date().getTime()
            if (ts - lastPing > 10000) {
                ws.write("ping")
                lastPing = ts
            }
            let msg = ws.read(1000)
            if (!msg) {
                if (msg == "") {
                    trace("websocket is closed")
                    ws.close()
                    ws = null
                }
                continue
            } 
            if (msg != 'pong') {
                let event = processMsg(msg)
                if (event && (event.depth || (event.trades && event.trades.length > 0))) {
                    ctx.callback(event)
                }
            }
        }
    }

    supports["Bybit"] = function (ctx:ICtx) {
        let depthMp = {}
        let processMsg = function (obj:any) {
            let event = {
                ts: obj.ts,
                instId: obj.data.s,
                depth: null,
                trades: [],
            }

            if (obj.topic.startsWith("orderbook")) {
                let depthDic = depthMp[event.instId]
                if (typeof(depthDic) === 'undefined') {
                    depthDic = {}
                    depthMp[event.instId] = depthDic
                }
                let data = {asks: obj.data.a, bids: obj.data.b}
                let depth = {asks: [], bids: []}
                if (obj.type == "snapshot") {
                    depthDic.asks = {}
                    depthDic.bids = {}
                    for (let k in depth) {
                        if (!data[k]) {
                            continue
                        }
                        depth[k] = data[k].map(function(item) {
                            depthDic[k][item[0]] = item[1]
                            return {
                                price: Number(item[0]),
                                qty: Number(item[1]),
                            }
                        })
                    }
                } else if (obj.type == "delta") {
                    depthDic.count++
                    for (let k in depth) {
                        if (!data[k]) {
                            continue
                        }
                        data[k].forEach(function(item) {
                            if (item[1] == '0') {
                                delete depthDic[k][item[0]]
                            } else {
                                depthDic[k][item[0]] = item[1]
                            }
                        })
                    }
                    // build depth
                    for (let k in depth) {
                        let n = k == 'asks' ? 1 : -1
                        let mp = depthDic[k]
                        Object.keys(depthDic[k]).sort(function(a, b) {
                            return n * (Number(a) - Number(b))
                        }).forEach(function(x) {
                            depth[k].push({
                                price: x,
                                qty: mp[x]
                            })
                        })
                    }
                    // convert to number
                    for (let dir in depth) {
                        depth[dir].forEach(function(item) {
                            item.price = Number(item.price)
                            item.qty = Number(item.qty)
                        })
                    }
                }
                depth.asks = depth.asks.slice(0, 50)
                depth.bids = depth.bids.slice(0, 50)
                event.depth = depth
            } else if (obj.topic.startsWith("publicTrade")) {
                event.trades = obj.data.map(function(item) {
                    if (!event.instId) {
                        event.instId = item.s
                    }
                    return {
                        //id: item.i,
                        ts: item.T,
                        price: Number(item.p),
                        qty: Number(item.v),
                        side: item.S.toLowerCase()
                    }
                })
            }
            return event
        }
        let channels = ["orderbook.50", "publicTrade"]

        let ws = null
        let endPoint = "wss://stream.bybit.com/v5/public/spot"
        let isInverse = false
        ctx.symbols.forEach(s=>{
            let prefix = s.split('.')[0]
            if (!prefix.endsWith('USDT') && !prefix.endsWith('USDC')) {
                isInverse = true;
            } else {
                if (isInverse) {
                    throw "symbols type not support concurrent"
                }
            }
        })
        if (ctx.name == "Futures_Bybit") {
            endPoint = "wss://stream.bybit.com/v5/public/linear"
            if (isInverse) {
                endPoint = "wss://stream.bybit.com/v5/public/inverse"
            }
        }
        let lastPing = new Date().getTime()
        while (true) {
            if (!ws) {
                ws = MyDial(endPoint)
                if (ws) {
                    let subscribes = []
                    ctx.symbols.forEach(function (symbol) {
                        channels.forEach(function (channel) {
                            subscribes.push(channel+ "." + symbol)
                        })
                    })
                    if (subscribes.length > 0) {
                        ws.write(JSON.stringify({ op:"subscribe", args: subscribes }))
                    }
                }
            }
            if (!ws) {
                Sleep(1000)
                continue
            }
            // every 10 seconds
            let ts = new Date().getTime()
            if (ts - lastPing > 10000) {
                ws.write(JSON.stringify({ op: "ping" }))
                lastPing = ts
            }

            updateSymbols(ctx, function(symbol:string, method:string) {
                ws.write(JSON.stringify({ 
                    "op": method, 
                    "args": channels.map(c=>c+"."+symbol)
                }))
            })
            let msg = ws.read(1000)
            if (!msg) {
                if (msg == "") {
                    trace("websocket is closed")
                    ws.close()
                    ws = null
                    depthMp = {}
                }
                continue
            } else if (msg) {
                let obj = JSON.parse(msg)
                if (obj.op == "ping" && obj.ret_msg == "pong") {
                    // ignore
                } else if (obj.op == 'pong') {
                } else if (obj.op == 'subscribe' || obj.op == 'unsubscribe' || !obj.topic) {
                    trace(obj)
                } else {
                    try {
                        let event = processMsg(obj)
                        if (event && (event.depth || event.trades.length > 0)) {
                            ctx.callback(event)
                        }
                    } catch(e) {
                        trace("Error:", msg)
                        ws.close()
                    }
                }
            }
        }
    }

    supports["Bitget"] = function (ctx:ICtx) {
        let processMsg = function (obj) {
            let event = {
                ts: Number(obj.ts),
                instId: obj.arg.instId,
                depth: null,
                trades: [],
            }

            if (obj.arg.channel == 'trade') {
                event.trades = obj.data.map(function(item) {
                    return {
                        //id: Number(item.tradeId),
                        ts: Number(item.ts),
                        price: Number(item.price),
                        qty: Number(item.size),
                        side: item.side.toLowerCase()
                    }
                })
            } else if (obj.arg.channel == 'books15') {
                let depth = {asks: [], bids: []}
                for (let k in depth) {
                    if (!obj.data[0][k]) {
                        continue
                    }
                    depth[k] = obj.data[0][k].map(function(item) {
                        return { price: Number(item[0]), qty: Number(item[1]) }
                    })
                }
                event.depth = depth
            }
            return event
        }
        let geInstType = function(s) {
            if (ctx.name.indexOf("Futures_") == 0) {
                let supports = {
                    "USDT": "USDT-FUTURES",
                    "USD": "COIN-FUTURES",
                    "USDC": "USDC-FUTURES"
                        //"SUMCBL": "SUSDT-FUTURES",
                        //"SDMCBL": "SCOIN-FUTURES",
                        //"SCMCBL": "SUSDC-FUTURES"
                }
                let quotes = Object.keys(supports)
                for (let i = 0; i < quotes.length; i++) {
                    if (s.endsWith(quotes[i])) {
                        return supports[quotes[i]]
                    }
                }
            }
            return "SPOT";
        }
        
        let channels = ['books15', 'trade']
        let ws = null
        let lastPing = new Date().getTime()
        while (true) {
            if (!ws) {
                ws = MyDial("wss://ws.bitget.com/v2/ws/public")
                if (ws) {
                    let subscribes = []
                    ctx.symbols.forEach(function (symbol) {
                        channels.forEach(function (channel) {
                            subscribes.push({instType: geInstType(symbol), channel: channel, instId: symbol})
                        })
                    })
                    if (subscribes.length > 0) {                 
                        ws.write(JSON.stringify({ op: "subscribe", args: subscribes }))
                    }
                }
            }
            if (!ws) {
                Sleep(1000)
                continue
            }
            updateSymbols(ctx, function(symbol:string, method:string) {
                ws.write(JSON.stringify({ 
                    "op": method, 
                    "args": channels.map(c=>({instType: geInstType(symbol), channel: c, instId: symbol}))
                }))
            })
            // every 10 seconds
            let ts = new Date().getTime()
            if (ts - lastPing > 10000) {
                ws.write("ping")
                lastPing = ts
            }
            let msg = ws.read(1000)
            if (!msg) {
                // is closed
                if (msg == "") {
                    trace("websocket is closed")
                    ws.close()
                    ws = null
                }
                continue
            }
            if (msg == "ping" || msg == "pong") {
                continue
            }
            let obj = JSON.parse(msg)
            if (obj.event == "ping") {
                ws.write(JSON.stringify({event: "ping"}))
            } else if (obj.data && obj.arg && obj.arg.channel) {
                let event = processMsg(obj)
                if (event && (event.depth || (event.trades && event.trades.length > 0))) {
                    ctx.callback(event)
                }
            } else {
                trace(msg)
            }
        }
    }

    let getFunction = function (eName:String) {
        for (let key in supports) {
            if (eName.toLowerCase().indexOf(key.toLowerCase()) != -1) {
                return supports[key]
            }
        }
    }

    this.wssPublic = function (ctx:ICtx) {
        let func = getFunction(ctx.name)
        if (!func) {
            throw "not support " + ctx.name
        }
        trace("#"+__threadId(), "init websocket for", ctx.name)
        return func(ctx)
    }
    
    function threadMarket(eName: string, symbols: string[]) {
        let trades = []
        let tradeId = 0
        let currentTid = __threadId()
        this.wssPublic({ name: eName, symbols: symbols, callback: function (event) {
            let tick = {event: 'tick', name: eName, method: ''}
            if (event.depth) {
                tick.method = event.instId+'_depth'
                __threadSetData(currentTid, tick.method, event)
            } else if (event.trades) {
                tick.method = event.instId+'_trades'
                event.trades.forEach(item=>{
                    trades.push({
                        Id: ++tradeId,
                        Time: item.ts, 
                        Price: item.price,
                        Amount: item.qty,
                        Type: item.side == 'buy' ? 0 : 1
                    })
                })
                let tradePos = __threadGetData(currentTid, "tradePos")
                if (typeof(tradePos) === 'number') {
                    while (trades.length > 0 && (trades[0].Id <= tradePos || trades.length > 1000)) {
                        trades.shift()
                    }
                }
                __threadSetData(currentTid, tick.method, trades)
            }
        }})
    }

    if (__threadId() > 0) {
        return
    }
    // init inside main thread
    let tidMap = {}
    if (typeof(main_exchanges) === 'undefined') {
        main_exchanges = exchanges
    }
    main_exchanges.forEach(function(e) {
        let markets = e.GetMarkets()
        let eName = e.GetName()

        if (typeof(getFunction(eName)) !== 'function') {
            Log(eName, "websocket driver is not implemented yet")
            return
        }

        let tid = tidMap[eName]
        let subscribe = {}
        if (typeof(tid) !== 'number') {
            tid = __Thread([threadMarket, eName, []], [$.setupWebsocket])
            tidMap[eName] = tid
        }

        let getSymbol = function(symbol) {
            if (typeof(symbol) === 'undefined') {
                symbol = e.GetCurrency()
                if (e.GetName().indexOf("Futures_") != -1) {
                    symbol += '.' + e.GetContractType()
                }
            }
            if (typeof(subscribe[symbol]) === 'undefined') {
                let info = markets[symbol]
                if (info) {
                    subscribe[symbol] = true
                    __threadPostMessage(tid, {method: 'subscribe', symbol: info.Symbol})
                }
            }
            return symbol                
        }
        let origin_GetDepth = e.GetDepth
        let origin_GetTrades = e.GetTrades
        e.GetDepth = function(symbol) : IDepth {
            symbol = getSymbol(symbol)
            let info = markets[symbol]
            if (info) {
                let obj = __threadGetData(tid, info.Symbol+'_depth')
                if (obj) {
                    let delay = new Date().getTime() - obj.ts
                    if (delay < 3000) {
                        let ret = {Time: obj.ts, Asks: [], Bids: [], Symbol: symbol, Info: null, Alias: info.Symbol, Ref: 'websocket', Delay: delay};
                        obj.depth.asks.forEach(item=>{ret.Asks.push({Price: item.price, Amount: item.qty})})
                        obj.depth.bids.forEach(item=>{ret.Bids.push({Price: item.price, Amount: item.qty})})
                        return ret
                    }
                }
            }
            return origin_GetDepth(symbol) ;
        }
        e.GetTrades = function(symbol) : ITrade[] {
            symbol = getSymbol(symbol)
            let info = markets[symbol]
            if (info) {
                let obj = __threadGetData(tid, info.Symbol+'_trades')
                if (obj) {
                    if (obj.length > 0) {
                        __threadSetData(tid, "tradePos", obj[obj.length-1].Id)
                    }
                    return obj
                }
            }
            return origin_GetTrades(symbol) ;
        }
    })
}

function main() {
    $.setupWebsocket()
    if (typeof(threading) === 'undefined') {
        throw "please update docker to latest version"
    }
    while (true) {
        exchanges.map(e=>{
            Log(e.GetName(), e.GetDepth())
            Log(e.GetName(), e.GetTrades())
        })
        EventLoop(100) // trigger by websocket
    }
}

```

> Detail

https://www.fmz.com/strategy/470349

> Last Modified

2024-11-14 20:04:22
