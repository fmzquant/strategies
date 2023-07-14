
> Name

双向合约网格交易v102

> Author

wind

> Strategy Description

# 双向合约网格交易v1.0.2

> 功能

合约网格交易
同时通过做空做多来进行差价套利
由于双向策略爆仓几率很小
* 买入单超时判断
* 倍投
* 自动跟单
* 趋势开单(待开发，收费版)
* 涨跌速动态修改开单数量(待开发，收费版)
* 金叉死叉趋势加入(待开发，收费版)

> 回测数据

  ![IMG](https://www.fmz.com/upload/asset/20322178b3e84a01941d3.jpg) 
  
  ![IMG](https://www.fmz.com/upload/asset/2038958a58a5471a594f9.jpg) 
  
  
2000u半年翻2倍
收益很明显，无论大涨还是大跌都能扛得住

> 维护

持续优化



> Source (javascript)

``` javascript

/*backtest
start: 2021-01-01 00:00:00
end: 2021-06-21 23:59:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":2000}]
*/

// 首次买入
let FIRST_BUY = true;
// 已存在买涨订单
let MANY_BUYING = false;
// 已存在做空订单
let SHORT_BUYING = false;
// 买涨订单创建时间
let MANY_BUY_TIME = null;
// 做空订单创建时间
let SHORT_BUY_TIME = null;
// 买涨空仓时间
let MANY_EMPTY_STEP_TIME = null;
// 做空空仓时间
let SHORT_EMPTY_STEP_TIME = null;
// 校验空仓时间
let CHECK_TIME = null;

let QUANTITY = [0.001, 0.002, 0.004, 0.008, 0.016, 0.032, 0.064];
// 下次购买价格(多仓)
let MANY_NEXT_BUY_PRICE = 0;
// 下次购买价格(空仓)
let SHORT_NEXT_BUY_PRICE = 0;
// 当前仓位(多仓)
let MANY_STEP = 0;
// 当前仓位(空仓)
let SHORT_STEP = 0;
// 止盈比率
let PROFIT_RATIO = 1;
// 补仓比率
let DOUBLE_THROW_RATIO = 1.5;
// 卖出后下次购买金额下浮比率
let BUY_PRICE_RATIO = 1;
// 交易订单列表(多仓)
let MANY_ORDER_LIST = [];
// 交易订单列表(空仓)
let SHORT_ORDER_LIST = [];

function getManyQuantity() {
    if (MANY_STEP < QUANTITY.length) {
        return QUANTITY[MANY_STEP]
    }
    return QUANTITY[0]
}

function getShortQuantity() {
    if (SHORT_STEP < QUANTITY.length) {
        return QUANTITY[SHORT_STEP]
    }
    return QUANTITY[0]
}

function firstManyBuy(ticker) {
    if (MANY_BUYING) {
        return
    }
    exchange.SetDirection("buy")
    let orderId = exchange.Buy(ticker.Last, getManyQuantity())
    if (!orderId) {
        return
    }
    MANY_BUYING = true
    while (true) {
        exchange.SetDirection("buy") 
        let order = exchange.GetOrder(orderId)
        if (null === order) {
            continue
        }
        if (1 === order.Status || 2 === order.Status) {
            MANY_NEXT_BUY_PRICE = order.Price * ((100 - DOUBLE_THROW_RATIO) / 100)
            MANY_STEP = MANY_STEP + 1
            MANY_BUYING = false
            MANY_EMPTY_STEP_TIME = null
            let sellPrice = order.Price * ((100 + PROFIT_RATIO) / 100)
            MANY_ORDER_LIST.push({
                buyPrice: order.Price,
                sellPrice: sellPrice,
                quantity: order.Amount,
                isSell: false,
            })
            break
        }
    }
}

function firstShortBuy(ticker) {
    if (SHORT_BUYING) {
        return
    }
    exchange.SetDirection("sell")
    let orderId = exchange.Sell(ticker.Last, getShortQuantity())
    if (!orderId) {
        return
    }
    SHORT_BUYING = true
    while (true) {
        let order = exchange.GetOrder(orderId)
        if (null === order) {
            continue
        }
        if (1 === order.Status || 2 === order.Status) {
            SHORT_NEXT_BUY_PRICE = order.Price * ((100 + DOUBLE_THROW_RATIO) / 100)
            SHORT_STEP = SHORT_STEP + 1
            SHORT_BUYING = false
            SHORT_EMPTY_STEP_TIME = null
            let sellPrice = order.Price * ((100 - PROFIT_RATIO) / 100)
            SHORT_ORDER_LIST.push({
                buyPrice: order.Price,
                sellPrice: sellPrice,
                quantity: order.Amount,
                isSell: false,
            })
            break
        }
    }
}

function manyBuy(ticker) {
    if (MANY_BUYING) {
        return
    }
    Log('ticker: ' + ticker.Last + ' MANY_NEXT_BUY_PRICE: ' + MANY_NEXT_BUY_PRICE)
    if (ticker.Last > MANY_NEXT_BUY_PRICE) {
        return
    }
    exchange.SetDirection("buy")
    let orderId = exchange.Buy(ticker.Last, getManyQuantity())
    if (!orderId) {
        return
    }
    MANY_BUYING = true
    MANY_BUY_TIME = Unix()
    while (true) {
        let now = Unix()
        let order = exchange.GetOrder(orderId)
        let expire = MANY_BUY_TIME + (60 * 30)
        if (null === order) {
            continue
        }
        // 买入成功处理
        if (1 === order.Status || 2 === order.Status) {
            MANY_NEXT_BUY_PRICE = order.Price * ((100 - DOUBLE_THROW_RATIO) / 100)
            MANY_STEP = MANY_STEP + 1
            MANY_BUYING = false
            MANY_EMPTY_STEP_TIME = null
            let sellPrice = order.Price * ((100 + PROFIT_RATIO) / 100)
            MANY_ORDER_LIST.push({
                buyPrice: order.Price,
                sellPrice: sellPrice,
                quantity: order.Amount,
                isSell: false,
            })
            break
        }
        // 买入超时处理
        if (now >= expire) {
            exchange.CancelOrder(orderId)
            MANY_BUYING = false
            MANY_BUY_TIME = null
            MANY_NEXT_BUY_PRICE = ticker.Last * ((100 - DOUBLE_THROW_RATIO) / 100)
            return
        }
    }
}

function shortBuy(ticker) {
    if (SHORT_BUYING) {
        return
    }
    Log('ticker: ' + ticker.Last + ' SHORT_NEXT_BUY_PRICE: ' + SHORT_NEXT_BUY_PRICE)
    if (ticker.Last < SHORT_NEXT_BUY_PRICE) {
        return
    }
    exchange.SetDirection("sell")
    let orderId = exchange.Sell(ticker.Last, getShortQuantity())
    if (!orderId) {
        return
    }
    SHORT_BUYING = true
    SHORT_BUY_TIME = Unix()
    while (true) {
        let now = Unix()
        let expire = SHORT_BUY_TIME + (60 * 30)
        let order = exchange.GetOrder(orderId)
        if (null === order) {
            continue
        }
        // 买入成功处理
        if (1 === order.Status || 2 === order.Status) {
            SHORT_NEXT_BUY_PRICE = order.Price * ((100 + DOUBLE_THROW_RATIO) / 100)
            SHORT_STEP = SHORT_STEP + 1
            SHORT_BUYING = false
            SHORT_EMPTY_STEP_TIME = null
            let sellPrice = order.Price * ((100 - PROFIT_RATIO) / 100)
            SHORT_ORDER_LIST.push({
                buyPrice: order.Price,
                sellPrice: sellPrice,
                quantity: order.Amount,
                isSell: false,
            })
            break
        }
        // 买入超时处理
        if (now >= expire) {
            exchange.CancelOrder(orderId)
            SHORT_BUYING = false
            SHORT_BUY_TIME = null
            SHORT_NEXT_BUY_PRICE = ticker.Last * ((100 + DOUBLE_THROW_RATIO) / 100)
            return
        }
    }
}


function manySell(ticker) {
    // 遍历卖出订单
    for (let item of MANY_ORDER_LIST) {
        if (item.isSell) {
            continue
        }
        if (ticker.Last >= item.sellPrice) {
            item.isSell = true;
            exchange.SetDirection("closebuy")
            let orderId = exchange.Sell(ticker.Last, item.quantity)
            if (!orderId) {
                return
            }
            while (true) {
                let order = exchange.GetOrder(orderId)
                if (null === order) {
                    continue
                }
                if (1 === order.Status || 2 === order.Status) {
                    MANY_NEXT_BUY_PRICE = ticker.Last * ((100 - BUY_PRICE_RATIO) / 100)
                    MANY_STEP = MANY_STEP - 1
                    if (0 === MANY_STEP) {
                        MANY_EMPTY_STEP_TIME = Unix()
                    }
                    break
                }
            }
        }
    }
}

function shortSell(ticker) {
    // 遍历卖出订单
    for (let item of SHORT_ORDER_LIST) {
        if (item.isSell) {
            continue
        }
        if (ticker.Last <= item.sellPrice) {
            item.isSell = true;
            exchange.SetDirection("closesell")
            let orderId = exchange.Buy(ticker.Last, item.quantity)
            if (!orderId) {
                return
            }
            while (true) {
                let order = exchange.GetOrder(orderId)
                if (null === order) {
                    continue
                }
                if (1 === order.Status || 2 === order.Status) {
                    SHORT_NEXT_BUY_PRICE = ticker.Last * ((100 + BUY_PRICE_RATIO) / 100)
                    SHORT_STEP = SHORT_STEP - 1
                    if (0 === SHORT_STEP) {
                        SHORT_EMPTY_STEP_TIME = Unix()
                    }
                    break
                }
            }
        }
    }
}

function check(ticker) {
    let now = Unix()
    if (null !== CHECK_TIME) {
        let expire = CHECK_TIME + (60 * 10)
        if (now < expire) {
            return
        }
    }
    CHECK_TIME = now

    if (null !== MANY_EMPTY_STEP_TIME) {
        let expire = MANY_EMPTY_STEP_TIME + (60 * 30)
        if (now >= expire) {
            MANY_NEXT_BUY_PRICE = ticker.Last * ((100 - DOUBLE_THROW_RATIO) / 100)
            Log('没有买涨持仓, 调整买入价: ' + MANY_NEXT_BUY_PRICE)
        }
    }
    
    if (null !== SHORT_EMPTY_STEP_TIME) {
        let expire = SHORT_EMPTY_STEP_TIME + (60 * 30)
        if (now >= expire) {
            SHORT_NEXT_BUY_PRICE = ticker.Last * ((100 + DOUBLE_THROW_RATIO) / 100)
            Log('没有做空持仓, 调整买入价: ' + SHORT_NEXT_BUY_PRICE)
        }
    }
}

function onTick() {
    // 在这里写策略逻辑，将会不断调用，例如打印行情信息
    let ticker = exchange.GetTicker()
    if (!ticker) {
        return
    }
    if (FIRST_BUY) {
        // 首次做多购买
        firstManyBuy(ticker)
        // 首次做空购买
        firstShortBuy(ticker)
        FIRST_BUY = false
        return
    }
    
    // 做多买入
    manyBuy(ticker)
    // 做空买入
    shortBuy(ticker)
    // 做多卖出
    manySell(ticker)
    // 做空卖出
    shortSell(ticker)
    // 空仓检测
    check(ticker)
}

function main() {
    // 开合约
    exchange.SetContractType("swap")

    while(true){
        onTick()
        // Sleep函数主要用于数字货币策略的轮询频率控制，防止访问交易所API接口过于频繁
        Sleep(60000)
    }
}

```

> Detail

https://www.fmz.com/strategy/293325

> Last Modified

2021-06-28 17:37:41
