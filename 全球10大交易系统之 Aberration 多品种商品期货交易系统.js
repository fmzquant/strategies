/*
策略出处: https://www.botvs.com/strategy/25943
策略名称: 全球10大交易系统之 Aberration 多品种商品期货交易系统
策略作者: Zero
策略描述:

全球10大交易系统之一, 是做为商品期货多品种操作策略入门的不二之选

* 策略框架逻辑清晰, 可复用性强
* 可通过交互功能实盘运行时实时调试
* 运行稳定, 细节处理完善
* 支持多品种同时操作, 可分别控制开仓量
* 重启时可自动根据仓位恢复进度
* 有风控模块, 可实时显示风险, 止损
* 下单微信通知
* 不想租服务器的可以用自己的电脑或者树莓派运行 Windows, Linux, Mac系统都可以, 路由器刷完机也可以.

https://dn-filebox.qbox.me/e65b74536656f064f5c55842d8376a4b29043dbc.png

`是的, 免费开源给BotVS用户, 完整的策略像一个完整的人生, 每个环节都不可少`


参数            默认值                     描述
------------  ----------------------  ----------
Symbols       MA701:5,CF701:3,rb1701  合约品种
NPeriod       35                      计算周期
Ks            2                       上轨系数
Kx            2                       下轨系数
AmountOP      true                    默认开仓合约张数
LoopInterval  3                       轮询间隔(秒)
NotifyWX      true                    下单微信通知
Reset         false                   启动时重置
RCMode        true                    启用风控模块
MinNetAsset   10000                   最小净值
RCCoverAll    true                    触发后平掉所有仓位
AutoRestore   false                   自动根据仓位恢复进度

按钮     默认值                         描述
-----  --------------------------  ----
Debug  Log(exchange.GetAccount())  调试
*/

function Aberration(q, e, symbol, period, upRatio, downRatio, opAmount) {
    var self = {}
    self.q = q
    self.e = e
    self.symbol = symbol
    self.upTrack = 0
    self.middleTrack = 0
    self.downTrack = 0
    self.nPeriod = period
    self.upRatio = upRatio
    self.downRatio = downRatio
    self.opAmount = opAmount
    self.marketPosition = 0

    self.lastErrMsg = ''
    self.lastErrTime = ''
    self.lastBar = {
        Time: 0,
        Open: 0,
        High: 0,
        Low: 0,
        Close: 0,
        Volume: 0
    }
    self.symbolDetail = null
    self.lastBarTime = 0
    self.tradeCount = 0
    self.isBusy = false

    self.setLastError = function(errMsg) {
        self.lastErrMsg = errMsg
        self.lastErrTime = errMsg.length > 0 ? _D() : ''
    }

    self.getStatus = function() {
        return [self.symbol, self.opAmount, self.upTrack, self.downTrack, self.middleTrack, _N(self.lastBar.Close), (self.marketPosition == 0 ? "--" : (self.marketPosition > 0 ? "多#ff0000" : "空#0000ff")), self.tradeCount, self.lastErrMsg, self.lastErrTime]
    }
    self.getMarket = function() {
        return [self.symbol, _D(self.lastBarTime), _N(self.lastBar.Open), _N(self.lastBar.High), _N(self.lastBar.Low), _N(self.lastBar.Close), self.lastBar.Volume]
    }

    self.restore = function(positions) {
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType == self.symbol) {
                self.marketPosition += positions[i].Amount * ((positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) ? 1 : -1)
            }
        }
        if (self.marketPosition !== 0) {
            self.tradeCount++
                Log("恢复", self.symbol, "当前持仓为", self.marketPosition)
        }
    }

    self.poll = function() {
        if (self.isBusy) {
            return false
        }

        if (!$.IsTrading(self.symbol)) {
            self.setLastError("不在交易时间内")
            return false
        }

        if (!self.e.IO("status")) {
            self.setLastError("未连接交易所")
            return false
        }

        var detail = self.e.SetContractType(self.symbol)
        if (!detail) {
            self.setLastError("切换合约失败")
            return false
        }
        if (!self.symbolDetail) {
            self.symbolDetail = detail
            Log("合约", detail.InstrumentName.replace(/\s+/g, ""), ", 策略一次开仓:", self.opAmount, "手, 一手", detail.VolumeMultiple, "份, 最大下单量", detail.MaxLimitOrderVolume, "保证金率:", detail.LongMarginRatio.toFixed(4), detail.ShortMarginRatio.toFixed(4), "交割日期", detail.StartDelivDate);
        }
        var records = self.e.GetRecords()
        if (!records || records.length == 0) {
            self.setLastError("获取柱线失败")
            return false
        }

        var bar = records[records.length - 1]
        self.lastBar = bar

        if (records.length <= self.nPeriod) {
            self.setLastError("柱线长度不够")
            return false
        }

        if (self.lastBarTime < bar.Time) {
            var sum = 0
            var pos = records.length - self.nPeriod - 1
            for (var i = pos; i < records.length - 1; i++) {
                sum += records[i].Close
            }
            var avg = sum / self.nPeriod
            var std = 0
            for (i = pos; i < records.length - 1; i++) {
                std += Math.pow(records[i].Close - avg, 2)
            }
            std = Math.sqrt(std / self.nPeriod)

            self.upTrack = _N(avg + (self.upRatio * std))
            self.downTrack = _N(avg - (self.downRatio * std))
            self.middleTrack = _N(avg)
            self.lastBarTime = bar.Time
        }
        var msg
        var act = ""
        if (self.marketPosition == 0) {
            if (bar.Close > self.upTrack) {
                msg = '做多 触发价: ' + bar.Close + ' 上轨:' + self.upTrack;
                act = "buy"
            } else if (bar.Close < self.downTrack) {
                msg = '做空 触发价: ' + bar.Close + ' 下轨:' + self.downTrack;
                act = "sell"
            }
        } else {
            if (self.marketPosition < 0 && bar.Close > self.middleTrack) {
                msg = '平空 触发价: ' + bar.Close + ' 平仓线:' + self.middleTrack;
                act = "closesell"
            } else if (self.marketPosition > 0 && bar.Close < self.middleTrack) {
                msg = '平多 触发价: ' + bar.Close + ' 平仓线:' + self.middleTrack;
                act = "closebuy"
            }
        }

        if (act == "") {
            return true
        }

        Log(self.symbol + ', ' + msg + (NotifyWX ? '@' : ''))

        self.isBusy = true
        self.tradeCount += 1
        if (self.lastErrMsg != '') {
            self.setLastError('')
        }
        self.q.pushTask(self.e, self.symbol, act, self.opAmount, function(task, ret) {
            self.isBusy = false
            if (!ret) {
                return
            }
            if (task.action == "buy") {
                self.marketPosition = 1
            } else if (task.action == "sell") {
                self.marketPosition = -1
            } else {
                self.marketPosition = 0
            }
        })
    }
    return self
}

function main() {
    if (exchange.GetName() !== 'Futures_CTP') {
        throw "只支持传统商品期货(CTP)"
    }
    
    SetErrorFilter("login|ready|初始化")

    LogStatus("Ready...")
    if (Reset) {
        LogProfitReset()
        LogReset()
    }
    
    // Ref: https://www.botvs.com/bbs-topic/362
    if (typeof(exchange.IO("mode", 0)) == 'number') {
        Log("切换行情模式成功")
    }

    LogStatus("等待与期货商服务器连接..")
    while (!exchange.IO("status")) {
        Sleep(500)
    }
    LogStatus("获取资产信息")
    var tblRuntime = {
        type: 'table',
        title: '交易信息',
        cols: ['品种', '每次开仓量', '上轨', '下轨', '中轨', '最后成交价', '仓位', '交易次数', '最后错误', '错误时间'],
        rows: []
    };
    var tblMarket = {
        type: 'table',
        title: '行情信息',
        cols: ['品种', '当前周期', '开盘', '最高', '最低', '最后成交价', '成交量'],
        rows: []
    };
    var tblPosition = {
        type: 'table',
        title: '持仓信息',
        cols: ['品种', '杠杆', '方向', '均价', '数量', '持仓盈亏'],
        rows: []
    };
    var positions = _C(exchange.GetPosition)
    if (positions.length > 0 && !AutoRestore) {
        throw "程序启动时不能有持仓, 但您可以勾选自动恢复来进行自动识别 !"
    }
    var initAccount = _C(exchange.GetAccount)
    var detail = JSON.parse(exchange.GetRawJSON())
    if (positions.length > 0) {
        initAccount.Balance += detail['CurrMargin']
    }
    var initNetAsset = detail['CurrMargin'] + detail['Available']
    var initAccountTbl = $.AccountToTable(exchange.GetRawJSON(), "初始资金")

    if (initAccountTbl.rows.length == 0) {
        initAccountTbl.rows = [
            ['Balance', '可用保证金', initAccount.Balance],
            ['FrozenBalance', '冻结资金', initAccount.FrozenBalance]
        ]
    }

    var nowAcccount = initAccount
    var nowAcccountTbl = initAccountTbl

    var symbols = Symbols.replace(/\s+/g, "").split(',')
    var pollers = []
    var prePosUpdate = 0
    var suffix = ""
    var needUpdate = false
    var holdProfit = 0

    function updateAccount(acc) {
        nowAcccount = acc
        nowAcccountTbl = $.AccountToTable(exchange.GetRawJSON(), "当前资金")
        if (nowAcccountTbl.rows.length == 0) {
            nowAcccountTbl.rows = [
                ['Balance', '可用保证金', nowAcccount.Balance],
                ['FrozenBalance', '冻结资金', nowAcccount.FrozenBalance]
            ]
        }
    }

    var q = $.NewTaskQueue(function(task, ret) {
        needUpdate = true
        Log(task.desc, ret ? "成功" : "失败")
        var account = task.e.GetAccount()
        if (account) {
            updateAccount(account)
        }
    })

    _.each(symbols, function(symbol) {
        var pair = symbol.split(':')
        pollers.push(Aberration(q, exchange, pair[0], NPeriod, Ks, Kx, (pair.length == 1 ? AmountOP : parseInt(pair[1]))))
    })

    if (positions.length > 0 && AutoRestore) {
        _.each(pollers, function(poll) {
            poll.restore(positions)
        })
    }
    var isFirst = true
    while (true) {
        var cmd = GetCommand()
        if (cmd) {
            var js = cmd.split(':', 2)[1]
            Log("执行调试代码:", js)
            try {
                eval(js)
            } catch (e) {
                Log("Exception", e)
            }
        }
        tblRuntime.rows = []
        tblMarket.rows = []
        var marketAlive = false
        _.each(pollers, function(poll) {
            if (poll.poll()) {
                marketAlive = true
            }
            tblRuntime.rows.push(poll.getStatus())
            tblMarket.rows.push(poll.getMarket())
        })
        q.poll()
        Sleep(LoopInterval * 1000)
        if ((!exchange.IO("status")) || (!marketAlive)) {
            if (isFirst) {
                LogStatus("正在等待开盘...", _D())
            }
            continue
        }
        isFirst = false
        var now = new Date().getTime()
        if (marketAlive && (now - prePosUpdate > 30000 || needUpdate)) {
            var pos = exchange.GetPosition()
            if (pos) {
                holdProfit = 0
                prePosUpdate = now
                tblPosition.rows = []
                for (var i = 0; i < pos.length; i++) {
                    tblPosition.rows.push([pos[i].ContractType, pos[i].MarginLevel, ((pos[i].Type == PD_LONG || pos[i].Type == PD_LONG_YD) ? '多#ff0000' : '空#0000ff'), pos[i].Price, pos[i].Amount, _N(pos[i].Profit)])
                    holdProfit += pos[i].Profit
                }
                if (pos.length == 0 && needUpdate) {
                    LogProfit(_N(nowAcccount.Balance - initAccount.Balance, 4), nowAcccount)
                }
            }
            needUpdate = false
            if (RCMode) {
                var account = exchange.GetAccount()
                if (account) {
                    updateAccount(account)
                    var detail = JSON.parse(exchange.GetRawJSON())
                    var netAsset = detail['PositionProfit'] + detail['CurrMargin'] + detail['Available']
                    var risk = detail['CurrMargin'] / (detail['CurrMargin'] + detail['Available'] + detail['PositionProfit'])
                    suffix = ", 账户初始净值约: " + _N(initNetAsset, 2) + " , 风控最小净值要求" + MinNetAsset + " , 当前账户净值约: " + _N(netAsset, 2) + ", 盈亏约: " + _N(netAsset - initNetAsset, 3) + " 元, 风险: " + ((risk * 100).toFixed(3)) + "% #ff0000"
                    if (netAsset < MinNetAsset) {
                        Log("风控模块触发, 中止运行并平掉所有仓位, 当前净值约 ", netAsset, ", 要求低于最小净值:", MinNetAsset)
                        if (RCCoverAll) {
                            Log("开始平掉所有仓位")
                            $.NewPositionManager().CoverAll()
                        }
                        throw "中止运行"
                    }
                }
            }
        }
        LogStatus('`' + JSON.stringify([tblRuntime, tblPosition, tblMarket, initAccountTbl, nowAcccountTbl]) + '`\n价格最后更新: ' + _D() + ', 持仓最后更新: ' + _D(prePosUpdate) + '\n当前持仓总盈亏: ' + _N(holdProfit, 3) + suffix)
    }
}
