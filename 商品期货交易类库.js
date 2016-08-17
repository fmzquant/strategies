/*
策略出处: https://www.botvs.com/strategy/12961
策略名称: 商品期货交易类库
策略作者: Zero
策略描述:

商品期货交易类库
```
function main() {
    var p = $.NewPositionManager();
    p.OpenShort("MA609", 1);
    Log(p.GetPosition("MA609", PD_SHORT));
    Log(p.GetAccount());
    Log(p.Account());
    Sleep(60000 * 10);
    p.Cover("MA609");
    LogProfit(p.Profit());
    Log($.IsTrading('MA609'));
}
```

`不断完善中...`


参数         默认值    描述
---------  -----  ----------
Interval   500    失败重试间隔(毫秒)
SlideTick  true   滑价点数(整数)
*/

function init() {
    if (typeof(SlideTick) === 'undefined') {
        SlideTick = 1;
    } else {
        SlideTick = parseInt(SlideTick);
    }
    Log("商品交易类库加载成功");
}

function GetPosition(e, contractType, direction, positions) {
    var allCost = 0;
    var allAmount = 0;
    var allProfit = 0;
    var allFrozen = 0;
    var posMargin = 0;
    if (typeof(positions) === 'undefined' || !positions) {
        positions = _C(e.GetPosition);
    }
    for (var i = 0; i < positions.length; i++) {
        if ( positions[i].ContractType == contractType && 
            (((positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) && direction == PD_LONG) || ((positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) && direction == PD_SHORT)) 
        ) {
            posMargin = positions[i].MarginLevel;
            allCost += (positions[i].Price * positions[i].Amount);
            allAmount += positions[i].Amount;
            allProfit += positions[i].Profit;
            allFrozen += positions[i].FrozenAmount;
        }
    }
    if (allAmount === 0) {
        return null;
    }
    return {
        MarginLevel: posMargin,
        FrozenAmount: allFrozen,
        Price: _N(allCost / allAmount),
        Amount: allAmount,
        Profit: allProfit,
        Type: direction,
        ContractType: contractType
    };
}


function Open(e, contractType, direction, opAmount) {
    var initPosition = GetPosition(e, contractType, direction);
    var isFirst = true;
    var initAmount = initPosition ? initPosition.Amount : 0;
    var positionNow = initPosition;
    while (true) {
        var needOpen = opAmount;
        if (isFirst) {
            isFirst = false;
        } else {
            positionNow = GetPosition(e, contractType, direction);
            if (positionNow) {
                needOpen = opAmount - (positionNow.Amount - initAmount);
            }
        }
        var insDetail = _C(e.SetContractType, contractType);
        //Log("初始持仓", initAmount, "当前持仓", positionNow, "需要加仓", needOpen);
        if (needOpen < insDetail.MinLimitOrderVolume) {
            break;
        }
        var depth = _C(e.GetDepth);
        var amount = Math.min(insDetail.MaxLimitOrderVolume, needOpen);
        e.SetDirection(direction == PD_LONG ? "buy" : "sell");
        var orderId;
        if (direction == PD_LONG) {
            orderId = e.Buy(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), Math.min(amount, depth.Asks[0].Amount), contractType, 'Ask', depth.Asks[0]);
        } else {
            orderId = e.Sell(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), Math.min(amount, depth.Bids[0].Amount), contractType, 'Bid', depth.Bids[0]);
        }
        // CancelPendingOrders
        while (true) {
            Sleep(Interval);
            var orders = _C(e.GetOrders);
            if (orders.length === 0) {
                break;
            }
            for (var j = 0; j < orders.length; j++) {
                e.CancelOrder(orders[j].Id);
                if (j < (orders.length - 1)) {
                    Sleep(Interval);
                }
            }
        }
    }
    var ret = {
        price: 0,
        amount: 0,
        position: positionNow
    };
    if (!positionNow) {
        return ret;
    }
    if (!initPosition) {
        ret.price = positionNow.Price;
        ret.amount = positionNow.Amount;
    } else {
        ret.amount = positionNow.Amount - initPosition.Amount;
        ret.price = _N(((positionNow.Price * positionNow.Amount) - (initPosition.Price * initPosition.Amount)) / ret.amount);
    }
    return ret;
}

function Cover(e, contractType) {
    var insDetail = _C(e.SetContractType, contractType);
    while (true) {
        var n = 0;
        var positions = _C(e.GetPosition);
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType != contractType) {
                continue;
            }
            var amount = Math.min(insDetail.MaxLimitOrderVolume, positions[i].Amount);
            var depth;
            if (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) {
                depth = _C(e.GetDepth);
                e.SetDirection(positions[i].Type == PD_LONG ? "closebuy_today" : "closebuy");
                e.Sell(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), Math.min(amount, depth.Bids[0].Amount), contractType, positions[i].Type == PD_LONG ? "平今" : "平昨", 'Bid', depth.Bids[0]);
                n++;
            } else if (positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) {
                depth = _C(e.GetDepth);
                e.SetDirection(positions[i].Type == PD_SHORT ? "closesell_today" : "closesell");
                e.Buy(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), Math.min(amount, depth.Asks[0].Amount), contractType, positions[i].Type == PD_SHORT ? "平今" : "平昨", 'Ask', depth.Asks[0]);
                n++;
            }
        }
        if (n === 0) {
            break;
        }
        while (true) {
            Sleep(Interval);
            var orders = _C(e.GetOrders);
            if (orders.length === 0) {
                break;
            }
            for (var j = 0; j < orders.length; j++) {
                e.CancelOrder(orders[j].Id);
                if (j < (orders.length - 1)) {
                    Sleep(Interval);
                }
            }
        }
    }
}

var trans = {
    "AccountID": "投资者帐号",
    "Available": "可用资金",
    "Balance": "期货结算准备金",
    "BrokerID": "经纪公司代码",
    "CashIn": "资金差额",
    "CloseProfit": "平仓盈亏",
    "Commission": "手续费",
    "Credit": "信用额度",
    "CurrMargin": "当前保证金总额",
    "CurrencyID": "币种代码",
    "DeliveryMargin": "投资者交割保证金",
    "Deposit": "入金金额",
    "ExchangeDeliveryMargin": "交易所交割保证金",
    "ExchangeMargin": "交易所保证金",
    "FrozenCash": "冻结的资金",
    "FrozenCommission": "冻结的手续费",
    "FrozenMargin": "冻结的保证金",
    "FundMortgageAvailable": "货币质押余额",
    "FundMortgageIn": "货币质入金额",
    "FundMortgageOut": "货币质出金额",
    "Interest": "利息收入",
    "InterestBase": "利息基数",
    "Mortgage": "质押金额",
    "MortgageableFund": "可质押货币金额",
    "PositionProfit": "持仓盈亏",
    "PreBalance": "上次结算准备金",
    "PreCredit": "上次信用额度",
    "PreDeposit": "上次存款额",
    "PreFundMortgageIn": "上次货币质入金额",
    "PreFundMortgageOut": "上次货币质出金额",
    "PreMargin": "上次占用的保证金",
    "PreMortgage": "上次质押金额",
    "Reserve": "基本准备金",
    "ReserveBalance": "保底期货结算准备金",
    "SettlementID": "结算编号",
    "SpecProductCloseProfit": "特殊产品持仓盈亏",
    "SpecProductCommission": "特殊产品手续费",
    "SpecProductExchangeMargin": "特殊产品交易所保证金",
    "SpecProductFrozenCommission": "特殊产品冻结手续费",
    "SpecProductFrozenMargin": "特殊产品冻结保证金",
    "SpecProductMargin": "特殊产品占用保证金",
    "SpecProductPositionProfit": "特殊产品持仓盈亏",
    "SpecProductPositionProfitByAlg": "根据持仓盈亏算法计算的特殊产品持仓盈亏",
    "TradingDay": "交易日",
    "Withdraw": "出金金额",
    "WithdrawQuota": "可取资金",
};

var PositionManager = (function() {
    function PositionManager(e) {
        if (typeof(e) === 'undefined') {
            e = exchange;
        }
        if (e.GetName() !== 'Futures_CTP') {
            throw 'Only support CTP';
        }
        this.e = e;
        this.account = null;
    }
    // Get Cache
    PositionManager.prototype.Account = function() {
        if (!this.account) {
            this.account = _C(this.e.GetAccount);
        }
        return this.account;
    };
    PositionManager.prototype.GetAccount = function(getTable) {
        this.account = _C(this.e.GetAccount);
        if (typeof(getTable) !== 'undefined' && getTable) {
            var tbl = { type : "table", title : "账户信息", cols : ["字段", "描述", "值"], rows : [] };
            try {
                var fields = JSON.parse(this.e.GetRawJSON());
                for (var k  in fields) {
                    var desc = trans[k];
                    var v = fields[k];
                    if (typeof(v) === 'number') {
                        v = _N(v, 5);
                    }
                    tbl.rows.push([k, typeof(desc) === 'undefined' ? '--' : desc, v]);
                }
            } catch(e) {};
            return tbl;
        }
        return this.account;
    };
    
    PositionManager.prototype.GetPosition = function(contractType, direction, positions) {
        return GetPosition(this.e, contractType, direction, positions);
    };
    
    PositionManager.prototype.OpenLong = function(contractType, shares) {
        if (!this.account) {
            this.account = _C(this.e.GetAccount);
        }
        return Open(this.e, contractType, PD_LONG, shares);
    };

    PositionManager.prototype.OpenShort = function(contractType, shares) {
        if (!this.account) {
            this.account = _C(this.e.GetAccount);
        }
        return Open(this.e, contractType, PD_SHORT, shares);
    };

    PositionManager.prototype.Cover = function(contractType) {
        if (!this.account) {
            this.account = _C(this.e.GetAccount);
        }
        return Cover(this.e, contractType);
    };

    PositionManager.prototype.Profit = function(contractType) {
        var accountNow = _C(this.e.GetAccount);
        return _N(accountNow.Balance - this.account.Balance);
    };

    return PositionManager;
})();

$.NewPositionManager = function(e) {
    return new PositionManager(e);
};

// Via: http://mt.sohu.com/20160429/n446860150.shtml
$.IsTrading = function(symbol) {
    var now = new Date();
    var day = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();

    if (day === 0 || (day === 6 && (hour > 2 || hour == 2 && minute > 30))) {
        return false;
    }

    var p, i, shortName = "";
    for (i = 0; i < symbol.length; i++) {
        var ch = symbol.charCodeAt(i);
        if (ch >= 48 && ch <= 57) { 
            break;
        }
        shortName += symbol[i].toUpperCase();
    }

    var period = [[9,0,10,15], [10,30,11,30], [13,30,15,0]];
    if (shortName === "IH" || shortName === "IF" || shortName === "IC") {
        period = [[9,30,11,30], [13,0,15,0]];
    } else if (shortName === "TF") {
        period = [[9,15,11,30], [13,0,15,15]];
    }
    
    
    if (day >= 1 && day <= 5) {
        for (i = 0; i < period.length; i++) {
            p = period[i];
            if ((hour > p[0] || (hour == p[0] && minute>=p[1])) && (hour < p[2] || (hour == p[2] && minute<p[3]))) {
                return true;
            }
        }
    }

    var nperiod = [
        [['AU', 'AG'], [21,0,02,30]],
        [['CU', 'AL', 'ZN', 'PB', 'SN', 'NI'], [21,0,01,0]],
        [['RU', 'RB', 'HC', 'BU'], [21,0,23,0]],
        [['P', 'J', 'M', 'Y', 'A', 'B', 'JM', 'I'], [21,0,23,30]],
        [['SR', 'CF', 'RM', 'MA', 'PTA', 'ZC', 'FG', 'IO'], [21,0,23,30]],
    ];
    for (i = 0; i < nperiod.length; i++) {
        for (var j = 0; j < nperiod[i][0].length; j++) {
            if (nperiod[i][0][j] === shortName) {
                p = nperiod[i][1];
                var condA = hour > p[0] || (hour == p[0] && minute >= p[1]);
                var condB = hour < p[2] || (hour == p[2] && minute <  p[3]);
                // in one day
                if (p[2] >= p[0]) {
                    if ((day >= 1 && day <= 5) && condA && condB) {
                        return true;
                    }
                } else {
                    if (((day >= 1 && day <= 5) && condA) || ((day >= 2 && day <= 6) && condB)) {
                        return true;
                    }
                }
                return false;
            }
        }
    }
    return false;
};

function main() {
    var p = $.NewPositionManager();
    p.OpenShort("MA609", 1);
    Log(p.GetPosition("MA609", PD_SHORT));
    Log(p.GetAccount());
    Log(p.Account());
    Sleep(60000 * 10);
    p.Cover("MA609");
    LogProfit(p.Profit());
    Log($.IsTrading("MA609"));
}
