/*
策略出处: https://www.botvs.com/strategy/27122
策略名称: 商品期货跨期对冲 - 单品种套利合约
策略作者: Zero
策略描述:

使用套利合约进行对冲优点是双向开仓速度快, 滑点少, 策略实盘测试通过.


参数           默认值              描述
-----------  ---------------  ---------
Symbol       SPD MA705&MA709  套利合约
HedgeSpread  15               开仓价差
CoverSpread  5                平仓价差
OpAmount     true             开仓手数
CoverAll     false            启动时平掉所有仓位
Reset        false            启动时重置所有信息
AutoRestore  true             启动时自动恢复仓位

按钮        默认值         描述
--------  ----------  ------
CoverALL  __button__  平掉所有仓位
*/

function Hedge(q, e, initAccount, symbol, hedgeSpread, coverSpread) {
    var self = {}
    self.q = q
    self.initAccount = initAccount
    self.status = 0
    self.symbol = symbol
    self.e = e
    self.isBusy = false
    self.hedgeSpread = hedgeSpread
    self.coverSpread = coverSpread
    self.insDetail = null;
    self.opAmount = OpAmount
    var arr = symbol.split('&');
    if (arr.length != 2) {
        throw "合约名称必须是套利合约";
    }
    self.pairA = arr[0].replace('SPD ', '').replace('SP ', '');
    self.pairB = arr[1];
    
    self.reset = function() {
        self.isBusy = false;
        self.status = 0;
    }
    self.init = function() {
        LogStatus("正在尝试恢复仓位");
        var positions = _C(exchange.GetPosition);
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType == self.symbol) {
                self.status = (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) ? 1 : 2;
                break;
            }
        }
        Log("恢复状态成功, 当前状态为: ", ["闲置", "多仓", "空仓"][self.status]);
        LogStatus("Running");
    }
    self.poll = function() {
        if (self.isBusy || (!exchange.IO("status")) || (!$.IsTrading(self.symbol))) {
            Sleep(1000);
            return
        }
        var insDetail = exchange.SetContractType(self.symbol)
        if (!insDetail) {
            Sleep(1000);
            return
        }
        if (self.insDetail == null) {
            self.insDetail = insDetail;
            Log("合约", insDetail.InstrumentName, "一手", insDetail.VolumeMultiple, "份, 最大下单量", insDetail.MaxLimitOrderVolume);
        }
        var ticker = exchange.GetTicker()
        if (!ticker) {
            Sleep(1000);
            return
        }
        // _D()是内置时间格式化函数, 不传参就是取当前时间, 可以传时间戳
        LogStatus(_D(), self.pairA, "卖", self.pairB, "买", ticker.Sell, " -- ", self.pairA, "买", self.pairB, "卖", ticker.Buy)
        var action = 0; // 1: A sell B buy 2: A buy B sell

        if (self.status == 0) {
            if (ticker.Sell > self.hedgeSpread) {
                Log("开仓 ", self.pairA, "卖", self.pairB, "买", ticker.Buy, '#ff0000')
                action = 2
            } else if (-ticker.Buy > self.hedgeSpread) {
                Log("开仓 ", self.pairA, "买", self.pairB, "卖", ticker.Buy, '#ff0000')
                action = 1
            }
        } else if (self.status == 2 && ticker.Buy <= self.coverSpread) {
            Log("平仓", self.pairA, "买", self.pairB, "卖", ticker.Sell, '#ff0000')
            action = 2
        } else if (self.status == 1 && ticker.Sell <= self.coverSpread) {
            Log("平仓", self.pairA, "卖", self.pairB, "买",ticker.Buy, '#ff0000')
            action = 1
        }

        if (action == 0) {
            return
        }
        self.isBusy = true
        var taskDirection = "";
        if (action == 1) {
            taskDirection = self.status == 0 ? "buy" : "closebuy";
        } else if (action == 2) {
            taskDirection = self.status == 0 ? "sell" : "closesell";
        }

        self.q.pushTask(self.e, self.symbol, taskDirection, self.opAmount, function(task, ret) {
            self.isBusy = false
            if (task.action == "sell") {
                self.status = 2
            } else if (task.action == "buy") {
                self.status = 1
            } else {
                self.status = 0
                var account = _C(exchange.GetAccount)
                LogProfit(account.Balance - self.initAccount.Balance, account)
            }
        })
    }
    return self
}


function main() {
    if (IsVirtual()) {
        throw "回测不支持套利合约, 请用模拟盘或者实盘测试"
    }
    SetErrorFilter("ready|login|timeout")
    Log("正在与交易服务器连接...")
    while (!exchange.IO("status")) Sleep(1000);
    Log("与交易服务器连接成功")
    var initAccount = _C(exchange.GetAccount)
    Log(initAccount)
    var n = 0
    var q = $.NewTaskQueue(function(task, ret) {
        Log(task.desc, ret ? "成功" : "失败", ret)
    })
    if (Reset) {
        LogReset()
        LogProfitReset()
    }
    if (CoverAll) {
        Log("开始平掉所有残余仓位...");
        $.NewPositionManager().CoverAll();
        Log("操作完成");
    }
    var t = Hedge(q, exchanges[0], initAccount, Symbol, HedgeSpread, CoverSpread)
    if (AutoRestore) {
        t.init();
    }
    while (true) {
        var cmd = GetCommand();
        if (cmd == 'CoverALL') {
            Log("开始平掉仓位...");
            $.NewPositionManager().CoverAll();
            t.reset();
        }
        q.poll()
        t.poll()
    }
}
