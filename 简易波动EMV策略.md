
> 策略名称

简易波动EMV策略

> 策略作者

Hukybo

> 策略描述

#### 摘要
与其他技术指标不同，简易波动（Ease of Movement Value）反映的是价格、成交量、人气的变化，它是一种将价格与成交量变化相结合的技术，它通过衡量单位成交量的价格变动，形成一个价格波动指标。当市场人气聚集，交易活跃时提示买入信号；当成交量低迷，市场能量即将耗尽时提示卖出信号。

[点击阅读更多内容](https://www.fmz.com/bbs-topic/5743)



> 源码 (python)

``` python
# 获取持仓数量
def get_position():
    position = 0                              		# 赋值持仓数量为0
    position_arr = _C(exchange.GetPosition)   	# 获取持仓数组
    if len(position_arr) > 0:                 		# 如果持仓数组长度大于0
        for i in position_arr:                		# 遍历持仓数组
            if i['ContractType'][:2] == 'IH': 	# 如果持仓品种等于订阅品种
                if i['Type'] % 2 == 0:        		# 如果是多单
                    position = i['Amount']    		# 赋值持仓数量为正数
                else:
                    position = -i['Amount']   		# 赋值持仓数量为负数
    return position  							# 返回持仓量

# 策略主函数
def onTick():
    exchange.SetContractType('IH000')   			# 订阅期货品种
    bars_arr = exchange.GetRecords()    			# 获取K线数组
    if len(bars_arr) < 10:              			# 如果K线数量小于10根
        return
    bar1 = bars_arr[-2]  						# 获取上一根K线数据
    bar2 = bars_arr[-3]  						# 获取前一根K线数据
    mov_mid = (bar1['High'] + bar1['Low'])/2-(bar2['High'] + bar2['Low'])/2
    if bar1['High'] != bar1['Low']:  			# 如果被除数不为0
        ratio = (bar1['Volume'] / 10000) / (bar1['High'] - bar1['Low'])
    else:
        ratio = 0
    if ratio > 0:								# 如果ratio的值大于0
        emv = mov_mid / ratio
    else:
        emv = 0
    current_price = bars_arr[-1]['Close']  		# 最新价格
    position = get_position()              		# 获取最新持仓量
    if position > 0:   							# 如果持有多单
        if emv < 0:    							# 如果当前价格小于牙齿
            exchange.SetDirection("closebuy")  	# 设置交易方向和类型
            exchange.Sell(round(current_price - 1, 2), 1)  # 平多单
    if position < 0:   							# 如果持有空单
        if emv > 0:    							# 如果当前价格大于牙齿
            exchange.SetDirection("closesell")	# 设置交易方向和类型
            exchange.Buy(round(current_price + 0.8, 2), 1)   # 平空单
    if position == 0:  							# 如果无持仓
        if emv > 0:    							# 如果当前价格大于上唇
            exchange.SetDirection("buy")         	# 设置交易方向和类型
            exchange.Buy(round(current_price + 0.8, 2), 1)   # 开多单
        if emv < 0:   							# 如果当前价格小于下巴
            exchange.SetDirection("sell")        	# 设置交易方向和类型
            exchange.Sell(round(current_price - 1, 2), 1)  # 开空单

# 程序入口函数
def main():
    while True:      # 循环
        onTick()     # 执行策略主函数
        Sleep(1000)  # 休眠1秒
```

> 策略出处

https://www.fmz.com/strategy/213636

> 更新时间

2020-11-18 11:18:44
