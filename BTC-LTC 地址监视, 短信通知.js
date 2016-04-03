/*
策略出处: https://www.botvs.com/strategy/1295
策略名称: BTC-LTC 地址监视, 短信通知
策略作者: Zero
策略描述:

有新的交易, 立即提醒


参数         默认值                                 描述
---------  ----------------------------------  -----------
Type       0                                   类型: BTC|LTC
Addr       1LuckyY9fRzcJre7aou7ZhWVXktxjjBb9S  地址
Interval   3                                   轮询间隔
EnableSMS  false                               启动短信通知
SMSUser    ***                                 短信宝用户名
SMSPass    ***                                 短信宝MD5密码
PhoneNum   1111                                接收短信手机号
*/

var LastMsg = "";
function SMSSend(msg) {
    if (msg == LastMsg) {
        return true;
    }
    Log('SMS:', msg);
    LastMsg = msg;
    var ret = false;
    var phones = PhoneNum.split(',');
    for (var i = 0; i < phones.length; i++) {
        ret = HttpQuery("http://www.smsbao.com/sms?u=" + encodeURIComponent(SMSUser) + "&p=" + SMSPass.toUpperCase() + "&m=" + phones[i] + "&c=" + encodeURIComponent(msg)) == "0";
        if (ret) {
            Log("短信通知", phones[i], "成功");
        } else {
            Log("短信通知", phones[i], "失败");
        }
    }
    return ret;
}

function main() {
    var url = "http://open.qukuai.com/address/" + Addr + "?key=2ejf4jgfNoya8Y3GnQf68e4J23HherpUh1&limit=1";
    if (Type == 1) {
        url += "&ltc=true";
    }
    var lt = "";
    Log("监视: ", Addr, Type == 0 ? 'BTC' : 'LTC');
    if (EnableSMS) {
        if (!SMSSend("策略启动成功")) {
            return false;
        }
    }
    while (true) {
        try {
            var res = HttpQuery(url);
            if (res) {
                var obj = JSON.parse(res);
                if (typeof(obj.t0) !='undefined' && obj.t0.length > 0) {
                    if (obj.t0.toString() != lt) {
                        if (lt != "") {
                            LogProfit(obj.balance, obj.received);
                            if (EnableSMS) SMSSend('有新交易, 当前余额: ' + obj.balance/100000000 + '接收总数: ' + obj.received/100000000);
                        }
                        lt = obj.t0.toString();
                    }
                }
            }
        } catch(e) {
            Log(e);
        }
        Sleep(Interval*1000);
    }
}
