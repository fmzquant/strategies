
> Name

TradingView信号-V-011

> Author

JKMCHEN

> Strategy Description

从TV的webhook发送的消息内容为：
long       开多
short      开空
closelong  平多
closeshort 平空

警报名称随便填写，消息内容就是上面的英文（只填英文，不要带空格和其他符号）
记得填写正确的Webhook URL


更新内容：
1、添加了2个止盈
2、添加了止损

3、添加了回调止盈，价格超过第2个止盈点位之后，回调百分比止盈。（2023年4月27日 20:43:11）

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|AmountDefaut|true|默认开单量（如果为0，则按照倍率开单）|
|Leverage|10|杠杆倍率（5-10）|
|StopLossPercentage|1.5|止损百分比（0-100）|
|_TakeProfitPercentage1|0.7|第1个止盈点位，止盈百分比|
|_TakeProfitPercentage2|1.3|第2个止盈点位，止盈百分比|
|_CallBakcPercent|true|超过止盈2之后，回调止盈百分比|


> Source (javascript)

``` javascript
////TradingView信号-带止盈 V 0.1.1
////相比较0.1.0，多了一个止盈；当前版本为2个止盈点位；
////只能做一个多单，如果当前有多单，不再继续开多；同样的逻辑适用于空单；  0.1.0


// 参数设置
//var _TakeProfitPercentage = 0.3; // 止盈百分比
//var Leverage = 5; // 开仓倍率
//var StopLossPercentage = 1.5; // 止损百分比
//var StopLossPercentage = 1.5; // 止损百分比
//var AmountDefaut = 1;               //默认开单数量，如果为0，则按照倍率开单
var takeProfitOrderId;
var takeProfitOrderId2;


// 全局变量
var position;
var baseMargin;
var assetPrecision;//获取资产精度，并将其存储在全局变量中：
var pricePrecision; // 在全局变量中添加一个新变量，用于存储价格精度
var DEFAULT_ASSET_PRECISION = 3;
var DEFAULT_PRICE_PRECISION = 2; // 在这里添加价格精度的默认值
var hasOpenedLong = false; // 跟踪是否已经开过多单
var hasOpenedShort = false; // 跟踪是否已经开过空单
var _TriggeredTakeProfit = false;                        // 是否触发了回调止盈
var _PeakPriceInPosition = 0;                            // 持仓中价格的峰值点（最高/最低点）



////初始化
function initialize() {

    // 检查重启后是否存在多单或空单
    var positions = exchange.GetPosition();
    for (var i = 0; i < positions.length; i++) {
        if (positions[i].Type === PD_LONG || positions[i].Type === PD_LONG_YD) {
            hasOpenedLong = true;
        } else if (positions[i].Type === PD_SHORT || positions[i].Type === PD_SHORT_YD) {
            hasOpenedShort = true;
        }
    }
}



// 添加一个新函数，用于将价格调整到合适的精度
function fixPricePrecision(price, precision) {
    return parseFloat(price.toFixed(precision));
}
// 添加一个新函数，用于获取价格精度
function getPricePrecision() {
    return DEFAULT_PRICE_PRECISION;
}
//将购买数量调整为合适的精度：
function fixAmountPrecision(amount, precision) {
    return parseFloat(amount.toFixed(precision));
}
//设定交易精度：
function getAssetPrecision() {
    return DEFAULT_ASSET_PRECISION;
}

////输出保证金数量
function logMargin() {
    var account = exchange.GetAccount();
    var positions = exchange.GetPosition();
    var lockedMargin = 0;

    for (var i = 0; i < positions.length; i++) {
        lockedMargin += positions[i].Margin;
    }

    var availableMargin = account.Balance;
    var totalMargin = lockedMargin + availableMargin;

    Log("保证金：", totalMargin, "，未锁定的保证金：", availableMargin, "，锁定的保证金：", lockedMargin);
}


function getMargin() {
    var account = exchange.GetAccount();
    return account.Balance + account.FrozenBalance;
}

function updatePosition() {
    position = exchange.GetPosition();
}

function updateMargin() {
    baseMargin = getMargin();
}

////回调止盈函数
function trackingTakeProfit(position, ticker) {
    var take_profit_price = 0;
    var trigger_price = 0;
    var price = ticker.Last;

    if (position.length > 0) {//判断是否有持仓
        if (position[0].Type == PD_LONG) {// 多单持仓

            if (_TriggeredTakeProfit) {// 已达到触发价格，监控是否止盈

                _PeakPriceInPosition = price > _PeakPriceInPosition ? price : _PeakPriceInPosition;                                       // 更新价格高点
                take_profit_price = _PeakPriceInPosition * (1 - _CallBakcPercent / 100);                                                  // 计算回调的止盈价格

                if (price < take_profit_price) {///回调止盈，平空逻辑
                    tryCloseLong();                                 //平多
                    logMargin();                                    // 输出保证金
                    _TriggeredTakeProfit = false;                   // 复位触发标记
                    Log("多单回调止盈：持仓中价格高点：", _N(_PeakPriceInPosition, 6), ", 止盈价格：", _N(take_profit_price, 6), ", 当前价格：", _N(price, 6),
                        ", 持仓价格：", _N(position[0].Price, 6));
                }
            } else {
                // 监控是否达到回调止盈的触发价格
                trigger_price = position[0].Price * (1 + _TakeProfitPercentage2 / 100);
                if (price > trigger_price) {
                    _TriggeredTakeProfit = true;                      // 触发回调止盈
                    _PeakPriceInPosition = price;                     // 记录价格高点
                    Log("多单已达到回调止盈的触发价格：", _N(trigger_price, 6), ", 当前价格：", _N(price, 6), ", 持仓价格：", _N(position[0].Price, 6));
                }
            }
        } else if (position[0].Type == PD_SHORT) {
            // 空单持仓
            if (_TriggeredTakeProfit) {
                // 已达到触发价格，监控是否止盈
                _PeakPriceInPosition = price < _PeakPriceInPosition ? price : _PeakPriceInPosition;                                            // 更新价格低点
                take_profit_price = _PeakPriceInPosition * (1 + _CallBakcPercent / 100);                                                  // 计算回调的止盈价格

                if (price > take_profit_price) {///回调止盈，平空逻辑
                    tryCloseShort();                                //平空
                    logMargin();                                    // 输出保证金
                    _TriggeredTakeProfit = false;                   // 复位触发标记
                    Log("空单回调止盈：持仓中价格低点：", _N(_PeakPriceInPosition, 6), ", 止盈价格：", _N(take_profit_price, 6), ", 当前价格：", _N(price, 6),
                        ", 持仓价格：", _N(position[0].Price, 6), _EnableMessageSend ? "@" : "#FF1CAE");
                }
            } else {
                // 监控是否达到回调止盈的触发价格
                trigger_price = position[0].Price * (1 - _TakeProfitPercentage2 / 100);
                if (price < trigger_price) {
                    _TriggeredTakeProfit = true;                      // 触发回调止盈
                    _PeakPriceInPosition = price;                     // 记录价格低点
                    Log("空单已达到回调止盈的触发价格：", _N(trigger_price, 6), ", 当前价格：", _N(price, 6), ", 持仓价格：", _N(position[0].Price, 6));
                }
            }
        }
    }
}


// 添加一个新函数用于检查止盈单是否已成交
function checkTakeProfitOrder() {
    if (takeProfitOrderId) {
        var order = exchange.GetOrder(takeProfitOrderId);
        if (order) {
            if (order.Status === ORDER_STATE_CLOSED || order.Status === ORDER_STATE_CANCELED) {
                Log("止盈单1已成交或取消");
                takeProfitOrderId = null;
            }
        } else {
            Log("无法获取止盈单1信息");
        }
    }
    if (takeProfitOrderId2) {
        var order2 = exchange.GetOrder(takeProfitOrderId2);
        if (order2) {
            if (order2.Status === ORDER_STATE_CLOSED || order2.Status === ORDER_STATE_CANCELED) {
                Log("止盈单2已成交或取消");
                takeProfitOrderId2 = null;
            }
        } else {
            Log("无法获取止盈单2信息");
        }
    }
}

////如果购买不成功，尝试重新购买
function retryBuy(times, delay, contractType, amount) {
    var result;
    for (var i = 0; i < times; i++) {
        try {
            result = exchange.Buy(contractType, amount);
            break;
        } catch (error) {
            if (i === times - 1) {
                Log("尝试购买", times, "次后失败：", error);
            } else {
                Log("购买失败，等待", delay, "毫秒后重试：", error);
                Sleep(delay);
            }
        }
    }
    return result;
}



function openLong() {

    // 检查是否已经开过多单
    if (hasOpenedLong) {
        Log("已经开过多单，不再继续开多单");
        return;
    }

    try {
        var account = exchange.GetAccount();
        var ticker = exchange.GetTicker();
        var amount = (account.Balance * Leverage) / ticker.Buy;
        amount = AmountDefaut > 0 ? AmountDefaut : fixAmountPrecision(amount, assetPrecision); // 调整精度

        exchange.SetDirection("buy"); // 设置交易方向为买入（开多）
        //exchange.Buy(-1, amount);
        try {
            var result = retryBuy(3, 3000, -1, amount);
            if (result) {
                Log("开多量：", amount, "，开多价格：", ticker.Buy);    // 成功执行交易操作，进行后续处理
                hasOpenedLong = true;   // // 更新hasOpenedLong变量，表示已经开过多单

                Sleep(1000);

                // 止盈点位1
                try {
                    var takeProfitPrice = ticker.Buy * (1 + _TakeProfitPercentage1 / 100);
                    takeProfitPrice = fixPricePrecision(takeProfitPrice, pricePrecision); // 调整价格精度
                    var takeProfitAmount1 = fixAmountPrecision(amount * 0.3, assetPrecision); // 调整数量精度
                    exchange.SetDirection("closebuy"); // 设置止盈平多交易方向
                    takeProfitOrderId = exchange.Sell(takeProfitPrice, takeProfitAmount1);
                    Log("挂止盈单1，价格：", takeProfitPrice, "，数量：", takeProfitAmount1);
                } catch (error) {
                    Log("挂止盈单1失败：", error.message, "错误详情：", error);
                    takeProfitOrderId = null;
                }

                Sleep(1000);

                // 止盈点位2
                try {
                    var takeProfitPrice2 = ticker.Buy * (1 + _TakeProfitPercentage2 / 100);
                    takeProfitPrice2 = fixPricePrecision(takeProfitPrice2, pricePrecision); // 调整价格精度
                    var takeProfitAmount2 = fixAmountPrecision(amount * 0.3, assetPrecision); // 调整数量精度
                    exchange.SetDirection("closebuy"); // 设置止盈平多交易方向
                    takeProfitOrderId2 = exchange.Sell(takeProfitPrice2, takeProfitAmount2);
                    Log("挂止盈单2，价格：", takeProfitPrice2, "，数量：", takeProfitAmount2);
                } catch (error) {
                    Log("挂止盈单2失败：", error.message, "错误详情：", error);
                    takeProfitOrderId2 = null;
                }

            } else {
                // 重试次数已用完，仍然失败，可以在这里执行其他操作，如通知用户、记录日志等
            }
        } catch (error) {
            // 捕获到异常，可以在这里执行其他操作，如通知用户、记录日志等
            Log("开多单异常：", error);
        }

    } catch (error) {
        Log("开多单失败：", error);
    }
}

function retryCloseLong(times, delay, contractType, amount) {
    var result;
    for (var i = 0; i < times; i++) {
        try {
            exchange.SetDirection("closebuy");
            result = exchange.Sell(contractType, amount);
            break;
        } catch (error) {
            if (i === times - 1) {
                Log("尝试平多", times, "次后失败：", error);
            } else {
                Log("平多失败，等待", delay, "毫秒后重试：", error);
                Sleep(delay);
            }
        }
    }
    return result;
}


function closeLong() {
    if (position.length === 0) return;

    // 取消止盈单
    if (takeProfitOrderId) {
        exchange.CancelOrder(takeProfitOrderId);
        Log("取消止盈单1");
        takeProfitOrderId = null;
    }
    if (takeProfitOrderId2) {
        exchange.CancelOrder(takeProfitOrderId2);
        Log("取消止盈单2");
        takeProfitOrderId2 = null;
    }

    Sleep(1000);

    var ticker = exchange.GetTicker();
    try {
        var result = retryCloseLong(3, 5000, -1, position[0].Amount);
        if (result) {
            Log("平多量：", position[0].Amount, "，平多价格：", ticker.Sell);
            // 重置hasOpenedLong变量
            hasOpenedLong = false;
        } else {
            // 重试次数已用完，仍然失败，可以在这里执行其他操作，如通知用户、记录日志等
        }
    } catch (error) {
        // 捕获到异常，可以在这里执行其他操作，如通知用户、记录日志等
        Log("平多异常：", error);
    }
}




////如果开空不成功，重新开空
function retrySell(times, delay, contractType, amount) {
    var result;
    for (var i = 0; i < times; i++) {
        try {
            result = exchange.Sell(contractType, amount);
            break;
        } catch (error) {
            if (i === times - 1) {
                Log("尝试卖出", times, "次后失败：", error);
            } else {
                Log("卖出失败，等待", delay, "毫秒后重试：", error);
                Sleep(delay);
            }
        }
    }
    return result;
}

function openShort() {
    //检查是否已经开过空单
    if (hasOpenedShort) {
        Log("已经开过空单，不再继续开空单");
        return;
    }
    try {
        var account = exchange.GetAccount();
        var ticker = exchange.GetTicker();
        var amount = (account.Balance * Leverage) / ticker.Sell;
        amount = AmountDefaut > 0 ? AmountDefaut : fixAmountPrecision(amount, assetPrecision); // 调整精度

        exchange.SetDirection("sell"); // 设置交易方向为卖出（开空）
        //exchange.Sell(-1, amount);
        try {////尝试开空代码
            var result = retrySell(3, 3000, -1, amount);
            if (result) {
                // 成功执行交易操作，进行后续处理
                hasOpenedShort = true;// 更新hasOpenedShort变量，表示已经开过空单
                Log("开空量：", amount, "，开空价格：", ticker.Sell);
                
                Sleep(1000);

                // 第一个止盈点位
                try {
                    var takeProfitPrice = ticker.Sell * (1 - _TakeProfitPercentage1 / 100);
                    takeProfitPrice = fixPricePrecision(takeProfitPrice, pricePrecision); // 调整价格精度
                    var takeProfitAmount1 = fixAmountPrecision(amount * 0.3, assetPrecision); // 调整数量精度
                    exchange.SetDirection("closesell"); // 设置止盈平空交易方向
                    takeProfitOrderId = exchange.Buy(takeProfitPrice, takeProfitAmount1);
                    Log("挂止盈单1，价格：", takeProfitPrice, "，数量：", takeProfitAmount1);
                } catch (error) {
                    Log("挂止盈单1失败：", error.message, "错误详情：", error);
                    takeProfitOrderId = null;
                }

                Sleep(1000);

                // 第二个止盈点位
                try {
                    var takeProfitPrice2 = ticker.Sell * (1 - _TakeProfitPercentage2 / 100);
                    takeProfitPrice2 = fixPricePrecision(takeProfitPrice2, pricePrecision); // 调整价格精度
                    var takeProfitAmount2 = fixAmountPrecision(amount * 0.3, assetPrecision); // 调整数量精度
                    exchange.SetDirection("closesell"); // 设置止盈平空交易方向
                    takeProfitOrderId2 = exchange.Buy(takeProfitPrice2, takeProfitAmount2);
                    Log("挂止盈单2，价格：", takeProfitPrice2, "，数量：", takeProfitAmount2);
                } catch (error) {
                    Log("挂止盈单2失败：", error.message, "错误详情：", error);
                    takeProfitOrderId2 = null;
                }

            } else {
                // 重试次数已用完，仍然失败，可以在这里执行其他操作，如通知用户、记录日志等
            }
        } catch (error) {
            // 捕获到异常，可以在这里执行其他操作，如通知用户、记录日志等
            Log("开空单异常：", error);
        }

    } catch (error) {
        Log("开空单失败：", error);
    }
}

function retryCloseShort(times, delay, contractType, amount) {
    var result;
    for (var i = 0; i < times; i++) {
        try {
            exchange.SetDirection("closesell");
            result = exchange.Buy(contractType, amount);
            break;
        } catch (error) {
            if (i === times - 1) {
                Log("尝试平空", times, "次后失败：", error);
            } else {
                Log("平空失败，等待", delay, "毫秒后重试：", error);
                Sleep(delay);
            }
        }
    }
    return result;
}

function closeShort() {
    if (position.length === 0) return;

    // 取消止盈单
    if (takeProfitOrderId) {
        exchange.CancelOrder(takeProfitOrderId);
        Log("取消止盈单1");
        takeProfitOrderId = null;
    }
    if (takeProfitOrderId2) {
        exchange.CancelOrder(takeProfitOrderId2);
        Log("取消止盈单2");
        takeProfitOrderId2 = null;
    }

    Sleep(1000);

    var ticker = exchange.GetTicker();
    try {
        var result = retryCloseShort(3, 3000, -1, position[0].Amount);
        if (result) {
            Log("平空量：", position[0].Amount, "，平空价格：", ticker.Buy);
            // 重置hasOpenedShort变量
            hasOpenedShort = false;
        } else {
            // 重试次数已用完，仍然失败，可以在这里执行其他操作，如通知用户、记录日志等
        }
    } catch (error) {
        // 捕获到异常，可以在这里执行其他操作，如通知用户、记录日志等
        Log("平空异常：", error);
    }
}


function tryCloseShort() {
    if (position.length > 0) {
        for (var i = 0; i < position.length; i++) {
            if (position[i].Type === PD_SHORT) {
                closeShort();
            }
        }
    }
}

function tryCloseLong() {
    if (position.length > 0) {
        for (var i = 0; i < position.length; i++) {
            if (position[i].Type === PD_LONG) {
                closeLong();
            }
        }
    }
}

////止损函数
function handleStopLoss() {
    var ticker = exchange.GetTicker();
    var stopLossPrice;

    if (position.length > 0) {
        for (var i = 0; i < position.length; i++) {
            if (position[i].Type === PD_LONG) {
                stopLossPrice = position[i].Price * (1 - StopLossPercentage / 100);
                if (ticker.Last < stopLossPrice) {
                    Log("触发多仓止损，当前价格：", ticker.Last, "，止损价格：", stopLossPrice);
                    closeLong();
                }

            } else if (position[i].Type === PD_SHORT) {
                stopLossPrice = position[i].Price * (1 + StopLossPercentage / 100);
                if (ticker.Last > stopLossPrice) {
                    Log("触发空仓止损，当前价格：", ticker.Last, "，止损价格：", stopLossPrice);
                    closeShort();
                }

            }
        }
    }
}




function handleMessage(msg) {

    var commands = msg.split(',');
    for (var i = 0; i < commands.length; i++) {
        switch (commands[i]) {
            case "long":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseShort();
                Sleep(1000);
                openLong();
                logMargin(); // 输出保证金
                break;
            case "short":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseLong();
                Sleep(1000);
                openShort();
                logMargin(); // 输出保证金
                break;
            case "closelong":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseLong();
                logMargin(); // 输出保证金
                break;
            case "closeshort":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseShort();
                logMargin(); // 输出保证金
                break;
        }
        Sleep(1000); // 在处理下一个命令之前暂停1秒
    }
}



function main() {


    exchange.SetContractType("swap");
    assetPrecision = getAssetPrecision(); // 获取资产精度
    pricePrecision = getPricePrecision(); // 获取价格精度

    initialize(); // 检查启动前是否有挂单
    updateMargin();
    logMargin(); // 输出保证金

    while (true) {
        updatePosition();

        if (takeProfitOrderId || takeProfitOrderId2) {
            checkTakeProfitOrder(); // 如果存在止盈单，请检查它们的状态
        }

        handleStopLoss(); // 处理止损

        ////处理回调止盈
        var ticker = exchange.GetTicker();
        trackingTakeProfit(position, ticker);

        var command = GetCommand();
        if (command) {
            handleMessage(command);
        }

        Sleep(1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/410488

> Last Modified

2023-04-29 00:41:40
