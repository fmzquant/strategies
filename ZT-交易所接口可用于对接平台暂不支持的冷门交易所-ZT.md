
> Name

ZT-交易所接口可用于对接平台暂不支持的冷门交易所-ZT

> Author

BTC【策略代写】团队





> Source (python)

``` python
#!Python3

"""
《策略代写》 与 （此程序帮助），致信QQ：35787501

ZT 交易所接口，可用于对接 平台暂不支持的冷门交易所 ZT
"""

from requests import get, post
from hashlib import md5
from urllib.parse import urlencode


class ZT:
    def __init__(self, api_key, secret_key):
        self.api_key = api_key
        self.secret_key = secret_key
        self.host = "https://www.ztb.im"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/92.0.4515.159 Safari/537.36',
            "content-type": "application/x-www-form-urlencoded",
            'X-SITE-ID': '1',
        }

    def http_post(self, path, params):
        return post(f"{self.host}{path}", data=urlencode(params), headers=self.headers, timeout=5)

    def get_sign(self, params):
        return md5((urlencode(params) + f"&secret_key={self.secret_key}").encode()).hexdigest().upper()

    def get_ticker(self, symbol):
        return float(
            get(
                f"{self.host}/api/v1/trades?symbol={symbol}&size=1", headers=self.headers, timeout=5
            ).json()[0]["price"]
        )

    def send_order(self, symbol, side, price, amount):
        path = "/api/v1/private/trade/limit"
        params = {
            "amount": amount,
            "api_key": self.api_key,
            "market": symbol,
            "price": price,
        }
        all_side = {"close_sell": 1, "open_buy": 2}
        params["side"] = all_side[side]
        params["sign"] = self.get_sign(params)
        return str(self.http_post(path, params).json().get("result", {'id': "0"})["id"])

    def select_order(self, symbol, oid):
        path = "/api/v1/private/order/pending/detail"
        params = {
            "api_key": self.api_key,
            "market": symbol,
            "order_id": oid,
        }
        params["sign"] = self.get_sign(params)
        return not self.http_post(path, params).json()['result']

    def cancel_order(self, symbol, oid):
        path = "/api/v1/private/trade/cancel"
        params = {
            "api_key": self.api_key,
            "market": symbol,
            "order_id": oid,
        }
        params["sign"] = self.get_sign(params)
        return self.http_post(path, params).json()

```

> Detail

https://www.fmz.com/strategy/396040

> Last Modified

2023-04-20 11:25:55
