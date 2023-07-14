
> Name

common

> Author

linsilence



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|retryDelay|1000|重试延迟|
|isDebug|false|是否测试|


> Source (javascript)

``` javascript


function GetCurrencyEx(ex, baseOrQuote) {
  let curr = ex.GetCurrency()
  let s = curr.split('_')
  return s[baseOrQuote ? 0 : 1]
}

function cancelOrdersPending(ex, orderType, orderOffset) {
  while (true) {
    const orders = ex.GetOrders()
    if (!orders) {
      Sleep(retryDelay)
      continue
    }
    let processed = 0
    for (let i = 0; i < orders.length; i++) {
      if (typeof orderType === 'number' && orders[i].Type !== orderType) {
        continue
      }
      if (typeof orderOffset === 'number' && orders[i].Offset !== orderOffset) {
        continue
      }

      ex.CancelOrder(orders[i].Id)
      if (isDebug) Log('cancelOrdersPending - ', orders[i])

      processed++
      Sleep(retryDelay)
    }
    if (processed === 0) {
      break
    }
  }
}

function isDepthBid(depthSide) {
  return depthSide[0].Price > depthSide[1].Price
}

/**
 *
 * @param {*} ex
 * @param {*} orderType ORDER_TYPE_BUY | ORDER_TYPE_SELL
 * @param {*} price
 * @param {*} quantity 交易额
 * @param {*} precision 交易额的精度
 * @param {*} minQuantity 最小交易额
 * @param {*} orderOffset 期货需要传这个参数, ORDER_OFFSET_OPEN | ORDER_OFFSET_CLOSE
 * @param {*} errorCancel true - 直接返回null , false - 取消所有方向相同的pending order，重新挂单，直到成功挂单为止
 * @returns order id
 */
function trade(ex, orderType, price, quantity, precision, minQuantity, orderOffset, errorCancel) {
  let tradeFunc = orderType === ORDER_TYPE_BUY ? ex.Buy : ex.Sell
  let tradeDirection
  if (orderOffset === ORDER_OFFSET_OPEN) {
    tradeDirection = orderType === ORDER_TYPE_BUY ? 'buy' : 'sell'
  } else if (orderOffset === ORDER_OFFSET_CLOSE) {
    tradeDirection = orderType === ORDER_TYPE_BUY ? 'closesell' : 'closebuy'
  }
  if (tradeDirection) {
    ex.SetDirection(tradeDirection)
  }

  if (isDebug) Log('trade 1 - ', 'orderType: ', orderType, ', orderOffset: ', orderOffset, ', tradeDirection: ', tradeDirection)

  const qty = _N(quantity, precision)
  if (qty === 0) {
    Log(`trade quantity in precision error. ${quantity} ${precision} ${qty}`, '#FF0000')
    return null
  }
  if (qty < minQuantity) {
    Log(`trade quantity less than min quantity. ${quantity} ${minQuantity} ${qty}`, '#FF0000')
    return null
  }

  let orderID
  while (true) {
    const id = tradeFunc(price, qty)
    if (!id) {
      if (errorCancel) {
        Log('trade id is null. maybe trade has sent!', '#FF0000')
        return null
      }

      Sleep(retryDelay)
      cancelOrdersPending(ex, orderType, orderOffset)
      continue
    }
    if (isDebug) Log('trade 2 - ', 'id: ', id, ', price: ', price, ', quantity: ', quantity)

    orderID = id
    break
  }

  return orderID
}

$.AverageSmooth = function (values) {
  // 剔除偏差较大的量
  let mean = math.mean(values)
  let stde = math.std(values)

  // 过滤平均值±2*标准差
  let ml = mean - 2 * stde
  let mh = mean + 2 * stde

  if (isDebug) Log('AverageSmooth 1 - ', mean, stde, ml, mh)

  let vs = values.filter((e) => {
    let res = e > ml && e < mh
    if (isDebug && !res) {
      Log('AverageSmooth 2 - filter: ', e)
    }
    return res
  })
  if (!vs || vs.length === 0) {
    return 0
  }
  return math.mean(vs)
}

$.CountDecimals = function (num) {
  const numTrim = parseFloat(num)
  return String(numTrim).includes('.') ? String(numTrim).split('.')[1].length : 0
}

$.LiquidationRate = function (open, last, liq) {
  return 1 - math.abs(last - liq) / math.abs(open - liq)
}

$.GetCurrencyBase = function (ex) {
  return GetCurrencyEx(ex, true)
}

$.GetCurrencyQuote = function (ex) {
  return GetCurrencyEx(ex, false)
}

$.CurrencyExist = function (ex, symbol) {
  const old = ex.GetCurrency()
  ex.SetCurrency(symbol)
  let exist = Boolean(ex.GetTicker())
  ex.SetCurrency(old)
  return exist
}

$.PriceRate = function (last, open) {
  return _N((last - open) / open, 4)
}

$.GetDepthTotal = function (depthSide, pricePercent) {
  if (pricePercent <= 0) {
    Log('pricePercent 大于 0')
    return 0
  }
  let isBid = isDepthBid(depthSide)
  let priceTarget = depthSide[0].Price * (1 + pricePercent * (isBid ? -1 : 1))
  let depthStage = depthSide.filter((e) => (isBid ? e.Price >= priceTarget : e.Price <= priceTarget))
  let total = depthStage.map((e) => e.Amount).reduce((prev, curr) => prev + curr)

  if (isDebug) {
    Log('isBid: ', isBid)
    Log('price: ', depthSide[0].Price, ', priceTarget: ', priceTarget)
    Log('depthStage: ', depthStage[depthStage.length - 1])
    Log('total: ', total)
  }

  return total
}

/**
 * 查询操作 amountAccumate 将会对价格产生多大的影响
 *
 * @param {*} depthSide
 * @param {*} amountAccumate
 *
 * @returns 影响的价格
 */
$.GetDepthTotalPrice = function (depthSide, amountAccumulate) {
  let priceAccumulate = -1

  let am = 0
  for (let i = 0; i < depthSide.length; ++i) {
    const e = depthSide[i]
    am += e.Amount

    if (isDebug) Log('GetDepthTotalPrice - ', 'index: ', i, ', depth: ', e, ', amountAcc: ', am)

    if (am >= amountAccumulate) {
      priceAccumulate = e.Price
      break
    }
  }

  return priceAccumulate
}

$.GetDepthAmounts = function (depthSide) {
  return depthSide.map((e) => e.Amount)
}

$.GetRecordsVolume = function (records) {
  return records.map((e) => e.Volume)
}

$.GetRecordsVolumeAmount = function (records) {
  return records.map((e) => e.Volume * e.Close)
}

$.GetRecordsAmplitude = function (records) {
  return records.map((e) => (e.High - e.Low) / e.Open)
}

$.GetRecordsClose = function (records) {
  return records.map((e) => e.Close)
}

$.GetRecordsHigh = function (records) {
  return records.map((e) => e.High)
}

$.GetRecordsLow = function (records) {
  return records.map((e) => e.Low)
}

$.IsFuture = function (ex) {
  return /(F|f)utures.*/.test(ex.GetName())
}

/**
 * 取消所有未完成的订单
 *
 * @param {*} ex
 * @param {*} orderType null 取消所有的
 * @param {*} orderOffset 期货才需要传参数，null 取消所有的
 */
$.CancelOrdersPending = function (ex, orderType, orderOffset) {
  cancelOrdersPending(ex, orderType, orderOffset)
}

/**
 * trade时，未获取到order id时，
 * 等待一会儿后，检查余额是否发生变化，如果发生变化了，说明交易订单已经发出（交易成功或挂单成功），但是order id无法获取
 * 否则，重新trade，直到订单发出为止
 *
 * @param {*} ex
 * @param {*} orderType ORDER_TYPE_BUY | ORDER_TYPE_SELL
 * @param {*} price
 * @param {*} quantity 交易额
 * @param {*} precision 交易额的精度
 * @param {*} minQuantity 最小交易额
 * @param {*} orderOffset 期货需要传这个参数, ORDER_OFFSET_OPEN | ORDER_OFFSET_CLOSE
 * @returns order id
 */
$.TradeNormal = function (ex, orderType, price, quantity, precision, minQuantity, orderOffset) {
  const accPre = _C(ex.GetAccount)

  let orderID = null
  while (true) {
    orderID = trade(ex, orderType, price, quantity, precision, minQuantity, orderOffset, true)
    if (orderID) {
      break
    }
    isDebug && Log(`TradeNormal - orderID获取失败 - price: ${price}, quantity: ${quantity}`, '#FF0000')

    Sleep(retryDelay * 2)
    const accAft = _C(ex.GetAccount)
    if (accAft.Balance !== accPre.Balance) {
      isDebug && Log(`TradeNormal - Balance 前后发生变化，交易已经发生 - price: ${price}, quantity: ${quantity}`, '#FF0000')
      break
    }
  }

  return orderID
}

/**
 * 规定时间内完成交易，否则撤销，部分成交的也会撤销
 *
 * @param {*} ex
 * @param {*} orderType ORDER_TYPE_BUY | ORDER_TYPE_SELL
 * @param {*} price
 * @param {*} quantity 交易额
 * @param {*} precision 交易额的精度
 * @param {*} minQuantity 最小交易额
 * @param {*} waitTime
 * @param {*} orderOffset 期货需要传这个参数, ORDER_OFFSET_OPEN | ORDER_OFFSET_CLOSE
 *
 * @returns order，状态只能是：ORDER_STATE_CLOSED | ORDER_STATE_CANCELED
 */
$.TradeCancel = function (ex, orderType, price, quantity, precision, minQuantity, waitTime, orderOffset) {
  let orderID = trade(ex, orderType, price, quantity, precision, minQuantity, orderOffset)
  if (!orderID) {
    return null
  }

  let waiting = 0
  let orderFinal
  while (true) {
    Sleep(retryDelay)

    const order = _C(ex.GetOrder, orderID)
    if (!order) {
      break
    }
    if (isDebug) Log('TradeCancel 1 - ', order)

    orderFinal = order
    if (order.Status !== ORDER_STATE_PENDING) {
      break
    }

    // 有可能成交了一部分
    waiting += retryDelay
    if (waiting > waitTime) {
      // 应该撤销这个订单
      ex.CancelOrder(orderID)

      if (isDebug) Log('TradeCancel 2 cancel')
    }
  }

  if (isDebug) Log('TradeCancel 3 - ', orderFinal, orderFinal.Status === ORDER_STATE_UNKNOWN ? '#FF0000' : '#000000')

  return orderFinal
}

/**
 * 规定时间内完成交易，否则剩余部分市价成交
 *
 * @param {*} ex
 * @param {*} orderType
 * @param {*} price
 * @param {*} quantity 交易额
 * @param {*} precision 交易额的精度
 * @param {*} minQuantity 最小交易额
 * @param {*} waitTime
 * @param {*} orderOffset
 *
 * @returns order
 */
$.TradeCertain = function (ex, orderType, price, quantity, precision, minQuantity, waitTime, orderOffset) {
  const order = $.TradeCancel(ex, orderType, price, quantity, precision, minQuantity, waitTime, orderOffset)
  if (!order) {
    return null
  }
  if (order.Status !== ORDER_STATE_CANCELED) {
    return order
  }

  // 剩余量以市价快速成交
  const qtyRest = quantity - order.DealAmount
  if (qtyRest < minQuantity) {
    return order
  }
  if (isDebug) Log('TradeCertain market - qtyRest: ', qtyRest, 'order: ', order)

  return $.TradeCertain(ex, orderType, -1, qtyRest, precision, minQuantity, math.min(waitTime / 2, 1000), orderOffset)
}

/**
 * 等待waitTime以最优价格交易，否则取消，然后重试retryTimes次后，再市价成交
 *
 * @param {*} ex
 * @param {*} orderType
 * @param {*} quantity 交易额
 * @param {*} quantityPrecision 交易额的精度
 * @param {*} pricePrecision 价格的精度
 * @param {*} minQuantity 最小交易额
 * @param {*} waitTime
 * @param {*} orderOffset
 * @param {*} retryTimes -1, 一直循环下去
 */
$.TradeRetry = function (ex, orderType, quantity, quantityPrecision, pricePrecision, minQuantity, waitTime, orderOffset, retryTimes) {
  let qtyRest = quantity
  let retry = 0
  while (true) {
    const ticker = _C(ex.GetTicker)
    const price = orderType === ORDER_TYPE_BUY ? ticker.Buy : ticker.Sell
    const order = $.TradeCancel(ex, orderType, price, qtyRest, quantityPrecision, minQuantity, waitTime, orderOffset)
    if (!order) {
      return null
    }
    if (order.Status !== ORDER_STATE_CANCELED) {
      return order
    }

    qtyRest -= order.DealAmount
    if (qtyRest < minQuantity) {
      return order
    }

    if (isDebug) Log('TradeRetry market - retry:', retry, 'qtyRest: ', qtyRest)
    if (retryTimes === -1) {
      continue
    }
    if (++retry > retryTimes) {
      break
    }
  }
  if (isDebug) Log('TradeRetry market - qtyRest: ', qtyRest)

  // FIXME: fmz未对市价Buy做适配，导致限价时使用交易量quantity做参数，而市价使用交易额做参数，而且只有Buy，Sell都是正常使用交易额的
  // return $.TradeCertain(ex, orderType, -1, qtyRest, precision, minQuantity, math.min(waitTime / 2, 1000), orderOffset)

  // so the priceFix use the 1% up/down the ticker.Last
  const ticker = _C(ex.GetTicker)
  const priceFix = _N(ticker.Last * (orderType === ORDER_TYPE_BUY ? 1.01 : 0.99), pricePrecision)
  return $.TradeCertain(ex, orderType, priceFix, qtyRest, quantityPrecision, minQuantity, math.min(waitTime / 2, 1000), orderOffset)
}

$.TradeRetrySlightly = function (ex, orderType, quantityTotal, quantityPrecision, pricePrecision, minQuantity, waitTime, orderOffset, retryTimes) {
  // 最佳成交量
  const depth = ex.GetDepth()
  const quantity_divide = math.min($.AverageSmooth($.GetDepthAmounts(depth.Bids)), $.AverageSmooth($.GetDepthAmounts(depth.Asks)))
  isDebug && Log(`TradeRetrySlightly - quantity_divide: ${quantity_divide}`)

  let qtyRest = quantityTotal
  while (true) {
    const qty = math.min(quantity_divide, qtyRest)
    if (qty < minQuantity) {
      break
    }

    const order = $.TradeRetry(ex, orderType, qty, quantityPrecision, pricePrecision, minQuantity, waitTime, orderOffset, retryTimes)
    if (order == null) {
      break
    }
    if (order.Status === ORDER_STATE_CLOSED) {
      qtyRest -= qty
    } else {
      throw new Error(`order.Status: ${order.Status}`)
    }

    Sleep(retryDelay)
  }
}

// 定义一个接口
const CountDown = {
  label: '',
  total: 0,
  accum: 0,
  overtime: 0,
  lasttime: 0,
}

var CountDownMap = new Map()

$.CountDownEnd = function (label, accumulate, total, overtime = 5 * 60) {
  let cd = CountDownMap.get(label)
  if (!cd) {
    cd = {
      label: label,
      total: total,
      accum: 0,
      overtime: overtime,
      lasttime: 0,
    }
    CountDownMap.set(label, cd)
  }

  // 超时后，需要重新计数
  const t = Unix()
  if (t - cd.lasttime > cd.overtime) {
    cd.accum = 0
    cd.lasttime = t

    // 先执行一次
    return true
  }
  cd.lasttime = t

  // 修改total后，需要重新计数
  if (cd.total !== total) {
    cd.total = total
    cd.accum = 0
  }

  cd.accum += accumulate
  const isEnd = cd.accum >= total
  if (isEnd) {
    cd.accum = 0
  }

  if (isDebug) Log('CountDownEnd - ', Array.from(CountDownMap))

  return isEnd
}

$.LoopStatusUpdate = (loop) => {
  let statusOld
  return (dt) => {
    const status = loop(dt)
    if (!status) {
      return statusOld
    }

    const statusNew = JSON.stringify(status)
    if (statusNew !== statusOld) {
      statusOld = statusNew
    }

    return statusOld
  }
}

$.LoopWaitFunc = (func, interval, firstRun = true) => {
  let acc = 0
  return (dt) => {
    if (firstRun) {
      firstRun = false
      return func(0)
    }

    acc += dt
    if (acc < interval) {
      return
    }
    acc = 0

    return func(interval)
  }
}

let balanceInit = 0

$.ProfitInit = (ex) => {
  const acc = _C(ex.GetAccount)
  balanceInit = acc.Balance
  LogProfitReset()
}

$.ProfitLog = (ex) => {
  const acc = _C(ex.GetAccount)
  const bal = acc.Balance
  LogProfit(bal - balanceInit)
}

function main() {
  exchange.SetContractType('swap')

  Log('GetCurrencyQuote: ', $.GetCurrencyQuote(exchange))
  Log('PriceRate: ', $.PriceRate(35058.79, 34675))
  Log('IsFuture: ', $.IsFuture(exchange))
  Log('GetDepthAmounts: ', $.GetDepthAmounts(exchange.GetDepth().Bids))

  let arr = [3, 6, 12, 2, 200, 1000]
  Log('AverageSmooth: ', arr, ' - ', $.AverageSmooth(arr))

  Log('GetDepthTotal: ', $.GetDepthTotal(exchange.GetDepth().Bids, 0.01))
  Log('GetDepthTotalPrice: ', $.GetDepthTotalPrice(exchange.GetDepth().Bids, 2100))

  Log('TradeCancel buy: ', $.TradeCancel(exchange, ORDER_TYPE_BUY, -1, 0.1, 3, 3000, ORDER_OFFSET_OPEN))

  Log('CountDecimals: ', $.CountDecimals(1), $.CountDecimals(0.001))
}

```

> Detail

https://www.fmz.com/strategy/246749

> Last Modified

2022-12-03 15:56:38
