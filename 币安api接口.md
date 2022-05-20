
> 策略名称

币安api接口

> 策略作者

卧野望平川

> 策略描述

默认接口为U本位合约fapi

> 策略参数



|参数|默认值|描述|
|----|----|----|
|apikey||apikey|
|Secret_KEY||Secret_KEY|


> 源码 (python)

``` python
import requests,json,time,hmac,hashlib

# 币安api接口
class BINANCE:
    def param2string(self,param):
        s = ''
        for k in param.keys():
            s += k
            s += '='
            s += str(param[k])
            s += '&'
        return s[:-1]

    def IO(self,method,request_path,body):
        header = {
        'X-MBX-APIKEY': apikey,
        }
        if body != '':
            body['signature'] = hmac.new(Secret_KEY.encode('utf-8'), binance.param2string(body).encode('utf-8'), hashlib.sha256).hexdigest()
            if method == 'GET':
                body = binance.param2string(body)
                tell = 'https://fapi.binance.com{0}?{1}'.format(request_path,body)
                response = requests.get(url=tell, headers=header).json()
                return response
            elif method == 'POST':
                response = requests.post(url='https://fapi.binance.com'+str(request_path), headers=header, data=body).json()
                return response
        else:
            response = requests.get(url='https://fapi.binance.com'+str(request_path), headers=header).json()
            return response

def main():
    global binance
    binance = BINANCE()

    #GET请求示例:查看余额
    body = {"timestamp": f"{int(time.time() * 1000)}"}
    info = binance.IO('GET','/fapi/v2/balance',body)
    Log(info)

    #POST请求示例:调整杠杆倍数
    body = {
        "symbol":"BTCUSDT",
        "leverage":int(10),
        "timestamp": f"{int(time.time() * 1000)}"
    }
    info  = binance.IO('POST','/fapi/v1/leverage',body)
    Log(info)
```

> 策略出处

https://www.fmz.com/strategy/353224

> 更新时间

2022-04-13 08:26:48
