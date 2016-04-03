/*
策略出处: https://www.botvs.com/strategy/885
策略名称: 价格波动报警
策略作者: Zero
策略描述:

程序监视指定周期内价格波动幅度，如果超过指定幅度, 就短信通知给指定手机用户, 使用短信宝接口，可以发送给多个手机号, 以逗号分开
周期请选择K线周期, K线周期为1分钟则为监视一分钟内的数据


参数            默认值    描述
------------  -----  ---------
MaxRatio      1.5    波动幅度(百分比)
LoopInterval  5      采集间隔(秒)
EnableSMS     true   开启短信通知
SMSUser       test   短信宝用户名
SMSPass       test   短信宝密码MD5
PhoneNum      111    通知手机号
*/

function _N(v) {
    return Math.floor(parseFloat(v.toFixed(10))*1000)/1000;
}

var LastMsg = "";
function SMSSend(msg) {
    if (msg == LastMsg) {
        return;
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

function formatDate(t) {
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var day = t.getDate();
    var hour = t.getHours();
    var minute = t.getMinutes();
    var second = t.getSeconds();

    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function main() {
    if (exchanges.length > 1) {
        throw "只支持一个交易所";
    }
    LoopInterval = Math.max(1, LoopInterval);
    Log('浮动百分比将显示为收益, 超过' + MaxRatio + '% 后报警');
    if (EnableSMS && !SMSSend('预警策略启动成功')) {
        throw "短信接口测试失败";
    }
    var preRatio = 0;
    var preKRatio = 0;
    while (true) {
        var records = exchange.GetRecords();
        if (records && records.length > 0) {
            var r = records[records.length-1];
            var n = _N(((r.High - r.Low) * 100) / r.High);
            
            if (records.length > 1) {
                var p = records[records.length-2];
                var pn = _N(((p.High - p.Low) * 100) / p.High);
                if (pn != preKRatio) {
                    preKRatio = pn;
                    if (pn != preRatio) {
                        LogProfit(pn, 'Time:', formatDate(new Date(p.Time)), 'High:', p.High.toFixed(4), 'Low:', p.Low.toFixed(4));
                        if (EnableSMS && n >= MaxRatio) {
                            SMSSend('当前浮动比: ' + n + '%');
                        }
                    }
                }
            }
            if (n != preRatio) {
                LogProfit(n, 'Time:', formatDate(new Date(r.Time)), 'High:', r.High.toFixed(4), 'Low:', r.Low.toFixed(4));
                preRatio = n;
                if (EnableSMS && n >= MaxRatio) {
                    SMSSend('当前浮动比: ' + n + '%');
                }
            }
        }
        Sleep(LoopInterval * 1000);
    }
}
