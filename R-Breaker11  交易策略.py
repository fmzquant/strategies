'''
策略出处: https://www.botvs.com/strategy/23874
策略名称: R-Breaker11  交易策略
策略作者: 太极
策略描述:

R-Breaker  交易策略

'''

# botvs@f976b25629baf8373e73da860a54030d
#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
#删除反转止损
import math
import talib
def adjustFloat(v):
    v =math.floor(v*1000)
    return v/1000

def GetAccount():
    account = _C(exchange.GetAccount)
    while account == null:
        account = _C(exchange.GetAccount)
        Sleep(1000)
    return account

def GetTicker():
    ticker = exchange.GetTicker()
    while ticker ==null:
        ticker = exchange.GetTicker()
        Sleep(1000)
    return ticker
# def updateProfit(accountInit, accountNow, ticker):
#     netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy)
#     netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * ticker.Buy)
#     LogProfit(adjustFloat(netNow - netInit), accountNow)

#获取当期账户总额
def GetNowamount():
    account =GetAccount()
    ticker = exchange.GetTicker()
    return account.Balance + account.FrozenBalance + ((account.Stocks + account.FrozenStocks) * ticker.Buy)
#获取当前账户市值
def GetStockcap():
    account=GetAccount()
    ticker = GetTicker()
    return (account.Stocks + account.FrozenStocks) * ticker.Buy



#type 0 总持仓比例 1 可买入币的百分比
def my_buy(ratio,type):
    try:
        global InitAccount
        account = GetAccount()
        ticker=_C(exchange.GetTicker)
        #计算买入量
        if type == 0:
            unit =(GetNowamount()/ticker.Buy)*ratio - account.Stocks - account.FrozenStocks
        else:
            unit =((GetNowamount()/ticker.Buy) - account.Stocks - account.FrozenStocks)*ratio
        
        #不足最低交易退出买入操作
        if unit < exchange.GetMinStock():
            return 0
        Dict = ext.Buy(unit)  #买入ext.Buy
        if(Dict):#确认开仓成功
            #buy_price=Dict['price'] #买入价格   #{'price': 4046.446, 'amount': 1.5}
            #buy_qty=Dict['amount']  #买入数量
            #LogProfit(_N(gains,4),'开仓信息 钱:',initAccount.Balance,'--币:',initAccount.Stocks,'--开仓详情:',Dict)
            #updateProfit(InitAccount, GetAccount(), GetTicker())
            Balance_log() #收益计算
            print_log(1,InitAccount)
            return 1
        return 0
    except Exception,ex:
        Log('except Exception my_buy:',ex)
        return 0

def my_sell(ratio,type):
    try:
        global InitAccount
        account = GetAccount()
        if type == 0:
            unit = 1
        else:
            unit =(account.Stocks + account.FrozenStocks)*ratio

        if unit<exchange.GetMinStock():
            return 0

        Dict = ext.Sell(unit)
            #Dict ={"price":_C(exchange.GetTicker).Last}
        if(Dict):
            #updateProfit(InitAccount, GetAccount(), GetTicker())
            Balance_log() #收益计算
            print_log(0,GetAccount())
            return 1
    except Exception,ex:
        Log('except Exception my_sell:',ex)
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

beng_Account = ext.GetAccount()  #初始化信息
beng_ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
beng_Balance=(beng_Account.Stocks*beng_ticker)+beng_Account.Balance #初始化账户钱

def Balance_log(): #收益计算
    try:
        end_Account = ext.GetAccount()  #当前账户信息
        end_ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        end_Balance=(end_Account.Stocks*end_ticker)+end_Account.Balance #当前账面上钱数
        LogProfit(end_Balance-beng_Balance) 	#记录盈利值
    except Exception,ex:
        Log('except Exception Balance_log:',ex)

def print_log(k_p,data=""):  #输出
    try:
        name=""
        if k_p:
            name="开仓"
        else:
            name="平仓"
        global beng_Account,beng_ticker,beng_Balance
        global R1,R2,R3,S1,S2,S3
        global gains
        end_Account = ext.GetAccount()  #当前账户信息
        end_ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
        #################################################
        date1=time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))
        msg_data0=("本次开始运行时间:%s已运行:%s\r\n"%(start_time,Caltime(start_time,date1)))
        #################################################
        msg_data1=("本次初始化状态:%s\r\n当前运行状态:%s\r\n"%(beng_Account,end_Account))
        #################################################
        end_Balance=(end_Account.Stocks*end_ticker)+end_Account.Balance #当前账面上钱数
        msg_data2=("初始化钱:%s现在钱:%s盈亏:%s\r\n"%(str(beng_Balance),str(end_Balance),str(end_Balance-beng_Balance)))
        #################################################
        total = end_Account.Balance+end_Account.Stocks*_C(exchange.GetTicker).Last #账户总额
        roi = ((total/beng_Balance) -1)*100
        msg_data3=("当前状态:%s--钱:%s--币:%s--总值约:%.2f\r\n"%(str(name),str(end_Account.Balance),str(end_Account.Stocks),roi))
        #################################################
        income = total - beng_Account['Balance'] - beng_Account['Stocks']*beng_ticker #总盈亏
        msg_data4=("本次盈亏:%s(RMB)\t总盈亏:%.2f(RMB) %.2f\r\n"%(str(gains),income,roi))
        #################################################
        #盈利计算方法
        #盈利计算方法   浮动利润： 按 （现在币 - 初始币）x 现在的价格 + （现在的钱 - 初始的钱）
        diff_stocks=end_Account.Stocks-beng_Account.Stocks    #比的差值
        diff_balance=end_Account.Balance-beng_Account.Balance   #钱的差值
        new_end_balance=diff_stocks*end_ticker+diff_balance #实现盈亏   #当前的盈利
        #盈利计算方法   账面利润 ： （现在币 x 现在价格+现在钱） - （初始币 x 初始价格 + 初始钱）
        new_end_balance2=(end_Account.Stocks*end_ticker+end_Account.Balance)-(beng_Account.Stocks*beng_ticker+beng_Account.Balance)
        msg_data5=("浮动利润:%s(RMB)\r\n账面利润:%s(RMB)\r\n"%(str(_N(new_end_balance,3)),str(_N(new_end_balance2,3))))
        msg_data6 ='R1',R1,'R2',R2,'R3',R3,'\r\n'
        msg_data7 ='S1',S1,'S2',S2,'S3',S3,'\r\n'
        msg_data8 ="当前价格:",end_ticker,'\r\n'
        #################################################
        LogStatus("初始化投入2016/9/24  投入0.2个币=等于行情800RMB\r\n",
                  msg_data0,msg_data1,msg_data2,msg_data3,msg_data4,msg_data5,msg_data6,msg_data7,msg_data8,
                  "更新时间:%s\r\n"%(date1),
                  "%s"%(data)
                  )
        #################################################
        #################################################
        #################################################
    except Exception,ex:
        Log('except Exception print_log:',ex)




def _GetCommand():
    get_command=GetCommand()
    if get_command:
        global K1,K2,N
        arr =get_command.split(":")
        if arr[0] == 'K1':
            K1 = float(arr[-1])
        if arr[0] =='K2':
            K2 = float(arr[-1])
        if arr[0] =='N':
            N = int(arr[-1])


N=2

LastDeal = 0 #上次交易时间
def onTick(exchange):
    try:
        global R1,R2,R3,S1,S2,S3,short_state_buy,short_state_sell,LastDeal,task_state,buy_count,sell_count
        amount = GetAccount() # 获取账户状态
        records =exchange.GetRecords() #默认5分钟
        To = records[-1]['Open'] #今日开盘价
        Th = records[-1]['High'] #今日最高价
        Tl = records[-1]['Low'] #今日最低
        time = records[-1].Time
        if LastDeal == time:
            return 0
        else:
            LastDeal = 0

        
        records1 =exchange.GetRecords(PERIOD_M30) #监控周期
        #time =(records1[-2].Time - records1[-1].Time)/(60*1000)
        #Log(time);
        records.pop()
        records1.pop()
        ma5 = TA.MA(records1,5)
        ma10 = TA.MA(records1,10)
     


        # HH = records[-2]['High'] #最日最高
        # LC = records[-2]['Low']  #昨日最低
        HC = records[-1]['Close'] #昨日收盘
        # LL = records[-2]['Low']  #昨日最低
        HH = TA.Highest(records,N,'High') #N日high的最高价
            #lc = records[-2]['Low']
        #HC = TA.Lowest(records,N,'Close') #//N日close的最低价
            #hc = records[-2]['Close']
        #HH = TA.Highest(records,N,'Close') #N日close的最高价
            #ll = records[-2]['Low']
        LC = TA.Lowest(records,N,'Low') #//N日low的最低价
        #HC = TA.Highest(records,N,'Close')
        if ma5[-1] <ma10[-1]:
            HC = records[-1]['Open']

        Pivot = (HH+HC+LC)/3 #枢轴点
        Pivot = Pivot
        R1 = 2*Pivot-LC #阻力1W
        R2 = Pivot+(HH-LC) #阻力2
        R3 = HH +2*(Pivot-LC) #阻力3

        S1 = 2*Pivot-HH
        S2 = Pivot - (HH-LC)
        S3 = LC-2*(HH-Pivot)
        # Log('r1',R1,"R2",R2,'R3',R3)
        # Log('S1',S1,"S2",S2,'S3',S3)
        
        current_price = _C(exchange.GetTicker).Last #当前价格
        capratio = (amount.Stocks + amount.FrozenStocks)/GetNowamount()
        #突破上轨 和半小时 均线向上 资金大于100 则买入
        if ma5[-1] >ma10[-1] :
            if current_price > R3 and amount.Balance > 100 and ma5[-1] >ma10[-1] and capratio <0.8 and buy_count <3 :
               # Log(ma5[-1],ma10[-1])
                Log('开多')
                if my_buy(0.4,1):
                    LastDeal = time
                    sell_count = 0
                    buy_count+=1
                    return
            #突破下轨卖空 有币 进入卖出操作
            if current_price < S3 and amount.Stocks > 0.03 :
                Log('清仓')
                if my_sell(1,0):
                    sell_count+=1
                    buy_count = 0
                    LastDeal = time
                    return
            if Th >R2 and Th <R3 and current_price <R1 and current_price >S1   and amount.Stocks > 0.003 and buy_count <3:
                Log('趋势反转卖')
                if my_sell(0.5,1):
                    LastDeal = time
                    buy_count = 0
                    sell_count+=1
                    return
            if Tl <S2 and Tl >S3 and current_price <S1  and current_price < R1 and capratio <0.6 and ma5[-1] >ma10[-1] and buy_count <3 :
                #Log(ma5[-1],ma10[-1])
                Log('趋势反转买')
                if my_buy(0.2,1):
                    buy_count+=1
                    sell_count = 0
                    LastDeal = time
                    return
        else :
            if(current_price > R3 and amount.Stocks > 0.03):
                if my_sell(0.5,1):
                    Log('测试买')
                    LastDeal = time
                    return

            if (current_price < S3 and ma5[-1] >ma5[-5]):
                if my_buy(0.05,1):
                    Log('测试买入')
                    LastDeal = time
                    buy_count = 0
                    return






        


    except Exception,ex:
        Log('except Exception onTick:',ex)
        return 0


def main():
    global outAccount,init_price,InitAccount,short_state_buy,short_state_sell,task_state,buy_count,sell_count
    init_price = _C(exchange.GetTicker).Last
    InitAccount = GetAccount()
    Log(init_price)
    short_state_buy =short_state_sell = 0
    task_state =0
    buy_count = 0
    sell_count = 0
    while True:
            onTick(exchange)
            nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
            print_log(0,nowAccount)
            Sleep(1000) 
