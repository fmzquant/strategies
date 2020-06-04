
> 策略名称

【奥克量化】-JS对接FMZ扩展API Demo

> 策略作者

奥克量化





> 源码 (javascript)

``` javascript

var URL = "https://www.fmz.com/api/v1?";
var AK = "b3a53d3XXXXXXXXXXXXXXXXXXX866fe5";//这里替换成你自己的AccessKey
var SK = "1d9ddd7XXXXXXXXXXXXXXXXXXX85be17";//这里替换成你自己的SecretKey

//获取基础5个参数的对象
function getParam(version,ak,args){
    return {
        'version': version,
        'access_key': ak,
        'method': 'GetNodeList',
        'args': JSON.stringify(args),
        'nonce': new Date().getTime()
    }
}

//执行md5加密
function md5(param){
    var paramUrl = param.version+"|"+param.method+"|"+param.args+"|"+param.nonce+"|"+SK
    Log("paramUrl:",paramUrl);
    return Hash("md5", "hex", paramUrl)
}

//获取最终请求URL
function getFinalUrl(param){
    return URL+"access_key="+AK+"&nonce="+param.nonce+"&args="+param.args+"&sign="+param.sign+"&version="+param.version+"&method="+param.method;
}

//js中不支持...args的命名方式，所以改用arguments关键字获取参数数组
function getArgs(){
    return [].slice.call(arguments);
}

function main() {
    //获取5个基础参数对象
    var param = getParam("1.0.0",AK,getArgs());
    Log("param:",param);
    //获取拼接参数md5加密后的结果
    var md5Result = md5(param);
    //赋值加密结果到基础参数对象中
    param.sign = md5Result;
    //获取请求api的URL
    var finalUrl = getFinalUrl(param);
    Log("finalUrl:",finalUrl);
    //执行请求并打印结果
    var info = HttpQuery(finalUrl);
    Log("info:",info);
}
```

> 策略出处

https://www.fmz.com/strategy/208065

> 更新时间

2020-05-16 21:35:13
