
> 策略名称

CTA策略之均价振幅ATR策略

> 策略作者

扫地僧

> 策略描述

#### 一、摘要
在物理学中，振幅是在波动或振动中距离平衡位置或静止位置的最大位移，它是表示振动的范围和强度的物理量。而商品期货中的振幅就是：开盘后的当日最高价和最低价之间的差的绝对值与昨日收盘价的百分比，它在一定程度上表现该品种的活跃程度。另外还有一种当日振幅的简单的计算方式，即收盘价减去开盘价。本篇就以发明者量化平台(FMZ.COM)的MY语言开发一个均价振幅ATR策略。

#### 二、什么是振幅
对于CTA趋势跟踪策略来说，趋势行情是其获利来源，振幅直接反映了一个品种是否活跃，间接则反映了一个品种是否有趋势行情。振幅有很多计算方式：当日振幅、周期振幅等等...以周期振幅为例：

假如铁矿石10日前的收盘价是1000，当前K线最高价是1050，上涨5%，最低价是950，下跌5%，那么振幅就是10%。也就是说价格的振幅是当前K线最高价减去当前K线最低价，再除以前10日K线的收盘价就是其振富比。

除了周期振幅的计算方式外，还有一种更为简单的计算方式，即当日振幅：最高价减去最低价，或者收盘价减去开盘价。而本策略则是以N日的平均收盘价减去N日的平均开盘价为振幅的依据。

#### 三、什么是真实波动幅度
在这个策略中，真实波动幅度主要用于判断开盘仓的买卖时机。真实波动幅度(ATR)是计算一段时期内价格波动幅度的移动平均值。最初是由Welles Wilder在《技术交易系统中的新概念》中最先提出的。
 ![IMG](https://www.fmz.cn/upload/asset/39b9c63c7dfb9e749445.png) 
真实波动幅度(ATR)经常引用趋势跟踪策略中，如果ATR的值越高，表示价格的趋势性越强，反之ATR的值越低，表示价格的趋势性越弱。所以使用ATR作为策略开平仓条件的一部分，可以有效过滤部分震荡行情。

#### 四、策略实现
**第1步：计算均价振幅**
```
AMP     :   EMA(CLOSE, N) - EMA(OPEN, N);
AMPUP   :=  CROSSUP(AMP, 0);
AMPDOWN :=  CROSSDOWN(AMP, 0);
```
定义均价振幅(AMP)，即收盘价均线 - 开盘价均线

**第2步：计算真实波动幅度**
```
TR      :=  MAX(MAX((HIGH - LOW), ABS(REF(CLOSE, 1) - HIGH)), ABS(REF(CLOSE, 1) - LOW));
ATR     :=  MA(TR, N);
NATR    :=  ATR * X * 0.1;
```
首先计算出TR(即当天的真实波幅)，计算公式为：TR = 当天的高点—当天的低点；但有时候价格会出现跳空高开以及跳空低开的情况，在这种情况下，当天的TR值为：

- 跳空高开：TR = 当天的高点—昨天的收盘价
- 跳空低开：TR = 昨天的收盘价—当天的低点

由于一天TR有随机性，并不能代表最近市场整体波动率，所以用ATR更能衡量市场的波动性，常用的是14周期的ATR，即：ATR = （前13天的TR + 当天的TR）/ 14。最后为了针对部分品种，使用一个系数重新定义平均真实波幅(NATR)。

**第3步：计算开平仓价格**

- 多开价格：如果均价振幅上穿0，那么其价格是最高价+NATR
- 空开价格：如果均价振幅上穿0，那么其价格是最低价-NATR
- 多平价格：如果均价振幅下穿0，那么其价格是最低价-NATR
- 空平价格：如果均价振幅下穿0，那么其价格是最高价+NATR
```
BKP     :   VALUEWHEN(AMPUP, HIGH + NATR);
SPP     :   VALUEWHEN(AMPUP, LOW - NATR);
SKP     :   VALUEWHEN(AMPDOWN, LOW - NATR);
BPP     :   VALUEWHEN(AMPDOWN, HIGH + NATR);
```


**第4步：下单交易**
- 多头开仓：如果当前K线数量大于N，并且收盘价大于等于BKP
- 空头开仓：如果当前K线数量大于N，并且收盘价小于等于SKP
- 多头平仓：如果均价振幅是否下穿0，或者收盘价小于等于SPP
- 空头平仓：如果均价振幅是否上穿0，或者收盘价大于等于BPP
```
BARPOS > N AND CLOSE >= BKP, BK(1);
BARPOS > N AND CLOSE <= SKP, SK(1);
AMPDOWN OR CLOSE <= SPP, SP(1);
AMPUP OR CLOSE >= BPP, BP(1);
```


#### 五、策略回测
- 回测开始日期：2016-01-01
- 回测结束日期：2021-04-01
- 数据品种：铁矿石指数
- 数据周期：日线
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/3938661674465f7d8c24.png) 
**回测绩效**
 ![IMG](https://www.fmz.cn/upload/asset/3924442a65a184b28632.png) 
**收益概览**
 ![IMG](https://www.fmz.cn/upload/asset/39a22b8ecd2bddc2e5c9.png) 


> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|10|ATR周期|
|X|10|系数|


> 源码 (麦语言)

``` pascal
// 回测配置
(*backtest
start: 2016-01-01 00:00:00
end: 2021-04-01 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES","balance":20000}]
args: [["ContractType","i000",126961]]
*)

AMP     :   EMA(CLOSE, N) - EMA(OPEN, N);       // 定义均价振幅(AMP)，即收盘价均线 - 开盘价均线
AMPUP   :=  CROSSUP(AMP, 0);                    // 判断均价振幅是否上穿0，并赋值为AMPUP
AMPDOWN :=  CROSSDOWN(AMP, 0);                  // 判断均价振幅是否下穿0，并赋值为AMPDOWN
TR      :=  MAX(MAX((HIGH - LOW), ABS(REF(CLOSE, 1) - HIGH)), ABS(REF(CLOSE, 1) - LOW));  // 计算真实波幅(TR)
ATR     :=  MA(TR, N);                          // 计算平均真实波幅(ATR)
NATR    :=  ATR * X * 0.1;                      // 根据系数定义新的平均真实波幅(NATR)
BKP     :   VALUEWHEN(AMPUP, HIGH + NATR);      // 计算多开价格，如果均价振幅上穿0，那么其价格是最高价+NATR
SPP     :   VALUEWHEN(AMPUP, LOW - NATR);       // 计算多平价格，如果均价振幅上穿0，那么其价格是最低价-NATR
SKP     :   VALUEWHEN(AMPDOWN, LOW - NATR);     // 计算空开价格，如果均价振幅下穿0，那么其价格是最低价-NATR
BPP     :   VALUEWHEN(AMPDOWN, HIGH + NATR);    // 计算空平价格，如果均价振幅下穿0，那么其价格是最高价+NATR

// 开仓
BARPOS > N AND CLOSE >= BKP, BK(1);             // 如果当前K线数量大于N，并且收盘价大于等于BKP，多开
BARPOS > N AND CLOSE <= SKP, SK(1);             // 如果当前K线数量大于N，并且收盘价小于等于SKP，空开

// 止损
AMPDOWN OR CLOSE <= SPP, SP(1);                 // 如果均价振幅是否下穿0，或者收盘价小于等于SPP，多平
AMPUP OR CLOSE >= BPP, BP(1);                   // 如果均价振幅是否上穿0，或者收盘价大于等于BPP, 空平
```

> 策略出处

https://www.fmz.cn/strategy/325960

> 更新时间

2021-10-26 14:54:33
