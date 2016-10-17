/*
策略出处: https://www.botvs.com/strategy/16309
策略名称: 这是为什么，请看first_bar 为什么后面的first_bar 变了
策略作者: 青铜战国级机器人
策略描述:

xxx

*/

/* 非常感谢满意沟通的解决方案，对于GetRecords 得到的数据类型来说，数组中的元素依然是类似字典
   元素，是可变对象，slice只是进行了浅拷贝，数组中的元素是索引，而回测是最后一条bar是修改而来，所以造成first_bar也改变了，
   加上deepCopy 能够解决这个问题*/
function deepCopy(Ele) {
    return JSON.parse(JSON.stringify(Ele));
}

function main(){
    var records, fist_bar, sec_bar;
    records = exchange.GetRecords();
    first_bar = deepCopy(records.slice(-1)[0]);
    Log("first_bar:", first_bar);
    Sleep(10000);
    records = exchange.GetRecords();
    sec_bar = deepCopy(records.slice(-1)[0]);
    Log("sec_bar:", sec_bar);
    Log("first_bar:", first_bar); 
}
