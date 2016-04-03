/*
策略出处: https://www.botvs.com/strategy/653
策略名称: 短信通知接口测试
策略作者: Zero
策略描述:

短信通知接口测试, 请到支持api的短信平台注册账户(推荐短信宝), 然后把发送的URL输入到接口里
比如 http://www.xxxx.com/sms.php?phone=1111111&c={BODY}
测试能不能手到短信


参数      默认值      描述
------  -------  -----
SMSAPI  http://  短信接口
Msg     你好，测试成功  发送的信息
*/

function main() {
    if (SMSAPI.length > 10 && SMSAPI.indexOf('http') == 0 && SMSAPI.indexOf('{BODY}') != -1) {
        Log('发送: ', Msg);
        HttpQuery(SMSAPI.replace('{BODY}', encodeURIComponent(Msg)));
        Log('发送完成, 请检测是否收到短信');
    } else {
        Log('参数配置错误, 请重新检测短信接口');
    }
}
