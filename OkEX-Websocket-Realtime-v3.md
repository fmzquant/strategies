
> Name

OkEX-Websocket-Realtime-v3

> Author

FawkesPan

> Strategy Description

# OkEX WebSocket API Connecter (compress supported)
因为 `websocket-client` 新版的各种大脑降级设计 很多功能无法使用
需要安装老版本websocket-client的包才能正常使用 `pip3 install websocket-client==0.46.0`



> Source (python)

``` python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding: utf-8
# 
# Market Real-time Subscription v3
#
# Copyright 2019 FawkesPan
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

    def __init__(self, instrument_id='BTC-USD-190517', market='futures', on_message=None):
        self.__iid = instrument_id
        self.__market = market
        self.__Depth = {}
        
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

    def subscribe(self, ws):
        
        def operator(op, args):
            message = {
                'op': op,
                'args': args
            }
            ws.send(json.dumps(message))

        def run(*args):
            operator('subscribe', ['%s/depth5:%s' % (self.__market, self.__iid)])
            operator('subscribe', ['%s/trade:%s' % (self.__market, self.__iid)])

            while True:
                ws.send("ping")
                time.sleep(30)

        threading.Thread(target=run).start()

    def sub(self):

        websocket.enableTrace(False)
        URL = "wss://real.okex.com:10442/ws/v3"
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
            self.__Depth = d['data'][0]
            
        if self.__callbackEnabled:
            self.__callback(message)
    

    def error_handling(self,ws,error):
        print(str(error))

    def closing(self,ws):
        print("WebSocket Closing...")
        
ext.OkEXWS = WSSubscription

# 模块测试
def main():
    OkEX = ext.OkEXWS('BTC-USD-190517', 'futures')
    while (True):
        Log(OkEX.GetDepth())
        time.sleep(1)
```

> Detail

https://www.fmz.com/strategy/143457

> Last Modified

2019-05-18 00:17:12
