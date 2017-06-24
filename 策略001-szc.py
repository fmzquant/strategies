'''
策略出处: https://www.botvs.com/strategy/34216
策略名称: 策略001-szc
策略作者: 丧尸来来
策略描述:

实盘策略

'''

import types
import time
import platform

def main():
    perTime = 0
    amount_buy = 0
    amount_sell = 0
    diffMoney = 0
    dealAmount = 0
    price_buy = 0
    price_sell = 0
    price_stop_win = 0
    price_stop_lose = 0
    initAccount = ext.GetAccount()
    while True:
        LogStatus("现在时间：", _D(time.time()))
        records = exchange.GetRecords(PERIOD_M30)
        tiaojian = ext.szc()
        nowAccount = ext.GetAccount()
        if(not records or len(records) < 20):
            continue
        else:
            if(perTime != records[-1]["Time"]):
                perTime = records[-1]["Time"]
                if nowAccount['Balance']>=100:
                    if tiaojian > 0:
                        Log("--------------------------------------------------------------")
                        nowAccount = ext.GetAccount()
                        amount_buy = _N(nowAccount.Balance,2)
                        exchange.Buy(-1, amount_buy)
                        lastAccount = ext.GetAccount()
                        diffMoney = _N(abs(nowAccount.Balance - lastAccount.Balance),4)
                        dealAmount = _N(abs(lastAccount.Stocks - nowAccount.Stocks),4)
                        price_buy = _N(diffMoney / dealAmount, 2)
                        Log("成交价:", price_buy)
                        Log("止损价：", price_stop_lose)
                        price_stop_lose = price_buy * 0.95
                        price_stop_win = price_buy * 1.05
                    else:
                        pass
                elif nowAccount['Stocks']>=0.01:
                    price_now = _C(exchange.GetTicker).Last
                    if price_now > price_stop_win:
                        if tiaojian < 0:
                            nowAccount = ext.GetAccount()
                            amount_sell = _N(nowAccount.Stocks,2)
                            exchange.Sell(-1, amount_sell)
                            lastAccount = ext.GetAccount()
                            diffMoney = _N(abs(nowAccount.Balance - lastAccount.Balance),4)
                            dealAmount = _N(abs(lastAccount.Stocks - nowAccount.Stocks),4)
                            price_sell = _N(diffMoney / dealAmount, 2)
                            Log("成交价:", price_sell)
                            LogProfit(_N(lastAccount.Balance - initAccount.Balance, 2),'钱：',_N(lastAccount.Balance, 2),'币：',_N(lastAccount.Stocks,3))
                        else:
                            pass
                    elif price_now < price_stop_lose:
                        Log("当前价：", _C(exchange.GetTicker).Last)
                        Log("止损！！！")
                        nowAccount = ext.GetAccount()
                        amount_sell = _N(nowAccount.Stocks,2)
                        exchange.Sell(-1, amount_sell)
                        lastAccount = ext.GetAccount()
                        LogProfit(_N(lastAccount.Balance - initAccount.Balance, 2),'钱：',_N(lastAccount.Balance, 2),'币：',_N(lastAccount.Stocks,3))
                    else:
                        pass
                else:
                    pass
    Sleep(2000)
