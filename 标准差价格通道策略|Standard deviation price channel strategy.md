
> 策略名称

标准差价格通道策略|Standard deviation price channel strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 数据周期：30分钟左右
- 支持 数字货币现货、数字货币期货
- 官方网站：www.quantinfo.com

商品期货回测
![IMG](https://www.fmz.com/upload/asset/f58bc64ccfc4dca7cc1905b238f07dd7.png)

数字货币回测
![IMG](https://www.fmz.com/upload/asset/5a92307691b3946e7bc5be0cb58a1e26.png)

- 主图：
  上线， 公式 ： UPPERBAND^^AVGVALUE + SHIFTVALUE;
  下线， 公式 ： LOWERBAND^^AVGVALUE - SHIFTVALUE;

- 副图：
  标准差，公式：STDS:STD(C,10);
  标准差，公式：STDL:STD(C,60);

||

- Data cycle: about 30 minutes
- Support: Digital Currency Spot, Digital currency Futures
- Support: Commodity futures

- Digital Currency backtest:
  
  ![IMG](https://www.fmz.com/upload/asset/d5830a58e1b3aca111849d77173ac822.png)  

  ![IMG](https://www.fmz.com/upload/asset/5bbb1e2f4030ce3116263aa6a65a4be9.png)  

  ![IMG](https://www.fmz.com/upload/asset/e5a726a2bfe6570c06dd043c9ee5545c.png) 

- Main chart:
  upper line, formula: UPPERBAND^^AVGVALUE + SHIFTVALUE;
  lower line, formula: LOWERBAND^^AVGVALUE - SHIFTVALUE;

- Secondary chart:
  standard deviation, formula: STDS: STD (C, 10);
  standard deviation, formula: STDL: STD (C, 60);

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|STOPRANGE|true|止损幅度|Stop loss range|
|N|20|均线参数|average line index|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-05-01 00:00:00
end: 2018-06-30 00:00:00
period: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["ContractType","this_week",126961]]
*)

TPRICE:=(HIGH+LOW+OPEN+CLOSE)/4;
AVGVALUE:=MA(TPRICE,N);
//求最高价减去最低价，一个周期前的收盘价减去最高价的绝对值，一个周期前的收盘价减去最低价的绝对值，这三个值中的最大值
// Find the maximum of these three values: highest price minus lowest price, the absolute value of (closing price a cycle ago minus the highest price）, the absolute value of （closing price a cycle ago minus the lowest price）

TR:=MAX(MAX((HIGH-LOW),ABS(REF(CLOSE,1)-HIGH)),ABS(REF(CLOSE,1)-LOW));
SHIFTVALUE:=MA(TR,N);                   // 求N个周期内的TR的简单移动平均
                                        // Find the simple moving average of TR in N cycles
UPPERBAND^^AVGVALUE + SHIFTVALUE;
LOWERBAND^^AVGVALUE - SHIFTVALUE;
STDS:STD(C,10);
STDL:STD(C,60);

BKVOL=0 AND HIGH >= UPPERBAND AND STDS>=STDL,BPK;
SKVOL=0 AND LOW <= LOWERBAND AND  STDS>=STDL,SPK;
BKVOL>0 AND BKHIGH-BKPRICE>=0.2*CLOSE AND C<LOWERBAND,SP;
SKVOL>0 AND SKPRICE-SKLOW>=0.2*CLOSE AND C>UPPERBAND,BP;

//止损
//Stop loss

C>=SKPRICE*(1+STOPRANGE*0.01),BP;
C<=BKPRICE*(1-STOPRANGE*0.01),SP;

AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128121

> 更新时间

2019-08-20 11:02:10
