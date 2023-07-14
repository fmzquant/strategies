
> Name

三大交易所止盈止损集成类库

> Author

LiteFly

> Strategy Description

fmz平台没有带止盈止损功能，需要设置止盈止损时需要调用交易所其它功能接口，而不同交易所的止盈止损设置又不一样，因此做了如下封装。
止盈止损的功能尤为重要，即不用市价触发避免了高手续费，也避免了极端情况下被爆仓的可能。
函数考虑到了逐仓全仓，也考虑了U本位币本位的情况。




> Source (python)

``` python
import json

# 对合约进行止盈止损   cangType=0默认逐仓  =1全仓
def zhiyingzhisun(ex, amount, directionStr, zhiying, zhisun, cangType = 0):
    if ex.GetName().find('OK') >= 0 :
        # okex
        return okexSwap(ex, amount, directionStr, zhiying, zhisun)
    elif ex.GetName().find('Huobi') >= 0 :
        # huobi
        return huobiSwap(ex, amount, directionStr, zhiying, zhisun, cangType)
    elif ex.GetName().find('Binance') >= 0 :
        # bian
        return bianSwap(ex, amount, directionStr, zhiying, zhisun)
    else:
        return False

# 发送请求
def AsynIo(ex, paramList):
        if (len(paramList) == 3):
            arrRoutine = ex.Go("IO", paramList[0], paramList[1], paramList[2])
        elif (len(paramList) == 4):
            arrRoutine = ex.Go("IO", paramList[0], paramList[1], paramList[2], paramList[3])
        elif (len(paramList) == 5):
            arrRoutine = ex.Go("IO", paramList[0], paramList[1], paramList[2], paramList[3], paramList[4])
        data, ok = arrRoutine.wait()
        return data
# 火币合约
def huobiSwap(ex, amount, directionStr, zhiying, zhisun, cangType):
    instrument_id = ex.GetCurrency().replace('_',"-")
    # 根据全仓或逐仓 与 U本位或币本位，设置请求url
    if instrument_id.find('USDT') >= 0 :
        if cangType == 0:
            url = "/linear-swap-api/v1/swap_tpsl_order"
        elif cangType == 1:
            url = '/linear-swap-api/v1/swap_cross_tpsl_order'
        else:
            return False
    elif instrument_id.find('USD') >= 0 :
        url = "/swap-api/v1/swap_tpsl_order"
    else:
        return False
    # 发送请求
    data = AsynIo(ex, ['api', 'POST', url, '', json.dumps({
        "contract_code": instrument_id,
        "direction": directionStr,
        "volume" : amount,
        "tp_order_price": zhiying,
        "tp_trigger_price": zhiying,
        "sl_trigger_price": zhisun,
        "sl_order_price": zhisun,
    })])
    if data["status"] == 'ok':
        return True
    else:
        return False

# 币安合约
def bianSwap(ex, amount, directionStr, zhiying, zhisun):
    instrument_id = ex.GetCurrency().replace('_',"")
    # U本位或币本位，设置请求url
    if instrument_id.find('USDT') >= 0 :
        url = "/fapi/v1/order"
    elif instrument_id.find('USD') >= 0 :
        url = '/dapi/v1/order'
    else:
        return False
    # 止损
    zhisunData = AsynIo(ex, ['api', 'POST', url , '', json.dumps({
        "symbol": instrument_id,
        "side": directionStr,
        "type": "STOP",
        "quantity": amount,
        "price": zhisun,
        "stopPrice": zhisun,
        "timestamp": str(int(round(time.time() * 1000)))
    })])
    if int(zhisunData['stopPrice']) != int(zhisun):
        return False
    # 止盈
    zhiyingData = AsynIo(ex, ['api', 'POST', url , '', json.dumps({
        "symbol": instrument_id,
        "side": direction,
        "type": "TAKE_PROFIT",
        "quantity": amount,
        "price": zhiying,
        "stopPrice": zhiying,
        "timestamp": str(int(round(time.time() * 1000)))
    })])
    if int(zhiyingData['stopPrice']) != int(zhiying):
        return False
    return True


# 欧易合约
def okexSwap(ex, amount, directionStr, zhiying, zhisun):
    instrument_id = ex.GetCurrency().replace('_',"-") + '-SWAP'
    # 获取仓位方向
    if directionStr == 'buy':
        direction = '4'
    elif directionStr == 'sell':
        direction = '3'
    else:
        return False
    data =  AsynIo(ex, ['api', 'POST', '/v1/order/orders/place', '', json.dumps({
        "instrument_id": instrument_id,
        "type": direction,
        "order_type": '5',
        "size": amount,
        "tp_trigger_price": zhiying,
        "tp_price": zhiying,
        "sl_trigger_price": zhisun,
        "sl_price": zhisun
    })])
    if data["error_code"] == "0":
        return True
    else:
        return False
    
ext.zhiyingzhisun = zhiyingzhisun
```

> Detail

https://www.fmz.com/strategy/261634

> Last Modified

2021-03-19 10:08:13
