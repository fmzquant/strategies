/*
策略出处: https://www.botvs.com/strategy/30861
策略名称: 策略框架模板
策略作者: 小小梦
策略描述:

新策略框架
现货， 开多，开空，止损，加仓，平仓。
// - 状态
/*
var TASK_IDLE = 0;
var TASK_OPEN_LONG = 1;
var TASK_OPEN_SHORT = 2;
var TASK_ADD = 3;
var TASK_ST = 4;
var TASK_COVER = 5;
*/


参数            默认值  描述
----------  -----  -----------
OpMode        0    下单方式: 吃单|挂单
MaxSpace      0.5  挂单失效距离
SlidePrice    0.1  下单滑动价(元)
MaxAmount     0.8  开仓最大单次下单量
RetryDelay  500    失败重试(毫秒)
Interval    500    轮询间隔
*/

// 模板全局变量
// - 状态
var TASK_IDLE = 0;
var TASK_OPEN_LONG = 1;
var TASK_OPEN_SHORT = 2;
var TASK_ADD = 3;
var TASK_ST = 4;
var TASK_COVER = 5;
// - 变量
var Tasks = [];
var IDLE = 11;
var LONG = 22;
var SHORT = 33;
var cmdList = [TASK_IDLE, TASK_OPEN_LONG, TASK_OPEN_SHORT, TASK_ADD, TASK_ST, TASK_COVER];
// 计算盈亏
var SumProfit = 0;

// 现货买卖功能函数
function CancelPendingOrders(e, orderType) {
    while (true) {
        var orders = e.GetOrders();
        if (!orders) {
            Sleep(RetryDelay);
            continue;
        }
        var processed = 0;
        for (var j = 0; j < orders.length; j++) {
            if (typeof(orderType) === 'number' && orders[j].Type !== orderType) {
                continue;
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            processed++;
            if (j < (orders.length - 1)) {
                Sleep(RetryDelay);
            }
        }
        if (processed === 0) {
            break;
        }
    }
}

function GetAccount(e, waitFrozen) {
    if (typeof(waitFrozen) == 'undefined') {
        waitFrozen = false;
    }
    var account = null;
    var alreadyAlert = false;
    while (true) {
        account = _C(e.GetAccount);
        if (!waitFrozen || (account.FrozenStocks < e.GetMinStock() && account.FrozenBalance < 0.01)) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(RetryDelay);
    }
    return account;
}

function StripOrders(e, orderId) {
    var order = null;
    if (typeof(orderId) == 'undefined') {
        orderId = null;
    }
    while (true) {
        var dropped = 0;
        var orders = _C(e.GetOrders);
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].Id == orderId) {
                order = orders[i];
            } else {
                var extra = "";
                if (orders[i].DealAmount > 0) {
                    extra = "成交: " + orders[i].DealAmount;
                } else {
                    extra = "未成交";
                }
                e.CancelOrder(orders[i].Id, orders[i].Type == ORDER_TYPE_BUY ? "买单" : "卖单", extra);
                dropped++;
            }
        }
        if (dropped === 0) {
            break;
        }
        Sleep(RetryDelay);
    }
    return order;
}

function Trade(e, tradeType, tradeAmount, mode, slidePrice, maxAmount, maxSpace, retryDelay) {
    var initAccount = GetAccount(e, true);
    var nowAccount = initAccount;
    var orderId = null;
    var prePrice = 0;
    var dealAmount = 0;
    var diffMoney = 0;
    var isFirst = true;
    var tradeFunc = tradeType == ORDER_TYPE_BUY ? e.Buy : e.Sell;
    var isBuy = tradeType == ORDER_TYPE_BUY;
    while (true) {
        var ticker = _C(e.GetTicker);
        var tradePrice = 0;
        if (isBuy) {
            tradePrice = _N((mode === 0 ? ticker.Sell : ticker.Buy) + slidePrice, 4);
        } else {
            tradePrice = _N((mode === 0 ? ticker.Buy : ticker.Sell) - slidePrice, 4);
        }
        if (!orderId) {
            if (isFirst) {
                isFirst = false;
            } else {
                nowAccount = GetAccount(e, true);
            }
            var doAmount = 0;
            if (isBuy) {
                diffMoney = _N(initAccount.Balance - nowAccount.Balance, 4);
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance - 10) / tradePrice, 4));
            } else {
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 4);
                doAmount = Math.min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < e.GetMinStock()) {
                break;
            }
            prePrice = tradePrice;
            orderId = tradeFunc(tradePrice, doAmount, ticker);
            if (!orderId) {
                CancelPendingOrders(e, tradeType);
            }
        } else {
            if (mode === 0 || (Math.abs(tradePrice - prePrice) > maxSpace)) {
                orderId = null;
            }
            var order = StripOrders(e, orderId);
            if (!order) {
                orderId = null;
            }
        }
        Sleep(retryDelay);
    }

    if (dealAmount <= 0) {
        return null;
    }

    return {
        price: _N(diffMoney / dealAmount, 4),
        amount: dealAmount
    };
}

var BuySpot = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_BUY, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

var SellSpot = function(e, amount) {
    if (typeof(e) === 'number') {
        amount = e;
        e = exchange;
    }
    return Trade(e, ORDER_TYPE_SELL, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
};

// 模板内功能函数
// - 初始化函数 tasksInit
function TasksInit(tasks){
    _.each(tasks, function(task){ // OpenLongAmount OpenShortAmount AddAmount StopLossAmount STATE minStock initAccount Currency Name Label nowAccount lastAccount lastTASKSTATE Profit floatProfit lastPrice preProfit NowPositionInfo
        task.OpenLongAmount = 0;
        task.OpenShortAmount = 0;
        task.AddAmount = 0;
        task.StopLossAmount = 0;
        task.STATE = IDLE;
        task.minStock = _C(task.Exchange.GetMinStock);
        task.initAccount = _C(task.Exchange.GetAccount);
        task.Currency = _C(task.Exchange.GetCurrency);
        task.Name = _C(task.Exchange.GetName);
        task.Label = _C(task.Exchange.GetLabel);
        task.nowAccount = task.initAccount;
        task.lastAccount = task.initAccount;
        task.lastTASKSTATE = TASK_IDLE;
        task.Profit = 0;
        task.floatProfit = 0;
        task.lastPrice = 0;
        task.preProfit = 0;
        task.CMD = TASK_IDLE;
        task.CMD_AMOUNT = 0;
        task.NowPositionInfo = {
            avgPrice: 0,        // 持仓均价
            amount: 0 ,         // 持仓量
            floatProfit: 0      // 浮动盈亏
        };
        Log(task.Name, task.Label, "初始账户信息:", task.initAccount);
    });
}

function TranslateSTATE_TASKSTATE(STATE){
    switch(STATE){
        case 0: //TASK_IDLE
            return "无任务";
        case 1: //TASK_OPEN_LONG
            return "建多仓任务";
        case 2: //TASK_OPEN_SHORT
            return "建空仓任务";
        case 3: //TASK_ADD
            return "加仓任务";
        case 4: //TASK_ST
            return "止损任务";
        case 5: //TASK_COVER
            return "平仓任务";
        case 11: //IDLE
            return "未开仓";
        case 22: //LONG
            return "持多仓";
        case 33: //SHORT
            return "持空仓";
    }
}

// - 开多仓
function OpenLong(task){
    var BuyInfo = BuySpot(task.Exchange, task.OpenLongAmount);
    if(!BuyInfo){
        //Log("function BuySpot return :", BuyInfo);
    }else{
        task.NowPositionInfo.amount = BuyInfo.amount;
        task.NowPositionInfo.avgPrice = BuyInfo.price;
        task.STATE = LONG;
        task.nowAccount = _C(task.Exchange.GetAccount); // update nowAccount
    }
    return BuyInfo;
}

// - 开空仓
function OpenShort(task){
    var SellInfo = SellSpot(task.Exchange, task.OpenShortAmount);
    if(!SellInfo){
        //Log("function SellSpot return :", SellInfo);
    }else{
        task.NowPositionInfo.amount = SellInfo.amount;
        task.NowPositionInfo.avgPrice = SellInfo.price;
        task.STATE = SHORT;
        task.nowAccount = _C(task.Exchange.GetAccount); // update nowAccount
    }
    return SellInfo;
}
// - 加仓
function AddPosition(task){
    var tradeInfo = null;
    if(task.STATE === LONG){
        tradeInfo = BuySpot(task.Exchange, task.AddAmount);
    }else if(task.STATE === SHORT){
        tradeInfo = SellSpot(task.Exchange, task.AddAmount);
    }
    if(!tradeInfo){
        //Log("function return :", tradeInfo);
    }else{
        task.NowPositionInfo.avgPrice = (tradeInfo.price * tradeInfo.amount + task.NowPositionInfo.avgPrice * task.NowPositionInfo.amount) / (tradeInfo.amount + task.NowPositionInfo.amount);
        task.NowPositionInfo.amount += tradeInfo.amount;
        task.nowAccount = _C(task.Exchange.GetAccount); // update nowAccount
    }
    return tradeInfo;
}
// - 止损
function StopLoss(task){
    var tradeInfo = null;
    task.StopLossAmount = Math.min(task.StopLossAmount, task.NowPositionInfo.amount);
    if(task.STATE === LONG){
        tradeInfo = SellSpot(task.Exchange, task.StopLossAmount);
    }else if(task.STATE === SHORT){
        tradeInfo = BuySpot(task.Exchange, task.StopLossAmount);
    }
    if(!tradeInfo){
        //Log("function return :", tradeInfo);
    }else if(Math.abs(task.NowPositionInfo.amount - tradeInfo.amount) > task.minStock){
        task.NowPositionInfo.amount -= tradeInfo.amount;
        Log("未完全平仓，剩余：", Math.abs(task.NowPositionInfo.amount - tradeInfo.amount), " tradeInfo:", tradeInfo, "NowPositionInfo:", task.NowPositionInfo);
        task.nowAccount = _C(task.Exchange.GetAccount); // update nowAccount
    }else{
        task.NowPositionInfo.amount = 0;
        task.NowPositionInfo.avgPrice = 0;
        task.STATE = IDLE;
        CalProfit(task); // equal Cover
    }
    return tradeInfo;
}
// - 平仓
function Cover(task){
    var tradeInfo = null;
    if(task.STATE === LONG){
        tradeInfo = SellSpot(task.Exchange, task.NowPositionInfo.amount);
    }else if(task.STATE === SHORT){
        tradeInfo = BuySpot(task.Exchange, task.NowPositionInfo.amount);
    }
    if(!tradeInfo){
        //Log("function return :", tradeInfo);
    }else if(Math.abs(task.NowPositionInfo.amount - tradeInfo.amount) > task.minStock){
        task.NowPositionInfo.amount -= tradeInfo.amount;
        Log("未完全平仓，剩余：", Math.abs(task.NowPositionInfo.amount - tradeInfo.amount), " tradeInfo:", tradeInfo, "NowPositionInfo:", task.NowPositionInfo);
    }else{
        task.NowPositionInfo.amount = 0;
        task.NowPositionInfo.avgPrice = 0;
        task.STATE = IDLE;
        CalProfit(task);
    }
    return tradeInfo;
}

function CalProfit(task){
    //task.lastAccount = task.nowAccount;
    task.nowAccount = _C(task.Exchange.GetAccount);
    task.lastAccount = task.nowAccount;
    var Bdiff = task.nowAccount.Balance - task.initAccount.Balance;
    task.preProfit = task.Profit;
    task.Profit = Bdiff;

    SumProfit = 0;
    _.each(Tasks, function(task){
        SumProfit += task.Profit;
    });
    LogProfit(SumProfit, task.Name + "-" + task.Currency + "-" + task.Label + "- 本次：" + (task.Profit - task.preProfit), "钱：" + _N(task.nowAccount.Balance, 2), "币：" + _N(task.nowAccount.Stocks, 2), "冻结钱：" + _N(task.nowAccount.FrozenBalance, 2), "冻结币：" + _N(task.nowAccount.FrozenStocks, 2)); 
}

function CalFloatProfit(task){
    var diffPrice = 0;
    if(task.STATE === LONG){
        diffPrice = (task.lastPrice - task.NowPositionInfo.avgPrice);
        task.NowPositionInfo.floatProfit = _N(diffPrice * task.NowPositionInfo.amount);
    }else if(task.STATE === SHORT){
        diffPrice = (task.NowPositionInfo.avgPrice - task.lastPrice);
        task.NowPositionInfo.floatProfit = _N(diffPrice * task.NowPositionInfo.amount);
    }
}

function isInCMD_List(cmd){
    for(var i = 0; i < cmdList.length ; i++){
        if(cmd === cmdList[i]){
            return true;
        }
    }
    return false;
}

function CMD(index, CMD_STR, amount){
    if(index < Tasks.length || typeof(amount) === 'undefined' || isInCMD_List(CMD_STR) === false){
        Tasks[index].CMD = CMD_STR;
        Tasks[index].CMD_AMOUNT = amount;
    }else{
        Log("错误：", "index:" + index, "CMD_STR:" + CMD_STR, "amount:" + amount);
    }
}

$.TaskCmd = function(cmd, amount, lastPrice){
    if(cmd === TASK_IDLE && typeof(amount) === 'undefined'){
        amount = 0;
    }else if((cmd === TASK_ST || cmd === TASK_COVER) && typeof(amount) === 'undefined'){
        amount = 0;
    }else if(typeof(amount) === 'undefined'){
        throw "没有传入要操作下单量！";
    }
    if(typeof(lastPrice) === 'undefined'){
        return {cmd: cmd, amount: amount, lastPrice: -1};
    }else{
        return {cmd: cmd, amount: amount, lastPrice: lastPrice};
    }
}

// 模板导出函数
var usedTime = 0;
$.Trend = function() {
    TasksInit(Tasks);
    while(true){
        var beginTime = new Date().getTime();
        _.each(Tasks, function(task){
            task.OpenLongAmount = 0;
            task.OpenShortAmount = 0;
            task.AddAmount = 0;
            task.StopLossAmount = 0;
        });
        _.each(Tasks, function(task){
            var obj = task.onTick();
            //Log("obj:", obj);
            var ret = obj.cmd;
            var amount = obj.amount;
            var tradeRet = null;
            if(obj.lastPrice !== -1){
                task.lastPrice = obj.lastPrice;
            }else{
                task.lastPrice = (_C(task.Exchange.GetTicker)).Last;
            }
            if(task.CMD !== TASK_IDLE){
                ret = task.CMD;
                amount = task.CMD_AMOUNT;
            }
            switch (ret) {
                // switch status..
                case TASK_OPEN_LONG:    // 开多仓
                    if(task.STATE === IDLE){
                        task.lastTASKSTATE = TASK_OPEN_LONG;
                        task.OpenLongAmount = amount;
                        tradeRet = OpenLong(task);
                        Log("开多仓完成，本次交易信息：", tradeRet, "#FF0000");
                    }else{
                        //Log("TASK_OPEN_LONG 当前状态为：", task.STATE, "!= ", IDLE);
                    }
                    break;
                case TASK_OPEN_SHORT:   // 开空仓
                    if(task.STATE === IDLE){
                        task.lastTASKSTATE = TASK_OPEN_SHORT;
                        task.OpenShortAmount = amount;
                        tradeRet = OpenShort(task);
                        Log("开空仓完成，本次交易信息：", tradeRet, "#FF0000");
                    }else{
                        //Log("TASK_OPEN_SHORT 当前状态为：", task.STATE, "!= ", IDLE);   
                    }
                    break;
                case TASK_ADD:          // 加仓
                    if(task.STATE === LONG || task.STATE === SHORT){
                        task.lastTASKSTATE = TASK_ADD;
                        task.AddAmount = amount;
                        tradeRet = AddPosition(task);
                        Log("加仓完成，本次交易信息：", tradeRet, "#FF0000");
                    }else{
                        //Log("TASK_ADD 当前状态为：", task.STATE, "!=", LONG, "或者", SHORT);
                    }
                    break;
                case TASK_ST:           // 止损
                    if(task.STATE === LONG || task.STATE === SHORT){
                        task.lastTASKSTATE = TASK_ST;
                        task.StopLossAmount = amount;
                        tradeRet = StopLoss(task);
                        Log("止损完成，本次交易信息：", tradeRet, "#FF0000");
                    }else{
                        //Log("TASK_ST 当前状态为：", task.STATE, "!=", LONG, "或者", SHORT);
                    }
                    break;
                case TASK_COVER:        // 平仓
                    if(task.STATE === LONG || task.STATE === SHORT){
                        task.lastTASKSTATE = TASK_COVER;
                        tradeRet = Cover(task);
                        Log("平仓完成，本次交易信息：", tradeRet, "#FF0000");
                    }else{
                        //Log("TASK_COVER 当前状态为：", task.STATE, "!= ", LONG, "或者", SHORT);
                    }
                    break;
            }
            // 计算浮动收益
            CalFloatProfit(task);

            // 重置CMD
            if(task.CMD !== TASK_IDLE){
                task.CMD = TASK_IDLE;
                task.CMD_AMOUNT = 0;
            }
        });

        // 交互模块
        var cmd = GetCommand(); // 调用API  获取界面交互控件的消息。 
        if (cmd) { // 判断是否有消息
            var js = cmd.split(':', 2)[1]; // 分割 返回的消息 字符串， 限制返回2个， 把索引为1的 元素 赋值给 名为js 的变量 
            Log("执行代码:", js); // 输出 执行的代码
            try { // 异常检测
                eval(js); // 执行 eval函数， 该函数执行传入的参数（代码）。
            } catch (e) { // 抛出异常
                Log("交互代码错误： Exception", e); // 输出错误信息
            }
        }

        // 显示在状态栏
        var endTime = new Date().getTime();
        usedTime = endTime - beginTime;
        $.ToTable();
        Sleep(Interval);
    }
}

$.Relation_Exchange_onTick = function(Exchange, onTick){
    var task = {
        onTick : onTick, 
        Exchange : Exchange
    };
    Tasks.push(task);
};

$.ToTable = function(){
    var tables = [];
    _.each(Tasks, function(task){
        var table = {type: "table", title: task.Exchange.GetName() + task.Exchange.GetLabel(), cols: ["desc", "value"], rows: []};
        table.rows.push(["初始账户信息：", task.initAccount]);
        table.rows.push(["当前账户信息：", task.nowAccount]);
        table.rows.push(["上次平仓后账户信息：", task.lastAccount]);
        table.rows.push(["持仓信息：", task.NowPositionInfo]);
        table.rows.push(["状态：", TranslateSTATE_TASKSTATE(task.STATE)]);
        table.rows.push(["最近任务：", TranslateSTATE_TASKSTATE(task.lastTASKSTATE)]);
        table.rows.push(["浮动盈亏：", task.floatProfit = task.NowPositionInfo.floatProfit]);
        table.rows.push(["总盈亏：", task.Profit]);
        // 处理自定义
        for(var key in task){
            if(key === 'OpenLongAmount' || key === 'OpenShortAmount' || key === 'AddAmount' || key === 'StopLossAmount' || key === 'STATE' || key === 'minStock' || key === 'initAccount' || key === 'Currency' ||
                key === 'Name' || key === 'Label' || key === 'nowAccount' || key === 'lastAccount' || key === 'lastTASKSTATE' || key === 'Profit' || key === 'floatProfit' || key === 'lastPrice' || key === 'preProfit' || key === 'NowPositionInfo' ||
                    key === 'onTick' || key === 'Exchange' || key === 'CMD' || key === 'CMD_AMOUNT'){
                continue;
            }else{
                table.rows.push([key, task[key]]);
            }
        }

        tables.push(table);
    });
    var CMD_STR = "TASK_OPEN_LONG : 开多仓， TASK_OPEN_SHORT : 开空仓， TASK_ADD : 加仓， TASK_ST : 止损， TASK_COVER : 平仓 ， 命令函数：CMD(index, CMD_STR, amount)";
    LogStatus(" time: " + _D() + " 耗时：" + usedTime + "合计收益：" + SumProfit + "命令：" + '\n' + CMD_STR + '\n`' + JSON.stringify(tables) + '`');
};

$.AddData = function(index, dataKey, dataValue){
    Tasks[index][dataKey] = dataValue;
};

// 以下是测试代码 
/*- 状态 在使用 模板时需要在 主策略内声明
var TASK_IDLE = 0;
var TASK_OPEN_LONG = 1;
var TASK_OPEN_SHORT = 2;
var TASK_ADD = 3;
var TASK_ST = 4;
var TASK_COVER = 5;
*/

function onTick1() {
    // EMA 
    var records = _C(exchanges[0].GetRecords);
    if(records.length < 11){
        return $.TaskCmd(TASK_IDLE);
    }
    var ema_fast = TA.MA(records, 7);
    var ema_slow = TA.MA(records, 20);
    // $.AddData = function(index, dataKey, dataValue)
    
    var data = "fast[-2]:" + ema_fast[ema_fast.length - 2] + " slow[-2]" + ema_slow[ema_slow.length - 2] + " fast[-1]:" + ema_fast[ema_fast.length - 1] + " slow[-1]:" + ema_slow[ema_slow.length - 1];
    $.AddData(0, "MA", data);
    
    if (ema_fast[ema_fast.length - 1] < ema_slow[ema_slow.length - 1] && ema_fast[ema_fast.length - 2] > ema_slow[ema_slow.length - 2]) {
        return $.TaskCmd(TASK_COVER);
    }else if(ema_fast[ema_fast.length - 1] > ema_slow[ema_slow.length - 1] && ema_fast[ema_fast.length - 2] < ema_slow[ema_slow.length - 2]){
        return $.TaskCmd(TASK_OPEN_LONG, 0.5);
    }

    return $.TaskCmd(TASK_IDLE);
}

function onTick2() {
    // MACD
    var records = _C(exchanges[1].GetRecords);
    if(records.length < 15){
        $.TaskCmd(TASK_IDLE);
    }
    var macd = TA.MACD(records);
    var dif = macd[0];
    var dea = macd[1];
    
    var data = "dif[-2]:" + dif[dif.length - 2] + " dea[-2]" + dea[dea.length - 2] + " dif[-1]:" + dif[dif.length - 1] + " dea[-1]:" + dea[dea.length - 1];
    $.AddData(1, "MACD", data);
    
    if (dif[dif.length - 1] > dea[dea.length - 1] && dif[dif.length - 2] < dea[dea.length - 2]) {
        //return $.TaskCmd(TASK_OPEN_SHORT, 0.8);
        return $.TaskCmd(TASK_COVER);
    }else if(dif[dif.length - 1] < dea[dea.length - 1] && dif[dif.length - 2] > dea[dea.length - 2]){
        //return $.TaskCmd(TASK_COVER);
        return $.TaskCmd(TASK_OPEN_LONG, 0.8);
    }

    return $.TaskCmd(TASK_IDLE);
}

function main() {
    $.Relation_Exchange_onTick(exchanges[0], onTick1);
    $.Relation_Exchange_onTick(exchanges[1], onTick2);
    $.Trend();  // 不用传参数。
}
