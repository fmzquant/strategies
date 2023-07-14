
> Name

Bybit-算法接针-VWAP-BTC

> Author

扁豆子

> Strategy Description

在这里开始分享Bybit原始版本的接针策略~
主要原因是什么呢///
 ![IMG](https://www.fmz.com/upload/asset/95a9985fc126e73d27e9.png) 
 
 这就很气了不是...
 你说好好的开源, 都没有不知道情况下被卖生气...
 希望小老哥别在这样了~
 在这里直接开源,
 本身也不是什么牛逼的策略...
 
 大家随意玩耍叭~
 不要花钱买我的辣鸡源码了~
 咱直接用!! 走起!!
 
 顺便广告一发~
 更多亏钱攻略请关注公众号 "扁豆子的量化日志"
 WX: wangxiaoba
 
 (●'◡'●)

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|start_balance|false|初始金额|
|long_qty|true|单次做多USD|
|short_qty|true|单次做空USD|
|maxPosition|500000|最大下单量|
|take_profit|45|初始止盈(USD)|
|trailing_profit|true|追踪止盈USD|
|stop_loss|9|止损百分比|
|long_vwap_offset|2.5|VWAP上界百分比|
|short_vwap_offset|2.5|VWAP下界百分比|
|GG|3|杠杆倍数 (2x-7x为宜, 杠杆越大风险越大)|
|stop_step|3600|止损后停止时间(s)|


> Source (javascript)

``` javascript
// 判断uid权限 (UID list + getAccount uid 校验)
function user_auth() {
    user_list = [775536, 783571, 789086, 819490, 1265698, 1294567, 1299150]
    user_id = account.Info.result[0].user_id
    //Log(user_id)
    if (user_list.indexOf(user_id) == -1) {
        throw new Error('用户认证错误, 请联系微信: wangxiaoba')
    }
}

// 计算获取VWAP及上下边界 Bybit
function VWAP() {
    // 定义K线, 计算VWAP
    if (records.length > 1440) {
        records.splice(0, 1);
    }
    var n = records.length - 1
    //Log(n)
    var total_sum = 0.0
    var volume_sum = 0
    vwap_arr = []
    vwap_up_arr = []
    vwap_dw_arr = []
    for (var i = 0; i < n + 1; i++) {
        var high_price = records[i].High
        //Log("log high_price " + high_price)
        var low_price = records[i].Low
        var close_price = records[i].Close
        //Log("log low_price " + low_price)
        var price = (high_price + low_price + close_price) / 3
        //Log("price", price)
        var volume = records[i].Volume
        //Log("log volume " + volume)
        total_sum += price * volume
        //Log("log total_sum " + total_sum)
        volume_sum += volume
        //Log("log volume_sum " + volume_sum)
        var re = total_sum / volume_sum
        var re_up = re * (1 + long_vwap_offset / 100)
        var re_dw = re * (1 - short_vwap_offset / 100)
        vwap_arr.push(re)
        vwap_up_arr.push(re_up)
        vwap_dw_arr.push(re_dw)
        //return total_sum / volume_sum
    }
    if (vwap_arr.length > 2000) {
        vwap_arr.splice(0, 1);
    }
    if (vwap_up_arr.length > 2000) {
        vwap_up_arr.splice(0, 1);
    }
    if (vwap_dw_arr.length > 2000) {
        vwap_dw_arr.splice(0, 1);
    }
    vwap = vwap_arr[vwap_arr.length - 1]
    vwap_up = vwap_up_arr[vwap_arr.length - 1]
    vwap_dw = vwap_dw_arr[vwap_arr.length - 1]
    //Log("log vwap " + vwap, "log vwap_up " + vwap_up, "log vwap_dw " + vwap_dw)
}

// 画线
function PlotMA_Kline(records, isFirst) {
    $.PlotRecords(records, "K")
    if (isFirst) {
        for (var i = records.length - 1; i >= 0; i--) {
            if (vwap_arr[i] !== null) {
                $.PlotLine("vwap", vwap_arr[i], records[i].Time)
                $.PlotLine("vwap_up", vwap_up_arr[i], records[i].Time)
                $.PlotLine("vwap_dw", vwap_dw_arr[i], records[i].Time)
            }
        }
        PreBarTime = records[records.length - 1].Time
    } else {
        if (PreBarTime !== records[records.length - 1].Time) {
            $.PlotLine("vwap", vwap_arr[vwap_arr.length - 2], records[records.length - 2].Time)
            $.PlotLine("vwap_up", vwap_up_arr[vwap_up_arr.length - 2], records[records.length - 2].Time)
            $.PlotLine("vwap_dw", vwap_dw_arr[vwap_dw_arr.length - 2], records[records.length - 2].Time)
            PreBarTime = records[records.length - 1].Time
        }
        $.PlotLine("vwap", vwap_arr[vwap_arr.length - 1], records[records.length - 1].Time)
        $.PlotLine("vwap_up", vwap_up_arr[vwap_up_arr.length - 1], records[records.length - 1].Time)
        $.PlotLine("vwap_dw", vwap_dw_arr[vwap_dw_arr.length - 1], records[records.length - 1].Time)
    }
}

// 封装下单, 多, 空 Bybit
// 定义Buy
function buy(Price, Amount, dec) {
    exchange.SetDirection("buy");
    var orderId = null;
    orderId = exchange.Buy(Price, Amount, dec, '@');
    while (!orderId && typeof(orderId) != "undefined" && orderId != 0) {
        Log(orderId);
        Sleep(100);
        orderId = exchange.Buy(Price, Amount, dec, '@');

    }
    return orderId;
}

// 定义Sell
function sell(Price, Amount, dec) {
    exchange.SetDirection("sell");
    var orderId = null;
    orderId = exchange.Sell(Price, Amount, dec, '@');
    while (!orderId && typeof(orderId) != "undefined" && orderId != 0) {
        Log(orderId);
        Sleep(100);
        orderId = exchange.Sell(Price, Amount, dec, '@');

    }
    return orderId;
}

// 账户信息
function AccountInfo() {
    // 资产信息表
    var AccountTab = {
        type: "table",
        title: "资产信息",
        cols: ["仓位", "持仓方向", "持仓均价", "当前价格", "爆仓点位", "杠杆倍数", "仓位盈亏", "起始资产值", "总资产", "净资产", "总盈亏"],
        rows: [],
    }
    AccountTab.rows.push([account.Info.result[0].size, CW, account.Info.result[0].entry_price, ticker.Last, account.Info.result[0].liq_price, account.Info.result[0].leverage, account.Info.result[0].unrealised_pnl, start_balance, account.Info.result[0].wallet_balance, jzc, pt])
    LogStatus(_D() + '   STATUS: ' + CW + '\n' +
        '总计可下单量(*杠杆): ' + yue + '\n' +
        'index: ' + index + '\n' +
        'VWAP: ' + vwap + '\n' +
        'VWAP_UP: ' + vwap_up + '\n' +
        'VWAP_DW: ' + vwap_dw + '\n' +
        'N: ' + records.length + '\n' +
        'WX: wangxiaoba' + '\n' +
        '`' + JSON.stringify([AccountTab]) + '`' + '\n');
}

// 状态判断
function Status() {
    if (account.Info.result[0].side === "Buy") {
        status = PD_LONG;
        CW = "LONG";
    } else if (account.Info.result[0].side === "Sell") {
        status = PD_SHORT;
        CW = "SHORT";
    } else {
        status = idle;
        CW = "IDLE";
    }
}

// 追踪止盈 初始%, 追踪U
function TP() {
    var TP_first_long = account.Info.result[0].entry_price + take_profit
    var TP_trailing_long = TP_HH - trailing_profit
    var TP_first_short = account.Info.result[0].entry_price - take_profit
    var TP_trailing_short = TP_LL + trailing_profit
    // 当多仓时, 现价大于开仓+初始止赢价 -> 触发追踪止盈 
    if ((status === PD_LONG) && (ticker.Last > TP_first_long)) {
        // Log('当多仓时, 现价大于开仓+初始止赢价 -> 触发追踪止盈', TP_HH)
        TP_status = true
        // 触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最大价格更新为现价
        if (TP_status === true && TP_HH == 0) {
            Log('触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最大价格更新为现价', TP_HH)
            TP_HH = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最大价格, 现价大于开仓后最大价格 -> 开仓后最大价格更新为现价
        else if (TP_status === true && TP_HH != 0 && ticker.Last > TP_HH) {
            Log('触发追踪止盈, 已有开仓后最大价格, 现价大于开仓后最大价格 -> 开仓后最大价格更新为现价', TP_HH)
            TP_HH = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最大价格, 现价小于 (开仓后最大价格减 - 回撤USD) -> 开空平仓止盈
        else if (TP_status === true && TP_HH != 0 && ticker.Last < TP_trailing_long) {
            Log('触发追踪止盈, 已有开仓后最大价格, 现价小于 (开仓后最大价格减 - 回撤USD) -> 开空平仓止盈', TP_HH)
            sell(-1, account.Info.result[0].size, "在" + ticker.Last + "止赢平多仓!! 开仓价格: " + account.Info.result[0].entry_price + "数量: " + account.Info.result[0].size)
            status = idle
            $.PlotFlag(new Date().getTime(), 'Close_Long', 'PT_L')
            TP_status = false
            TP_HH = 0
            LogProfit(pt, pt * ticker.Last)
        }
    }
    // 当空仓时, 现价小于开仓-初始止赢价 -> 触发追踪止盈
    else if ((status === PD_SHORT) && (ticker.Last < TP_first_short)) {
        // Log('当空仓时, 现价小于开仓-初始止赢价 -> 触发追踪止盈', TP_LL)
        TP_status = true
        // 触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最小价格更新为现价
        if (TP_status === true && TP_LL == 0) {
            Log('触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最小价格更新为现价', TP_LL)
            TP_LL = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最小价格, 现价小于开仓后最小价格 -> 开仓后最小价格更新为现价
        else if (TP_status === true && TP_LL != 0 && ticker.Last < TP_LL) {
            Log('触发追踪止盈, 已有开仓后最小价格, 现价小于开仓后最小价格 -> 开仓后最小价格更新为现价', TP_LL)
            TP_LL = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最小价格, 现价大于 (开仓后最小价格减 + 回撤USD) -> 开多平仓止盈
        else if (TP_status === true && TP_LL != 0 && ticker.Last > TP_trailing_short) {
            Log('触发追踪止盈, 已有开仓后最小价格, 现价大于 (开仓后最小价格减 + 回撤USD) -> 开多平仓止盈', TP_LL)
            buy(-1, account.Info.result[0].size, "在" + ticker.Last + "止赢平空仓!! 开仓价格: " + account.Info.result[0].entry_price + "数量: " + account.Info.result[0].size)
            status = idle
            $.PlotFlag(new Date().getTime(), 'Close_Short', 'PT_S')
            TP_status = false
            TP_LL = 0
            LogProfit(pt, pt * ticker.Last)
        }
    }
}

// 止损 %
function Stoploss() {
    // 当多仓时, 现价小于开仓-止损价, 做空平多
    if ((status === PD_LONG) && (ticker.Last < account.Info.result[0].entry_price - (ticker.Last * stop_loss / 100))) {
        Log('当多仓时, 现价小于开仓-止损价, 做空平多')
        sell(-1, account.Info.result[0].size, "在" + ticker.Last + "止损平多仓!! 开仓价格: " + account.Info.result[0].entry_price + " 数量: " + account.Info.result[0].size)
        status = idle
        isstoploss = true
        $.PlotFlag(new Date().getTime(), 'Close_Long', 'ST_L')
        LogProfit(pt, pt * ticker.Last)
    }
    // 当空仓时, 现价大于开仓+止损价, 做多平空
    else if ((status === PD_SHORT) && (ticker.Last > account.Info.result[0].entry_price + (ticker.Last * stop_loss / 100))) {
        Log('当空仓时, 现价大于开仓+止损价, 做多平空')
        buy(-1, account.Info.result[0].size, "在" + ticker.Last + "止损平空仓!! 开仓价格: " + account.Info.result[0].entry_price + " 数量: " + account.Info.result[0].size)
        status = idle
        isstoploss = true
        $.PlotFlag(new Date().getTime(), 'Close_Short', 'ST_S')
        LogProfit(pt, pt * ticker.Last)
    }
}

function AtrIndex() {
    if (records && records.length > 14) {
        var atr = TA.ATR(records, 14)
    }
    if (atr && atr.length > 20) {
        var eamatr = TA.EMA(atr, 20)
        // Log(eamatr[eamatr.length - 1])
    }
    if (eamatr){
        var temp = 0
        for(var i=0; i<eamatr.length; i++){
            temp += atr[atr.length - 1]/eamatr[eamatr.length - 1]
        }
    }
    index = _N((temp/eamatr.length), 4)
}


// 计算收益
function PT_log() {
    time = new Date().getTime();
    if (time >= (timep + 7200000)) {
        LogProfit(pt, pt * ticker.Last);
        timep = time;
    }
}


function main() {
    // 初始化参数 
    PreBarTime = 0
    isFirst = true
    exchange.SetMarginLevel(GG)
    exchange.SetContractType('swap');
    _CDelay(100);
    idle = -1;
    status = idle;
    CW = 0;
    timep = 0;
    TP_status = false // 是否触发追踪止盈 
    TP_HH = 0
    TP_LL = 0
    isstoploss = false
    index = 0
    // WS 配置
    var param = {
        "op": "subscribe",
        "args": "liquidation"
    }
    var client = Dial("wss://www.bitmex.com/realtime|reconnect=true&payload=" + JSON.stringify(param), 3800)
    client.write('{"op": "subscribe", "args": "liquidation"}')
    while (1) {
        // 定义基本信息
        account = _C(exchange.GetAccount)
        records_5m = _C(exchange.GetRecords, PERIOD_M5)
        records = _C(exchange.GetRecords, PERIOD_M1)
        ticker = _C(exchange.GetTicker)
        yue = account.Info.result[0].wallet_balance * ticker.Last * GG; // 总可开仓量 (钱包币 x 最新价格 x 杠杆倍数)
        jzc = account.Info.result[0].wallet_balance + account.Info.result[0].unrealised_pnl; // 净资产量 (总资产 - 未结盈亏)
        pt = jzc - start_balance; // 盈利 (净资产 - 初始币量)
        //Log('初始化')
        // 状态判断
        Status()
        //Log('状态判断')
        // 权限验证
        // user_auth()
        //Log('权限验证')
        // 封装指标, 并画K线
        AtrIndex()
        VWAP()
        //Log('指标封装')
        if (records) {
            PlotMA_Kline(records_5m, isFirst)
            //Log('画线')
            isFirst = false
        }
        // 读取WS消息
        bitmexData = client.read(-1)
        obj = null
        //Log('读取WS消息')
        if (bitmexData) {
            obj = JSON.parse(bitmexData)
            //Log('bitmex liquidation Data ', obj)
        }
        //Log('读取WS消息完毕')
        // 下单逻辑!
        // 判断交易对, 及清算值 (BTC>100000, ETH>7500 , EOS?? , XRP??) {"table":"liquidation","action":"insert","data":[{"orderID":"77e987c5-03c2-814e-0fb3-5632f9438f31","symbol":"XBTUSD","side":"Buy","price":9938,"leavesQty":32618}]}
        // 交易对
        if (obj) {
            if (obj.table == "liquidation" && obj.action == "insert" && obj.data[0].symbol == "XBTUSD") {
                // Log('判断交易对')
                // 方向和大小
                // 当清算方向为Buy, 清算量大于10W, 最新价格大于vwap上界时, 小于最大开仓量!! 做空
                if (obj.data[0].side == "Buy" && obj.data[0].leavesQty > 250000 && ticker.Last > vwap_up && account.Info.result[0].size < maxPosition) {
                    Log('判断大小方向, 空')
                    sell(-1, short_qty, "在" + ticker.Last + "- 做空 " + short_qty + "|")
                    $.PlotFlag(new Date().getTime(), 'Sell', 'SK')
                }
                // 当清算方向为Sell, 清算量大于10W, 最新价格小于vwap下界时, 小于最大开仓量!! 做多
                else if (obj.data[0].side == "Sell" && obj.data[0].leavesQty > 250000 && ticker.Last < vwap_dw && account.Info.result[0].size < maxPosition) {
                    Log('判断大小方向, 多')
                    buy(-1, long_qty, "在" + ticker.Last + "- 做多 " + long_qty + "|")
                    $.PlotFlag(new Date().getTime(), 'Buy', 'BK')
                }
            }
        }
        // 止损 
        Stoploss()
        if (isstoploss === true) {
            Log("触发止损, 止损后暂停!! " + stop_step + "s!!!")
            AccountInfo()
            Sleep(stop_step * 1000)
            isstoploss = false
        }
        //Log('止损')
        // 追踪止盈
        TP()
        //Log('追踪止盈')
        // 账户信息更新
        AccountInfo()
        // 间隔时间
        //Log('间隔时间')
        Sleep(600);
    }
}
```

> Detail

https://www.fmz.com/strategy/182656

> Last Modified

2021-01-29 10:44:37
