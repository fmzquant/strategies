
> Name

布林马丁测试版V14

> Author

阿乐

> Strategy Description

my语言策略
回测结果还好，实盘跑了一段时间，拉夸，实盘盈利大概就是回测盈利对半分，跑不赢实盘费，风险高收益小，用的话再改改吧.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|N|0.002|资金使用率或手数|
|XX|true|加倍数值|
|sssss|true|实盘参数系数2|
|TC|0.001|首次下单量|
|FB|4|最大翻倍次数|
|CJ|2|加仓系数|
|BLD|false|1=中轨开仓-0=上下轨开仓|
|FX|2|0多-1空-2双开|
|len|26|趋势线周期|
|CJ2|2|平仓系数|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2022-04-01 00:00:00
end: 2022-04-09 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":100}]
args: [["N",1],["BLD",1],["RunMode",1,126961],["MaxCacheLen",3000,126961],["ContractType","swap",126961],["MinLot",0.001,126961],["LoopInterval",1,126961],["SyncDelay",1,126961],["MarginLevel",50,126961]]
*)


//幅图


N := 26; // 参数范围 5, 300
M := 26; // 参数范围 1, 100
P := 2; // 参数范围 1, 10


MID:=MA(CLOSE,N);
TMP2:=STD(CLOSE,M);
TOP:=MID+P*TMP2;
BOTTOM:=MID-P*TMP2;


hh^^HHV(H,len);//取一定周期内的最高价

ll^^LLV(L,len);//取一定周期内的最低价

hl2^^(hh+ll)/2;//最高价、最低价的平均值

avg^^MA(hl2,5);//对平均值计算平滑移动均线

//斜率:SLOPE(avg,len);// 对均线计算回归斜率





TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR:=WMA(TR,26); //求26个周期内真实波幅的简单移动平均
//TC:0.002;//MAX(ROUND(0.002*MONEY/500,3),0.002);//手续费0.023，杠杆50倍
账户金额:MONEY;
zongtc:=ABS(BKVOL+SKVOL);



//H20^^HHV(H,20)/2+LLV(L,20)/2;
//H10^^HHV(H,10)/2+LLV(L,10)/2;
BLD=0 AND FX=0 AND BKVOL=0 AND SKVOL=0 AND  CROSS(CLOSE,BOTTOM),BK(TC);//价格上穿布林带下轨开多
BLD=1 AND FX=0 AND BKVOL=0 AND SKVOL=0 AND  CROSS(CLOSE,MID),BK(TC);//价格上穿布林带中轨开多
FX=0 AND ISLASTBK AND C < BKPRICE-ATR*CJ , BK(ROUND(XX*BKVOL,3));
//双向
BLD=0 AND FX=2 AND BKVOL=0 AND SKVOL=0 AND  CROSS(CLOSE,BOTTOM),BK(TC);//价格上穿布林带下轨开多
BLD=1 AND FX=2 AND BKVOL=0 AND SKVOL=0 AND  CROSS(CLOSE,MID),BK(TC);//价格上穿布林带中轨开多
FX=2 AND ISLASTBK AND C < BKPRICE-ATR*CJ , BK(ROUND(XX*BKVOL,3));

//多止盈
BKVOL>0 AND C > BKPRICEAV+ATR*CJ2 , SP(BKVOL);
BKVOL>=0.008 AND C > BKPRICEAV+(ATR*CJ2)/2 , SP(0.001);


 //多=0空=1双向=2
BLD=0 AND FX=1 AND BKVOL=0 AND SKVOL=0 AND  CROSS(BOTTOM,CLOSE),SK(TC);//价格下穿布林带上轨开空
BLD=1 AND FX=1 AND  BKVOL=0 AND SKVOL=0 AND  CROSS(MID,CLOSE),SK(TC);//价格下穿布林带中轨开空
FX=1 AND ISLASTSK AND C > SKPRICE + CJ*ATR, SK(ROUND(XX*SKVOL,3));
//双向
BLD=0 AND FX=2 AND BKVOL=0 AND SKVOL=0 AND  CROSS(BOTTOM,CLOSE),SK(TC);//价格下穿布林带上轨开空
BLD=1 AND FX=2 AND  BKVOL=0 AND SKVOL=0 AND  CROSS(MID,CLOSE),SK(TC);//价格下穿布林带中轨开空
FX=2 AND ISLASTSK AND C > SKPRICE + CJ*ATR, SK(ROUND(XX*SKVOL,3));

SKVOL>0 AND C < SKPRICEAV - CJ2*ATR , BP(SKVOL);
SKVOL>=0.008 AND C < SKPRICEAV - (CJ2*ATR)/2 , BP(0.001);






TRADE_AGAIN(FB);
```

> Detail

https://www.fmz.com/strategy/345504

> Last Modified

2022-04-19 13:19:44
