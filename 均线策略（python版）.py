'''
策略出处: https://www.botvs.com/strategy/21157
策略名称: 均线策略（python版）
策略作者: 小小梦
策略描述:

均线策略（python版）教学性质，实盘慎用。


参数              默认值    描述
--------------  -----  ------
FastPeriod      3      入市快线周期
SlowPeriod      7      入市慢线周期
EnterPeriod     3      入市观察期
ExitFastPeriod  3      离市快线周期
ExitSlowPeriod  7      离市慢线周期
ExitPeriod      true   离市观察期
PositionRatio   0.8    仓位比例
Interval        10     轮询周期
'''

import types
def main():
    STATE_IDLE = -1
    state = STATE_IDLE
    initAccount = ext.GetAccount()
    while True:
        if state == STATE_IDLE :
            n = ext.Cross(FastPeriod,SlowPeriod) # 指标交叉函数
            if abs(n) >= EnterPeriod :
                opAmount = _N(initAccount.Stocks * PositionRatio,3)
                Dict = ext.Buy(opAmount) if n > 0 else ext.Sell(opAmount)
                if Dict :
                    opAmount = Dict['amount']
                    state = PD_LONG if n > 0 else PD_SHORT
                    Log("开仓详情",Dict,"交叉周期",n)
        else:
            n = ext.Cross(ExitFastPeriod,ExitSlowPeriod) # 指标交叉函数
            if abs(n) >= ExitPeriod and ((state == PD_LONG and n < 0) or (state == PD_SHORT and n > 0)) :
                nowAccount = ext.GetAccount()
                Dict2 = ext.Sell(nowAccount.Stocks - initAccount.Stocks) if state == PD_LONG else ext.Buy(initAccount.Stocks - nowAccount.Stocks)
                state = STATE_IDLE
                nowAccount = ext.GetAccount()
                LogProfit(nowAccount.Balance - initAccount.Balance,'钱：',nowAccount.Balance,'币：',nowAccount.Stocks,'平仓详情：',Dict2,'交叉周期：',n)
        Sleep(Interval * 1000)


