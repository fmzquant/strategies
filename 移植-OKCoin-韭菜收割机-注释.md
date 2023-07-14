
> Name

移植-OKCoin-韭菜收割机-注释

> Author

lkk91297

> Strategy Description

移植自: https://github.com/richox/okcoin-leeks-reaper

原作者说收手续费以后就失效了, 我只做了移植, 没有实盘测试, 有兴趣可以学习
因为策略使用了GetTrades 这个函数在回测系统中是被模拟出来的, 所以回测没有什么意义, 只能直接上实盘测试 !

以下为原说明


OKCoin韭菜收割机
================

这是一个在OKCoin比特币交易平台上的高频交易机器人程序，从2016年6月策略基本定型，到2017年1月中旬，这个策略成功的把最初投入的6000块钱刷到了250000。由于近日央行对比特币实行高压政策，各大平台都停止了配资，并且开始征收交易费，该策略实际上已经失效了。

 ![image](https://dn-filebox.qbox.me/707cd47e69d21b06f3815b933b471390a8d2cedd.png)

本机器人程序基于两个主要策略：

1. 趋势策略：在价格发生趋势性的波动时，及时下单跟进，即俗话说的**追涨杀跌**。
2. 平衡策略：仓位偏离50%时，放出小单使仓位逐渐回归50%，防止趋势末期的反转造成回撤，即**收益落袋，不吃鱼尾**。

本程序要求平衡仓位，即（本金+融资=融币），使得仓位在50%时净资产不随着价格波动，也保证了发生趋势性波动时**涨跌都赚**。

感谢以下两个项目：

* https://github.com/sutra/okcoin-client
* https://github.com/timmolter/xchange

感谢OKCoin：

* https://www.okcoin.cn

BTC: 3QFn1qfZMhMQ4FhgENR7fha3T8ZVw1bEeU

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|BurstThresholdPct|5e-05|burst.threshold.pct|
|BurstThresholdVol|10|burst.threshold.vol|
|MinStock|0.1|最小交易量|
|CalcNetInterval|60|净值计算周期(秒)|
|BalanceTimeout|10000|平衡等代时间(毫秒)|
|TickInterval|280|轮训周期(毫秒)|


> Source (javascript)

``` javascript
function LeeksReaper() {                                        //创建构造函数LeeksReaper
    var self = {}                                               //构造一个空的对象
    self.numTick = 0
    self.lastTradeId = 0
    self.vol = 0
    self.askPrice = 0
    self.bidPrice = 0
    self.orderBook = { Asks: [], Bids: [] }
    self.prices = []
    self.tradeOrderId = 0
    self.p = 0.5
    self.account = null
    self.preCalc = 0
    self.preNet = 0
    //以上都是self对象的属性
    //创建一个方法
    self.updateTrades = function () {
        var trades = _C(exchange.GetTrades)                     //创建一个变量trades用来接收_C函数返回的值，传入的参数为：exchange.GetTrades
        if (self.prices.length == 0) {                          //如果self.prices的长度等于0
            while (trades.length == 0) {                        //如果trades等于0时执行下方的语句
                trades = trades.concat(_C(exchange.GetTrades))  //通过数组拼接的方法把_C函数返回的值与trades进行拼接，传入的参数为：exchange.GetTrades
            }
            for (var i = 0; i < 15; i++) {                      //循环，结束条件为i=15，每次循环i都自加1
                self.prices[i] = trades[trades.length - 1].Price//每次循环都把trades数组的最后一个值赋值给self对象的prices数组上，共循环15次
            }
        }
        //self.vol的值等于他自己乘以0.7加上_.reduce函数的返回值*0.3，其中_.reduce函数传入的参数为trades和一个匿名函数，还有一个0，匿名函数的形参为men,trade
        self.vol = 0.7 * self.vol + 0.3 * _.reduce(trades, function (mem, trade) {
            // Huobi not support trade.Id
            //前半段是比较rade.Id是否大于self.lastTradeId，如果结果是true就执行下方的语句，如果是fales就往后看，后半段的且运算符，trade.Id == 0和trade.Time > self.lastTradeId都为真时才会返回true,有fales时就返回fales
            if ((trade.Id > self.lastTradeId) || (trade.Id == 0 && trade.Time > self.lastTradeId)) {
                //等号右边是一个三目运算，如果trade.Id=0就返回trade.Time，否则就返回trade.Id, self.lastTradeId。并进行比较返回最大的值，最后把返回的最大值赋给self.lastTradeId
                self.lastTradeId = Math.max(trade.Id == 0 ? trade.Time : trade.Id, self.lastTradeId)
                //mem=trade.Amount+mem 
                mem += trade.Amount
            }
            //返回mem
            return mem
        }, 0)


    }
    //self对象的一个方法
    self.updateOrderBook = function () {
        // 创建一个变量orderBook用来接收_C函数返回的值，传入的参数为：exchange.GetDepth
        var orderBook = _C(exchange.GetDepth)
        self.orderBook = orderBook                              //self.orderBook 的值等于orderBook
        if (orderBook.Bids.length < 3 || orderBook.Asks.length < 3) {//前半段是判断orderBook.Bids的长度是否小于3，后半段是判断orderBook.Asks的长度是否小于3，如果两边都小于3就执行下方的语句
            //返回undefined
            return
        }
        //self.bidPrice的值等于orderBook.Bids数组的第一个值乘以0.618加上orderBook.Asks数组的第一个值乘以0.382加上0.01
        self.bidPrice = orderBook.Bids[0].Price * 0.618 + orderBook.Asks[0].Price * 0.382 + 0.01
        //同上
        self.askPrice = orderBook.Bids[0].Price * 0.382 + orderBook.Asks[0].Price * 0.618 - 0.01
        //删除price数组的第一个值，并返回第一个值
        self.prices.shift()
        //prices数组向后添加值，值为函数_N的返回值
        self.prices.push(_N((orderBook.Bids[0].Price + orderBook.Asks[0].Price) * 0.35 +
            (orderBook.Bids[1].Price + orderBook.Asks[1].Price) * 0.1 +
            (orderBook.Bids[2].Price + orderBook.Asks[2].Price) * 0.05))
    }
    //self对象的一个方法
    self.balanceAccount = function () {
        // 创建一个变量account用来接收GetAccount函数返回的值
        var account = exchange.GetAccount()
        //判断account是否为空，是就返回undefined
        if (!account) {
            return
        }
        //赋值
        self.account = account
        //获取当前时间的时间戳数据
        var now = new Date().getTime()
        //判断self.orderBook.Bids的长度是否大于0和now - self.preCalc的值是否大于(CalcNetInterval * 1000)，如果都大于就执行下方语句
        if (self.orderBook.Bids.length > 0 && now - self.preCalc > (CalcNetInterval * 1000)) {
            //赋值
            self.preCalc = now
            //创建一个变量net用来接收_N函数的返回值
            var net = _N(account.Balance + account.FrozenBalance + self.orderBook.Bids[0].Price * (account.Stocks + account.FrozenStocks))
            //判断net是否不等于self.preNet，如果是就执行下方语句
            if (net != self.preNet) {
                //赋值
                self.preNet = net
                //调用函数LogProfit并传入net
                LogProfit(net)
            }
        }
        //赋值
        self.btc = account.Stocks
        self.cny = account.Balance
        self.p = self.btc * self.prices[self.prices.length - 1] / (self.btc * self.prices[self.prices.length - 1] + self.cny)
        var balanced = false
        //判断self.p的值是否小于0.48
        if (self.p < 0.48) {
            //调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)
            //self.cny =self.cny-300
            self.cny -= 300
            //判断self.orderBook.Bids的长度是否大于0，如果是就执行下方语句
            if (self.orderBook.Bids.length > 0) {
                //调用buy函数并传入相应的参数
                exchange.Buy(self.orderBook.Bids[0].Price + 0.00, 0.01)
                exchange.Buy(self.orderBook.Bids[0].Price + 0.01, 0.01)
                exchange.Buy(self.orderBook.Bids[0].Price + 0.02, 0.01)
            }
            //如果self.p大于0.52就执行下方语句
        } else if (self.p > 0.52) {
            //调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)
            //self.btc=self.btc-0.03
            self.btc -= 0.03
            //判断self.orderBook.Bids的长度是否大于0，如果是就执行下方语句
            if (self.orderBook.Asks.length > 0) {
                //调用Sell函数并传入相应的参数
                exchange.Sell(self.orderBook.Asks[0].Price - 0.00, 0.01)
                exchange.Sell(self.orderBook.Asks[0].Price - 0.01, 0.01)
                exchange.Sell(self.orderBook.Asks[0].Price - 0.02, 0.01)
            }
        }
        //调用函数Sleep并传入参数BalanceTimeout
        Sleep(BalanceTimeout)
        //创建标量order来接收GetOrders函数返回的值
        var orders = exchange.GetOrders()
        //判断orders是否为真
        if (orders) {
            //遍历orders
            for (var i = 0; i < orders.length; i++) {
                //判断orders的id是否不等于self.tradeOrderId
                if (orders[i].Id != self.tradeOrderId) {
                    //如果是就调用CancelOrder函数并传入参数orders[i].Id
                    exchange.CancelOrder(orders[i].Id)
                }
            }
        }
    }

    //self的一个方法
    self.poll = function () {
        //self.numTick自加1
        self.numTick++
        //执行上方创建的三个方法updateTrades，updateOrderBook，updateOrderBook
        self.updateTrades()
        self.updateOrderBook()
        self.balanceAccount()
        //burstPrice的值等于self.prices数组的最后一个值乘以BurstThresholdPct
        var burstPrice = self.prices[self.prices.length - 1] * BurstThresholdPct
        //创建变量并赋值
        var bull = false
        var bear = false
        var tradeAmount = 0
        //判断self.account是否为真
        if (self.account) {
            //是真的话就调用LogStatus函数并传入相应的参数
            LogStatus(self.account, 'Tick:', self.numTick, ', lastPrice:', self.prices[self.prices.length - 1], ', burstPrice: ', burstPrice)
        }
        //前半段是判断self.numTick的值是否大于2，如果是大于2就往执行||后面的语句，如果不是则判断&&运算符后面的语句，如果为fales直接返回fales,执行else的语句
        if (self.numTick > 2 && (
            self.prices[self.prices.length - 1] - _.max(self.prices.slice(-6, -1)) > burstPrice ||
            self.prices[self.prices.length - 1] - _.max(self.prices.slice(-6, -2)) > burstPrice && self.prices[self.prices.length - 1] > self.prices[self.prices.length - 2]
        )) {
            //变量bull赋值为true,tradeAmount赋值为self.cnyv/self.bidPrice乘以0.99
            bull = true
            tradeAmount = self.cny / self.bidPrice * 0.99
        }
        //同上面if
        else if (self.numTick > 2 && (
            self.prices[self.prices.length - 1] - _.min(self.prices.slice(-6, -1)) < -burstPrice ||
            self.prices[self.prices.length - 1] - _.min(self.prices.slice(-6, -2)) < -burstPrice && self.prices[self.prices.length - 1] < self.prices[self.prices.length - 2]
        )) {
            bear = true
            //赋值
            tradeAmount = self.btc
        }
        //判断self.vol是否小于BurstThresholdVol，如果是就执行if语句内的代码
        if (self.vol < BurstThresholdVol) {
            tradeAmount *= self.vol / BurstThresholdVol
        }
        //判断self.numTick是否小于5，如果是就执行if语句内的代码
        if (self.numTick < 5) {
            //tradeAmount=tradeAmount*0.8
            tradeAmount *= 0.8
        }
        //判断self.numTick是否小于10
        if (self.numTick < 10) {
            tradeAmount *= 0.8
        }
        //前半段是判断!bull和!bear哪一个为真，后半段是判断tradeAmount是否小于MinStock，当两边都为真时就执行if语句内的代码
        if ((!bull && !bear) || tradeAmount < MinStock) {
            return
        }
        //如果bull为真时就返回self.bidPrice的值，否则返回self.askPrice的值
        var tradePrice = bull ? self.bidPrice : self.askPrice
        //tradeAmount是否大于或者等于MinStock，如果时就进行循环while的语句
        while (tradeAmount >= MinStock) {
            //当bull为真时返回Buy函数的返回值，否则返回Sell函数的返回值
            var orderId = bull ? exchange.Buy(self.bidPrice, tradeAmount) : exchange.Sell(self.askPrice, tradeAmount)
            //调用Sleep函数传入参数400，0.4秒后执行
            Sleep(400)
            //判断orderId是否为true
            if (orderId) {
                //赋值
                self.tradeOrderId = orderId
                //赋值
                var order = null
                while (true) {
                    //rder的值等于GetOrder函数的返回值
                    order = exchange.GetOrder(orderId)
                    //判断order是否为true
                    if (order) {
                        //判断两边的值是否相等
                        if (order.Status == ORDER_STATE_PENDING) {
                            //调用CancelOrder函数
                            exchange.CancelOrder(orderId)
                            //0.2秒后执行
                            Sleep(200)
                        } else {
                            //跳出循环
                            break
                        }
                    }
                }
                //赋值
                self.tradeOrderId = 0
                tradeAmount -= order.DealAmount
                tradeAmount *= 0.9
                //判断两边是否相等
                if (order.Status == ORDER_STATE_CANCELED) {
                    //调用self的updateOrderBook方法
                    self.updateOrderBook()
                    //判断是否为true,如果时就进行循环
                    while (bull && self.bidPrice - tradePrice > 0.1) {
                        //赋值
                        tradeAmount *= 0.99
                        tradePrice += 0.1
                    }
                    //判断是否为true,如果时就进行循环
                    while (bear && self.askPrice - tradePrice < -0.1) {
                        tradeAmount *= 0.99
                        tradePrice -= 0.1
                    }
                }
            }
        }
        //赋值
        self.numTick = 0
    }
    //返回self
    return self
}

//函数main
function main() {
    //reaper 是构造函数的实例
    var reaper = LeeksReaper()
    while (true) {
        //通过实例调用poll方法
        reaper.poll()
        Sleep(TickInterval)
    }
}
```

> Detail

https://www.fmz.com/strategy/124178

> Last Modified

2018-10-31 13:43:19
