
> 策略名称

利用平均趋向指数辅助MACD策略

> 策略作者

扫地僧

> 策略描述

#### 前言
“趋势是你的朋友”这是每一个交易者都耳熟能详的箴言。但做过交易的朋友可能会有体会，趋势总是在毫无预警地开始并突然结束。那么在CTA策略中，如何抓住趋势并过滤震荡行情，是许多主观和量化交易者孜孜不倦的追求。在本节课程中，我们将以平均趋向指数(ADX)为滤网，分析在它量化交易中的应用。

#### 什么是平均趋向指数
平均趋向指数是衡量趋势的技术工具，简称ADX(average directional indicator)，它是由韦尔斯·怀尔德在1978年提出，与其他技术分析工具不同的是，ADX并不能判断多空方向，更不能提示精确的买卖点位，它只是衡量当前趋势的强弱。

 ![IMG](https://www.fmz.cn/upload/asset/3a16876eeada296c97e1.png) 

ADX的默认周期参数是14，通常在K线图的副图中显示。它的值是在0~100之间，数值越大说明上涨或下跌趋势越强力，通常当ADX的值大于40时，说明趋势强力，此时使用趋势交易才具有最大的回报潜力；当ADX的值小于20时，说明趋势疲软，并警告交易者不要使用趋势跟踪交易策略。

#### ADX的计算方式
ADX的计算方式比较复杂，它涉及到了：价格正向移动距离(+DM)、价格负向移动距离(-DM)、真是波动幅度(TR)、正向方向性指数(+DI), 负向方向性指数(-DI)等很多中间变量：

**计算动向变化**
- up：今天的最高价 – 昨天的最高价
- down：昨天的最低价 – 今天的最低价
- +DM：如果up大于max(down, 0)，则+DM等于up，否则等于零
- -DM：如果down大于max(up, 0)，则-DM等于down，否则等于零

**计算真实波幅**
- TR：max(今天最高价与今天最低价的差值，今天最高价与昨天收盘价差值的绝对值，今天最低价与昨天收盘价差值的绝对值)

**计算动向指数**
- +DI(14)：+DM(14)/TR(14)*100
- -DI(14)：-DM(14)/TR(14)*100

**计算ADX**
- DX：((+DI14)- (-DI14)/(+DI14)+(-DI14))*100
- ADX：MA(DX，14)

虽然ADX的计算比较复杂，但其逻辑还是比较清晰的：up和down分别代表了价格正向和负向移动距离；+DI和-DI分别代表用波动率修正后上涨和下跌趋势。不管趋势是上涨还是下跌，只要存在明显的趋势行情，那么+DI和-DI中总有一个是较大的，因此DX的值会随着趋势的强弱指示在0~100之间；最后ADX则是DX的14天平均线。

当+ DI高于-DI时，表明价格处于上升趋势。 相反，当-DI高于+ DI时，价格处于下降趋势。 交易者可以通过检查同一时间点的ADX值来确定上升趋势或下降趋势的强度。

#### 策略逻辑
在前几节中，我们使用MACD指标创建了一个简单的策略，虽然该策略在趋势行情中表现还可以，但是在震荡行情入不敷出，甚至在长期的震荡行情中资金回撤比较大。因此我们将在本节中将之前的MACD策略加入ADX滤网，我们来看下效果到底如何？

**原策略逻辑**
- 多头开仓：DIF大于零轴
- 空头开仓：DIF小于零轴
- 多头平仓：DIF向下突破DEA
- 空头平仓：DIF向上突破DEA

**改进后的策略逻辑**
- 多头开仓：DIF大于零轴，并且ADX大于20
- 空头开仓：DIF小于零轴，并且ADX大于20
- 多头平仓：DIF向下突破DEA，或者ADX下降
- 空头平仓：DIF向上突破DEA，或者ADX下降

我们在原策略逻辑基础之上，对开仓和平仓分别加入ADX滤网，控制在行情进入震荡时期的开仓次数。在开仓的时候ADX的数值必须大于指定的数值；当开仓之后一旦ADX下降就平仓出局。整个策略逻辑就设计成一个严进宽出的模式，以此来控制震荡时期的回撤幅度。


#### 策略编写
**原始策略**
```
# 回测配置
'''backtest
start: 2015-02-22 00:00:00
end: 2019-10-17 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''


mp = 0  # 定义一个全局变量，用于控制虚拟持仓


# 判断数组是否上升
def is_up(arr):
    arr_len = len(arr)
    if arr[arr_len - 1] > arr[arr_len - 2] and arr[arr_len - 2] > arr[arr_len - 3]:
        return True     

    
# 判断数组是否下降
def is_down(arr):
    arr_len = len(arr)
    if arr[arr_len - 1] < arr[arr_len - 2] and arr[arr_len - 2] < arr[arr_len - 3]:
        return True

    
# 判断两根两个数组是否金叉
def is_up_cross(arr1, arr2):
    if arr1[len(arr1) - 2] < arr2[len(arr2) - 2] and arr1[len(arr1) - 1] > arr2[len(arr2) - 1]:
        return True

# 判断两根两个数组是否死叉
def is_down_cross(arr1, arr2):
    if arr1[len(arr1) - 2] > arr2[len(arr2) - 2] and arr1[len(arr1) - 1] < arr2[len(arr2) - 1]:
        return True    

    
# 程序主函数
def onTick():
    exchange.SetContractType("rb000")  # 订阅期货品种
    bar_arr = exchange.GetRecords()  # 获取K线数组
    if len(bar_arr) < long + m + 1:  # 如果K线数组长度太小，就不能计算MACD，所以直接返回跳过
        return
    all_macd = TA.MACD(bar_arr, short, long, m)  # 计算MACD值，返回的是一个二维数组
    dif = all_macd[0]  # 获取DIF的值，返回一个数组
    dif.pop()  # 删除DIF数组最后一个元素
    dea = all_macd[1]  # 获取DEA的值，返回一个数组
    dea.pop()  # 删除DEA数组最后一个元素
    last_close = bar_arr[len(bar_arr) - 1]['Close']  # 获取最新价格（卖价），用于开平仓
    global mp  # 全局变量，用于控制虚拟持仓
    
    # 开多单
    if mp == 0 and dif[len(dif) - 1] > 0:
        exchange.SetDirection("buy")  # 设置交易方向和类型
        exchange.Buy(last_close, 1)  # 开多单
        mp = 1  # 设置虚拟持仓的值，即有多单
    
    # 开空单
    if mp == 0 and dif[len(dif) - 1] < 0:
        exchange.SetDirection("sell")  # 设置交易方向和类型
        exchange.Sell(last_close - 1, 1)  # 开空单
        mp = -1  # 设置虚拟持仓的值，即有空单
        
    # 平多单
    if mp == 1 and is_down_cross(dif, dea):
        exchange.SetDirection("closebuy")  # 设置交易方向和类型
        exchange.Sell(last_close - 1, 1)  # 平多单
        mp = 0  # 设置虚拟持仓的值，即空仓
    
    # 平空单
    if mp == -1 and is_up_cross(dif, dea):
        exchange.SetDirection("closesell")  # 设置交易方向和类型
        exchange.Buy(last_close, 1)  # 平空单
        mp = 0  # 设置虚拟持仓的值，即空仓

        
def main():
    while True:
        onTick()
        Sleep(1000)
```

根据上面更改的策略逻辑，我们可以直接在原始策略的基础之上把ADX滤网加入进去，虽然ADX的计算方法比较复杂，但可以借助talib库只需要几行代码就可以把ADX的值计算出来。因为计算ADX需要用带talib，而计算talib库又需要用到numpy.array数据类型，所以我们需要在代码开头导入talib库和numpy库。
```
import talib
import numpy as np
```

在使用talib库计算ADX的时候，一共需要4个参数：最高价、最低价、收盘价、周期参数。所以我们还需要写一个get_data函数，这个函数的目的是从K线数组中提取出最高价、最低价、收盘价。
```
# 把K线数组转换成最高价、最低价、收盘价数组，用于转换为numpy.array类型数据
def get_data(bars):
    arr = [[], [], []]
    for i in bars:
        arr[0].append(i['High'])
        arr[1].append(i['Low'])
        arr[2].append(i['Close'])
    return arr
```

然后我们使用numpy库把普通的数组转换为numpy.array类型数据，最后使用talib库就可以计算出ADX的值，具体的写法可以看下面代码中的注释：
```
np_arr = np.array(get_data(bar_arr)) # 把列表转换为numpy.array类型数据，用于计算ADX的值
adx = talib.ADX(np_arr[0], np_arr[1], np_arr[2], 20);  # 计算ADX的值
```

在策略逻辑中，需要判断ADX的大小和是否上升下降。判断大小很简单，只需要把ADX具体某一天的值提取出来就可以了，跟判断MACD一样，我们只取倒数第二根K线的ADX值；但判断时候上升下降则需要只取倒数第二根和第三根K线的ADX值。
```
adx1 = adx_arr[len(adx_arr) - 2]  # 倒数第二根K线的ADX值
adx2 = adx_arr[len(adx_arr) - 3]  # 倒数第三根K线的ADX值
```

最后修改下单逻辑：
```
# 开多单
if mp == 0 and dif[len(dif) - 1] > 0 and adx1 > 40:
    exchange.SetDirection("buy")  # 设置交易方向和类型
    exchange.Buy(last_close, 1)  # 开多单
    mp = 1  # 设置虚拟持仓的值，即有多单

# 开空单
if mp == 0 and dif[len(dif) - 1] < 0 and adx1 > 40:
    exchange.SetDirection("sell")  # 设置交易方向和类型
    exchange.Sell(last_close - 1, 1)  # 开空单
    mp = -1  # 设置虚拟持仓的值，即有空单
    
# 平多单
if mp == 1 and (is_down_cross(dif, dea) or adx1 < adx2):
    exchange.SetDirection("closebuy")  # 设置交易方向和类型
    exchange.Sell(last_close - 1, 1)  # 平多单
    mp = 0  # 设置虚拟持仓的值，即空仓

# 平空单
if mp == -1 and (is_up_cross(dif, dea) or adx1 < adx2):
    exchange.SetDirection("closesell")  # 设置交易方向和类型
    exchange.Buy(last_close, 1)  # 平空单
    mp = 0  # 设置虚拟持仓的值，即空仓
```

#### 结尾
之前流行过一段话：站在风口猪都会飞，我们做交易也是一样。在大趋势面前，再笨的策略也能分一杯羹，所以我们要做的就是抓住大趋势并在震荡时期控制回撤。ADX与MACD配合使用，可以帮助交易者确认差异，从而提高交易的精度。可以在震荡行情中降低风险，又可以在趋势行情中增加你的盈利潜力，以达到最大限度地降低风险并最大化利润的目的。一句话：要想赚大钱，就一定不要与趋势为敌！

> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|5|short|
|long|50|long|
|m|15|m|


> 源码 (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

# 导入库
import talib
import numpy as np

mp = 0  # 定义一个全局变量，用于控制虚拟持仓

# 把K线数组转换成最高价、最低价、收盘价数组，用于转换为numpy.array类型数据
def get_data(bars):
    arr = [[], [], []]
    for i in bars:
        arr[0].append(i['High'])
        arr[1].append(i['Low'])
        arr[2].append(i['Close'])
    return arr

# 程序主函数
def onTick():
    _C(exchange.SetContractType, "FG000")	# 订阅期货品种
    bar = _C(exchange.GetRecords)  	# 获取K线数组
    if len(bar) < 100:		# 如果K线数组长度太小，就直接返回跳过
        return
    macd = TA.MACD(bar, 5, 50, 15)  		# 计算MACD值
    dif = macd[0][-2]  					# 获取DIF的值，返回一个数组
    dea = macd[1][-2]  					# 获取DEA的值，返回一个数组
    np_arr = np.array(get_data(bar)) # 把列表转换为numpy.array类型数据，用于计算ADX的值
    adx_arr = talib.ADX(np_arr[0], np_arr[1], np_arr[2], 14)  # 计算ADX的值
    adx1 = adx_arr[-2]  # 倒数第二根K线的ADX值
    adx2 = adx_arr[-3]  # 倒数第三根K线的ADX值
    last_close = bar[-1]['Close']		# 获取最新价格（卖价）
    global mp  							# 全局变量，用于控制虚拟持仓
    if mp == 1 and dif < dea:
        exchange.SetDirection("closebuy")	# 设置交易方向和类型
        exchange.Sell(last_close - 1, 1) 	# 平多单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == -1 and dif > dea:
        exchange.SetDirection("closesell")  	# 设置交易方向和类型
        exchange.Buy(last_close, 1)  		# 平空单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == 0 and dif > dea and adx1 > adx2:
        exchange.SetDirection("buy")  		# 设置交易方向和类型
        exchange.Buy(last_close, 1)  		# 开多单
        mp = 1  								# 设置虚拟持仓的值，即有多单
    if mp == 0 and dif < dea and adx1 > adx2:
        exchange.SetDirection("sell")  		# 设置交易方向和类型
        exchange.Sell(last_close - 1, 1)		# 开空单
        mp = -1  								# 设置虚拟持仓的值，即有空单
        
def main():
    while True:
        onTick()
        Sleep(1000)
```

> 策略出处

https://www.fmz.cn/strategy/174672

> 更新时间

2021-11-11 09:55:42
