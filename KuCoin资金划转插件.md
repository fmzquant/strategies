
> Name

KuCoin资金划转插件

> Author

makebit



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|assets|USDT|划转币种|
|amount|10000|划转数量|
|typeIndex|0|划转类型: 现货账户向USDT合约账户划转|USDT合约账户向现货账户划转|


> Source (javascript)

``` javascript
var adress = ['/api/v1/transfer-in','/api/v3/transfer-out'][typeIndex]

function UsdtTransfer( e , cur , amount ){
    var params = ''
    var 币种 = cur
    var 划转数量 = amount
    var exname = e.GetName()
    if( exname == 'Futures_KuCoin'){
        if( typeIndex == 0 ){
            paraStr = '&payAccountType=TRADE'
        }else if( typeIndex == 1 ){
            paraStr = '&recAccountType=TRADE'
        }

        params = "amount="+amount+"&currency="+币种 + paraStr 
        ret = e.IO("api","POST",adress, params )
        Log( 币种 , "划转数量:" , amount , ret)
    }
}

function main() {
    UsdtTransfer( exchange , assets , amount )
}
```

> Detail

https://www.fmz.com/strategy/428110

> Last Modified

2023-09-28 17:27:49
