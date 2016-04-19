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
    Sleep(60000 * 10);
    p.Cover("MA609");
    LogProfit(p.Profit());
}
```

`不断完善中...`


参数            默认值  描述
----------  -----  ----------
Interval    500    失败重试间隔(毫秒)
SlidePrice    0.1  下单滑价(元)
*/

function GetPosition(e, contractType, direction) {
    var allCost = 0;
    var allAmount = 0;
    var allProfit = 0;
    var allFrozen = 0;
    var posMargin = 0;
    var positions = _C(e.GetPosition);
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
            orderId = e.Buy(depth.Asks[0].Price + SlidePrice, Math.min(amount, depth.Asks[0].Amount), contractType, 'Ask', depth.Asks[0]);
        } else {
            orderId = e.Sell(depth.Bids[0].Price - SlidePrice, Math.min(amount, depth.Bids[0].Amount), contractType, 'Bid', depth.Bids[0]);
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
                e.Sell(depth.Bids[0].Price - SlidePrice, Math.min(amount, depth.Bids[0].Amount), contractType, positions[i].Type == PD_LONG ? "平今" : "平昨", 'Bid', depth.Bids[0]);
                n++;
            } else if (positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) {
                depth = _C(e.GetDepth);
                e.SetDirection(positions[i].Type == PD_SHORT ? "closesell_today" : "closesell");
                e.Buy(depth.Asks[0].Price + SlidePrice, Math.min(amount, depth.Asks[0].Amount), contractType, positions[i].Type == PD_SHORT ? "平今" : "平昨", 'Ask', depth.Asks[0]);
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
    PositionManager.prototype.GetAccount = function() {
        return _C(this.e.GetAccount);
    };

    PositionManager.prototype.OpenLong = function(contractType, shares) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_LONG, shares);
    };

    PositionManager.prototype.OpenShort = function(contractType, shares) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_SHORT, shares);
    };

    PositionManager.prototype.Cover = function(contractType) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
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


function main() {
    var p = $.NewPositionManager();
    p.OpenShort("MA609", 1);
    Sleep(60000 * 10);
    p.Cover("MA609");
    LogProfit(p.Profit());
}
