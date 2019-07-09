
> 策略名称

运用阿隆（Aroon）指标在数字货币中量化交易，附带My语言策略源码

> 策略作者

Hukybo

> 策略描述

# 1、阿隆指标简介

本篇文章根据[阿隆（Aroon）技术指标在量化交易中的应用](https://www.fmz.com/strategy/154547)中的策略改编为数字货币，并且基于My语言。在技术分析中阿隆（Aroon）是一个很独特的技术指标，“Aroon”一词来自梵文，寓意为“黎明曙光”。它不像MA、MACD、KDJ那样广为人所熟悉，它推出的时间更晚，直到1995年才被图莎尔·钱德（Tushar Chande）发明出来，作者还发明了钱德动量摆动指标（CMO）和日内动量指数（IMI）。如果说一个技术指标知道的人越多，使用的人也越多，那么其赚钱能力也越低，那么相对新颖的阿隆指标则恰恰相反，站在这个角度看这是一个不错的选择。

# 2、图表中的阿隆指标

阿隆指标通过计算当前K线距离前最高价和最低价之间的K线数量，来帮助交易者预测价格走势与趋势区域的相对位置关系变化。它有两部分组成，即：阿隆上线（AroonUp）和阿隆下线（AroonDown），这两条线在0~100之间上下移动，虽然命名为上线和下线，但从图表上看并不像BOLL指标那样是真正意义上的上线和下线。如下图就是阿隆指标：
 ![IMG](https://www.fmz.com/upload/asset/38df067f317f4f5cce2b.png) 

# 3、阿隆指标的计算方法

阿隆指标要求首先要设置一个时间周期参数，就像设置均线周期参数一样，在传统行情软件中，这个周期数是14，当然这个周期参数并不是固定的，你还可以设置为10或者50等等。为了方便理解，暂且把这个时间周期参数定义为：N。确定N之后，我们就可以计算出阿隆上线（AroonUp）和阿隆下线（AroonDown），具体的计算公式如下：

- 阿隆上线（AroonUp） = [ ( 设置的周期参数 - 最高价后的周期数 ) / 计算的周期数 ] * 100
- 阿隆下线（AroonDown） = [ ( 设置的周期参数 - 最低价后的周期数 ) / 计算的周期数 ] * 100

从这个公式中，我们就能大致看出，阿隆指标的思想。那就是：有多少个周期，价格在近期高 / 低点之下，辅助预测当前趋势是否会延续，同时衡量当前趋势的强弱。如果我们把这个指标归类的话，很明显它是属于趋势跟踪类型。但是与其他趋势跟踪型指标不同的是，它更重视时间而不是价格。

# 4、如何使用阿隆指标

阿隆上线（AroonUp）和阿隆下线（AroonDown）反映的是当前时间与之前最高价或最低价的远近，如果时间越近值就越大，如果时间越远值就越小。并且当两条线发生交叉就预示着价格方向可能会发生改变，如果AroonUp在AroonDown之上说明价格处于上涨趋势，未来价格可能会进一步上涨；如果AroonDown在AroonUp之上说明价格处于下跌趋势，未来价格可能会进一步下跌。

同时我们还可以设置几个固定的值，来精确入场时机。我们知道阿隆指标是一直在0~100之间上下运行，那么在市场处于上涨趋势，也就是AroonUp在AroonDown之上时，当AroonUp大于50，说明市场上涨的趋势已经形成，未来价格可能会继续上涨；当AroonUp下穿50时，说明价格上涨的动力正在减弱，未来价格可能会震荡和下跌。

反之在市场处于下跌趋势，也就是AroonDown在AroonUp之上时，当AroonDown大于50，说明市场下跌趋势已经形成，未来价格可能会继续下跌；当AroonDown下穿50时，说明价格下跌的动力正在减弱，未来价格可能会震荡和上涨。那么根据上面两段理论，我们可以把买卖条件罗列为：

- 当 AroonUp大于AroonDown，并且AroonUp大于50，多头开仓；
- 当 AroonUp小于AroonDown，或者AroonUp小于50，多头平仓；
- 当 AroonDown大于AroonUp，并且AroonDown大于50，空头开仓；
- 当 AroonDown小于AroonUp，或者AroonDown小于50，空头平仓；

# 5、基于阿隆指标构建交易策略

理清交易逻辑后，我们就可以用代码去实现了，本篇我们改用My语言，品种则换成比特币。动手能力强的小伙伴，也可以把代码翻译成JavaScript语言。OK，话不多说，依次打开：fmz.com > 登录 > 控制中心 > 策略库 > 新建策略，开始编写策略，注意看下面代码中的注释。

**第一步：计算阿隆指标**
注意！在左上角选择编程语言为：`My语言`。
```
AROONUP := ((N - HHVBARS(H, N)) / N) * 100;  // 阿隆指标上线
AROONDOWN := ((N - LLVBARS(L, N)) / N) * 100;  // 阿隆指标下线
```

**第二步：计算交易条件并下单**
```
AROONUP := ((N - HHVBARS(H, N)) / N) * 100;  // 阿隆指标上线
AROONDOWN := ((N - LLVBARS(L, N)) / N) * 100;  // 阿隆指标下线
AROONUP > AROONDOWN && AROONUP > BKV, BK;  // 多头开仓
AROONDOWN > AROONUP && AROONDOWN > SKV, SK;  // 空头开仓
AROONUP < AROONDOWN || AROONUP < SPV, SP;  // 多头平台
AROONDOWN < AROONUP || AROONDOWN < BPV, BP;  // 空头平台
```

**第三步：设置策略信号过滤方式**
```
AROONUP := ((N - HHVBARS(H, N)) / N) * 100;  // 阿隆指标上线
AROONDOWN := ((N - LLVBARS(L, N)) / N) * 100;  // 阿隆指标下线
AROONUP > AROONDOWN && AROONUP > BKV, BK;  // 多头开仓
AROONDOWN > AROONUP && AROONDOWN > SKV, SK;  // 空头开仓
AROONUP < AROONDOWN || AROONUP < SPV, SP;  // 多头平台
AROONDOWN < AROONUP || AROONDOWN < BPV, BP;  // 空头平台
AUTOFILTER;
```

[点击复制完整策略源码](https://www.fmz.com/strategy/155582)

# 6、策略回测

为了更接近真实的交易环境，我们在回测时采用开平仓各2跳的滑点来压力测试，测试环境如下：

- 行情品种：BTC
- 交易品种：BTC
- 时间：2019年01月01日~2019年07月05日
- 周期：日线
- 滑点：开平仓各2跳

**测试环境**
 ![IMG](https://www.fmz.com/upload/asset/3a3b8ebd1d15f0dad5ff.png) 
**收益明细**
 ![IMG](https://www.fmz.com/upload/asset/399bd1e8a5207430601c.png) 
**资金曲线**
 ![IMG](https://www.fmz.com/upload/asset/39211cdf3a96eb811657.png) 
从上面的回测结果看，策略在市场行情走势流畅的时候表现很好，无论是在上涨或下跌中，阿隆指标可以完整的跟踪到行情。资金曲线也整体走势向上，并没有出现较大幅度的回撤。但是在震荡行情中，特别是连续的震荡行情中，出现了局部回撤。

# 7、阿隆指标的优缺点

- 优点：阿隆指标可以判断趋势行情的状态，兼顾发现市场趋势行情以及判断价格转向的能力，帮助交易者提高资金的使用率，这个优势震荡行情中尤为重要。
- 缺点：阿隆指标只是趋势跟踪系列指标中的一种，同样也有趋势跟踪指标的缺点。并且它只判断指定时间最高价或最低价的周期数，但有时候最高价或最低价在整个行情走势中会有偶然性，这个偶然性会干扰阿隆指标本身，造成虚假信号。

# 8、总结

在策略中我们固定了一部分参数，如：aroonUp或aroonDown大于小于50，造成策略的滞后性，很多情况下是行情上涨或下跌一段时间才开平仓买卖。这样虽然提高了胜率，减少了最大回撤率，但也错过了很多收益，这也印证了盈亏同源的道理。有兴趣的朋友可以深入研究一下，并加以改进。

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

2019-07-06 09:08:52
