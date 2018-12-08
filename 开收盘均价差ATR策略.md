
> 策略名称

开收盘均价差ATR策略

> 策略作者

littleDreamXX

> 策略描述

- 策略进场：开盘价和收盘价均价差决定趋势，与ATR结合，进场点也是反向出场点；
- 策略出场：开仓就定好止损点，趋势转向出场；
- 数据周期：日线
- 数据合约：指数合约
- 交易合约：主力合约
- 适合品种：沪铝、沥青、淀粉、热卷、铁矿石、焦炭、鸡蛋、郑醇、螺纹、橡胶、锰硅、郑煤等
- 官方网站：[WWW.QUANT.LA](WWW.QUANT.LA)

- 主图：
  无

- 副图：
  显示：ATR，公式  ATR^^MA(TR,N);
  显示 ：C_O，公式  C_O:EMA(C,N)-EMA(O,N);

![IMG](https://www.fmz.com/upload/asset/ab8d909c6464234b06ef1f116a4de200.png)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|20|ATR指标参数|
|M|5|BAND系数|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-10-01 00:00:00
end: 2018-11-30 00:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","balance":20000}]
*)

// 变量
LOTS:=MAX(1,INTPART(MONEYTOT/(O*UNIT*0.1)));
C_O:EMA(C,N)-EMA(O,N);
B:=CROSSUP(C_O,0);
S:=CROSSDOWN(C_O,0);
TR:=MAX(MAX((H-L),ABS(REF(C,1)-H)),ABS(REF(C,1)-L));
ATR:MA(TR,N);
BAND:=ATR*0.1*M;
PRICE_BPK:=VALUEWHEN(B,H+BAND);
PRICE_SP:=VALUEWHEN(B,L-BAND);
PRICE_SPK:=VALUEWHEN(S,L-BAND);
PRICE_BP:=VALUEWHEN(S,H+BAND);

// 策略逻辑
BARPOS>N AND C_O>0  AND C>=PRICE_BPK,BPK(LOTS);
BARPOS>N AND C_O<0  AND C<=PRICE_SPK,SPK(LOTS);

// 下单
S,SP(BKVOL);
B,BP(SKVOL);

C<=PRICE_SP,SP(BKVOL);
C>=PRICE_BP,BP(SKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128136

> 更新时间

2018-12-03 11:42:38
