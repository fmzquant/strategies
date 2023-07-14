
> Name

行情中心客户端market-center-client

> Author

fmzero

> Strategy Description

## 行情中心客户端

此[客户端](https://github.com/goex-top/market_center_client_fmz)配合[行情中心](https://github.com/goex-top/market_center)使用

## 为什么有行情中心

对于行情的访问有REST与Websocket，而Websocket由于种种不可抗拒的因素，导致其连接被强行断开，这时策略需做好种种容错机制。REST往往还是最稳的方式。
当你有多个策略在相同平台上跑时，如OKEx，而这多策略又在同一台服务器上，对于REST API的访问是有频率限制的(详情请参考个平台API文档), 限制的方式有多种，如IP限制，账号限制，或两者组合等。
使用行情中心可降低REST请求频率

![传统方式](https://raw.githubusercontent.com/goex-top/market_center/master/trandition.png)

![行情中心](https://raw.githubusercontent.com/goex-top/market_center/master/market_center.png)

## 行情中心部署
1. [源码](https://github.com/goex-top/market_center)编译部署
2. [二进制部署](https://github.com/goex-top/market_center/releases)
3. 需要帮助请联系wx:btstarinfo, Q:6510575

## 请注意
* 行情中心只提供行情数据接口，不提供下单接口
* 行情中心只能运行在Linux, Unix上

## API
* GetSupportList
* SubscribeSpotTicker
* SubscribeSpotDepth
* ~~SubscribeSpotTrade~~
* GetSpotTicker
* GetSpotDepth
* ~~GetSpotTrade~~
* SubscribeFutureTicker
* SubscribeFutureDepth
* ~~SubscribeFutureTrade~~
* GetFutureTicker
* GetFutureDepth
* ~~GetFutureTrade~~

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|udspath|/tmp/goex.market.center|行情中心路径|


> Source (javascript)

``` javascript
// a client for market center, https://github.com/goex-top/market_center
// api list 
// * GetSupportList
// * SubscribeSpotTicker
// * SubscribeSpotDepth
// * ~~SubscribeSpotTrade~~
// * GetSpotTicker
// * GetSpotDepth
// * ~~GetSpotTrade~~
// * SubscribeFutureTicker
// * SubscribeFutureDepth
// * ~~SubscribeFutureTrade~~
// * GetFutureTicker
// * GetFutureDepth
// * ~~GetFutureTrade~~

// params wit web
// var udspath = /tmp/goex.market.center //ref to https://github.com/goex-top/market_center/blob/1e1bb15c69a1da6fddbba3d506920e91f9ec7842/const.go#L35

// local variable
// var client = null

var ReqType = {
    ReqType_GetSupportList: 1,
    ReqType_SubscribeSpotDepth: 2,
    ReqType_SubscribeSpotTicker: 3,
    ReqType_SubscribeFutureDepth: 4,
    ReqType_SubscribeFutureTicker: 5,
    ReqType_GetSpotDepth: 6,
    ReqType_GetSpotTicker: 7,
    ReqType_GetFutureDepth: 8,
    ReqType_GetFutureTicker: 9,
}

//---------------------------------------
function newUDSClient() {
    var client = Dial('unix://'+udspath)
    if (null === client) {
        throw 'new usd client fail'
    }
    return client
}

function udsRequest(client, req) {
    try {
        client.write(JSON.stringify(req))
        var rsp = client.read(20)
        if (rsp === null) {
            return null
        }
    
        var obj = JSON.parse(rsp)
        if(obj.status !== 0) {
            return null
        }
        return obj.data
    }
    catch(e) {
        return null
    }
    
}

function GetSupportList(client) {
    var req = {type:ReqType.ReqType_GetSupportList}
    var rsp = udsRequest(client, req)
    if (rsp === null) {
        return null
    }
    return rsp
}

function GetSpotDepth(client, exchangeName, pair) {
    var req = {type:ReqType.ReqType_GetSpotDepth, exchange_name: exchangeName, currency_pair: pair}
    var rsp = udsRequest(client, req)
    if(rsp === null) {
        return null
    }
    return {Asks:rsp.AskList, Bids:rsp.BidList, Time:rsp.UTime, Info:rsp.rsp}
}

function GetSpotTicker(client, exchangeName, pair) {
    var req = {type:ReqType.ReqType_GetSpotTicker, exchange_name: exchangeName, currency_pair: pair}
    var rsp = udsRequest(client, req)
    if(rsp === null) {
        return null
    }
    return {
        Last:parseFloat(rsp.last), 
        Buy:parseFloat(rsp.buy), 
        Sell:parseFloat(rsp.sell), 
        Volume:parseFloat(rsp.vol), 
        Time:parseFloat(rsp.date), 
        High:parseFloat(rsp.high), 
        Low:parseFloat(rsp.low), 
        Info:rsp
    }
}

function SubscribeSpotDepth(client, exchangeName, pair, period) {
    var req = {type:ReqType.ReqType_SubscribeSpotDepth, exchange_name: exchangeName, currency_pair: pair, period: period}
    var rsp = udsRequest(client, req)
    return rsp
}

function SubscribeSpotTicker(client, exchangeName, pair, period) {
    var req = {type:ReqType.ReqType_SubscribeSpotTicker, exchange_name: exchangeName, currency_pair: pair, period: period}
    var rsp = udsRequest(client, req)
    return rsp
}

function GetFutureDepth(client, exchangeName, contractType, pair) {
    var req = {type:ReqType.ReqType_GetFutureDepth, exchange_name: exchangeName, contract_type: contractType, currency_pair: pair}
    var rsp = udsRequest(client, req)
    if(rsp === null) {
        return null
    }
    return {Asks:rsp.AskList, Bids:rsp.BidList, Time:rsp.UTime, Info:rsp.rsp}
}

function GetFutureTicker(client, exchangeName, contractType, pair) {
    var req = {type:ReqType.ReqType_GetFutureTicker, exchange_name: exchangeName, contract_type: contractType, currency_pair: pair}
    var rsp = udsRequest(client, req)
    if(rsp === null) {
        return null
    }
    return {
        Last:parseFloat(rsp.last), 
        Buy:parseFloat(rsp.buy), 
        Sell:parseFloat(rsp.sell), 
        Volume:parseFloat(rsp.vol), 
        Time:parseFloat(rsp.date), 
        High:parseFloat(rsp.high), 
        Low:parseFloat(rsp.low), 
        Info:rsp
    }
}

function SubscribeFutureDepth(client, exchangeName, contractType, pair, period) {
    var req = {type:ReqType.ReqType_SubscribeFutureDepth, exchange_name: exchangeName, contract_type: contractType, currency_pair: pair, period: period}
    var rsp = udsRequest(client, req)
    return rsp
}

function SubscribeFutureTicker(client, exchangeName, contractType, pair, period) {
    var req = {type:ReqType.ReqType_SubscribeFutureTicker, exchange_name: exchangeName, contract_type: contractType, currency_pair: pair, period: period}
    var rsp = udsRequest(client, req)
    return rsp
}

var MarketCenterClient = (function() {
    function MarketCenterClient() {
        if (typeof udspath === 'undefined' || udspath === '') {
            throw 'udspath not defined'
        }
        this.client = newUDSClient()
        this.list = GetSupportList(this.client)
        Log("this.list:" + this.list)
    }

    MarketCenterClient.prototype.GetSpotTicker = function(exchangeName, pair) {
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'GetSpotTicker exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'GetSpotTicker pair not defined'
        }
        return GetSpotTicker(this.client, exchangeName, pair)
    }

    MarketCenterClient.prototype.GetSpotDepth = function(exchangeName, pair) {
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'GetSpotDepth exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'GetSpotDepth pair not defined'
        }
    return GetSpotDepth(this.client, exchangeName, pair)
    }

    MarketCenterClient.prototype.SubscribeSpotDepth = function(exchangeName, pair, period) {
        if(typeof(period) === 'undefined') {
            period = 200
        }
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'SubscribeSpotDepth exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'SubscribeSpotDepth pair not defined'
        }
        var found = false
        _.each(this.list, function(item) {
            if (item === exchangeName) {
                found = true
                return false
            }
        })

        if(!found) {
            throw 'exchange ('+ exchangeName +') not support, please check it again, https://github.com/goex-top/market_center#support-exchanges'
        }
        return SubscribeSpotDepth(this.client, exchangeName, pair, period)
    }

    MarketCenterClient.prototype.SubscribeSpotTicker = function(exchangeName, pair, period) {
        if(typeof(period) === 'undefined') {
            period = 200
        }
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'SubscribeSpotTicker exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'SubscribeSpotTicker pair not defined'
        }
      var found = false
        _.each(this.list, function(item) {
            if (item === exchangeName) {
                found = true
                return false
            }
        })

        if(!found) {
            throw 'exchange ('+ exchangeName +') not support, please check it again, https://github.com/goex-top/market_center#support-exchanges'
        }
        return SubscribeSpotTicker(this.client, exchangeName, pair, period)
    }


    MarketCenterClient.prototype.GetFutureTicker = function(exchangeName, contractType, pair) {
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'GetFutureTicker exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'GetFutureTicker pair not defined'
        }
     return GetFutureTicker(this.client, exchangeName, contractType, pair)
    }

    MarketCenterClient.prototype.GetFutureDepth = function(exchangeName, contractType, pair) {
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'GetFutureDepth exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'GetFutureDepth pair not defined'
        }
     return GetFutureDepth(this.client, exchangeName, contractType, pair)
    }

    MarketCenterClient.prototype.SubscribeFutureDepth = function(exchangeName, contractType, pair, period) {
        if(typeof(period) === 'undefined') {
            period = 200
        }
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'SubscribeFutureDepth exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'SubscribeFutureDepth pair not defined'
        }
     var found = false
        _.each(this.list, function(item) {
            if (item === exchangeName) {
                found = true
                return false
            }
        })

        if(!found) {
            throw 'exchange ('+ exchangeName +') not support, please check it again, https://github.com/goex-top/market_center#support-exchanges'
        }
        return SubscribeFutureDepth(this.client, exchangeName, contractType, pair, period)
    }

    MarketCenterClient.prototype.SubscribeFutureTicker = function(exchangeName, contractType, pair, period) {
        if(typeof(period) === 'undefined') {
            period = 200
        }
        if (typeof exchangeName === 'undefined' || exchangeName === '') {
            throw 'SubscribeFutureTicker exchangeName not defined'
        }
        if (typeof pair === 'undefined' || pair === '') {
            throw 'SubscribeFutureTicker pair not defined'
        }
     var found = false
        _.each(this.list, function(item) {
            if (item === exchangeName) {
                found = true
                return false
            }
        })

        if(!found) {
            throw 'exchange ('+ exchangeName +') not support, please check it again, https://github.com/goex-top/market_center#support-exchanges'
        }
        return SubscribeFutureTicker(this.client, exchangeName, contractType, pair, period)
    }

    MarketCenterClient.prototype.GetSupportList = function() {
        return GetSupportList(this.client)
    }
    return MarketCenterClient
})()

$.NewMarketCenterClient = function() {
    return new MarketCenterClient()
}

function main() {
    mcc = $.NewMarketCenterClient()
    Log('support list'+mcc.GetSupportList())
    mcc.SubscribeSpotDepth('binance.com', 'BTC_USDT', 200)
    Sleep(1000)
    Log(mcc.GetSpotDepth('binance.com', 'BTC_USDT'))
    mcc.SubscribeSpotTicker('binance.com', 'BTC_USDT', 200)
    Sleep(1000)
    Log(mcc.GetSpotTicker('binance.com', 'BTC_USDT'))
}
  
```

> Detail

https://www.fmz.com/strategy/182185

> Last Modified

2020-02-09 20:15:26
