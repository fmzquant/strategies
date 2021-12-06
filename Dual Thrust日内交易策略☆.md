
> 策略名称

Dual Thrust日内交易策略☆

> 策略作者

程文

> 策略描述

#### 前言
Dual Thrust直译为“双重推力”，是上个世纪80年代由Michael Chalek开发的一个交易策略，曾经在期货市场风靡一时。由于策略本身思路简单，参数很少，因此可以适应于很多金融市场，正是因为简单易用和普适性高的特点，得到了广大交易者的认可流传至今。

#### Dual Thrust简介
Dual Thrust策略属于开盘区间突破策略，它以当天开盘价加减一定的范围来确定一个上下轨道，当价格突破上轨时做多，价格突破下轨时做空。不过与其他突破策略相比有两点不同：第一个是Dual Thrust策略在设置范围的时候，引入的是前N个交易日的开高低收这四个价格，这使得在一定时期内范围相对稳定，对于趋势跟踪策略来说是比较合理的。

第二个是Dual Thrust策略在多头和空头的触发条件上，考虑了非对称性，通过外部参数Ks和Kx，可以针对多头和空头选择不同的周期，这一点比较符合期货市场涨缓跌急的特点。当Ks小于Kx时，多头相对容易被触发，当Ks大于Kx时，空头相对容易被触发。这样的好处是可以根据自己的交易经验，动态地调整Ks和Kx的值。也可以根据历史数据测试的最优参数来使用策略。

#### Dual Thrust上下轨
在Dual Thrust策略中，首先需要定义前N根K线的震荡区间，然后震荡区间乘以多头和空头系数计算出范围，接着以开盘价加减这个范围，形成上轨和下轨，最后根据价格与上下轨的相互位置关系开开平仓。

**计算震荡区间**
计算震荡区间首先需要获取四个价格，它们分别是：前N根K线中最高价(hh)、最高收盘价(hc)、最低价(ll)、最低收盘价(lc)。然后获取hh与lc的差和hc与ll的差，最后获取这两个差的最大值。公式为：
- Range = Max(hh-lc,hc-ll)

**计算范围**
在计算范围的时候，需要用到两个外部参数，分别是多头系数Ks和空头系数Kx，它们的值可以根据交易者的经验自己设置。那么多头的范围就是Rang乘以Ks；空头的范围是Rang乘以Kx。公式为：
- long_range = Range * Ks
- short_range = Range * Kx

**计算上轨下轨**
有了多头范围和空头范围，就可以根据开盘价来计算上轨和下轨的值了，其中上轨的值是开盘价加上多头范围，下轨的值是开盘价减去空头范围。公式为：
- up_line = open + long_rang
- down_line = open - short_range

#### 策略逻辑
 ![IMG](https://www.fmz.cn/upload/asset/39c9c79b71e2ecc46854.png) 

- 做多：价格向上突破上轨
- 做空：价格向下突破下轨


与其他突破策略一样，Dual Thrust策略也是根据价格与上下轨的相对位置关系来开平仓，当价格向上突破上轨时开多单；当价格向下突破下轨时开空单。另外，Dual Thrust策略没有止损止盈机制，也没有主动平仓机制。也就是说当持有多单时，如果价格向下突破下轨时直接反空为多；当持有空单时，如果价格向上突破上轨时直接反多为空。







#### 策略编写
**第一步：编写策略架构**
还是我们熟悉的策略框架，包含一个main程序入口函数和一个onTick策略主函数，如下：
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

**定义全局变量**
之所以定义全局变量是因为，在程序重复执行onTick函数中，如果变量定义在onTick函数中，那么这个变量的值会随着onTick的执行而改变。但有时候我们需要当达到某个条件的时候才改变这个变量，所以就需要我们把变量写到onTick函数的外面。
```
mp = 0  # 用于控制虚拟持仓
last_bar_time = 0  # 用于判断K线时间
up_line = 0  # 上轨
down_line = 0  # 下轨
```

**计算上下轨**
仔细看下面代码中的注释，首先一次性引入所有的全局变量，然后订阅期货品种并获取K线数组，接着判断一下K线数组的状态是否符合我们的条件，如果没问题就从K线数组中获取最新的K线数据和最新的收盘价。

有了以上基础数据，就可以计算上下轨的值了。首先是获取四个价格：最高价、最高的收盘价、最低价、最低的收盘价，然后就可以计算范围，最后根据范围计算出上轨和下轨。大家可以根据以上的计算流程，熟悉下面的代码。
```
global mp, last_bar_time, up_line, down_line # 引入全局变量
exchange.SetContractType(FuturesCode)  # 订阅期货品种
bar_arr = exchange.GetRecords()  # 获取K线数组
if not bar_arr or len(bar_arr) < Cycle:
    return  # 如果没有获取到K线数据或者K线数据太短就返回
last_bar = bar_arr[len(bar_arr) - 1]  # 最新的K线
last_bar_close = last_bar['Close']  # 最新K线的收盘价
if last_bar_time != last_bar['Time']:  # 如果产生了新的K线
    hh = TA.Highest(bar_arr, Cycle, 'High')  # 最高价
    hc = TA.Highest(bar_arr, Cycle, 'Close')  # 最高的收盘价
    ll = TA.Lowest(bar_arr, Cycle, 'Low')  # 最低价
    lc = TA.Lowest(bar_arr, Cycle, 'Close')  # 最低的收盘价
    Range = max(hh - lc, hc - ll)  # 计算范围
    up_line = _N(last_bar['Open'] + Ks * Range)  # 计算上轨
    down_line = _N(last_bar['Open'] - Kx * Range)  # 计算下轨
    last_bar_time = last_bar['Time']  # 更新最后时间戳
```

**下单交易**
下单交易很简单，使用if语句判断当前的持仓状态和价格与上下轨的相互位置关系来开平仓。同样的在下单交易之前也需要设置交易方向和类型，即：开多、开空、平多、平空。最后下单之后重置虚拟持仓的状态。
```
if mp == 0 and last_bar_close >= up_line:
    exchange.SetDirection("buy")  # 设置交易方向和类型
    exchange.Buy(last_bar_close, 1)  # 开多单
    mp = 1  # 设置虚拟持仓的值，即有多单
if mp == 0 and last_bar_close <= down_line:
    exchange.SetDirection("sell")  # 设置交易方向和类型
    exchange.Sell(last_bar_close - 1, 1)  # 开空单
    mp = -1  # 设置虚拟持仓的值，即有空单
if mp == 1 and last_bar_close <= down_line:
    exchange.SetDirection("closebuy")  # 设置交易方向和类型
    exchange.Sell(last_bar_close - 1, 1)  # 平多单
    mp = 0  # 设置虚拟持仓的值，即空仓
if mp == -1 and last_bar_close >= up_line:
    exchange.SetDirection("closesell")  # 设置交易方向和类型
    exchange.Buy(last_bar_close, 1)  # 平空单
    mp = 0  # 设置虚拟持仓的值，即空仓
```

#### 策略回测
**测试环境**
- 交易品种：螺纹钢指数
- 时间：2015年02月22日~2019年12月06日
- 周期：一小时
- 滑点：开平仓各2跳
- 手续费：交易所2倍
 ![IMG](https://www.fmz.cn/upload/asset/391b3bc7c635c45aba32.png) 
**绩效报告**
 ![IMG](https://www.fmz.cn/upload/asset/3a469acb1a33cc5e4afe.png) 
**资金曲线**
 ![IMG](https://www.fmz.cn/upload/asset/3a39c2cb5e6534cdaac9.png) 

#### 结尾
最后提醒大家，尽可能折中选择Ks和Kx外部参数的值。如果值太小，可能会及时跟踪到趋势，但会有很多虚假的突破信号；如果值太大，可能会错过趋势开始的部分，或者刚入场不久，趋势就结束了。

好了，本节课程到此结束，在接下来交易策略课程中，我们将循循渐进教大家如何通过发明者量化API获取真实的持仓和批量撤单，以及如何在策略中使用它，使交易策略更加完善健壮。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Cycle|5|周期|
|Ks|true|Ks|
|Kx|2|Kx|
|FuturesCode|rb000|期货代码|


> 源码 (python)

``` python
# 回测配置 
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 1h
basePeriod: 1h
balance: 10000
slipPoint: 2
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''


# 定义全局变量
mp = 0  													# 用于控制虚拟持仓
last_bar_time = 0  										# 用于判断K线时间
up_line = 0  											# 上轨
down_line = 0  											# 下轨

# 策略参数
Ks = 3
Kx = 2
Cycle = 5

# 策略主函数
def onTick():
    global mp, last_bar_time, up_line, down_line 		# 引入全局变量
    exchange.SetContractType('rb000')  					# 订阅期货品种
    bar_arr = exchange.GetRecords()  					# 获取K线列表
    # 如果没有获取到K线数据或者K线数据太短就返回
    if not bar_arr or len(bar_arr) < 5:
        return  
    last_bar = bar_arr[len(bar_arr) - 1]  				# 最新的K线
    last_bar_close = last_bar['Close']  				# 最新K线的收盘价
    if last_bar_time != last_bar['Time']:  				# 如果产生了新的K线
        hh = TA.Highest(bar_arr, Cycle, 'High')  			# 最高价
        hc = TA.Highest(bar_arr, Cycle, 'Close')  			# 最高的收盘价
        ll = TA.Lowest(bar_arr, Cycle, 'Low')  				# 最低价
        lc = TA.Lowest(bar_arr, Cycle, 'Close')  			# 最低的收盘价
        Range = max(hh - lc, hc - ll)  					# 计算范围
        up_line = _N(last_bar['Open'] + 3 * Range)  	# 计算上轨
        down_line = _N(last_bar['Open'] - 2 * Range)	# 计算下轨
        last_bar_time = last_bar['Time']  				# 更新最后时间戳
    if mp == 0 and last_bar_close >= up_line:
        exchange.SetDirection("buy")  					# 设置交易方向和类型
        exchange.Buy(last_bar_close, 1)  				# 开多单
        mp = 1  											# 设置虚拟持仓有多单
    if mp == 0 and last_bar_close <= down_line:
        exchange.SetDirection("sell")  					# 设置交易方向和类型
        exchange.Sell(last_bar_close - 1, 1)  			# 开空单
        mp = -1  											# 设置虚拟持仓有空单
    if mp == 1 and last_bar_close <= down_line:
        exchange.SetDirection("closebuy")  				# 设置交易方向和类型
        exchange.Sell(last_bar_close - 1, 1)  			# 平多单
        mp = 0  											# 设置虚拟持仓空仓
    if mp == -1 and last_bar_close >= up_line:
        exchange.SetDirection("closesell")  				# 设置交易方向和类型
        exchange.Buy(last_bar_close, 1)  				# 平空单
        mp = 0  											# 设置虚拟持仓空仓

# 程序入口        
def main():
    while True:  										# 进入循环模式
        onTick()  										# 执行策略主函数
        Sleep(1000)  										# 休眠1秒


```

> 策略出处

https://www.fmz.cn/strategy/177504

> 更新时间

2021-11-11 09:54:08
