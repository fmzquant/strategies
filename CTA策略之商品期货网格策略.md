
> 策略名称

CTA策略之商品期货网格策略

> 策略作者

Hukybo

> 策略描述

#### 一、摘要
这是一种动态调仓策略，秉持“仓位比择时更重要”的原则，在跌宕起伏的市场中屡获奇功，深受交易者们的喜爱，这就是网格交易法（Grid Trading Method）,本篇文章我们将依托发明者量化（FMZ.COM）的MY语言创建一个商品期货网格交易策略。

#### 二、什么是网格策略
网格策略也称“渔网策略”，就行渔夫捕鱼一样，它是以某个价格为基准，在其上下分别设置价格线（撒网待鱼），每当价格触发价格线时，通过加减仓操作尽可能获利。网格策略属于左侧交易，不需要预测价格涨跌方向，不想右侧交易一样追涨杀跌，而是逆势而为，在价格下跌时买入，价格上涨时卖出。

 ![IMG](https://www.fmz.com/upload/asset/39e6d13230875ca90a67.png) 

上图展示了网格策略原理，图中蓝色的线代表价格，中间深色的线代表了交易者预期价格，每个网格线之间的价差为10元，当价格突破网格线就卖出1手，当价格跌破网格线就买入1手。在左边行情上涨时，通过低买高卖账户净收益为50元，持空头3手，持仓均价为130元；在右边行情下跌时，通过低买高卖账户净收益为100元，持空头5手，持仓均价为80元。

#### 三、网格策略的风险
由上图我们可以看到，无论行情是上涨还是下跌，它可以平均开仓和平仓价格，这种交易方法不会增加风险，反而会降低风险。对于已经平仓的交易都是正收益，资金曲线相对稳定，这也是网格策略的优点之一。另外还有一个优点就是：网格策略不需要（要求）对市场方向做出正确的判断，这对于懒人或者对市场方向不是太敏感的交易者来说节省了很多时间和精力。

量化交易策略并没有圣杯，网格策略也有风险，比如当行情持续大涨或大跌，会导致策略不断开仓，增加风险敞口。网格策略适用于波动率低，趋势不明显的品种，是震荡行情获利法宝，这就要求交易者对期货品种有个略微的把握，比如工业品尤其是黑色系更容易走出趋势行情不适合网格策略，反而农产品往往在一个价格区间内波动适合网格策略。

#### 四、策略逻辑
**第1步：设置回测配置**
```
(*backtest
start: 2015-02-22 00:00:00
end: 2021-04-18 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","RM888",126961]]
*)
```
**第2步：初次触发网格**
```
VARIABLE : WG : 1;
IF BKVOL=0 THEN BEGIN 1, 
BK;
WG := CLOSE;
END
```
**第3步：多头开仓**
```
IF BKVOL > 0 AND CLOSE < WG * (1 - 0.1) THEN BEGIN 
1, BK;
WG := CLOSE;
END
```
**第4步：多头平仓**
```
IF BKVOL > 0 AND CLOSE > WG / (1 - 0.1) THEN BEGIN 
1, SP;
WG := CLOSE;
END
```
**第5步：空头开仓**
```
IF SKVOL > 0 AND CLOSE > WG * (1 + 0.1) THEN BEGIN 
1, SK;
WG := CLOSE;
END
```
**第6步：空头平仓**
```
IF SKVOL > 0 AND CLOSE < WG / (1 + 0.1) THEN BEGIN 
1, BP;
WG := CLOSE;
END
```
**第7步：下单设置**
```
MULTSIG(0, 0, 60, 0);
TRADE_AGAIN(100);
```
需要注意的是：网格策略可以随意设置网格的宽度和数量，可以按价格设置等宽网格，也可以按比例设置等比网格。另外：网格间距太大，盈利太慢；网格间距太小，风险太大。


#### 五、策略回测
- 回测开始日期：2015-02-22
- 回测结束日期：2021-04-18
- 数据品种：菜粕主力连续
- 数据周期：日线
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.com/upload/asset/39978d86ba5117cc9c5c.png) 
**回测绩效**
  ![IMG](https://www.fmz.com/upload/asset/3a39e723690c1a97b3a4.png) 
**资金曲线**
 ![IMG](https://www.fmz.com/upload/asset/399d8e28dcdc63713b61.png) 




> 源码 (麦语言)

``` pascal
(*backtest
start: 2015-02-22 00:00:00
end: 2021-04-18 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","RM888",126961]]
*)

VARIABLE : WG : 1;
IF BKVOL=0 THEN BEGIN 1, 
BK;
WG := CLOSE;
END

IF BKVOL > 0 AND CLOSE < WG * (1 - 0.1) THEN BEGIN 
1, BK;
WG := CLOSE;
END

IF BKVOL > 0 AND CLOSE > WG / (1 - 0.1) THEN BEGIN 
1, SP;
WG := CLOSE;
END

IF SKVOL > 0 AND CLOSE > WG * (1 + 0.1) THEN BEGIN 
1, SK;
WG := CLOSE;
END

IF SKVOL > 0 AND CLOSE < WG / (1 + 0.1) THEN BEGIN 
1, BP;
WG := CLOSE;
END

MULTSIG(0, 0, 60, 0);
TRADE_AGAIN(100);


```

> 策略出处

https://www.fmz.com/strategy/273847

> 更新时间

2021-05-18 18:16:57
