
> Name

企业微信群机器人消息推送

> Author

BTC【策略代写】团队



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|webhook|https://...|webhook|


> Source (python)

``` python
#!Python3

"""
《策略代写》 与 （此程序帮助），致信QQ：35787501

企业微信消息推送，用于群自定义机器人
同理：修改 data，也可以接入其他软件的 webhook
"""

import requests


def send(text):
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "msgtype": "text",
        "text": {
            "content": text,
        }
    }
    response = requests.post(webhook, headers=headers, json=data)
    records = response.json()
    return records


def LogQYWX(*args):
    text = " ".join(args)
    Log(text, send(text))


ext.LogQYWX = LogQYWX

```

> Detail

https://www.fmz.com/strategy/430810

> Last Modified

2023-11-02 10:14:01
