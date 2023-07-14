
> Name

TradingView下单机器人11

> Author

夏天不打你

> Strategy Description

**自用的Tradingview下单机器人，功能如下：**
1、支持火币、okex、币安三大交易所的币本位季度合约和USDT永续合约下单。
2、支持单利模式和复利模式。
3、支持对手盘限制滑点下单以及市价下单。
4、支持多线程并发下单。
5、完善的各种数据统计。
6、所有数据支持本地保存和恢复。

**该下单机器人需要搭配服务端使用，下载地址：**
链接：https://pan.baidu.com/s/1RK08Ht4cAOAwTSb6X2TA4A 
提取码：3qo6 

**使用方式：**
TV端命令发送方式：
order_message2 = 'TradingView:order:ticker=OKEX:ETHUSDT' + ' levelRate=' + tostring(level_rate) + ' price=' + tostring(order_price) + ' size=' + tostring(order_size) + ' type=1' + ' robot=' + tostring(order_robot)
strategy.entry(id = "long", long = true, comment="做多", alert_message = order_message2)
levelRate表示杠杆倍数，price表示价格，size表示下单的张数。order_robot表示发明者上面的机器人号。
主要是注意type的值，1表示开多，2表示开空，3表示平多，4表示平空，5表示平多开空，6表示平空开多。
上述代码是**插在TV策略的脚本中**，在需要下单的地方。

在策略中创建警报，webhook地址填：运行服务端的服务器IP地址，消息填：{{strategy.order.alert_message}}，其它参数默认即可。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Interval|1000|(?基本设置)程序运行周期（ms）|
|Currency|ETH_USDT|交易对|
|MarginLevel|4|杠杆倍数|
|IsUseHuobiOrder|false|火币永续USDT下单|
|IsUseBinanceOrder|true|是否币安永续USDT下单|
|UseQuarter|false|季度合约|
|IsMarketOrder|true|市价下单|
|UseOrderSync|false|(?高级设置)使用多线程下单|
|UseOpponentOrder|false|使用对手盘下单|
|OpponentSlip|0.01|对手盘下单滑点|
|OpponentOrderTime|600|对手盘下单最大挂单时间（s）|
|UseSameTicker|false|使用同一盘口交易|
|InitAsset|1,2,3,4,5,6,7,8,9,10|初始资产|
|OrderSize|1,2,3,4,5,6,7,8,9,10|下单张数|
|UseMutiOrderSize|false|使用不同下单数量下单（固定张数）|
|UseAutoAdjustOrderSize|false|自动计算下单张数|
|ThePercentOfAssetToOrder|0.5|下单资金占用百分比|
|UseAllInOrder|false|全仓模式（复利）|
|UseLimitMaxOrderAmount|false|是否限制下单金额|
|LimitMaxOrderAmount|1400|最大下单金额（USDT）|
|EnablePlot|true|打开画图|
|KPeriod|60|画图的K线周期（min）|
|PricePrecision|5|(?下单设置)下单价格精度|
|AmountPrecision|false|下单数量精度|
|OneSizeInCurrentCoin|true|U本位合约中，一张所代表的币数量|
|QuarterOneSizeValue|10|币本位合约中，一张所代表的USDT数量|
|UseAutoTransfer|true|(?自动划转)使用自动划转|
|UseCertainAmountTransfer|true|固定划转|
|AccountMaxBalance|1100|可用资产大于*U时自动移出100U|
|UseProfitToTransfer|false|根据盈利情况划转（翻倍划转）|
|ProfitPercentToTransfer|90|翻倍划转利润的百分比|




|Button|Default|Description|
|----|----|----|
|LogPrint|修正了一些bug.|输出日志|
|SaveLocalData|false|保存数据到本地|
|ClearLocalData|-1|清除本地数据|
|ClearLog|true|清除日志信息|
|LogStatusRefreshTime|5|状态栏更新间隔（秒）|
|SetStrategyRunTime|1627747200|设置策略起始时间戳（秒）|
|SetUserStartTime|0,1627747200|设置用户开始时间|
|SetUserInitAsset|0,1000|设置用户初始资产|
|AdjustOrderSize|-1|自动调整下单张数|
|ManualOrder|-1,longopen,1|人工下单|


> Source (javascript)

``` javascript

/*
下单机器人1.1
Version: 1.1
Author: summer
Date: 2021.9.9
新增：
1、多账号不同下单数量下单
2、对手盘限制滑点下单（平仓依旧是市价全平）
3、季度合约回测统计
4、多账号盈亏统计
5、账户数据本地化
6、状态信息表格显示
7、多线程下单
8、新增人工下单交互
9、修复收益统计有误的问题
*/

// 下单设置
var _PricePrecision = PricePrecision;                           // 下单价格精度
var _AmountPrecision = AmountPrecision;                         // 下单数量精度
var _OneSizeInCurrentCoin = OneSizeInCurrentCoin;               // U本位合约中，一张ETH所代表的ETH数量
var _QuarterOneSizeValue = QuarterOneSizeValue;                 // 币本位合约中，一张ETH所代表的USDT数量
// 自动划转
var _UseAutoTransfer = UseAutoTransfer;                         // 使用自动划转
var _UseCertainAmountTransfer = UseCertainAmountTransfer;       // 固定划转
var _AccountMaxBalance = AccountMaxBalance;                     // 可用资产大于*U时自动移出100U
var _UseProfitToTransfer = UseProfitToTransfer;                 // 根据盈利情况划转（翻倍划转）
var _ProfitPercentToTransfer = ProfitPercentToTransfer          // 翻倍划转利润的百分比

var _OKCoin = "Futures_OKCoin";
var _QuantitativeOrderHeader = "Quantitative:order:";
var _OrderSize = [];
var _InitAsset = [];
var _Accounts = [];
var _Positions = [];

var ProfitLocal = [];
var TotalAsset = [];
var TakeProfitCount = [];
var StopLossCount = [];
var WinRate = [];
var MaxLoss = [];
var MaxLossPercent = [];
var MaxProfit = [];
var MaxProfitPercent = [];
var ProfitPercent = [];
var _TransferAmount = [];
var _CurrentInitAssets = [];
var UserStartTime = [];
var UserDatas = [];
var StrategyRunTimeStampString = "strategy_run_time";
var StrategyDatas = { start_run_timestamp: 0, others: "" };

var _ClosePrice = 0;
var _MarginLevel = MarginLevel;

var _TradingFee = 0.0005;
var _RemainingSize = 20;            // 在全仓模式下，计算出最大可下单张数后，需要腾出的空余张数，避免波动大造成下单失败
var _IsOpponentOrder = false;

var _LogStatusRefreshTime = 10;     // 状态栏更新周期 s
var _LastBarTime = 0;               // 最新的K线时间

// 保存程序起始运行时间 秒级时间戳
function saveStrategyRunTime() {
    var local_data_strategy_run_time = _G(StrategyRunTimeStampString);

    if (local_data_strategy_run_time == null) {
        StrategyDatas.start_run_timestamp = Unix();
        _G(StrategyRunTimeStampString, StrategyDatas.start_run_timestamp);
    }
    else {
        StrategyDatas.start_run_timestamp = local_data_strategy_run_time;
    }
}

// 设置程序起始运行时间 秒级时间戳
function setStrategyRunTime(timestamp) {
    _G(StrategyRunTimeStampString, timestamp);
    StrategyDatas.start_run_timestamp = timestamp;
}

// 计算两个时间戳之间的天数，参数是秒级时间戳
function getDaysFromTimeStamp(start_time, end_time) {
    if (end_time < start_time)
        return 0;

    return Math.trunc((end_time - start_time) / (60 * 60 * 24));
}

function saveUserDatasLocal() {
    // 把交易统计数据保存到本地，交互按钮点击运行
    // 保存数据之前，先把UserData数据清零
    UserDatas = null;
    UserDatas = new Array();

    for (var i = 0; i < exchanges.length; i++) {
        // 把数据放入到UserData
        UserDatas.push({
            init_assets: _InitAsset[i],
            profit_local: ProfitLocal[i],
            max_profit_percent: MaxProfitPercent[i],
            max_loss_percent: MaxLossPercent[i],
            max_profit: MaxProfit[i],
            max_loss: MaxLoss[i],
            take_profit_count: TakeProfitCount[i],
            stop_loss_count: StopLossCount[i],
            start_time: UserStartTime[i], order_size: _OrderSize[i],
            transfer_amount: _TransferAmount[i],
            current_init_assets: _CurrentInitAssets[i]
        });
        // 存储到本地
        _G(exchanges[i].GetLabel(), UserDatas[i]);
    }
    Log("已把所有账户数据保存到本地.");
}

function readUserDataLocal(num) {
    // 读取用户本地数据，程序启动时候运行一次
    // 在此处固定了UserData和账户的对应关系，也即固定了UserData的长度
    var user_data = _G(exchanges[num].GetLabel());
    if (user_data == null) {
        UserDatas.push({
            init_assets: 0,
            profit_local: 0,
            max_profit_percent: 0,
            max_loss_percent: 0,
            max_profit: 0,
            max_loss: 0,
            take_profit_count: 0,
            stop_loss_count: 0,
            start_time: Unix(),
            order_size: 0,
            transfer_amount: 0,
            current_init_assets: 0
        });
        // Log(exchanges[num].GetLabel(), "：没有本地数据.");
    } else {
        UserDatas.push(user_data);
        // Log(exchanges[num].GetLabel(), "：成功从本地读取到数据.");
    }
}

function isHadLocalData(num) {
    if (_G(exchanges[num].GetLabel()) == null)
        return false;
    return true;
}

function clearUserDataLocal(num) {
    // 清除用户本地数据，交互按钮点击运行
    if (num == -1) {
        _G(null);
        Log("已清除所有本地数据.");
    } else {
        _G(exchanges[num].GetLabel(), null);
        Log(exchanges[num].GetLabel(), "：已清除本地数据.");
    }
}

function resetPosition(num) {
    // 复位_Position
    _Positions[num].avg_cost = 0;
    _Positions[num].direction = "short";
    _Positions[num].size = 0;
    _Positions[num].order_count = 0;
}

function orderInBacktest(direction, price, size)
{
    for (var i = 0; i < exchanges.length; i++) {
        _Positions[i].avg_cost = price[i];
        _Positions[i].direction = direction;
        _Positions[i].size = size[i];
        _Positions[i].order_count = 1;
    }

    var t_direction = direction == "long" ? "做多" : "做空";
    Log("下单：", t_direction, ", 开仓价格：", price[0], ", 开仓张数：", size[0], "@");
}

// 自动移出
function autoTransfer() {
    var transfer_amount = 100;
    var account = [];
    var had_transfer = false;
    for (let i = 0; i < exchanges.length; i++) {
        if (!isBinanceExchange(i)) {
            continue;
        }
        account[i] = _C(exchanges[i].GetAccount);
        if (_UseAutoTransfer) {
            if (_UseCertainAmountTransfer) {
                if (account[i].Balance > _AccountMaxBalance) {
                    if (transferToMain(transfer_amount, i)) {
                        _TransferAmount[i] += transfer_amount;
                        had_transfer = true;
                    }
                }
            } else if (_UseProfitToTransfer) {
                _CurrentInitAssets[i] = _CurrentInitAssets[i] == 0 ? _InitAsset[i] : _CurrentInitAssets[i];
                // 根据账户可用余额 - 当前实际初始资产计算出当前利润
                var current_profit = account[i].Balance - _CurrentInitAssets[i];
                if (current_profit > _CurrentInitAssets[i]) {
                    transfer_amount = _N(current_profit * _ProfitPercentToTransfer, 0);
                    if (transferToMain(transfer_amount, i)) {
                        _TransferAmount[i] += transfer_amount;
                        _CurrentInitAssets[i] = account[i].Balance - transfer_amount;     // 账户可用余额 - 移出金额 = 当前初始资产
                        had_transfer = true;
                    }
                }
            }
        }
    }
    if (had_transfer) {
        saveUserDatasLocal();
    }
}

// 从U本位合约钱包向现货钱包划转指定数量的USDT
function transferToMain(amount, num){
    var time = UnixNano() / 1000000;
    var param = "type=UMFUTURE_MAIN" + "&asset=USDT" + "&amount=" + amount.toString() + "&timestamp=" + time.toString();
    exchanges[num].SetBase('https://api.binance.com');
    var ret = exchanges[num].IO("api", "POST", "/sapi/v1/asset/transfer", param);
    exchanges[num].SetBase('https://fapi.binance.com');
    if (ret) {
        Log(exchanges[num].GetLabel(), "：已从U本位钱包向现货钱包划转: ", amount, " USDT");
        return true;
    } else {
        Log(exchanges[num].GetLabel(), "：资金划转失败");
        return false;
    }
}

function coverInBacktest(close_price, level_rate, print_data) {
    // 累计盈亏
    var after_fee_profit = [];
    var asset_used = [];

    for (var i = 0; i < _Positions.length; i++) {
        if (_Positions[i].size == 0)
            continue;

        // 当前总收益 - 上一次总收益 = 本次的收益
        // getPositionSize(i, true);   // 先强制更新一下持仓信息
        after_fee_profit[i] = (getAccountAsset(i, close_price[i]) + _TransferAmount[i] - _InitAsset[i]) - ProfitLocal[i];
        ProfitLocal[i] += after_fee_profit[i];

        // 计算正确的开单占用资产
        if (UseAllInOrder) {
            asset_used[i] = _InitAsset[i];
        } else {
            asset_used[i] = UseQuarter ? (_OrderSize[i] * _QuarterOneSizeValue / level_rate)
                                        : ((close_price[i] * _OneSizeInCurrentCoin / level_rate) * _OrderSize[i]);
        }

        // 计算胜率
        if (after_fee_profit[i] > 0) {
            TakeProfitCount[i]++;
            var take_profit_percent = _N(after_fee_profit[i] / asset_used[i], 4);
            if (take_profit_percent > MaxProfitPercent[i]) {
                //记录单次最大盈利
                MaxProfit[i] = after_fee_profit[i];
                MaxProfitPercent[i] = take_profit_percent;
            }
        } else {
            StopLossCount[i]++;
            var stop_loss_percnet = _N(after_fee_profit[i] / asset_used[i], 4);
            if (stop_loss_percnet < MaxLossPercent[i]) {
                // 记录单次最大亏损
                MaxLoss[i] = after_fee_profit[i];
                MaxLossPercent[i] = stop_loss_percnet;
            }
        }
        // 计算资产余额和胜率
        TotalAsset[i] += after_fee_profit[i];
        WinRate[i] = TakeProfitCount[i] / (TakeProfitCount[i] + StopLossCount[i]);
        ProfitPercent[i] = ProfitLocal[i] / asset_used[i];
        // 打印信息
        if (i == 0) {
            if (UseQuarter) {
                // 季度币本位合约
                // Log("平仓价格：", close_price[i], ", 单次盈亏:", _N(after_fee_profit[i], 4), ", 整体盈亏:", ProfitLocal[i], ", 胜率:", (WinRate[i] * 100), "%",
                   //  "; 资产余额:", TotalAsset[i], "; 盈亏百分比：", (_N(ProfitPercent[i], 4) * 100), "%");
                // Log("单次最大盈利:", MaxProfit[i], ", ", (_N(MaxProfitPercent[i], 4) * 100), "%", ", 单次最大亏损：", MaxLoss[i], ", ", (_N(MaxLossPercent[i], 4) * 100), "%",
                   //  ", 交易总次数:", (TakeProfitCount[i] + StopLossCount[i]), ", 盈利次数:", TakeProfitCount[i]);
                // Log(print_data, "@");
                LogProfit(ProfitLocal[i], "          本次收益：", _N(after_fee_profit[i], 4));
            } else {
                // 永续USDT合约
                // Log("平仓价格：", close_price[i], ", 单次盈亏:", _N(after_fee_profit[i], 2), ", 整体盈亏:", _N(ProfitLocal[i], 2), ", 胜率:", (_N(WinRate[i], 4) * 100), "%",
                   //  "; 资产余额:", _N(TotalAsset[i], 2), "; 盈亏百分比：", (_N(ProfitPercent[i], 4) * 100), "%");
                // Log("单次最大盈利:", _N(MaxProfit[i], 2), ", ", (_N(MaxProfitPercent[i], 4) * 100), "%", ", 单次最大亏损：", _N(MaxLoss[i], 2), ", ", (_N(MaxLossPercent[i], 4) * 100), "%",
                   //  ", 交易总次数:", (TakeProfitCount[i] + StopLossCount[i]), ", 盈利次数:", TakeProfitCount[i]);
                // Log(print_data, "@");
                LogProfit(ProfitLocal[i], "          本次收益：", _N(after_fee_profit[i], 4));
            }
        } else {
            if (UseQuarter) {
                // 季度币本位合约
                Log(exchanges[i].GetLabel(), "单次盈亏: ", _N(after_fee_profit[i], 4), "; 整体盈亏:", ProfitLocal[i], "; 资产余额:", TotalAsset[i], "; 盈亏百分比：", (_N(ProfitPercent[i], 4) * 100), "%");
            } else {
                // 永续USDT合约
                Log(exchanges[i].GetLabel(), "单次盈亏: ", _N(after_fee_profit[i], 2), "; 整体盈亏:", _N(ProfitLocal[i], 2), "; 资产余额:", _N(TotalAsset[i], 2), "; 盈亏百分比：", (_N(ProfitPercent[i], 4) * 100), "%");
            }
        }
    }

    // 保存数据到本地
    saveUserDatasLocal();
    // 复位_Position
    for (var j = 0; j < _Positions.length; j++)
        resetPosition(j);

}

function resetAccountInfo(num) {
    _Accounts[num].balance = 0;
    _Accounts[num].frozen_balance = 0;
    _Accounts[num].stocks = 0;
    _Accounts[num].frozen_stocks = 0;
    _Accounts[num].max_order_size = 0;
}

function getPositionAsset(num, price) {
    var position_asset = 0;

    if (UseQuarter) {
        position_asset = _Positions[num].size * _QuarterOneSizeValue / price / _MarginLevel;
    } else {
        position_asset = _Positions[num].size * _OneSizeInCurrentCoin * price / _MarginLevel;
    }
    // Log("账户", num, "持仓资产：", position_asset);
    return position_asset;
}

function getAccountAsset(num, price) {
    // 计算不同情况下的账户初始资产
    var account_asset = 0;
    // var position_profit = 0;
    if (UseQuarter) {
        if (_Positions[num].size != 0) {
            var position_stocks = getPositionAsset(num, price);
            // position_profit = _Positions[num].direction == "long" ? ((price - _Positions[num].avg_cost) / price) * _MarginLevel * position_stocks : ((_Positions[num].avg_cost - price) / price) * _MarginLevel * position_stocks;
            account_asset = _Accounts[num].stocks + _Accounts[num].frozen_stocks + position_stocks;
        }
        else {
            account_asset = _Accounts[num].stocks + _Accounts[num].frozen_stocks;
        }
    } else {
        if (_Positions[num].size != 0) {
            var position_balance = getPositionAsset(num, price);
            // position_profit = _Positions[num].direction == "long" ? ((price - _Positions[num].avg_cost) / price) * _MarginLevel * position_balance : ((_Positions[num].avg_cost - price) / price) * _MarginLevel * position_balance;
            account_asset = _Accounts[num].balance + _Accounts[num].frozen_balance + position_balance;
        } else {
            account_asset = _Accounts[num].balance + _Accounts[num].frozen_balance;
        }
    }
    // Log("账户", num, "资产：", account_asset);
    return account_asset;
}

function refreshPosition(position, num) {
    if (position) {
        _Positions[num].avg_cost = position.Price;
        _Positions[num].direction = position.Type == PD_LONG ? "long" : "short";
        if (IsUseBinanceOrder)
            _Positions[num].size = position.Amount / _OneSizeInCurrentCoin;
        else
            _Positions[num].size = position.Amount;
    } else {
        resetPosition(num);
    }
}

function getMaxOrderSize(margin_level, ticker, account) {
    var max_order_size = 0;
    if (UseQuarter)
        max_order_size = account.Stocks * ticker.Last / _QuarterOneSizeValue * margin_level;
    else
        max_order_size = account.Balance * margin_level / (ticker.Last * _OneSizeInCurrentCoin);
    // Log("当前账户", num, "最大可下单张数为：", max_order_size);
    return Math.trunc(max_order_size);
}

function refreshAccountInfo(ticker, num) {
    var account = exchanges[num].GetAccount();
    if (ticker && account) {
        var max_order_size = 0;
        if (UseQuarter)
            max_order_size = account.Stocks * ticker.Last / _QuarterOneSizeValue * _MarginLevel;
        else
            max_order_size = account.Balance * _MarginLevel / (ticker.Last * _OneSizeInCurrentCoin);

        _Accounts[num].balance = account.Balance;
        _Accounts[num].frozen_balance = account.FrozenBalance;
        _Accounts[num].stocks = account.Stocks;
        _Accounts[num].frozen_stocks = account.FrozenStocks;
        _Accounts[num].max_order_size = Math.trunc(max_order_size);

        return 0;
    } else {
        return -1;
    }
}

function getPositionSize(num, enforce) {
    var position_size = 0;
    var position = null;
    if (enforce) {
        position = _C(exchanges[num].GetPosition);
    } else {
        position = exchanges[num].GetPosition();
    }
    if (position == null)
        return 0;

    if (position.length == 1) {
        if (IsUseBinanceOrder)
            position_size = position[0].Amount / _OneSizeInCurrentCoin;
        else
            position_size = position[0].Amount;
        if (position[0].Type == PD_SHORT)
            position_size = -1 * position_size;
        refreshPosition(position[0], num);
        return position_size;
    }

    return 0;
}

function cancelAllPendingOrders() {
    for (var i = 0; i < exchanges.length; i++) {
        var orders = exchanges[i].GetOrders();
        for (var j = 0; j < orders.length; j++) {
            exchanges[i].CancelOrder(orders[j].Id, orders[j]);
        }
        if (orders.length > 0)
            Log(exchanges[i].GetLabel(), "：已撤销未成交订单！", "@");
    }
}

function calculateRealOrderSize(direction, max_order_size, position_size, order_size, num) {
    var real_order_size = 0;

    if (IsUseBinanceOrder) {
        // 币安永续USDT合约，下单单位是币个数，不是张
        if (UseAllInOrder) {
            // 全仓模式
            if (direction == "buy" || direction == "sell") {
                real_order_size = max_order_size * _OneSizeInCurrentCoin;
            } else {
                real_order_size = Math.abs(position_size * _OneSizeInCurrentCoin);
            }
        } else {
            // 非全仓模式
            if (direction == "buy" || direction == "sell")
                real_order_size = UseMutiOrderSize ? _OrderSize[num] * _OneSizeInCurrentCoin : order_size * _OneSizeInCurrentCoin;
            else
                real_order_size = Math.abs(position_size * _OneSizeInCurrentCoin);
        }
    }
    else {
        // 非币安账户下单，单位：张
        if (UseAllInOrder) {
            // 全仓模式
            if (direction == "buy" || direction == "sell") {
                // 开仓
                real_order_size = max_order_size;
            } else {
                // 平仓
                real_order_size = Math.abs(position_size);
            }
        } else {
            // 非全仓模式
            if (direction == "buy" || direction == "sell")
                real_order_size = UseMutiOrderSize ? _OrderSize[num] : order_size;
            else
                real_order_size = Math.abs(position_size);
        }
    }

    return real_order_size;
}

function calculateRealOrderPrice(direction, order_base_price, is_market_order) {
    var real_order_price = 0;

    if (direction == "buy" || direction == "closesell") {
        if (is_market_order) {
            real_order_price = -1;
        }
        else if (UseOpponentOrder) {
            real_order_price = order_base_price * (1 + OpponentSlip);
            _IsOpponentOrder = true;
        }
        else {
            real_order_price = order_base_price;
        }
    } else if (direction == "sell" || direction == "closebuy") {
        if (is_market_order) {
            real_order_price = -1;
        }
        else if (UseOpponentOrder) {
            real_order_price = order_base_price * (1 - OpponentSlip);
            _IsOpponentOrder = true;
        }
        else {
            real_order_price = order_base_price;
        }
    } else {
        Log("calculateRealOrderPrice: 订单方向错误.");
    }

    return real_order_price;
}

function calculateMaxOrderSize(ticker, account, num) {
    var max_order_size = 0;
    var limit_max_order_size = 0;

    if (UseAllInOrder) {
        max_order_size = getMaxOrderSize(_MarginLevel, ticker, account);
        limit_max_order_size = UseQuarter ? (LimitMaxOrderAmount * _MarginLevel / _QuarterOneSizeValue) : (LimitMaxOrderAmount * _MarginLevel / ticker.Last / _OneSizeInCurrentCoin);
        if (UseLimitMaxOrderAmount && max_order_size > limit_max_order_size)
            max_order_size = limit_max_order_size;
    }

    return max_order_size;
}

function orderDirectly(direction, order_price, order_size, num) {
    exchanges[num].SetDirection(direction);
    if (direction == "buy" || direction == "closesell") {
        // 平仓都是默认市价全平
        // Log("下单张数为：", order_size);
        exchanges[num].Buy(direction == "buy" ? order_price : -1, order_size);
    } else if (direction == "sell" || direction == "closebuy") {
        // Log("下单张数为：", order_size);
        exchanges[num].Sell(direction == "sell" ? order_price : -1, order_size);
    }
}

function isNoPositionToClose(direction, position_size) {
    if ((position_size == 0) && (direction == "closebuy" || direction == "closesell"))
        return true;
    return false;
}

// 单个账号下单
function orderSingleAccount(num, direction, order_size, is_market_order) {
    // 先获取盘口和账户信息
    var ticker = exchanges[num].GetTicker();
    var account = exchanges[num].GetAccount();
    if (!ticker || !account) {
        Log(exchanges[num].GetLabel(), "：获取ticker或者account异常，不下单。", "@");
        return;
    }
    // 获取持仓情况
    var position_size = getPositionSize(num, false);
    // if (position_size != 0)
       // Log(exchanges[num].GetLabel(), "的持仓数量为：", position_size);
    if (isNoPositionToClose(direction, position_size)) {
        Log(exchanges[num].GetLabel(), " 没有持仓，不做平仓.");
        resetPosition(num);
        return;
    }

    // 计算最大可下单张数
    var max_order_size = calculateMaxOrderSize(ticker, account, num);
    if (UseAllInOrder)
        Log(exchanges[num].GetLabel(), "：order：", "最大可下单张数 = ", max_order_size);
    // 计算下单张数
    var real_order_size = calculateRealOrderSize(direction, max_order_size, position_size, order_size, num);
    // 计算下单价格
    var order_base_price = ticker.Last;
    var real_order_price = calculateRealOrderPrice(direction, order_base_price, is_market_order);
    // 正式下单
    orderDirectly(direction, real_order_price, real_order_size, num);
}

function order(direction, order_size, is_market_order) {
    var ticker = [];
    var account = [];
    var real_order_price = [];
    var max_order_size = 0;
    var real_order_size = [];
    var position_size = 0;
    var order_base_price = 0;
    var i = 0;

    // Log("开始下单.开始时间戳：", Unix());
    for (i = 0; i < exchanges.length; i ++) {
        // 先获取盘口和账户信息
        ticker[i] = exchanges[i].GetTicker();
        account[i] = exchanges[i].GetAccount();
        if (!ticker[i] || !account[i]) {
            Log(exchanges[i].GetLabel(), "：获取ticker或者account异常，先不下单，跳过。", "@");
            continue;
        }
        // 获取持仓情况
        position_size = getPositionSize(i, false);
        // if (position_size != 0)
           //  Log(exchanges[i].GetLabel(), "的持仓数量为：", position_size);
        if (isNoPositionToClose(direction, position_size)) {
            Log(exchanges[i].GetLabel(), " 没有持仓，不做平仓.");
            resetPosition(i);
            continue;
        }

        // 计算最大可下单张数
        max_order_size = calculateMaxOrderSize(ticker[i], account[i], i);
        if (UseAllInOrder)
            Log(exchanges[i].GetLabel(), "：order：", "最大可下单张数 = ", max_order_size);
        // 计算下单张数
        real_order_size[i] = calculateRealOrderSize(direction, max_order_size, position_size, order_size, i);
        // 计算下单价格
        order_base_price = UseSameTicker ? ticker[0].Last : ticker[i].Last;
        real_order_price[i] = calculateRealOrderPrice(direction, order_base_price, is_market_order);
        // 正式下单
        orderDirectly(direction, real_order_price[i], real_order_size[i], i);

        // 把滑点取消掉，用于统计  
        real_order_price[i] = order_base_price;
        if (IsUseBinanceOrder)      // 修复币安USDT永续合约的下单张数，使得全局统一
            real_order_size[i] = real_order_size[i] / _OneSizeInCurrentCoin;
    }

    // Log("下单结束.结束时间戳：", Unix());
    return [real_order_price, real_order_size];
}

function orderSync(direction, order_size, is_market_order) {
    // 开启的线程
    var thread_get_ticker = [];
    var thread_get_account = [];
    var thread_get_position = [];
    var thread_order = [];
    // 对应线程获取的结果
    var ticker = [];
    var account = [];
    var position = [];
    var order_id = [];
    // 其它变量
    var real_order_price = [];
    var real_order_size = [];
    var max_order_size = 0;
    var position_size = 0;
    var order_base_price = 0;
    var i = 0;

    // Log("开始多线程下单.开始时间戳：", Unix());
    // 设置交易方向的同时，开启多线程获取数据
    for (i = 0; i < exchanges.length; i++) {
        // 先一次性开启所有线程，同时获取数据
        exchanges[i].SetDirection(direction);
        thread_get_ticker[i] = exchanges[i].Go("GetTicker");
        thread_get_account[i] = exchanges[i].Go("GetAccount");
        thread_get_position[i] = exchanges[i].Go("GetPosition");
    }

    // 根据线程返回的结果，计算最终的下单张数和下单价格
    for (i = 0; i < exchanges.length; i++) {
        // 依次取回数据获取的结果
        ticker[i] = thread_get_ticker[i].wait();
        account[i] = thread_get_account[i].wait();
        position[i] = thread_get_position[i].wait();
        if (!ticker[i] || !account[i] || !position[i]) {
            Log(exchanges[i].GetLabel(), "：获取交易数据异常，先不下单，跳过。", "@");
            continue;
        }
        // 获取持仓情况
        refreshPosition(position[i][0], i);
        position_size = _Positions[i].size;
        // if (position_size != 0)
           // Log(exchanges[i].GetLabel(), "的持仓数量为：", position_size);
        if (isNoPositionToClose(direction, position_size)) {
            Log(exchanges[i].GetLabel(), "：没有持仓，不做平仓.");
            continue;
        }
        // 计算最大可下单张数
        max_order_size = calculateMaxOrderSize(ticker[i], account[i], i);
        if (UseAllInOrder)
            Log(exchanges[i].GetLabel(), "：order：", "最大可下单张数 = ", max_order_size);
        // 计算下单张数
        real_order_size[i] = calculateRealOrderSize(direction, max_order_size, position_size, order_size, i);
        // 计算下单价格
        order_base_price = UseSameTicker ? ticker[0].Last : ticker[i].Last;
        real_order_price[i] = calculateRealOrderPrice(direction, order_base_price, is_market_order);

        // 开启多线程下单
        if (direction == "buy" || direction == "closesell") {
            // 平仓都是默认市价全平
            thread_order.push(exchanges[i].Go("Buy", direction == "buy" ? real_order_price[i] : -1, real_order_size[i]));       // 这里注意使用push来赋值thread_order，避免由于前面的continue跳过的情况导致数组内容不连续。
        } else if (direction == "sell" || direction == "closebuy") {
            thread_order.push(exchanges[i].Go("Sell", direction == "sell" ? real_order_price[i] : -1, real_order_size[i]));
        }

        // 把滑点取消掉，用于统计
        real_order_price[i] = order_base_price;
        if (IsUseBinanceOrder)      // 修复币安USDT永续合约的下单张数，使得全局统一
            real_order_size[i] = real_order_size[i] / _OneSizeInCurrentCoin;
    }

    // 等待下单结束释放线程
    for (i = 0; i < thread_order.length; i++) {
        order_id[i] = thread_order[i].wait();
    }

    // Log("多线程下单结束.结束时间戳：", Unix());
    return [real_order_price, real_order_size];
}

function trade(account_index, order_type, order_price, order_size) {
    var direction;
    var is_market_order = false;
    var real_order_size = [];
    var real_order_price = [];

    if (order_type == "longopen")
        direction = "buy";
    else if (order_type == "longclose")
        direction = "closebuy";
    else if (order_type == "shortopen")
        direction = "sell";
    else if (order_type == "shortclose")
        direction = "closesell";
    else
        Log("下单方向错误.");

    if (IsMarketOrder)  
        is_market_order = true;

    if (account_index != -1) {
        // 单个账号下单
        orderSingleAccount(account_index, direction, order_size, is_market_order);
        Log(exchanges[account_index].GetLabel(), ": 下单完成.");
        return;
    }

    [real_order_price, real_order_size] = UseOrderSync ? orderSync(direction, order_size, is_market_order) : order(direction, order_size, is_market_order);

    if (order_type == "longopen" || order_type == "shortopen") {
        orderInBacktest(order_type == "longopen" ? "long" : "short", real_order_price, real_order_size);
        if (EnablePlot) {
            if (order_type == "longopen")
                $.PlotFlag(_LastBarTime, ' ', '开多', 'circlepin', 'green');
            else
                $.PlotFlag(_LastBarTime, ' ', '开空', 'flag', 'red');
        }
    } else if (order_type == "longclose" || order_type == "shortclose") {
        coverInBacktest(real_order_price, _MarginLevel, "平仓.");
        if (EnablePlot) {
            if (order_type == "longclose")
                $.PlotFlag(_LastBarTime, ' ', '平多', 'circlepin', 'blue');
            else
                $.PlotFlag(_LastBarTime, ' ', '平空', 'circlepin', 'blue');
        }
    }
}

function orderRobot() {
    var cmd = GetCommand();
    var cmd_data;
    var num;

    if (cmd) {
        // 检测交互命令
        Log("接收到的命令：", cmd, "#FF1CAE");
        if (cmd.includes(_QuantitativeOrderHeader)) {
            // $"symbol={symbol},type={type},level_rate={level_rate},price={price},size={size}";
            var order_cmd = cmd.replace(_QuantitativeOrderHeader, "");
            var symbol = order_cmd.substring(7, order_cmd.indexOf(","));
            order_cmd = order_cmd.replace("symbol=" + symbol + ",", "");
            var type = order_cmd.substring(5, order_cmd.indexOf(","));
            order_cmd = order_cmd.replace("type=" + type + ",", "");
            var level_rate = Number(order_cmd.substring(11, order_cmd.indexOf(",")));
            order_cmd = order_cmd.replace("level_rate=" + level_rate + ",", "");
            var price = Number(order_cmd.substring(6, order_cmd.indexOf(",")));
            order_cmd = order_cmd.replace("price=" + price + ",", "");
            var size = Number(order_cmd.substring(5));
            // Log("symbol = ", symbol, " type = ", type, " level_rate = ", level_rate, " price = ", price, " size = ", size);
            trade(-1, type, price, size);
        } else if (cmd.indexOf("ClearLocalData:") == 0) {
            // 清除本地数据
            var account_index = cmd.replace("ClearLocalData:", "");
            clearUserDataLocal(account_index);
        } else if (cmd.indexOf("SaveLocalData:") == 0) {
            // 保存数据到本地
            saveUserDatasLocal();
        } else if (cmd.indexOf("ClearLog:") == 0) {
            // 清除日志
            var log_reserve = cmd.replace("ClearLog:", "");
            LogReset(Number(log_reserve));
        } else if (cmd.indexOf("LogStatusRefreshTime:") == 0) {
            // 修改状态栏更新时间间隔
            _LogStatusRefreshTime = cmd.replace("LogStatusRefreshTime:", "");
        } else if (cmd.indexOf("LogPrint:") == 0) {
            // 清除日志
            var log_print = cmd.replace("LogPrint:", "");
            Log(log_print);
        } else if (cmd.indexOf("SetStrategyRunTime:") == 0) {
            // 设置策略开始时间
            var strategy_run_time = cmd.replace("SetStrategyRunTime:", "");
            Log(strategy_run_time);
            setStrategyRunTime(strategy_run_time);
        } else if (cmd.indexOf("AdjustOrderSize:") == 0) {
            // 调整下单张数
            num = Number(cmd.replace("AdjustOrderSize:", ""));
            var ticker;
            Log(num);
            if (num == -1) {
                for (var i = 0; i < exchanges.length; i++) {
                    ticker = _C(exchanges[i].GetTicker);
                    adjustOrderSizes(ticker, i);
                }
            } else {
                ticker = _C(exchanges[num].GetTicker);
                adjustOrderSizes(ticker, num);
            }
        } else if (cmd.indexOf("SetUserStartTime:") == 0) {
            // 设置用户开始时间
            cmd_data = cmd.replace("SetUserStartTime:", "");
            num = Number(cmd_data.split(",")[0]);
            var timestamp = cmd_data.split(",")[1];
            UserStartTime[num] = Number(timestamp);
        } else if (cmd.indexOf("SetUserInitAsset:") == 0) {
            // 设置用户初始资产
            cmd_data = cmd.replace("SetUserInitAsset:", "");
            num = Number(cmd_data.split(",")[0]);
            var init_asset = cmd_data.split(",")[1];
            _InitAsset[num] = Number(init_asset);
        } else if (cmd.indexOf("ManualOrder:") == 0) {
            // 手动下单
            cmd_data = cmd.replace("ManualOrder:", "");
            num = Number(cmd_data.split(",")[0]);
            var order_type = cmd_data.split(",")[1];
            var order_size = Number(cmd_data.split(",")[2]);
            trade(num, order_type, 0, order_size);
        }
    }

    // 打印状态栏信息
    printLogStatus();
    // 把K线画出来
    plotRecords();
    // 检查未成交订单
    checkPendingOrders();
    // 自动移出资产
    autoTransfer();
}

var _OpponentOrderCount = 0;
function checkPendingOrders() {
    if (_IsOpponentOrder && !IsMarketOrder) {
        _OpponentOrderCount++;
        if ((Interval / 1000) * _OpponentOrderCount >= OpponentOrderTime) {
            cancelAllPendingOrders();
            _OpponentOrderCount = 0;
            _IsOpponentOrder = false;
        }
    }
}

function plotRecords() {
    if (EnablePlot) {
        var records = exchange.GetRecords(KPeriod * 60);
        if (!records || (records.length < 1)) {
            Log("获取K线数据异常.");
            return;
        }
        _LastBarTime = records[records.length - 1].Time;

        // 把K线画出来
        $.PlotRecords(records, 'K线');
    }
}

var _LogStatusCount = 0;
function printLogStatus() {
    var t_direction;
    var position_asset = 0;
    var position_profit = 0;
    var position_profit_percent = 0;
    var price = 0;
    var account_asset = 0;
    var balance = 0;
    var balance_frozen = 0;
    var account_profit = 0;
    var account_profit_percent = 0;
    var user_start_time;

    _LogStatusCount++;
    if (_LogStatusCount >= (_LogStatusRefreshTime / (Interval / 1000 ))) {
        // 打印持仓信息和账户信息
        var table_overview = { type: 'table', title: '策略总览', cols: ['开始时间', '已运行天数', '交易对', '当前价格', '杠杆倍数', '预估月化%', '合作联系微信'], rows: [] };
        var table_account = { type: 'table', title: '账户资金', cols: ['序号', '账户', '开始时间', '当前资产', '初始资产', '已移出资产', '可用余额', '冻结余额', '下单张数', '收益', '收益%'], rows: [] };
        var table_position = { type: 'table', title: '持仓情况', cols: ['序号', '账户', '持仓均价', '方向', '数量', '保证金', '浮动盈亏', '浮动盈亏%'], rows: [] };
        
        for (var i = 0; i < exchanges.length; i++) {
            var ticker = exchanges[i].GetTicker();
            if (!ticker) {
                Log(exchanges[i].GetLabel(), "：ticker获取失败.printLogStatus().");
                continue;
            }
            price = ticker.Last;

            // 策略总览表
            if (i == 0) {       
                var the_running_days = getDaysFromTimeStamp(StrategyDatas.start_run_timestamp, Unix());
                var monthly_rate_of_profit = 0;
                if (the_running_days > 2)
                    monthly_rate_of_profit = ProfitLocal[i] / _InitAsset[i] / the_running_days * 30;
                table_overview.rows.push([_D(StrategyDatas.start_run_timestamp * 1000), the_running_days, exchanges[i].GetCurrency(), price, _MarginLevel, _N(monthly_rate_of_profit * 100, 2) + "%", 'wd1061331106']);
            }

            if (getPositionSize(i, false) == 0)    // 如果没有持仓，就复位持仓信息，避免回测统计有误
                resetPosition(i);
            if (refreshAccountInfo(ticker, i) == -1)    // 如果没有获取到账户信息，就先复位
                resetAccountInfo(i);

            if (_Positions[i].size != 0) {
                position_profit_percent = _Positions[i].direction == "long" ? ((price - _Positions[i].avg_cost) / _Positions[i].avg_cost) * _MarginLevel : ((_Positions[i].avg_cost - price) / _Positions[i].avg_cost) * _MarginLevel;
                position_asset = getPositionAsset(i, price);
                position_profit = position_asset * position_profit_percent;
            } else {
                position_profit_percent = 0;
                position_asset = 0;
                position_profit = 0;
            }
            account_asset = getAccountAsset(i, ticker.Last);
            t_direction = _Positions[i].direction == "long" ? "多单" : "空单";
            if (_Positions[i].size == 0)
                t_direction = "无持仓";
            account_profit = account_asset + _TransferAmount[i] - _InitAsset[i];
            account_profit_percent = account_profit / _InitAsset[i];
            balance = UseQuarter ? _N(_Accounts[i].stocks, 4) : _N(_Accounts[i].balance, 2);
            balance_frozen = UseQuarter ? _Accounts[i].frozen_stocks : _N(_Accounts[i].frozen_balance, 2);
            user_start_time = _D(UserStartTime[i] * 1000, "yyyy-MM-dd");

            table_account.rows.push([i, exchanges[i].GetLabel(), user_start_time, _N(account_asset, 4), _N(_InitAsset[i], 4), _N(_TransferAmount[i], 4), balance, balance_frozen,
                _OrderSize[i] + " / " + _Accounts[i].max_order_size, _N(account_profit, 4), _N((account_profit_percent * 100), 2) + "%"]);
            table_position.rows.push([i, exchanges[i].GetLabel(), _N(_Positions[i].avg_cost, 2), t_direction, _N(_Positions[i].size, 2), _N(position_asset, 4), _N(position_profit, 4), _N((position_profit_percent * 100), 2) + "%"]);
        }

        LogStatus('`' + JSON.stringify(table_overview) + '`\n'
            // + '\n' + print_info + '\n' + '\n'
            + '`' + JSON.stringify([table_account, table_position]) + '`\n');
        _LogStatusCount = 0;
    }
}

function adjustOrderSizes(ticker, num) {
    var account = _C(exchanges[num].GetAccount);
    var max_order_size = getMaxOrderSize(_MarginLevel, ticker, account) + _Positions[num].size;
    _OrderSize[num] = Math.trunc(max_order_size * ThePercentOfAssetToOrder);
    if (_OrderSize[num] < 1 && _Positions[num].size != 0)
        _OrderSize[num] = 1;
}

// 判断是否币安交易所
function isBinanceExchange(num) {
    if (exchanges[num].GetName() == "Futures_Binance") {
        return true;
    }
    return false;
}

function setContract() {
    var order_sizes = OrderSize.split(",");
    var init_assets = InitAsset.split(",");
    var ticker;

    saveStrategyRunTime();

    for (var i = 0; i < exchanges.length; i++) {
        // Log(exchanges[i].GetLabel());
        // exchanges[i].IO("simulate", true);
        if (UseQuarter) {
            exchanges[i].SetContractType("quarter"); // 季度合约
        }
        else {
            exchanges[i].SetContractType("swap"); // 永续合约
        }
        exchanges[i].SetCurrency(Currency);
        exchanges[i].SetMarginLevel(_MarginLevel);
        exchanges[i].IO("cross", true);     // 全仓模式
        exchanges[i].SetPrecision(_PricePrecision, _AmountPrecision);

        // 获取持仓和账户信息
        ticker = _C(exchanges[i].GetTicker);
        _Positions.push({ avg_cost: 0, direction: "short", size: 0, order_count: 0 });
        _Accounts.push({ balance: 0, frozen_balance: 0, stocks: 0, frozen_stocks: 0, max_order_size: 0 });
        if (getPositionSize(i, false) == 0)    // 如果没有持仓，就复位持仓信息，避免回测统计有误
            resetPosition(i);
        if (refreshAccountInfo(ticker, i) == -1)    // 如果没有获取到账户信息，就先复位
            resetAccountInfo(i);

        // 读取本地数据，同时构建UserData
        readUserDataLocal(i);
        // 计算不同情况下的账户初始资产
        if (!isHadLocalData(i)) {
            // 没有本地数据
            if ((UseQuarter && _Accounts[i].stocks == 0 && _Accounts[i].frozen_stocks == 0 && _Positions[i].size == 0)
                || (!UseQuarter && _Accounts[i].balance == 0 && _Accounts[i].frozen_balance == 0 && _Positions[i].size == 0)) {
                _InitAsset[i] = Number(init_assets[i]);
            } else {
                _InitAsset[i] = getAccountAsset(i, ticker.Last);
            }
            TotalAsset[i] = _InitAsset[i];
        } else {
            // 本地拥有数据，直接读取
            _InitAsset[i] = UserDatas[i].init_assets;
            TotalAsset[i] = _InitAsset[i] + UserDatas[i].profit_local;
        }

        // 初始化数据
        ProfitPercent[i] = 0;
        WinRate[i] = 0;

        // 复制本地数据,若本地没有数据，默认为0
        ProfitLocal[i] = UserDatas[i].profit_local;
        TakeProfitCount[i] = UserDatas[i].take_profit_count;
        StopLossCount[i] = UserDatas[i].stop_loss_count;
        MaxLoss[i] = UserDatas[i].max_loss;
        MaxLossPercent[i] = UserDatas[i].max_loss_percent;
        MaxProfit[i] = UserDatas[i].max_profit;
        MaxProfitPercent[i] = UserDatas[i].max_profit_percent;
        UserStartTime[i] = UserDatas[i].start_time;
        _TransferAmount[i] = UserDatas[i].transfer_amount ? UserDatas[i].transfer_amount : 0;
        _CurrentInitAssets[i] = UserDatas[i].current_init_assets ? UserDatas[i].current_init_assets : 0;

        // 调整下单张数
        if (UseAutoAdjustOrderSize) {
            if (UserDatas[i].order_size == 0) {
                adjustOrderSizes(ticker, i);
            } else {
                _OrderSize[i] = UserDatas[i].order_size;
            }
        } else {
            _OrderSize[i] = Number(order_sizes[i]);
        }
    }
}

function main() {
    setContract();
    while(true) {
        orderRobot();
    	Sleep(Interval);
    }
}
```

> Detail

https://www.fmz.com/strategy/301404

> Last Modified

2022-02-22 23:20:20
