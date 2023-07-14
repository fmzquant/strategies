
> Name

python利用asyncio-http获取行情数据示范

> Author

诺宝

> Strategy Description

**真正的异步,其实获取行情这些用异步就够了,出现信号之后用事件驱动操作相应的币种,用平台封装的那些同步接口就够了**
**需要python 3.61并且安装相应的库**



> Source (python)

``` python
'''backtest
start: 2021-11-04 00:00:00
end: 2022-02-01 00:00:00
period: 1h
basePeriod: 15m
'''

import time
import asyncio
from aiohttp import ClientSession
import time
import datetime
global tasks
tasks = []

async def fetch_exchangeinfo():
    exchangeinfo="https://fapi.binance.com//fapi/v1/exchangeInfo"
    async with ClientSession() as session:
        async with session.get(exchangeinfo) as response:
            result=await response.read()
            Log(result.text, time.time())
            return result
            

async def fetch_depth(symbol,limit):
    symbol_depth="https://fapi.binance.com//fapi/v1/depth?symbol="+str(symbol)+"&limit="+str(limit)
    async with ClientSession() as session:
        async with session.get(symbol_depth) as response:
            result=await response.read()
            Log(result.text, time.time())
            return result
            

async def fetch_klines(symbol,interval,limit):
    symbol_kline="https://fapi.binance.com//fapi/v1/klines?symbol="+str(symbol)+"&interval="+str(interval)+"&limit="+str(limit)
    async with ClientSession() as session:
        async with session.get(symbol_kline) as response:
            result = await response.read()
            Log(symbol,result, time.time())
            return result
           
async def fetch_all_ticker():
    all_symbol_ticker = "https://fapi.binance.com/fapi/v1/ticker/price"
    async with ClientSession() as session:
        async with session.get(all_symbol_ticker) as response:
            result = await response.read()
            Log(result.text, time.time())
            return result
            

def main():
    while True:
        Log(datetime.datetime.now(),'开始')
        symbol_list=['BTCUSDT','ETHUSDT','BNBUSDT','ETCUSDT','EOSUSDT','SANDUSDT','XRPUSDT','ADAUSDT','GALAUSDT','IOTXUSDT','BNBUSDT','MATICUSDT']
        for i in range(12):
            task = asyncio.ensure_future(fetch_klines(symbol_list[i],'15m',500))
            tasks.append(task)
        loop = asyncio.get_event_loop()
        result = loop.run_until_complete(asyncio.gather(*tasks))
        Log(datetime.datetime.now(),'完成')
        Sleep(1000)

    
```

> Detail

https://www.fmz.com/strategy/343374

> Last Modified

2022-02-02 17:21:47
