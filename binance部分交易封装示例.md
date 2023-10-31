
> Name

binance部分交易封装示例

> Author

作手君TradeMan





> Source (python)

``` python
# -*- coding = utf-8 -*-
# @Time:2023/2/20 11:04
# @Author: 作手君
# @File: binance.py
# @Software: PyCharm

import json
import time
import hmac
from hashlib import sha256
import requests
from logger import logger


def cleanNoneValue(d) -> dict:
    out = {}
    for k in d.keys():
        if d[k] is not None:
            out[k] = d[k]
    return out


def get_timestamp() -> int:
    return int(time.time()) * 1000
    # cet_tz = pytz.timezone('Etc/GMT+0')
    # t = datetime.now(cet_tz)
    # return int(time.mktime(t.timetuple())) * 1000
    # return (int(time.time()) - (8*60*60)) * 1000
    # utc_t = datetime.datetime.utcnow().timestamp()
    # return int(utc_t * 1000)


class Binance(object):
    def __init__(self, api_key, secret_key):
        self.api_key = api_key
        self.secret_key = secret_key
        self.host = 'https://fapi.binance.com'
        self.timestamp = ''
        self.method = ''
        self.request_path = ''

    # 交易
    def trade_order(self, symbol, pos_side, trade_side, sz, client_id, ord_type="market", px=None):
        self.request_path = '/fapi/v1/order'
        self.method = 'POST'
        params = {
            'symbol': symbol.upper() + 'USDT',
            'side': trade_side.upper(),  # 买卖方向 SELL, BUY
            'positionSide': pos_side,  # long short
            'type': ord_type.upper(),
            'quantity': sz,  # 数量
            'newClientOrderId': 'x-YZChr3zS' + str(client_id),  # 客户订单号
            # 'timeInForce': 'GTC',
        }
        if ord_type == 'limit':
            params['timeInForce'] = 'GTC'
            params['price'] = str(px)
        url = self.generate_url(params)
        # 0 成功 1暂停几秒 2忽略此次交易 3 用户停止策略
        try:
            response = self.send(url)
            if 'code' in response.keys():
                if int(response['code']) == -2018 or int(response['code']) == -2019:
                    # 余额不足 直接清仓
                    return {"code": 3, "msg": response.get('msg', ''), "data": {}}
                return {"code": 1, "msg": response.get('msg', ''), "data": {}}
                pass
            else:
                return {
                    'code': 0,
                    'msg': '',
                    'data': {
                        'clOrdId': response['clientOrderId'],
                        'ordId': response['orderId'],
                    }
                }
        except Exception as e:
            logger.error('binance error')
            logger.error(e)
            return {"code": 2, "msg": str(e), "data": {}}

    # 获取挂单列表
    def get_open_order(self):
        self.request_path = '/fapi/v1/openOrders'
        self.method = 'GET'
        url = self.generate_url({})
        response = self.send(url)
        return response

    def get_kline(self, symbol, limit, interval):
        self.request_path = '/fapi/v1/klines'
        self.method = 'GET'
        params = {
            'symbol': symbol.upper() + 'USDT',
            'interval': interval,
            'limit': limit,
        }
        url = self.generate_url(params)
        response = self.send(url)
        return response

    # 获取单币种挂单列表
    def get_symbol_open_order(self, symbol):
        self.request_path = '/fapi/v1/openOrders'
        self.method = 'GET'
        url = self.generate_url({
            'symbol': symbol.upper() + 'USDT'
        })
        response = self.send(url)
        return response

    # 获取挂单列表
    def get_positions(self, symbol):

        self.request_path = '/fapi/v2/account'
        self.method = 'GET'
        url = self.generate_url({})
        response = self.send(url)
        positions = response['positions']
        return positions

    # 撤单
    def cancel_order(self, symbol):
        self.request_path = '/fapi/v1/allOpenOrders'
        self.method = 'DELETE'
        params = {
            'symbol': symbol.upper() + 'USDT',
        }
        url = self.generate_url(params)
        response = self.send(url)
        if 'code' in response.keys() and int(response.get('code', 0)) != 200:
            raise Exception(response.get('msg'))
        return response

    def generate_url(self, params, use_timestamp=True):
        if use_timestamp:
            params['timestamp'] = get_timestamp()
        return '{}{}?{}'.format(self.host, self.request_path, self.generate_sign(params))

    def generate_sign(self, params):
        query_string = ''
        for k in params.keys():
            query_string = query_string + '{}={}&'.format(k, params.get(k))
        query_string = query_string[:-1]
        if self.secret_key:
            signature = hmac.new(self.secret_key.encode("utf-8"),
                                 query_string.encode("utf-8"), digestmod=sha256).hexdigest()
            query_string = query_string + '&signature=' + signature
        return query_string

    def send(self, url, params=None):
        session = requests.Session()
        session.headers.update(
            {
                "Content-Type": "application/json;charset=utf-8",
                "X-MBX-APIKEY": self.api_key,
            }
        )
        if self.method == 'GET':
            response = session.get(url=url, params=params)
        elif self.method == 'DELETE':
            response = session.delete(url=url, params=params)
        else:
            response = session.post(url=url, params=params)
        # logger.info('币安请求信息')
        # logger.info(params)
        # logger.info(response.text)
        return json.loads(response.text)

```

> Detail

https://www.fmz.com/strategy/417575

> Last Modified

2023-06-14 17:57:06
