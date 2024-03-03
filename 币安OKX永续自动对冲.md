
> Name

币安OKX永续自动对冲

> Author

小草



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Direction|0|挂单方向: 买入|卖出|
|Amount|100|成交数量|
|Ice_amount|true|冰山委托大小|
|Open_diff|10|开仓差价|
|Close_diff|2|平仓差价|
|Amount_N|false|数量精度|
|Price_N|2|价格精度|
|Multiplier|10|OKX合约乘数|


> Source (javascript)

``` javascript
//第一个交易所添加OKX期货，第二个币安期货
var pos = {okx:0, bn:0}
exchanges[0].SetContractType('swap')
exchanges[1].SetContractType('swap')
function GetPosition(){
    let position = _C(exchanges[0].GetPosition)
    if(position.length == 0){
        pos.okx = 0
    }else if(position[0].Type == 0){
        pos.okx = position[0].Amount
    } else if(position[0].Type == 1){
        pos.okx =  -position[0].Amount
    }
    
    position = _C(exchanges[1].GetPosition)
    if(position.length == 0){
        pos.bn = 0
    }else  if(position[0].Type == 0){
        pos.bn =  position[0].Amount
    }else if(position[0].Type == 1){
        pos.bn =  -position[0].Amount
    }
    
}

function main(){
    GetPosition()
    let init_position = pos.bn
    while(true){
        GetPosition()
        let ice_amount = Ice_amount
        let deal_amount = Direction == 0 ? pos.bn - init_position : init_position - pos.bn
        let ticker_okx = exchanges[0].Go('GetTicker')
        let ticker_bn = exchanges[1].Go('GetTicker')
        ticker_okx = ticker_okx.wait(2000)
        ticker_bn = ticker_bn.wait(2000)
        LogStatus('仓位：'+JSON.stringify(pos)+', okx价格：'+ticker_okx.Buy+', 币安价格：'+ticker_bn.Sell+', 差价：'+ _N(ticker_okx.Buy - ticker_bn.Sell,2)+', 已成交：'+deal_amount)
        if((Amount - deal_amount ) > 1){
            if(Direction == 0 && ticker_okx.Buy - ticker_bn.Sell > Open_diff){ //多bn空ok
                Log('仓位：'+JSON.stringify(pos)+', okx价格：'+ticker_okx.Buy+', 币安价格：'+ticker_bn.Sell+', 差价：'+ _N(ticker_okx.Buy - ticker_bn.Sell,2)+', 已成交：'+deal_amount)
                exchanges[0].SetDirection('sell')
                exchanges[0].Sell(_N(ticker_okx.Buy*0.98, Price_N), _N(ice_amount*Multiplier, 0))
                exchanges[1].SetDirection('buy')
                exchanges[1].Buy(_N(ticker_bn.Sell*1.02, Price_N), _N(ice_amount, Amount_N))
            }else if(ticker_okx.Sell - ticker_bn.Buy < Close_diff){
                Log('仓位：'+JSON.stringify(pos)+', okx价格：'+ticker_okx.Buy+', 币安价格：'+ticker_bn.Sell+', 差价：'+ _N(ticker_okx.Buy - ticker_bn.Sell,2)+', 已成交：'+deal_amount)
                exchanges[1].SetDirection('sell')
                exchanges[1].Sell(_N(ticker_bn.Buy*0.98, Price_N), _N(ice_amount, Amount_N))
                exchanges[0].SetDirection('buy')
                exchanges[0].Buy(_N(ticker_okx.Sell*1.02, Price_N), _N(ice_amount*Multiplier, 1))
            }
        }
        Sleep(700)
        if((Amount - deal_amount ) < 1){
            return '成交完成 ' + deal_amount + '\n'
        }         
    }
}
```

> Detail

https://www.fmz.com/strategy/437254

> Last Modified

2024-01-01 19:29:47
