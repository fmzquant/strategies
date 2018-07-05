'''
策略出处: https://www.fmz.com/strategy/89969
策略名称: 判断MA线的排列 - btcdw
策略作者: 比特币大王www.btcdw.com
策略描述:



'''

def main():                                          #
    records = exchange.GetRecords(PERIOD_M3)         #获取3分钟K线数据
    ma_5 = TA.MA(records, 5)                         #返回一个5分钟移动平均线数组
    ma_10 = TA.MA(records, 10)                       #返回一个10分钟移动平均线数组
    ma_20 = TA.MA(records, 20)                       #返回一个20分钟移动平均线数组
    if len(ma_5) == len(ma_10) == len(ma_20):        #判断3线数组是不是一样长
        for i in range(0, len(ma_5)):                #从0开始遍历ma_5数组到最大元素（次数）个数
            if ma_5[i] > ma_10[i] > ma_20[i]:        
                Log("1") 
                Sleep(1000)
            elif ma_5[i] < ma_10[i]< ma_20[i]:       
                Sleep(1000)
                Log("0")                            

