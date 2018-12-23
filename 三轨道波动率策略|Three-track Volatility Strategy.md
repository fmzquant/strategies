
> 策略名称

三轨道波动率策略|Three-track Volatility Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- K线走完下单：收盘价开仓、平仓
- 数据级别：日K线；

![IMG](https://www.fmz.com/upload/asset/785c3a0e4e8c164bc831b05dcdc355a3.png)

- 主图指标显示：
   MIDTR^^MA(C,CN);                                        // 确定MIDTR
   UPTR^^MIDTR+2*STD(C,CN);                       // 确定UPTR
   DOWNTR^^MIDTR-2*STD(C,CN);                  // 确定DOWNTR
   HPOINT^^HV(H,CN),DOT,COLORRED;          // 计算前一周期CN周期内最高价的最大值。
   LPOINT^^LV(L,CN),DOT,COLORBLUE;          // 计算前一周期CN周期内最低价的最小值。

- 副图：
  无

||

- Place order after K line is done, open or close position when closing price is determined
- Data Level: Daily K Line

   ![IMG](https://www.fmz.com/upload/asset/3a476a37c7f7a6939aab1d1ad7164e72.png)  
   ![IMG](https://www.fmz.com/upload/asset/63c9bc0e146e9a3164e78055b0154be7.png) 

- Main chart:
  MIDTR^^MA(C,CN); // Determine MIDTR
  UPTR^^MIDTR+2STD(C,CN); // Determine UPTR
  DOWNTR^^MIDTR-2STD(C,CN); // Determine DOWNTR
  HPOINT^^HV(H,CN), DOT, COLORRED; 
  // Calculate the maximum value of the highest price in the CN cycle of the previous cycle.
  LPOINT^^LV(L,CN), DOT, COLORBLUE; 
  // Calculate the minimum value of the lowest price in the CN cycle of the previous cycle.

- Secondary chart:
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|AMOUNT|true|单仓|single order opening amount|
|N|20|标准差周期数|cycles of standard deviation|
|MINN|20|CN最小值|minimum of CN|
|MAXN|60|CN最大值|maximum of CN|
|STOPRANGE|50|止损幅度|stop loss range|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2017-07-01 00:00:00
end: 2018-11-30 00:00:00
period: 1d
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["AMOUNT",1000],["TradeAmount",1000,126961],["ContractType","XBTUSD",126961]]
*)

// 确定CN 
// Determine CN 
VOLAT:=STD(C,N);                            // VOLAT（波动率）:M周期收盘价的标准差
                                            // VOLAT(volatility): Standard deviation of closing price in M-cycle
VOLATCHANGE:=(VOLAT-REF(VOLAT,1))/VOLAT;    // 2个VOLAT的变化率
                                            // Change rate of two VOLATs
N1:=(1+VOLATCHANGE)*MINN;                   // VOLATCHANGE ： 波动率变化
                                            // VOLATCHANGE ： Volatility change
N2:=INTPART(N1);                            // 取整
                                            // Rounding off an integer
N3:=MIN(N2,MAXN);                           // 确认CN不大于60
                                            // Confirm that CN is no more than 60
CN:=MAX(N3,MINN);                           // 确认CN不小于20
                                            // Confirm that CN is no less than 20
MIDTR^^MA(C,CN);                            // 确定MIDTR
                                            // Determine MIDTR
UPTR^^MIDTR+2*STD(C,CN);                    // 确定UPTR
                                            // Determine UPTR
DOWNTR^^MIDTR-2*STD(C,CN);                  // 确定DOWNTR
                                            // Determine DOWNTR
HPOINT^^HV(H,CN),DOT,COLORRED;              // 计算前一周期CN周期内最高价的最大值。
                                            // see main chart
LPOINT^^LV(L,CN),DOT,COLORBLUE;             // 计算前一周期CN周期内最低价的最小值。
                                            // see main chart

// 开仓
// open position
L<=LPOINT AND L<DOWNTR AND BARPOS>MINN,SK(AMOUNT);  // 当最低价小于DOWNTR和低点，且K线位置大于60，收盘价卖开
                                                    // when the lowest price <  the lowest point and DOWNTR,and the K-line position > 60, sell short the closing price
H>=HPOINT AND H>UPTR AND BARPOS>MINN,BK(AMOUNT);    // 当最高价大于UPTR和高点，且K线位置大于60，收盘价买开
                                                    // when the highest price > UPTR and the highest point, and the K-line position > 60, buy long the closing price
// 启动止损
// start stop loss
C>=SKPRICE*(1+STOPRANGE*0.001),BP(SKVOL);
C<=BKPRICE*(1-STOPRANGE*0.001),SP(BKVOL);

// 平仓
// close position
C<MIDTR,SP(BKVOL);                             // 当收盘价小于MIDTR，收盘价卖平
                                               // when closing price < MIDTR, sell the closing price
C>MIDTR,BP(SKVOL);                             // 当收盘价大于MIDTR，收盘价买平
                                               // when closing price > MIDTR, buy to cover the closing price

// 动态止损
// Dynamic stop loss
REF(BKHIGH,1)>BKPRICE*(1+2*0.001*STOPRANGE) AND C<HV(C,BARSBK)*(1-STOPRANGE*0.001),SP(BKVOL);  // 买开后最高价大于买开价*(1+2*0.001*STOPRANGE)，且收盘价小于买开后最高收盘价*(1-STOPRANGE*0.001)，收盘价卖平
                                                                                               // the highest price after buying long > buy long price*(1+2*0.001*STOPRANGE), and closing price < the highest closing price after buying long*(1-STOPRANGE*0.001), then sell closing price
REF(SKLOW,1)<SKPRICE*(1-2*0.001*STOPRANGE) AND C>LV(C,BARSSK)*(1+STOPRANGE*0.001),BP(SKVOL);   // 卖开后最低价小于卖开价*(1-2*0.001*STOPRANGE)，且收盘价大于卖开后最低收盘价*(1+STOPRANGE*0.001)，收盘价买平
                                                                                               // the lowest price after sellong short < sell short price *(1-2*0.001*STOPRANGE), and closing price > the lowest closing price after selling short*(1+STOPRANGE*0.001), then buy to cover closing price
```

> 策略出处

https://www.fmz.com/strategy/128129

> 更新时间

2018-12-18 12:21:38
