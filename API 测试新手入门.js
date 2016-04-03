/*
策略出处: https://www.botvs.com/strategy/4
策略名称: API 测试新手入门
策略作者: Zero
策略描述:

新手入门学习模板


参数         默认值    描述
---------  -----  -------------
message    Hello  回显的信息
running    true   布尔值
maxNumber  111    回显数字
ListIdx    0      下拉框: 第一|第二|第三
cond       123    条件显示1
*/

function main() {
    Log(exchange.GetAccount());
    Log(message, running, maxNumber);
    Log('ListIdx :', ListIdx);
    LogProfit(100.3);
    Log("这是红色字体颜色", "#ff0000");
    Log("我是带背景色的", "#ffffff223344");
    LogProfit(90, "我也带背景色", "#ffffff0000ff");
}
