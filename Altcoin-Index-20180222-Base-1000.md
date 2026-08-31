
> Name

Altcoin-Index-20180222-Base-1000

> Author

小草

> Strategy Description

Tracks an altcoin-to-BTC price index with a base value of 1000 on 2018-02-22. Newly added altcoins will be listed.
> Source (python)

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-coding
import time
import urllib2
import json
import pickle
            
def updateTicker():
    global index,initPrice
    ticker = json.loads(urllib2.urlopen('https://api.binance.com/api/v3/ticker/price',timeout=10).read())
    change = []
    for t in ticker:
        if t['symbol'][-3:] == 'BTC':
            if t['symbol'][:-3] in initPrice.keys():
                change.append(float(t['price'])/initPrice[t['symbol'][:-3]])
            else:
                initPrice[t['symbol'][:-3]] = float(t['price'])
                f=open('price.pkl','w')
                pickle.dump(initPrice,f,0)
                f.close()
                Log(t['symbol'][:-3],' added')
    if len(change)>0:
        index = 1000*sum(change)/len(change)
    


initPrice = {}
price = {}
index = 1000
try:
    f=open('price.pkl','r')  
    initPrice=pickle.load(f)  
    f.close()
except:
    initPrice = {}
Log('共计入山寨币:', len(initPrice))
def main():
    while True:
        try:
            updateTicker()
            LogProfit(round(index,4))
        except Exception as e:
            pass
        Sleep(3600000)

```

> Detail

https://www.fmz.com/strategy/73461

> Last Modified

2019-07-03 16:46:08
