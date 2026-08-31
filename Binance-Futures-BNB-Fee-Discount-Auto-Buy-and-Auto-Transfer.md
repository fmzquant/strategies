
> Name

Binance-Futures-BNB-Fee-Discount-Auto-Buy-and-Auto-Transfer

> Author

Xueqiu Bot

> Strategy Description

Contact: ck@xueqiubot.com / WeChat@stay37
This strategy automatically transfers USDT from a Binance futures account to the spot account to buy BNB, then transfers the purchased BNB into the futures account so BNB can be used for fee discounts.
Please add the BNB_USDT trading pair in advance.

> Source (python)

``` python
# Contact : ck@xueqiubot.com / WeChat@stay37

import time


def supply_bnb(transfer_usdt,i):
    Log("当前BNB不足，补充BNB作为手续费抵扣")
    #获取当前BNB_USDT价格
    depth = _C(exchanges[i].GetDepth)
    #转出transfer_usdt个USDT
    timestamp = time.time() * 1000
    transfer = exchanges[i].IO("api","POST","/sapi/v1/futures/transfer","asset=USDT&amount="+str(transfer_usdt)+"&type=2&timestamp=+"+str(timestamp))
    time.sleep(1)
    #获取BNB深度 下单购买
    depth = _C(exchanges[i].GetDepth)
    buyamount = round(transfer_usdt / (depth.Asks[0].Price + 0.2) , 2)
    buyid = exchanges[i].Buy(round(depth.Asks[0].Price + 0.1 , 4) , buyamount)
    time.sleep(1)
    #查询购买结果 将购买后的BNB以及剩余的USDT转入合约账户
    acc = _C(exchanges[i].GetAccount)
    transfer_usdt = acc.Balance
    transfer_bnb = acc.Stocks
    timestamp = time.time() * 1000
    transfer = exchanges[i].IO("api","POST","/sapi/v1/futures/transfer","asset=USDT&amount="+str(transfer_usdt)+"&type=1&timestamp=+"+str(timestamp))
    transfer = exchanges[i].IO("api","POST","/sapi/v1/futures/transfer","asset=BNB&amount="+str(transfer_bnb)+"&type=1&timestamp=+"+str(timestamp))
    Log("BNB补充完成")




def main():
    if '合约账户内BNB不足':
        #transfer_usdt: 需要购买的usdt金额
        #i: bnb_usdt现货交易对的序号
        supply_bnb(transfer_usdt,i)

```

> Detail

https://www.fmz.com/strategy/236437

> Last Modified

2020-11-11 22:38:54
