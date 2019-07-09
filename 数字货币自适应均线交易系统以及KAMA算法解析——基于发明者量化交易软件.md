
> 策略名称

数字货币自适应均线交易系统以及KAMA算法解析——基于发明者量化交易软件

> 策略作者

Hukybo

> 策略描述

# 1、自适应均线KAMA简介

顾名思义自适应均线（KAMA）属于移动平均线（Moving Average）类别，但是与传统移动平均线不一样的是它很“聪明”。我们知道普通均线有很多缺点，比如：短期均线贴近价格走势，非常敏感，但是很容易产生虚假信号；长期均线在趋势判断上非常准确，但是往往行情已经走了一段，它才反应过来。

KAMA的“聪明”就体现在，它能根据当前的市场状态，也就是波动率，来自主调节敏感性。其变现形式就是：在震荡行情中，KAMA的变化明显减慢；当趋势来临的时候，又反应迅速。那么在实盘中，它的好处就是：既能减少因“日常杂波”产生的交易成本，又能在行情起飞时及时上车。

# 2、图表中的KAMA
 ![IMG](https://www.fmz.com/upload/asset/39cae99a1e12e456fa33.png) 


# 3、KAMA的计算方法

- 方向(DIR) = 收盘价 - n日前收盘价
- 波动率(VIR) = sum(abs(收盘价 - 上一个交易日收盘价), n)
- 效率(ER) = 方向 / 波动率
- 快速 = 2 / (n1 + 1)
- 慢速 = 2 / (n2 + 1)
- 平滑(CS) = 效率 * (快速 - 慢速) + 慢速
- 系数(CQ) = 平滑 * 平滑
- KAMA = 指数加权平均(动态移动平均(收盘价, 系数), 2)

其中，n、n1、n2都是周期参数，默认情况下n周期数是10，n1是短期周期数为2，n2是长期周期数为30。这也是KAMA作者Perry Kaufman认同的一组参数，n用于方向和波动率计算效率，n1和n2是快速均线和慢速均线的周期数，理论上n1的参数越大，KAMA就越平滑。

KAMA的计算方法是：首先计算出方向（DIR）和波动率（VIR），然后在跟两者的比例计算出效率。效率（ER）是衡量价格的变化程度，计算方式也很简单：方向 / 波动率。计算结果是0~1之间，当ER的值越接近0表明市场处于震荡状态，当ER的值越接近1表明市场处于趋势状态。

当计算出效率（ER）就可以结合快速均线和慢速均线推导出平滑常数（CS）：效率 * (快速 - 慢速) + 慢速。CS代表了趋势运行的速度，根据CS的计算公式，我们可以发现，CS的变化始终与ER的变化成正比。

然后根据平滑的乘方计算出系数（CQ），其目的是使慢周期参数在计算中起到更重要的作用，这也是一个较为保守的做法。KAMA最终的平滑程度是由系数（CQ）决定，在KAMA的计算中，系数（CQ）决定了最后两次均线平滑的周期参数，即：指数加权平均(动态移动平均(收盘价, 系数), 2)。

# 4、如何使用KAMA

尽管KAMA的计算方法非常复杂，但是使用方法与普通均线类似，在实际应用中，它不仅可以判断行情走势，还可以用于精确的买卖点。由于它非常“聪明”，可以用于很多交易策略中，甚至在数字货币中也值得一试。

- 当价格大于KAMA，并且KAMA向上时，多头开仓。
- 当价格小于KAMA，并且KAMA向下时，空头开仓。
- 当价格小于KAMA，或者KAMA向下时，多头平仓。
- 当价格大于KAMA，或者KAMA向上时，空头平仓。

# 5、基于KAMA构建交易策略

**第一步：计算KAMA**
注意！在左上角选择编程语言为：`My语言`。在talib库中已经有现成的KAMA，但是它只有一个外部参数（n）周期，n1和n2已经默认为2和30。本篇中的策略只作抛砖引玉直接使用，动手能力强的小伙伴也可以自己写哈。那么在My语言中也可以直接与JavaScript语言混合，注意看下面的代码：
```
%%  // My语言内JavaScript的标准格式
scope.KAMA = function() {
    var r = _C(exchange.GetRecords);  // 获取K线数组
    if (r.length > 140) {  // 过滤K线长度
        var kama = talib.KAMA(r, 140);  // 调用talib库计算KAMA
        return kama[kama.length - 2];  // 返回KAMA的具体数值
    }
    return;
}
%%  // My语言内JavaScript的标准格式
```

**第二步：计算交易条件并下单**
```
%%
scope.KAMA = function() {
    var r = _C(exchange.GetRecords);
    if (r.length > 140) {
        var kama = talib.KAMA(r, 140);
        return kama[kama.length - 2];
    }
    return;
}
%%

K^^KAMA;  // 把KAMA打印到图表上
A:CLOSE;  // 把收盘价打印到图表上

K > REF(K, 1) && CLOSE > K,BK;  // 开多
K < REF(K, 1) && CLOSE < K,SK;  // 开空
K < REF(K, 1) || CLOSE < K,SP;  // 平多
K > REF(K, 1) || CLOSE > K,BP;  // 平空
```

**第三步：设置策略信号过滤方式**
```
%%
scope.KAMA = function() {
    var r = _C(exchange.GetRecords);
    if (r.length > 140) {
        var kama = talib.KAMA(r, 140);
        return kama[kama.length - 2];
    }
    return;
}
%%

K^^KAMA;
A:CLOSE;

K > REF(K, 1) && CLOSE > K,BK;
K < REF(K, 1) && CLOSE < K,SK;
K < REF(K, 1) || CLOSE < K,SP;
K > REF(K, 1) || CLOSE > K,BP;

AUTOFILTER;  // 启用一开一平信号过滤机制
```

[点击复制完整策略源码](https://www.fmz.com/strategy/155663)

# 6、策略回测

为了更接近真实的交易环境，我们在回测时采用开平仓各2跳的滑点来压力测试，测试环境如下：

- 交易所：BitMEX
- 行情品种：XBTUSD
- 交易品种：XBTUSD
- 时间：2017年07月01日~2019年07月01日
- K线周期：日线
- 滑点：开平仓各2跳

**测试环境**
 ![IMG](https://www.fmz.com/upload/asset/399923632ea2b1e1ebc8.png) 
**收益明细**
 ![IMG](https://www.fmz.com/upload/asset/3a2eb03e368a8b48d9d0.png) 
**资金曲线**
 ![IMG](https://www.fmz.com/upload/asset/39c54ce3928c3c8c15cb.png) 

单从上面的回测结果看，这个简单的KAMA策略果然不负众望，即使在数字货币2018年的超级大熊市中，资金曲线并没有出现较大的回撤，并且在行情长期处于震荡时期，也没有来回开平仓，造成不必要的亏损。同时在2019年的牛市中也有不错的表现。

# 7、总结

一个优秀的可以实盘的策略一定是经过千锤百炼的打磨，本篇中的策略还有很多可以优化升级的空间，比如增加一定的过滤条件、主动的止盈止损条件等等。作为均线的一种，KAMA继承了普通均线优缺点，同时又进行了升华。在一个变化莫测的市场，即便是固定一个“最好的参数”也很难适应未来的行情，因此这种随势而动，随行情变化而变化的方法或许是一个更好的选择。



> 源码 (麦语言)

``` pascal
(*backtest
start: 2017-07-01 00:00:00
end: 2019-07-01 00:00:00
period: 1d
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["SlideTick",0,126961],["ContractType","XBTUSD",126961]]
*)

%%
scope.KAMA = function() {
    var r = _C(exchange.GetRecords);
    if (r.length > 140) {
        var kama = talib.KAMA(r, 140);
        return kama[kama.length - 2];
    }
    return;
}
%%

K^^KAMA;
A:CLOSE;

K > REF(K, 1) && CLOSE > K,BK;
K < REF(K, 1) && CLOSE < K,SK;
K < REF(K, 1) || CLOSE < K,SP;
K > REF(K, 1) || CLOSE > K,BP;

AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/155663

> 更新时间

2019-07-06 16:36:04
