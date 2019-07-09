
> 策略名称

Telegram 发信接口 V2.0.0 Python

> 策略作者

FawkesPan

> 策略描述

# Telegram API接口 (FMZ.com)

##### 这个库目前只能Telegram发信 后续会增加更多功能。

### 初始化
```
# key 为 Bot key
## 获取 Bot key 可以参考 https://www.ccino.org/create-a-telegram-bot.html
# chat_id 为收信用户Telegram ID
## Telegram ID 可以通过 @dwx_aibot 机器人获取， 连接至此机器人后发送 /getid 即可获得 ChatID
Telegram = ext.Telegram(key=string, chat_id=integer)    # 创建一个新的接口对象
```
### 发信
```
# chat_id 为可选项 默认会使用初始化时设置的ChatID
# message 即为信息内容
Telegram.Send(message=string, chat_id=integer)
```
### 注意事项
在能够给自己发信息之前，你需要先在Telegram中给自己的机器人发送一条 /start 信息，不然机器人是没法给你发信的。
### 与我联系
邮箱 i@fawkex.me
电报 [FawkesPan](https://telegram.me/FawkesPan)

接受策略定制

### 关于这个库
[Telegram API文档](https://core.telegram.org/bots/api)

[使用 WTFPL – Do What the Fuck You Want to Public License](http://www.wtfpl.net/)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|DEBUG|0|DEBUG模式: 0|1|
|KEY||Telegram 机器人 Key|
|CHATID|false|Telegram 会话 ID|


> 源码 (python)

``` python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
# 
# Telegram Interface for FMZ.com
#
# Copyright 2018 FawkesPan
# Contact : i@fawkex.me / Telegram@FawkesPan
#
# Do What the Fuck You Want To Public License
#

try:
    import requests
except:
    print('Requests not installed. Try: pip install requests')
    Log('Requests not installed. Try: pip install requests')
    
    raise Exception('Requests not installed. Try: pip install requests')

class Telegram:
    def __init__(self):
        self.key = KEY
        self.chat_id = CHATID
        self.url = 'https://api.telegram.org/bot%s' % self.key
        
    def Send(self, message='', chat_id=None):
        if chat_id is None:
            chat_id = self.chat_id
        PARAM = {}
        PARAM['chat_id'] = chat_id
        PARAM['text'] = message
        PARAM['parse_mode'] = 'markdown'
        URL = self.url + '/sendMessage'
        try:
            res = requests.post(URL, data = PARAM)
            return True
        except IOError as e:
            print(e)
            return False
        

ext.Telegram = Telegram

# 模块功能测试
def main():
    if DEBUG == 1:
        msger = ext.Telegram(KEY, CHATID)
        msger.Send("Hello World!")
    
    return True
```

> 策略出处

https://www.fmz.com/strategy/116201

> 更新时间

2019-05-16 20:06:03
