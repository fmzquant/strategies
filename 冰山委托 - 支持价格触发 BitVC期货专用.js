/*
策略出处: https://www.botvs.com/strategy/951
策略名称: 冰山委托 - 支持价格触发 BitVC期货专用
策略作者: Zero
策略描述:

冰山委托指的是投资者在进行大额交易时，为避免对市场造成过大冲击，将大单委托自动拆为多笔委托，根据当前的最新买一/卖一价格和客户设定的价格策略自动进行小单委托，在上一笔委托被全部成交或最新价格明显偏离当前委托价时，自动重新进行委托。
说明:
委托类型: 直接吃单, 盘口抢单, 盘口挂单, 盘口埋单
支持合约: 周, 季
支持订单: 开多, 开空, 平多, 平空
支持杠杆: 5, 10, 20
支持触发: 当价格涨超或者跌落指定的价格时才开始委托
支持协作: 可以等待其它冰山策略运行完成以后继续当前策略

委托类型说明:

直接吃单: 卖1或者买1的价格符合下单要求的话，直接吃单
盘口抢单: 如果要买就与盘口买1进行抢单(加上滑动价), 要卖则减去滑动价与卖一抢单
盘口挂单: 如果要买, 买一是多少, 就挂多少, 不加滑动价, 卖的话一样的操作，与盘口买一卖一合并
盘口埋单: 挂一个比盘口价格向后的单子, 不占据买1卖1, 等盘口买一卖一被人吃掉后, 用户挂单浮现后也被吃掉(传统冰山)


参数             默认值    描述
-------------  -----  -------------------------
ContractType   0      合约类型: 周|季
OpType         0      操作类型: 开多|开空|平多|平空
MLevel         0      杠杆大小: 5倍|10倍|20倍
EnableTrigger  false  使用触发条件
TriggerType    0      触发方式: 涨超|跌落
TriggerPrice   2000   触发价格(元)
TotalOp        300    操作总金额(元)
OpOnce         100    单次操作金额(元)
MaxPrice       2000   最高买入/最低卖出(元)
EntrustType    0      下单方式: 直接吃单|盘口抢单|盘口挂单|盘口埋单
SlidePrice     0.1    抢单滑价(元)
Interval       1000   失败重试(毫秒)
LoopInterval   300    价格轮询间隔(毫秒)
WaitRobot      false  等待其它机器人
WaitRobotID    999    等待的机器人ID
TTL            false  机器人运行周期(小时)
*/

var _ContractType = ["week", "quarter"][ContractType];
var _TradeType = ["buy", "sell", "closebuy", "closesell"][OpType];
var _MarginLevel = [5, 10, 20][MLevel];
var _OrderType = [ORDER_TYPE_BUY, ORDER_TYPE_SELL, ORDER_TYPE_SELL, ORDER_TYPE_BUY][OpType];
var _PositionType = [ORDER_TYPE_BUY, ORDER_TYPE_SELL, ORDER_TYPE_BUY, ORDER_TYPE_SELL][OpType];
var _LastOrderPrice = 0;
var _InitPosition = 0;
var _PositionPrice = 0;
var _TradeCall = null;
var _LastFinished = 0;

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var d = parseFloat(v.toFixed(Math.max(10, precision+5)));
    var s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d*b)/b;
}

function GetPosition() {
    var positions;
    while (!(positions = exchange.GetPosition())) {
        Sleep(Interval);
    }
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType == _ContractType && positions[i].Type == _PositionType) {
            _PositionPrice = positions[i].Price;
            return positions[i].Amount;
        }
    }
    return 0;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

function GetAccount(maxRetry) {
    var account;
    var counter = 0;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
        counter++;
        if (typeof(maxRetry) == 'number' && counter > maxRetry) {
            break;
        }
    }
    return account;
}

function GetOrders() {
    var myorders = [];
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].Type == _OrderType) {
            myorders.push(orders[i]);
        }
    }
    return myorders;
}

function CancelPendingOrders() {
    var counter = 0;
    while (true) {
        var orders = GetOrders();
        if (orders.length == 0) {
            return;
        }

        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            if (i < (orders.length-1)) {
                Sleep(Interval);
            }
        }
        counter++;
        if (counter > 100) {
            throw "挂单取消失败次数过多, 请检测账户是否有人工委托单";
        }
    }
}

function dispatch() {
    var EntrustDepth = 0;
    if (EntrustType == 3) {
        EntrustDepth = 0.1;
    }
    var ticker = GetTicker();
    if ((_OrderType == ORDER_TYPE_BUY ?  (MaxPrice - ticker.Sell) : (ticker.Buy - MaxPrice)) > 300) {
        Log(ticker);
        throw "委托价格与市价场脱离过多";
    }
    var position = GetPosition();
    var finished = _N((_TradeType == "buy" || _TradeType == "sell") ? (position - _InitPosition) : (_InitPosition - position));
    // 在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托
    if (_LastOrderPrice > 0) {
        // 订单没有完成
        if (GetOrders().length > 0) {
            var ratio = 2*(EntrustDepth/100);
            var needCancel = false;
            if (EntrustType > 1) {
                if (((_OrderType == ORDER_TYPE_BUY) && (ticker.Buy > _LastOrderPrice && ((ticker.Buy - _LastOrderPrice) / _LastOrderPrice) > ratio)) ||
                    ((_OrderType == ORDER_TYPE_SELL) && (ticker.Sell < _LastOrderPrice && ((_LastOrderPrice - ticker.Sell) / _LastOrderPrice) > ratio)) ) {
                    Log('偏离过多, 最新盘口报价:', _OrderType == ORDER_TYPE_BUY ? ticker.Buy : ticker.Sell, '当前委托价', _LastOrderPrice);
                    needCancel = true;
                }
            } else {
                if (EntrustType == 0) {
                    needCancel = true;
                } else {
                    var price = _N(_OrderType == ORDER_TYPE_BUY ? ticker.Buy + SlidePrice : ticker.Sell - SlidePrice);
                    if (price != _LastOrderPrice) {
                        needCancel = true;
                    }
                }
            }
            if (needCancel) {
                CancelPendingOrders();
            } else {
                return true;
            }
        } else {
            if (finished != _LastFinished) {
                _LastFinished = finished;
                Log("委托完成, 累计花费:", finished, "持仓均价:", _PositionPrice);
            }
            if (finished >= TotalOp) {
                return false;
            }
        }
        _LastOrderPrice = 0;
    }


    var orderPrice = 0;
    if (EntrustType == 0) {
        orderPrice = _N(_OrderType == ORDER_TYPE_BUY ? ticker.Sell : ticker.Buy);
    } else  if (EntrustType == 1) {
        orderPrice = _N(_OrderType == ORDER_TYPE_BUY ? ticker.Buy + SlidePrice : ticker.Sell - SlidePrice);
    } else {
        // 委托价格为最新买1价*(1-委托深度)或者 卖1价*(1+委托深度)
        orderPrice = _N(_OrderType == ORDER_TYPE_BUY ? (ticker.Buy * (1 - EntrustDepth/100)) : (ticker.Sell * (1 + EntrustDepth/100)));
    }
    if ((_OrderType == ORDER_TYPE_BUY && orderPrice > MaxPrice) || (_OrderType == ORDER_TYPE_SELL && orderPrice < MaxPrice)) {
        return true;
    }
    var once = Math.min(OpOnce, TotalOp - finished);
    if (_TradeType == "closebuy" || _TradeType == "closesell") {
        once = Math.min(position, once);
    }
    once = parseInt(once);
    
    var i = 0;
    var maxRetry = 20;
    for (i = 0; i < maxRetry; i++) {
        var orderId = _TradeCall(orderPrice, once, 'Buy:', ticker.Buy, 'Sell:', ticker.Sell);
        if (typeof(orderId) == 'number') {
            break;
        } else {
            Sleep(Interval);
        }
    }
    if (i == maxRetry) {
        throw "下单失败次数过多..";
    }
    
    _LastOrderPrice = orderPrice;
    return true;
}

function onexit() {
    _G("bitvc", null);
    CancelPendingOrders();
    Log("退出成功");
}

function main() {
    if (parseFloat(Version()) < 2.63) {
        throw "要求托管者2.63版本以上";
    }
    
    if (exchange.GetName() != 'Futures_BitVC') {
        throw "该策略为BitVC期货专用策略";
    }
    
    if (_MarginLevel == 20 && exchange.GetCurrency() == "LTC") {
        throw "LTC不支持20倍杠杆";
    }    
    
    if (TotalOp % 100 != 0) {
        throw "操作总金额必须是100的倍数";
    }
    
    if (OpOnce % 100 != 0) {
        throw "单次操作金额必须是100的倍数";
    }

    if (!GetAccount(10)) {
        throw "获取账户信息失败, 请检测API配置是否正确";
    }
    
    SetErrorFilter("502:|503:|network|timeout|WSARecv|Connect|GetAddr|no such|reset");
    
    if (_G("bitvc")) {
        //throw "该策略不允许并发运行, 必须等待其它同策略机器人完成";
    }
    
    Log('当前机器人ID: ', _G(), '开始运行...');
    if (WaitRobot) {
        if (!_G(WaitRobotID)) {
            throw "没有发现ID为" + WaitRobotID + "的机器人运行";
        }
        Log('等待ID为', WaitRobotID, '的机器人退出');
        while (_G(WaitRobotID)) {
            Sleep(500);
        }
        Log('等待完成, 继续当前策略');
    }
    _G("bitvc", true);
    
    exchange.SetMarginLevel(_MarginLevel);
    
    _TradeCall = _OrderType == ORDER_TYPE_BUY ? exchange.Buy : exchange.Sell;
 
    LoopInterval = Math.max(LoopInterval, 100);
    
    if (EnableTrigger) {
        var ticker = GetTicker();
        Log('当前价格:', ticker.Last, '等待价格', TriggerType == 0 ? '涨超' : '跌破', TriggerPrice, '元...');
        while (true) {
            if (TriggerType == 1 && ticker.Last < TriggerPrice) {
                Log('价格跌破 ', TriggerPrice, '元, 开始按计划委托');
                break;
            } else if (TriggerType == 0 && ticker.Last > TriggerPrice) {
                Log('价格涨超 ', TriggerPrice, '元, 开始按计划委托');
                break;
            }
            ticker = GetTicker();
            Sleep(LoopInterval);
        }
    }
    
    CancelPendingOrders();
    _InitPosition = GetPosition();
    if ((_TradeType == "closebuy" || _TradeType == "closesell")) {
        if (_InitPosition == 0) {
            throw "没有找到仓位";
        }
        TotalOp = Math.min(TotalOp, _InitPosition);
    }
    Log('初始仓位数量: ', _InitPosition);
    if (TTL > 0) {
        Log("机器人将在 ", TTL, "小时后退出.");
    }
    exchange.SetContractType(_ContractType);
    exchange.SetDirection(_TradeType);
    var st = new Date().getTime();
    var finished = true;
    while (dispatch()) {
        Sleep(LoopInterval);
        if (TTL > 0) {
            if ((new Date().getTime() - st) >= (TTL * 60 * 60 * 1000)) {
                Log("到达指定退出时间, 现在退出");
                finished = false;
                break;
            }
        }
    }
    if (finished) {
        Log("委托全部完成");
    }
    Log("当前持仓: ", GetPosition());
}
