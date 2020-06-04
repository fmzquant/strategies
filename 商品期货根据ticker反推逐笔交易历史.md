
> 策略名称

商品期货根据ticker反推逐笔交易历史

> 策略作者

Zero

> 策略描述

商品期货CTP或者易盛没有提供关于逐笔交易的API接口, 但大部分软件商都提供了显示

 ![IMG](https://www.fmz.com/upload/asset/19eb906912fbe7ba0e3.png) 
 
以上数据可以通过ticker信息反推出来，下面给出一个完整的策略代码, 发明者量化支持实盘tick回测可以直接回测模拟实盘

 ![IMG](https://www.fmz.com/upload/asset/e0c98168dfa80d9015.png) 



> 源码 (javascript)

``` javascript
/*backtest
start: 2020-04-22 13:30:00
end: 2020-04-22 15:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
mode: 1
*/

var NewFuturesTradeFilter = function() {
    var type_enum = {
        OPENLONG:"多开|OpenLong",
        OPENSHORT:"空开|OpenShort",
        OPENDOUBLE:"双开|OpenDouble",
        CLOSELONG:"多平|CloseLong",
        CLOSESHORT:"空平|CloseShort",
        CLOSEDOUBLE:"双平|CloseDouble",
        EXCHANGELONG:"多换|ExchangeLong",
        EXCHANGESHORT:"空换|ExchangeShort",
        OPENUNKOWN:"开仓|OpenUnkown",
        CLOSEUNKOWN:"平仓|CloseUnkown",
        EXCHANGEUNKOWN:"换仓|ExchangeUnkown",
        UNKOWN:"未知|Unkown",
        NOCHANGE:"空闲|NoChange",
    }
    var color_enum = {RED:"#0000ff", GREEN:"#ff0000", WHITE:"#666666"}

    var tick_dict = {
        delta_enum_NONE: {
            forward_enum_UP: [ type_enum.NOCHANGE, color_enum.WHITE ],
            forward_enum_DOWN: [ type_enum.NOCHANGE, color_enum.WHITE ],
            forward_enum_MIDDLE: [ type_enum.NOCHANGE, color_enum.WHITE ]
        },
        delta_enum_EXCHANGE: {
            forward_enum_UP: [ type_enum.EXCHANGELONG, color_enum.RED ],
            forward_enum_DOWN: [ type_enum.EXCHANGESHORT, color_enum.GREEN ],
            forward_enum_MIDDLE: [ type_enum.EXCHANGEUNKOWN, color_enum.WHITE ]
        },
        delta_enum_OPENFWDOUBLE: {
            forward_enum_UP: [ type_enum.OPENDOUBLE, color_enum.RED ],
            forward_enum_DOWN: [ type_enum.OPENDOUBLE, color_enum.GREEN ],
            forward_enum_MIDDLE: [ type_enum.OPENDOUBLE, color_enum.WHITE ]
        },
        delta_enum_OPEN: {
            forward_enum_UP: [ type_enum.OPENLONG, color_enum.RED ],
            forward_enum_DOWN: [ type_enum.OPENSHORT, color_enum.GREEN ],
            forward_enum_MIDDLE: [ type_enum.OPENUNKOWN, color_enum.WHITE ]
        },
        delta_enum_CLOSEFWDOUBLE: {
            forward_enum_UP: [ type_enum.CLOSEDOUBLE, color_enum.RED ],
            forward_enum_DOWN: [ type_enum.CLOSEDOUBLE, color_enum.GREEN ],
            forward_enum_MIDDLE: [ type_enum.CLOSEDOUBLE, color_enum.WHITE ]
        },
        delta_enum_CLOSE: {
            forward_enum_UP: [ type_enum.CLOSESHORT, color_enum.RED ],
            forward_enum_DOWN: [ type_enum.CLOSELONG, color_enum.GREEN ],
            forward_enum_MIDDLE: [ type_enum.CLOSEUNKOWN, color_enum.WHITE ]
        },
    }
    var preInfo = null;
    var feed = function(info) {
        if (!preInfo) {
            preInfo = info;
            return null;
        }
        var volume_delta = info.Volume - preInfo.Volume;
        var open_interest_delta = info.OpenInterest - preInfo.OpenInterest;

        var delta_forward = 'delta_enum_UNKOWN'
        if (open_interest_delta == 0 && volume_delta == 0) {
            delta_forward = 'delta_enum_NONE'
        } else if(open_interest_delta == 0 && volume_delta > 0) {
            delta_forward = 'delta_enum_EXCHANGE'
        } else if (open_interest_delta > 0) {
            if (open_interest_delta - volume_delta == 0) {
                delta_forward = 'delta_enum_OPENFWDOUBLE'
            } else {
                delta_forward = 'delta_enum_OPEN'
            }
        } else if (open_interest_delta < 0) {
            if (open_interest_delta + volume_delta == 0) {
                delta_forward = 'delta_enum_CLOSEFWDOUBLE'
            } else {
                delta_forward = 'delta_enum_CLOSE'
            }
        }
        var obj = tick_dict[delta_forward];
        var ret = null;
        if (typeof(obj) !== 'undefined') {
            var order_forward = '';
            if (info.Last >= preInfo.AskPrice1) {
                order_forward = 'forward_enum_UP';
            } else if (info.Last <= preInfo.BidPrice1) {
                order_forward = 'forward_enum_DOWN';
            } else {
                if (info.Last >= info.Sell) {
                    order_forward = 'forward_enum_UP';
                } else if (info.Last <= info.Buy) {
                    order_forward = 'forward_enum_DOWN';
                } else {
                    order_forward = 'forward_enum_MIDDLE';
                }
            }
            if (order_forward != '') {
                var d = obj[order_forward];
                if (typeof(d) !== 'undefined') {
                    ret = [info.Last, volume_delta, d[0], d[1]]
                }
            }
        }
        preInfo = info;
        return ret;
    }
    return {
        feed: feed,
        reset: function() {
            preInfo = null;
        },
    }
}


function main() {
    _C(exchange.SetContractType, "MA888");
    var filt = NewFuturesTradeFilter();
    while (true) {
        var ret = filt.feed(_C(exchange.GetTicker));
        if (ret) {
            Log("Price:", ret[0], "Amount:", ret[1], ret[2], ret[3]);
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/201568

> 更新时间

2020-04-23 15:18:45
