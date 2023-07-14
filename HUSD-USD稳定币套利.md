
> Name

HUSD-USD稳定币套利

> Author

一拳男孩

> Strategy Description

### HUSD/USDT 稳定币套利
火币有段时间搞活动，HUSD区免手续费，于是搞了个脚本薅羊毛。
根据总是会**回归1**的特点进行稳定套利


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|MAX_ATR|0.0001|最大均幅|
|ORDER_AMOUNT|1000|单次下单量|
|PRICE_CEIL|false|(?价格区间)阻力位|
|PRICE_FLOOR|false|支撑位|
|FEE_RATE|false|(?利润率)手续费|
|PROFIT_RATE|1e-05|利润率|
|PRICE_PRECISION|4|(?精度)价格精度|
|AMOUNT_PRECISION|4|下单量精度|
|MIN_ORDER_AMOUNT|true|最小下单量|




|Button|Default|Description|
|----|----|----|
|profitRate|1e-05|利润率|
|orderAmount|1000|单次下单量|
|开始|__button__|开始|
|暂停|__button__|暂停|
|priceCeil|false|(?价格区间)阻力位|
|priceFloor|false|支撑位|
|maxATR|0.0001|最大均幅|


> Source (javascript)

``` javascript
var _running = false
var _tickTimeCost = 0
var _profit = _G('profit') || 0
var _config = {
    orderAmount: ORDER_AMOUNT,
    priceCeil: PRICE_CEIL,
    priceFloor: PRICE_FLOOR,
    maxATR: MAX_ATR,
    profitRate: PROFIT_RATE
}
var _arbitCount = _G('arbit_count') || 0
var _depthHistory = _G('depth_history') || []

function getNow() {
    return UnixNano() / 1000000
}

function getDepth() {
    var depth = _C(exchange.GetDepth)
    _depthHistory.push(depth)
    _depthHistory = _depthHistory.slice(-5)
    _G('_depthHistory', JSON.stringify(_depthHistory))
    return depth
}

function getBase(ex) {
    return ex.GetCurrency().split('_')[0]
}

function getTypeText(type) {
    var list = [
        [ORDER_TYPE_BUY, 'Buy', '购买', '#01bf6a'],
        [ORDER_TYPE_SELL, 'Sell', '出售', '#ff0000']
    ]
    var found = _.find(list, function(items) {
        return items[0] === type || items[1] === type
    })
    return found ? found[2] + found[3] : ''
}

function getPriceTypeText(type) {
    if (type === 0) {
        return '对手价'
    } else if (type === 1) {
        return '成交价'
    } else if (type === 2) {
        return '挂1价'
    }
}

function getStatusText(st, showColor) {
    showColor = showColor == null ? true : showColor
    var list = [
        [ORDER_STATE_CLOSED, '已完成', '#f4b300'],
        [ORDER_STATE_PENDING, '未完成', '#000000'],
        [ORDER_STATE_CANCELED, '已取消', '#a3a3a3'],
        [ORDER_STATE_UNKNOWN, '未知状态', '#777777']
    ]
    var found = _.find(list, function(item) {
        return item[0] === st
    })
    return found && found.length > 0 ? found[1] + (showColor ? found[2] : '') : ''
}

function logMyProfit(num) {
    var newProfit = _profit + num
    if (newProfit !== _profit) {
        LogProfit(newProfit)
        _profit = newProfit
        _G('profit', _profit)
    }
}

function cancelOrder(id) {
    while (1) {
        var order = _C(exchange.GetOrder, id)
        if (order.Status === ORDER_STATE_PENDING) {
            exchange.CancelOrder(id)
        } else {
            return
        }
        Sleep(200)
    }
}

function getLastATR() {
    var askPrices = _.flatten(_.pluck(_depthHistory, 'Asks').map(function(d) { return d[0].Price }))
    var slicedPrices = askPrices.slice(-5)
    var avgPrice = new Decimal(_.reduce(slicedPrices, function(p, n) {
        return new Decimal(p).plus(n).toNumber()
    }, 0)).div(slicedPrices.length).toNumber()
    var askVaiance = new Decimal(_.reduce(slicedPrices, function(p, n) {
        return new Decimal(p).plus(new Decimal(n).minus(avgPrice).pow(2)).toNumber()
    }, 0)).div(slicedPrices.length).toNumber()
    var askSD = new Decimal(askVaiance).sqrt().toNumber()
    return askSD
}

function getHighestPrice() {
    var records = _C(exchange.GetRecords, PERIOD_H1)
    var highestPrice = TA.Highest(records, 8, 'Close')
    return highestPrice
}

function onTick() {
    var depth = getDepth() //_C(exchange.GetDepth)
    var arbitOrders = JSON.parse(_G('arbit_orders')) || []

    arbitOrders = _.map(arbitOrders, function(arbitOrder) {
        if (arbitOrder.Status === ORDER_STATE_CLOSED) {
            var buyOrder = arbitOrder.BuyOrder || {}
            var sellOrder = arbitOrder.SellOrder || {}
            var buyTradePrice = new Decimal(buyOrder.AvgPrice || 0).mul(buyOrder.DealAmount || 0).toNumber()
            var sellTradePrice = new Decimal(sellOrder.AvgPrice || 0).mul(sellOrder.DealAmount || 0).toNumber()
            var profit = new Decimal(sellTradePrice).minus(buyTradePrice).toNumber()
            if (profit > 0) {
                _arbitCount++
                _G('arbit_count', _arbitCount)
                logMyProfit(profit)
                $.ddNotice('套利成功', [
                    '### 套利成功',
                    '- 买价: ' + buyOrder.Price,
                    '- 卖价: ' + sellOrder.Price,
                    '- 买量: ' + buyOrder.DealAmount,
                    '- 卖量: ' + sellOrder.DealAmount,
                    '- 买交易额: ' + buyTradePrice,
                    '- 卖交易额: ' + sellTradePrice,
                    '- 利润: ' + profit,
                    '- 耗时: ' + ((getNow() - arbitOrder.CreatedAt) / 1000).toFixed(2) + 's',
                ])
            }
            return null
        }
        return arbitOrder
    })
    arbitOrders = _.compact(arbitOrders)
    _G('arbit_orders', JSON.stringify(arbitOrders))

    arbitOrders = _.map(arbitOrders, function(arbitOrder) {
        if (arbitOrder.Status === ORDER_STATE_PENDING) {
            var buyOrder = _C(exchange.GetOrder, arbitOrder.BuyOrder.Id)
            var sellOrder = arbitOrder.SellOrder ? _C(exchange.GetOrder, arbitOrder.SellOrder.Id) : null

            // 标记订单完成
            if (buyOrder && sellOrder && buyOrder.Status !== ORDER_STATE_PENDING && sellOrder.Status !== ORDER_STATE_PENDING) {
                return _.extend(arbitOrder, {
                    Status: ORDER_STATE_CLOSED,
                    BuyOrder: buyOrder,
                    SellOrder: sellOrder,
                })
            }

            // 购买完成后发起出售订单
            if (buyOrder.Status !== ORDER_STATE_PENDING && !sellOrder) {
                var sellAmount = _N(buyOrder.DealAmount, AMOUNT_PRECISION)
                if (sellAmount >= MIN_ORDER_AMOUNT) {
                    var sellPrice = +(new Decimal(buyOrder.Price).mul(1 + FEE_RATE).div(1 - _config.profitRate).div(1 - FEE_RATE).toFixed(PRICE_PRECISION, Decimal.ROUND_UP))
                    var sellId = exchange.Sell(sellPrice, sellAmount)
                    if (sellId) {
                        sellOrder = _C(exchange.GetOrder, sellId)
                    }
                } else {
                    return _.extend(arbitOrder, {
                        Status: ORDER_STATE_CLOSED
                    })
                }
            }

            if (buyOrder.Status === ORDER_STATE_PENDING) {
                /*
                撤单条件
                1. 买1价格发生变化
                2. 均幅波动超出设定值
                3. 当买1的量等于这个买单的剩余量的时候(说明是自己挂的单)
                */
                if (buyOrder.Price !== depth.Bids[0].Price || getLastATR() > _config.maxATR || depth.Bids[0].Amount === _N(new Decimal(buyOrder.Amount).minus(buyOrder.DealAmount).toNumber(), AMOUNT_PRECISION)) {
                    cancelOrder(buyOrder.Id)
                    buyOrder = _C(exchange.GetOrder, buyOrder.Id)
                }
            }

            return _.extend(arbitOrder, {
                BuyOrder: buyOrder,
                BuyPrice: buyOrder.Price,
                SellOrder: sellOrder,
                SellPrice: sellOrder ? sellOrder.Price || 0 : 0
            })
        }
        return arbitOrder
    })

    _G('arbit_orders', JSON.stringify(arbitOrders))

    var buyPrice = depth.Bids[0].Price
    
    // 只有当上一笔同一价格的买单结束后才会开始新的一轮
    if (!_.findWhere(arbitOrders, {
            Status: ORDER_STATE_PENDING,
            BuyPrice: buyPrice
        }) && buyPrice >= _config.priceFloor && buyPrice <= (_config.priceCeil > 0 ? _config.priceCeil : getHighestPrice()) && getLastATR() <= _config.maxATR) {
        var account = _C(exchange.GetAccount)
        var buyTradePrice = _N(new Decimal(buyPrice).mul(_config.orderAmount).toNumber(), PRICE_PRECISION)
        if (account.Balance >= buyTradePrice) {
            var buyId = exchange.Buy(buyPrice, _config.orderAmount)
            if (buyId) {
                var buyOrder = _C(exchange.GetOrder, buyId)
                arbitOrders.push({
                    Status: ORDER_STATE_PENDING,
                    BuyOrder: buyOrder,
                    BuyPrice: buyPrice,
                    SellOrder: null,
                    SellPrice: 0,
                    CreatedAt: getNow()
                })
                _G('arbit_orders', JSON.stringify(arbitOrders))
            }
        }

    }
}

function logMyStatus() {
    var account = _C(exchange.GetAccount)
    var arbitOrders = JSON.parse(_G('arbit_orders')) || []
    var basicStatus = {
        type: 'table',
        title: '基本信息',
        cols: ['运行状态', '耗时', '套利次数', '实现盈亏', '最大均幅 (最近5个卖1标准差 | 设定最大值)', '单次下单量', '阻力位', '支撑位'],
        rows: [
            [
                _running ? '运行中#01c401' : '未运行#a3a3a3',
                new Date().toLocaleString() + ' - ' + (_tickTimeCost / 1000).toFixed(2) + 's',
                _arbitCount,
                (_profit || 0) + '#ff0000',
                getLastATR() + ' | ' + _config.maxATR,
                _config.orderAmount,
                _config.priceCeil > 0 ? _config.priceCeil : getHighestPrice(),
                _config.priceFloor
            ]
        ]
    }

    var assetsStatus = {
        type: 'table',
        title: '资产信息',
        cols: [exchanges[0].GetQuoteCurrency() + ' (可用 | 冻结)', getBase(exchanges[0]) + ' (可用 | 冻结)'],
        rows: [
            [
                new Decimal(account.Balance).plus(account.FrozenBalance).toNumber() + ' (' + account.Balance + ' | ' + account.FrozenBalance + ')',
                new Decimal(account.Stocks).plus(account.FrozenStocks).toNumber() + ' (' + account.Stocks + ' | ' + account.FrozenStocks + ')',
            ]
        ]
    }

    var arbitOrdersStatus = {
        type: 'table',
        title: '套利订单列表',
        cols: ['套利状态', '买单 (状态 | 价格 | 单量)', '卖单 (状态 | 价格 | 单量)', '创建时间'],
        rows: _.map(arbitOrders, function(arbitOrder) {
            var sideOrders = _.map([arbitOrder.BuyOrder, arbitOrder.SellOrder], function(order) {
                if (order) {
                    return getStatusText(order.Status, false) + ' | ' + order.Price + ' | ' + order.DealAmount
                } else {
                    return '-'
                }
            })
            return [getStatusText(arbitOrder.Status), sideOrders[0], sideOrders[1], new Date(arbitOrder.CreatedAt).toLocaleString()]
        })
    }

    var statusList = _.flatten([
        basicStatus,
        assetsStatus,
        arbitOrdersStatus
    ])

    LogStatus(_.compact(statusList).map(function(d) {
        return '`' + JSON.stringify(d) + '`'
    }).join('\n'))
}

function main() {
    _.each(_config, function(v, k) {
        $.BindingFunc(k, function(cmd, val) {
            if (typeof(v) === 'number') {
                val = +val
            }
            _config[k] = val
        })
    })
    $.BindingFunc("开始", function() {
        _running = true
    })
    $.BindingFunc("暂停", function() {
        _running = false
    })
    while (true) {
        var _tickStartTime = getNow()
        LogReset(1000)
        $.GetCommand()
        if (_running) {
            onTick()
        }
        _tickTimeCost = getNow() - _tickStartTime
        logMyStatus()
        Sleep(500)
    }
}
```

> Detail

https://www.fmz.com/strategy/164047

> Last Modified

2022-02-16 01:28:18
