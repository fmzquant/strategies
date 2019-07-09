
> 策略名称

动态平衡策略 python 版

> 策略作者

teddy





> 源码 (python)

``` python

# !usr/bin/ python3
# *_* coding:utf-8 *_*
#学会python后写的第一个动态平衡策略
# QQ：5325049 不足之处欢迎指正

import time

#定义获取行情及账户信息函数
def nowinfo(): 
    global NowTicker,NowAsset,NowCoinValue,AssetDiff
    NowTicker = exchange.GetTicker() #获取行情信息
    NowAsset = exchange.GetAccount() # 获取账户信息
    NowCoinValue =NowTicker.Last * NowAsset.Stocks #计算币资产净值
    AssetDiff = NowCoinValue-NowAsset.Balance #计算币资产与现金差额

# 定义交易执行函数
def trade():
    if AssetDiff > NowAsset.Balance*0.05: # 判断币值是否超过资金5%
        Log("交易将被执行，以",NowTicker.Buy,"卖出",AssetDiff/2/NowTicker.Buy,"个币")
        exchange.SetPrecision(5,5) #设置计价精度
        exchange.Sell(NowTicker.Buy,AssetDiff/2/NowTicker.Buy) #执行币卖出交易
    elif AssetDiff < NowAsset.Balance*(-0.05): #判断币值是否低于资金5%
        Log("交易将被执行，以",NowTicker.Sell,"买入",AssetDiff/-2/NowTicker.Sell,"个币")
        exchange.SetPrecision(5,5) #设置计价精度
        exchange.Buy(NowTicker.Sell,AssetDiff/-2/NowTicker.Sell) #执行币买入交易
    else:
        Log("未触发交易条件")

# 入口函数，只要定义了系统就会自动执行该函数，不需要调用啊
def main():
    i = 0
    while i < 1000: #设置执行总次数
        nowinfo() # 调用获取行情资产函数
        Log(NowTicker) # 打印行情信息
        Log(NowAsset) # 打印账户信息
        Log("当前币余额：",NowAsset.Stocks)
        Log("当前资金余额：",NowAsset.Balance)
        Log("当前币市值：", NowCoinValue)
        Log("币市值与资金差额：",AssetDiff)
        trade() #调用 交易执行函数
        i+=1 # 条件迭代
        Log("第", i, "轮循环结束")
        time.sleep(60) # 等待60秒


```

> 策略出处

https://www.fmz.com/strategy/152830

> 更新时间

2019-06-22 18:35:30
