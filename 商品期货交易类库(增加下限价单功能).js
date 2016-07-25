/*
策略出处: https://www.botvs.com/strategy/14198
策略名称: 商品期货交易类库(增加下限价单功能)
策略作者: edwardgyw
策略描述:

6.24更新，完善了4种夜盘时间类型，周六凌晨的夜盘时间计入交易时段
在原zero提供版本基础上，增加了下限价单和平限价单的功能，方便埋单
增加了判断当前是否是交易时段的功能，同时提供自定义节假日的功能


参数            默认值      描述
------------  -------  ----------
Interval      500      失败重试间隔(毫秒)
SlidePrice    false    下单滑价(元)
nightType     true     商品夜盘情况
holidaysList  5.1,5.2  节假日情况
*/

function GetPosition(e, contractType, direction) {
    var allCost = 0;
    var allAmount = 0;
    var allProfit = 0;
    var allFrozen = 0;
    var posMargin = 0;
    var positions = _C(e.GetPosition);
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType == contractType &&
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



function Open(e, contractType, direction, opAmount, price) {
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
        var pr = price;
        if (!price) pr = direction == PD_LONG ? depth.Asks[0].Price : depth.Bids[0].Price;
        var amount = Math.min(insDetail.MaxLimitOrderVolume, needOpen);
        e.SetDirection(direction == PD_LONG ? "buy" : "sell");
        var orderId;
        if (direction == PD_LONG) {
            orderId = e.Buy(pr + SlidePrice, Math.min(amount, depth.Asks[0].Amount), contractType, 'Ask', depth);
        } else {
            orderId = e.Sell(pr - SlidePrice, Math.min(amount, depth.Bids[0].Amount), contractType, 'Bid', depth);
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

function Cover(e, contractType, price) {
    var insDetail = _C(e.SetContractType, contractType);
    while (true) {
        var n = 0;
        var positions = _C(e.GetPosition);
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].ContractType != contractType) {
                continue;
            }
            while (positions[i].FrozenAmount !== 0) {
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
                positions = _C(e.GetPosition);
            }
            var amount = Math.min(insDetail.MaxLimitOrderVolume, positions[i].Amount);
            var depth;
            if (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) {
                depth = _C(e.GetDepth);
                var pr = price;
                if (!price) pr = depth.Bids[0].Price;
                e.SetDirection(positions[i].Type == PD_LONG ? "closebuy_today" : "closebuy");
                e.Sell(pr - SlidePrice, Math.min(amount, depth.Bids[0].Amount), contractType, positions[i].Type == PD_LONG ? "平今" : "平昨", 'Bid', depth.Bids[0]);
                n++;
            } else if (positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) {
                depth = _C(e.GetDepth);
                var pr = price;
                if (!price) pr = depth.Asks[0].Price;
                e.SetDirection(positions[i].Type == PD_SHORT ? "closesell_today" : "closesell");
                e.Buy(pr + SlidePrice, Math.min(amount, depth.Asks[0].Amount), contractType, positions[i].Type == PD_SHORT ? "平今" : "平昨", 'Ask', depth.Asks[0]);
                n++;
            }
        }
        if (n === 0 || price) {
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

    PositionManager.prototype.OpenLong = function(contractType, shares, price) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_LONG, shares, price, price);
    };

    PositionManager.prototype.OpenShort = function(contractType, shares, price) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Open(this.e, contractType, PD_SHORT, shares, price);
    };

    PositionManager.prototype.Cover = function(contractType, price) {
        if (!this.account) {
            this.account = _C(exchange.GetAccount);
        }
        return Cover(this.e, contractType, price);
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

function getHolidays(holidaysList) {
    if (!holidaysList) return {
        'mon': [],
        'day': []
    };
    var x = holidaysList.split(',');
    var t = {
        'mon': [],
        'day': []
    };
    for (var i = 0; i < x.length; i++) {
        var m = x[i].split('.');
        t.mon.push(m[0]);
        t.day.push(m[1]);
    }
    return t;
}

$.judgeTrading = function() {
    var now = new Date();
    var day = now.getDay();
    var mon = now.getMonth() + 1;
    var min = now.getMinutes();
    var date = now.getDate();
    var hours = now.getHours();
    var isHolidays = false;
    var holidays = getHolidays(holidaysList);
    if (holidays) {
        for (var i = 0; i < holidays.mon.length; i++) {
            if (holidays.mon[i] == mon && holidays.day[i] == date) {
                isHolidays = true;
                break;
            }
        }
    }
    if (day === 0 || (day === 6 && hours>=3) || isHolidays) return false;
    else if ((hours >= 9 && hours <= 11) || (hours >= 13 && hours < 15)) {
        if (hours == 11 && min >= 30) return false;
        else if (hours == 13 && min < 30) return false;
        else if ((hours == 10 && min >= 15) && (hours == 10 && min < 30)) return false;
        else return true;
    } else if (nightType == 1 && hours >= 21 && hours < 23) return true;
    else if (nightType == 2 && ((hours >= 21 && hours < 24) || (hours >= 0 && hours < 1 && day !== 1))) return true;
    else if(nightType===3&& ((hours>=21&&hours<23)||(hours===23&&min<30))) return true;
    else if(nightType===4&&((hours >= 21 && hours < 24)||(hours>=0&&hours<2)||(hours===2&&min<30))&&day!==1) return true;
    else return false;
};

//未成功登陆前要多次尝试login，所以写了一个准备交易的函数，可以放到main函数开头
$.ready4ctp = function(contractType) {
    var insDetail;
    var retry = 0;
    while (!(insDetail = exchange.SetContractType(contractType)) && retry < 20) {
        Sleep(2000);
        retry++;
    }
    if (insDetail) Log("合约", insDetail.InstrumentName, "一手", insDetail.VolumeMultiple, "份, 最大下单量", insDetail.MaxLimitOrderVolume, "保证金率:", insDetail.LongMarginRatio, "交割日期", insDetail.StartDelivDate);
    else throw ('连接超时，请检查账号');
    return insDetail;
};

function main() {
    $.ready4ctp('MA609');
    var isTrading = $.judgeTrading();
    Log('当前正在交易？:'+isTrading);
    var p = $.NewPositionManager();
    p.OpenShort("MA609", 1, 1000);
    Sleep(60000 * 10);
    p.Cover("MA609", 1000);
    p.Cover('MA609');
    LogProfit(p.Profit());

}
