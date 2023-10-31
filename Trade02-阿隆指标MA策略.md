
> Name

Trade02-阿隆指标MA策略

> Author

作手君TradeMan

> Strategy Description

为回馈FMZ平台与社区，进行策略&代码&思路&模板的分享

简介：
量价因子组合

✱联系方式 (欢迎交流讨论，共同学习进步)
WECHAT: haiyanyydss
TEL: https://t.me/JadeRabbitcm
✱Fully automatic CTA & HFT trading system @2018 - 2023

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|N|240|N|
|percent|5|percent|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2018-01-01 09:00:00
end: 2021-07-30 15:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","stocks":10,"fee":[0.05,0.05]}]
args: [["N",120],["SlideTick",0,126961],["ContractType","quarter",126961]]
*)



//LOTS:=MAX(1,INTPART(percent/100*MONEYTOT/(C*MARGIN*UNIT)));//金本
LOTS:= MAX(1,INTPART(percent/100*MONEYTOT*C/(MARGIN*UNIT)));//币本

MALONG:EMA(REF(C,1),N); //计算长期均线
HH_N:MIN(BARSLAST(HHV(H,N)>HHV(REF(H,1),N))+1,N);//计算回看时间内出现最高价之后的天数
LL_N:MIN(BARSLAST(LLV(L,N)<LLV(REF(L,1),N))+1,N);//计算回看时间内出现最低价之后的天数
	
//	N： 回看的时间窗口  HH_N: 回看时间内出现最高价之后的天数  LL_N: 回看时间内出现最低价之后的天数

AROON_UP:=(N-HH_N)/N * 100;//计算高价阿隆指标
AROON_DN:=(N-LL_N)/N * 100;//计算低价阿隆指标
AROON:=AROON_UP-AROON_DN;//计算阿隆指标差值

//*使用方法
//（1） 当 AROON_UP 上穿 70，并且 AROON>0，说明上涨趋势形成，产生买入信号； 
//（2） 当 AROON_DOWN 上穿 70，并且 AROON<0，说明下跌趋势形成，产生卖出信号； 
//（3） 当 AROON_UP 下穿 30，并且 AROON<0，说明上涨趋势减弱，可能反转下跌，产生卖出信号； 
//（4） 当 AROON_DOWN 下穿 30，并且 AROON>0，说明下跌趋势减弱，可能反转上涨，产生买入信号。*/
	
DCOND1:=CROSSUP(AROON_UP,70) AND AROON>0;//计算多头开仓条件一
DCOND2:=CROSSDOWN(AROON_DN,30) AND AROON>0;//计算多头开仓条件二
KCOND1:=CROSSUP(AROON_DN,70) AND AROON<0;//计算空头开仓一
KCOND2:=CROSSDOWN(AROON_UP,30) AND AROON<0;//计算空头开仓二
	
PDCOND1:=AROON>0 AND CROSSDOWN(AROON_UP,50);//计算多头平仓条件,当AROON大于0且AROON_UP死叉50，平多；
PKCOND1:=AROON<0 AND CROSSDOWN(AROON_DN,50);//计算空头平仓条件，当AROON小于0且AROON_DN死叉50，平空；

(DCOND1 OR DCOND2) AND BKVOL<=0 AND C>MALONG, BPK(LOTS);//多头开仓条件1或者2满足， 同时没有多头持仓，价格大于长期均线，开多；
(KCOND1 OR KCOND2) AND SKVOL<=0 AND C<MALONG, SPK(LOTS);// 空头开仓条件1或者2满足，同时没有空头持仓，价格小于长期均线，开空；

PDCOND1,SP(BKVOL);//平多条件
PKCOND1,BP(SKVOL);//平空条件
```

> Detail

https://www.fmz.com/strategy/425796

> Last Modified

2023-09-04 22:33:13
