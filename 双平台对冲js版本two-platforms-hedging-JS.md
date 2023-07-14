
> Name

双平台对冲js版本two-platforms-hedging-JS

> Author

7meter



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|MinSpreadA|0.51|A->B差价|
|MinSpreadB|0.52|B->A差价|
|MaxAmount|0.3|最大操作量|
|BalanceTime|10|平衡周期(秒)|
|LoopInterval|200|轮询周期(ms)|




|Button|Default|Description|
|----|----|----|
|A->B|0.51|更改价差(A->B)|
|B->A|0.52|更改价差(B->A)|


> Source (javascript)

``` javascript
function cancelAll(){
    var ref = false;
    for(var e in exchanges){
        while(true){
            var n = 0;
            var my_orders = _C(exchanges[e].GetOrders);
            for(var order1 in my_orders){
                ref = true;
                e.CancelOrder(my_orders[order1].Id);
                n += 1;
            }
            if(n==0){
                break;
            }
        }
    }
    return ref;
}

function main(){
    if(exchanges.length != 2){
        throw("Only two exchanges are supported");
    }

    LogReset();
    LogProfitReset();
    cancelAll();

    var initStocks = 0.0;
    var initBalance = 0.0;
    var minAmount = 0.1;
    var lastTradeTime = 0;
    var lastTradeErrExchange = '';
    var accountsCache = [];
    var hedgeNum = [0, 0];
    var names = [];
    var baseCurrency = exchange.GetCurrency();
    for(var e in exchanges){
        if(exchanges[e].GetCurrency() != baseCurrency){
            throw("It has to be the same currency to hedge:"+baseCurrency);
        }
        names.push(exchanges[e].GetName());
        var account = _C(exchanges[e].GetAccount);
        accountsCache.push(account);
        initStocks += account.Stocks;
        initBalance += account.Balance;
    }
    if(baseCurrency == "BTC"){
        minAmount = 0.01
    } else {
        minAmount = 0.1
    }
    
    Log("all balance:", _N(initBalance), "all stocks", _N(initStocks))
    while(true){
        if(accountsCache.length <= 0){
            for(var e in exchanges){
                var account1 = _C(exchanges[e].GetAccount);
                accountsCache.push(account1);
            }
        }
        Sleep(LoopInterval);
        cmd = GetCommand();
        if(cmd){
            Log("CMD", cmd);
            var arr = cmd.split(":");
            if(arr[0]=="A->B"){
                MinSpreadA = parseFloat(arr[1]);
            } else if(arr[0]=="B->A"){
                MinSpreadB = parseFloat(arr[1]);
            }
        }
        var depthA = exchanges[0].GetDepth();
        if (!depthA){
            continue;
        }
        var depthB = exchanges[1].GetDepth();
        if (!depthB){
            continue;
        }
        var time = new Date();
        if(lastTradeTime > 0 && time.getTime() - lastTradeTime > BalanceTime){
            var needUpdate = cancelAll();
            if (!needUpdate){
                for(var account2 in accountsCache){
                    if(accountsCache[account2].FrozenBalance >= 0.1 || accountsCache[account2].FrozenStocks >= 0.001){
                        needUpdate = true;
                        break;
                    }
                }
            }
            if (needUpdate){
                for(var k in exchanges){
                    account3 = _C(exchanges[k].GetAccount);
                    accountsCache.push(account3);
                }
            }
            var nowStocks = 0.0;
            var nowBalance = 0.0;
            for(var account4 in accountsCache){
                nowBalance += accountsCache[account4].Balance;
                nowStocks += accountsCache[account4].Stocks;
            }
            var diff = _N(nowStocks-initStocks, 5);
            var isReverse;
            if(Math.abs(diff) < minAmount){
                LogProfit(_N(nowBalance-initBalance, 3), "all balance", _N(nowBalance), "all stocks", _N(nowStocks), "stock offset:", diff);
                lastTradeTime = 0;
            } else if(diff > minAmount){
                isReverse = depthA.Bids[0].Price < depthB.Bids[0].Price;
            } else if(-diff > minAmount){
                isReverse = depthA.Asks[0].Price > depthB.Asks[0].Price;
            }
            if(isReverse != null){
                var depths = [depthA, depthB];
                var opAmount;
                var kk;
                if(isReverse){
                    kk = [1, 0];
                } else{
                    kk = [0, 1];
                }
                for(var pos in kk){
                    if(diff > minAmount){
                        opAmount = Math.min(diff, accountsCache[pos].Stocks, depths[pos].Bids[0].Amount + depths[pos].Bids[1].Amount);
                        diff = -opAmount;
                        if(opAmount >= minAmount){
                            exchanges[pos].Sell(depths[pos].Bids[1].Price, opAmount);
                        }
                    } else if(-diff >= minAmount){
                        opAmount = Math.min(-diff, _N(accountsCache[pos].Balance / depths[pos].Asks[1].Price, 3), depths[pos].Asks[0].Amount + depths[pos].Asks[1].Amount);
                        diff += opAmount;
                        if (opAmount >= minAmount){
                            exchanges[pos].Buy(depths[pos].Asks[1].Price, opAmount);
                        }
                    }
                }
                if (opAmount != undefined){
                    var time1 = new Date();
                    lastTradeTime = time1.getTime();
                    accountsCache = [];
                }
            }
            continue;
        }
        var diffA = _N(depthA.Bids[0].Price - depthB.Asks[0].Price, 3)
        var diffB = _N(depthB.Bids[0].Price - depthA.Asks[0].Price, 3)
        LogStatus(JSON.stringify({type: 'table', title: 'status', cols: ['name', 'money', 'frozenmoney', 'stock', 'frozenstock', 'buyone', 'sellone', 'threshold', 'offset', 'num of times'], rows: [[names[0], accountsCache[0].Balance, accountsCache[0].FrozenBalance, accountsCache[0].Stocks, accountsCache[0].FrozenStocks, depthA.Bids[0].Price, depthA.Asks[0].Price, MinSpreadA, diffA, hedgeNum[0]], [names[1], accountsCache[1].Balance, accountsCache[1].FrozenBalance, accountsCache[1].Stocks, accountsCache[1].FrozenStocks, depthB.Bids[0].Price, depthB.Asks[0].Price, MinSpreadB, diffB, hedgeNum[0]]]}));
        HPos = 0;
        if (diffA >= MinSpreadA){
            orderH = depthA.Bids[0];
            orderL = depthB.Asks[0];
            exchangeH = 0;
            exchangeL = 1;
            accountH = accountsCache[0];
            accountL = accountsCache[1];
        }
        else if (diffB >= MinSpreadB){
            HPos = 1;
            orderH = depthB.Bids[0];
            orderL = depthA.Asks[0];
            exchangeH = 1;
            exchangeL = 0;
            accountH = accountsCache[1];
            accountL = accountsCache[0];
        }
        else{
            continue;
        }
        
        var opPrice = _N((orderH.Price + orderL.Price) / 2.0, 2);
        var opAmount = Math.min(MaxAmount, orderH.Amount, orderL.Amount, accountH.Stocks, _N(accountL.Balance / opPrice, 3));
        if(opAmount >= minAmount){
            var tasks = [[exchangeH, "H"], [exchangeL, "L"]];
            if(lastTradeErrExchange == "L"){
                tasks.reverse();
            }
            lastTradeErrExchange = "";
            for(var task in tasks){
                if(tasks[task][1] == "H"){
                    var id = exchanges[tasks[task][0]].Sell(opPrice, opAmount);
                    if(id == undefined){
                        lastTradeErrExchange = tasks[task][1];
                        break;
                    }
                }
                if(tasks[task][1] == "L"){
                    var id = exchanges[tasks[task][0]].Buy(opPrice, opAmount);
                    if(id == undefined){
                        lastTradeErrExchange = tasks[task][1];
                        break;
                    }
                }
            }
            
            var time = new Date();
            lastTradeTime = time.getTime();
            accountsCache = []
            hedgeNum[HPos] += 1
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/57556

> Last Modified

2018-01-22 17:42:27
