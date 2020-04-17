
> 策略名称

网格变形策略之单边网格 (OK期货)

> 策略作者

Zero

> 策略描述

网格可以自定义方向
先买后卖:
网格会从首价格开始向下挂买单, 每个买单间隔 "价格间隔" 这个参数, 挂单数量为"单笔数量",  挂够 "总数量" 个买单, 有任意买单成交以后, 程序会在买价基础上加 "价差(元)" 这个参数的的值的价格挂出卖单, 卖出, 卖出以后，重新按原来这个网格的价格挂买入单
先卖后买:
操作刚好相反

策略最大的风险就是单边行情, 价格波动超出网格范围.

网格带有自动止损和移动功能

> 策略参数



|参数|默认值|描述|
|----|----|----|
|ContractTypeIdx|0|合约品种: 当周|次周|季度|
|OpType|0|网格方向: 先买后卖|先卖后买|
|FirstPriceAuto|false|首价格自动|
|FirstPrice|100|首价格|
|AllNum|10|总数量|
|PriceGrid|true|价格间隔|
|PriceDiff|2|价差(元)|
|AmountType|0|订单大小: 买卖同量|自定义量|
|AmountOnce|true|单笔数量|
|BAmountOnce|true|买单大小|
|SAmountOnce|true|卖单大小|
|MarginLevelIdx|0|杠杆大小: 10|20|
|EnableProtectDiff|false|开启价差保护|
|ProtectDiff|20|入市价差保护|
|CancelAllWS|true|停止时取消取有挂单|
|CheckInterval|2000|轮询间隔|
|Interval|1300|失败重试间隔|
|RestoreProfit|false|恢复上次盈利|
|LastProfit|false|上次盈利|
|ProfitAsOrg|false|上次盈利算入均价|
|EnableStopLoss|false|开启止损|
|StopLoss|0.1|最大浮动亏损|
|StopLossMode|0|止损后操作: 回收并退出|回收再撒网|
|AutoMove|false|自动移动|
|MaxDistance|20|最大距离(元)|
|MaxIdle|7200|最大空闲(秒)|




|按钮|默认值|描述|
|----|----|----|
|收网|__button__|停止并平衡到初始状态|


> 源码 (javascript)

``` javascript
var isFuture = false;

function hasOrder(orders, orderId) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].Id == orderId) {
            return true;
        }
    }
    return false;
}


function cancelPending() {
    var ret = false;
    while (true) {
        if (ret) {
            Sleep(Interval);
        }
        var orders = _C(exchange.GetOrders);
        if (orders.length == 0) {
            break;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            ret = true;
        }
    }
    return ret;
}


function balanceAccount(orgAccount, initAccount) {
    if (isFuture) {
        while (true) {
            cancelPending();
            var positions = _C(exchange.GetPosition);
            if (positions.length === 0 ) {
                var accountNow = _C(exchange.GetAccount);
                LogProfit(_N(accountNow.Stocks - orgAccount.Stocks), "可用保证金:", accountNow.Stocks);
                return;
            }
            for (var i = 0; i < positions.length; i++) {
                if (positions[i].Type == PD_LONG) {
                    exchange.SetDirection("closebuy");
                    exchange.Sell(positions[i].Amount);
                } else {
                    exchange.SetDirection("closesell");
                    exchange.Buy(positions[i].Amount);
                }
            }
            Sleep(Interval);
        }
    }
    var account = _C(exchange.GetAccount);
    while (true) {
        var diff = _N(account.Stocks - initAccount.Stocks);
        if (Math.abs(diff) < exchange.GetMinStock()) {
            break;
        }
        var depth = _C(exchange.GetDepth);
        var books = diff > 0 ? depth.Bids : depth.Asks;
        var n = 0;
        var price = 0;
        for (var i = 0; i < books.length; i++) {
            n += books[i].Amount;
            if (n >= Math.abs(diff)) {
                price = books[i].Price;
                break;
            }
        }
        Log("开始平衡", (diff > 0 ? "卖出" : "买入"), Math.abs(diff), "个币");
        if (diff > 0) {
            exchange.Sell(price - 0.2, diff);
        } else {
            exchange.Buy(price + 0.2, -diff);
        }
        Sleep(1000);
        cancelPending();
        account = _C(exchange.GetAccount);
    }
    Log("平衡完成", account);
}

var STATE_WAIT_OPEN  = 0;
var STATE_WAIT_COVER = 1;
var STATE_WAIT_CLOSE = 2;
var ProfitCount = 0;
var BuyFirst = (OpType == 0);
var IsSupportGetOrder = true;
var LastBusy = 0;
var LastFloatProfit = 0;

function setBusy() {
    LastBusy = new Date();
}

function isTimeout() {
    if (MaxIdle <= 0) {
        return false;
    }
    var now = new Date();
    if (((now.getTime() - LastBusy.getTime()) / 1000) >= MaxIdle) {
        LastBusy = now;
        return true;
    }
    return false;
}

function onexit() {
    if (CancelAllWS) {
        Log("正在退出, 尝试取消所有挂单");
        cancelPending();
    }
    Log("策略成功停止");
    Log(_C(exchange.GetAccount));
}


function fishing(orgAccount, fishCount) {
    setBusy();
    var account = _C(exchange.GetAccount);
    Log(account);
    var InitAccount = account;
    var ticker = _C(exchange.GetTicker);
    var amount = _N(AmountOnce);
    var amountB = amount;
    var amountS = amount;
    if (typeof(AmountType) !== 'undefined' && AmountType == 1) {
        amountB = BAmountOnce;
        amountS = SAmountOnce;
    }
    if (FirstPriceAuto) {
        FirstPrice = BuyFirst ? _N(ticker.Buy - PriceGrid) : _N(ticker.Sell + PriceGrid);
    }
    // Initialize fish table
    var fishTable = {};
    var uuidTable = {};
    var needStocks = 0;
    var needMoney = 0;
    var actualNeedMoney = 0;
    var actualNeedStocks = 0;
    var notEnough = false;
    var canNum = 0;
    var marginLevel = [10,20][MarginLevelIdx];
    exchange.SetMarginLevel(marginLevel);
    for (var idx = 0; idx < AllNum; idx++) {
        var price = _N(BuyFirst ? FirstPrice - (idx * PriceGrid) : FirstPrice + (idx * PriceGrid));
        if (isFuture) {
            needStocks += ((100 * amountB) / price) / marginLevel;
            if (_N(needStocks) <= _N(account.Stocks)) {
                actualNeedStocks = needStocks;
                canNum++;
            } else {
                notEnough = true;
            }
        } else {
            needStocks += amountS;
            needMoney += price * amountB;
            if (BuyFirst) {
                if (_N(needMoney) <= _N(account.Balance)) {
                    actualNeedMondy = needMoney;
                    actualNeedStocks = needStocks;
                    canNum++;
                } else {
                    notEnough = true;
                }
            } else {
                if (_N(needStocks) <= _N(account.Stocks)) {
                    actualNeedMondy = needMoney;
                    actualNeedStocks = needStocks;
                    canNum++;
                } else {
                    notEnough = true;
                }
            }
        }
        fishTable[idx] = STATE_WAIT_OPEN;
        uuidTable[idx] = -1;
    }
    if (EnableProtectDiff) {
        if (BuyFirst && (FirstPrice - ticker.Sell) > ProtectDiff) {
            throw "首次买入价比市场卖1价高" + _N(FirstPrice - ticker.Sell) + ' 元';
        } else if (!BuyFirst && (ticker.Buy - FirstPrice) > ProtectDiff) {
            throw "首次卖出价比市场买1价高 " + _N(ticker.Buy - FirstPrice) + ' 元';
        }
    }
    if (BuyFirst && !isFuture) {
        if (account.Balance < _N(needMoney)) {
            if (fishCount == 1) {
                throw "资金不足, 需要"+ _N(needMoney) + "元";
            } else {
                Log("资金不足, 需要", _N(needMoney), "元, 程序只做", canNum, "个网格 #ff0000");
            }
        } else {
            Log('预计动用资金: ', _N(needMoney), "元");
        }
    } else {
        if (account.Stocks < _N(needStocks)) {
            if (fishCount == 1) {
                throw "币数不足, 需要 "+ _N(needStocks) + " 个币";
            } else {
                Log("资金不足, 需要", _N(needStocks), "个币, 程序只做", canNum, "个网格 #ff0000");
            }
        } else {
            Log('预计动用币数: ', _N(needStocks), "个");
        }
    }

    var OpenFunc = BuyFirst ? exchange.Buy : exchange.Sell;
    var CoverFunc = BuyFirst ? exchange.Sell : exchange.Buy;
    var ts = new Date();
    var preMsg = "";
    var profitMax = 0;
    while (true) {
        var now = new Date();
        if (now.getTime() - ts.getTime() > 5000) {
            if (typeof(GetCommand) == 'function' && GetCommand() == "收网") {
                Log("开始执行命令进行收网操作");
                balanceAccount(orgAccount, InitAccount);
                return false;
            }
            ts = now;
            var msg = "";
            var positions, isHold;
            var ticker = _C(exchange.GetTicker);
            var nowAccount = _C(exchange.GetAccount);
            if (isFuture) {
                positions = _C(exchange.GetPosition);
                isHold = positions.length > 0;
                if (isHold) {
                    msg += "持仓: " + positions[0].Amount + " 持仓均价: " + _N(positions[0].Price) + " 浮动盈亏: " + _N(positions[0].Profit);
                    if (EnableStopLoss && -positions[0].Profit >= StopLoss) {
                        Log("当前浮动盈亏", positions[0].Profit, "开始止损");
                        balanceAccount(orgAccount, InitAccount);
                        if (StopLossMode === 0) {
                            throw "止损退出";
                        } else {
                            return true;
                        }
                    }
                } else {
                    msg += "空仓";
                }
                msg += " 可用保证金: " + nowAccount.Stocks;
                
            } else {
                isHold = Math.abs(amount_diff) >= exchange.GetMinStock();
                
                var amount_diff = (nowAccount.Stocks + nowAccount.FrozenStocks) - (InitAccount.Stocks + InitAccount.FrozenStocks);
                var money_diff = (nowAccount.Balance + nowAccount.FrozenBalance) - (InitAccount.Balance + InitAccount.FrozenBalance);
                var floatProfit = _N(money_diff + (amount_diff * ticker.Last));
                var floatProfitAll = _N((nowAccount.Balance + nowAccount.FrozenBalance - orgAccount.Balance - orgAccount.FrozenBalance) + ((nowAccount.Stocks + nowAccount.FrozenStocks - orgAccount.Stocks - orgAccount.FrozenStocks) * ticker.Last));
                LastFloatProfit = floatProfitAll;
                profitMax = Math.max(floatProfit, profitMax);
                if (EnableStopLoss) {
                    if ((profitMax - floatProfit) >= StopLoss) {
                        Log("当前浮动盈亏", floatProfit, "利润最高点: ", profitMax, "开始止损");
                        balanceAccount(orgAccount, InitAccount);
                        if (StopLossMode === 0) {
                            throw "止损退出";
                        } else {
                            return true;
                        }
                    }
                }
                if (isHold) {
                    if (RestoreProfit && ProfitAsOrg) {
                        if (BuyFirst) {
                            money_diff += LastProfit;
                        } else {
                            money_diff -= LastProfit;
                        }
                    }
                    var hold_amount = amount_diff;
                    var hold_price = (-money_diff) / amount_diff;
                    if (!BuyFirst) {
                        hold_amount = -amount_diff;
                        hold_price = (money_diff) / -amount_diff;
                    }
                    msg = (BuyFirst ? "做多: " : "做空: ") +  _N(hold_amount, 4) + " 个币, 均价: " + _N(hold_price);
                } else {
                    msg += "空仓";
                }
                msg += " 当前网格浮动盈亏: " + floatProfit + " 总浮动盈亏: " + floatProfitAll + " 第 " + fishCount + " 次撒网 最新币价: " + _N(ticker.Last);
            }
            if (isHold) {
                setBusy();
            }

            var distance = 0;
            if (AutoMove) {
                if (BuyFirst) {
                    distance = ticker.Last - FirstPrice;
                } else {
                    distance = FirstPrice - ticker.Last;
                }
                var refish = false;
                if (!isHold && isTimeout()) {
                    Log("空仓过久, 开始移动网格");
                    refish = true;
                }
                if (distance > MaxDistance) {
                    Log("价格超出网格区间过多, 开始移动网格, 当前距离: ", _N(distance), "当前价格:", ticker.Last);
                    refish = true;
                }
                if (refish) {
                    balanceAccount(orgAccount, InitAccount);
                    return true;
                }
            }

            if (AutoMove && distance > 0) {
                msg += " (离网格" + (BuyFirst ? "向上" : "向下") + "偏离: " + _N(distance) + " 元)";
            }
            if (msg != preMsg) {
                LogStatus(msg);
                preMsg = msg;
            }

        }
        var orders = _C(exchange.GetOrders);
        for (var idx = 0; idx < canNum; idx++) {
            var openPrice = _N(BuyFirst ? FirstPrice - (idx * PriceGrid) : FirstPrice + (idx * PriceGrid));
            var coverPrice = _N(BuyFirst ? openPrice + PriceDiff : openPrice - PriceDiff);
            var state = fishTable[idx];
            var fishId = uuidTable[idx];
            if (hasOrder(orders, fishId)) {
                continue;
            }

            if (fishId != -1 && IsSupportGetOrder) {
                var order = exchange.GetOrder(fishId);
                if (!order) {
                    Log("获取订单信息失败, ID: ", fishId);
                    continue;
                }
                if (order.Status == ORDER_STATE_PENDING) {
                    Log("订单状态为未完成, ID: ", fishId);
                    continue;
                }
            }

            if (state == STATE_WAIT_COVER) {
                if (isFuture) {
                    exchange.SetDirection(BuyFirst ? "closebuy" : "closesell");
                }
                var coverId = CoverFunc(coverPrice, BuyFirst ? amountS : amountB, BuyFirst ? '完成买单:' : '完成卖单:', openPrice);
                if (coverId) {
                    fishTable[idx] = STATE_WAIT_CLOSE;
                    uuidTable[idx] = coverId;
                }
            } else if (state == STATE_WAIT_OPEN || state == STATE_WAIT_CLOSE) {
                if (isFuture) {
                    exchange.SetDirection(BuyFirst ? "buy" : "sell");
                }
                var openId = OpenFunc(openPrice, BuyFirst ? amountB : amountS);
                if (openId) {
                    fishTable[idx] = STATE_WAIT_COVER;
                    uuidTable[idx] = openId;
                    if (state == STATE_WAIT_CLOSE) {
                        ProfitCount++;
                        if (AmountType === 0) {
                            Log((BuyFirst ? '完成卖单: ' : '完成买单: ') + coverPrice);
                        } else {
                            Log((BuyFirst ? '完成卖单: ' : '完成买单: ') + coverPrice);
                        }
                        if (!isFuture) {
                            var account = _C(exchange.GetAccount);
                            var ticker = _C(exchange.GetTicker);
                            var initNet = _N(((InitAccount.Stocks + InitAccount.FrozenStocks) * ticker.Buy) + InitAccount.Balance + InitAccount.FrozenBalance, 8);
                            var nowNet = _N(((account.Stocks + account.FrozenStocks) * ticker.Buy) + account.Balance + account.FrozenBalance, 8);
                            var actualProfit = _N(((nowNet - initNet)) * 100 / initNet, 8);
                            LogProfit(LastFloatProfit, "总浮动盈亏率:", _N(LastFloatProfit * 100 / actualNeedMondy, 4), '%');
                        }
                    }
                }
            }
        }
        Sleep(CheckInterval);
    }
    return true;
}

function main() {
    if (typeof(AmountType) === 'undefined') {
        AmountType = 0;
    }
    IsSupportGetOrder = exchange.GetName().indexOf('itstamp') == -1;
    if (!IsSupportGetOrder) {
        Log(exchange.GetName(), "不支持GetOrder, 可能影响策略稳定性.");
    }
    
    isFuture = exchange.GetName().indexOf("Future") != -1;
    if (AmountType === 0) {
        BAmountOnce = AmountOnce;
        SAmountOnce = AmountOnce;
    }
    if (exchange.GetName() == "Futures_OKCoin" && (AmountOnce.toString().indexOf(".") != -1 || BAmountOnce.toString().indexOf(".") != -1 || SAmountOnce.toString().indexOf(".") != -1)) {
        throw "OKCoin期货下单数必须为整数";
    }

    SetErrorFilter("502:|503:|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|refused|EOF|When");

    exchange.SetRate(1);
    Log('已经禁用汇率转换, 当前货币为', exchange.GetBaseCurrency());

    if (!RestoreProfit) {
        LastProfit = 0;
    }
    exchange.SetContractType(["this_week", "next_week", "quarter"][ContractTypeIdx]);
    var orgAccount = _C(exchange.GetAccount);
    var fishCount = 1;
    while (true) {
        if (!fishing(orgAccount, fishCount)) {
            break;
        }
        fishCount++;
        Log("第", fishCount, "次重新撒网...");
        FirstPriceAuto = true;
        Sleep(1000);
    }
}


```

> 策略出处

https://www.fmz.com/strategy/8474

> 更新时间

2020-04-06 18:47:43
