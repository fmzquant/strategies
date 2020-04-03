
> 策略名称

期货一键平仓插件|Cover all contracts

> 策略作者

小草

> 策略描述

平该交易对下的所有期货仓位。
平仓方式：已平多仓为例，不断挂卖一卖出，0.5s后撤销，继续挂卖一，知道完全平仓。每次挂单量为当前所有可平仓位。

插件可以在交易终端一键启动，不收取费用，方便手动交易。详细介绍：https://www.fmz.com/digest-topic/5051



> 源码 (javascript)

``` javascript

function main(){
    while(ture){
        var pos = exchange.GetPosition()
        var ticker = exchange.GetTicekr()
        if(!ticker){return '无法获取ticker'}
        if(!pos || pos.length == 0 ){return '已无持仓'}
        for(var i=0;i<pos.length;i++){
            if(pos[i].Type == PD_LONG){
                exchange.SetContractType(pos[i].ContractType)
                exchange.SetDirection('closebuy')
                exchange.Sell(ticker.Buy, pos[i].Amount - pos[i].FrozenAmount)
            }
            if(pos[i].Type == PD_SHORT){
                exchange.SetContractType(pos[i].ContractType)
                exchange.SetDirection('closesell')
                exchange.Buy(ticker.Sell, pos[i].Amount - pos[i].FrozenAmount)
            }
        }
        var orders = exchange.Getorders()
        Sleep(500)
        for(var j=0;j<orders.length;j++){
            if(orders[i].Status == ORDER_STATE_PENDING){
                exchange.CancelOrder(orders[i].Id)
            }
        }
    }
}

```

> 策略出处

https://www.fmz.com/strategy/191363

> 更新时间

2020-04-02 09:40:01
