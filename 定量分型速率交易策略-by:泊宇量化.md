
> 策略名称

定量分型速率交易策略-by:泊宇量化

> 策略作者

homily



> 策略参数



|参数|默认值|描述|
|----|----|----|
|len|35|len|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2019-01-01 00:00:00
end: 2020-05-08 00:00:00
period: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","fee":[0.05,0.05]}]
args: [["TradeAmount",200,126961],["ContractType","quarter",126961]]
*)

//len:=35;//设计周期数

hh^^HHV(H,len);//取一定周期内的最高价
ll^^LLV(L,len);//取一定周期内的最低价
hl2^^(hh+ll)/2;//最高价、最低价的平均值
avg^^MA(hl2,5);//对平均值计算平滑移动均线

ss:SLOPE(avg,len);// 对均线计算回归斜率

ss<REF(ss,1),SPK;//当斜率变小说明行情动能减弱，有下跌趋势，平多做空
ss>REF(ss,1),BPK;//当斜率变大说明行情动能不断增加，有上升趋势，平空做多
AUTOFILTER;



```

> 策略出处

https://www.fmz.com/strategy/183416

> 更新时间

2020-05-09 20:08:48
