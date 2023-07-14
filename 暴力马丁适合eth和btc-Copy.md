
> Name

暴力马丁适合eth和btc-Copy

> Author

Zer3192

> Strategy Description

ETH 每600美元0.002手设置，一个月盈利50%,建议每两个月把盈利取出来，因为马丁最后的归宿就是爆仓，天下没有不爆仓的马丁，建议有3份资金，也就是1800美元使用，btc没测试，总之很暴力就是了

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|N|0.002|资金使用率或手数|
|XX|true|加倍数值|
|sssss|true|实盘参数系数2|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2022-01-01 08:00:00
end: 2022-02-02 00:00:00
period: 6h
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT","balance":600,"fee":[0.008,0.025]}]
args: [["RunMode",1,126961],["TradeAmount",0.001,126961],["MaxCacheLen",3000,126961],["ContractType","swap",126961],["MinLot",0.001,126961],["LoopInterval",1,126961],["SyncDelay",1,126961],["MarginLevel",50,126961]]
*)




TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR:WMA(TR,10); //求26个周期内真实波幅的简单移动平均
TC:N;//MAX(ROUND(5/C*MONEY/200,3),0.002);//手续费0.023，杠杆50倍
yue:ABS(BKVOL+SKVOL);
junjia:ABS(BKPRICEAV+SKPRICEAV);



CCC^^WMA(C,20);
AA^^WMA(C,10);



BKVOL=0 AND SKVOL=0 AND  REF(AA,1)>REF(CCC,1)  , BK(TC);


ISLASTBK AND C < BKPRICE-ATR*0.1 , BK(ROUND(XX*BKVOL,3));


BKVOL>0 AND C > BKPRICEAV+ATR*0.1 , SP(BKVOL);




REF(AA,1)<REF(CCC,1)    AND BKVOL>0,SP(BKVOL);
 INFO(REF(AA,1)<REF(CCC,1)    AND BKVOL>0, '止损离场');
 
 

SKVOL=0 AND BKVOL=0 AND  REF(AA,1)<REF(CCC,1)  , SK(TC);



ISLASTSK AND C > SKPRICE + 0.1*ATR, SK(ROUND(XX*SKVOL,3));


SKVOL>0 AND C < SKPRICEAV - 0.1*ATR , BP(SKVOL);





REF(AA,1)>REF(CCC,1)   AND SKVOL>0,BP(SKVOL);
 INFO(REF(AA,1)>REF(CCC,1)AND SKVOL>0  , '止损离场');
MULTSIG(0, 0, 50, 0);
TRADE_AGAIN(100);
```

> Detail

https://www.fmz.com/strategy/343745

> Last Modified

2022-02-06 07:08:49
