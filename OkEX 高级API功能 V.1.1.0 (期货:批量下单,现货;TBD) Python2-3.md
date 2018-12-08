
> 策略名称

OkEX 高级API功能 V.1.1.0 (期货:批量下单,现货;TBD) Python2-3

> 策略作者

FawkesPan

> 策略描述

# OkEX 高级API功能 (FMZ.com)

### 初始化
这个库整合了一些 OkEX 高级API 功能，使用前需要进行初始化。
#### OkEX期货
```
# OkEX 期货
# future 可选参数 this_week next_week quarter ， 不填默认 this_week
OkEXFuture = ext.OkEXFuturePlus(exchange, future=string)    # 创建一个新的接口对象 
# 多个交易所
OkEXFuture = ext.OkEXFuturePlus(exchanges[0], future=string)    # exchanges[这里取决于你的交易所添加在第几个]
```
#### OkEX现货
#还在写

### 订单操作-期货
#### 批量订单
##### BulkAdd() 添加新订单到本地订单列表
```
side price amount 为必填参数
symbol future 不填则使用默认交易对设置
matchPrice 默认为False , 设置为True 使用对手价交易
OkEXFuture.BulkAdd(side=string, price=float, amount=integer, matchPrice=False, symbol=string, future=string) 
```
##### BulkClear() 清除本地未提交订单
```
symbol 指定后可清除指定交易对订单 如不指定则清除所有订单
notify 是否显示日志 默认为显示
OkEXFuture.BulkClear(symbol=string, notify=True)
```
##### BulkPost() 提交本地未提交订单
```
symbol 指定后只提交指定交易对订单 不指定则提交所有订单
future 必须同时指定symbol才能使用 指定后只提交特定交易对的特定合约的订单
OkEXFuture.BulkPost(symbol=string, future=string)
```
##### BulkOrders() 查看本地未提交订单
```
symbol 指定后只查看指定交易对订单 不指定则查看所有订单
future 必须同时指定symbol才能使用 指定后只查看特定交易对的特定合约的订单
OkEXFuture.BulkOrders(symbol=string, future=string)
```

### 与我联系
邮箱 i@fawkex.me
电报 [FawkesPan](https://telegram.me/FawkesPan)

接受策略定制

### 关于这个库
[OkEX API文档](https://github.com/okcoin-okex/API-docs-OKEx.com/)

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
# OkEX Advanced API Interface for FMZ.com.
#
# Copyright 2018 FawkesPan
# Contact : i@fawkex.me / Telegram@FawkesPan
#
# GNU General Public License v3.0
#

import json
import time

QUOTES = {}
QUOTES['ZH'] = {
    'GREET' : '[OkEX 接口已初始化]  币种: %s 合约: %s. %s',
    'INITF' : '使用的交易所不正确，当前交易所: %s',
    'PARAMERR' : '***传的参数不对 检查你的代码*** %s',
    'NEWORDER' : '[添加订单]  币种: %s 合约: %s 方向: %s 价格: %.4f 数量: %d 张. %s',
    'ORDCOUNT' : '[本次批量发送订单]  总计: %d 条. %s',
    'THISBATCH' : '[信息]  正在处理 币种: %s 合约: %s 条数: %d. %s',
    'ORDSENT' : '[已发送订单]  币种: %s 合约: %s 条数: %d. %s',
    'NEEDSPLIT' : '[信息]  由于单合约单量大于5条 需要进行分片处理. %s',
    'CLEARALL' : '[信息]  已清除所有本地订单. %s',
    'CLEARS' : '[信息]  已清除所有 %s 本地订单. %s',
    'CLEAR' : '[信息]  已清除所有 %s %s 本地订单. %s'
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


class OkEXFuture:

    def __init__(self, exchange, future='this_week'):
        self.QUOTES = {}
        exchange.GetCurrency()
        if isinstance(exchange.GetCurrency(), bytes):
            self.symbol = str(exchange.GetCurrency(), "utf-8").lower()
            name = str(exchange.GetName(), "utf-8")
        else:
            self.symbol = exchange.GetCurrency()
            name = exchange.GetName()
        self.IO = exchange.IO
        self.future = future
        self.bulks = {}
        self.bulks[self.symbol] = {}
        self.bulks[self.symbol][self.future] = []
        if 'OKCoin' in str(name):
            Log(QUOTES[LANG]['GREET'] % (self.symbol.upper(),self.future.upper(),COLORS['LAPIS']))
        else:
            Log(QUOTES[LANG]['INITF'] % (name))

    def BulkAdd(self, side=None, price=None, amount=None, matchPrice=False, symbol=None, future=None):
        if type is None or price is None or amount is None:
            Log(QUOTES[LANG]['PARAMERR'] % (COLORS['RED']))
            return False
        side = side.lower()
        if side == 'buy':
            tp = 1
            cl = COLORS['DEEPGREEN']
        if side == 'sell':
            tp = 2
            cl = COLORS['DEEPRED']
        if side == 'closebuy':
            tp = 3
            cl = COLORS['LIGHTRED']
        if side == 'closesell':
            tp = 4
            cl = COLORS['LIGHTGREEN']
        if symbol is None:
            symbol = self.symbol
        if future is None:
            future = self.future

        order = {}
        order['price'] = price
        order['amount'] = amount
        order['type'] = tp

        if matchPrice:
            order['matchPrice'] = 1

        try:
            self.bulks[symbol]
        except KeyError:
            self.bulks[symbol] = {}
        try:
            self.bulks[symbol][future]
        except KeyError:
            self.bulks[symbol][future] = []

        self.bulks[symbol][future].append(order)

        Log(QUOTES[LANG]['NEWORDER'] % (symbol.upper(),future.upper(),side.upper(),price,amount,cl))

        return True

    def BulkOrders(self, symbol=None, future=None):
        if symbol is None:
            return self.bulks
        else:
            if future is None:
                return self.bulks[symbol]
            else:
                return self.bulks[symbol][future]

    def BulkClear(self, symbol=None, future=None, notify=True):
        if symbol is None:
            self.bulks = {}
            if notify:
                Log(QUOTES[LANG]['CLEARALL'] % (COLORS['RED']))
        else:
            if future is None:
                self.bulks[symbol] = {}
                if notify:
                     Log(QUOTES[LANG]['CLEARS'] % (symbol.encode().upper(), COLORS['RED']))
            else:
                self.bulks[symbol][future] = []
                if notify:
                    Log(QUOTES[LANG]['CLEAR'] % (symbol.encode().upper(), future.encode().upper(), COLORS['RED']))
                    #Log(QUOTES[LANG]['CLEAR'] % (symbol.upper(), future.upper(), COLORS['RED']))

        return True

    #exchange.IO("api", "POST", "/api/v1/future_batch_trade.do", "symbol=etc_usd&contract_type=this_week&orders_data="+json.dumps(orders))
    def __post(self, symbol='', future=''):
        count = len(self.bulks[symbol][future])
        orders = self.bulks[symbol][future]
        ret = []
        if count == 0:
            return
        Log(QUOTES[LANG]['THISBATCH'] % (symbol.upper(),future.upper(),count,COLORS['LAPIS']))
        if count <= 5:
            params = 'symbol=%s&contract_type=%s&orders_data=%s' % (symbol, future, json.dumps(orders))
            res = self.IO("api", "POST", "/api/v1/future_batch_trade.do", params)
            ret+=res['order_info']
            Log(QUOTES[LANG]['ORDSENT'] % (symbol.upper(),future.upper(),len(orders),COLORS['LAPIS']))
        if count > 5:
            Log(QUOTES[LANG]['NEEDSPLIT'] % (COLORS['LAPIS']))
            batch = []
            for item in orders:
                batch.append(item)
                if len(batch) == 5:
                    params = 'symbol=%s&contract_type=%s&orders_data=%s' % (symbol, future, json.dumps(batch))
                    res = self.IO("api", "POST", "/api/v1/future_batch_trade.do", params)
                    try:
                        ret+=res['order_info']
                    except:
                        pass
                    Log(QUOTES[LANG]['ORDSENT'] % (symbol.upper(),future.upper(),len(batch),COLORS['LAPIS']))
                    batch = []
                    time.sleep(0.3)               # OkEX限制每秒只能进行三个请求

            params = 'symbol=%s&contract_type=%s&orders_data=%s' % (symbol, future, json.dumps(batch))
            res = self.IO("api", "POST", "/api/v1/future_batch_trade.do", params)
            try:
                ret+=res['order_info']
            except:
                pass
            Log(QUOTES[LANG]['ORDSENT'] % (symbol.upper(),future.upper(),len(batch),COLORS['LAPIS']))

        return ret

    def BulkPost(self, symbol=None, future=None):
        ret = []
        count = 0
        if symbol is None:
            symbols = self.bulks.keys()
            for s in symbols:
                futures = self.bulks[s].keys()
                for f in futures:
                    count+=len(self.bulks[s][f])
                    ret+=self.__post(s, f)
                    time.sleep(0.3)               # OkEX限制每秒只能进行三个请求

            self.BulkClear(notify=False)
        else:
            if future is None:
                futures = self.bulks[symbol].keys()
                for f in futures:
                    count+=len(self.bulks[symbol][f])
                    ret+=self.__post(symbol, f)
                    time.sleep(0.3)               # OkEX限制每秒只能进行三个请求

                self.BulkClear(symbol=symbol, notify=False)
            else:
                count+=len(self.bulks[symbol][future])
                ret+=self.__post(symbol, future)

                self.BulkClear(symbol=symbol, future=future, notify=False)

        Log(QUOTES[LANG]['ORDCOUNT'] % (count,COLORS['LAPIS']))
        return ret

class OkEXSpot:

    def __init__(self, exchange):
        self.IO = exchange.IO

    #TBD

ext.OkEXFuturePlus = OkEXFuture # 导出OkEXFuture Class, 主策略可以通过FuturePlus = ext.OkEXFuturePlus(exchange, future)调用
ext.OkEXSpotPlus = OkEXSpot # 导出OkEXSpot Class, 主策略可以通过SpotPlus = ext.OkEXSpotPlus(exchange)调用

# 模块功能测试
def main():
    LogReset()
    Log(exchange.GetAccount())
    OKEXPlus = ext.OkEXFuturePlus(exchange)
    # 4 Buy 2 Sell 1 next_week
    base_price = exchange.GetTicker()['Last']
    OKEXPlus.BulkAdd("sell", base_price*1.2, 1)
    OKEXPlus.BulkAdd("closebuy", base_price*1.2, 1)
    OKEXPlus.BulkAdd("sell", base_price*1.3, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.7, 1, future='next_week')

    OKEXPlus.BulkClear()

    OKEXPlus.BulkAdd("buy", base_price*0.8, 1)
    OKEXPlus.BulkAdd("closebuy", base_price*1.2, 1)
    OKEXPlus.BulkAdd("sell", base_price*1.3, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.7, 1, future='next_week')

    OKEXPlus.BulkClear(symbol=(exchange.GetCurrency()).lower(),future='this_week')
    OKEXPlus.BulkClear(symbol=(exchange.GetCurrency()).lower(),future='next_week')

    OKEXPlus.BulkAdd("buy", base_price*0.8, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.7, 1, future='next_week')
    OKEXPlus.BulkClear(symbol=(exchange.GetCurrency()).lower())

    OKEXPlus.BulkAdd("buy", base_price*0.8, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.81, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.82, 1)
    OKEXPlus.BulkAdd("closesell", base_price*0.8, 1)
    OKEXPlus.BulkAdd("sell", base_price*1.2, 1)
    OKEXPlus.BulkAdd("closebuy", base_price*1.2, 1)
    OKEXPlus.BulkAdd("sell", base_price*1.3, 1)
    OKEXPlus.BulkAdd("buy", base_price*0.7, 1, future='next_week')

    Log(OKEXPlus.BulkOrders())
    for item in OKEXPlus.BulkPost():
        Log(str(item))
    Log(OKEXPlus.BulkOrders())

```

> 策略出处

https://www.fmz.com/strategy/113979

> 更新时间

2018-11-12 20:55:49
