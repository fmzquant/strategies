/*
策略出处: https://www.botvs.com/strategy/8379
策略名称: 【Demo】如何利用“策略交互“动态调整策略参数
策略作者: momox
策略描述:

策略需要不断的测试调整，参数也经常改来改去，每次都停止再重启，费事费力，还会丢失原来的盈利进度（虽然也可以通过全局参数来恢复），其实botvs已经提供了动态调整参数的途径--”策略交互“


按钮    默认值    描述
----  -----  ------
A3    999    AAA的参数
B3    Botvs  BBB的参数
*/

var Interval=2000;

//AAA，BBB为策略中希望动态调整的参数
var AAA=0;
var BBB="hello world";

function main() {
    while(true){
        onTick();
        Sleep(Interval);
    }
}

function onTick(){
    set_command();
    Log("AAA="+AAA,"       BBB="+BBB);
}

//获取动态参数（策略交互内容）
 function set_command() {

     var get_command = GetCommand();//  GetCommand方法是获取参数方法，获取的参数是字符串形式 格式为 "参数名:参数值" 参见BotVS API文档
     if (get_command != null) {
         if (get_command.indexOf("A3:") == 0) {  //如果传入的参数名为A3（以“A3:”打头，即表明是A3参数）

             AAA = (get_command.replace("A3:", "")); //赋值给策略里面的AAA（将打头字符串替换为空，剩下就是我们的参数值）

             Log("AAA变成:" + AAA);
         }
         
          if (get_command.indexOf("B3:") == 0) {  //如果传入的参数名为B3（以“B3:”打头，即表明是B3参数）

             BBB = (get_command.replace("B3:", "")); //赋值给策略里面的BBB（将打头字符串替换为空，剩下就是我们的参数值）

             Log("BBB变成:" + BBB);
         }

     }
 }
