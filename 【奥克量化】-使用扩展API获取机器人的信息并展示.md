
> 策略名称

【奥克量化】-使用扩展API获取机器人的信息并展示

> 策略作者

奥克量化





> 源码 (javascript)

``` javascript


var URL = "https://www.fmz.com/api/v1?";
var AK = "b3a53d3XXXXXXXXXXXXXXXXXXX866fe5";//这里替换成你自己的AccessKey
var SK = "1d9ddd7XXXXXXXXXXXXXXXXXXX85be17";//这里替换成你自己的SecretKey
var OFF_SET = 0;//查询的页码下标
var PAGE_LENGTH = 5;//查询页的数据长度

function main() {
    LogReset();
    while(true){
        //获取机器人列表信息
        var robotListJson = getAPIInfo('GetRobotList',getArgs(OFF_SET,PAGE_LENGTH,-1));
        //取出机器人列表信息
        var robotList = robotListJson.data.result.robots;
        //创建展示机器人信息的数组
        var infoArr = new Array();
        var infoArr_index = 0;
        for (index = 0; index < robotList.length; index++) {
            var robot = robotList[index];
            //取出当前循环到的机器人ID
            var robotId = robot.id;
            //获取机器人详情信息
            var robotDetailJson = getAPIInfo('GetRobotDetail',getArgs(robotId));
            var robotDetail = robotDetailJson.data.result.robot;
            //转换详情为数组对象
            var arr = getLogPrientItem(robotDetail);
            infoArr[infoArr_index] = arr;
            infoArr_index++;
        }
        Log("infoArr:",infoArr);
        LogStatus('`' + JSON.stringify(getLogPrient(infoArr)) + '`');
        Sleep(30000);
    }
}

function getLogPrient(infoArr){
    return table = {
            type: 'table',
            title: '奥克量化的机器人展示',
            cols: ['机器人ID','机器人名称','策略名称','下次扣费时间','已经消耗时间ms','已经消耗金额CNY','最近活跃时间','是否公开'],
            rows: infoArr
        };
}

//通过参数获取API信息
function getAPIInfo(method,dateInfo){
    //获取5个基础参数对象
    var param = getParam("1.0.0",AK,method,dateInfo);
    //Log("param:",param);
    //获取拼接参数md5加密后的结果
    var md5Result = md5(param);
    //赋值加密结果到基础参数对象中
    param.sign = md5Result;
    //获取请求api的URL
    var finalUrl = getFinalUrl(param);
    //Log("finalUrl:",finalUrl);
    //执行请求并打印结果
    var info = HttpQuery(finalUrl);
    //Log("info:",info);
    return JSON.parse(info);
}

//获取基础5个参数的对象
function getParam(version,ak,method,args){
    return {
        'version': version,
        'access_key': ak,
        'method': method,
        'args': JSON.stringify(args),
        'nonce': new Date().getTime()
    }
}

//执行md5加密
function md5(param){
    var paramUrl = param.version+"|"+param.method+"|"+param.args+"|"+param.nonce+"|"+SK
    //Log("paramUrl:",paramUrl);
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

//获取展示详情对象'机器人ID','机器人名称','策略名称','下次扣费时间','已经消耗时间ms','已经消耗金额CNY','最近活跃时间','是否公开'],
function getLogPrientItem(robotDetail){
    var itemArr = new Array();
    var iteArr_index = 0;
    itemArr[iteArr_index++] = robotDetail.id;
    itemArr[iteArr_index++] = robotDetail.name;
    itemArr[iteArr_index++] = robotDetail.strategy_name;
    itemArr[iteArr_index++] = robotDetail.charge_time;
    itemArr[iteArr_index++] = robotDetail.charged;
    itemArr[iteArr_index++] = robotDetail.consumed/1e8;
    itemArr[iteArr_index++] = robotDetail.refresh;
    itemArr[iteArr_index++] = robotDetail.public == 0?"已公开":"未公开";
    return itemArr;
}

```

> 策略出处

https://www.fmz.com/strategy/208526

> 更新时间

2020-05-18 21:28:05
