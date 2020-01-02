
> 策略名称

恒温器 Thermostat 择时策略研究

> 策略作者

Hukybo





> 源码 (麦语言)

``` pascal
// 回测配置 
(*backtest
start: 2011-01-01 09:00:00
end: 2019-01-01 15:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","minfee":0,"fee":[0,0]}]
args: [["SlideTick",0,126961],["ContractType","rb000",126961]]
*)

// 计算CMI指标用以区分震荡市与趋势市
CMI:=ABS(C-REF(C,29))/(HHV(H,30)-LLV(L,30))*100;

// 定义关键价格
KOD:=(H+L+C)/3;

// 震荡市中收盘价大于关键价格为宜卖市，否则为宜买市
BE:=IFELSE(C>KOD,1,0);
SE:=IFELSE(C<=KOD,1,0);

// 定义10日 ATR 指标
TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATR10:=MA(TR,10);

// 定义最高价与最低价3日均线
AVG3HI:=MA(H,3);
AVG3LO:=MA(L,3);

// 计算震荡市的进场价格
LEP:=IFELSE(C>KOD,O+ATR10*0.5,O+ATR10*0.75);
SEP:=IFELSE(C>KOD,O-ATR10*0.75,O-ATR10*0.5);
LEP1:=MAX(LEP,AVG3HI);
SEP1:=MIN(SEP,AVG3LO);

// 计算趋势市的进场价格
UPBAND:=MA(C,50)+STD(C,50)*2;
DNBAND:=MA(C,50)-STD(C,50)*2;

// 计算趋势市的出场价格
MA50:=MA(C,50);

// 震荡策略逻辑
CMI<20&&C>=LEP1,BK;
CMI<20&&C<=SEP1,SK;
CMI<20&&C>=AVG3HI,SP;
CMI<20&&C<=AVG3LO,BP;

// 趋势策略逻辑
CMI>=20&&C>=UPBAND,BK;
CMI>=20&&C<=DNBAND,SK;
CMI>=20&&C<=MA50,SP;
CMI>=20&&C>=MA50,BP;
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/127033

> 更新时间

2019-12-21 12:09:02
