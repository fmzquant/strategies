
> 策略名称

CTA策略之商品期货吞没形态

> 策略作者

程文

> 策略描述

#### 一、摘要
“一买就跌，一卖就涨”或许是很多交易初学者心中的困惑，难道真的有庄家能通过后台看到自己的账户吗？答案是否定的，准确的说不是庄家盯上了你，而是盯上了“你们这群散户”。比如开车时遇到障碍物，大部分人都会躲避，交易也是同样的道理，大部分散户看到利好时也会有相同的反映，都会开多仓冲进去，当看多的散户都买入后，在越来越多散户落袋为安卖出时，由于没有买力的支撑，价格就会随之下跌，这就是羊群效应。

#### 二、什么是吞没形态
如何才能避免这种情况呢？只能增加专业知识储备，用量化交易工具武装自己，本篇就以日本蜡烛图技术中的吞没形态为例开发一个交易策略。另本篇策略依托发明者(FMZ.COM)量化交易平台，以Python语言开发。

 ![IMG](https://www.fmz.cn/upload/asset/39a07874a00e6f61617a.png) 

什么是吞没形态？吞没形态也叫抱线形态，它是由2根K线组成的复合形态（如上图所示），国内很多交易者会以“阳包阴”或者“阴包阳”来表述吞没形态。其中“阳包阴”为上涨吞没形态，“阴包阳”为下跌吞没形态。从图上看上涨吞没形态是一根大的阳线包住了前面的阴线，下跌吞没形态是一根大阴线包住了之前的阳线。

#### 三、形态的意义
吞没形态是市场状态表象，但实际却蕴含了交易者之间的心里和资金博弈。它预示着市场价格走向即将反转，在实际使用中吞没形态会给分析和交易起到非常好的效果。尤其是在进出场点位上，或者止盈止损点位上，吞没形态都可以做比较好的参考。如下图所示：

 ![IMG](https://www.fmz.cn/upload/asset/39c7972e2418c3efe882.png) 

在上图左边箭头中，市场本来处于下跌趋势中，但后来出现了一根绿色大阳线，这根大阳线将它之前红色的阴线吞噬，形成了阶段性底部，这种情况说明了市场多头力量开始大于空头力量；右边箭头中，市场本来处于上涨趋势中，但后来出现了一根红色大阴线，这根大阴线将它之前绿色阳线吞噬，形成了阶段性顶部，这种情况说明市场空头力量开始大于多头力量。

#### 四、策略实现
**第1步：设置回测配置**
```
'''backtest
start: 2015-02-22 00:00:00
end: 2021-05-25 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''
```

**第2步：导入库**
```
import talib
import numpy as np
```

**第3步：编写策略框架**
```
def on_tick():
    pass


def main():
    while True:
        on_tick()
        Sleep(1000)
```
发明者量化采用轮询模式，在上面的策略框架中，首先程序会先执行main()函数，在main()函数中进入了无限循环模式，并且重复执行on_tick()函数，所以在这个框架中，只需要把策略逻辑写道on_tick()函数中即可。

**第4步：获取和处理数据**
```
def get_ohlc(records):
    dic = {}
    open_price = []
    high_price = []
    low_price = []
    close_price = []
    for i in records:
        open_price.append(i['Open'])
        high_price.append(i['High'])
        low_price.append(i['Low'])
        close_price.append(i['Close'])
    return {
        'open': np.array(open_price),
        'high': np.array(high_price),
        'low': np.array(low_price),
        'close': np.array(close_price),
    }

def on_tick():
    records = exchange.GetRecords()
    ohlc = get_ohlc(records)
    engulfed = talib.CDLENGULFING(ohlc['open'], ohlc['high'], ohlc['low'], ohlc['close']).tolist()
    depth = exchange.GetDepth()
    ask = depth.Asks[0].Price
    bid = depth.Bids[0].Price
```
利用Python写策略的好处是可以使用很多第三方库，比如很多技术指标可以用talib库来获取，在本文的策略中需要用到talib库中的吞没形态CDLENGULFING()函数，由于该函数需要传入numpy数组数据，所以首先创建了一个get_ohlc函数，把K线数据转换成numpy数组数据，如上面的代码所示。

**第5步：下单交易**
```
    global mp
    if mp == 1 and engulfed[-1] == 100:
        exchange.SetDirection("closebuy")
        exchange.Sell(bid, 1)
        mp = 0
    if mp == -1 and engulfed[-1] == -100:
        exchange.SetDirection("closesell")
        exchange.Buy(ask, 1)
        mp = 0
    if mp == 0 and engulfed[-1] == -100:
        exchange.SetDirection("buy")
        exchange.Buy(ask, 1)
        mp = 1
    if mp == 0 and engulfed[-1] == 100:
        exchange.SetDirection("sell")
        exchange.Sell(bid, 1)
        mp = -1
```
在下单交易之前，首先要在外部全局环境中创建一个全局变量mp，这个变量的作用是模拟当前持仓状态，mp的初始值是0，当开多单后把mp重置为1，开空单后把mp重置为-1，平仓后把mp重置为0。在这个下单交易条件中，我们只用了最简单策略逻辑，即当出现上涨吞没形态并且ATR大于30就平空开多，当出现下跌吞没形态并且ATR大于30就平多开空。下面让我们看下这个策略逻辑的效果是怎样的？

#### 五、策略回测

- 回测开始日期：2015-02-22
- 回测结束日期：2021-04-18
- 数据品种：菜粕指数
- 数据周期：日线
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.cn/upload/asset/39fd8e2c615495410ac1.png) 

**回测绩效**
 ![IMG](https://www.fmz.cn/upload/asset/39e4b4a1569ac8126a82.png) 

**资金曲线**
 ![IMG](https://www.fmz.cn/upload/asset/391e0b72219bbaf7fb65.png) 




> 源码 (python)

``` python
'''backtest
start: 2015-02-22 00:00:00
end: 2021-05-25 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

import talib
import numpy as np

mp = 0

def get_ohlc(records):
    dic = {}
    open_price = []
    high_price = []
    low_price = []
    close_price = []
    for i in records:
        open_price.append(i['Open'])
        high_price.append(i['High'])
        low_price.append(i['Low'])
        close_price.append(i['Close'])
    return {
        'open': np.array(open_price),
        'high': np.array(high_price),
        'low': np.array(low_price),
        'close': np.array(close_price),
    }

def on_tick():
    records = exchange.GetRecords()
    ohlc = get_ohlc(records)
    engulfed = talib.CDLENGULFING(ohlc['open'], ohlc['high'], ohlc['low'], ohlc['close']).tolist()
    atr = TA.ATR(records, 14)[-1]
    depth = exchange.GetDepth()
    ask = depth.Asks[0].Price
    bid = depth.Bids[0].Price
    global mp
    if mp == 1 and engulfed[-1] == 100:
        exchange.SetDirection("closebuy")
        exchange.Sell(bid, 1)
        mp = 0
    if mp == -1 and engulfed[-1] == -100:
        exchange.SetDirection("closesell")
        exchange.Buy(ask, 1)
        mp = 0
    if mp == 0 and engulfed[-1] == -100 and atr > 30:
        exchange.SetDirection("buy")
        exchange.Buy(ask, 1)
        mp = 1
    if mp == 0 and engulfed[-1] == 100 and atr > 30:
        exchange.SetDirection("sell")
        exchange.Sell(bid, 1)
        mp = -1
   
def main():
    exchange.SetContractType('RM000')
    while True:
        on_tick()
        Sleep(1000)

```

> 策略出处

https://www.fmz.cn/strategy/285026

> 更新时间

2021-05-28 10:41:40
