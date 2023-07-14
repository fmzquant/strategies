
> Name

永续合约一键市价平仓

> Author

GCC

> Strategy Description

一键平所有永续合约仓位



> Source (javascript)

``` javascript
function main(){
        exchange.SetContractType('swap')
        exchange.SetCurrency('BNB_USDT')
        Log(exchange.GetPosition())
        acc = exchange.GetAccount()
        //Log(exchange.GetAccount().Info)
        var pos = exchange.GetAccount().Info.positions
        var positioned = false
        for(var i=0;i<pos.length;i++){
            if (pos[i].positionAmt != 0){
                positioned = true
                var symbol = pos[i].symbol.replace('USDT','_USDT')
                //var symbol = pos[i].symbol.replace('BUSD','_BUSD')
                exchange.SetCurrency(symbol)
                var amount = parseFloat(pos[i].positionAmt.replace('-',''))
                if(pos[i].positionSide == 'LONG'){
                    exchange.SetDirection('closebuy')
                    exchange.Sell(-1, amount)
                }
                if(pos[i].positionSide == 'SHORT'){
                    exchange.SetDirection('closesell')
                    exchange.Buy(-1, amount)
                }
            }
        }
        if(positioned == false){
            Log('无持仓')
            return ('无持仓')
        }
        else{
            Log('完成平仓')
            return ('完成平仓')
        }
}
```

> Detail

https://www.fmz.com/strategy/322449

> Last Modified

2022-03-25 10:48:05
