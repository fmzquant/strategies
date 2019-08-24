
> 策略名称

运用阿隆（Aroon）指标在数字货币中量化交易，附带My语言策略源码

> 策略作者

Hukybo

> 策略描述

**策略简介**
本策略基于My语言，可用于商品期货和数字货币。在技术分析中阿隆（Aroon）是一个很独特的技术指标，“Aroon”一词来自梵文，寓意为“黎明曙光”。它不像MA、MACD、KDJ那样广为人所熟悉，它推出的时间更晚，直到1995年才被图莎尔·钱德（Tushar Chande）发明出来，作者还发明了钱德动量摆动指标（CMO）和日内动量指数（IMI）。如果说一个技术指标知道的人越多，使用的人也越多，那么其赚钱能力也越低，那么相对新颖的阿隆指标则恰恰相反，站在这个角度看这是一个不错的选择。

点击：[阅读更加详细的策略介绍](https://www.fmz.com/digest-topic/3982)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N|30|阿隆指标参数周期|
|Q|50|触发临界点|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2019-01-01 00:00:00
end: 2019-07-05 00:00:00
period: 1d
exchanges: [{"eid":"OKEX","currency":"BTC_USDT","balance":10000,"stocks":3}]
*)

AROONUP := ((N - HHVBARS(H, N)) / N) * 100;  // 阿隆指标上线
AROONDOWN := ((N - LLVBARS(L, N)) / N) * 100;  // 阿隆指标下线
AROONUP > AROONDOWN && AROONUP > Q, BK;  // 多头开仓
AROONDOWN > AROONUP && AROONDOWN > Q, SK;  // 空头开仓
AROONUP < AROONDOWN || AROONUP < Q, SP;  // 多头平台
AROONDOWN < AROONUP || AROONDOWN < Q, BP;  // 空头平台
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/155582

> 更新时间

2019-07-16 15:50:33
