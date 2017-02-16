/*
策略出处: https://www.botvs.com/strategy/27799
策略名称: 商品期货套利 - 多品种网格对冲模型
策略作者: Zero
策略描述:

商品期货对冲 + 网格

传统的跨期对冲一般指统计套利, 用线性回归或者其它办法生成一个套利区间, 这样套利机会比较少, 而且有预测性, 未来价差很可能不是预计的那样回归

为了解决这种办法, 进而更频繁的进行套利操作, 我们把两个关联品种或者跨期品种的套利价差定义成一个网格, 每满足一定的价差就开一次仓, 做一次对冲

这样价差来回在我们设置的网格里进行波动，我们就能不断的开仓平仓实现盈利.

不善文案, 不做文字表达了, 具体看策略代码


参数           默认值                                                                                     描述
-----------  --------------------------------------------------------------------------------------  -----------
HedgeTable   (MA705&MA709)30:15:1;40:25:1;50:35:1;60:45:1(FG705&FG709)10:0:1;15:5:1;20:10:1;25:15:1  开仓表
CoverAll     false                                                                                   启动时平掉所有仓位
CalcPeriod   60                                                                                      账户权益统计周期(分)
AutoRestore  false                                                                                   自动恢复
*/

function Hedge(q, e, positions, symbolA, symbolB, hedgeSpread) {
    var self = {}
    self.q = q
    self.symbolA = symbolA
    self.symbolB = symbolB
    self.name = symbolA + " & " + symbolB
    self.e = e
    self.isBusy = false
    self.diffA = 0
    self.diffB = 0
    self.update = _D()
    var arr = hedgeSpread.split(';')
    self.dic = []
    var n = 0
    var coefficient = 1
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType == symbolA) {
            n += positions[i].Amount
            if (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) {
                coefficient = -1
            }
        }
    }
    _.each(arr, function(pair) {
        var tmp = pair.split(':');
        if (tmp.length != 3) {
            throw "开仓表不正确";
        }
        var st = {
            open: Number(tmp[0]),
            cover: Number(tmp[1]),
            amount: Number(tmp[2]),
            hold: 0
        }
        if (n > 0) {
            var m = Math.min(n, st.amount)
            n -= m
            st.hold = m * coefficient
            Log("恢复", self.name, st)
        }
        self.dic.push(st)
    });
    if (n > 0) {
        throw "恢复失败, 有多余仓位 " + n;
    }

    self.poll = function() {
        if (self.isBusy || (!$.IsTrading(self.symbolA))) {
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
        
        self.update = _D(tickerA.Time)

        var action = null
        var diffA = _N(tickerA.Buy - tickerB.Sell)
        var diffB = _N(tickerA.Sell - tickerB.Buy)
        self.diffA = diffA
        self.diffB = diffB

        for (var i = 0; i < self.dic.length && !action; i++) {
            if (self.dic[i].hold == 0) {
                if (self.dic[i].open <= diffA) {
                    action = [i, "sell", "buy", self.dic[i].amount]
                } else if (self.dic[i].open <= -diffB) {
                    action = [i, "buy", "sell", -self.dic[i].amount]
                }
            } else {
                if (self.dic[i].hold > 0 && self.dic[i].cover >= diffB) {
                    action = [i, "closesell", "closebuy", self.dic[i].hold]
                } else if (self.dic[i].hold < 0 && self.dic[i].cover >= -diffA) {
                    action = [i, "closebuy", "closesell", self.dic[i].hold]
                }
            }
        }

        if (!action) {
            return
        }
        
        Log("A卖B买: " + _N(diffA) + ", A买B卖: " + _N(diffB), ", Action: " + JSON.stringify(action))

        self.isBusy = true

        self.q.pushTask(self.e, self.symbolA, action[1], self.dic[action[0]].amount, function(task, ret) {
            if (!ret) {
                self.isBusy = false
                return
            }
            self.q.pushTask(self.e, self.symbolB, action[2], self.dic[action[0]].amount, function(task, ret) {
                if (!ret) {
                    throw "开仓失败..."
                }
                self.isBusy = false
                if (task.action != "buy" && task.action != "sell") {
                    self.dic[action[0]].hold = 0;
                } else {
                    self.dic[action[0]].hold = action[3];
                }
            })
        })
    }
    return self
}


function main() {
    SetErrorFilter("ready|login|timeout")
    Log("正在与交易服务器连接...")
    while (!exchange.IO("status")) Sleep(1000);
    Log("与交易服务器连接成功")
    var mode = exchange.IO("mode", 0);
    if (typeof(mode) !== 'number') {
        throw "切换模式失败, 请更新到最新托管者!";
    } else {
        Log("已切换到适合多品种价格查询的立即模式");
    }

    if (CoverAll) {
        Log("开始平掉所有残余仓位...");
        $.NewPositionManager().CoverAll();
        Log("操作完成");
    }
    LogStatus("尝试获取持仓状态")
    var positions = _C(exchange.GetPosition)
    LogStatus("Ready")

    if (positions.length > 0 && !AutoRestore) {
        throw "发现持仓, 请勾选自动恢复"
    }

    var pairs = []
    var q = $.NewTaskQueue(function(task, ret) {
        Log(task.desc, ret ? "成功" : "失败")
    })
    var arr = HedgeTable.split('(');
    var tbl = {
        type: 'table',
        title: 'Runtime',
        cols: ['Pair', 'Open', 'Cover', 'Hold', 'DiffA', 'DiffB', 'Time'],
        rows: []
    };
    _.each(arr, function(item) {
        if (item != '') {
            var tmp = item.split(')');
            var pair = tmp[0].replace('(', '').split('&');
            var symbolDetail = _C(exchange.SetContractType, pair[0])
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate);
            symbolDetail = _C(exchange.SetContractType, pair[1])
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate);
            pairs.push(Hedge(q, exchanges[0], positions, pair[0], pair[1], tmp[1]))
        }
    });

    var ts = 0
    var lastUpdate = 0
    while (true) {
        if (!exchange.IO("status")) {
            Sleep(1000)
            continue
        }
        
        var now = new Date().getTime()
        if (now - ts > (CalcPeriod * 60000)) {
            var account = exchange.GetAccount()
            if (account) {
                var obj = JSON.parse(exchange.GetRawJSON())
                $.PlotLine('账户权益', obj['Balance'] + obj['PositionProfit']);
                ts = now
            }
        }
        // IO("wait") 会一直等待收到任何一个品种的行情推送信息, 返回收到行情的真实时间
        var n = exchange.IO("wait")
        // 计算行情信息传到策略层花费的时间
        var idle = UnixNano() - n
        
        if (now - lastUpdate > 5000) {
            tbl.rows = []
            _.each(pairs, function(t) {
                for (var i = 0; i < t.dic.length; i++) {
                    tbl.rows.push([t.name, t.dic[i].open, t.dic[i].cover, t.dic[i].hold, t.diffA, t.diffB, t.update])
                }
            });
            LogStatus('`' + JSON.stringify(tbl) + '`\nUpdate: ' + _D() + ', Idle: ' + (idle/1000000) + ' ms')
            lastUpdate = now
        }
        
        _.each(pairs, function(t) {
            t.poll()
        });
        
        q.poll()
    }
}
