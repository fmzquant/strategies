
> Name

干货-下单量精度和价格精度-适用各个交易所

> Author

陈皮





> Source (python)

``` python
from collections import Counter
def GetAmountPrecision():
    depth = _C(exchange.GetDepth)    
    amountPrecisions = []
    for ask in depth["Asks"]:
        i = ask["Amount"]
        amountPrecision = 0
        if str(i).count('.') == 1:
            amountPrecision = len(str(i).split(".")[1])
        amountPrecisions.append(amountPrecision)
    amountPrecision = max(amountPrecisions)    
    return amountPrecision

def GetPricePrecision():
    depth = _C(exchange.GetDepth)    
    pricePrecisions = []
    for ask in depth["Asks"]:
        j = ask["Price"]
        pricePrecision = 0
        if str(j).count('.') == 1:
            pricePrecision = len(str(j).split(".")[1])
        pricePrecisions.append(pricePrecision)
    pricePrecision = Counter(pricePrecisions).most_common(1)[0][0]
    return pricePrecision
```

> Detail

https://www.fmz.com/strategy/295680

> Last Modified

2021-09-25 10:25:30
