/*
策略出处: https://www.botvs.com/strategy/2006
策略名称: 账户余额变动邮箱提醒, 支持添加多个交易所
策略作者: Zero
策略描述:

检测账户余额的币和钱的变动，并发送到指定邮箱上. 这个不支持回测的
之前飞信短信的, 因为用的人多了，账号被冻结的，不能用短信接口了, 换成邮箱了.


参数            默认值           描述
------------  ------------  ---------------------
LoopInterval  10            检测间隔(秒)
AlertMode     0             提醒方式: 变动提醒|条件报警|最小值报警
MaxDiffCNY    false         钱最小变动数
MaxDiffCoin   false         币最小变动数
MinCoin       false         币最小值
MinCNY        false         钱最小值
SMTPServer    smtp.163.com  SMTP服务器
SMTPUser      test@163.com  发信邮箱(SMTP用户名)
SMTPPass      ***           邮箱密码(SMTP密码)
SendMode      0             收信邮箱: 自己|其它
DstMail       test@163.com  收件人邮箱
*/


function Notify(msg) {
    var ret = Mail(SMTPServer, SMTPUser, SMTPPass, SendMode == 0 ? SMTPUser : DstMail , msg, "余额变动 " + msg);
    if (ret) {
        Log("邮件通知成功");
    } else {
        Log("邮件通知失败");
    }
    Log(ret ? "邮件发送成功" : "邮件发送失败");
    return ret;
}

function GetAccount(print) {
    var all = {
        Balance : 0,
        Stocks  : 0,
    };
    var currency = exchange.GetCurrency();
    for (var i = 0; i < exchanges.length; i++) {
        if (exchanges[i].GetCurrency() != currency) {
            throw "币种不相同";
        }
        var account;
        while (!(account = exchanges[i].GetAccount())) {
            Sleep(1000);
        }
        all.Stocks += (account.Stocks + account.FrozenStocks);
        all.Balance += (account.Balance + account.FrozenBalance);
        if (typeof(print) != 'undefined' && print) {
            Log(exchanges[i].GetName(), "钱: ", (account.Balance + account.FrozenBalance), "币: ", (account.Stocks + account.FrozenStocks));
        }
    }

    return all;
}

function main() {
    // Disable rate auto convert
    exchange.SetRate(1);
    if (Version() < 2.7) {
        throw "只支持2.7或以上版本";
    }
    var preAccount = GetAccount(true);
    if (!Notify("策略启成功, 总钱: " + preAccount.Balance + ", 币: " + preAccount.Stocks)) {
        throw "Exit";
    }
    Log("初始信息: ", "总钱:", preAccount.Balance, "总币:", preAccount.Stocks);
    var alertAlrelady = false;
    while (true) {
        Sleep(LoopInterval * 1000);
        var account = GetAccount();
        if (AlertMode == 2) {
            if ((MinCoin > 0 && account.Stocks < MinCoin) || (MinCNY > 0 && account.Balance < MinCNY)) {
                if (!alertAlrelady) {
                    Log(account);
                    Notify(exchange.GetName() + "资金过少 总钱: " + account.Balance + ", 币: " + account.Stocks);
                    alertAlrelady = true;
                }
            } else {
                alertAlrelady = false;
            }
        } else if (account.Stocks != preAccount.Stocks || account.Balance != preAccount.Balance) {
            if (AlertMode == 0 || (MaxDiffCoin > 0 && Math.abs(account.Stocks - preAccount.Stocks) >= MaxDiffCoin) || (MaxDiffCNY > 0 && Math.abs(account.Balance - preAccount.Balance) >= MaxDiffCNY)) {
                Log(account);
                preAccount = account;
                Notify(exchange.GetName() + "账户变动为 总钱: " + account.Balance + ", 币: " + account.Stocks);
            }
        }
    }
}
