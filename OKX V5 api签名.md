
> 策略名称

OKX V5 api签名

> 策略作者

卧野望平川



> 策略参数



|参数|默认值|描述|
|----|----|----|
|APIKEY||apikey|
|SecretKey||SecretKey|
|Passphrase||Passphrase|


> 源码 (python)

``` python

import requests,datetime,base64,hmac,json

class OnTick:
    def IO(self,method, request_path, body): #请求验证
        #获取UTC时间
        rest = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3]
        suffix = 'Z'
        timestamp = rest + suffix
        #签名
        if body == '':
            bodyplus = ''
        else:
            bodyplus = json.dumps(body)
        message = str(timestamp) + str.upper(method) + request_path + str(bodyplus)
        mac = hmac.new(bytes(SecretKey, encoding='utf8'), bytes(message, encoding='utf-8'), digestmod='sha256')
        base = mac.digest()
        #合并请求头
        headers = {
          "OK-ACCESS-KEY": apiKEY,
          "OK-ACCESS-SIGN": base64.b64encode(base),
          "OK-ACCESS-TIMESTAMP": timestamp,
          "OK-ACCESS-PASSPHRASE": Passphrase
        }
        obj1 = 'https://www.okex.com'
        obj2 = str(request_path)
        url = ''.join([obj1,obj2])
        if method == 'GET':
            response = requests.get(url=url,headers=headers).json()
            return response
        elif method == 'POST':
            response = requests.post(url=url, json=body, headers=headers).json()
            return response

def main():
    global exchange
    exchange = OnTick()
    #GET示例：查看余额
    info = exchange.IO("GET","/api/v5/asset/balances",'')
    Log(info)
    #POST示例：下单
    body = {
        "instId":"BTC-USDT-SWAP",
        "tdMode":"cross",
        "side":"buy",
        "posSide":"long",
        "ordType":"market",
        "sz":"1"
    }
    info = exchange.IO("POST","/api/v5/trade/order",body)
    Log(info)
```

> 策略出处

https://www.fmz.com/strategy/350314

> 更新时间

2022-04-13 08:26:40
