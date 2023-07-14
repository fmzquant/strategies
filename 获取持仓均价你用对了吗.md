
> Name

获取持仓均价你用对了吗

> Author

LiteFly

> Strategy Description

获取持仓均价大部分人用的是
position = exchanges[0].GetPosition()
avgPrice = position[0]["Price"]
但是其实这样是不准的，打印币安合约position信息：
[map[Amount:5 ContractType:swap FrozenAmount:0 Info:map[entryPrice:55173.32071038 isAutoAddMargin:false isolatedMargin:0.00000000 isolatedWallet:0 leverage:20 liquidationPrice:0 marginType:cross markPrice:55171.20000000 maxQty:50 notionalValue:-0.00906269 positionAmt:-5 positionSide:BOTH symbol:BTCUSD_PERP unRealizedProfit:0.00000034] Margin:0.0004531349689693174 MarginLevel:20 Price:55173.32071038 Profit:3.4e-07 Type:1]]

发现有2个价格entryPrice  Price，而合约交易不同交易所每天都会进行结算，结算后Price就会变了，而entryPrice才算真正的原始持仓价格，
若这时你用Price去计算收益率来进行止盈止损，可能会造成较大的损失。

以上原因，封装了三大交易所的持仓均价函数，拿走不谢



> Source (python)

``` python
def  getAvgPrice(position):
    if hasattr(position[0],'Info') and hasattr(position[0].Info,'cost_open'):# Huobi
        return position[0].Info.cost_open
    elif hasattr(position[0],'Info') and  hasattr(position[0].Info,'avg_cost'):#OKex
        return position[0].Info.avg_cost
    elif hasattr(position[0],'Info') and  hasattr(position[0].Info,'entryPrice'):#binance
        return position[0].Info.entryPrice
    else:
        return position[0]["Price"] 

def main():
    Log(exchange.GetAccount())
    position = exchanges[0].GetPosition()
    if len(position)>0:
        avgPrice = getAvgPrice(position)
        Log(avgPrice)
    
    

```

> Detail

https://www.fmz.com/strategy/261288

> Last Modified

2021-03-11 14:45:53
