
> 策略名称

CTA策略之商品期货定时启停机器人

> 策略作者

程文

> 策略描述

### 一、摘要
众所周知由于商品期货交易时间规则限制，白天只有4个小时的交易时间，夜盘只有2~4个小时的交易时间，再加上某些品种还没有夜盘交易时间，综合下来平均一天只有6个小时的交易时间。如果使用发明者量化机器人24小时不停运行策略，则有一半多的时间是在无谓的消耗。所以很多人定个闹钟来启动和停止机器人，但这么做并不能保证每次的准时，而且每次需要登录网页并不方便。本篇就创建一个管理机器人的机器人教大家如何四折使用发明者量化。

### 二、判断商品期货交易所是否开市
由于商品期货除了周六周末闭市外，在国家法定节假日也会闭市，所以在日期的选择上有不确定性。那么折中的办法是：结合当前热门合约的成交量变动情况，就可以判断当前是否开市。如果当前热门合约的成交量一直在累加，则说明交易所处于开市状态；如果当前热门合约的成交量不动，则说明交易所处于闭市状态。如下面的代码：
```
function isTrading() {
    let records = exchange.GetRecords();
    if (!records) return;
    let newVolume = records[records.length - 1].Volume;
    if (newVolume == lastVolume) {
        return;
    } else if (lastVolume == 0) {
        lastVolume = newVolume;
        return;
    }
    lastVolume = newVolume;
    return true;
}
```

### 三、停止和启动机器人命令
在发明者量化的扩展API中，可以使用StopRobot()函数来停止正在运行的机器人，使用RestartRobot()函数来启动已经停止的机器人，但是在这之前需要请求 https://www.fmz.cn/api/v1? URL，以及对“secretKey”和“accessKey”进行md5加密操作，才能调用StopRobot()函数和RestartRobot()。如下面的代码：
```
// 获取参数对象
function getParam(version, ak, method, args){
    return {
        'version': version,
        'access_key': ak,
        'method': method,
        'args': JSON.stringify(args),
        'nonce': new Date().getTime()
    }
}

// md5加密
function md5(param){
    let paramUrl = param.version + "|" + param.method + "|" + param.args + "|" + param.nonce + "|" + secretKey
    return Hash("md5", "hex", paramUrl);
}

// 获取请求URL
function getFinalUrl(param){
    let url = "https://www.fmz.cn/api/v1?";
    return url + "access_key=" + accessKey + "&nonce=" + param.nonce + "&args=" + param.args + "&sign=" + param.sign + "&version=" + param.version + "&method=" + param.method;
}

// 获取API信息
function getAPIInfo(method, dateInfo){
    let param = getParam("1.0.0", accessKey, method, dateInfo);
    let md5Result = md5(param);
    param.sign = md5Result;
    let finalUrl = getFinalUrl(param);
    let info = HttpQuery(finalUrl);
    return JSON.parse(info);
}

// 用arguments关键字获取参数数组
function getArgs(){
    return [].slice.call(arguments);
}
```
*注：以上是本策略的简单原理和核心代码，无需再做修改即可使用。*

### 四、如何使用
**第1步：申请发明者量化API**
打开该链接 https://www.fmz.cn/m/account 选择API接口标签，然后点击右上方创建新的ApiKey，默认“*”号即开启了所有权限。创建完毕后页面就会显示“AccessKey”和“SecretKey”。
 ![IMG](https://www.fmz.com/upload/asset/392128f2c5b1c594fa4b.png) 
 ![IMG](https://www.fmz.com/upload/asset/395b15cbbd30c4215a98.png) 

**第2步：修改策略中的全局变量**
该策略一共有4个可以修改的全局变量，分别是：secretKey、accessKey、botId、code。其中secretKey和accessKey变量需要修改为刚才申请发明者量化API“AccessKey”和“SecretKey”，注意是字符串类型。全局变量botId则是指定的机器人ID号，数字类型。全局变量code则是热门合约，可以设置为：中金所的“IF000”、上期所的“rb000”、大商所的“i000”、郑商所的“RM000”等等。如下面的代码：
```
var secretKey = "f88b07cbf2023937aa8a4894702e0a09";
var accessKey = "ddbbeaf65a8a4fc9cc12c405aa3b247e";
var botId = 266250;
var code = 'rb000';
```

### 五、实盘应用
在实盘应用中，就像创建常规机器人一样部署即可。如下图所示：名字为“CTA策略之商品期货定时启停机器人”机器人管理者ID为266250的机器人。
 ![IMG](https://www.fmz.com/upload/asset/39cc741848b22360f1aa.png) 
 ![IMG](https://www.fmz.com/upload/asset/3a5bbbd0f9f9a1e341f2.jpg) 

### 六、总结
作为抛砖引玉，本篇文章管理机器人策略只能管理一个机器人，不过相信你通读策略代码后，可以对该策略进行升级改进，可以升级为管理多个机器人，以及对发明者量化策略、托管者等诸多功能加以扩充，具体可以参考 https://www.fmz.cn/api#FMZ平台扩展API 。



> 源码 (javascript)

``` javascript
// 设置全局变量参数
var secretKey = "f88b07cbf2023937aa8a4894702e0a09";
var accessKey = "ddbbeaf65a8a4fc9cc12c405aa3b247e";
var botId = 266250;
var code = 'rb000';

// 固定参数
var lastVolume = 0;

// 获取参数对象
function getParam(version, ak, method, args){
    return {
        'version': version,
        'access_key': ak,
        'method': method,
        'args': JSON.stringify(args),
        'nonce': new Date().getTime()
    }
}

// md5加密
function md5(param){
    let paramUrl = param.version + "|" + param.method + "|" + param.args + "|" + param.nonce + "|" + secretKey
    return Hash("md5", "hex", paramUrl);
}

// 获取请求URL
function getFinalUrl(param){
    let url = "https://www.fmz.com/api/v1?";
    return url + "access_key=" + accessKey + "&nonce=" + param.nonce + "&args=" + param.args + "&sign=" + param.sign + "&version=" + param.version + "&method=" + param.method;
}

// 获取API信息
function getAPIInfo(method, dateInfo){
    let param = getParam("1.0.0", accessKey, method, dateInfo);
    let md5Result = md5(param);
    param.sign = md5Result;
    let finalUrl = getFinalUrl(param);
    let info = HttpQuery(finalUrl);
    return JSON.parse(info);
}

// 用arguments关键字获取参数数组
function getArgs(){
    return [].slice.call(arguments);
}

// 根据合约成交量判断是否开市
function isTrading() {
    let records = _C(exchange.GetRecords);
    let newVolume = records[records.length - 1].Volume;
    if (newVolume == lastVolume) {
        return;
    } else if (lastVolume == 0) {
        lastVolume = newVolume;
        return;
    }
    lastVolume = newVolume;
    return true;
}

// 策略入口函数
function main() {
    SetErrorFilter('not login');
    while (true) {
        if (!exchange.IO("status")) {
            Sleep(10000);
            continue;
        }
        if (exchange.SetContractType(code)) break;
    }
    while (true) {
        let info = getAPIInfo('GetRobotDetail', getArgs(botId));
        if (isTrading()) {
            if (info.data.result.robot.status == 4) {
                getAPIInfo('RestartRobot', getArgs(botId));
                Log('启动策略')
            }
        } else {
            if (info.data.result.robot.status == 1) {
                getAPIInfo('StopRobot', getArgs(botId));
                Log('停止策略')
            }
        }
        Sleep(10000);
    }
}


```

> 策略出处

https://www.fmz.com/strategy/327556

> 更新时间

2021-11-03 10:49:23
