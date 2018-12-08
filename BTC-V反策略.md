
> 策略名称

BTC-V反策略

> 策略作者

ztjeff



> 策略参数



|参数|默认值|描述|
|----|----|----|
|password|'test888'|口令|




|按钮|默认值|描述|
|----|----|----|
|recv|true|结束程序|


> 源码 (python)

``` python
# encoding: utf-8

import os
from time import time, sleep
from threading import Thread
from socket import socket, AF_INET, SOCK_DGRAM, gethostname, timeout, error

prct = 0.1
password = 'test888'
req = {}
pos = {}
recv = True
data = ''
n=60 #减数触发器，减到零触发

def trade(req):
    """测试交易"""
    for symbol, mpos in req.items():
        if symbol not in pos.keys():
            pos[symbol] = 0.0
        targetPos=round(mpos*prct, 4)
        Log('targetPos =', targetPos)
        if targetPos == pos[symbol]:
            #Log("No Trade Operation! client Pos %s is %.3f" % (symbol, pos[symbol]))
            continue
        tick = exchange.GetTicker();
        if targetPos > pos[symbol]:
            vol = round(targetPos-pos[symbol], 4)
            type = 'buy-market'
            #Log(' Buy btcusdt', vol)
            id = exchange.Buy(tick.Sell+10, vol)
            #Log(' Buy btcusdt at %s = %s' %(tick.Sell, vol))
            Log("Order id:", id);
        elif targetPos < pos[symbol]:
            vol = round(pos[symbol]-targetPos, 4)
            type = 'sell-market'
            #Log(' Sell btcusdt', vol)
            id = exchange.Sell(-1, vol)
            #Log(' Sell btcusdt at %s = %s' %(tick.Buy, vol))
            Log("Order id:", id);
        
        account = exchange.GetAccount()
        Log("账户信息，Balance:", account.Balance, "FrozenBalance:", account.FrozenBalance, "Stocks:",
        account.Stocks, "FrozenStocks:", account.FrozenStocks)
        pos[symbol] = round(account.Stocks, 4)
        Log('Now Client %s POS = %s' % (symbol, pos[symbol]))
        
class recServer(object):
    """recServer is receving Signal from SigServer"""
    def __init__(self, c):
        self.rcv = True
        self.t = Thread(target = self.recSig, args = (c,))
        self.t.start()
        
    def recSig(self, c):
        while self.rcv:
            try:
                data, addr = c.recvfrom(1024)
                #Log('n=',n)
            except timeout:
                continue
            except error:
                msg = traceback.format_exc()
                Log(msg)
                continue
            if data == 'ok':        
                #Log('SigServer is alive! Receving "ok" from', addr)
                pass
            elif 'send password' in data:
                Log('The client not login, press any key to exit and restart!')
                self.rcv = False
            elif not data:
                Log("SigServer is stopped, press any Key to exit SigClient!")
                self.rcv = False
            else:
                try:
                    c.sendto('ack', addr)
                    Log('send ack to ', addr)
                except error:
                    Log('Send ack error!')
                    
                req = eval(data)
                Log(req, 'from', addr)
                trade(req)
        else:
            Log('RecSig Thread is Exiting...')
        return None
            
    def heart(self, c, ADDR):      
        try:
            c.sendto('live', ADDR)
        except error:
            Log('Send keepAlive error!')
            return None
                    
    def close(self):
        self.rcv = False
        self.t.join()   

def main():
    account = exchange.GetAccount()
    Log("账户信息，Balance:", account.Balance, "FrozenBalance:", account.FrozenBalance, "Stocks:",
        account.Stocks, "FrozenStocks:", account.FrozenStocks)
    pos['btcusdt'] = round(account.Stocks, 4)
    Log(pos)
    # 启动UDP客户端
    c = socket(AF_INET, SOCK_DGRAM)
    host = '47.98.130.139'
    port = 1234
    ADDR = (host, port)
    c.settimeout(5)
    try:
        c.sendto(password, ADDR)
        data, addr = c.recvfrom(256)
        Log(data+' from ', addr)
    except timeout, error:
        Log('SigServer is not active, client is aborting!')
        c.close()
        return None         
    if 'invalid' in data:
        Log('\nYou failed to Login! SigClient is Exiting...')
        c.close()
        return None

    # 如果密码正确，开启接收信号模式
    rc = recServer(c)       
    sleep(1)
    global n
    while recv:
        n -= 1
        if not n:
            rc.heart(c, ADDR)
            account = exchange.GetAccount()
            pos['btcusdt'] = round(account.Stocks, 4)
            #Log(pos)
            n = 60
        sleep(1)
    else:
        rc.close()
        Log('Program is End!')
```

> 策略出处

https://www.fmz.com/strategy/117202

> 更新时间

2018-09-27 21:45:01
