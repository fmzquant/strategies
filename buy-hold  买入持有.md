
> 策略名称

buy-hold  买入持有

> 策略作者

ipqhjjybj

> 策略描述

买入持有策略



> 源码 (javascript)

``` javascript
/*
策略出处: rqalpha
策略名称: buy-hold买入持有
策略作者: ipqhjjybj
策略描述:
无脑指数型

*/

LoopInterval  		=   60 	   // 轮询间隔(秒)
SlidePrice          =	0.3    // 滑动价(元)
minMoney			=   100;		// 如果资金小于该数值，则不买入

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function CancelPendingOrders() {
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

function onTick(exchange) {
	var ticker = GetTicker();
    // Buy or Sell, Cancel pending orders first
    CancelPendingOrders();
    var account = GetAccount();
    var price = ticker.Last + SlidePrice;
    var amount = adjustFloat(account.Balance / price);
    if (account.Balance > minMoney && amount >= exchange.GetMinStock()) {
    	if (exchange.Buy(price, amount, "做多")) {
    		LastBuyPrice = LastHighPrice = price;
    	}
    } 
}

function main() {
    InitAccount = GetAccount();
    Log(exchange.GetName(), exchange.GetCurrency(), InitAccount);
    LoopInterval = Math.max(LoopInterval, 1);  
    while (true) {
        onTick(exchange);
        Sleep(LoopInterval*1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/41786

> 更新时间

2017-06-02 22:18:11
