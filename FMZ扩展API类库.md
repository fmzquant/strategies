
> Name

FMZ扩展API类库

> Author

ChaoZhang

> Strategy Description

来自奥总的文章<<奥克手把手教你用JS对接FMZ扩展API>>
https://www.fmz.com/digest-topic/5631

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|AccessKey|111|AccessKey|
|SecretKey|222|SecretKey|


> Source (javascript)

``` javascript
var URL = "https://www.fmz.com/api/v1?";
function GetUrl(method, dateInfo) {
	var param = getParam("1.0.0", AccessKey, method, dateInfo);
	//Log("param:",param);
	//获取拼接参数md5加密后的结果
	var md5Result = md5(param);
	//赋值加密结果到基础参数对象中
	param.sign = md5Result;
	//获取请求api的URL
	return getFinalUrl(param);
}
//通过参数获取API信息
$.getAPIInfo = function (method, dateInfo) {
	var info;
	while (true) {
        try {
		info = HttpQuery(GetUrl(method, dateInfo));
		if (!info && info.indexOf("result") == -1) {
			Log("info错误", info,method,dateInfo);
			Sleep(2000);
		} else {
			break;
		}
        } catch (error) {
           Log(error.massage)
        }

	}

	return JSON.parse(info);
}

//获取基础5个参数的对象
function getParam(version, ak, method, args) {
	return {
		version: version,
		access_key: ak,
		method: method,
		args: JSON.stringify(args),
		nonce: new Date().getTime(),
	};
}

//执行md5加密
function md5(param) {
	var paramUrl = param.version + "|" + param.method + "|" + param.args + "|" + param.nonce + "|" + SecretKey;
	//Log("paramUrl:",paramUrl);
	return Hash("md5", "hex", paramUrl);
}

//获取最终请求URL
function getFinalUrl(param) {
    //Log(param)
	return URL + "access_key=" + AccessKey + "&nonce=" + param.nonce + "&args=" + param.args + "&sign=" + param.sign + "&version=" + param.version + "&method=" + param.method;
}

//js中不支持...args的命名方式，所以改用arguments关键字获取参数数组
$.getArgs = function () {
	return [].slice.call(arguments);
}
function init(){
    //Log("mode")
    if (AccessKey == "" || SecretKey == "") {
        throw "AccessKey或者SecretKey不能为空";
    }
    
    //let robotId = _G();
    //$.getAPIInfo("CommandRobot",$.getArgs(robotId,"coverAll"))
}
$.AccessKey = AccessKey;
$.SecretKey = SecretKey;


```

> Detail

https://www.fmz.com/strategy/318271

> Last Modified

2022-09-09 20:04:34
