
> 策略名称

Get cryptocurrency current and max supply|获取币种供应量

> 策略作者

botvsing





> 源码 (javascript)

``` javascript
function GetSupply(symbol, max){
    var ids = null
    if(_G('ids')){
        ids = _G('ids')
    }else{
        ids = JSON.parse(HttpQuery('https://api.coinmarketcap.com/v2/listings/')).data
        _G('ids', ids)
    }
    var coinId = null
    for (var i=0; i<ids.length; i++){
        if(ids[i].symbol.toLowerCase() == symbol.toLowerCase() ){
            coinId = ids[i].id
            break
        }
    }
    if(coinId){
        var ticker = JSON.parse(HttpQuery('https://api.coinmarketcap.com/v2/ticker/'+ coinId + '/')).data
        return parseFloat(max == undefined ? ticker.total_supply: ticker.max_supply)
    }else{
        throw 'symbol not found'
    }
}
function main() {
    Log(GetSupply('BTC')) // Get total current supply
    Log(GetSupply('BTC', true)) // Get max supply
}
```

> 策略出处

https://www.fmz.com/strategy/122370

> 更新时间

2018-10-18 20:55:41
