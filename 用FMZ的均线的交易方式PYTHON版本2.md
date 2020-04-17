
> 策略名称

用FMZ的均线的交易方式PYTHON版本2

> 策略作者

a838899





> 源码 (python)

``` python
'''
用FMZ的均线的交易方式PYTHON版本
交易对象时OKEX BTC_USDT
方法：
用公式计算的MA曲线数据、 用的FMZ的TA库
用1小时的线周期，MA5上穿MA20 买入 MA5下穿MA20 卖出
欢迎学习交流
微信：su7178
欢迎学习交流
'''
'''backtest
start: 2020-03-13 00:00:00
end: 2020-04-13 00:00:00
period: 1h
exchanges: [{"eid":"OKEX","currency":"BTC_USD"}]
'''
buy_m = 0
sell_m = 0
def do_trade(trade_type):
        nw_accont = _C(exchange.GetAccount)
        money = nw_accont.Balance
        B = nw_accont.Stocks
        if trade_type == "buy" and money >= 10:
                exchange.Buy(-1, money)
                global buy_m
                buy_m += 1
                Log("买入btc资金 : ", money,"买入btc数量 : ", B,"买入次数 : ",buy_m)
        elif trade_type == "sell" and B >= 0.001:
                 exchange.Sell(-1, B)
                 global sell_m
                 sell_m += 1
                 Log("卖出btc资金 : ", money,"卖出btc数量 : ", B,"卖出次数 : ",sell_m)
        else: return
# 策略主函数
def onTick():
    # exchange.SetContractType("quarter")  # 订阅期货品种
    records = exchange.GetRecords(PERIOD_H1)  # 获取K线数组
    # records_15 = records.
    if len(records) < 50: return
    close = records[len(records) - 1].Close
    ma_5 = TA.MA(records, 5)
    # Log(ma_5)
    ma_20 = TA.MA(records, 20)
    cross = 0
    cross = _Cross(ma_5, ma_20)
    if cross == -1:
            trade_type = "buy"
            do_trade(trade_type)     
    elif cross == 1:
            trade_type = "sell"
            do_trade(trade_type)            
    else: return
# 程序入口
def main():
    accont = _C(exchange.GetAccount)
    int_money = accont.Balance
    Log("初始资金 : ", int_money)
    int_B = accont.Stocks
    Log("初始BTC : ", int_B)
    while True:  # 进入无限循环模式
        onTick()  # 执行策略主函数
        Sleep(3000)  # 休眠1秒



```

> 策略出处

https://www.fmz.com/strategy/198397

> 更新时间

2020-04-14 14:56:42
