
> Name

单独计算收益代码来自zero

> Author

小草

> Strategy Description

收益可以和策略放在一起，但还是独立出来更好。原因：1、交易策略更改中断时，收益不会被重置。2、收益计算本身会调用API函数，经常造成策略API网络错误，影响交易运行，独立出来减少这种可能性。3、可以自定义循环间隔。



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
