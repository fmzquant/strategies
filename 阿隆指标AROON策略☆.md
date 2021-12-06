
> 策略名称

阿隆指标AROON策略☆

> 策略作者

程文

> 策略描述

#### 摘要
在技术分析中阿隆（Aroon）是一个很独特的技术指标，“Aroon”一词来自梵文，寓意为“黎明曙光”。它不像MA、MACD、KDJ那样广为人所熟悉，它推出的时间更晚，直到1995年才被图莎尔·钱德（Tushar Chande）发明出来，作者还发明了钱德动量摆动指标（CMO）和日内动量指数（IMI）。如果说一个技术指标知道的人越多，使用的人也越多，那么其赚钱能力也越低，那么相对新颖的阿隆指标则恰恰相反，站在这个角度看这是一个不错的选择。

#### 阿隆指标简介
阿隆指标通过计算当前K线距离前最高价和最低价之间的K线数量，来帮助交易者预测价格走势与趋势区域的相对位置关系变化。它有两部分组成，即：阿隆上线（AroonUp）和阿隆下线（AroonDown），这两条线在0~100之间上下移动，虽然命名为上线和下线，但从图表上看并不像BOLL指标那样是真正意义上的上线和下线。如下图就是阿隆指标：
 ![IMG](https://www.fmz.cn/upload/asset/395e684439e985c06748.png) 
#### 阿隆指标的计算方法
阿隆指标要求首先要设置一个时间周期参数，就像设置均线周期参数一样，在传统行情软件中，这个周期数是14，当然这个周期参数并不是固定的，你还可以设置为10或者50等等。为了方便理解，暂且把这个时间周期参数定义为：N。确定N之后，我们就可以计算出阿隆上线（AroonUp）和阿隆下线（AroonDown），具体的计算公式如下：

- 阿隆上线= [ ( 设置的周期参数 - 最高价后的周期数 ) / 计算的周期数 ] * 100
- 阿隆下线= [ ( 设置的周期参数 - 最低价后的周期数 ) / 计算的周期数 ] * 100

从这个公式中，我们就能大致看出，阿隆指标的思想。那就是：有多少个周期，价格在近期高 / 低点之下，辅助预测当前趋势是否会延续，同时衡量当前趋势的强弱。如果我们把这个指标归类的话，很明显它是属于趋势跟踪类型。但是与其他趋势跟踪型指标不同的是，它更重视时间而不是价格。

#### 如何使用阿隆指标
阿隆上线（AroonUp）和阿隆下线（AroonDown）反映的是当前时间与之前最高价或最低价的远近，如果时间越近值就越大，如果时间越远值就越小。并且当两条线发生交叉就预示着价格方向可能会发生改变，如果AroonUp在AroonDown之上说明价格处于上涨趋势，未来价格可能会进一步上涨；如果AroonDown在AroonUp之上说明价格处于下跌趋势，未来价格可能会进一步下跌。

同时我们还可以设置几个固定的值，来精确入场时机。我们知道阿隆指标是一直在0~100之间上下运行，那么在市场处于上涨趋势，也就是AroonUp在AroonDown之上时，当AroonUp大于50，说明市场上涨的趋势已经形成，未来价格可能会继续上涨；当AroonUp下穿50时，说明价格上涨的动力正在减弱，未来价格可能会震荡和下跌。

反之在市场处于下跌趋势，也就是AroonDown在AroonUp之上时，当AroonDown大于50，说明市场下跌趋势已经形成，未来价格可能会继续下跌；当AroonDown下穿50时，说明价格下跌的动力正在减弱，未来价格可能会震荡和上涨。那么根据上面两段理论，我们可以把买卖条件罗列为：

- 当 AroonUp大于AroonDown，并且AroonUp大于50，多头开仓；
- 当 AroonUp小于AroonDown，或者AroonUp小于50，多头平仓；
- 当 AroonDown大于AroonUp，并且AroonDown大于50，空头开仓；
- 当 AroonDown小于AroonUp，或者AroonDown小于50，空头平仓；

#### 基于阿隆指标构建交易策略
理清交易逻辑后，我们就可以用代码去实现了，依次打开：fmz.cn > 登录 > 控制中心 > 策略库 > 新建策略 > 点击右上角下拉菜单选择Python语言，开始编写策略，注意看下面代码中的注释。

**第一步：编写策略框架**
我们知道在量化交易中，程序是不断获取数据、处理数据、下单交易这样的循环过程，所以我们继续使用之前讲过的main函数和onTick函数，其中在main函数中无限循环执行onTick函数。如下:
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

**第二步：导入库**
另外，在计算AROON时，需要用到talib库，我们直接用import一行代码导入。因为在使用talib计算时，必须先把数据处理成numpy.array类型，所以也到导入numpy库。
```
import talib
import numpy as np
```

**第三步：定义虚拟持仓变量**
量化交易中判断持仓分为两种，一种是真实的账户持仓，另一种就是虚拟持仓，还有一种是真实持仓和虚拟持仓联合判断。实盘时我们只使用真实持仓就足够了，但这里为了简化策略，作为演示使用虚拟持仓。
```
mp = 0  # 用于控制虚拟持仓
```

使用虚拟持仓的原理很简单，策略运行之初默认是空仓mp=0，当开多单后把虚拟持仓重置为mp=1，当开空单后把虚拟持仓重置为，mp=-1，当平多单或空单后把虚拟持仓重置为mp=0。这样我们在判断构建逻辑获取仓位时，只需要判断mp的值就可以了。

**第四步：计算阿隆指标**
计算阿隆指标，首先要获取基础数据，但前提是先要订阅数据，也就是订阅具体的合约代码，你可以订阅指数或者主力连续，甚至还可以订阅具体交割月份的合约代码。然后是获取K线数组，K线数组是一个包含开高低收、成交量和时间的序列数据，同时也是计算大部分指标的基础数据。

在获取K线数组之后，紧接着就需要判断一下K线数组的长度，因为如果K线数组太短，不足以计算指标时就会出现异常。所以我们在这里使用if语句，判断如果K线数组小于指标参数时，就直接返回。

在使用talib计算指标时，它所传入的参数是numpy.array类型数据，所以还要把K线数组中的必要数据提取出来，并转换成numpy.array类型数据。这里我们自定义一个get_data函数，先别必要的数据提取出来。
```
# 把K线数组转换成最高价和最低价数组，用于转换为numpy.array类型数据
def get_data(bars):
    arr = [[], []]
    for i in bars:
        arr[0].append(i['High'])
        arr[1].append(i['Low'])
    return arr
    
    
exchange.SetContractType("ZC000")  # 订阅期货品种
bars = exchange.GetRecords()  # 获取K线数组
if len(bars) < cycle_length + 1:  # 如果K线数组的长度太小，所以直接返回
    return
np_arr = np.array(get_data(bars)) # 把列表转换为numpy.array类型数据，用于计算AROON的值
aroon = talib.AROON(np_arr[0], np_arr[1], 20);  # 计算阿隆指标
aroon_up = aroon[1][len(aroon[1]) - 2];  # 阿隆指标上线倒数第2根数据
aroon_down = aroon[0][len(aroon[0]) - 2];  # 阿隆指标下线倒数第2根数据
```

talib在计算阿隆指标时，需要三个参数，依次是：最高价numpy.array类型数据、最低价numpy.array类型数据、时间周期。所以我们在自定义get_data函数中只需要把K线数组中的最高价和最低价提取出来就可以了，并把它们都转换成numpy.array类型数据。

紧接着，就可以计算阿隆指标了，直接调用talib.AROON方法并传入参数。计算后的阿隆指标是一个二维数组，所以我们分别把阿隆指标上线和下线分别提取出来，以便于判断开平仓逻辑。

**第五步：下单交易**
在下单交易之前，我们要先获取当前最新价格，因为在下单时需要在函数中传入下单价格。还需要引入全局变量mp，主要用于控制虚拟仓位。
```
close0 = bars[len(bars) - 1].Close;  # 获取当根K线收盘价
global mp  # 全局变量，用于控制虚拟仓位
if mp == 0 and  aroon_up > aroon_down and aroon_up > 50:  # 如果当前空仓，并且阿隆上线大于下线，并且阿隆上线大于50
    exchange.SetDirection("buy")  # 设置交易方向和类型
    exchange.Buy(close0, 1)  # 开多单
    mp = 1  # 设置虚拟持仓的值，即有多单
    
if mp == 0 and aroon_down > aroon_up and aroon_down > 50:  # 如果当前空仓，并且阿隆下线大于上线，并且阿隆下线小于50
    exchange.SetDirection("sell")  # 设置交易方向和类型
    exchange.Sell(close0 - 1, 1)  # 开空单
    mp = -1  # 设置虚拟持仓的值，即有空单
    
if mp > 0 and  (aroon_up < aroon_down or aroon_up < 50):  # 如果当前持有多单，并且阿隆上线小于下线或者阿隆上线小于50
    exchange.SetDirection("closebuy")  # 设置交易方向和类型
    exchange.Sell(close0 - 1, 1)  # 平多单
    mp = 0  # 设置虚拟持仓的值，即空仓
    
if mp < 0 and (aroon_down < aroon_up or aroon_down < 50):  # 如果当前持有空单，并且阿隆下线小于上线或者阿隆下线小于50
    exchange.SetDirection("closesell")  # 设置交易方向和类型
    exchange.Buy(close0, 1)  # 平空单
    mp = 0  # 设置虚拟持仓的值，即空仓
```

万事俱备之后，就可以判断策略逻辑并开平仓下单交易了。在判断策略逻辑时肯定是使用if语句，先判断mp的持仓状态，然后再判断阿隆上线和下线的相互位置关系。需要注意的是在期货交易下单之前，先指定交易的方向类型，即：开多、开空、平多、平空。调用exchange.SetDirection()函数，分别传入：“buy”、“sell”、“closebuy”、“closesell”。最后下单之后重置持仓状态mp的值。

#### 阿隆指标的优缺点
优点：阿隆指标可以判断趋势行情的状态，兼顾发现市场趋势行情以及判断价格转向的能力，帮助交易者提高资金的使用率，这个优势震荡行情中尤为重要。

缺点：阿隆指标只是趋势跟踪系列指标中的一种，同样也有趋势跟踪指标的缺点。并且它只判断指定时间最高价或最低价的周期数，但有时候最高价或最低价在整个行情走势中会有偶然性，这个偶然性会干扰阿隆指标本身，造成虚假信号。


#### 总结
在策略中我们固定了一部分参数，如：aroonUp或aroonDown大于小于50，造成策略的滞后性，很多情况下是行情上涨或下跌一段时间才开平仓买卖。这样虽然提高了胜率，减少了最大回撤率，但也错过了很多收益，这也印证了盈亏同源的道理。有兴趣的朋友可以深入研究一下，并加以改进。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|cycle_length|20|cycle_length|


> 源码 (python)

``` python
import talib
import numpy as np

# 外部参数
# cycle_length = 100

# 定义全局变量
mp = 0	# 用于控制虚拟持仓

# 把K线数组转换成最高价和最低价数组，用于转换为numpy.array类型数据
def get_data(bars):
    arr = [[], []]
    for i in bars:
        arr[0].append(i['High'])
        arr[1].append(i['Low'])
    return arr


# 策略主函数
def onTick():
    exchange.SetContractType("ZC000")  	# 订阅期货品种
    bars = exchange.GetRecords()  		# 获取K线数组
    if len(bars) < cycle_length + 1:  	# 如果K线数组的长度太小，所以直接返回
        return
    np_arr = np.array(get_data(bars))	# 把列表转换为numpy.array类型数据
    aroon = talib.AROON(np_arr[0], np_arr[1], 20)	# 计算阿隆指标
    aroon_up = aroon[1][len(aroon[1]) - 2]  		# 阿隆上线倒数第2根数据
    aroon_down = aroon[0][len(aroon[0]) - 2]  		# 阿隆下线倒数第2根数据
    close0 = bars[len(bars) - 1].Close  			# 获取当根K线收盘价
    global mp  										# 全局变量，虚拟仓位
# 如果当前空仓，并且阿隆上线大于下线，并且阿隆上线大于50
    if mp == 0 and  aroon_up > aroon_down and aroon_up > 50:
        exchange.SetDirection("buy")  				# 设置交易方向和类型
        exchange.Buy(close0, 1)  					# 开多单
        mp = 1  										# 设置虚拟持仓的值为有多单
    # 如果当前空仓，并且阿隆下线大于上线，并且阿隆下线小于50
    if mp == 0 and aroon_down > aroon_up and aroon_down > 50:  
        exchange.SetDirection("sell")  				# 设置交易方向和类型
        exchange.Sell(close0 - 1, 1)  				# 开空单
        mp = -1  										# 设置虚拟持仓的值为有空单
    # 如果当前持有多单，并且阿隆上线小于下线或者阿隆上线小于50
    if mp > 0 and  (aroon_up < aroon_down or aroon_up < 50):  
        exchange.SetDirection("closebuy")  			# 设置交易方向和类型
        exchange.Sell(close0 - 1, 1)  				# 平多单
        mp = 0  										# 设置虚拟持仓的值，即空仓
    # 如果当前持有空单，并且阿隆下线小于上线或者阿隆下线小于50
    if mp < 0 and (aroon_down < aroon_up or aroon_down < 50):  
        exchange.SetDirection("closesell")  			# 设置交易方向和类型
        exchange.Buy(close0, 1)  					# 平空单
        mp = 0  										# 设置虚拟持仓的值，即空仓
    
# 程序入口
def main():
    while True:  									# 进入无限循环模式
        onTick()  									# 执行策略主函数
        Sleep(1000)  									# 休眠1秒
```

> 策略出处

https://www.fmz.cn/strategy/173417

> 更新时间

2021-11-11 09:56:06
