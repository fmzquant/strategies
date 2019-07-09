
> 策略名称

FCoin杠杆交易模板

> 策略作者

wmjbs

> 策略描述

1.此模板仅支持Fcoin的杠杆账户
2.目前仅有卖出功能，买入功能和杠杆账户资产获取功能
3.希望有能力的朋友进行改进，加入撤单功能和获取未完成订单功能



> 源码 (javascript)

``` javascript
/*
1.此模板仅支持Fcoin的杠杆账户
2.目前仅有卖出功能、买入功能和杠杆账户资产获取功能
3.希望有能力的朋友进行改进，加入撤单功能和获取未完成订单功能
*/

$.fcoinSell = function(price, amount) {
    var message = "&symbol=btcusdt" + "&side=sell" + "&type=limit" + "&price=" + price.toString() + "&amount=" + amount.toString() + "&exchange=main" + "&account_type=margin"
    id = exchanges[0].IO("api", "POST", "/v2/orders", message)
    return id;
}

$.fcoinBuy = function(price, amount) {
    var message = "&symbol=btcusdt" + "&side=buy" + "&type=limit" + "&price=" + price.toString() + "&amount=" + amount.toString() + "&exchange=main" + "&account_type=margin"
    id = exchanges[0].IO("api", "POST", "/v2/orders", message)
    return id;
}

$.Get_Account = function() {
    var account = null;
    while (true) {
        var Currency = "btcusdt";
        account = exchange.IO("api", "GET", "/v2/broker/leveraged_accounts/account", "account_type=" + Currency);
        if (account.status == 'ok') {
            break;
        }
        Sleep(1500)
    }
    return {
        Info: null,
        Balance: Math.abs(account.data.available_quote_currency_amount),
        FrozenBalance: Math.abs(account.data.frozen_quote_currency_amount),
        Stocks: Math.abs(account.data.available_base_currency_amount),
        FrozenStocks: Math.abs(account.data.frozen_base_currency_amount)
    }
}

// 测试代码
function main() {
    
    var buyorder = $.fcoinBuy(6000, 0.001);
    var sellorder = $.fcoinSell(9000, 0.001);

    Log(buyorder);
    Log(sellorder);

    Log($.Get_Account());
    Log($.Get_Account().Stocks);
}
```

> 策略出处

https://www.fmz.com/strategy/151157

> 更新时间

2019-06-09 10:47:22
