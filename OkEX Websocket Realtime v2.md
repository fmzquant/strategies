
> 策略名称

OkEX Websocket Realtime v2

> 策略作者

FawkesPan

> 策略描述

# OkEX WebSocket API Connecter (compress supported)



> 源码 (python)

``` python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
# 
# Market Real-time Subscription
#
# Copyright 2018 FawkesPan
#
# Do What the Fuck You Want To Public License
#


import time
import ssl
import sys
import code
import json
import hashlib
import hmac
import urllib
import threading
import websocket
import zlib
import string

try:
    import readline
except ImportError:
    pass

pong = time.time()

class WSSubscription:

    def __init__(self,symbol='btc',contract_type='this_week',on_message=None):
        self.__symbol = symbol.lower()
        self.__contract_type = contract_type
        self.__Depth = {}
        self.__Position = {}
        
        if on_message is not None:
            self.__callbackEnabled = True
            self.__callback = on_message
        else:
            self.__callbackEnabled = False

        thread = threading.Thread(target=self.sub, args=())
        thread.daemon = True
        thread.start()

    def GetDepth(self):
        return self.__Depth

    def subscribe(self,ws):

        def run(*args):
            ws.send("{'event':'addChannel','channel':'ok_sub_futureusd_%s_depth_%s_5'}" % (self.__symbol,self.__contract_type))
            ws.send("{'event':'addChannel','channel':'ok_sub_futureusd_%s_trade_%s'}" % (self.__symbol,self.__contract_type))

            while True:
                ws.send("{'event':'ping'}")
                time.sleep(30)

        threading.Thread(target=run).start()

    def sub(self):

        websocket.enableTrace(False)
        URL = "wss://real.okex.com:10441/websocket?compress=true"
        ws = websocket.WebSocketApp(URL,
                                    on_message=self.incoming,
                                    on_error=self.error_handling,
                                    on_close=self.closing)

        ws.on_open = self.subscribe

        while True:
            try:
                ws.run_forever()
            except:
                pass

        pass

    def incoming(self,ws,message):
        message = zlib.decompress(message, -zlib.MAX_WBITS)
        message = message.decode('utf-8')
        global pong
        if 'pong' in message:
            pong = time.time()
        if 'asks' in message and 'bids' in message:
            d = json.loads(message)
            self.__Depth = d[0]['data']
            self.__Depth['asks'].reverse()
            
        if self.__callbackEnabled:
            self.__callback(message)
    

    def error_handling(self,ws,error):
        print(str(error))

    def closing(self,ws):
        print("WebSocket Closing...")
        
ext.OkEXWS = WSSubscription

# 模块测试
def main():
    OkEX = ext.OkEXWS(symbol='btc',contract_type='this_week')
    while (True):
        Log(OkEX.GetDepth())
        time.sleep(1)
```

> 策略出处

https://www.fmz.com/strategy/91176

> 更新时间

2019-04-08 23:47:33
