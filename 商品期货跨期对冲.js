/*
策略出处: https://www.botvs.com/strategy/23896
策略名称: 商品期货跨期对冲
策略作者: Zero
策略描述:

简单的跨期对冲, 抛砖引玉, 细节还需要处理


参数            默认值    描述
------------  -----  -------
HedgeSpread   30     开仓价差
CoverSpread   10     平仓价差
LoopInterval  true   轮询间隔(秒)
SA            MA701  合约A
SB            MA705  合约B
*/


function Hedge(q, e, symbolA, symbolB, hedgeSpread, coverSpread) {
    var self = {}
    self.q = q
    self.status = 0
    self.symbolA = symbolA
    self.symbolB = symbolB
    self.e = e
    self.isBusy = false
    self.hedgeSpread = hedgeSpread
    self.coverSpread = coverSpread
    self.opAmount = 1
    self.poll = function() {
        if (self.isBusy || (!exchange.IO("status")) || (!$.IsTrading(self.symbolA))) {
            return
        }
        var insDetailA = exchange.SetContractType(self.symbolA)
        if (!insDetailA) {
            return
        }
        var tickerA = exchange.GetTicker()
        if (!tickerA) {
            return
        }
        var insDetailB = exchange.SetContractType(self.symbolB)
        if (!insDetailB) {
            return
        }
        var tickerB = exchange.GetTicker()
        if (!tickerB) {
            return
        }
        LogStatus("A卖B买", _N(tickerA.Buy - tickerB.Sell), "A买B卖",  _N(tickerA.Sell-tickerB.Buy))
        var action = 0; // 1: A sell B buy 2: A buy B sell

        if (self.status == 0) {
            if ((tickerA.Buy - tickerB.Sell) > self.hedgeSpread) {
                Log("开仓 A卖B买", tickerA.Buy, tickerB.Sell, '#ff0000')
                action = 1
            } else if ((tickerB.Buy - tickerA.Sell) > self.hedgeSpread) {
                Log("开仓 B卖A买", tickerB.Buy, tickerA.Sell, '#ff0000')
                action = 2
            }
        } else if (self.status == 1 && (tickerA.Sell-tickerB.Buy) <= self.coverSpread) {
            Log("平仓 A买B卖", tickerA.Sell, tickerB.Buy, '#ff0000')
            action = 2
        } else if (self.status == 2 && (tickerB.Sell-tickerA.Buy) <= self.coverSpread) {
            Log("平仓 B买A卖", tickerB.Sell, tickerA.Buy, '#ff0000')
            action = 1
        }
        
        if (action == 0) {
            return
        }
        self.isBusy = true
        var tasks = []
        if (action == 1) {
            tasks.push([self.symbolA, self.status == 0 ? "sell" : "closebuy"])
            tasks.push([self.symbolB, self.status == 0 ? "buy" : "closesell"])
        } else if (action == 2) {
            tasks.push([self.symbolA, self.status == 0 ? "buy" : "closesell"])
            tasks.push([self.symbolB, self.status == 0 ? "sell" : "closebuy"])
        }
        
        self.q.pushTask(self.e, tasks[0][0], tasks[0][1], self.opAmount, function(task, ret) {
            self.q.pushTask(self.e, tasks[1][0], tasks[1][1], self.opAmount, function(task, ret) {
                self.isBusy = false
                if (task.action == "sell") {
                    self.status = 2
                } else if (task.action == "buy") {
                    self.status = 1
                } else {
                    self.status = 0
                }
            })
        })
    }
    return self
}


function main() {
    var initAccount = _C(exchange.GetAccount)
    var n = 0
    var q = $.NewTaskQueue(function(task, ret) {
        Log(task.desc, ret ? "成功" : "失败")
        n++
        if (n % 4 == 0) {
            var account = _C(exchange.GetAccount)
            LogProfit(account.Balance - initAccount.Balance, account)
        }
    })
    var t = Hedge(q, exchanges[0], SA, SB, HedgeSpread, CoverSpread)
    while (true) {
        q.poll()
        t.poll()
        Sleep(LoopInterval*1000)
    }
}
