
> 策略名称

商品期货根据ticker反推逐笔交易历史  (Python版)

> 策略作者

雨幕

> 策略描述

商品期货CTP或者易盛没有提供关于逐笔交易的API接口, 但大部分软件商都提供了显示

 ![IMG](https://www.fmz.cn/upload/asset/19eb906912fbe7ba0e3.png) 
 
以上数据可以通过ticker信息反推出来，下面给出一个完整的策略代码, 发明者量化支持实盘tick回测可以直接回测模拟实盘

 ![IMG](https://www.fmz.cn/upload/asset/e0c98168dfa80d9015.png) 



> 源码 (python)

``` python
'''backtest
start: 2020-04-22 13:30:00
end: 2020-04-22 15:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
mode: 1
'''

class FuturesTradeFilter():
    type_enum = {
        "OPENLONG":"多开|OpenLong",
        "OPENSHORT":"空开|OpenShort",
        "OPENDOUBLE":"双开|OpenDouble",
        "CLOSELONG":"多平|CloseLong",
        "CLOSESHORT":"空平|CloseShort",
        "CLOSEDOUBLE":"双平|CloseDouble",
        "EXCHANGELONG":"多换|ExchangeLong",
        "EXCHANGESHORT":"空换|ExchangeShort",
        "OPENUNKOWN":"开仓|OpenUnkown",
        "CLOSEUNKOWN":"平仓|CloseUnkown",
        "EXCHANGEUNKOWN":"换仓|ExchangeUnkown",
        "UNKOWN":"未知|Unkown",
        "NOCHANGE":"空闲|NoChange"
    }

    color_enum = {
        "RED":"#0000ff", "GREEN":"#ff0000", "WHITE":"#666666"
    }

    tick_dict = {
        "delta_enum_NONE": {
            "forward_enum_UP": [type_enum["NOCHANGE"], color_enum["WHITE"]],
            "forward_enum_DOWN": [type_enum["NOCHANGE"], color_enum["WHITE"]],
            "forward_enum_MIDDLE": [type_enum["NOCHANGE"], color_enum["WHITE"]]
        },
        "delta_enum_EXCHANGE": {
            "forward_enum_UP": [type_enum["EXCHANGELONG"], color_enum["RED"]],
            "forward_enum_DOWN": [type_enum["EXCHANGESHORT"], color_enum["GREEN"]],
            "forward_enum_MIDDLE": [type_enum["EXCHANGEUNKOWN"], color_enum["WHITE"]]
        },
        "delta_enum_OPENFWDOUBLE": {
            "forward_enum_UP": [type_enum["OPENDOUBLE"], color_enum["RED"]],
            "forward_enum_DOWN": [type_enum["OPENDOUBLE"], color_enum["GREEN"]],
            "forward_enum_MIDDLE": [type_enum["OPENDOUBLE"], color_enum["WHITE"]]
        },
        "delta_enum_OPEN": {
            "forward_enum_UP": [type_enum["OPENLONG"], color_enum["RED"]],
            "forward_enum_DOWN": [type_enum["OPENSHORT"], color_enum["GREEN"]],
            "forward_enum_MIDDLE": [type_enum["OPENUNKOWN"], color_enum["WHITE"]]
        },
        "delta_enum_CLOSEFWDOUBLE": {
            "forward_enum_UP": [type_enum["CLOSEDOUBLE"], color_enum["RED"]],
            "forward_enum_DOWN": [type_enum["CLOSEDOUBLE"], color_enum["GREEN"]],
            "forward_enum_MIDDLE": [type_enum["CLOSEDOUBLE"], color_enum["WHITE"]]
        },
        "delta_enum_CLOSE": {
            "forward_enum_UP": [type_enum["CLOSESHORT"], color_enum["RED"]],
            "forward_enum_DOWN": [type_enum["CLOSELONG"], color_enum["GREEN"]],
            "forward_enum_MIDDLE": [type_enum["CLOSEUNKOWN"], color_enum["WHITE"]]
        },
    }

    def __init__(self):
        self.preInfo = None 

    def feed(self, info):
        if not self.preInfo:
            self.preInfo = info
            return None 

        volume_delta = info["Volume"] - self.preInfo["Volume"]
        open_interest_delta = info["OpenInterest"] - self.preInfo["OpenInterest"]
        delta_forward = "delta_enum_UNKOWN"
        if open_interest_delta == 0 and volume_delta == 0:
            delta_forward = "delta_enum_NONE"
        elif open_interest_delta == 0 and volume_delta > 0:
            delta_forward = "delta_enum_EXCHANGE"
        elif open_interest_delta > 0:
            if open_interest_delta - volume_delta == 0:
                delta_forward = "delta_enum_OPENFWDOUBLE"
            else :
                delta_forward = "delta_enum_OPEN"
        elif open_interest_delta < 0:
            if open_interest_delta + volume_delta == 0:
                delta_forward = "delta_enum_CLOSEFWDOUBLE"
            else :
                delta_forward = "delta_enum_CLOSE"
        obj = FuturesTradeFilter.tick_dict[delta_forward]
        ret = None
        if delta_forward in FuturesTradeFilter.tick_dict:
            order_forward = ""
            if info["Last"] >= self.preInfo["Sell"]:
                order_forward = "forward_enum_UP"
            elif info["Last"] <= self.preInfo["Buy"]:
                order_forward = "forward_enum_DOWN"
            else :
                if info["Last"] >= info["Sell"]:
                    order_forward = "forward_enum_UP"
                elif info["Last"] <= info["Buy"]:
                    order_forward = "forward_enum_DOWN"
                else :
                    order_forward = "forward_enum_MIDDLE"
            if order_forward != "":
                d = obj[order_forward]
                if order_forward in obj:
                    ret = [info["Last"], volume_delta, d[0], d[1]]
        self.preInfo = info
        return ret

    def reset(self):
        self.preInfo = None 


def main():
    _C(exchange.SetContractType, "MA888")
    filt = FuturesTradeFilter()
    while True:
        ret = filt.feed(_C(exchange.GetTicker))
        if ret:
            Log("Price:", ret[0], "Amount:", ret[1], ret[2], ret[3])
```

> 策略出处

https://www.fmz.cn/strategy/314959

> 更新时间

2021-09-09 22:28:16
