
> Name

代替废弃的GetMinStock函数

> Author

hugo_zhou





> Source (javascript)

``` javascript
/****************
  针对 火币pro 获取不同货币对的最小交易量
  其他平台需要自行添加不同的错误解析代码
****************/

function main() {
    SetErrorFilter("limit order amount error");
    //加入你想知道的货币对
    var huobipro = ["BTC_USDT","XRP_USDT","EOS_BTC","OMG_ETH"];
    
    for(var i = 0;i<huobipro.length;i++){
        exchange.IO("currency", huobipro[i]);
        var ticker = exchange.GetTicker();
        exchange.Buy(ticker.Sell, 0.00000001);   // amount写的仅可能小，获取服务器返回的正确min 
        var error = GetLastError();
        // 火币错误代码解析，不同的交易平台应该不一样     limit order amount error, min: `0.00000001`    
        if(error.indexOf("limit order amount error, min") >= 0){
            var min = parseFloat(error.split(": `")[1]);
            _G(exchange.GetName()+exchange.GetCurrency(),min);
        }
    }
    
    //从数据库中打印出来
    for(var j = 0;j<huobipro.length;j++){
        Log(exchange.GetName()+huobipro[j],":",_G(exchange.GetName()+huobipro[j]));
    }
}
```

> Detail

https://www.fmz.com/strategy/69436

> Last Modified

2018-01-17 17:42:25
