
> 策略名称

抛物线转向SAR与价格高低点策略

> 策略作者

Hukybo

> 策略描述

抛物线转向是一个很奇特的技术分析指标，由美国威尔斯·威尔德（Welles Wilder）发明，英文名字叫“Stop and Reverse”，简称“SAR”。这是一种使用非常简单，同时也非常流行的中低频趋势性技术分析工具。本篇文章的策略根据这个技术指标，并结合价格高低点的相对位置关系来开发策略。
[点击阅读更多内容](https://www.fmz.com/bbs-topic/4340)



> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2019-09-27 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb000",126961]]
*)

N:=30;         // 最高/低价参数
SLOSS:=1;      // 止盈止损系数
FUND:=100000;  // 初始资金

LOTS:=MAX(1,INTPART(FUND/(O*UNIT*0.1)));  // 计算下单量
SARLINE:=SAR(4,2,20);                     // 计算抛物线转向指标
B1:=SARLINE>0;                            // 判断是否上涨趋势
S1:=SARLINE<0;                            // 判断是否下跌趋势
B2:=HIGH>=HHV(CLOSE,N);                   // 判断最高价是否大于前期高点
S2:=LOW<=LLV(CLOSE,N);                    //  判断最低价是否小于前期低点

BARPOS>N AND B1 AND B2,BK(LOTS);                        // 开多单
BARPOS>N AND S1 AND S2,SK(LOTS);                        // 开空单
S1 AND S2 AND BKHIGH>BKPRICE*(1+0.01*SLOSS),SP(BKVOL);  // 多单止盈
B1 AND B2 AND SKLOW<SKPRICE*(1-0.01*SLOSS),BP(SKVOL);   // 空单止盈
C<BKPRICE*(1-SLOSS*0.01),SP(BKVOL);                     // 多单止损
C>SKPRICE*(1+SLOSS*0.01),BP(SKVOL);                     // 空单止损
```

> 策略出处

https://www.fmz.com/strategy/168073

> 更新时间

2019-09-28 17:34:44
