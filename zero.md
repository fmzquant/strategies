
> Name

zero

> Author

小草

> Strategy Description

Profit tracking can be kept together with a strategy, but it is still better to separate it. Reasons: 1. When a trading strategy is interrupted or modified, the profit record will not be reset. 2. Profit calculation itself calls API functions, which often causes strategy API network errors and affects trading; separating it reduces this possibility. 3. The loop interval can be customized.

> Source (javascript)

``` javascript

function adjustFloat(v) {

    return Math.floor(v*1000)/1000;
}


function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(1000);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(1000);
    }
    return ticker;
}

function updateProfit(accountInit, accountNow, ticker) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * ticker.Buy);
    LogProfit(adjustFloat(netNow - netInit), accountNow);

}

function main() {
    InitAccount = GetAccount(); 
    while (true) {
        updateProfit(InitAccount, GetAccount(), GetTicker());
        Sleep(5000);
    }
}
```

> Detail

https://www.fmz.com/strategy/1084

> Last Modified

2016-05-10 20:05:02
