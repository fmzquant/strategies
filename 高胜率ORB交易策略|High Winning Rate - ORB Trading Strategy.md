
> 策略名称

高胜率ORB交易策略|High Winning Rate - ORB Trading Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：高胜率ORB交易策略
- 数据周期：日K
- 支持：商品期货
- 官方网站：www.quantinfo.com

   ![IMG](https://www.fmz.com/upload/asset/860ae7cefa35c714a7f3c028ad77e656.png) 

- 主图：
  均线，           公式：MAC^^MA(CLOSE,LENGTH);
  最高价均线，公式：MA_HH^^MA(HHV(HIGH,LENGTH),LENGTH);
  最低价均线，公式：MA_LL^^MA(LLV(LOW,LENGTH),LENGTH);
  
  上轨，公式：UPBAND^^O_TODAY+BAND;
  下轨，公式：DOWNBAND^^O_TODAY-BAND;

- 副图：
   无

||

- Policy Name: High Winning Rate - ORB Trading Strategy
- Data Cycle: Daily
- Support: Commodity Futures

  ![IMG](https://www.fmz.com/upload/asset/5af37a668117bf82ffd3270e6792752f.png)  
  ![IMG](https://www.fmz.com/upload/asset/bdafbb088fd859227800705a1c16edca.png) 

- Main chart:
  MA, formula: MAC ^^ MA (CLOSE, LENGTH);
  MA of highest price, formula: MA_HH^^ MA (HHHV (HIGH, LENGTH), LENGTH;
  MA of lowest price, formula: MA_LL^^ MA (LLV (LOW, LENGTH), LENGTH;
  Upper track, formula: UPBAND ^^ O_TODAY + BAND;
  Lower track, formula: DOWNBAND ^^ O_TODAY-BAND;

- Secondary chart:
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N_DAY|10|N日周期|N day cycle|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-03-01 00:00:00
end: 2018-09-30 00:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","rb888",126961]]
*)

NN:=BARSLAST(DATE<>REF(DATE,1))+1;
LENGTH_DAY:=HHV(NN,NN+62);
O_TODAY:=VALUEWHEN(NN=1,OPEN);
H_TODAY:=HHV(HIGH,NN);
L_TODAY:=LLV(LOW,NN);
H_YESTERDAY:=REF(H_TODAY,NN);
L_YESTERDAY:=REF(L_TODAY,NN);
C_YESTERDAY:=REF(C,NN);
LENGTH:=N_DAY*LENGTH_DAY;
DISTANCE:=MA(H_YESTERDAY-L_YESTERDAY,LENGTH);
ORB:=MIN(ABS(H_YESTERDAY-C_YESTERDAY),ABS(L_YESTERDAY-C_YESTERDAY));
BAND:=MAX(ORB,DISTANCE*0.1);
UPBAND^^O_TODAY+BAND;
DOWNBAND^^O_TODAY-BAND;
MAC^^MA(CLOSE,LENGTH);
MA_HH^^MA(HHV(HIGH,LENGTH),LENGTH);
MA_LL^^MA(LLV(LOW,LENGTH),LENGTH);

BUYPK:=CLOSE>UPBAND AND CLOSE>MAC AND CLOSE>MA_HH;
SELLPK:=CLOSE<DOWNBAND AND CLOSE<MAC AND CLOSE<MA_LL;
SELLY:=CLOSE<MAC AND CLOSE>BKPRICE;
BUYY:=CLOSE>MAC AND CLOSE<SKPRICE;

IF BARPOS>LENGTH THEN
BEGIN 
	BKVOL=0 AND BUYPK,BPK;
	SKVOL=0 AND SELLPK,SPK;
END
SELLY,SP(BKVOL);
BUYY,BP(SKVOL);

```

> 策略出处

https://www.fmz.com/strategy/129084

> 更新时间

2018-12-18 10:46:04
