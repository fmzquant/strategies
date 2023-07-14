
> Name

火币精度

> Author

一拳男孩

> Strategy Description

- **$.getAmountPrecision(Currency)**
> 交易对基础币种计数精度(小数点后位数)
> 返回值 number类型

- **$.getPricePrecision(Currency)**
> 交易对报价的精度(小数点后位数)
> 返回值 number类型

- **$.getMinOrderAmount(Currency)**
> 交易对最小下单量 
> 返回值 number类型

- **$.getMaxOrderAmount(Currency)**
> 交易对最大下单量
> 返回值 number类型

- **$.getValuePrecision(Currency)**
> 交易对交易金额的精度（小数点后位数）
> 返回值 number类型

- **$.getMinValue(Currency)**
> 最小下单金额 （下单金额指当订单类型为限价单时，下单接口传入的(amount * price)。当订单类型为buy-market时，下单接口传的'amount'）
> 返回值 number类型

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TICKER_EXPIRE_TIME|600|行情缓存时间(秒)|


> Source (javascript)

``` javascript
var _symbols = _C(getSymbols)
var _cacheTicker = {}

function parseJson(str) {
    try {
        return JSON.parse(str)
    } catch(e) {
        Log(str + e.message + '#FF0000')
        return null
    }
}

function getSymbols() {
    var ret = parseJson(HttpQuery('https://api.huobi.pro/v1/common/symbols'))
    if (ret && ret.status === 'ok') {
        return ret.data
    } else {
        return null
    }
}

function getTicker(ex) {
    var currency = getCurreny(ex)
    if (_cacheTicker[currency] && Unix() - _cacheTicker[currency].UpdatedAt < TICKER_EXPIRE_TIME) {
        return _cacheTicker[currency]
    }
    var sym = currency.replace('_', '').toLocaleLowerCase()
    var ret = parseJson(HttpQuery('https://api.huobi.pro/market/detail/merged?symbol=' + sym))
    if (ret && ret.status === 'ok') {
        _cacheTicker[currency] = _.extend({ UpdatedAt: Unix() }, ret.tick)
        return ret.data
    } else {
        return null
    }
}

function getCurreny(ex) {
    var currency = null
    if (typeof(ex) === 'object') {
        return ex.GetCurrency()
    } else {
        return ex
    }
}

function getCoin(ex) {
    var currency = getCurreny(ex)
    var currencyAry = _.map(currency.split('_'), function(sym) { return sym.toLocaleLowerCase() })
    return _.find(_symbols, function(coin) {
        return currencyAry[0] === coin['base-currency'] && currencyAry[1] === coin['quote-currency']
    })
}

$.getSymbols = getSymbols

$.getAmountPrecision = function (ex) {
    var coin = getCoin(ex)
    if (coin) {
        return coin['amount-precision']
    }
    return 0
}

$.getPricePrecision = function(ex) {
    var coin = getCoin(ex)
    if (coin) {
        return coin['price-precision']
    }
    return 0
}

$.getMinOrderAmount = function(ex, price) {
    var coin = getCoin(ex)
    if (coin) {
        price = price || _C(getTicker, ex).close
        return +(new Decimal(coin['min-order-value']).mul(1.1).div(price).toFixed($.getAmountPrecision(ex), Decimal.ROUND_CEIL))
    }
    return 0
}

$.getMaxOrderAmount = function(ex) {
    var coin = getCoin(ex)
    if (coin) {
        return coin['max-order-amt']
    }
    return 0
}

$.getValuePrecision = function(ex) {
    var coin = getCoin(ex)
    if (coin) {
        return coin['value-precision']
    }
    return 0
}

$.getMinValue = function(ex) {
    var coin = getCoin(ex)
    if (coin) {
        return coin['min-order-value']
    }
    return 0
}

```

> Detail

https://www.fmz.com/strategy/159104

> Last Modified

2019-07-31 18:15:19
