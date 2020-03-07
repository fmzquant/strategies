
> 策略名称

MACD交易策略btc合约版

> 策略作者

groot

> 策略描述

一个简单的macd策略
周期四小时
金叉做多
死叉做空
杠杆均为一倍
因为是反向系统，不带止损
回测了下两年数据，币本位年化130%，最大回撤30%

另外回测了另一种macd策略
水上做多
水下做空
杠杆均一倍，也不带止损
回测了两年数据，币本位才30%，回撤15%左右。

所以可以得出，金叉死叉的指标有效性要高很多；
其实从逻辑上来讲也容易理解，金叉反应的是快线拐头向上，代表的是一种趋势方向，水上反应的只是当前时间点的差值，并不能很好反应方向；
如果用快线的窗口差值当做一个指标，比如当前快线和上个快线的差值大于某个阀值就做多，那也能达到跟金叉同样的效果；只是如果阀值设置不合理，有可能在震荡行情中，会频繁产生无效交易信号。

另外，周期分别回测了小时线、四小时线、日线，指标有效性排序：日线>四小时线>小时线；其实也很好理解，金叉死叉属于趋势策略，周期越长有效性越高。

关于macd的第三个参数，移动平均周期，默认设置的9，改成10效果会更好，该值越大，快线慢线的间隔越大，也就越能避免震荡行情频繁产生无效交易信号，不过太大的话，进入趋势行情的时间就晚了。



> 策略参数



|参数|默认值|描述|
|----|----|----|
|short|12|short|
|long|26|long|
|m|10|m|
|threshold|5|threshold|
|fresh_rete|4|交易频率（小时）|


> 源码 (python)

``` python
# 回测配置
'''backtest
start: 2018-01-01 00:00:00
end: 2020-03-01 00:00:00
period: 1d
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","stocks":1}]
'''

mp = 0  # 定义一个全局变量，用于控制虚拟持仓
counts = 0  # 定义一个全局变量，用于控制开单张数

    
# 判断两根两个数组是否金叉
def is_up_cross(arr1, arr2):
    if arr1[-2] < arr2[-2] and arr1[-1] > arr2[-1]:
        return True

# 判断两根两个数组是否死叉
def is_down_cross(arr1, arr2):
    if arr1[-2] > arr2[-2] and arr1[-1] < arr2[-1]:
        return True   
    
# 判断水上
def is_up(arr1):
    if arr1[-1] > threshold:
        return True     
    
# 判断水下
def is_down(arr1):
    if arr1[-1] < -threshold:
        return True 


# 程序主函数
def onTick():
    exchange.SetContractType("quarter")
    #金本位合约
    #exchange.IO("currency", "BTC_USDT")
    bar_arr = exchange.GetRecords(fresh_rete*60*60)  # 获取4小时的K线数组
    #if _D(bar_arr[-1]['Time']/1000) < '2020-01-05 00:00:00':
    #    Log("bar_arr",len(bar_arr))
    if len(bar_arr) < long + m + 1:  # 如果K线数组长度太小，就不能计算MACD，所以直接返回跳过
        return
    all_macd = TA.MACD(bar_arr, short, long, m)  # 计算MACD值，返回的是一个二维数组
    dif = all_macd[0]  # 获取DIF的值，返回一个数组
    dif.pop()  # 删除DIF数组最后一个元素,因为最后一跟k线还未形成
    dea = all_macd[1]  # 获取DEA的值，返回一个数组
    dea.pop()  # 删除DEA数组最后一个元素,因为最后一跟k线还未形成
    last_close = bar_arr[-1]['Close']  # 获取最新价格（卖价），用于开平仓
    global mp  # 全局变量，用于控制虚拟持仓
    global counts  # 全局变量，用于记录上次开单张数
    


    #杠杆倍数
    acct = exchange.GetAccount()
    portfolio_value = (acct.Stocks+acct.FrozenStocks)*last_close
    counts_tmp = int(portfolio_value/100)

    #开仓
    if mp == 0 : 
            #多单
        if is_up_cross(dif, dea):
        #if is_up(dif):
            exchange.SetDirection("buy")  # 设置交易方向和类型
            exchange.Buy(last_close + 10, counts_tmp)  # 开多单
            counts = counts_tmp
            Log("bar_arr",bar_arr[-1],"dif",dif[-1],"dea",dea[-1])
            mp = 1  # 设置虚拟持仓的值，即有多单
    
        #空单
        if is_down_cross(dif, dea):
        #if is_down(dif):
            exchange.SetDirection("sell")  # 设置交易方向和类型
            exchange.Sell(last_close - 10, counts_tmp)  # 开空单
            counts = counts_tmp
            Log("bar_arr",bar_arr[-1],"dif",dif[-1],"dea",dea[-1])
            mp = -1  # 设置虚拟持仓的值，即有空单
    
    #平多开空
    if mp == 1 and is_down_cross(dif, dea):
    #if mp == 1 and is_down(dif,):
        exchange.SetDirection("closebuy")  # 设置交易方向和类型
        exchange.Sell(last_close - 10, counts)  # 平多单
        
        exchange.SetDirection("sell")  # 设置交易方向和类型
        exchange.Sell(last_close - 10, counts_tmp)  # 开空单
        counts = counts_tmp
        Log("bar_arr",bar_arr[-1],"dif",dif[-1],"dea",dea[-1])
        mp = -1
        
    # 平空开多
    if mp == -1 and is_up_cross(dif, dea):
    #if mp == -1 and is_up(dif):
        exchange.SetDirection("closesell")  # 设置交易方向和类型
        exchange.Buy(last_close + 10, counts)  # 平空单

        exchange.SetDirection("buy")  # 设置交易方向和类型
        exchange.Buy(last_close + 10, counts_tmp)  # 开多单
        counts = counts_tmp
        Log("bar_arr",bar_arr[-1],"dif",dif[-1],"dea",dea[-1])
        mp = 1
        

        
def main():
    while True:
        onTick()
        Sleep(fresh_rete*60*60*1000)        
```

> 策略出处

https://www.fmz.com/strategy/188100

> 更新时间

2020-03-06 12:01:46
