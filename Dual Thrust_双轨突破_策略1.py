'''
策略出处: https://www.botvs.com/strategy/22983
策略名称: Dual Thrust_双轨突破_策略1
策略作者: 太极
策略描述:

策略越简单越好

'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
Enter_cycle=5 #周期数据

Open_price=0  #开盘价平均价
High_price=0  #最高价平均价
Low_price=0  #最低价平均价
Close_price=0  #收盘价平均价

N1Open_price=0   #开盘价
N1High_price=0  #最高价
N1Low_price=0  #最低价
N1Close_price=0  #收盘价

# import time
# import datetime
# def out_time(x_time):  #获取当前时间   前10分钟时间戳
#     #d0=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
#     d1=datetime.datetime.now()
#     #d1=time.mktime(time.strptime(d0,'%Y-%m-%d %H:%M:%S'))  #转换成时间戳
#     d3 = str(d1 - datetime.timedelta(minutes =x_time)) #days日 hours时 minutes分 seconds秒
#     d4=d3[:len(d3)-7]  #清除垃圾数据
#     return time.mktime(time.strptime(d4,'%Y-%m-%d %H:%M:%S'))

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

def Record_Open_Close(cycle):  #获取 开盘价 收盘价 平均价
    global Open_price,High_price,Low_price,Close_price,N1High_price,N1Low_price,N1Open_price,N1Close_price
    Open_list=[]  #开盘价平均价
    High_list=[]  #最高价平均价
    Low_list=[] #收盘平均价
    Close_list=[]  #收盘价平均价
    #PERIOD_M1 指1分钟,#PERIOD_M5 指5分钟,#PERIOD_M15 指15分钟,#PERIOD_M30 指30分钟,#PERIOD_H1 指1小时,#PERIOD_D1 指一天
    ticker = _C(exchange.GetRecords,PERIOD_M5)#Record  历史数据
    #ticker = _C(exchange.GetRecords)#Record  收盘价
    #Log('当前数据:',ticker)

    #因为无法回测所以不这样写
    # minutes1_time=int(out_time(cycle))  #获取时间戳
    #
    # timeB1=str(int(minutes1_time))
    # timeB2=timeB1[:len(timeB1)]   #我们设定的收盘时间
    #
    # for colour in ticker:
    #     Log(colour.Time)
    #     timeA1=str(int(colour.Time))
    #     timeA2=timeA1[:len(timeA1)-3]  #收盘时间
    #     if int(timeA2)>int(timeB2):  #收盘时间大于我们设定的时间及为 真
    #         Log(colour.Time)
    #         #收集最高价  收盘 数据
    #         High_list.append(colour.High)  #最高价平均价
    #         Low_list.append(colour.Low) #最低价平均价

    #采集数据  N个周期
    for i in range(len(ticker)-cycle, len(ticker)):
        colour=ticker[i]
        # timeA1=str(int(colour.Time))
        # timeA2=timeA1[:len(timeA1)-3]  #收盘时间
        # Log(colour)
        # Log(timeA2,"xxx",len(ticker),"rrrr",i)
        Open_list.append(colour.Open)  #开盘价
        High_list.append(colour.High)  #最高价
        Low_list.append(colour.Low) #最低价
        Close_list.append(colour.Close) #最低价

    #上一个周期 最高价  最低价
    for i in range(len(ticker)-1, len(ticker)):
        colour=ticker[i]
        N1Open_price=colour.Open  #开盘价
        N1High_price=colour.High  #最高价
        N1Low_price=colour.Low  #最低价
        N1Close_price=colour.Close  #最低价

    #计算平均价
    if (len(High_list)>=cycle)and(len(Low_list)>=cycle)and(len(Open_list)>=cycle)and(len(Close_list)>=cycle):
        Open_Close=_N(Volume_averages(Open_list,cycle),2)  #开盘价平均价
        High_Close=_N(Volume_averages(High_list,cycle),2)  #最高价平均价
        Low_Close=_N(Volume_averages(Low_list,cycle),2)  #最低价平均价
        Close_Close=_N(Volume_averages(Close_list,cycle),2)  #收盘价平均价
        Open_price=Open_Close #开盘价平均价
        High_price=High_Close #最高价平均价
        Low_price=Low_Close #最低价平均价
        Close_price=Close_Close #收盘价平均价
    else:
        Open_price=0 #开盘价平均价
        High_price=0 #最高价平均价
        Low_price=0 #最低价平均价
        Close_price=0 #收盘价平均价

###############################################################
lose_win={"lose":0,"win":0}  #输：lose赢：win

def print_logxx():
    global lose_win
    #lose_win={"lose":35,"win":90}  #输：lose赢：win
    Log("赢:%s 输:%s"%(str(lose_win["win"]),str(lose_win["lose"])))
    # if (float(lose_win["win"])>0 and float(lose_win["lose"])>0):
    #     SL="%.2f%%"%((float(lose_win["win"]-lose_win["lose"])/float(lose_win["win"]))*100)
    #     Log("赢:%s 输:%s=胜:%s"%(str(lose_win["win"]),str(lose_win["lose"]),str(SL)))
###############################################################

#low_minuN_Close= 0.1  #浮动开仓点
#high_minuN_Close= 0.3  #浮动平仓点
#lose_win={"lose":0,"win":0}  #输：lose赢：win
def main():
    #global low_minuN_Close,high_minuN_Close
    global lose_win
    global Open_price,High_price,Low_price,Close_price,N1High_price,N1Low_price,N1Open_price,N1Close_price
    #LogProfitReset()# 	清空所有收益日志, 可以带一个数字参数, 指定保留的条数
    #LogReset()# 	清空所有日志, 可以带一个数字参数, 指定保留的条数
    state = 3   #开仓状态
    open_price=0  #开仓价格
    gains=0  #盈利
    while True:
        Record_Open_Close(Enter_cycle)  #获取 开盘价 收盘价 平均价
        tickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价

        # Log('高价－收盘价:',High_price-Close_price)
        # Log('收盘价－最低价:',Close_price-Low_price)
        # Log('最高价，开盘价:',High_price,Open_price)
        # Log('收盘价，最低价:',Close_price,Low_price)
        # Log('最高价，最低价:',N1High_price,N1Low_price)
        if High_price-Close_price>=Close_price-Low_price:  #比较值计算2个值的浮动区间
            floating_price=(High_price-Close_price)
        else:
            floating_price=(Close_price-Low_price)
        #不知道如何获取当前开盘价采用上个周期收盘价最为开盘价
        x_high=N1Open_price+(0.5*floating_price)   #上轨
        x_low=N1Open_price-(0.5*floating_price)    #下轨
        #Log('上轨%s=下轨%s=价格差%s=当前价格%s'%(str(x_high),str(x_low),str(x_high-x_low),str(tickerx)))

        #if (float(tickerx)>=float(x_low-low_minuN_Close) and float(tickerx)<=float(x_low+low_minuN_Close)):  #判断行情是否在指定区间内则开仓
        #判断当前行情是否在上轨和下轨中
        #突破上轨则开仓
        #突破下轨则平仓
        if (float(tickerx)<=float(x_high+5) and float(tickerx)>=float(x_low-5)):  #判断当前行情是否在上轨和下轨中
            if (state == 3):   #空闲状态
                if float(tickerx)>=float(x_high):  #突破上轨则开仓
                    Log('开仓 上轨%s=下轨%s=价格差%s=当前价格%s'%(str(x_high),str(x_low),str(x_high-x_low),str(tickerx)))
                    state = 0   #开仓
            if (state == 1):   #开仓状态
                if float(tickerx)<=float(x_low):  #突破下轨则平仓
                    state = 2   #平仓

        # if float(tickerx)<=float(x_low):  #大于等于下轨  则开仓
        #     if (state == 3):   #空闲状态
        #         state = 0   #开仓
        #         Log('开仓 上轨%s=下轨%s=价格差%s=当前价格%s'%(str(x_high),str(x_low),str(x_high-x_low),str(tickerx)))

        if (state == 0):   #开仓
            if ext.Buy(0.5):
                #开仓成功
                open_price = tickerx
                state = 1

        if (state == 2):   #平仓
            #if (float(tickerx)>=float(x_high-high_minuN_Close) and float(tickerx)<=float(x_high+high_minuN_Close)):  #判断行情是否在指定区间内则平仓
            #if float(tickerx)>=float(x_high):  #大于等于上轨道  则平仓
            if ext.Sell(0.5):
                #平仓成功
                xx=tickerx-open_price #本次交易
                gains=gains+xx
                Log("本次盈利:%s--当前共盈利:%s"%(str(tickerx-open_price),str(gains)))
                if float(tickerx-open_price)>=0:
                    lose_win["win"]=lose_win["win"]+1 #赢：win"胜"
                else:
                    lose_win["lose"]=lose_win["lose"]+1#输：lose"负"
                print_logxx()  #信息输出
                state = 3
                open_price=0  #开仓价格

        Sleep(1* 1000)









