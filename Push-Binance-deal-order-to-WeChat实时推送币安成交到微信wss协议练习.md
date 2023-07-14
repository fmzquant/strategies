
> Name

Push-Binance-deal-order-to-WeChat实时推送币安成交到微信wss协议练习

> Author

小草

> Strategy Description

通过websocket协议，将币安成交信息推送到微信，可以作为wss协议的练习。
具体原理是30分钟更新一次listenKey,然后订阅账户订阅的datastream。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|APIKEY||your binance API Key|


> Source (javascript)

``` javascript
function main() {
    var listenKey = JSON.parse(HttpQuery('https://api.binance.com/api/v1/userDataStream','',null,'X-MBX-APIKEY:'+APIKEY)).listenKey;
    HttpQuery('https://api.binance.com/api/v1/userDataStream', {method:'DELETE',data:'listenKey='+listenKey}, null,'X-MBX-APIKEY:'+ APIKEY);
    listenKey = JSON.parse(HttpQuery('https://api.binance.com/api/v1/userDataStream','',null,'X-MBX-APIKEY:'+ APIKEY)).listenKey;
    var datastream = Dial("wss://stream.binance.com:9443/ws/"+listenKey, 100);
    var update_listenKey_time =  Date.now()/1000;
    while (true){
        if (Date.now()/1000 - update_listenKey_time > 1800){
            update_listenKey_time = Date.now()/1000;
            HttpQuery('https://api.binance.com/api/v1/userDataStream', {method:'PUT',data:'listenKey='+listenKey}, null,'X-MBX-APIKEY:'+ APIKEY);
            Log('keep listenKey alive');
        }
        var data = datastream.read();
        if(data){
            data = JSON.parse(data);
            if(data.e == 'executionReport' && data.x == 'TRADE'){
                Log(data.S, data.s,  'amount is ', data.l, 'at price:', data.p, '@');
            }
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/122649

> Last Modified

2019-07-03 16:27:05
