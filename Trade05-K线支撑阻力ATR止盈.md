
> Name

Trade05-K线支撑阻力ATR止盈

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
|LENTH|250|LENTH|
|percent|5|percent|


> Source (MyLanguage)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2021-06-30 23:59:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD","stocks":10}]
args: [["percent",5],["ContractType","quarter",126961]]
*)


ATRS:=50;

//交易量 
//LOTS:=MAX(1,INTPART(percent/100*MONEY/(C*MARGIN*UNIT)));//金本
LOTS:=MAX(1,INTPART(percent/100*MONEY*C/(MARGIN*UNIT)));//币本

// 计算当前K线的加权均值、阻力线和支撑线
AVGP:=(HIGH + LOW + (CLOSE * 2)) / 4;
RS^^HHV((AVGP * 2) - LOW,LENTH);
ST^^LLV((AVGP * 2) - HIGH,LENTH);

	// 计算ATR
TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
ATRVAL:=MA(TR,LENTH);
	

	// 开仓
IF BKVOL<=1 AND HIGH >= REF(RS,1) AND VOL > 0 THEN BEGIN
		1,BPK(LOTS);
END
IF SKVOL<=1 AND LOW <= REF(ST,1) AND VOL > 0  THEN BEGIN
		1,SPK(LOTS);
END
	
	
// 开仓时根据开仓BAR的ATR计算止盈价
IF BKVOL>0 AND BARSBK>0 THEN BEGIN

MYEXITPRICE:=BKPRICE + ATRVAL * ATRS;

END
IF SKVOL>0 AND BARSSK>0 THEN BEGIN

MYEXITPRICE:=SKPRICE - ATRVAL * ATRS;

END
		
	// 平仓
IF BKVOL>0 AND BARSBK>0 AND VOL>0 THEN BEGIN
		// 止盈出场
		IF HIGH >= MYEXITPRICE THEN BEGIN
		1,SP(LOTS);
		END
END
	
IF SKVOL>0 AND BARSSK>0 AND VOL>0 THEN BEGIN
		// 止盈出场
		IF LOW <= MYEXITPRICE THEN BEGIN
		1,BP(LOTS);
		END
END
```

> Detail

https://www.fmz.com/strategy/425800

> Last Modified

2023-09-04 22:33:45
