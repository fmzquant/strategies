
> Name

KRT凯尔特纳通道

> Author

cyberking

> Strategy Description

ZF:=H-C; //振幅
DX:=H+L+C)/3; //典型价格
KRTHR^^EMA(DX,10)+EMA(ZF,10); //凯尔特纳上轨
KRTXR^^EMA(DX,10)-EMA(ZF,10); //凯尔特纳下轨



> Source (MyLanguage)

``` pascal
(*backtest
start: 2019-02-04 00:00:00
end: 2020-03-04 00:00:00
period: 1d
exchanges: [{"eid":"Huobi","currency":"BTC_USDT"}]
*)


ZF:=H-C; //振幅
DX:=H+L+C)/3; //典型价格
KRTHR^^EMA(DX,10)+EMA(ZF,10); //凯尔特纳上轨
KRTXR^^EMA(DX,10)-EMA(ZF,10); //凯尔特纳下轨
C>KRTHR,BPK;
C<KRTXR,SPK;
AUTOFILTER;
```

> Detail

https://www.fmz.com/strategy/188499

> Last Modified

2020-03-05 11:41:52
