'''
策略出处: https://www.botvs.com/strategy/37664
策略名称: 均线-趋势_数字货币策略V0.2 (Copy)
策略作者: victoro
策略描述:

@太极   QQ7650371
#均线/趋势  策略
#通过判断  在死叉下底后回弹多少买入
#在金叉上扬至顶后下降多少卖出


参数              默认值                                                                             描述
--------------  ------------------------------------------------------------------------------  ------------------
FastPeriod      2                                                                               开仓快线周期
SlowPeriod      4                                                                               开仓慢线周期
EnterPeriod     true                                                                            开仓观察期
x               ------------------------------------------------------------------------------  分割符号
ExitFastPeriod  2                                                                               平仓快线周期
ExitSlowPeriod  4                                                                               平仓慢线周期
ExitPeriod      2                                                                               平仓观察期
xx              ------------------------------------------------------------------------------  分割符号
PositionRatio   0.5                                                                             仓位比例
Interval        10                                                                              轮询周期(秒)
xxx             ------------------------------------------------------------------------------  分割符号
MAType          0                                                                               均线类型: TA.EMA|TA.MA
'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
#均线/趋势  策略
#通过判断  在死叉下底后回弹多少买入
#在金叉上扬至顶后下降多少卖出


# FastPeriod=3 #开仓快线周期
# SlowPeriod=7 #开仓慢线周期
# EnterPeriod=1       #开仓观察期
# ExitFastPeriod=3 #平仓线周期
# ExitSlowPeriod=7 #平仓慢线周期
# ExitPeriod=2        #平仓观察期
# PositionRatio=0.5 #仓位比例
# Interval=10 #轮询周期
# MAType=0 #均线类型 TA.EMA|TA.MA


import types
array = [TA.EMA,TA.MA]
_MACalcMethod = array[MAType]
def Cross(a,b):   #计算均线方法
    crossNum = 0
    arr1 = []
    arr2 = []
    if(type(a) == types.ListType and type(b) == types.ListType):
        arr1 = a
        arr2 = b
    else:
        records = null
        while True:
            records = exchange.GetRecords()
            if(records and len(records) > a and len(records) > b):
                break
            Sleep(Interval)
        arr1 = _MACalcMethod(records,a)
        arr2 = _MACalcMethod(records,b)
    if(len(arr1) != len(arr2)):
        raise Exception("array length not equal")
    for i in range(len(arr1) - 1,-1,-1):
        if((type(arr1[i]) != types.IntType and type(arr1[i]) != types.FloatType) or (type(arr2[i]) != types.IntType and type(arr2[i]) != types.FloatType) ):
            break
        if(arr1[i] < arr2[i]):
            if(crossNum > 0):
                break
            crossNum -= 1
        elif(arr1[i] > arr2[i]):
            if(crossNum < 0):
                break
            crossNum += 1
        else:
            break
    return crossNum

import datetime
def Caltime(date1,date2):
    try:
        date1=time.strptime(date1,"%Y-%m-%d %H:%M:%S")
        date2=time.strptime(date2,"%Y-%m-%d %H:%M:%S")
        date1=datetime.datetime(date1[0],date1[1],date1[2],date1[3],date1[4],date1[5])
        date2=datetime.datetime(date2[0],date2[1],date2[2],date2[3],date2[4],date2[5])
        return date2-date1
    except Exception,ex:
        Log('except Exception Caltime:',ex)
        return "except Exception"

import time
start_timexx =time.localtime(time.time()) #time.clock()
start_time=time.strftime("%Y-%m-%d %H:%M:%S",start_timexx)
buy_price=0 #买入价格
buy_qty=0  #买入数量
gains=0  #盈利

def my_buy(): #开仓
    try:
        global buy_price,buy_qty
        initAccount = ext.GetAccount()  #交易模板的导出函数， 获得账户状态，保存策略运行前账户初始状态
        opAmount=1
        #开仓之前判断有币没有没有先进行买入
        if int(initAccount.Stocks)>1:
            if buy_price<1:
                buy_price=_C(exchange.GetTicker).Last
                buy_qty=initAccount.Stocks
            Log('开仓信息1 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
            return 1
        if int(initAccount.Stocks)<1:
            if int(str(initAccount.Stocks).replace('0.',''))>=1:
                if buy_price<1:
                    buy_price=_C(exchange.GetTicker).Last
                    buy_qty=initAccount.Stocks
                Log('开仓信息2 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
                return 1

        #if int(initAccount.Stocks)<1:
        if int(str(initAccount.Stocks).replace('0.',''))==0:
            #opAmount=1
            opAmount = _N(initAccount.Balance*PositionRatio,3)  #买入数量
            Log("开仓没有币先进行 开仓买入%s元"%(str(opAmount)))   #生成LOG日志
        #     else:
        #         opAmount = _N(initAccount.Stocks * PositionRatio,3)  #获取交易数量
        # else:
        #     opAmount = _N(initAccount.Stocks * PositionRatio,3)  #获取交易数量
        Dict = ext.Buy(opAmount)  #买入ext.Buy
        if(Dict):#确认开仓成功
            buy_price=Dict['price'] #买入价格   #{'price': 4046.446, 'amount': 1.5}
            buy_qty=Dict['amount']  #买入数量
            print_log(1,initAccount,Dict)
            return 1
        return 0

    except Exception,ex:
        Log('except Exception my_buy:',ex)
        return 0

outAccount = ext.GetAccount()  #初始化信息
def print_log(k_p,Account,Dict):
    try:
        global outAccount
        name=""
        if k_p:
            LogProfit(_N(gains,4),'开仓信息 钱:',Account.Balance,'--币:',Account.Stocks,'--开仓详情:',Dict)
            name="开仓"
        else:
            LogProfit(_N(gains,4),'平仓信息 钱:',Account.Balance,'--币:',Account.Stocks,'--平仓详情:',Dict)
            name="平仓"
        endAccount = ext.GetAccount()  #初始化信息
        date1=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
        LogStatus("初始化投入2016/9/16  投入资金2000元\r\n",
                  "本次初始化状态:",outAccount,
                  "\r\n当前运  行状态:",endAccount,
                  "\r\n本次开始运行时间:%s  已运行:%s\r\n"%(start_time,Caltime(start_time,date1)),
                  "本次盈利:%s\r\n"%(str(gains)),
                  "当前状态:%s--钱:%s--币:%s\r\n"%(str(name),str(Account.Balance),str(Account.Stocks)),
                  "更新时间:%s"%(date1)
                  ) # 测试
    except Exception,ex:
        Log('except Exception print_log:',ex)


def my_sell(): #平仓
    try:
        global buy_price,buy_qty,gains,start_time
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        if _C(exchange.GetTicker).Last>buy_price+4:   #当前价格一定要大于  开仓价格
            Dict = ext.Sell(nowAccount.Stocks)
            if(Dict):
                sell_gains=(Dict['price']-buy_price)*Dict['amount']
                gains=gains+sell_gains
                buy_price=0 #买入价格
                buy_qty=0  #买入数量
                print_log(0,nowAccount,Dict)
                return 1
        return 0
    except Exception,ex:
        Log('except Exception my_sell:',ex)
        return 0

def main():
    global outAccount
    STATE_IDLE = -1  #空闲状态
    state = STATE_IDLE  #初始化  状态 为 空闲

    Log("run  ",outAccount)  #输出初始账户信息
    SetErrorFilter("GetAccount|GetRecords|GetTicker")  #屏蔽错误内容

    b=0  #开仓
    b1=0  #检测次数
    a=0  #平仓
    a1=0  #检测次数
    while True:
        if(state == STATE_IDLE):   #判断状态是否 为空闲 触发开仓
            #开仓
            n = Cross(FastPeriod,SlowPeriod) #模板函数获取EMA指标快线、慢线交叉结果
            if n<0:  #确定当前为死叉
                b1+=1
                if b>=int(n): #说明现在还是在下跌涨趋势
                    b=int(n)
                else: #开始下跌  开仓
                    if(int(n)>=int(b)+int(EnterPeriod)):  #确认上行走势 至自己定义的点
                        if my_buy():  #开仓
                            b=0
                            b1=0
                            state = PD_SHORT
                            # if(b1>=10):#小波动操作开仓
                            #     b1=0
                            #     if my_buy():
                            #         b=0
                            #         state = PD_SHORT
        else:#平仓
            n = Cross(ExitFastPeriod,ExitSlowPeriod) #模板函数获取EMA指标快线、慢线交叉结果
            if n>0:  #确定当前为金叉
                a1+=1
                if a<=int(n): #说明现在还是在上涨趋势
                    a=int(n)
                else: #开始下跌  平仓
                    if(int(n)<=int(a)-int(ExitPeriod)):  #确认下行走势 至自己定义的点
                        if my_sell(): #平仓
                            a=0
                            a1=0
                            state = STATE_IDLE   #更改状态  为空闲 触发开仓
                            # if(a1>=10): #小波动操作平仓
                            #     a1=0
                            #     if my_sell():
                            #         a=0
                            #         state = STATE_IDLE   #更改状态  为空闲 触发开仓
        Sleep(Interval * 1000)


