
> Name

Trade01高低轨道线均线

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
|LENGE|260|LENGE|
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

VARIABLE:LOWERAFTERENTRY:0;
VARIABLE:HIGHERAFTERENTRY:0;
VARIABLE:MYPRICE2:0;
VARIABLE:MYPRICE3:0;

TRS:=60; //跟踪止损比例.	

// 指标计算
//交易量 
//LOTS:=MAX(1,INTPART(percent/100*MONEY/(C*MARGIN*UNIT)));//金本
LOTS:=MAX(1,INTPART(percent/100*MONEY*C/(MARGIN*UNIT)));//币本

MA1:=EMA(REF(C,1),240);
OPD:=BARSLAST(DATE<>REF(DATE,1))+1;
OO:=VALUEWHEN(OPD=1,O);  
RANGE1:= HIGH - LOW;
UPAVG^^HHV(((REF(HIGH,1)+REF(CLOSE,1))-(2*REF(CLOSE,1)))+OO, LENGE);     
LOWAVG^^LLV(((REF(CLOSE,1)+REF(LOW,1))-(2*REF(CLOSE,1)))+OO, LENGE);      
MEDIANPRICE:= (HIGH + LOW)*0.5;                  
UPBAND^^ MEDIANPRICE > REF(HIGH,1) AND RANGE1 > REF(RANGE1,1); 
DOWNBAND^^MEDIANPRICE < REF(LOW,1) AND RANGE1 > REF(RANGE1,1);  
	// 多头入场
BKVOL <> 1 AND 	REF(C,1)>MA1 AND REF(UPBAND,1) AND REF(CLOSE,1) > REF(UPAVG,1),BPK(LOTS);
IF BKVOL <> 1 AND REF(C,1)>MA1 AND REF(UPBAND,1) AND REF(CLOSE,1) > REF(UPAVG,1) THEN BEGIN
LOWERAFTERENTRY:=LOW;
END
	// 空头入场	
SKVOL <> -1 AND REF(C,1)<MA1 AND REF(DOWNBAND,1) AND REF(CLOSE,1) < REF(LOWAVG,1),SPK(LOTS);  
IF SKVOL <> -1 AND REF(C,1)<MA1 AND REF(DOWNBAND,1) AND REF(CLOSE,1) < REF(LOWAVG,1) THEN BEGIN
HIGHERAFTERENTRY:=HIGH;
END
	


	
 //------------------------------------------------------------------------------------------------
//记录入场后的最高价和最低价
//------------------------------------------------------------------------------------------------

	CLOSELP:=REF(CLOSE,1); 
    IF SKVOL = 1 AND  BKVOL=0 THEN BEGIN
	HIGHERAFTERENTRY:=MIN(HIGHERAFTERENTRY,H);
	END
	IF SKVOL = 1 AND  BKVOL=0 THEN BEGIN
	LOWERAFTERENTRY:=LOWERAFTERENTRY;
    END
	IF BKVOL =1 AND  SKVOL = 0 THEN BEGIN 
	LOWERAFTERENTRY:=MAX(LOWERAFTERENTRY,L);
	END 
	IF BKVOL =1 AND  SKVOL = 0 THEN BEGIN
	HIGHERAFTERENTRY:=HIGHERAFTERENTRY;
	END
	IF BKVOL > 0 OR SKVOL>0 AND BARPOS>0 THEN BEGIN
	HIGHERAFTERENTRY:=MIN(HIGHERAFTERENTRY,REF(HIGH,1));
	LOWERAFTERENTRY:=MAX(LOWERAFTERENTRY, REF(L,1));
	END
		 
		
 	IF  SKVOL=0 AND BKVOL=0 THEN BEGIN  // 自适应参数默认值；
		LIQKA:= 1;
	END
	IF (SKVOL>0 OR BKVOL>0) THEN BEGIN				 //当有持仓的情况下，LIQKA会随着持仓时间的增加而逐渐减小，即止损止盈幅度乘数的减少。
		LIQKA:=LIQKA - 0.1; 
		LIQKA:=MAX(LIQKA,0.5);
	END

	IF BKVOL>0 THEN BEGIN 
	 
	DLIQPOINT:= LOWERAFTERENTRY - (OPEN*TRS/1000)*LIQKA; //经过计算，这根吊灯出场线会随着持仓时间的增加变的越来越敏感；
	
	END
	IF SKVOL>0 THEN BEGIN
	KLIQPOINT: HIGHERAFTERENTRY + (OPEN*TRS/1000)*LIQKA; //经过计算，这根吊灯出场线会随着持仓时间的增加变的越来越敏感；

	END
	//------------------------------------------------------------------------------------------------
	//跟踪止损
	//------------------------------------------------------------------------------------------------
	// 持有多单时 价格下破自适应出场均线，平多单
 	IF BKVOL >0 AND BARSBK >0   AND C <= DLIQPOINT AND REF(C,1) >= REF(DLIQPOINT,1) AND DLIQPOINT>0 THEN BEGIN
		1,SP(BKVOL);
	END
	// 持有空单时 价格上破自适应出场均线，平空单
	IF SKVOL >0 AND BARSSK >0  AND C >= KLIQPOINT AND REF(C,1) <= REF(KLIQPOINT,1) AND KLIQPOINT>0 THEN BEGIN
		1,BP(SKVOL);
	END

```

> Detail

https://www.fmz.com/strategy/425798

> Last Modified

2023-09-04 22:33:31
