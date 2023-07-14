
> Name

定量分型速率交易策略-by泊宇量化

> Author

homily



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|len|35|len|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2019-01-01 00:00:00
end: 2021-01-31 00:00:00
period: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","fee":[0.05,0.05]}]
args: [["TradeAmount",200,126961],["ContractType","quarter",126961]]
*)

//len:=35;//设计周期数
liang:=INTPART(MONEYTOT*REF(C,1)/100)*0.5;

hh^^HHV(H,len);//取一定周期内的最高价
ll^^LLV(L,len);//取一定周期内的最低价
hl2^^(hh+ll)/2;//最高价、最低价的平均值
avg^^MA(hl2,5);//对平均值计算平滑移动均线

ss:SLOPE(avg,len);// 对均线计算回归斜率

ss<REF(ss,1),SPK(liang*2);//当斜率变小说明行情动能减弱，有下跌趋势，平多做空
ss>REF(ss,1),BPK(liang);//当斜率变大说明行情动能不断增加，有上升趋势，平空做多
AUTOFILTER;



```

> Detail

https://www.fmz.com/strategy/183416

> Last Modified

2021-02-08 13:47:31
