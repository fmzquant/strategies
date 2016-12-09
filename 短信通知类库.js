/*
策略出处: https://www.botvs.com/strategy/26921
策略名称: 短信通知类库
策略作者: Zero
策略描述:

> 支持网关

*  短信宝 http://www.smsbao.com/
* SUBMAIL http://submail.cn/

> 例子

```
$.SMSNotify("abc 短信测试");
```


参数              默认值                    描述
--------------  ---------------------  -----------------
PhoneNum        138XXXXXXXX            手机号
SMSGate         0                      短信网关: 短信宝|SUBMAIL
SMSBaoUserName  username               用户名
SMSBaoPWD       $$$__enc__$$$password  密码
AppId           11111                  APPID
AppKey          $$$__enc__$$$11111     APPKEY
VarName         content                变量名称
Project         5x1X03                 项目标记
*/

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
