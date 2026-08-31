
> Name

SMS-Notification-Library

> Author

Zero

> Strategy Description
> Supported Gateways

* SMSBao http://www.smsbao.com/
* SUBMAIL http://submail.cn/

> Example

```
$.SMSNotify("abc 短信测试");
```
> Strategy Arguments
|Argument|Default|Description|
|----|----|----|
|PhoneNum|138XXXXXXXX|Phone number|
|SMSGate|0|SMS gateway: SMSBao|SUBMAIL|
|SMSBaoUserName|username|Username|
|SMSBaoPWD|$$$__enc__$$$password|Password|
|AppId|11111|APPID|
|AppKey|$$$__enc__$$$11111|APPKEY|
|VarName|content|Variable name|
|Project|5x1X03|Project identifier|
> Source (javascript)

``` javascript
$.SMSNotify = function(content) {
    if (IsVirtual()) {
        throw "此模板只支持实盘";
    }
    if (SMSGate === 0) {
        var retCode = HttpQuery("http://api.smsbao.com/sms?u="+SMSBaoUserName+"&p="+MD5(SMSBaoPWD)+"&m="+PhoneNum+"&c="+encodeURIComponent(content));
        var retDict = {
            '30': '密码错误',
            '40': '账号不存在',
            '41': '余额不足',
            '42': '帐号过期',
            '43': 'IP地址限制',
            '50': '内容含有敏感词',
            '51': '手机号码不正确'
        };
        if (typeof(retCode) === 'string' && typeof(retDict[retCode]) === 'string') {
            Log('短信通知返回:', retDict[retCode]);
        } else if (retCode === '0') {
            Log('短信通知成功:', content);
        } else {
            Log('短信通知失败:', content, '#ff0000');
        }
    } else if (SMSGate == 1) {
        var vars = {};
        vars[VarName] = content;
        var ret = HttpQuery('https://api.submail.cn/message/xsend.json', 'appid='+AppId+'&to='+PhoneNum+'&project='+Project+'&signature='+AppKey+'&vars='+encodeURIComponent(JSON.stringify(vars)));
        if (ret && ret.indexOf('"status"') != -1) {
            var obj = JSON.parse(ret);
            Log("短信通知:", obj.status, typeof(obj.msg) != 'undefined' ? obj.msg : '');
        } else {
            Log("短信通知失败");
        }
    }
}

function main() {
    $.SMSNotify("abc 短信测试");
}
```

> Detail

https://www.fmz.com/strategy/26921

> Last Modified

2016-12-05 17:31:11
