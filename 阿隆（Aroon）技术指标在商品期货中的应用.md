
> 策略名称

阿隆（Aroon）技术指标在商品期货中的应用

> 策略作者

Hukybo

> 策略描述

**策略简介**
本策略基于JavaScript语言，可用于商品期货。在技术分析中阿隆（Aroon）是一个很独特的技术指标，“Aroon”一词来自梵文，寓意为“黎明曙光”。它不像MA、MACD、KDJ那样广为人所熟悉，它推出的时间更晚，直到1995年才被图莎尔·钱德（Tushar Chande）发明出来，作者还发明了钱德动量摆动指标（CMO）和日内动量指数（IMI）。如果说一个技术指标知道的人越多，使用的人也越多，那么其赚钱能力也越低，那么相对新颖的阿隆指标则恰恰相反，站在这个角度看这是一个不错的选择。

点击：[阅读更加详细的策略介绍](https://www.fmz.com/digest-topic/3982)

> 策略参数



|参数|默认值|描述|
|----|----|----|
|open|50|open|
|close|50|close|
|cycle|20|cycle|


> 源码 (javascript)

``` javascript
/*backtest
start: 2015-06-01 09:00:00
end: 2019-06-28 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
*/

function main() {
    $.CTA("ZC000/ZC888", function(st) {
        var r = st.records;  // 获取K线数组
        var mp = st.position.amount;  // 获取持仓数量
        if (r.length < cycle + 1) {  // 判断K线数据是否足够
            return;
        }
        var aroon = talib.AROON(r, cycle);  // 阿隆指标
        var aroonUp = aroon[1][aroon[1].length - 2];  // 阿隆指标上线倒数第2根数据
        var aroonDown = aroon[0][aroon[0].length - 2];  // 阿隆指标下线倒数第2根数据
        if (mp > 0 && (aroonUp < aroonDown || aroonUp < close)) {
            return -1;  // 多头平台
        }
        if (mp < 0 && (aroonDown < aroonUp || aroonDown < close)) {
            return 1;  // 空头平台
        }
        if (mp == 0 && aroonUp > aroonDown && aroonUp > open) {
            return 1;  // 多头开仓
        }
        if (mp == 0 && aroonDown > aroonUp && aroonDown > open) {
            return -1;  // 空头开仓
        }
    })
}
```

> 策略出处

https://www.fmz.com/strategy/154547

> 更新时间

2019-07-16 15:47:17
