
> Name

Using-Position-Average-Price-Correctly

> Author

LiteFly

> Strategy Description

Most people get the average position price like this:
position = exchanges[0].GetPosition()
avgPrice = position[0]["Price"]

However, that is not always accurate. For example, a Binance futures position printout contains both `entryPrice` and `Price`:
[map[Amount:5 ContractType:swap FrozenAmount:0 Info:map[entryPrice:55173.32071038 isAutoAddMargin:false isolatedMargin:0.00000000 isolatedWallet:0 leverage:20 liquidationPrice:0 marginType:cross markPrice:55171.20000000 maxQty:50 notionalValue:-0.00906269 positionAmt:-5 positionSide:BOTH symbol:BTCUSD_PERP unRealizedProfit:0.00000034] Margin:0.0004531349689693174 MarginLevel:20 Price:55173.32071038 Profit:3.4e-07 Type:1]]

You can see two price fields: `entryPrice` and `Price`. For futures trading, different exchanges perform daily settlement, and after settlement `Price` may change, while `entryPrice` still represents the true original average entry price.

If you use `Price` to calculate returns for take-profit or stop-loss decisions, it may cause significant losses.

For that reason, this article wraps average-price helper functions for the three major exchanges—feel free to use them.
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
