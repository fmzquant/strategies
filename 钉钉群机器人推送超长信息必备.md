
> Name

钉钉群机器人推送超长信息必备

> Author

BTC【策略代写】团队



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ding_url|https://oapi.dingtalk.com/robot/send?access_token=???|Webhook|
|ding_secret|$$$__enc__$$$???|加签|


> Source (python)

``` python
#!Python3

"""
《策略代写》 与 （此程序帮助），致信QQ：35787501

钉钉长消息推送，用于群自定义机器人
由于@可推送的信息过短，在字符串长度过长时，可以使用此程序
"""

import time
import json
import hmac
import hashlib
import base64
import urllib.parse
import urllib.request


def send_request(url, data):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                      'AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/92.0.4515.159 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;'
                  'q=0.9,image/avif,image/webp,image/apng,*/*;'
                  'q=0.8,application/signed-exchange;v=b3;q=0.9',
        "Content-Type": "application/json",
        "Charset": "UTF-8",
    }
    request = urllib.request.Request(url=url, data=json.dumps(data).encode("utf-8"), headers=headers)
    opener = urllib.request.urlopen(request)
    return opener.read().decode()


def get_time_sign(secret):
    timestamp = str(round(time.time() * 1000))
    secret_enc = secret.encode('utf-8')
    string_to_sign = '{}\n{}'.format(timestamp, secret)
    string_to_sign_enc = string_to_sign.encode('utf-8')
    h_mac_code = hmac.new(secret_enc, string_to_sign_enc, digestmod=hashlib.sha256).digest()
    sign = urllib.parse.quote_plus(base64.b64encode(h_mac_code))
    return timestamp, sign


def send(text):
    timestamp, sign = get_time_sign(ding_secret)
    my_url = "{}&timestamp={}&sign={}".format(ding_url, timestamp, sign)
    data = {"msgtype": "text", "text": {"content": text}}
    return send_request(my_url, data)


def LogDing(*args):
    Log(send(" ".join(args)))


def main():
    LogDing(" test " * 1000)


ext.LogDing = LogDing

```

> Detail

https://www.fmz.com/strategy/354916

> Last Modified

2022-05-11 19:02:56
