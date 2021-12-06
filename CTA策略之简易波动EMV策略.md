
> 策略名称

CTA策略之简易波动EMV策略

> 策略作者

程文

> 策略描述

#### 一、摘要
与其他技术指标不同，简易波动（Ease of Movement Value）反映的是价格、成交量、人气的变化，它是一种将价格与成交量变化相结合的技术，它通过衡量单位成交量的价格变动，形成一个价格波动指标。当市场人气聚集，交易活跃时提示买入信号；当成交量低迷，市场能量即将耗尽时提示卖出信号。

简易波动EMV根据等量图和压缩图的原理设计而成，它的核心理念是：市场价格仅在发生趋势转折或即将转折时，才会消耗大量能量，外在表现就是成交量变大。当价格在上升的过程中，由于推波助澜的作用，不会消耗太多的能量。虽然这个理念与量价同升的观点相悖，但的确有其独特的地方。


#### 二、EMV计算公式
**第一步：计算mov_mid**
其中TH代表当天最高价，TL代表当天最低价，YH代表前日最高价，YL代表前日最低价。那么如果MID > 0意味着今天的平均价高于昨天的平均价。
 ![IMG](https://www.fmz.cn/upload/asset/399847709b43ab8f26a3.png) 
**第二步：计算ratio**
其中TVOL代表当天交易量，TH代表当天最高价，TL代表当天最低价。
 ![IMG](https://www.fmz.cn/upload/asset/39ea4592e02efc0d77f7.png) 
**第三步：计算emv**
 ![IMG](https://www.fmz.cn/upload/asset/39a703e15cec3e690cf6.png) 

#### 三、EMV用法
EMV的作者认为，巨量上涨伴随的是能量的快速枯竭，上涨往往不会持续太久；反而温和的成交量，能够保存一定的能量，往往使上涨持续更久。一旦上涨趋势形成，较少的成交量就能推动价格上涨，EMV的数值就会升高。一旦下跌趋势行情形成，往往伴随的是无量或少量下跌，EMV的数值就会下降。如果价格处于震荡行情或者价格上涨和下跌都伴随较大成交量时，EMV的数值也会接近于零。因此你会发现，EMV在大部分行情中都处于零轴下方，这也是这个指标的一大特色。站在另一个角度看，EMV重视大趋势且能够产生足够利润的行情。

EMV的用法相当简单，只要看EMV是否穿越零轴即可，当EMV在0以下时，代表市场弱市；当EMV在0以上时，代表市场强市。让EMV由负数转为正数时应该买进；当EMV由正数转为负数时应该卖出。其特点是不仅能较好的避免市场中的震荡行情，而且还能在趋势行情启动的时候及时入场。但由于EMV反映的是价格在变动时的成交量的变化情况，所以仅对中长期走势有作用。对于短线或交易周期比较小的行情EMV的效果很差。

#### 四、策略实现
**第1步：编写策略框架**
```
# 策略主函数
def onTick():
    pass


# 程序入口
def main():
    while True:  # 进入无限循环模式
        onTick()  # 执行策略主函数
        Sleep(1000)  # 休眠1秒
```
发明者量化(FMZ.COM)采用轮训模式，首先需要定义一个main函数和一个onTick函数，main函数是策略的入口函数，程序会从main函数开始逐行执行代码。在main函数中，写入while循环，重复执行onTick函数，所有的策略核心代码都写在onTick函数中。

**第2步：获取持仓数据**
```
def get_position():
    position = 0                              # 赋值持仓数量为0
    position_arr = _C(exchange.GetPosition)   # 获取持仓数组
    if len(position_arr) > 0:                 # 如果持仓数组长度大于0
        for i in position_arr:                # 遍历持仓数组
            if i['ContractType'] == 'IH000':  # 如果持仓品种等于订阅品种
                if i['Type'] % 2 == 0:        # 如果是多单
                    position = i['Amount']    # 赋值持仓数量为正数
                else:
                    position = -i['Amount']   # 赋值持仓数量为负数
    return position  # 返回持仓量
```
因为在这个策略中，只使用了实时的持仓数量，为了方便维护，这里使用get_position封装了持仓量，如果当前持有多单就返回正数，如果当前持有空单就返回负数。

**第3步：获取K线数据**
```
exchange.SetContractType('IH000')   # 订阅期货品种
bars_arr = exchange.GetRecords()    # 获取K线数组
if len(bars_arr) < 10:              # 如果K线数量小于10根
    return
```
在获取具体的K线数据之前，首先要先订阅具体的合约，使用发明者量化的SetContractType函数，并传入合约代码即可，如果想知道该合约的其他信息，也可以使用一个变量来接收这个数据。接着使用GetRecords函数就可以获取K线数据，因为返回的是一个数组，所以我们使用变量bars_arr来接受它。

**第4步：计算emv**
```
bar1 = bars_arr[-2]  # 获取上一根K线数据
bar2 = bars_arr[-3]  # 获取前一根K线数据
# 计算mov_mid的值
mov_mid = (bar1['High'] + bar1['Low']) / 2 - (bar2['High'] + bar2['Low']) / 2
if bar1['High'] != bar1['Low']:  # 如果被除数不为0
    # 计算ratio的值
    ratio = (bar1['Volume'] / 10000) / (bar1['High'] - bar1['Low'])
else:
    ratio = 0
# 如果ratio的值大于0
if ratio > 0:
    emv = mov_mid / ratio
else:
    emv = 0
```
在这里我们并没有使用最新的价格来计算EMV的值，而是采用相对滞后的当前K线出信号，下根K线发单的方法。这么做的目的是让回测更接近于实盘交易。我们知道，尽管现在量化交易软件已经非常先进了，但还是很难做到完全模拟真实的实盘Tick环境，特别是面对回测Bar级超长数据时，所以就采用这个折中的方法。

**第5步：下单交易**
```
current_price = bars_arr[-1]['Close']  # 最新价格
position = get_position()              # 获取最新持仓量
if position > 0:   # 如果持有多单
    if emv < 0:    # 如果当前价格小于牙齿
        exchange.SetDirection("closebuy")    # 设置交易方向和类型
        exchange.Sell(round(current_price - 0.2, 2), 1)  # 平多单
if position < 0:   # 如果持有空单
    if emv > 0:    # 如果当前价格大于牙齿
        exchange.SetDirection("closesell")   # 设置交易方向和类型
        exchange.Buy(round(current_price + 0.2, 2), 1)   # 平空单
if position == 0:  # 如果无持仓
    if emv > 0:    # 如果当前价格大于上唇
        exchange.SetDirection("buy")         # 设置交易方向和类型
        exchange.Buy(round(current_price + 0.2, 2), 1)   # 开多单
    if emv < 0:    # 如果当前价格小于下巴
        exchange.SetDirection("sell")        # 设置交易方向和类型
        exchange.Sell(round(current_price - 0.2, 2), 1)  # 开空单
```
在下单交易之前，我们需要先确定两个数据，一个是下单的价格，另一个是当前的持仓状态。下单的价格很简单，直接使用当前的收盘价加减品种的最小变动价位即可。由于我们之前已经使用get_position函数封装了持仓量，所以这里直接调用即可。最后就是根据EMV与零轴的位置关系开平仓了。

#### 五、策略回测
**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/39c4770e20a6363e699f.png) 

**回测日志**
 ![IMG](https://www.fmz.cn/upload/asset/391451965dcb31f73815.png) 
 ![IMG](https://www.fmz.cn/upload/asset/3a00562784520d8904fc.png) 

**资金曲线**
 ![IMG](https://www.fmz.cn/upload/asset/3a02f62c4f927ac4805e.png) 

#### 六、总结
通过本节课程学习，可以看出EMV与普通交易者的看法相反，但却不无道理。由于EMV引入了成交量数据，因此比其他单纯用价格计算的技术指标，更能有效发现价格背后的东西。每一种策略都有着不同的特点，只有充分了解不同策略之间的优缺点，去其糟粕取其精华才能离成功更进一步。



> 源码 (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2020-01-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

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

https://www.fmz.cn/strategy/213636

> 更新时间

2021-10-26 15:56:56
