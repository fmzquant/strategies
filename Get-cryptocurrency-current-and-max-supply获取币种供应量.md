
> Name

Get-cryptocurrency-current-and-max-supply获取币种供应量

> Author

小草

> Strategy Description

使用coinmarketcap提供的API接口获取币种供应量和流通量，可用于计算总市值



> Source (javascript)

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

> Detail

https://www.fmz.com/strategy/122370

> Last Modified

2019-07-03 16:33:08
