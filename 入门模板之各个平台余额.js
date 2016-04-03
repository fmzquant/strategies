/*
策略出处: https://www.botvs.com/strategy/48
策略名称: 入门模板之各个平台余额
策略作者: Zero
策略描述:

查看各个平台的余额和货币数量


参数           默认值    描述
-----------  -----  ------
DisableRate  false  禁用汇率转换
*/

function main() {
    for (var i = 0; i < exchanges.length; i++) {
        if (DisableRate) {
            exchanges[i].SetRate(1);
        }
        while (true) {
            var account = exchanges[i].GetAccount();
            if (account) {
                Log(exchanges[i].GetName(), exchanges[i].GetLabel(), exchanges[i].GetCurrency(), exchanges[i].GetAccount());
                break;
            }
            Sleep(3000);
        }
    }
}
