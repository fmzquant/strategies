
> Name

Net-Asset-Change-Tracker-20

> Author

中本姜

> Strategy Description

Notes
- This strategy evolved from https://www.fmz.com/strategy/5349 and is mainly used to calculate changes in net account income when borrowed coins are involved.
- Net asset change: tracks changes in the account's net asset value.
- The status bar displays the following information:
   - Initial net assets / initial net cash / initial net coins: shows the starting net assets and the initial cash/coin balances.
   - Current net assets / current net cash / current net coins: shown in red when the strategy is net long and in green when it is net short.
   - Net asset change / total return / monthly return / maximum drawdown: shown in red when net assets rise versus the previous reading and in green when they fall.
   - Borrowed cash / borrowed cash interest
   - Borrowed coins / borrowed coin interest
- `@time`: sends a notification every `time` hours with monthly return, net cash, net coins, borrowed coins, and currently accrued interest. A positive net coin balance means the strategy is net long, and a negative balance means it is net short.
- `@shuaxintime`: sends a notification every `shuaxintime` minutes with the current net asset change.
- `@profit_base`: initial net asset change value.
- `@borrow_bi`: initial total borrowed coins.
- `@interest_bi_base`: total borrowed-coin interest owed at the start.
- `@interest_bi`: borrowed-coin daily interest rate, default `0.001`.

- TODO
Directly read the borrowing information to calculate net asset changes.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|time|true|Notification interval (hours)|
|shuaxintime|30|Refresh interval (minutes)|
|profit_base|false|Initial net-asset change value|
|borrow_bi|false|Borrowed coin amount|
|interest_bi_base|false|Currently owed borrowed-coin interest|
|interest_bi|0.001|Daily borrowed-coin interest rate|
|borrow_qian|false|Borrowed cash amount|
|interest_qian|0.001|Daily borrowed-cash interest rate|
|interest_qian_base|false|Currently owed borrowed-cash interest|
|log_reset|false|Log reset|


> Source (javascript)

``` javascript
function EnsureCall(e, method) {
    var r;
    while (!(r = e[method].apply(this, Array.prototype.slice.call(arguments).slice(2)))) {
        Sleep(1500);
    }
    return r;
}

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function main() {
    SetErrorFilter("502:|503:|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF");
    var zhouqi = time * 3600000;
    var shuaxin = shuaxintime * 60000;
    var time0 = new Date().getTime();
    var time_mail = time0 + zhouqi - 5000;
    var time1 = time0 + shuaxin - 5000;
    var accounts = new Array([exchanges.length]);
    var tickers = new Array([exchanges.length]);
    var qian = [0, 0];
    var bi = [0, 0];
    var bi_money = [0, 0];
    var pnow = 0;
    var profit = profit_base;
    var vv = 0;
    var lv = profit;
    var msg = "暂时没有数据";
    var n = 0;
    var history = 0;
    var last_history = 0;
    var max_history = 0;
    var min_history = 0;
    var max_down = 0;
    
    var net_msg = 0;
    var profit_msg = 0;
    var bi_interest_msg = 0;
    var qian_interest_msg = 0;
    var init_profit_msg = 0;
    var status_log= 0;
    var red_color = "#ff0000";
    var green_color = "#006600";
    
    
    exchanges[0].SetLimit(1000);
    accounts[0] = EnsureCall(exchanges[0], "GetAccount");
    Sleep(2000);
    tickers[0] = EnsureCall(exchanges[0], "GetTicker");
    Sleep(2000);
    if (log_reset) {
        LogProfitReset(); 
    }
    qian[0] = accounts[0].Balance + accounts[0].FrozenBalance - borrow_qian - interest_qian_base;
    bi[0] = accounts[0].Stocks + accounts[0].FrozenStocks - borrow_bi - interest_bi_base;
    bi_money[0] = bi[0] * tickers[0].Last;
    net0 = qian[0] + bi_money[0];
    msg = "初始净资产 / 初始净钱 / 初始净币：" + net0 + " / " + qian[0] + " / " + bi[0] + "@";
    init_profit_msg = "初始净资产 / 初始净钱 / 初始净币：" + net0 + " / " + qian[0] + " / " + bi[0];
    LogProfit(lv, msg);
    LogStatus(msg);
    LogProfit(lv, "所有账户初始数据已处理完毕，等待通知……@");
    while (true) {
        if (new Date().getTime() > time1) {
            vv = profit;
            qian[1] = 0;
            bi[1] = 0;
            bi_money[1] = 0;
            profit = profit_base;
            lv = 0;
            exchanges[0].SetLimit(1000);
            accounts[0] = EnsureCall(exchanges[0], "GetAccount");
            Sleep(2000);
            tickers[0] = EnsureCall(exchanges[0], "GetTicker");
            Sleep(2000);
            qian[1] += accounts[0].Balance + accounts[0].FrozenBalance;
            interest_qian_all = interest_qian_base + borrow_qian * interest_qian * (new Date().getTime() - time0) / 86400000;
            borrow_qian_all = borrow_qian + interest_qian_all;
            qian[1] = qian[1] - borrow_qian_all;
            bi[1] = accounts[0].Stocks + accounts[0].FrozenStocks;
            interest_bi_all = interest_bi_base + borrow_bi * interest_bi * (new Date().getTime() - time0) / 86400000;
            borrow_bi_all = borrow_bi + interest_bi_all;
            bi[1] = bi[1] - borrow_bi_all;
            bi_money[1] = bi[1] * tickers[0].Last;
            profit += qian[1] + bi_money[1] - net0;
            lv = adjustFloat(profit * 259200000000 / ((net0) * (new Date().getTime() - time0)));
            history = Math.round(profit * 1000) / 1000;
            max_history = Math.max(history, max_history);
            if (max_history == history) {
                min_history = max_history;
            }
            min_history = Math.min(history, min_history);
            var present_maxdown = (min_history - max_history) / (max_history + net0) * 100;
            max_down = adjustFloat(Math.min(present_maxdown, max_down));
            var lv_total = adjustFloat(profit / net0 * 100);
            
            net_msg = "当前净资产 / 当前净钱 / 当前净币：" + (qian[1] + bi_money[1]) + " / " + qian[1] + " / " + bi[1];
            if (bi[1] > 0) {
                net_msg += red_color;
            }
            else if (bi[1] < 0) {
                net_msg += green_color;
            }
            profit_msg = "净资产变化 / 总收益 / 月收益 / 最大回撤：" + history + " / " + lv_total + "% / " + lv + "% / " + max_down + "%";
            if (last_history < history) {
                profit_msg += red_color;
            }
            else if (last_history > history) {
                profit_msg += green_color;
            }
            last_history = history;
            qian_interest_msg = "借钱 / 借钱利息：" + borrow_qian + " / " + interest_qian_all;
            bi_interest_msg = "借币 / 借币利息：" + borrow_bi + " / " + interest_bi_all;
            msg = "月收益 / 净钱 / 净币 / 净资产 / 借钱 / 借钱利息 / 借币 / 现在所欠利息：" + lv + " / " + qian[1] + " / " + bi[1] + " / " + (qian[1] + bi_money[1]) + " / " + borrow_qian + " / " + interest_qian_all + " / " + borrow_bi + " / " + interest_bi_all;
            if (new Date().getTime() > time_mail) {
                n += 1;
                LogProfit(history, msg);
                time_mail += zhouqi;
            } else {
                LogProfit(history, "净资产变动");
            }
            time1 += shuaxin;
        }
        Sleep(5000);
        $.Draw();
        status_log = init_profit_msg + "\n" + net_msg + "\n" + profit_msg + "\n" + qian_interest_msg + "\n" + bi_interest_msg;
        LogStatus(status_log);
    }
}
```

> Detail

https://www.fmz.com/strategy/8916

> Last Modified

2016-06-14 09:04:20
