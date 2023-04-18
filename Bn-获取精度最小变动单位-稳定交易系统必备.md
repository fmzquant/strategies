
> 策略名称

Bn-获取精度最小变动单位-稳定交易系统必备

> 策略作者

btc【策略代写】团队





> 源码 (python)

``` python
#!Python3

"""
《策略代写》 与 （此程序帮助）

币安合约，可用于解决开单 因精度而产生异常 的问题，获取最小变动单位，用于稳定交易系统的运行
"""

import requests


def get_min_size(symbol: str, host="https://www.binancezh.jp"):
    
    """
    获取最小变动单位
    Args:
        symbol: 交易对(str)
                例如: ETHUSDT 等
        host: 域名将影响访问超时
              国外地址: https://fapi.binance.com
              国内地址（变动后需要替换）: https://www.binancezh.jp
    Returns:
        最小变动价格(str)，最小变动数量(str)
    """
    
    tick_size, step_size = None, None
    symbols_info = requests.get(f"{host}/fapi/v1/exchangeInfo", timeout=5).json()["symbols"]
    
    for info in symbols_info:
        if symbol == info["symbol"]:
            tick_size, step_size = info["filters"][0]["tickSize"], info["filters"][1]["stepSize"]
            break
            
    return tick_size, step_size


def main():
    tick_size, step_size = get_min_size("ETHUSDT")
    Log(tick_size, step_size)

```

> 策略出处

https://www.fmz.com/strategy/347942

> 更新时间

2022-05-11 19:02:40
