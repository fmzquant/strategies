
> Name

经典MACD交易策略

> Author

扫地僧

> Strategy Description

#### 摘要
在上节中，我们学习了卡夫曼均线的原理和计算方法 https://www.fmz.cn/digest-topic/4463 ，以及根据卡夫曼均线设计了一个简单的自适应动态双均线策略。本节我们将继续重温经典技术分析工具MACD，深度解析每一个计算步骤，以及如何用Python和talib库去实现它，并根据MACD比较常用的使用方法来构建策略。


#### MACD简介
相信做过交易的人对MACD都不陌生，这是一个非常古老的技术指标，它是由查拉尔·阿佩尔(Geral Appel)在上个世纪70年代发明的，全称指数平滑异同移动平均线。顾名思义这个指标是基于均线来对趋势进行判断。

 ![IMG](https://www.fmz.cn/upload/asset/3a1df4ab082bd983417b.png) 

在图形上看，MACD主要由黄白线和中间的红绿柱组成。白线叫做DIF，反映的是一段时间内价格的变化情况；黄线叫做DEA，它是DIF的均线，所以相对要平缓一些；而红绿柱叫做BAR柱，反映的是DIF与DEA两线之间的距离。三者合一就是所谓的MACD。


#### MACD原理
严格来讲MACD是均线的一个变种，其意义与均线基本相同，只是它在计算时赋予了权重，时间越近赋予权重越大。同时它在图形上展示时非常直观，观察起来也一目了然。最重要的是其巧妙的利用短期指数移动平均线与长期指数移动平均线之间的聚合与分离状况，来判断市场状态。

具体来说，它是运用快速和慢速移动平均线之差，并加以双重平滑运算得来。这样不仅去除了普通移动平均线频繁发出假信号的噪音，而且还保留了移动平均线判断趋势行情的效果。因此，MACD指标具有均线趋势性、稳定性、安定性等特点。具体来说就是：

第1步：先对杂乱的K线均值处理，即EMA12和EMA26。均线的优点是比较稳定，但缺点是比较滞后、频繁发出无效信号。EMA其实是另一种复杂均线。在EMA指标中，每天价格的权重系数以指数等比形式缩小。时间越靠近当今时刻，它的权重越大，说明EMA函数对近期的价格加强了权重比，更能及时反映近期价格波动情况。

第2步：为了解决滞后和频繁发出无效信号问题又不失稳定，对两根均线差值处理，即DIF。均线差值可以快速反映两根均线的相互关系，同时具有又稳又快的特点。DIF上升意味着什么？意味着短期成本的涨速高于长期成本的涨速，市场短期内资金买入的意愿更强。

第3步：重复第1步，对DIF均值处理，即DEA。

第4步：重复第2步，对DIF、DEA差值处理，即Histogram，也就是我们常说的红绿柱子。


#### MACD计算方法
第1步：计算EMA12和EMA26
- EMA12 = XAverage( Close, 12 )
- EMA26 = XAverage( Close, 26 )

第2步：计算 DIF
- DIF = EMA12 - EMA26

第3步：计算 DEA
- DEA = XAverage( DIF, 9 )

第4步：计算 Histogram
- Histogram = DIF - DEA


#### MACD使用方法
网上关于MACD的使用方法层出不穷，有利用DIF与DEA金叉死叉做趋势的、有结合价格看顶底背离做抄底的、也有辅助其他技术分析工具的等等......哪个对？没有哪个是对的，也没有哪个是错的。这些方法，只在特定的时间有效。量化交易的关键不是用了哪个万能指标，而是制定一个正期望值的交易策略，然后重复执行。

对于大部分交易者来说，做趋势策略要好过做震荡策略，因为容错率更低。所以主要是看DIF与零线的位置关系，或者是DIF与DEA的交叉状态，来判断价格走势。一般来说DIF大于0表示上涨，小于0表示下跌；或者当DIF向上突破DEA时，形成买入信号，当DIF向下突破DEA时，形成卖出信号。

但也有一部分人用红绿柱的高低，再结合价格走势判断MACD的顶背离和底背离，这是一种典型的抄底逃顶方法。正常情况下价格与MACD是趋于同向的，当价格上涨，MACD也跟着上涨。如果价格逐步下跌，但MACD并没有跟着下跌，甚至逐步上升，与价格走势背道而驰，形成底背离，这将预示着价格可能即将上涨。同理，如果价格逐步上涨，但MACD并没有跟着上涨，甚至逐步下跌，与价格走势形成顶背离，这将预示着价格可能会下跌。


#### MACD的有效性
值得注意的是，上面的几种方法，逻辑虽然是那么回事，但在实际使用时也有反复打脸的时候。为什么有时候会不灵呢？这里面有个悖论，大家试着想一下，如果MACD一直有效，那么大家都会来用，那么大家的买卖点位相似的。比如DIF向上突破DEA时是买入信号，大家都在买，谁会卖出呢？

所以，最终的结果将会是，MACD越有效，用的人也就越多，当越来越多人使用它的时候，它就会慢慢失效，直到大部分人都放弃使用它，它又重新变的有效。因为人才是金融市场的最终参与者，这既不像物理定律，也不是数学公式，这里面没有整齐划一的规律，这是人与人买卖博弈的最终结果。


#### MACD策略
所以，交易界有句谚语：大道至简。意思就是说：越是简单的东西，越没人信，用的人也就越少，其结果就是普适性就越强。比如：少吃多动至今仍然是减肥的成功秘诀，但真正做的人很少，因为大部分人不相信或者半信半疑没有坚持下来。那么今天我们就用最简单的方法构建一个MACD策略。
- 多头开仓：DIF大于零轴
- 空头开仓：DIF小于零轴
- 多头平仓：DIF向下突破DEA
- 空头平仓：DIF向上突破DEA

#### 策略构建
按照以上策略逻辑，开始用代码实现出来。依次打开：fmz.cn网站 > 登录 > 控制中心 > 策略库 > 新建策略 > 点击右上角下拉菜单选择Python语言，开始编写策略，注意看下面代码中的注释。

第1步：编写策略框架
这个在之前的章节已经学习过，一个是onTick函数，另一个是main函数，其中在main函数中无限循环执行onTick函数，如下：
```
def onTick():
    pass

        
def main():
    while True:
        onTick()
        Sleep(1000)
```
第2步：定义虚拟持仓变量
这个我们在之前已经讲过，它的作用主要是用来控制策略仓位。虚拟持仓编写简单，快速迭代策略更新，一般用于回测环境中，假设每一笔订单都完全成交，但在实际交易中常用的还是真实持仓。
```
mp = 0  # 定义一个全局变量，用于控制虚拟持仓
```
使用虚拟持仓的原理很简单，策略运行之初默认是空仓mp=0，当开多单后把虚拟持仓重置为mp=1，当开空单后把虚拟持仓重置为，mp=-1，当平多单或空单后把虚拟持仓重置为mp=0。这样我们在判断构建逻辑获取仓位时，只需要判断mp的值就可以了。

第3步：计算AMA
在之前的章节中，我们使用的talib计算一些指标，但在发明者量化软件中内置了很多常用的指标计算方法，无需导入第三方库重新计算。计算流程就是：订阅期货合约 >>> 获取K线数组 >>> 调用FMZ内置MACD函数。
```
exchange.SetContractType("rb000")  # 订阅期货品种
bar_arr = exchange.GetRecords()  # 获取K线数组
if len(bar_arr) < long + m + 1:  # 如果K线数组长度太小，就不能计算MACD，所以直接返回跳过
    return
all_macd = TA.MACD(bar_arr, short, long, m)  # 计算MACD值，返回的是一个二维数组
dif = all_macd[0]  # 获取DIF的值，返回一个数组
dif.pop()  # 删除DIF数组最后一个元素
dea = all_macd[1]  # 获取DEA的值，返回一个数组
dea.pop()  # 删除DEA数组最后一个元素
```
这里面有2点需要注意，第1点是在调用FMZ内置函数计算MACD之前，需要判断K线数组的长度，因为计算MACD需要有足够多的K线数据，所以我们用if语句如果K线数组长度太小，直接返回跳过。第2点是删除MACD数组的最后一位，这么做的原因是因为最新的价格是来回跳动的，MACD的值也跟着来回变化，可能在这一秒信号成立，下一秒信号就失效了。所以为了解决这个问题，折中的方法是在开平仓条件成立后，在下一根K线下单交易。

第4步：获取最新价格
```
last_close = bar_arr[len(bar_arr) - 1]['Close']  # 获取最新价格（卖价），用于开平仓
```

获取最新价格的目的是为了下单交易，在下单接口函数exchange.Buy()或exchange.Sell()中，需要有2个参数，第1个是下单价格，也就是说在开平仓时必须指定固定的价格，通过获取K线数组最后一个元素中的‘Close’就可以获取最新的价格（卖一价）。

第5步：下单交易
下单交易使用if语句，如果条件为真，就执行交易。在开平仓条件中我们先判断当前的持仓状态，然后再判断DIF与零轴的位置或DIF与DEA的交叉状态。同样的在下单交易之前也需要设置交易方向和类型，即：开多、开空、平多、平空。最后下单之后重置虚拟持仓的状态。
```
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
```

#### 结尾
通过本节学习，相信你已经对什么是MACD、MACD原理及计算方法有了了解，你可以参照本节中的代码，试着在FMZ中把策略临摹下来，或者你有更好的想法，可以结合本节所学的知识对策略加以升级改进。很开心能和大家分享对量化交易的心得。在接下来的章节中，我们将学习一个动态阶梯突破策略，拭目以待吧。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|short|5|short|
|long|50|long|
|m|15|m|


> Source (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

mp = 0  # 定义一个全局变量，用于控制虚拟持仓
    
# 程序主函数
def onTick():
    _C(exchange.SetContractType, "rb000")	# 订阅期货品种
    bar = _C(exchange.GetRecords)  	# 获取K线数组
    if len(bar) < 100:		# 如果K线数组长度太小，就直接返回跳过
        return
    macd = TA.MACD(bar, 5, 50, 15)  		# 计算MACD值
    dif = macd[0][-2]  					# 获取DIF的值
    dea = macd[1][-2]  					# 获取DEA的值
    depth = exchange.GetDepth()
    ask = depth['Asks'][0]['Price']
    bid = depth['Bids'][0]['Price']
    global mp  							# 全局变量，用于控制虚拟持仓
    if mp == 1 and dif < dea:
        Log('多平信号成立，挂单价格为：', bid)
        exchange.SetDirection("closebuy")	# 设置交易方向和类型
        id = exchange.Sell(bid, 1) 	# 平多单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == -1 and dif > dea:
        Log('空平信号成立，挂单价格为：', ask)
        exchange.SetDirection("closesell")  	# 设置交易方向和类型
        id = exchange.Buy(ask, 1)  		# 平空单
        mp = 0  								# 设置虚拟持仓的值，即空仓
    if mp == 0 and dif > dea:
        Log('多开信号成立，挂单价格为：', ask)
        exchange.SetDirection("buy")  		# 设置交易方向和类型
        id = exchange.Buy(ask, 1)  		# 开多单
        mp = 1  								# 设置虚拟持仓的值，即有多单
    if mp == 0 and dif < dea:
        Log('空开信号成立，挂单价格为：', bid)
        exchange.SetDirection("sell")  		# 设置交易方向和类型
        id = exchange.Sell(bid, 1)		# 开空单
        mp = -1  								# 设置虚拟持仓的值，即有空单
        
def main():
    while True:
        onTick()
        Sleep(1000)
```

> Detail

https://www.fmz.cn/strategy/171604

> Last Modified

2021-11-11 09:57:11
