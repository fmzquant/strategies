
> 策略名称

MA5

> 策略作者

yy1987316



> 策略参数



|参数|默认值|描述|
|----|----|----|
|RETRY_INTERVAL|true|重试间隔（秒）|


> 源码 (python)

``` python
'''
MA5策略
站上买，跌破卖
'''
import datetime

def onTick():
    '''轮训函数'''
    account = _C(exchange.GetAccount)
    Log(account)
    kline_data = _C(exchange.GetRecords, PERIOD_D1)
    # 前一个周期的MA5值，排除当前周期
    ma5_list = TA.MA(kline_data, 5)
    if len(ma5_list) >= 2:
        ma5 = ma5_list[-2]
    
        if ma5:
            # 如果有值，回测时间段内开始的几个周期，没有ma5
        
            # 取上个周期的开盘价、收盘价
            open_price = kline_data[-2].Open
            close_price = kline_data[-2].Close
            Log('当前：open_price=', open_price, ',close_price=', close_price, ',ma5=', ma5)
        
            if open_price < ma5 < close_price and account.Balance > 10:
                Log('买')
                exchange.Buy(-1, account.Balance)
            elif close_price < ma5 < open_price and account.Stocks > 0.1:
                Log('卖')
                exchange.Sell(-1, account.Stocks)
            else:
                Log('无行情')
        else:
            Log('当前时间无MA5供参考')

def wait_to_tomorrow():
    '''等待到第二天0点'''
    s = _N(UnixNano() / 1000000000)
    s = 86400 - (s - 16*60*60) % 86400 + 1
    # Log(s)
    Sleep(s * 1000)

def main():
    # 设置重试延迟
    _CDelay(RETRY_INTERVAL * 1000)
    while True:
        onTick()
        wait_to_tomorrow()
        # Sleep(LOOP_INTERVAL * 1000)
```

> 策略出处

https://www.fmz.com/strategy/125474

> 更新时间

2018-11-09 18:13:18
