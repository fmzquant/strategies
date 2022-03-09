
> 策略名称

Hans123日内突破策略

> 策略作者

扫地僧

> 策略描述

#### **前言**
HANS123策略最早主要应用于外汇市场，其交易方式比较简单，属于趋势突破系统，这种交易方式可以在趋势形成的第一时间入场，因此得到很多交易员的青睐，迄今为止HANS123已经扩展了许多版本，今天我们就一起来认识HANS123策略。
 ![IMG](https://www.fmz.cn/upload/asset/39c851b8c0d900592bc9.png) 

#### **策略原理**
有的人认为，上午开盘是市场分歧最大的时候，很容易出现价格走势方向不明，宽幅震荡的情况。经过30分钟左右的时间，市场充分消化完各种隔夜信息，价格走势将趋于理性回归正常。也就是说：前30分钟左右的行情走势，基本上构成了今天整体的交易格局。

- 上轨：开盘30分钟内最高价
- 下轨：开盘30分钟内最低价

此时产生的相对高低点，就形成道氏理论中所说的有效高低点，HANS123策略就是以此建立的交易逻辑。在国内期货市场上，上午09:00开盘，09:30就可以判断今天究竟是做多还是做空。当价格向上突破高点时，价格很容易继续上升；价格向下突破低点时，价格很容易继续下跌。

- 多头开仓：当前无持仓，并且价格向上突破上轨
- 空头开仓：当前无持仓，并且价格向下突破下轨

虽然突破策略能在趋势形成时，第一时间入场。但这个优势也是把双刃剑，入场灵敏导致的结果就是，价格突破失败。所以设置止损是非常有必要的。同时为了达到赢冲输缩的策略逻辑，也要设置止盈。

- 多头止损：当前持多单，达到亏损金额
- 空头止损：当前持空单，达到亏损金额
- 多头止盈，当前持多单，达到盈利金额
- 空头止盈，当前持空单，达到盈利金额

#### **策略编写**
依次打开：fmz.com网站 > 登录 > 控制中心 > 策略库 > 新建策略 > 点击右上角下拉菜单选择Python语言，开始编写策略，注意看下面代码中的注释。

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
编写策略框架，这个在之前的章节已经学习过，一个是onTick函数，另一个是main函数，其中在main函数中无限循环执行onTick函数。

**第2步：定义全局变量**
```
up_line = 0  # 上轨
down_line = 0  # 下轨
trade_count = 0  # 当天交易次数
```
因为上轨和下轨只是在09:30这个时间点才统计计算，其余时间不做统计，所以我们需要把这两个变量写到循环的外面。另外为了在日内交易中限制交易次数，也把trade_count变量写到循环外面。在onTick策略主函数内使用这两个全局变量之前，需要使用global关键字引用。

**第3步：获取数据**
```
exchange.SetContractType("rb888")  # 订阅期货品种
bar_arr = _C(exchange.GetRecords, PERIOD_M1)  # 获取1分钟K线数组
current_close = bar_arr[-1]['Close']  # 获取最新价格
if len(bar_arr) < 50:  # 如果小于50根K线
    return  # 返回继续等待数据
```
要想获取数据，首先要使用发明者量化API中的SetContractType函数订阅期货品种，然后使用GetRecords函数获取K线数组，也可以在使用GetRecords函数时传入指定PERIOD_M11分钟的K线数组。

紧接着就是获取最新的价格，用来判断当前价格与上下轨之间的位置关系，同时在下单交易使用Buy或Sell函数时，需要传入指定的价格。另外别忘了过滤K线数量，因为如果K线过少，就会出现无法计算指标报错。

**第4步：处理时间函数**
```
def current_time():
    current_time = bar_arr[-1]['Time']  # 获取当前K线时间戳
    time_local = time.localtime(current_time / 1000)  # 处理时间戳
    hour = time.strftime("%H", time_local)  # 格式化时间戳，并获取小时
    minute = time.strftime("%M", time_local)  # 格式化时间戳，并获取分钟
    if len(minute) == 1:
        minute = "0" + minute
    return int(hour + minute)
```
在计算上下轨和下单交易时，需要判断当前的时间是否符合我们指定的交易时间，所以为了方便判断，我们需要处理一下当前K线的具体小时数和分钟数。

**第5步：计算上下轨**
```
global up_line, down_line, trade_count  # 引入全局变量
current_time = current_time()  # 处理时间
if current_time == 930:  # 如果最新的K线时间是09:30
    up_line = TA.Highest(bar_arr, 30, 'High') + count  # 前30根K线最高价
    down_line = TA.Lowest(bar_arr, 30, 'Low') - count  # 前30根K线最低价
    trade_count = 0  # 重置交易次数为0
```
要计算上下轨，首先要引入我们之前定义的全局变量，使用global关键字即可。想象一下我们需要计算的是09:00~09:30之间的最高价和最低价，因为我们是使用1分钟的K线数据，也就是说当时间为09:30的时候，刚好有30根K线，那么我们直接计算这30根K线的最高价和最低价就可以了。

**第6步：获取持仓**
```
position_arr = _C(exchange.GetPosition)  # 获取持仓数组
if len(position_arr) > 0:  # 如果持仓数组长度大于0
    position_arr = position_arr[0]  # 获取持仓字典数据
    if position_arr['ContractType'] == 'rb888':  # 如果持仓品种等于订阅品种
        if position_arr['Type'] % 2 == 0:  # 如果是多单
            position = position_arr['Amount']  # 赋值持仓数量为正数
        else:
            position = -position_arr['Amount']  # 赋值持仓数量为负数
        profit = position_arr['Profit']  # 获取持仓盈亏
else:
    position = 0  # 赋值持仓数量为0
    profit = 0  # 赋值持仓盈亏为0
```
持仓状态牵涉到策略逻辑，我们前十节课程一直都是使用虚拟持仓，但在真实的交易环境中最好是使用GetPosition函数，获取真实的持仓信息，包括：持仓方向、持仓盈亏、持仓数量等等。

**第7步：下单交易**
```
# 如果临近收盘或者达到止盈止损
if current_time > 1450 or profit > stop * 3 or profit < -stop:
    if position > 0:  # 如果持多单
        exchange.SetDirection("closebuy")  # 设置交易方向和类型
        exchange.Sell(current_close - 1, 1)  # 平多单
    elif position < 0:  # 如果持空单
        exchange.SetDirection("closesell")  # 设置交易方向和类型
        exchange.Buy(current_close + 1, 1)  # 平空单
# 如果当前无持仓，并且小于指定交易次数，并且在指定交易时间内
if position == 0 and trade_count < 2 and 930 < current_time < 1450:
    if current_close > up_line:  # 如果价格大于上轨
        exchange.SetDirection("buy")  # 设置交易方向和类型
        exchange.Buy(current_close + 1, 1)  # 开多单
        trade_count = trade_count + 1  # 交易次数加一次
    elif current_close < down_line:  # 如果价格小于下轨
        exchange.SetDirection("sell")  # 设置交易方向和类型
        exchange.Sell(current_close - 1, 1)  # 开空单
        trade_count = trade_count + 1  # 交易次数加一次
```
为了避免策略出现逻辑错误，最好是将平仓逻辑写到开仓逻辑的前面。在这个策略中，开仓时首先要判断当前的持仓状态、是否在指定的交易时间内，然后再判断当前价格与上下轨之间的关系。平仓则是先判断是否接近尾盘，或者是否达到止盈止损条件。


HANS123是一种非常典型且非常有效的自动化交易策略,它的基本原理是开盘一定时间内突破前一个市场的最高价或最低价顺势做多或做空,经过对止损止盈等参数的优化这套系统可以应用到几乎所有的外汇品种中并且盈利稳定。这也是一种入场较早的交易模式，配合适当过滤技术，或可提高其胜算。


#### **结尾**
以上就是HANS123策略原理和代码解析，实际上HANS123策略提供了一个较好的入场时机，出场时机你也可以根据自己对市场的认知和对交易的理解加以改进，或者也可以根据品种波动率来优化止盈止损等参数，以达到更好的效果。







> 策略参数



|参数|默认值|描述|
|----|----|----|
|test|100|test|


> 源码 (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 5m
basePeriod: 5m
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

https://www.fmz.cn/strategy/179805

> 更新时间

2021-10-26 16:33:16
