
> 策略名称

BitcoinTrade Test Python

> 策略作者

btcvegas



> 策略参数



|参数|默认值|描述|
|----|----|----|
|sleep_time|1000|sleep_time (ms)|


> 源码 (python)

``` python


import time
import threading
import json
import urllib.request
import random

def httpGetWithSign(url, api_key):
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6',
        'x-api-key':api_key
        }
    req = urllib.request.Request(url, urllib.parse.urlencode("").encode("utf-8") , headers=headers)
    req.get_method = lambda: 'GET' 

    try:
        response = urllib.request.urlopen(req)
        status_code = response.getcode()

        return json.loads(response.read())
    
    except urllib.error.HTTPError as e:
        Log(e)
        response = json.loads(e.read().decode("utf8", 'ignore'))
        Log(response["message"])
        return  response["message"]

def httpPostWithSign(url, body, api_key):
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6',
        'x-api-key':api_key
        }
    req = urllib.request.Request(url, urllib.parse.urlencode(body).encode(), headers=headers)
    req.get_method = lambda: 'POST' 

    try:
        response = urllib.request.urlopen(req)
        status_code = response.getcode()

        cs = _G("count_sent") + 1
        _G("count_sent", cs)

        Log("Count Success", cs)
        return json.loads(response.read())
    
    except urllib.error.HTTPError as e:

        ce = _G("count_error") + 1
        _G("count_error", ce)

        Log("Error", e)
        Log("Count error", ce)

        response = json.loads(e.read().decode("utf8", 'ignore'))
        
        Log(response["message"])
        return response["message"]

def getBalance(api_key, url, user_name, cur1, cur2):
    raw_data = httpGetWithSign(url + "/wallets/balance", api_key)
    Log(raw_data['data'])

    for pos in raw_data['data']:
        if cur1 == pos['currency_code']:
            _G("pos_" + user_name + cur1, pos['available_amount'] + pos['locked_amount'])
        elif cur2 == pos['currency_code']:
            _G("pos_" + user_name + cur2, pos['available_amount'] + pos['locked_amount'])

    return raw_data['data']

def sendOrder(api_key, pair, side, amt, price, url):        
    body = {
        'pair':pair,
        'type':side,
        'subtype':'limited',
        'amount':amt,
        'unit_price': price
    }
    raw_data = httpPostWithSign(url + "/market/create_order", body, api_key)
    Log(raw_data['data']['code'])
    return raw_data

def main():
    LogReset()
    Log("Starting")

    runtype = "prod"

    _G("count_error", 0)
    _G("count_sent", 0)
    _G("start_time", time.time())
    
    if runtype == "dev":
        api_key_buy = 'U2FsdGVkX19RWINBa7rieY4VXlsnVvKf3oOtoahyGJI='
        api_key_sell = 'U2FsdGVkX19FLecRTyRoob8zRTe/twJMBTrDlKVOGW0='
        #base_url = "https://api.prebitcointrade.com/v3" 
        base_url = "https://apistg.prebitcointrade.com/v3" 
        pair = "BRLDAI"
        price_buy = 5.01
        price_sell = 4.99
        size = 5.0
    else:
        api_key_buy = 'U2FsdGVkX19ArQ4kLu1YMCkTTOJT5EjPyShIrtla4oR0saw0dbVoKdrhh8AnSnth'
        api_key_sell = 'U2FsdGVkX19ArQ4kLu1YMCkTTOJT5EjPyShIrtla4oR0saw0dbVoKdrhh8AnSnth'
        base_url = "https://apistg.bitcointrade.com.br/v3" 
        pair = "BRLBTC"
        price_buy = 361000
        price_sell = 355000
        size = 0.0001

    # save in memory
    _G("api_key_buy", api_key_buy)
    _G("api_key_sell", api_key_sell)
    _G("base_url", base_url)
    _G("pair", pair)

    num = 0

    initial_balance_1 = getBalance(api_key_buy, base_url, "user1_init", "BRL", "DAI")
    initial_balance_2 = getBalance(api_key_sell, base_url, "user2_init", "BRL", "DAI")

    Sleep(1000)

    #test_buy = sendOrder(api_key_buy, pair, "buy", size, price_buy, base_url)

    while (True):

        if num % 2 == 0:
            thread1 = threading.Thread(target=sendOrder, args=(api_key_sell, pair, "buy", size * (1 + random.randint(0,100) / 1000), price_buy * (1 + random.randint(0,100) / 1000), base_url,))
            thread1.daemon = True
            thread1.start()
            
            thread2 = threading.Thread(target=sendOrder, args=(api_key_buy, pair, "buy", size * (1 + random.randint(0,100) / 1000), price_buy * (1 + random.randint(0,100) / 1000), base_url,))
            thread2.daemon = True
            thread2.start()

            #thread3 = threading.Thread(target=sendOrder, args=(api_key_buy, pair, "buy", size, price_buy, base_url,))
            #thread3.daemon = True
            #thread3.start()

            #thread4 = threading.Thread(target=sendOrder, args=(api_key_buy, pair, "buy", size, price_buy, base_url,))
            #thread4.daemon = True
            #thread4.start()

            #thread5 = threading.Thread(target=sendOrder, args=(api_key_buy, pair, "buy", size, price_buy, base_url,))
            #thread5.daemon = True
            #thread5.start()

        else: 
            thread1 = threading.Thread(target=sendOrder, args=(api_key_sell, pair, "sell", size, price_sell, base_url,))
            thread1.daemon = True
            thread1.start()

            thread2 = threading.Thread(target=sendOrder, args=(api_key_buy, pair, "sell", size, price_sell, base_url,))
            thread2.daemon = True
            thread2.start()

            #thread3 = threading.Thread(target=sendOrder, args=(api_key_sell, pair, "sell", size, price_sell, base_url,))
            #thread3.daemon = True
            #thread3.start()

            #thread4 = threading.Thread(target=sendOrder, args=(api_key_sell, pair, "sell", size, price_sell, base_url,))
            #thread4.daemon = True
            #thread4.start()

            #thread5 = threading.Thread(target=sendOrder, args=(api_key_sell, pair, "sell", size, price_sell, base_url,))
            #thread5.daemon = True
            #thread5.start()


        thread1.join(timeout=0.01)
        thread2.join(timeout=0.01)
        #thread3.join(timeout=0.1)
        #thread4.join(timeout=0.1)  
        #thread5.join(timeout=0.1)

        num = num + 1
        time.sleep(sleep_time/1000)

def onexit():

    Sleep(60000)

    final_balance_1 = getBalance(_G("api_key_buy"), _G("base_url"), "user1_tail", "BRL", "DAI")
    final_balance_2 = getBalance(_G("api_key_sell"),  _G("base_url"), "user2_tail", "BRL", "DAI")

    init_pos_brl = _G("pos_user1_initBRL") + _G("pos_user2_initBRL")
    final_pos_brl = _G("pos_user1_tailBRL") + _G("pos_user2_tailBRL")
    dif_pos_brl = final_pos_brl - init_pos_brl
    
    init_pos_dai = _G("pos_user1_initDAI") + _G("pos_user2_initDAI")
    final_pos_dai = _G("pos_user1_tailDAI") + _G("pos_user2_tailDAI")
    dif_pos_dai = final_pos_dai - init_pos_dai

    Log("initial balance BRL: ", format(_N(init_pos_brl, 2), ''))
    Log("final balance BRL: ", format(_N(final_pos_brl, 2), ''))
    Log('diference BRL: ', format(_N(dif_pos_brl, 8), ''))

    Log("initial balance DAI: ", format(_N(init_pos_dai, 2), ''))
    Log("final balance DAI: ", format(_N(final_pos_dai, 2), ''))
    Log('diference DAI: ', format(_N(dif_pos_dai, 8), ''))

    Log("Count error:", _G("count_error"))
    Log("Count sent:", _G("count_sent"))

    ts = time.time()
    time_elapsed =  ts - _G("start_time")

    Log("Time elapsed:", time_elapsed)
    Log("Tps:", _G("count_sent") / time_elapsed)
    

def onerror():
    Log("Count error:", _G("count_error"))
    Log("Count sent:", _G("count_sent"))
```

> 策略出处

https://www.fmz.com/strategy/287783

> 更新时间

2021-11-15 22:43:26
