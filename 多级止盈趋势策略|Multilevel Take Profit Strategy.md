
> 策略名称

多级止盈趋势策略|Multilevel Take Profit Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]

- 策略名称: 多级止盈趋势策略
- 数据周期：多周期
- 支持：商品期货、数字货币
- 官方网站：www.quantinfo.com

  ![IMG](https://www.fmz.com/upload/asset/b8d89a704605b72bc44a56575a570bf6.png)

- 主图：
  上线，公式 ：UPPERLINE^^今开+BAND;
  下线，公式 ：LOWERLINE^^今开-BAND;
  均线，公式 ：均线^^MA(CLOSE,LENGTH);

- 副图：
  无

||

- Strategy Name: Multilevel Take Profit Strategy
- Data Cycle: Multi-Cycle
- Support: Commodity Futures, Digital Currency

  ![IMG](https://www.fmz.com/upload/asset/f5eedaf080c1616d41426efe01b6861d.png)  
  ![IMG](https://www.fmz.com/upload/asset/4f6ef3c138dfb6a669dcda326222520b.png) 

- Main chart：
  Upper line, formula：UPPERLINE^^TODAYOPEN+BAND;
  Lower line, formula：LOWERLINE^^TODAYOPEN-BAND;
  MA, formula：MALINE^^MA(CLOSE,LENGTH);

- Secondary chart：
  none

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|LENGTH|200|均线指标参数|MA index parameter|
|STOPRANGE|3|止损幅度|stop loss range|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-04-09 00:00:00
period: 1d
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
args: [["LENGTH",80]]
*)

STARTPER1:=5;  // 1级跟踪止盈，盈利5%启动
               // 1 level tracking take profit, if profit 5% then start

STOPPER1:=100; // 1级跟踪止盈，盈利回撤100%触发    
               // 1 level tracking take profit, if profit retracement is 100% then trigger
               
STARTPER2:=10; // 2级跟踪止盈，盈利10%启动
               // 2 level tracking take profit, if profit 10% then start

STOPPER2:=50;  // 2级跟踪止盈，盈利回撤50%触发   
               // 2 level tracking take profit, if profit retracement is 50% then trigger

STARTPER3:=20; // 3级跟踪止盈，盈利20%启动
               // 3 level tracking take profit, if profit 20% then start

STOPPER3:=20;  // 3级跟踪止盈，盈利回撤20%触发
               // 3 level tracking take profit, if profit retracement is 20% then trigger
    
// 上下区间
// Upper and lower intervals

NN:=BARSLAST(DATE<>REF(DATE,1))+1;  // 今天开盘到目前为止的周期数
                                    // The number of cycles since the opening today

TODAYOPEN:=VALUEWHEN(NN=1,O);       // 当天的开盘价
                                    // Opening price of the day

TODAYHIGH:=HHV(H,NN);                    // 今天全天的最高价，today’s highest price
TODAYLOW:=LLV(L,NN);                     // 今天全天的最低价，today’s lowest price
YESTDAYHIGH:=REF(TODAYHIGH,NN);          // 昨天全天的最高价，yesterday's highest price
YESTDAYLOW:=REF(TODAYLOW,NN);            // 昨天全天的最低价，yesterday's lowest price

BAND:=YESTDAYHIGH-YESTDAYLOW;
UPPERLINE^^TODAYOPEN+BAND;
LOWERLINE^^TODAYOPEN-BAND;
    
//均线
// MA
MALINE^^MA(CLOSE,LENGTH);
            
//开平仓条件
// When to open and close position
SKCOND: = C<LOWERLINE AND LOWERLINE<MALINE;
BKCOND: = C>UPPERLINE AND UPPERLINE>MALINE;
BPSHORT: = C>UPPERLINE OR C>MALINE;
SPLONG: = C<LOWERLINE OR C<MALINE;

//程序主体
//the mainbody of program
//开仓
//open position

SKCOND,SK;
BKCOND,BK;

//平仓
//close position
SPLONG,SP;
BPSHORT,BP;

//止盈        
//take profit     
SKLOW<=SKPRICE*(1-0.01*STARTPER3) AND HIGH>=SKLOW+(SKPRICE-SKLOW)*0.01*STOPPER3,BP;// 最大盈利达到"STARTPER3"%之后盈利回撤"STOPPER3"%,平空
                                                                                   // If profit get “STARTPER3”% and profit retracement get “STOPPER3”%, then close short position
BKHIGH>=BKPRICE*(1+0.01*STARTPER3) AND LOW<=BKHIGH-(BKHIGH-BKPRICE)*0.01*STOPPER3,SP;// 最大盈利达到"STARTPER3"%之后盈利回撤"STOPPER3"%,平多
                                                                                     // If profit get “STARTPER3”% and profit retracement get “STOPPER3”%, then close long position
SKLOW<=SKPRICE*(1-0.01*STARTPER2) AND HIGH>=SKLOW+(SKPRICE-SKLOW)*0.01*STOPPER2,BP;  // 最大盈利达到"STARTPER2"%之后盈利回撤"STOPPER2"%,平空
                                                                                     // If profit get “STARTPER2”% and profit retracement get “STOPPER2”%, then close short position
BKHIGH>=BKPRICE*(1+0.01*STARTPER2) AND LOW<=BKHIGH-(BKHIGH-BKPRICE)*0.01*STOPPER2,SP;// 最大盈利达到"STARTPER2"%之后盈利回撤"STOPPER2"%,平多
                                                                                     // If profit get “STARTPER2”% and profit retracement get “STOPPER2”%, then close long position
SKLOW<=SKPRICE*(1-0.01*STARTPER1) AND HIGH>=SKLOW+(SKPRICE-SKLOW)*0.01*STOPPER1,BP;// 最大盈利达到"STARTPER1"%之后盈利回撤"STOPPER1"%,平空
                                                                                   // If profit get “STARTPER1”% and profit retracement get “STOPPER1”%, then close short position
BKHIGH>=BKPRICE*(1+0.01*STARTPER1) AND LOW<=BKHIGH-(BKHIGH-BKPRICE)*0.01*STOPPER1,SP;// 最大盈利达到"STARTPER1"%之后盈利回撤"STOPPER1"%,平多
                                                                                     // If profit get “STARTPER1”% and profit retracement get “STOPPER1”%, then close long position

//止损
//stop loss
C>=SKPRICE*(1+STOPRANGE*0.01),BP; 
C<=BKPRICE*(1-STOPRANGE*0.01),SP; 
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128122

> 更新时间

2018-12-15 18:44:14
