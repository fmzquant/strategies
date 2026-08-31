
> Name

BTC-LTC-Address-Monitor-SMS-Notification

> Author

Zero

> Strategy Description

Send an immediate alert whenever a new transaction appears.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Type|0|Type: BTC|LTC|
|Addr|1LuckyY9fRzcJre7aou7ZhWVXktxjjBb9S|Address|
|Interval|3|Polling Interval|
|EnableSMS|false|Enable SMS Notifications|
|SMSUser|***|SMSBao Username|
|SMSPass|***|SMSBao MD5 Password|
|PhoneNum|1111|Phone Number for SMS Alerts|


> Source (javascript)

``` javascript
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
```

> Detail

https://www.fmz.com/strategy/1295

> Last Modified

2014-11-07 19:41:42
