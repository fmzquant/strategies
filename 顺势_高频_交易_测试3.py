'''
策略出处: https://www.botvs.com/strategy/22183
策略名称: 顺势_高频_交易_测试3
策略作者: 太极
策略描述:

根据历史收盘价    小周期均价-大周期均价=值
根据上边的值来进行开仓

'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
Interval_s=30 #轮询(采集周期/秒)
Enter_large_cycle=10 #开仓 大周期
Enter_Small_cycle=3 #开仓 小周期
large1_Period=-1  #开仓大周期差值1
large2_Period=-1.5  #开仓大周期差值2
PositionRatio=0.7 #仓位比例

Exit_large_cycle=3 #平仓 大周期
Exit_Small_cycle=5 #平仓 小周期
ExitPeriod=2        #平仓观察期(开仓买入 大于 当前)
Exit_stop=4   #当完成这个开仓周期后 暂停几个周期不开仓


Small1_Period=0.4  #平仓小周期差值1

import time
import datetime
start_timexx =time.localtime(time.time()) #time.clock()
start_time=time.strftime("%Y-%m-%d %H:%M:%S",start_timexx)
buy_price=0 #买入价格
buy_qty=0  #买入数量
gains=0  #盈利
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

def add_min_list(Ticker_list,name,min_size):  #添加秒级历史数据
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

########################################################
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

outAccount = ext.GetAccount()  #初始化信息
outtickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
def print_log(k_p,data=""):
    try:
        name=""
        if k_p:
            name="开仓"
        else:
            name="平仓"
        global outAccount,outtickerx
        tickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        endAccount = ext.GetAccount()  #当前账户信息
        ######################################
        #盈利计算方法
        #盈利计算方法   浮动利润： 按 （现在币 - 初始币）x 现在的价格 + （现在的钱 - 初始的钱）
        diff_stocks=endAccount.Stocks-outAccount.Stocks    #比的差值
        diff_balance=endAccount.Balance-outAccount.Balance   #钱的差值
        new_end_balance=diff_stocks * tickerx + diff_balance #实现盈亏   #当前的盈利
        #盈利计算方法   账面利润 ： （现在币 x 现在价格+现在钱） - （初始币 x 初始价格 + 初始钱）
        new_end_balance2=(endAccount.Stocks*tickerx+endAccount.Balance)-(outAccount.Stocks*outtickerx+outAccount.Balance)
        #当前账户RMB
        end_rmb=(endAccount.Stocks*tickerx)+endAccount.Balance
        ######################################


        date1=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
        LogStatus("初始化投入2016/9/24  投入0.2个币=等于行情800RMB\r\n",
                  "本次初始化状态:",outAccount,
                  "\r\n当前运  行状态:",endAccount,
                  "\r\n本次开始运行时间:%s  已运行:%s\r\n"%(start_time,Caltime(start_time,date1)),
                  "浮动利润:%s(RMB)\r\n"%(str(_N(new_end_balance,3))),
                  "账面利润:%s(RMB)\r\n"%(str(_N(new_end_balance2,3))),
                  "当前状态:%s--钱:%s--币:%s=%s(RMB)\r\n"%(str(name),str(endAccount.Balance),str(endAccount.Stocks),str(end_rmb)),
                  "更新时间:%s\r\n"%(date1),
                  "%s"%(data)
                  ) # 测试
    except Exception,ex:
        Log('except Exception print_log:',ex)


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
            if initAccount.Stocks>=0.03:  #保证满足交易量
               # Log('不满足最小交易量:',initAccount.Stocks)
            #return 1   #当前价格一定要大于  开仓价格
            #if int(str(initAccount.Stocks).replace('0.',''))>=3:
                if buy_price<1:
                    buy_price=_C(exchange.GetTicker).Last
                    buy_qty=initAccount.Stocks
                Log('开仓信息2 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
                return 1

        #if int(str(initAccount.Stocks).replace('0.',''))==0:
        #这个地方有缺陷    仓位比例有缺陷
        #账户总钱数/开仓比例    *当前行情价
        tickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        scale=(initAccount.Balance/PositionRatio)*tickerx
        opAmount = _N(scale,3)  #买入数量
        Log("开仓没有币先进行 开仓买入%s元"%(str(opAmount)))   #生成LOG日志

        Dict = ext.Buy(opAmount)  #买入ext.Buy
        if(Dict):#确认开仓成功
            buy_price=Dict['price'] #买入价格   #{'price': 4046.446, 'amount': 1.5}
            buy_qty=Dict['amount']  #买入数量
            #LogProfit(_N(gains,4),'开仓信息 钱:',initAccount.Balance,'--币:',initAccount.Stocks,'--开仓详情:',Dict)
            print_log(1)
            return 1
        return 0
    except Exception,ex:
        Log('except Exception my_buy:',ex)
        return 0

def my_sell(): #平仓
    try:
        global buy_price,buy_qty,gains,ExitPeriod
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        if nowAccount.Stocks<=0.03:  #保证满足交易量
            Log('不满足最小交易量:',nowAccount.Stocks)
            return 1   #当前价格一定要大于  开仓价格
        Dict = ext.Sell(nowAccount.Stocks)
        #Dict ={"price":_C(exchange.GetTicker).Last}
        if(Dict):
            sell_gains=(Dict['price']-buy_price)*Dict['amount']
            gains=gains+sell_gains
            buy_price=0 #买入价格
            buy_qty=0  #买入数量
            LogProfit(_N(gains,4),'平仓信息 钱:',nowAccount.Balance,'--币:',nowAccount.Stocks,'--平仓详情:',Dict)#收益曲线
            print_log(0)
            return 1
        return 0
    except Exception,ex:
        Log('except Exception my_sell:',ex)
        return 0
########################################################


def main():
    global buy_price
    n=0
    state = 3   #开仓状态
    value1_data=0  #大周期 差值
    value2_data=0  #小周期 差值
    Log("run  ",outAccount)  #输出初始账户信息
    Close1_list=[]  #开仓 大周期
    Close2_list=[]  #开仓 小周期

    Close3_list=[]  #平仓 大周期
    Close4_list=[]  #平仓 小周期

    min_size=10   #获取秒级数据量
    min_list=[]  #秒级均价
    min_size_list=[]  #秒级 	采集样本
    current_Last=0  #当前历史均价

    b=0  #开仓
    a=0  #平仓
    while True:
        try:
            #nowAccountx = ext.GetAccount()  #交易模板的导出函数  获取账户信息
            tickerx = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价

            # add_bool,f_list=add_min_list(min_size_list,tickerx,min_size)  #添加秒级历史数据
            # if add_bool:
            #     min_size_list=f_list
            # current_Last=int(_N(Volume_min_averages(min_size_list),2))  #当前历史均价
        #更新历史数据
            if n<int(Interval_s):  #记录更新过一次
                n+=1
            if n>=int(Interval_s): #重置
                n=0
                ###########################
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
                            minuN_Close=_N(minu2_Close-minu1_Close,3)
                            data="小周期均价减去大周期均价:%s"%(str(minuN_Close))
                            print_log(0,data)
                            if (float(large1_Period)>=float(minuN_Close) and float(minuN_Close)>=float(large2_Period)):  #判断这个差值在这个区间内则开仓
                                #Log("ssssssssssssssssssssss",state)
                                if (state == 3):   #
                                    state = 0   #开仓
            #########################################################################
            EnterPeriod=1       #开仓观察期
            ExitPeriod=1        #平仓观察期
            if (state == 0):   #
                n = tickerx
                #data="开仓 xxx检测成交价%s"% \
                #     (str(tickerx))
                #Log(data)
                #if n<0:  #确定当前为死叉
                #if b>=int(n): #说明现在还是在下跌涨趋势
                if ((n >= b-0.5) and (n <=b+0.5)):
                    b=int(n)
                else: #开始下跌  开仓
                    if(int(n)>=int(b)+int(EnterPeriod)):  #确认上行走势 至自己定义的点
                        if my_buy(): #开仓
                            #buy_price=tickerx
                            data="开仓 当前成交价%s"% \
                                 (str(tickerx))
                            Log(data)
                            b=0
                            state = 1
            if (state == 1):   #
                n = tickerx
                #if n>0:  #确定当前为金叉
                #计算2个值的差值    还是    +-   指定范围
                #if a<=int(n): #说明现在还是在上涨趋势
                if ((n >= a-0.5) and (n <=a+0.5)):
                    a=int(n)
                else: #开始下跌  平仓
                    #if(int(n)<=int(a)-int(ExitPeriod)):  #确认下行走势 至自己定义的点
                    if tickerx>buy_price+ExitPeriod:   #
                        if my_sell(): #平仓
                            data="平仓  开仓价格%s 当前成交价%s"% \
                                 (str(buy_price),str(tickerx))
                            Log(data)
                            a=0
                            state = 3
                            if Exit_stop:  #当完成这个开仓周期后 暂停几个周期不开仓
                                Log('完成当前一次交易----暂停几个周期不开仓')
                                Sleep((Interval_s*Exit_stop)* 1000)
            #################################################


            #Log('xxxx大周期:',len(Close1_list))
            #Log('xxxx小周期:',len(Close2_list))
            Close1_list=[]  #大周期  清空
            Close2_list=[]  #小周期  清空

            Close3_list=[]  #平仓 大周期
            Close4_list=[]  #平仓 小周期
        except Exception,ex:
            Log('except Exception main:',ex)
        Sleep(1000)



