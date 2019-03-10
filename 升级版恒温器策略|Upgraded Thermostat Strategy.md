
> 策略名称

升级版恒温器策略|Upgraded Thermostat Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：升级版恒温器策略
- 数据周期：1H
- 支持：商品期货、数字货币期货、数字货币现货
- 官方网站：www.quantinfo.com

   ![IMG](https://www.fmz.com/upload/asset/bcf664987bac1aaff72110b1e3679d10.png)

- 主图：
  上轨，公式：TOP^^MAC+N_TMP*TMP;//布林通道上轨
  下轨，公式：BOTTOM^^MAC-N_TMP*TMP;//布林通道下轨

- 副图：
  CMI，公式 ： CMI:ABS(C-REF(C,N_CMI-1))/(HHV(H,N_CMI)-LLV(L,N_CMI))*100;//0-100 取值越大，说明趋势越强，CMI<20震荡模式，CMI>20为趋势

||

- Strategy Name: Upgraded Thermostat Strategy
- Data cycle: 1H
- Support: Commodity Futures, Digital Currency Futures, Digital Currency Spot

  ![IMG](https://www.fmz.com/upload/asset/0e0a008b14ac42a86128e2b86c3b990a.png)  
  ![IMG](https://www.fmz.com/upload/asset/925a0c3eae66fb4e6f2e94b9c775a90f.png)

- Main chart:
  upper track, formula: TOP^^MAC+N_TMPTMP; / / upper track of boll
  lower track, formula: BOTTOM^^MAC-N_TMPTMP;//lower track of boll

- Secondary chart:
  CMI, formula: CMI: ABS(C-REF(C,N_CMI-1))/(HHV(H,N_CMI)-LLV(L,N_CMI))*100;
  //0-100 the larger the value, the stronger the trend, CMI <20 is oscillation, CMI>20 is trend

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|STOPLOSS|true|止损价格百分比|stop loss price percentage|
|N|50|布林线指标参数1|boll index parameter 1|
|N_TMP|2|布林线指标参数2|boll index parameter 2|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-11-06 00:00:00
end: 2018-12-04 00:00:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*)

MAC:=MA(CLOSE,N);
TMP:=STD(CLOSE,N);
TOP^^MAC+N_TMP*TMP;      // 布林通道上轨
                         // upper track of ball
BOTTOM^^MAC-N_TMP*TMP;   // 布林通道下轨
                         // lower track of ball
BBOLL:=C>MAC;
SBOLL:=C<MAC;
N_CMI:=30;

CMI:ABS(C-REF(C,N_CMI-1))/(HHV(H,N_CMI)-LLV(L,N_CMI))*100;  // 0-100 取值越大，说明趋势越强，CMI<20震荡模式，CMI>20为趋势
                                                            // 0-100 the larger the value, the stronger the trend, CMI <20 is oscillation mode, CMI>20 is the trend

N_KD:=9;
M1:=3;
M2:=3;
RSV:=(CLOSE-LLV(LOW,N_KD))/(HHV(HIGH,N_KD)-LLV(LOW,N_KD))*100;     // 收盘价与N周期最低值做差，N周期最高值与N周期最低值做差，两差之间做比值。
                                                                   // (1)closing price - the lowest of cycle N, (2)the highest of cycle N - the lowest of cycle N, (1)/(2)
K:=SMA(RSV,M1,1);    // RSV的移动平均值
                     // MA of RSV
D:=SMA(K,M2,1);      // K的移动平均值
                     // MA of K
MIND:=30;
BKD:=K>D AND D<MIND;
SKD:=K<D AND D>100-MIND;

// 震荡模式
// oscillation mode
BUYPK1:=CMI < 20 AND BKD;      // 震荡多单买平开
                               // if it's oscillation, buy to cover and buy long immediately
SELLPK1:=CMI < 20 AND SKD;     // 震荡空单卖平开
                               // if it's oscillation, sell to close long position and sell short to open position immediately

// 趋势模式下原有震荡持仓的处理
// Disposal of the original oscillating position under the trend mode
SELLY1:=REF(CMI,BARSBK) < 20 AND C>BKPRICE*(1+0.01*STOPLOSS*3) AND K<D;     // 震荡多单止盈
                                                                            // if it's oscillation, long position take profit
BUYY1:=REF(CMI,BARSSK) < 20 AND C<SKPRICE*(1-0.01*STOPLOSS*3) AND K>D;      // 震荡空单止盈
                                                                            // if it's oscillation, short position take profit

// 趋势模式
// trend mode
BUYPK2:=CMI >= 20 AND C > TOP;        // 趋势多单买平开
                                      // if it's trend, buy to cover and buy long immediately
SELLPK2:=CMI >= 20 AND C < BOTTOM;    // 趋势空单卖平开
                                      // if it's trend, sell to close long position and sell short to open position immediately

// 趋势模式下原有震荡持仓的处理
// Disposal of the original oscillating position under the trend mode
SELLY2:=REF(CMI,BARSBK) >= 20 AND C>BKPRICE*(1+0.01*STOPLOSS*3) AND SBOLL;  // 趋势多单止盈
                                                                            // if it's trend, long position take profit
BUYY2:=REF(CMI,BARSSK) >= 20 AND C<SKPRICE*(1-0.01*STOPLOSS*3) AND BBOLL;   // 趋势空单止盈
                                                                            // if it's trend, short position take profit

SELLS2:=REF(CMI,BARSBK) >= 20 AND C<BKPRICE*(1-0.01*STOPLOSS) AND SBOLL;    // 趋势多单止损
                                                                            // if it's trend, long position stop loss
BUYS2:=REF(CMI,BARSSK) >= 20 AND C>SKPRICE*(1+0.01*STOPLOSS) AND BBOLL;     // 趋势空单止损
                                                                            // if it's trend, short position stop loss

IF BARPOS>N THEN BEGIN
    BUYPK1,BPK;
    SELLPK1,SPK;
    BUYPK2,BPK;
    SELLPK2,SPK;
END
BUYY1,BP(SKVOL);
BUYY2,BP(SKVOL);
BUYS2,BP(SKVOL);
SELLY1,SP(BKVOL);
SELLY2,SP(BKVOL);
SELLS2,SP(BKVOL);


```

> 策略出处

https://www.fmz.com/strategy/129086

> 更新时间

2018-12-18 15:48:27
