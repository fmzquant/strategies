
> Name

火币点卡

> Author

一拳男孩

> Strategy Description

- getHBPoints(exchange)
> 获取火币点卡
> 返回值，number类型



> Source (javascript)

``` javascript
$.getHBPoints = function(ex) {
    try {
        var accountRet = ex.IO("api", "GET", "/v1/account/accounts")
        if (accountRet && accountRet.data) {
            var account = _.findWhere(accountRet.data, {
                type: 'point'
            })
            if (account && account.id) {
                var balanceRet = ex.IO("api", "GET", "/v1/account/accounts/" + account.id + "/balance")
                if (balanceRet && balanceRet.data && balanceRet.data.list) {
                    var balance = _.reduce(balanceRet.data.list, function(p, n) {
                        return new Decimal(p).plus(n.balance).toNumber()
                    }, 0)
                    return balance
                }
            }
        }
    } catch (e) {}
    return null
}
```

> Detail

https://www.fmz.com/strategy/162055

> Last Modified

2019-08-13 22:05:07
