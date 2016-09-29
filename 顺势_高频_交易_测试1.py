'''
策略出处: https://www.botvs.com/strategy/21742
策略名称: 顺势_高频_交易_测试1
策略作者: 太极
策略描述:

历史成交价均价  减去  当前历史成交价    大于指定数值    开仓        （也相当于快周期减去慢周期判断上涨趋势）
开仓价格  大于 （当前成交价  加上  指定数值）    平仓                      
开仓价格  小于  （当前成交价  减去  指定数值）    强行平仓操作（止损）
以此循环
代码编写          QQ:7650371       太极
整体思路提供   QQ:461355382   趋势操作有理


参数             默认值    描述
-------------  -----  -------------------
Interval_s     60     轮询(周期采集/秒)
Time_size      20     采集样本数(周期交易价格)
PositionRatio  0.5    仓位比例
EnterPeriod    true   开仓观察期(行情价 大于 当前)
ExitPeriod     true   平仓观察期(开仓买入 大于 当前)
stop_Period    -30    止损(强行平仓 买入价格 小于 当前)
min_size       20     秒级 	采集样本数(交易价格)
'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
#Interval_s=5 #轮询(采集周期/秒)
# Time_size=10  #采集样本数(交易价格)
#min_size=10  #秒级 	采集样本数(交易价格)
# PositionRatio=0.1 #仓位比例
# EnterPeriod=1       #开仓观察期(行情价 大于 当前)
# ExitPeriod=1        #平仓观察期(开仓买入 大于 当前)
# stop_Period=5       #强行平仓

# 历史成交价均价  减去  当前历史成交价    大于指定数值    开仓        （也相当于快周期减去慢周期判断上涨趋势）
# 开仓价格  大于 （当前成交价  加上  指定数值）    平仓                      
# 开仓价格  小于  （当前成交价  减去  指定数值）    强行平仓操作（止损）
# 以此循环
# 代码编写          QQ:7650371       太极
# 整体思路提供   QQ:461355382   趋势操作有理

def add_min_list(Ticker_list,name):  #添加秒级历史数据
    try:
        #global min_size
        #ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        if (int(name)>10):
            if len(Ticker_list)>=min_size:
                Ticker_list.pop(0)  #返回并清除第一个数组
                Ticker_list.append(name) #追加元素
            else:
                Ticker_list.append(name) #追加元素
        return 1,Ticker_list
    except BaseException, e:
        return 0,[]

def add_list(Ticker_list,name):  #添加数据
    try:
        global Time_size
        #ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        if (int(name)>10):
            if len(Ticker_list)>=Time_size:
                Ticker_list.pop(0)  #返回并清除第一个数组
                Ticker_list.append(name) #追加元素
            else:
                Ticker_list.append(name) #追加元素
        return 1,Ticker_list
    except BaseException, e:
        return 0,[]

def Volume_min_averages(Ticker_listxxx):  #添加秒级历史数据
    try:
        Volume=0
        if len(Ticker_listxxx)<min_size:
            return 0
        for colour in Ticker_listxxx:
            Volume+=colour
        return Volume/len(Ticker_listxxx)
    except BaseException, e:
        return 0

def Volume_averages(Ticker_listxxx):  #均价
    try:
        Volume=0
        if len(Ticker_listxxx)<Time_size:
            return 0
        for colour in Ticker_listxxx:
            Volume+=colour
        return Volume/len(Ticker_listxxx)
    except BaseException, e:
        return 0

########################################################
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
            if int(str(initAccount.Stocks).replace('0.',''))>=3:
                if buy_price<1:
                    buy_price=_C(exchange.GetTicker).Last
                    buy_qty=initAccount.Stocks
                Log('开仓信息2 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
                return 1

        #if int(str(initAccount.Stocks).replace('0.',''))==0:
        opAmount = _N(initAccount.Balance*PositionRatio,3)  #买入数量
        Log("开仓没有币先进行 开仓买入%s元"%(str(opAmount)))   #生成LOG日志

        Dict = ext.Buy(opAmount)  #买入ext.Buy
        if(Dict):#确认开仓成功
            buy_price=Dict['price'] #买入价格   #{'price': 4046.446, 'amount': 1.5}
            buy_qty=Dict['amount']  #买入数量
            #LogProfit(_N(gains,4),'开仓信息 钱:',initAccount.Balance,'--币:',initAccount.Stocks,'--开仓详情:',Dict)
            print_log(1,initAccount)
            return 1
        return 0

    except Exception,ex:
        Log('except Exception my_buy:',ex)
        return 0

def my_sell(): #平仓
    try:
        global buy_price,buy_qty,gains,ExitPeriod
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        if nowAccount.Stocks<=0.003:  #保证满足交易量
            Log('不满足最小交易量:',nowAccount.Stocks)
            return 1
        if _N(_C(exchange.GetTicker).Last,2)>buy_price+ExitPeriod:   #当前价格一定要大于  开仓价格
            Dict = ext.Sell(nowAccount.Stocks)
            #Dict ={"price":_C(exchange.GetTicker).Last}
            if(Dict):
                sell_gains=(Dict['price']-buy_price)*Dict['amount']
                gains=gains+sell_gains
                buy_price=0 #买入价格
                buy_qty=0  #买入数量
                LogProfit(_N(gains,4),'平仓信息 钱:',nowAccount.Balance,'--币:',nowAccount.Stocks,'--平仓详情:',Dict)#收益曲线
                print_log(0,nowAccount)
                return 1
        else:
            current_Last = _N(_C(exchange.GetTicker).Last,2)    ##当前价格
            data="不具备平仓条件:买入-当前=差价:%s-%s=%s"%(buy_price,current_Last,_N(buy_price-current_Last,2))
            print_log(0,nowAccount,data)
        return 0
    except Exception,ex:
        Log('except Exception my_sell:',ex)
        return 0

def stop_sell(): #强行平仓
    try:
        global buy_price,buy_qty,gains,ExitPeriod
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        if nowAccount.Stocks<=0.003:  #保证满足交易量
            Log('不满足最小交易量:',nowAccount.Stocks)
            return 1
        Dict = ext.Sell(nowAccount.Stocks)
        #Dict ={"price":_C(exchange.GetTicker).Last}
        if(Dict):
            sell_gains=(Dict['price']-buy_price)*Dict['amount']
            gains=gains+sell_gains
            buy_price=0 #买入价格
            buy_qty=0  #买入数量
            LogProfit(_N(gains,4),'止损/强行/平仓信息 钱:',nowAccount.Balance,'--币:',nowAccount.Stocks,'--平仓详情:',Dict)#收益曲线
            print_log(0,nowAccount)
            return 1
        return 0
    except Exception,ex:
        Log('except Exception stop_sell:',ex)
        return 0

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
    state = 3
    n=0
    min_n=0
    Log("run  ",outAccount)  #输出初始账户信息
    Ticker_list=[]   #历史均价
    min_list=[]  #分钟级均价
    #BotVS目前不支持多线程方法只能用下面的方法代替
    #循环以秒为单位
    #Interval_s到整的时候更新采集
    min_size_list=[]  #秒级 	采集样本
    current_Last=0  #当前历史均价
    while True:
        ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        #current_Last = _N(_C(exchange.GetTicker).Last,2)    ##当前价格
        history_Last=_N(Volume_averages(Ticker_list),2)    #历史均价
        ############################################################
        #更新秒级历史数据  min_size=10  #秒级 	采集样本数(交易价格)
        add_bool,f_list=add_min_list(min_size_list,ticker)  #添加秒级历史数据
        if add_bool:
            min_size_list=f_list
        current_Last=int(_N(Volume_min_averages(min_size_list),2))  #当前历史均价
        #Log('秒级历史均价数组:',min_size_list)
        #Log('秒级历史均价11:',current_Last)

        #更新历史数据
        if n<int(Interval_s):  #记录更新过一次
            min_list.append(ticker) #追加元素
            n+=1
        if n>=int(Interval_s): #重置
            min_Last=_N(Volume_averages(min_list),2)    #分钟级历史均价
            add_bool,f_list=add_list(Ticker_list,min_Last)  #更新数据
            if add_bool:
                Ticker_list=f_list
                min_list=[]  #分钟级均价 清空
            #Log('历史数据Ticker_list:',len(Ticker_list))
            n=0
            if (int(history_Last)>10 and int(current_Last)>10):
                data="历史平均-当前=差价:%s-%s=%s"%(history_Last,current_Last,_N(history_Last-current_Last,2))
                print_log(0,nowAccount,data)
                Log('当前数据:',data)
            else:
                Log('正在收集数据:',current_Last)
        ############################################################
        if (int(history_Last)>10 and int(current_Last)>10):
            end_Last=_N(history_Last-current_Last,2)
            #止损操作(已经买入了 当前价格下跌到一定值后 进行止损)
            if (state == 1):   #
                stop_Last=current_Last-buy_price
                if (stop_Last<stop_Period and stop_Last<0):
                    #Log('强行平仓:')
                    if stop_sell(): #强行平仓
                        state = 3
            #与最近20个成交价格的平均数相等或小于，可买入
            if end_Last>=EnterPeriod:
                if (state == 3):   #
                    data="小于当前行情价开仓:历史平均-当前=差价:%s-%s=%s"%(history_Last,current_Last,end_Last)
                    print_log(0,nowAccount,data)
                    state = 0
            #################################################
            if (state == 0):   #
                if my_buy(): #开仓
                    #Log('开仓')
                    state = 1
            if (state == 1):   #
                if my_sell(): #平仓
                    #Log('平仓')
                    state = 3
                    #################################################

        Sleep(1000)




