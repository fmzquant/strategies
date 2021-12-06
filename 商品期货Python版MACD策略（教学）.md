
> 策略名称

商品期货Python版MACD策略（教学）

> 策略作者

雨幕

> 策略描述

## 商品期货Python版MACD策略（教学）

- 策略仅作教学使用。
- 如有问题欢迎留言。
- 商品期货策略，不支持数字货币。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Symbol|rb2010|合约代码|
|FastPeriod|12|MACD快线周期|
|SlowPeriod|26|MACD慢线周期|
|SignalPeriod|9|MACD信号周期|
|SlidePoint|2|滑价点数|
|Amount|true|下单量|


> 源码 (python)

``` python
'''backtest
start: 2020-03-01 00:00:00
end: 2020-06-29 00:00:00
period: 1h
basePeriod: 1m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

# 全局变量
ChartCfg = {
    '__isStock': True,
    'title': {
        'text': 'Python MACD 策略图表'
    },
    'yAxis': [{
        'title': {'text': 'K线'},
        'style': {'color': '#4572A7'},
        'opposite': False
    }, {
        'title': {'text': '指标轴'},
        'opposite': True
    }],
    'series': [{
        'type': 'candlestick',
        'name': '当前周期',
        'id': 'primary',
        'data': []
    }, {
        'type': 'line',
        'id': 'dif',
        'name': 'DIF',
        "yAxis" : 1,
        'data': []
    }, {
        'type': 'line',
        'id': 'dea',
        'name': 'DEA',
        "yAxis" : 1,
        'data': []
    }, {
        'type': 'line',
        'id': 'macd',
        'name': 'MACD',
        "yAxis" : 1,
        'data': []
    }]
}

IDLE = -1

def trade(direction, amount, price):
    if direction == IDLE and amount > 0:
        exchange.SetDirection("buy")
        exchange.Buy(price, abs(amount))
    elif direction == IDLE and amount < 0:
        exchange.SetDirection("sell")
        exchange.Sell(price, abs(amount))
    if direction == PD_LONG or direction == PD_LONG_YD:
        exchange.SetDirection("closebuy_today" if direction == PD_LONG else "closebuy")
        exchange.Sell(price, abs(amount))
    elif direction == PD_SHORT or direction == PD_SHORT_YD:
        exchange.SetDirection("closesell_today" if direction == PD_SHORT else "closesell")
        exchange.Buy(price, abs(amount))
    
def updatePos():
    while True:
        orders = _C(exchange.GetOrders)
        if len(orders) == 0:
            break
        for i in range(len(orders)):
            exchange.CancelOrder(orders[i].Id, orders[i])
            Sleep(1000)

    pos = _C(exchange.GetPosition)
    if len(pos) == 0:
        return IDLE, 0
    return pos[0].Type, pos[0].Amount

def main():
    global ChartCfg
    state = IDLE
    preTime = 0
    chart = Chart(ChartCfg)
    chart.reset()
    while True:
        if exchange.IO("status"):
            info = _C(exchange.SetContractType, Symbol)

            while True:
                r = _C(exchange.GetRecords)
                if len(r) > FastPeriod and len(r) > SlowPeriod and len(r) > SignalPeriod:
                    break
            
            # 计算指标
            macd = TA.MACD(r, FastPeriod, SlowPeriod, SignalPeriod)
            if macd[0][-3] is None or macd[1][-3] is None:
                continue

            LogStatus(_D(), "已经连接")
            
            # 画图
            for i in range(len(r)):
                if r[i]["Time"] == preTime:
                    chart.add(0, [r[i]["Time"], r[i]["Open"], r[i]["High"], r[i]["Low"], r[i]["Close"]], -1)
                    chart.add(1, [r[i]["Time"], macd[0][i]], -1)
                    chart.add(2, [r[i]["Time"], macd[1][i]], -1)
                    chart.add(3, [r[i]["Time"], macd[2][i]], -1)
                elif r[i]["Time"] > preTime:
                    chart.add(0, [r[i]["Time"], r[i]["Open"], r[i]["High"], r[i]["Low"], r[i]["Close"]])
                    chart.add(1, [r[i]["Time"], macd[0][i]])
                    chart.add(2, [r[i]["Time"], macd[1][i]])
                    chart.add(3, [r[i]["Time"], macd[2][i]])
                    preTime = r[i]["Time"]

            # 检测交易信号
            if macd[0][-2] < 0 and macd[1][-2] < 0 and macd[0][-3] < macd[1][-3] and macd[0][-2] > macd[1][-2] and (state != PD_LONG and state != PD_LONG_YD):
                # 平空仓，开多仓 或者 开多仓
                state, amount = updatePos()
                if state == PD_SHORT or state == PD_SHORT_YD:
                    trade(state, amount, r[-1]["Close"] + info["PriceTick"] * SlidePoint)
                elif state == IDLE:
                    trade(state, Amount, r[-1]["Close"] + info["PriceTick"] * SlidePoint)

            elif macd[0][-2] > 0 and macd[1][-2] > 0 and macd[0][-3] > macd[1][-3] and macd[0][-2] < macd[1][-2] and (state != PD_SHORT and state != PD_SHORT_YD):
                # 平多仓，开空仓 或者 开空仓
                state, amount = updatePos()
                if state == PD_LONG or state == PD_LONG_YD:
                    trade(state, amount, r[-1]["Close"] - info["PriceTick"] * SlidePoint)
                elif state == IDLE:
                    trade(state, -Amount, r[-1]["Close"] - info["PriceTick"] * SlidePoint)
        else :
            LogStatus(_D(), "未连接")
        Sleep(500)

```

> 策略出处

https://www.fmz.cn/strategy/216926

> 更新时间

2020-07-01 11:52:18
