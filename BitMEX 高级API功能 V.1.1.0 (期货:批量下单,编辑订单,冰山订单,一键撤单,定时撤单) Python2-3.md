
> 策略名称

BitMEX 高级API功能 V.1.1.0 (期货:批量下单,编辑订单,冰山订单,一键撤单,定时撤单) Python2-3

> 策略作者

FawkesPan

> 策略描述

# BitMEX 高级API功能 (FMZ.com)

### 初始化
这个库整合了一些高级的 BitMEX API 功能，使用前需要进行初始化。
```
# 单个交易所
BitMEX = ext.BitMEXPlus(exchange)    # 创建一个新的接口对象
# 多个交易所
BitMEX = ext.BitMEXPlus(exchanges[0]) # exchanges[这里取决于你的交易所添加在第几个]
```

### 订单操作
#### 批量订单
##### BulkAdd() 添加新订单到本地订单列表
```
side price amount 为必填参数
symbol 不填则使用默认交易对设置
displayQty 用于冰山订单功能 设置订单显示部分大小 设置为0则完全隐藏
orderType execInst 可选参数请看源码内备注
BitMEX.BulkAdd(side=string, price=float, amount=integer, symbol=string, displayQty=integer, ordType='Limit', clOrdID='', execInst='') 
```
##### BulkClear() 清除本地未提交订单
```
symbol 指定后可清除指定交易对订单 如不指定则清除所有订单
notify 是否显示日志 默认为显示
BitMEX.BulkClear(symbol=string, notify=True)
```
##### BulkPost() 提交本地未提交订单
```
symbol 指定后只提交指定交易对订单 不指定则提交所有订单
BitMEX.BulkPost(symbol=string)
```
##### BulkOrders() 查看本地所有未提交订单
```
BitMEX.BulkOrders()
```
#### 取消订单
##### CancelAllOrders() 取消当前的未完成订单
```
symbol 指定后只取消指定交易对订单 不指定则取消所有订单
filter 自定义订单过滤 只取消符合条件的订单 如 filter={'side': 'Buy'} 取消所有买单
BitMEX.CancelAllOrders(symbol=string, filter=dict)
```
##### CancelAllAfter() 在一定时间后取消所有未完成订单 
再次请求可以重置计数器
```
timeout 指定在多少毫秒后取消订单 填0可以删除计数器
BitMEX.CancelAllAfter(timeout=integer)
```
#### 编辑订单
##### Amend() 修改一个订单
```
symbol 指定交易对 不指定交易对则使用默认交易对
orderID clOrdID 订单ID和用户自定义订单ID 至少指定其中一项 两项都填则只使用orderID
price amount 订单的新价格和订单的新数量 至少修改其中一项 可以同时修改两项
BitMEX.Amend(symbol=string, orderID=string, clOrdID=string, price=float, amount=integer)
```
#### 批量编辑订单
##### AmendAdd() 添加一个需要修改的订单到本地待修改订单列表
```
symbol 指定交易对 不指定交易对则使用默认交易对
orderID clOrdID 订单ID和用户自定义订单ID 至少指定其中一项 两项都填则只使用orderID
price amount 订单的新价格和订单的新数量 至少修改其中一项 可以同时修改两项
BitMEX.AmendAdd(symbol=string, orderID=string, clOrdID=string, price=float, amount=integer)
```
##### AmendClear() 清除本地未提交的待修改订单
```
symbol 指定后可清除指定交易对订单 如不指定则清除所有订单
notify 是否显示日志 默认为显示
BitMEX.AmendClear(symbol=string, notify=True)
```
##### AmendPost() 提交本地未提交的待修改订单
```
symbol 指定后提交指定交易对订单修改请求 不指定则提交默认交易对订单的修改请求
BitMEX.AmendPost(symbol=string)
```
##### AmendOrders() 查看本地所有未提交订单
```
BitMEX.AmendOrders()
```

### 与我联系
邮箱 i@fawkex.me
电报 [FawkesPan](https://telegram.me/FawkesPan)

接受策略定制

### 关于这个库
[BitMEX API文档](https://www.bitmex.com/app/apiOverview)

[使用 GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|LANG|ZH|语言 / Language|


> 源码 (python)

``` python


#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
#
# BitMEX Advanced API Interface for FMZ.com.
#
# Copyright 2018 FawkesPan
# Contact : i@fawkex.me / Telegram@FawkesPan
#
# GNU General Public License v3.0
#

import json
import math
import decimal

def toNearest(num, tickSize):
    tickDec = decimal.Decimal(str(tickSize))
    return float((decimal.Decimal(round(num / tickSize, 0)) * tickDec))

QUOTES = {}
QUOTES['ZH'] = {
    'GREET' : '[BitMEX 接口已初始化]  合约: %s. %s',
    'INITF' : '使用的交易所不正确，当前交易所: %s',
    'PARAMERR' : '***传的参数不对 检查你的代码*** %s',
    'NEWORDER' : '[添加订单]  合约: %s 方向: %s 价格: %.8f 数量: %d 张. %s',
    'MODORDER' : '[修改订单]  orderID/clOrdID: %s 新价格: %.8f 新数量: %d. %s',
    'MODORDERP' : '[修改订单]  orderID/clOrdID: %s 新价格: %.8f. %s',
    'MODORDERA' : '[修改订单]  orderID/clOrdID: %s 新数量: %d. %s',
    'ORDCOUNT' : '[本次批量发送订单]  总计: %d 条. %s',
    'THISBATCH' : '[信息]  正在处理 合约: %s 条数: %d. %s',
    'CLEARALL' : '[信息]  已清除所有本地订单. %s',
    'CLEAR' : '[信息]  已清除所有 %s 本地订单. %s',
    'CA' : '[订单计划取消]  所有订单都将在 %d 毫秒 后取消. %s'
}

COLORS = {
    'DEEPBLUE' : '#1F618D',
    'BLUE' : '#0000FF',
    'LIGHTBLUE' : '#5DADE2',
    'DEEPGREEN' : '#27AE60',
    'GREEN' : '#00FF00',
    'LIGHTGREEN' : '#58D68D',
    'LAPIS' : '#26619C',
    'DEEPRED' : '#CB4335',
    'RED' : '#FF0000',
    'LIGHTRED' : '#EC7063'
}


class BitMEX:

    def __init__(self, exchange, silent=False):
        self.silent = silent
        exchange.GetCurrency()
        if isinstance(exchange.GetCurrency(), bytes):
            self.symbol = str(exchange.GetCurrency(), "utf-8").lower()
            name = str(exchange.GetName(), "utf-8")
        else:
            self.symbol = exchange.GetCurrency()
            name = exchange.GetName()
        self.IO = exchange.IO
        self.bulks = []
        self.amends = []
        if 'BitMEX' in str(name):
            self.Log(QUOTES[LANG]['GREET'] % (self.symbol.upper(),COLORS['LAPIS']))
        else:
            Log(QUOTES[LANG]['INITF'] % (name))
            
    def Log(self, *args):
        if self.silent:
            return 
        Log(*args)

    def BulkAdd(self, side=None, price=None, amount=None, symbol=None, ordType='Limit', displayQty=None, clOrdID=None, execInst=None):
        if type is None or price is None or amount is None:
            Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
            return False
        side = side.lower()
        if 'sell' in side:
            side = 'Sell'
            cl = COLORS['DEEPRED']
        else:
            side = 'Buy'
            cl = COLORS['DEEPGREEN']
        if symbol is None:
            symbol = self.symbol

        # Order structure
        order = {}
        order['symbol'] = symbol.upper()            # Symbol
        order['price'] = price                      # Price
        order['side'] = side                        # Buy/Sell
        order['orderQty'] = int(amount)             # Amount

        # Valid order types
        # Market, Limit, Stop, StopLimit, MarketIfTouched, LimitIfTouched, MarketWithLeftOverAsLimit, Pegged
        # Limit: The default order type. Specify an orderQty and price.
        # Market: A traditional Market order. A Market order will execute until filled or your bankruptcy price is reached, at which point it will cancel.
        # MarketWithLeftOverAsLimit: A market order that, after eating through the order book as far as permitted by available margin, will become a limit order. The difference between this type and Market only affects the behavior in thin books. Upon reaching the deepest possible price, if there is quantity left over, a Market order will cancel the remaining quantity. MarketWithLeftOverAsLimit will keep the remaining quantity in the books as a Limit.
        # Stop: A Stop Market order. Specify an orderQty and stopPx. When the stopPx is reached, the order will be entered into the book.
        ## On sell orders, the order will trigger if the triggering price is lower than the stopPx. On buys, higher.
        ## Note: Stop orders do not consume margin until triggered. Be sure that the required margin is available in your account so that it may trigger fully.
        ## Close Stops don't require an orderQty. See Execution Instructions below.
        # StopLimit: Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.
        # MarketIfTouched: Similar to a Stop, but triggers are done in the opposite direction. Useful for Take Profit orders.
        # LimitIfTouched: As above; use for Take Profit Limit orders.
        order['ordType'] = ordType
        # If you want to keep track of order IDs yourself, set a unique clOrdID per order. This clOrdID will come back as a property on the order and any related executions (including on the WebSocket), and can be used to get or cancel the order. Max length is 36 characters.
        if clOrdID is not None:
            order['clOrdID'] = clOrdID
        # The following execInsts are supported. If using multiple, separate with a comma (e.g. LastPrice,Close).
        # ParticipateDoNotInitiate, MarkPrice, LastPrice, IndexPrice, ReduceOnly, Close
        # ParticipateDoNotInitiate: Also known as a Post-Only order. If this order would have executed on placement, it will cancel instead.
        # MarkPrice, LastPrice, IndexPrice: Used by stop and if-touched orders to determine the triggering price. Use only one. By default, 'MarkPrice' is used. Also used for Pegged orders to define the value of 'LastPeg'.
        # ReduceOnly: A 'ReduceOnly' order can only reduce your position, not increase it. If you have a 'ReduceOnly' limit order that rests in the order book while the position is reduced by other orders, then its order quantity will be amended down or canceled. If there are multiple 'ReduceOnly' orders the least aggressive will be amended first.
        # Close: 'Close' implies 'ReduceOnly'. A 'Close' order will cancel other active limit orders with the same side and symbol if the open quantity exceeds the current position. This is useful for stops: by canceling these orders, a 'Close' Stop is ensured to have the margin required to execute, and can only execute up to the full size of your position. If orderQty is not specified, a 'Close' order has an orderQty equal to your current position's size.
        ## Note that a Close order without an orderQty requires a side, so that BitMEX knows if it should trigger above or below the stopPx.
        if execInst is not None:
            order['execInst'] = execInst
            if 'Close' in execInst:
                del order['orderQty']
        # Optional quantity to display in the book. Use 0 for a fully hidden order. (Iceberg Order)
        if displayQty is not None:
            order['displayQty'] = displayQty

        self.bulks.append(order)

        self.Log(QUOTES[LANG]['NEWORDER'] % (symbol.upper(),side.upper(),price,amount,cl))

        return True

    def BulkClear(self, symbol=None, notify=True):
        ret = []
        if symbol is None:
            ret = self.bulks
            self.bulks = []
            if notify:
                self.Log(QUOTES[LANG]['CLEARALL'] % (COLORS['RED']))
        else:
            new = []
            for i in self.bulks:
                if i['symbol'] != symbol:
                    new.append(i)
                else:
                    ret.append(i)
            self.bulks = new
            self.Log(QUOTES[LANG]['CLEAR'] % (symbol.encode().upper(), COLORS['RED']))

        return ret

    def BulkPost(self, symbol=None):
        orders = []
        if symbol is None:
            orders = self.BulkClear(notify=False)
        else:
            orders = self.BulkClear(symbol=symbol, notify=False)
            
        if len(orders) == 0:
            return True

        ret = self.IO("api", "POST", "/api/v1/order/bulk", 'orders=%s' % json.dumps(orders))

        self.Log(QUOTES[LANG]['ORDCOUNT'] % (len(orders),COLORS['LAPIS']))
        return ret

    def BulkOrders(self):
        return self.bulks

    def Amend(self, symbol=None, orderID=None, clOrdID=None, price=None, amount=None):
        if symbol is None:
            symbol = self.symbol

        order = {}
        order['symbol'] = symbol
        if orderID is None:
            if clOrdID is None:
                Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
                return False
            else:
                order['clOrdID'] = clOrdID
        else:
            order['orderID'] = orderID

        if price is not None:
            order['price'] = price
        if amount is not None:
            order['orderQty'] = amount

        if price is None and amount is None:
            Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
            return False

        ret = self.IO("api", "PUT", "/api/v1/order/bulk", 'orders=%s' % json.dumps([order]))
        if ret == False:
            return False

        try:
            id = order['orderID']
        except:
            id = order['clOrdID']

        if price is None:
            self.Log(QUOTES[LANG]['MODORDERA'] % (id, amount, COLORS['LAPIS']))
            return ret
        elif amount is None:
            self.Log(QUOTES[LANG]['MODORDERP'] % (id, price, COLORS['LAPIS']))
            return ret
        else:
            self.Log(QUOTES[LANG]['MODORDER'] % (id, price, amount, COLORS['LAPIS']))
            return ret

    def AmendAdd(self, symbol=None, orderID=None, clOrdID=None, price=None, amount=None):
        if symbol is None:
            symbol = self.symbol

        order = {}
        order['symbol'] = symbol
        if orderID is None:
            if clOrdID is None:
                Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
                return False
            else:
                order['clOrdID'] = clOrdID
        else:
            order['orderID'] = orderID

        if price is not None:
            order['price'] = price
        if amount is not None:
            order['orderQty'] = amount

        if price is None and amount is None:
            Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
            return False

        self.amends.append(order)

        try:
            id = order['orderID']
        except:
            id = order['clOrdID']

        if price is None:
            self.Log(QUOTES[LANG]['MODORDERA'] % (id, amount, COLORS['LAPIS']))
            return True
        elif amount is None:
            self.Log(QUOTES[LANG]['MODORDERP'] % (id, price, COLORS['LAPIS']))
            return True
        else:
            self.Log(QUOTES[LANG]['MODORDER'] % (id, price, amount, COLORS['LAPIS']))
            return True

    def AmendClear(self, symbol=None, notify=True):
        ret = []
        if symbol is None:
            ret = self.amends
            self.amends = []
            if notify:
                self.Log(QUOTES[LANG]['CLEARALL'] % (COLORS['RED']))
        else:
            new = []
            for i in self.amends:
                if i['symbol'] != symbol:
                    new.append(i)
                else:
                    ret.append(i)
            self.self.amends = new
            self.Log(QUOTES[LANG]['CLEAR'] % (symbol.encode().upper(), COLORS['RED']))

        return ret

    def AmendPost(self, symbol=None):
        if symbol is None:
            symbol = self.symbol
        orders = self.AmendClear(symbol=symbol, notify=False)
        if len(orders) == 0:
            return True
        param = "orders=" + json.dumps(orders)
        self.Log(QUOTES[LANG]['ORDCOUNT'] % (len(orders),COLORS['LAPIS']))
        return self.IO("api", "PUT", "/api/v1/order/bulk", param)

    def AmendOrders(self):
        return self.amends

    def CancelAllOrders(self, symbol=None, filters=None):
        param = ''
        if symbol is not None:
            param = param + 'symbol=' + symbol
        if filters is not None:
            param = param + 'filters=' + json.dumps(filters)
        return self.IO("api","DELETE","/api/v1/order/all", param)

    def CancelAllAfter(self, timeout=0, notify=True):
        param = 'timeout=' + str(timeout)
        if notify:
            self.Log(QUOTES[LANG]['CA'] % (timeout,COLORS['LAPIS']))
        return self.IO("api","POST","/api/v1/order/cancelAllAfter", param)

    def GetInstrument(self, symbol='XBTUSD'):
        try:
            import requests
        except ModuleNotFoundError:
            Log('pip安装requests以使用GetInstrument()函数.')
            return {}
        return requests.get('https://www.bitmex.com/api/v1/instrument?symbol=%s&count=1&reverse=false' % symbol).json()[0]

ext.BitMEXPlus = BitMEX # 导出BitMEX Class, 主策略可以通过BitMEXPlus = ext.BitMEXPlus(exchange)调用
ext.toNearest = toNearest

# 模块功能测试
def main():
    LogReset()
    Log(exchange.GetAccount())
    BitMEXPlus = ext.BitMEXPlus(exchange)
    exchange.SetContractType(exchange.GetCurrency())
    base_price = exchange.GetTicker()['Last']
    _toNearest = ext.toNearest
    BitMEXPlus.BulkAdd('sell', _toNearest(base_price*1.4, 0.5), 30)
    BitMEXPlus.BulkAdd('buy', _toNearest(base_price*0.7, 0.5), 30)
    Log(BitMEXPlus.BulkOrders())
    Log(BitMEXPlus.BulkPost())
    Log(exchange.GetOrders())
    Log(BitMEXPlus.CancelAllAfter(5000))
    Sleep(8000)
    Log(exchange.GetOrders())
    Log(BitMEXPlus.BulkOrders())

```

> 策略出处

https://www.fmz.com/strategy/114148

> 更新时间

2020-05-19 22:57:04
