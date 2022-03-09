
> 策略名称

CTA策略之商品期货马丁普林格KST策略

> 策略作者

扫地僧

> 策略描述

#### 一、摘要
在交易中，市场的参与者往往不是绝对理性的，面对公共信息，大多数人都会做出趋同的决策。就像沙丁鱼群一样，动作整齐划一的打转，遇到危险时能很快分开又整合。而这些可以通过技术分析指标显示出来，根据历史行情来判断未来的市场走势，这正是技术分析的精髓所在。经过一百多年的演绎，技术分析已经发展成非常庞大，且门派林立的思想体系。

#### 二、《技术分析》与KST
提到技术分析，很容易想到《技术分析》这本书，该书在上个世纪80年代初次面世，经过几十年的发展，该书再版多次，从最初的300多页增加到600多页，增加了很多交易工具和技术指标，KST就是其中之一，而作者本人正是大名鼎鼎的马丁·普林格。

在FinanceWord融语财经的外汇黄金技术分析中，马丁·普林格都会使用一个叫作KST的指标，本篇文章就以马丁·普林格的KST指标作为指引，详细论述其原理，最后依托发明者量化(fmz.com)交易平台，开发一个商品期货马丁普林格KST策略。

#### 三、KST原理
 ![IMG](https://www.fmz.cn/upload/asset/3a0af00c040e09f9736c.png) 
KST指标全称为Know Sure Thing，中文名称是“确然指标”，最早出现在1992年的《股票与商品期货》杂志中，KST本质上是基于动量的震荡指标，其核心是变动率(ROC)，通过ROC衡量了4种不同时间周期的价格动量，然后再将它们组合成一个单一的动量震荡指标。它可以通过修正的价格变动，发现市场超买和超卖情况，以此来判断趋势。

具体来说，其利用了4个不同周期的ROC以及再次平均，最后计算出KST值，该值在0轴上下波动。如下面的列表所示：
- RCMA1 = 10周期ROC的10周期MA
- RCMA2 = 15周期ROC的15周期MA
- RCMA3 = 20周期ROC的20周期MA
- RCMA4 = 25周期ROC的25周期MA
- KST = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4)
- KSTMA5 = KST的5周期MA



#### 四、策略实现
**第1步：计算4个ROC**
```
ROC10 := 100 * (C - REF(C, 10)) / REF(C, 10);
ROC15 := 100 * (C - REF(C, 15)) / REF(C, 15);
ROC20 := 100 * (C - REF(C, 20)) / REF(C, 20);
ROC25 := 100 * (C - REF(C, 25)) / REF(C, 25);
```

**第2步：计算KST**
```
KST : (MA(ROC10, 10) + 2 * MA(ROC15, 15) + 3 * MA(ROC20, 20) + 4 * MA(ROC25, 25))/10;
```

**第3步：计算KST均值**
```
KSTMA5 : MA(KST, 5);
```

**第4步：下单交易**
```
CROSS(KST, KSTMA5), BPK;
CROSS(KSTMA5, KST), SPK;
AUTOFILTER;
```


#### 五、策略回测
- 回测开始日期：2017-01-01
- 回测结束日期：2021-04-28
- 数据品种：动力煤主力连续
- 数据周期：日线
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/395b28315e9cd7262485.png) 
**回测绩效**
 ![IMG](https://www.fmz.cn/upload/asset/390b11f7b26d1c00b14c.png) 
**资金曲线**
 ![IMG](https://www.fmz.cn/upload/asset/39a93b3badfb3673c0c0.png) 




> 源码 (麦语言)

``` pascal
(*backtest
start: 2017-01-01 00:00:00
end: 2021-04-28 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ContractType","ZC888",126961]]
*)

ROC10 := 100 * (C - REF(C, 10)) / REF(C, 10);
ROC15 := 100 * (C - REF(C, 15)) / REF(C, 15);
ROC20 := 100 * (C - REF(C, 20)) / REF(C, 20);
ROC25 := 100 * (C - REF(C, 25)) / REF(C, 25);
KST : (MA(ROC10, 10) + 2 * MA(ROC15, 15) + 3 * MA(ROC20, 20) + 4 * MA(ROC25, 25))/10;
KSTMA5 : MA(KST, 5);
CROSS(KST, KSTMA5), BPK;
CROSS(KSTMA5, KST), SPK;
AUTOFILTER;
```

> 策略出处

https://www.fmz.cn/strategy/325957

> 更新时间

2021-10-26 14:47:56
