
> 策略名称

common

> 策略作者

linsilence



> 策略参数



|参数|默认值|描述|
|----|----|----|
|retryDelay|1000|重试延迟|
|isDebug|false|是否测试|


> 源码 (javascript)

``` javascript
  

function GetCurrencyEx(ex, baseOrQuote) {
    let curr = ex.GetCurrency();
    let s = curr.split('_');
    return s[baseOrQuote ? 0 : 1]
}

function cancelOrdersPending(ex, orderType, orderOffset) {
    while (true) {
        const orders = ex.GetOrders();
        if (!orders) {
            Sleep(retryDelay);
            continue;
        }
        let processed = 0;
        for (let i = 0; i < orders.length; i++) {
            if (typeof (orderType) === 'number' && orders[i].Type !== orderType) {
                continue;
            }
            if (typeof (orderOffset) === 'number' && orders[i].Offset !== orderOffset) {
                continue;
            }

            ex.CancelOrder(orders[i].Id);
            if (isDebug) Log('cancelOrdersPending - ', orders[i]);

            processed++;
            Sleep(retryDelay);
        }
        if (processed === 0) {
            break;
        }
    }
}

function isDepthBid(depthSide) {
    return depthSide[0].Price > depthSide[1].Price;
}

function trade(ex, orderType, price, amount, precision, minAmount, orderOffset) {
    let tradeFunc = orderType === ORDER_TYPE_BUY ? ex.Buy : ex.Sell;
    let tradeDirection;
    if (orderOffset === ORDER_OFFSET_OPEN) {
        tradeDirection = orderType === ORDER_TYPE_BUY ? 'buy' : 'sell';
    } else if (orderOffset === ORDER_OFFSET_CLOSE) {
        tradeDirection = orderType === ORDER_TYPE_BUY ? 'closesell' : 'closebuy';
    }
    if (isDebug) Log('trade 1 - ', 'orderType: ', orderType, ', orderOffset: ', orderOffset, ', tradeDirection: ', tradeDirection);

    const amt = _N(amount, precision);
    if (amt === 0) {
        Log('trade amount in precision error. ', amount, precision, amt, '#FF0000');
        return null;
    }
    if (amt < minAmount) {
        Log('trade amount less than min amount. ', amount, minAmount, amt, '#FF0000');
        return null;
    }

    let orderID;
    while (true) {
        if (tradeDirection) {
            ex.SetDirection(tradeDirection);
        }
        const id = tradeFunc(price, amt);
        if (!id) {
            Sleep(retryDelay);
            cancelOrdersPending(ex, orderType, orderOffset);
            continue;
        }
        if (isDebug) Log('trade 2 - ', 'id: ', id, ', price: ', price, ', amount: ', amount);

        orderID = id;
        break;
    }

    return orderID;
}

// 定义一个接口
const CountDown = {
    label: '',
    total: 0,
    accum: 0,
    overtime: 0,
    lasttime: 0,
}

var CountDownMap = new Map();

$.CountDownEnd = function (label, accumulate, total, overtime = 5 * 60) {
    let cd = CountDownMap.get(label);
    if (!cd) {
        cd = {
            label: label,
            total: total,
            accum: 0,
            overtime: overtime,
            lasttime: 0,
        };
        CountDownMap.set(label, cd);
    }

    // 超时后，需要重新计数
    const t = Unix();
    if (t - cd.lasttime > cd.overtime) {
        cd.accum = 0;
        cd.lasttime = t;

        // 先执行一次
        return true;
    }
    cd.lasttime = t;

    // 修改total后，需要重新计数
    if (cd.total !== total) {
        cd.total = total;
        cd.accum = 0;
    }

    cd.accum += accumulate;
    const isEnd = cd.accum >= total;
    if (isEnd) {
        cd.accum = 0;
    }

    if (isDebug) Log('CountDownEnd - ', Array.from(CountDownMap));

    return isEnd;
}

$.AverageSmooth = function (values) {
    // 剔除偏差较大的量
    let mean = math.mean(values);
    let stde = math.std(values);

    // 过滤平均值±2*标准差
    let ml = mean - 2 * stde;
    let mh = mean + 2 * stde;

    if (isDebug) Log('AverageSmooth 1 - ', mean, stde, ml, mh);

    let vs = values.filter(e => {
        let res = e > ml && e < mh;
        if (isDebug && !res) {
            Log('AverageSmooth 2 - filter: ', e);
        }
        return res;
    });
    if (!vs || vs.length === 0) {
        return 0;
    }
    return math.mean(vs);
};

$.CountDecimals = function (num) {
    const numTrim = parseFloat(num);
    return String(numTrim).includes('.') ? String(numTrim).split('.')[1].length : 0;
};

$.LiquidationRate = function (open, last, liq) {
    return 1 - math.abs(last - liq) / math.abs(open - liq);
};

$.GetCurrencyBase = function (ex) {
    return GetCurrencyEx(ex, true);
};

$.GetCurrencyQuote = function (ex) {
    return GetCurrencyEx(ex, false);
};

$.CurrencyExist = function (ex, symbol) {
    const old = ex.GetCurrency();
    ex.SetCurrency(symbol);
    let exist = Boolean(ex.GetTicker());
    ex.SetCurrency(old);
    return exist;
};

$.PriceRate = function (last, open) {
    return _N((last - open) / open, 4);
};

$.GetDepthTotal = function (depthSide, pricePercent) {
    if (pricePercent <= 0) {
        Log('pricePercent 大于 0');
        return 0;
    }
    let isBid = isDepthBid(depthSide);
    let priceTarget = depthSide[0].Price * (1 + pricePercent * (isBid ? -1 : 1));
    let depthStage = depthSide.filter(e => isBid ? (e.Price >= priceTarget) : (e.Price <= priceTarget));
    let total = depthStage.map(e => e.Amount).reduce((prev, curr) => prev + curr);

    if (isDebug) {
        Log('isBid: ', isBid);
        Log('price: ', depthSide[0].Price, ', priceTarget: ', priceTarget);
        Log('depthStage: ', depthStage[depthStage.length - 1]);
        Log('total: ', total);
    }

    return total;
};

/**
 * 查询操作 amountAccumate 将会对价格产生多大的影响
 * 
 * @param {*} depthSide 
 * @param {*} amountAccumate 
 * 
 * @returns 影响的价格
 */
$.GetDepthTotalPrice = function (depthSide, amountAccumulate) {
    let priceAccumulate = -1;

    let am = 0;
    for (let i = 0; i < depthSide.length; ++i) {
        const e = depthSide[i];
        am += e.Amount;

        if (isDebug) Log('GetDepthTotalPrice - ', 'index: ', i, ', depth: ', e, ', amountAcc: ', am);

        if (am >= amountAccumulate) {
            priceAccumulate = e.Price;
            break;
        }
    };

    return priceAccumulate;
};

$.GetDepthAmounts = function (depthSide) {
    return depthSide.map(e => e.Amount);
};

$.GetRecordsVolume = function (records) {
    return records.map(e => e.Volume);
}

$.IsFuture = function (ex) {
    return /(F|f)utures.*/.test(ex.GetName());
};

/**
 * 取消所有未完成的订单
 * 
 * @param {*} ex 
 * @param {*} orderType null 取消所有的
 * @param {*} orderOffset 期货才需要传参数，null 取消所有的
 */
$.CancelOrdersPending = function (ex, orderType, orderOffset) {
    cancelOrdersPending(ex, orderType, orderOffset);
};

/**
 * 规定时间内完成交易，否则撤销，部分成交的也会撤销
 * 
 * @param {*} ex 
 * @param {*} orderType ORDER_TYPE_BUY | ORDER_TYPE_SELL
 * @param {*} price 
 * @param {*} amount 
 * @param {*} precision 交易量的精度
 * @param {*} minAmount 最小交易量
 * @param {*} waitTime 
 * @param {*} orderOffset 期货需要传这个参数, ORDER_OFFSET_OPEN | ORDER_OFFSET_CLOSE
 * 
 * @returns order，状态只能是：ORDER_STATE_CLOSED | ORDER_STATE_CANCELED
 */
$.TradeCancel = function (ex, orderType, price, amount, precision, minAmount, waitTime, orderOffset) {
    let orderID = trade(ex, orderType, price, amount, precision, minAmount, orderOffset)
    if (!orderID) {
        return null;
    }

    let waiting = 0;
    let orderFinal;
    while (true) {
        Sleep(retryDelay)

        const order = _C(ex.GetOrder, orderID);
        if (!order) {
            break;
        }
        if (isDebug) Log('TradeCancel 1 - ', order);

        orderFinal = order;
        if (order.Status !== ORDER_STATE_PENDING) {
            break;
        }

        // 有可能成交了一部分
        waiting += retryDelay;
        if (waiting > waitTime) {
            // 应该撤销这个订单
            ex.CancelOrder(orderID);

            if (isDebug) Log('TradeCancel 2 cancel');
        }
    }

    Log('TradeCancel 3 - ', orderFinal, orderFinal.Status === ORDER_STATE_UNKNOWN ? '#FF0000' : '#000000');

    return orderFinal;
};

/**
 * 规定时间内完成交易，否则剩余部分市价成交
 * 
 * @param {*} ex 
 * @param {*} orderType 
 * @param {*} price 
 * @param {*} amount 
 * @param {*} precision 交易量的精度
 * @param {*} minAmount 最小交易量
 * @param {*} waitTime 
 * @param {*} orderOffset 
 * 
 * @returns order
 */
$.TradeCertain = function (ex, orderType, price, amount, precision, minAmount, waitTime, orderOffset) {
    const order = $.TradeCancel(ex, orderType, price, amount, precision, minAmount, waitTime, orderOffset);
    if (!order) {
        return null;
    }
    if (order.Status !== ORDER_STATE_CANCELED) {
        return order;
    }

    // 剩余量以市价快速成交
    const amountRest = amount - order.DealAmount;
    if (amountRest < minAmount) {
        return order;
    }
    if (isDebug) Log('TradeCertain market - amountRest: ', amountRest, 'order: ', order);

    return $.TradeCertain(ex, orderType, -1, amountRest, precision, minAmount, math.min(waitTime / 2, 1000), orderOffset);
};

/**
 * 等待waitTime以最优价格交易，否则取消，然后重试retryTimes次后，再市价成交
 * 
 * @param {*} ex 
 * @param {*} orderType 
 * @param {*} amount number类型
 * @param {*} precision 
 * @param {*} minAmount 最小交易量
 * @param {*} waitTime 
 * @param {*} orderOffset 
 * @param {*} retryTimes -1, 一直循环下去
 */
$.TradeRetry = function (ex, orderType, amount, precision, minAmount, waitTime, orderOffset, retryTimes) {
    let amountRest = amount;
    let retry = 0;
    while (true) {
        const ticker = _C(ex.GetTicker);
        const price = orderType === ORDER_TYPE_BUY ? ticker.Buy : ticker.Sell;
        const order = $.TradeCancel(ex, orderType, price, amountRest, precision, minAmount, waitTime, orderOffset);
        if (!order) {
            return null;
        }
        if (order.Status !== ORDER_STATE_CANCELED) {
            return order;
        }

        amountRest -= order.DealAmount;
        if (amountRest < minAmount) {
            return order;
        }

        if (isDebug) Log('TradeRetry market - retry:', retry, 'amountRest: ', amountRest);
        if (retryTimes === -1) {
            continue;
        }
        if (++retry > retryTimes) {
            break;
        }
    }
    if (isDebug) Log('TradeRetry market - amountRest: ', amountRest);
    return $.TradeCertain(ex, orderType, -1, amountRest, precision, minAmount, math.min(waitTime / 2, 1000), orderOffset);
};

function main() {
    exchange.SetContractType('swap');

    Log('GetCurrencyQuote: ', $.GetCurrencyQuote(exchange));
    Log('PriceRate: ', $.PriceRate(35058.79, 34675));
    Log('IsFuture: ', $.IsFuture(exchange));
    Log('GetDepthAmounts: ', $.GetDepthAmounts(exchange.GetDepth().Bids));

    let arr = [3, 6, 12, 2, 200, 1000];
    Log('AverageSmooth: ', arr, ' - ', $.AverageSmooth(arr));

    Log('GetDepthTotal: ', $.GetDepthTotal(exchange.GetDepth().Bids, 0.01));
    Log('GetDepthTotalPrice: ', $.GetDepthTotalPrice(exchange.GetDepth().Bids, 2100));

    Log('TradeCancel buy: ', $.TradeCancel(exchange, ORDER_TYPE_BUY, -1, 0.1, 3, 3000, ORDER_OFFSET_OPEN));

    Log('CountDecimals: ', $.CountDecimals(1), $.CountDecimals(0.001));
}
```

> 策略出处

https://www.fmz.com/strategy/246749

> 更新时间

2021-08-12 15:35:42
