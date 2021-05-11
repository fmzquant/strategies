
> 策略名称

Hans123日内突破策略

> 策略作者

Hukybo

> 策略描述

#### 前言
HANS123策略最早主要应用于外汇市场，其交易方式比较简单，属于趋势突破系统，这种交易方式可以在趋势形成的第一时间入场，因此得到很多交易员的青睐，迄今为止HANS123已经扩展了许多版本，今天我们就一起来认识HANS123策略。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/4878)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|test|100|test|


> 源码 (python)

``` python
'''backtest
start: 2020-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

up_line = down_line = trade_count = 0  										# 定义全局变量：上轨、下轨、当天交易次数

def current_time(bar_arr):
    current = bar_arr[-1]['Time']  			# 获取当前K线时间戳
    time_local = time.localtime(current / 1000)  # 处理时间戳
    hour = time.strftime("%H", time_local)  		# 格式化时间戳，并获取小时
    minute = time.strftime("%M", time_local)  	# 格式化时间戳，并获取分钟
    if len(minute) == 1:
        minute = "0" + minute
    return int(hour + minute)

# 取消未成交订单
def cancel_order():
    Sleep(1000)
    orders = exchange.GetOrders()
    if len(orders) > 0:
        exchange.CancelOrder(orders[0].Id)

def onTick():
    _C(exchange.SetContractType, "a888")  			# 订阅期货品种
    bar_arr = _C(exchange.GetRecords)  	# 获取分钟K线数组
    global up_line, down_line, trade_count  		# 引入全局变量
    current = current_time(bar_arr)  					# 处理时间
    if current == 930:  						# 如果K线时间是09:30
        bar_arr = _C(exchange.GetRecords, PERIOD_D1)  	# 获取日K线数组
        up_line = bar_arr[-1]['High'] # 前30根K线最高价
        down_line = bar_arr[-1]['Low'] # 前30根K线最低价
        trade_count = 0  							# 重置交易次数为0
    position_arr = _C(exchange.GetPosition)  		# 获取持仓数组
    profit = 0
    position = 0
    if len(position_arr) > 0:  						# 如果持仓数组长度大于0
        position_dic = position_arr[0]  				# 获取持仓字典数据
        if position_dic['Type'] % 2 == 0:  		# 如果是多单
            position = position_dic['Amount']  	# 赋值持仓数量为正数
        else:
            position = -position_dic['Amount']  	# 赋值持仓数量为负数
        profit = position_dic['Profit']  			# 获取持仓盈亏
    depth = exchange.GetDepth()
    ask = depth.Asks[0].Price
    bid = depth.Bids[0].Price
    # 如果临近收盘或者达到止盈止损
    if current == 1450 or profit > 300:
        if position > 0:  						# 如果持多单
            exchange.SetDirection("closebuy")  	# 设置交易方向和类型
            exchange.Sell(bid, 1) 	# 平多单
        if position < 0:  						# 如果持空单
            exchange.SetDirection("closesell")  	# 设置交易方向和类型
            exchange.Buy(ask, 1)  	# 平空单
    # 如果当前无持仓，并且小于指定交易次数，并且在指定交易时间内
    if position == 0 and trade_count < 3 and 930 < current < 1400:
        if bid > up_line:  			# 如果价格大于上轨
            exchange.SetDirection("buy")  		# 设置交易方向和类型
            exchange.Buy(ask, 1)  	# 开多单
            trade_count = trade_count + 1  		# 交易次数加一次
        if ask < down_line:  		# 如果价格小于下轨
            exchange.SetDirection("sell")  		# 设置交易方向和类型
            exchange.Sell(bid, 1)	# 开空单
            trade_count = trade_count + 1  		# 交易次数加一次

# 策略入口函数
def main():
    while True:  								# 无限循环
        onTick()  								# 执行策略主函数
        cancel_order()
        Sleep(1000)  								# 休眠1秒


```

> 策略出处

https://www.fmz.com/strategy/179805

> 更新时间

2021-04-26 15:10:02
