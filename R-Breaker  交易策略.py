'''
策略出处: https://www.botvs.com/strategy/23531
策略名称: R-Breaker  交易策略
策略作者: 太极
策略描述:

R-Breaker  交易策略

'''

#!/usr/local/bin/python
#-*- coding: UTF-8 -*-
#R-Breaker 交易策略
#策略提供者 @FJK   QQ:171938416
#改进  @太极  QQ:7650371

def my_buy(): #开仓
    try:
        global buy_price,buy_qty
        initAccount = ext.GetAccount()  #交易模板的导出函数， 获得账户状态，保存策略运行前账户初始状态
        opAmount=1
        PositionRatio =1
        #开仓之前判断有币没有没有先进行买入
        if int(initAccount.Stocks)>1:
            if buy_price<1:
                buy_price=_C(exchange.GetTicker).Last
                buy_qty=initAccount.Stocks
            #Log('开仓信息1 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
            return 1
        if int(initAccount.Stocks)<1:
            if int(str(initAccount.Stocks).replace('0.',''))>=3:
                if buy_price<1:
                    buy_price=_C(exchange.GetTicker).Last
                    buy_qty=initAccount.Stocks
                #Log('开仓信息2 仓内还有比:',initAccount.Stocks,'进行清空','--开仓详情:',initAccount)
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


import time
import datetime
def Caltime(date1,date2):   #计算运行天数
    try:
        date1=time.strptime(date1,"%Y-%m-%d %H:%M:%S")
        date2=time.strptime(date2,"%Y-%m-%d %H:%M:%S")
        date1=datetime.datetime(date1[0],date1[1],date1[2],date1[3],date1[4],date1[5])
        date2=datetime.datetime(date2[0],date2[1],date2[2],date2[3],date2[4],date2[5])
        return date2-date1
    except Exception,ex:
        Log('except Exception Caltime:',ex)
        return "except Exception"

start_timexx =time.localtime(time.time()) #time.clock()
start_time=time.strftime("%Y-%m-%d %H:%M:%S",start_timexx)
buy_price=0 #买入价格
buy_qty=0  #买入数量
gains=0  #盈利

beng_Account = ext.GetAccount()  #初始化信息
beng_ticker = _C(exchange.GetTicker).Last#Ticker 	市场行情   最后成交价
beng_Balance=(beng_Account.Stocks*beng_ticker)+beng_Account.Balance #初始化账户钱
def print_log(k_p,data=""):  #输出
    try:
        name=""
        if k_p:
            name="开仓"
        else:
            name="平仓"
        global beng_Account,beng_ticker,beng_Balance
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
        #################################################
        LogStatus("初始化投入2016/9/24  投入0.2个币=等于行情800RMB\r\n",
                  msg_data0,msg_data1,msg_data2,msg_data3,msg_data4,msg_data5,
                  "更新时间:%s\r\n"%(date1),
                  "%s"%(data)
                  )
        #################################################
        #################################################
        #################################################
    except Exception,ex:
        Log('except Exception print_log:',ex)

def my_sell(): #平仓
    try:
        global buy_price,buy_qty,gains,ExitPeriod
        ExitPeriod = 0
        nowAccount = ext.GetAccount()  #交易模板的导出函数  获取账户信息
        if nowAccount.Stocks<=0.002:  #保证满足交易量
            #Log('不满足最小交易量:',nowAccount.Stocks)
            return 1

        #history_Last=_N(Volume_averages(Ticker_list),2)    #历史均价
        #cur_last = _N(_C(exchange.GetTicker).Last,2)

        #if _N(_C(exchange.GetTicker).Last,2)>buy_price+ExitPeriod :   #当前价格一定要大于  开仓价格
        if True:
            #if _N(_C(exchange.GetTicker).Last,2)>buy_price+ExitPeriod and  history_Last - cur_last >0 and  history_Last - cur_last < 2 :   #当前价格一定要大于  开仓价格
            #Log('历史差价:',history_Last - cur_last)
            Dict = ext.Sell(nowAccount.Stocks)
            #Dict ={"price":_C(exchange.GetTicker).Last}
            if(Dict):
                #sell_count+=1
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

########################################################
def onTick():
    try:
        records =exchange.GetRecords()  #由你自己设定的周期数返回的数据
        HH = records[-2]['High'] #最日最高
        LC = records[-2]['Low']  #昨日最低
        HC = records[-2]['Close'] #昨日收盘
        LL = records[-2]['Low']  #昨日最低
        Pivot = (HH+HC+LC)/3 #枢轴点
        R1 = 2*Pivot-LC #阻力1
        R2 = Pivot+(HH-LC) #阻力2
        R3 = HH +2*(Pivot-LC) #阻力3

        S1 = 2*Pivot-HH  #支撑位1
        S2 = Pivot - (HH-LC)  #支撑位2
        S3 = LC-2*(HH-Pivot)  #支撑位3
        #Log('r1',R1,"R2",R2,'R3',R3)
        #Log('S1',S1,"S2",S2,'S3',S3)
        To = records[-1]['Open'] #今日开盘价
        Th = records[-1]['High'] #今日最高价
        Tl = records[-1]['Low'] #今日最低价
        current_price = _C(exchange.GetTicker).Last #当前价格

        #当前价格>阻力3   开仓
        if current_price > R3: #突破上轨开多
            if my_buy(): #Log('多')
                return

        #当前价格<支撑位3  平仓
        if current_price < S3: #突破下轨卖空
            if my_sell(): #Log('空')
                return

        # 条件1   今日最高价>阻力2
        # 条件2   今日最高价<阻力3
        # 条件3   当前价格<阻力1
        # 同时具备这3个条件平仓
        if Th >R2 and Th <R3 and current_price <R1: #趋势反转卖出
            if my_sell(): #Log('空')
                return

        # 条件1   今日最低价<支撑位2
        # 条件2   今日最低价>支撑位3
        # 条件3   当前价格<支撑位1
        # 同时具备这3个条件开仓
        if Tl <S2 and Tl >S3 and current_price <S1: #支撑位1
            if my_buy(): #Log('多')
                return
                # Log(records[-1])#今日K
                # Log(records[-2])#昨日K
                # Log(exchange.GetTicker())#当前

    except Exception,ex:
        Log('except Exception onTick:',ex)



def main():
    global outAccount
    outAccount = ext.GetAccount()  #初始化信息
    Log("run  ",outAccount)  #输出初始账户信息
    while True:
        onTick()
        Sleep(1000)


