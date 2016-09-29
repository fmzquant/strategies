'''
策略出处: https://www.botvs.com/strategy/21938
策略名称: 顺势_高频_交易_测试2——失败
策略作者: 太极
策略描述:

主要趋势为多的开平单的条件
开仓  ：大周期差值（-0.04--0.08）
        MA20>现价格>MA60
同时具备以条件的2条才开多单仓，否则开空仓

平仓：小周期差值>0.4
      小周期最低价格>MA3
      现价格<MA5
只要有1条符合就平仓，并做空

代码编写 QQ:7650371 太极
整体思路提供 QQ:461355382 趋势操作有理
失败原因是因为无法找到合适的   开仓合适点

'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
#代码编写 QQ:7650371 太极
#整体思路提供 QQ:461355382 趋势操作有理
#失败原因是因为无法找到合适的 开仓合适点
Interval_s=60 #轮询(采集周期/秒)
Enter_large_cycle=20 #开仓 大周期
Enter_Small_cycle=5 #开仓 小周期
large1_Period=0.08  #开仓大周期差值1
large2_Period=-0.04  #开仓大周期差值2

Exit_large_cycle=3 #平仓 大周期
Exit_Small_cycle=5 #平仓 小周期
Small1_Period=0.4  #平仓小周期差值1

import time
import datetime
########################################################
def out_time(x_time):  #获取当前时间   前10分钟时间戳
    #d0=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
    d1=datetime.datetime.now()
    #d1=time.mktime(time.strptime(d0,'%Y-%m-%d %H:%M:%S'))  #转换成时间戳
    d3 = str(d1 - datetime.timedelta(minutes =x_time)) #days日 hours时 minutes分 seconds秒
    d4=d3[:len(d3)-7]  #清除垃圾数据
    return time.mktime(time.strptime(d4,'%Y-%m-%d %H:%M:%S'))

def Volume_averages(Ticker_listxxx,x):  #均价
    try:
        Volume=0
        if len(Ticker_listxxx)<x:
            return 0
        for colour in Ticker_listxxx:
            Volume+=colour
        return Volume/len(Ticker_listxxx)
    except BaseException, e:
        return 0

def Close2_Close(Close2_list):  #小周期 差值
    Result_list=[]  #结果
    #去第一个  第3个减去第2个
    for i in range(0, len(Close2_list)):
        #print i, Close2_list[i]
        if i<len(Close2_list)-1:
            A=Close2_list[i+1]-Close2_list[i]
            Result_list.append(A)
    #print Result_list
    x=0
    for i in range(0, len(Result_list)):
        #print i, Result_list[i]
        if i==0:
            x=Result_list[i+1]-Result_list[i]
        else:
            if i<len(Result_list)-1:
                x=Result_list[i+1]-x
            else:
                x=Result_list[i]-x
    return _N(x,3)

########################################################
outAccount = ext.GetAccount()  #初始化信息
def print_log(k_p,Account,data=""):
    try:
        global outAccount
        name=""
        if k_p:
            name="开仓"
        else:
            name="平仓"

        endAccount = ext.GetAccount()  #初始化信息
        date1=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
        LogStatus("初始化投入2016/9/24  投入0.2个币=等于行情800RMB\r\n",
                  "本次初始化状态:",outAccount,
                  "\r\n当前运  行状态:",endAccount,
                  "\r\n本次开始运行时间:%s  已运行:%s\r\n"%(start_time,Caltime(start_time,date1)),
                  "本次盈亏:%s(RMB)\r\n"%(str(gains)),
                  "当前状态:%s--钱:%s--币:%s\r\n"%(str(name),str(Account.Balance),str(Account.Stocks)),
                  "更新时间:%s\r\n"%(date1),
                  "%s"%(data)
                  ) # 测试
    except Exception,ex:
        Log('except Exception print_log:',ex)

########################################################


def main():
    n=0
    state = 3
    value1_data=0  #大周期 差值
    value2_data=0  #小周期 差值
    Log("run  ",outAccount)  #输出初始账户信息
    Close1_list=[]  #开仓 大周期
    Close2_list=[]  #开仓 小周期

    Close3_list=[]  #平仓 大周期
    Close4_list=[]  #平仓 小周期
    while True:
        try:
            nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
            tickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
            #更新历史数据
            if n<int(Interval_s):  #记录更新过一次
                n+=1
            if n>=int(Interval_s): #重置
                n=0
                #PERIOD_M1 指1分钟,#PERIOD_M5 指5分钟,#PERIOD_M15 指15分钟,#PERIOD_M30 指30分钟,#PERIOD_H1 指1小时,#PERIOD_D1 指一天
                ticker = _C(exchange.GetRecords,PERIOD_M1)#Record  收盘价
                #Log('当前数据:',ticker)
                minutes1_time=int(out_time(Enter_large_cycle))  #开仓 大周期 获取当前时间   获取时间戳
                minutes2_time=int(out_time(Enter_Small_cycle))  #开仓 小周期 获取当前时间   获取时间戳

                minutes3_time=int(out_time(Exit_large_cycle))  #平仓 大周期
                minutes4_time=int(out_time(Exit_Small_cycle))  #平仓 小周期


                timeB1=str(int(minutes1_time))
                timeB2=timeB1[:len(timeB1)]   #我们设定的收盘时间   大周期
                #timeB_time=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(int(timeB2)))  #时间戳 转换成日期

                timeC1=str(int(minutes2_time))
                timeC2=timeC1[:len(timeC1)]   #我们设定的收盘时间   大周期

                timeD1=str(int(minutes3_time))
                timeD2=timeC1[:len(timeD1)]   #我们设定的收盘时间

                timeE1=str(int(minutes4_time))
                timeE2=timeC1[:len(timeE1)]   #我们设定的收盘时间

                for colour in ticker:
                    timeA1=str(int(colour.Time))
                    timeA2=timeA1[:len(timeA1)-3]  #收盘时间
                    #timeA_time=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(int(timeA2)))  #时间戳 转换成日期
                    #开仓数据
                    if int(timeA2)>int(timeB2):  #收盘时间大于我们设定的时间及为 真
                        #Log('大周期:',timeA_time,"|",timeA2,",",timeB_time,"|",timeB2)
                        Close1_list.append(colour.Close)  #大周期
                    if int(timeA2)>int(timeC2):  #收盘时间大于我们设定的时间及为 真
                        #Log('小周期:',timeA_time,"|",timeA2,",",timeC_time,"|",timeC2)
                        Close2_list.append(colour.Close)  #小周期
                    #平仓数据
                    if int(timeA2)>int(timeD2):  #收盘时间大于我们设定的时间及为 真
                        Close3_list.append(colour.Close)  #平仓 大周期
                    if int(timeA2)>int(timeE2):  #收盘时间大于我们设定的时间及为 真
                        Close4_list.append(colour.Close)  #平仓 大周期
                #########################################################################
                    #开仓条件
                    if (len(Close1_list)+1>=Enter_large_cycle and len(Close2_list)+1>=Enter_Small_cycle):
                        #说明数据收集完毕准备开始操作
                        minu1_Close=_N(Volume_averages(Close1_list,Enter_large_cycle),2)  #大周期 历史均价
                        minu2_Close=_N(Volume_averages(Close2_list,Enter_Small_cycle),2)  #小周期 历史均价
                        if (minu1_Close>10 and minu2_Close>10):
                            value1_data=Close2_Close(Close1_list)  #大周期 差值
                            value2_data=Close2_Close(Close2_list)  #小周期 差值
                            data="大周期 差值:%s小周期 差值:%s当前成交价:%s大周期均价:%s小周期均价:%s"%\
                            (str(value1_data),str(value2_data),str(tickerx),str(minu1_Close),str(minu2_Close))
                            Log(data)
                            data="     大周期:%s>= 大周期 差值:%s>=小周期:%s"%\
                                 (str(float(large1_Period)),str(float(value1_data)),str(float(large2_Period)))
                            Log("数据:",data)
                            if (float(large1_Period)>=float(value1_data) and float(value1_data)>=float(large2_Period)):  #判断这个差值在这个区间内则开仓
                                Log("ssssssssssssssssssssss",state)
                                if (state == 3):   #
                                    data="开仓当前大周期差值:%s"%(str(value1_data))
                                    Log(data)
                                    #print_log(0,nowAccount,data)
                                    state = 0
            #########################################################################
            if (state == 0):   #
                #if my_buy(): #开仓
                Log('开仓现在价格:',tickerx)
                Log('开仓')
                state = 1
            if (state == 1):   #
                value3_data=Close2_Close(Close3_list)  #小周期 差值
                value4_data=Close2_Close(Close4_list)  #小周期 差值
                # 小周期差值>0.4  or  小周期最低价格>MA3  or 现价格(成交价)<MA5
                if (value3_data):
                    if (value2_data>Small1_Period or value2_data>value3_data or tickerx<value4_data):
                        #if my_sell(): #平仓
                        Log('平仓现在价格:',tickerx)
                        Log('平仓')
                        state = 3
                        #################################################


            #Log('xxxx大周期:',len(Close1_list))
            #Log('xxxx小周期:',len(Close2_list))
            Close1_list=[]  #大周期  清空
            Close2_list=[]  #小周期  清空
        except Exception,ex:
            Log('except Exception main:',ex)
        Sleep(1000)
