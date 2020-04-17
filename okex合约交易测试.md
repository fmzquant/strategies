
> 策略名称

okex合约交易测试

> 策略作者

a838899





> 源码 (python)

``` python
'''backtest
start: 2019-07-22 00:00:00
end: 2020-03-29 00:00:00
period: 1d
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["StopLossRatio",0.1],["Interval",5]]
'''
def main():
    #Log(exchange.GetAccount())
    exchange.SetContractType("this_week")
    exchange.SetMarginLevel(10)
    # 开多单，买币
    exchange.SetDirection("buy")
    exchange.Buy(20000,1)
    position = _C(exchange.GetPosition)
    Log(position)
    # 平多单，卖币
    exchange.SetDirection("closebuy")
    exchange.Sell(10000,1)
    Log(position)
    # 开空单，卖币
    exchange.SetDirection("sell")
    exchange.Sell(10000,1)
    Log(position)
    # 平空单，买币
    exchange.SetDirection("closesell")
    exchange.Buy(20000,1)
    Log(position)
    Log("Amount:", position[0].Amount, "FrozenAmount:", position[0].FrozenAmount,"Price:",
        position[0].Price, "Profit:", position[0].Profit,"Type:", position[0].Type, "ContractType:", position[0].ContractType)


```

> 策略出处

https://www.fmz.com/strategy/199102

> 更新时间

2020-04-16 16:37:56
