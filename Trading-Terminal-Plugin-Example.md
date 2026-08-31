
> Name

Trading-Terminal-Plugin-Example

> Author

发明者量化-小小梦

> Strategy Description

Demonstrates the embedded trading-terminal plugin feature.
https://www.fmz.com/api#%E4%BA%A4%E6%98%93%E6%8F%92%E4%BB%B6


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TransactionTimes|Trade count|Trade count|
|Amount|Coin amount per trade|Coin amount per trade|
|Side|Trade direction|Trade direction|


> Source (javascript)

``` javascript
function main() {
    var initAcc = _C(exchange.GetAccount)
    var tbl = {
        "type" : "table", 
        "title" : "表格",
        "cols" : ["项目", "内容"],
        "rows" : [],     
    }
    
    for (var i = 0 ; i < TransactionTimes ; i++) {
        var info = null
        if (Side == 0) {
            info = $.Buy(Amount)
        } else if (Side == 1) {
            info = $.Sell(Amount)
        } else {
            throw "side error!"
        }
        
        tbl.rows.push([i + "号订单，成交情况：", JSON.stringify(info)])    
        Sleep(300)
    }
    
    var nowAcc = _C(exchange.GetAccount)
    Log("balance:", nowAcc.Balance)
    delete initAcc.Info
    delete nowAcc.Info
    tbl.rows.push(["初始账户：", JSON.stringify(initAcc)])
    tbl.rows.push(["执行后账户：", JSON.stringify(nowAcc)])    
    return tbl
}
```

> Detail

https://www.fmz.com/strategy/187708

> Last Modified

2025-04-08 16:12:39
